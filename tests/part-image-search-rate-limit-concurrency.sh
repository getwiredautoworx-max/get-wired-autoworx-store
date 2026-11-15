#!/usr/bin/env bash
set -euo pipefail

: "${PGHOST:=127.0.0.1}"
: "${PGPORT:=5432}"
: "${PGUSER:=postgres}"
: "${PGPASSWORD:=postgres}"
: "${PGDATABASE:=postgres}"
export PGHOST PGPORT PGUSER PGPASSWORD PGDATABASE

key_hash="$(printf '%064d' 0 | tr '0' 'b')"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
pids=()

for n in $(seq 1 16); do
  (
    psql -qAt -v ON_ERROR_STOP=1 -c "SET ROLE service_role; SELECT allowed FROM gw_private.consume_part_image_search_rate_limit('$key_hash', 60, 8);" > "$tmpdir/$n"
  ) &
  pids+=("$!")
done

for pid in "${pids[@]}"; do wait "$pid"; done
allowed="$(grep -hxc 't' "$tmpdir"/* | awk '{ total += $1 } END { print total + 0 }')"
denied="$(grep -hxc 'f' "$tmpdir"/* | awk '{ total += $1 } END { print total + 0 }')"
if [[ "$allowed" != "8" || "$denied" != "8" ]]; then
  echo "Expected exactly 8 allowed and 8 denied concurrent requests; got $allowed allowed and $denied denied"
  exit 1
fi
echo "Concurrent rate-limit test passed: 8 allowed, 8 denied."
