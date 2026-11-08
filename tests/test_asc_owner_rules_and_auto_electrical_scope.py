#!/usr/bin/env python3
"""Owner-rule regression checks for the four priority ASC Auto Electrical catalogues."""
import csv
from collections import Counter
from pathlib import Path

MASTER = Path("catalogue-review/asc-catalogue-extraction/asc-master-sku-register-review-only.csv")
STAGING = Path("staging/asc-staged-catalogue-products-do-not-import.csv")
EXPECTED = {
    "Automotive Sensors": 106,
    "Automotive Switches": 368,
    "Automotive Globes": 158,
    "Fuel Pumps": 129,
}
PRICE = "PRICE_ON_REQUEST_DUE_TO_LIMITED_STOCK_AND_AVAILABILITY"
IMAGE = "OWNER_AUTHORISED_IMAGE_CLEANUP"

def test_owner_rules_and_four_category_scope():
    with MASTER.open(encoding="utf-8-sig", newline="") as f:
        master = list(csv.DictReader(f))
    with STAGING.open(encoding="utf-8-sig", newline="") as f:
        staged = list(csv.DictReader(f))

    assert len(master) == 978
    assert len(staged) == 978

    priority = [r for r in master if r["catalogue_subcategory"] in EXPECTED]
    counts = Counter(r["catalogue_subcategory"] for r in priority)
    assert dict(counts) == EXPECTED
    assert len(priority) == 761

    assert all(r["price_status"] == PRICE for r in master)
    assert all(r["pricing_label"] == "Price On Request due to Limited Stock and Availability" for r in staged)
    assert all(r["import_status"] == "REVIEW_ONLY_NOT_IMPORTED" for r in master)
    assert all(r["import_gate_control"] == "DO_NOT_IMPORT_WITHOUT_EXPLICIT_OWNER_APPROVAL" for r in staged)

    # Rights and current dealer-price sheets must not appear as blockers.
    joined = "\n".join(r["image_status"] for r in master)
    assert IMAGE in joined
    assert "RIGHTS_CLEARANCE_REQUIRED" not in joined
    assert "CURRENT_DEALER_COST_REQUIRED" not in "\n".join(r["price_status"] for r in master)

if __name__ == "__main__":
    test_owner_rules_and_four_category_scope()
    print("PASS: 978 ASC review rows; 761 priority Auto Electrical rows; exact quote wording; image cleanup authorised; DO_NOT_IMPORT gates intact.")
