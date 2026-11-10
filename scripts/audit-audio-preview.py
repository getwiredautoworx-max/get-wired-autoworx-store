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
VERIFIED_IMAGE_STATUSES = {
    "owner_authorized_exact_retailer_image_verified_review_only",
    "official_manufacturer_image_verified_review_only",
    "official_manufacturer_image_owner_authorized_for_store_preview",
    "EXACT_MODEL_DISTRIBUTOR_IMAGE_REVIEW_ONLY",
    "EXACT_MODEL_RETAILER_IMAGE_REVIEW_ONLY",
    "owner_authorized_exact_supplier_image_verified_review_only",
}
MODEL_KEYS = ("modelNumber", "model", "model_number", "manufacturerProductName", "title", "name")
BRAND_KEYS = ("brand", "brandName", "manufacturer", "manufacturerName")
COMPONENT_KEYS = ("component", "productType", "category", "type")
REVIEW_KEY_RE = re.compile(r"(review|manual|unclassified|hold|pending)", re.I)

def nonempty(record, keys):
    return any(isinstance(record.get(k), str) and record[k].strip() for k in keys)

def audit(name, path):
    data = json.loads(path.read_text(encoding="utf-8"))
    rows = data.get("records", data.get("products", []))
    overrides_path = ROOT / "assets/audio-product-enrichment-overrides.json"
    if overrides_path.is_file():
        override_rows = json.loads(overrides_path.read_text(encoding="utf-8")).get("records", [])
        for override in override_rows:
            match = override.get("match") or {}
            matches = [row for row in rows if row.get("id") == override["id"]] if override.get("id") and any(row.get("id") == override["id"] for row in rows) else []
            if not matches and match:
                def match_row(row):
                    for key, expected in match.items():
                        if key == "title_contains":
                            if str(expected).casefold() not in str(row.get("title", "")).casefold():
                                return False
                        elif str(row.get(key, "")).casefold() != str(expected).casefold():
                            return False
                    return True
                matches = [row for row in rows if match_row(row)]
            if len(matches) > 1:
                raise SystemExit(f"AUDIO_AUDIT_FAIL expected at most one exact override match, found {len(matches)}")
            if not matches and override.get("appendIfMissing"):
                matches = [{"id": override.get("id")}]
                rows.append(matches[0])
            elif not matches:
                raise SystemExit("AUDIO_AUDIT_FAIL verified override target not found")
            for key, value in override.items():
                if key not in ("id", "match", "appendIfMissing"):
                    matches[0][key] = value
    summary = {
        "records": len(rows),
        "missingImage": 0,
        "missingDescription": 0,
        "missingModelOrTitle": 0,
        "missingBrand": 0,
        "missingComponent": 0,
        "reviewFlagged": 0,
        "verifiedImageAndDescription": 0,
        "imageFieldCounts": Counter(),
        "descriptionFieldCounts": Counter(),
        "harnessTrimKeywordCounts": Counter(),
        "harnessTrimExamples": [],
        "byDivision": {},
        "byCollection": {},
        "sampleRowsByDivision": {},
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
        for key in IMAGE_KEYS:
            if isinstance(row.get(key), str) and row[key].strip():
                summary["imageFieldCounts"][key] += 1
        for key in DESCRIPTION_KEYS:
            if isinstance(row.get(key), str) and row[key].strip():
                summary["descriptionFieldCounts"][key] += 1
        if not nonempty(row, DESCRIPTION_KEYS):
            summary["missingDescription"] += 1
        if not nonempty(row, MODEL_KEYS):
            summary["missingModelOrTitle"] += 1
        if not nonempty(row, BRAND_KEYS):
            summary["missingBrand"] += 1
        if not nonempty(row, COMPONENT_KEYS):
            summary["missingComponent"] += 1
        for group_key, group_name in (("byDivision", str(row.get("division", "unspecified"))), ("byCollection", str(row.get("collection", "unspecified")))):
            bucket = summary[group_key].setdefault(group_name, Counter())
            bucket["records"] += 1
            bucket["withImage"] += int(nonempty(row, IMAGE_KEYS))
            bucket["withDescription"] += int(nonempty(row, DESCRIPTION_KEYS))
            bucket["withBoth"] += int(nonempty(row, IMAGE_KEYS) and nonempty(row, DESCRIPTION_KEYS))
            bucket["verifiedImageAndDescription"] += int(nonempty(row, IMAGE_KEYS) and nonempty(row, DESCRIPTION_KEYS) and row.get("imageStatus") in VERIFIED_IMAGE_STATUSES)
        if nonempty(row, IMAGE_KEYS) and nonempty(row, DESCRIPTION_KEYS) and row.get("imageStatus") in VERIFIED_IMAGE_STATUSES:
            summary["verifiedImageAndDescription"] += 1
        review_values = " ".join(str(row.get(k, "")) for k in ("reviewStatus", "publicationStatus", "imageStatus", "classificationStatus"))
        if row.get("manualReview") or row.get("needsReview") or row.get("reviewRequired") or row.get("component") == "Manual Product-Type Review" or re.search(r"(?:^|\b)(?:HOLD|MANUAL_REVIEW|REVIEW_REQUIRED|UNCLASSIFIED)", review_values, re.I):
            summary["reviewFlagged"] += 1
        if row.get("collection") == "Harnesses & Trims" or row.get("component") == "Harnesses, Trims & Fitment":
            title = " ".join(str(row.get(k, "")) for k in ("title", "name", "description", "modelNumber")).lower()
            harness = bool(re.search(r"\b(harness|loom|adapter|adaptor|interface|patch lead|wiring|iso2car|fakra|mute|iso speaker plug|to iso|new jvc to)\b", title))
            trim = bool(re.search(r"\b(trim|fascia|bezel|surround|dash kit|panel|[0-9]+[- ]?din|[0-9]+[- ]?inch)\b", title))
            label = "both" if harness and trim else "harness" if harness else "trim" if trim else "unclassified"
            summary["harnessTrimKeywordCounts"][label] += 1
            if label == "unclassified" and len(summary["harnessTrimExamples"]) < 12:
                summary["harnessTrimExamples"].append(str(row.get("title") or row.get("name") or "")[:140])
        summary["imageStatuses"][str(row.get("imageStatus", "unspecified"))] += 1
        summary["publicationStatuses"][str(row.get("publicationStatus", "unspecified"))] += 1
        summary["divisions"][str(row.get("division", "unspecified"))] += 1
        summary["collections"][str(row.get("collection", "unspecified"))] += 1
        summary["components"][str(row.get("component", "unspecified"))] += 1
        division_name = str(row.get("division", "unspecified"))
        if division_name in ("Home CI", "Home Retail", "Installed AV") and len(summary["sampleRowsByDivision"].setdefault(division_name, [])) < 15:
            summary["sampleRowsByDivision"][division_name].append({"brand": row.get("brand"), "title": row.get("title"), "component": row.get("component"), "collection": row.get("collection")})
        brand = str(row.get("brand", "")).strip().casefold()
        model = str(row.get("modelNumber") or row.get("model") or "").strip().casefold()
        if brand and model:
            model_keys[(brand, model)] += 1
    summary["duplicateBrandModelGroups"] = sum(1 for n in model_keys.values() if n > 1)
    for key in ("imageStatuses", "publicationStatuses", "divisions", "collections", "components", "harnessTrimKeywordCounts", "imageFieldCounts", "descriptionFieldCounts"):
        summary[key] = dict(summary[key].most_common(40))
    for group_key in ("byDivision", "byCollection"):
        summary[group_key] = {k: dict(v) for k, v in summary[group_key].items()}
    return name, summary

results = dict(audit(name, path) for name, path in FILES.items() if path.is_file())
if len(results) != len(FILES):
    raise SystemExit("AUDIO_PREVIEW_AUDIT_FAIL missing one or more expected catalogue JSON files")
print("AUDIO_PREVIEW_AUDIT_START")
print(json.dumps(results, ensure_ascii=False, indent=2))
print("AUDIO_PREVIEW_AUDIT_COMPLETE")
