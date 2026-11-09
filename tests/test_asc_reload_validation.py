#!/usr/bin/env python3
"""Deterministic, read-only validation of the six ASC catalogue review datasets."""
import csv
from collections import Counter
from pathlib import Path

MASTER = Path("catalogue-review/asc-catalogue-extraction/asc-master-sku-register-review-only.csv")
STAGING = Path("staging/asc-staged-catalogue-products-do-not-import.csv")
EXPECTED_COUNTS = {
    "ASC- Aerials (1).pdf": 78,
    "ASC- Automotive Sensors (1).pdf": 106,
    "ASC- Automotive Switches (1).pdf": 368,
    "ASC- Automotive globes (1).pdf": 158,
    "ASC- Car Mats (1).pdf": 139,
    "ASC- Fuel Pumps (1).pdf": 129,
}
EXPECTED_DESTINATIONS = {
    "ASC- Aerials (1).pdf": ("Car Audio", "Accessories", "Aerials"),
    "ASC- Automotive Sensors (1).pdf": ("Auto Electrical Spares & Parts", "Automotive Sensors", "Automotive Sensors"),
    "ASC- Automotive Switches (1).pdf": ("Auto Electrical Spares & Parts", "Automotive Switches", "Automotive Switches"),
    "ASC- Automotive globes (1).pdf": ("Auto Electrical Spares & Parts", "Automotive Globes", "Automotive Globes"),
    "ASC- Car Mats (1).pdf": ("Car Care & Accessories", "Car Mats", "Car Mats"),
    "ASC- Fuel Pumps (1).pdf": ("Auto Electrical Spares & Parts", "Fuel Pumps", "Fuel Pumps"),
}
PRICE_LABEL = "Price On Request due to Limited Stock and Availability"

def read_csv(path):
    assert path.is_file(), f"Missing required file: {path}"
    with path.open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))

def require(condition, message):
    if not condition:
        raise AssertionError(message)

def main():
    master = read_csv(MASTER)
    staged = read_csv(STAGING)
    require(len(master) == 978, f"Expected 978 master rows, got {len(master)}")
    require(len(staged) == 978, f"Expected 978 staging rows, got {len(staged)}")

    counts = Counter(row["source_file"] for row in master)
    require(dict(counts) == EXPECTED_COUNTS, f"Catalogue counts differ: {dict(counts)}")
    require(sum(EXPECTED_COUNTS.values()) == 978, "Expected category counts do not total 978")

    supplier_skus = [row["supplier_sku"] for row in master]
    gw_skus = [row["proposed_gw_sku"] for row in master]
    require(all(supplier_skus), "Blank supplier SKU found")
    require(all(gw_skus), "Blank proposed Get Wired SKU found")
    require(len(set(supplier_skus)) == 978, "Duplicate supplier SKU found")
    require(len(set(gw_skus)) == 978, "Duplicate proposed Get Wired SKU found")

    master_by_sku = {}
    for row in master:
        sku = row["supplier_sku"]
        require(row["supplier"] == "ASC", f"Unexpected supplier for {sku}")
        require(row["proposed_gw_sku"] == f"GW-ASC-{sku}", f"GW SKU mismatch for {sku}")
        require(row["source_page"].isdigit(), f"Missing source page for {sku}")
        require(row["product_name_as_printed"].strip(), f"Missing source title for {sku}")
        require(row["import_status"] == "REVIEW_ONLY_NOT_IMPORTED", f"Unexpected import state for {sku}")
        require("NO_PRICE_IN_SOURCE" in row["price_status"], f"Invented/incorrect price state for {sku}")
        require("NOT_SUPPLIED" in row["stock_status"], f"Incorrect stock state for {sku}")
        require("BUYERS GUIDE" not in row["source_file"].upper(), f"Prohibited source included: {row['source_file']}")
        expected = EXPECTED_DESTINATIONS[row["source_file"]]
        actual = (row["store_root"], row["catalogue_category"], row["catalogue_subcategory"])
        require(actual == expected, f"Category mismatch for {sku}: {actual} != {expected}")
        master_by_sku[sku] = row

    staged_skus = [row["supplier_sku"] for row in staged]
    require(len(set(staged_skus)) == 978, "Duplicate supplier SKU in staging")
    require(set(staged_skus) == set(master_by_sku), "Master/staging supplier SKU sets differ")

    for row in staged:
        sku = row["supplier_sku"]
        master_row = master_by_sku[sku]
        require(row["gw_sku"] == master_row["proposed_gw_sku"], f"Staging GW SKU mismatch for {sku}")
        require(row["title"] == master_row["product_name_as_printed"], f"Staging title mismatch for {sku}")
        require(row["pricing_label"] == PRICE_LABEL, f"Incorrect customer price label for {sku}: {row['pricing_label']}")
        require(not row["price_value"].strip(), f"Price value must remain blank for {sku}")
        require(row["staging_status"] == "STAGED_REVIEW_ONLY", f"Unexpected staging status for {sku}")
        require(row["import_gate_control"] == "DO_NOT_IMPORT_WITHOUT_EXPLICIT_OWNER_APPROVAL",
                f"Missing import gate for {sku}")
        require(row["stock_availability"].startswith("Unconfirmed"),
                f"Stock/availability must remain unconfirmed for {sku}")

    print("PASS: ASC review dataset — 978 rows; 6 catalogue totals; unique supplier/GW SKUs; source traceability; approved category mapping; exact Price On Request wording; no price/stock invention; all rows DO NOT IMPORT.")

if __name__ == "__main__":
    main()
