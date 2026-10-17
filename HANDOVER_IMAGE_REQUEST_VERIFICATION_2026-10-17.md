# Get Wired AutoWorx — Image Request Verification Continuation
Date: 2026-10-17 (SAST)

## Scope and safety
- Repository: https://github.com/getwiredautoworx-max/get-wired-autoworx-store
- Review branch: `review/staging-ui-verification-fixes-current`
- Candidate head last documented: `d76617cf57c764f91d9e95f354c9981695f0ee6a`
- PR #54 remains draft/open and unmerged: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/54
- Production Axxess store, production Supabase data, DNS/SSL, checkout/payment settings, and production catalogue remain untouched. No Cloudflare/Netlify credits used.

## Evidence inspected
- Browser QA run #31 / run ID `39023530087` completed successfully on the documented candidate head; artifact `staging-browser-qa-31` (ID `12097437510`) was downloaded and its `report.json` inspected.
- Report records desktop/mobile widths 1440, 390 and 320, no document-wide horizontal overflow, and zero images counted as broken by the test's current assertion. It also records some image elements with `complete:false` and `naturalWidth:0` (including off-screen/lazy-loaded product image requests); therefore the existing “brokenImages: 0” metric alone is not sufficient to prove every requested image either loaded or correctly fell back to a placeholder.
- The tested pages use the Supabase product-image endpoint with exact public SKU query parameters for visible product cards. This confirms the requested URL/SKU, not physical item identity or image reuse rights.
- Reviewed `assets/product-image-fallback.js` on the review branch. It tries exact public SKU WebP and JPG paths, and after both fail hides the image and replaces the image box with the explicit text “Product image unavailable”. It does not substitute a similar product. Source URL: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/review/staging-ui-verification-fixes-current/assets/product-image-fallback.js
- Exact product identity and rights clearance are separate gates: the 791 recovered September-catalogue image tiles remain internal QA-only; publication rights are unresolved, and 16 are flagged for low-resolution review. Do not publish these catalogue crops without documented permission. The nine unmatched quote-only SKUs remain excluded from sale.
- No verified replacement image set or rights record was found in this inspection. No product/category image was changed.

## Immediate browser-QA follow-up
- Re-ran the existing browser QA job for run `39023530087` using GitHub Actions rerun, without changing source code or creating a new build.
- Rerun job ID: `117394393739`; observed state at checkpoint: `in_progress`, checkout step underway. No new report/artifact or result has yet been retrieved. Do not claim fresh QA success until the rerun completes and its report/artifact is inspected.
- Run link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39023530087

## Current decision
- Image rendering/fallback behavior: **PARTIALLY VERIFIED; fresh rerun pending**. The prior report's false/incomplete image elements require inspection of their request status and final rendered state, not just the existing broken-image count.
- Exact product image identity and publication rights: **NOT RESOLVED**. Keep uncertain items on a placeholder/hold; do not guess from filenames or visually similar items.
- Release status: **HOLD**. Do not merge PR #54 or upload to Axxess. After the rerun, inspect the report/screenshots and, if needed, correct the QA assertions so each image is classified as loaded with positive natural dimensions or as an intentional accessible placeholder. Record unresolved request failures distinctly.


