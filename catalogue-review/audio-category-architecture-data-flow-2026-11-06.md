# Audio Category Architecture & Catalogue Data Flow — 2026-11-06

Status: architecture review only; no live category changes.

## Authoritative storefront structure observed on the active integration branch

The latest owner directive requires three main storefront categories. The current generated category tree contains three root categories, including `Audio, Entertainment & Music` (`1a13bc42-4f54-44f6-9658-36d141b77f4b`). Its current children are:

- Car Audio & Video (`e3d19d20-fb46-426c-9f64-221d863add0b`)
  - Speakers & Component Kits
  - Subwoofers
  - Amplifiers
  - Head Units & Media Players
  - Cameras & Monitors
  - Signal Processing & Crossovers
  - Accessories
- Home Entertainment (`07b76301-da5c-4810-a19f-d8b6e2ae2f06`)
- Band Equipment (`862605ef-5223-4525-aad6-ee17c2c6f9e7`)
- DJ Equipment (`83ea8ae6-a464-40a2-a503-272792f70be8`)
- Instruments (`76aee522-bf0e-4e7e-809c-e5c31afd3f6b`)
- Lifestyle (`f91c7c30-82b4-42d4-bf4f-e807172cedc4`)
  - Vacuum Cleaners
  - Pool Cleaners

The generated tree currently reports zero direct active products on the audio root and its children. This is not proof that the underlying database has no inactive or unassigned audio products, but it does mean the generated tree provides no evidence of a populated active customer catalogue in those categories.

## Department separation required by the owner's audio instructions

- Car Audio & Video: vehicle head units, speakers/components, amplifiers, subwoofers, signal processing, cameras/monitors, vehicle-specific harnesses and fitment accessories.
- Home Entertainment: home theatre, hi-fi, soundbars, AV receivers and home speakers.
- Studio Equipment: microphones, mixers, recording interfaces, studio monitors and PA equipment. The current tree has no explicit Studio Equipment child; retain it as a proposed mapping gap rather than forcing it into unrelated DJ or Band categories.
- Marine Audio: marine-specific speakers, subwoofers, amplifiers, head units, remotes and installation items. The current tree has no explicit Marine Audio child; keep marine records out of Car Audio brand/product listings until an owner-approved category mapping is recorded.
- Band Equipment, DJ Equipment and Instruments remain distinct navigation choices; do not mix band instruments into Car Audio.

No category node is being added, renamed, activated or moved by this report. Resolve the Studio and Marine placement in the non-production mapping before any catalogue preview is presented as complete.

## Repeatable supplier catalogue flow

1. Intake: source workbook/catalogue revision, supplier, file, sheet/page and source row.
2. Extraction: retain exact original description, source model/code, page/sheet and source image pointer.
3. Identity: verify manufacturer, exact model, generation/variant, bundle contents and vehicle fitment.
4. Image: exact product/variant image, usable resolution, clean crop, source page and reuse/permission evidence.
5. Merchandising: assign department, brand and product-type grouping using the current hierarchy or explicitly approved proposed mapping.
6. Customer data: concise supported title/description/specifications; collision-checked GW SKU; supplier identifiers and internal source notes remain private.
7. QA: fail missing identity, description, approved image, SKU, category, provenance, rights or privacy checks.
8. Output: private DO NOT IMPORT staging and one consolidated non-production preview only after QA. No database writes, live price/stock changes or supplier activation.
9. Owner review: verify the hosted exact-head preview, then request acceptance. Functional transaction testing stays last, after banking details.

## Current representative catalogue and blockers

Planetworld's Car Audio staging is the current representative catalogue (702 rows: 627 Car Audio brand product rows, 28 Marine Audio rows, 47 harness/trim rows). OneNav is the first brand-level reconciliation batch. The 245 unmatched OneNav source rows are now preserved in `catalogue-review/onenav-245-unmatched-row-triage-2026-11-06.csv`; its keyword groupings are provisional only. Exact image gaps and source identity are not resolved by the triage.

The cross-brand audit report is `catalogue-review/audio-image-description-approval-gap-report-2026-11-06.md`. It records that manufacturer page/collection matches are not approved image assets and that binary image capture/rights, customer descriptions, GW SKU mapping and complete row reconciliation remain open.
