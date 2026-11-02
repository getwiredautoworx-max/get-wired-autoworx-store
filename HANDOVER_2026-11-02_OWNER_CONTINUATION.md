# Get Wired AutoWorx — New Owner Handover
**Created:** 2026-11-02 (SAST)  
**Repository:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store  
**Purpose:** Single continuation brief for the next work session. Read this file and the permanent/current handovers before starting work. This document does not authorize production changes.

## OWNER'S STANDING INSTRUCTIONS — PROTECTED TEXT
**These instructions must not be edited, shortened, reordered, or removed without the owner's explicit permission. If operational notes change, append them elsewhere in this file; preserve this block verbatim.**

- Streamline all Work
- Don't work in circles and waste time 
- Don't notify me with what you are going to do next, instead continue until successfully resolved 
- Work smart and not hard
- Find solutions when there are problems and don't stop until successfully resolved 
- Notify me only when user input is needed
- Always read handover file and execute exactly as instructed.
- Always update handover.

## Current truthful status
**The 2 November target is at risk and the store is not approved for production launch.** Do not claim readiness, a percentage-complete figure, or a delivery commitment without current evidence. The live canonical domain has been reported serving the wrong/old storefront shell. Candidate preview checks do not equal owner acceptance or production readiness.

### Current storefront candidate
- PR #149 is OPEN / DRAFT / UNMERGED, recorded head `8065ccca9f8e5cdd2ce0cf9e1e7b5979ac5ece6c`.
- Exact-head PR checks: 11 reported SUCCESS.
- Local populated-preview QA: 4,187 active products, eight approved root labels, 50 ASC pilot records across 12 subcategories, five sampled exact-SKU WebP files decoded, 68 Planetworld review rows, no local page errors and no horizontal overflow at 390px.
- Candidate preview: https://e29c4a6c.get-wired-autoworx-store.pages.dev
- **Hosted exact-head browser acceptance is NOT verified**: the hosted preview wait step was skipped on pull_request (`GW_RUN_HOSTED_QA=false`, `HOSTED_QA_SKIPPED_ON_PULL_REQUEST`). 360px QA and owner real-phone acceptance are not evidenced on this head.
- Cloudflare Workers preview build failed (build ID `8b92bf05-c441-4f06-a09a-f762d08e002d`); do not retry deployment without explicit approval due to possible credit use.
- PR #149 base is stale versus current main; reconcile/rebase and repeat exact-head checks before any merge. No merge is authorized.

### Background tasks and release blockers
- Background Task Controller run `41396971690` succeeded as a monitor, reporting `attention_required`: 9 workflows checked, 3 completed non-successful, 0 running, 0 retry requests, 0 monitoring errors.
- Artifact inventory: 417 artifacts / 120,181,368 bytes (114.61 MiB); no artifacts deleted. Largest retained artifact is `axxess-storefront-upload`, ID `13093421576`, 110,897,497 bytes. Do not infer quota recovery.
- Live Release Gates run `41396929209` FAILED: live routes returned HTTP 200 but `checkout-v2.html` and `assets/category-tree.json` hashes did not match expected; Playwright 1.55 could not install Chromium on reported `ubuntu26.04-x64`. Release blocked. Never automatically rerun production/release workflows.
- Store Production QA run `41050575994` FAILED with `LIVE_BUTTON_ONLY_NOT_DEPLOYED`: canonical production domain did not serve the intended merged buttons-only storefront.
- Refresh Category Snapshot run `41297217716` FAILED because `scripts/refresh_category_snapshot.py` could not find public Supabase config in the intentionally button-only `index-new.html`; snapshot commit step was skipped and no snapshot was written. Fix the config lookup and add a unit test before any controlled refresh.
- Current-main controller excludes production QA, live release gates and Cloudflare deployment workflows from automatic retry allowlist. PR #143 is open/draft; its policy test passed in run `41287786249`, but its regression-test file/workflow are not on main. Do not merge without review.
- No production deployment, Axxess upload, DNS/payment change, live data write, or release-credit-consuming retry was performed in the recorded 2 November run.

