#!/usr/bin/env python3
"""Read-only supplier source extraction. Never writes storefront/database data."""
from __future__ import annotations
import csv, json, re
from pathlib import Path
from openpyxl import load_workbook

ROOT = Path(".")
OUT = ROOT / "catalogue-review"
OUT.mkdir(parents=True, exist_ok=True)

def norm(value):
    return re.sub(r"[^a-z0-9]+", " ", str(value or "").strip().lower()).strip()

def pick(headers, row, patterns):
    for i, h in enumerate(headers):
        nh = norm(h)
        if nh and any(re.search(p, nh) for p in patterns):
            if i < len(row) and row[i] not in (None, ""):
                return str(row[i]).strip(), str(h).strip()
    return "", ""

workbooks = sorted((ROOT / "catalogue-source/suppliers/planetworld/incoming-xlsx").glob("*.xlsx"))
inventory, rows = [], []
for path in workbooks:
    try:
        wb = load_workbook(path, read_only=True, data_only=True)
        book_info = {"file": str(path), "size_bytes": path.stat().st_size, "sheets": []}
        for ws in wb.worksheets:
            raw = list(ws.iter_rows(values_only=True))
            nonblank = [(i+1, tuple(r)) for i, r in enumerate(raw) if any(v not in (None, "") for v in r)]
            if not nonblank:
                book_info["sheets"].append({"sheet": ws.title, "nonblank_rows": 0, "header_row": None})
                continue
            # Detect the most header-like row in the first 12 nonblank rows.
            header_candidates = nonblank[:12]
            header_row_num, headers = max(
                header_candidates,
                key=lambda item: sum(bool(re.search(r"sku|code|model|product|description|item|price|rrp|dealer|brand|qty|stock|type|size", norm(v))) for v in item[1] if v is not None)
            )
            header_score = sum(bool(re.search(r"sku|code|model|product|description|item|price|rrp|dealer|brand|qty|stock|type|size", norm(v))) for v in headers if v is not None)
            if header_score < 2:
                header_row_num, headers = nonblank[0]
            header_names = [str(v).strip() if v is not None else f"column_{i+1}" for i, v in enumerate(headers)]
            data_count = 0
            for row_num, values in nonblank:
                if row_num <= header_row_num:
                    continue
                vals = list(values)
                if not any(v not in (None, "") for v in vals):
                    continue
                sku, sku_h = pick(header_names, vals, [r"\bsku\b", r"supplier code", r"product code", r"item code", r"part number", r"\bcode\b"])
                model, model_h = pick(header_names, vals, [r"\bmodel\b", r"model no", r"manufacturer part", r"mpn"])
                desc, desc_h = pick(header_names, vals, [r"description", r"product name", r"item name", r"\bproduct\b", r"\bitem\b"])
                price, price_h = pick(header_names, vals, [r"\brrp\b", r"retail price", r"dealer price", r"selling price", r"\bprice\b", r"\bcost\b"])
                brand, brand_h = pick(header_names, vals, [r"\bbrand\b", r"\bmake\b", r"manufacturer"])
                mapped = {}
                for i, v in enumerate(vals):
                    if v not in (None, ""):
                        key = header_names[i] if i < len(header_names) else f"column_{i+1}"
                        mapped[key] = str(v).strip()
                rows.append({
                    "source_file": str(path), "sheet": ws.title, "row_number": row_num,
                    "supplier_sku_candidate": sku, "supplier_sku_header": sku_h,
                    "manufacturer_model_candidate": model, "model_header": model_h,
                    "description_candidate": desc, "description_header": desc_h,
                    "brand_candidate": brand, "brand_header": brand_h,
                    "price_value_raw": price, "price_header": price_h,
                    "raw_cells_json": json.dumps(mapped, ensure_ascii=False, separators=(",", ":"))
                })
                data_count += 1
            book_info["sheets"].append({"sheet": ws.title, "nonblank_rows": len(nonblank), "header_row": header_row_num, "candidate_data_rows": data_count, "headers": header_names})
        inventory.append(book_info)
        wb.close()
    except Exception as exc:
        inventory.append({"file": str(path), "size_bytes": path.stat().st_size, "error": repr(exc)})

fields = ["source_file","sheet","row_number","supplier_sku_candidate","supplier_sku_header","manufacturer_model_candidate","model_header","description_candidate","description_header","brand_candidate","brand_header","price_value_raw","price_header","raw_cells_json"]
with (OUT / "planetworld-rows-review.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(rows)
(OUT / "planetworld-workbook-inventory.json").write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding="utf-8")

pdf_rows = []
try:
    import fitz
except Exception as exc:
    fitz = None
    pdf_import_error = repr(exc)
else:
    pdf_import_error = ""
pdfs = sorted((ROOT / "suppliers/Audio Connections").glob("*.pdf"))
for path in pdfs:
    if fitz is None:
        pdf_rows.append({"source_file": str(path), "page_number": 0, "page_text": "PYMUPDF_IMPORT_ERROR: " + pdf_import_error})
        continue
    try:
        doc = fitz.open(path)
        for i, page in enumerate(doc, start=1):
            pdf_rows.append({"source_file": str(path), "page_number": i, "page_text": page.get_text("text").strip()})
        doc.close()
    except Exception as exc:
        pdf_rows.append({"source_file": str(path), "page_number": 0, "page_text": "EXTRACTION_ERROR: " + repr(exc)})
with (OUT / "audio-connections-pages-review.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["source_file","page_number","page_text"]); w.writeheader(); w.writerows(pdf_rows)

summary = {
    "planetworld_workbooks_found": len(workbooks),
    "planetworld_workbooks_opened": sum("sheets" in x for x in inventory),
    "planetworld_workbook_errors": [x for x in inventory if "error" in x],
    "planetworld_sheets": sum(len(x.get("sheets", [])) for x in inventory),
    "planetworld_candidate_rows": len(rows),
    "audio_connections_pdfs_found": len(pdfs),
    "audio_connections_pages_extracted": len(pdf_rows),
    "audio_connections_pages_with_text": sum(bool(x["page_text"]) and not x["page_text"].startswith(("EXTRACTION_ERROR:", "PYMUPDF_IMPORT_ERROR:")) for x in pdf_rows),
    "important_limit": "Raw source extraction only. No product identity, duplicate, image, GW SKU, category, price validity, stock or customer-facing listing is approved by this report."
}
(OUT / "extraction-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
(OUT / "README.md").write_text(
    "# Supplier source extraction — review only\n\n"
    "Generated from the tracked Planetworld XLSX files and Audio Connections PDFs on the review branch. "
    "CSV rows retain source file, worksheet/row or PDF page. Candidate fields are heuristic column picks only; "
    "the complete row/page text is preserved. No product matches, GW SKUs, images, prices, stock or imports are approved.\n",
    encoding="utf-8"
)
print(json.dumps(summary, ensure_ascii=False))
