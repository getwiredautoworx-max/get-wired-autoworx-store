#!/usr/bin/env python3
"""Generate the owner-authorised 50-image ASC watermark-treatment pilot."""
import argparse
import csv
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# The catalogue source cards have different product-photo boundaries. Preserve
# long product bodies and mask only the external caption/header/code strips.
DEFAULT_PRODUCT_CROP_RATIO = 0.72
PRODUCT_CROP_OVERRIDES = {
    **{f"asc-{name}.jpg": 0.78 for name in [
        "m7-avan01", "m7-con01", "m7-cor01", "m7-cor02", "m7-gf1",
        "m7-bme36", "m7-bme46", "m7-bme87", "9005-cbl-h", "9005-h",
        "9005-nb", "9005xs", "h1865w-h", "h1960-55w-h", "h355w-cbl", "h355w-h"
    ]},
    **{f"asc-{name}.jpg": 0.92 for name in [
        "f1-012", "f1-019", "f1-060", "f1-067", "f1-001", "f1-001-e",
        "f1-009", "f1-017", "f1-028"
    ]},
}
PRODUCT_MASK_OVERRIDES = {
    **{f"asc-{name}.jpg": [(0.0, 0.62, 1.0, 0.78)] for name in [
        "m7-avan01", "m7-con01", "m7-cor01", "m7-cor02",
        "m7-gf1", "m7-bme36", "m7-bme46", "m7-bme87"
    ]},
    **{f"asc-{name}.jpg": [(0.0, 0.65, 1.0, 0.78)] for name in [
        "9005-cbl-h", "9005-h", "9005-nb", "9005xs"
    ]},
    **{f"asc-{name}.jpg": [(0.0, 0.61, 1.0, 0.78)] for name in [
        "h1865w-h", "h1960-55w-h", "h355w-cbl", "h355w-h"
    ]},
    **{f"asc-{name}.jpg": [(0.0, 0.0, 1.0, 0.16), (0.0, 0.76, 1.0, 0.92)] for name in [
        "f1-012", "f1-019", "f1-060", "f1-067"
    ]},
    **{f"asc-{name}.jpg": [(0.0, 0.0, 1.0, 0.16), (0.0, 0.88, 1.0, 0.92)] for name in [
        "f1-001", "f1-001-e", "f1-009", "f1-017"
    ]},
    "asc-f1-028.jpg": [(0.0, 0.0, 1.0, 0.18), (0.0, 0.88, 1.0, 0.92)],
}

def read_csv(path):
    with path.open(newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))

def write_csv(path, rows):
    fields = list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

def build_logo(logo_path, max_width):
    logo = Image.open(logo_path).convert("RGBA")
    px = np.array(logo)
    rgb = px[:, :, :3].astype(np.int16)
    darkness = rgb.max(axis=2)
    alpha = np.clip((darkness - 12) * 5, 0, 220).astype(np.uint8)
    px[:, :, 3] = np.minimum(px[:, :, 3], alpha)
    logo = Image.fromarray(px, "RGBA")
    height = max(1, round(logo.height * max_width / logo.width))
    return logo.resize((max_width, height), Image.Resampling.LANCZOS)

