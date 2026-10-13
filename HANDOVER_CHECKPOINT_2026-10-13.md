# Get Wired AutoWorx — Handover Checkpoint
Date: 13 October 2026, 19:05 SAST

## Current task
Continue mobile and category-navigation acceptance testing on staging. Do not restart the catalogue, do not deploy staging changes to the live Axxess store, and do not spend Cloudflare/Netlify credits or rebuild unnecessarily.

## Verified checkpoint
- Repository: https://github.com/getwiredautoworx-max/get-wired-autoworx-store
- Working staging branch: `audit/buyer-guide-extraction`
- Latest test-related commit at checkpoint: `03cd8d9e229e4f22a899744559b477a3a7df9180`
- Prior mobile layout change: `0041a9d02a354846816c4303b838de68818bc18c` (390px width constraints, long category-name wrapping, subcategory grid adjustments).
- GitHub Actions run #3, “Staging Category Navigation Chromium Acceptance”: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435206322
- Latest check: Chromium acceptance run #3 completed successfully (status `completed`, conclusion `success`) at 17:03:22Z. Checkout, Node setup, Playwright install, Chromium install, and `node scripts/test-staging-category-navigation.cjs` all completed successfully. Evidence: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435206322. No downloadable artifacts were attached and the current connector did not expose the stdout payload; do not invent exact measurements/counts beyond the successful exit and checked-in assertions.
- Separate buyer-guide extraction workflow run #49 completed successfully on the same commit. This is not proof of storefront acceptance.

## Acceptance requirements still to verify
1. No horizontal overflow at 390px viewport.
2. Desktop and mobile category navigation works.
3. All 8 main categories are present.
4. All 71 expected subcategories are present and open from the correct parent.
5. Back navigation returns to the expected parent/category screen.
6. No legacy catalogue products are surfaced in the staging category flow.
7. Capture browser console errors and any overflowing elements from the acceptance output.

## Catalogue and deployment safeguards
- Category hierarchy and mapping must be validated before the full catalogue import.
- Keep the new catalogue work reversible; do not delete or alter live/old database records as part of this UI test.
- Product mappings/SKUs are not approved for production merely because they appear in a buyer guide.
- Do not upload to Axxess until staging acceptance and visual QA are complete. Live Axxess site remains untouched by this staging change.
- Build in staging/Axxess-first workflow, then make one coordinated final sync to GitHub, Supabase SQL, and hosting only after validation.
- Preserve the existing approved category structure: Auto Electrical Spares; Vehicle Security; Car Audio & Entertainment; Automotive Accessories; Marine Spares & Accessories; Tools, Hardware & Consumables; Camping, Leisure & Outdoors; Trailer & Canopy.
- Catalogue pricing policy: August–September and later guides are current/live pricing and availability to confirm; July and earlier are “subject to price and availability confirmation,” unless the exact same SKU is verified in an August-or-later guide.
- Existing legacy catalogue is not to be recovered/reused as the new catalogue. User is building a clean catalogue from the buyer guides and other supplier sources.

## Immediate next actions
1. Poll the linked GitHub Actions run until it finishes; read the job output/artifacts.
2. If it fails, diagnose the exact failing assertion and fix only the staging test or UI issue; commit to `audit/buyer-guide-extraction` and rerun.
3. If it passes, record the pass and run visual/manual mobile checks on the staging preview at 390px and desktop width.
4. Update this checkpoint with the actual test outcome and commit SHA.
5. Only after acceptance is green, continue category-to-subcategory reconciliation and catalogue mapping; do not perform a production upload yet.

