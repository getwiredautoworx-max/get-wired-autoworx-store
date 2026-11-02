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
