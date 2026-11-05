# ASC supplier catalogue intake

**Supplier catalogue-use permission:** GRANTED (interim; owner-confirmed 27 October 2026).  
**Technical integration:** OPEN — ASC IT's longer-term technical solution remains separate from catalogue-use permission.  
**Current intake state (updated 1 November 2026):** Six new ASC catalogue PDFs were uploaded to this folder at 09:58 SAST, after the 30 October source reset. They are now the current post-reset test intake. Source PDFs remain unchanged; product-level extraction, taxonomy review and the 25-product pilot are in progress.

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


## OCR validation queue — 5 November 2026

A first-pass comparison of the OCR text on contents pages against the section headings printed on product pages identified the following **visual-check candidates**. These are not confirmed catalogue errors; OCR may have misread digits or item counts.

| Catalogue | Contents-page OCR | Product-page OCR | Verification required |
|---|---|---|---|
| Automotive Sensors | Crankshaft/Camshaft: 14 items | Page 3 heading: 16 items | Check printed heading and item count |
| Automotive Sensors | Temperature senders/sensors: 26 items | Page 6 heading: 36 items | Check printed heading and item count |
| Automotive Switches | Combination/indicator stalk: 52 items | Page 5 heading: 53 items | Check printed heading and item count |
| Automotive Switches | Rocker switches: 2 items | Page 15 heading: 32 items | Check printed heading and item count |
| Automotive Switches | Radiator fan/thermo: 5 items | Page 12 heading: 35 items | Check printed heading and item count |
| Car Mats | Toyota carpet sets: 14 items | Page 3 heading: 16 items | Check printed heading and item count |
| Car Mats | Hyundai/Kia carpet sets: 14 items | Page 5 heading: 16 items | Check printed heading and item count |

These candidates must be resolved against the original PDF page image before category counts or product totals are finalised. Do not “correct” OCR values by choosing one side without visual evidence.

### Intake boundary

- This workstream covers the six post-reset catalogue PDFs listed above only.
- ASC Buyers Guides remain out of scope unless the owner explicitly reauthorises them.
- The next extraction deliverable is a 25-product review-only pilot with source-page evidence, not a live import.
- No price, stock, supplier activation, public product listing or database mutation is authorised by this review.


## Owner-directed store category assignments — 5 November 2026

The owner has directed that the six current ASC catalogues be organised as separate family subcategories under these store roots. This instruction supersedes the earlier provisional Aerials and Car Mats mappings above:

**Auto Electrical Spares**
- Aerials
- Automotive Sensors
- Automotive Switches
- Automotive Globes
- Fuel Pumps

**Car Care & Accessories**
- Car Mats (its own subcategory)

Aerials must not be placed under Audio: the Audio category remains frozen until the owner explicitly resumes it. Each catalogue family is a separate subcategory; do not combine the five electrical families into one generic ASC subcategory. The owner-directed family-to-root mapping is recorded in `catalogue-review/asc-catalogue-extraction/asc-store-category-assignment-review-only.csv`.

**Important implementation boundary:** this is approved taxonomy/staging direction, not approval to import product rows or write live category/product data. The original six PDFs remain unchanged. Product-level entries remain `DO_NOT_IMPORT` until exact product identity, source page, SKU, description/specification, fitment and exact image are visually verified; OCR alone is insufficient. ASC products without verified current pricing remain quote-only with the exact wording: **Price On Request due to Limited Stock and Availability**. Buyers Guides remain excluded. Production remains HOLD.
