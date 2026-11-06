#!/usr/bin/env python3
"""Build a conservative six-catalogue ASC image pilot from untouched originals.

No image is cropped or enlarged. Catalogue OCR text is removed only when it is
clearly in the outer page/card bands; text near the product is reported for
manual review rather than erased. The actual Get Wired logo is placed in the
reserved canvas margin. Full-batch mode is deliberately opt-in.
"""
from __future__ import annotations
import argparse, json
from pathlib import Path
import cv2
import numpy as np
import pytesseract
from PIL import Image, ImageOps
from pytesseract import Output

SAMPLES = {
    "Aerials": "asc-ma522.jpg",
    "Automotive Sensors": "asc-01080.jpg",
    "Automotive Switches": "asc-21849.jpg",
    "Automotive Globes": "asc-9005-cbl-h.jpg",
    "Fuel Pumps": "asc-f1-012.jpg",
    "Car Mats": "asc-m7-avan01.jpg",
}
ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "assets" / "gw-logo.png"

def clean_outer_catalogue_text(image: Image.Image):
    rgb = np.array(image.convert("RGB"))
    h, w = rgb.shape[:2]
    data = pytesseract.image_to_data(rgb, output_type=Output.DICT, config="--psm 11")
    mask = np.zeros((h, w), dtype=np.uint8)
    removed, review = [], []
    for i, raw in enumerate(data["text"]):
        word = str(raw or "").strip()
        if not word:
            continue
        try:
            confidence = float(data["conf"][i])
        except (TypeError, ValueError):
            confidence = -1
        if confidence < 35:
            continue
        x, y, bw, bh = [int(data[k][i]) for k in ("left", "top", "width", "height")]
        if bw <= 0 or bh <= 0:
            continue
        # Only catalogue copy clearly outside the central product-safe zone.
        outer = (x < .12*w or x+bw > .88*w or y < .14*h or y+bh > .86*h)
        if outer:
            pad = max(2, round(min(w, h) * .004))
            x0, y0 = max(0, x-pad), max(0, y-pad)
            x1, y1 = min(w, x+bw+pad), min(h, y+bh+pad)
            cv2.rectangle(mask, (x0, y0), (x1, y1), 255, -1)
            removed.append(word)
        else:
            review.append(word)
    if mask.any():
        bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
        cleaned = cv2.inpaint(bgr, mask, 3, cv2.INPAINT_TELEA)
        rgb = cv2.cvtColor(cleaned, cv2.COLOR_BGR2RGB)
    return Image.fromarray(rgb), {"outer_text_removed": removed, "text_near_product_review": review}

def render(source: Path, destination: Path, logo_path: Path):
    with Image.open(source) as opened:
        product = ImageOps.exif_transpose(opened).convert("RGB")
    # Scale down only. Preserve the complete source frame and its aspect ratio.
    product.thumbnail((420, 420), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (600, 600), (250, 250, 250))
    x = (600 - product.width) // 2
    y = (600 - product.height) // 2 - 22
    canvas.paste(product, (x, y))
    with Image.open(logo_path) as opened_logo:
        logo = opened_logo.convert("RGBA")
    max_logo_width = 132
    if logo.width > max_logo_width:
        nh = max(1, round(logo.height * max_logo_width / logo.width))
        logo = logo.resize((max_logo_width, nh), Image.Resampling.LANCZOS)
    # Logo sits in the lower reserved margin, not over the product photograph.
    logo.putalpha(logo.getchannel("A").point(lambda a: round(a * .92)))
    canvas_rgba = canvas.convert("RGBA")
    canvas_rgba.alpha_composite(logo, (600 - logo.width - 12, 600 - logo.height - 10))
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas_rgba.convert("RGB").save(destination, "JPEG", quality=96, subsampling=0, optimize=True)
    with Image.open(source) as original:
        source_size = list(original.size)
    return {"source": str(source), "output": str(destination), "source_size": source_size,
            "output_size": [600, 600], "product_box": [x, y, x+product.width, y+product.height]}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--image-dir", type=Path, default=ROOT/"assets/asc-auto-electrical-pilot")
    parser.add_argument("--originals-dir", type=Path, default=ROOT/"assets/asc-auto-electrical-pilot-originals")
    parser.add_argument("--logo", type=Path, default=LOGO)
    parser.add_argument("--output-dir", type=Path, default=ROOT/"artifacts/asc-image-sample")
    parser.add_argument("--all", action="store_true", help="Process all 50 originals; requires owner-approved sample first.")
    args = parser.parse_args()
    if not args.logo.is_file():
        raise SystemExit(f"Actual Get Wired logo missing: {args.logo}")
    sources = sorted(args.originals_dir.glob("*.jpg"))
    if not sources:
        raise SystemExit(f"No preserved originals found: {args.originals_dir}")
    if args.all:
        selected = sources
    else:
        by_name = {p.name: p for p in sources}
        missing = [name for name in SAMPLES.values() if name not in by_name]
        if missing:
            raise SystemExit("Missing one-per-catalogue sample originals: " + ", ".join(missing))
        selected = [by_name[name] for name in SAMPLES.values()]
    args.output_dir.mkdir(parents=True, exist_ok=True)
    report = []
    for source in selected:
        prepared, ocr = clean_outer_catalogue_text(Image.open(source).convert("RGB"))
        temp = args.output_dir / source.name
        details = render_from_image(prepared, source, temp, args.logo)
        details["catalogue"] = next((k for k, v in SAMPLES.items() if v == source.name), "Full pilot")
        details["ocr"] = ocr
        report.append(details)
    args.output_dir.mkdir(parents=True, exist_ok=True)
    (args.output_dir/"image-review-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps({"mode": "all" if args.all else "six-catalogue-sample", "images": len(selected),
                      "logo": str(args.logo), "outputs": str(args.output_dir)}, indent=2))

def render_from_image(prepared, source, destination, logo_path):
    # Keep the exact source frame; only OCR-cleaned pixels are passed to contain-layout.
    temp_source = destination.with_suffix(".source.jpg")
    prepared.save(temp_source, "JPEG", quality=98)
    try:
        result = render(temp_source, destination, logo_path)
        result["source"] = str(source)
        return result
    finally:
        temp_source.unlink(missing_ok=True)

if __name__ == "__main__":
    main()
