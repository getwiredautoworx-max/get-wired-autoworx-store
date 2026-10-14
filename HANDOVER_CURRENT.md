# Get Wired AutoWorx — Current Handover Checkpoint
Date: 2026-10-14 (South Africa)

## Working rules
- Continue from existing work; do not restart the catalogue.
- Preserve the live store and functioning features.
- Do not perform live catalogue imports, Supabase writes, or Axxess uploads during source reconciliation.
- Build and verify in the staging/workspace first; batch any approved final sync/deployment into one controlled release.
- Treat a running test as not passed until its result is recorded.
- Maintain the eight agreed store categories and map ASC source headings/subcategories into them without losing the source taxonomy.
- Pricing policy: supplier cost excl. VAT × 1.15 × 1.35; customer-facing price VAT-inclusive.
- August–September guide prices/availability are live candidates subject to confirmation. July and earlier are “subject to price and availability confirmation” unless the exact same SKU is verified in a later guide.
- June promotional prices are historical and must not be treated as current live prices without verification.

## Current verified baseline (latest available reconciliation workbook dated 2026-10-11)
- Live active products: 4,187; distinct supplier SKUs: 4,187; distinct public SKUs: 4,187.
- Missing product image_url: 0; missing cost: 0; invalid/non-positive price: 0; live pricing formula mismatches: 0.
- Structured fitment rows: 66; products with structured fitment: 53; vehicle coverage reported as one make / nine make-model pairs.
- No live writes or deployment performed during that audit.
- Historical Feb–Aug audit: 3,578 unique SKUs, 3,160 staged formula PASS, 418 one-cent differences caused by rounding method. Do not bulk overwrite live prices based on those flags.
- June OCR staging: 470 records awaiting exact SKU/cost verification against original scanned pages.
- Recent working checkpoint noted in conversation: crosswalk has 115 rows and represents all 33 June headings; original page-by-page visual verification remains incomplete. Do not treat heading representation as verification of every row.

## Progress made 2026-10-14
- Opened original June Buyer’s Guide and visually inspected printed page 2 (contents) and printed pages 3–7.
- Contents page headings/page ranges: 4X4 Outdoor (p.3), Lifestyle (pp.3–4), Panel Clips (pp.4–5), Accessories (pp.5–10), Battery Accessories (pp.10–11), Electrical Spares (pp.11–15), Hoteche Stand (pp.16–17), Spare Parts (pp.18–19), Brake & Cylinders (p.20), Automotive Tools (pp.21–22), Trimming Tool Kits (pp.22–23), Hardware (pp.23–29), Special Discounted Price (pp.29–32).
- Printed page 3 visible SKU examples: C10-035, C10-027, C7-016, C7-004, CB-008, M501, AX005, DRO17, BC530, HB400, TT235Z, RALTT235Z, 5558-GY, 5862-WH, LT-6251T-R, C10-029-C, C10-029, B7-007B, B7-007BL, CO09-L and CO09-S.
- Printed page 4 visible examples: B7-008GR, B7-008GY, B7-009, 6007-11-NL, 6007-20-450, 6007-21, D9-FR2207, RTD-S and RTD35A, plus F7-series panel clips.
- Printed page 5 completes Panel Clips and starts General Accessories. Visible Panel Clip codes include F7-107-18, F7-107-21, F7-107-22, F7-107-24, F7-107-26, F7-107-31, F7-107-35, F7-107-36, F7-200, F7-201, F7-202, F7-203 and HS-6148B. General Accessories examples: SC184-12V, SW351C, A2-061A, CSBRL, A2-SS001-T8, PE-650M, 603W, 1710WP, 1740WP, A2-FF01, A2-FF02 and A2-FBL001B.
- Printed page 6 General Accessories examples: AS-105B, A2-100-30GR, A2-100-5C, A2-100-60W, A2-102, MFS-TY02, MFS-VW03, 4015, SWC790, A2-BLS001CB, 1820WP, BKMITSUBISHI-AL, B1-002, CDS5GR, D9-USL001, Q-BLS01, D9-GWM01, D9-POLO10GB, D9-010B, T6-D9-FR1213, D9-FR2202, D9-FR2214, D9-FR2218, D9-H2105, D9-H22004, D9-MTT901, D9-NN1503 and D9-FR035.
- Printed page 7 General Accessories examples: D9-GWM02, D9-NN2104, D9-TF2101, HA-FTC02, D9-FR1202, D9-FR1515W, D9-FR2201, D9-FR2204, D9-H1508, D9-H1519TRD, D9-FR05, D9-GF8MB, D9-POLO3GB, D9-HL21, D9-FR2224, D9-IZ1201, D9-H1532, D9-IZ1603, D9-FR1208, D9-HL1540, D9-FR1524, D9-FR1204, D9-FR1801, HA-TC01, 15210, 15214, 15215 and 15361.
- June guide warns asterisked items are priced “as per system,” subject to incoming shipments, and prices may vary during the month. Visual transcription examples are not full-row verification; catalogue prices are not automatically current supplier costs.
- No live database writes, imports, deployments or Axxess uploads performed.