def remove_pale_blue_watermark(rgb):
    r = rgb[:, :, 0].astype(np.int16)
    g = rgb[:, :, 1].astype(np.int16)
    b = rgb[:, :, 2].astype(np.int16)
    candidate = (
        (r > 150) & (g > 160) & (b > 175) &
        ((b - r) >= 7) & ((b - g) >= 3) & ((b - r) <= 70)
    ).astype(np.uint8) * 255
    count, labels, stats, _ = cv2.connectedComponentsWithStats(candidate, 8)
    mask = np.zeros_like(candidate)
    for i in range(1, count):
        area = stats[i, cv2.CC_STAT_AREA]
        if 2 <= area <= 500:
            mask[labels == i] = 255
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=1)
    ratio = float(np.count_nonzero(mask)) / float(mask.size)
    if np.count_nonzero(mask):
        cleaned = cv2.inpaint(cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR), mask, 3, cv2.INPAINT_TELEA)
        cleaned = cv2.cvtColor(cleaned, cv2.COLOR_BGR2RGB)
    else:
        cleaned = rgb
    return cleaned, mask, ratio

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-root", type=Path, required=True)
    ap.add_argument("--logo", type=Path, required=True)
    ap.add_argument("--output", type=Path, required=True)
    ap.add_argument("--pilot", type=Path, default=Path("catalogue-review/asc-catalogue-extraction/asc-50-product-pilot-gw-sku-proposal-review-only.csv"))
    args = ap.parse_args()

    rows = read_csv(args.pilot)
    assert len(rows) == 50, f"Expected 50 pilot rows, got {len(rows)}"
    args.output.mkdir(parents=True, exist_ok=True)
    logo = build_logo(args.logo, 82)
    logo_h = logo.height
    results = []
    contact_cells = []
    for index, row in enumerate(rows, start=1):
        source_rel = Path(row["candidate_image_path_from_preview_branch"])
        source_path = args.source_root / source_rel
        if not source_path.is_file():
            raise FileNotFoundError(f"Missing source image for {row['supplier_sku']}: {source_path}")
        with Image.open(source_path) as im:
            original = im.convert("RGB")
        width, height = original.size
        source_name = source_rel.name
        crop_ratio = PRODUCT_CROP_OVERRIDES.get(source_name, DEFAULT_PRODUCT_CROP_RATIO)
        crop_bottom = max(1, min(height, round(height * crop_ratio)))
        crop = original.crop((0, 0, width, crop_bottom))
        caption_masks = PRODUCT_MASK_OVERRIDES.get(source_name, [])
        if caption_masks:
            draw = ImageDraw.Draw(crop)
            for x1, y1, x2, y2 in caption_masks:
                left = max(0, min(width, round(width * x1)))
                upper = max(0, min(crop_bottom, round(height * y1)))
                right = max(0, min(width, round(width * x2)))
                lower = max(0, min(crop_bottom, round(height * y2)))
                if right > left and lower > upper:
                    draw.rectangle((left, upper, right, lower), fill=(255, 255, 255))
        cleaned, mask, ratio = remove_pale_blue_watermark(np.array(crop))
        mask_pixels = int(np.count_nonzero(mask))
        if ratio == 0:
            status = "MANUAL_REVIEW_NO_MASK"
        elif ratio > 0.06:
            status = "MANUAL_REVIEW_MASK_TOO_LARGE"
        else:
            status = "TREATED_PENDING_VISUAL_QA"

        footer_h = max(34, logo_h + 4)
        canvas = Image.new("RGB", (width, crop_bottom + footer_h), (7, 20, 34))
        canvas.paste(Image.fromarray(cleaned), (0, 0))
        mark = logo.copy()
        mark.putalpha(mark.getchannel("A").point(lambda a: int(a * 0.86)))
        canvas_rgba = canvas.convert("RGBA")
        canvas_rgba.alpha_composite(mark, (max(2, width - mark.width - 3), crop_bottom + (footer_h - mark.height)//2))
        output_path = args.output / f"sample-{index:02d}.jpg"
        canvas_rgba.convert("RGB").save(output_path, "JPEG", quality=94, optimize=True)

        row["treated_image_path"] = output_path.as_posix()
        row["image_treatment_status"] = status
        row["watermark_mask_ratio"] = f"{ratio:.5f}"
        row["watermark_pixels_removed"] = str(mask_pixels)
        row["logo_watermark_applied"] = "true"
        row["source_dimensions"] = f"{width}x{height}"
        results.append({
            "sample": index, "supplier_sku": row["supplier_sku"],
            "title": row["product_name_as_printed"], "source": source_rel.as_posix(),
            "output": output_path.as_posix(), "source_dimensions": f"{width}x{height}",
            "crop_bottom": crop_bottom, "crop_ratio": round(crop_bottom / height, 4),
            "caption_masks_applied": len(caption_masks), "watermark_mask_pixels": mask_pixels,
            "watermark_mask_ratio": round(ratio, 5), "logo_watermark_applied": True,
            "status": status
        })
        thumb = canvas.copy()
        thumb.thumbnail((210, 180), Image.Resampling.LANCZOS)
        contact_cells.append((index, row["supplier_sku"], thumb))

    write_csv(args.pilot, rows)
    cols, cell_w, cell_h = 5, 220, 210
    sheet = Image.new("RGB", (cols * cell_w, 10 * cell_h), (242, 245, 248))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 11)
    except OSError:
        font = ImageFont.load_default()
    for i, (number, sku, thumb) in enumerate(contact_cells):
        x, y = (i % cols) * cell_w, (i // cols) * cell_h
        sheet.paste(thumb, (x + (cell_w - thumb.width) // 2, y + 18))
        draw.text((x + 5, y + 3), f"{number:02d}  {sku}", fill=(20, 35, 50), font=font)
    sheet.save(args.output / "contact-sheet.jpg", "JPEG", quality=90, optimize=True)
    manual = sum(1 for r in results if r["status"].startswith("MANUAL_REVIEW"))
    report = {
        "sample_count": len(results),
        "treated_pending_visual_qa": sum(1 for r in results if r["status"] == "TREATED_PENDING_VISUAL_QA"),
        "manual_review": manual,
        "treatment": "per-image product crop boundaries; external caption/header/SKU masking; pale-blue watermark inpainting where detected; Get Wired AutoWorx logo watermark in separate footer strip",
        "results": results
    }
    (args.output / "report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"IMAGE PILOT: {len(results)} images processed; {report['treated_pending_visual_qa']} ready for visual QA; {manual} require manual mask review.")
    print(f"CONTACT SHEET: {args.output / 'contact-sheet.jpg'}")

if __name__ == "__main__":
    main()
