# ASC supplier catalogue intake

**Supplier catalogue-use permission:** GRANTED (interim; owner-confirmed 27 October 2026).  
**Technical integration:** OPEN — ASC IT's longer-term technical solution remains separate from catalogue-use permission.  
**Current intake state (updated 1 November 2026):** Six new ASC catalogue PDFs were uploaded to this folder at 09:58 SAST, after the 30 October source reset. They are now the current post-reset test intake. Source PDFs remain unchanged; the 50-record source-card pilot and taxonomy preview are staged for owner review; full catalogue extraction and product-level verification remain open.

## What is authorised

The owner confirmed that Get Wired AutoWorx is an ASC authorised dealer and ASC granted interim permission to use its catalogues. Catalogue preparation, extraction, internal review and preview/test presentation may proceed within that interim permission.

This permission does not authorise live stock or price reconciliation/changes, product imports, database writes, public activation, checkout/payment changes or production deployment. Those remain separate release gates.

## What belongs here

- New ASC product-family catalogues supplied for the post-reset test intake (currently Aerials, Automotive Sensors, Automotive Switches, Automotive Globes, Car Mats and Fuel Pumps).
- ASC product/vehicle application catalogues and catalogue supplements.
- The original supplier file, preserved unchanged, plus a separate extraction manifest and review-only staged outputs.

Do not restore historical catalogues removed by the 30 October reset as if they were the new test source. The reset PR #118 was merged on 30 October 2026. The historical files still visible on old branches or in the Library predate that reset and are not the new test catalogue.

## Processing rules

1. Preserve each newly supplied original unchanged. Record filename, edition/date, page count and SHA-256.
2. Extract products to review-only CSV/XLSX. Do not write directly to `public.products`.
3. Keep ASC supplier SKU separate from Get Wired AutoWorx internal SKU. Never overwrite another supplier's code.
4. Preserve source page, ASC category, description, dimensions, electrical specifications and vehicle fitment exactly where printed.
5. Match product images only when exact product-code/photo pairing is clear. Produce image contact sheets for review.
6. Do not invent cost, selling price, fitment or physical stock. Apply the approved price formula only to verified dealer cost.
7. Catalogue appearance is not proof of physical stock. Keep supplier orderability distinct from verified premises stock.
8. Maintain a review-only source-card pilot. Keep each record tied to its exact source page and image; the 50-record pilot is not the complete catalogue and is not approved for live publication.
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

These replace the earlier “awaiting new source bytes” status. Their family names have been added to the non-production storefront navigation as a catalogue-led taxonomy. This is a navigation/layout integration only: no product rows, prices, images, stock quantities, supplier activation or database records have been created or changed. Automated review-only PDF text extraction has been added; exact product/SKU reconciliation and full-catalogue image matching remain separate verification tasks; the 50-record source-card pilot is review-only. Keep every PDF intact and use only verified source data when building the pilot.


## Extracted catalogue structure — 2026-11-01

All six PDFs are scanned image documents. A review-only OCR pass was run across all **72 pages**; page text is saved in `catalogue-review/asc-catalogue-extraction/asc-page-text-review-only.csv`, with page-level source references. The extraction summary is in `asc-extraction-summary.json`.

The catalogue contents pages identify these section counts:

| Source catalogue | Pages | Contents sections |
|---|---:|---:|
| Aerials | 7 | 6 |
| Automotive Sensors | 9 | 11 |
| Automotive Switches | 22 | 16 |
| Automotive Globes | 11 | 10 |
| Car Mats | 11 | 14 |
| Fuel Pumps | 12 | 18 |

The storefront's virtual ASC navigation now reflects the catalogue contents-page headings, including vehicle-specific mat and fuel-pump groups. This is a category-navigation structure only. OCR text and all product codes/specifications must be checked against the original page images before any product is admitted to the review-only pilot. OCR-derived records are not authoritative source truth.


### Existing storefront category alignment

To avoid duplicate parent tiles, the preview attaches the ASC contents headings to the existing storefront category IDs where those categories already exist:

