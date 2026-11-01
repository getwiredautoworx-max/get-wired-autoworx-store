# ASC supplier catalogue intake

**Supplier catalogue-use permission:** GRANTED (interim; owner-confirmed 27 October 2026).  
**Technical integration:** OPEN — ASC IT's longer-term technical solution remains separate from catalogue-use permission.  
**Current intake state (updated 1 November 2026):** Six new ASC catalogue PDFs were uploaded to this folder at 09:58 SAST, after the 30 October source reset. They are now the current post-reset test intake. Source PDFs remain unchanged; page-level OCR is complete and the taxonomy preview is implemented. OCR has produced 63 OCR code candidates are indexed as unverified. A 50-row page-3/page-4 pilot across 12 catalogue subcategories has now been visually checked against the source catalogue cards; the 50 referenced source-card crops are retained for private review only.

## What is authorised

The owner confirmed that Get Wired AutoWorx is an ASC authorised dealer and ASC granted interim permission to use its catalogues. Catalogue preparation, extraction, internal review and preview/test presentation may proceed within that interim permission.

This permission does not authorise live stock or price reconciliation/changes, product imports, database writes, public activation, checkout/payment changes or production deployment. Those remain separate release gates.

## What belongs here

- New ASC product-family catalogues supplied for the post-reset test intake (currently Aerials, Automotive Sensors, Automotive Switches, Automotive Globes, Car Mats and Fuel Pumps).
- ASC product/vehicle application catalogues and catalogue supplements.
- The original supplier file, preserved unchanged, plus a separate extraction manifest and review-only staged outputs.

Do not restore historical catalogues removed by the 30 October reset as if they were the new test source. The reset PR #118 was merged on 30 October 2026. The historical files still visible on old branches or in the Library predate that reset and are not the new test catalogue.

## Processing rules

1. Preserve each newly supplied original unchanged. Record filename, edition/date, page count and SHA-256 where the original bytes are available; the current source manifest records Git blob IDs and explicitly does not label them as SHA-256.
2. Extract products to review-only CSV/XLSX. Do not write directly to `public.products`.
3. Keep ASC supplier SKU separate from Get Wired AutoWorx internal SKU. Never overwrite another supplier's code.
4. Preserve source page, ASC category, description, dimensions, electrical specifications and vehicle fitment exactly where printed.
5. Match product images only when exact product-code/photo pairing is clear. Produce image contact sheets for review.
6. Do not invent cost, selling price, fitment or physical stock. Apply the approved price formula only to verified dealer cost.
7. Catalogue appearance is not proof of physical stock. Keep supplier orderability distinct from verified premises stock.
8. Start with a 25-product pilot. Produce staged rows, image-match report, duplicate report and exception list.
9. After pilot validation, obtain owner approval before any import or live change.

## Preserved store dependencies

The existing customer-facing image cache under `assets/products_webp/` is intentionally retained. The Supabase `product-image` Edge Function uses these files to serve current product images.

The existing product database, current stock quantities, supplier mappings, storefront code, non-ASC supplier catalogues and current image storage are not part of the ASC test-catalogue intake. Do not modify them as part of source preparation.


## Post-reset source intake — 2026-11-01

The following six source PDFs were uploaded to this folder in commit `2b631210759a469e9cca23a03c42aa9ff43d998a` at 09:58 SAST on 1 November 2026, after the 30 October reset:

- `ASC- Aerials (1).pdf`
- `ASC- Automotive Sensors (1).pdf`
- `ASC- Automotive Switches (1).pdf`
- `ASC- Automotive globes (1).pdf`
- `ASC- Car Mats (1).pdf`
- `ASC- Fuel Pumps (1).pdf`

These replace the earlier “awaiting new source bytes” status. Their family names have been added to the non-production storefront navigation as a catalogue-led taxonomy. This is a navigation/layout integration only: no product rows, prices, images, stock quantities, supplier activation or database records have been created or changed. Automated review-only PDF text extraction has been added; exact product/SKU reconciliation, image matching and the ASC 25-product evidence pilot remain separate verification tasks. Keep every PDF intact and use only verified source data when building the pilot.


## Extracted catalogue structure — 2026-11-01

