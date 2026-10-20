#!/usr/bin/env python3
"""Read-only live reconciliation of public ASC Store API against active store products.

Requires SUPABASE_URL and SUPABASE_KEY (publishable/anon key only).
Uses the public WooCommerce Store API at accessoriesspares.co.za.
Never writes to Supabase or ASC. Reports candidate changes only.
"""
from __future__ import annotations

import csv
import html
import json
import os
import re
import sys
import time
from collections import defaultdict
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path

import requests

ASC_BASE = "https://accessoriesspares.co.za"
# Public publishable key already used by the customer storefront. RLS restricts this
# read to active public products; never replace it with a service-role/secret key.
SUPABASE_URL = "https://ojytykqpvonxvepprgbh.supabase.co"
SUPABASE_KEY = "sb_publishable_rSKAEYqQheFAljUmro6uGA_MmBm-l3w"
PER_PAGE = 100
MAX_PAGES = 250
TIMEOUT = (5, 25)
MAX_RETRIES = 4
BACKOFF_BASE_SECONDS = 1.0
REQUEST_PACING_SECONDS = 0.25
OUT = Path(os.environ.get("ASC_AUDIT_OUT", "reports/asc_live_status_audit"))
HEADERS = {"User-Agent": "GetWiredAutoWorx-ReadOnlySupplierStatusAudit/1.0", "Accept": "application/json"}

def request_with_retry(session, url, *, headers=None, params=None):
    """Bounded retry for transient network/HTTP failures; never returns partial data silently."""
    last_error = None
    for attempt in range(MAX_RETRIES + 1):
        try:
            response = session.get(url, headers=headers, params=params, timeout=TIMEOUT)
            if response.status_code == 429 or 500 <= response.status_code <= 599:
                retry_after = response.headers.get("Retry-After", "")
                try:
                    delay = min(8.0, max(0.0, float(retry_after)))
                except ValueError:
                    delay = min(8.0, BACKOFF_BASE_SECONDS * (2 ** attempt))
                if attempt < MAX_RETRIES:
                    time.sleep(delay)
                    continue
            response.raise_for_status()
            return response
        except (requests.Timeout, requests.ConnectionError, requests.HTTPError) as exc:
            last_error = exc
            if attempt >= MAX_RETRIES:
                break
            time.sleep(min(8.0, BACKOFF_BASE_SECONDS * (2 ** attempt)))
    raise RuntimeError(f"Request failed after {MAX_RETRIES + 1} attempts: {url}: {last_error or 'transient HTTP error'}")


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
    if SUPABASE_URL != "https://ojytykqpvonxvepprgbh.supabase.co" or not SUPABASE_KEY.startswith("sb_publishable_"):
        raise RuntimeError("Audit must use the fixed project URL and a public publishable key only.")
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
        response = request_with_retry(session, url, headers=headers)
        try:
            batch = response.json()
        except ValueError as exc:
            raise RuntimeError(f"Supabase product export returned invalid JSON at offset {offset}.") from exc
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
    pages_read = 0
    terminal_page_seen = False
    for page in range(1, MAX_PAGES + 1):
        url = f"{ASC_BASE}/wp-json/wc/store/v1/products?per_page={PER_PAGE}&page={page}"
        response = request_with_retry(session, url, headers=HEADERS)
        pages_read += 1
        content_type = response.headers.get("content-type", "").casefold()
        if "json" not in content_type:
            raise RuntimeError(f"ASC Store API returned non-JSON content on page {page}; stopping safely.")
        try:
            batch = response.json()
        except ValueError as exc:
            raise RuntimeError(f"ASC Store API returned invalid JSON on page {page}; crawl incomplete.") from exc
        if not isinstance(batch, list):
            raise RuntimeError(f"ASC Store API returned an unexpected payload on page {page}.")
        if page == 1:
            try:
                total_pages = int(response.headers.get("X-WP-TotalPages", "0")) or None
            except ValueError:
                total_pages = None
        rows.extend(batch)
        if total_pages is not None and page > total_pages:
            raise RuntimeError(f"ASC pagination exceeded supplier-reported total_pages={total_pages}.")
        if total_pages is not None and page == total_pages:
            terminal_page_seen = True
            break
        if not batch or len(batch) < PER_PAGE:
            if total_pages is not None and page < total_pages:
                raise RuntimeError(
                    f"ASC crawl incomplete: page {page} returned {len(batch)} rows but API reports {total_pages} pages."
                )
            terminal_page_seen = True
            break
        time.sleep(REQUEST_PACING_SECONDS)
    else:
        raise RuntimeError(f"ASC pagination exceeded safety limit of {MAX_PAGES} pages; crawl incomplete.")
    if not terminal_page_seen:
        raise RuntimeError("ASC crawl ended without a verified terminal page; no ledger or SQL proposal will be generated.")
    if total_pages is not None and pages_read != total_pages:
        raise RuntimeError(f"ASC crawl incomplete: read {pages_read} pages, API reported {total_pages}.")
    return rows, total_pages, pages_read

