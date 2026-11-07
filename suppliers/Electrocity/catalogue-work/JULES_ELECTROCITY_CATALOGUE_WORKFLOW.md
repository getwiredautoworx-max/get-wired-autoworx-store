# Electrocity catalogue workflow — Jules operating standard

**Status:** PILOT RULESET — review-only; DO NOT IMPORT / DO NOT PUBLISH  
**Owner scope:** Electrocity supplier catalogues only. This is a separate workflow from ASC, Planetworld and Audio Connections.  
**First pilot:** `suppliers/Electrocity/Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf`  
**Branch for this workflow:** `docs/electrocity-jules-workflow-pilot-2026-11-07`

## 1. Authority and hard boundaries

1. Follow `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md`, the newest owner instructions, and the latest handover entries. The expected legacy `AI_HANDOVER_PERMANENT.md` was not found at repository root on the inspected `main` tree; do not invent or claim to have read it.
2. Electrocity has owner-authorised catalogue review/preparation only. This does not authorise live stock, price, product, database, storefront or production changes.
3. Keep every output review-only and visibly label it **DO NOT IMPORT — OWNER REVIEW REQUIRED**.
4. Never edit, replace, rename, delete, compress over, or watermark the supplier's original catalogue files. Preserve source files byte-for-byte.
5. Do not copy ASC-specific processing rules into Electrocity. In particular, ASC watermark instructions apply only to ASC assets; do not add an ASC watermark to Electrocity material.
6. Never expose Electrocity's supplier name, supplier codes, source filenames, supplier pricing or internal matching notes on customer-facing pages. Supplier identifiers stay in private review files only.
7. No supplier cost or selling price is supplied in this pilot source set. Do not infer or invent either. Leave price state as `UNPRICED_OWNER_REVIEW`; do not publish a zero price or a guessed price.
8. No automated import, database write, product activation, public JSON change, category move, duplicate deletion, merge, deployment or production action.

## 2. Pilot objective and stop condition

Process **only** the ignition modules PDF end-to-end as a controlled sample. Do not start ignition coils, ignition looms, converters, glowplugs or any other Electrocity catalogue until the owner has reviewed the pilot and the workflow/schema has been frozen.

The pilot must demonstrate:
- complete page inventory and traceable extraction;
- exact product/model/variant identity with confidence and evidence;
- image-to-product matching without substitutions;
- mapping to the current approved three-main-category storefront hierarchy;
- internal Get Wired AutoWorx SKU proposals without publishing supplier codes;
- customer-copy drafts based only on verified source facts;
- a machine-checkable QA report and a human-readable exception report;
- a clearly separated staging package marked DO NOT IMPORT.

If the PDF is unreadable, pages are missing, extraction cannot be verified, or product/image identity is ambiguous, stop that row and report the precise issue. Do not fill gaps by guessing.

## 3. Intake and source integrity

Create one intake record containing:
- supplier identifier (private only): Electrocity;
- exact repository-relative source path and Git blob SHA;
- file size, PDF page count, filename, and any printed revision/date;
- processing timestamp and tool/version used;
- SHA-256 of the downloaded source where the environment permits;
- page-level extraction status and any duplicate/older-version warning.

Record each product against the exact PDF page number. Keep the source PDF and its page/image reference available for every row. Never silently mix files from a different revision.

## 4. Extraction and identity rules

For every candidate product, capture the source wording before normalising it. Keep source facts and generated suggestions in separate fields.

Required internal fields:
- `source_file`, `source_blob_sha`, `source_page`, `source_row_or_position`;
- `manufacturer`, `exact_model`, `variant_or_revision`, `printed_part_numbers`;
- `application_or_fitment_as_printed`;
- `technical_specs_as_printed`;
- `source_description_verbatim`;
- `extraction_method`, `extraction_confidence`, `identity_status`, `evidence_note`.

Rules:
- Preserve every printed code exactly, including punctuation, leading zeroes and suffixes. Do not assume what a code means (EAN, MPN, supplier SKU, cross-reference) unless the source explicitly labels it or authoritative manufacturer evidence confirms it.
- Never infer fitment from a similar model, engine, photograph, adjacent row or memory. Record only the exact application shown in the source or independently verified evidence.
- Do not merge two rows because names or pictures look similar. Different suffixes, revisions, dimensions, voltages or applications are potential variants until proven identical.
- Where OCR is used, visually compare each extracted row with the PDF page. OCR text alone is not identity proof.
- Keep uncertain text verbatim with an uncertainty flag; do not silently correct it.

Identity states: `VERIFIED_SOURCE`, `VERIFIED_MANUFACTURER`, `PARTIAL`, `AMBIGUOUS`, `UNREADABLE`. Only the first two may pass the identity gate.

## 5. Image reconciliation

1. Use the matching product image from the same catalogue page first.
2. If a manufacturer source is needed to resolve identity, record the exact URL/page, access date, model evidence and whether the image is actually for the same variant.
3. A visually similar image is not a match. No generic placeholder, AI-generated product image, marketplace image or adjacent-product image may be substituted.
4. Keep an image provenance record: source page/URL, model shown, match status, original dimensions, crop/transform performed and rights/permission status.
5. Prepare a clean product image only from an exact matching source asset. Preserve the product fully; do not crop off connectors, terminals, labels or identifying features. Remove catalogue page background/text only where this can be done without altering the product or hiding meaningful details.
6. Never put product descriptions, prices, SKU labels or marketing text over the product image. Product copy belongs in separate storefront text fields.
7. If exact match or reuse permission is uncertain, mark the image `WITHHELD_REVIEW` and do not stage it as approved.