## Unresolved work — continue in this order
1. Continue visual verification of June pages 8–32 and all crosswalk entries against source images; correct OCR code/description/cost errors and retain page references.
2. Check February, March and May guides’ category headings and contents/page ranges; keep ASC headings alongside the eight agreed store categories.
3. Reconcile exact supplier SKU + description + cost + page across June staging and historic unresolved-price queue (126 rows); deduplicate overlaps before classifying.
4. Match September and October Buyer’s Guides and October Promotions by exact SKU. Keep promotion prices separate and confirm dates/terms. Do not infer prices from fuzzy description matches.
5. Match Suzuki and Renault/Dacia vehicle-catalogue codes to exact supplier codes; preserve verified make/model/engine/application details. Unpriced valid fitments remain quote/review candidates rather than being discarded.
6. Produce a staged, deduplicated source-delta ledger with SKU, description, vehicle/application, source guide/date/page, supplier cost excl. VAT, calculated VAT-inclusive selling price, image evidence, source category/subcategory, status (KEEP/UPDATE/ADD/QUOTE/REVIEW), and reason.
7. Validate category/subcategory hierarchy and storefront navigation in staging. Test mobile layout, category → subcategory → product flow, search, cart and checkout; record observed results.
8. Only after explicit review/approval, perform one controlled final synchronization to GitHub, Supabase SQL/data and Axxess/related services.

## Current blockers
- Original guide page-by-page verification and exact SKU joins are incomplete.
- September/October price deltas and promotion eligibility not fully calculated.
- Suzuki and Renault/Dacia exact-code joins outstanding.
- Quote-only candidate count unknown; no reliable ETA until extraction and match totals are measured.

## Immediate next action
Continue visually from printed page 8 of the June Buyer’s Guide; capture page evidence and crosswalk matches. Keep all changes staged; no live import or deployment.


## Progress made 2026-10-14 — June guide pages 8–10
- Visually inspected printed pages 8, 9 and 10.
- Page 8 completes General Accessories, then begins Wheel Accessories and Electrical Accessories. Visible examples include 15362, 15710JB, C3-027-4, RCON1-B, W1285, MGB, C3-016, C3-028, A2-RP8R, G1-008, CSS-001, CSS-002, CSS-003, CSS-004, CSS-014, CSS-019, CSS-026, CSS-029, CSS-030, CSS-032, JD-001, PEK04, S1-135LED, A2-023D, E1-USB7, E1-USB8, E1-USB5, E1-CRV, CLO1-M, SCL011-S and SCL014.
- Page 9 continues Electrical Accessories and starts Gauges. Visible examples include SCL015, E1-CS2, SC-306SS, YF2002, 01006GR, E1-721-S, E1-722-T, K154C, K141C, G1-OS02, 2727SS, 2791SS, 2771SW, 60543SW, 27001SW, 27027SWL, 27091SWL, 2791SW-R, 2791SWL-R, 2727LED-R, 27911ED-R, 6116BL, 6204BB, 6205BB, 6208BB, 6161SB, 6164SB, 6169SB, OWOT-R, 8371 and G1-5026. Check OCR carefully where characters are visually similar.
- Page 10 begins Aerials and Battery Accessories. Visible examples include SL-127, EX908-24, SL-119-2M, MA333BN, SL-RFR01, A1-006B, AB508, EA017, MA522, MA559R, MA562BB, MA596/2, MA600, MA648, S-5407S, SL-627, SL-772, SL-772B, SL-939R, SL-OP01, SL-TY02, SL-TY03, 288X, O1-010, HM-231, B3-002 and B3-008.
- These are page-image transcriptions of selected visible codes, not a full item-by-item price audit. Printed prices remain historical until verified against current supplier cost and newer guide by exact SKU.
- No live store/database changes, uploads or deployment performed. Next action: continue from printed page 11.

Immediate next action: continue visual verification from printed page 11 of the June Buyer’s Guide; keep all catalogue changes staged.


