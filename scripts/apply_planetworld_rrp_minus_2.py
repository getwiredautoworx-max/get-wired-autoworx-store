#!/usr/bin/env python3
"""Apply the owner-approved Planetworld RRP-minus-2% formula to preview-only data.

Reads the seven frozen source-row audit chunks and the 3,317-row preview JSON.
Writes only the non-production preview JSON and an internal DO NOT IMPORT pricing
audit. Never touches Supabase, production, stock, supplier source workbooks or
customer live prices.
"""
from __future__ import annotations

import csv
import json
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "assets" / "planetworld-catalogue-preview.json"
AUDIT_PATH = ROOT / "catalogue-review" / "PLANETWORLD_RRP_MINUS_2_AUDIT_2026-11-05.csv"
CHUNK_DIR = ROOT / "catalogue-review" / "planetworld-row-chunks"
CHUNKS = [CHUNK_DIR / f"planetworld-rows-{n:02d}.csv" for n in range(1, 8)]
ONE_MODEL_AUDIT_PATH = ROOT / "catalogue-review" / "planetworld-one-official-model-audit.csv"
IMAGE_AUDIT_PATH = ROOT / "catalogue-review" / "PLANETWORLD_PRODUCT_IMAGE_AUDIT_2026-11-05.csv"
QUOTE_TEXT = "Price On Request Due to Stock Availability"
SOURCE_SNAPSHOT = "2026-10-25 supplier workbook snapshot"


def money(value: str | None) -> Decimal | None:
    try:
        parsed = Decimal(str(value or "").strip())
    except Exception:
        return None
    return parsed if parsed.is_finite() and parsed > 0 else None


