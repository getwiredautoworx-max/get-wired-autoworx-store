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
HEADUNIT_AUDIT_PATH = ROOT / "catalogue-review" / "onenav-23-unmatched-headunit-evidence-2026-11-06.csv"
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
    if len(source_rows) != 3317 or len(products) != len(source_rows) or len(verified) != 69:
        raise SystemExit(
            f"Unexpected image-enrichment input counts: source={len(source_rows)}, "
            f"products={len(products)}, verified_models={len(verified)}"
        )

    with ONE_AUDIT_PATH.open(newline="", encoding="utf-8-sig") as handle:
        one_rows = list(csv.DictReader(handle))
    one_by_sku = {row["supplier_sku_reference_only"]: row for row in one_rows}
    if len(one_by_sku) != len(one_rows) or len(one_rows) != 45:
        raise SystemExit("OneNav exact product-page audit must contain forty-five unique source matches")

    with HEADUNIT_AUDIT_PATH.open(newline="", encoding="utf-8-sig") as handle:
        headunit_rows = list(csv.DictReader(handle))
    headunit_by_sku = {row["supplier_source_code_private"]: row for row in headunit_rows}
    if len(headunit_by_sku) != len(headunit_rows) or len(headunit_rows) != 23:
        raise SystemExit("OneNav head-unit evidence register must contain twenty-three unique source codes")

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
    one_headunit_matched = one_headunit_descriptions = one_headunit_images = one_headunit_no_image = 0
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
            "DETAILS_VERIFIED_IMAGE_REJECTED",
        }:
            if source.get("brand_candidate") != "One" or " ".join(source.get("description_candidate", "").split()) != " ".join(one.get("source_title_exact", "").split()):
                raise SystemExit(f"OneNav exact-source mismatch for internal source row {index}")
            one_matched += 1
            manufacturer_name = one.get("verified_manufacturer_product_title", "").strip()
            product["brandDisplayName"] = one.get("customer_brand_display") or "OneNav"
            product["manufacturerProductName"] = manufacturer_name or product.get("title", "")
            product["manufacturerPage"] = one.get("official_manufacturer_product_page", "")
            description = one.get("customer_description", "").strip()
            if description:
                product["description"] = description
                series_text = (manufacturer_name + " " + description).lower()
                series = "EVOLUTION" if "evolution" in series_text else "CLASSIC" if "classic" in series_text else "PRO" if "pro series" in series_text else "UNCLASSIFIED"
                product["descriptionStatus"] = "OFFICIAL_ONENAV_" + series + "_SPECIFICATION_VERIFIED"
                description_status = product["descriptionStatus"]
                one_descriptions += 1
            else:
                product["descriptionStatus"] = "OFFICIAL_PRODUCT_PAGE_DETAILS_PENDING"
                description_status = product["descriptionStatus"]
            image_url = one.get("image_url_candidate", "").strip()
            if image_url:
                crop_value = one.get("image_crop", "").strip().lower()
                if crop_value not in {"true", "false"} or not image_url.startswith("https://"):
                    raise SystemExit(f"OneNav image candidate validation failed for internal source row {index}, SKU {one.get('supplier_sku_reference_only')!r}: crop={crop_value!r}, url={image_url[:120]!r}")
                product["imageUrl"] = image_url
                # Preserve the audited crop decision. Square/contain assets such as OA716-1
                # must not be forced into a 4:3 cover crop that can cut off the product.
                product["imageCrop"] = crop_value == "true"
                product["imagePosition"] = one.get("image_position", "center 40%") or "center 40%"
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

        headunit = headunit_by_sku.get(supplier_sku)
        headunit_match = False
        if (
            not one
            and headunit
            and headunit.get("model_identity_status") == "VERIFIED_OFFICIAL_PRODUCT_PAGE"
            and headunit.get("image_status") == "OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH"
            and headunit.get("image_url_candidate", "").startswith("https://onenav.co.za/wp-content/uploads/")
        ):
            if (
                source.get("brand_candidate") != "One"
                or " ".join(source.get("description_candidate", "").split())
                != " ".join(headunit.get("source_description_private", "").split())
            ):
                raise SystemExit(f"OneNav head-unit source mismatch for row {index}, SKU {supplier_sku!r}")
            manufacturer_name = headunit.get("verified_manufacturer_product_title", "").strip()
            description = headunit.get("customer_description", "").strip()
            image_url = headunit.get("image_url_candidate", "").strip()
            official_page = headunit.get("official_or_candidate_evidence_url", "").strip()
            if (
                not manufacturer_name or not description
                or not official_page.startswith("https://onenav.co.za/product/")
                or headunit.get("image_source_page", "").strip() != official_page
                or headunit.get("image_crop", "").strip().lower() != "false"
                or headunit.get("image_position", "").strip() != "center"
            ):
                raise SystemExit(f"OneNav head-unit provenance incomplete for row {index}, SKU {supplier_sku!r}")
            product["title"] = manufacturer_name
            product["brandDisplayName"] = "OneNav"
            product["manufacturerProductName"] = manufacturer_name
            product["manufacturerPage"] = official_page
            product["description"] = description
            product["descriptionStatus"] = "OFFICIAL_ONENAV_EVOLUTION_SPECIFICATION_VERIFIED"
            product["imageUrl"] = image_url
            product["imageStatus"] = "OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH"
            product["imageCrop"] = False
            product["imagePosition"] = "center"
            image_status = product["imageStatus"]
            description_status = product["descriptionStatus"]
            one_headunit_matched += 1
            one_headunit_descriptions += 1
            one_headunit_images += 1
            headunit_match = True

        model = verified_by_sku.get(norm(supplier_sku))
        if model:
            verified_matched += 1
            manufacturer_name = model.get("name") or product.get("title", "")
            product["title"] = manufacturer_name
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
        if not model and not one and not headunit_match:
            unmatched += 1

    totals = {
        "oneNav_pages": one_matched,
        "oneNav_descriptions": one_descriptions,
        "oneNav_image_candidates": one_images,
        "oneNav_images_missing": one_no_image,
        "oneNav_headunit_matches": one_headunit_matched,
        "oneNav_headunit_descriptions": one_headunit_descriptions,
        "oneNav_headunit_images": one_headunit_images,
        "oneNav_headunit_images_missing": one_headunit_no_image,
        "verified_model_matches": verified_matched,
        "verified_model_images": verified_images,
        "verified_model_images_missing": verified_no_image,
        "unmatched_products": unmatched,
    }
    expected = {
        "oneNav_pages": 45,
        "oneNav_descriptions": 45,
        "oneNav_image_candidates": 6,
        "oneNav_images_missing": 39,
        "oneNav_headunit_matches": 2,
        "oneNav_headunit_descriptions": 2,
        "oneNav_headunit_images": 2,
        "oneNav_headunit_images_missing": 0,
        "verified_model_matches": 69,
        "verified_model_images": 69,
        "verified_model_images_missing": 0,
        "unmatched_products": 3201,
    }
    if totals != expected:
        raise SystemExit("Exact-model enrichment totals changed unexpectedly: " + json.dumps(totals, sort_keys=True))

    data["productImageEnrichment"] = {
        "exactModelPagesReviewed": 116,
        "manufacturerDescriptionsVerified": 116,
        "exactImageCandidatesApplied": 77,
        "exactModelImagesMissing": 39,
        "unmatchedProducts": 3201,
        "oneNavHeadunitExactImageMatches": 2,
        "status": "OWNER_PREVIEW_ONLY_PENDING_OWNER_REVIEW",
        "note": "The 69 verified manufacturer records, 45 audited OneNav product pages and two additional exact OneNav Evolution head-unit image matches are review-only. The 39 image gaps refer to the 45-row OneNav audit; other unmatched head-unit rows remain quarantined. Supplier identifiers remain internal.",
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
