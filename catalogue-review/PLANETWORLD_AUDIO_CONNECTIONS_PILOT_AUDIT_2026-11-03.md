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
- 62 of the 68 curated model records currently have an image URL; six do not.
- The 62 URLs are source candidates/review references, not blanket approval for customer publication. Existing image status values vary and some records have no explicit status.
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
- Twenty-two distinct direct image URLs are present in the 66-row Audio Connections preview (four Sony and eighteen Starsound); none is approved for customer publication. Seventeen non-Sony rows now have exact individual Starsound product-page image candidates; 44 preview rows still have no image URL.
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
- Manufacturer-page reference status in current preview: 33 records have a manufacturerPage value across 66 retained rows — 13 Sony product/specification pages and 20 non-Sony references. Seventeen non-Sony records now have exact individual Starsound product-page image candidates; 33 of 53 non-Sony rows still have no manufacturerPage reference. Alias/category listings are references only, not proof that an image/variant is approved.
- The 13 Sony price proposals were corrected on this branch. **The Sony PDF labels columns “Price Ex” and “RRP” but does not state the RRP VAT basis in its text. The owner has separately confirmed that Sony RRP includes VAT.** Therefore the 1–2% proposal must be calculated directly from VAT-inclusive RRP; do not add VAT a second time to the RRP. Dealer cost is VAT-exclusive. The corrected review CSV calculates gross profit exclusive of VAT and remains unapproved/unimported.
- The August 2026 Starsound source explicitly says all prices are VAT-exclusive. Three retained non-Sony records have no source price and remain quote-only; current availability is not stated.
- No Audio Connections product image is approved. Sony PDF thumbnails, reused impedance-variant images, and a generic amplifier image reused across several models are not acceptable customer images. The preview currently has 22 distinct direct image URL candidates (four Sony and eighteen Starsound); all are review-only. The supplier crosswalk records 23 official image-source URL entries across the two suppliers (four Planetworld and nineteen Audio Connections); none is approved for customer publication.

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


### Audio Connections non-Sony GW candidate collision check — 2026-11-03
- Generated 53 deterministic internal GW SKU candidate codes for the 53 non-Sony Audio Connections source rows using the existing FNV-1a `Audio Connections|brand|model` convention.
- Verified 53/53 are unique within the new set, do not collide with the previous 81 proposed codes, and return zero exact matches against current `public.products.public_sku` in a read-only query.
- These 53 values are recorded in the new crosswalk columns `gw_sku_candidate_review` and `gw_sku_candidate_status`; the official proposed field remains blank and `gw_sku_status` remains `NOT_ASSIGNED_HOLD`. This prevents unverified products from being treated as assigned/published SKUs.
- Two RA source rows remain held because the brand abbreviation is unverified. The remaining rows still require exact model/variant, description and image review. A collision-free code is not proof of product identity.
- Combined collision-checked candidate set: 68 Planetworld + 13 Sony proposed candidates + 53 non-Sony held candidates = 134 unique codes, zero collisions with current live public SKUs. No public SKU/product rows were inserted or updated.


### Planetworld 68-model preview price completeness — 2026-11-03
- Exact-joined all 68 verified model records to the 68-row Planetworld candidate price review by normalized supplier model/SKU: 68/68 matched, all with positive RRP−1% preview price proposals and `PASS_REVIEW_ONLY` cost-floor status.
- Corrected the verified-only card builder. Eleven models merge into a broad catalogue row by exact leading model token; the other 57 remain separate verified-model cards. Those 57 previously had `indicativePrice:null` despite having an exact source price-review row; they now carry the matching RRP−1% indicative proposal and the dated 25-Oct-2026 snapshot label.
- No historic stock is represented as current availability. The cards remain review-only, and no dealer cost, supplier SKU or live stock was added to the customer-facing data.
- Regression assertions added for 68/68 positive indicative prices and the dated price label. Node test execution remains pending.


