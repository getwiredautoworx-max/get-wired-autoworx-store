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

## Progress made 2026-10-14
- Opened the original June Buyer’s Guide PDF and visually inspected printed pages 2–4 (PDF pages 2–4 in the viewer).
- Contents page confirms the source headings and page ranges: 4X4 Outdoor (p.3), Lifestyle (pp.3–4), Panel Clips (pp.4–5), Accessories (pp.5–10), Battery Accessories (pp.10–11), Electrical Spares (pp.11–15), Hoteche Stand (pp.16–17), Spare Parts (pp.18–19), Brake & Cylinders (p.20), Automotive Tools (pp.21–22), Trimming Tool Kits (pp.22–23), Hardware (pp.23–29), Special Discounted Price (pp.29–32).
- Visually checked printed page 3: 4X4 & Outdoor and Lifestyle products; SKU examples visible include C10-035, C10-027, C7-016, C7-004, CB-008, M501, AX005, DRO17, BC530, HB400, TT235Z, RALTT235Z, 5558-GY, 5862-WH, LT-6251T-R, C10-029-C, C10-029, B7-007B, B7-007BL, CO09-L, CO09-S. This is page-level visual evidence only; each row’s price/cost still needs extraction and ledger matching.
- Visually checked printed page 4: continuation of Lifestyle and start of Panel Clips. Visible examples include B7-008GR, B7-008GY, B7-009, 6007-11-NL, 6007-20-450, 6007-21, D9-FR2207, RTD-S, RTD35A, plus multiple F7- series panel clip SKUs. Use source image rather than OCR text when characters are ambiguous.
- The printed guide explicitly notes asterisked items are priced “as per system,” subject to incoming shipments, and prices may vary during the month. Do not treat these printed prices as guaranteed current availability.
- No live store/database writes, uploads, or deployments were performed.

## Unresolved work — continue in this order
1. Continue visual verification of original June Buyer’s Guide pages 5–32 and all crosswalk entries against page images; correct OCR code/description/cost errors and retain page references.
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
Resume visual verification of the June source pages starting with printed page 5, then verify the corresponding crosswalk rows. Keep all changes staged; no live import or deployment.
