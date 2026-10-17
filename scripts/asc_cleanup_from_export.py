#!/usr/bin/env python3
"""Build a review-only ASC product cleanup report and SQL patch from a supplier export.

Input CSV columns (case-insensitive): supplier_sku, name/product_name, stock_quantity
or stock, availability/status, source_url, observed_at.
This script never connects to Supabase and never executes SQL.
"""
import argparse
import csv
import json
import re
from pathlib import Path

MARKER = re.compile(r"\b(WILL\s+DISCONTINUE\w*|DISCONTINUED|DISCONTINUING|DISCONTINUE\s+CONFIRMED|MAKER\s+STOP(?:S|PED)?\s+MAKING)\b", re.I)
OOS = re.compile(r"\b(OUT\s+OF\s+STOCK|OUT\s+OF\s+STOCK|OOS|UNAVAILABLE)\b", re.I)

def pick(row, *names):
    norm = {str(k or "").strip().lower().replace(" ", "_"): (v or "").strip() for k, v in row.items()}
    for name in names:
        if norm.get(name):
            return norm[name]
    return ""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv", type=Path, help="fresh ASC product/stock export CSV")
    ap.add_argument("--out", type=Path, default=Path("asc-cleanup-review"), help="output directory")
    args = ap.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    flagged = []
    seen = set()
    with args.csv.open("r", encoding="utf-8-sig", newline="") as f:
        for line, row in enumerate(csv.DictReader(f), start=2):
            sku = pick(row, "supplier_sku", "sku", "product_sku").strip()
            name = pick(row, "name", "product_name", "title")
            stock = pick(row, "stock_quantity", "stock", "qty", "quantity")
            availability = pick(row, "availability", "status", "stock_status")
            source = pick(row, "source_url", "url", "product_url")
            observed = pick(row, "observed_at", "checked_at", "date")
            if not sku:
                continue
            key = sku.upper()
            marker_match = MARKER.search(name) or MARKER.search(availability)
            try:
                stock_num = int(float(stock)) if stock else None
            except ValueError:
                stock_num = None
            is_oos = bool(OOS.search(availability)) or stock_num is not None and stock_num <= 0
            if not marker_match and not is_oos:
                continue
            if key in seen:
                raise SystemExit(f"Duplicate supplier SKU in export: {sku!r}; resolve duplicate rows before generating a patch.")
            seen.add(key)
            flagged.append({
                "supplier_sku": sku, "asc_name": name, "stock_quantity": stock_num,
                "availability": availability, "discontinuation_marker": marker_match.group(0) if marker_match else "",
                "source_url": source, "observed_at": observed, "source_csv_line": line,
                "proposed_action": "DEACTIVATE_REVIEW" if marker_match else "OOS_REVIEW_BEFORE_DEACTIVATION"
            })
    json_path = args.out / "asc-cleanup-review.json"
    sql_path = args.out / "asc-cleanup-preview.sql"
    json_path.write_text(json.dumps(flagged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    candidates = [x for x in flagged if x["discontinuation_marker"]]
    esc = lambda s: str(s or "").replace("'", "''")
    values = ",\n".join(
        "('%s','%s','%s','%s','%s')" % (
            esc(x["supplier_sku"]), esc(x["asc_name"]), esc(x["discontinuation_marker"]),
            esc(x["source_url"]), esc(x["observed_at"])
        ) for x in candidates
    )
    sql = """-- Generated review-only SQL. Do not run without verifying exact matches.
-- This file intentionally contains no automatic UPDATE. First load the candidates into
-- a temporary table, preview the joins, then add an explicitly approved soft-deactivation.
BEGIN;
CREATE TEMP TABLE asc_cleanup_candidates (
  supplier_sku text PRIMARY KEY, asc_name text, marker text, source_url text, observed_at text
) ON COMMIT DROP;
"""
    if values:
        sql += "INSERT INTO asc_cleanup_candidates VALUES\n" + values + ";\n"
    else:
        sql += "-- No explicit discontinuation-marker rows were found in the input export.\n"
    sql += """
SELECT c.*, p.id AS product_id, p.name AS store_name, p.public_sku, p.active
FROM asc_cleanup_candidates c
LEFT JOIN gw_private.product_supplier_codes psc
  ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
LEFT JOIN public.products p ON p.id = psc.product_id
ORDER BY c.supplier_sku;
ROLLBACK; -- preview only; remove only after owner approval and a verified backup
"""
    sql_path.write_text(sql, encoding="utf-8")
    print(f"Flagged rows: {len(flagged)}")
    print(f"Discontinuation-marker rows: {len(candidates)}")
    print(f"Out-of-stock-only rows requiring review: {sum(not x['discontinuation_marker'] for x in flagged)}")
    print(f"Wrote {json_path} and {sql_path}")

if __name__ == "__main__":
    main()
