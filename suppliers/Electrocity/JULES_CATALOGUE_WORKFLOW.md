# Electrocity catalogue workflow for Jules

**Owner-authorised scope:** Catalogue review, extraction, matching, analysis and preparation only. This document is an operating procedure for the Electrocity supplier folder. It does not authorise live catalogue, product, price, stock, image, database, storefront, deployment or production changes.

## 1. Current source inventory — verify before every run

Use only files under `suppliers/Electrocity/`. The current main-branch source set was directly checked on 2026-11-07:

| Source | Git blob SHA | Initial role |
|---|---|---|
| `converters.pdf` | `07f68c7c42f5f524ccd3c2dc7a6a37a250381ae1` | First sample candidate |
| `Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf` | `5fdddd9bfeed32ac5c32263f724e8fd82db8583a` | Follow-on catalogue |
| `Ignition Looms-Coils-Modules/IGNITION COILS.pdf` | `5b1f20dd22a489e8fbe56ceed594c684ba09883b` | Follow-on catalogue |
| `Ignition Looms-Coils-Modules/IGNITION LOOMS.pdf` | `0875d983b2b535a79b66c55e6d818bb1ffb7c098` | Follow-on catalogue |

The 2026-10-27 supplier inventory note saying Electrocity had zero PDFs is stale. These four PDFs are present on main as of the verification above. Do not use that old count. Recheck paths and blob SHAs before processing so Jules never works from a stale or substituted source.

**Pilot:** Start with `converters.pdf` only. First inspect its page count, layout, text layer, tables, images and printed field labels. If it is not a genuine product catalogue or is too small/non-representative to test the extraction method, stop and report why; do not silently switch sources. The ignition modules PDF is the designated fallback only after the owner/workstream instruction confirms the sample switch.

## 2. Why Electrocity needs a distinct adapter

Do not copy the ASC extraction/import assumptions into this supplier workflow. Electrocity material may present several product/cross-reference codes together, and the existing historical glowplug working map explicitly records cases where the source did not identify which code is the supplier's primary code. That is a warning to preserve source labels and uncertainty, not permission to infer code roles.

For every printed identifier:
- Capture the exact string, punctuation, leading zeros and nearby printed label.
- Record the page, row/diagram/callout and the exact source heading/column.
- Store each code in its own field with its printed label.
- If no label defines its role, use `UNCONFIRMED_ROLE`; do not call it a supplier SKU, OEM number, cross-reference or manufacturer part number.
- Never merge codes or choose one as the canonical supplier code without evidence.

Keep the original Electrocity document unchanged. ASC-specific quote-only wording, extraction scripts, price assumptions, and taxonomy rules must not be applied automatically.

## 3. Required end-to-end pilot

### A. Intake and source lock
1. Record supplier = Electrocity, exact filename/path, Git blob SHA, file size, page count, date/revision if printed, and intake date.
2. Preserve the original PDF byte-for-byte.
3. Compute a file hash for the local working copy and confirm it matches the retrieved source.
4. Check for duplicate or superseded editions by hash, filename, printed revision/date and page count. Similar names are not proof of duplicates.

### B. Page inspection and extraction
1. Determine whether text is embedded, scanned, or mixed.
2. Extract embedded text first; OCR scanned pages only as a secondary aid.
3. Keep page images/crops for every row or diagram needed to verify identity, fitment, codes, dimensions or price.
4. Capture table headers and units before extracting values. Never detach a number from its column heading or unit.
5. Preserve original wording and raw values in source fields. Put normalised/cleaned suggestions in separate fields.
6. Record page/row/callout provenance for every product field, not just one source page per file.

### C. Product identity and fitment
For each candidate row capture, where present:
- printed product name and description;
- every printed product, supplier, OEM and cross-reference code, with its source label;
- manufacturer/brand and exact model/variant;
- vehicle make/model/year/engine/application exactly as printed;
- dimensions, thread, voltage, current, connector/pin count, quantity, material and other technical specifications with units;
- source category/subcategory and diagram/callout;
- price, currency, VAT basis, pack quantity and validity/revision only if explicitly printed.

Do not invent missing fitments, model years, dimensions, code roles, pack sizes or equivalence. A likely match is a review candidate, not a verified match. Keep one row per distinct sellable variant where the source distinguishes variants.

### D. Electrocity-to-store mapping
1. Keep the source taxonomy and proposed Get Wired taxonomy in separate columns.
2. Map to the currently approved three-root storefront structure only when the product's function is clear. Otherwise use `CATEGORY_REVIEW`.
3. Do not create or rename store categories/subcategories.
4. Propose an internal provisional ID in the `GWA-EC-` namespace only for a distinct, reviewed record. Do not reuse an old ID for a different model/variant. Mark it `PROVISIONAL_NOT_IMPORTABLE` until duplicate and identity checks pass.
5. Keep every Electrocity identifier private. Customer-facing product data must never expose supplier codes, source URLs, internal mapping notes or supplier-only metadata.
6. Match against existing store products by exact manufacturer/model/variant and fitment evidence. Similar names or dimensions alone are insufficient. Record candidate matches separately; never auto-merge or overwrite an existing item.

