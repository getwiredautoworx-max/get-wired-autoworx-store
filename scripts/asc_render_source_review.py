from pathlib import Path
import hashlib, json
import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT = Path("suppliers/ASC")
OUT = Path("artifacts/asc-source-page-review")
OUT.mkdir(parents=True, exist_ok=True)
EXPECTED = [
    "ASC- Aerials (1).pdf",
    "ASC- Automotive Sensors (1).pdf",
    "ASC- Automotive Switches (1).pdf",
    "ASC- Automotive globes (1).pdf",
    "ASC- Car Mats (1).pdf",
    "ASC- Fuel Pumps (1).pdf",
]
font = ImageFont.load_default()
manifest = []
for name in EXPECTED:
    path = ROOT / name
    if not path.is_file():
        raise SystemExit(f"Missing required ASC source PDF: {path}")
    raw = path.read_bytes()
    doc = fitz.open(path)
    pages = []
    for idx, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(1.65, 1.65), alpha=False)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        pages.append((idx + 1, img))
    safe = name.replace(" ", "_").replace("(", "").replace(")", "")
    for start in range(0, len(pages), 4):
        group = pages[start:start+4]
        pad, label_h = 24, 42
        cell_w = max(im.width for _, im in group)
        cell_h = max(im.height for _, im in group)
        sheet = Image.new("RGB", (cell_w*2 + pad*3, (cell_h+label_h)*2 + pad*3), "white")
        draw = ImageDraw.Draw(sheet)
        for j, (page_no, im) in enumerate(group):
            x = pad + (j % 2) * (cell_w + pad)
            y = pad + (j // 2) * (cell_h + label_h + pad)
            draw.text((x, y), f"{name} — PAGE {page_no}", fill="black", font=font)
            sheet.paste(im, (x, y + label_h))
        out_name = f"{safe}_pages_{group[0][0]:02d}-{group[-1][0]:02d}.jpg"
        sheet.save(OUT / out_name, quality=90, optimize=True)
    manifest.append({
        "source_file": name,
        "page_count": len(doc),
        "file_size_bytes": len(raw),
        "sha256": hashlib.sha256(raw).hexdigest(),
        "contact_sheets": [p.name for p in sorted(OUT.glob(f"{safe}_pages_*.jpg"))],
    })
    doc.close()
(OUT / "source-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(json.dumps(manifest, indent=2))
