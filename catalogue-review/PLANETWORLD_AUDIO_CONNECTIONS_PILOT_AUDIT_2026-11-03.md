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


## Deeper source reconciliation — 2026-11-03

### Planetworld Car Audio source workbook audit
- The extracted 25-Oct workbook report contains 702 Car Audio rows across ten source workbooks.
- Source brand counts: One 290; Kicker 189; Audison 94; Alpine 58; Harness and Trims 47 (range label, not a manufacturer brand); JVC Car Audio 13; Kenwood Car Audio 4; Amplified 3; Focal Car Audio 2; Pioneer Car Audio 2.
- Source component suggestions: 242 head units/receivers; 124 manual-review component candidates; 78 subwoofers; 59 speakers; 42 harnesses/trims; 41 amplifiers; 36 car-audio accessories; 28 speaker pods/grilles/enclosures; 25 Marine Audio; 11 cameras; 9 DSP/signal processors; 7 vehicle antennas.
- The separate 68-row exact-model price-review set is matched to 68 supplier crosswalk rows by supplier SKU. All 68 have proposed collision-checked GW SKUs and provisional RRP-minus-1%/2% prices above the estimated VAT-inclusive dealer cost in the dated 25-Oct snapshot. This is a curated pilot, not coverage of the remaining 634 rows.
- The 634 remaining Car Audio rows have no proposed GW SKU in the crosswalk and remain held. Across the full crosswalk, 466 of the 702 rows are marked not independently verified. Do not infer that an official collection/category page proves exact model identity.
- The 702-row historical extraction identifies six zero-RRP rows; among positive-RRP rows, nine are below estimated VAT-inclusive dealer cost at RRP−1% and ten at RRP−2%. These are historical source flags, not current pricing errors. Keep zero-RRP and below-cost cases out of automatic price proposals.
- The historical source component report has 124 Car Audio rows in a manual-review component. Do not force these into product groups from keyword guesses alone.

### Audio Connections exact status
- The 770-row supplier crosswalk contains all 68 Audio Connections source rows. Thirteen Sony rows have proposed collision-checked GW SKU candidates; 55 remain unassigned/held.
- Manufacturer evidence status: 14 rows have an exact official model page (including the sold-out XS-690ES); 54 have no exact official manufacturer page. Of the 53 non-Sony records, seven have official Starsound category-listing matches, one BlackSpider Lynx has an exact official product page, and 45 remain without an official listing/page.
- The 13 Sony price proposals were corrected on this branch. **The Sony PDF labels columns “Price Ex” and “RRP” but does not state the RRP VAT basis in its text. The owner has separately confirmed that Sony RRP includes VAT.** Therefore the 1–2% proposal must be calculated directly from VAT-inclusive RRP; do not add VAT a second time to the RRP. Dealer cost is VAT-exclusive. The corrected review CSV calculates gross profit exclusive of VAT and remains unapproved/unimported.
- The August 2026 Starsound source explicitly says all prices are VAT-exclusive. Three retained non-Sony records have no source price and remain quote-only; current availability is not stated.
- No Audio Connections product image is approved. Sony PDF thumbnails, reused impedance-variant images, and a generic amplifier image reused across several models are not acceptable customer images. The four official Sony image URLs in the preview are review candidates only. The 53 non-Sony rows have no image URL in the preview.

### Corrections committed on the pilot branch
- Updated `catalogue-review/AUDIO_CONNECTIONS_13_SONY_PRICE_REVIEW_2026-10-30.csv` to use the owner-confirmed VAT-inclusive Sony RRP basis, correct customer-price proposals, VAT-inclusive dealer cost floor and gross profit exclusive of VAT.
- Updated the 13 corresponding Sony rows in `catalogue-review/supplier-gw-crosswalk-2026-10-30.csv` so the VAT basis is not incorrectly attributed to the PDF footer.
- All corrected price calculations remain review-only. No live price, stock, supplier activation, public product, image or database record changed.


### Car Audio Harnesses, Trims & Fitment filter refinement — 2026-11-03
- Review of the actual 702-row Car Audio preview showed the earlier broad keyword classifier was overinclusive: it treated generic words such as “installation” and “wiring” as if every cable, fuse holder and integration accessory were a vehicle harness or fitment kit.
- Refined `preview-audio.html` so the separate **Harnesses, Trims & Fitment** button includes the dedicated 47-row source collection plus product-level exact evidence (harness, trim, fascia, fitment, ISO2CAR, vehicle interface, dash kit or installation kit). Generic installation/wiring accessories remain in their own component groups; generic “Harness & Installation” records without a vehicle-harness product signal now display as “Installation & Integration”.
- Read-only check against the 702 Planetworld Car Audio rows: **168 records** now match the approved Harnesses, Trims & Fitment grouping (47 dedicated source-collection rows + 121 exact product-text matches). The grouping includes OneNav vehicle-specific fitment kits but excludes generic TOSLINK cables, RCA interconnects and fuse holders.
- Added regression assertions for the 168-row count, vehicle fitment kit inclusion and generic cable/fuse-holder exclusion. The test file has been updated but the Node test has not yet been executed; GitHub Actions runner allocation remains a separate verification gate.
- This is a preview navigation classification only. Supplier source rows, live categories, prices, stock and database records were not changed.
