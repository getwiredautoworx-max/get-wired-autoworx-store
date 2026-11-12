# ASC source-page verification status — 4 November 2026

Scope is limited to the six retained ASC product catalogues. No ASC buyer's guides are included.

## Original source inventory

| ASC source catalogue | PDF pages | Section headings | Printed product lines | Detected blue SKU-label cards |
|---|---:|---:|---:|---:|
| Aerials | 7 | 6 | 78 | 78 |
| Automotive Sensors | 9 | 11 | 106 | 106 |
| Automotive Switches | 22 | 16 | 368 | 368 |
| Automotive Globes | 11 | 10 | 158 | 158 |
| Car Mats | 11 | 14 | 144 | 144 |
| Fuel Pumps | 12 | 18 | 129 | 129 |
| **Total** | **72** | **75** | **978** | **978** |

All six source PDFs were rendered to original-page contact sheets. The detected blue supplier-code label count matches the printed cover product-line total for every catalogue.

## OCR candidate disposition

- All 63 quarantined OCR candidate tokens were checked against their original source pages.
- All 63 are false positives from captions, fitment text, specifications, bulb-base types, dimensions, or section counts; none is an independent supplier SKU.
- Dispositions are recorded in `asc-ocr-candidate-dispositions-review-only.csv`.

## Product-card extraction

- Workflow run `41839498746` completed successfully and uploaded artifact `asc-source-page-and-product-card-review` (artifact ID `13327879670`).
- The artifact contains a 978-row product-card extraction CSV and all 20 source-page contact sheets.
- 101 supplier-code OCR exceptions were manually read from the original blue code labels and recorded in `asc-manual-sku-corrections-review-only.csv`.
- The other 882 supplier codes had matching results from two independent OCR page-segmentation passes. They remain flagged for final spot-check rather than being represented as manually verified.
- The generated 978-row review CSV has 978 nonblank supplier codes, 0 duplicate supplier codes, 0 duplicate provisional `GW-ASC-` SKUs, and 0 blank OCR descriptions.

## Release restrictions

This is a source extraction and review milestone, not a production catalogue import:
- Product descriptions remain OCR-review-only.
- Vehicle fitment, technical specifications, and dimensions still require source-card review/transcription.
- Product images remain watermarked; production-use rights are not cleared.
- Prices and stock were not supplied; no values have been invented.
- No Supabase writes, live imports, price/stock changes, production deployment, or merge were performed.
- Provisional internal IDs are review-only and must not be published until descriptions, fitment, dimensions, images, and SKU checks are approved.

## Automation and checks

- `scripts/asc_extract_product_cards_review.py` renders all six retained PDFs, detects supplier-code labels, applies the 101 source-page corrections, checks card totals, and creates a review-only extraction.
- PR #173's supplier-routing tests, Edge Function type-check, responsive review, and ASC source-page extraction workflow passed on the reviewed run.
- PR #173 remains draft and unmerged. No Cloudflare deployment or credits were used.


## Follow-up 978-label audit — 4 Nov 2026
- Created and visually reviewed 20 audit sheets covering all 978 individual supplier-code labels (50 labels per sheet, source card crop shown beside the proposed code).
- The visual audit found OCR omissions/substitutions that were not caught by dual-OCR agreement. Corrected 11 records against the printed blue labels: MA522, MA570, IG-FR01, S2-007, S2-020R, S2-015, S2-017, S2-033-4, S2-035, M7-AVAN01 and M7-MT02.
- These 14 corrections are now included in the manual correction map. The 978-row register was updated; duplicate checks show 0 duplicate supplier codes and 0 duplicate provisional internal IDs.
- This demonstrates why OCR agreement alone is insufficient. The 978 labels have now been audited visually as a full set, with the 11 discovered mismatches corrected.
- The downloadable owner preview was rebuilt after corrections. It includes 978 source-card records, 978 searchable records, category/subcategory candidate tags from catalogue page headings, and Price On Request for ASC.
- Description OCR remains a draft, and the preview still labels fitment and technical specifications/dimensions as pending. Product images are source-card crops rather than isolated clean product photographs; source watermarks remain on the raw crops; owner-authorised Get Wired watermark treatment is pending visual QA. No live import or merge.


## Pilot content integrated into the owner preview
- The 50 manually reviewed pilot descriptions and their printed fitment values are now applied to the corresponding records in the searchable owner preview.
- 50/50 pilot supplier codes cross-match the full 978-row register after correcting the three O-versus-zero substitutions (M7-CON01, M7-COR01, M7-COR02).
- Pilot descriptions: 50 manually verified. Pilot fitment: 42 explicit vehicle fitment values manually verified; 8 cards have no vehicle fitment printed. Technical specifications/dimensions remain pending where not explicitly transcribed.
- For the remaining 928 records, the preview keeps OCR descriptions and fitment/specification candidates clearly marked as unverified. It does not infer missing fitment or technical data.
- The owner ZIP now contains 978 product-image-area crop references and 978 source-card crop references, with original supplier watermark retained. These are source-catalogue crops, not cleared supplier standalone product image files.


## Owner correction — product count, price wording and image authority (2026-11-09)

- Correct visible product-card count: **978**, comprising 78 Aerials, 106 Sensors, 368 Switches, 158 Globes, 139 Car Mats and 129 Fuel Pumps. The earlier 983 preliminary tally included five Car Mats entries implied by a section heading (13 stated) but not present as physical product cards (8). The five absent products are not records.
- The master register is 978/978 for unique source SKU, proposed Get Wired SKU, source file/page and approved category mapping. This is a source identity/category milestone, not completion of product descriptions, fitment or specifications.
- Editorial field status: 50 product titles manually verified; 42 fitment values manually verified; 8 pilot cards have no fitment printed; 0 technical specification/dimension fields transcribed. The remaining 928 titles, 936 fitment fields and all 978 technical-specification fields still require review/transcription.
- Image inventory: 952 product photo cards exist in source catalogues; 26 are explicitly Image On Request/no-photo. Owner has authorised image use/editing. The 50-image treatment sample is being refined after visual review found outer caption text still present in the first pass. Do not claim image-treatment completion until all 50 outputs pass visual QA.
- Exact ASC customer-facing price wording: **Price On Request due to Limited Stock and Availability**. No numeric price or physical stock value is supplied; all staged records remain review-only / DO NOT IMPORT.
