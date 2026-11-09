#!/usr/bin/env python3
"""Read-only completeness audit for the local owner-preview audio catalogue datasets."""
from collections import Counter
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
FILES = {
    "planetworld_snapshot": ROOT / "assets/audio-catalogue-primary-preview.json",
    "audio_connections_review": ROOT / "assets/audio-catalogue-secondary-preview.json",
}
IMAGE_KEYS = ("imageUrl", "image", "image_url", "productImage", "product_image", "photoUrl", "thumbnail")
DESCRIPTION_KEYS = ("description", "productDescription", "shortDescription", "longDescription", "technicalSpecifications", "specifications", "features")
MODEL_KEYS = ("modelNumber", "model", "model_number", "manufacturerProductName", "title", "name")
BRAND_KEYS = ("brand", "brandName", "manufacturer", "manufacturerName")
COMPONENT_KEYS = ("component", "productType", "category", "type")
REVIEW_KEY_RE = re.compile(r"(review|manual|unclassified|hold|pending)", re.I)

def nonempty(record, keys):
    return any(isinstance(record.get(k), str) and record[k].strip() for k in keys)

def audit(name, path):
    data = json.loads(path.read_text(encoding="utf-8"))
    rows = data.get("records", data.get("products", []))
    summary = {
        "records": len(rows),
        "missingImage": 0,
        "missingDescription": 0,
        "missingModelOrTitle": 0,
        "missingBrand": 0,
        "missingComponent": 0,
        "reviewFlagged": 0,
        "imageStatuses": Counter(),
        "publicationStatuses": Counter(),
        "divisions": Counter(),
        "collections": Counter(),
        "components": Counter(),
        "topRecordKeys": sorted(rows[0].keys()) if rows else [],
        "source": data.get("source"),
    }
    model_keys = Counter()
    for row in rows:
        if not nonempty(row, IMAGE_KEYS):
            summary["missingImage"] += 1
        if not nonempty(row, DESCRIPTION_KEYS):
            summary["missingDescription"] += 1
        if not nonempty(row, MODEL_KEYS):
            summary["missingModelOrTitle"] += 1
        if not nonempty(row, BRAND_KEYS):
            summary["missingBrand"] += 1
        if not nonempty(row, COMPONENT_KEYS):
            summary["missingComponent"] += 1
        if any(REVIEW_KEY_RE.search(str(k)) and bool(v) for k, v in row.items()):
            summary["reviewFlagged"] += 1
        summary["imageStatuses"][str(row.get("imageStatus", "unspecified"))] += 1
        summary["publicationStatuses"][str(row.get("publicationStatus", "unspecified"))] += 1
        summary["divisions"][str(row.get("division", "unspecified"))] += 1
        summary["collections"][str(row.get("collection", "unspecified"))] += 1
        summary["components"][str(row.get("component", "unspecified"))] += 1
        brand = str(row.get("brand", "")).strip().casefold()
        model = str(row.get("modelNumber") or row.get("model") or "").strip().casefold()
        if brand and model:
            model_keys[(brand, model)] += 1
    summary["duplicateBrandModelGroups"] = sum(1 for n in model_keys.values() if n > 1)
    for key in ("imageStatuses", "publicationStatuses", "divisions", "collections", "components"):
        summary[key] = dict(summary[key].most_common(40))
    return name, summary

results = dict(audit(name, path) for name, path in FILES.items() if path.is_file())
if len(results) != len(FILES):
    raise SystemExit("AUDIO_PREVIEW_AUDIT_FAIL missing one or more expected catalogue JSON files")
print("AUDIO_PREVIEW_AUDIT_START")
print(json.dumps(results, ensure_ascii=False, indent=2))
print("AUDIO_PREVIEW_AUDIT_COMPLETE")