## Current status
- Mobile/category-navigation automated acceptance: PASS (run #3, ID 38435206322, tested commit `03cd8d9e229e4f22a899744559b477a3a7df9180`).
- Visual/manual mobile and desktop QA: NOT YET VERIFIED; this is the immediate next task.
- Category hierarchy: automated navigation acceptance passed; continue category-to-subcategory reconciliation before catalogue import.
- Full catalogue import: not started / must not be restarted or rushed.
- Production Axxess deployment: unchanged; no staging changes deployed.

## Monitoring and continuation
- Permanent handover updated with this outcome in `AI_HANDOVER_PERMANENT.md` (commit `a0b8bd443b4eb6ee9cf395961dce57a1279b66fd`).
- Daily automation `Monitor Get Wired Store Tasks` was updated to include this workflow and handover discipline. It runs on a daily schedule; this does not mean continuous/hourly monitoring between runs.
- Next exact action: inspect latest workflow runs for regressions, then perform visual/manual QA at 390px and desktop width. Keep Axxess production untouched.


## Background task monitor update — 19:08 SAST
- Staging Category Navigation Chromium Acceptance #3: **PASS**, run ID `38435206322`.
- GitHub Pages build/deployment #978: **PASS**, run ID `38435796239`. This is Pages only, not Axxess production.
- Buyer-guide text extraction #50: **PASS**, run ID `38435893489`; extraction/OCR steps and audit-branch commit completed.
- Storefront Smoke Test #668: **IN PROGRESS**, run ID `38435448619`; Playwright setup passed, staging category browser test remains active.
- Storefront Smoke Test #667: **IN PROGRESS**, run ID `38435403130`; Playwright setup passed, staging category browser test remains active.
- Smoke-test links: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435448619 and https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435403130
- The current connector exposes no downloadable artifacts/stdout for these runs. No conclusion is claimed for either smoke test while it is in progress.

Immediate next action: poll smoke runs #668 and #667 to completion and inspect their conclusions; if they remain active unusually long, investigate the running browser-test step rather than launching more duplicate tests. Then perform separate visual/manual mobile QA. Keep Axxess production untouched.


## Completion update — 19:10 SAST
- Storefront Smoke Test #668 (run ID `38435448619`): **PASS**. Browser category navigation, verified-price checkout gate, and local storefront smoke test all succeeded. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435448619
- Storefront Smoke Test #667 (run ID `38435403130`): **PASS**. Browser category navigation, verified-price checkout gate, and local storefront smoke test all succeeded. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435403130
- These are staging/local tests only; they do not verify real payment processing or mean the Axxess production site was deployed.
- Permanent handover latest update commit: `8050ff340ddf8239b16ee4a65678f626ce07aa9a`.

Next: inspect newest Actions list for any newly triggered jobs; do visual/manual 390px and desktop QA with evidence, then continue category reconciliation. Preserve catalogue and leave Axxess untouched.


## Final monitor pass — 19:12 SAST
- Buyer-guide extraction runs #50 (ID `38435893489`), #51 (`38436264146`), #52 (`38436393331`), and #53 (`38436501582`) all completed successfully.
- Repeated extractions were triggered by handover/workflow-only commits. Workflow `.github/workflows/extract-buyer-guides-staging.yml` now excludes both `AI_HANDOVER*.md` and its own workflow file in `paths-ignore`. Fix commits: `0c4b4a2e1e0f92c50f36241f0005ff8e1bf6bf3e` and `017df2a492a2948b53f393b17bf0b9a4017d6aae`. The latest Actions list had no run after #53, so no extra extraction was triggered by the final fix.
- Permanent handover current commit: `e64141c1904823820d01b009b3298feb4a4c812c`.
- Automated staging category acceptance #3: PASS.
- Storefront Smoke Tests #667 and #668: PASS, including verified-price checkout gate and local storefront smoke test.
- GitHub Pages deployment #978: PASS (not Axxess).
- Manual visual QA at 390px and desktop remains outstanding. Real payment provider and live production checkout readiness remain unverified.

Next precise action: access the staging preview and perform visual/manual QA; record actual observations. Then continue category/subcategory reconciliation before catalogue import. No production Axxess changes have been made.


## Continuation update — 13 October 2026, current session

### Background tasks verified
- GitHub Actions latest run scan returned 20 recent runs; all returned runs were completed. No queued or in-progress run appeared in this latest page.
- Staging Category Navigation Chromium Acceptance #3: PASS, run ID 38435206322, tested commit 03cd8d9e229e4f22a899744559b477a3a7df9180. The test command exited successfully. Run link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435206322.
- Storefront Smoke Test #668: PASS, run ID 38435448619, commit 68cfeb1f; #667: PASS, run ID 38435403130, commit 9be92c3a. These are local/staging smoke tests, not live payment or Axxess verification.
- GitHub Pages deployment #978: PASS, run ID 38435796239, commit a2cf53f8; #977 also passed. This does not prove the Axxess production store changed.
- Buyer-guide extraction runs #50–#53 (IDs 38435893489, 38436264146, 38436393331, 38436501582): all PASS. Run #53 is the latest, commit 0c4b4a2e1e0f92c50f36241f0005ff8e1bf6bf3e.
- No newer run appeared in the latest 20-run scan. No production deployment, DNS change, payment change, or catalogue import was performed.

### Visual QA status
- Manual visual QA remains **NOT VERIFIED**. The connected GitHub Actions result confirms automated tests only; no screenshot artifacts were attached to run #3, and this session has not independently inspected a live mobile/desktop rendering. Do not upgrade this status based solely on green CI.
- Next QA path: create or use a staging-only screenshot capture that saves mobile 390px and desktop 1280px screenshots as workflow artifacts, then inspect them before approving any production upload. Keep the change on the staging branch; do not spend Netlify/Cloudflare credits.

### Next work after QA
- Continue category/subcategory reconciliation from the extracted buyer-guide sources and approved eight root categories; inspect existing extraction outputs and category mapping files before creating new ones.
- Do not import the full catalogue until category mapping and visual acceptance are validated. Preserve the user's existing source PDFs and all previously completed extraction work.
- Keep production Axxess untouched. A green Pages build is not an Axxess release.

### Continuation rules
- For every future session, check the newest background run statuses first, update this handover after material outcomes, and leave an exact resume point with run IDs, commit IDs, status, blockers, and next action.
- Daily monitoring automation exists; it is not continuous monitoring and cannot guarantee detection between scheduled runs.


## Screenshot QA implementation — current session update
- Added mobile (390×844 viewport) and desktop (1280×900 viewport) full-page screenshot capture to `scripts/test-staging-category-navigation.cjs`. Screenshots are written to `artifacts/category-home-mobile-390.png` and `artifacts/category-home-desktop-1280.png`.
- Updated `.github/workflows/staging-category-navigation-acceptance.yml` to upload these files as artifact `staging-category-visual-qa` for 7 days, even if the test fails (with missing artifacts warned).
- Script commit: `e26c22303c187a51f4c3a33edc92cf0200d85da3`.
- Workflow/artifact commit: `6111bf8a3361fb9080eca66476e10e975f453dbf`.
- Acceptance run #4, ID `38437209479`, tested script commit `e26c2230`: in progress at last check; test step was running after Playwright/Chromium setup succeeded. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38437209479
- Acceptance run #5, ID `38437226467`, latest workflow/artifact commit `6111bf8a`: in progress at last check; test step was running after setup succeeded. This is the run expected to upload screenshots. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38437226467
- Buyer-guide extraction #54 (ID `38437209550`) and #55 (ID `38437226369`) both completed successfully. The two runs were triggered by sequential staging-branch commits before the full workflow update; no source PDF was modified. These are extraction runs only, not storefront tests.
- No screenshot has yet been inspected. Visual QA remains **pending** until run #5 completes and its artifact is accessible and inspected.
- Next: poll acceptance #4 and #5; use #5 as the authoritative artifact run; confirm test result and artifact count; inspect screenshots for clipping, category tile layout, mobile banner/header, and desktop alignment. If the screenshot artifact is absent or tests fail, diagnose and fix only staging files. Do not deploy to Axxess or spend Netlify/Cloudflare credits.


## Visual QA findings and UI correction — 13 October 2026
- Downloaded and inspected screenshot artifact from staging acceptance run #9, artifact ID `11833614788`: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38439364575/artifacts/11833614788
- Run #9 passed on commit `eeb725de8a6ca669cea05664fcf1aa42b9059deb`: 8 root categories, all 71 subcategories opened and returned; mobile document width 390/390, desktop 1280/1280, no browser errors, no off-screen elements. Initial mobile-buy bar was hidden and product modal closed. Full JSON evidence is in the workflow job logs.
- Visual inspection found the category cards were too text-dense/overlapping before the compact tile CSS, the mobile buy bar appeared when no product modal was open, the cart badge overflowed the right edge, and categories were below a row of service tiles. Staging CSS was corrected: compact icon/title/subtitle category cards, 3-column desktop / 2-column mobile root grid, mobile search sizing, smaller mobile hero, idle buy-bar hidden except during product modal, and cart badge positioned inside the mobile navigation. Screenshot artifact after these fixes showed a clearer category grid and no idle buy bar; the badge was inside the viewport.
- Root categories have now been moved above the services section on the staging homepage so the eight approved categories are more prominent. Rating box compacted on small screens.
- Latest UI commit under retest: `ad28c51c08fbdf3272ef1a50d15c446a7747391e`.
- Staging acceptance run #10, ID `38439896256`, is **IN PROGRESS** at last check; setup completed and Chromium installation was still running. Link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38439896256. Do not call the final visual/UI pass until run #10 succeeds and its fresh screenshots are inspected.
- Main-branch GitHub Pages deployment #979 (run ID `38439838307`, SHA `f0e44cf6134384cd76257e770171f277d4c81626`) is separately in progress. It is not the staging branch and not an Axxess production deployment.
- Buyer-guide extraction #59 (run ID `38439364567`) completed successfully. The extraction workflow now ignores `index-new.html` and `scripts/test-staging-category-navigation.cjs` changes, in addition to handover/workflow-only changes, to avoid re-running PDF extraction for UI-only edits.
- Next exact action: poll acceptance #10, inspect its four screenshot artifact files (home and category grid at 390px and 1280px), verify the compact rating box and categories-before-services layout, and record any remaining visual defect. Keep all work on staging; do not deploy to Axxess or spend Netlify/Cloudflare credits.


## Latest verified UI acceptance — 13 October 2026
- Staging Category Navigation Chromium Acceptance #10: **PASS**, run ID `38439896256`, tested commit `ad28c51c08fbdf3272ef1a50d15c446a7747391e`. Link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38439896256
- Test output: 8 roots; 71 subcategories all individually opened and returned; mobile viewport/document width 390/390; desktop 1280/1280; no off-screen elements; browserErrors 0; initial mobileBuyBarHidden true; productModalOpen false.
- Screenshot artifact #10: ID `11835171158`, four viewport screenshots, expires 20 October 2026. Link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38439896256/artifacts/11835171158. Screenshots were downloaded and visually inspected. The search input fits the mobile viewport, category tiles are legible, root categories appear above services, mobile cart badge stays inside viewport, and the idle add-to-cart/buy-now bar is hidden.
- Visual review showed desktop hero banner still taller than desired, so an additional staging-only compact-hero CSS adjustment was committed as `3e25147ebb774001c9c5265f336c77751dbd4ee6`. This is pending fresh acceptance/screenshot review.
- Staging acceptance #11, run ID `38440567696`, is **QUEUED** at last check on commit `3e25147e`: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38440567696. Poll to completion, inspect its new screenshots, and confirm all automated assertions still pass.
- GitHub Pages deployment #979 (run `38439838307`) and #980 (run `38440203547`) completed successfully on main; these are not Axxess production releases.
- Buyer-guide extraction #59 passed. The extraction workflow now ignores `index-new.html` and the browser-test script so future UI-only edits do not trigger PDF extraction.
- A transient acceptance run #7 failed because the first screenshot-test edit had a syntax typo; this was corrected, and runs #8–#10 passed. Do not treat the corrected current state as failed.
- Next action: monitor run #11, inspect artifact ID from its completed run, and if green continue category-to-subcategory reconciliation. Do not import catalogue or deploy Axxess until this validation is complete.


## Monitor poll — 13 October 2026, 19:44 SAST
- Latest screenshot/UI acceptance run #11 (ID `38440567696`, commit `3e25147ebb774001c9c5265f336c77751dbd4ee6`) remains **IN PROGRESS**; setup and Chromium installation completed, but the Playwright test step was still marked in progress at the latest poll. The workflow's updated_at remained `2026-10-13T17:40:37Z` over repeated checks; job logs/artifact are not yet available while GitHub reports it active. Link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38440567696
- GitHub Pages deployment #980 (run ID `38440203547`, main SHA `d66064de`) completed successfully; main Pages only, not Axxess.
- The previous confirmed visual/automated checkpoint remains run #10 PASS with artifact `11835171158`. Do not assume run #11 passed until its final conclusion is returned.
- Immediate next action in the next poll: recheck run #11 status; if completed, read job logs for test output and artifact ID, inspect the updated four screenshots (especially compact hero), then update both handovers. If still active and unchanged for an unusually long interval, diagnose using available GitHub Actions details rather than launching another duplicate test. No live Axxess changes.


## Final compact-hero acceptance and screenshot review — 13 October 2026
- Staging Category Navigation Chromium Acceptance #11: **PASS**, run ID `38440567696`, tested commit `3e25147ebb774001c9c5265f336c77751dbd4ee6`. Link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38440567696
- Test evidence: 8 approved root categories; 71 subcategories all individually opened and returned; mobile document/viewport width 390/390; desktop width 1280/1280; no off-screen elements; zero browser errors; initial mobile buy bar hidden; product modal closed.
- Screenshot artifact ID `11835246761` contains four screenshots (home/category grid at 390px and 1280px) and expires 20 October 2026. Link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38440567696/artifacts/11835246761
- Downloaded and visually inspected screenshots: mobile search stays within viewport; rating box is compact; mobile hero is visibly shorter; the eight approved category buttons appear before services; category tiles are legible; 3 columns desktop / 2 columns mobile; no idle add-to-cart/buy-now bar; mobile cart badge is within viewport. **Automated and screenshot visual QA pass for this staging checkpoint.**
- Main GitHub Pages deployment #980 (run ID `38440203547`, SHA `d66064de`) PASS; this remains separate from Axxess production.
- Next work: begin the existing buyer-guide category reconciliation review, using `CATEGORY_MAPPING_REVIEW_2026-10-09.md`, `PROPOSED_FINAL_CATEGORY_TREE_AND_MAPPING_PLAN_2026-10-11.md`, `staging/source-extracts/category-reconciliation-review-v5.csv`, and `staging/source-extracts/ASC_SOURCE_CATEGORY_CROSSWALK_2026-10-13.csv`. Validate mapping logic and source-category coverage; do not import the full catalogue or modify live product data. The catalogue remains staged/reversible.


## Next-task execution — source taxonomy reconciliation started (13 October 2026)
- Confirmed staging category acceptance #11 PASS (run `38440567696`, commit `3e25147ebb774001c9c5265f336c77751dbd4ee6`); four-screen screenshot artifact `11835246761` inspected. The compact hero and category navigation changes are staging-only.
- Began the next task from the previous handover: source-category reconciliation. Read the proposed final tree, category mapping review, guide reconciliation CSV and ASC crosswalk. The review CSV contains 148 source-heading rows; the ASC crosswalk contains 115 distinct/normalized source-heading rows. Current crosswalk marks visual verification as pending for the listed source headings; it is not yet safe to call the mapping final.
- Critical taxonomy guardrail: preserve original ASC/source category, subcategory, source guide/page, SKU, and item evidence separately from the proposed customer-facing Get Wired root/subcategory. Add mapping rationale, confidence and review status. Do not overwrite the source taxonomy, force mechanical products into electrical roots, or flatten valid specialist leaves.
- Reconciliation rule reminders: exact SKU and item/application evidence outrank generic source headings; separate vehicle-mounted 4x4 accessories from camping/leisure goods; group clips/fasteners, spanners/wrenches, winches/winch spares, switches/relays into appropriate specialist groupings; promotions are not permanent categories and old promotion pricing is not current.
- No database write or product import was made. Existing reports themselves identify conflicting historical tree counts (976/3,211 vs 3,223/964) and duplicate/legacy roots, so these must be treated as different snapshots and reconciled against a fresh read-only baseline before any migration.
- Immediate next technical step: read-only export of all 4,187 active product rows plus category parent chains, in bounded batches; produce SKU-level proposed root/leaf, original source category, confidence, rationale and exception status. Keep all ambiguous/out-of-scope mechanical products in a separate manual-review queue. Reconcile totals before any proposed write. No Axxess deploy or catalogue import until owner-reviewed mapping and validation gates pass.


## Category reconciliation audit created — 13 October 2026
- Added `CATEGORY_CROSSWALK_GAP_AUDIT_2026-10-13.md` in commit `8923a21bdf380d5bd3ab30f3576acca0c019d285`. It is a read-only audit; no live product/category rows changed.
- Verified input counts: review v5 has 148 heading records; the crosswalk aggregates 115 heading rows and 165 recorded source occurrences. The proposed store hierarchy has 8 roots and 71 children, matching the tested staging navigation.
- Crosswalk gap audit: 105/115 heading rows still have page-image QA pending; 9/115 have prior visual verification; 10/115 evidence rows are marked “Needs review”. There are 24 rows with review/conflict/promotion destinations: 15 outside approved roots pending scope, 6 requiring item/application classification, 2 promotion-only headings, and 1 conflicting contextual mapping within those totals.
- High-priority holds include generic Auto Spares / Spare Parts, brakes/clutch, gaskets, door/window spares, engine cooling/timing, tappet covers, mixed pumps/filters, safety, fuel pumps, and winches. Do not force mechanical parts into Auto Electrical Spares. Promotions “Special Discounted Price” and “Super Save” are not permanent categories.
- Grouping rules JSON contains 17 proposed grouping rules: individual vs sets for screwdrivers/spanners/wrenches/sockets/pliers; clips vs assortments; switches/relays/wiring connectors; winches vs winch spares and trailer-use applications. Status remains pending SKU-level validation; no products are duplicated or moved by these rules yet.
- Next bounded action: perform visual source QA on the 10 “Needs review” headings first, then the remaining 105 page-image-pending rows in batches; preserve source heading/page and status. Then reconcile all 115 crosswalk rows against the 71-child store hierarchy and prepare a separate SKU-level mapping export. No import/live writes until the full 4,187-active-product mapping is reviewed.


## Fresh SKU-level baseline execution — 13 October 2026
- Connected to Supabase project `ojytykqpvonxvepprgbh` read-only and re-counted current records. `public.products`: 4,198 total; 4,187 active; 11 inactive/null-active. The active set has 4,187 distinct non-null SKUs and zero active rows with missing `category_id`. `public.categories`: 242 total; 165 active; 77 inactive/null-active. These are current query results, not assumptions from old handovers.
- Exported all **4,187 active products** in SKU order to `staging/source-extracts/FRESH_ACTIVE_SKU_CATEGORY_BASELINE_2026-10-13.csv` on `audit/buyer-guide-extraction`. Commit: `748543d9df5d6a17d4fcd075bda70e725c8b78f5`. The CSV contains product UUID, supplier SKU, public SKU, name/description, current category and immediate parent, vehicle compatibility/specification JSON, current price/cost, plus blank proposed root/subcategory/source-guide fields and explicit `PENDING_REVIEW` status. Approx. 1.92 MB.
- Validation performed before committing: exactly 4,187 rows, 4,187 distinct non-empty SKUs, zero missing category references. This resolves the missing fresh-export blocker only; **it does not complete category mapping**. Existing category parent chain is currently represented only one level deep in this baseline; a complete recursive category-path export and joining SKU/page/source-guide evidence remain next.
- Safety: no database writes, category changes, product imports, Axxess deployment, payment/DNS changes, or Netlify/Cloudflare credit use.
- Next action: export all 242 category records with recursive parent paths and audit active product distribution by current full path; inspect `specifications` and private supplier catalog/code tables for source-SKU/catalogue/page provenance. Join exact SKU matches to buyer-guide extraction evidence, populate proposed mappings only where supported, isolate ambiguous items for manual review, and validate counts before any migration.


## Follow-up execution checkpoint — 13 October 2026
- Reconfirmed staging Chromium acceptance workflow run #11 (`38440567696`) completed successfully; all steps completed and conclusion `success`. Run: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38440567696
- Read-only recursive category-tree query works and reveals the live DB taxonomy contains duplicate/legacy top-level names and a mix of active/inactive branches (example: both active and inactive versions of “Automotive Accessories”; inactive legacy security subcategories alongside active equivalents). Do not treat the current database taxonomy as the approved new-store tree.
- Identified available provenance tables: `public.buyers_guides_import_staging` exposes `sku,name,source_category,source_subcategory,cost_price,advertised_price,source_guide,source_page`; `gw_private.product_supplier_codes` exposes product-to-supplier-SKU links; `public.supplier_stock` exposes supplier SKU, source URL, check time and raw data. These are promising exact-evidence sources. A follow-up aggregate query against the guide staging table was blocked by tool safety checks; no writes occurred. Retry with a narrower/simpler read query and bounded SKU joins.
- Test-before-upload ETA estimate (not a promise): **1–2 working days** to get a reviewable staging build ready for owner testing, assuming source-guide evidence is available and exact SKU matching proceeds without schema/access blockers; allow **another 0.5–1 working day** for fixes after test feedback. No Axxess upload until staging acceptance and explicit approval. If provenance joins or image/category cleanup surface major gaps, revise ETA with a concrete blocker rather than silently pushing unverified catalogue changes.
- Next: export recursive category paths and per-category active-product counts; inspect staging guide rows and supplier SKU joins with read-only queries; match by exact SKU; report matched/unmatched/ambiguous totals; create proposed mapping review CSV. Then run staging navigation + product/category/search/cart/checkout responsive QA. No live database mutations or deployments.
