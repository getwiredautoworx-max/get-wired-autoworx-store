#!/usr/bin/env python3
"""Compare ASC status candidates to active Get Wired products by exact supplier SKU.

Reads the public Supabase publishable key from the storefront HTML, uses only
read-only REST GETs, and never exports supplier cost or writes to the database.
"""
from __future__ import annotations
import argparse
import csv
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

import requests

DISCONTINUED = re.compile(r"\b(?:will\s+discontinue|will-discontinue|discontinued|discontinue\s+not\s+viable|not\s+viable|discontinuing)\b", re.I)
OUT_OF_STOCK = re.compile(r"\b(?:out\s+of\s+stock|sold\s+out)\b", re.I)


def norm(value):
    return re.sub(r"\s+", "", str(value or "").strip()).upper()


def read_csv(path):
    with open(path, newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            raise ValueError(f"{path}: missing CSV header")
        return list(reader)


def get_supabase_config(html_path):
    html = Path(html_path).read_text(encoding="utf-8")
    url = re.search(r"SUPABASE_URL\s*=\s*['\"]([^'\"]+)", html)
    key = re.search(r"SUPABASE_KEY\s*=\s*['\"]([^'\"]+)", html)
    if not url or not key:
        raise RuntimeError("Could not locate the existing public Supabase URL/key in storefront HTML.")
    return url.group(1).rstrip("/"), key.group(1)


def fetch_active_store_products(base_url, public_key, session=None, batch_size=1000):
    session = session or requests.Session()
    headers = {
        "apikey": public_key,
        "Authorization": f"Bearer {public_key}",
        "Accept": "application/json",
        "Prefer": "count=exact",
        "Range-Unit": "items",
    }
    rows = []
    offset = 0
    endpoint = f"{base_url}/rest/v1/products"
    while True:
        headers["Range"] = f"{offset}-{offset + batch_size - 1}"
        params = {
            "select": "sku,public_sku,name,active,stock_quantity,price",
            "active": "eq.true",
            "order": "sku.asc",
        }
        response = session.get(endpoint, headers=headers, params=params, timeout=30)
        if response.status_code >= 400:
            raise RuntimeError(f"Supabase read-only product query failed with HTTP {response.status_code}: {response.text[:300]}")
        batch = response.json()
        if not isinstance(batch, list):
            raise RuntimeError("Supabase products endpoint did not return a JSON array.")
        rows.extend(batch)
        if len(batch) < batch_size:
            break
        offset += len(batch)
        if offset > 20000:
            raise RuntimeError("Safety stop: product pagination exceeded 20,000 rows.")
    return rows


def compare_rows(store_rows, asc_rows):
    store_by_sku = defaultdict(list)
    asc_by_sku = defaultdict(list)
    for row in store_rows:
        sku = norm(row.get("sku"))
        if sku and row.get("active") is True:
            store_by_sku[sku].append(row)
    for row in asc_rows:
        sku = norm(row.get("supplier_sku") or row.get("sku"))
        if sku:
            asc_by_sku[sku].append(row)

    output = []
    for sku, supplier_rows in asc_by_sku.items():
        # Candidate-only input: ignore supplier products without an explicit status/stock concern.
        if not any((r.get("supplier_status_flags") or r.get("stock_status") == "OUT_OF_STOCK" or str(r.get("stock_quantity", "")).strip() == "0") for r in supplier_rows):
            continue
        store_matches = store_by_sku.get(sku, [])
        if not store_matches:
            continue
        if len(supplier_rows) > 1 or len(store_matches) > 1:
            for store in store_matches:
                output.append({
                    "supplier_sku": sku,
                    "public_sku": store.get("public_sku", ""),
                    "store_name": store.get("name", ""),
                    "store_active": store.get("active", ""),
                    "store_stock": store.get("stock_quantity", ""),
                    "store_price_zar": store.get("price", ""),
                    "asc_listing_title": " | ".join(r.get("title", "") for r in supplier_rows),
                    "asc_supplier_status": "AMBIGUOUS_DUPLICATE_SKU",
                    "asc_stock_quantity": " | ".join(str(r.get("stock_quantity", "")) for r in supplier_rows),
                    "asc_listing_url": " | ".join(r.get("product_url", "") for r in supplier_rows),
                    "recommended_action": "MANUAL_REVIEW",
                    "reason": "Exact SKU is duplicated in the supplier listing or store; do not change active state automatically.",
                })
            continue
        store = store_matches[0]
        asc = supplier_rows[0]
        title = asc.get("title", "")
        flags = asc.get("supplier_status_flags", "")
        stock_status = asc.get("stock_status", "")
        supplier_stock = asc.get("stock_quantity", "")
        evidence = " ".join([title, flags, stock_status, str(supplier_stock)])
        is_discontinued = bool(DISCONTINUED.search(evidence)) or any(x in flags for x in ("DISCONTINUED", "WILL_DISCONTINUE", "NOT_VIABLE"))
        is_oos = stock_status == "OUT_OF_STOCK" or bool(OUT_OF_STOCK.search(evidence)) or str(supplier_stock).strip() == "0"
        if is_discontinued:
            action = "DEACTIVATE_AFTER_REVIEW"
            reason = "Exact supplier SKU match; ASC listing explicitly says discontinued/will discontinue/not viable. Confirm current orderability before deactivation."
        elif is_oos:
            action = "REVIEW_TEMPORARY_STOCKOUT"
            reason = "Exact supplier SKU match; ASC currently shows out of stock/zero. Confirm availability before hiding/deactivating; this alone does not prove discontinuation."
        else:
            continue
        output.append({
            "supplier_sku": sku,
            "public_sku": store.get("public_sku", ""),
            "store_name": store.get("name", ""),
            "store_active": store.get("active", ""),
            "store_stock": store.get("stock_quantity", ""),
            "store_price_zar": store.get("price", ""),
            "asc_listing_title": title,
            "asc_supplier_status": flags or stock_status or "ZERO_STOCK",
            "asc_stock_quantity": supplier_stock,
            "asc_listing_url": asc.get("product_url", ""),
            "recommended_action": action,
            "reason": reason,
        })
    return output


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--asc", required=True, help="ASC status-candidate CSV from the crawler")
    ap.add_argument("--html-config", required=True, help="Storefront HTML containing the existing public Supabase connection")
    ap.add_argument("--output-dir", default="asc-store-reconciliation")
    args = ap.parse_args()
    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    try:
        asc_rows = read_csv(args.asc)
        base_url, public_key = get_supabase_config(args.html_config)
        store_rows = fetch_active_store_products(base_url, public_key)
        matches = compare_rows(store_rows, asc_rows)
    except Exception as exc:
        print(f"ERROR: {type(exc).__name__}: {exc}", file=sys.stderr)
        return 2
    fields = [
        "supplier_sku", "public_sku", "store_name", "store_active", "store_stock", "store_price_zar",
        "asc_listing_title", "asc_supplier_status", "asc_stock_quantity", "asc_listing_url",
        "recommended_action", "reason",
    ]
    with (out_dir / "asc_store_review_patch.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(matches)
    summary = {
        "store_active_rows_read": len(store_rows),
        "supplier_status_candidate_rows_read": len(asc_rows),
        "exact_sku_review_matches": len(matches),
        "discontinued_review_matches": sum(r["recommended_action"] == "DEACTIVATE_AFTER_REVIEW" for r in matches),
        "stockout_review_matches": sum(r["recommended_action"] == "REVIEW_TEMPORARY_STOCKOUT" for r in matches),
        "manual_review_duplicates": sum(r["recommended_action"] == "MANUAL_REVIEW" for r in matches),
        "database_writes": 0,
        "supplier_cost_fields_requested": False,
        "exact_sku_matching_only": True,
    }
    (out_dir / "reconciliation_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
