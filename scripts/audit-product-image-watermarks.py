#!/usr/bin/env python3
"""OCR audit of public-SKU WebP assets for embedded supplier/catalogue watermarks.

Images with a detected supplier/brand overlay must be in the customer-image hold
list until a clean, verified replacement is available. This intentionally does
not edit or inpaint product photos.
"""
from __future__ import annotations
import json, re, sys
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

def main() -> int:
    if not ROOT.is_dir():
        print(f"Image directory missing: {ROOT}", file=sys.stderr)
        return 2
    hold_text = HOLD_FILE.read_text(encoding="utf-8")
    held = set(re.findall(r"'(GW-[A-Z0-9]{8})'", hold_text))
    candidates, unreadable, scanned = [], [], 0
    for path in sorted(ROOT.glob("*.webp")):
        sku = path.stem.upper()
        if not SKU_RE.fullmatch(sku):
            continue
        scanned += 1
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
                candidates.append({
                    "sku": sku,
                    "file": str(path),
                    "held": sku in held,
                    "matched_patterns": matched,
                    "ocr_excerpt": normalized[:260],
                })
        except Exception as exc:
            unreadable.append({"sku": sku, "file": str(path), "error": str(exc)[:180]})
    unheld = [item for item in candidates if not item["held"]]
    report = {
        "scanned_webp_assets": scanned,
        "held_skus": sorted(held),
        "watermark_candidates": len(candidates),
        "held_watermark_candidates": sum(1 for item in candidates if item["held"]),
        "unheld_watermark_candidates": unheld,
        "unreadable_images": unreadable,
        "all_candidates": candidates,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({k: report[k] for k in (
        "scanned_webp_assets", "watermark_candidates", "held_watermark_candidates",
        "unheld_watermark_candidates", "unreadable_images"
    )}, indent=2, ensure_ascii=False))
    return 1 if unheld or unreadable else 0

if __name__ == "__main__":
    raise SystemExit(main())