## Progress made 2026-10-14 — June guide pages 11–13
- Visually inspected printed pages 11, 12 and 13 of the original scanned June Buyer’s Guide. This is a selected-code transcription, not complete line-by-line price validation.
- Page 11: Battery Accessories continue, then Fuses begin. Visible battery SKU/code examples: B3-009, PN06N, PN06P, BBC600AMP, JC200AMP, JC500AMP, I1-1000W, C175, RSL1001, RSL1000, RSL1002B, RSL235B, RK4000, RK6500, C5-013-800, C5-014-21, and heat-shrink family C5-013-2G/2R/3G/3.5R/6BL/6G/8R/10G/10B/12BL/12W. Fuses visible: MF-SET, R3-43, F3-002, FH-001, FB-002-60, FB-002-100, F3-520-2, F3-520-10, F3-630-10, WENG10AMP.
- Page 12: Fuses continue, followed by Relays. Visible fuse codes include F3-004-7.5, F3-004-10, F3-004-15, F3-004-30, F3-004-40, F3-010-15, MPF110AMPC, WPFI3AMP, WPFI30AMPC, FL30, FL50, FLS-20. Relay examples include CS-114013, CS-114014, ND68, ND73, ND83, ND89, ND97, ND105, ND41-24, ND42-24, ND49, F4-002, F4-006, ND59, FK3170, F4-004 and RY228.
- Page 13: Globes & Globe Holders followed by Starter Kits & Regulators. Visible globe codes include CS-3856, CS-3858, 286D-10, 339-10, 581-10, 581-24-10, 62T-10, 334BP, 334-10, 633-10, 284-10, 502BP, 501-16A-10, 502-10, 592-10, 582ALED, AE-H8LED, H170W24V, 9006-CBL-H, 1DS-8000, 3DS, 2DC, 2DS, H4-H43G, GH-9005. Starter/regulator examples include 041SK, 047SK, 062SK, 223SK, 27370-16010/35060, A7-TBH06, Q-SB01, SB474, SB543, SB583 and SB585.
- Treat OCR/transcribed codes as candidates until each row is checked against the exact visual label and description; visually similar characters and small print can cause errors. Printed June prices are historical, not verified current supplier costs. Asterisked “as per system” items remain price/availability confirmation candidates.
- No live store/database changes, imports, uploads, or deployments performed.
- Next action: visually inspect printed page 14 onward and continue recording page evidence; keep all reconciliation staged.


## Progress made 2026-10-14 — June guide pages 14–16
- Visually inspected printed pages 14–16. Page 14 completes Starter Kits & Regulators and begins Fuel Pumps; page 15 continues Fuel Pumps, then Fan Blades; page 16 is a Hoteche display page with product codes pictured rather than a normal SKU/price grid.
- Page 14 regulator/solenoid examples: VR1002, VR1008, VR1013, VR1023, VR1029, VR1035, VR1061, VR1063, VR1072, VR1073, VR1075, VR1081, VR1083, VR1099, VR1103, ST2025. Fuel-pump examples: F1-005, F1-015, F1-016, F1-017, F1-027, F1-027W, F1-032, F1-035, F1-043, F1-049, F1-053, F1-062, F1-068, F1-074.
- Page 15 fuel-pump examples: F1-075, F1-089, F1-096, F1-108, F1-115, F1-116, F1-117, F1-118, F1-119, UC-J10HC, F1-001-E, F1-042-E. Fan-blade/viscous-clutch examples: F9-001-5, F9-001-5P, F9-001-22, F9-001-25, F9-001-27, F9-001-29, F9-001-66, F9-001-75, F9-002-6, F9-002-13, F9-002-15, F9-002-51, F9-002-70 and F9-002-81.
- Page 16 Hoteche display page shows codes including 101320, 140711, 110901, 140717, 100146, 100240, 100142, 312006, 312003, 310819, 313002, 310911, 312007, 311100, 511021, 501081, 631002, 530109, 530108, 540103, 500223, 500312, 602002, 284271, 280110, 280175, 621002, 495012, 495013, 705001, A830047-1 and A830048-1. These codes need exact product/price mapping from an authoritative supplier price source; do not infer costs from display graphics.
- All listed codes are visual candidates, not completed exact SKU/cost reconciliation. June guide pricing remains historical and must be checked against later guides/current supplier costs before becoming a live price.
- No live store/database changes, imports, uploads, or deployments performed.
- Next action: continue with printed page 17 onward; maintain staged-only reconciliation.