### Audio Connections first non-Sony official product image candidate — 2026-11-03
- Verified the exact Starsound **SSUSB-450BTDD** product page and its direct official image asset from the manufacturer page.
- Added the official product-page link and 788×788 image URL to the preview row as a review candidate. The asset is explicitly marked `OFFICIAL_MANUFACTURER_IMAGE_URL_REVIEW_CANDIDATE_NOT_APPROVED`; it is not approved for customer publication and the product remains `PREVIEW_ONLY_NOT_LIVE`.
- Updated the corresponding crosswalk row and regression assertions. The candidate GW SKU remains held, not assigned, pending image review and owner approval.
- External image retrieval returned a cache miss in the research environment, so successful image rendering/visual QA remains unverified. No other supplier image is inferred from this one.


### Audio Connections official Starsound reference reconciliation — 2026-11-03
- Added seven further source-to-manufacturer references: one official product-page alias reference for source model USB230 EXT MIC → SSUSB-230BTCE (variant review remains open), and six official category-listing references for SSMP5-7655BT, SSDVD-9900BT, SSMP5-7670BTAC, SSW-12W-5200, SSW-12-6300 and SSW-12-7300.
- Together with the earlier references, 20 of the 53 non-Sony source rows now have a manufacturer-page reference; 17 of these have exact individual Starsound product-page image candidates, while three are alias/category references only. 33 remain without an individual manufacturer-page reference.
- The SSUSB-450BTDD row retains its earlier direct manufacturer image URL candidate. Seventeen other non-Sony rows now have exact Starsound individual product-page image candidates. All remain unapproved pending permission; no generic images were used.
- All 66 records remain preview-only; all 53 non-Sony GW candidates remain held/unassigned until exact identity, image and variant review is complete.


### Planetworld remaining six image-gap evidence — 2026-11-03
- Added the official Focal P20 FE 1000×1000 product-image URL as a review candidate. The 68-model enrichment now has 62 image URLs and six unresolved gaps.
- Five Alpine gaps (HCE-C2100RD, HDZ-653, R2-W12D4, S2-A55V, S2-S65): official product pages exist, but only 46×35 thumbnails were exposed; these are too small and were not used.
- One JVC gap (KW-M590BT): the official JVC product page exposes a nine-image gallery, but the JVC dealer marketing image pack is restricted to dealers and says promotional assets cannot be distributed without written authorisation. No asset was used pending permission.
- Added explicit image-gap status and notes to the model JSON and supplier crosswalk. The Focal candidate and all other images remain unapproved until hosted rendering, exact variant and usage checks pass.


### Audio Connections exact-model Starsound image reconciliation — 2026-11-03 (latest)
- Seven initial exact official Starsound product-page image candidates were followed by ten additional exact individual product-page matches. Current retained model list: SSW12-6300, SSW12-7300, SSW-B12-2800, SSAR 22000.1, SSA-R 5000.4, SSA-ATOM13800.4, SSA-M4-80.4, SSS5502/SSS-5502, SSS-6601, SSS6602/SSS-6602, SSS6903/SSS-6903, SSD-620, SST350/SST-350, SST-850, EQ5100/SSA-EQ-5100, CROSSOVER 2900/SSA-2900 (SKU SSA-EQ-2900), and CROSSOVER 2950/SSA-2950.
- The Audio Connections preview now has 22 distinct direct image URLs across 66 rows: four Sony and eighteen Starsound. Seventeen non-Sony rows have exact individual Starsound product-page image candidates. Forty-four total preview rows still have no image URL. No image is approved for customer publication; written image-use permission and owner acceptance remain required.
- Current JSON read-back: 66 rows, 22 unique image URLs, 17 exact Starsound image candidates, 13 Sony proposed GW SKU candidates, and no GW SKU assigned to the 53 non-Sony rows. All 66 remain PREVIEW_ONLY_NOT_LIVE.
- Manufacturer/source specification discrepancies requiring supplier confirmation: SSW12-6300 (source 300W; official 400W RMS); SSA-ATOM13800.4 (source 100RMS; official 80W×4 at 4Ω); SSAR 22000.1 (source 1700RMS; official 1800W RMS at 1Ω); SSA-R 5000.4 (source 60RM; official 65W/channel at 4Ω). Preserve source values and do not publish disputed specifications until confirmed.
- SSW12" 5200 remains unmatched to official SSW-12W-5200 because the source model label differs. CROSSOVER 2900 is matched by official page display title SSA-2900 / SKU SSA-EQ-2900 even though the URL slug is legacy ssa-eq-7200; do not use URL slug as product identity. Do not map source EQ7100 to manufacturer's different EQ7200.
- Current manufacturer-page references in the retained JSON: 33 across 66 records (13 Sony and 20 non-Sony). The supplier crosswalk records 19 official image-source URL entries for Audio Connections and 4 for Planetworld. All image references remain review-only.
- Seven initial exact Starsound image additions and ten further additions are recorded in PR #170 comments 6608882553, 6608914070 and 6608957774. The handover file contains the detailed commit references and continuation queue.


