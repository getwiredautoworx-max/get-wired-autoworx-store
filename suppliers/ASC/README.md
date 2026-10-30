# ASC test-catalogue intake

**Reset checkpoint:** 30 October 2026  
**Purpose:** Clean intake point for the next owner-supplied ASC test catalogue.

The previous ASC source PDFs, historical guide import payload, ASC stock status report, ASC-only catalogue audit, and scheduled ASC image-sync automation are being removed from the current `main` working tree in the branch:

`cleanup/asc-catalogues-stock-reset-2026-10-30`

## Intake rules

1. Add only the new test catalogue supplied by the owner after this reset.
2. Preserve the uploaded original unchanged. Record filename, edition/date, page count and file hash.
3. Extract product data to a separate staged CSV/XLSX. Do not write directly to `public.products`.
4. Keep ASC supplier SKU separate from Get Wired AutoWorx internal SKU. Never overwrite another supplier's code.
5. Preserve source page, category, descriptions, dimensions, electrical specifications and vehicle fitment exactly where printed.
6. Use catalogue photographs only when exact product-code/photo pairing is clear. Produce image contact sheets for review.
7. Do not invent cost, selling price, fitment or physical stock. Apply the approved price formula only to a verified dealer cost.
8. Do not treat catalogue appearance as physical stock. Keep supplier availability distinct from verified premises stock.
9. Start with a 25-product pilot. Produce the edited images, staged spreadsheet, image-match report and exception list before any import.
10. Only import after the pilot passes validation and the owner approves the staged result.

## Preserved store dependencies

The existing customer-facing image cache under `assets/products_webp/` is intentionally retained during this source reset. The Supabase `product-image` Edge Function uses these files to serve current product images. Removing the cache would break existing storefront imagery before the replacement test-catalogue images have been verified.

The existing product database, current stock quantities, supplier mappings, storefront code, non-ASC supplier catalogues and current image storage are not part of this GitHub source cleanup.

The generic, unattributed `data/STORE_STOCK_IMPORT_2026-09-16.csv` is held aside because it is not proven to be ASC-specific. It must not be treated as a current stock source.
