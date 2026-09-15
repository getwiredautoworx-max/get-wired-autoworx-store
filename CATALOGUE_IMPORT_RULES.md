# Get Wired AutoWorx — Catalogue Import Rules

## Source and staging
- New supplier catalogues are staged first; never import directly into production without explicit approval.
- Validate SKU uniqueness before import.
- Preserve supplier SKU/part number exactly; do not invent or cross-apply OEM numbers.
- Verify product name, category, compatibility, specifications and image mapping before import.
- Products marked system/asterisk pricing remain `price = NULL` until a valid selling price is supplied.

## Selling-price rule
Supplier cost is excluding VAT and markup.

`selling_price = round(cost_price * 1.15 * 1.35, 2)`

- 15% VAT.
- 35% markup.
- Store/customer-facing price is the final VAT-inclusive selling price only.
- Do not expose cost price or the calculation on the storefront.

## Category hierarchy
Use the seven active top-level store categories:
1. Alarms & Security
2. Automotive Accessories
3. Car Audio
4. Electrical
5. Lighting
6. Marine Spares & Accessories
7. Tools & Workshop

Subcategories belong under the appropriate active top-level category. If a future catalogue needs a new subcategory, create it under the correct active parent rather than creating another top-level category or duplicate legacy category.

## Specials / homepage
- `featured = true` means the product may appear in the homepage Specials section.
- Homepage must show Specials/Featured products only.
- All other active products belong in All Products and their category/subcategory navigation.

## Image rules
- Prefer a verified catalogue `image_url`.
- If the catalogue image is missing/broken, use an exact SKU-named repository asset.
- Never substitute an image solely because product names look similar.

## Pre-import validation checklist
- [ ] SKU count equals unique SKU count.
- [ ] Required product fields are present.
- [ ] Prices match the VAT + 35% markup formula where cost is supplied.
- [ ] System/asterisk prices are intentionally blank.
- [ ] Every product maps to an active category/subcategory.
- [ ] Compatibility JSON is valid.
- [ ] Specifications JSON is valid.
- [ ] No duplicate products are created.
- [ ] Image paths are valid or intentionally left for exact-SKU fallback.
- [ ] Import is reviewed before production write.