def normalize_name(value):
    value = html.unescape(clean_text(value)).casefold()
    return " ".join(re.sub(r"[^a-z0-9]+", " ", value).split())

def name_metrics(supplier_name, store_name):
    a, b = normalize_name(supplier_name), normalize_name(store_name)
    ratio = SequenceMatcher(None, a, b).ratio()
    aa, bb = set(a.split()), set(b.split())
    overlap = len(aa & bb) / max(1, len(aa | bb))
    return ratio, overlap

def self_test():
    discontinued = {"name": "SPANNER SET DISCONTINUED", "description": "", "is_in_stock": True}
    out_of_stock = {"name": "SPANNER SET", "description": "", "is_in_stock": False}
    available = {"name": "SPANNER SET", "description": "", "is_in_stock": True}
    assert candidate_status(discontinued)[0] == "DEACTIVATE_CANDIDATE"
    assert candidate_status(out_of_stock)[0] == "SET_STOCK_ZERO_CANDIDATE"
    assert candidate_status(available)[0] == "NO_CHANGE"
    good_ratio, good_overlap = name_metrics("Spanner Set 13mm", "13mm Spanner Set")
    bad_ratio, bad_overlap = name_metrics("F Series Nails F30 5000", "O-Ring 5000pce F30 Series")
    assert good_ratio >= 0.42 and good_overlap >= 0.30
    assert bad_ratio < 0.42 or bad_overlap < 0.30
    print("PASS supplier status classification")
    print("PASS exact-name review guard")
    return 0

def main():
    session = requests.Session()
    session.headers.update(HEADERS)
    store_rows = fetch_store_products(session)
    asc_rows, asc_pages, asc_pages_read = fetch_asc_products(session)

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
            row = make_row(supplier, matches[0], action, "MATCHED_CANDIDATE", reason)
            report.append(row)
            counts[action] += 1
            counts[row["identity_review"]] += 1

    fields = [
        "checked_at_utc", "supplier_sku", "supplier_name", "supplier_stock_status",
        "supplier_stock_quantity", "supplier_is_in_stock", "supplier_url", "store_product_id",
        "store_public_sku", "store_name", "store_active", "store_stock_quantity",
        "name_similarity", "token_overlap", "identity_review", "proposed_action", "match_status", "reason",
    ]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    csv_path = OUT.with_suffix(".csv")
    summary_path = OUT.with_suffix(".summary.json")
    sql_path = OUT.with_suffix(".patch-proposal.sql")
    with csv_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(report)

    review_ready = [row for row in report if row["match_status"] == "MATCHED_CANDIDATE" and row["identity_review"] == "REVIEW_READY_NOT_APPROVED"]
    manual_review = [row for row in report if row["match_status"] == "MATCHED_CANDIDATE" and row["identity_review"] == "MANUAL_IDENTITY_REVIEW"]
    with sql_path.open("w", encoding="utf-8") as handle:
        handle.write("-- GET WIRED AUTOWORX / ASC STATUS CLEANUP PATCH PROPOSAL\n")
        handle.write("-- Generated from read-only public ASC Store API + active store products.\n")
        handle.write("-- REVIEW ONLY: every UPDATE statement is commented out; nothing is applied.\n")
        handle.write(f"-- Exact-SKU matched candidates: {sum(1 for row in report if row['match_status'] == 'MATCHED_CANDIDATE')}; name review required: {len(manual_review)}; similarity screen passed but still needs approval: {len(review_ready)}.\n")
        handle.write("-- ASC stock_status/stock_quantity may be unavailable; verify supplier page before any update.\n")
        handle.write("-- Discontinued title: deactivate + zero stock. Out of stock: zero stock only, keep active for possible restock.\n")
        handle.write("-- WHERE guards exact product ID, supplier SKU, active state and the stock value observed at audit time.\n\n")
        for row in review_ready:
            pid = str(row["store_product_id"]).replace("'", "''")
            sku = str(row["supplier_sku"]).replace("'", "''")
            try:
                observed_stock = int(float(row["store_stock_quantity"] or 0))
            except (TypeError, ValueError):
                continue
            if not re.fullmatch(r"[0-9a-f-]{36}", pid, re.I):
                continue
            if row["proposed_action"] == "DEACTIVATE_CANDIDATE":
                statement = f"UPDATE public.products SET active = false, stock_quantity = 0, updated_at = now() WHERE id = '{pid}'::uuid AND sku = '{sku}' AND active IS TRUE AND stock_quantity = {observed_stock};"
            else:
                statement = f"UPDATE public.products SET stock_quantity = 0, updated_at = now() WHERE id = '{pid}'::uuid AND sku = '{sku}' AND active IS TRUE AND stock_quantity = {observed_stock};"
            handle.write(f"-- {row['proposed_action']} | {sku} | {row['store_public_sku']} | {row['store_name']}\n")
            handle.write("-- " + statement + "\n")

    stock_snapshot = defaultdict(int)
    for row in report:
        if row["match_status"] == "MATCHED_CANDIDATE":
            stock_snapshot[str(row["store_stock_quantity"])] += 1
    summary = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "source": ASC_BASE + "/wp-json/wc/store/v1/products",
        "asc_products_read": len(asc_rows),
        "asc_pages_reported": asc_pages,
        "asc_pages_read": asc_pages_read,
        "asc_crawl_complete": True,
        "retry_policy": {"max_attempts_per_request": MAX_RETRIES + 1, "backoff": "bounded exponential, max 8 seconds", "timeout_seconds": list(TIMEOUT)},
        "active_store_products_read": len(store_rows),
        "candidate_rows": len(report),
        "matched_candidates": sum(1 for row in report if row["match_status"] == "MATCHED_CANDIDATE"),
        "name_review_required": len(manual_review),
        "review_ready_not_approved": len(review_ready),
        "matched_store_stock_quantity_snapshot": dict(sorted(stock_snapshot.items())),
        "counts": dict(sorted(counts.items())),
        "mode": "READ_ONLY_NO_DATABASE_WRITES",
        "matching_rule": "exact normalized supplier SKU only; product-name similarity is a review guard, not an identity match",
        "warning": "No live changes are applied. Every candidate requires manual supplier-page/SKU verification and approval.",
    }
    summary_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("ASC_STATUS_AUDIT_SUMMARY=" + json.dumps(summary, sort_keys=True))
    print("CSV_REPORT=" + str(csv_path))
    print("JSON_SUMMARY=" + str(summary_path))
    print("PATCH_PROPOSAL=" + str(sql_path))
    return 0