def cents(value: Decimal) -> Decimal:
    return value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def main() -> None:
    source_rows: list[dict[str, str]] = []
    for path in CHUNKS:
        if not path.is_file():
            raise SystemExit(f"Missing source audit chunk: {path.relative_to(ROOT)}")
        with path.open(newline="", encoding="utf-8-sig") as handle:
            source_rows.extend(csv.DictReader(handle))

    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    products = data.get("records", [])
    if len(source_rows) != 3317 or len(products) != len(source_rows):
        raise SystemExit(
            f"Source/preview row mismatch: {len(source_rows)} source, {len(products)} preview"
        )

    if not ONE_MODEL_AUDIT_PATH.is_file():
        raise SystemExit(f"Missing OneNav product audit: {ONE_MODEL_AUDIT_PATH.relative_to(ROOT)}")
    with ONE_MODEL_AUDIT_PATH.open(newline="", encoding="utf-8-sig") as handle:
        one_model_audit_rows = list(csv.DictReader(handle))
    one_model_audit = {row["supplier_sku_reference_only"]: row for row in one_model_audit_rows}
    if len(one_model_audit) != len(one_model_audit_rows):
        raise SystemExit("Duplicate OneNav supplier SKU in the internal product audit")

    headers = [
        "product_id", "source_file", "source_row", "supplier_sku", "brand",
        "rrp_incl_vat", "dealer_cost_excl_vat", "estimated_cost_incl_vat",
        "proposed_selling_price", "gross_margin", "pricing_status", "source_snapshot",
    ]
    audit_rows: list[dict[str, str]] = []
    counts = {"priced": 0, "zero_rrp": 0, "below_cost": 0, "cost_pass": 0, "cost_unverified": 0}
    enrichment_counts = {"descriptions": 0, "images": 0}
    image_audit_updates: dict[str, dict[str, str]] = {}

    for index, (source, product) in enumerate(zip(source_rows, products), start=1):
        expected_id = f"pw-{index:04d}"
        if product.get("id") != expected_id:
            raise SystemExit(f"Preview/source order mismatch at row {index}: {product.get('id')} != {expected_id}")

        supplier_sku = source.get("supplier_sku_candidate", "")
        enrichment = one_model_audit.get(supplier_sku)
        if enrichment and enrichment.get("enrichment_status") in {"OWNER_PREVIEW_CANDIDATE_ONLY", "DETAILS_VERIFIED_IMAGE_PENDING", "DETAILS_PENDING_IMAGE_PENDING"}:
            if source.get("brand_candidate") != "One" or source.get("description_candidate") != enrichment.get("source_title_exact"):
                raise SystemExit(f"OneNav exact-source mismatch for internal SKU {supplier_sku} at {expected_id}")
            description = enrichment.get("customer_description", "").strip()
            product["brandDisplayName"] = enrichment.get("customer_brand_display") or "OneNav"
            product["manufacturerPage"] = enrichment.get("official_manufacturer_product_page", "")
            if description:
                product["description"] = description
                product["descriptionStatus"] = "OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED"
                enrichment_counts["descriptions"] += 1
            else:
                product["descriptionStatus"] = "OFFICIAL_PRODUCT_PAGE_DETAILS_PENDING"
            image_url = enrichment.get("image_url_candidate", "").strip()
            product["imageStatus"] = "EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE" if image_url else "EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE"
            if image_url:
                if enrichment.get("image_crop", "").strip().lower() != "true":
                    raise SystemExit(f"OneNav image candidate requires a supplier-code-safe crop: {supplier_sku}")
                if not image_url.startswith("https://"):
                    raise SystemExit(f"OneNav image URL must use HTTPS: {supplier_sku}")
                product["imageUrl"] = image_url
                product["imageCrop"] = True
                product["imagePosition"] = enrichment.get("image_position", "center 30%") or "center 30%"
                enrichment_counts["images"] += 1
            image_audit_updates[product["id"]] = {
                "manufacturer_model": "OneNav Classic 9-inch" if description else "OneNav 9-inch",
                "image_url": image_url,
                "image_status": product["imageStatus"],
                "description_status": product["descriptionStatus"],
            }

        rrp = money(source.get("retail_price_incl"))
        dealer_cost = money(source.get("dealer_price_excl"))
        estimated_cost = cents(dealer_cost * Decimal("1.15")) if dealer_cost else None
        proposed = cents(rrp * Decimal("0.98")) if rrp else None

        if proposed is None:
            status = "QUOTE_ONLY_ZERO_RRP"
            counts["zero_rrp"] += 1
            product["indicativePrice"] = None
            product["priceOnRequestText"] = QUOTE_TEXT
            product["priceBasis"] = "QUOTE_ONLY_ZERO_RRP"
        else:
            counts["priced"] += 1
            product["indicativePrice"] = float(proposed)
            product["priceBasis"] = "RRP_INCL_VAT_MINUS_2_PERCENT"
            product.pop("priceOnRequestText", None)
            if estimated_cost is None:
                status = "RRP_MINUS_2_COST_NOT_VERIFIED"
                counts["cost_unverified"] += 1
            elif proposed < estimated_cost:
                status = "RRP_MINUS_2_BELOW_ESTIMATED_COST_REVIEW"
                counts["below_cost"] += 1
            else:
                status = "RRP_MINUS_2_COST_FLOOR_PASS"
                counts["cost_pass"] += 1

        margin = cents(proposed - estimated_cost) if proposed is not None and estimated_cost is not None else None
        audit_rows.append({
            "product_id": product["id"],
            "source_file": source.get("source_file", ""),
            "source_row": source.get("row_number", ""),
            "supplier_sku": source.get("supplier_sku_candidate", ""),
            "brand": source.get("brand_candidate", ""),
            "rrp_incl_vat": str(rrp) if rrp else "",
            "dealer_cost_excl_vat": str(dealer_cost) if dealer_cost else "",
            "estimated_cost_incl_vat": str(estimated_cost) if estimated_cost else "",
            "proposed_selling_price": str(proposed) if proposed else "",
            "gross_margin": str(margin) if margin is not None else "",
            "pricing_status": status,
            "source_snapshot": "2026-10-25",
        })

    if image_audit_updates:
        if not IMAGE_AUDIT_PATH.is_file():
            raise SystemExit(f"Missing product image audit: {IMAGE_AUDIT_PATH.relative_to(ROOT)}")
        with IMAGE_AUDIT_PATH.open(newline="", encoding="utf-8-sig") as handle:
            image_audit_rows = list(csv.DictReader(handle))
        if len(image_audit_rows) != len(products):
            raise SystemExit(f"Product image audit row count mismatch: {len(image_audit_rows)} != {len(products)}")
        image_audit_by_id = {row["product_id"]: row for row in image_audit_rows}
        if len(image_audit_by_id) != len(image_audit_rows):
            raise SystemExit("Duplicate product_id in Planetworld product image audit")
        for product_id, updates in image_audit_updates.items():
            if product_id not in image_audit_by_id:
                raise SystemExit(f"Missing product image audit row: {product_id}")
            image_audit_by_id[product_id].update(updates)
        image_headers = list(image_audit_rows[0].keys())
        with IMAGE_AUDIT_PATH.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=image_headers)
            writer.writeheader()
            writer.writerows(image_audit_rows)

    data["productImageEnrichment"] = {
        "sourceAudit": "planetworld-one-official-model-audit.csv",
        "descriptionsEnriched": enrichment_counts["descriptions"],
        "exactImageCandidatesApplied": enrichment_counts["images"],
        "exactModelPagesReviewed": len(image_audit_updates),
        "status": "OWNER_PREVIEW_ONLY_PENDING_IMAGE_RIGHTS_AND_OWNER_REVIEW",
        "note": "Supplier SKUs remain in the internal audit only; product-card image crops hide supplier-code text."
    }

    data["pricingNote"] = (
        "Customer preview selling price = source Retail Price (Incl), already VAT-inclusive, "
        "× 0.98 (RRP less 2%). No additional VAT is added. 19 zero-RRP records remain quote-only. "
        "Cost-floor exceptions are flagged in the internal 2026-11-05 RRP-minus-2 audit; "
        "this dataset remains preview-only and no live prices are changed."
    )
    data["pricingRule"] = {
        "formula": "round(RRP_incl_VAT * 0.98, 2)",
        "vatTreatment": "RRP already includes VAT; do not add VAT again",
        "sourceSnapshot": "2026-10-25",
        "pricedRecords": counts["priced"],
        "zeroRrpQuoteOnly": counts["zero_rrp"],
        "belowEstimatedCostReview": counts["below_cost"],
        "costFloorPass": counts["cost_pass"],
        "costNotVerified": counts["cost_unverified"],
        "status": "PREVIEW_ONLY_NOT_LIVE",
    }

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    with AUDIT_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(audit_rows)

    print("PLANETWORLD_PRODUCT_ENRICHMENT_PASS " + json.dumps({**enrichment_counts, "imageAuditRowsUpdated": len(image_audit_updates)}, sort_keys=True))
    print("PLANETWORLD_RRP_MINUS_2_PREVIEW_PASS " + json.dumps(counts, sort_keys=True))


if __name__ == "__main__":
    main()
