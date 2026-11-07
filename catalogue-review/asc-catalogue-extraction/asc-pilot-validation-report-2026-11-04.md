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


## Subsequent ASC review progress — Automotive Sensors category complete

- Completed a 106-product Automotive Sensors review-only batch from source pages 3–9 of `ASC- Automotive Sensors (1).pdf`. File: `asc-automotive-sensors-106-product-review-only.csv`.
- Section counts: Crankshaft & Camshaft Position Sensors 16; Throttle Position Sensors 4; Air Flow & Air Mass Sensors 6; MAP/Manifold/Intake Air Sensors 10; Oxygen (Lambda) Sensors 8; Knock Sensors 3; Speed & ABS Sensors 11; Temperature Senders & Sensors 36; Fuel, Oil & Level Sensors 5; Reverse & Parking Sensors 4; Other Engine Management Sensors 3.
- 106 unique supplier SKUs and 106 unique proposed GW SKUs, zero SKU-format mismatches. Nine rows overlap with the original 50-row pilot; 97 are additional. All are visually checked against source page captions and codes, mapped to Auto Electrical Spares & Parts → Automotive Sensors, and remain no-price/no-stock/review-only/not imported.
- Fitment caption text for `S5-16053` and `S5-16087` is clipped in the printed source card; exact visible text is retained and the remainder is flagged for confirmation, not guessed.


## Subsequent ASC review progress — Automotive Switches sections

- Completed the 51-product `Ignition Switches & Barrel Sets` section from pages 3–5. File: `asc-ignition-switches-51-product-review-only.csv`. 51 unique supplier SKUs and proposed GW SKUs; eight pilot rows and 43 additional rows.
- Completed the 53-product `Combination & Indicator Stalk Switches` section from pages 5–8. File: `asc-combination-indicator-switches-53-product-review-only.csv`. 53 unique supplier SKUs and proposed GW SKUs.
- Combined 104 source-verified review-only products mapped to Auto Electrical Spares & Parts → Automotive Switches. All no-price/no-stock/not imported.
- The Switches catalogue is not yet complete. Remaining sections to process: Wiper Switches; Headlamp, Dimmer & Hazard Switches; Power Window Switches; Toggle, Push & Button Switches; Starter & Solenoid Switches; Battery Isolators & Cut-Off Switches; Switch Panels, Covers & Accessories; Marine & Specialist Switches.


## Subsequent ASC review progress — Automotive Switches catalogue complete

- Completed all 16 product sections across pages 3–22 of `ASC- Automotive Switches (1).pdf` in 15 review-only CSV batches.
- Section counts: Ignition Switches & Barrel Sets 51; Combination & Indicator Stalk Switches 53; Wiper Switches 7; Headlamp, Dimmer & Hazard Switches 10; Power Window Switches 27; Oil Pressure Switches 24; Radiator Fan & Thermo Switches 35; Reverse Light Switches 11; Stop Light Switches 17; Door, Bonnet & Boot Switches 4; Rocker Switches 32; Toggle, Push & Button Switches 32; Starter & Solenoid Switches 9; Battery Isolators & Cut-Off Switches 13; Switch Panels, Covers & Accessories 24; Marine & Specialist Switches 19.
- Cross-file audit: **368 rows, 368 unique supplier SKUs, 368 unique proposed GW SKUs, zero duplicates, zero SKU-format mismatches**. All mapped to Auto Electrical Spares & Parts → Automotive Switches.
- All 368 remain no-price/no-stock/review-only/not imported. Dense or clipped source application/specification wording is flagged in the row-level review notes; no missing text was guessed.


## Subsequent ASC review progress — Globes, Car Mats and Fuel Pumps complete

- Automotive Globes: 158 products from source pages 3–11, across 10 sections. File: `asc-automotive-globes-158-product-review-only.csv`. 158 unique supplier SKUs and 158 unique proposed GW SKUs; eight rows overlap the 50-row pilot.
- Car Mats: 139 visible products from source pages 3–11, across 14 sections. File: `asc-car-mats-139-product-review-only.csv`. 139 unique supplier SKUs and 139 unique proposed GW SKUs; eight rows overlap the pilot. The Rubber & PVC section heading says 13 items, but only eight product cards are visible in the supplied PDF; the five unshown items were not fabricated. Several other cards are marked “Image on Request” and are recorded as having no product photo. `M7-HY100` is marked “production stopped” and must not be activated without owner confirmation.
- Fuel Pumps: 129 products from source pages 3–12, across 18 sections. File: `asc-fuel-pumps-129-product-review-only.csv`. 129 unique supplier SKUs and 129 unique proposed GW SKUs; nine rows overlap the pilot.
- Combined six-catalogue source-verified total: **978 product rows** (Aerials 78; Automotive Sensors 106; Automotive Switches 368; Automotive Globes 158; Car Mats 139; Fuel Pumps 129). The 50-row pilot is included in these totals, not added again.
- All 978 remain no-price/no-stock/review-only/not imported. No supplier price list or stock file has been supplied. ASC customer-facing price status must remain quote-required until current price data and owner approval are available.


## Global six-catalogue integrity audit

- Files audited: 20 category CSV batches.
- Total rows: **978**.
- Unique ASC supplier SKUs: **978**; duplicate supplier SKUs: **0**.
- Unique proposed Get Wired SKUs: **978**; duplicate GW SKUs: **0**.
- SKU format mismatches: **0**.
- Category mapping mismatches: **0**.
- Price status failures: **0** (all marked no price in source / current dealer cost required).
- Stock status failures: **0** (all marked not supplied / availability confirmation required).
- Import status failures: **0** (all review-only/not imported).
- Missing source-page references: **0**.
- Rows with explicit review notes: **56** (clipped/dense text, image-on-request, production-stopped note, or source section count discrepancy).
- This validates data structure and source-page linkage, not owner approval, final fitment completeness, image rights, price, stock, or live-store import.