All six PDFs are scanned image documents. A review-only OCR pass was run across all **72 pages**; page text is saved in `catalogue-review/asc-catalogue-extraction/asc-page-text-review-only.csv`, with page-level source references. The extraction summary is in `asc-extraction-summary.json`. A separate OCR token index contains 63 possible code strings, all marked `UNVERIFIED_OCR_CANDIDATE`; it is a review aid, not a SKU list. The 50-row pilot preview now contains exact page-3 and page-4 descriptions, supplier codes and printed applications across 12 subcategories. Separately, the non-database storefront navigation overlay contains all 75 section headings transcribed from the six catalogue contents pages (plus the Fuel Pumps parent tile), mapped under the existing Aerials, Sensors, Switches, Lighting, Car Mats and Auto Electrical parent categories. The image-match register confirms each product photo and code are paired on the same source card; all 50 source-card crops are retained in the private review folder. The pilot remains preview-only with no price, stock, internal SKU or public SKU.

The catalogue contents pages identify these section counts:

| Source catalogue | Pages | Contents sections |
|---|---:|---:|
| Aerials | 7 | 6 |
| Automotive Sensors | 9 | 11 |
| Automotive Switches | 22 | 16 |
| Automotive Globes | 11 | 10 |
| Car Mats | 11 | 14 |
| Fuel Pumps | 12 | 18 |

The storefront's virtual ASC navigation now reflects the catalogue contents-page headings, including vehicle-specific mat and fuel-pump groups. This is a category-navigation structure only. OCR text and all product codes/specifications must be checked against the original page images before any product is admitted to the 25-product pilot. OCR-derived records are not authoritative source truth.


### Existing storefront category alignment

To avoid duplicate parent tiles, the preview attaches the ASC contents headings to the existing storefront category IDs where those categories already exist:

- Aerials sections → existing Aerials category under Car Audio & Entertainment.
- Sensor sections → existing Automotive Sensors category under Auto Electrical Spares.
- Switch sections → existing Automotive Switches category under Auto Electrical Spares.
- Globe sections → existing Lighting category under Auto Electrical Spares.
- Car Mat sections → existing Car Mats category under Automotive Accessories.
- Fuel Pump sections → a preview-only Fuel Pumps category under Auto Electrical Spares, because the approved homepage tree has no equivalent direct child.

This is a non-database preview overlay. No live category rows or parent relationships were modified.


## Candidate branch mirror — 2026-11-01

The six original PDFs are now included in the active PR #142 candidate branch by reusing the exact Git blob objects from main. A source manifest records each file size and Git blob SHA. Git blob SHA is not a SHA-256 digest. The candidate branch also mirrors the OCR review files and contains separate pilot, image-match and exception review registers. No ASC product records have been published or imported.


## 50-product source-page pilot — 2026-11-01

The current 50 pilot rows are taken from pages 3 and 4 of each of the six current source catalogues (Aerials 8; Automotive Sensors 9; Automotive Switches 8; Automotive Globes 8; Car Mats 8; Fuel Pumps 9). Exact source codes, descriptions and printed applications were checked against the rendered page images. The image-match register records 50 source-card pairings across 12 preview subcategories. All rows remain review-only, with null price, stock, internal SKU and public SKU. Preview-only JSON is `assets/asc-catalogue-pilot-preview.json`, allowlisted only in the isolated preview build. It has null price/stock and no internal/public SKU. The live catalogue and database remain unchanged.


## Source-card image crops — 2026-11-01

50 full source-card review crops are retained under the private `assets/asc-catalogue-pilot/` review folder. Each crop retains the original ASC watermark and printed description/code. The customer preview intentionally uses neutral placeholders and does not publish these source-card images. No production image library or live product records were changed. These crops are for internal review, not final cleaned customer product photography. Confirm live image-use rights before launch.

## Remaining catalogue work

The 50-row pilot is not a full extraction/import of all six catalogues. The six PDFs total 72 pages; the remaining catalogue pages still require structured product extraction, exact supplier-code and vehicle-fitment checks, duplicate review and image matching before any further rows are admitted. The current `suppliers/ASC/` folder contains the six catalogues and this README; no separate ASC Buyers Guides were present in the folder at the latest check.
