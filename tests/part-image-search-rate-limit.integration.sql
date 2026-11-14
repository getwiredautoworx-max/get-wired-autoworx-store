\set ON_ERROR_STOP on

DO $body$
BEGIN
  IF has_table_privilege('anon', 'gw_private.part_image_search_rate_limits', 'SELECT') OR
     has_table_privilege('authenticated', 'gw_private.part_image_search_rate_limits', 'SELECT') THEN
    RAISE EXCEPTION 'Client roles must not read the rate-limit table';
  END IF;
  IF has_function_privilege('anon', 'gw_private.consume_part_image_search_rate_limit(text,integer,integer)', 'EXECUTE') OR
     has_function_privilege('authenticated', 'gw_private.consume_part_image_search_rate_limit(text,integer,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'Client roles must not execute the rate-limit RPC';
  END IF;
  IF NOT has_function_privilege('service_role', 'gw_private.consume_part_image_search_rate_limit(text,integer,integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'service_role must execute the rate-limit RPC';
  END IF;
END
$body$;

SET ROLE service_role;
DO $body$
DECLARE
  v_allowed boolean;
  v_remaining integer;
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    SELECT allowed, remaining INTO v_allowed, v_remaining
    FROM gw_private.consume_part_image_search_rate_limit(repeat('a', 64), 60, 8);
    IF NOT v_allowed THEN RAISE EXCEPTION 'Request % was denied before the limit', i; END IF;
  END LOOP;

  SELECT allowed, remaining INTO v_allowed, v_remaining
  FROM gw_private.consume_part_image_search_rate_limit(repeat('a', 64), 60, 8);
  IF v_allowed OR v_remaining <> 0 THEN
    RAISE EXCEPTION 'Ninth request should be denied with zero remaining';
  END IF;

END
$body$;
RESET ROLE;

UPDATE gw_private.part_image_search_rate_limits
SET window_started_at = clock_timestamp() - interval '61 seconds',
    expires_at = clock_timestamp() + interval '60 seconds'
WHERE ip_hash = repeat('a', 64);

SET ROLE service_role;
DO $body$
DECLARE
  v_allowed boolean;
  v_remaining integer;
BEGIN
  SELECT allowed, remaining INTO v_allowed, v_remaining
  FROM gw_private.consume_part_image_search_rate_limit(repeat('a', 64), 60, 8);
  IF NOT v_allowed OR v_remaining <> 7 THEN
    RAISE EXCEPTION 'Expired window should reset the request counter';
  END IF;
END
$body$;
RESET ROLE;

-- A call should opportunistically delete at most 500 expired rows per pass.
INSERT INTO gw_private.part_image_search_rate_limits(ip_hash, window_started_at, request_count, expires_at)
SELECT lpad(to_hex(n), 64, '0'), clock_timestamp() - interval '2 minutes', 1, clock_timestamp() - interval '1 second'
FROM generate_series(1, 501) AS n
ON CONFLICT (ip_hash) DO UPDATE
SET window_started_at = EXCLUDED.window_started_at,
    request_count = EXCLUDED.request_count,
    expires_at = EXCLUDED.expires_at;

SELECT allowed
FROM gw_private.consume_part_image_search_rate_limit(repeat('f', 64), 60, 8);

DO $body$
DECLARE
  v_expired integer;
BEGIN
  SELECT count(*) INTO v_expired
  FROM gw_private.part_image_search_rate_limits
  WHERE expires_at < clock_timestamp();
  IF v_expired <> 1 THEN
    RAISE EXCEPTION 'Expected one expired row after bounded 500-row cleanup, found %', v_expired;
  END IF;
END
$body$;