### Planetworld supplier audit
- PR #95 is CLOSED / UNMERGED / not mergeable; recorded head `17c47cc3283f8ee8c786c4bf08dfe6257a3f3382`.
- Historical audit run `40944787080`, head `1fb086c1ffb3e0e06ef6a97bfcdca502389ec174`, job `123697194835`, SUCCESS; artifact listing empty because artifact storage quota was hit. It is not a fresh audit of current supplier prices.
- Historical audit counts: 47 XLSX files, 94 sheets, 3,317 rows, 0 workbook errors, 19 zero-RRP rows, 18 rows below estimated VAT-inclusive cost at RRP−1%, 19 rows below at RRP−2%, 0 duplicate model/SKU flags after duplicate-workbook exclusion.
- Current-main workflow `Planetworld Workbook Audit (Read Only)` and `scripts/planetworld_workbook_audit.py` are artifact-free, but no run on current main was found. Connected GitHub actions did not expose a workflow-dispatch action.
- Owner UI action required: repository → Actions → **Planetworld Workbook Audit (Read Only)** → **Run workflow** → select `main` → run once, then inspect job summary/logs. Do not rerun the old successful job or create a dummy commit.
- Keep 19 zero-RRP items separate for owner audit; they remain quote-only/inactive. Positive-RRP review queue is triage only, not authorization to change prices. The 19 distinct SKUs are: `86180`, `90008003`, `90011904` (RRP−2% queue only), `90013009`, `90014004`, `90022538`, `90022567`, `IAB541-WR`, `IRX108BT-EK`, `JBL-EON710-EK`, `ISA-ON115-3LX`, `ON1509-LX1`, `ON263-FK2`, `0004801419`, `HK-2417-00`, `5085985EU`, `7225154`, `PFW4600`, `THIN215`.
- Confirm positive-RRP SKUs against current supplier printed RRP, dealer cost, VAT basis and effective date before proposing any change. Do not modify supplier XLSX files or import/publish supplier data without approval.

### ASC and category review
- ASC remains a separate workstream. Intended post-reset November Buyer’s Guide / stock-arrival PDF bytes were not found in the repo/Library search. Do not treat October files as current November evidence.
- 38 historical ASC price-scaling SKUs remain unverified against current post-reset November source. Match each to printed cost, VAT basis, stock and effective date when source PDFs are available.
- PR #149 contains a **test-only**, price-on-request, availability-to-confirm 50-record ASC pilot across 12 subcategories; it does not prove current supplier price/stock.
- Category review queue: 198 rows. All 198 SKUs were found in expected guide OCR (193 one-page matches, 5 multiple-page matches), but OCR presence is not visual approval. No automatic product moves. Use:
  - `staging/source-extracts/CATEGORY_QUEUE_EXACT_SKU_SOURCE_OCR_CROSSCHECK_2026-10-14.csv`
  - `staging/source-extracts/CATEGORY_REVIEW_CANDIDATE_SUGGESTIONS_2026-10-14.csv`
- Approved category source guides are authoritative. Preserve source filename/page/sheet/category/subcategory/SKU/model evidence. Do not guess categories or combine unrelated families (e.g. oil filler caps must not appear under ignition looms).

### Protected pricing and source verification
- Preserve the 107/107 October rows whose updated source-image verification confirmed live cost matches October printed cost and formula selling price passes. Do not alter those prices just because an older `review_status` says review. Reference: `staging/source-extracts/PRICE_RECONCILIATION_EFFECTIVE_STATUS_2026-10-14.csv`.
- Exact official-source match reconfirmed: Vogel’s Pro-AV model 7225154 is PUC 2515 silver pole, 1,500 mm, 80 kg max load, EAN 8712285318726. This verifies identity/spec only, not current supplier price/stock or image permission. Official source: https://downloads.vogels.com/en/pro-av-catalogue.pdf
- Vogel’s PFW4600, OneNav ON1509-LX1 and ON263-FK2 exact model/variant/image sources remain UNVERIFIED. Do not substitute sibling-product or unverified reseller imagery.
- Audio Connections dealer authorization is owner-confirmed; remaining work is model-to-GW SKU, exact images, accurate descriptions, current price/VAT and availability review—not another authorization request.
- Supplier names must not appear in customer-facing catalogue labels. Keep uncertain matches unverified; quote-only products remain inactive/not purchasable.

