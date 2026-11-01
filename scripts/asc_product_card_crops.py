#!/usr/bin/env python3
"""Crop the 25 page-3 ASC source cards used in the internal catalogue pilot.

The complete source card (photo, printed description and ASC code) is retained
in each crop. Watermarks are not removed. These are review crops, not final
clean product photography; keep the pilot preview-only until image-use scope
is confirmed for live customer listings.
"""
import base64
import io
from pathlib import Path
import fitz
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "ASC"
OUT = ROOT / "assets" / "asc-catalogue-pilot"
OUT.mkdir(parents=True, exist_ok=True)

# PDF page 3 product-card grid: four columns; page 3 of Fuel Pumps has an
# additional blue section banner, so its first card row starts lower.
FILES = {
    "ASC- Aerials (1).pdf": (137, [(0, "MA522"), (1, "MA553"), (2, "MA559R"), (3, "MA570")]),
    "ASC- Automotive Sensors (1).pdf": (137, [(0, "01080"), (1, "02883"), (2, "03822"), (3, "09103"), (4, "09396")]),
    "ASC- Automotive Switches (1).pdf": (137, [(0, "21849"), (1, "CS-112048"), (2, "CSC105"), (3, "CSC106")]),
    "ASC- Automotive globes (1).pdf": (137, [(0, "9005-CBL-H"), (1, "9005-H"), (2, "9005-NB"), (3, "9005XS")]),
    "ASC- Car Mats (1).pdf": (137, [(0, "M7-AVAN01"), (1, "M7-CON01"), (2, "M7-COR01"), (3, "M7-COR02")]),
    "ASC- Fuel Pumps (1).pdf": (213, [(0, "F1-012"), (1, "F1-019"), (2, "F1-060"), (3, "F1-067")]),
}
# Coordinates measured on the 1.8x source render (1071x1515). They are
# scaled against the actual render dimensions so minor PDF size differences
# do not shift the crop.
X = [82, 270, 457, 644]
CARD_W, CARD_H = 176, 222
ROW_Y = [137, 371, 605, 840, 1075]
records = []

for filename, (first_row_y, products) in FILES.items():
    doc = fitz.open(SOURCE / filename)
    page = doc[2]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
    page_image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    sx, sy = page_image.width / 1071, page_image.height / 1515
    for order, code in products:
        row, col = divmod(order, 4)
        y = first_row_y if row == 0 else ROW_Y[row]
        # For the one sensor item in row 2, use the second card row.
        x0 = round(X[col] * sx)
        y0 = round(y * sy)
        x1 = round((X[col] + CARD_W) * sx)
        y1 = round((y + CARD_H) * sy)
        crop = page_image.crop((x0, y0, x1, y1))
        slug = "".join(ch.lower() if ch.isalnum() else "-" for ch in code).strip("-")
        name = f"asc-{slug}.jpg"
        crop.save(OUT / name, format="JPEG", quality=92, optimize=True)
        records.append({"source_file": filename, "source_page": 3, "asc_sku": code,
                        "image_file": f"assets/asc-catalogue-pilot/{name}",
                        "crop_type": "full_source_card_review_crop", "watermark_retained": True})
    doc.close()

# One 5x5 contact sheet to visually QA crop alignment before preview integration.
thumb_w, thumb_h, label_h = 200, 252, 24
sheet = Image.new("RGB", (5 * thumb_w, 5 * (thumb_h + label_h)), "white")
draw = ImageDraw.Draw(sheet)
for i, record in enumerate(records):
    image = Image.open(OUT / Path(record["image_file"]).name).convert("RGB")
    image.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
    col, row = i % 5, i // 5
    x, y = col * thumb_w, row * (thumb_h + label_h)
    draw.rectangle((x, y, x + thumb_w - 1, y + label_h - 1), fill="#e8edf2")
    draw.text((x + 6, y + 6), record["asc_sku"], fill="#14283a")
    sheet.paste(image, (x + (thumb_w - image.width)//2, y + label_h + (thumb_h-image.height)//2))
buf = io.BytesIO()
sheet.save(buf, format="JPEG", quality=82, optimize=True)
print("ASC_PRODUCT_CROP_CONTACT_SHEET=" + base64.b64encode(buf.getvalue()).decode("ascii"))
print("ASC_PRODUCT_CROPS_CREATED=" + str(len(records)))
for record in records:
    print(record["image_file"])
