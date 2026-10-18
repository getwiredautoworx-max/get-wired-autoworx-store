#!/usr/bin/env python3
"""Parallel OCR audit of public-SKU WebP assets for supplier/catalogue marks.

Flagged assets must be held from customer display until clean, exact-SKU
manufacturer/OEM images are verified. This script never edits product photos.
"""
from __future__ import annotations

import json
import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image, ImageOps, ImageEnhance
import pytesseract

ROOT = Path("assets/products_webp")
HOLD_FILE = Path("assets/product-image-quality.js")
OUTPUT = Path("artifacts/product-image-watermark-audit.json")
SKU_RE = re.compile(r"^GW-[A-Z0-9]{8}$")
WATERMARK_PATTERNS = [
    re.compile(r"GET\s*WIRED", re.I),
    re.compile(r"AUTOWORX", re.I),
    re.compile(r"ASC.{0,45}SPARES|SPARES.{0,45}ASC", re.I),
    re.compile(r"ACCESSORIES.{0,35}SPARES|SPARES.{0,35}ACCESSORIES", re.I),
    re.compile(r"PTY\s*LTD", re.I),
    re.compile(r"BUYERS?\s*GUIDE|CATALOGUE", re.I),
]


def inspect_image(path: Path, held: set[str]) -> tuple[dict | None, dict | None]:
    sku = path.stem.upper()
    if not SKU_RE.fullmatch(sku):
        return None, None
    try:
        with Image.open(path) as source:
            source.load()
            image = source.convert("RGB")
            image.thumbnail((900, 900))
            image = ImageOps.autocontrast(ImageOps.grayscale(image))
            image = ImageEnhance.Contrast(image).enhance(1.35)
            text = pytesseract.image_to_string(image, config="--psm 11")
        normalized = re.sub(r"\s+", " ", text).strip()
        matched = sorted({pattern.pattern for pattern in WATERMARK_PATTERNS if pattern.search(normalized)})
        if matched:
            return ({
                "sku": sku,
                "file": str(path),
                "held": sku in held,
                "matched_patterns": matched,
                "ocr_excerpt": normalized[:260],
            }, None)
        return None, None
    except Exception as exc:
        return None, {"sku": sku, "file": str(path), "error": str(exc)[:180]}


def main() -> int:
    if not ROOT.is_dir():
        print(f"Image directory missing: {ROOT}", file=sys.stderr)
        return 2
    hold_text = HOLD_FILE.read_text(encoding="utf-8")
    held = set(re.findall(r"'(GW-[A-Z0-9]{8})'", hold_text))
    paths = [p for p in sorted(ROOT.glob("*.webp")) if SKU_RE.fullmatch(p.stem.upper())]
    candidates: list[dict] = []
    unreadable: list[dict] = []
    # Tesseract runs in its own subprocess; bounded parallelism reduces wall
    # time without saturating the GitHub runner or changing OCR settings.
    workers = min(4, max(1, os.cpu_count() or 1))
    with ThreadPoolExecutor(max_workers=workers) as pool:
        for candidate, failure in pool.map(lambda path: inspect_image(path, held), paths):
            if candidate:
                candidates.append(candidate)
            if failure:
                unreadable.append(failure)
    candidates.sort(key=lambda item: item["sku"])
    unreadable.sort(key=lambda item: item["sku"])
    unheld = [item for item in candidates if not item["held"]]
    report = {
        "scanned_webp_assets": len(paths),
        "held_skus": sorted(held),
        "watermark_candidates": len(candidates),
        "held_watermark_candidates": sum(1 for item in candidates if item["held"]),
        "unheld_watermark_candidates": unheld,
        "unreadable_images": unreadable,
        "all_candidates": candidates,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({key: report[key] for key in (
        "scanned_webp_assets", "watermark_candidates", "held_watermark_candidates",
        "unheld_watermark_candidates", "unreadable_images"
    )}, indent=2, ensure_ascii=False))
    return 1 if unheld or unreadable else 0


if __name__ == "__main__":
    raise SystemExit(main())
