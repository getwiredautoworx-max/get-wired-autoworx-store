#!/usr/bin/env python3
"""Validation test for ASC six-catalogue review-only datasets.

Validates row counts, owner-approved customer price wording, image-edit status,
and explicit no-import controls.
"""
import csv
from pathlib import Path

EXPECTED_PRICE_LABEL = "Price On Request due to Limited Stock and Availability"
EXPECTED_IMAGE_STATUS = "OWNER_AUTHORIZED_EDIT_AND_VISUAL_QA_PENDING"
EXPECTED_IMPORT_GATE = "DO_NOT_IMPORT_WITHOUT_EXPLICIT_OWNER_APPROVAL"


def test_asc_reload_data():
    master_path = Path("catalogue-review/asc-catalogue-extraction/asc-master-sku-register-review-only.csv")
    staging_path = Path("staging/asc-staged-catalogue-products-do-not-import.csv")

    assert master_path.exists(), f"Missing {master_path}"
    assert staging_path.exists(), f"Missing {staging_path}"

    with open(master_path, "r", encoding="utf-8") as f:
        master_rows = list(csv.DictReader(f))

    with open(staging_path, "r", encoding="utf-8") as f:
        staging_rows = list(csv.DictReader(f))

    assert len(master_rows) == 978, f"Expected 978 master rows, got {len(master_rows)}"
    assert len(staging_rows) == 978, f"Expected 978 staging rows, got {len(staging_rows)}"

    for row in staging_rows:
        assert row["pricing_label"] == EXPECTED_PRICE_LABEL, (
            f"Incorrect ASC customer price wording for {row['gw_sku']}: {row['pricing_label']}"
        )
        assert row["image_approval_status"] == EXPECTED_IMAGE_STATUS, (
            f"Incorrect image workflow status for {row['gw_sku']}: {row['image_approval_status']}"
        )
        assert row["import_gate_control"] == EXPECTED_IMPORT_GATE, (
            f"Missing owner import gate for {row['gw_sku']}"
        )

    print("PASS: 978 ASC records; exact owner price wording, image workflow status, and DO NOT IMPORT gate validated.")


if __name__ == "__main__":
    test_asc_reload_data()
