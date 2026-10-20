# GET WIRED AUTOWORX — AI HANDOVER / CURRENT CONTINUATION

**Always read both `AI_HANDOVER_PERMANENT.md` and `HANDOVER_CURRENT.md` before doing any work.** Update the handover files after each successful task and record evidence, commit IDs, tests, blockers, and next steps. Do not report success without verification.

## PERMANENT USER INSTRUCTIONS — 8 LOCKED RULES
1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**

## CURRENT APPROVED WORKING BASELINE — 2026-10-20
- Repository: `getwiredautoworx-max/get-wired-autoworx-store`.
- Canonical working branch: `recovery/approved-preview-index-new`.
- Owner explicitly approved the layout and requested all store files be reconciled to it.
- PR #70 was marked ready and squash-merged into the canonical branch. Merge commit: `39d4c77096e1460e131ebfaeff8672aaedcb93e7`.
- Approved preview content commit: `f19e60c03b1aa6273989199cc24bec6c30842a4d`.
- Preview URL: https://ebe5ddb2.get-wired-autoworx-store.pages.dev/store
- Branch alias: https://design-brighter-brand-catego.get-wired-autoworx-store.pages.dev/store
- Reconciled by PR #70: `index-new.html`, `category.html`, `products.html`, isolated review workflow, responsive test workflow. `store.html` is a wrapper that loads `index-new.html` and shared scripts; preserve it.
- Responsive mocked browser acceptance passed at 320, 360, 390, 768 and 1440px. Run `39452408814` passed; public SKU exposure audit `39452408700` passed.
- Category photos use fixed Unsplash CDN IDs selected by category label. Real network loading and visual relevance are not yet fully verified; do not describe these as exact verified product images.
- Layout approval is not production launch approval. Customer launch remains HOLD.

## CONTINUATION RULES
- Continue storefront work only from `recovery/approved-preview-index-new`. Create a fresh isolated branch from it for the next task; do not rebuild from scratch or revive the mismatched old versions.
- Before changing code, compare all relevant storefront entrypoints, wrappers, shared assets, category navigation, product pages and workflows. Keep links/assets consistent and preserve existing working functionality.
- Do not blindly merge divergent `main` (compare showed 185 commits ahead / 227 behind) or unrelated draft PRs #67–69 and #65–66. Review unrelated changes individually.
- Do not touch Axxess, DNS, production promotion, live Supabase/catalogue/stock, supplier systems, checkout/payment settings or APK distribution without a separate approved task/release gate.
- Cloudflare/Netlify deployment credits are reserved for final test checkpoints. The current URL is the deployed approved content commit; no fresh deployment of the squash commit is claimed.
- Next: on an isolated branch from the canonical baseline, run local asset/link checks and category-navigation + mocked responsive browser tests without deploying. Continue catalogue accuracy and stock/category management from this point. Update `AI_HANDOVER.md`, `AI_HANDOVER_PERMANENT.md` and `HANDOVER_CURRENT.md` when each task is complete.


## 2026-10-20 — Owner-directed storefront recovery from approved PR #70 baseline
- Owner instruction: “Stick with PR#70 as current starting point forward.” All changes in this task branch originate from `recovery/approved-preview-index-new`, the canonical branch containing the approved PR #70 merge (`39d4c77096e1460e131ebfaeff8672aaedcb93e7`). PR #71 was not used as the code starting point and remains separate/unmerged. No deploy or production change was initiated.
- Task changes committed to branch `fix/pr70-storefront-owner-feedback-2026-10-20`:
  - `index-new.html` commit `3f488bca0e0ef9bbc7a99b2a0aacca7199bcbe25`: product cards and product modal now use each product's canonical `image_url`, with exact-public-SKU `product-image` Edge Function fallback and neutral placeholder; category photo sources from the approved layout are retained; a standalone “CAN’T FIND A PART? REQUEST IT” button opens the existing request form; “REQUEST A PART NOT LISTED?” CTA clarifies the separate sourcing workflow; specials limited to four featured items; repeated prominent WhatsApp CTAs removed from hero and mobile nav; banner copy aligned to “SOUND & SECURITY • AUTO ELECTRICAL • SPARES & ACCESSORIES” plus supporting range line.
  - `product.html` commit `612578187ccdfa711ca7cf9d4d0b1917bf34d02b`: individual product page now prioritizes the canonical product `image_url`, falls back to `/functions/v1/product-image?sku=<public_sku>`, then exact-SKU local WebP and neutral placeholder; visible Product Description fallback added; dedicated “QUERY PART ON WHATSAPP” button opens WhatsApp with product name/SKU and asks for description, image, price and availability; existing Add to Cart and cart/checkout actions preserved.
  - `category-navigation.js` commit `f23d2a0e329864faccd7e50f6270b607d4f5045d`: removed the emoji/SVG override that replaced the approved category photographs; category and subcategory tiles now navigate in the same tab to `category.html?id=<category UUID>`, instead of opening a new tab or falling through to the homepage's same-page product scroll handler.
