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


## Current owner-directed Auto Electrical preview integration — 2026-11-05

The selective non-production integration is tracked in PR #177. The owner's latest direct instruction is that **all six ASC catalogue families each have their own subcategory directly under Auto Electrical Spares**:

- Aerials — 6 source sections.
- Automotive Sensors — 11 source sections.
- Automotive Switches — 16 source sections.
- Automotive Globes — 10 source sections.
- Car Mats — 14 source sections.
- Fuel Pumps — 18 source sections.

Total: **six dedicated subcategories and 75 original contents sections**. Aerials and Car Mats have been moved in the preview category tree from their former Car Audio and Car Care parents. This supersedes the earlier separate-parent instructions for these two catalogues. The standard/public package must restore their former placements; the six-category mapping is preview-only.

The preview contains **50 visually reviewed pilot records** across all six catalogues. They remain preview-only, with no Get Wired SKU, no price, no stock quantity, and watermark-retaining image crops whose production image-use rights are not cleared. All pilot image URLs must use `assets/asc-auto-electrical-pilot/`; do not reintroduce the obsolete `assets/asc-catalogue-pilot/` prefix. All 50 referenced crop files must exist in that directory. Repository presence is not proof that an image loads in a hosted browser or that an image is approved for production.

Do not process ASC Buyers Guides. Do not import the 50 pilot records or the larger register. No live database/category/product/price/stock changes, supplier activation, checkout/payment activation or production deployment is authorised by this preview integration.


### 50-record six-catalogue Auto Electrical pilot — traceability and description enrichment

The six-group pilot JSON now carries, per record:
- Original ASC PDF filename and the contents-page start page for the source section (a page locator, not yet a final visual page audit).
- A candidate ASC source reference derived from the reviewed source-card crop filename; it must still be confirmed against the original catalogue image.
- Separate identity, customer-copy and fitment review statuses so a candidate is not mistaken for an approved exact fitment.
- A cautious owner-review draft description based on the preserved catalogue wording. These drafts are not approved public copy and must not be treated as verified technical specifications.

The owner preview displays the draft description, original source wording, fitment as printed, PDF/page locator and candidate ASC reference. It uses the exact quote-only wording: **Price On Request due to Limited Stock and Availability**.

Four bulb records currently under the ASC “HID Globes, Kits & Ballasts” heading (H18, H19 and H3 references) are explicitly flagged for technology/section verification. Do not assume they are HID products or rewrite the source classification until the original PDF page is checked. Blank globe fitment fields remain blank; do not infer vehicle applications.

The dedicated integration regression was updated to assert source traceability, draft descriptions, quote-only wording and image-file existence. The test has not yet been executed on the latest head; do not claim a regression pass until an exact-head run is recorded.


### Image-rights and identity exception control

- The earlier 53-SKU image-rights register records watermarks present, exact SKU/physical-feature verification pending, no rights-holder evidence found in that register, no permission to remove/obscure watermarks or further crop/edit, and public-use HOLD for its listed images. The owner has separately stated authorised-dealer status; reconcile that statement with the rights register before public image release. Keep all 50 preview crops watermarked and non-production until the applicable rights and exact image-to-SKU match are approved.
- All 50 preview records now explicitly carry image_match_status=PENDING_EXACT_ASC_SKU_AND_PHYSICAL_FEATURE_VERIFICATION and image_rights_status=PUBLIC_USE_HOLD_PENDING_RIGHTS_EVIDENCE. Repository presence and browser loading do not prove exact image identity or usage rights.
- MA522 has a legacy cross-reference conflict: the September illustrated catalogue described it as “Vehicle Aerial Replacement 2”, while the current August ASC catalogue OCR describes Opel / Mercedes W124 / Honda Ballade. Preserve the current ASC wording but do not approve fitment until the printed SKU and original page are checked.
- H1865W-H has a technology/brand wording conflict: the earlier 53-SKU register calls it an H18 65W 12V Halogen Globe Huadiao, while current OCR reads HIDIAO and the source section heading is “HID Globes, Kits & Ballasts”. Verify the original PDF; do not classify it as HID or normalize the brand spelling before verification.
