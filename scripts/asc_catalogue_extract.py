#!/usr/bin/env python3
"""Extract review-only page text from current ASC supplier PDFs.

Embedded PDF text is preferred. Scanned pages use local Tesseract OCR.
No product, price, stock, image, or database records are created or changed.
"""
from __future__ import annotations
import csv
import json
import subprocess
import tempfile
from pathlib import Path
import pymupdf as fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "ASC"
OUT = ROOT / "catalogue-review" / "asc-catalogue-extraction"
OUT.mkdir(parents=True, exist_ok=True)
pdfs = sorted(p for p in SOURCE.glob("*.pdf") if p.is_file())
summary = []

with tempfile.TemporaryDirectory(prefix="asc-ocr-") as tmp:
    tmpdir = Path(tmp)
    with (OUT / "asc-page-text-review-only.csv").open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=["source_file", "page_number", "extraction_method", "character_count", "page_text"])
        writer.writeheader()
        for pdf in pdfs:
            try:
                doc = fitz.open(pdf)
                chars = 0
                text_pages = 0
                ocr_pages = 0
                for page_number, page in enumerate(doc, start=1):
                    page_text = page.get_text("text", sort=True).strip()
                    method = "embedded-text"
                    if not page_text:
                        method = "tesseract-ocr"
                        pix = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), alpha=False)
                        image_path = tmpdir / f"asc-page-{len(summary)}-{page_number}.png"
                        pix.save(image_path)
                        result = subprocess.run(
                            ["tesseract", str(image_path), "stdout", "-l", "eng", "--psm", "6"],
                            capture_output=True, text=True, check=False,
                        )
                        page_text = result.stdout.strip() if result.returncode == 0 else ""
                        ocr_pages += 1
                    if page_text:
                        text_pages += 1
                    chars += len(page_text)
                    writer.writerow({
                        "source_file": pdf.name,
                        "page_number": page_number,
                        "extraction_method": method,
                        "character_count": len(page_text),
                        "page_text": page_text,
                    })
                summary.append({
                    "source_file": pdf.name,
                    "page_count": len(doc),
                    "text_pages": text_pages,
                    "ocr_pages": ocr_pages,
                    "total_text_characters": chars,
                    "extraction_status": "review-text-extracted" if chars else "manual-visual-review-required",
                })
                doc.close()
            except Exception as exc:
                summary.append({
                    "source_file": pdf.name,
                    "page_count": None,
                    "text_pages": 0,
                    "ocr_pages": 0,
                    "total_text_characters": 0,
                    "extraction_status": "error",
                    "error": str(exc)[:500],
                })

(OUT / "asc-extraction-summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
lines = [
    "# ASC Catalogue Text Extraction — Review Only",
    "",
    "Generated from original PDFs in `suppliers/ASC/`. Embedded text is extracted directly; scanned pages are processed with local Tesseract OCR.",
    "OCR output is a review aid only and must be checked against the source page before SKU, fitment, specification, price or product claims are accepted.",
    "No product, price, stock, image, supplier activation or database records are created or changed.",
    "",
    "| Source PDF | Pages | Pages with text | OCR pages | Extracted characters | Status |",
    "|---|---:|---:|---:|---:|---|",
]
for item in summary:
    lines.append("| {source_file} | {page_count} | {text_pages} | {ocr_pages} | {total_text_characters} | {extraction_status} |".format(**item))
lines += [
    "",
    "The CSV contains one row per source page, preserving source filename and page number.",
    "Every OCR-derived value requires manual visual verification against the original PDF before it enters the 25-product pilot.",
    "",
]
(OUT / "README.md").write_text("\n".join(lines), encoding="utf-8")
print(f"ASC_EXTRACTED_PDFS={len(pdfs)}")
for item in summary:
    print(json.dumps(item, ensure_ascii=False))
