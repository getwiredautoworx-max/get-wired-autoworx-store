#!/usr/bin/env python3
"""ASC catalogue PDF text/OCR extraction. Review-only; never writes live store data."""
from pathlib import Path
import csv, json, re, subprocess
import fitz

ROOT = Path("suppliers/ASC")
OUT = Path("catalogue-review/asc")
OUT.mkdir(parents=True, exist_ok=True)
rows, inventory = [], []
pdfs = sorted(ROOT.glob("*.pdf"))
for path in pdfs:
    info = {"source_file": path.name, "size_bytes": path.stat().st_size, "pages": 0, "pages_with_text": 0, "ocr_pages": 0, "errors": []}
    try:
        doc = fitz.open(path)
        info["pages"] = len(doc)
        for page_no, page in enumerate(doc, start=1):
            text = page.get_text("text").strip()
            method = "embedded_text"
            if len(re.sub(r"\s+", "", text)) < 35:
                try:
                    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
                    tmp = OUT / "_ocr_page.png"
                    pix.save(tmp)
                    proc = subprocess.run(["tesseract", str(tmp), "stdout", "--psm", "6"], capture_output=True, text=True, timeout=90)
                    if proc.returncode == 0 and len(proc.stdout.strip()) > len(text):
                        text, method = proc.stdout.strip(), "tesseract_ocr"
                    tmp.unlink(missing_ok=True)
                except Exception as exc:
                    info["errors"].append(f"page {page_no} OCR: {exc!r}")
            if text:
                info["pages_with_text"] += 1
            if method == "tesseract_ocr":
                info["ocr_pages"] += 1
            rows.append({"source_file": path.name, "page_number": page_no, "extraction_method": method, "character_count": len(text), "page_text": text})
        doc.close()
    except Exception as exc:
        info["errors"].append(repr(exc))
    inventory.append(info)

with (OUT / "asc-pages-review.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["source_file","page_number","extraction_method","character_count","page_text"])
    w.writeheader(); w.writerows(rows)
summary = {
    "pdf_count": len(pdfs),
    "total_pages": sum(x["pages"] for x in inventory),
    "pages_with_text_or_ocr": sum(x["pages_with_text"] for x in inventory),
    "ocr_pages": sum(x["ocr_pages"] for x in inventory),
    "documents_with_errors": [x for x in inventory if x["errors"]],
    "documents": inventory,
    "status": "source text/OCR extraction only; no products, prices, stock, fitment, internal SKUs, categories or imports are approved"
}
(OUT / "asc-inventory-and-extraction-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
(OUT / "README.md").write_text("# ASC PDF extraction — review only\n\nPage-level embedded text and OCR where embedded text is absent. Source filenames and page numbers are retained. This is not a product import; all SKU, fitment, price, stock, duplicate and category decisions require review.\n", encoding="utf-8")
print(json.dumps({k:v for k,v in summary.items() if k != "documents"}, ensure_ascii=False))
