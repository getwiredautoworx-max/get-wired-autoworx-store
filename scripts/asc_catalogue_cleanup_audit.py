#!/usr/bin/env python3
"""Build a review-only ASC-to-store inventory cleanup patch from CSV exports.

This script never connects to Supabase and never changes production data.
It only emits a CSV of exact supplier-SKU matches requiring review.
"""
import argparse
import csv
import re
import sys
from pathlib import Path

WILL_DISCONTINUE = re.compile(r"\b(?:will\s+discontinue|will-discontinue|will\s+be\s+discontinued)\b", re.I)
DISCONTINUED = re.compile(r"\b(?:discontinued|discontinue\s+not\s+viable|not\s+viable|discontinued\s+by\s+maker)\b", re.I)
OUT_OF_STOCK = re.compile(r"\b(?:out\s+of\s+stock|sold\s+out)\b", re.I)
ZERO_STOCK = re.compile(r"^\s*0+(?:\.0+)?\s*$")


def norm(value):
    return re.sub(r"\s+", "", (value or "").strip()).upper()


def read_csv(path):
    with open(path, newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            raise ValueError(f"{path}: missing CSV header")
        return list(reader), {x.strip().lower(): x for x in reader.fieldnames}


def first(row, fields, *names):
    for name in names:
        key = fields.get(name.lower())
        if key and (row.get(key) or "").strip():
            return (row.get(key) or "").strip()
    return ""


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--store", required=True, help="Read-only store product CSV export")
    ap.add_argument("--asc", required=True, help="Supplier catalogue CSV export")
    ap.add_argument("--output", default="asc-cleanup-review.csv", help="Review patch CSV output")
    args = ap.parse_args()

    store_rows, sf = read_csv(args.store)
    asc_rows, af = read_csv(args.asc)
    store_sku_cols = ("supplier_sku", "supplier sku", "sku", "stock code")
    asc_sku_cols = ("sku", "supplier_sku", "supplier sku", "stock code", "product code")
    asc_by_sku = {}
    for row in asc_rows:
        sku = norm(first(row, af, *asc_sku_cols))
        if sku:
            asc_by_sku.setdefault(sku, []).append(row)

    out = []
    matched = 0
    ambiguous = 0
    for row in store_rows:
        sku = norm(first(row, sf, *store_sku_cols))
        if not sku or sku not in asc_by_sku:
            continue
        matches = asc_by_sku[sku]
        if len(matches) != 1:
            ambiguous += 1
            out.append({
                "supplier_sku": sku, "public_sku": first(row, sf, "public_sku"),
                "store_name": first(row, sf, "name", "product name"),
                "asc_name": " | ".join(first(m, af, "name", "title", "product name", "description") for m in matches),
                "asc_stock": "", "supplier_status": "AMBIGUOUS_DUPLICATE_SUPPLIER_SKU",
                "recommended_action": "MANUAL_REVIEW", "reason": "Multiple ASC rows share this SKU; no automatic action.",
                "store_active": first(row, sf, "active"), "store_stock": first(row, sf, "stock_quantity", "stock", "quantity"),
            })
            continue
        asc = matches[0]
        matched += 1
        asc_name = first(asc, af, "name", "title", "product name", "description")
        status = first(asc, af, "status", "stock status", "availability")
        stock = first(asc, af, "stock", "stock quantity", "quantity", "qty", "inventory")
        evidence = " ".join([asc_name, status, stock])
        will_discontinue = bool(WILL_DISCONTINUE.search(evidence))
        is_discontinued = bool(DISCONTINUED.search(evidence))
        is_oos = bool(OUT_OF_STOCK.search(evidence)) or bool(ZERO_STOCK.fullmatch(stock))
        if will_discontinue:
            action = "INVENTORY_HOLD_PENDING_CONFIRMATION"
            reason = "Exact SKU match; supplier says WILL DISCONTINUE. Hold replenishment and confirm current orderability; do not automatically unpublish."
        elif is_discontinued:
            action = "DEACTIVATE_AFTER_REVIEW"
            reason = "Exact SKU match; supplier explicitly marks the item discontinued/not viable. Human review and fresh supplier evidence are required before deactivation."
        elif is_oos:
            action = "REVIEW_TEMPORARY_STOCKOUT"
            reason = "Exact SKU match; supplier currently shows out of stock/zero. Do not treat as discontinued without confirmation."
        else:
            continue
        out.append({
            "supplier_sku": sku, "public_sku": first(row, sf, "public_sku"),
            "store_name": first(row, sf, "name", "product name"), "asc_name": asc_name,
            "asc_stock": stock, "supplier_status": status or ("DISCONTINUED_TEXT" if is_discontinued else "OUT_OF_STOCK"),
            "recommended_action": action, "reason": reason,
            "store_active": first(row, sf, "active"), "store_stock": first(row, sf, "stock_quantity", "stock", "quantity"),
        })

    fieldnames = ["supplier_sku", "public_sku", "store_name", "asc_name", "asc_stock", "supplier_status",
                  "recommended_action", "reason", "store_active", "store_stock"]
    with open(args.output, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(out)
    print(f"Store rows: {len(store_rows)}")
    print(f"ASC rows: {len(asc_rows)}")
    print(f"Exact SKU matches: {matched}")
    print(f"Ambiguous duplicate-SKU matches held for review: {ambiguous}")
    print(f"Review candidates written: {len(out)}")
    print(f"Output: {Path(args.output)}")
    print("Safety: no database connection or writes were performed.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, csv.Error) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(2)
