#!/usr/bin/env python3
"""Read-only live reconciliation of public ASC Store API against active store products.

Requires SUPABASE_URL and SUPABASE_KEY (publishable/anon key only).
Uses the public WooCommerce Store API at accessoriesspares.co.za.
Never writes to Supabase or ASC. Reports candidate changes only.
"""
from __future__ import annotations

import csv
import json
import os
import re
import sys
import time
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import requests

ASC_BASE = os.environ.get("ASC_BASE", "https://accessoriesspares.co.za").rstrip("/")
SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
PER_PAGE = 100
MAX_PAGES = 250
TIMEOUT = (5, 25)
OUT = Path(os.environ.get("ASC_AUDIT_OUT", "reports/asc_live_status_audit"))
HEADERS = {"User-Agent": "GetWiredAutoWorx-ReadOnlySupplierStatusAudit/1.0", "Accept": "application/json"}

def sku_key(value):
    return re.sub(r"\s+", "", str(value or "")).casefold()

def clean_text(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()

def candidate_status(product):
    name = clean_text(product.get("name"))
    desc = clean_text(product.get("description"))
    text = (name + " " + desc).casefold()
    # Supplier wording explicitly indicating permanent end-of-line/discontinuation.
    discontinued = any(term in text for term in (
        "will discontinue", "discontinuing", "discontinued", "not viable",
        "end of line", "end-of-line", "maker stop making", "discontinued by maker",
    ))
    qty = product.get("stock_quantity")
    try:
        qty = float(qty) if qty is not None and qty != "" else None
    except (TypeError, ValueError):
        qty = None
    status = clean_text(product.get("stock_status")).casefold()
    is_in_stock = product.get("is_in_stock")
    out_of_stock = (
        status in {"outofstock", "out of stock", "out_of_stock"}
        or is_in_stock is False
        or qty == 0
    )
    if discontinued:
        return "DEACTIVATE_CANDIDATE", "Supplier product title/description explicitly indicates discontinued/end-of-line status."
    if out_of_stock:
        return "SET_STOCK_ZERO_CANDIDATE", "Supplier public API reports out of stock/zero quantity; do not deactivate automatically."
    return "NO_CHANGE", "No explicit discontinued or out-of-stock signal in the public supplier response."

def fetch_store_products(session):
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise RuntimeError("SUPABASE_URL and SUPABASE_KEY environment variables are required.")
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Accept": "application/json",
    }
    rows, offset = [], 0
    while True:
        url = (
            SUPABASE_URL + "/rest/v1/products?select=id,sku,public_sku,name,active,stock_quantity"
            "&active=eq.true&order=sku.asc&limit=1000&offset=" + str(offset)
        )
        response = session.get(url, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()
        batch = response.json()
        if not isinstance(batch, list):
            raise RuntimeError("Supabase product export returned an unexpected response.")
        rows.extend(batch)
        if len(batch) < 1000:
            break
        offset += 1000
    return rows

def fetch_asc_products(session):
    rows = []
    total_pages = None
    for page in range(1, MAX_PAGES + 1):
        url = f"{ASC_BASE}/wp-json/wc/store/v1/products?per_page={PER_PAGE}&page={page}"
        response = session.get(url, headers=HEADERS, timeout=TIMEOUT)
        response.raise_for_status()
        content_type = response.headers.get("content-type", "").casefold()
        if "json" not in content_type:
            raise RuntimeError(f"ASC Store API returned non-JSON content on page {page}; stopping safely.")
        batch = response.json()
        if not isinstance(batch, list):
            raise RuntimeError(f"ASC Store API returned an unexpected payload on page {page}.")
        if page == 1:
            try:
                total_pages = int(response.headers.get("X-WP-TotalPages", "0")) or None
            except ValueError:
                total_pages = None
        rows.extend(batch)
        if not batch or len(batch) < PER_PAGE:
            break
        if total_pages is not None and page >= total_pages:
            break
        # Keep the public read-only crawl polite and bounded.
        time.sleep(0.12)
    else:
        raise RuntimeError(f"ASC pagination exceeded safety limit of {MAX_PAGES} pages.")
    return rows, total_pages

def main():
    session = requests.Session()
    session.headers.update(HEADERS)
    store_rows = fetch_store_products(session)
    asc_rows, asc_pages = fetch_asc_products(session)

    store_by_sku = defaultdict(list)
    asc_by_sku = defaultdict(list)
    for row in store_rows:
        key = sku_key(row.get("sku"))
        if key:
            store_by_sku[key].append(row)
    for row in asc_rows:
        key = sku_key(row.get("sku"))
        if key:
            asc_by_sku[key].append(row)

    report = []
    counts = defaultdict(int)
    for key, suppliers in sorted(asc_by_sku.items()):
        candidates = [p for p in suppliers if candidate_status(p)[0] != "NO_CHANGE"]
        if not candidates:
            continue
        if len(suppliers) != 1:
            counts["blocked_duplicate_asc_sku"] += len(candidates)
            for supplier in candidates:
                action, reason = candidate_status(supplier)
                report.append(make_row(supplier, None, action, "BLOCK_DUPLICATE_ASC_SKU",
                                       "ASC returned this SKU more than once; " + reason))
            continue
        supplier = suppliers[0]
        action, reason = candidate_status(supplier)
        matches = store_by_sku.get(key, [])
        if not matches:
            counts["candidate_not_in_active_store"] += 1
            report.append(make_row(supplier, None, action, "NOT_IN_ACTIVE_STORE",
                                   "Candidate is not present as an active store SKU; no store action required. " + reason))
        elif len(matches) != 1:
            counts["blocked_duplicate_store_sku"] += 1
            report.append(make_row(supplier, None, action, "BLOCK_DUPLICATE_STORE_SKU",
                                   "Multiple active store rows share this supplier SKU; manual review required. " + reason))
        else:
            counts[action] += 1
            report.append(make_row(supplier, matches[0], action, "MATCHED_CANDIDATE", reason))

    fields = [
        "checked_at_utc", "supplier_sku", "supplier_name", "supplier_stock_status",
        "supplier_stock_quantity", "supplier_url", "store_product_id", "store_public_sku",
        "store_name", "store_active", "store_stock_quantity", "proposed_action", "match_status", "reason",
    ]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    csv_path = OUT.with_suffix(".csv")
    summary_path = OUT.with_suffix(".summary.json")
    with csv_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(report)
    summary = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "source": ASC_BASE + "/wp-json/wc/store/v1/products",
        "asc_products_read": len(asc_rows),
        "asc_pages_reported": asc_pages,
        "active_store_products_read": len(store_rows),
        "candidate_rows": len(report),
        "matched_candidates": sum(1 for row in report if row["match_status"] == "MATCHED_CANDIDATE"),
        "counts": dict(sorted(counts.items())),
        "mode": "READ_ONLY_NO_DATABASE_WRITES",
        "matching_rule": "exact normalized supplier SKU only; no fuzzy/name matching",
        "warning": "Candidate actions require manual verification and approval. Temporary stock-outs are not automatic deactivations.",
    }
    summary_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("ASC_STATUS_AUDIT_SUMMARY=" + json.dumps(summary, sort_keys=True))
    print("CSV_REPORT=" + str(csv_path))
    print("JSON_SUMMARY=" + str(summary_path))
    return 0

def make_row(supplier, store, action, match_status, reason):
    checked = datetime.now(timezone.utc).isoformat()
    return {
        "checked_at_utc": checked,
        "supplier_sku": clean_text(supplier.get("sku")),
        "supplier_name": clean_text(supplier.get("name")),
        "supplier_stock_status": clean_text(supplier.get("stock_status")),
        "supplier_stock_quantity": "" if supplier.get("stock_quantity") is None else supplier.get("stock_quantity"),
        "supplier_url": clean_text(supplier.get("permalink")),
        "store_product_id": (store or {}).get("id", ""),
        "store_public_sku": (store or {}).get("public_sku", ""),
        "store_name": (store or {}).get("name", ""),
        "store_active": (store or {}).get("active", ""),
        "store_stock_quantity": (store or {}).get("stock_quantity", ""),
        "proposed_action": action,
        "match_status": match_status,
        "reason": reason,
    }

if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print("ASC_STATUS_AUDIT_FAILED=" + str(exc), file=sys.stderr)
        raise SystemExit(1)