### Current consolidated source/image/specification checkpoint — 2026-11-03
- Planetworld: 702 Car Audio source rows; 68 curated exact-model candidates; 68/68 exact price-review joins; 62 model image URLs and six documented image gaps. All 62 remain review candidates, not approved. The six gaps are five Alpine models with only 46×35 thumbnails and JVC KW-M590BT whose dealer image pack requires written distribution permission.
- Audio Connections: 68 source rows, 66 retained preview rows; 22 direct image URLs (17 exact-model Starsound, four Sony and one additional SSUSB-450BTDD candidate); 44 rows have no image URL. All 22 are review-only, not approved. The source PDF has no current availability data.
- Manufacturer references: 48 in the retained Audio Connections preview (35 individual manufacturer product-page references plus 16 category-listing references, with overlap on three rows); the supplier crosswalk has 49 source-row references because it includes one source-only excluded row. Thirty-five of 53 non-Sony rows have a manufacturer reference; 18 do not.
- Image reconciliation: crosswalk contains 84 current image URL candidates (62 Planetworld +22 Audio Connections), 23 additional official source URL entries (some overlap), and 86 distinct URLs after de-duplication. No image assets were downloaded or approved for customer publication.
- Audio Connections quote-only rows: SSW8"-8000D2, SSW-B12-2800 and SSWF12-5150SVC. Exact owner wording remains “Price on Request due to Limited Stock and Availability.”
- Five specification conflicts remain held: SSW12-6300 (supplier 300 W vs official 400 W RMS); SSA-ATOM13800.4 (supplier 100 RMS vs official 80 W ×4 at 4 Ω); SSAR 22000.1 (supplier 1700 RMS vs official 1800 W RMS at 1 Ω); SSA-R 5000.4 (supplier 60 RM vs official 65 W/channel at 4 Ω); SPARTAN 9900.1 (supplier 600 RMS without impedance vs official 500 W RMS at 1 Ω / 250 W RMS at 2 Ω). Supplier descriptions are preserved and the preview displays a review warning; no disputed figure is silently substituted.
- GW SKU state: 81 proposed collision-checked candidates (68 Planetworld +13 Sony) and 53 collision-free held candidates for non-Sony Audio Connections rows; 134 unique candidate codes, zero collisions against current public SKU values. All 53 non-Sony codes remain unassigned/held pending exact identity and image approval.
- All catalogue rows and prices remain review-only; supplier activation, public product creation, public image writes, stock/price updates and live database changes remain prohibited.
- Tests have updated assertions but have not run under Node/GitHub Actions. Hosted preview verification must use the final exact branch head; no readiness claim.


### Reference Audio brand-level identity check — 2026-11-03
- The official Reference Audio brand site confirms the brand identity for RABTR03, RA AWG4 and RA SUPER RAST20. The two source abbreviations “RA” are now expanded to **Reference Audio** in the internal crosswalk and preview.
- No exact official product page/model evidence was found for these three products. The official brand homepage is recorded separately as brand-level evidence only; it is not counted as a product page, and retailer pages are not treated as manufacturer proof.
- These products remain held for exact model/image confirmation. The 18-row non-Sony no-product-reference count is unchanged.


### Audio Connections open evidence request — 2026-11-03
- After the seven additional official Starsound references, 35 of 53 non-Sony rows now have a product-page or category-listing reference; 18 remain without exact product references. The 18 are 15 Starsound source models/accessory codes and three Reference Audio models.
- Created `catalogue-review/AUDIO_CONNECTIONS_OPEN_EVIDENCE_REQUEST_2026-11-03.md` listing the exact 18 held models, five source-versus-manufacturer specification conflicts, three quote-only products, image rights and current commercial/availability evidence needed.
- This request is an internal checklist only; no email was sent. Retailer listings and similar model codes are not substituted for exact manufacturer evidence.
