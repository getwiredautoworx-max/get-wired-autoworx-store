# ASC Catalogue Text Extraction — Review Only

This workstream processes **only the six retained ASC product catalogues** in `suppliers/ASC/`. Buyer’s guides are excluded and must not be restored, extracted, or used as product sources.

Embedded text is extracted directly; scanned pages use local Tesseract OCR. OCR output is a review aid only and must be checked against the original source page before SKU, fitment, specification, image, price, or product claims are accepted.

No product, price, stock, supplier activation, or database records are created or changed by this extraction.

| Source PDF | Pages | Pages with text | OCR pages | Extracted characters | Status |
|---|---:|---:|---:|---:|---|
| ASC- Aerials (1).pdf | 7 | 7 | 7 | 2536 | review-text-extracted |
| ASC- Automotive Sensors (1).pdf | 9 | 9 | 9 | 4024 | review-text-extracted |
| ASC- Automotive Switches (1).pdf | 22 | 22 | 22 | 9693 | review-text-extracted |
| ASC- Automotive globes (1).pdf | 11 | 11 | 11 | 4027 | review-text-extracted |
| ASC- Car Mats (1).pdf | 11 | 11 | 11 | 4120 | review-text-extracted |
| ASC- Fuel Pumps (1).pdf | 12 | 12 | 12 | 5884 | review-text-extracted |
| **Total** | **72** | **72** | **72** | **30,284** | **review only** |

## Pilot extraction status

- 50 review-only product rows are recorded across all six catalogue families.
- All 50 supplier SKUs and all 50 proposed Get Wired SKUs are unique within this pilot.
- The proposed SKU pattern is `GW-ASC-<normalised ASC supplier SKU>`; the supplier SKU is retained separately.
- The 50 rows point to 12 source-page locations (pages 3 and 4 of each source PDF).
- The pilot rows are marked as visually checked on their source pages, but remain **proposed / not approved / not imported**.
- All 50 candidate image crops were visually inspected. Their product captions/images are consistent with the pilot descriptions at a broad visual level. The crops remain on the separate PR #168 preview branch and are not copied into this review branch.
- ASC watermarking is visible on the crop images. Exact supplier-SKU-to-original-source-page pairing remains a separate verification gate; the crop cards do not consistently expose the supplier code.
- The printed brand/wording for globe SKUs H1865W-H, H1960/55W-H and H355W-H is visually ambiguous between the crop and OCR text; recheck the original page before approving final descriptions.
- No source catalogue contains current dealer pricing in this intake. All 50 pilot records remain price-unknown and require a current dealer cost before any price can be calculated.
- Physical stock is not supplied by these catalogues. Availability remains unconfirmed and separate from price.

## OCR quarantine

- 63 additional OCR candidate tokens remain quarantined.
- None has an assigned Get Wired SKU.
- None is approved or imported.
- Do not promote a token to a product record until the original PDF page is visually checked and the exact ASC supplier code/product pairing is clear.

## Owner-confirmed category destinations

| ASC family | Store root | Dedicated category/button | Catalogue section detail |
|---|---|---|---|
| Aerials | Car Audio | Accessories → Aerials | Preserved separately in `catalogue_section` |
| Automotive Sensors | Auto Electrical Spares & Parts | Automotive Sensors | Preserved separately in `catalogue_section` |
| Automotive Switches | Auto Electrical Spares & Parts | Automotive Switches | Preserved separately in `catalogue_section` |
| Automotive Globes | Auto Electrical Spares & Parts | Automotive Globes | Preserved separately in `catalogue_section` |
| Fuel Pumps | Auto Electrical Spares & Parts | Fuel Pumps | Preserved separately in `catalogue_section` |
| Car Mats | Car Care & Accessories | Car Mats | Preserved separately in `catalogue_section` |

The pilot CSV has been corrected to use these owner-approved destinations while retaining each original catalogue section in a separate field.

## Source and approval rules

- Preserve the six original PDFs unchanged.
- Keep the ASC supplier SKU separate from the proposed Get Wired SKU.
- Preserve dimensions, electrical specifications, fitment, and source page where printed.
- Do not invent or infer price, physical stock, or fitment.
- Do not use buyer’s guides or older ASC catalogue collections as sources for this reload.
- Do not write to Supabase or import products.
- Do not activate ASC products, merge a PR, deploy production, change payment settings, or change Axxess/DNS.
- This branch is internal review material only; owner approval is required before any later import or publication.
