#!/usr/bin/env python3
"""Attach exact-model product details/images to Planetworld preview rows.

Supplier SKU matching is internal only. No supplier SKU or source model-number
crosswalk is written into the public preview JSON. The verified-model source
and generated audit remain excluded from the Pages package.
"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "assets" / "planetworld-catalogue-preview.json"
VERIFIED_PATH = ROOT / "assets" / "planetworld-verified-models-preview.json"
AUDIT_PATH = ROOT / "catalogue-review" / "PLANETWORLD_PRODUCT_IMAGE_AUDIT_2026-11-05.csv"
ONE_MODEL_AUDIT_PATH = ROOT / "catalogue-review" / "planetworld-one-official-model-audit.csv"
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
    with ONE_MODEL_AUDIT_PATH.open(newline="", encoding="utf-8-sig") as handle:
        one_audit_rows = list(csv.DictReader(handle))
    products = data.get("records", [])
    if len(source_rows) != 3317 or len(products) != len(source_rows) or len(verified) != 68 or len(one_audit_rows) != 9:
        raise SystemExit(
            f"Unexpected image-enrichment input counts: source={len(source_rows)}, "
            f"products={len(products)}, verified_models={len(verified)}, "
            f"OneNav_pages={len(one_audit_rows)}"
        )

    by_sku: dict[str, dict] = {}
    for model in verified:
        key = norm(model.get("modelNumber"))
        if not key or key in by_sku:
            raise SystemExit(f"Duplicate or empty internal model key: {model.get('modelNumber')}")
        by_sku[key] = model

    one_by_sku: dict[str, dict[str, str]] = {}
    for row in one_audit_rows:
        key = norm(row.get("supplier_sku_reference_only"))
        if not key or key in one_by_sku:
            raise SystemExit(f"Duplicate or empty OneNav internal key: {row.get('supplier_sku_reference_only')}")
        one_by_sku[key] = row

    audit_headers = [
        "product_id", "source_file", "source_row", "supplier_sku", "brand",
        "manufacturer_product_name", "image_url", "image_status", "description_status",
    ]
    audit_rows: list[dict[str, str]] = []
    matched = images = no_image = unmatched = 0
    one_nav_matched = one_nav_images = one_nav_no_image = one_nav_descriptions = 0

    for index, (source, product) in enumerate(zip(source_rows, products), start=1):
        expected_id = f"pw-{index:04d}"
        if product.get("id") != expected_id:
            raise SystemExit(f"Source/preview order mismatch at {index}: {product.get('id')} != {expected_id}")

        # Never carry supplier codes into the customer-facing data object.
        product.pop("modelNumber", None)
        product.pop("supplierSku", None)
        source_key = norm(source.get("supplier_sku_candidate"))
        model = by_sku.get(source_key)
        one_model = one_by_sku.get(source_key)
        if model and one_model:
            raise SystemExit(f"Supplier key collides across verified-model and OneNav audits: {source_key}")

        if model:
            matched += 1
            product["manufacturerProductName"] = model.get("name") or product.get("title", "")
            product["description"] = model.get("description") or product.get("description", "")
            product.pop("brandDisplayName", None)
            product.pop("imageCrop", None)
            product.pop("imagePosition", None)
            product.pop("descriptionStatus", None)
            if model.get("manufacturerPage"):
                product["manufacturerPage"] = model["manufacturerPage"]
            image_url = model.get("imageUrl") or ""
            if image_url:
                product["imageUrl"] = image_url
                product["imageStatus"] = model.get("imageStatus") or "official_manufacturer_image_verified_review_only"
                images += 1
            else:
                product.pop("imageUrl", None)
                product["imageStatus"] = "EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE"
                no_image += 1
            image_status = product["imageStatus"]
            description_status = "MANUFACTURER_DESCRIPTION_VERIFIED"
            manufacturer_product_name = model.get("name") or ""

        elif one_model:
            if source.get("brand_candidate") != "One" or source.get("description_candidate") != one_model.get("source_title_exact"):
                raise SystemExit(f"OneNav exact source/title mismatch at {expected_id}")
            matched += 1
            one_nav_matched += 1
            product["brandDisplayName"] = one_model.get("customer_brand_display") or "OneNav"
            product["manufacturerPage"] = one_model.get("official_manufacturer_product_page") or ""
            manufacturer_product_name = one_model.get("verified_manufacturer_product_title") or product.get("title", "")
            product["manufacturerProductName"] = manufacturer_product_name

            description = (one_model.get("customer_description") or "").strip()
            if description:
                product["description"] = description
                product["descriptionStatus"] = "OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED"
                description_status = "OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED"
                one_nav_descriptions += 1
            else:
                product.pop("description", None)
                product["descriptionStatus"] = "OFFICIAL_PRODUCT_PAGE_DETAILS_PENDING"
                description_status = "OFFICIAL_PRODUCT_PAGE_DETAILS_PENDING"

            image_url = (one_model.get("image_url_candidate") or "").strip()
            if image_url:
                if (one_model.get("image_crop") or "").strip().lower() != "true":
                    raise SystemExit(f"OneNav image requires a crop to hide supplier-code text: {expected_id}")
                if not image_url.startswith("https://"):
                    raise SystemExit(f"OneNav image URL must use HTTPS: {expected_id}")
                product["imageUrl"] = image_url
                product["imageCrop"] = True
                product["imagePosition"] = one_model.get("image_position") or "center 30%"
                product["imageStatus"] = "EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE"
                image_status = product["imageStatus"]
                images += 1
                one_nav_images += 1
            else:
                product.pop("imageUrl", None)
                product.pop("imageCrop", None)
                product.pop("imagePosition", None)
                product["imageStatus"] = "EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE"
                image_status = product["imageStatus"]
                no_image += 1
                one_nav_no_image += 1

        else:
            product.pop("manufacturerProductName", None)
            product.pop("brandDisplayName", None)
            product.pop("manufacturerPage", None)
            product.pop("imageUrl", None)
            product.pop("imageCrop", None)
            product.pop("imagePosition", None)
            product.pop("imageStatus", None)
            product.pop("descriptionStatus", None)
            image_url = ""
            image_status = "NO_EXACT_MODEL_IMAGE_MATCH"
            description_status = "NO_MANUFACTURER_DESCRIPTION_MATCH"
            manufacturer_product_name = ""
            unmatched += 1

        audit_rows.append({
            "product_id": product["id"],
            "source_file": source.get("source_file", ""),
            "source_row": source.get("row_number", ""),
            "supplier_sku": source.get("supplier_sku_candidate", ""),
            "brand": source.get("brand_candidate", ""),
            "manufacturer_product_name": manufacturer_product_name,
            "image_url": image_url,
            "image_status": image_status,
            "description_status": description_status,
        })

    if (matched, images, no_image, unmatched) != (77, 68, 9, 3240):
        raise SystemExit(
            f"Exact-model image totals changed unexpectedly: matched={matched}, "
            f"images={images}, no_image={no_image}, unmatched={unmatched}"
        )
    if (one_nav_matched, one_nav_images, one_nav_no_image, one_nav_descriptions) != (9, 2, 7, 8):
        raise SystemExit(
            f"OneNav enrichment totals changed unexpectedly: matched={one_nav_matched}, "
            f"images={one_nav_images}, no_image={one_nav_no_image}, "
            f"descriptions={one_nav_descriptions}"
        )

    data["productImageEnrichment"] = {
        "sourceAudit": "planetworld-one-official-model-audit.csv",
        "descriptionsEnriched": one_nav_descriptions,
        "exactImageCandidatesApplied": one_nav_images,
        "exactModelPagesReviewed": one_nav_matched,
        "status": "OWNER_PREVIEW_ONLY_PENDING_IMAGE_RIGHTS_AND_OWNER_REVIEW",
        "note": "Supplier SKUs remain in the internal audit only; product-card image crops hide supplier-code text.",
    }

    DATA_PATH.write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    with AUDIT_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=audit_headers)
        writer.writeheader()
        writer.writerows(audit_rows)

    print(
        "PLANETWORLD_EXACT_MODEL_ENRICHMENT_PASS "
        + json.dumps(
            {
                "matched": matched,
                "images": images,
                "no_image": no_image,
                "unmatched": unmatched,
                "one_nav_matched": one_nav_matched,
                "one_nav_images": one_nav_images,
                "one_nav_no_image": one_nav_no_image,
                "one_nav_descriptions": one_nav_descriptions,
            },
            sort_keys=True,
        )
    )


if __name__ == "__main__":
    main()
