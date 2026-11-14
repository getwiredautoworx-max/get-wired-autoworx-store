-- Shared, atomic abuse control for the public AI part-image-search endpoint.
-- IP addresses are HMACed in the Edge Function; raw client IPs are never stored.
CREATE TABLE IF NOT EXISTS gw_private.part_image_search_rate_limits (
  ip_hash text PRIMARY KEY CHECK (ip_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL CHECK (request_count >= 0),
  expires_at timestamptz NOT NULL
);

CREATE INDEX IF NOT EXISTS part_image_search_rate_limits_expires_idx
  ON gw_private.part_image_search_rate_limits (expires_at);

ALTER TABLE gw_private.part_image_search_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE gw_private.part_image_search_rate_limits FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION gw_private.consume_part_image_search_rate_limit(
  p_key_hash text,
  p_window_seconds integer DEFAULT 60,
  p_max_requests integer DEFAULT 8
)
RETURNS TABLE(allowed boolean, remaining integer, reset_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, gw_private
AS $function$
DECLARE
  v_started timestamptz;
  v_count integer;
  v_now timestamptz := clock_timestamp();
BEGIN
  IF p_key_hash IS NULL OR p_key_hash !~ '^[0-9a-f]{64}$' THEN
    RAISE EXCEPTION 'Invalid rate-limit key';
  END IF;
  IF p_window_seconds < 10 OR p_window_seconds > 3600 OR
     p_max_requests < 1 OR p_max_requests > 100 THEN
    RAISE EXCEPTION 'Invalid rate-limit policy';
  END IF;

  INSERT INTO gw_private.part_image_search_rate_limits AS current_limit
    (ip_hash, window_started_at, request_count, expires_at)
  VALUES
    (p_key_hash, v_now, 1, v_now + make_interval(secs => p_window_seconds * 2))
  ON CONFLICT (ip_hash) DO UPDATE
  SET window_started_at = CASE
        WHEN current_limit.window_started_at <= v_now - make_interval(secs => p_window_seconds)
          THEN v_now
        ELSE current_limit.window_started_at
      END,
      request_count = CASE
        WHEN current_limit.window_started_at <= v_now - make_interval(secs => p_window_seconds)
          THEN 1
        ELSE current_limit.request_count + 1
      END,
      expires_at = v_now + make_interval(secs => p_window_seconds * 2)
  RETURNING window_started_at, request_count
  INTO v_started, v_count;

  -- Opportunistically remove a bounded batch of expired hashes; no scheduled
  -- job or extension is required, and the table cannot grow without bound.
  WITH expired AS (
    SELECT ip_hash
    FROM gw_private.part_image_search_rate_limits
    WHERE expires_at < v_now
    ORDER BY expires_at
    LIMIT 500
  )
  DELETE FROM gw_private.part_image_search_rate_limits AS target
  USING expired
  WHERE target.ip_hash = expired.ip_hash;

  RETURN QUERY SELECT
    v_count <= p_max_requests,
    GREATEST(p_max_requests - v_count, 0),
    v_started + make_interval(secs => p_window_seconds);
END;
$function$;

REVOKE ALL ON FUNCTION gw_private.consume_part_image_search_rate_limit(text, integer, integer)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION gw_private.consume_part_image_search_rate_limit(text, integer, integer)
  TO service_role;
