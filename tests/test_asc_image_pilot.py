#!/usr/bin/env python3
"""Verify the generated 50-image ASC treatment sample."""
import csv
import json
from pathlib import Path
OUT = Path("staging/asc-image-treatment-pilot")
PILOT = Path("catalogue-review/asc-catalogue-extraction/asc-50-product-pilot-gw-sku-proposal-review-only.csv")
rows = list(csv.DictReader(PILOT.open(newline="", encoding="utf-8-sig")))
report = json.loads((OUT / "report.json").read_text(encoding="utf-8"))
assert len(rows) == 50, len(rows)
assert report["sample_count"] == 50, report["sample_count"]
assert (OUT / "contact-sheet.jpg").is_file()
for row in rows:
    path = Path(row["treated_image_path"])
    assert path.is_file(), f"Missing treated image: {path}"
    assert row["logo_watermark_applied"].lower() == "true"
    assert row["image_treatment_status"] in {"TREATED_PENDING_VISUAL_QA", "MANUAL_REVIEW_NO_MASK", "MANUAL_REVIEW_MASK_TOO_LARGE"}
assert len(list(OUT.glob("sample-*.jpg"))) == 50
print(f"PASS: 50 ASC images generated; {report['treated_pending_visual_qa']} pending visual QA; {report['manual_review']} manual mask review; contact sheet present.")
