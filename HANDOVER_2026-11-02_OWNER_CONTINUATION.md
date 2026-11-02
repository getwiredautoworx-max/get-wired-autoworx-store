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


## 2026-11-02 REPOSITORY CLEANUP — TASK START
- Owner requested cleanup of old/outdated repository files and APK/build leftovers.
- Baseline inspected at `main` commit `bb43160e273f2de7bd6f428ed7a865932a654b29`: 5,263 tracked files, 366,264,573 bytes across file entries; 4,928 image assets; 47 supplier XLSX files.
- No `.apk`, `.aab`, or `.ipa` files are tracked in the current tree. One root ZIP (`Get_Wired_AutoWorx_STORE_WITH_WATERMARKED_PRODUCT_IMAGES.zip`, 8.89 MiB) is explicitly protected by earlier owner instruction and will be retained. Supplier catalogues, images, prices, source extracts, and storefront files are not cleanup targets without evidence.
- Cleanup is being prepared on a separate maintenance branch so `main` and its automatic deployment path remain untouched; production remains on HOLD.

## 2026-11-02 REPOSITORY CLEANUP — RESULT ON MAINTENANCE BRANCH
- Exact tree review found no tracked APK/AAB/IPA files and no committed build-output directories; therefore no APKs or build outputs were deleted.
- Removed only four obsolete non-storefront files: `READY.txt`, `UPDATE_COMPLETE`, `READY_FOR_STORE_VISIT.txt` (stale readiness marker), and `SESSION_CONTINUATION_2026-09-16.md` (superseded session note). This cleanup does not imply readiness.
- Updated `.gitignore` to prevent future commits of Android APK/AAB packages, Gradle cache, and Android app build output.
- Retained the explicitly protected root ZIP, all product/catalogue images, supplier PDFs/XLSX, storefront/payment/configuration files, deployment triggers, and audit/reconciliation evidence.
- Repository baseline: 5,263 tracked files / 366,264,573 bytes in current tree; one ZIP (8.89 MiB); two tracked files over 5 MiB (the protected ZIP and ASC automotive switches PDF at 7.32 MiB). No APKs found.
- Changes are isolated to `maintenance/repository-cleanup-2026-11-02`; `main` was not changed and no production deployment was triggered by this task. PR will remain unmerged pending owner review because production remains on HOLD.
