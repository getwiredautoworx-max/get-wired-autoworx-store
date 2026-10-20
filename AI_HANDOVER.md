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
