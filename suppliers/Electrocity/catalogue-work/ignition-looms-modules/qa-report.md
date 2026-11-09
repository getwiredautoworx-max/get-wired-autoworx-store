# QA Report: Electrocity Ignition Looms & Modules Pilot

**STATUS: REVIEW ONLY — DO NOT IMPORT**
**Pilot Name:** Electrocity Ignition Pilot (Issue #182)
**Date of Audit:** 2026-11-07 (Re-audited per owner review)
**Auditor / Agent:** Jules
**Target Completion:** 10 November 2026

---

## 1. Executive Summary

This comprehensive QA report documents the end-to-end extraction, cryptographic verification, layout isolation, rigorous multi-tier vehicle fitment research, and schema normalisation for the two approved Electrocity pilot catalogues:
1. `suppliers/Electrocity/Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf`
2. `suppliers/Electrocity/Ignition Looms-Coils-Modules/IGNITION LOOMS.pdf`

In strict compliance with `PILOT_SOURCE_OVERRIDE_2026-11-07.md` and `JULES_CATALOGUE_WORKFLOW.md`:
- Unapproved supplier sources (`converters.pdf`, `IGNITION COILS.pdf`, etc.) were completely excluded.
- Zero changes were made to live products, prices, stock, categories, storefront components, or Supabase tables.
- Historical `GLOWPLUGS_SKU_MAP.csv` was preserved unmodified.
- All deliverables are explicitly marked **REVIEW ONLY — DO NOT IMPORT**.

---

## 2. Source Document Verification & Cryptographic Hash Audit

Both source PDFs were verified against their expected Git blob SHAs and actual filesystem properties:

| Source Document | Expected Git Blob SHA | Actual Git Blob SHA | SHA-256 Checksum | Page Count | Extraction Count | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `(1)IGNITION MODULES.pdf` | `5fdddd9bfeed32ac5c32263f724e8fd82db8583a` | `5fdddd9bfeed32ac5c32263f724e8fd82db8583a` | `bd02e1eddd128f36780b9d5dd20e882b3043393702d343524a9c828d63e3fadc` | 5 | 26 | VERIFIED MATCH |
| `IGNITION LOOMS.pdf` | `0875d983b2b535a79b66c55e6d818bb1ffb7c098` | `0875d983b2b535a79b66c55e6d818bb1ffb7c098` | `97787459711da62265f5374f5cdb203b8d1f86631dbe8b4422f7599709605051` | 1 | 3 | VERIFIED MATCH |

**Total Sources:** 2
**Total Pages Processed:** 6
**Total Records Extracted:** 29

---

## 3. Extraction Methodology & Layout Rule Compliance

1. **Positional Rule:**
   - **Above product image:** Parsed strictly as the OEM part number / primary reference code.
   - **Below product image:** Parsed strictly as the private Electrocity SKU.
   - **Secondary callouts:** Additional codes (e.g. `IGM049`, `GA2140`, `IGM001`, `FORD`) were captured into raw fields and stored in `additional_codes_json`.
2. **Page Evidence & Image Provenance:**
   - Every single product has an isolated high-resolution crop stored under `suppliers/Electrocity/catalogue-work/ignition-looms-modules/page-evidence/`.
   - Total crop images generated: 29 (26 modules + 3 looms).
   - Traceability: 100% of rows contain exact source file, page number, slot coordinates, and corresponding evidence image filename.

---

## 4. Re-Audited Vehicle Fitment Research & Evidence Hierarchy

Following owner review, the research evidence was rigorously re-audited against the workflow's four-tier evidence hierarchy to prevent overclaiming:

### Evidence Source Taxonomy
1. **OEM EPC / Official Vehicle Manufacturer Data (`OEM_EPC_MANUFACTURER`):**
   Direct vehicle-manufacturer electronic parts catalog (EPC) records or official original equipment manufacturer packaging and technical releases (e.g. ACDelco GM Original Equipment for D1918, D1941, TP49 / Delco 1976239 / 1972688).
2. **Tier-1 OE Supplier Product Registers (`TIER1_OE_SUPPLIER`):**
   Direct manufacturer / Tier-1 OE catalog product registers with verified OE cross-reference mapping (e.g. Mobiletron OE Maker & Vehicle tables for IG-D1909H, IG-FT003, IG-H012, IG-H013, IG-M009, IG-T003).
3. **Structured Automotive Aftermarket Catalogues (`STRUCTURED_AFTERMARKET`):**
   Established multi-brand technical catalogues (e.g. Time Access and Automotive Systems / TAS South Africa Ignition Components Catalogue, Diesel Electric, NIPARTS).
4. **Retailer & Marketplace Listings (`RETAIL_MARKETPLACE`):**
   Specialist parts distributors, regional stockists, and marketplace listings (e.g. Intelepart, APG Automotive, Speedquip, AutoMarine, Ace Auto, eBay Motors). Used solely for corroboration or possible applications.

### Re-Audited Confidence Classification
- **CONFIRMED (`confirmed`):** 3 records (`GWA-EC-000004` / `IG-D1918`, `GWA-EC-000005` / `IG-D1941`, `GWA-EC-000025` / `TP49`). These have direct GM Original Equipment / Delco Remy OEM EPC cross-references.
- **CORROBORATED (`corroborated`):** 25 records. These are substantiated by Tier-1 OE manufacturer cross-reference tables (Mobiletron) and structured technical aftermarket catalogues (TAS, Diesel Electric, NIPARTS, ASC).
- **POSSIBLE (`possible`):** 0 records. Secondary or weak marketplace applications isolated in `vehicle_applications_possible_json`.
- **UNVERIFIED (`unverified`):** 1 record (`GWA-EC-000012` / `IG-T003`), quarantined pending Electrocity clarification. This item must not be treated as a verified vehicle application or customer-ready listing.

### Customer-Facing Candidate Description Privacy
- Confirmed that private Electrocity SKUs are **never** published in customer-facing candidates (`normalised_description_candidate`).
- All customer candidate descriptions feature only substantiated vehicle fitment summaries and OEM numbers.

---

## 5. Unresolved Exceptions & Catalog Anomalies

Four catalogue-level exceptions were identified, preserved, and documented in `exceptions.csv`:

| Provisional ID | Source Callout | OEM Number | Electrocity SKU | Exception Type | Severity | Description & Suggested Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `GWA-EC-000003` | Page 1 Col 1 Row 1 | `IG-D1909H` | `213124` | `SECONDARY_LABEL_POSITION` | LOW | Label `FORD` printed below SKU at y=511.6; preserved in `additional_codes_json` as vehicle fitment indicator. |
| `GWA-EC-000006` | Page 1 Col 2 Row 2 | `IG-FT003` | `213127` | `SECONDARY_CODE_NOTATION` | LOW | Secondary code `GA2140` printed beside SKU 213127; preserved in `additional_codes_json`. |
| `GWA-EC-000012` | Page 2 Col 2 Row 2 | `IG-T003` | `220547` | `CATALOGUE_DESCRIPTION_MISMATCH` | HIGH | Supplier catalogue printed text reads `FIAT/PEUGEOT/RENAUL`, but Mobiletron prefix `IG-T...` and OE Maker table document Denso 131300-0072 / Toyota OEM 89620-10090. Both claims preserved explicitly without deleting either side. |
| `GWA-EC-000022` | Page 4 Col 2 Row 1 | `TP1015B` | `TP1015B` | `SKU_NUMBERING_ANOMALY` | MEDIUM | Printed SKU below image is alphanumeric `TP1015B` rather than standard 6-digit numeric code. Flagged for supplier confirmation. |

---

## 6. Cloudflare Pages vs. Workers Build Distinction

An inspection of the repository build configurations was conducted regarding the CI check `Workers Builds: get-wired-autoworx-store`:
- **Repository Architecture:** The store storefront is a static Cloudflare Pages project (`wrangler.toml` explicitly configures `pages_build_output_dir = "."`, compatibility date `2026-10-06`).
- **Cause of Workers Build Failure:** The Cloudflare Workers integration attempts to run `npx wrangler preview` or `npx wrangler deploy` against this repository, which fails because `wrangler.toml` does not define a Worker entrypoint (`[previews]` or `main = ...`).
- **Policy Compliance:** In accordance with repository handover guidance (`HANDOVER_CURRENT.md` §257-258, §1681-1711), no speculative changes to `wrangler.toml` or Cloudflare dashboard integrations were made, preventing unnecessary deployment triggers or expenditure of owner Cloudflare credits.

---

## 7. QA Checklist Results

- [x] **Source Verification:** Approved source documents and hashes verified against repo.
- [x] **Source Scope:** Excluded all unapproved PDFs (`converters.pdf`, `IGNITION COILS.pdf`).
- [x] **Provenance:** Every extracted row links directly to source document, page, and crop image.
- [x] **Positional Rule:** OEM part number above image; private Electrocity SKU below image.
- [x] **Data Hygiene:** No leading zeros dropped; exact strings preserved in raw extraction.
- [x] **Privacy Gate:** Zero leakage of private Electrocity SKUs into public candidate strings.
- [x] **Fitment Re-Audit:** All 29 OEM part numbers have documented research. Final confidence totals are 3 confirmed, 25 corroborated, 0 possible-only, and 1 unverified/quarantined. Possible applications remain separately recorded and are not promoted into customer descriptions.
- [x] **Store Mapping:** Mapped to approved `Auto Electrical` root category without renaming categories.
- [x] **Provisional IDs:** Sequenced strictly from `GWA-EC-000003` to `GWA-EC-000031` without collision.
- [x] **Commercial Gate:** Cost, selling price, and stock fields left empty/unknown.
- [x] **Strict Safety Rules:** No modifications to live tables, Supabase, storefront, or production deployments.
- [x] **Output Labeling:** Every deliverable clearly marked **REVIEW ONLY — DO NOT IMPORT**.

---

## 8. Deliverables Summary

The pilot outputs are contained in `suppliers/Electrocity/catalogue-work/ignition-looms-modules/`:
1. `source-manifest.json` (Document metadata, SHA hashes, counts)
2. `extracted-raw.csv` (Raw extracted catalogue text, positions, callouts)
3. `normalised-review.csv` (Full 42-column schema with re-audited fitment hierarchy)
4. `page-evidence/` (29 PNG image crops)
5. `exceptions.csv` (Documented catalogue anomalies and discrepancies)
6. `qa-report.md` (This comprehensive QA audit report)


## 2026-11-09 — IG-T003 fitment exception disposition

The official [Mobiletron IG-T003 product page](https://www.mobiletron.com/Product/detail/2801/IG-T003) identifies the part as an **Inductive / Pick up ignition module** and lists OE-maker references for Denso (1313000072), GM (94404544), Isuzu (8944045440), Lucas (DAJ902), Mitsubishi (CYGS065A) and Toyota (8962010090 / 8962010120 / 8962012340 / 8962016070). This corroborates the module identity and those OE cross-references; it does **not** provide direct vehicle-model fitment or reconcile the Electrocity catalogue's printed “FIAT/PEUGEOT/RENAUL” caption.

**Disposition:** The customer-facing risk is contained: the normalised candidate is now a generic “4-pin inductive/pick-up ignition module, model IG-T003” description and makes no vehicle-application claim. The confirmed-applications field remains empty; confidence remains unverified; QA remains QUARANTINED_SUPPLIER_CLARIFICATION_REQUIRED. The row is still excluded from import/publication until Electrocity confirms whether the printed caption is a misprint or a separate application. This is not represented as a verified fitment.
