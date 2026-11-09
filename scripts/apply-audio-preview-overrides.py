#!/usr/bin/env python3
"""Apply explicitly verified, review-only product enrichments to the public preview copy."""
from pathlib import Path
import json
import sys

asset_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("pages-public/assets")
base_path = asset_dir / "audio-catalogue-primary-preview.json"
override_path = Path("assets/audio-product-enrichment-overrides.json")
base = json.loads(base_path.read_text(encoding="utf-8"))
overrides = json.loads(override_path.read_text(encoding="utf-8")).get("records", [])
by_id = {row.get("id"): row for row in base.get("records", [])}
if len(by_id) != len(base.get("records", [])):
    raise SystemExit("AUDIO_OVERRIDE_FAIL duplicate primary preview record IDs")
applied = 0
for override in overrides:
    record_id = override.get("id")
    if not record_id or record_id not in by_id:
        raise SystemExit(f"AUDIO_OVERRIDE_FAIL primary record not found: {record_id}")
    row = by_id[record_id]
    for key, value in override.items():
        if key == "id":
            continue
        if key == "modelNumber" and value is None:
            row.pop("modelNumber", None)
            continue
        row[key] = value
    applied += 1
base_path.write_text(json.dumps(base, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
print(f"AUDIO_PREVIEW_OVERRIDES_APPLIED records={applied}")
