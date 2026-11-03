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


## 2026-11-02 EXECUTION CHECKPOINT — CURRENT SESSION
- Re-read the sole current owner handover and checked the live GitHub PR list, changed-file manifests, current README and exact-head workflow runs. No task already recorded as completed was repeated.
- Confirmed current PR #151 is a current-main-based ASC preview implementation. Its exact code-bearing head `2f61e0cdb0a160efd4df17c8256de64bf8f2caa5` has SUCCESS results for:
  - ASC Catalogue Preview Browser QA: run `41403181567`
  - Cloudflare Pages Public Package QA: run `41403181582`
  - Public SKU Exposure Audit: run `41403181554`
  - Populated Store Preview Browser QA: run `41403181619`
  - Catalogue & Supplier Routing Review QA: run `41403181597`
  - Storefront Smoke Test: run `41403181565`; mode detection passed, but full live storefront smoke was skipped because main remains buttons-only.
- Confirmed PR #151 changed-file manifest contains the 50 reviewed ASC image assets, taxonomy/data/review registers, ASC preview route, category-preview links and isolated non-production deploy workflow. The workflow is manual-only and targets Pages branch `asc-catalogue-preview`; it requires existing Cloudflare secrets. The connected GitHub action set exposes no workflow-dispatch operation, so this session cannot start that manual workflow. No URL may be guessed; the deployment output must supply it.
- Confirmed PR #149 is not a safe integration path: current handover records 41 ahead / 86 behind and conflicting PR metadata/body; no merge performed.
- Confirmed PR #150 is the repository-cleanup candidate; its changed files remove only obsolete status/session markers and add APK/AAB/build-output ignores. It remains unmerged; no destructive cleanup or merge performed.
- Confirmed README on main points to this sole handover file and the execution brief. The earlier AI_HANDOVER_PERMANENT.md and HANDOVER_CURRENT.md names are obsolete and must not be treated as current.
- Next execution boundary: the only immediate external action required to obtain the hosted ASC preview is an owner-started manual GitHub Actions run of **Deploy ASC Catalogue Non-Production Preview** on branch `integration/asc-source-taxonomy-review-2026-11-02`. After it succeeds, verify the actual returned URL and deployed SHA, then conduct phone/desktop acceptance. This is a non-production preview only; it does not authorize merge or production publication.
- No production deployment, Axxess upload, DNS/payment change, Supabase write, live product/category/price/stock update, supplier activation, branch deletion or artifact deletion was performed.


## 2026-11-02 ASSISTANT DELIVERY COMMITMENTS — OWNER REQUESTED
The owner explicitly requested that the assistant's latest commitments be added to this handover. This section records operating commitments, not a guarantee of completion by a date. The protected OWNER'S STANDING INSTRUCTIONS block above remains unchanged.

### Commitments
1. **No more invented deadlines or guarantees.** Do not promise a completion time or claim certainty where completion depends on unresolved technical work, external services, owner actions, or acceptance. Do not replace missed targets with another speculative ETA.
2. **Evidence-led execution.** Make tangible, verifiable changes wherever the available repository and tools permit. A status message, plan, checklist, or repeated explanation is not delivery.
3. **Single release path.** Work from the current handover and current main; identify one candidate release path and reconcile competing branches rather than creating parallel storefront versions or restarting completed work.
4. **Do not repeat resolved work.** Check recorded commits, tests and outcomes before acting. Reuse successful exact-head results only while the tested code is unchanged; rerun only when a relevant change invalidates them.
5. **Close tasks with proof.** Record the exact commit/head, test or workflow run, result, and any remaining limitation. Mark a task complete only after its stated acceptance evidence exists. Read back handover edits to verify they were saved.
6. **No status-only notifications.** Continue with safe, available work instead of announcing what will be done next. Contact the owner only when a specific owner action, decision, credential, source file, or acceptance is genuinely required; state exactly what is needed and why.
7. **Find a safe workaround when blocked.** Investigate alternative paths that do not breach release boundaries. Do not stop at describing a blocker, but do not bypass approvals, fabricate evidence, or make risky production changes to appear productive.
8. **Protect production and owner assets.** Production remains HOLD. No production deployment, Axxess upload, DNS change, payment activation, Supabase production write, live catalogue/price/stock/category change, supplier publication, destructive cleanup, or credit-consuming release retry without explicit owner approval.
9. **Honest finish line.** The store is not declared ready until the approved storefront is on a verified hosted preview at an identified deployed SHA; desktop and mobile customer flows and checkout/signup/order tests pass; catalogue and pricing evidence is verified; and the owner accepts the preview. Production launch remains a separate decision requiring explicit approval.
10. **Maintain this handover.** Append material outcomes and blockers promptly. Preserve the owner's protected instruction block verbatim; do not edit or remove it without permission.

### Current practical limitation — not represented as resolved
The ASC non-production deployment workflow still requires the owner to start **Deploy ASC Catalogue Non-Production Preview** in GitHub Actions on branch `integration/asc-source-taxonomy-review-2026-11-02`. The available connected GitHub actions do not expose workflow dispatch. The assistant must not invent a hosted URL or claim deployment/phone acceptance until the workflow succeeds and the returned URL and deployed SHA are checked. This owner action is a specific external dependency, not a reason to repeat completed ASC extraction or preview QA.

### Accountability note
The assistant previously gave repeated target dates and time estimates without delivering a verified, owner-accepted store. Those estimates are not guarantees and must not be restated as commitments. The owner has asked for results rather than further forecasts.


## 2026-11-02 CATEGORY SNAPSHOT CONFIG FIX — STAGED, CI NOT YET VERIFIED
- Owner instruction: continue execution toward a store that is ready for the owner to enter payment details and configure payment processing; do not treat this as authorization to activate live payments or publish production.
- Reproduced the documented failure path by inspection: `index-new.html` is intentionally buttons-only and contains no public Supabase configuration, while `scripts/refresh_category_snapshot.py` previously searched only that file and aborted before making a snapshot.
- Created isolated branch `fix/category-snapshot-config-2026-11-02` from main head `4867ae8799dce3a035b9c2bf80fa3f739e0f4131`.
- Updated `scripts/refresh_category_snapshot.py` to resolve explicit `SUPABASE_URL` / `SUPABASE_KEY` environment variables first, then inspect `index-new.html`, `checkout-v2.html`, and `index.html`. The checkout client fallback handles the current combined JavaScript constant declaration. Missing configuration now returns an actionable error.
- Added `tests/test_refresh_category_snapshot_config.py` covering environment precedence, fallback when the category shell is empty, and missing-config failure.
- Added isolated PR regression workflow `.github/workflows/category-snapshot-config-tests.yml`; added a pre-refresh test step to `.github/workflows/refresh-category-snapshot.yml`.
- Opened draft PR #152: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/152. Current PR head at creation: `2d5e27cb287aaf50c3de6747678fd1c6bfa1c970`; base main was `27006f956f117d01d1911fdc8b6f2a131d63698e`. PR reports mergeable=true after metadata refresh.
- **Validation is pending:** no PR workflow run or status check was returned at checkpoint; do not call the tests passed. Do not merge PR #152 or trigger a category snapshot refresh until the isolated regression workflow passes and the code is reviewed.
- No Supabase API request, snapshot refresh, product/category write, storefront edit, deployment, payment change, DNS change or production action was performed.
- Next safe execution: obtain a real CI result for PR #152 (without rerunning production workflows); then continue the payment-readiness review on non-production source only, specifically server-side delivery quote validation, order creation, payment-session/webhook verification, and account/email/order flow. Keep Direct EFT as a manual/test-only option until owner supplies approved bank details and confirms how customers should receive them. PayFast remains pending merchant approval. Never invent or store bank details in source code.


## 2026-11-02 LIVE SUPABASE PAYMENT/CHECKOUT READINESS AUDIT — VERIFIED READ-ONLY
- Connected Supabase project: `Store`, ref `ojytykqpvonxvepprgbh`, region `eu-west-1`, status `ACTIVE_HEALTHY`.
- Live deployed Edge Function inventory confirms:
  - `store-checkout`: **version 5**, `verify_jwt=false`. Retrieved deployed source still forwards browser payload to `create_store_order_v2`; it has no signed delivery quote verification, customer session/policy acknowledgement flow, or Direct EFT instruction helper. This is older than current GitHub main source.
  - `shipping-quote`: **version 4**, `verify_jwt=false`. Retrieved deployed source trusts browser-supplied parcel dimensions, returns `live:true` rates without signed quote tokens, and contains a hard-coded private collection address in its carrier payload. Do not expose that address or use this deployed function for live delivery checkout.
  - `payment-gateway`: **version 2**, `verify_jwt=false`; Peach Payments remains the default. Its `create_link` path deliberately returns HTTP 409 pending merchant-account verification; it is not a working customer-order payment integration.
- Live Supabase migration history currently ends at `20261009154546` (`checkout_flat_r35_packaging_eft_only`). It does not include the repository's later delivery quote nonce or checkout policy audit migrations (including `create_store_order_v3`). This is a material source/deployment schema drift.
- Repository main already contains the newer source-side safeguards: short-lived HMAC delivery quote tokens, server-derived parcel validation, cart/destination/amount binding, nonce replay guard migration, authenticated customer checkout, durable policy acknowledgement, and Direct EFT response handling. Existing successful source-level test evidence is recorded in issue #102 (Delivery Quote Security Tests run `41058152058`, code head `5287bb47c0ec439e68ca6b473de054227469e916`). This does **not** prove the deployed functions/database are updated.
- `DIRECT_EFT_SETUP.md` defines five Edge Function secrets to be configured outside GitHub after approved deployment: `DIRECT_EFT_BANK_NAME`, `DIRECT_EFT_ACCOUNT_NAME`, `DIRECT_EFT_ACCOUNT_NUMBER`, `DIRECT_EFT_BRANCH_CODE`, `DIRECT_EFT_ACCOUNT_TYPE`. The code returns no partial bank details unless all five exist and the order reference is present. Order remains pending until owner/admin manually verifies the deposit. Do not request or store bank account values in chat or source control.
- No Supabase secret values were read, changed, or disclosed. No Edge Function was deployed; no migration was applied; no database writes or money movement occurred.
- **Payment readiness remains BLOCKED by deployment drift and owner approval**, not by missing source code alone. A coordinated, reviewed migration + `shipping-quote` + `store-checkout` deployment to a non-production environment is required first, with `DELIVERY_QUOTE_SIGNING_SECRET` configured securely there, then behavioural endpoint tests. Production deployment remains prohibited until explicit owner approval. PayFast merchant approval remains pending; Peach link creation remains held. Direct EFT can be configured after the approved function deployment, using the five Supabase Dashboard secrets above.


## 2026-11-02 CATEGORY SNAPSHOT PR FOLLOW-UP
- PR #152 branch now includes commit `740ff571f759992c16f3dfbd2178d67e8c5219e0`, which enables the isolated config regression workflow on its own branch push. This was done because the new workflow did not yet appear in the PR check list; no check was falsely marked passed.
- PR #152 remains draft/open/unmerged. The latest observed combined commit status for the initial PR head was empty and the workflow-run lookup returned no PR-triggered runs. CI is therefore still **PENDING / NOT VERIFIED**. Do not merge or refresh the category snapshot until a real test result exists.
- Existing payment UI source review confirms checkout selects Direct EFT, displays all five configured bank fields plus `GW-<order number>`, and explicitly keeps payment status Pending until owner/admin verifies the deposit. WhatsApp handoff includes order reference/items/total and excludes bank details and delivery address. This is repository-source review only; deployed `store-checkout` remains version 5 and does not include this behavior.
- The source-side Direct EFT path is therefore prepared, but customer-facing bank instructions cannot be relied on until the reviewed function/migration set is deployed to an approved environment and all five secrets are configured there.


## 2026-11-02 OWNER AUTHORIZATION EXECUTED — CHECKOUT DEPLOYMENT
Owner explicitly authorized the reviewed checkout migrations and corrected functions to be deployed to the existing Store Supabase project. This authorization was acted on.

### Database migrations — applied and verified
Project ref: `ojytykqpvonxvepprgbh` (`Store`, eu-west-1).
- Applied `delivery_quote_nonce_unique` (migration version `20261102130448`).
- Applied `checkout_policy_audit` (migration version `20261102130454`).
- Preflight before applying: `public.orders` and `delivery_quote` existed; `create_store_order_v2` expected signature existed; zero existing duplicate quote nonce groups.
- Post-apply SQL verification: `create_store_order_v3(jsonb,text,uuid)` exists; anonymous and authenticated roles cannot execute it; service_role can execute it; all three policy audit columns exist; unique nonce index exists.

