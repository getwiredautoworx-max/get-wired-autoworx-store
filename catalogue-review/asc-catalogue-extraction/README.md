# ASC Catalogue Text Extraction — Review Only

Generated from original PDFs in `suppliers/ASC/`. Embedded text is extracted directly; scanned pages are processed with local Tesseract OCR.
OCR output is a review aid only and must be checked against the source page before SKU, fitment, specification, price or product claims are accepted.
No product, price, stock, image, supplier activation or database records are created or changed.

| Source PDF | Pages | Pages with text | OCR pages | Extracted characters | Status |
|---|---:|---:|---:|---:|---|
| ASC- Aerials (1).pdf | 7 | 7 | 7 | 2536 | review-text-extracted |
| ASC- Automotive Sensors (1).pdf | 9 | 9 | 9 | 4024 | review-text-extracted |
| ASC- Automotive Switches (1).pdf | 22 | 22 | 22 | 9693 | review-text-extracted |
| ASC- Automotive globes (1).pdf | 11 | 11 | 11 | 4027 | review-text-extracted |
| ASC- Car Mats (1).pdf | 11 | 11 | 11 | 4120 | review-text-extracted |
| ASC- Fuel Pumps (1).pdf | 12 | 12 | 12 | 5884 | review-text-extracted |

The CSV contains one row per source page, preserving source filename and page number.
Every OCR-derived value requires manual visual verification against the original PDF before it enters the 50-record pilot.


Candidate branch note: this folder contains page-level OCR review only; item-level product verification is separate.


## 50-product pilot update — 2026-11-01

- 50 exact product descriptions, ASC codes and printed applications were visually checked against pages 3 and 4 of the six original catalogues. The 50 records span 12 subcategories: aerials, sensors, ignition switches, halogen/HID globes, Toyota/VW-Audi/BMW carpet mats and BMW/Ford-Mazda electric fuel pumps.
- `asc-product-pilot-review-only.csv` contains 50 rows; `asc-image-match-review-only.csv` records 50 visually confirmed source-card photo/code pairings. All 50 individual source-card crops are generated and included in the isolated preview asset allowlist.
- `assets/asc-catalogue-pilot-preview.json` carries all 50 records into the isolated preview only. Price, stock, internal SKU and public SKU are null; cards show price on request and availability to confirm. No live product rows or database writes.
- 63 additional OCR code tokens remain unverified and quarantined from the pilot.


## 50 source-card crops — 2026-11-01

- 50 crops are stored in `assets/asc-catalogue-pilot/`, one for each visually verified pilot record. Crops include the source photo, printed description and code, with the watermark retained.
- These are preview/review crops, not final clean product photography. Public live image-use rights must be confirmed before production use.
- The preview JSON points to these crops; all 50 remain preview-only and have null price, stock and internal/public SKU.