- Static verification against fetched committed files: all 5 inline homepage scripts parsed with `new Function` (PASS); product-page inline script parsed (PASS); navigation bridge parsed (PASS). Source checks PASS for category/subcategory click interception, same-tab navigation, image source/fallback logic, standalone part request CTA, brand-aligned banner, four-item specials limit, removal of hero/mobile WhatsApp CTA repetition, visible product description, Add to Cart markup and WhatsApp query action.
- Limitations: no browser end-to-end click test, no real HTTP image request/visual relevance check, and no preview URL for these new commits has been generated or verified. Do not claim live-preview acceptance yet. Existing public preview remains the approved PR #70 version, not these un-deployed changes. Reserve a single controlled preview deployment for final testing only.
- Next steps: open a draft review PR against `recovery/approved-preview-index-new`; run non-deploying browser/static tests for category -> subcategory -> product listing, product detail picture/description/Add to Cart/Query Part, request-part dialog, image fallback, specials count and desktop/mobile layout; only then use one controlled preview deployment and verify the exact URL. Keep production/launch HOLD; no Axxess/DNS/payment, live stock/catalogue, supplier, or APK changes.


## Follow-up checkpoint — 2026-10-20: draft PR #72 created from PR #70 baseline
- Draft PR: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/72. PR #72 is open, draft, unmerged, mergeable=true, and based on `recovery/approved-preview-index-new`; branch is 6 commits ahead and 0 behind the canonical baseline. PR #70 remains the approved/current design baseline. PR #71 was not used as a starting point and remains separate.
- The existing Public SKU Exposure Audit workflow for the latest PR head completed successfully (run ID `39477449507`, conclusion `success`). This is only an SKU exposure audit, not a storefront browser test.
- Additional source checks after commits: `products.html` product cards already link to `product.html?id=<product UUID>`; homepage and product-page inline JavaScript syntax checks PASS; category bridge syntax PASS. Static source checks pass for photo preservation, same-tab category/subcategory routing, request-part entry points, limited specials, reduced repeated WhatsApp buttons, product image fallback, description, Add to Cart and WhatsApp query action.
- Not complete yet: no Playwright click-through was run against this new branch, no real product/category image requests were verified, no desktop/mobile screenshot QA was performed for this branch, and no preview URL exists for these commits. Do not state these items are resolved end-to-end until tested. The currently approved preview still serves PR #70 content, not PR #72 changes.
- Keep PR #72 draft/unmerged and preserve production launch HOLD. Do not spend hosting credits until one controlled final preview deployment after non-deploying checks. No Axxess/DNS/payment, production, live stock/catalogue, supplier, or APK changes.


## Verification blocker — 2026-10-20
- Attempted to clone the exact PR #72 branch into an isolated local browser-test workspace to run Playwright. The container could not resolve `github.com` (DNS/network failure), so local browser click-through and screenshots could not be executed. No deployment was triggered to work around the blocker.
- GitHub's existing Public SKU Exposure Audit completed successfully for the latest PR head, but that workflow is not a browser/navigation test. Static JavaScript parse checks remain PASS; preview/browser verification remains pending.
- Next action for the next agent: run the dedicated non-deploying Playwright browser regression in an environment with repository/network access against branch `fix/pr70-storefront-owner-feedback-2026-10-20`, covering category/subcategory same-tab navigation, category images, request-part dialog, featured-specials cap, product image fallback, description, Add to Cart, Query Part WhatsApp, and 1440/390/320 widths. Then arrange one controlled preview deployment only after local checks pass and verify the exact preview URL. Continue to use PR #70's approved branch as the only design starting point; PR #72 stays draft/unmerged and production launch remains HOLD.


