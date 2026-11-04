#!/usr/bin/env python3
"""Join the 137 fitment review candidates to exact Planetworld XLSX sheet/row provenance.

Read-only: consumes the existing workbook audit output and the review CSV. It never
changes supplier source workbooks or catalogue/live data.
"""
import csv
import re
from pathlib import Path

ROOT = Path(".")
FITMENT = ROOT / "catalogue-review/PLANETWORLD_FITMENT_137_CANDIDATE_AUDIT_2026-11-04.csv"
ROWS = ROOT / "planetworld-audit-output/product_rows_review_only.csv"
OUT = ROOT / "planetworld-audit-output/fitment_137_source_row_join_review_only.csv"

def norm(value):
    return re.sub(r"[^a-z0-9]+", " ", str(value or "").strip().lower()).strip()

with FITMENT.open(encoding="utf-8-sig", newline="") as f:
    candidates = list(csv.DictReader(f))
with ROWS.open(encoding="utf-8-sig", newline="") as f:
    source_rows = list(csv.DictReader(f))

joined = []
for c in candidates:
    source_file = c["source_workbook"]
    sku_options = [x.strip() for x in (c.get("candidate_supplier_skus_if_ambiguous") or c.get("matched_supplier_sku") or "").split(";") if x.strip()]
    if not sku_options:
        sku_options = [c.get("matched_supplier_sku", "").strip()]
    matches = []
    for sku in sku_options:
        for r in source_rows:
            if r["source_file"] == source_file and norm(r["model_or_sku"]) == norm(sku):
                matches.append((sku, r))
    # Deduplicate only identical file/sheet/row hits.
    unique = {}
    for sku, r in matches:
        unique[(r["source_file"], r["sheet"], r["source_row"])] = (sku, r)
    hits = list(unique.values())
    status = "UNIQUE_EXACT_SKU_SOURCE_ROW" if len(hits) == 1 else ("MULTIPLE_EXACT_SKU_SOURCE_ROWS_REVIEW" if len(hits) > 1 else "NO_EXACT_SKU_SOURCE_ROW")
    if len(sku_options) > 1 and len(hits) > 1:
        status = "AMBIGUOUS_VARIANT_SOURCE_ROWS_OWNER_OR_SUPPLIER_CONFIRMATION"
    for sku, r in hits:
        joined.append({
            "preview_record_id": c["preview_record_id"],
            "source_title_preserved": c["source_title_preserved"],
            "source_workbook": source_file,
            "candidate_supplier_sku": sku,
            "source_sheet": r["sheet"],
            "source_row": r["source_row"],
            "workbook_model_or_sku": r["model_or_sku"],
            "workbook_description": r["description"],
            "source_division": r["supplier_division_source_value"],
            "source_component_guess_review_only": r["component_guess_review_only"],
            "join_status": status,
            "candidate_group": c["candidate_group"],
            "fitment_evidence_status": "NOT_VERIFIED",
        })
    if not hits:
        joined.append({
            "preview_record_id": c["preview_record_id"],
            "source_title_preserved": c["source_title_preserved"],
            "source_workbook": source_file,
            "candidate_supplier_sku": ";".join(sku_options),
            "source_sheet": "",
            "source_row": "",
            "workbook_model_or_sku": "",
            "workbook_description": "",
            "source_division": "",
            "source_component_guess_review_only": "",
            "join_status": status,
            "candidate_group": c["candidate_group"],
            "fitment_evidence_status": "NOT_VERIFIED",
        })

fields = ["preview_record_id","source_title_preserved","source_workbook","candidate_supplier_sku","source_sheet","source_row","workbook_model_or_sku","workbook_description","source_division","source_component_guess_review_only","join_status","candidate_group","fitment_evidence_status"]
OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open("w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=fields)
    w.writeheader()
    w.writerows(joined)

ids = {c["preview_record_id"] for c in candidates}
matched_ids = {r["preview_record_id"] for r in joined}
unique_ids = {r["preview_record_id"] for r in joined if r["join_status"] == "UNIQUE_EXACT_SKU_SOURCE_ROW"}
print(f"FITMENT_SOURCE_ROW_JOIN candidates={len(candidates)} output_rows={len(joined)} unique_ids={len(unique_ids)} no_or_ambiguous={len(ids-unique_ids)}")
print(f"FITMENT_SOURCE_ROW_JOIN_OUTPUT={OUT}")
if len(candidates) != 137 or matched_ids != ids:
    raise SystemExit("Fitment join did not preserve all 137 candidate IDs")
