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

- The 50-row cross-family pilot is retained as a review-only validation sample.
- A complete **78-product Aerials review-only batch** has been transcribed and visually checked against pages 3–7 of the ASC Aerials PDF. It includes eight pilot rows plus 70 additional records. File: `asc-aerials-78-product-review-only.csv`.
- A complete **106-product Automotive Sensors review-only batch** has been transcribed and visually checked against pages 3–9 of the ASC Automotive Sensors PDF. It includes nine pilot rows plus 97 additional records. File: `asc-automotive-sensors-106-product-review-only.csv`.
- The full **368-product Automotive Switches catalogue** is extracted in 16 source-verified sections across 15 review-only CSV files.
- Complete category batches are also ready for **Automotive Globes (158 products)**, **Car Mats (139 visible products)** and **Fuel Pumps (129 products)**. Files: `asc-automotive-globes-158-product-review-only.csv`, `asc-car-mats-139-product-review-only.csv`, and `asc-fuel-pumps-129-product-review-only.csv`.
- All 50 supplier SKUs and all 50 proposed Get Wired SKUs are unique within this pilot.
- The proposed SKU pattern is `GW-ASC-<normalised ASC supplier SKU>`; the supplier SKU is retained separately.
- The 50 rows point to 12 source-page locations (pages 3 and 4 of each source PDF).
- The pilot rows are marked as visually checked on their source pages, but remain **proposed / not approved / not imported**.
- All 50 candidate image crops were visually inspected and matched to the corresponding source-page product caption and supplier SKU. The crops remain on the separate PR #168 preview branch and are not copied into this review branch.
- ASC watermarking is visible on the crop images. They are **not approved production assets**; asset permission/clean-image suitability remains a separate approval gate.
- The source-page render review corrected the globe descriptions: `H1865W-H` and `H1960/55W-H` are HUADIAO E-MARKED variants; `H355W-H` is transcribed as HDIAO exactly as printed in the source.
- No source catalogue contains current dealer pricing in this intake. All 50 pilot records remain price-unknown and require a current dealer cost before any price can be calculated.
- Physical stock is not supplied by these catalogues. Availability remains unconfirmed and separate from price.

## Completed category batch: Aerials

- 78 products visually verified across source pages 3–7.
- Section counts: Vehicle-Specific Aerials 23; Universal/Roof/Pillar Mount 17; Electronic/Automatic/Amplified 6; Shark Fin/Imitation 13; Masts/Bases/Mounts 8; Extensions/Adaptors/Plugs 11.
- 78 unique ASC supplier SKUs and 78 unique proposed `GW-ASC-` SKUs; zero format mismatches.
- All rows map to Car Audio → Accessories → Aerials, with the catalogue section preserved separately.
- No price or stock data is supplied; all rows remain review-only and unimported.
- One printed description (`MA648`) appears truncated at “ANGLE MO”; its visible wording is retained and the remainder is flagged for confirmation.

## Completed category batch: Automotive Sensors

- 106 products visually verified across source pages 3–9.
- Section counts: Crankshaft & Camshaft Position Sensors 16; Throttle Position Sensors 4; Air Flow & Air Mass Sensors 6; MAP/Manifold/Intake Air Sensors 10; Oxygen (Lambda) Sensors 8; Knock Sensors 3; Speed & ABS Sensors 11; Temperature Senders & Sensors 36; Fuel, Oil & Level Sensors 5; Reverse & Parking Sensors 4; Other Engine Management Sensors 3.
- 106 unique ASC supplier SKUs and 106 unique proposed `GW-ASC-` SKUs; zero format mismatches.
- All rows map to Auto Electrical Spares & Parts → Automotive Sensors; catalogue section retained separately.
- All remain no-price/no-stock/review-only/not imported. Two fitment captions are visibly clipped (`S5-16053`, `S5-16087`) and are flagged for confirmation rather than completed by inference.

## Completed Switches sections (catalogue still in progress)

- Ignition Switches & Barrel Sets: 51 products from pages 3–5; 51 unique supplier SKUs and proposed GW SKUs; eight rows overlap the pilot and 43 are additional.
- Combination & Indicator Stalk Switches: 53 products from pages 5–8; 53 unique supplier SKUs and proposed GW SKUs.
- Combined: 104 source-verified products mapped to Auto Electrical Spares & Parts → Automotive Switches. No prices or stock are supplied; all remain review-only and unimported.
- The full 22-page Automotive Switches catalogue is now extracted across 16 sections: **368 products** total. A cross-file audit found 368 unique supplier SKUs and 368 unique proposed GW SKUs, with no duplicates or SKU-format mismatches. All 368 are mapped to Auto Electrical Spares & Parts → Automotive Switches, and remain no-price/no-stock/review-only/not imported.

## Completed Automotive Switches catalogue

- Total extracted: 368 products across 16 catalogue sections.
- Cross-file validation: 368 unique supplier SKUs, 368 unique proposed GW SKUs, zero duplicates, zero SKU-format mismatches.
- All 368 rows use the owner-approved Auto Electrical Spares & Parts → Automotive Switches mapping.
- All remain no-price/no-stock/review-only/not imported. Dense or clipped application text is flagged in row notes rather than completed by inference.

## Completed remaining ASC categories

- Automotive Globes: 158 products, 10 catalogue sections, 158 unique supplier SKUs and 158 unique proposed GW SKUs.
- Car Mats: 139 visible products, 14 sections, 139 unique supplier SKUs and 139 unique proposed GW SKUs. The Rubber & PVC section header states 13 items but only eight product cards are present in the supplied PDF; five missing items were not invented. Some cards say “Image on Request”; those are recorded without fabricated photos. `M7-HY100` is marked “production stopped” in the catalogue and must not be activated without owner confirmation.
- Fuel Pumps: 129 products, 18 sections, 129 unique supplier SKUs and 129 unique proposed GW SKUs.
- Combined with Aerials (78), Automotive Sensors (106) and Automotive Switches (368), the six selected ASC PDFs now yield **978 source-verified review-only product rows**. The original 50-row pilot overlaps these batches and is not an extra count.
- Global cross-file audit: **978 rows, 978 unique supplier SKUs, 978 unique proposed GW SKUs, zero duplicates, zero SKU-format mismatches, zero category-mapping mismatches, and zero price/stock/import gate failures**. Every row has a source-page reference; 56 rows carry explicit review notes. All six category batches remain no-price/no-stock/review-only/not imported. Supplier costs and stock availability were not supplied by these catalogues.

## Source-page visual evidence

Full-page renders of all 60 product pages (PDF pages 3 onward) across the six retained PDFs were generated in the isolated branch `cleanup/asc-catalogues-stock-reset-2026-10-30`, under `catalogue-review/asc/source-pages/`. Pages 3 and 4 provide the visual source evidence for the 50-row pilot; the remaining 48 product pages are now ready for subsequent catalogue extraction and review.

## OCR quarantine

- All 63 additional OCR candidate tokens have now been visually checked against their rendered source pages. **All 63 are non-SKU OCR fragments, section counts, fitment/specification/dimension text, OE references, or a bulb-base standard (`BA15S`).**
- No Get Wired SKU was assigned to any of these 63 tokens; none is a new product record.
- All 63 remain quarantined/no-import as OCR noise, not as unverified product SKUs.

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
