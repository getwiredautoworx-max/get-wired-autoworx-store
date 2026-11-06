#!/usr/bin/env python3
"""Create clean product-only ASC preview images and add Get Wired ownership branding.

Original catalogue crops remain unchanged in a sibling originals directory.
OCR removes catalogue headings/descriptions; the crop is then tightened around
the product and branded. Re-runs always start from the untouched original.
"""
from __future__ import annotations

import argparse
import shutil
from pathlib import Path

import pytesseract
from PIL import Image, ImageDraw, ImageFont
from pytesseract import Output


def _font(size: int):
    for candidate in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
    ):
        try:
            return ImageFont.truetype(candidate, size=size)
        except OSError:
            pass
    return ImageFont.load_default()


def _text_boxes(image: Image.Image):
    data = pytesseract.image_to_data(image, output_type=Output.DICT, config="--psm 11")
    boxes = []
    for i, raw in enumerate(data["text"]):
        word = str(raw).strip()
        if not word:
            continue
        try:
            confidence = float(data["conf"][i])
        except (TypeError, ValueError):
            confidence = -1
        boxes.append((
            word,
            int(data["left"][i]),
            int(data["top"][i]),
            int(data["width"][i]),
            int(data["height"][i]),
            confidence,
        ))
    return boxes


def _product_only_crop(image: Image.Image) -> Image.Image:
    width, height = image.size
    boxes = _text_boxes(image)

    # Remove stray page headings and previous-card SKU strips at the top.
    top_words = [b for b in boxes if b[2] < int(height * 0.15) and b[5] >= 25]
    crop_top = max((b[2] + b[4] for b in top_words), default=0) + (4 if top_words else 0)

    pixels = image.load()
    blue_rows = []
    red_rows = []
    for y in range(max(1, int(height * 0.27))):
        blue_count = 0
        for x in range(width):
            r, g, b = pixels[x, y]
            if b > 90 and b > r * 1.25 and b > g * 1.05 and b < 235:
                blue_count += 1
        if blue_count >= int(width * 0.32):
            blue_rows.append(y)
        red_count = 0
        for x in range(min(8, width)):
            r, g, b = pixels[x, y]
            if r > 115 and r > g * 1.35 and r > b * 1.25:
                red_count += 1
        if red_count >= 2:
            red_rows.append(y)
    if blue_rows:
        crop_top = max(crop_top, max(blue_rows) + 4)
    if len(red_rows) >= 5 and max(red_rows) - min(red_rows) >= 4:
        # The narrow red rule is a catalogue section-header remnant; remove
        # the full header strip, not only the red pixels.
        crop_top = max(crop_top, max(red_rows) + 20)

    # Remove the first catalogue-description line below the product photo.
    lower_words = [
        b for b in boxes
        if b[2] > int(height * 0.55)
        and b[5] >= 10
        and not b[0].upper().replace(" ", "").startswith(("F1-", "GW-ASC-"))
    ]
    crop_bottom = min((b[2] for b in lower_words), default=int(height * 0.76)) - 3
    crop_top = max(0, min(crop_top, int(height * 0.30)))
    crop_bottom = min(height, max(crop_bottom, crop_top + int(height * 0.35)))
    if crop_bottom <= crop_top + 20:
        crop_top, crop_bottom = 0, int(height * 0.76)

    # Trim the card frame and find the product's stronger-contrast footprint.
    crop = image.crop((3, crop_top, width - 3, crop_bottom)).convert("RGB")
    px = crop.load()
    mask = Image.new("1", crop.size, 0)
    mp = mask.load()
    for y in range(crop.height):
        for x in range(crop.width):
            r, g, b = px[x, y]
            grey = (r * 299 + g * 587 + b * 114) // 1000
            saturation = max(r, g, b) - min(r, g, b)
            if grey < 200 or saturation > 40:
                mp[x, y] = 1
    bounds = mask.getbbox()
    if bounds:
        left, upper, right, lower = bounds
        pad_x = max(6, round(crop.width * 0.035))
        pad_y = max(6, round(crop.height * 0.035))
        bounds = (
            max(0, left - pad_x),
            max(0, upper - pad_y),
            min(crop.width, right + pad_x),
            min(crop.height, lower + pad_y),
        )
        if bounds[2] - bounds[0] >= 24 and bounds[3] - bounds[1] >= 24:
            crop = crop.crop(bounds)
    return crop