## Ordered remaining work
1. Resolve current-main Planetworld audit: owner runs the read-only workflow once through GitHub Actions UI; record run/job status and summary. Keep zero-RRP owner queue separate.
2. Obtain the correct post-reset ASC November source PDFs; reconcile all 38 historical scaling SKUs against source evidence without touching live data.
3. Fix category snapshot config discovery in an isolated code change and add a test for the button-only shell; test without triggering deployment or live writes.
4. Reconcile PR #149 against current main; repeat exact-head tests. Establish a safe, explicitly approved hosted-preview QA route, including 360/390px mobile and desktop, actual deployed SHA/URL, navigation drill-down, image loading, contrast, privacy/noindex, and no page errors. Obtain owner real-phone acceptance.
5. Verify checkout/signup/email confirmation/order submission in non-production. Instant EFT may be a test-scope option only; PayFast/PayJustNow remain pending. No bank details or payment credentials may be invented or changed.
6. Fix and verify the production storefront mismatch only through the owner-approved coordinated release process. Keep Axxess-first release sequence; coordinate GitHub/Supabase/Cloudflare in one planned release to minimize credits.
7. Visually review the 198 category rows and the 528 outside-approved-root products not already in the queue; no auto-moves. Preserve source provenance and all protected October prices.
8. After every meaningful subtask, append evidence, counts, exact run/commit IDs, outcome (success/failure/in progress), and next action to the handover immediately. Read back changed files to verify.
9. Only after all exact-head tests, verified hosted preview, desktop/mobile acceptance, and owner acceptance may production release be considered—and only with explicit owner approval.

## Non-negotiable safety boundary
Production remains **HOLD**. No PR merge, production deployment, Axxess upload, DNS changes, payment activation/credential changes, Supabase production writes/migrations, live catalogue/product/category/price/stock/active-flag changes, supplier imports/publication, destructive artifact/branch cleanup, or credit-consuming deployment/retry without explicit owner approval. Do not retry queued/in-progress tasks; do not retry production/deployment/release workflows. Monitoring is scheduled, not continuous.

## Latest task-start record
- `HANDOVER_UPDATE_2026-11-02_OWNER_HANDOVER_TASK_START.md`
- Task-start commit: `75ab7d869b18fc7b46719ad332a576a8b817a2c1`

## Handover maintenance
Append new dated outcomes below this line; never modify or remove the protected owner-instructions block above without the owner's explicit permission.


## 2026-11-02 HANDOVER CLEANUP — VERIFIED
- Owner directed removal of all previous handover files from the repository.
- Removed all prior handover-named files, including `AI_HANDOVER.md`, `AI_HANDOVER_PERMANENT.md`, `HANDOVER_CURRENT.md`, legacy dated handovers, task-start/results/checkpoint notes, and files in `handover-runs/` and `handover-updates/`.
- Final recursive Git tree verification returned exactly one handover-named file: `HANDOVER_2026-11-02_OWNER_CONTINUATION.md` (blob `e9a5c7d97182e5c5125552fd3c2b71deb79ade82` before this cleanup note was appended). Tree SHA at verification: `9d20f4ac49c1f1fbecef06b90ccd9e268c9c3ead`.
- This new file is the sole retained handover and preserves the owner's standing-instructions block. Do not edit/remove that block without explicit owner permission.


