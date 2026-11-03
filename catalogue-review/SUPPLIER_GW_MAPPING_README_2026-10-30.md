# Supplier-to-GW mapping — updated 2026-10-30

## Verified internal staging
- Current public catalogue: 4,200 products. Exact identity comparison found no existing public product matches for the 702 Planetworld source rows or 68 Audio Connections rows; do not force-link unrelated products.
- Supplier connections:
  - **TOMS Sound & Music (Pty) Ltd t/a Planetworld** — ID `29e1acee-b1a6-5630-83c3-0150ea993479`, active. Dealer onboarding is confirmed.
  - **Audio Connections** — ID `806ef592-6f25-5116-bee6-335e26f8b609`, inactive staging record. Owner confirms authorised dealer status, access to confidential dealer pricing and direct purchasing relationship. The inactive database status is a separate activation/release gate, not a missing supplier-authorisation blocker.
- All 770 source records remain in private `gw_private.supplier_catalog_items`, inactive, quote-on-request and unlinked.
- The 81 collision-checked new-product candidates now have exact manufacturer-model identities and manufacturer-based product names/descriptions staged privately:
  - 68 Planetworld candidates (Alpine, Audison, Focal, JVC, Kenwood, Kicker and Pioneer).
  - 13 Sony Mobile ES candidates from Audio Connections.
- Read-only verification after staging: 81/81 candidates have non-empty `public_description` and official manufacturer `source_url`; all remain inactive, `public_product_id IS NULL`, and no `public_image_url` has been set. No public product or SKU rows were inserted.

## Component classification reconciliation — review-only
- Exact source-file + model joins reconcile all 702 Planetworld rows to the 702-row component manifest and all 68 Audio Connections rows to the 68-row component manifest: 770/770 exact joins, zero unmatched rows, zero unclassified component candidates.
- Planetworld component groups use the specific source-backed classes, including Car Amplifiers, Car Speakers, Vehicle Cameras, Vehicle Harnesses & Trims, Marine Audio and Car Audio Accessories. Audio Connections rows use their corresponding speaker, subwoofer, amplifier, head-unit and signal-processing groups.
- Audio Connections dealer authorisation is owner-confirmed. Its database connection intentionally remains inactive; the crosswalk records `REGISTERED_INACTIVE_OWNER_DEALER_CONFIRMED` rather than the stale `RELATIONSHIP_UNCONFIRMED` label. No activation or public publication is implied.

## Price review — private, proposal only
- Planetworld: 68/68 candidate SKUs matched the 2026-10-25 read-only workbook report. All have positive RRP. RRP−1% and RRP−2% proposals both clear estimated VAT-inclusive dealer cost for all 68; smallest gross headroom is R101.65 at −1% and R97.15 at −2%. See `PLANETWORLD_68_CANDIDATE_PRICE_REVIEW_2026-10-30.csv`.
- The Planetworld source report stock snapshot is dated 2026-10-25 (44 rows positive, 24 rows zero). It is not current stock confirmation and was not imported.
- Audio Connections: all 13 Sony candidate models have dealer price and RRP values in the September 2026 PDF. The PDF labels `Price Ex` and `RRP` but does not state the RRP VAT basis in its text; the owner has separately confirmed that Sony RRP includes VAT. RRP−1% and RRP−2% proposals are calculated directly from that VAT-inclusive RRP and both exceed estimated VAT-inclusive dealer cost for all 13. See `AUDIO_CONNECTIONS_13_SONY_PRICE_REVIEW_2026-10-30.csv`. No price was imported; supplier catalogue rows remain inactive and availability is not stated. Owner-authorised dealer access is confirmed; do not request further proof of dealer status.
- Existing Planetworld quarantine remains: 19 zero-RRP rows excluded, and the wider workbook audit's 18/19 under-cost warnings remain excluded from automatic pricing.

## Still required before publication
1. Obtain and visually approve exact high-resolution manufacturer/supplier image assets for each candidate. PDF thumbnails and generic/reused images are not acceptable product images. Customer-publication-approved image URLs: 0. The isolated preview now displays 11 official manufacturer image URLs as visual review candidates; these remain preview-only and are not approved for customer publication.
2. Use the 2026-10-25 Planetworld workbook as the current available preview snapshot (44 positive / 24 zero-stock candidates); refresh when the next workbook arrives. Audio Connections September 2026 price list contains no availability data, so its Sony candidates remain quote-on-request/availability-to-confirm in the review stage.
3. Keep Audio Connections dealer authorisation recorded as owner-confirmed. Supplier activation and catalogue publication remain separate owner/release approvals; no additional authorisation proof is required.
4. Resolve remaining manufacturer-identity exceptions (466 rows currently marked not independently verified, including 54 with no exact official manufacturer page) and supplier-description conflicts before product creation; keep unresolved rows unlinked.
5. Only after image, current price, availability and supplier terms are verified, create inactive public product records with GW public SKUs and link the corresponding private supplier rows.

