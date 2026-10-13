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


---

## Owner-approved monthly Buyer’s Guide policy — 2026-10-13 (PERMANENT)

Process source guides chronologically: June, July, August, September. Import each guide faithfully, preserving exact source SKU/part number, description and its own category/subcategory. When the same exact SKU appears in a later guide, the later guide updates relevant current fields; retain month/page provenance and a history of previous values. Add source categories/subcategories missing from the store rather than dropping or forcing them into an unrelated existing category. Follow ASC taxonomy and the guide's category structure; merchandising fine-tuning comes only after source-faithful reconciliation and owner review.

Stock/customer status:
- June/July listing not present in any later guide (August/September): show **Confirm stock and price**; do not imply current availability/current price.
- June/July listing also present in August/September: later listing takes precedence.
- Any item advertised in August or September: assume stock on hand, per owner instruction. This is a catalogue assumption, not a verified physical stock count.
- If a valid price is absent or unclear, do not invent one. Stage as REVIEW/QUOTE or appropriate confirm-stock-and-price state.
- Existing price formula where verified cost excl. VAT is available: round(cost × 1.15 × 1.35, 2). Do not bulk overwrite live prices without exact source reconciliation and approval.

Safeguards: preserve originals; reconcile by exact code first; use name-only matches for manual review; record file/month/page, source category, price type, image reference, live SKU match, later-guide match, action and reason. Stage and review before any production database write, category move, image edit, price/stock change or Axxess upload. No deployment should be triggered merely to inspect catalogues.


## Extraction-quality gate — added 2026-10-13

The existing June–August audit workbook is not a source-of-truth import file. Its June OCR staging has 470 rows with blank costs and generic placeholder descriptions; July/August staging contains large numbers of implausible cost values. Never import it blindly or repair decimal points by guesswork. Verify each field against the original guide page. The original monthly PDFs remain authoritative. Keep extraction QA findings separate from raw source values, and do not write live data until exact-code/category/price checks and owner review are complete.
