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
    row = by_id.get(record_id) if record_id else None
    if row is None:
        match = override.get("match") or {}
        def matches(candidate):
            for key, expected in match.items():
                if key == "title_contains":
                    if str(expected).casefold() not in str(candidate.get("title", "")).casefold():
                        return False
                elif str(candidate.get(key, "")).casefold() != str(expected).casefold():
                    return False
            return bool(match)
        found = [candidate for candidate in base.get("records", []) if matches(candidate)]
        if len(found) > 1:
            raise SystemExit(f"AUDIO_OVERRIDE_FAIL expected at most one exact match, found {len(found)} for {match}")
        if not found and override.get("appendIfMissing"):
            row = {"id": record_id}
            base.setdefault("records", []).append(row)
            if record_id:
                by_id[record_id] = row
        elif len(found) == 1:
            row = found[0]
        else:
            raise SystemExit(f"AUDIO_OVERRIDE_FAIL primary record not found for {match or record_id}")
    for key, value in override.items():
        if key in ("id", "match", "appendIfMissing"):
            continue
        if key == "modelNumber" and value is None:
            row.pop("modelNumber", None)
            continue
        row[key] = value
    applied += 1
base_path.write_text(json.dumps(base, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"AUDIO_PREVIEW_OVERRIDES_APPLIED records={applied}")
