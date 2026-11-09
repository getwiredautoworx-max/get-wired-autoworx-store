#!/usr/bin/env python3
"""Read-only validation of the 978-row ASC review dataset and editorial pilot.
Owner policy: all customer prices remain Price On Request; no supplier stock or numeric price is invented.
"""
import csv
from collections import Counter
from pathlib import Path

ROOT = Path("catalogue-review/asc-catalogue-extraction")
MASTER = ROOT / "asc-master-sku-register-review-only.csv"
STAGING = Path("staging/asc-staged-catalogue-products-do-not-import.csv")
PILOT = ROOT / "asc-50-product-pilot-gw-sku-proposal-review-only.csv"
PRICE_LABEL = "Price On Request due to Limited Stock and Availability"
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

def read(path):
    assert path.is_file(), f"Missing required file: {path}"
    with path.open(newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))

def require(ok, message):
    if not ok:
        raise AssertionError(message)

def main():
    master, staged, pilot = read(MASTER), read(STAGING), read(PILOT)
    require(len(master) == 978, f"Expected 978 master rows, got {len(master)}")
    require(len(staged) == 978, f"Expected 978 staged rows, got {len(staged)}")
    require(len(pilot) == 50, f"Expected 50 pilot rows, got {len(pilot)}")
    counts = Counter(r["source_file"] for r in master)
    require(dict(counts) == EXPECTED_COUNTS, f"Catalogue counts differ: {dict(counts)}")
    require(sum(EXPECTED_COUNTS.values()) == 978, "Expected catalogue totals do not sum to 978")

    master_by_sku = {}
    for row in master:
        sku = row["supplier_sku"]
        require(bool(sku), "Blank supplier SKU")
        require(sku not in master_by_sku, f"Duplicate supplier SKU: {sku}")
        require(row["supplier"] == "ASC", f"Unexpected supplier on {sku}")
        require(row["proposed_gw_sku"] == f"GW-ASC-{sku}", f"Proposed GW SKU mismatch: {sku}")
        require(row["source_page"].isdigit(), f"Missing/invalid source page: {sku}")
        require(row["product_name_as_printed"].strip(), f"Missing source title: {sku}")
        require(row["source_verification_status"].strip(), f"Missing source verification status: {sku}")
        require(row["image_status"].strip(), f"Missing image status: {sku}")
        require(row["price_status"].startswith("NO_PRICE_IN_SOURCE"), f"Unexpected price evidence: {sku}")
        require(row["stock_status"].startswith("NOT_SUPPLIED"), f"Unexpected stock evidence: {sku}")
        require(row["import_status"] == "REVIEW_ONLY_NOT_IMPORTED", f"Unexpected import state: {sku}")
        require("BUYERS GUIDE" not in row["source_file"].upper(), f"Unapproved source included: {row['source_file']}")
        expected = EXPECTED_DESTINATIONS[row["source_file"]]
        actual = (row["store_root"], row["catalogue_category"], row["catalogue_subcategory"])
        require(actual == expected, f"Category mismatch for {sku}: {actual} != {expected}")
        master_by_sku[sku] = row

    staged_skus = [r["supplier_sku"] for r in staged]
    require(len(set(staged_skus)) == 978, "Duplicate staged supplier SKU")
    require(set(staged_skus) == set(master_by_sku), "Master/staging SKU sets differ")
    for row in staged:
        sku = row["supplier_sku"]
        source = master_by_sku[sku]
        require(row["gw_sku"] == source["proposed_gw_sku"], f"Staged GW SKU mismatch: {sku}")
        require(row["title"] == source["product_name_as_printed"], f"Staged title mismatch: {sku}")
        require(row["pricing_label"] == PRICE_LABEL, f"Incorrect ASC price label: {sku}")
        require(not row["price_value"].strip(), f"Numeric price must remain blank: {sku}")
        require(row["stock_availability"].startswith("Unconfirmed"), f"Stock must remain unconfirmed: {sku}")
        require(row["staging_status"] == "STAGED_REVIEW_ONLY", f"Unexpected staging status: {sku}")
        require(row["import_gate_control"] == "DO_NOT_IMPORT_WITHOUT_EXPLICIT_OWNER_APPROVAL", f"Missing import gate: {sku}")
        require(row["image_approval_status"].startswith("OWNER_AUTHORIZED"), f"Image status not aligned with owner authorization: {sku}")

    pilot_skus = [r["supplier_sku"] for r in pilot]
    require(len(set(pilot_skus)) == 50, "Duplicate pilot supplier SKU")
    require(all(r["candidate_image_path_from_preview_branch"].strip() for r in pilot), "Pilot source image reference missing")
    fitment_count = sum(bool(r["fitment_as_printed"].strip()) for r in pilot)
    spec_count = sum(bool(r["technical_specs_as_printed"].strip()) for r in pilot)
    require(fitment_count == 42, f"Expected 42 manually verified pilot fitments, got {fitment_count}")
    require(spec_count == 0, f"Expected no transcribed technical specs yet, got {spec_count}")
    require(all(r["import_status"] == "REVIEW_ONLY_NOT_IMPORTED" for r in pilot), "Pilot contains a non-review-only row")
    print("PASS: ASC review register 978/978; unique supplier/GW SKUs; six source totals; source-page/category mapping; exact POR labels; no numeric price/stock invention; DO NOT IMPORT.")
    print(f"PILOT: 50 rows; {fitment_count} printed fitments transcribed; {spec_count} technical-spec rows transcribed; all review-only.")

if __name__ == "__main__":
    main()
