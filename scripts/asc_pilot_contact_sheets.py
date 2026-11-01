#!/usr/bin/env python3
"""Emit full-page ASC catalogue page 3 and 4 renders as base64 for private QA logs."""
import base64
import io
from pathlib import Path
import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "ASC"
files = [
    "ASC- Aerials (1).pdf",
    "ASC- Automotive Sensors (1).pdf",
    "ASC- Automotive Switches (1).pdf",
    "ASC- Automotive globes (1).pdf",
    "ASC- Car Mats (1).pdf",
    "ASC- Fuel Pumps (1).pdf",
]
for filename in files:
    doc = fitz.open(SOURCE / filename)
    for page_number in (3, 4):
        if page_number > len(doc):
            continue
        page = doc[page_number - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
        image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        buf = io.BytesIO()
        image.save(buf, format="JPEG", quality=78, optimize=True)
        encoded = base64.b64encode(buf.getvalue()).decode("ascii")
        slug = "".join(ch.upper() if ch.isalnum() else "_" for ch in Path(filename).stem).strip("_")
        print(f"ASC_PILOT_PAGE_{slug}_{page_number:02d}={encoded}")
    doc.close()
