# Supplier catalogue workspaces

Each supplier has an isolated workspace so incoming XLSX files can be processed, categorised, reviewed and updated without mixing supplier-specific stock, product codes or terms.

## Structure

- `planetworld/` — Planetworld audio/video catalogue pilot and parallel-store source.
- Add one folder per additional supplier using the supplier's own name.
- Audio brand/product classification can live beneath the supplier workspace or in the existing `catalogue-source/audio/` brand workspaces when that separation is useful.

## Data safety

This repository is public. Never commit raw supplier workbooks or supplier-confidential dealer costs, wholesale prices, discounts, stock feeds, account identifiers or trading terms. Keep original workbooks in private authorised storage. Commit only owner-approved, sanitised product extracts and non-confidential reports.

A supplier folder is a working boundary, not permission to change the live store. All source data remains separate until the owner approves a deliberate integration.


## Standard subfolders (required for every supplier)

Each supplier workspace uses the same five boundaries:
- `incoming-xlsx/` — folder marker and intake instructions; raw confidential workbooks stay private while this repository is public.
- `processed/` — sanitized, owner-approved outputs only.
- `exceptions/` — unresolved fields, duplicates, classification issues and QA.
- `image-matches/` — exact model-to-manufacturer image evidence and verification status.
- `handover/` — supplier-specific progress, blockers and next action.

Created workspaces on branch `feature/planetworld-parallel-store-2026-10-25`:
- Planetworld: `planetworld/`
- Hertz: `hertz/`
- Reusable template: `TEMPLATE/`

For every additional supplier, copy the template and rename it to the supplier slug. Do not mix source workbooks between suppliers. Do not merge this branch or integrate generated products into the live store without owner approval.
