#!/usr/bin/env python3
"""Extract review-only page text from the current ASC supplier PDFs.

No product, price, stock, image, or database records are created or changed.
"""
from __future__ import annotations
import csv
import json
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "ASC"
OUT = ROOT / "catalogue-review" / "asc-catalogue-extraction"
OUT.mkdir(parents=True, exist_ok=True)

pdfs = sorted(p for p in SOURCE.glob("*.pdf") if p.is_file())
summary = []
with (OUT / "asc-page-text-review-only.csv").open("w", newline="", encoding="utf-8-sig") as handle:
    writer = csv.DictWriter(handle, fieldnames=["source_file", "page_number", "character_count", "page_text"])
    writer.writeheader()
    for pdf in pdfs:
        try:
            doc = fitz.open(pdf)
            chars = 0
            text_pages = 0
            for page_number, page in enumerate(doc, start=1):
                page_text = page.get_text("text", sort=True).strip()
                if page_text:
                    text_pages += 1
                chars += len(page_text)
                writer.writerow({
                    "source_file": pdf.name,
                    "page_number": page_number,
                    "character_count": len(page_text),
                    "page_text": page_text,
                })
            summary.append({
                "source_file": pdf.name,
                "page_count": len(doc),
                "text_pages": text_pages,
                "total_text_characters": chars,
                "extraction_status": "text-extracted" if chars else "no-embedded-text-ocr-required",
            })
            doc.close()
        except Exception as exc:
            summary.append({
                "source_file": pdf.name,
                "page_count": None,
                "text_pages": 0,
                "total_text_characters": 0,
                "extraction_status": "error",
                "error": str(exc)[:500],
            })

(OUT / "asc-extraction-summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
lines = [
    "# ASC Catalogue Text Extraction — Review Only",
    "",
    "Generated from the original PDFs in `suppliers/ASC/`. This is text extraction only; it does not import or activate products, prices, stock, images or supplier records.",
    "",
    "| Source PDF | Pages | Pages with text | Extracted characters | Status |",
    "|---|---:|---:|---:|---|",
]
for item in summary:
    lines.append("| {source_file} | {page_count} | {text_pages} | {total_text_characters} | {extraction_status} |".format(**item))
lines += [
    "",
    "The CSV contains one row per source page, preserving page number and source filename for later SKU evidence review.",
    "Pages with no embedded text require OCR or manual visual review; do not infer that they contain no products.",
    "No product or pricing claims may be made from unverified text extraction alone.",
    "",
]
(OUT / "README.md").write_text("\n".join(lines), encoding="utf-8")
print(f"ASC_EXTRACTED_PDFS={len(pdfs)}")
for item in summary:
    print(json.dumps(item, ensure_ascii=False))