## 2026-11-02 ASC INTEGRATION — TASK START
- Owner instruction: continue ASC catalogue integration, preserving each source catalogue's original headings/subcategories and mapping into the eight approved store roots; no live catalogue, price, stock, category or supplier activation changes.
- Read-only checkpoint: PR #149 remains draft/open/unmerged; GitHub reports head `148cc9060c3bf7543a0f8a65a16e214b52be663e`, base `1ffe9a91b84eca755162e009d233b8d57ada28fe`, 41 commits, 126 changed files, mergeable=true. Its body describes 20 ahead / 0 behind and 127 changed files, which conflicts with metadata; verify against current main before any integration decision.
- Starting focused review of source taxonomy, pilot evidence consistency, category mapping and test coverage. Production remains HOLD.


## 2026-11-02 ASC INTEGRATION — REVIEW-ONLY STAGING RESULTS
- Current main at task start was `7ea5c5828bb68dc6831cd6badd2ff9e2233802b3`. Main contains the six original ASC PDFs and OCR page text/summary, but does **not** contain the 50-record pilot, pilot image-match register, taxonomy navigation data, or ASC navigation in `index-new.html`. Main's ASC README still said the 25-record pilot was in progress.
- Rechecked PR #149 against current main using GitHub compare: **41 commits ahead / 86 commits behind** (diverged). PR metadata head `148cc9060c3bf7543a0f8a65a16e214b52be663e`, base SHA `1ffe9a91b84eca755162e009d233b8d57ada28fe`; PR body claims 20 ahead / 0 behind and 127 files, while API reports 41 commits / 126 files. The body/metadata are inconsistent and PR #149 is unsafe to merge as-is. No merge performed.
- PR #149 exact-head workflow snapshot: run `41401407095` (Populated Store Preview Browser QA) was still IN_PROGRESS at check time; 10 other listed exact-head workflows had completed SUCCESS. This is not full preview acceptance. Run was not retried.
- Verified candidate review registers: 50 pilot rows (25 page 3, 25 page 4), 50 image-match rows; cross-matched by source filename + page + ASC code = **50/50 matches** across all six PDFs. Pilot covers 12 source subcategories. 63 OCR tokens remain explicitly UNVERIFIED. Candidate exception register has header only / zero recorded exceptions; this is not proof of catalogue completeness.
- Parsed candidate taxonomy into a new review-only JSON: six source families, 72 pages, 75 contents headings, plus one virtual Fuel Pumps parent = 76 unique navigation nodes. Mappings preserve the original source section names; aerials attach to existing Aerials under Car Audio & Entertainment, sensors/switches/globes/fuel pumps to Auto Electrical Spares, and mats to Automotive Accessories. Fuel Pumps remains a virtual preview-only parent. Query hints must not be used for fuzzy product matching or automatic category moves.
- Created fresh current-main branch `integration/asc-source-taxonomy-review-2026-11-02` and draft PR #151: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/151 (9 commits, 8 files, head `e944c1570eacf08e9d2db8af079e534439570609`, base `7ea5c5828bb68dc6831cd6badd2ff9e2233802b3`, mergeable=true, draft/open/unmerged). It stages the taxonomy JSON, 50-row product pilot CSV, 50-row image-match register, 63 OCR candidate rows, exception register, source manifest, Node regression test, and corrected ASC README. No images are promoted into live assets; source-card crops remain watermarked review material and live image-use rights still need confirmation.
- Manual data checks on PR #151 contents: six catalogues / 72 pages / 75 source headings; 76 unique navigation nodes including Fuel Pumps parent; 50 pilot rows; 50 image matches; 50/50 exact source/page/code cross-matches; 63 unverified OCR tokens. The added Node regression test has **not yet been executed by CI**; combined commit status was empty at time of check. Do not describe it as passed.
- Important scope boundary: PR #151 is source taxonomy/evidence staging, **not yet customer-facing ASC storefront navigation**. Main's `index-new.html` still has no ASC catalogue navigation, and no ASC live products, Get Wired SKUs, prices, stock, database rows, category assignments or supplier activation were changed. Production remains HOLD.
- Next safe technical task: port the reviewed taxonomy and exact-only pilot subcategory rendering into a fresh current-main storefront candidate (not by merging stale PR #149 wholesale), then run its isolated tests and obtain exact-deployment hosted desktop/mobile QA. Preserve source provenance and show an honest empty state for unverified source headings; never fill categories with fuzzy-matched unrelated products.


## 2026-11-02 ASC CUSTOMER PREVIEW IMPLEMENTATION — NEXT STAGE
- Continued from PR #151 without repeating/recreating the completed source extraction or 50-row review register. Current branch: `integration/asc-source-taxonomy-review-2026-11-02`; PR #151 remains draft/open/unmerged and currently mergeable=true. Latest branch head: `2db084d98f8dde3459c48772afd92b76927c0182`; base main `7ea5c5828bb68dc6831cd6badd2ff9e2233802b3`.
- Added `asc-catalogue-preview.html`: separate responsive root → original ASC subcategory → exact pilot product navigation. It exposes the three approved store roots that actually have current ASC pilot material: Auto Electrical Spares, Car Audio & Entertainment, Automotive Accessories. Other five store roots are not falsely represented as ASC catalogue content.
- Added `assets/asc-catalogue-preview-data.json` from the 50 reviewed candidate records, linked to the taxonomy by exact source subcategory ID. Product cards show source descriptions/fitment, ASC catalogue reference, source page and exact source-card image. No price, stock, GW SKU, cart or checkout is offered; unverified subcategories show explicit empty state. Source watermarks remain.
- Copied exactly 50 reviewed ASC image files from the earlier candidate commit into this current-main branch by reusing existing Git blob objects (377,353 bytes total); no new images generated and no image content modified. Crosswalk: 50 records / 50 unique image paths.
- Extended `scripts/build-cloudflare-pages-public.py` so the ASC preview route/data/images are copied only when `GW_INCLUDE_PREVIEW_ROUTES=1`. Standard customer production package continues to exclude the route/data/image folder. Updated Cloudflare Pages package QA to include the sixth preview route and assert exactly 50 pilot images in preview package.
- Added dedicated `.github/workflows/asc-catalogue-preview.yml` Playwright desktop/mobile checks for root→subcategory navigation, four aerial records, image loading, search, empty-state behavior and horizontal overflow. Static regression test also checks 50 taxonomy-linked records, review-only release flags, no price/internal/public SKU and all image paths existing.
- QA evidence on latest code-bearing commit `e404dab310b6c687a79a5a32f6193e603ace32b1`: Cloudflare Pages Public Package QA run `41402534200` completed SUCCESS; verified standard package excludes ASC preview route and opt-in package contains all six approved preview routes and exactly 50 ASC images. Public SKU Exposure Audit run `41402534170` completed SUCCESS. Dedicated ASC Browser QA run `41402534176` was still IN_PROGRESS at last check (Chromium install); its browser test step had not started. A newer doc-only handover README commit is `2db084d98f8dde3459c48772afd92b76927c0182`; new run `41402586033` also IN_PROGRESS. Do not claim browser QA passed until the run completes successfully.
- Storefront smoke run `41402585899` passed mode detection and skipped the live browser smoke because `index-new.html` remains deliberately buttons-only. This ASC route is a separate preview page; it is not yet linked from the live homepage or integrated into main category navigation. No hosted Pages deployment or owner phone acceptance verified yet.
- PR #151 body updated to reflect the preview route and current QA. Production remains HOLD. No live products, GW SKUs, prices, stock, database rows, category assignments, supplier activation, payment, DNS or production deploy changes.
- Next steps only (do not repeat completed source extraction): finish exact-head desktop/mobile browser QA; verify a hosted non-production preview URL for this branch; then connect the ASC route under the corresponding three approved category pages without changing the eight-root main hierarchy, and continue source review beyond the 50 pilot rows. Owner must confirm image-use rights, dealer price/stock, and GW SKU allocation before live publication.


## 2026-11-02 ASC PREVIEW QA RECHECK AND REPOSITORY DOCS — VERIFIED
- Rechecked existing workflow results rather than rerunning successful work. Exact code-bearing commit `e404dab310b6c687a79a5a32f6193e603ace32b1`: ASC Catalogue Preview Browser QA run `41402534176` SUCCESS; job `browser-review` completed successfully, including Chromium install and desktop/mobile browser checks. Cloudflare Pages Public Package QA run `41402534200` SUCCESS; standard package excluded preview-only routes/assets and opt-in preview package included the six approved preview routes and exactly 50 ASC pilot images. Public SKU Exposure Audit run `41402534170` SUCCESS; Populated Store Preview Browser QA run `41402534144` SUCCESS.
- Rechecked doc-only head `2db084d98f8dde3459c48772afd92b76927c0182`: ASC Catalogue Preview Browser QA run `41402586033` SUCCESS; Populated Store Preview Browser QA run `41402585930` SUCCESS; Cloudflare Pages Public Package QA run `41402585896` SUCCESS; Public SKU Exposure Audit run `41402585892` SUCCESS. Storefront Smoke Test run `41402585899` passed mode detection but intentionally skipped the live browser smoke because main's `index-new.html` remains buttons-only. These runs are separate checks and do not establish a hosted deployment or owner acceptance.
- Latest compare against main: ASC integration branch is **20 commits ahead / 2 behind**, diverged from current main head `04caf80ac0f7bf836b578f7379e14789e2080e7a`; merge base remains `7ea5c5828bb68dc6831cd6badd2ff9e2233802b3`. Do not merge as-is. Reconcile the two main commits into the integration candidate, resolve conflicts, then rerun exact-head checks.
- ASC route remains a standalone opt-in non-production page, not linked from the live homepage/category pages and not deployed to a verified hosted preview. Next code task is to connect it to the corresponding three approved category destinations within a fresh, current-main-reconciled candidate, without altering the eight-root hierarchy or using fuzzy matching. Keep exact-source empty states for unverified headings.
- No new supplier catalogue extraction, image generation, or duplicate QA runs were performed in this recheck. No production deployment, Axxess upload, DNS, Supabase writes, live catalogue/price/stock/category changes or payment activation occurred.
- Fixed the repository root README's broken links to deleted `HANDOVER.md` and `HANDOVER_CURRENT.md`; it now points to the sole retained `HANDOVER_2026-11-02_OWNER_CONTINUATION.md` and the current execution brief. Documentation-only change on main; no deployment action.
- Production remains HOLD. Hosted preview URL/SHA verification, owner real-phone acceptance, live storefront correction and all release gates remain outstanding.


## 2026-11-02 ASC PREVIEW CATEGORY-LINK QA — RESOLVED
- Added preview-only ASC catalogue links to the matching root-category pages in `preview-category.html`: Auto Electrical Spares, Car Audio & Entertainment, Automotive Accessories. Links open `asc-catalogue-preview.html?root=...` and preselect the matching root. No live homepage or production route changed.
- Initial browser check exposed a syntax error in the new category card href expression; corrected it to a flat conditional expression. A subsequent browser run exposed a route matcher/load-wait issue; corrected the Playwright wait to use the literal query marker and DOMContentLoaded rather than waiting for all lazy images. Do not repeat those fixes.
- Exact current branch head: `2f61e0cdb0a160efd4df17c8256de64bf8f2caa5`; PR #151 remains draft/open/unmerged, mergeable=true, 65 changed files. PR body updated with exact-head QA results.
- Dedicated ASC Catalogue Preview Browser QA run `41403181567` completed **SUCCESS** on exact head. It passed the category-page link into the ASC preview, category root selection, four aerial products in exact Vehicle-Specific Aerials, exact Nissan Sentra search result, safe empty state for Throttle Position Sensors, all 50 source images loading, and desktop 1365px/mobile 390px overflow checks.
- Cloudflare Pages Public Package QA run `41403181582` completed **SUCCESS** on exact head. Standard package excludes ASC preview route/data/images; opt-in non-production preview package includes all six allowed preview routes and exactly 50 ASC image crops.
- Public SKU Exposure Audit run `41403181554` completed **SUCCESS** on exact head. Storefront Smoke Test run `41403181565` completed **SUCCESS** for mode detection; full live browser smoke skipped because main is intentionally buttons-only. General populated-store browser QA `41403181619` and catalogue-routing QA `41403181597` were still in progress at checkpoint and are separate from the dedicated ASC preview pass.
- Hosted non-production Pages deployment and owner phone acceptance remain outstanding. The new route is linked from the three relevant preview category pages, but is not merged to main or deployed. Production remains HOLD; no live catalogue/price/stock/SKU/database/category/supplier changes made.
- Next safe step: arrange a non-production hosted preview deployment using the reviewed branch (do not use existing preview workflow that checks out main, and do not deploy production), verify exact deployed SHA and phone/desktop behavior; then continue visually reviewing the remaining catalogue headings beyond the 50 pilot rows. Supplier image rights, current dealer price/stock and GW SKU assignment remain unverified and require owner/supplier confirmation before publication.


## 2026-11-02 ASC NON-PRODUCTION DEPLOYMENT HANDOFF
- Added manual-only workflow `.github/workflows/deploy-asc-catalogue-preview.yml` to PR #151. It checks out the selected branch SHA, builds the allowlisted non-production Pages package with `GW_INCLUDE_PREVIEW_ROUTES=1`, verifies the ASC route/data/50 JPG files, and deploys only to Cloudflare Pages branch `asc-catalogue-preview`. It never deploys to branch `main` or production.
- Workflow requires existing repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Available toolset does not expose a GitHub workflow_dispatch action, so owner must start it in GitHub Actions by selecting workflow “Deploy ASC Catalogue Non-Production Preview” and branch `integration/asc-source-taxonomy-review-2026-11-02`. Only after success, use the URL shown in deployment output; do not guess a Pages URL.
- Current PR #151 head after deployment workflow + README documentation commits: `a40b11a038cb1d1fc67334003c3b30208944c8c4`; base `7ea5c5828bb68dc6831cd6badd2ff9e2233802b3`; draft/open/unmerged; mergeable=true; 65 changed files. The last code-bearing storefront/ASC preview commit was `2f61e0cdb0a160efd4df17c8256de64bf8f2caa5`; subsequent commits only add manual deployment workflow and README documentation.
- Exact code-head QA at `2f61e0cdb0a160efd4df17c8256de64bf8f2caa5`: ASC Preview Browser QA `41403181567` SUCCESS; Pages Package QA `41403181582` SUCCESS; Public SKU Exposure Audit `41403181554` SUCCESS; Storefront Smoke Test `41403181565` SUCCESS for mode detection (full live browser smoke skipped because main remains buttons-only). Category routing QA `41403181597` and populated-store preview browser QA `41403181619` were separate checks and still running at last observation; not a prerequisite claim for ASC route QA.
- One intermediate ASC browser run failed because the category link's URL wait did not use DOMContentLoaded; corrected the matcher/wait and reran. The exact code-head run above passed. Do not repeat the already-resolved source extraction, taxonomy staging, image copy, or preview route implementation.
- Next owner action: manually run the isolated non-production deployment workflow on the integration branch, then check the hosted route on desktop and real phone. Following hosted acceptance, continue source visual review for catalogue headings beyond the 50 pilot products. Image-use rights, current dealer pricing/stock, and GW SKU assignment remain unverified; do not publish live or merge until the owner accepts the preview and those commercial details are verified. Production remains HOLD.
