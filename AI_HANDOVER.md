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


## Continuation branch created — 2026-10-20
- Fresh working branch: `work/approved-storefront-continuation-2026-10-20`, created from the owner-approved canonical branch `recovery/approved-preview-index-new` after PR #70 merge and handover reconciliation.
- Use this isolated branch for upcoming catalogue/category management tasks. Do not deploy or merge until non-deploying checks pass and the next testing checkpoint is approved.


## Current checkpoint — 2026-10-20 (handover refreshed)
- Owner-approved storefront layout is the canonical direction. PR #70, “Brighten Get Wired branding and add category photography,” was squash-merged; merge commit: `39d4c77096e1460e131ebfaeff8672aaedcb93e7`.
- Approved baseline branch: `recovery/approved-preview-index-new`. Active isolated continuation branch: `work/approved-storefront-continuation-2026-10-20`.
- Review deployment reported by the GitHub/Cloudflare deployment bot for source commit `f19e60c03b1aa6273989199cc24bec6c30842a4d`: `https://ebe5ddb2.get-wired-autoworx-store.pages.dev/store`. This URL was not independently opened/verified by the web checker; do not claim browser verification or that the squash merge itself was freshly deployed.
- `index-new.html` image URL generation was changed from fragile `loremflickr.com` queries to fixed Unsplash CDN image IDs chosen by category label; Marine is included in the banner/category text. These are category-level images, not verified exact product images. Actual image network loading, visual relevance and rights remain unchecked.
- `store.html` is a wrapper that loads `index-new.html` and shared product-image/category scripts. Preserve it; do not replace it with the full homepage document.
- Existing evidence: responsive layout browser workflow run `39452408814` passed with mocked catalogue at 320, 360, 390, 768 and 1440 px; public SKU exposure audit run `39452408700` passed. These do not prove live catalogue correctness, image requests/rights, checkout readiness or launch readiness.
- Immediate next work: perform non-deploying asset/link integrity checks, inspect category navigation and run isolated mocked responsive/browser checks. Do not trigger Cloudflare/Netlify deployments during this stage. Then continue catalogue accuracy, discontinued/out-of-stock supplier audit and secure stock/category management; maintain a review ledger and do not auto-approve ambiguous catalogue rows.
- Branch divergence warning: prior compare showed `main` 185 commits ahead and 227 behind relative to the design branch. Do not blindly merge `main` or unrelated PRs #67–69 and #65–66; inspect and reconcile individually.
- Release boundary: customer launch remains HOLD. Layout approval is not launch approval. No Axxess, DNS, production promotion, live Supabase/catalogue/stock, supplier systems, checkout/payment settings or APK distribution changes were made or authorized by this checkpoint.
- Keep all status evidence-based: distinguish completed work from investigation, report failed/unverified checks plainly, and update all three handover files after successful task completion.

## Non-deploying storefront integrity checkpoint — 2026-10-20
- Completed read-only checks on `work/approved-storefront-continuation-2026-10-20`; no storefront code, production configuration, live Supabase data, Axxess, DNS, or deployment was changed.
- Local references in the checked storefront entrypoints were cross-checked against repository paths: `store.html`, `index-new.html`, `category.html`, `products.html`, `product.html`, `checkout-v2.html`, `index.html`, `returns-refunds.html`, `terms-and-conditions.html`, `product-details.js`, `category-navigation.js`, `assets/product-image-pending.svg`, `assets/product-image-fallback.js`, `assets/category-cleanup.js`, `assets/progressive-store-enhancements.js`, and `assets/category-tree.json` are present. The binary logo `assets/gw-logo.png` was also confirmed present using base64 retrieval; a UTF-8 read error on a PNG is not a missing-file result.
- `store.html` continues to load `index-new.html` in its iframe and includes the expected image fallback, category cleanup, progressive enhancement, and category navigation scripts. Preserve this wrapper and its integration scripts.
- `assets/category-tree.json` contains 165 category rows, with no duplicate IDs and no missing parent references. All eight category IDs used by the approved root list are present in the snapshot. Homepage category navigation IDs checked in `category-navigation.js` also resolve against this snapshot.
- Confirmed unresolved data-freshness risk: `assets/category-tree.json` has `generated_at: 2026-10-11T09:56:20Z` (9 days old on this checkpoint). `category.html` still reads this static snapshot, so category activation, hierarchy and product counts may be stale. The refresh workflow is scheduled daily but runs on `main` and its script pushes to `main`; do not dispatch it or refresh from this continuation branch without an approved safe method, because it could write directly to `main`.
- The separate draft PR #68 (`fix/live-category-tree-2026-10-20`, head `47a634429783326cca9128770386046a3009a6fb`) already proposes reading active categories/product assignments from the public Supabase read API. Its live category source check run `39415362757` and SKU exposure audit run `39415362782` passed. PR #68 remains draft and unmerged; do not edit, retarget, or merge it as part of this checkpoint.
- Browser evidence boundary: responsive layout workflow run `39452408814` passed previously at 320, 360, 390, 768 and 1440 px with mocked data. This is not proof of live category click-through. No browser-navigation regression run for PR #68 was returned by the commit-associated workflow-run lookup, so the actual category click-through remains outstanding.
- Next safe action: obtain a confirmed non-deploying way to run Playwright against the live-category-change candidate or an isolated test branch, checking root → subcategory → product list, empty categories, and back/home navigation at desktop and mobile widths. Do not push to the design branch, dispatch the snapshot workflow that writes to `main`, spend Cloudflare/Netlify credits, or change live/production systems.
- Launch remains HOLD. Existing owner approval applies to the layout only; it does not approve production release or catalogue/category-data changes. Continue to distinguish completed source checks from browser verification and live-data freshness.

## Isolated category-navigation QA runner — 2026-10-20
- Created QA-only branch `qa/live-category-navigation-isolated-2026-10-20` from candidate PR #68 head `47a634429783326cca9128770386046a3009a6fb`; did not change PR #68 or the approved continuation branch's storefront code.
- Added `.github/workflows/isolated-live-category-navigation-qa.yml`, commit `ee3cb1e1f05a2c7f4c265fead7dd0f8dc4afea5f`. This workflow is restricted to push events on the QA-only branch; it installs Playwright, serves repository files locally, performs read-only GET probes for the candidate's Supabase category/product query shapes, and tests root → subcategory → product-list navigation with mocked product/category responses at 320, 390 and 1440 px.
- Deployment isolation checked against the canonical branch workflows: production Cloudflare deployment is manual-only; the design preview push trigger is limited to the design branch; the staging preview push trigger is limited to `review/staging-ui-verification-fixes-current`. The QA branch is not one of those triggers. No Cloudflare/Netlify deployment was requested or initiated.
- Workflow run `39463794062` is running at this checkpoint: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39463794062. Do not record browser/API checks as passed until the completed run and step logs confirm the outcome.
- If live schema probe fails, inspect the HTTP status/body and correct the candidate's query only in a separate isolated branch or report the precise blocker; do not modify desktop-agent PR #68 without coordination. If mocked click-through fails, use the Playwright output to repair the QA/test candidate in isolation and rerun before proposing any merge.
- Customer launch remains HOLD; do not merge PR #68, refresh snapshot by the main-writing workflow, change live catalogue data, or deploy until category-data freshness and browser regression are resolved and owner approval is explicit.