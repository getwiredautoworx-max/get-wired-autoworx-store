# ASC Product and Image Review Register

Review-only working data for the six retained ASC product catalogues. ASC Buyers Guides are excluded.

## Corrected source inventory
- Aerials: 78 product cards
- Automotive Sensors: 106 product cards
- Automotive Switches: 368 product cards
- Automotive Globes: 158 product cards
- Car Mats: 139 product cards
- Fuel Pumps: 129 product cards
- **Total: 978 physical product cards across 72 PDF pages and 75 sections.**

The earlier preliminary count of 983 included five Car Mats entries inferred from a section heading (13 stated) but not present as physical product cards (8). Those five are not product records and are excluded from the corrected 978-row register.

## Review data
- `asc-product-image-sku-register-review-only.csv`: 50 manually reviewed pilot products, preserving exact ASC supplier codes, source page, printed description and fitment where present.
- 42 pilot fitment entries were manually verified; 8 pilot cards have no fitment printed.
- `asc-ocr-candidates-quarantined-review-only.csv` and `asc-ocr-candidate-dispositions-review-only.csv`: 63 OCR candidate tokens visually checked and classified as false positives, not supplier SKUs.
- `asc-manual-sku-corrections-review-only.csv`: manually transcribed/corrected supplier-code labels. Preserve exact source codes; never infer a SKU from caption or fitment text.
- `ASC-SOURCE-VERIFICATION-STATUS.md`: authoritative corrected counts, field status and release restrictions.
- The extraction workflow generates the 978-row source-card register, source-page contact sheets, individual card/image crops and a searchable owner-review HTML artifact.

## SKU rules
- Preserve the exact ASC supplier code in its own field.
- Provisional internal IDs use `GW-ASC-` plus a normalized supplier code and remain review-only.
- Check duplicate supplier codes and duplicate normalized internal IDs before any approval.
- OCR agreement is not by itself proof of a correct code; retain source-page evidence and manual correction provenance.

## Product data and release restrictions
- Only the six retained ASC catalogues are in scope; no Buyers Guide extraction, OCR, reconciliation or integration.
- Product descriptions beyond the 50 manually reviewed pilot records remain OCR drafts requiring editorial verification.
- Fitment, technical specifications and dimensions remain pending unless explicitly transcribed and verified from the source card. Never infer missing values.
- Source-card crops retain catalogue watermarks and are not clean standalone product photographs. The owner has authorised reseller product-image use/editing, but each customer-facing image still requires the approved image-treatment and exact-product verification process.
- Prices and stock were not supplied. ASC customer-facing wording is **Price On Request due to Limited Stock and Availability**.
- All records are **REVIEW ONLY — DO NOT IMPORT**. No live import, Supabase write, price/stock change, production deployment or Axxess upload is authorised by this package.
