#!/usr/bin/env python3
"""Crop source-card images for the ASC catalogue preview pilot.

The complete card (photo, printed description and ASC code) is retained.
Watermarks are never removed. These are review crops, not final clean product
photography; live image-use rights must be confirmed before production.
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

X = [82, 270, 457, 644]
CARD_W, CARD_H = 176, 222
PAGE3 = {
    "ASC- Aerials (1).pdf": [(0,137,"MA522"),(1,137,"MA553"),(2,137,"MA559R"),(3,137,"MA570")],
    "ASC- Automotive Sensors (1).pdf": [(0,137,"01080"),(1,137,"02883"),(2,137,"03822"),(3,137,"09103"),(0,371,"09396")],
    "ASC- Automotive Switches (1).pdf": [(0,137,"21849"),(1,137,"CS-112048"),(2,137,"CSC105"),(3,137,"CSC106")],
    "ASC- Automotive globes (1).pdf": [(0,137,"9005-CBL-H"),(1,137,"9005-H"),(2,137,"9005-NB"),(3,137,"9005XS")],
    "ASC- Car Mats (1).pdf": [(0,137,"M7-AVAN01"),(1,137,"M7-CON01"),(2,137,"M7-COR01"),(3,137,"M7-COR02")],
    "ASC- Fuel Pumps (1).pdf": [(0,213,"F1-012"),(1,213,"F1-019"),(2,213,"F1-060"),(3,213,"F1-067")],
}
PAGE4 = {
    "ASC- Aerials (1).pdf": [(0,371,"A1-003"),(1,371,"A1-004"),(2,371,"MA314"),(3,371,"MA314BL")],
    "ASC- Automotive Sensors (1).pdf": [(0,137,"02761"),(1,137,"04818"),(2,137,"14163"),(3,137,"29601")],
    "ASC- Automotive Switches (1).pdf": [(0,81,"IG-FR01"),(1,81,"IG-HN04"),(2,81,"IG-IZT"),(3,81,"IG-NP300")],
    "ASC- Automotive globes (1).pdf": [(0,81,"1DS"),(1,81,"1DS-8000"),(2,81,"2DC"),(3,81,"2DS")],
    "ASC- Car Mats (1).pdf": [(0,1035,"M7-BME30"),(1,1035,"M7-BME36"),(2,1035,"M7-BME46"),(3,1035,"M7-BME87")],
    "ASC- Fuel Pumps (1).pdf": [(0,606,"F1-001"),(1,606,"F1-001-E"),(2,606,"F1-009"),(3,606,"F1-017"),(0,840,"F1-028")],
}

def crop_set(page_number, mapping):
    created = []
    for filename, entries in mapping.items():
        doc = fitz.open(SOURCE / filename)
        page = doc[page_number - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
        page_image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        sx, sy = page_image.width / 1071, page_image.height / 1515
        for col, y, code in entries:
            x0, y0 = round(X[col] * sx), round(y * sy)
            x1, y1 = round((X[col] + CARD_W) * sx), round((y + CARD_H) * sy)
            crop = page_image.crop((x0, y0, x1, y1))
            slug = "".join(ch.lower() if ch.isalnum() else "-" for ch in code).strip("-")
            name = f"asc-{slug}.jpg"
            crop.save(OUT / name, format="JPEG", quality=92, optimize=True)
            created.append({"sku":code,"file":name})
        doc.close()
    return created

def contact_sheet(records, label):
    thumb_w, thumb_h, label_h, cols = 200, 252, 24, 5
    rows = (len(records) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), "white")
    draw = ImageDraw.Draw(sheet)
    for i, record in enumerate(records):
        image = Image.open(OUT / record["file"]).convert("RGB")
        image.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        col, row = i % cols, i // cols
        x, y = col * thumb_w, row * (thumb_h + label_h)
        draw.rectangle((x, y, x + thumb_w - 1, y + label_h - 1), fill="#e8edf2")
        draw.text((x + 6, y + 6), record["sku"], fill="#14283a")
        sheet.paste(image, (x + (thumb_w-image.width)//2, y + label_h + (thumb_h-image.height)//2))
    buf = io.BytesIO()
    sheet.save(buf, format="JPEG", quality=82, optimize=True)
    print(f"ASC_PRODUCT_CROP_CONTACT_SHEET_{label}=" + base64.b64encode(buf.getvalue()).decode("ascii"))

p3 = crop_set(3, PAGE3)
p4 = crop_set(4, PAGE4)
contact_sheet(p3, "PAGE3")
contact_sheet(p4, "PAGE4")
print(f"ASC_PRODUCT_CROPS_CREATED={len(p3)+len(p4)}")
for item in p3 + p4:
    print(item["file"])
