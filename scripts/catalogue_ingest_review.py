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
def exact_value(headers, row, header_name):
    wanted = norm(header_name)
    for i, h in enumerate(headers):
        if norm(h) == wanted and i < len(row) and row[i] not in (None, ""):
            return str(row[i]).strip()
    return ""
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
            header_candidates = nonblank[:12]
            header_row_num, headers = max(header_candidates, key=lambda item: sum(bool(re.search(r"sku|code|model|product|description|item|price|rrp|dealer|brand|qty|stock|type|size", norm(v))) for v in item[1] if v is not None))
            header_score = sum(bool(re.search(r"sku|code|model|product|description|item|price|rrp|dealer|brand|qty|stock|type|size", norm(v))) for v in headers if v is not None)
            if header_score < 2:
                header_row_num, headers = nonblank[0]
            header_names = [str(v).strip() if v is not None else f"column_{i+1}" for i, v in enumerate(headers)]
            data_count = 0
            for row_num, values in nonblank:
                if ws.title.strip().lower() != "products" or row_num <= header_row_num:
                    continue
                vals = list(values)
                if not any(v not in (None, "") for v in vals):
                    continue
                sku, sku_h = pick(header_names, vals, [r"\bsku\b", r"supplier code", r"product code", r"item code", r"part number", r"\bcode\b"])
                model, model_h = pick(header_names, vals, [r"\bmodel\b", r"model no", r"manufacturer part", r"mpn"])
                desc, desc_h = pick(header_names, vals, [r"product description", r"item description", r"description", r"product name", r"item name"])
                price, price_h = pick(header_names, vals, [r"retail price incl", r"rrp incl", r"\brrp\b", r"retail price", r"dealer price", r"selling price", r"\bprice\b", r"\bcost\b"])
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
                    "dealer_price_excl": exact_value(header_names, vals, "Dealer Price (Excl)"),
                    "retail_price_excl": exact_value(header_names, vals, "Retail Price (Excl)"),
                    "retail_price_incl": exact_value(header_names, vals, "Retail Price (Incl)"),
                    "stock_jhb": exact_value(header_names, vals, "JHB Stock"),
                    "stock_dbn": exact_value(header_names, vals, "DBN Stock"),
                    "stock_cpt": exact_value(header_names, vals, "CPT Stock"),
                    "raw_cells_json": json.dumps(mapped, ensure_ascii=False, separators=(",", ":"))
                })
                data_count += 1
            book_info["sheets"].append({"sheet": ws.title, "nonblank_rows": len(nonblank), "header_row": header_row_num, "candidate_product_rows": data_count, "headers": header_names})
        inventory.append(book_info)
        wb.close()
    except Exception as exc:
        inventory.append({"file": str(path), "size_bytes": path.stat().st_size, "error": repr(exc)})
fields = ["source_file","sheet","row_number","supplier_sku_candidate","supplier_sku_header","manufacturer_model_candidate","model_header","description_candidate","description_header","brand_candidate","brand_header","price_value_raw","price_header","dealer_price_excl","retail_price_excl","retail_price_incl","stock_jhb","stock_dbn","stock_cpt","raw_cells_json"]
legacy = OUT / "planetworld-rows-review.csv"
if legacy.exists():
    legacy.unlink()
chunk_dir = OUT / "planetworld-row-chunks"
if chunk_dir.exists():
    for old in chunk_dir.glob("*.csv"):
        old.unlink()
chunk_dir.mkdir(exist_ok=True)
chunk_size = 500
for start in range(0, len(rows), chunk_size):
    chunk = rows[start:start + chunk_size]
    target = chunk_dir / f"planetworld-rows-{start // chunk_size + 1:02d}.csv"
    with target.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(chunk)
(OUT / "planetworld-workbook-inventory.json").write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding="utf-8")
pdf_rows = []
pdf_image_map = []
try:
    import fitz
except Exception as exc:
    fitz = None
    pdf_import_error = repr(exc)
else:
    pdf_import_error = ""
