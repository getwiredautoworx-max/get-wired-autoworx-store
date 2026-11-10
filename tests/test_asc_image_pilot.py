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
    result = next(x for x in report["results"] if x["supplier_sku"] == row["supplier_sku"])
    source_height = int(row["source_dimensions"].split("x")[1])
    source_name = Path(row["candidate_image_path_from_preview_branch"]).name
    long_product_names = {
        "asc-m7-avan01.jpg", "asc-m7-con01.jpg", "asc-m7-cor01.jpg", "asc-m7-cor02.jpg",
        "asc-m7-gf1.jpg", "asc-m7-bme36.jpg", "asc-m7-bme46.jpg", "asc-m7-bme87.jpg",
        "asc-9005-cbl-h.jpg", "asc-9005-h.jpg", "asc-9005-nb.jpg", "asc-9005xs.jpg",
        "asc-h1865w-h.jpg", "asc-h1960-55w-h.jpg", "asc-h355w-cbl.jpg", "asc-h355w-h.jpg"
    }
    fuel_pump_names = {
        "asc-f1-012.jpg", "asc-f1-019.jpg", "asc-f1-060.jpg", "asc-f1-067.jpg",
        "asc-f1-001.jpg", "asc-f1-001-e.jpg", "asc-f1-009.jpg", "asc-f1-017.jpg", "asc-f1-028.jpg"
    }
    expected_ratio = 0.92 if source_name in fuel_pump_names else 0.78 if source_name in long_product_names else 0.72
    assert result["crop_bottom"] == round(source_height * expected_ratio), f"Wrong product crop boundary for {row['supplier_sku']}"
    expected_masks = 2 if source_name in fuel_pump_names else 1 if source_name in long_product_names else 0
    assert result["caption_masks_applied"] == expected_masks, f"Caption/code masks missing for {row['supplier_sku']}"
    assert row["image_treatment_status"] in {"TREATED_PENDING_VISUAL_QA", "MANUAL_REVIEW_NO_MASK", "MANUAL_REVIEW_MASK_TOO_LARGE"}
assert len(list(OUT.glob("sample-*.jpg"))) == 50
print(f"PASS: 50 ASC images generated; {report['treated_pending_visual_qa']} pending visual QA; {report['manual_review']} manual mask review; contact sheet present.")