### Edge Functions — deployed and read back
- `shipping-quote`: deployed version **5**, ACTIVE, `verify_jwt=false` (public quote endpoint; server-side secrets required).
- `store-checkout`: deployed version **6**, ACTIVE, `verify_jwt=false` (function validates the authenticated customer bearer session itself).
- Deployment included the required shared source modules. Supabase read-back confirmed both deployed versions and source contents.
- `shipping-quote` no longer contains the private collection address. Live carrier requests are enabled only when all four private function secrets are configured: `COURIER_COLLECTION_ADDRESS`, `COURIER_COLLECTION_CITY`, `COURIER_COLLECTION_PROVINCE`, `COURIER_COLLECTION_POSTAL_CODE`. If missing, it skips live carrier requests rather than exposing a hard-coded address. PAXI published rates remain explicitly non-live/provisional.
- `store-checkout` validates customer session and confirmed email, policy acknowledgement, current product prices, pickup zero-fee rules or signed delivery quote binding, and calls the service-role-only `create_store_order_v3`. Direct EFT details are returned only when all five bank secrets and an order reference exist; payment remains pending until manually verified.
- Static source verification passed for the key controls (private-address removal, collection secret guard, signed quote issuance/validation, customer auth, policy acknowledgement, nonce binding, service-role RPC and all-or-nothing EFT fields). This is not a substitute for a live endpoint/checkout test.

### Repository alignment
- PR #153 merged: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/153
- Merge commit: `4ef21215b45a264fd9dd22b8c74ca9f77601f592`.
- Main read-back confirmed the private collection secret guard in shipping quote and `create_store_order_v3` usage in checkout.

### Still pending — do not mark payment/checkout test-ready
- GitHub Delivery Quote Security Tests did not return a workflow run/check in the connected GitHub view. No claim of behavioural CI success.
- Connected Supabase tools expose deployment/read-back but do not expose Edge Function invocation or Edge Function secret management. Therefore live endpoint tests and runtime secret presence could not be confirmed here.
- Before live courier quoting works, configure `DELIVERY_QUOTE_SIGNING_SECRET` (random secret, minimum 32 characters) and all four `COURIER_COLLECTION_*` values in Supabase Dashboard → Edge Functions → Secrets. Keep collection address private; do not paste it into chat or GitHub.
- Direct EFT bank details are intentionally not yet set. When ready, enter these as Edge Function secrets in Supabase Dashboard: `DIRECT_EFT_BANK_NAME`, `DIRECT_EFT_ACCOUNT_NAME`, `DIRECT_EFT_ACCOUNT_NUMBER`, `DIRECT_EFT_BRANCH_CODE`, `DIRECT_EFT_ACCOUNT_TYPE`. Never place these values in GitHub or chat. The UI shows a pending-transfer message until all five are present.
- Existing `payment-gateway` remains version 2 (Peach Payments) and is not activated. PayFast merchant approval remains pending. No payment provider activation, bank details, live transaction, customer order, production storefront deployment or DNS change occurred.
- Next safe verification: run Delivery Quote Security Tests workflow from GitHub Actions (workflow name `Delivery Quote Security Tests`) and exercise authenticated pickup checkout in a controlled test account; then configure secrets privately and test a signed delivery quote. No real customer payment/order test without explicit separate approval.


## 2026-11-02 POST-DEPLOY DATABASE ADVISOR REVIEW
- Supabase security advisor returned three warning categories:
  - `admin_list_orders` and `admin_update_order` are SECURITY DEFINER and executable by authenticated role. Read-only inspection confirms both functions explicitly reject missing `auth.uid()` and require an enabled row in `public.veyron_admin_users` before reading/updating orders. This is intentional admin gating; retain as a reviewed warning, do not revoke blindly.
  - Supabase Auth leaked-password protection is disabled. Recommended account-level hardening remains outstanding; connected tools do not expose the Auth password-security setting.
- Performance advisor flagged four unindexed foreign keys, including the new `orders_policy_acknowledged_by` reference, and numerous unused indexes / multiple permissive RLS policies. No unrelated index or policy changes were made during checkout deployment.
- Do not represent these unrelated advisor findings as resolved. Prioritize enabling leaked-password protection and review the new policy acknowledgement FK index in a separate controlled change.


## 2026-11-02 OWNER CONTINUATION POINT — REMAINING TASKS AFTER CHECKOUT DEPLOYMENT

This section supersedes earlier operational notes above wherever they describe the Supabase checkout functions or migrations as not yet deployed. Historical audit notes are retained for traceability; use the later verified deployment record and this continuation point as the current state. The protected owner-instructions block remains unchanged.

### Completed since the earlier handover checkpoints
- Owner asked what remains, then requested this handover be updated to continue from that point.
- The owner explicitly authorized deployment of the reviewed checkout migrations and corrected Edge Functions to the existing Supabase Store project. This was **not** production storefront or payment-provider launch approval.
- Database migrations `delivery_quote_nonce_unique` (`20261102130448`) and `checkout_policy_audit` (`20261102130454`) were applied and verified on project `ojytykqpvonxvepprgbh`.
- `shipping-quote` is deployed ACTIVE at version **5** and `store-checkout` is deployed ACTIVE at version **6**. Both were read back from Supabase after deployment.
- PR #153 was merged to main at `4ef21215b45a264fd9dd22b8c74ca9f77601f592`. Source alignment and static checks were verified.
- The hard-coded private courier collection address was removed. Carrier requests now require all four private `COURIER_COLLECTION_*` secrets. Missing values disable live carrier requests instead of exposing an address.
- Checkout source now validates customer session/confirmed email, policy acknowledgement, current prices, pickup or signed delivery quote, and invokes service-role-only `create_store_order_v3`. Direct EFT response requires all five bank secrets and an order reference; payment remains pending for manual verification.
- These deployments are **not** behavioural test evidence. No customer order, live transaction, bank detail, secret value or payment-provider activation was performed.

### Remaining tasks — current order of execution

#### A. Supabase secrets and checkout verification
1. Owner action: in Supabase Dashboard → project `Store` → Edge Functions → Secrets, configure `DELIVERY_QUOTE_SIGNING_SECRET` (random, minimum 32 characters) and the four private courier fields: `COURIER_COLLECTION_ADDRESS`, `COURIER_COLLECTION_CITY`, `COURIER_COLLECTION_PROVINCE`, `COURIER_COLLECTION_POSTAL_CODE`. Do not paste these values into ChatGPT or GitHub.
2. Owner action when Direct EFT is ready: configure `DIRECT_EFT_BANK_NAME`, `DIRECT_EFT_ACCOUNT_NAME`, `DIRECT_EFT_ACCOUNT_NUMBER`, `DIRECT_EFT_BRANCH_CODE`, `DIRECT_EFT_ACCOUNT_TYPE` in the same secure dashboard. Never commit or chat bank details. If the owner is not ready to configure bank details, keep EFT instruction display disabled/pending.
3. Run GitHub Actions workflow **Delivery Quote Security Tests** and record the actual run ID, tested SHA and result. Connected GitHub actions did not expose workflow dispatch at the last check; if still unavailable, owner must start it from Actions UI.
4. Perform controlled non-production behavioural tests: authenticated pickup checkout; rejection of unauthenticated/unconfirmed customer; required policy acknowledgement; tampered/expired/replayed delivery quote rejection; valid signed quote; order reference; pending Direct EFT state; WhatsApp handoff excluding bank details and private address. No real payment or customer-facing order.
5. Verify runtime secret presence by successful endpoint behaviour, not by asking for secret values. Do not mark checkout/payment test-ready until the actual endpoint tests pass.

#### B. Storefront deployment and acceptance
1. Resolve the known old-storefront mismatch. Do not assume a green code test means the canonical domain or preview serves the intended build.
2. Identify one current-main storefront candidate and exact commit SHA. Reconcile stale competing PRs before choosing an integration path; do not wholesale-merge stale PR #149.
3. Obtain a verified non-production hosted preview with its actual deployment URL and deployed SHA. PR #151's ASC preview workflow is manual-only; connected GitHub actions previously did not expose workflow dispatch. If the workflow is still not dispatchable through the connector, owner must start **Deploy ASC Catalogue Non-Production Preview** on branch `integration/asc-source-taxonomy-review-2026-11-02`; record the URL and SHA returned by the deployment.
4. Test desktop and mobile (including 360px and 390px widths): page shell consistency, category/subcategory navigation, product images, legibility/contrast, no horizontal overflow, no console/page errors, terms-before-buying, login-before-checkout, signup/email confirmation and order submission.
5. Owner must inspect and accept the actual preview on the Android phone. Do not claim preview acceptance before this happens.

#### C. Catalogue and commercial verification
1. Continue ASC beyond the existing **50-record review-only pilot**. Preserve original catalogue headings, subcategories and ordering; verify every item against source filename/page/code/model and exact image. The 63 OCR tokens remain unverified. No automatic/fuzzy category moves.
2. Do not treat October ASC guides as the post-reset November source. Obtain the correct November Buyer’s Guide/stock-arrival PDFs and reconcile the 38 historical price-scaling SKUs against printed cost, VAT basis, stock and effective date.
3. Continue Planetworld current-main read-only workbook audit. The historical audit is not current pricing evidence. Owner previously needed to run **Planetworld Workbook Audit (Read Only)** from GitHub Actions UI; record the run/job summary. Keep the 19 zero-RRP products inactive/quote-only and confirm every price against current printed RRP, dealer cost, VAT and effective date before proposing changes.
4. Integrate Audio Connections catalogue data using owner-confirmed dealer authorization; verify model-to-GW SKU, exact image, description, current price/VAT and availability. Do not expose supplier names to customers.
5. Visually review the 198 category-review rows and 528 products outside approved roots; retain source provenance and protected 107/107 October price results. No live category, price, stock or active-flag changes without separate approval.

#### D. Security and release
1. Enable Supabase Auth leaked-password protection through the account dashboard when owner access permits; review the new `orders_policy_acknowledged_by` foreign-key index and remaining advisor warnings in a separate controlled change. Do not revoke intentional admin-gated functions or make broad RLS/index changes blindly.
2. Resolve part-image-search endpoint security work and complete customer-facing policy/privacy checks.
3. Run regression tests against the exact final candidate SHA and verify that the hosted preview serves that same SHA.
4. Production remains **HOLD**. No Axxess upload, DNS change, public production deployment, payment-provider activation, live catalogue/price/stock changes or production release workflow unless the owner gives separate explicit approval. Checkout deployment authorization above does not grant any of those permissions.

### Immediate owner input — only what is genuinely required
- Configure the delivery signing and courier collection secrets securely in Supabase as described in section A. The owner does not need to disclose any secret values in chat.
- Start the manual ASC non-production preview workflow only if the owner wants the 50-record catalogue preview hosted now and the connected GitHub workflow controls remain unavailable.
- Provide the post-reset November ASC source PDFs if they are not already uploaded to the repository/Library.

### Continuation rule
Start with the first task that can be executed safely using available connected tools. Do not repeat completed migrations, function deployments, PR #153, ASC source extraction or the existing 50-row preview implementation. After each meaningful change, record exact SHA/run ID, outcome and evidence here. A task is complete only when the stated verification exists. The owner wants execution and tangible results, not repeated plans or status-only messages.


## 2026-11-02 SCHEDULED MONITOR — TASK START (15:13 SAST)
- Read the sole retained handover on the current `main` ref before acting. The former `AI_HANDOVER_PERMANENT.md`, `HANDOVER_CURRENT.md`, and dated checkpoint/update files were intentionally removed under the owner's 2 November repository-cleanup instruction; do not recreate them or treat them as current. This sole continuation file is authoritative.
- Scope this run to read-only workflow/PR/source review and safe non-production code work. Production remains HOLD. No production workflow reruns, deployment, Axxess, DNS, payment credential, live data, supplier publication, or credit-consuming deployment action is authorized.
- Task start: 2026-11-02 15:13 SAST. In-progress: refresh workflow states/attempts, inspect open candidate PRs and current ASC/payment/category blockers, then append verified outcomes and exact identifiers here.


## 2026-11-02 SCHEDULED MONITOR — RESULTS (15:13–15:30 SAST)

### Task start and repository state
- Task-start entry was committed first at `f301ca979237191a266f8fd9784b848e5b5e6766` after reading this sole retained handover. Do not recreate the deleted `AI_HANDOVER_PERMANENT.md`, `HANDOVER_CURRENT.md`, or dated checkpoint/update files; the owner-directed cleanup left this continuation file authoritative.
- Background controller run `41450301774` (attempt 1, commit `536d4cbf79489ab335a12f5780e82aaf9695fa3e`) completed successfully. It checked 9 workflows; 3 completed runs needed attention; 0 were running; 0 retries were requested; 0 monitoring/API errors.
- Its artifact inventory contained 417 Actions artifacts totalling 120,189,390 bytes (114.62 MiB). Largest was `axxess-storefront-upload`, 110,905,519 bytes. No artifacts were deleted; cleanup totals were all zero.
- Review found a latent unsafe cleanup defect in the controller: `staleBuildCutoff` was 24 hours while the log reason claimed “older than 7 days”, and the step had permission to delete artifacts without a fresh owner approval. No deletion happened in run `41450301774`. PR #154 replaces the deletion step with read-only inventory.

