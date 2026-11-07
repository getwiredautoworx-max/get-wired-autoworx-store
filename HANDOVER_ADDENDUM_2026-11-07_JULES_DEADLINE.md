# Electrocity Jules deadline and task handoff — 2026-11-07

**Hard deadline: 10 November 2026 (inclusive). Jules is unavailable from 11 November 2026.**

## Task created
- GitHub task: [Issue #182 — Jules: Electrocity converters sample pilot](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/issues/182)
- Repository: `getwiredautoworx-max/get-wired-autoworx-store`
- First and only pilot source: `suppliers/Electrocity/converters.pdf`
- Expected source blob SHA: `07f68c7c42f5f524ccd3c2dc7a6a37a250381ae1`
- Mandatory operating procedure: `suppliers/Electrocity/JULES_CATALOGUE_WORKFLOW.md`
- Deliverables due by 10 November: review-only source manifest, raw extraction, normalised review CSV, page evidence, exceptions CSV and QA report under `suppliers/Electrocity/catalogue-work/converters/`.

## Mandatory owner-confirmed interpretation
- Number above product picture = OEM part number.
- Number below product picture = Electrocity SKU.
- Preserve both exact values with page/crop evidence. Electrocity SKU remains private and must not appear in customer-facing copy.
- Research vehicle applications for every OEM number, with cited sources, access dates and confidence-separated confirmed/corroborated/possible/unverified results.

## Scope and safety
- The task is a sample pilot only. Inspect `converters.pdf` suitability before extraction. If unsuitable, stop and report; do not switch PDFs without approval.
- Outputs must be labelled **REVIEW ONLY — DO NOT IMPORT**.
- No live products, prices, stock, images, database, storefront, categories, deployment or production changes.
- Do not modify `GLOWPLUGS_SKU_MAP.csv`, process other Electrocity PDFs, or interfere with the separately running ASC task.
- The pilot is not complete until the workflow acceptance gate and QA pass. Deadline pressure does not waive evidence or owner approval.

## Handoff status
- Issue #182 was created on 2026-11-07 with the full task prompt and deadline.
- The GitHub issue is currently unassigned. No Jules-specific GitHub username or direct Jules dispatch integration was available in the connected tools during this handoff. Therefore, issue creation records the task but does **not** prove Jules has accepted or started it. The owner/workstream operator must open Issue #182 in Jules and start the agent session if the Jules interface does not automatically ingest repository issues.
- Existing draft PR #181 remains open, draft and unmerged. Production remains HOLD.