## Progress made 2026-10-14 — June guide pages 17–19
- Visually inspected printed pages 17–19. Page 17 is Hoteche display-stand terms rather than a priced stock list: display stand loan offer requires R18,000 or more purchase from Hoteche range; only five stands available; stand is for displaying Hoteche range and remains property of Accessories Spares Centre. Do not treat the display stand as a sale item.
- Page 18 Door Parts visible examples: JTL-6106, Q-SDC02, Q-SDH03, Q-BDS01, Q-BDSC02, Q-DC02, Q-LR01, Q-SDL01, Q-SDS02, Q-FSDL02, VIC-AC072, VIC-AC108T, DHFL-NP200, DHFL-SE01, DHFL-SS01, DHFR-SB01, DHFR-SB02, DHFR-SS01, DTHL-CA2HCB, DTHL-NP200B, DHIL-SB01, DHIL-YHG, DHIR-HAC2, DHIR-NP200B, DHRL-SE01, DHRR-SE01, KOA1069SBL, KOA1081B, M-WRH02, N-WRH01, N-WRH02 and O-WRH02.
- Page 19 continues Door Parts then starts Automotive Spares. Door-part examples: S-WRH03, T-WR002R, T-WR003L, V-WRH02. Automotive Spares examples: A3-003BCABL, A3-003GR, A3-023BL, A3-030CH, A3-032BL, A3-021B, A3-021Y, A3-011BL, T-CBP01, CL-1260, SV-8345, AF-002, AF-010, CF-001, LP, FF-006, GF-239/240, JT-215, AF-004, BS-302, BS-T9, BS-T9B, SC-SB01, SE-CVB01, 335-4 and 98013.
- As before, transcribed codes require exact row matching before price, description or application is marked verified. Printed June prices are not automatically current costs. No live store/database changes, imports, uploads or deployments performed.
- Next action: continue printed page 20 onward; preserve staged-only workflow.


## Progress made 2026-10-14 — June guide pages 14–18
- Visually inspected printed pages 14–18 of the original June Buyer’s Guide. These are selected-code transcriptions, not complete item-by-item price verification.
- Page 14 (Starter Kits & Regulators, then Fuel Pumps): visible regulator/solenoid codes VR1002, VR1008, VR1013, VR1023, VR1029, VR1035, VR1061, VR1063, VR1072, VR1073, VR1075, VR1081, VR1083, VR1099, VR1103 and ST2025. Fuel pump examples: F1-005, F1-015, F1-016, F1-017, F1-027, F1-027W, F1-032, F1-035, F1-043, F1-049, F1-053, F1-062, F1-068 and F1-074.
- Page 15 (Fuel Pumps, then Fan Blades): fuel pump codes F1-075, F1-089, F1-096, F1-108, F1-115, F1-116, F1-117, F1-118, F1-119, UC-J10HC, F1-001-E and F1-042. Fan blade / viscous clutch examples F9-TY02AC, F9-001-5, F9-001-22, F9-001-25, F9-001-27, F9-001-29, F9-001-54, F9-001-66, F9-001-75, F9-002-6, F9-002-13, F9-002-15, F9-002-51, F9-002-70 and F9-002-81.
- Pages 16–17 (Hoteche display promotion): page 16 examples 101320, 140711, 110901, 140717, 312006, 312003, 310819, 100146, 100240, 100142, 313002, 310911, 312007, 311100, 511021, 501081, 631002, 530109, 530108, 540103, 500223, 500312, 602002, 280110, 280175, 284271, 621002, 495012, 495013, 705001 and A830047-1/A830048-1. Page 17 states a Hoteche display stand loan promotion for purchases of R18,000 or more; only 5 stands available; stand is display-only and remains property of Accessories Spares Centre. Confirm current eligibility before offering.
- Page 18 (Door Parts): visible codes JTL-6106, Q-SDC02, Q-SDH03, Q-BDS01, Q-BDSC02, Q-FDC02, Q-LR01, Q-SDL01, Q-SDS02, Q-FSDL02, VIC-AC072, VIC-AC108T, DHFL-NP200, DHFL-SE01, DHFL-SS01, DHFR-SB01, DHFR-SB02, DHFR-SS01, DHI-2HAC2CB, DHI-NP200B, DHIL-SB01, DHIL-YHG, DHIR-HAC2, DHIR-NP200B, DHIR-SB01, DHRL-SE01, DHRR-SE01, KOA1069SBL, KOA1081B, M-WRH02, N-WRH01, N-WRH02 and O-WRH02.
- Important: June printed prices are historical; asterisked “as per system” items require supplier confirmation. Code sightings alone do not verify the exact SKU/description/cost/source page or current price.
- No live database writes, imports, deployments or Axxess uploads performed.

## Immediate next action
Continue visual verification from printed page 19 through page 32, then reconcile each item against the staged crosswalk and later guides. Do not mark rows verified from code-only sightings; require exact SKU, description, source price/cost, page and later-guide status where applicable.