def make_row(supplier, store, action, match_status, reason):
    checked = datetime.now(timezone.utc).isoformat()
    supplier_name = clean_text(supplier.get("name"))
    store_name = clean_text((store or {}).get("name", ""))
    ratio, overlap = name_metrics(supplier_name, store_name) if store else (None, None)
    identity_review = ""
    if store:
        identity_review = "MANUAL_IDENTITY_REVIEW" if ratio < 0.42 or overlap < 0.30 else "REVIEW_READY_NOT_APPROVED"
        if identity_review == "MANUAL_IDENTITY_REVIEW":
            reason += " Product-name similarity is low; manually confirm item identity before any action."
    return {
        "checked_at_utc": checked,
        "supplier_sku": clean_text(supplier.get("sku")),
        "supplier_name": supplier_name,
        "supplier_stock_status": clean_text(supplier.get("stock_status")),
        "supplier_stock_quantity": "" if supplier.get("stock_quantity") is None else supplier.get("stock_quantity"),
        "supplier_is_in_stock": "" if supplier.get("is_in_stock") is None else str(supplier.get("is_in_stock")).lower(),
        "supplier_url": clean_text(supplier.get("permalink")),
        "store_product_id": (store or {}).get("id", ""),
        "store_public_sku": (store or {}).get("public_sku", ""),
        "store_name": store_name,
        "store_active": (store or {}).get("active", ""),
        "store_stock_quantity": (store or {}).get("stock_quantity", ""),
        "name_similarity": "" if ratio is None else f"{ratio:.3f}",
        "token_overlap": "" if overlap is None else f"{overlap:.3f}",
        "identity_review": identity_review,
        "proposed_action": action,
        "match_status": match_status,
        "reason": reason,
    }

if __name__ == "__main__":
    try:
        raise SystemExit(self_test() if "--self-test" in sys.argv else main())
    except Exception as exc:
        print("ASC_STATUS_AUDIT_FAILED=" + str(exc), file=sys.stderr)
        raise SystemExit(1)
