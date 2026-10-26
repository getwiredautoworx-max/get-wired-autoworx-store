# Planetworld manufacturer-match continuation — 26 October 2026

**Scope:** Six non-zero-RRP rows selected from the price-risk review. Zero-RRP items remain excluded for the owner's personal audit. This is an identification/image-source check only; no images downloaded, no supplier files edited, no store catalogue changes.

| Supplier model/SKU | Result | Category guidance | Source |
|---|---|---|---|
| JBL IRX108BT-EK | **Base model matched; suffix not confirmed.** Official JBL Professional page confirms IRX108BT is an 8-inch powered portable PA loudspeaker with Bluetooth. The `-EK` regional/pack suffix was not independently verified. | DJ / Studio / Pro Audio → Powered PA speakers | https://jblpro.com/en-US/products/irx108bt |
| JBL JBL-EON710-EK | **Base model matched; suffix not confirmed.** Official JBL Professional page confirms EON710 is a 10-inch powered PA speaker with Bluetooth. | DJ / Studio / Pro Audio → Powered PA speakers | https://jblpro.com/en-US/products/jbl-eon710 |
| Ibanez IAB541-WR | **Exact model/colour matched.** Official Ibanez page lists IAB541-WR as the Wine Red colour variation in the IAB541 Powerpad gig-bag range. | Musical Instruments → Guitar bags / cases | https://www.ibanez.com/na/products/detail/iab541_01.html |
| Soundcraft 5085985EU | **Supplier SKU/product identity corroborated; official manufacturer URL not established in this pass.** Planetworld's own listing uses the exact SKU and describes the Notepad 12-channel USB mixer with Lexicon effects. | DJ / Studio / Pro Audio → Analogue mixers | https://www.planetworld.co.za/products/musical-instruments/live-gear/mixing-consoles/analogue/soundcraft-notepad-12-ch-desktop-mixer-w/usb-lexicon-effects/ |
| One ON1509-LX1 | **Unverified.** No reliable exact official manufacturer match established in this search pass. Do not choose an image based only on a similar OneNav product. | Likely vehicle-specific infotainment, but keep classification provisional until exact model confirmed. | No verified exact source yet |
| Paiste 0004801419 | **Unverified.** No reliable exact official manufacturer match established in this search pass. Do not infer cymbal size/series or reuse a visually similar image. | Likely cymbal / percussion, pending exact model confirmation. | No verified exact source yet |

## Image-use status
- Official pages provide product imagery for the confirmed JBL and Ibanez base/model matches, but no images were copied or added to the store.
- Confirm regional suffixes and exact variant before selecting a product image for a future catalogue record.
- A page match does not establish permission to download/re-host its image. Check image-use rights or use an authorized supplier asset.
- The two unresolved models remain in the research queue; do not fabricate URLs or mark them as verified.

## Next
1. Continue exact-model verification for the other non-zero-RRP rows, prioritizing duplicate-identifier and below-cost risk candidates.
2. Continue refining the 1,016 component-review rows and 1,348 unclassified rows from the previous filtered snapshot.
3. Rerun the workbook audit against current files to replace provisional counts.
4. Keep all prices/categories/images as review-only until owner approval; no stock imports or live catalogue changes.


## Second batch — six more non-zero-RRP candidates checked

| Supplier model/SKU | Result | Source / category guidance |
|---|---|---|
| One / ISA-ON115-3LX | Supplier SKU and product identity matched to OneNav 9-inch Isuzu RBA/RBB head unit; supplier page says out of stock and call for pricing. This is not proof of current Planetworld stock/status and is not an official manufacturer page. | https://nxtleveltech.co.za/product/onenav-9inch-for-isuzu-rba-rbb — Vehicle-specific Car Audio → Head units |
| Paiste / 0004801419 | Supplier listing matches “19IN SIG DARK Energy Crash MK I”; page says out of stock and call for pricing. Exact model identity corroborated by supplier listing, but official manufacturer page not established in this pass. | https://nxtleveltech.co.za/product/paiste-19in-sig-dark-energy-crash-mk-i — Musical Instruments → Cymbals / percussion |
| Vogel's / THIN215 | Official Vogel's page matches THIN 215 UltraThin tilting TV wall mount; official page says this model has been succeeded by TVM 3415. This is an end-of-life/product-successor flag for owner review, not permission to delete or replace the supplier row. | https://www.vogels.com/en/c/thin-215-ultrathin-tilting-tv-wall-mount — Home CI / TV mounting |
| Vogel's / 7225154 | Exact code is corroborated by product-distributor listings as PUC 2515 / Connect-it 150 cm ceiling pole, but an exact official Vogel's product page for code 7225154 was not found in this pass. Treat as a high-confidence third-party identification, not official verification. | https://www.ivojo.co.uk/mount.php?pid=Vogels_PUC+2515S — Installed AV / ceiling mount components |
| One / ON263-FK2 | Exact official or reliable exact-SKU match not established in this pass. | Keep as unverified; likely vehicle-specific fitment kit only as a provisional description. |
| Vogel's / PFW4600 | Exact official page for the PFW4600 SKU not established in this pass. Search surfaced the broader PFW family only; do not use family imagery as an exact match. | Keep as unverified; display mounting category remains provisional. |

No product images were downloaded or added. Third-party supplier/distributor pages are identity cross-checks only; image reuse rights are not established. Current supplier stock and orderability must be confirmed directly from current Planetworld data before any decision.


## Duplicate-key candidates resolved — 2026-10-26

The six candidates previously marked by the old duplicate-normalization rule were checked. They are distinct model/variant SKUs, not safe candidates for merging:

- **On-Stage KT7800 vs KT7800+** are different bench models: KT7800 is the three-position X-style bench (300 lb capacity); KT7800+ is the deluxe model with a larger/extended cushion and 360 lb capacity. Official sources: https://tmppro.com/kt7800 and https://on-stage.com/deluxe-x-style-keyboard-bench. The plus sign must be preserved in model normalization.
- **Roborock Q7 TF B vs Q7 TF+ B**, and **Q7 TF W vs Q7 TF+ W**, are different non-plus versus plus variants; the plus SKU description includes an auto-empty dock. Local exact-SKU listing corroboration: https://www.mhcworld.co.za/products/roborock-q7-tf-smart-multi-surface-robot-vacuum-white and https://guardsondutyshop.co.za/collections/roborock. Official Q7 family overview: https://global.roborock.com/pages/roborock-q7-series. Regional naming differs by market, so keep the supplier's exact code and confirm authorized imagery/region-specific details before catalogue use.

The read-only audit script now excludes rows from identical product-data duplicate workbooks before calculating model/SKU duplicates and preserves '+' in model codes. Latest run [40288470708](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40288470708) succeeded; its artifact summary reports zero duplicate model/SKU flags after this correction. The duplicate JBL workbook itself remains present and its 26 rows are separately marked as identical-workbook duplicates.