### Required workflow checks — latest known attempts
- Staging Category Navigation Chromium Acceptance: run `38521429939`, attempt 1, success, commit `14c16fa76f0e3c2c58596ff69608edc18e0b5578`, 2026-10-14.
- Extract Buyer Guide PDF Text (Staging Only): run `38525300051`, attempt 1, success, commit `999c715872d6b07d98c559605739283f38dbcd88`, 2026-10-14.
- ASC Exact-SKU Image Sync (Bounded): run `41030204263`, attempt 1, success, commit `f0c6553c96c21a98ba9c6c673dde9eb6fd7a9313`, 2026-10-30. It was a no-op: 86 missing-image targets, 0 eligible targets, 0 diagnostic-batch items. No retry because the run succeeded and there were no eligible source-backed targets.
- Catalogue Image Audit: run `41422204385`, attempt 1, success, commit `4867ae8799dce3a035b9c2bf80fa3f739e0f4131`. Results: 4,093 public proxy image references; 8 direct WebP references; 86 placeholder URLs; 4,101 public-SKU WebP assets; 0 invalid/mismatched references; 800 internal source-image files. All 4 Cloudflare asset-origin checks passed. The deployed-function smoke test was explicitly skipped because `GW_PRODUCT_IMAGE_FUNCTION_CDN_DEPLOYED` was not set to true and deployment requires owner approval.
- Cloudflare Pages Public Package QA: run `41403328878`, attempt 1, success, PR #151 head `a40b11a038cb1d1fc67334003c3b30208944c8c4`. This is package QA, not a deployment.
- ASC Catalogue Preview Browser QA: run `41403328879`, attempt 1, success, same PR #151 head. Desktop/mobile Chromium checks passed.
- Populated Store Preview Browser QA: run `41403328973`, attempt 1, success, same PR #151 head. Playwright install, Chromium install, and read-only populated preview checks passed.
- Storefront Smoke Test on main: run `41450229277`, attempt 1, overall success, commit `4ef21215b45a264fd9dd22b8c74ca9f77601f592`; however, only the buttons-only mode detector ran. The actual `smoke` job was skipped. PR #151 run `41403328870` had the same outcome. Do not report a full storefront smoke pass.
- Store Production QA: run `41050575994`, attempt 2, failure. Source validation passed; canonical production-domain reachability failed; subsequent checks were skipped. Do not rerun.
- Live Release Gates: run `41396929209`, attempt 1, failure. Live HTTPS/routes/version-marker check passed; Playwright/Chromium installation failed; live navigation and checkout UI checks were skipped; payment-readiness gate failed. Do not rerun.
- Refresh Category Snapshot: run `41432752904`, attempt 1, failure at “Refresh active category counts”; snapshot commit step was skipped. PR #152's isolated Category Snapshot Config Regression run `41449633110`, attempt 1, passed on PR head `740ff571f759992c16f3dfbd2178d67e8c5219e0`. Do not rerun the snapshot refresh until the fix is approved and merged.
- Delivery Quote Security Tests: run `41450008314`, attempt 1, success on PR #153 head `3dfab98f0241dd3f6f912977b9d4235be32dc848`. All test steps passed, including quote-token behavior, isolated PostgreSQL nonce migration, isolated checkout-handler integration, collection-address privacy, Direct EFT/WhatsApp handoff, and TypeScript checks. PR #153 merged at `4ef21215b45a264fd9dd22b8c74ca9f77601f592`.
- No Cloudflare deployment run was found in the latest 100 Actions runs. `Deploy Store to Cloudflare Pages` remains manual-only; it was not dispatched. Production remains HOLD.

### Material product-image production mismatch
- Supabase project readback: `product-image` is ACTIVE v11; `store-checkout` is ACTIVE v6; `shipping-quote` is ACTIVE v5. Latest applied migrations are `20261102130448_delivery_quote_nonce_unique` and `20261102130454_checkout_policy_audit`.
- Deployed `product-image` v11 source still points at private GitHub raw/jsDelivr URLs. The repository source at `supabase/functions/product-image/index.ts` (blob `6cdc38b4aff80c1c5c6b14e3b099d668dc608449`) instead uses the approved public Cloudflare Pages asset origin `https://approved-storefront-preview.get-wired-autoworx-store.pages.dev` and deliberately avoids private GitHub origins.
- Read-only function-edge logs for 2026-11-01 13:13Z to 2026-11-02 13:13Z showed 2,083 GET requests to `/functions/v1/product-image`, all HTTP 404. Of these, 48 were South-African mobile-origin requests; do not assume all traffic is customer traffic. Those 48 requests contained 23 distinct public GW SKUs. Read-only database checks found all 23 products active with supplier mappings, and the repository tree contains exact public-SKU WebP assets for all 23. This strongly indicates deployed v11 is serving from the wrong (private GitHub) origin, not that those 23 catalogue records are missing.
- No checkout or shipping-quote function-edge requests were observed in that 24-hour window; the successful isolated tests do not prove live endpoint behavior.
- Owner approval is required before deploying the already-prepared repository `product-image` function to the Store Supabase project. After approval, deploy only that function and verify HTTP 200 for several of the affected public SKUs. No Supabase deployment or live data write was performed in this run.

### Open PRs and release boundaries
- PR #151 remains draft/open: 29 commits, 66 files; head `a40b11a038cb1d1fc67334003c3b30208944c8c4`; base `7ea5c5828bb68dc6831cd6badd2ff9e2233802b3`; it is 16 commits behind current main and 29 ahead. Six PR checks passed, including ASC preview and populated preview browser QA. It stages 50 visually reviewed pilot records across 12 subcategories; 63 OCR candidates remain quarantined. Do not merge as-is or deploy.
- PR #152 remains draft/open: 6 commits, 4 files; head `740ff571f759992c16f3dfbd2178d67e8c5219e0`; base `27006f956f117d01d1911fdc8b6f2a131d63698e`; 9 commits behind current main. Its isolated regression test passed. Do not merge or refresh category snapshot without owner approval.
- PR #153 is merged at `4ef21215b45a264fd9dd22b8c74ca9f77601f592`.
- PR #154 is new draft/open: [Harden background controller: read-only artifact inventory and targeted safe retries](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/154). Branch `fix/background-controller-safe-monitor-2026-11-02`, head `25962ba914f167baa26918a33c7b2426d55043c4`, base `f301ca979237191a266f8fd9784b848e5b5e6766`. It removes automatic artifact deletion, changes the fallback schedule to hourly, monitors 18 required workflows using stable IDs where needed, supports one targeted retry of only failed/cancelled/timed-out/startup-failure jobs, skips queued/in-progress runs, and excludes image sync, snapshot writes, production QA/release gates and deployments. Static source assertions all passed in this run. No PR workflow run was available because the new safety-test workflow is not yet on the default branch; its push test becomes active after owner-approved merge. Do not merge without owner approval.
- The `Deploy ASC Catalogue Non-Production Preview` workflow exists only on PR #151's branch, not on `main`. It is manual-only and uses Cloudflare deployment credentials. GitHub's `workflow_dispatch` Run workflow button is available only when the workflow file exists on the default branch; therefore the previous instruction to dispatch this branch-only workflow directly was not actionable. First the workflow must be approved and made available on the default branch; then the owner must explicitly approve the Cloudflare preview deployment. No deployment or credit use occurred.
- PR #149 remains stale/draft and mergeable=false; do not merge. PR #150 and #143 remain drafts; no merge performed.

### Next precise actions
1. Obtain explicit owner approval to deploy the prepared `product-image` Edge Function to Supabase Store, then run the gated HTTP-200 smoke test for active public SKUs.
2. Owner review/approval for PR #154's controller safety changes; keep artifact inventory read-only until then.
3. Owner approval to integrate PR #151's ASC pilot/workflow after reconciling its 16-commit divergence; only then make the manual preview workflow available on default branch and request separate Cloudflare preview-deployment approval.
4. Owner approval for PR #152 before controlled category snapshot refresh.
5. Complete authenticated live checkout and delivery-quote behavior verification before any payment-readiness claim. Production/Axxess/DNS/payment activation remain on hold.


## 2026-11-02 PR DIVERGENCE COUNT CORRECTION (15:32 SAST)
- Recomputed against main head `9dbdbf5005a5af0ed03996e9a18b9870e877ea31`: PR #151 is 29 commits ahead / 17 behind; PR #152 is 6 ahead / 10 behind; PR #154 is 4 ahead / 1 behind. All are diverged from current main; none was merged.
- This documentation-only correction adds one main commit. Expected counts immediately after it: PR #151 29 ahead / 18 behind; PR #152 6 ahead / 11 behind; PR #154 4 ahead / 2 behind. Recheck exact counts before any future merge. No merge or deployment is authorized by this note.


## 2026-11-02 CONTINUATION EXECUTION — PART-IMAGE-SEARCH HARDENING (17:43 SAST onward)