pdfs = sorted((ROOT / "suppliers/Audio Connections").glob("*.pdf"))
pdf_image_dir = OUT / "audio-connections-page-images"
pdf_image_dir.mkdir(exist_ok=True)
pdf_extracted_dir = OUT / "audio-connections-extracted-images"
pdf_extracted_dir.mkdir(exist_ok=True)
for path in pdfs:
    if fitz is None:
        pdf_rows.append({"source_file": str(path), "page_number": 0, "page_text": "PYMUPDF_IMPORT_ERROR: " + pdf_import_error})
        continue
    try:
        doc = fitz.open(path)
        for i, page in enumerate(doc, start=1):
            pdf_rows.append({"source_file": str(path), "page_number": i, "page_text": page.get_text("text").strip()})
            pix = page.get_pixmap(matrix=fitz.Matrix(1.25, 1.25), alpha=False)
            safe_name = re.sub(r"[^a-zA-Z0-9]+", "-", path.stem).strip("-").lower()
            pix.save(pdf_image_dir / f"{safe_name}-page-{i:02d}.png")
            page_dict = page.get_text("dict")
            text_spans = []
            for block in page_dict.get("blocks", []):
                for line in block.get("lines", []):
                    for span in line.get("spans", []):
                        text = str(span.get("text", "")).strip()
                        if text:
                            bbox = span.get("bbox", [0,0,0,0])
                            text_spans.append({"text": text, "bbox": bbox})
            for image_index, image_info in enumerate(page.get_images(full=True), start=1):
                xref = image_info[0]
                try:
                    extracted = doc.extract_image(xref)
                    ext = extracted.get("ext", "bin")
                    image_name = f"{safe_name}-page-{i:02d}-image-{image_index:02d}-xref-{xref}.{ext}"
                    (pdf_extracted_dir / image_name).write_bytes(extracted["image"])
                    rects = page.get_image_rects(xref)
                    mapped_labels = []
                    for rect in rects:
                        cy = (rect.y0 + rect.y1) / 2
                        near = [sp for sp in text_spans if sp["bbox"][0] < 150 and abs(((sp["bbox"][1]+sp["bbox"][3])/2)-cy) < 22]
                        near.sort(key=lambda sp: sp["bbox"][0])
                        mapped_labels.append({"rect": [rect.x0,rect.y0,rect.x1,rect.y1], "left_column_text": " ".join(sp["text"] for sp in near)})
                    pdf_image_map.append({
                        "source_file": str(path), "page_number": i, "image_file": str(pdf_extracted_dir / image_name),
                        "xref": xref, "width": extracted.get("width"), "height": extracted.get("height"),
                        "extension": ext, "byte_length": len(extracted["image"]),
                        "row_label_candidates_json": json.dumps(mapped_labels, ensure_ascii=False)
                    })
                except Exception as image_exc:
                    pdf_image_map.append({"source_file": str(path), "page_number": i, "xref": xref, "error": repr(image_exc)})
        doc.close()
    except Exception as exc:
        pdf_rows.append({"source_file": str(path), "page_number": 0, "page_text": "EXTRACTION_ERROR: " + repr(exc)})
with (OUT / "audio-connections-pages-review.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["source_file","page_number","page_text"]); w.writeheader(); w.writerows(pdf_rows)
with (OUT / "audio-connections-image-map-review.csv").open("w", newline="", encoding="utf-8-sig") as f:
    image_fields = ["source_file","page_number","image_file","xref","width","height","extension","byte_length","row_label_candidates_json","error"]
    w = csv.DictWriter(f, fieldnames=image_fields); w.writeheader(); w.writerows(pdf_image_map)
summary = {
    "planetworld_workbooks_found": len(workbooks),
    "planetworld_workbooks_opened": sum("sheets" in x for x in inventory),
    "planetworld_workbook_errors": [x for x in inventory if "error" in x],
    "planetworld_sheets": sum(len(x.get("sheets", [])) for x in inventory),
    "planetworld_product_rows": len(rows),
    "planetworld_product_rows_csv_chunks": (len(rows) + chunk_size - 1) // chunk_size,
    "audio_connections_pdfs_found": len(pdfs),
    "audio_connections_pages_extracted": len(pdf_rows),
    "audio_connections_pages_with_text": sum(bool(x["page_text"]) and not x["page_text"].startswith(("EXTRACTION_ERROR:", "PYMUPDF_IMPORT_ERROR:")) for x in pdf_rows),
    "audio_connections_embedded_images_extracted": sum("image_file" in x for x in pdf_image_map),
    "audio_connections_image_map_errors": [x for x in pdf_image_map if "error" in x],
    "important_limit": "Raw source extraction only. No product identity, duplicate, image, GW SKU, category, price validity, stock or customer-facing listing is approved by this report."
}
(OUT / "extraction-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
(OUT / "README.md").write_text(
    "# Supplier source extraction — review only\n\n"
    "Generated from the tracked Planetworld XLSX files and Audio Connections PDFs on the review branch. "
    "Planetworld product rows are split into small CSV chunks; source file, worksheet and row provenance are retained. "
    "Candidate fields are heuristic column picks only; the complete row is preserved. "
    "Only Products sheets are treated as product rows; workbook metadata sheets remain in the inventory. "
    "No product matches, GW SKUs, images, prices, stock or imports are approved.\n",
    encoding="utf-8"
)
print(json.dumps(summary, ensure_ascii=False))
