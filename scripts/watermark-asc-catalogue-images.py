#!/usr/bin/env python3
"""Apply the Get Wired AutoWorx ownership watermark to ASC review images.

Original catalogue crops are retained unchanged in a sibling originals folder.
The script is repeatable: every output is regenerated from its preserved source,
so reruns never stack duplicate watermarks.
"""
from __future__ import annotations

import argparse
import shutil
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


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


def watermark(source: Path, destination: Path) -> None:
    with Image.open(source) as opened:
        base = opened.convert("RGB")
    width, height = base.size
    scale = min(width, height)
    center_font = _font(max(11, round(scale * 0.029)))
    corner_font = _font(max(9, round(scale * 0.016)))
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))

    # Central diagonal overlay deliberately sits over (but does not erase) the
    # ASC watermark, identifying the image as Get Wired AutoWorx review stock.
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

    # A smaller, legible corner ownership mark complements the central overlay.
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

    # Preserve each newly added raw crop once. Existing source backups always win.
    for current_file in current:
        original = originals_dir / current_file.name
        if not original.exists():
            shutil.copy2(current_file, original)

    sources = sorted(p for p in originals_dir.iterdir() if p.is_file() and p.suffix.lower() in supported)
    if not sources:
        raise SystemExit(f"No ASC source images found in {image_dir}")
    for source in sources:
        watermark(source, image_dir / source.name)
    print(f"ASC_WATERMARKED_IMAGES={len(sources)}")
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
