#!/usr/bin/env python3
"""Enrich a raw ASC audit CSV into a manual-review queue and commented SQL proposal.

Offline only: does not connect to ASC, Supabase, or any other network service.
The SQL file is deliberately commented out and must be reviewed before use.
"""
from __future__ import annotations

import argparse
import csv
import html
import json
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path

def normalize(value: str) -> str:
    value = html.unescape(str(value or "")).casefold()
    return " ".join(re.sub(r"[^a-z0-9]+", " ", value).split())

def metrics(supplier_name: str, store_name: str) -> tuple[float, float]:
    a, b = normalize(supplier_name), normalize(store_name)
    ratio = SequenceMatcher(None, a, b).ratio()
    aa, bb = set(a.split()), set(b.split())
    overlap = len(aa & bb) / max(1, len(aa | bb))
    return ratio, overlap

def enrich(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    result = []
    for raw in rows:
        row = dict(raw)
        if row.get("match_status") == "MATCHED_CANDIDATE":
            ratio, overlap = metrics(row.get("supplier_name", ""), row.get("store_name", ""))
            review = "MANUAL_IDENTITY_REVIEW" if ratio < 0.42 or overlap < 0.30 else "REVIEW_READY_NOT_APPROVED"
            row["name_similarity"] = f"{ratio:.3f}"
            row["token_overlap"] = f"{overlap:.3f}"
            row["identity_review"] = review
            if review == "MANUAL_IDENTITY_REVIEW":
                row["reason"] = (row.get("reason", "") + " Low supplier/store name similarity; manually confirm exact item identity before any change.").strip()
            if row.get("proposed_action") == "SET_STOCK_ZERO_CANDIDATE":
                row["supplier_stock_evidence"] = (
                    "The raw CSV does not contain the is_in_stock field; the audit classifier marked this item out of stock. "
                    "Verify the current supplier product page before approval."
                )
                row["recommended_change_if_approved"] = "Set store stock_quantity=0; leave active=true so the item can return after restock."
            elif row.get("proposed_action") == "DEACTIVATE_CANDIDATE":
                row["supplier_stock_evidence"] = (
                    "Supplier title/description contains discontinued/end-of-line wording. Supplier stock quantity was not present in the raw CSV."
                )
                row["recommended_change_if_approved"] = "If the exact item is confirmed, set active=false and stock_quantity=0."
            else:
                row["supplier_stock_evidence"] = "No supplier status evidence recorded."
                row["recommended_change_if_approved"] = "No change."
        else:
            row["name_similarity"] = ""
            row["token_overlap"] = ""
            row["identity_review"] = "NOT_IN_ACTIVE_STORE_OR_BLOCKED"
            row["supplier_stock_evidence"] = "No active store product matched this supplier SKU exactly."
            row["recommended_change_if_approved"] = "No store action."
        result.append(row)
    return result

def make_patch(rows: list[dict[str, str]]) -> str:
    ready = [r for r in rows if r.get("match_status") == "MATCHED_CANDIDATE" and r.get("identity_review") == "REVIEW_READY_NOT_APPROVED"]
    lines = [
        "-- GET WIRED AUTOWORX / ASC STATUS CLEANUP PATCH PROPOSAL",
        "-- Generated from a read-only supplier audit. Review only; every UPDATE is commented out.",
        "-- Do not uncomment or execute any statement until the exact product/SKU and current supplier status are manually verified.",
        f"-- Candidate statements after name-similarity screening: {len(ready)} (not owner-approved).",
        "-- Discontinued/end-of-line: deactivate + zero stock. Out of stock: zero stock only; keep active for possible restock.",
        "-- WHERE guards exact product ID, supplier SKU, active state and the store stock quantity seen in the audit.",
        "",
    ]
    for r in ready:
        pid = str(r.get("store_product_id", ""))
        sku = str(r.get("supplier_sku", "")).replace("'", "''")
        try:
            observed = int(float(r.get("store_stock_quantity", "") or 0))
        except (TypeError, ValueError):
            continue
        if not re.fullmatch(r"[0-9a-f-]{36}", pid, re.I):
            continue
        if r.get("proposed_action") == "DEACTIVATE_CANDIDATE":
            sql = f"UPDATE public.products SET active = false, stock_quantity = 0, updated_at = now() WHERE id = '{pid}'::uuid AND sku = '{sku}' AND active IS TRUE AND stock_quantity = {observed};"
        elif r.get("proposed_action") == "SET_STOCK_ZERO_CANDIDATE":
            sql = f"UPDATE public.products SET stock_quantity = 0, updated_at = now() WHERE id = '{pid}'::uuid AND sku = '{sku}' AND active IS TRUE AND stock_quantity = {observed};"
        else:
            continue
        lines.append(f"-- {r.get('proposed_action')} | {sku} | {r.get('store_public_sku','')} | {r.get('store_name','')}")
        lines.append("-- " + sql)
    return "\n".join(lines) + "\n"

def write_report(rows: list[dict[str, str]], out_prefix: Path) -> dict:
    out_prefix.parent.mkdir(parents=True, exist_ok=True)
    csv_path = out_prefix.with_suffix(".csv")
    summary_path = out_prefix.with_suffix(".summary.json")
    sql_path = out_prefix.with_suffix(".patch-proposal.sql")
    fields = [
        "checked_at_utc", "supplier_sku", "supplier_name", "supplier_stock_status",
        "supplier_stock_quantity", "supplier_url", "store_product_id", "store_public_sku",
        "store_name", "store_active", "store_stock_quantity", "proposed_action",
        "match_status", "name_similarity", "token_overlap", "identity_review",
        "supplier_stock_evidence", "recommended_change_if_approved", "reason",
    ]
    with csv_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)
    sql_path.write_text(make_patch(rows), encoding="utf-8")
    matched = [r for r in rows if r.get("match_status") == "MATCHED_CANDIDATE"]
    summary = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "source_audit_rows": len(rows),
        "matched_exact_sku_candidates": len(matched),
        "proposed_deactivate_candidates": sum(r.get("proposed_action") == "DEACTIVATE_CANDIDATE" for r in matched),
        "proposed_stock_zero_candidates": sum(r.get("proposed_action") == "SET_STOCK_ZERO_CANDIDATE" for r in matched),
        "manual_identity_review_required": sum(r.get("identity_review") == "MANUAL_IDENTITY_REVIEW" for r in matched),
        "review_ready_but_not_approved": sum(r.get("identity_review") == "REVIEW_READY_NOT_APPROVED" for r in matched),
        "store_stock_quantity_snapshot": dict(Counter(r.get("store_stock_quantity", "") for r in matched)),
        "mode": "OFFLINE_REVIEW_ONLY_NO_DATABASE_WRITES",
        "warning": "Similarity is only a review guard. No product action is approved or applied.",
    }
    summary_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("REVIEW_SUMMARY=" + json.dumps(summary, sort_keys=True))
    print("CSV_REPORT=" + str(csv_path))
    print("JSON_SUMMARY=" + str(summary_path))
    print("PATCH_PROPOSAL=" + str(sql_path))
    return summary

