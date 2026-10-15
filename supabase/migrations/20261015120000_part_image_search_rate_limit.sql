-- STAGING/REVIEW ONLY until approved. This migration is not applied to production by this PR.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.part_image_search_rate_limits (
  client_hash text primary key check (client_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0),
  updated_at timestamptz not null default clock_timestamp()
);

revoke all on table private.part_image_search_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on table private.part_image_search_rate_limits to service_role;

create or replace function public.consume_part_image_search_rate_limit(
  p_client_hash text,
  p_limit integer default 8,
  p_window_seconds integer default 60
)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = pg_catalog, private
as $function$
declare
  v_now timestamptz := clock_timestamp();
  v_row private.part_image_search_rate_limits%rowtype;
begin
  if p_client_hash !~ '^[0-9a-f]{64}$'
     or p_limit < 1 or p_limit > 100
     or p_window_seconds < 1 or p_window_seconds > 3600 then
    raise exception 'Invalid picture-search rate-limit arguments';
  end if;

  insert into private.part_image_search_rate_limits
    (client_hash, window_started_at, request_count, updated_at)
  values
    (p_client_hash, v_now, 1, v_now)
  on conflict (client_hash) do update
    set window_started_at = case
          when part_image_search_rate_limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            then v_now
          else part_image_search_rate_limits.window_started_at
        end,
        request_count = case
          when part_image_search_rate_limits.window_started_at <= v_now - make_interval(secs => p_window_seconds)
            then 1
          else part_image_search_rate_limits.request_count + 1
        end,
        updated_at = v_now
  returning * into v_row;

  -- Opportunistic bounded cleanup; the limiter state is shared across Edge Function isolates.
  if mod(hashtextextended(p_client_hash, 0), 100) = 0 then
    delete from private.part_image_search_rate_limits
    where updated_at < v_now - interval '1 day';
  end if;

  return query
    select
      (v_row.request_count <= p_limit),
      greatest(1, ceil(extract(epoch from (
        v_row.window_started_at + make_interval(secs => p_window_seconds) - v_now
      )))::integer);
end;
$function$;

revoke all on function public.consume_part_image_search_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_part_image_search_rate_limit(text, integer, integer) to service_role;