## 6. Category mapping

- Inspect the current approved storefront category hierarchy in the active repository before mapping.
- Use the existing three-main-category architecture and its current subcategories; do not revive the obsolete eight-category tree or invent new categories.
- Record both `proposed_category_path` and `category_status`. Do not move or publish a product.
- If the product does not clearly fit the current hierarchy, set `CATEGORY_OWNER_DECISION` and explain why.
- Keep vehicle-specific fitment data separate from general product category data.

## 7. Get Wired product preparation

Prepare one proposed GW record per distinct verified product/variant:
- proposed `gw_sku` using the repository's current approved SKU convention (inspect the convention first; do not assume a prefix);
- customer-facing title with manufacturer and exact model/variant where verified;
- concise customer description based only on verified facts;
- technical specifications and fitment as separate structured fields;
- exact matched image reference or explicit missing-image status;
- proposed category path and confidence;
- price state `UNPRICED_OWNER_REVIEW`;
- stock state `UNKNOWN_NOT_IMPORTED`;
- publication state `DO_NOT_IMPORT`.

Do not put Electrocity or supplier part codes in customer-facing title, description, image, URL, metadata or structured public product data. Retain those codes only in private source reconciliation files.

## 8. Output package and schema

Create outputs under `suppliers/Electrocity/catalogue-work/pilots/ignition-modules/` only:
- `intake.json` — source metadata, integrity and page count;
- `products.csv` — one row per candidate product, with all source traceability, identity, image, category, proposed GW fields and status columns;
- `image_manifest.csv` — one row per image candidate with provenance, model match, dimensions and rights status;
- `exceptions.csv` — every ambiguity, missing field, mismatch, OCR uncertainty, category question or rights issue;
- `qa_report.md` — counts, checks, pass/fail results, sample page references and unresolved blockers;
- `review_preview/` — optional static, local/review-only contact sheet or HTML report; never connected to the live store.

CSV must use UTF-8, stable column names, quoted fields where needed, and one product/variant per row. Do not store a list of several distinct products in one cell. Every output row must include source file and page.

## 9. Mandatory QA gates

A product row can be marked `PILOT_PASS_REVIEW_ONLY` only when all applicable checks pass:
- source file and page traceability present;
- exact model and variant visibly supported;
- all extracted codes and specs visually checked against source;
- fitment copied exactly or manufacturer-verified;
- image demonstrably matches exact model/variant and is not rights-unclear;
- category maps to current hierarchy without automatic movement;
- proposed GW SKU is unique within the candidate set and follows the inspected convention;
- customer copy contains no unsupported claims or supplier/internal codes;
- no invented price or stock;
- image has no overlaid catalogue description and no important product part is cropped;
- all unknowns are explicitly flagged.

The QA report must state total pages, candidate rows, passed rows, held rows, missing/uncertain images, identity exceptions, category exceptions, and pricing/stock status. Include deterministic validation results for duplicate proposed GW SKUs, missing mandatory fields, leaked supplier identifiers in customer-facing fields, and invalid status values.

No overall pilot pass if any row is silently omitted, any page is unaccounted for, or any failed gate is reported as passed.

## 10. Jules execution protocol

Jules must:
1. Read the owner directives, this workflow, current handover and latest relevant supplier notes before acting.
2. Work only on the dedicated Electrocity pilot branch; do not touch PR #178/audio, ASC branches, storefront architecture, live product data or another supplier's files.
3. First inspect the source PDF and report page count, layout, row count estimate and extraction method before bulk extraction.
4. Process only the ignition modules PDF. Commit the complete review package and QA evidence.
5. Run local deterministic checks and inspect representative pages/images manually. Record exact commands and outcomes.
6. Update the handover with branch, commit SHA, file paths, counts, tests, exceptions and next action.
7. Stop and request owner review. Do not proceed to the next Electrocity catalogue until explicitly authorised after pilot review.

## 11. Pilot acceptance checklist

- [ ] Source PDF unchanged; source path and blob SHA recorded.
- [ ] Every page accounted for; page count reconciled.
- [ ] Every product candidate has source page and exact identity status.
- [ ] OCR/extraction visually checked.
- [ ] Images exact-match, provenance and rights status recorded.
- [ ] Current category hierarchy inspected; unresolved mappings held.
- [ ] GW SKU convention inspected; proposals unique and private.
- [ ] No supplier codes/names leak into customer fields.
- [ ] No guessed price, stock, fitment or product feature.
- [ ] QA report and exceptions report complete.
- [ ] All outputs marked DO NOT IMPORT / review-only.
- [ ] Exact branch/commit and test evidence recorded in handover.
- [ ] Owner has reviewed and accepted the pilot before scale-out.

**Current pilot status:** NOT STARTED. This document defines the workflow; it is not evidence that the PDF has been extracted or the pilot has passed.
