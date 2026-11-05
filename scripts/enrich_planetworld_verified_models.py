#!/usr/bin/env python3
"""Enrich preview-only Planetworld rows with exact-model details and image candidates.

Supplier SKU matching is internal only. No supplier SKU or source model-number
crosswalk is written into the public preview JSON. Internal audits remain
outside the Cloudflare Pages package.
"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "assets" / "planetworld-catalogue-preview.json"
VERIFIED_PATH = ROOT / "assets" / "planetworld-verified-models-preview.json"
ONE_AUDIT_PATH = ROOT / "catalogue-review" / "planetworld-one-official-model-audit.csv"
IMAGE_AUDIT_PATH = ROOT / "catalogue-review" / "PLANETWORLD_PRODUCT_IMAGE_AUDIT_2026-11-05.csv"
CHUNK_DIR = ROOT / "catalogue-review" / "planetworld-row-chunks"
CHUNKS = [CHUNK_DIR / f"planetworld-rows-{n:02d}.csv" for n in range(1, 8)]


def norm(value: str | None) -> str:
    return re.sub(r"[^A-Z0-9]+", "", str(value or "").upper())


def main() -> None:
    source_rows: list[dict[str, str]] = []
    for path in CHUNKS:
        with path.open(newline="", encoding="utf-8-sig") as handle:
            source_rows.extend(csv.DictReader(handle))

    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    verified = json.loads(VERIFIED_PATH.read_text(encoding="utf-8")).get("records", [])
    products = data.get("records", [])
    if len(source_rows) != 3317 or len(products) != len(source_rows) or len(verified) != 68:
        raise SystemExit(
            f"Unexpected image-enrichment input counts: source={len(source_rows)}, "
            f"products={len(products)}, verified_models={len(verified)}"
        )

    with ONE_AUDIT_PATH.open(newline="", encoding="utf-8-sig") as handle:
        one_rows = list(csv.DictReader(handle))
    one_by_sku = {row["supplier_sku_reference_only"]: row for row in one_rows}
    if len(one_by_sku) != len(one_rows) or len(one_rows) != 9:
        raise SystemExit("OneNav exact product-page audit must contain nine unique source matches")

    verified_by_sku: dict[str, dict] = {}
    for model in verified:
        key = norm(model.get("modelNumber"))
        if not key or key in verified_by_sku:
            raise SystemExit(f"Duplicate or empty internal model key: {model.get('modelNumber')}")
        verified_by_sku[key] = model

    audit_headers = [
        "product_id", "source_file", "source_row", "supplier_sku", "brand",
        "manufacturer_product_name", "image_url", "image_status", "description_status",
    ]
    audit_rows: list[dict[str, str]] = []
    one_matched = one_descriptions = one_images = one_no_image = 0
    verified_matched = verified_images = verified_no_image = unmatched = 0

    for index, (source, product) in enumerate(zip(source_rows, products), start=1):
        expected_id = f"pw-{index:04d}"
        if product.get("id") != expected_id:
            raise SystemExit(f"Source/preview order mismatch at {index}: {product.get('id')} != {expected_id}")

        product.pop("modelNumber", None)
        product.pop("supplierSku", None)
        supplier_sku = source.get("supplier_sku_candidate", "")
        manufacturer_name = ""
        image_url = ""
        image_status = "NO_EXACT_MODEL_IMAGE_MATCH"
        description_status = "NO_MANUFACTURER_DESCRIPTION_MATCH"

        one = one_by_sku.get(supplier_sku)
        if one and one.get("enrichment_status") in {
            "OWNER_PREVIEW_CANDIDATE_ONLY",
            "DETAILS_VERIFIED_IMAGE_PENDING",
            "DETAILS_PENDING_IMAGE_PENDING",
        }:
            if source.get("brand_candidate") != "One" or source.get("description_candidate") != one.get("source_title_exact"):
                raise SystemExit(f"OneNav exact-source mismatch for internal source row {index}")
            one_matched += 1
            manufacturer_name = one.get("verified_manufacturer_product_title", "").strip()
            product["brandDisplayName"] = one.get("customer_brand_display") or "OneNav"
            product["manufacturerProductName"] = manufacturer_name or product.get("title", "")
            product["manufacturerPage"] = one.get("official_manufacturer_product_page", "")
            description = one.get("customer_description", "").strip()
            if description:
                product["description"] = description
                product["descriptionStatus"] = "OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED"
                description_status = product["descriptionStatus"]
                one_descriptions += 1
            else:
                product["descriptionStatus"] = "OFFICIAL_PRODUCT_PAGE_DETAILS_PENDING"
                description_status = product["descriptionStatus"]
            image_url = one.get("image_url_candidate", "").strip()
            if image_url:
                if one.get("image_crop", "").strip().lower() != "true" or not image_url.startswith("https://"):
                    raise SystemExit(f"OneNav image candidate lacks HTTPS/crop verification for internal source row {index}")
                product["imageUrl"] = image_url
                product["imageCrop"] = True
                product["imagePosition"] = one.get("image_position", "center 50%") or "center 50%"
                product["imageStatus"] = "EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE"
                image_status = product["imageStatus"]
                one_images += 1
            else:
                product.pop("imageUrl", None)
                product.pop("imageCrop", None)
                product.pop("imagePosition", None)
                product["imageStatus"] = "EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE"
                image_status = product["imageStatus"]
                one_no_image += 1

        model = verified_by_sku.get(norm(supplier_sku))
        if model:
            verified_matched += 1
            manufacturer_name = model.get("name") or product.get("title", "")
            product["manufacturerProductName"] = manufacturer_name
            product["description"] = model.get("description") or product.get("description", "")
            if model.get("manufacturerPage"):
                product["manufacturerPage"] = model["manufacturerPage"]
            image_url = model.get("imageUrl") or ""
            if image_url:
                product["imageUrl"] = image_url
                product["imageStatus"] = model.get("imageStatus") or "official_manufacturer_image_verified_review_only"
                image_status = product["imageStatus"]
                verified_images += 1
            else:
                product.pop("imageUrl", None)
                product["imageStatus"] = "EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE"
                image_status = product["imageStatus"]
                verified_no_image += 1
            product["descriptionStatus"] = "MANUFACTURER_DESCRIPTION_VERIFIED"
            description_status = product["descriptionStatus"]
        elif not one:
            product.pop("manufacturerProductName", None)
            product.pop("imageUrl", None)
            product.pop("imageStatus", None)
            product.pop("imageCrop", None)
            product.pop("imagePosition", None)

        audit_rows.append({
            "product_id": product["id"],
            "source_file": source.get("source_file", ""),
            "source_row": source.get("row_number", ""),
            "supplier_sku": supplier_sku,
            "brand": source.get("brand_candidate", ""),
            "manufacturer_product_name": manufacturer_name,
            "image_url": image_url,
            "image_status": image_status,
            "description_status": description_status,
        })
        if not model and not one:
            unmatched += 1

    totals = {
        "oneNav_pages": one_matched,
        "oneNav_descriptions": one_descriptions,
        "oneNav_image_candidates": one_images,
        "oneNav_images_missing": one_no_image,
        "verified_model_matches": verified_matched,
        "verified_model_images": verified_images,
        "verified_model_images_missing": verified_no_image,
        "unmatched_products": unmatched,
    }
    expected = {
        "oneNav_pages": 9,
        "oneNav_descriptions": 8,
        "oneNav_image_candidates": 2,
        "oneNav_images_missing": 7,
        "verified_model_matches": 68,
        "verified_model_images": 66,
        "verified_model_images_missing": 2,
        "unmatched_products": 3240,
    }
    if totals != expected:
        raise SystemExit("Exact-model enrichment totals changed unexpectedly: " + json.dumps(totals, sort_keys=True))

    data["productImageEnrichment"] = {
        "exactModelPagesReviewed": 77,
        "manufacturerDescriptionsVerified": 76,
        "exactImageCandidatesApplied": 68,
        "exactModelImagesMissing": 9,
        "unmatchedProducts": 3240,
        "status": "OWNER_PREVIEW_ONLY_PENDING_IMAGE_RIGHTS_AND_OWNER_REVIEW",
        "note": "Exact-model product images and descriptions are review candidates; confirm image reuse rights before production. Supplier identifiers remain internal.",
    }

    DATA_PATH.write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    with IMAGE_AUDIT_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=audit_headers)
        writer.writeheader()
        writer.writerows(audit_rows)

    print("PLANETWORLD_EXACT_MODEL_ENRICHMENT_PASS " + json.dumps(totals, sort_keys=True))


if __name__ == "__main__":
    main()
