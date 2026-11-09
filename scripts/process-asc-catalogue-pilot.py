#!/usr/bin/env python3
"""Create a deterministic 50-image ASC owner-review watermark-treatment sample.

This is a non-production asset transformation only. It does not write to Supabase,
change catalogue records, publish products, or alter supplier source files.
"""
from __future__ import annotations
import csv
import hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "assets" / "asc-catalogue-pilot-raw"
OUT = ROOT / "assets" / "asc-catalogue-pilot-treated"
SOURCE_CSV = ROOT / "catalogue-review" / "asc-catalogue-extraction" / "asc-product-pilot-review-only.csv"
MANIFEST = ROOT / "catalogue-review" / "asc-catalogue-extraction" / "asc-image-treatment-pilot-manifest.csv"
CONTACT = ROOT / "catalogue-review" / "asc-catalogue-extraction" / "asc-image-treatment-pilot-contact-sheet.jpg"
EXPECTED = 50
CROP_RATIO = 0.78
CANVAS = (900, 600)
WATERMARK = "GET WIRED AUTOWORX"

def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def load_font(size: int):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            pass
    return ImageFont.load_default()

def apply_treatment(source: Path, destination: Path) -> tuple[int, int]:
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        width, height = image.size
        crop_bottom = max(1, min(height, int(round(height * CROP_RATIO))))
        # The source-card caption/description occupies the bottom strip. Crop only
        # that strip; preserve the original product photo and its proportions.
        product_crop = image.crop((0, 0, width, crop_bottom))
        contained = ImageOps.contain(product_crop, (860, 540), method=Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", CANVAS, (255, 255, 255))
        canvas.paste(contained, ((CANVAS[0] - contained.width) // 2, (CANVAS[1] - contained.height) // 2))

        # Overlay the Get Wired AutoWorx watermark across the existing source
        # watermark area. This is intentionally a translucent overlay so the
        # underlying product remains identifiable for owner review.
        watermark_layer = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
        font = load_font(38)
        bbox = font.getbbox(WATERMARK, stroke_width=1)
        text_w = bbox[2] - bbox[0] + 48
        text_h = bbox[3] - bbox[1] + 32
        text_layer = Image.new("RGBA", (text_w, text_h), (0, 0, 0, 0))
        draw = ImageDraw.Draw(text_layer)
        draw.text(
            (24 - bbox[0], 16 - bbox[1]),
            WATERMARK,
            font=font,
            fill=(4, 55, 91, 92),
            stroke_width=1,
            stroke_fill=(255, 255, 255, 125),
        )
        rotated = text_layer.rotate(12, resample=Image.Resampling.BICUBIC, expand=True)
        watermark_layer.alpha_composite(
            rotated,
            ((CANVAS[0] - rotated.width) // 2, (CANVAS[1] - rotated.height) // 2),
        )
        result = Image.alpha_composite(canvas.convert("RGBA"), watermark_layer).convert("RGB")
        destination.parent.mkdir(parents=True, exist_ok=True)
        result.save(destination, format="JPEG", quality=94, optimize=True, progressive=True)
        return image.size

def main():
    if not SOURCE_CSV.is_file():
        raise SystemExit(f"Missing source manifest: {SOURCE_CSV}")
    with SOURCE_CSV.open(newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    if len(rows) != EXPECTED:
        raise SystemExit(f"Expected exactly {EXPECTED} reviewed source rows, found {len(rows)}")
    if len({r["asc_sku"].strip() for r in rows}) != EXPECTED:
        raise SystemExit("Duplicate or blank ASC SKU in 50-row sample manifest")
    if len({Path(r["image_file"]).name for r in rows}) != EXPECTED:
        raise SystemExit("Duplicate or blank source image filename in 50-row sample manifest")

    OUT.mkdir(parents=True, exist_ok=True)
    manifest_rows = []
    contact_items = []
    for index, row in enumerate(rows, start=1):
        sample_id = f"GW-ASC-PILOT-{index:03d}"
        source_name = Path(row["image_file"]).name
        source = RAW / source_name
        if not source.is_file():
            raise SystemExit(f"Missing source crop for {row['asc_sku']}: {source}")
        output_name = sample_id + ".jpg"
        output = OUT / output_name
        original_dimensions = apply_treatment(source, output)
        output_hash = sha256(output)
        manifest_rows.append({
            "sample_id": sample_id,
            "asc_sku_reference_only": row["asc_sku"],
            "source_file": row["source_file"],
            "source_page": row["source_page"],
            "product_name_as_printed": row["product_name_as_printed"],
            "source_image_file": source_name,
            "output_image_file": output_name,
            "source_sha256": sha256(source),
            "output_sha256": output_hash,
            "source_dimensions": f"{original_dimensions[0]}x{original_dimensions[1]}",
            "output_dimensions": f"{CANVAS[0]}x{CANVAS[1]}",
            "crop_ratio": CROP_RATIO,
            "treatment_status": "DESCRIPTION_STRIP_CROPPED; GET_WIRED_WATERMARK_OVERLAID_ON_SOURCE_WATERMARK; OWNER_VISUAL_QA_PENDING",
            "release_status": "REVIEW_ONLY_NOT_IMPORTED",
        })
        contact_items.append((sample_id, row["product_name_as_printed"], output))

    fieldnames = list(manifest_rows[0].keys())
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(manifest_rows)

    columns, rows_count = 5, 10
    cell_w, cell_h = 220, 166
    sheet = Image.new("RGB", (columns * cell_w, rows_count * cell_h), (242, 246, 250))
    sheet_draw = ImageDraw.Draw(sheet)
    label_font = load_font(12)
    for index, (sample_id, title, output) in enumerate(contact_items):
        col, row_index = index % columns, index // columns
        x, y = col * cell_w, row_index * cell_h
        with Image.open(output) as im:
            thumb = ImageOps.contain(im.convert("RGB"), (200, 126), method=Image.Resampling.LANCZOS)
            sheet.paste(thumb, (x + (cell_w - thumb.width) // 2, y + 3))
        label = f"{sample_id}  {title[:24]}"
        sheet_draw.text((x + 8, y + 134), label, font=label_font, fill=(15, 45, 70))
    CONTACT.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(CONTACT, format="JPEG", quality=88, optimize=True)

    if len(list(OUT.glob("GW-ASC-PILOT-*.jpg"))) != EXPECTED:
        raise SystemExit("Output count does not equal 50")
    print(f"ASC_IMAGE_TREATMENT_SAMPLE_PASS images={EXPECTED} crop_ratio={CROP_RATIO} output={OUT.relative_to(ROOT)}")
    print(f"MANIFEST={MANIFEST.relative_to(ROOT)}")
    print(f"CONTACT_SHEET={CONTACT.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
