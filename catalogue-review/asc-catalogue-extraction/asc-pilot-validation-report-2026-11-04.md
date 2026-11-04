# ASC six-catalogue pilot validation — 2026-11-04

**Scope:** only the six retained ASC PDFs. No buyer's guides or historical ASC catalogues were used.

## Source set

| Source | Pages |
|---|---:|
| ASC- Aerials (1).pdf | 7 |
| ASC- Automotive Sensors (1).pdf | 9 |
| ASC- Automotive Switches (1).pdf | 22 |
| ASC- Automotive globes (1).pdf | 11 |
| ASC- Car Mats (1).pdf | 11 |
| ASC- Fuel Pumps (1).pdf | 12 |
| **Total** | **72** |

All 72 pages have review-only OCR text extracted. OCR is not treated as authoritative product data.

## Pilot row checks

- Pilot rows: **50**
- Unique ASC supplier SKUs: **50 / 50**
- Unique proposed Get Wired SKUs: **50 / 50**
- SKU convention mismatches: **0**
- Missing source filename/page, supplier SKU, or printed product name: **0**
- Every row remains `PROPOSED_NOT_APPROVED` and `REVIEW_ONLY_NOT_IMPORTED`.
- Every row remains price-unknown; no current dealer price was supplied in these catalogues.
- Every row remains stock/availability unconfirmed; catalogues do not establish physical stock.
- The 50 rows cover 12 source-page locations, pages 3 and 4 across the six PDFs.

### Owner-approved category placement applied

| Destination | Pilot rows |
|---|---:|
| Car Audio → Accessories → Aerials | 8 |
| Auto Electrical Spares & Parts → Automotive Sensors | 9 |
| Auto Electrical Spares & Parts → Automotive Switches | 8 |
| Auto Electrical Spares & Parts → Automotive Globes | 8 |
| Car Care & Accessories → Car Mats | 8 |
| Auto Electrical Spares & Parts → Fuel Pumps | 9 |
| **Total** | **50** |

The previous catalogue-specific subgroup name is retained separately in the `catalogue_section` field. The Get Wired SKU remains separate from the supplier SKU.

## OCR quarantine checks

- Additional OCR candidates: **63**
- All 63 remain `UNVERIFIED_OCR_CANDIDATE`.
- Proposed Get Wired SKU assigned: **0**.
- Imported: **0**.
- These tokens must remain quarantined until manually checked against the original PDF page image.

## Image status

The pilot CSV points to 50 candidate crop images held on the separate PR #168 preview branch (head at audit: `2538b40d447c593c2767e1494961b1bade44b330`). Those image files are not copied into this ASC staging branch and are not approved production assets. Image watermarking and exact product-code/photo matching still require review. PR #168 was not modified for this processing step.

## Outcome

The 50-row pilot has passed structural checks for row completeness, unique supplier and proposed SKUs, SKU pattern, owner-approved category destinations, and review-only price/stock/import flags.

**Not yet passed:** independent reinspection of each crop against its source page, approval of product descriptions/fitment/specifications, clean image assets, current ASC dealer pricing, stock/availability confirmation, and owner approval.

No Supabase writes, product imports, product activation, PR merge, production deployment, payment changes, Axxess upload, or DNS changes were performed.
