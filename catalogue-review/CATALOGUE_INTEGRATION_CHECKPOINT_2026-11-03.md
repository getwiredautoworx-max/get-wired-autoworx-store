# Catalogue Integration Checkpoint — 2026-11-03

## Scope
Owner-directed rebuild of the new three-root taxonomy. Supplier sources remain private. This checkpoint records a read-only audit of the current private Supabase staging table and the tracked review evidence; it does not publish products or change stock/prices.

## Current database evidence (read-only)
- `public.categories`: 27 rows (3 roots + 24 descendants).
- `public.products`: 0 rows.
- `gw_private.catalogue_product_staging`: 770 rows, all `REVIEW_ONLY`.
- Audio Connections: 68 rows; all 68 assigned to a Car Audio component category.
- Planetworld: 702 rows; 671 assigned to Car Audio component categories; 31 held without category pending separate classification (marine audio / parking-sensor and manual-review exceptions).
- Planetworld stock snapshot: 512 rows show nonzero stock in at least one supplier region; 190 show zero across all three regions. Snapshot date is 2026-10-25 and is not current stock confirmation.

## Verification gate findings
### Planetworld
- Current verification summary records 702 candidate rows.
- Exact manufacturer model verification and exact product image approval are not complete across the staged rows. The staging table currently marks all 702 model identities and images as NOT VERIFIED.
- The 2026-10-25 workbook RRP/stock snapshot is historical evidence only. Do not publish availability or prices as current.
- Do not force the 31 held exceptions into Car Audio.

### Audio Connections
- 68 rows are staged from the August 2026 Starsound and September 2026 Sony Mobile ES dealer PDFs.
- 14 Sony Mobile ES models have exact official manufacturer model-page evidence in the current audit: XM-1ES, XM-4ES, XM-5ES, XM-6ES, XM-8ES, XS-160ES, XS-162ES, XS-163ES, XS-680ES, XS-690ES, XS-692ES, XS-W104ES, XS-W122ES, XS-W124ES  (Use `sony-mobile-es-official-model-audit.csv` as the model-level source of truth.)
- The corresponding source images are low-resolution PDF images, reused generic amplifier images, or reused impedance-variant images. None is approved as the public product image. Exact official model pages are evidence for identity/specifications, not proof that an image binary has been captured/approved.
- Supplier availability is not stated for the in-scope Sony rows; one model (XS-690ES) is explicitly marked SOLD OUT in the source PDF. Availability must be confirmed with Audio Connections before publication.
- The dealer PDF labels Price Ex and RRP, but VAT basis is not stated. Do not calculate/publicize selling prices until the VAT basis and applicable pricing policy are confirmed.

## Publication decision
- Public-ready products identified by this audit: **0**.
- No inserts/updates were made to `public.products`, supplier stock, prices, or customer-visible catalogue tables.
- No supplier names, dealer costs, or internal supplier codes may appear on the public storefront. Generate/use GW public SKUs only after model, category, image, pricing and availability gates pass.
- Existing private staging is preserved for review; do not promote REVIEW_ONLY rows automatically.

## Next executable work
1. Resolve exact high-resolution manufacturer image assets for the 14 model-verified Sony records; record exact model-to-image mapping and visual inspection.
2. Request current availability/lead-time confirmation from Audio Connections, including the sold-out XS-690ES exception.
3. Confirm the VAT basis and selling-price rule for Audio Connections dealer costs.
4. Continue Planetworld model-by-model verification and exact image capture; prioritize brands with the strongest official evidence already present in the audit files, without treating collection-level matches as image approval.
5. After those checks, prepare inactive preview-only product records with GW SKUs for owner review. Do not activate live stock or deploy to production without separate explicit approval.

## Release boundary
Production remains HOLD. No Axxess upload, DNS change, production deployment, live price/stock write, payment change or checkout go-live is authorized by this review checkpoint.

## Image-source extraction attempt
- Located an exact Sony South Africa XM-1ES product-page image asset link: `https://www.sony.com/image/3ee4e04c604e410a05740c6697045026?bgc=FFFFFF&bgcolor=FFFFFF&fmt=pjpeg&wid=330` (330 px rendition; the same page exposes a 165 px rendition). The Sony page labels the image as XM-1ES. The binary download attempt failed, so this URL is evidence for the next capture step only; no image file was added and no image is approved for store publication. Source page: https://www.sony.com/za/electronics/mobile-es-series/xm-1es.

## Sony image-source progress (2026-11-03)
- Added `SONY_OFFICIAL_IMAGE_ASSET_MAP_2026-11-03.csv` with exact model-specific official Sony South Africa image URLs for XS-W104ES (1200px), XS-162ES (1200px), XM-1ES (330px), and XS-W124ES (330px).
- These are not downloaded binaries and remain unapproved. The first two are high-resolution source leads; the latter two require higher-resolution image variants before public use. No image has been inserted into a product record.
