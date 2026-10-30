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
- Audio Connections: all 13 Sony candidate models have dealer price and RRP values in the September 2026 PDF. The PDF states prices are VAT-exclusive. RRP−1% and RRP−2% proposals both exceed dealer cost for all 13. See `AUDIO_CONNECTIONS_13_SONY_PRICE_REVIEW_2026-10-30.csv`. No price was imported; supplier catalogue rows remain inactive and availability is not stated. Owner-authorised dealer access is confirmed; do not request further proof of dealer status.
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
