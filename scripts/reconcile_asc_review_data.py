#!/usr/bin/env python3
"""Apply the owner's current ASC review-only price, stock and image-treatment rules."""
import csv
from pathlib import Path

ROOT = Path("catalogue-review/asc-catalogue-extraction")
MASTER = ROOT / "asc-master-sku-register-review-only.csv"
PILOT = ROOT / "asc-50-product-pilot-gw-sku-proposal-review-only.csv"
STAGING = Path("staging/asc-staged-catalogue-products-do-not-import.csv")
PRICE_LABEL = "Price On Request due to Limited Stock and Availability"
NO_PRICE = "NO_PRICE_IN_SOURCE; PRICE_ON_REQUEST_OWNER_POLICY"
NO_STOCK = "NOT_SUPPLIED; AVAILABILITY_CONFIRMATION_REQUIRED"
IMAGE_NOTE = (
    "Source-page product identity and image match have been visually checked. "
    "The owner authorises ASC image use and editing: remove the ASC watermark, "
    "apply the Get Wired AutoWorx logo watermark, and crop catalogue caption text "
    "outside the product image. Final images remain review-only pending visual QA."
)

def load(path):
    with path.open(newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))

def save(path, rows):
    fields = list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

master = load(MASTER)
staged = load(STAGING)
pilot = load(PILOT)
assert len(master) == 978, f"Expected 978 master rows, got {len(master)}"
assert len(staged) == 978, f"Expected 978 staged rows, got {len(staged)}"
assert len(pilot) == 50, f"Expected 50 pilot rows, got {len(pilot)}"

for row in master:
    row["price_status"] = NO_PRICE
    row["stock_status"] = NO_STOCK
    if "IMAGE_ON_REQUEST" in row.get("image_status", "") or "NO_PRODUCT_PHOTO" in row.get("image_status", ""):
        row["image_status"] = "IMAGE_ON_REQUEST_IN_SOURCE; NO_PRODUCT_PHOTO; OWNER_AUTHORIZED_WHEN_AVAILABLE"
    else:
        row["image_status"] = "SOURCE_PRODUCT_PHOTO_VERIFIED; OWNER_AUTHORIZED_GW_WATERMARK_TREATMENT_PENDING"
    row["review_note"] = IMAGE_NOTE + " Price and availability remain unconfirmed; customer display is Price On Request."
save(MASTER, master)

for row in staged:
    row["pricing_label"] = PRICE_LABEL
    row["price_value"] = ""
    row["stock_availability"] = "Unconfirmed - current supplier stock is not synchronised"
    if "IMAGE_ON_REQUEST" in row.get("image_approval_status", "") or "NO_PRODUCT_PHOTO" in row.get("image_approval_status", ""):
        row["image_approval_status"] = "OWNER_AUTHORIZED_NO_SOURCE_PHOTO_AVAILABLE"
    else:
        row["image_approval_status"] = "OWNER_AUTHORIZED_GW_WATERMARK_TREATMENT_PENDING"
    row["staging_status"] = "STAGED_REVIEW_ONLY"
    row["import_gate_control"] = "DO_NOT_IMPORT_WITHOUT_EXPLICIT_OWNER_APPROVAL"
    row["notes"] = IMAGE_NOTE + " No numeric price or physical stock claim; review-only."
save(STAGING, staged)

extra_fields = ["treated_image_path", "image_treatment_status", "watermark_mask_ratio", "watermark_pixels_removed", "logo_watermark_applied", "source_dimensions"]
for row in pilot:
    row["price_status"] = NO_PRICE
    row["stock_status"] = NO_STOCK
    row["image_status_on_this_branch"] = "SOURCE_REFERENCE_AVAILABLE_FOR_OWNER_AUTHORIZED_TREATMENT"
    row["image_review_status"] = "SOURCE_MATCH_VERIFIED; OWNER_AUTHORIZED_GW_WATERMARK_TREATMENT_PENDING"
    row["image_review_notes"] = IMAGE_NOTE
    for field in extra_fields:
        row.setdefault(field, "")
save(PILOT, pilot)

print("RECONCILED: 978 ASC master rows; 978 staged rows; 50 image-pilot rows.")
print("POLICY: exact ASC Price On Request wording; no numeric prices or stock; owner-authorised image treatment; all records DO NOT IMPORT.")