### E. Images
1. Prefer the exact product image printed in or supplied with the same catalogue.
2. Record source page/image region and exact model/code evidence.
3. If a separate manufacturer image is researched, record its URL, manufacturer page title, exact model/variant match and retrieval date.
4. No generic, visually similar or adjacent-variant image may be assigned as verified.
5. Use states `VERIFIED_EXACT`, `CANDIDATE_REVIEW`, `MISSING` or `REJECTED_MISMATCH`. Do not alter live image paths.

### F. Pricing and availability
1. Capture only what the Electrocity source actually states: amount, currency, VAT inclusive/exclusive/not stated, price type, unit/pack basis, effective date and page.
2. Never infer that a printed number is cost, RRP or selling price unless the source labels it.
3. Do not import an ASC quote-only rule or another supplier's markup formula.
4. If price or VAT basis is absent/ambiguous, leave the commercial field blank and flag `PRICE_BASIS_REVIEW`.
5. Do not infer live stock or availability from catalogue presence. Missing stock stays unknown.

### G. QA and staging
Run deterministic checks for:
- source file/hash and page provenance on every row;
- unique provisional IDs and no accidental duplicate rows;
- exact code preservation, including leading zeros and multiple code roles;
- numeric values retain source units and valid parsing;
- fitment/model/variant conflicts are flagged;
- source taxonomy and proposed store taxonomy are separate;
- price/VAT basis is explicit or marked unknown;
- image evidence matches the exact model/variant or remains a candidate;
- no unsupported claims, supplier data leakage or live-write payloads.

Produce a review package under `suppliers/Electrocity/catalogue-work/<sample-name>/`:
- `source-manifest.json`
- `extracted-raw.csv`
- `normalised-review.csv`
- `page-evidence/` (only relevant crops/pages, with page numbers)
- `exceptions.csv`
- `qa-report.md`

Mark every output **REVIEW ONLY — DO NOT IMPORT**. Preserve raw extraction separately from corrected/normalised values. Do not delete or overwrite the existing `GLOWPLUGS_SKU_MAP.csv`; it is historical work and must not be silently treated as verified truth.

## 4. Required row-level review schema

Minimum columns:
`supplier`, `source_path`, `source_sha256`, `source_revision_date`, `source_page`, `source_row_or_callout`, `source_category`, `source_subcategory`, `printed_description_raw`, `normalised_description_candidate`, `brand`, `manufacturer_model`, `variant`, `code_1_raw`, `code_1_label`, `code_1_role_status`, `code_2_raw`, `code_2_label`, `code_2_role_status`, `additional_codes_json`, `vehicle_fitment_raw`, `dimensions_raw`, `specifications_json`, `price_raw`, `currency`, `price_type`, `vat_basis`, `pack_basis`, `stock_raw`, `image_source`, `image_match_status`, `proposed_store_root`, `proposed_store_subcategory`, `provisional_gw_id`, `existing_product_match_candidate`, `confidence`, `qa_status`, `review_notes`.

Do not leave a critical unknown disguised as a normalised value. Use explicit null/blank plus an exception status.

## 5. Jules execution prompt

> Work only on the Electrocity sample source explicitly assigned in this task. Read this workflow first, then verify the source path and blob SHA against the current repository. Do not assume the old supplier inventory is current. Begin with converters.pdf and inspect its pages/layout before extraction. Preserve the original PDF. Extract raw data with page-level provenance, then create a separate normalised review file. Preserve every printed code and its printed label; if a code role is not explicitly labelled, mark it UNCONFIRMED_ROLE. Do not guess fitment, technical values, category, image identity, price type, VAT basis or stock. Do not apply ASC rules or another supplier's pricing formula. Do not modify live product data, active flags, images, prices, stock, database records, storefront files, category structures, deployment settings or production. Do not merge/delete similar products. Generate the manifest, raw CSV, normalised review CSV, page evidence, exceptions CSV and QA report under the Electrocity catalogue-work sample folder. Mark all outputs REVIEW ONLY — DO NOT IMPORT. Run the QA checklist and report exact counts, failures, unresolved ambiguities and sample limitations. Stop before processing another catalogue or making any write outside the assigned review folder.

## 6. Pilot acceptance gate

The pilot passes only when:
- the sample source and hash are verified;
- every extracted row is traceable to a page/row/callout;
- every code is preserved and ambiguous roles are visibly unresolved;
- technical values and units are faithful to the source;
- exact model/variant and fitment are either evidenced or flagged;
- price/VAT/stock unknowns remain unknown;
- image assignments are exact or quarantined;
- duplicate and category checks are reproducible;
- all outputs are review-only and no live systems changed.

After the pilot passes, freeze the schema, prompt, QA rules and output format. Only then reuse the same workflow on the remaining Electrocity catalogues, one source at a time. Any new document layout or data convention requires an adapter change and a regression test before batch processing.
