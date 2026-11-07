# Electrocity catalogue workflow and Jules pilot handover — 2026-11-07

**Branch:** `docs/electrocity-jules-workflow-pilot-2026-11-07`  
**Base inspected:** `main` at `3e64d08a0c7c1ce124bdb1fb6db6c26905ec0717`  
**Status:** Workflow and task brief committed on isolated documentation branch. Electrocity pilot itself NOT STARTED. No PR, merge, import or deployment created.

## Owner intent clarified

The owner wanted the assistant to establish the workflow and operating rules using one Electrocity catalogue as a pilot, then hand the proven process to Jules for repeatable execution. This is not a request to immediately bulk-process all Electrocity files or simply ask Jules to extract a PDF.

## Repository and instruction inspection

- Read `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md` from main.
- Read the latest relevant `HANDOVER_CURRENT_ADDENDUM_2026-11-06_AUDIO_PROGRESS.md`.
- Read `HANDOVER_CURRENT.md`.
- The expected `AI_HANDOVER_PERMANENT.md` was not present in the inspected main tree; do not claim it was read.
- Inspected the recursive Git tree for `suppliers/Electrocity/`. Confirmed the ignition-modules pilot source exists at `suppliers/Electrocity/Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf` (342,493 bytes; Git blob `5fdddd9bfeed32ac5c32263f724e8fd82db8583a`).
- Other currently tracked Electrocity source PDFs include `IGNITION COILS.pdf`, `IGNITION LOOMS.pdf`, and `converters.pdf`. They are deliberately out of scope for this first pilot.
- The historical `GLOWPLUGS_SKU_MAP.csv` remains reference data only; it is not the pilot source.

## Workflow documents committed

1. `suppliers/Electrocity/catalogue-work/JULES_ELECTROCITY_CATALOGUE_WORKFLOW.md`
   - Full repeatable catalogue SOP: intake, source integrity, extraction, identity/variant verification, image provenance/rights, category mapping, GW SKU preparation, price/stock handling, QA gates, review-only staging, stop conditions and pilot acceptance.
2. `suppliers/Electrocity/catalogue-work/JULES_PILOT_TASK_PROMPT.md`
   - Copy-ready task instructions for Jules, limited to the ignition-modules PDF and the dedicated branch.
3. This handover addendum.

## Binding Electrocity rules

- Separate from ASC, Planetworld and Audio Connections workflows.
- Catalogue-only, review-only; every output DO NOT IMPORT / OWNER REVIEW REQUIRED.
- Preserve source files unchanged.
- No guessing product identity, code role, variant, fitment, specifications, image match, category or SKU convention.
- Inspect the current three-main-category hierarchy and existing GW SKU convention before proposing mappings/SKUs.
- Supplier codes/names remain internal and must not leak into customer-facing data.
- No price/cost or stock was established for this pilot source set; do not invent values. Price state remains `UNPRICED_OWNER_REVIEW`, stock state `UNKNOWN_NOT_IMPORTED`.
- Do not apply ASC-specific watermark rules to Electrocity.
- No live catalogue/database writes, product activation, import, merge, deployment, DNS, hosting, payment or production action.
- Do not process coils, looms, converters, glowplugs or any other catalogue until the owner reviews and explicitly accepts the pilot.

## Git evidence

- Workflow SOP commit: `11e533e7218e831b17f72efdec6d4520be30aa6e`
- Jules task prompt commit: `4b6869862a8d43c0954d632a114444e4179121b2`
- Branch created from main: `docs/electrocity-jules-workflow-pilot-2026-11-07`

## Current status and next action

**Workflow definition: committed. Jules execution: not started. Pilot extraction/QA: not started.**

Next: hand Jules the branch and the prompt in `JULES_PILOT_TASK_PROMPT.md`. Jules must work on this dedicated branch, complete only the ignition-modules pilot package, run the specified checks, and update the handover with exact evidence. Return the pilot to the owner for review. Only after explicit owner acceptance should the schema/rules be frozen and the next Electrocity catalogue authorised.

No PR was opened, no code or live product data changed, and production remains HOLD.
