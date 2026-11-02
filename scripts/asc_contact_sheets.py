#!/usr/bin/env python3
"""Create private, review-only ASC catalogue page contact sheets.

The source PDFs remain unchanged. JPEG contact sheets are base64-wrapped as
UTF-8 text so the repository review connector can retrieve them safely.
These files must never be included in the public storefront package.
"""
from __future__ import annotations
import base64
import io
import json
from pathlib import Path
import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "ASC"
OUT = ROOT / "catalogue-review" / "asc-catalogue-extraction" / "contact-sheets-base64"
OUT.mkdir(parents=True, exist_ok=True)
PAGE_W, PAGE_H = 480, 680
LABEL_H, COLS, ROWS = 30, 2, 2
PER_SHEET = COLS * ROWS
index = []

for pdf in sorted(SOURCE.glob("*.pdf")):
    doc = fitz.open(pdf)
    slug = "".join(ch.lower() if ch.isalnum() else "-" for ch in pdf.stem).strip("-")
    for offset in range(0, len(doc), PER_SHEET):
        sheet = Image.new("RGB", (COLS * PAGE_W, ROWS * (PAGE_H + LABEL_H)), "white")
        draw = ImageDraw.Draw(sheet)
        page_numbers = []
        for slot, page_index in enumerate(range(offset, min(offset + PER_SHEET, len(doc)))):
            page = doc[page_index]
            pix = page.get_pixmap(matrix=fitz.Matrix(1.25, 1.25), alpha=False)
            image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
            image.thumbnail((PAGE_W, PAGE_H), Image.Resampling.LANCZOS)
            col, row = slot % COLS, slot // COLS
            x, y = col * PAGE_W, row * (PAGE_H + LABEL_H)
            draw.rectangle((x, y, x + PAGE_W - 1, y + LABEL_H - 1), fill="#e9eef4")
            draw.text((x + 10, y + 8), f"{pdf.name} — page {page_index + 1}", fill="#172b3a")
            px = x + (PAGE_W - image.width) // 2
            py = y + LABEL_H + (PAGE_H - image.height) // 2
            sheet.paste(image, (px, py))
            page_numbers.append(page_index + 1)
        first, last = page_numbers[0], page_numbers[-1]
        name = f"{slug}-pages-{first:02d}-{last:02d}.jpg"
        buffer = io.BytesIO()
        sheet.save(buffer, format="JPEG", quality=78, optimize=True)
        encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
        (OUT / f"{name}.b64.txt").write_text(encoded + "\n", encoding="ascii")
        index.append({
            "source_file": pdf.name,
            "contact_sheet": f"{name}.b64.txt",
            "pages": page_numbers,
            "image_width": sheet.width,
            "image_height": sheet.height,
            "review_only": True,
        })
    doc.close()

(OUT / "index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"ASC_CONTACT_SHEETS_CREATED={len(index)}")
for item in index:
    print(json.dumps(item, ensure_ascii=False))