## 2026-10-20 — PR #72 continued: critical navigation and WhatsApp fixes; browser QA running
- Preserve the owner-approved PR #70 baseline (recovery/approved-preview-index-new). PR #71 is not the starting point and remains unmerged. PR #72 remains draft/unmerged; no live-store or production deployment was made in this checkpoint.
- Additional source defects found and fixed on branch fix/pr70-storefront-owner-feedback-2026-10-20:
  - category-navigation.js: removed a stale call to undefined installCategoryIllustrations(frame). It was inside the same try block before the click listener, so the exception prevented the category/subcategory navigation listener from being registered. The bridge now proceeds to attach the same-tab category.html?id=<UUID> navigation handler.
  - store.html: removed the wrapper-level floating “WHATSAPP” button, which persisted independently of homepage changes.
  - assets/progressive-store-enhancements.js: removed repeated “WHATSAPP ABOUT THIS PRODUCT” links from every product card and the “VERIFY VEHICLE FITMENT ON WHATSAPP” link from repeated fitment notices. The intended dedicated Query Part on WhatsApp action remains on the individual product page.
  - index-new.html: added exact-SKU local WebP fallback after the product-image function fallback, and mapped each of the eight main categories to a distinct relevant photo URL.
  - category.html: applied distinct photo mapping for the eight main category choices and retained topic-based subcategory images.
- Non-deploying QA added:
  - .github/workflows/pr72-storefront-interaction-qa.yml runs a Playwright test against the exact PR revision, mocks Supabase responses, and checks category navigation, subcategory-to-product-list navigation, category photo slots, request-part dialog, specials count, no repeated WhatsApp buttons, product image fallback, description, Add to Cart and Query Part on WhatsApp. It does not deploy.
  - Test runner: staging/pr72-storefront-interaction-qa.cjs; screenshots and JSON report are uploaded as a GitHub Actions artifact.
  - Current latest code/test-fixture commit at this note: 66b063f086781f71b401104a87c5825098842e4f. Custom browser QA run 39479131756 and responsive layout run 39479131782 are in progress; do not claim their final results until fetched.
  - Earlier responsive layout acceptance run 39479060865 passed on the same source changes before the final test-fixture-only update. Public SKU Exposure Audit run 39479131852 passed on the latest commit.
- Preview status: no new preview has been deployed or verified. After the latest custom browser QA and responsive checks pass, perform one controlled Cloudflare Pages preview deployment of this branch only; verify its exact URL in a browser. Keep production launch HOLD and do not touch Axxess, DNS, payments, live stock/catalogue or supplier authorisation.


## OWNER CORRECTION — 2026-10-20: incorrect category imagery, rating overlap, and request-part workflow
- Owner explicitly reported that category/subcategory pictures are incorrect; examples: fuses and regulators are shown with home fusebox/contactors imagery. Treat current image mapping as FAILED, not complete. Do not reuse one generic electrical-panel photo for fuses, relays, regulators, switches, sensors, or unrelated parts. Map each subcategory to a visually relevant, identifiable automotive product image; if no relevant image is available, use a clearly neutral “image unavailable” treatment rather than a wrong picture. Validate image mappings label-by-label before claiming completion.
- The hero's 4.7-star rating block is too large/long and overlaps or obstructs “SINCE 2012”. Compact the rating into a small badge that cannot cover the since-2012 label at desktop, tablet, or mobile widths. Test 320/390/768/1440 px.
- Owner says the “Find a Part”/part-search dialogue must be replaced or redirected to a clear standalone button customers can use to request a part that is not in the store. Do not treat an existing request button elsewhere as satisfying this. Make the part-request action obvious at the former search-dialog entry point and inside the search dialogue; it must open the existing request form and preserve user-entered part details where possible.
- These specific failures were not adequately resolved in the previous PR #72 pass. The prior handover understated the state and must not be used to claim these items are complete.
- Next action: correct the source files on the existing PR #72 branch, run non-deploying source/JavaScript checks and image-map audit, then update all three handover files with exact commit SHA, evidence, remaining browser checks and blockers. Keep PR #72 draft/unmerged and customer launch HOLD. No production deployment, Axxess/DNS/payment, supplier, or live stock/catalogue changes.


