# Staged storefront root filter validation — 2026-10-14

## Candidate
- Branch: `qa/category-root-fix-2026-10-14`
- Source base: `cc358d6441c01eea62eed02e9ed552e0508094fe` (main at branch creation)
- Category page change commit: `ccf519b6c5608101b4b85790f679eeedaa867635`
- Scope: `category.html` only; remove the legacy `Spare Parts` entry from the hard-coded top-level ROOTS list. No database or live Axxess files changed.

## Static checks
- ROOTS entries before fix: 9.
- ROOTS entries after fix: 8.
- Approved roots retained: Auto Electrical; Vehicle Security; Car Audio; Accessories; Marine Spares & Accessories; Tools / Hardware / Consumables; Camping / Leisure / Outdoors; Trailer & Canopy.
- Legacy `Spare Parts` remains in database and category snapshot, but is not shown as a storefront top-level category by this candidate.
- The 565 products beneath legacy `Spare Parts` are separately inventoried in `staging/CATEGORY_OUTSIDE_HIERARCHY_CANDIDATES_2026-10-14.csv`. They are not silently reassigned by this UI-only change.

## Required branch QA before controlled sync
1. Open category page on desktop and mobile; confirm exactly 8 root cards and Auto Electrical remains present.
2. Click all 8 roots and verify populated subcategory/product routes.
3. Confirm no empty root card and search/category links work.
4. Keep all 565 legacy-root products out of root navigation until per-row category decisions are approved; additionally prevent out-of-scope products from surfacing in general product search if owner approves that catalogue exclusion.
5. Do not merge/deploy this branch before row-level product disposition and image/price gates are signed off.


## Automated branch browser QA result
- GitHub Actions run: 38625347515 — SUCCESS.
- Candidate SHA tested: 4d6733cd5bd47f8d5ce9a8c33091a8de2d54ff37.
- Desktop: `CATEGORY_CANDIDATE_PASS desktop roots=8 all_root_links=8`.
- Mobile: `CATEGORY_CANDIDATE_PASS mobile roots=8 all_root_links=8`.
- The test opened the local candidate page at both viewports, asserted exactly the eight approved root labels, asserted the legacy Spare Parts root is absent, clicked all eight root cards, verified routes remained category/products paths, and found no browser page errors.
- This is a branch-local static-browser test against the repository category snapshot; it is not a test of the live Axxess deployment and does not approve the 565 products for sale.
- Run URL: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38625347515
