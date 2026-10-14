# Get Wired AutoWorx — Current Handover Checkpoint
Date: 2026-10-14 (South Africa)

## Working rules
- Continue from existing work; do not restart the catalogue.
- Preserve the live store and functioning features.
- Do not perform live catalogue imports, Supabase writes, or Axxess uploads during source reconciliation.
- Build and verify in the staging/workspace first; batch any approved final sync/deployment into one controlled release.
- Treat a running test as not passed until its result is recorded.
- Maintain the eight agreed store categories and map ASC source headings/subcategories into them without losing the source taxonomy.
- Pricing policy: supplier cost excl. VAT × 1.15 × 1.35; customer-facing price VAT-inclusive.
- August–September guide prices/availability are live candidates subject to confirmation. July and earlier are “subject to price and availability confirmation” unless the exact same SKU is verified in a later guide.
- June promotional prices are historical and must not be treated as current live prices without verification.

## Current verified baseline (latest available reconciliation workbook dated 2026-10-11)
- Live active products: 4,187; distinct supplier SKUs: 4,187; distinct public SKUs: 4,187.
- Missing product image_url: 0; missing cost: 0; invalid/non-positive price: 0; live pricing formula mismatches: 0.
- Structured fitment rows: 66; products with structured fitment: 53; vehicle coverage reported as one make / nine make-model pairs.
- No live writes or deployment performed during that audit.
- Historical Feb–Aug audit: 3,578 unique SKUs, 3,160 staged formula PASS, 418 one-cent differences caused by rounding method. Do not bulk overwrite live prices based on those flags.
- June OCR staging: 470 records awaiting exact SKU/cost verification against original scanned pages.
- Recent working checkpoint noted in conversation: crosswalk has 115 rows and represents all 33 June headings; original page-by-page visual verification remains incomplete. Do not treat heading representation as verification of every row.

## Unresolved work — continue in this order
1. Visually verify the original June Buyer’s Guide pages and all crosswalk entries against page images; correct OCR code/description/cost errors and retain page references.
2. Check February, March and May guides’ category headings and contents/page ranges; keep ASC headings alongside the eight agreed store categories.
3. Reconcile exact supplier SKU + description + cost + page across June staging and the historic unresolved-price queue (126 rows); deduplicate overlaps before classifying.
4. Match September and October Buyer’s Guides and October Promotions by exact SKU. Keep promotion prices separate and confirm dates/terms. Do not infer prices from fuzzy description matches.
5. Match Suzuki and Renault/Dacia vehicle-catalogue codes to exact supplier codes; preserve verified make/model/engine/application details. Unpriced valid fitments remain quote/review candidates rather than being discarded.
6. Produce a staged, deduplicated source-delta ledger with SKU, description, vehicle/application, source guide/date/page, supplier cost excl. VAT, calculated VAT-inclusive selling price, image evidence, source category/subcategory, status (KEEP/UPDATE/ADD/QUOTE/REVIEW), and reason.
7. Validate the category/subcategory hierarchy and storefront navigation in staging. Test mobile layout, category → subcategory → product flow, search, cart and checkout; record observed results. Do not claim tests passed without results.
8. Only after explicit review/approval, perform one controlled final synchronization to GitHub, Supabase SQL/data and Axxess/related services. No unnecessary rebuilds or repeat uploads.

## Current blockers / limitations
- Original guide page-by-page verification and exact SKU joins are not yet complete.
- September/October price deltas and promotion eligibility have not yet been fully calculated.
- Exact-code joins for Suzuki and Renault/Dacia catalogues remain outstanding.
- Quote-only candidate count is unknown; do not guess.
- No reliable ETA until extraction and exact-match totals are measured.

## Immediate next action
Resume visual verification of the June source pages and the category-heading crosswalk, then record each verified/corrected row with source page evidence. Keep all changes staged; no live import or deployment.
