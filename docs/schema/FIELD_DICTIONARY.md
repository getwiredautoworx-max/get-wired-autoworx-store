# Catalogue Field Dictionary and Validation Rules

## Core fields

| Field | Meaning | Required handling |
|---|---|---|
| `supplier_sku` | Supplier's identifier, internal only | Required, non-blank, unique within the catalogue; never expose publicly |
| `public_sku` | Store identifier | Required; format `GW-XXXXXXXX` (8 uppercase letters/digits after `GW-`); unique |
| `product_name` | Customer-facing product name | Required; factual, no unsupported fitment claims |
| `storefront_category` | Approved top-level category | Must be one of the eight categories in the knowledge base |
| `supplier_cost_ex_vat` | Confirmed supplier cost excluding VAT | Positive numeric value for priced/active products; blank if not confirmed |
| `customer_price` | Storefront price in ZAR | Must follow the formula below; blank for quote-only products |
| `quote_only` | Price/availability requires a quote | Boolean; quote-only products must remain inactive |
| `is_active` | Eligible for public storefront | True only when all price, review, fitment, and image-rights gates are cleared |
| `review_status` | Review state | One of Approved, Pending, Rejected, Hold |
| `supplier_price_effective_date` | Date the source price applies | Required for active products; ISO date YYYY-MM-DD |
| `supplier_confirmation_ref` | Reference to current supplier evidence | Required for active products; historic catalogues alone do not prove current price |
| `image_permission_status` | Rights/permission review | Granted, Not required, Pending, Denied, or Unknown |
| `image_evidence_ref` | Exact-SKU image and rights evidence | Required for active products; synthetic test references are never production evidence |
| `vehicle_application` | Verified vehicle/application details | State only what source evidence supports |
| `subcategory` | Approved mapped subcategory | Map and review; do not invent a category based on image appearance |
| `review_reason` | Human-readable hold/review explanation | Record why a row is pending, rejected, quote-only, or held |

## Pricing formula

`customer_price = round(supplier_cost_ex_vat × 1.15 × 1.35, 2)`

The multipliers represent 15% VAT and a 35% markup applied after VAT, as currently specified for this project. Confirm current supplier cost before calculating a customer price. Historical costs and synthetic fixture values are not current supplier confirmation. Do not publish a guessed, zero, negative, or stale price.

## Publication gates

- Active requires `is_active=true`, `quote_only=false`, `review_status=Approved`, positive supplier cost and customer price, a matching price calculation, current supplier evidence, and cleared image permission/evidence.
- Quote-only requires `quote_only=true`, `is_active=false`, and blank `customer_price`.
- Reject duplicate supplier SKUs and duplicate public SKUs.
- Reject unknown categories and invalid public SKU formats.
- Do not expose `supplier_sku`, `supplier_cost_ex_vat`, confirmation references, internal review reasons, or secrets to public clients.
- Passing the synthetic validator is a data-shape check only. It does not approve real products or replace supplier confirmation, fitment review, image-rights review, consumer-policy review, or release QA.
