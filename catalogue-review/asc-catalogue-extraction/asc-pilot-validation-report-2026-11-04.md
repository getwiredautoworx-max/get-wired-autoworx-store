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

The pilot CSV points to 50 candidate crop images held on the separate PR #168 preview branch (head at audit: `2538b40d447c593c2767e1494961b1bade44b330`). All 50 crop cards were visually inspected and matched to the exact supplier SKU and printed caption on the rendered original source pages. The crops remain on PR #168 and were not copied into the ASC staging branch. ASC watermarks are visible, so these are not approved production assets. The original source-page review corrected the globe descriptions: `H1865W-H` and `H1960/55W-H` are HUADIAO E-MARKED variants; `H355W-H` is transcribed as HDIAO exactly as printed in the source. Full-page renders of all 60 product pages (pages 3 onward across all six PDFs) are stored in the isolated cleanup branch at `catalogue-review/asc/source-pages/`; the 12 pilot pages 3 and 4 were used for this 50-row verification. PR #168 was not modified for this processing step.

## Outcome

The 50-row pilot has passed structural checks for row completeness, unique supplier and proposed SKUs, SKU pattern, owner-approved category destinations, and review-only price/stock/import flags.

**Not yet passed:** approval of product descriptions/fitment/specifications beyond the 50-row source check, watermark/asset rights and image suitability, current ASC dealer pricing, stock/availability confirmation, and owner approval.

No Supabase writes, product imports, product activation, PR merge, production deployment, payment changes, Axxess upload, or DNS changes were performed.


## Subsequent ASC review progress — Aerials and OCR candidate disposition

- Completed a separate 78-product Aerials review-only batch from pages 3–7 of `ASC- Aerials (1).pdf`. The batch includes the eight Aerials pilot rows and 70 additional products.
- Aerials section counts: Vehicle-Specific Aerials 23; Universal/Roof/Pillar Mount Aerials 17; Electronic/Automatic/Amplified Aerials 6; Shark Fin/Imitation Aerials 13; Aerial Masts/Bases/Mounts 8; Extensions/Adaptors/Plugs 11.
- 78 unique ASC supplier SKUs, 78 unique proposed GW SKUs, zero SKU-format mismatches. All 78 records map to Car Audio → Accessories → Aerials, with catalogue section retained separately. All remain no-price/no-stock/review-only/not imported.
- The printed label for `MA648` appears truncated at “ANGLE MO”; that visible wording is preserved and flagged for confirmation rather than guessed.
- All 63 OCR candidate tokens in the separate quarantine CSV have now been visually checked against the rendered source pages. All 63 are non-SKU fragments or references (including section counts, fitment/specification/dimension text, OE references, and the `BA15S` bulb-base designation). None was assigned a GW SKU or imported.
- Remaining catalogue work: extract and visually verify the non-Aerials products in the five other retained ASC PDFs. The full set of 60 product-page renders is available in the isolated cleanup branch.