## Safety boundary
No public product inserts, `product_supplier_codes` inserts, supplier-item activation, public image URL writes, customer-price imports, stock updates, checkout/payment changes, Axxess/DNS changes or production deployment were performed. No dealer cost or supplier price data is exposed on the public storefront.


### Audio Connections component classification — 2026-10-30
- All 68 source rows in `audio-connections-product-review.csv` have now been assigned a component group in `AUDIO_CONNECTIONS_COMPONENT_CLASSIFICATION_2026-10-30.csv`.
- Counts: Car Speakers 20; Subwoofers 12; Amplifiers 26; Head Units & Media 6; Signal Processing & Crossovers 4.
- Brand names and model references are preserved exactly as supplied. The source abbreviation `RA` is not expanded because its full brand identity is unverified.
- The 68 rows remain review-only, inactive and unlinked. No supplier prices, public product rows, stock, images or supplier activation were changed.


## Additional Alpine manufacturer-page verification — 2026-10-30
- Located exact official individual product pages for seven more Alpine models: iLX-705D, KAE-HF11DA, KAE-HF9DA, KTX-HF9, RUE-4360, RUX-KNOB2 and UTE-204DAB. The crosswalk now records 75 exact official product-page matches overall (up from 68).
- Added official reference-only sources for KAC-001 (installation manual), UTE-200BT (official South African product catalogue) and KWE-CAM1D (listed as an accessory on the official iLX-705D page). These three are not counted as exact individual product pages.
- Fitment exception retained: supplier text describes KAE-HF9DA for iLX-F509, while the official UK product page lists iLX-F905D and a regional Alpine page refers to iLX-F509A. Keep this row held until exact regional fitment is confirmed.
- No image assets were downloaded or approved, no GW SKUs were generated for these newly matched rows, and no product rows were inserted or published.


## Combined Audio & Entertainment preview integration — 2026-11-03
- The original supplier source files remain in their owner-approved private folders: 47 Planetworld XLSX workbooks under `suppliers/Planetworld/`; the Starsound 05 August 2026 and Sony Mobile ES September 2026 PDFs under `suppliers/Audio Connections/`. No source file was moved, renamed or modified.
- Added an opt-in, noindex `preview-audio.html` route below **Car Audio / Home Entertainment / Lifestyle → Browse All Audio Catalogues**. The route uses eight department buttons: Car Audio & Video; Home Entertainment (including Installed AV); Band & Live Sound; DJ Equipment; Studio Equipment; Musical Instruments; Marine Audio; and Lifestyle. **Harnesses, Trims & Fitment is a separate component button within Car Audio & Video, not a department button.** Customers see product brands and categories, not supplier identities.
- Planetworld snapshot: 3,317 source rows from 47 workbooks / 94 sheets, 3,280 indicative price proposals at 1% below the 25-Oct-2026 RRP snapshot (subject to the private cost-floor check), and 37 rows using the owner-approved exact text **“Price on Request due to Limited Stock and Availability.”** The 702-row Car Audio division remains split into 627 Car Audio & Video, 47 Harnesses & Trims and 28 Marine Audio records. Exact duplicate source rows are suppressed in the browse display only; source rows remain preserved.
- Planetworld manufacturer enrichment: 68 manufacturer-verified model candidates are merged into exact matching broad catalogue records where the model identity is an exact leading model token; unmatched verified candidates remain separately browsable. Matching deliberately does not enrich an accessory title merely because it mentions a model later in its description/title.
- Audio Connections: 68 source rows; 66 review records are included (13 Sony and 53 other-brand records); two rows remain excluded (Sony XS-690ES sold out; XS-680G exact accessory/image identity unresolved). Of the 66 preview records, 63 have indicative price proposals and three use the owner-approved exact price-on-request wording. No current stock is inferred.
- The combined preview currently has 13 exact-model official manufacturer image-source URLs (9 Planetworld curated model candidates + 4 Audio Connections candidates). These are external review candidates, not downloaded or approved customer-publication assets. No generic or reused product placeholder is inserted; records without an approved exact image render without a false product picture.
- Search by brand/model/product, department/brand/component filters and load-more pagination are included. The data remains preview-only and is copied into the Pages package only when `GW_INCLUDE_PREVIEW_ROUTES=1`. The standard public package excludes the audio route and all three source-derived JSON files.
- No supplier identity, dealer cost, raw supplier SKU, live price/stock/product/category records, database write, supplier activation, payment/checkout change, Axxess upload, DNS change or production deployment was performed.
- **Remaining quality work:** visually review/download/approve exact high-resolution images; add approved brand-logo artwork to brand buttons; complete remaining manufacturer identity/description audits and reconcile current prices/availability before any public listing. The 25-Oct-2026 Planetworld snapshot and August/September 2026 Audio Connections price lists are dated reference data, not live stock.


