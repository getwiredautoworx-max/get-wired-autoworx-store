#!/usr/bin/env python3
"""Build a safe, review-only reconciliation of ASC supplier status vs store inventory.

This tool never connects to Supabase and never mutates the live catalogue.
Inputs:
  --supplier: supplier-export CSV with supplier SKU plus stock/status columns
  --inventory: read-only product export CSV with sku, public_sku, name, active,
               stock_quantity (header aliases are supported)
Outputs:
  a CSV decision ledger and a JSON summary. Exact SKU matching only; ambiguous
  or duplicate matches are blocked for manual review.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

SKU_ALIASES = ("supplier_sku", "supplier sku", "sku", "product code", "item code", "code", "part number", "part no")
NAME_ALIASES = ("product_name", "product name", "name", "description", "item description")
STATUS_ALIASES = ("status", "availability", "stock status", "product status", "discontinued")
QTY_ALIASES = ("stock_quantity", "stock quantity", "quantity", "qty", "stock", "available quantity")
SOURCE_ALIASES = ("source_url", "url", "product url", "link")
ACTION_FIELDS = [
    "source_checked_at", "supplier_sku", "store_public_sku", "supplier_name",
    "store_name", "supplier_status", "supplier_quantity", "store_active",
    "store_quantity", "decision", "reason", "source_url"
]

def norm_header(value: str) -> str:
    return re.sub(r"[\s_\-]+", " ", (value or "").strip().casefold())

def norm_sku(value: str) -> str:
    return re.sub(r"\s+", "", (value or "").strip()).casefold()

def field(row: dict[str, str], aliases: Iterable[str]) -> str:
    lookup = {norm_header(k): (v or "").strip() for k, v in row.items()}
    for alias in aliases:
        value = lookup.get(norm_header(alias), "")
        if value:
            return value
    return ""

def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))

def parse_qty(value: str) -> float | None:
    if not value:
        return None
    cleaned = value.strip().replace(",", "")
    try:
        qty = float(cleaned)
    except ValueError:
        return None
    return qty if qty >= 0 else None

def classify(status: str, qty: float | None) -> tuple[str, str]:
    s = re.sub(r"[\s_\-]+", " ", (status or "").casefold()).strip()
    if any(term in s for term in ("not discontinued", "no longer discontinued", "discontinuation cancelled", "discontinuation canceled")):
        return "REVIEW_STATUS", "Supplier text negates discontinuation; manual review required."
    if any(term in s for term in ("will discontinue", "discontinued", "discontinue", "end of line", "eol")):
        return "DEACTIVATE_CANDIDATE", "Supplier explicitly marks this item discontinued; require human review before deactivation."
    if any(term in s for term in ("out of stock", "sold out", "unavailable", "zero stock", "stock zero")):
        return "SET_STOCK_ZERO_CANDIDATE", "Supplier explicitly reports unavailable/out of stock; do not deactivate automatically."
    if qty == 0:
        return "SET_STOCK_ZERO_CANDIDATE", "Supplier quantity is explicitly zero; do not infer permanent discontinuation."
    if any(term in s for term in ("in stock", "available", "active", "current")):
        return "NO_CHANGE", "Supplier status indicates availability; no cleanup proposed."
    return "REVIEW_STATUS", "No reliable discontinued/out-of-stock signal; no change proposed."

def reconcile(supplier_rows: list[dict[str, str]], inventory_rows: list[dict[str, str]], checked_at: str) -> tuple[list[dict[str, str]], dict]:
    supplier_by_sku: dict[str, list[dict[str, str]]] = defaultdict(list)
    inventory_by_sku: dict[str, list[dict[str, str]]] = defaultdict(list)
    invalid_supplier = 0
    invalid_inventory = 0

    for row in supplier_rows:
        sku = field(row, SKU_ALIASES)
        if not norm_sku(sku):
            invalid_supplier += 1
            continue
        supplier_by_sku[norm_sku(sku)].append(row)

    for row in inventory_rows:
        sku = field(row, SKU_ALIASES)
        if not norm_sku(sku):
            invalid_inventory += 1
            continue
        inventory_by_sku[norm_sku(sku)].append(row)

    output: list[dict[str, str]] = []
    counters: dict[str, int] = defaultdict(int)
    for key, srows in sorted(supplier_by_sku.items()):
        if len(srows) != 1:
            counters["duplicate_supplier_sku_blocked"] += len(srows)
            for sr in srows:
                output.append(make_row(sr, None, checked_at, "BLOCK_DUPLICATE_SUPPLIER_SKU",
                                       "Supplier export contains this normalized SKU more than once; resolve duplicate/conflicting rows first."))
            continue

        sr = srows[0]
        matches = inventory_by_sku.get(key, [])
        if not matches:
            output.append(make_row(sr, None, checked_at, "UNMATCHED_STORE_SKU",
                                   "No exact supplier-SKU match in the store export; do not match by name or guess."))
            counters["unmatched_store_sku"] += 1
            continue
        if len(matches) != 1:
            output.append(make_row(sr, None, checked_at, "BLOCK_DUPLICATE_STORE_SKU",
                                   "Store export contains this normalized SKU more than once; resolve duplicates before any change."))
            counters["duplicate_store_sku_blocked"] += 1
            continue

        ir = matches[0]
        status = field(sr, STATUS_ALIASES)
        qty = parse_qty(field(sr, QTY_ALIASES))
        action, reason = classify(status, qty)
        row = make_row(sr, ir, checked_at, action, reason)
        output.append(row)
        counters[action] += 1

    # Inventory SKUs with no supplier row are deliberately left unchanged.
    counters["supplier_rows"] = len(supplier_rows)
    counters["inventory_rows"] = len(inventory_rows)
    counters["invalid_supplier_rows_without_sku"] = invalid_supplier
    counters["invalid_inventory_rows_without_sku"] = invalid_inventory
    counters["unique_supplier_skus"] = len(supplier_by_sku)
    counters["unique_inventory_skus"] = len(inventory_by_sku)
    summary = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "source_checked_at": checked_at,
        "mode": "REVIEW_ONLY_NO_DATABASE_WRITES",
        "matching_rule": "exact normalized supplier SKU only; no fuzzy/name matching",
        "counts": dict(sorted(counters.items())),
        "warning": "Candidate actions require manual verification and approval. Never execute against live data directly."
    }
    return output, summary

def make_row(sr: dict[str, str], ir: dict[str, str] | None, checked_at: str, decision: str, reason: str) -> dict[str, str]:
    status = field(sr, STATUS_ALIASES)
    qty = field(sr, QTY_ALIASES)
    return {
        "source_checked_at": checked_at,
        "supplier_sku": field(sr, SKU_ALIASES),
        "store_public_sku": field(ir or {}, ("public_sku", "public sku", "store public sku")),
        "supplier_name": field(sr, NAME_ALIASES),
        "store_name": field(ir or {}, NAME_ALIASES),
        "supplier_status": status,
        "supplier_quantity": qty,
        "store_active": field(ir or {}, ("active", "is active")),
        "store_quantity": field(ir or {}, ("stock_quantity", "stock quantity", "store quantity")),
        "decision": decision,
        "reason": reason,
        "source_url": field(sr, SOURCE_ALIASES),
    }

def write_outputs(rows: list[dict[str, str]], summary: dict, out_prefix: Path) -> None:
    out_prefix.parent.mkdir(parents=True, exist_ok=True)
    csv_path = out_prefix.with_suffix(".csv")
    json_path = out_prefix.with_suffix(".summary.json")
    with csv_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=ACTION_FIELDS, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    json_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Review ledger: {csv_path}")
    print(f"Summary: {json_path}")
    print(json.dumps(summary, indent=2))

def self_test() -> int:
    supplier = [
        {"SKU": "ABC-1", "Status": "WILL DISCONTINUE", "Quantity": "3", "Product Name": "Part A"},
        {"SKU": "abc-2", "Status": "Out of Stock", "Quantity": "0", "Product Name": "Part B"},
        {"SKU": "ABC-3", "Status": "In Stock", "Quantity": "8", "Product Name": "Part C"},
        {"SKU": "ABC-4", "Status": "", "Quantity": "0", "Product Name": "Part D"},
        {"SKU": "ABC-5", "Status": "Not discontinued", "Quantity": "4", "Product Name": "Part E"},
        {"SKU": "DUP-1", "Status": "Discontinued", "Quantity": "0"},
        {"SKU": "dup-1", "Status": "In Stock", "Quantity": "5"},
        {"SKU": "MISSING", "Status": "Discontinued", "Quantity": "0"},
    ]
    inventory = [
        {"sku": "abc-1", "public_sku": "GW-00000001", "name": "Part A", "active": "true", "stock_quantity": "5"},
        {"sku": "ABC-2", "public_sku": "GW-00000002", "name": "Part B", "active": "true", "stock_quantity": "5"},
        {"sku": "ABC-3", "public_sku": "GW-00000003", "name": "Part C", "active": "true", "stock_quantity": "5"},
        {"sku": "ABC-4", "public_sku": "GW-00000004", "name": "Part D", "active": "true", "stock_quantity": "5"},
        {"sku": "ABC-5", "public_sku": "GW-00000005", "name": "Part E", "active": "true", "stock_quantity": "5"},
    ]
    rows, summary = reconcile(supplier, inventory, "2026-10-20")
    by_sku = {r["supplier_sku"].casefold(): r["decision"] for r in rows}
    checks = {
        "explicit_discontinued": by_sku.get("abc-1") == "DEACTIVATE_CANDIDATE",
        "out_of_stock": by_sku.get("abc-2") == "SET_STOCK_ZERO_CANDIDATE",
        "available_no_change": by_sku.get("abc-3") == "NO_CHANGE",
        "zero_qty": by_sku.get("abc-4") == "SET_STOCK_ZERO_CANDIDATE",
        "negated_discontinuation_not_deactivated": by_sku.get("abc-5") == "REVIEW_STATUS",
        "duplicate_supplier_blocked": sum(r["decision"] == "BLOCK_DUPLICATE_SUPPLIER_SKU" for r in rows) == 2,
        "unmatched_not_guessed": by_sku.get("missing") == "UNMATCHED_STORE_SKU",
        "no_writes_mode": summary["mode"] == "REVIEW_ONLY_NO_DATABASE_WRITES",
    }
    for name, passed in checks.items():
        print(("PASS" if passed else "FAIL") + " " + name)
    return 0 if all(checks.values()) else 1

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--supplier", type=Path, help="ASC supplier CSV export")
    parser.add_argument("--inventory", type=Path, help="Read-only store product CSV export")
    parser.add_argument("--checked-at", default=datetime.now(timezone.utc).date().isoformat(), help="Date supplier data was checked (YYYY-MM-DD)")
    parser.add_argument("--out", type=Path, default=Path("reports/asc_supplier_status_reconciliation"), help="Output file prefix")
    parser.add_argument("--self-test", action="store_true", help="Run built-in no-network tests")
    args = parser.parse_args()
    if args.self_test:
        return self_test()
    if not args.supplier or not args.inventory:
        parser.error("--supplier and --inventory are required unless --self-test is used")
    if not args.supplier.is_file() or not args.inventory.is_file():
        parser.error("Both input CSV paths must exist")
    supplier_rows = read_csv(args.supplier)
    inventory_rows = read_csv(args.inventory)
    rows, summary = reconcile(supplier_rows, inventory_rows, args.checked_at)
    write_outputs(rows, summary, args.out)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
