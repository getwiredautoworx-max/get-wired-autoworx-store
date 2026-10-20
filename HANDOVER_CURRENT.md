# Get Wired AutoWorx — Current Handover
Updated: 2026-10-20 SAST

## OWNER DIRECTIVE — SINGLE APPROVED STOREFRONT ONLY (2026-10-20)
- **Only approved storefront/reference:** https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- **Authoritative source commit:** `1a76108c7415ade3bab07461ac27af16ce2fa8f8` (the commit associated with the approved 20:56 reference deployment).
- Owner explicitly directs that this exact approved source replaces the divergent recovery build; do not mix in, inherit, merge, or rebuild from other storefront variants.
- The recovery branch `recovery/approved-preview-index-new` was reset successfully to the exact approved source commit so its tracked build tree matches that version, rather than keeping the partial restoration commits.
- Keep historical Git commits for traceability; “remove other versions from the build” means exclude them from the active source tree, not erase repository history.
- **Verified source reset:** Git ref update moved `recovery/approved-preview-index-new` directly to approved commit `1a76108c7415ade3bab07461ac27af16ce2fa8f8`. `index-new.html` matches approved blob SHA `d274b0ffdaa0a1c45939933e308c4c65acb85554` (144,657 characters); `store.html` matches approved blob SHA `9f0e26e34face9bf7abab42ac158a11f3be88643`.
- **Preview trigger:** Because the exact old commit did not generate a new Pages deployment event, created commit `712a805a1fe395bdb80f9344952016f136438a5f` with the **identical approved source tree** `a9c81aca653683a453f062fce541eb28fee58d92` and moved the recovery branch to it. This changes commit metadata only; all tracked files remain exactly those from the approved source tree.
- **Pages deployment succeeded:** Cloudflare Pages bot confirms commit `712a805` deployed successfully. Exact deployment URL: https://e245f05c.get-wired-autoworx-store.pages.dev/store . Branch URL: https://recovery-approved-preview-in.get-wired-autoworx-store.pages.dev/store . Deployment log: https://dash.cloudflare.com/?to=/43ab7b7bd3689458e2d0de39f6e897ca/pages/view/get-wired-autoworx-store/e245f05c-57ad-4334-bfea-fe52c197e5e8 . Separate Worker build failures are not Pages preview results and must not be confused with Pages deployment status.
- **Owner visual acceptance update (2026-10-20):** Owner confirmed the newly deployed preview “works fine on desktop” and has now explicitly confirmed “the mobile version is working fine aswell.” Treat desktop and mobile as owner-reported accepted; do not misrepresent this as independent browser automation. Tablet-specific checks and detailed interaction checks remain unverified unless separately tested. Do not redesign the accepted version or disturb the approved source tree; any further UI changes should be isolated, tested, and only made for a specific confirmed issue.
- Do not merge to `main`, change Axxess/DNS/production, or change payment/catalogue systems as part of this task. Existing production release HOLD remains in force.

## Owner-approved baseline (authoritative)
- Owner confirms the original working storefront around 20:56 SAST is the reference: https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- PR #54 Cloudflare Pages bot associated that preview with commit `1a76108c7415ade3bab07461ac27af16ce2fa8f8`.
- Owner rejects the storefront inherited by `6b7cf26b86fd4eaa1a88baad1c1d20efd2d5c9c8` as the old broken version. Do not use it as the baseline.
- Continue restoring the existing storefront; do not restart, redesign, or build a replacement/demo.

## Latest completed work
- Owner-correction record saved: `handover-runs/2026-10-20-owner-approved-preview-correction.md`, commit `f994e56ea749bd77e01fe68e29652f96414a43f2`.
- Isolated restoration branch: `recovery/approved-preview-index-new`.
- PR #64 open/unmerged: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/64
- The former partial-restoration heads (`e2e51cc...` and `e85e794...`) are superseded. The recovery branch now points directly to the approved source commit `1a76108c7415ade3bab07461ac27af16ce2fa8f8`.
- Earlier partial file-by-file restoration work is superseded by the exact approved-source branch reset; do not treat the partial-restoration commits as the active build.


- Detailed restoration log saved at `handover-runs/2026-10-20-controlled-approved-source-restoration.md`, commit `18374704f09a07b55b89b0bebf0cc09b9b769c3b`.