## Fresh rerun result — 2026-10-17 14:22 SAST
- The rerun completed successfully on the same exact candidate head `d76617cf57c764f91d9e95f354c9981695f0ee6a`. Run #31 / ID `39023530087`, latest job attempt `117394393739`, conclusion `success`.
- Fresh artifact `staging-browser-qa-31`, ID `12100568519`, created `2026-10-17T12:20:30Z`; SHA-256 `c3b1bd394717f588e8a910ee8eb6e7faf67c35e113cd2640f87536b90471a720`; expires 2026-10-31. Artifact link: https://api.github.com/repos/getwiredautoworx-max/get-wired-autoworx-store/actions/artifacts/12100568519
- Inspected the new `report.json`: all three viewport widths (1440, 390, 320) have no document horizontal overflow; test report lists `failures=[]`, no broken-image count, and 44 / 47 / 61 loaded images respectively.
- **Important qualification:** the report records 72 image elements at each viewport, of which 28 / 25 / 11 respectively were `complete:false` or had `naturalWidth:0`. This can include lazy-loaded/offscreen images, and the workflow currently does not distinguish “not requested yet” from “request failed and fallback shown”. Therefore the successful run proves the browser suite passed its current assertions, but does **not** prove every image request is resolved or that every fallback is visibly rendered. No HTTP failed request was listed in the report's general failure list; the image assertions need to be strengthened to scroll/request images and explicitly classify final loaded vs placeholder state.
- Exact-SKU request URLs were observed for loaded product cards, but no visual comparison was made to prove physical item identity, dimensions, colour, application or usage rights. Those remain separate unresolved content gates.
- Next concrete action: update the staging browser QA test so it scrolls product cards into view (or disables lazy loading for the test), waits for image settlement, and asserts each image is either `naturalWidth > 0` or the explicit accessible “Product image unavailable” placeholder; record failed image URLs/SKUs distinctly. Then run one fresh exact-head workflow and inspect the artifact. Keep PR #54 draft/unmerged and production untouched until this stronger assertion and owner visual review pass.


## QA assertion correction committed — 2026-10-17
- Updated `staging/storefront-browser-qa.mjs` on the review branch to force lazy images to eager loading for the audit, wait for load/error settlement (up to eight seconds per image), and classify each image as loaded, explicit placeholder, failed or unsettled.
- The new per-viewport assertion requires every image to be positively loaded (`naturalWidth > 0`) or to have the explicit accessible “Product image unavailable” placeholder; unresolved URLs are included in failure detail. This is a test-quality improvement, not proof that the application runtime itself has been fixed.
- Commit: `9508800ac084c7c64f65e0bd5c3ee65027c628b5`; changed path: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/review/staging-ui-verification-fixes-current/staging/storefront-browser-qa.mjs
- Exact-head workflow runs started:
  - Browser QA #44 / run `39032371060`: in progress.
  - Storefront Smoke Test #782 / run `39032371083`: in progress.
  - Prepare Axxess package #105 / run `39032371210`: in progress (review artifact only).
  - Public SKU Exposure Audit #338 / run `39032370978`: in progress.
- No product/runtime image mapping was changed. No Axxess upload, merge, production database change, DNS/payment change, or Cloudflare/Netlify credit use. PR #54 remains review-only and release remains HOLD until the new browser report is inspected and visual/content/rights gates are satisfied.


## Targeted assertion failure and correction
- First strengthened browser run #44 / ID `39032371060` correctly exposed a real test mismatch: the customer wrapper's first exact-SKU local image had not loaded after 4.5 seconds (`GW-BACFDE14`, `/assets/products_webp/GW-BACFDE14.webp`, `naturalWidth=0`). The image test failed instead of assuming success. The three direct-page viewport audits classified all nine sampled visible image elements as loaded, with zero unresolved images; the wrapper assertion was the failing check. The PAXI map request `ERR_ABORTED` was recorded during navigation and is not the image failure.
- Corrected the wrapper assertion so success requires either (a) a positively loaded exact-SKU local WebP/JPG with positive natural dimensions, or (b) the explicit safe “Product image unavailable” placeholder with the failed image hidden. It no longer rejects the intended placeholder or accepts an unresolved blank image.
- Fix commit: `efa4edabd2c322944f4e9d42f82c9a31c1a186f6`; path: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/review/staging-ui-verification-fixes-current/staging/storefront-browser-qa.mjs
- New exact-head workflow run IDs queued at checkpoint: browser QA #45 `39032537225`; smoke test #783 `39032537235`; package #106 `39032537229`; public SKU audit #339 `39032537232`. Pending until actual conclusions and browser artifact are inspected.
- The fallback runtime was not changed. The product with a missing local asset should show the explicit placeholder if both exact-SKU files fail; if the new run finds that it does not, fix that concrete runtime defect on the review branch and retest.
- Release remains HOLD; production and Axxess are unchanged.
