# Owner override — Electrocity pilot source selection (2026-11-07)

**This file is a binding update to Section 1 and Section 5 of `JULES_CATALOGUE_WORKFLOW.md` and supersedes the earlier instruction to pilot `converters.pdf`.

## Approved pilot sources
Use these two existing PDFs together as one paired pilot:
1. `suppliers/Electrocity/Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf` — expected Git blob SHA `5fdddd9bfeed32ac5c32263f724e8fd82db8583a`.
2. `suppliers/Electrocity/Ignition Looms-Coils-Modules/IGNITION LOOMS.pdf` — expected Git blob SHA `0875d983b2b535a79b66c55e6d818bb1ffb7c098`.

The owner notes `converters.pdf` contains only about two items and has therefore been rejected as too small to be a useful pilot. Do not spend the pilot window on it. Do not include `IGNITION COILS.pdf` in this pilot.

## Why this is the better pilot
The paired modules-and-looms sample is more representative and provides a better test of the extraction workflow across two related but distinct product groups. Treat the two PDFs as separate source documents inside one pilot package so each retains its own source hash, page provenance, raw extraction and exceptions. Do not combine ambiguous rows or lose which PDF a record came from.

## First inspection gate
Before extraction, verify both paths and blob SHAs against the current repository, record file sizes/page counts, and inspect the layout/text layer/OCR needs/product callouts. If either file is missing, changed, corrupt, or unsuitable, stop and report; do not silently substitute `converters.pdf`, `IGNITION COILS.pdf`, or any other source.

## Outputs
Use one pilot folder:
`suppliers/Electrocity/catalogue-work/ignition-looms-modules/`

Include one manifest describing both source files, and preserve source-level traceability in all row data. Raw and normalised CSVs may be combined only if every row includes exact `source_path`, `source_sha256`, `source_page` and `source_row_or_callout` values. Page evidence must be organised/named so the originating PDF is unambiguous.

All existing workflow requirements remain in force: above-picture number = OEM part number; below-picture number = private Electrocity SKU; research vehicle applications for every OEM number; keep outputs REVIEW ONLY — DO NOT IMPORT; no live store changes; do not process any other Electrocity PDFs before owner review.