## 2026-10-20 — PR #72 live-preview verification complete
- Starting point remains the approved PR #70 baseline, recovery/approved-preview-index-new. PR #71 was not used as the base and remains separate. PR #72 is still draft/unmerged. Production/launch HOLD remains in place.
- Final isolated Cloudflare Pages preview: https://pr72-owner-feedback.get-wired-autoworx-store.pages.dev
- Final preview deployment commit: 4c484023967f1a9ef78639c3baa430db113d0ec8. The deployed alias is a review-only Pages branch, not the production domain. The preview URL above now serves the updated source.
- Live browser QA run 39483368511 PASSED 20/20 checks against the deployed preview. Reported console errors: 0; page errors: 0; failed requests: 0; HTTP responses >=400: 0. Artifact includes homepage, category page, product listing, product detail, mobile screenshot and report.
- Verified in the real hosted preview:
  - Eight main category tiles each load a distinct photo.
  - Main category click opens its own category route; Cloudflare Pages clean URLs are /category?id=... (not necessarily category.html), and the test now accepts both forms.
  - The electrical category page renders 12 subcategory/product-choice photo tiles; all images loaded and 7 distinct image URLs were used across them, including specific battery, fuse/relay, ignition, lighting and wiring/connector imagery.
  - The separate “CAN’T FIND A PART? REQUEST IT” button opens the request dialog.
  - Specials count is limited to four.
  - Wrapper-level WhatsApp CTA, repeated product-card WhatsApp buttons, and product-page floating request CTA are removed.
  - The individual product page loads a real product and picture, shows Product Description and Add to Cart, and its dedicated QUERY PART ON WHATSAPP link includes the product name/SKU.
  - Mobile viewport 390px has no document-wide horizontal overflow.
  - Google Fonts stylesheet is no longer blocked by Content-Security-Policy.
- Root cause of the missing individual product page was identified: product.html used a Supabase publishable key with incorrect letter casing compared with the valid key used by the rest of the storefront. This caused a 401 on the product detail query, so the product data/description/Add to Cart never rendered. The key now matches the working catalogue pages. Live test verified no product REST 401 and the product image loaded at 1200px natural width.
- Root cause of the earlier live navigation test failure was also clarified: Cloudflare Pages serves clean routes (e.g. /category?id=...) while the test expected only .html URLs. The live test was corrected to recognize clean routes. The bridge was additionally hardened so optional presentation CSS cannot prevent click-handler installation, and category routes use root-absolute paths.
- Static/local QA: inline-script and navigation syntax checks passed; local mocked Playwright interaction QA passed 14/14; responsive layout check passed. Latest live-preview QA 20/20 supersedes the earlier failed diagnostic runs.
- Final source fixes in this review branch:
  - index-new.html: product-card/modal images use canonical image_url then exact-SKU Edge Function fallback and placeholder; featured specials capped at four; standalone request-part CTA; banner copy aligned to “SOUND & SECURITY • AUTO ELECTRICAL • SPARES & ACCESSORIES” plus supporting range line; distinct root category photos and specific electrical subcategory photo rules.
  - category.html: topic-specific category/subcategory photo rules.
  - category-navigation.js: robust same-tab category/subcategory route handling.
  - product.html: valid Supabase key, exact-SKU image fallback, visible Product Description, Add to Cart/cart controls, dedicated product-specific WhatsApp query; no floating request button.
  - store.html and assets/progressive-store-enhancements.js: removed wrapper-level WhatsApp and repeated WhatsApp product/fitment buttons.
  - _headers: allowed fonts.googleapis.com in style-src to restore the intended storefront fonts.
- No merge, production deployment, Axxess/DNS/payment change, live stock/catalogue write, supplier authorisation, or APK change was performed. Keep PR #72 draft/unmerged until the owner reviews the preview.
- Next owner action: open the preview URL above and review desktop/mobile presentation. Do not merge or launch without owner approval.


