# Electrocity pilot source change — 2026-11-07

Owner rejected `converters.pdf` as the pilot because it contains only about two items and is not representative.

The approved pilot is now a paired run of:
- `suppliers/Electrocity/Ignition Looms-Coils-Modules/(1)IGNITION MODULES.pdf` — expected blob SHA `5fdddd9bfeed32ac5c32263f724e8fd82db8583a`.
- `suppliers/Electrocity/Ignition Looms-Coils-Modules/IGNITION LOOMS.pdf` — expected blob SHA `0875d983b2b535a79b66c55e6d818bb1ffb7c098`.

Do not include `converters.pdf`, `IGNITION COILS.pdf`, or any other Electrocity PDF. Verify both hashes and inspect page count/layout before extraction. Keep the PDFs distinct in all row-level provenance even though they share one pilot package.

Created binding override: `suppliers/Electrocity/PILOT_SOURCE_OVERRIDE_2026-11-07.md` (commit `48b651c9ecc1625b0dde0676f4230cf66b8b4519`). It supersedes the earlier source choice in `JULES_CATALOGUE_WORKFLOW.md`; the rest of that workflow remains mandatory.

Updated [Issue #182](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/issues/182) to the paired modules-and-looms pilot, with the same hard deadline of 2026-11-10 inclusive and all review-only/QA restrictions.

The issue remains unassigned; creating/updating it does not prove Jules has accepted or started. Existing PR #181 remains draft and unmerged. No catalogue extraction, product writes or live store changes have occurred. Production remains HOLD.
