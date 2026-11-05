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

    headers = [
        "product_id", "source_file", "source_sheet", "source_row", "supplier_sku",
        "brand", "source_description", "storefront_title", "rrp_incl_vat",
        "dealer_cost_excl_vat", "estimated_cost_incl_vat",
        "proposed_selling_price_rrp_minus_2", "gross_margin_at_proposed",
        "pricing_status", "source_snapshot",
    ]
    audit_rows: list[dict[str, str]] = []
    counts = {"priced": 0, "zero_rrp": 0, "below_cost": 0, "cost_pass": 0, "cost_unverified": 0}

    for index, (source, product) in enumerate(zip(source_rows, products), start=1):
        expected_id = f"pw-{index:04d}"
        if product.get("id") != expected_id:
            raise SystemExit(f"Preview/source order mismatch at row {index}: {product.get('id')} != {expected_id}")

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
            "source_sheet": source.get("sheet", ""),
            "source_row": source.get("row_number", ""),
            "supplier_sku": source.get("supplier_sku_candidate", ""),
            "brand": source.get("brand_candidate", ""),
            "source_description": source.get("description_candidate", ""),
            "storefront_title": product.get("title", ""),
            "rrp_incl_vat": str(rrp) if rrp else "",
            "dealer_cost_excl_vat": str(dealer_cost) if dealer_cost else "",
            "estimated_cost_incl_vat": str(estimated_cost) if estimated_cost else "",
            "proposed_selling_price_rrp_minus_2": str(proposed) if proposed else "",
            "gross_margin_at_proposed": str(margin) if margin is not None else "",
            "pricing_status": status,
            "source_snapshot": SOURCE_SNAPSHOT,
        })

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
        "reviewFile": "catalogue-review/PLANETWORLD_RRP_MINUS_2_AUDIT_2026-11-05.csv",
        "status": "PREVIEW_ONLY_NOT_LIVE",
    }

    JSON_PATH.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    with AUDIT_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=headers)
        writer.writeheader()
        writer.writerows(audit_rows)

    print("PLANETWORLD_RRP_MINUS_2_PREVIEW_PASS " + json.dumps(counts, sort_keys=True))


if __name__ == "__main__":
    main()
