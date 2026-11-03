# Planetworld + Audio Connections — Pilot Source Audit

**Audit date:** 2026-11-03  
**Branch:** supplier-standard-planetworld-audio-connections-2026-11-03  
**Status:** Read-only source/data audit. No supplier activation, live import, price/stock change or public product publication.

## Planetworld

### Source and catalogue scope
- Preview JSON declares 3,317 source rows from 47 workbooks / 94 sheets.
- Division totals: Home CI 319; Home Retail 142; Car Audio 702; Musical Instruments 1,719; Installed AV 435.
- The Car Audio division has 702 source rows: 627 Car Audio & Video, 47 Harnesses & Trims, and 28 Marine Audio.
- The available catalogue snapshot is dated 25 October 2026. Its stock indicator is historical only and must not be shown as current stock.
- 37 records have no indicative price. Retain the owner-approved exact customer fallback: “Price on Request due to Limited Stock and Availability.”
- The raw preview feed does not carry a GW SKU or image URL for every catalogue row. Do not imply that the 68-model enrichment covers all 3,317 products.

### Exact-model enrichment set
- 68 curated model records across Alpine (9), Audison (41), Focal (2), JVC (2), Kenwood (1), Kicker (12) and Pioneer (1).
- 61 of the 68 curated model records currently have an image URL; seven do not.
- The 61 URLs are source candidates/review references, not blanket approval for customer publication. Existing image status values vary and some records have no explicit status.
- GW SKU candidates exist for these curated model records, but remain staged/review-only until exact source join, collision check and owner approval.
- The 68 model records must be joined to the correct exact product variant in the source workbook. Do not attach a model's image/description/SKU to an accessory merely because its title mentions that model later.

### Pricing and availability controls
- The 25 October snapshot is dated reference data, not current supplier pricing or availability confirmation.
- Do not treat RRP-minus-1% or RRP-minus-2% as approved prices. Verify current printed RRP, dealer cost, VAT basis and effective date, and include landed-cost overheads before recommending a selling price.
- Keep zero-RRP and below-cost exceptions on hold/quote-only; never calculate a customer price from zero or below verified cost.
- No live stock or price changes are authorised by this audit.

## Audio Connections

### Source and catalogue scope
- Source files: Starsound price list dated 05 August 2026 and Sony Mobile ES dealer price list dated September 2026.
- The preview retains 66 records from 68 source rows: 13 Sony and 53 other-brand records. Two Sony source rows are excluded pending review (XS-690ES is marked sold out; XS-680G accessory identity/image remains unresolved).
- All 66 preview rows remain PREVIEW_ONLY_NOT_LIVE.
- The August Starsound list explicitly states all prices are VAT-exclusive. The Sony list has separate Price Ex and RRP columns and states prices may change without notice due to exchange-rate fluctuations.
- Neither source provides current availability. Do not infer live stock.

### GW SKU, image and price coverage
- 13 Sony rows have proposed collision-checked GW SKU candidates; 53 other-brand rows have no proposed GW SKU yet.
- Four Sony image URLs are present as official-source review candidates; none is approved for customer publication. The other 62 preview rows have no image URL.
- Three retained preview rows have no source price; keep them quote-only using the approved customer-facing fallback.
- Starsound proposed selling prices currently use dealer cost ex VAT × 1.15 × 1.35 as a review estimate. This is not an approved retail price; verify the cost basis, current quote and full landed-cost margin before recommendation.
- Sony price proposals are based on a 2% reduction from the printed RRP; keep provisional until VAT basis and current dealer cost are confirmed. Dealer price is not customer price.

### Classification and content quality
- Existing component counts cover component/coaxial speakers, subwoofers, amplifiers, head units/media players, installation kits, tweeters and equalisation/crossover products.
- Keep supplier brands/models accurate; do not expand ambiguous abbreviations such as “RA” without evidence.
- Descriptions for many Starsound rows are currently short source labels rather than complete customer-ready specifications. Expand only from exact manufacturer/supplier evidence.
- Source price lists and dealer terms remain internal. Customers see product brand, model, GW SKU, approved description, approved image and approved customer price/availability wording—not supplier identity or dealer cost.

## Immediate work queue — in order

1. Reconcile every Planetworld Car Audio row to its original workbook/sheet/source row, exact model and current component classification; retain Marine Audio and Harnesses, Trims & Fitment as separate groups.
2. Audit all 68 Planetworld model enrichments against exact workbook rows and confirm the GW SKU candidate, model/variant, description and image all point to the same item.
3. Review Planetworld image assets visually and permission/source status; fill the seven missing model image references only with exact official assets. Do not treat all existing URLs as approved.
4. Reconcile Audio Connections' 13 Sony models and 53 other-brand offers to both source PDFs; complete GW SKU collision checks for the 53 non-Sony rows.
5. Source exact high-resolution images for Starsound/Reference Audio/BlackSpider models and verify each model/variant; no generic/reused images.
6. Expand incomplete descriptions from exact manufacturer or supplier evidence; preserve ambiguous brand/model labels until verified.
7. Recheck all Audio Connections prices against the printed VAT basis, distinguish missing/blank price rows, and obtain current dealer quote/availability confirmation.
8. Produce a side-by-side pilot preview and source-to-store diff report using the permanent Supplier Integration Standard.
9. Obtain owner visual acceptance before ASC or Electro-city work begins.

## Safety boundary
This audit did not activate either supplier, write to Supabase, change live stock/prices/categories, publish products, alter checkout/payment, upload to Axxess, change DNS, merge PR #168 or deploy production. All records and price proposals remain review-only.