def self_test() -> int:
    sample = [
        {"supplier_sku":"A1","supplier_name":"SPANNER SET 13MM DISCONTINUED","store_name":"13mm Spanner Set","store_product_id":"11111111-1111-4111-8111-111111111111","store_public_sku":"GW-AAAA0001","store_stock_quantity":"5","proposed_action":"DEACTIVATE_CANDIDATE","match_status":"MATCHED_CANDIDATE","checked_at_utc":"2026-10-20","reason":"discontinued"},
        {"supplier_sku":"A2","supplier_name":"F SERIES NAILS F30 5000","store_name":"O-Ring 5000pce F30 Series","store_product_id":"22222222-2222-4222-8222-222222222222","store_public_sku":"GW-AAAA0002","store_stock_quantity":"5","proposed_action":"SET_STOCK_ZERO_CANDIDATE","match_status":"MATCHED_CANDIDATE","checked_at_utc":"2026-10-20","reason":"out of stock"},
    ]
    rows = enrich(sample)
    assert rows[0]["identity_review"] == "REVIEW_READY_NOT_APPROVED"
    assert rows[1]["identity_review"] == "MANUAL_IDENTITY_REVIEW"
    patch = make_patch(rows)
    assert "UPDATE public.products" in patch and "\n-- UPDATE public.products" in patch
    assert not any(line.startswith("UPDATE public.products") for line in patch.splitlines())
    print("PASS offline name-identity review")
    print("PASS SQL proposal is commented out by default")
    return 0

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, help="Raw asc_live_status_audit.csv from the workflow artifact")
    parser.add_argument("--out", type=Path, default=Path("reports/asc_status_review_queue"), help="Output file prefix")
    parser.add_argument("--self-test", action="store_true", help="Run offline synthetic tests")
    args = parser.parse_args()
    if args.self_test:
        return self_test()
    if not args.input or not args.input.is_file():
        parser.error("--input must point to an existing raw audit CSV")
    with args.input.open("r", encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    write_report(enrich(rows), args.out)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