### Handover read and current blockers
- Read this sole retained handover before continuing. No deleted handover files were recreated.
- Confirmed the latest known deployed Supabase \`product-image\` function remains ACTIVE v11, while repository source uses the approved Cloudflare Pages asset origin. The handover's earlier 2,083 product-image 404s remain the last positive evidence. A read-only query for the subsequent 2.5-hour interval (2026-11-02 13:13Z–15:43Z) returned no matching \`/functions/v1/product-image\` request rows; this is not proof the 404 issue is fixed or that requests have stopped permanently.
- No deployment of \`product-image\` was performed. Owner approval is still required before replacing deployed v11 with repository source and verifying affected SKUs return HTTP 200.
- Supabase function inventory readback still lists \`part-image-search\` ACTIVE v2. No new ASC November Buyer’s Guide/stock-arrival PDF was found in the Library search. The six post-reset ASC family PDFs named in \`suppliers/ASC/README.md\` remain the available post-reset intake; do not confuse these with a missing November Buyer’s Guide or restore old pre-reset catalogues.
- Library contains an Audio Connections Starsound price list dated 5 August 2026. This is historical, not a current November price source; do not use it to set live prices without a current dealer price list.
- PR #151 remains draft/open and is not merged; PR #152 remains draft/open; PR #154 remains draft/open; PR #155 is the new part-image-search hardening draft. No PR merge or production deployment was performed in this continuation.

### Issue #30 — durable part-image-search abuse controls staged
- Created branch \`fix/part-image-search-durable-abuse-controls-2026-11-02\` from main \`135794014ef6f74132999cb34082f7dc83926fbd\`.
- Opened draft PR #155: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/155
- Latest branch head: \`b652add2fe6399132e9940ac9ccf89d2b37f22f5\`; PR compares 13 commits ahead / 0 behind the main base at creation; mergeable=true at last readback; draft remains true.
- Changed-file inventory (6):
  1. \`.github/workflows/part-image-search-security.yml\`
  2. \`supabase/functions/part-image-search/README.md\`
  3. \`supabase/functions/part-image-search/index.ts\`
  4. \`supabase/functions/part-image-search/security.mjs\`
  5. \`supabase/migrations/20261102160000_part_image_search_rate_limit.sql\`
  6. \`tests/part-image-search-security.test.mjs\`
- Migration stages private \`gw_private.part_image_search_rate_limits\` table plus atomic \`service_role\`-only RPC, HMAC-hashed client IP identifiers (no raw IP stored), eight requests per 60 seconds, expiry and bounded opportunistic cleanup. Table RLS is enabled and direct client roles are revoked.
- Edge Function now requires an approved Origin, trusts only Cloudflare's \`cf-connecting-ip\`, enforces a streamed 5.6 MB JSON body limit and 4 MB decoded-image limit, checks strict base64 and JPEG/PNG/WebP magic bytes, calls the durable shared limiter before OpenAI inference, fails closed if the limiter is unavailable, and retains a 25-second upstream timeout with sanitized errors.
- First test run \`41475234714\` exposed a stack overflow in the large-base64 validator (13 passed / 1 failed). Corrected validation to estimate decoded size before a linear base64 syntax check and added branch-push workflow triggering.
- Follow-up workflow run \`41475372871\`, job \`125379419522\`, completed **SUCCESS: 14 passed / 0 failed** on the corrected branch. Log readback confirmed all 14 tests passed. PR body and issue #30 were updated with the evidence.
- Exact-head other checks: \`detect-storefront-mode\` SUCCESS; \`quote-integrity\` SUCCESS; general \`test\` SUCCESS; \`smoke\` SKIPPED because main is buttons-only. Netlify header/redirect/page checks were neutral. Cloudflare Pages check \`125379411455\` was still IN_PROGRESS at last readback; it is an automatically triggered PR preview/build check, not an owner-approved production release. Do not claim hosted preview acceptance from this.
- Static tests are not runtime PostgreSQL validation. Outstanding for issue #30: apply migration only after owner approval; test the RPC against PostgreSQL including concurrent requests and expiry cleanup; add complete mocked endpoint tests for missing OpenAI key/no upstream request and provider 401/429/5xx/success; verify concurrency/load behavior; inspect customer disclosure on the actual preview. No migration was applied, no secret was configured, no function was deployed, and no paid OpenAI inference was enabled.

### Other owner-input gates remain
1. Owner approval required before deploying repository \`product-image\` function to Supabase Store.
2. Owner must configure delivery signing/courier secrets privately in Supabase to enable delivery quote behavior; Direct EFT bank fields are optional until owner is ready.
3. Owner must provide the post-reset November ASC Buyer’s Guide/stock-arrival source bytes if they are available outside the repository/Library; no such guide was located in the latest Library search.
4. Owner review/approval remains required for PR #151 integration and a separate Cloudflare non-production ASC preview deployment; PR #152 category snapshot refresh and PR #154 controller safety merge remain gated.
5. Production remains HOLD. No Axxess, DNS, payment-provider activation, live catalogue/price/stock changes, migration deployment or production storefront release was performed in this continuation.

### Continuation
Do not merge PR #155 or apply its migration merely because its 14 unit tests pass. First close the runtime SQL/concurrency and endpoint mock-test gaps, then seek owner approval for the migration/function deployment as a separate gate. Continue other safe code/review tasks without repeating the already completed checkout migration/function deployment or ASC source taxonomy/pilot extraction.


## 2026-11-02 CONTINUATION UPDATE — ISSUE #30 TESTS AND AUDIO CONNECTIONS STAGING

### Part-image-search hardening — expanded verification
- PR #155 latest head remains \`dbc33e98c4f09ca6e7bf324057ffa5b5891ee5f3\`, draft/open/unmerged, mergeable=true at last readback.
- Added mockable OpenAI vision request helper and tests for missing API key (503 without upstream call), mocked success, malformed response, 401/403, 429, 5xx and network failure.
- Added disposable PostgreSQL 16 CI integration: migration applied successfully in CI only; verifies client roles cannot read/execute, service_role can execute, eight requests allowed / ninth denied, expired window resets, and cleanup deletes at most 500 expired rows.
- Added concurrent test: 16 simultaneous calls against one HMAC key yielded exactly 8 allowed and 8 denied.
- Final security workflow run \`41476234758\` / job \`125382419583\` completed SUCCESS: **19 Node tests passed, 0 failed; PostgreSQL migration and integration tests passed; concurrent rate limit passed**.
- Cloudflare Pages PR preview check completed SUCCESS. Auxiliary Cloudflare Workers Builds check \`125384129033\` completed FAILURE; cause not established and no retry started. General storefront smoke was SKIPPED because main is still buttons-only. No claim of hosted edge endpoint behavior or customer preview acceptance.
- No migration was applied to the Store Supabase project; no Edge Function was deployed; no secret or OpenAI billing configuration changed. PR #155 remains draft. Do not merge or deploy until owner approval and remaining live endpoint verification.
- Issue #30 was updated with final CI evidence.

### Audio Connections — Sony Mobile ES source intake
- Repository source folder contains \`Sony Mobile ES Dealer Price List Sept 26.pdf\` (2 pages, September 2026), plus \`STARSOUND Price Lists 05 AUGUST 2026.pdf\`. No newer Audio Connections catalogue or current November dealer list was found in the latest Library search.
- The September Sony source provides 15 models: 7 speaker/grille records, 3 subwoofers and 5 amplifiers. It states Price Ex and RRP, but does not state the RRP VAT basis; it warns prices may change with exchange rates. It includes no product photographs.
- Read-only Store Supabase matching on SKU, public SKU, product name/description and private supplier-code mapping found zero exact Sony Mobile ES model matches. No live records changed.
- Staged the 15 source rows in draft PR #156: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/156
- Branch: \`staging/audio-connections-sony-mobile-es-sept-2026-2026-11-02\`; head \`8947d8a862ab8b6f6316a7d3788908154c28d2f0\`. Changed files: README and \`staging/sony-mobile-es-sept-2026-review.csv\`.
- CSV readback verified 15 data rows, 16 columns in every row, 15 unique source models. \`XS-690ES\` is explicitly marked Sold Out and inactive/review-only. \`XS-W122ES\` and \`XS-W124ES\` require variant verification because the source repeats headline specs.
- All rows remain REVIEW_ONLY. No GW SKU, exact image, current stock, live selling price, product record, customer-facing listing or supplier activation was created. Supplier name remains internal.
- PR #156 is draft/open/unmerged, mergeable=true at last readback. Its Cloudflare Pages preview was still IN_PROGRESS at last check; no preview acceptance claimed.

### Owner approval and source inputs still needed
1. **Product image 404 fix:** approve or decline deployment of the corrected repository \`product-image\` Edge Function to the existing Store Supabase project. Earlier handover evidence recorded 2,083 404s. A later 2.5-hour log query returned no matching request rows, which does not prove resolution. Do not deploy without explicit approval.
2. **Part-image-search:** owner approval required before applying PR #155 migration to the Store project or deploying its Edge Function. CI is strong disposable evidence but not hosted Supabase runtime proof.
3. **Delivery checkout:** configure delivery signing and courier collection secrets privately in Supabase; Direct EFT bank fields remain optional until owner is ready. Never request secret values in chat.
4. **ASC:** supply post-reset November Buyer’s Guide/stock-arrival source bytes if they exist outside the Library/repository. Existing six ASC family PDFs are not a substitute for a missing November Buyer’s Guide.
5. **Audio Connections:** obtain a current dealer price list and product images/catalogue for Sony Mobile ES and remaining brands; September 2026 price data is review-only. Verify exact model/image, GW SKU, VAT basis and stock before any listing.
6. PR #151, #152 and #154 remain separate review/approval gates. Do not merge them merely to close outstanding work.
7. Production remains HOLD: no Axxess upload, DNS, public storefront deployment, payment-provider activation, live catalogue/price/stock changes or release workflow without separate explicit owner approval.

### Continue from here
- Do not repeat the 19 unit tests, disposable PostgreSQL integration, concurrent test, Sony 15-row extraction, or exact-SKU matching; reuse their recorded evidence unless code/source changes invalidate it.
- Diagnose the auxiliary Cloudflare Workers Builds failure on PR #155 without retrying release/deployment workflows or consuming further credits.
- Continue other safe catalogue staging and code review while awaiting only the explicit owner approvals/source inputs above.


## 2026-11-02 CHECK-RUN CLOSEOUT
- PR #156 Cloudflare Pages preview check subsequently completed **SUCCESS** (check \`125384680934\`); \`inspect\` workflow run \`41476655400\` also SUCCESS. This confirms build/preview pipeline completion only; no customer acceptance, product listing, exact image or live data change.
- PR #155 Cloudflare Pages preview check completed **SUCCESS** (check \`125382772716\`); security workflow run \`41476234758\` remains SUCCESS. Auxiliary Cloudflare Workers Builds check \`125384129033\` remains **FAILURE**, cause not established. Do not retry without diagnosis and owner approval if a deployment retry would consume credits.


## 2026-11-02 OWNER AUTHORIZATION EXECUTED — PRODUCT IMAGE FUNCTION
- Owner explicitly authorized deployment of the corrected \`product-image\` Edge Function and instructed: **do not waste Supabase credits**.
- Deployed once to existing Supabase project \`Store\` (\`ojytykqpvonxvepprgbh\`, eu-west-1). Function is ACTIVE at **version 12**, \`verify_jwt=false\` preserved.
- Deployment source was the current repository \`supabase/functions/product-image/index.ts\`. It now fetches only from the explicitly approved Cloudflare Pages preview asset origin \`https://approved-storefront-preview.get-wired-autoworx-store.pages.dev\`, with public WebP assets tried before private supplier-code JPG fallback. It no longer fetches product images from private GitHub raw URLs or jsDelivr.
- Builder source readback confirms the Cloudflare Pages public package copies \`assets/products_webp\` into the output and excludes internal supplier/catalogue/source folders. This is the intended public asset origin.
- Supabase readback after deployment confirms ACTIVE v12, unchanged \`verify_jwt=false\`, exact preview-origin reference, no GitHub raw/jsDelivr sources, and WebP-first lookup. Deployed function hash: \`7fdbfb3e2910bc523a939d08454ebdbfeef203ed1b46deaeacc695e296dfbf69\`.
- Credit restraint: performed one deployment and one readback only. No schema/database migration, SQL query, log query, repeated deployment, bulk image request or catalogue write was performed. No expensive repeated tests or retries.
- **Verification boundary:** deployment/readback is confirmed; a live customer image request and post-deploy 404-rate reduction have NOT been tested because that would invoke the function and query the Store database. Do not claim the 2,083 historical 404s are resolved until a low-volume, owner-approved spot check is possible. No further Supabase requests should be made without a clear diagnostic need.
- This authorization covers this function deployment only. It does not approve public storefront deployment, DNS, payment activation, catalogue/stock/price writes, or other function/migration deployments.


## 2026-11-02 AUTOMATED CONTINUATION AUDIT — CURRENT PR HEADS AND CI
- Re-read the sole handover and protected owner instruction block before work. No Supabase calls, database writes, production deployments, DNS changes, payment activation, catalogue/stock/price writes, or workflow retries were performed.
- Fresh GitHub metadata readback confirms these six active PRs remain OPEN / DRAFT / UNMERGED:
  - #149 storefront consolidation: head `e37aacbbb11163a9b5f25c543862b377f0d25cc2`, base ref `main`, GitHub reports mergeable=false. A fresh compare against current main (base `27624dca2b0c7e74448c3797120e68ecf18ab7e6`) reports **46 commits ahead / 108 behind**, diverged, with compare file listing capped at 200. This is not a safe merge candidate. Do not try a blind rebase/merge; it needs selective reconstruction of the approved storefront work on current main.
  - #151 ASC pilot: head `a40b11a038cb1d1fc67334003c3b30208944c8c4`; existing six CI checks were SUCCESS, including populated preview browser QA and ASC preview browser QA. Its base SHA is stale (`7ea5c5828bb68dc6831cd6badd2ff9e2233802b3`); preserve as evidence/source, but reconcile against current main before any integration. Draft/approval gate remains.
  - #152 category snapshot config: head `740ff571f759992c16f3dfbd2178d67e8c5219e0`; isolated regression workflow `41449633110` SUCCESS. Base SHA `27006f956f117d01d1911fdc8b6f2a131d63698e` is stale. Draft/approval gate remains; do not run a live snapshot refresh without approval.
  - #154 background controller safety: head `25962ba914f167baa26918a33c7b2426d55043c4`; Background Controller Safety Tests workflow `41452514667` SUCCESS. Base SHA `f301ca979237191a266f8fd9784b848e5b5e6766` is stale. Draft/approval gate remains; no artifact deletion or controller execution.
  - #155 part-image-search security: head `dbc33e98c4f09ca6e7bf324057ffa5b5891ee5f3`; security, storefront smoke and delivery quote security workflows `41476247755`, `41476247858`, `41476247865` all SUCCESS. This supplements the recorded 19 Node tests + disposable PostgreSQL/concurrency CI. The separate auxiliary Cloudflare Workers Builds failure remains unexplained. Draft/approval gate remains; no migration or function deployment.
  - #156 Audio Connections Sony Mobile ES: head `8947d8a862ab8b6f6316a7d3788908154c28d2f0`; PDF source inspection workflow `41476655400` SUCCESS. All 15 source rows remain review-only; no current pricing, product photos, GW SKU mapping or live listings. Draft/owner source-validation gate remains.
- Reused recorded evidence rather than rerunning passed workflows. No expensive builds/retries were triggered. The product-image function remains deployed ACTIVE v12 as separately recorded above; no runtime image spot check was run.
- **Execution decision:** do not merge any of these drafts automatically. #149 must be rebuilt selectively because its divergence is extreme; #151 is the most valuable ASC evidence branch but must be reconciled; #152/#154 are small supporting automation fixes with passed isolated tests but still need current-main refresh and owner approval; #155 requires hosted runtime/owner approval; #156 awaits current supplier inputs.
- Next safe automated work is source-only reconstruction/testing of the approved bright storefront on a fresh current-main branch, preserving the #151 ASC taxonomy/pilot evidence and #156 review-only intake. Do not copy the stale full #149 branch or merge it wholesale. Keep production HOLD.


## 2026-11-02 OWNER PRIORITY CORRECTION — STOREFRONT AND PRODUCT CATALOGUE FIRST
- Owner clarified the actual commercial priority: a correct, attractive, populated customer storefront is the prerequisite. Payment and delivery work must not displace storefront and catalogue work; customers will not buy if the storefront, navigation, layout or product presentation is wrong.
- ASC catalogue instruction: load each ASC catalogue following its original source format, ordering, headings, categories and subcategories. Extract/crop the actual product photographs from the catalogue pages and associate each image with its exact product record. Create a unique Get Wired SKU for every approved product and retain a private internal mapping to the original ASC SKU. Customer-facing pages must advertise only the Get Wired SKU; never expose ASC supplier SKUs. Preserve source filename/page and exact source code in internal provenance.
- Image instruction for Planetworld, Audio Connections (including Sony Mobile ES), and other supplier catalogues: search the web using exact model numbers and variants; obtain and prepare the matching product photographs rather than using generic placeholders. Verify model/variant identity before attaching an image. Prefer manufacturer/authorized brand imagery and retain source URL/provenance and usage/permission status. Do not use a near-match, sibling variant, or generic image as though it were the exact product. Where a suitable image cannot be verified, keep it in review rather than publishing a placeholder.
- Work order reset: (1) correct shared storefront shell, design, layout, navigation and category/subcategory browsing; (2) load and reconcile source catalogues, product descriptions and Get Wired SKUs; (3) extract/source and verify real product images; (4) validate populated product pages, search and mobile/desktop customer experience; (5) only then return to secondary checkout/delivery polish, except for existing safety/security blockers that materially prevent testing.
- No payment/delivery task should be described as the primary next milestone while the customer-facing storefront remains incorrect or unpopulated.
- This priority correction does not authorize publishing supplier content, changing live stock/prices/categories, removing supplier watermarks/rights notices, or deploying to production. Product images must be lawfully usable; retain source provenance and do not falsely claim image rights.
- Execution discipline: reuse the completed ASC taxonomy and 50-record pilot evidence; do not repeat extraction already done. Selectively reconstruct on current main; do not merge stale PR #149 wholesale. Maintain the private supplier-SKU-to-GW-SKU mapping outside customer-facing assets.

## 2026-11-02 STOREFRONT CATALOGUE SOURCE AUDIT — VERIFIED
- Current default branch read at commit `f7c84ec23c0ca3f4f7609eb2bdda5f0a42c8d1d8`.
- Draft PR #157 current head is `24fff722674cf9b65d91bebaf5cb807cc75bc47f`; it remains OPEN / DRAFT / UNMERGED. It restores the brighter homepage but does not resolve catalogue data provenance or old ASC record filtering.
- `preview-products.html` was inspected at blob `e6568d9c3d3db2fa9033d6529b76435485793fb7`. Its product queries select all `active=true` public.products rows by category (and child categories for audio groupings). They do not filter by supplier, source catalogue, source date, or approved catalogue intake. The visible `ASC STOCK REMOVED` notice is static text and is not an enforcement mechanism. Therefore old ASC stock exclusion is NOT verified by this route; do not claim it is removed.
- `preview-product.html` reads public product fields by ID and renders public_sku, name, description, price, stock, image and selected specifications. Internal metadata filtering is regex-based presentation cleanup, not a source-eligibility control.
- Current ASC intake is exactly six post-reset PDFs (Aerials, Automotive Sensors, Automotive Switches, Automotive Globes, Car Mats, Fuel Pumps), 72 scanned pages, with review-only OCR. The README explicitly states no product rows/prices/images/stock/database records were created by that extraction.
- Planetworld/Audio Connections supplier crosswalk summary records 702 Planetworld rows + 68 Audio Connections rows, 81 candidate GW SKUs, zero live product matches, 770 staged supplier_catalog_items inactive/unlinked/quote-on-request, and zero official image assets downloaded/approved. These are staging records, not published products.
- `OWNER_APPROVED_GW_SKU_STAGING_2026-10-30.csv` records candidates as staging-only/not inserted/not published; image assets are not downloaded/approved. It is not a live product feed.
- Immediate next engineering gate: establish a provenance-aware, non-production preview catalogue source that only includes items admitted from the post-reset approved source set, with private supplier-SKU crosswalk and public GW SKU only. Until that source exists and is tested, do not render arbitrary active Supabase products under an “ASC stock removed” claim. Do not change live product records, active flags, stock, prices, or supplier tables.
- Next execution sequence: (1) inspect and validate the current preview/public build source selection and remove any misleading assertion if it cannot be enforced; (2) build a versioned review-only catalogue manifest from the six ASC PDFs with source file/page/heading, exact SKU/model, GW SKU, image-match status and eligibility; (3) manually resolve OCR uncertainty and image pairing before any item enters the preview manifest; (4) add a preview-only allowlist gate and tests proving old/unapproved source records cannot leak into catalogue routes; (5) repeat desktop/mobile hosted QA on exact commit and obtain owner acceptance. No production actions.


## 2026-11-03 OWNER REQUEST — CONSOLIDATE CURRENT WORK FOR TESTING
- Owner explicitly requested: “Merge all the work that you have done so far into the latest store version to test.”
- Re-read this handover before acting. Current main tip remains `27a21f66cade81989806d5a86d9d6beafcea3006` (latest repository commit search at 2026-11-03 check time).
- Existing consolidated candidate is PR #162, branch `integration/current-storefront-plus-asc-preview-2026-11-02`, exact head `d9424f8af985f856ce45bbe8db104149a5bbe2e4`, based on current main `27a21f66cade81989806d5a86d9d6beafcea3006`. It selectively combines the bright eight-category storefront entry, fail-closed legacy product routes, ASC source taxonomy, and 50 review-only ASC pilot records with 50 matching image crops.
- Cloudflare Pages successfully built/deployed this exact candidate to preview: https://d9c23476.get-wired-autoworx-store.pages.dev (branch preview https://integration-current-storefro.get-wired-autoworx-store.pages.dev). This is a preview deployment, not a production release or owner acceptance.
- Exact-head checks on #162 are not green: Cloudflare Pages PASS; Workers Builds FAIL; public-package QA FAIL; button-only smoke FAIL; public SKU exposure audit FAIL; populated preview browser QA FAIL; preview approved-catalogue gate FAIL; catalogue/supplier routing responsive review FAIL; ASC catalogue browser QA FAIL; storefront smoke detection FAIL (smoke job skipped). No test retries or deployment retries were triggered.
- GitHub job-log download endpoint returned NOT_FOUND/BlobNotFound during diagnosis; step-summary endpoint returned empty arrays. Failure causes therefore remain unclassified and need source/workflow-level diagnosis before merge.
- Decision: did NOT merge PR #162 or any other draft PR. Owner authorized consolidation “to test”, not production release; current PR #162 checks are failing and a merge into main would be premature. PR #149 remains unsafe to merge wholesale due severe divergence. PR #156 remains review-only supplier data with no verified images/current price/GW SKU; PR #155 is backend security code requiring its separate migration/function approval gate; PRs #152/#154 are supporting code changes, not storefront content. Do not bulk-merge unrelated drafts.
- Immediate next action: inspect #162 failing workflow definitions and relevant source files, fix the actual causes on a dedicated current-main integration branch, then run focused deterministic tests. Reuse the existing successful CI evidence for the independent security and source-intake tasks; do not repeat completed extraction. Keep production HOLD and do not merge to main, publish supplier data, change DNS/Axxess, or write live catalogue data without separate explicit authorization.


## 2026-11-03 DELIVERY ACCOUNTABILITY AND PR #162 RECHECK
- Owner reiterated that the original 2 November target was missed and expects the store completed today, 3 November. This is an owner deadline, not evidence of completion; do not promise readiness without the required acceptance evidence.
- Re-read this sole handover before work. Rechecked PR #162 exact head `d9424f8af985f856ce45bbe8db104149a5bbe2e4` and its associated checks. Cloudflare Pages preview deployment succeeded at https://d9c23476.get-wired-autoworx-store.pages.dev (branch preview https://integration-current-storefro.get-wired-autoworx-store.pages.dev). This proves deployment only, not browser acceptance or production readiness.
- PR #162 remains open/draft/unmerged. It contains the bright eight-root storefront and an ASC preview pilot of 50 records/50 images; this is not full ASC catalogue integration and no customer-facing live catalogue publication.
- Exact-head failing checks re-observed: Workers Builds; Cloudflare Pages Public Package QA; Button-Only Storefront Smoke Test; Public SKU Exposure Audit; Populated Store Preview Browser QA; Preview Approved Catalogue Gate; Catalogue & Supplier Routing Review QA; ASC Catalogue Preview Browser QA; Storefront Smoke Test mode detection. The Storefront Smoke Test browser job was skipped. Cloudflare Pages deployment itself succeeded. Netlify redirect/header checks were neutral/no rules, not failures.
- Attempted to retrieve GitHub job logs for the eight failed jobs; GitHub's temporary log-blob endpoint returned 404 BlobNotFound. The available check-run summaries contain no failure annotations/details, and the connector's job-step response is empty. Exact failure causes therefore remain unclassified; do not guess at causes or mark tests passed.
- Reviewed changed workflow definitions. The PR changes the storefront smoke test to expect `#categoryGrid a.category`, exactly eight labels/order and preview-category links; the ASC browser workflow expects a preview-category card labelled “ASC Catalogue — Aerials”, exact aerial subcategory navigation, four matching images, search, empty-state behavior and 50 image assets. These are test expectations to validate against the actual HTML and not evidence that the implementation passes.
- No merge, production deployment, Axxess upload, DNS change, Supabase write, live catalogue/price/stock change, payment activation or destructive cleanup was performed. Production remains HOLD.
- Immediate engineering constraint: use an inspectable route to obtain failure diagnostics (GitHub check annotations/API response or Cloudflare Pages build output) and fix the underlying candidate; do not blindly rerun workflows or merge a red candidate. If the existing candidate cannot be repaired safely, isolate a current-main-based test candidate and preserve the already successful Pages preview. Full ASC catalogue source files and owner-only checkout secrets/acceptance remain separate dependencies as recorded above.


