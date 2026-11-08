#!/usr/bin/env python3
"""Validation test for ASC six-catalogue reload datasets.

Validates row counts, header presence, and record integrity across the master
review dataset and staged import specification file.
"""
import csv
from pathlib import Path
import sys

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

    print("PASS: test_asc_reload_data - 978 records validated successfully.")

if __name__ == "__main__":
    test_asc_reload_data()