## 2026-10-20 — Separate Cloudflare Worker build failure: disposition
- **Resolution:** Treat the failed Cloudflare Workers build as separate from the working Cloudflare Pages storefront. The owner confirmed the Pages preview from commit `712a805a1fe395bdb80f9344952016f136438a5f` works on desktop; Cloudflare Pages deployment succeeded at https://e245f05c.get-wired-autoworx-store.pages.dev/store.
- **Evidence from the recovery branch:** `wrangler.toml` sets `pages_build_output_dir = "."`, consistent with a static Pages project. No root `package.json` or `_worker.js` exists at the recovery head. There is no evidence that the approved static storefront requires a separate Worker runtime.
- **Action:** Keep the separate Worker build integration disabled. Do not rerun or re-enable it just to serve this storefront; do not remove or alter `wrangler.toml`, the approved source tree, or the successful Pages deployment as a speculative fix.
- **Worker log link:** https://dash.cloudflare.com/?to=/43ab7b7bd3689458e2d0de39f6e897ca/workers/services/view/get-wired-autoworx-store/production/builds/5feb69f0-6ca6-4511-b98e-f272c4ef5216 . The authenticated log content was not accessible through the current tools, so the exact Worker failure message remains unverified. This is not a Pages failure.
- **No production changes:** No Axxess, DNS, production Pages, Supabase, checkout, or payment configuration changed. No additional storefront deployment was triggered.
- **Next step only if a Worker capability is later proven necessary:** inspect the authenticated Worker log and configure a genuine Worker entry point/build separately; do not conflate it with the static Pages project.

## Current status — 2026-10-20, after owner desktop and mobile acceptance
- New Pages preview is deployed successfully from commit `712a805a1fe395bdb80f9344952016f136438a5f`; owner reports it works fine on desktop and confirms the mobile version works fine as well.
- Exact deployment preview: https://e245f05c.get-wired-autoworx-store.pages.dev/store . Recovery branch preview: https://recovery-approved-preview-in.get-wired-autoworx-store.pages.dev/store . Cloudflare Pages deployment log: https://dash.cloudflare.com/?to=/43ab7b7bd3689458e2d0de39f6e897ca/pages/view/get-wired-autoworx-store/e245f05c-57ad-4334-bfea-fe52c197e5e8 .
- The separate Worker build bot reports failure for the same commit at https://dash.cloudflare.com/?to=/43ab7b7bd3689458e2d0de39f6e897ca/workers/services/view/get-wired-autoworx-store/production/builds/5feb69f0-6ca6-4511-b98e-f272c4ef5216 . This is not the Pages deployment: Pages preview success and Worker build failure are separate statuses. Do not re-enable the disabled Worker build just to fix the preview.
- Mobile is now owner-confirmed working. Tablet-specific visual parity and detailed interaction checks have not been independently verified in this session. Keep the accepted source unchanged unless a specific issue is reported.
- PR #64 remains open/unmerged and its historic diff is misleading due to the formerly divergent branch history. Do not merge it wholesale, merge/promote, or force-push main. The recovery branch's active source tree matches the approved tree, with commit metadata-only trigger commit `712a805`.

## Continue from this exact point
1. Preserve the desktop-accepted preview and approved source tree; do not trigger another deployment unless a specific issue requires it.
2. Owner has confirmed desktop and mobile work. Do not repeat mobile QA as if it were still outstanding; only perform targeted checks for tablet-specific layouts or key controls (Shop Now, Part Search, Request a Part, category navigation, logo/images) if a reliable preview-testing route is available. Clearly distinguish automated results from owner-reported acceptance.
3. Keep the Cloudflare Pages preview success separate from the Worker build failure. Worker logs are available at the URL above, but do not re-enable the disabled Worker build or change production configuration without a clear need and approval.
4. PR #64 remains unmerged; do not merge the historic divergent PR. If a later approved release is needed, create a clean, narrowly scoped path based on `main` and preserve the approved source files rather than merging the whole PR.
5. Record evidence and update this handover after meaningful success/failure. Leave Axxess, production domain/DNS, Supabase data, checkout and payment settings unchanged until owner explicitly approves the verified release.

## Remaining launch gates
- Final storefront/mobile acceptance and source/dependency parity.
- Correct catalogue products, categories, prices and high-quality images; current image coverage has not been confirmed complete.
- Supplier stock/discontinued reconciliation.
- Secure product/category admin CRUD and simple stock/subcategory editing.
- Checkout, policy and payment-provider verification once the store URL is approved.
- Owner's final acceptance.
Customer launch remains HOLD.

## Owner workflow preferences
- Build and test in GitHub first; only move to Axxess when owner approves the build.
- Do not ask owner to upload ZIPs for small changes.
- Do not ask for owner input unless an actual external requirement/approval is needed.
- Keep the existing storefront and resolve the root cause; do not circle through repeated redesigns.
- Never claim “completed” without evidence.

## Safety/change record
- No PR merged; no main force-push.
- No production deploy, Axxess upload, DNS, Supabase, checkout, or payment settings changed during this restoration.
- Restoration changes are isolated to `recovery/approved-preview-index-new`.
- This handover update is a documentation-only change on main.