## 2026-11-03 OWNER PRIORITY EXECUTION — BRIGHTNESS-ONLY STOREFRONT RESTORATION
- Owner instructed that the eight storefront tasks be completed in priority order, removing a task only after successful verification. Payments are explicitly out of scope; no payment integration work is to displace storefront work.
- Identified root cause: current main's `index.html` redirects to `store.html`, which embeds `index-new.html`; `index-new.html` was replaced on 2026-10-29 by commit `7df35cca97bd6a97a922d6d8b270bd6ea5ab70ad` (“Reset storefront to buttons-only navigation”), whose parent `781ece9a521eebd6f36081a0963750cc6bfb5299` contains the last full working storefront immediately before the reset. The earlier owner-approved full storefront layout is traceable to commit `49366ccdf9a85468b623666d3717d2d40abc6b3c`.
- Created isolated current-main branch `fix/restore-approved-storefront-brighter-background-2026-11-03`, based on main `28e9e89d9aa701eff051deb81be729e0cd5551df`. Draft PR #163: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/163.
- Restored `index-new.html` from pre-reset working commit `781ece9a521eebd6f36081a0963750cc6bfb5299` and added CSS-only brightness overrides. Layout, markup and JavaScript were retained from that source; no database, supplier, catalogue, stock, price, payment, DNS, Axxess or production changes were made.
- Kept the historical button-only workflow available for manual dispatch but removed automatic PR/push triggers because its assertions contradict the restored full storefront.
- Removed the recent-products legacy `rp.sku` fallback in `assets/progressive-store-enhancements.js`; customer-facing recent-product display now uses `public_sku` only.
- Exact latest PR #163 head at checkpoint: `2f5757bc1e0ed0b8d7ff2cf20219c1bbe07c8414`. Changed paths: `index-new.html`, `.github/workflows/button-only-storefront-smoke.yml`, `assets/progressive-store-enhancements.js` (three files after subsequent audit fix).
- Exact-head checks observed: Storefront Smoke Test browser job skipped after its mode-detection job failed; Public SKU Exposure Audit failed; Cloudflare Pages Public Package QA failed; Populated Store Preview Browser QA failed; Axxess package mode detection failed; Netlify redirect/header checks and Cloudflare Pages/Workers preview deployments were still in progress at the last observation. GitHub job-log blobs returned BlobNotFound and step summaries were empty, so failure causes remain unclassified. Do not claim task 1 complete or present a preview as accepted.
- No merge, production deployment, Axxess upload, DNS change, Supabase write, live catalogue/stock/price change, or payment action was performed. Payments remain explicitly out of scope.
- Priority queue remains: (1) finish restoring and verifying approved storefront + brightness-only styling; (2) verify correct version is served by hosted preview/root route; (3) verify all eight approved categories and subcategory navigation; (4) integrate approved supplier catalogue content in correct hierarchy without unverified live data; (5) verify exact product images, descriptions and GW SKUs; (6) validate browse/search/product-detail/terms customer flow, with payments excluded; (7) complete exact-head desktop/mobile browser QA; (8) obtain owner acceptance and only then consider production release under existing explicit-approval boundary. Do not remove a task until evidence supports completion.


## 2026-11-03 TASK 1 FOLLOW-UP — LATEST RESTORATION HEAD
- Continued PR #163 without changing the owner-approved layout. Latest branch head: `e9e2267ba4fc88563ca4c7e5ab737347f4aab201`; branch `fix/restore-approved-storefront-brighter-background-2026-11-03`.
- Rebuilt `index-new.html` from the full pre-buttons-only version `781ece9a521eebd6f36081a0963750cc6bfb5299`; the brightness override is now a separate style block placed after all existing styles, not inside the first style block. This prevents later legacy CSS from overriding the requested brighter appearance.
- Brightness-only changes: pale page background, white product/category/modal surfaces, dark readable text and SKU labels, lighter navigation/header surfaces, light outer iframe shell and matching browser theme colour. Original page structure, categories, scripts and product-card layout are retained.
- Public header and footer residential address instances removed. Replaced with appointment-only pickup / no walk-ins wording; general delivery availability remains. Confirmed no occurrences of Wattlebrook / Brookdale Crescent / 29 Wattlebrook in latest `index-new.html`.
- Static source checks on latest head: all eight approved root category names present; no buttons-only mode marker; brightness style block present; private address string absent; appointment-only pickup wording present; required Pages package input files and all five preview route files exist; repository tree contains 4,101 WebP images.
- The previous exact-head Cloudflare Pages deployment for `2f5757bc1e0ed0b8d7ff2cf20219c1bbe07c8414` succeeded at `https://efca9661.get-wired-autoworx-store.pages.dev`, but it predates the latest style-order and address corrections. Latest head `e9e2267` Cloudflare Pages preview build was still in progress at the last check; do not present previous preview as current.
- Latest head Actions statuses: Storefront Smoke Test smoke job skipped because mode-detection job failed; Prepare Axxess package package job skipped because its mode-detection job failed; Public SKU Exposure Audit, Cloudflare Pages Public Package QA, and Populated Store Preview Browser QA show failure. GitHub job step summaries are null and temporary log endpoints return BlobNotFound, so no actionable failure annotations are available. Do not claim those failures are code defects or successful checks without evidence. Netlify checks completed neutral; latest Netlify summary reported one generated page and no assets changed.
- Updated `scripts/public-sku-audit.py` to audit the actual allowlisted standard and non-production preview Pages packages rather than all internal repository source. Regexes were checked on readback. Latest script change is included in the PR.
- Task 1 remains OPEN until latest-head Cloudflare preview is deployed and visual/browser verification can be performed. No production merge/deployment, Axxess upload, DNS change, Supabase writes, live stock/price changes or payment work performed.


