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
