# ASC supplier-catalogue intake

**Current phase:** Supplier product catalogues only  
**Deferred:** ASC monthly Buyers Guides (to be added in a later phase)  
**Upload folder:** `suppliers/ASC/`

## What belongs here
- ASC product-family catalogues (for example Aerials, Switches, Ignition, Lighting, Sensors, and other actual catalogue families).
- ASC product/vehicle application catalogues.
- ASC catalogue supplements and new-product catalogue sheets.

Do not upload monthly Buyers Guides, stock reports, price-only sheets, unrelated promotions, or other suppliers' documents in this phase. Ask before placing ambiguous documents here.

## Processing rules
1. Keep each original PDF unchanged. Record filename, edition/date, page count and SHA-256.
2. Process supplier catalogues first; do not begin Buyers Guides until the supplier taxonomy is established.
3. Build one consistent store category tree across suppliers. Main categories represent product families; subcategories represent actual product types found in the source. Example: `Switches` > `Ignition switches`, `Barrel sets`, `Indicator switches`.
4. Keep supplier identity and supplier SKU distinct. Create a unique Get Wired AutoWorx SKU (ASC prefix) and retain the exact ASC supplier SKU as a linked reference. Never merge codes from different suppliers.
5. Preserve descriptions, dimensions, electrical specifications, vehicle applications, source filename and page number.
6. Match product images only when the product-code/photo pairing is clear. Record uncertain matches for review.
7. Do not invent cost, selling price, fitment or physical stock. Catalogue presence is not proof of stock.
8. Stage extracted data in a review spreadsheet; do not write to `public.products` or change live categories, stock, images or storefront.
9. Start with a 25-product pilot and present the staged rows, image matches and exceptions for owner approval before any import.

## Supplier separation
Keep ASC files under this folder only. Other suppliers remain in their own folders (Electrocity, Planet World, Audio Connections, Starsound, Sony, etc.). Comparable parts may share a customer-facing category, but each supplier's identity and SKU remain separate.

## Store protection
Existing database rows, physical stock, product-image cache, storefront, checkout and production hosting are outside this catalogue-intake task. Do not delete or modify them.