def watermark(source: Path, destination: Path) -> None:
    with Image.open(source) as opened:
        raw = opened.convert("RGB")
    product = _product_only_crop(raw)

    # Give the product a consistent square storefront canvas without stretching.
    max_side = 520
    ratio = min(max_side / product.width, max_side / product.height)
    new_size = (max(1, round(product.width * ratio)), max(1, round(product.height * ratio)))
    product = product.resize(new_size, Image.Resampling.LANCZOS)
    base = Image.new("RGB", (600, 600), (250, 250, 250))
    base.paste(product, ((600 - new_size[0]) // 2, (600 - new_size[1]) // 2))

    width, height = base.size
    scale = min(width, height)
    center_font = _font(max(16, round(scale * 0.029)))
    corner_font = _font(max(10, round(scale * 0.016)))
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))

    # Add Get Wired branding over the existing ASC mark; never erase supplier marks.
    text = "GET WIRED AUTOWORX"
    probe = ImageDraw.Draw(overlay)
    bbox = probe.textbbox((0, 0), text, font=center_font, stroke_width=1)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad_x = max(12, round(scale * 0.055))
    pad_y = max(8, round(scale * 0.035))
    tile = Image.new("RGBA", (tw + pad_x * 2, th + pad_y * 2), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    td.rounded_rectangle(
        (1, 1, tile.width - 2, tile.height - 2),
        radius=max(5, round(scale * 0.012)),
        fill=(255, 255, 255, 42),
        outline=(20, 35, 70, 115),
        width=max(1, round(scale * 0.0015)),
    )
    td.text(
        (tile.width // 2, tile.height // 2),
        text,
        font=center_font,
        anchor="mm",
        fill=(20, 35, 70, 118),
        stroke_width=max(1, round(scale * 0.001)),
        stroke_fill=(255, 255, 255, 90),
    )
    tile = tile.rotate(18, expand=True, resample=Image.Resampling.BICUBIC)
    overlay.alpha_composite(tile, ((width - tile.width) // 2, (height - tile.height) // 2))

    corner = "GET WIRED AUTOWORX"
    cb = probe.textbbox((0, 0), corner, font=corner_font)
    cw, ch = cb[2] - cb[0], cb[3] - cb[1]
    margin = max(7, round(scale * 0.018))
    right, bottom = width - margin, height - margin
    left, top = right - cw - margin, bottom - ch - margin
    probe.rounded_rectangle(
        (left, top, right, bottom),
        radius=max(4, round(scale * 0.006)),
        fill=(255, 255, 255, 190),
        outline=(20, 35, 70, 210),
        width=max(1, round(scale * 0.0012)),
    )
    probe.text(
        ((left + right) // 2, (top + bottom) // 2),
        corner,
        font=corner_font,
        anchor="mm",
        fill=(20, 35, 70, 235),
    )

    result = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")
    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, format="JPEG", quality=96, subsampling=0, optimize=True)


def process(image_dir: Path, originals_dir: Path) -> int:
    image_dir.mkdir(parents=True, exist_ok=True)
    originals_dir.mkdir(parents=True, exist_ok=True)
    supported = {".jpg", ".jpeg"}
    current = sorted(p for p in image_dir.iterdir() if p.is_file() and p.suffix.lower() in supported)
    for current_file in current:
        original = originals_dir / current_file.name
        if not original.exists():
            shutil.copy2(current_file, original)

    sources = sorted(p for p in originals_dir.iterdir() if p.is_file() and p.suffix.lower() in supported)
    if not sources:
        raise SystemExit(f"No ASC source images found in {image_dir}")
    for source in sources:
        watermark(source, image_dir / source.name)
    print(f"ASC_PRODUCT_ONLY_WATERMARKED_IMAGES={len(sources)}")
    print(f"ASC_ORIGINALS_PRESERVED={len(sources)}")
    return len(sources)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--image-dir", type=Path, default=Path("assets/asc-auto-electrical-pilot"))
    parser.add_argument("--originals-dir", type=Path, default=Path("assets/asc-auto-electrical-pilot-originals"))
    args = parser.parse_args()
    process(args.image_dir, args.originals_dir)


if __name__ == "__main__":
    main()