## 2026-11-03 08:15 SAST — SCHEDULED MONITOR TASK START
- Outcome: IN PROGRESS.
- Read the sole current repository handover on `main`. The former `AI_HANDOVER_PERMANENT.md` and `HANDOVER_CURRENT.md` were intentionally removed during the owner-directed 2026-11-02 handover consolidation; the current file is `HANDOVER_2026-11-02_OWNER_CONTINUATION.md`. Do not recreate obsolete handover files.
- Scope this run: inspect all current background workflow activity; verify latest storefront restoration status without repeating completed checks; monitor Planetworld PR #95, its current-main audit workflow and artifacts, and read the three Planetworld reports on `docs/planetworld-blocker-handover-2026-10-26`; continue only safe source/review work.
- Safety: no PR merge, production/deployment retry, release-credit use, supplier XLSX edit, supplier import/publication, live catalogue/price/stock/category/active-flag change, Supabase write, Axxess/DNS/payment change, or production release.


## 2026-11-03 SCHEDULED MONITOR RESULT — 08:15–08:32 SAST

### Storefront / background workflows
- Current main at close: `0a804d568f91ff5da54aa7609afc2965ca5c4ddf`.
- PR #163 remains OPEN / DRAFT / UNMERGED, GitHub mergeable=false / dirty. Latest head `ded8a8016f9b7eb2783579d261207c13f60d886c`; base still `28e9e89d9aa701eff051deb81be729e0cd5551df`. Do not merge/rebase while the PR is dirty.
- Exact-head Cloudflare Pages preview build succeeded for `ded8a80`: `https://2523b207.get-wired-autoworx-store.pages.dev`. This is a preview deployment only; it has not passed browser acceptance.
- Latest ASC Catalogue Preview Browser QA run `41589465749`, attempt 2, job `125763368473`, on exact head `ded8a80`: **FAILURE**. One supported safe staging retry was issued. Retry failed again; GitHub returned empty step summaries and `BlobNotFound` for the job-log blob, so the underlying failure remains unclassified. No further retry without a changed diagnostic/runner cause.
- Separate Workers Builds check failed (Cloudflare build ID `40abffea-2b2a-4c60-abc5-3f49441f344d`); not retried because it is a production Worker build path, not a safe staging-only test. Netlify redirect/header checks were neutral.
- Latest-100 repository workflow check at close: **zero queued/in-progress/waiting runs**. No production or release workflow was rerun.

### Planetworld continuation
- Read the current-main handover and Planetworld branch reports; appended task-start and result entries before/after work.
- New 19-row review-only source register: `catalogue-source/suppliers/planetworld/PLANETWORLD_COST_FLOOR_MODEL_IMAGE_REVIEW_ONLY_2026-11-03.csv`, commit `cbd662e5eafe2c42e2b45269839477f08eb1c5a5`.
- Manufacturer/variant/component report update: `MANUFACTURER_MATCH_CONTINUATION_2026-10-26.md`, commit `eb3aad3abff03214bcfc49612d388584b1d56f11`, blob `0e60935049943b4287a95f3b4700d0c7671ae4f4`. Planetworld branch `HANDOVER_CURRENT.md` result update commit `ea6f028235f425fc5342b7b4832743621f05c1c7`.
- Official model evidence added/refined for Ibanez IAB541-WR, JBL IRX108BT base model, JBL EON710 base model, Remo HK-2417-00, Vogel's THIN215, Soundcraft 5085985EU, Paiste Dark Energy Crash Mk I 19-inch family, and OneNav ON115-3LX (not the supplier's ISA-prefixed code). Exact regional suffixes/alias mappings, PFW4600 description conflict, OneNav ON1509-LX1/ON263-FK2, and seven Harness & Trims exact images remain unresolved. All candidates are `DO_NOT_IMPORT`; no images were copied or published.
- Historical Planetworld audit still has 19 zero-RRP owner-hold items; 18 positive-RRP cost-floor flags at RRP−1%, 19 at RRP−2% (19 distinct, with `90011904` as 2%-only). These are not confirmed supplier errors. `IAB541-WR` has a pronounced source-row outlier (R99 RRP incl VAT versus R799–R1,199 for other IAB541 colours); possible missing digit/scale issue, but no correction is authorized or inferred.
- PR #95 remains CLOSED / UNMERGED / mergeable=false, head `17c47cc3283f8ee8c786c4bf08dfe6257a3f3382`. Latest historical audit run `40944787080` / job `123697194835` succeeded on PR branch `reconcile/repo-file-inventory-planetworld-2026-10-29` at head `1fb086c1ffb3e0e06ef6a97bfcdca502389ec174`, but artifact list is empty and logs record artifact-storage quota failure. Current-main audit workflow is artifact-free but has no current-main run. Connected GitHub tools expose no workflow-dispatch action.
- Exact owner action for the fresh audit: repository → Actions → **Planetworld Workbook Audit (Read Only)** → **Run workflow** → select `main` → run once; then inspect the run head, job summary and logs. Do not rerun the old PR run or create a dummy commit.
- No Planetworld price/stock email newer than 2026-10-25 was found. The 2026-10-28 email with the November Buyer's Guide and stock-arrival PDFs is ASC material; Gmail exposes attachment metadata only and no attachment-download action. Do not mix those PDFs into Planetworld pricing.

### Protected price/source state
- Preserve the 107/107 October rows: previous visual/source-image and read-only live recheck showed all 107 costs still match October printed cost, all formulas pass, all 107 prices still equal the audited formula and all remain active. Older `review_status=REVIEW` does not authorize a price change. No Supabase recheck or write was performed this run.
- Keep the nine asterisk-price SKUs quote-only/inactive. The latest recorded read-only check (31-Oct) showed all nine still `active=false`, `price=0.00`, `cost_price=0.00`; no new live-data query or mutation was performed.
- The 38 historical September price-scaling SKUs remain an ASC current-source blocker, not a Planetworld issue. Their 2026-09-30 source validity has expired. The 2026-10-28 ASC email contains the November guide and 1003–1007 arrival PDFs, but those bytes remain inaccessible through the connected Gmail actions. Do not substitute October/September historical prices for current supplier confirmation.
- No supplier XLSX was edited; no supplier data imported/published; no live catalogue, price, stock, category or active flag changed; no Supabase write; no Axxess/DNS/payment change; no production deployment; no release credits consumed.

### Next actions
1. Keep storefront task 1 OPEN until current-head preview/browser QA is diagnosed and exact-head desktop/mobile checks pass; do not present the preview as accepted.
2. Owner runs the Planetworld read-only audit once on `main` through the Actions UI, then provide the run ID for summary/log/artifact verification.
3. Obtain the November ASC PDF bytes in the Library/chat or enable a supported attachment download path; reconcile the 38 historical price-scaling SKUs against printed current cost, VAT, stock and effective date.
4. Preserve the 107 October-verified prices, nine asterisk-price inactive/quote-only records and 19 Planetworld zero-RRP owner-hold records unchanged.


## 2026-11-03 08:34 SAST — PR #163 HEAD ADVANCED AFTER MONITOR CHECK

- PR #163 advanced to head `150ca124b57dc3086b1e04803394d6e8198382c1` (still DRAFT / OPEN / mergeable=false / dirty; base `28e9e89d9aa701eff051deb81be729e0cd5551df`). The four commits since browser-QA head `ded8a80` only add/update the handover and Audio Connections/Sony image-provenance review CSV; no storefront code/test files changed in that delta.
- Cloudflare Pages preview succeeded on this exact latest head: `https://95780dea.get-wired-autoworx-store.pages.dev`. It is still preview-build evidence only; no exact-head browser QA was triggered on `150ca12`. The latest browser QA remains the failed, one-time-retried run `41589465749` on code-equivalent head `ded8a80`, with unavailable logs/steps. Do not claim exact-head browser acceptance.
- Workers Builds again failed on build `a1f61f66-e3b8-45d8-8c69-99682cc4682d`; this is the legacy production Worker path and was not retried. No active GitHub workflow runs remained at the close check.
- No merge, rebase, production deployment, live data change or release-credit use.


## 2026-11-03 08:37 SAST — TASK QUEUE AND BACKGROUND CONTROLLER CHECKPOINT

- Replaced stale `automation/task-queue.json` (which still referenced a 16-row category queue and earlier priorities) with the current eight owner-directed storefront priorities, exact current blockers and verified next actions. Commit: `e810c48228938108db2aebdb065b06a87153b546`; new blob `67a9b8d74b0e0eccbc8de6f068ba0e04cf92db3c`. The queue preserves no-live-mutation, no-import, no-production and no-payment-work boundaries.
- Background Task Controller audit: 35 controller runs appear in the latest 100 repository runs over 2026-11-02 20:19:55Z–2026-11-03 05:45:37Z; **28 failure, 7 cancelled**, including 34 `workflow_run` events and one scheduled event. Latest failures: run `41585775907` / job `125750779797` and run `41585773932` / job `125750768770`; both completed failure with empty step summaries and `BlobNotFound` log retrieval. No runner/step evidence identifies the cause. The controller's `workflow_run` trigger monitors nine named workflows and does not include itself; this is an event fan-in burst, not evidence of a self-trigger loop.
- The controller's script can request at most one retry for four allowlisted QA/audit/package workflows; it excludes image sync, category writes and deployment. Because controller jobs failed before any step was exposed, no automatic retry action is verified. The controller itself is not a staging QA task; no manual rerun was issued. No active GitHub runs remained at the close check.
- PR #163 latest head remains `150ca124b57dc3086b1e04803394d6e8198382c1`, base `28e9e89d9aa701eff051deb81be729e0cd5551df`; GitHub's latest mergeability response is `unknown` (an earlier check returned `false/dirty`). Keep it open/draft and do not merge or rebase.
- Exact latest-head Pages preview remains `https://95780dea.get-wired-autoworx-store.pages.dev`; no browser QA ran on `150ca12`. The latest browser-QA failure/retry is still run `41589465749`, attempt 2, on code-equivalent `ded8a80`; no steps/logs are available. Workers Builds failed on latest head build `a1f61f66-e3b8-45d8-8c69-99682cc4682d` and was not retried.
- No production or live-data changes, supplier imports, merges, deployments, release-credit use, Axxess/DNS/payment actions occurred.


## 2026-11-03 08:40 SAST — OWNER CONFIRMS STOREFRONT LOADS
- Owner confirmed in ChatGPT that “The store is loading fine.” Treat basic storefront loading as resolved and do not keep reporting it as an active blocker or repeat loading-only checks.
- This confirmation does not substitute for hosted exact-head desktop/mobile interaction QA. Current recorded candidate remains PR #163 head `150ca124b57dc3086b1e04803394d6e8198382c1`, Pages preview `https://95780dea.get-wired-autoworx-store.pages.dev`; no browser QA was triggered on that exact head. Latest recorded browser QA run `41589465749` (attempt 2) failed before diagnostic steps on code-equivalent head `ded8a80`; one safe retry was exhausted and logs are unavailable. Focus next work on functional navigation, category/product routes, image loading, mobile overflow and readability—not basic page loading.
- Current-main PR #163 comparison: head is 40 commits ahead / 3 behind main (merge base `28e9e89d9aa701eff051deb81be729e0cd5551df`); keep draft and unmerged until reconciled and exact-head checks pass. No merge/rebase or production change authorized.
- ETA guidance: retain 3 November as a provisional target for a storefront-only owner-test candidate, conditional on exact-head functional QA. Do not promise completion while browser QA and catalogue/source verification remain open. Full supplier catalogue reconciliation has separate source-evidence dependencies.
- No production deployment, live catalogue/price/stock/category mutation, supplier import/publication, payment action, Axxess/DNS change, or release-credit-consuming deployment was performed.


## 2026-11-03 08:43 SAST — TASK START
- Resumed the Get Wired AutoWorx store and Planetworld monitoring work.
- Read the sole handover currently present on `main`: `HANDOVER_2026-11-02_OWNER_CONTINUATION.md`. The requested `AI_HANDOVER_PERMANENT.md` and `HANDOVER_CURRENT.md` are absent from `main`; the handover's 2026-11-02 cleanup record says prior handover files, including both names, were intentionally removed and this continuation file retained as the sole handover. No replacement permanent handover will be created without reconciling that recorded owner instruction.
- Scope this run: inspect the required Planetworld branch handover/reports, PR #95 and its current head/mergeability, latest read-only audit workflow/job/artifact, plus safe current-main background task status. Continue evidence-only reconciliation where source material permits.
- Safety: no PR merges, supplier workbook edits, supplier publication/import, live catalogue/price/stock/category/active-flag changes, Supabase writes, Axxess/DNS/payment changes, production deployments, or release-credit-consuming retries.
- Outcome: IN PROGRESS. Next action: read `HANDOVER_CURRENT.md` and all three Planetworld reports on `docs/planetworld-blocker-handover-2026-10-26` before investigating.