## 2026-10-20 — Owner correction implemented; source validation passed, browser QA pending
- Owner's correction is now recorded in this file and in both companion handovers. Do not repeat the earlier incorrect claim that category imagery/request-part UX was fully resolved before this checkpoint.
- Source changes on PR #72 branch `fix/pr70-storefront-owner-feedback-2026-10-20`:
  - `index-new.html`: commit `1c50ceb0f1068add58ef02226cdcbde2fca7ee7a` adds purpose-built product illustrations for category/subcategory tiles. Fuses use blade-fuse artwork; voltage regulators use a separate regulator-module illustration; relays/contactors have a distinct automotive relay illustration; combined fuse/regulator labels show both. The previous shared home-electrical-panel photo mapping was removed from the homepage category art function. Auto Electrical Spares root category has dedicated electrical-parts artwork.
  - `category.html`: commit `3ee2c4baa19762a87ea1aea22913948ae6ad199c` replaces generic Unsplash image mapping with matching illustrated artwork for category/subcategory cards, including separate fuse, regulator, relay/contactor, wiring, battery, lighting, audio, tools, marine, camping and trailer visuals. The prior generic fuse/relay and regulator/switch/sensor image assignments are removed.
  - `index-new.html` also compacts the Google 4.7 rating into a small badge, hides the redundant long star row, and reserves space at desktop so it cannot block “SINCE 2012”; mobile layout uses a compact badge and top padding.
  - Homepage CTA now clearly exposes “CAN’T FIND A PART? REQUEST IT” as its own button. The search dialog also has “CAN’T FIND IT IN THE STORE? REQUEST THIS PART”; this closes search, opens the existing request form and carries the typed search term into the requested-part field. “SEARCH THE STORE” remains separately available.
- Verification performed: fetched the committed source back from GitHub; all 4 inline scripts in `index-new.html`, the inline script in `category.html`, and `category-navigation.js` pass JavaScript parse checks. Static source checks confirm the distinct fuse/regulator art branches, compact-rating override, hero request CTA and search-dialog request CTA. This is source-level verification only; it does not certify image rendering or actual clicks.
- Current PR #72 head: `3ee2c4baa19762a87ea1aea22913948ae6ad199c`; PR remains OPEN, DRAFT and UNMERGED against `recovery/approved-preview-index-new`. No production promotion or Axxess/DNS/payment/supplier/live catalogue changes were made by this task.
- GitHub Actions at latest head: PR 72 Storefront Interaction QA run `39483820419` is pending with no job created yet; Responsive layout browser acceptance run `39483820346` is in progress; Public SKU Exposure Audit run `39483820311` is in progress. Browser screenshot, category click-through, image decoding/relevance and request-form submission remain UNVERIFIED until those checks complete or a confirmed isolated browser runner is available.
- Next steps: monitor the existing non-deploying runs; inspect/fix any failures; run actual browser checks at 320/390/768/1440 px, including root/subcategory images, fuse/regulator separation, rating vs “SINCE 2012”, and search-dialog request action + query handoff. Only arrange one controlled preview deployment at final testing after checks are green. Customer launch remains HOLD.


## Follow-up — automated checks completed for code commit 3ee2c4b (2026-10-20)
- The GitHub Actions **Responsive layout browser acceptance** run `39483820346` completed SUCCESS for the category/product listing layout checks. Logged viewport widths: 320, 360, 390, 768 and 1440 px; no document horizontal overflow was found; category cards were two columns at widths up to 768 and three columns at 1440; product grid layout passed. This test exercises `category.html` and `products.html`, not the homepage hero/rating, and does not verify that every image visually matches its label.
- **Public SKU Exposure Audit** run `39483820311` completed SUCCESS; it confirms customer-facing source uses public SKUs and does not expose internal supplier mapping. This is unrelated to image or interaction correctness.
- **PR 72 Storefront Interaction QA** run `39483820419` remains PENDING and has no job created yet; therefore category click-through, actual image loading, request-form click and query handoff, and product interaction checks are not yet certified. Do not mark those complete based on the two successful workflows above.
- Latest PR head after handover updates: `20f00751f9072909713ab75c2455298ad480650e`. The source-code test results above correspond to code commit `3ee2c4baa19762a87ea1aea22913948ae6ad199c`; later commits only append handover documentation. PR #72 remains draft/unmerged. Next action is to monitor the interaction QA queue and complete the homepage-specific visual/interaction checks without triggering an extra preview deployment.


