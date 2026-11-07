# Jules task — Electrocity ignition-modules catalogue pilot

Repository: `getwiredautoworx-max/get-wired-autoworx-store`  
Branch: `docs/electrocity-jules-workflow-pilot-2026-11-07`  
Pilot source: `suppliers/Electrocity/Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf`  
Operating rules: read and obey `JULES_ELECTROCITY_CATALOGUE_WORKFLOW.md` in the same folder before doing anything.

## Objective

Run one end-to-end, review-only pilot on the ignition modules catalogue. Prove the extraction, exact identity, image reconciliation, category mapping, private GW SKU preparation and QA process before any other Electrocity catalogue is processed.

## Required sequence

1. Read:
   - `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md`;
   - `HANDOVER_CURRENT.md` and the newest relevant addenda;
   - `suppliers/Electrocity/README.md`;
   - `suppliers/Electrocity/catalogue-work/README.md`;
   - `JULES_ELECTROCITY_CATALOGUE_WORKFLOW.md`.
   The expected root file `AI_HANDOVER_PERMANENT.md` was not present in the inspected main tree. Do not claim it was read.
2. Confirm you are on this dedicated branch. If it does not exist or has unexpected changes, stop and report; do not create a competing branch.
3. Inspect the ignition modules PDF first. Record exact source blob SHA, page count, printed revision/date if present, page layout and estimated product-row count. Do not start another catalogue.
4. Extract and visually verify each candidate product against its exact source page. Record all codes exactly, but do not guess code roles, fitment, features or variants.
5. Match images to exact model/variant. Do not substitute lookalikes, generic imagery or AI images. Record provenance and rights status; withhold uncertain images.
6. Inspect the current storefront's approved three-main-category hierarchy and current GW SKU convention before proposing category paths or SKUs. Do not revive obsolete categories.
7. Prepare the review-only package exactly as specified in the workflow under `suppliers/Electrocity/catalogue-work/pilots/ignition-modules/`.
8. Run the deterministic validations specified in the workflow. Visually inspect representative pages and every exception. Account for every page and every extracted row.
9. Mark all outputs **DO NOT IMPORT — OWNER REVIEW REQUIRED**. No public/customer data, live stock, prices, database writes, product activation, import, merge, deployment, DNS, hosting, payment or production changes.
10. Update the current handover with actual branch, commit SHA, exact file paths, page/row counts, QA commands/results, held rows, unresolved exceptions and next action.

## Stop conditions

Stop without guessing if the PDF cannot be accessed or parsed, any pages are missing, product identity/variant is ambiguous, image rights are unclear, the category hierarchy or SKU convention cannot be established, or branch isolation is compromised. Report the exact blocker and evidence.

## Definition of done

The pilot is done only when the complete source-to-staging package exists, every page and row is accounted for, all QA checks and visual inspections are documented, all unresolved issues are visible in exceptions, and the handover records the exact commit. Even then, the result is **pilot ready for owner review only**. Do not process the next Electrocity catalogue until the owner explicitly accepts the pilot and authorises scale-out.

## Isolation

Do not edit or cherry-pick into PR #178, audio/Planetworld/Audio Connections work, ASC catalogue work, production, or the live storefront. Do not merge this branch. Keep all supplier codes and internal provenance out of customer-facing fields.
