# ASC Product and Image Review Register

Review-only working data for the six retained ASC product catalogues. Buyer’s guides are excluded.

## Source inventory
- Aerials: 7 pages, 78 product cards, 6 sections
- Automotive Sensors: 9 pages, 106 product cards, 11 sections
- Automotive Switches: 22 pages, 368 product cards, 16 sections
- Automotive Globes: 11 pages, 158 product cards, 10 sections
- Car Mats: 11 pages, 144 product cards, 14 sections
- Fuel Pumps: 12 pages, 129 product cards, 18 sections
- Total: 72 pages, 983 product cards, 75 sections.

## Review data
- `asc-product-image-sku-register-review-only.csv`: 50 manually reviewed pilot products, preserving ASC supplier codes, original descriptions, fitment text, source page and pilot image paths.
- `asc-ocr-candidates-quarantined-review-only.csv` and `asc-ocr-candidate-dispositions-review-only.csv`: 63 OCR candidate tokens checked against the source pages and classified as false positives; none is a product supplier SKU.
- `asc-manual-sku-corrections-review-only.csv`: 112 manually transcribed/corrected supplier-code labels, including 11 corrections discovered in the full 983-label visual audit.
- `ASC-SOURCE-VERIFICATION-STATUS.md`: source counts, code audit and release restrictions.
- The automated extraction workflow creates a 983-row register, 983 individual source-card crops, page contact sheets, an extraction summary, and a searchable static owner-review preview as a workflow artifact.

## SKU rules
- Preserve the exact ASC supplier code in its own field.
- Provisional internal IDs use `GW-ASC-` plus a normalized supplier code. Never replace the supplier code.
- Check for duplicate supplier codes and duplicate normalized internal IDs before release.
- OCR agreement is not by itself proof of a correct code; all source labels were visually audited and 11 OCR errors corrected.

## Product data and release restrictions
- OCR product descriptions and derived fitment/specification candidates remain review-only until editorial/source-card verification.
- Vehicle fitment and technical specifications/dimensions must be transcribed exactly where printed; do not infer missing values.
- Source-card crops are reference images, not clean standalone product photographs. Watermarks remain and production-use rights are not cleared.
- Prices and stock were not supplied. ASC items should show **Price On Request** in the review preview; do not invent price or stock values.
- No live import, Supabase write, price/stock change, production deployment or merge is authorized by these files.