## Preview deployment incident/status — 2026-10-20
- Cloudflare's PR bot automatically reported a successful preview deployment for code commit `1c50ceb0f1068add58ef02226cdcbde2fca7ee7a`: `https://17feecaf.get-wired-autoworx-store.pages.dev`. Branch preview alias reported by the bot: `https://fix-pr70-storefront-owner-fe.get-wired-autoworx-store.pages.dev`. This was an automatic PR-preview build, not a production deployment or owner-approved final release.
- Later code commit `3ee2c4baa19762a87ea1aea22913948ae6ad199c` adds the separate fuse/regulator combination art to both homepage and category page. Cloudflare/browser tooling has not yet confirmed that this exact later code commit is the one served by either URL. The web browsing tool could not open either preview URL, so live visual acceptance remains UNVERIFIED. Do not represent the 1c50ceb deployment as verified current latest.
- The responsive listing-layout workflow and public-SKU audit succeeded for code commit `3ee2c4b`. The dedicated interaction QA run `39483820419` still has no job record and remains pending. The latest source code passes local-in-tool JavaScript parse checks and sample art-generation checks; live browser rendering and click tests remain outstanding.
- Latest storefront source-code checkpoint is commit `3ee2c4baa19762a87ea1aea22913948ae6ad199c`; subsequent commits in this checkpoint only append handover documentation. Keep PR #72 draft/unmerged. No production deployment or Axxess/DNS/payment/supplier/live catalogue changes were made. If a fresh preview is needed, do not trigger another deployment until the existing build status is reconciled and the single final-test deployment checkpoint is approved.


## Browser QA recovery checkpoint — 2026-10-20 (owner asked to continue to usable preview)
- Reviewed the latest PR #72 Interaction QA run `39484186596`. JavaScript parse checks passed; the browser test failed at the test selector, not a storefront assertion: Playwright strict-mode violation because the exact “CAN’T FIND A PART? REQUEST IT” label exists on both the homepage hero and the category quick-request button. The runner stopped before later checks, so previous browser acceptance is NOT a pass for request flow.
- Corrected `staging/pr72-storefront-interaction-qa.cjs` to explicitly click the first (hero) CTA and added checks for opening store search, using the “CAN’T FIND IT IN THE STORE? REQUEST THIS PART” CTA, carrying the typed query into the request form, and checking rating badge overlap with “SINCE 2012”. Corrected the test's dialog/input selectors to the actual `#partSearchDialog` and `#partSearchQuery` IDs.
- Corrected a literal escaped newline in the homepage rating CSS so the mobile media query is a real CSS rule. New source commits: `04223c66996a2e88a3d534cbde769d09d821423e` (homepage CSS) and `e7595ea0dbaf2202348f47468d3083a202b21e7a` (QA selector fixes). GitHub Actions automatically queued on the new PR head `e7595ea0dbaf2202348f47468d3083a202b21e7a`: Responsive layout run `39485091979` in progress, PR 72 interaction QA `39485091959` pending, Public SKU audit `39485091896` in progress.
- Current next action: inspect the new browser QA result and continue fixing failures until all relevant assertions pass; then confirm the Cloudflare deployment is for the tested latest code and provide the user a working preview. Do not claim preview is verified until the exact served URL matches the final tested source. PR #72 remains draft/unmerged; production launch and Axxess/DNS/payment/supplier/live catalogue changes remain on hold.


## Browser QA retry 2 — runner defect fixed (2026-10-20)
- The first retry exposed a test-runner API mistake: `frameLocator` has no `.evaluate()` method. The selector ambiguity was fixed, and the runner progressed through the request/search setup before failing at the newly added rating-overlap assertion. Updated that assertion to evaluate the iframe document via `frame.locator('html').evaluate(...)`.
- New runner commit: `8f33db723d874c0d2b3e186bc1f2f68fdbdabb7e`. This is a test-harness correction, not evidence of a storefront failure or success. Next run must show all assertions, and failures must be fixed rather than bypassed.
- Browser QA has not passed yet. Continue with the queued workflow for the latest head, inspect full logs, correct further test or product issues, and then confirm Cloudflare's deployment corresponds to the fully tested head. Do not merge or deploy production.
