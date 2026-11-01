#!/usr/bin/env python3
"""Extract review-only text from Electrocity supplier PDFs; never import products."""
from __future__ import annotations
import csv
import hashlib
import json
import subprocess
import tempfile
from pathlib import Path
import pymupdf as fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "Electrocity"
OUT = ROOT / "catalogue-review" / "electrocity-catalogue-extraction"
OUT.mkdir(parents=True, exist_ok=True)
pdfs = sorted(p for p in SOURCE.rglob("*.pdf") if p.is_file())
summary = []

with tempfile.TemporaryDirectory(prefix="electrocity-ocr-") as tmp:
    tmpdir = Path(tmp)
    csv_path = OUT / "electrocity-page-text-review-only.csv"
    with csv_path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["source_file", "source_relative_path", "source_sha256", "page_number",
                        "extraction_method", "character_count", "page_text"],
        )
        writer.writeheader()
        for index, pdf in enumerate(pdfs):
            digest = hashlib.sha256(pdf.read_bytes()).hexdigest()
            try:
                doc = fitz.open(pdf)
                chars = text_pages = ocr_pages = 0
                for page_number, page in enumerate(doc, start=1):
                    page_text = page.get_text("text", sort=True).strip()
                    method = "embedded-text"
                    if not page_text:
                        method = "tesseract-ocr"
                        pix = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), alpha=False)
                        image_path = tmpdir / f"electrocity-{index}-{page_number}.png"
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
                        "source_relative_path": str(pdf.relative_to(SOURCE)),
                        "source_sha256": digest,
                        "page_number": page_number,
                        "extraction_method": method,
                        "character_count": len(page_text),
                        "page_text": page_text,
                    })
                summary.append({
                    "source_file": pdf.name,
                    "source_relative_path": str(pdf.relative_to(SOURCE)),
                    "source_sha256": digest,
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
                    "source_relative_path": str(pdf.relative_to(SOURCE)),
                    "source_sha256": digest,
                    "page_count": None,
                    "text_pages": 0,
                    "ocr_pages": 0,
                    "total_text_characters": 0,
                    "extraction_status": "error",
                    "error": str(exc)[:500],
                })

(OUT / "electrocity-extraction-summary.json").write_text(
    json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)
lines = [
    "# Electrocity Catalogue Text Extraction — Review Only",
    "",
    "Original PDFs remain unchanged under `suppliers/Electrocity/`. Embedded text is extracted directly; scanned pages use local Tesseract OCR.",
    "OCR is a review aid only. Check every product code, description, dimension, voltage and fitment against the original page before accepting a catalogue row.",
    "No product, price, stock, image, supplier activation or database records are created or changed.",
    "",
    "| Source PDF | Pages | Pages with text | OCR pages | Extracted characters | Status |",
    "|---|---:|---:|---:|---:|---|",
]
for item in summary:
    lines.append("| {source_file} | {page_count} | {text_pages} | {ocr_pages} | {total_text_characters} | {extraction_status} |".format(**item))
lines += [
    "",
    "The CSV preserves source-relative path, SHA-256, page number and extraction method for each page.",
    "Supplier category/subcategory groupings must be preserved. Do not force oil-filler caps or unrelated mechanical items into ignition-looms categories.",
    "This output is not an import file and is not proof of supplier SKU, fitment, price or physical stock.",
    "",
]
(OUT / "README.md").write_text("\n".join(lines), encoding="utf-8")
print(f"ELECTROCITY_EXTRACTED_PDFS={len(pdfs)}")
for item in summary:
    print(json.dumps(item, ensure_ascii=False))
