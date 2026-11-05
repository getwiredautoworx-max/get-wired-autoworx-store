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

    by_sku: dict[str, dict] = {}
    for model in verified:
        key = norm(model.get("modelNumber"))
        if not key or key in by_sku:
            raise SystemExit(f"Duplicate or empty internal model key: {model.get('modelNumber')}")
        by_sku[key] = model

    audit_headers = [
        "product_id", "source_file", "source_row", "supplier_sku", "brand",
        "manufacturer_product_name", "image_url", "image_status", "description_status",
    ]
    audit_rows: list[dict[str, str]] = []
    matched = images = no_image = unmatched = 0

    for index, (source, product) in enumerate(zip(source_rows, products), start=1):
        expected_id = f"pw-{index:04d}"
        if product.get("id") != expected_id:
            raise SystemExit(f"Source/preview order mismatch at {index}: {product.get('id')} != {expected_id}")

        # Never carry supplier codes into the customer-facing data object.
        product.pop("modelNumber", None)
        product.pop("supplierSku", None)
        model = by_sku.get(norm(source.get("supplier_sku_candidate")))
        image_url = ""
        if model:
            matched += 1
            product["manufacturerProductName"] = model.get("name") or product.get("title", "")
            product["description"] = model.get("description") or product.get("description", "")
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
        else:
            product.pop("manufacturerProductName", None)
            image_status = "NO_EXACT_MODEL_IMAGE_MATCH"
            description_status = "NO_MANUFACTURER_DESCRIPTION_MATCH"
            unmatched += 1

        audit_rows.append({
            "product_id": product["id"],
            "source_file": source.get("source_file", ""),
            "source_row": source.get("row_number", ""),
            "supplier_sku": source.get("supplier_sku_candidate", ""),
            "brand": source.get("brand_candidate", ""),
            "manufacturer_product_name": model.get("name", "") if model else "",
            "image_url": image_url,
            "image_status": image_status,
            "description_status": description_status,
        })

    if (matched, images, no_image, unmatched) != (68, 66, 2, 3249):
        raise SystemExit(
            f"Exact-model image totals changed unexpectedly: matched={matched}, "
            f"images={images}, no_image={no_image}, unmatched={unmatched}"
        )

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
            {"matched": matched, "images": images, "no_image": no_image, "unmatched": unmatched},
            sort_keys=True,
        )
    )


if __name__ == "__main__":
    main()