- Aerials sections → existing Aerials category under Car Audio & Entertainment.
- Sensor sections → existing Automotive Sensors category under Auto Electrical Spares.
- Switch sections → existing Automotive Switches category under Auto Electrical Spares.
- Globe sections → existing Lighting category under Auto Electrical Spares.
- Car Mat sections → existing Car Mats category under Automotive Accessories.
- Fuel Pump sections → a preview-only Fuel Pumps category under Auto Electrical Spares, because the approved homepage tree has no equivalent direct child.

This is a non-database preview overlay. No live category rows or parent relationships were modified.


## 50-record visual source-card pilot — 2026-11-02 reconciliation

The candidate integration branch's evidence has now been staged separately from the older 25-record main-branch status. The review registers contain **50 records** from pages 3 and 4 across all six post-reset PDFs: 25 page-3 records and 25 page-4 records. The source-card image-match register contains 50 matching rows. The candidate preview taxonomy contains 75 catalogue contents headings plus the additional virtual Fuel Pumps parent (76 navigation nodes total). This resolves the earlier 25-versus-50 documentation mismatch: 25 was the earlier main-branch checkpoint; 50 is the later candidate-branch pilot. It does not establish that 50 products are fully integrated into main or approved for live publication.

Review-only files staged on the current-main integration branch:
- `catalogue-review/asc-catalogue-extraction/asc-catalogue-taxonomy-review-only.json` — six catalogue families, 72 pages, 75 contents headings, plus the Fuel Pumps preview parent; query hints are not permission to fuzzy-match unrelated store products.
- `asc-product-pilot-review-only.csv` — 50 visually checked page-3/page-4 records.
- `asc-image-match-review-only.csv` — 50 source-card image/code pairing review rows.
- `asc-ocr-code-candidates-review-only.csv` — OCR candidates remain explicitly unverified and quarantined.
- `asc-exceptions-review-only.csv` — no exception rows were recorded in the candidate register; absence of exceptions is not proof of completeness.
- `asc-source-manifest.json` — original file sizes and Git blob IDs; SHA-256 digests have not been computed.

**Limitations:** the 50 images are watermarked source-card review crops, not final clean product photography; live image-use rights still require confirmation. The source PDFs do not provide verified supplier price or stock. No Get Wired SKU has been assigned in this pilot. No live catalogue, price, stock, category, database, or supplier activation changes have been made. The candidate storefront implementation remains a separate review item and must pass exact-head preview/desktop/mobile QA and owner acceptance before any merge.


## Isolated owner-review preview route — 2026-11-02

A standalone responsive owner-review route is now staged at `/asc-catalogue-preview.html` on the integration branch. It loads `assets/asc-catalogue-preview-data.json` and the 50 visually matched, watermark-retaining review crops under `assets/asc-catalogue-pilot/`. It exposes the three store roots that have ASC pilot material (Auto Electrical Spares, Car Audio & Entertainment, Automotive Accessories), then original source subcategory buttons, then only the exact pilot records mapped to each source heading. Unreviewed headings show an explicit empty state; there is no fuzzy fallback, cart, checkout, public SKU or price.

The route and its data/images are included only in the opt-in non-production Cloudflare Pages package when `GW_INCLUDE_PREVIEW_ROUTES=1`. The standard production package excludes this route and the ASC pilot image/data assets. The package QA explicitly checks both sides of that boundary and verifies the 50 image files. Dedicated desktop/mobile Playwright QA checks exact subcategory filtering, image loading, search, empty state and horizontal overflow.

This is a review route, not yet merged to main or deployed to the hosted preview. Supplier image-use rights, prices/stock and GW SKU allocation remain unverified; owner acceptance is still required before any live integration.


### Non-production deployment

The current restored-storefront candidate is PR #163. Its Cloudflare Pages branch preview is separate from the production site. The ASC review route is included in the opt-in non-production package and excluded from the standard customer-only package. Always use the successful exact-head deployment URL recorded by the deployment check; do not reuse an earlier preview URL. No production deployment is authorised by this review work.
