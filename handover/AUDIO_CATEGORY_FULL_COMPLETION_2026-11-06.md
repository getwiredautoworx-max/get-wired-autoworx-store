# Audio Category Full-Completion Work Session — 2026-11-06

Owner instruction: continue until the entire audio category is up to standard.

## Authority and boundaries
- Read and followed `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md`, `HANDOVER_CURRENT.md`, task queue and PR #178 state before resuming.
- Existing PR #178 remains OPEN / DRAFT / UNMERGED. Production HOLD.
- All catalogue enrichment remains private/review-only. No live product, price, stock, supplier activation, database, payment, DNS, Axxess or production changes.
- Functional testing remains deferred until owner adds banking details.

## Starting evidence
- Planetworld Car Audio staging: 702 source rows; 290 One/OneNav rows.
- Detailed OneNav audit: 45 model rows; 45 descriptions marked verified; 39 image-pending; 6 owner-preview candidates. Candidate images are not final approved assets.
- Rule-based triage of 245 OneNav rows not represented in the detailed audit: 123 harness/trim/wiring, 11 camera-related, 5 brackets/mounting accessories, 106 unresolved/other. These are provisional classifications only; every row retains original source identity and requires manual validation where ambiguous.
- Current review prototype deliberately withholds pictures, descriptions and GW SKUs pending verification; it is not a customer-ready catalogue.

## Execution sequence
1. Reconcile all 290 OneNav rows and resolve every source row as a sellable model, component, bundle/alias, duplicate candidate or unresolved exception.
2. Verify exact model/variant descriptions and usable-resolution images, recording source page, asset provenance and usage-rights basis. Reject wrong variants and generic substitutions.
3. Assign collision-checked GW SKUs and correct department/component categories. Keep marine, harness/trim, Home Audio/Cinema and Studio/Music out of Car Audio brand lists.
4. Add deterministic catalogue completeness tests (identity, description, image, image dimensions, SKU, category and prohibited supplier metadata) before owner review.
5. Only after OneNav is complete and reviewable, repeat the same end-to-end process across the remaining approved audio brands and sources.
6. Rebuild and verify an owner preview only after the exact-head build/test/deployment path is observable and succeeds. Preview does not equal owner acceptance.

## Current state
Work has started with source reconciliation and image/description audit. No product data was published or changed. Do not claim the audio category or OneNav complete until all source rows and all quality gates are closed with evidence.