## 2026-11-03 — OWNER DIRECTS FUNCTIONAL TESTING TO LAST
- Owner explicitly instructed: continue the remaining non-functional catalogue/category work now; leave functional testing until last, after the owner has added banking details. Do not start end-to-end/functional browser testing, checkout/payment testing or customer-flow acceptance before that owner step. Static/source reconciliation and non-functional preparation may continue. Payments are not a current workstream.
- Basic storefront loading remains resolved per owner confirmation; do not repeat loading-only checks.

## 2026-11-03 — ASC PREVIEW CATEGORY INTEGRATION AND SUPPLIER-IDENTITY CLEANUP
- Continued on draft PR #162 branch `integration/current-storefront-plus-asc-preview-2026-11-02`; no merge or production action.
- Updated `preview-category.html` so the three store roots containing ASC pilot material surface their corresponding catalogue preview sections from the correct parent categories: Auto Electrical Spares → Electrical Spares Catalogue (34 reviewed pilot items); Car Audio & Entertainment → Vehicle Aerials Catalogue (8); Automotive Accessories → Car Mats Catalogue (8). Existing category children remain intact. These are preview-only links, not live category/product assignments.
- Replaced the visible supplier label “ASC Catalogue — Aerials” with “Vehicle Aerials Catalogue”; preview badge now displays “GW”, not the supplier name.
- Updated `asc-catalogue-preview.html` visible title, header, search prompt, subcategory label and footer to generic Get Wired AutoWorx catalogue language. Removed customer-visible supplier catalogue reference/SKU and source-page line from product cards and removed supplier-code searching. Exact source filename/page/code/image provenance remains in the private review JSON/CSV for internal traceability. No GW SKU was invented; the 50 pilot records still have no GW SKU, price or stock and remain review-only.
- Static readback confirmed all three neutral category links are present; the preview UI no longer displays the supplier name, supplier SKU/reference or supplier-code search; the 50-record pilot still references six current post-reset PDFs (72 pages, 75 source headings). Root distribution: 34 Auto Electrical Spares, 8 Car Audio & Entertainment, 8 Automotive Accessories. No functional tests were run, per the owner instruction to defer functional testing until last.
- Commits on PR #162 branch: category integration `106c672ffe1b15a028204c3f07532656184de9fb`; supplier-identity/SKU UI cleanup `1f3603d9b6219bf7d0656982c77b2b2aafe387a2`. PR remains draft/unmerged; exact head must be refreshed from GitHub before any subsequent work.

## 2026-11-03 — ASC NOVEMBER SOURCE EMAIL LOCATED
- Located the owner’s 28-Oct-2026 Gmail thread “Fw: STOCK ARRIVALS/BUYERS GUIDE” from ASC. Gmail metadata confirms attachments: `1003-New Arrivals.pdf`, `1004-Stock Arrivals.pdf`, `1005-Stock Arrivals.pdf`, `1006-Stock Arrivals.pdf`, `1007-Stock Arrivals.pdf`, and `November Buyer's Guide.pdf` (plus an October promotional PDF/image). This is the correct current source set; do not substitute the October/September files.
- The connected Gmail actions expose message and attachment metadata but no attachment-byte download action. The November PDF bytes therefore remain unavailable to this workflow. Required owner input when convenient: upload those six PDFs into this chat/Library so the 38 historical ASC price-scaling SKUs and November catalogue contents can be reconciled to printed cost, VAT basis, stock and effective date. Until then keep all related rows review-only/DO_NOT_IMPORT.

## 2026-11-03 — OTHER SUPPLIER WORKSTREAM SNAPSHOT (NO PUBLICATION)
- Audio Connections source preparation on the separate integration branch: 68 source rows (15 Sony, 53 Starsound/Reference Audio/RA/Black Spider); 66 preview rows after excluding sold-out XS-690ES and unresolved XS-680G. No approved product images; no GW SKU assigned in the supplier review dataset; no current availability supplied. Keep supplier identity private, prices proposal-only, and do not publish placeholder imagery.
- Planetworld preview source is the 25-Oct-2026 workbook snapshot: 3,317 rows / 702 Car Audio rows; 68 exact-model candidates have private GW SKU/model/description mapping and 11 manufacturer image URLs staged as review candidates, not publication-approved. Stock snapshot is dated 25-Oct and is not current availability. The 19 zero-RRP owner-hold rows and positive-RRP cost-floor review flags remain excluded from automatic pricing.
- Do not mark catalogue integration complete based solely on preview datasets. Exact current image approval, supplier/current price and availability evidence, GW SKU mapping and owner acceptance remain required before any public catalogue publication.