## 2026-10-20 — Post-acceptance launch-readiness work started
- **Storefront acceptance:** owner confirms both desktop and mobile work on the Pages preview. Preserve the approved storefront tree; no redesign, deployment, or Axxess/DNS changes were made.
- **ASC supplier status reconciliation utility added in draft PR #65:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/65 . Branch: `audit/asc-stock-cleanup-2026-10-20`. Files: `audit-tools/asc_supplier_status_reconcile.py`, `audit-tools/README.md`, and an isolated self-test workflow. The tool is designed for review-only CSV exports, exact normalized supplier SKU matches, duplicate/unmatched blocking, and separate candidates for discontinued versus temporarily out-of-stock items. It makes no Supabase/database writes.
- **Important evidence limitation:** no complete, current ASC stock/status feed was found in the accessible project context. Therefore no real SKU has been confirmed discontinued/out of stock and no cleanup patch has been applied. Run the tool only after obtaining an authorised current ASC export and a read-only current products export; review results before any approved data mutation.
- **Admin CRUD source inspection:** current `admin.html` + `assets/admin.js` provide order management, not product/category/subcategory CRUD. The Android owner app includes staged catalogue import and an `owner_publish_product` RPC path, but no complete category editor was found in the inspected UI. Do not tell the owner that routine stock/category editing is ready. Next implementation must use authenticated, allowlisted server-side operations and preserve the cost × 1.15 VAT × 1.35 pricing rule; do not expose service-role keys or add public direct-write policies.
- **Checkout/policy source audit (main branch only; not the approved Pages preview and not a live-domain pass):** `terms-and-conditions.html` contains the R35 packaging rule, delivery quoted separately, 25% discretionary handling/restocking fee with legal caveat, special-order restrictions, and installation/diagnosis evidence language. `returns-refunds.html` includes the same legal caveat and electrical/electronic installation/diagnosis requirements. `checkout-v2.html` lists Direct EFT only, free pickup, R35 packaging per item, and requires a live/confirmed delivery quote before delivery checkout. PayFast and PayJustNow are not present in this checkout source. Still required: verify policy links from the exact approved storefront/package, validate policy wording against owner intent and applicable law, and perform safe non-mutating checkout tests; no real order or payment-provider setup was performed.
- **Verification state:** PR #65 is draft and unmerged. The self-test workflow has been added, but no successful run result has been confirmed in this checkpoint; do not claim the script tests passed until an actual Actions result is observed. No catalogue data, Supabase schema/data, checkout/payment configuration, Axxess, DNS, Cloudflare Pages production settings, or Worker settings were changed.
- **Next sequence:** (1) verify the isolated reconciliation PR self-test; (2) obtain/produce current authorised ASC stock/status input plus a read-only product export and generate the actual decision ledger; (3) implement secure product/stock/category/subcategory CRUD in an isolated branch after checking the existing admin RPC/schema security; (4) complete checkout/policy link and payment readiness audit; (5) keep release HOLD until owner approval and final controlled tests.


## 2026-10-20 — Launch-readiness follow-up (in progress)
- **ASC live comparison now has an automated, read-only route:** PR #65 adds `audit-tools/asc_live_status_audit.py` and a GitHub Actions workflow that reads public ASC WooCommerce Store API pages plus only active public store products using the public publishable Supabase key. It produces a CSV + JSON artifact and never writes either system. Run: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39414748626 . At the time of this handover update, the run is still in progress; no live SKU conclusions are claimed yet.
- **Offline reconciliation tests passed:** workflow run https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39414451139 completed successfully. Verified test cases include explicit discontinued, out-of-stock, zero quantity, available/no change, negated discontinued wording, duplicate supplier SKU blocking, unmatched SKU not guessed, and no-database-writes mode.
- **Checkout policy-link issue confirmed and isolated:** the approved source `checkout-v2.html` did not contain direct links to the terms or returns policy. Draft PR #66 adds both links next to order notes: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/66 . It is not merged or deployed. Existing smoke test and public SKU exposure audit runs associated with that PR both succeeded, but they do not by themselves prove the new checkout links are live.
- **Read-only schema/security inspection:** `public.products` and `public.categories` have RLS enabled; the only listed policies for them are public SELECT policies limited to active rows. Existing `owner_publish_product` is SECURITY DEFINER, calls `public.is_veyron_admin()`, validates SKU/name/category/cost/stock, applies the locked cost × 1.15 × 1.35 price formula, and writes an audit log. Do not add direct public table write policies. Secure stock/category CRUD still needs authenticated allowlisted RPCs and a working owner UI.
- **Supplier evidence from web search:** ASC public pages visibly list products with labels such as “WILL DISCONTINUE”, “DISCONTINUED”, “NOT VIABLE”, and “Out of stock”. A small read-only SKU probe against the live store found three exact SKU matches among the sample tested (CL203, RSL1002B, IAWC-027B-MR), but these are not evidence of discontinued products: the first two appeared in-stock at ASC and the third is a different “black/maroon” item, not the black/red discontinued variant. Several specific discontinued candidate SKUs searched (SG-21TB, FF-024, 01407, RH1530, YG0610X5, YG0618A) were absent from the active store query. No catalogue mutation was made.
- **No production actions:** no Supabase writes/schema changes, payment activation, real orders, Axxess upload, DNS change, or production Pages promotion. PRs #65 and #66 are drafts and unmerged. Keep customer launch HOLD.
