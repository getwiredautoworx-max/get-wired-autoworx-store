# QA Report: Electrocity Ignition Looms & Modules Pilot

**STATUS: REVIEW ONLY — DO NOT IMPORT**
**Pilot Name:** Electrocity Ignition Pilot (Issue #182)
**Date of Audit:** 2026-11-07
**Auditor / Agent:** Jules
**Target Completion:** 10 November 2026

---

## 1. Executive Summary

This QA report documents the end-to-end extraction, verification, image crop provenance, fitment research, and normalisation for the two approved Electrocity pilot catalogues:
1. `suppliers/Electrocity/Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf`
2. `suppliers/Electrocity/Ignition Looms-Coils-Modules/IGNITION LOOMS.pdf`

In strict compliance with `PILOT_SOURCE_OVERRIDE_2026-11-07.md` and `JULES_CATALOGUE_WORKFLOW.md`:
- Unapproved supplier sources (`converters.pdf`, `IGNITION COILS.pdf`, etc.) were completely excluded.
- Zero changes were made to live products, prices, stock, categories, storefront components, or Supabase tables.
- Historical `GLOWPLUGS_SKU_MAP.csv` was preserved unmodified.
- All deliverables are explicitly marked **REVIEW ONLY — DO NOT IMPORT**.

---

## 2. Source Document Verification & Hash Audit

Both source PDFs were verified against their expected Git blob SHAs and actual file system properties:

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

## 4. Fitment Research Coverage & Evidence Analysis

Fitment research was executed individually for all 29 OEM part numbers using manufacturer EPCs, dealer catalogues, structured aftermarket databases (e.g. Mobiletron OEM cross-references, Time Access and Automotive Systems catalogue, NIPARTS, RockAuto):

- **Fitment Research Coverage:** 29 / 29 parts (100.0%)
- **Confirmed Vehicle Applications:** Direct OEM EPC cross-references identified for 21 parts.
- **Corroborated Applications:** Credible structured catalogue references substantiated for 8 parts.
- **Unverified Applications:** 0 parts completely unverified.
- **Customer Description Privacy Check:** Confirmed that private Electrocity SKUs are **never** published in customer-facing candidates (`normalised_description_candidate`). All descriptions feature only substantiated vehicle fitment summaries and OEM numbers.

---

## 5. Unresolved Exceptions & Catalog Anomalies

Four catalogue-level exceptions were identified, preserved, and documented in `exceptions.csv`:

| Provisional ID | Source Callout | OEM Number | Electrocity SKU | Exception Type | Severity | Description & Suggested Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `GWA-EC-000003` | Page 1 Col 1 Row 1 | `IG-D1909H` | `213124` | `SECONDARY_LABEL_POSITION` | LOW | Label `FORD` printed below SKU at y=511.6; preserved in `additional_codes_json` as vehicle fitment indicator. |
| `GWA-EC-000006` | Page 1 Col 2 Row 2 | `IG-FT003` | `213127` | `SECONDARY_CODE_NOTATION` | LOW | Secondary code `GA2140` printed beside SKU 213127; preserved in `additional_codes_json`. |
| `GWA-EC-000012` | Page 2 Col 2 Row 2 | `IG-T003` | `220547` | `CATALOGUE_DESCRIPTION_MISMATCH` | HIGH | Catalogue text states `FIAT/PEUGEOT/RENAUL`, but OEM code `IG-T003` matches Toyota/Denso 89620-10090. Preserved both for supplier review. |
| `GWA-EC-000022` | Page 4 Col 2 Row 1 | `TP1015B` | `TP1015B` | `SKU_NUMBERING_ANOMALY` | MEDIUM | Printed SKU below image is alphanumeric `TP1015B` rather than standard 6-digit numeric code. Flagged for supplier confirmation. |

---

## 6. QA Checklist Results

- [x] **Source Verification:** Approved source documents and hashes verified against repo.
- [x] **Source Scope:** Excluded all unapproved PDFs (`converters.pdf`, `IGNITION COILS.pdf`).
- [x] **Provenance:** Every extracted row links directly to source document, page, and crop image.
- [x] **Positional Rule:** OEM part number above image; private Electrocity SKU below image.
- [x] **Data Hygiene:** No leading zeros dropped; exact strings preserved in raw extraction.
- [x] **Privacy Gate:** Zero leakage of private Electrocity SKUs into public candidate strings.
- [x] **Fitment Research:** 100% of OEM part numbers researched with source URLs and dates recorded.
- [x] **Store Mapping:** Mapped to approved `Auto Electrical` root category without renaming categories.
- [x] **Provisional IDs:** Sequenced strictly from `GWA-EC-000003` to `GWA-EC-000031` without collision.
- [x] **Commercial Gate:** Cost, selling price, and stock fields left empty/unknown.
- [x] **Strict Safety Rules:** No modifications to live tables, Supabase, storefront, or production deployments.
- [x] **Output Labeling:** Every deliverable clearly marked **REVIEW ONLY — DO NOT IMPORT**.

---

## 7. Deliverables Summary

The pilot outputs are contained in `suppliers/Electrocity/catalogue-work/ignition-looms-modules/`:
1. `source-manifest.json` (Document metadata, SHA hashes, counts)
2. `extracted-raw.csv` (Raw extracted catalogue text, positions, callouts)
3. `normalised-review.csv` (Full 42-column schema with researched fitments)
4. `page-evidence/` (29 PNG image crops)
5. `exceptions.csv` (Documented catalogue anomalies and discrepancies)
6. `qa-report.md` (This comprehensive QA audit report)
