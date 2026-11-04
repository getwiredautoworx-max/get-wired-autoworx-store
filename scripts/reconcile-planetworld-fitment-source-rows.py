#!/usr/bin/env python3
"""Read-only exact supplier SKU to original Planetworld workbook row reconciliation."""
import csv
import re
import sys
from collections import defaultdict
from pathlib import Path
from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "catalogue-review/PLANETWORLD_FITMENT_137_CANDIDATE_AUDIT_2026-11-04.csv"
OUTPUT = ROOT / "catalogue-review/PLANETWORLD_FITMENT_SOURCE_ROW_RECONCILIATION_2026-11-04.csv"

def norm(value):
    return re.sub(r"[^A-Z0-9]", "", str(value or "").upper())

with INPUT.open(newline="", encoding="utf-8-sig") as handle:
    candidates = list(csv.DictReader(handle))

workbook_cache = {}
results = []
missing_workbooks = []

for candidate in candidates:
    source_path = (candidate.get("source_workbook") or "").strip()
    workbook_path = ROOT / source_path
    if not source_path or not workbook_path.is_file():
        missing_workbooks.append(source_path or candidate.get("preview_record_id", ""))
        continue

    if source_path not in workbook_cache:
        wb = load_workbook(workbook_path, read_only=True, data_only=True)
        sheets = []
        for ws in wb.worksheets:
            header_row = None
            code_col = None
            name_col = None
            for row_number, row in enumerate(ws.iter_rows(min_row=1, max_row=min(ws.max_row, 12), values_only=True), start=1):
                headers = {norm(value): index for index, value in enumerate(row) if value is not None}
                if "ITEMCODE" in headers and "ITEMNAME" in headers:
                    header_row = row_number
                    code_col = headers["ITEMCODE"]
                    name_col = headers["ITEMNAME"]
                    break
            if header_row:
                sheets.append((ws, header_row, code_col, name_col))
        workbook_cache[source_path] = sheets

    candidate_codes = []
    primary = (candidate.get("matched_supplier_sku") or "").strip()
    if primary:
        candidate_codes.append(primary)
    alternatives = (candidate.get("candidate_supplier_skus_if_ambiguous") or "").strip()
    if alternatives:
        candidate_codes.extend(part.strip() for part in alternatives.split(";") if part.strip())
    candidate_codes = list(dict.fromkeys(candidate_codes))
    code_norms = {norm(code): code for code in candidate_codes}
    matches = []

    for ws, header_row, code_col, name_col in workbook_cache[source_path]:
        for row_number, row in enumerate(ws.iter_rows(min_row=header_row + 1, values_only=True), start=header_row + 1):
            if max(code_col, name_col) >= len(row):
                continue
            code_value = row[code_col]
            name_value = row[name_col]
            code_key = norm(code_value)
            if code_key and code_key in code_norms:
                matches.append({
                    "candidate_supplier_sku": code_norms[code_key],
                    "sheet": ws.title,
                    "source_row": row_number,
                    "workbook_item_code": str(code_value or ""),
                    "workbook_item_name": str(name_value or ""),
                    "match_basis": "EXACT_ITEM_CODE",
                })

    record_id = candidate.get("preview_record_id", "")
    if not matches:
        results.append({
            "preview_record_id": record_id,
            "source_workbook": source_path,
            "candidate_supplier_sku": "; ".join(candidate_codes),
            "sheet": "",
            "source_row": "",
            "workbook_item_code": "",
            "workbook_item_name": "",
            "match_basis": "NO_EXACT_ITEM_CODE_ROW_FOUND",
            "record_resolution": "HOLD_NO_SOURCE_ROW_MATCH",
        })
    else:
        distinct = {(m["candidate_supplier_sku"], m["sheet"], m["source_row"]) for m in matches}
        resolution = "UNIQUE_CODE_AND_SOURCE_ROW" if len(candidate_codes) == 1 and len(distinct) == 1 else "MULTIPLE_CANDIDATE_ROWS_RETAINED"
        for match in matches:
            results.append({
                "preview_record_id": record_id,
                "source_workbook": source_path,
                **match,
                "record_resolution": resolution,
            })

fieldnames = [
    "preview_record_id", "source_workbook", "candidate_supplier_sku", "sheet",
    "source_row", "workbook_item_code", "workbook_item_name", "match_basis", "record_resolution"
]
with OUTPUT.open("w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(results)

unique_records = {r["preview_record_id"] for r in results if r["record_resolution"] == "UNIQUE_CODE_AND_SOURCE_ROW"}
held_records = {r["preview_record_id"] for r in results if r["record_resolution"] != "UNIQUE_CODE_AND_SOURCE_ROW"}
print("PLANETWORLD_FITMENT_SOURCE_ROW_AUDIT")
print(f"candidate_records={len(candidates)}")
print(f"unique_code_and_source_row={len(unique_records)}")
print(f"held_or_multiple_matches={len(held_records)}")
print(f"missing_workbooks={len(missing_workbooks)}")
print(f"report={OUTPUT.relative_to(ROOT)}")
if missing_workbooks:
    print("MISSING_WORKBOOKS=" + ";".join(sorted(set(missing_workbooks))))
    sys.exit(1)
if len(candidates) != 137:
    print("ERROR: expected 137 candidate records; source audit input changed.")
    sys.exit(1)