## 2026-11-03 — AUDIO CONNECTIONS CROSSWALK CORRECTIONS
- Continued the private supplier-to-GW-SKU review on branch `integration/clean-main-asc-audio-2026-11-01` (PR #149 candidate branch; not merged).
- Corrected stale review-only documentation: 68 Audio Connections rows are already labelled `REGISTERED_INACTIVE_OWNER_DEALER_CONFIRMED`; removed outdated next-action wording that incorrectly asked to reconfirm dealer onboarding. The supplier connection remains inactive intentionally pending separate activation approval; no supplier activation occurred.
- Corrected the 13 Sony Mobile ES crosswalk/staging rows: dealer price is VAT-exclusive, but the printed Sony RRP is VAT-inclusive per owner confirmation. The current review proposal is printed RRP × 0.98; no additional VAT multiplier. The old crosswalk incorrectly described both dealer price and RRP as VAT-exclusive.
- Confirmed 13 collision-checked GW SKU candidates are already staged privately for the 13 exact-model Sony candidates; they remain `OWNER_APPROVED_STAGING_ONLY_NOT_INSERTED` / `PROPOSED_COLLISION_CHECKED_NOT_INSERTED`. The other Audio Connections source rows do not have candidate GW SKUs in this staging set. No public product rows or supplier activation were created.
- Verified three official Sony image-source URLs are captured in the private source manifest. Their visual/load check and image permission remain pending; zero official image assets are approved for customer publication. The 66-row Audio Connections preview remains review-only; 2 source rows are excluded (XS-690ES sold out, XS-680G exact identity/image unresolved). No placeholder images were promoted.
- Updated review files on that branch: `catalogue-review/supplier-gw-crosswalk-2026-10-30.csv` (commit `59b0638d0121d3de4db4b80b5c196e9f6759d422`), `catalogue-review/OWNER_APPROVED_GW_SKU_STAGING_2026-10-30.csv` (commit `11a5bfb7942a2a7b069d82aa746dbce187eb3ed1`), and `catalogue-review/supplier-gw-crosswalk-summary-2026-10-30.json` (commit `9be47fa149b886b11f677a2c44c78894be0d207f`). Readback confirmed all 68 Audio Connections crosswalk rows, all 13 Sony staging rows, the corrected VAT basis, and the owner-confirmed inactive supplier status.
- No supplier prices, stock, product records, images or public SKUs were written to Supabase or the live catalogue. No functional tests were run; testing remains deferred until last, after the owner adds banking details.

## 2026-11-03 — CATEGORY TREE STATIC REVIEW
- Static source readback of the current PR #162 candidate confirms exactly eight approved root links in the homepage, with the same eight IDs/labels in the category-page root map. The `4X4 OUTDOOR` child category is under Camping / Leisure / Outdoors and has 16 direct active products in the 29-Oct category snapshot; it is not a ninth root.
- The category snapshot contains 166 active category rows and several duplicate/legacy names, including empty duplicate Car Audio children and one empty duplicate Automotive Accessories root. The current category page only renders child categories with active products, and the homepage links to the approved eight roots. No live category rows or assignments were changed; do not delete/merge category IDs without exact source mapping and owner approval.
- This is static source evidence only, not functional navigation testing. Functional tests remain deferred until last, after the owner adds banking details.


## 2026-11-03 09:00 SAST — PRIORITY TASK CONTINUATION
- Re-read the sole current handover and main task queue before work. Owner constraints remain binding: no functional/end-to-end/browser/checkout testing until the owner has added banking details and all non-functional work is complete; payments are not a workstream; production remains HOLD.
- Owner-confirmed basic storefront loading remains resolved. No loading-only check was repeated.
- Current main at the start of this checkpoint was `cff90067d3d6b053f7b99283116842718463ede9`. The current storefront restoration candidate is PR #163, branch `fix/restore-approved-storefront-brighter-background-2026-11-03`, head `f9b8685578ac40840efba2f05089d01ba4b6e78b`. GitHub compare reports 58 commits ahead / 14 behind main (merge base `28e9e89d9aa701eff051deb81be729e0cd5551df`), 92 changed files. The PR description claims CSS-only scope, but the actual changed-file set also includes ASC/Audio Connections/Hertz preview assets, workflows, data and tests. Do not merge or treat it as a CSS-only change; selectively reconcile onto current main in a fresh candidate.
- PR #162 remains draft/unmerged and is also not a safe merge target as-is. Its category/ASC work has been carried forward into the PR #163 candidate; keep both unmerged pending a clean current-main integration.
- Static review completed earlier and preserved: exactly eight approved storefront roots; 4X4 OUTDOOR remains a child of Camping / Leisure / Outdoors; 50 ASC pilot records map to 12 original source subcategories with 50 matching review images; category preview links are present for Auto Electrical Spares (34), Car Audio & Entertainment (8) and Automotive Accessories (8). These are review-only previews, not live catalogue assignments.
- Audio Connections: 68 private rows remain inactive; 13 exact-model Sony GW SKU candidates are staged privately but not inserted; 55 other rows have no candidate GW SKU in this staging set. Three official Sony image URLs are recorded but none is approved for customer publication. Dealer authorization is owner-confirmed; do not ask again or activate the supplier.
- Hertz: 12 private review records are staged, five official image URLs identified but not browser-verified/rights-approved; seven image gaps remain. The original supplier price-list workbook and exact source images for the remaining 77 products are not available in the current evidence set. No customer-facing publication.
- Planetworld current-main read-only audit still needs owner-started Actions dispatch; historical 25-Oct flags remain triage only (18 positive-RRP rows at RRP−1%, 19 at RRP−2%, plus 19 zero-RRP owner holds). No current price/stock confirmation or price change is authorized.
- The 198-row category review remains pending visual source-page verification. No product moves or live category changes.
- Updated `automation/task-queue.json` on main to remove stale PR #162-only framing and reflect PR #163 divergence, the clean-current-main integration requirement, the confirmed static category results, and the current supplier evidence gates. Documentation-only commit: `72b4112e1aaf5752ccfc2bd9566539a2c3816eaa`.
- No functional tests, checkout tests, browser tests, workflow retries, PR merges/rebases, supplier imports/publication, live catalogue/price/stock/category/active-flag writes, Supabase writes, Axxess/DNS/payment actions, production deployments or deployment-credit use were performed.
- Next non-functional engineering action: create a fresh branch from latest main and selectively reconcile the approved restored storefront plus validated review-only catalogue/category assets, without carrying stale PR history or unrelated changes. Then perform static source/diff review only. Functional browser tests remain deferred until the owner adds banking details.


## 2026-11-03 09:05 SAST — STATIC STOREFRONT RESTORATION REVIEW
- Inspected the exact PR #163 candidate source without running browser/functional tests. `index-new.html` is the restored full 182,039-character storefront with the `brightTheme` class applied to the body; it contains all eight approved category names. `store.html` was also updated to the brighter background and continues to embed `index-new.html`.
- Found a release-preview indexing issue in the candidate: `index-new.html` still declares `<meta name="robots" content="index,follow">` and canonical/OG URLs point to `https://www.getwiredauto.co.za/`. The candidate is not yet accepted for preview publication; the clean integration must set an appropriate noindex policy and avoid falsely canonicalizing a non-production preview to the live domain. Do not change the live domain or publish.
- Candidate `index.html` remains the two-line redirect to `store.html`; this is consistent with the existing wrapper architecture but means preview safety metadata must be applied to the actual embedded storefront document, not only the wrapper.
- Static source review only. No functional/browser tests, workflow runs, PR updates, merges, deployments, supplier changes or production changes were performed.
- Next action: build a clean integration candidate from current main with the restored approved layout, retain the brightness-only styling intent, apply preview-safe robots/canonical metadata, and selectively port only reviewed preview assets/routes. Then inspect every file diff and package allowlist before any functional testing (which remains deferred until banking details are added).


## 2026-11-03 — PLANETWORLD REVIEW-PAGE PRIVACY AND STALE-DATA CLEANUP
- Continued on the separate review branch `integration/clean-main-asc-audio-2026-11-01`; no merge or production action.
- Neutralised the Planetworld review page so the visible page title, heading and notice use generic Car Audio review language; supplier name is no longer displayed. Product cards display only the proposed Get Wired SKU, not the supplier model/SKU label. Removed the dated JHB/DBN/CPT stock quantities and the old RRP−1%/RRP−2% price proposals from the page and embedded page data; cards now state price on request and availability not confirmed. Removed generic brand-initial image placeholders; only the nine actual official manufacturer image-source candidates are rendered, while products without a candidate image remain text-only.
- The 68-record page data no longer contains old price1/price2/RRP or stock/total/snapshot/cost-floor fields. The 25-Oct-2026 workbook remains a historical review source only; no current stock claim is made. The page remains a noindex review preview and is not linked from the approved category navigation.
- Removed an internal “Supplier SKU retains trailing full stop” note from the R2-A60F customer-facing description. The public-facing page uses Get Wired SKU only; manufacturer model names remain in product titles/descriptions where they identify the product.
- Updated private Planetworld source metadata to a neutral dated-workbook label. No product prices, stock, SKU, image binaries, supplier activation or public product rows were written to Supabase/live catalogue.
- Updated private crosswalk with 9 exact-model Planetworld image URLs from the 68-model verified set (3 Alpine, 1 Audison, 1 Focal, 4 Kicker), retaining one additional Alpine family image URL from the existing crosswalk. The family image does not distinguish R2-W12D4 impedance variant and remains explicitly disallowed for final use until a variant-specific image is found. Together with four Sony image URLs, the crosswalk now records 14 distinct official manufacturer image-source URLs (10 Planetworld + 4 Sony). All 14 remain not downloaded/not approved; zero approved customer-publication images.
- Updated private review files on the same branch: crosswalk `537c3ea044b09bf810a997915749f935edcb8ca6`, image-source summary `dfe934b04c7f61e009036eebba6824f285d193c9`, supplier mapping README `14d01759850e9a2dbd3baf487a2c1319565c256d`, Sony image manifest `e4c5176bc1f5cf0cab54acc6945702b555273280`, and the sanitized Planetworld review page `b712e652ca3b34f60f71e623d08cc0962cddb017` (followed by description cleanup `bf274cc4b249887f51ed8aa02464b7683da9b714`). No functional tests were run, as explicitly deferred until last after owner banking details.


## 2026-11-03 OWNER CORRECTION — ASC STOREFRONT HIERARCHY
- Owner clarified the required customer-facing structure: every ASC catalogue must appear as its own button/subcategory under **Auto Electrical Spares**. Where an individual catalogue contains internal sections/subcategories, those must appear as buttons beneath that catalogue button, preserving the catalogue's own headings/order. The exception is **Chemicals & Lubricants**, which belong under **Car Care & Accessories** as a subcategory, with their catalogue subcategories nested below.
- Repository inspection confirms main's `index-new.html` is still a generic button-only reset page with placeholder child buttons; `store.html` loads this file in its iframe. It has no ASC catalogue navigation. Therefore the customer-facing ASC catalogue integration is NOT complete.
- `suppliers/ASC/` currently contains six post-reset PDFs only: Aerials (7 pages), Automotive Sensors (9), Automotive Switches (22), Automotive Globes (11), Car Mats (11), Fuel Pumps (12), plus README. Review-only OCR exists for all 72 pages. No Chemicals or Lubricants catalogue PDF is present in this current intake; do not invent catalogue content or claim those catalogues are loaded.
- The existing ASC README describes an earlier virtual taxonomy overlay that mapped Aerials to Car Audio & Entertainment and Car Mats to Automotive Accessories. That mapping conflicts with the owner's latest explicit instruction and must not be reused for customer-facing navigation. Re-map all six current ASC catalogue roots beneath Auto Electrical Spares; preserve each source catalogue's own contents headings as nested buttons. Chemicals & Lubricants are the sole stated category exception.
- A separate ASC preview implementation and 50-record review pilot were previously staged on draft PR #151; that isolated preview is not the main customer storefront and was not merged/deployed. Do not report that preview route or the six uploaded source PDFs as completed storefront integration.
- Next implementation: build the catalogue-led hierarchy into the actual customer-facing storefront candidate using current source PDFs and verified contents headings; no product rows, supplier price/stock, GW SKU, live database write, production deployment or supplier activation. Show honest empty catalogue/product states where product-level verification is incomplete. Verify the actual nested button drill-down on hosted non-production preview after exact-head tests. Chemicals/Lubricants remain pending source PDFs if not already supplied elsewhere; check current Library/repo sources before asking owner to resend.
- This correction supersedes earlier ASC preview mapping notes wherever they conflict with the owner's 2026-11-03 hierarchy instruction. Production remains HOLD.


## 2026-11-03 09:12 SAST — MONITOR RUN TASK START
- Read the sole retained current owner handover on `main`: `HANDOVER_2026-11-02_OWNER_CONTINUATION.md` (blob 9da4a2d0a3fcdc5770c405fe0fc821d3acdb966c). The requested `AI_HANDOVER_PERMANENT.md` is absent from the current main tree; the 2026-11-02 cleanup record below says the owner directed its removal and that this continuation file is the sole retained handover. I have not recreated the deleted file.
- Scope: read-only current-main/background workflow review plus Planetworld branch review; prioritize fresh supplier price evidence, price-scaling defects, October-source preservation, quote-only zero-RRP handling, exact manufacturer/model/variant image verification and category/component evidence.
- Safety: no PR merges; no supplier XLSX edits/imports/publication; no live catalogue, price, stock, category or active-flag changes; no Supabase/Axxess/DNS/payment changes; no production/deployment or credit-consuming retries.
- Initial status: IN PROGRESS. Next action: read `HANDOVER_CURRENT.md` and the three Planetworld reports on `docs/planetworld-blocker-handover-2026-10-26`, then append the Planetworld task-start record before investigation.


## 2026-11-03 OWNER CLARIFICATION — AERIALS CATEGORY PLACEMENT
- Owner clarified that **Aerials belong under Car Audio & Entertainment**, not Auto Electrical Spares. This is the explicit exception to the ASC catalogue grouping.
- All remaining ASC electrical-spares catalogues belong under **Auto Electrical Spares**, each as its own catalogue button, with any original catalogue subcategories nested beneath it and source order/headings preserved.
- **Chemicals & Lubricants** belong under **Car Care & Accessories** as a subcategory, with their own catalogue subcategories nested beneath where applicable.
- Accordingly, the six currently listed ASC catalogue PDFs map as follows: Aerials → Car Audio & Entertainment; Automotive Sensors, Automotive Switches, Automotive Globes, Car Mats, Fuel Pumps → Auto Electrical Spares. Chemicals/Lubricants source catalogues are not present in the currently recorded six-PDF intake and must be located before claiming integration.
- This clarification supersedes only the previous 2026-11-03 instruction's placement of Aerials under Auto Electrical Spares. All other hierarchy instructions remain unchanged. No storefront code or production data changed in this documentation update.


## 2026-11-03 — AUDIO CONNECTIONS OWNER PREVIEW SKU / IMAGE LINKAGE
- On branch `integration/clean-main-asc-audio-2026-11-01`, updated the 66-row Audio Connections review JSON with 13 proposed, collision-checked Get Wired SKUs for the exact-model Sony candidates, matched against the private owner-approved staging crosswalk. These remain proposed/staging-only and are not inserted; 53 non-Sony rows have no proposed GW SKU in this set and remain held.
- Linked four official Sony image-source candidates (XS-160ES, XS-680ES, XS-W104ES, XM-5ES) to their exact review records. None is downloaded or approved; 62 of 66 records have no image source and remain text-only.
- Removed supplier-name and source-file fields from the review JSON. Updated the noindex Audio & Entertainment review page to display proposed Get Wired SKUs where available, show the four official image candidates for owner review, remove all generic image placeholders, and use neutral price-list date wording. No supplier identity is displayed. The page is not included in the public Pages build.
- Relevant branch commits: review JSON `5d49dc65d81b2484575510403c952b6a6e0ca45f`; Audio page SKU/image mapping `e9f22e7c55282b1de087ce25f9d5b9e534a94be2`; preview wording `bc812fcf6c6020f7de24a9120bde6c67226b55a4`; supplier wording cleanup `93e838c28e572b820f14b1f02461be0b4212c956`; placeholder style removal `7de30ccd97bc7311cbcb0f80c11ee97b87e5b3ef`; preparation note `b27a6a6bf68681be1f1b87acd0aee0bebbf3b596`.
- No public category link, supplier activation, stock/price update, product insert or functional test occurred. Functional testing remains deferred until last, after owner banking details.


## 2026-11-03 — AUDIO CONNECTIONS OFFICIAL BRAND-PAGE MATCHES
- Continued the private Audio Connections model review on `integration/clean-main-asc-audio-2026-11-01`.
- Seven Starsound source models are now linked to official Starsound category listings: SSW12-6300, SSW12-7300, SSWF10"-4150SVC, SSWF12-5150SVC, SSAHORNET 7600.4, SSA-J-10000.4 and SSA-ATOM13800.4. These are category-listing matches only (not individual product pages); source punctuation and the official listed model format are both retained in the private crosswalk.
- One additional exact official product page was found for BlackSpider Bullet Lynx. The manufacturer page identifies a 4-inch aluminium bullet horn tweeter, 550 W RMS / 2,500 W maximum, 4 ohms, 95 dB sensitivity and 2 kHz–20 kHz frequency response. The direct image asset URL is not captured yet.
- Forty-five other non-Sony Audio Connections models still have no exact official listing/product page. No GW SKU was generated for these eight newly matched models; 13 Sony candidate GW SKUs remain the only Audio Connections candidates in the staging set. No image assets were approved and no products were published.
- The Audio preview JSON and noindex review page now expose official brand listing links separately from individual product links. The page remains excluded from the public Pages build. All records remain private/inactive pending exact imagery, current dealer price/availability and separate activation/publication approval.
- Evidence sources: official Starsound subwoofer category listing shows SSW-12-6300, SSW-12-7300, SSW-12W-5200 and flat subwoofer models; official amplifier category listing shows SSA-Hornet-7600.4, SSA-J-10000.4 and SSA-Atom-13800.4; official BlackSpider Lynx page provides the exact model and specifications. These external references support review only and do not establish current dealer stock or image-use permission.
- Branch commits: Audio JSON `82e9b8f5aa7ad1cc8a545a1a5d88cab7576878f8`; preview renderer `e93b0e1131480df8a7a6e9e37ce1316230f4fdc9`; crosswalk `48ece9dd16a6b80b858705a8490706584c4414b0`; summary `1469cccb29fc0300b7cd726da1dffb6908449958`; preparation note `3e36a6cc6a19d701364362ad7a11bc4dd987b5b3`.


## 2026-11-03 — ASC CATALOGUE HIERARCHY INTEGRATION CANDIDATE
- Created a clean integration branch from current main `826724bb714f4d04a6995018f52dc36d4412d07d`: `integration/asc-catalogue-hierarchy-2026-11-03`. This avoids merging stale PR #162/#163 history.
- Selectively restored the approved full storefront candidate `index-new.html` and brighter `store.html` shell, then added catalogue-led navigation to the actual iframe storefront entrypoint. Preview storefront metadata is `noindex,nofollow`; canonical/live-domain and OG URL declarations were removed from the preview document.
- Owner hierarchy implemented in source: Aerials → Car Audio & Entertainment; Automotive Sensors, Automotive Switches, Automotive Globes, Car Mats, Fuel Pumps → Auto Electrical Spares. Automotive Accessories contains a Car Care & Accessories folder, beneath which Chemicals & Lubricants is a reserved catalogue button.
- Every available catalogue is its own button. Selecting it opens original contents-page section buttons in source order. Only the exact 50 visually reviewed pilot items appear beneath matching source headings; other sections show an explicit empty state. No fuzzy fallback, supplier price/stock, internal/public GW SKU, cart or checkout exists on the catalogue review route.
- The 50 watermarked image crops and review data are included only in the opt-in non-production Pages package. The standard Pages build excludes the route/data/images; source PDFs, OCR/review CSVs and supplier folders remain excluded by the public package allowlist.
- Car Mats preview mapping corrected to Auto Electrical Spares. The existing three-product Car Mats category under Automotive Accessories is left unchanged; no live category/product assignment moved.
- Chemicals & Lubricants source catalogue is still not present in the six post-reset PDFs. The UI reserves the required nested button and displays a truthful source-pending state; older Buyer’s Guides are not substituted for the requested catalogue.
- Functional/browser tests, click-through tests, workflow runs, hosted deployments, merges, Supabase writes, live category/product/price/stock changes, supplier activation, payment actions, Axxess/DNS or production deployment were NOT performed. Functional testing remains deferred until owner banking details are added; production remains HOLD.
- Next: static readback/diff verification and draft PR review. Do not run functional tests or deploy until the owner banking-details gate is met and separate deployment approval is obtained.


### ASC candidate commit and readback record
- Implementation commit: `1ee3096eebe1b9f773f58c2d030c02aaa565046a`.
- Follow-up category-label clarity commit: `68ab744309ce56b2a1af371db13dfb7806f43f7d`.
- Static GitHub readback confirmed six catalogue definitions with source-section counts 6/11/16/10/14/18 (75 total), 50 review-only records, Car Mats taxonomy root corrected to Auto Electrical Spares, and noindex metadata on the storefront shell and catalogue preview route.
- Existing store categories that overlap the new catalogue buttons are labelled “Existing Store Products” in the category tree UI to distinguish them from the separate source catalogue buttons. The existing category assignments remain unchanged.
- This readback is static source verification only; it does not confirm click behaviour, image rendering in a browser, hosted preview availability or owner acceptance.
