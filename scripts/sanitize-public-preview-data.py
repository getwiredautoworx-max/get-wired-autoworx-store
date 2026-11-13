#!/usr/bin/env python3
"""Remove supplier identities and internal procurement fields from public preview JSON."""
from pathlib import Path
import json
import re
import sys

ASSET_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("pages-public/assets")
FILES = [
    "audio-catalogue-primary-preview.json",
    "audio-catalogue-secondary-preview.json",
    "audio-model-verification-preview.json",
    "auto-electrical-owner-preview.json",
    "product-image-treatment-sample.json",
]
FORBIDDEN_KEYS = re.compile(
    r"^(supplier(name|sku|modelnumber)?|dealer(cost|price)|wholesaleprice|internal(sku|id)|sourceskureferenceinternal|gwsku)$",
    re.I,
)
SUPPLIER_NAMES = re.compile(r"Planetworld|Audio\s+Connections", re.I)

def clean(value, strip_audio_model_numbers=False):
    if isinstance(value, dict):
        result = {}
        for key, child in value.items():
            if FORBIDDEN_KEYS.match(str(key)):
                continue
            if strip_audio_model_numbers and str(key).lower() in {"modelnumber", "manufacturermodelnumber"}:
                continue
            result[key] = clean(child, strip_audio_model_numbers)
        return result
    if isinstance(value, list):
        return [clean(item, strip_audio_model_numbers) for item in value]
    if isinstance(value, str):
        return SUPPLIER_NAMES.sub("supplier", value)
    return value

for filename in FILES:
    path = ASSET_DIR / filename
    if not path.is_file():
        continue
    data = json.loads(path.read_text(encoding="utf-8"))
    strip_audio_model_numbers = filename.startswith("audio-")
    path.write_text(json.dumps(clean(data, strip_audio_model_numbers), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"PUBLIC_PREVIEW_DATA_SANITIZED {filename}")