## Audio Connections non-Sony GW SKU candidate reconciliation — 2026-11-03
- Generated 53 additional deterministic internal GW SKU candidates for the 53 non-Sony source rows using the documented FNV-1a `supplier|brand|model` method.
- All 53 candidate codes are unique within the new set and do not collide with the 81 previously proposed candidate codes.
- A read-only exact lookup against the current `public.products.public_sku` values returned zero collisions for all 53 new candidates.
- These are **held internal candidates only**, not assigned or published GW SKUs. The crosswalk keeps `proposed_gw_public_sku` blank and `gw_sku_status=NOT_ASSIGNED_HOLD` until exact product identity and image review are complete. Two RA-branded records retain the source abbreviation because the full brand identity remains unverified.
- Combined status: 81 proposed collision-checked candidates (68 Planetworld + 13 Sony) and 53 additional collision-free held candidates; 134 unique candidate codes in total, zero live SKU collisions, zero public product links and zero publication.


### Car Audio Harnesses, Trims & Fitment classification correction — 2026-11-03
- The product-level classifier no longer sends every generic `installation` or `wiring` accessory into Harnesses, Trims & Fitment.
- The dedicated 47-row source collection remains intact; 121 additional Car Audio & Video records match explicit product-level harness/trim/fascia/fitment/ISO2CAR/vehicle-interface/dash-kit/installation-kit evidence.
- Total Harnesses, Trims & Fitment group: 168 rows. Generic TOSLINK cables, RCA interconnects and fuse holders remain in their appropriate wiring/accessory groups. Generic integration devices without a vehicle-harness signal are separated as Installation & Integration.
- Regression assertions were added for this 168-row group and exclusions. Execution of the Node test remains pending.


### Planetworld 68-model price presentation correction — 2026-11-03
- Exact joined all 68 verified-model candidates to the 68-row source price review; all 68 have positive RRP−1% preview proposals and `PASS_REVIEW_ONLY` cost-floor status.
- Fixed the 57 verified-only cards that were previously displayed as price-on-request despite having exact source-backed proposals. They now display the RRP−1% indicative proposal and the 25-Oct-2026 snapshot label; no historical stock is represented as live.
- Regression assertions added; execution pending.


### Audio Connections image-source progress — 2026-11-03
- Verified the exact official Starsound SSUSB-450BTDD product page and added its direct official image URL to the review preview. It is marked not approved; the product remains preview-only and the GW SKU candidate remains held.
- External fetch of the image returned a cache miss, so hosted rendering/visual approval is still pending.


### Audio Connections manufacturer references — 2026-11-03
- Added seven official Starsound source references (one alias product page and six category listings) plus the exact SSUSB-450BTDD product page. Fourteen of 53 non-Sony rows now have a manufacturer reference (one exact Starsound product page, one alias product-page reference, 11 category listings and one BlackSpider product page); 39 remain without a manufacturer reference.
- The preview has five direct image URL candidates (four Sony and one SSUSB-450BTDD), none approved; the crosswalk records seven official image-source URLs overall (four Alpine, two Sony, one Starsound). No generic images added. All remain preview-only and all 53 non-Sony GW candidates remain held.


### Remaining Planetworld image gaps — 2026-11-03
- Focal P20 FE now has a direct official 1000×1000 image URL candidate. The 68-model set has 62 image URLs and six gaps.
- Five Alpine official pages expose only 46×35 thumbnails; JVC KW-M590BT's official dealer image pack requires written distribution authorisation. No low-resolution or unauthorised images were used.
