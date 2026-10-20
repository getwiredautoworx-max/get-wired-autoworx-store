# GET WIRED AUTOWORX — AI HANDOVER / NEXT-AGENT START HERE

**Purpose:** Mandatory entry point for every AI agent or ChatGPT session continuing this repository.
**Repository:** `getwiredautoworx-max/get-wired-autoworx-store`
**Master handover:** [`AI_HANDOVER_PERMANENT.md`](AI_HANDOVER_PERMANENT.md)
**Approved reference storefront:** https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
**Last checkpoint recorded:** 2026-10-20, continuation run 13.

## MANDATORY HANDOVER PROTOCOL — DO THIS EVERY SESSION

1. **ALWAYS READ BOTH HANDOVER FILES FIRST.** Before inspecting code, running checks, editing files, or delegating work, read the latest `AI_HANDOVER.md` AND `AI_HANDOVER_PERMANENT.md` from the repository's current default branch. This rule applies even when a previous chat, agent, or summary says one was already read. Do not start project work until both files have been read.
2. **ALWAYS RECORD TASK START.** Append a dated task-start note to `AI_HANDOVER_PERMANENT.md` before doing project work. State the scope, exact branch/commit/PR, constraints, and planned verification. Preserve existing content and user instructions.
3. **ALWAYS UPDATE THE HANDOVER FOR THE NEXT AGENT.** After each material task success, failure, blocker, or scope change, append evidence and next steps to `AI_HANDOVER_PERMANENT.md`. At session end, record exact commit/head SHAs, checks and run IDs, what was and was not done, remaining gates, and the single safest next action. Do not mark “completed” unless evidence supports it.
4. **Use sequential writes only.** Fetch the current file and latest blob SHA immediately before editing. Append without replacing earlier content; write using that latest SHA. Never let two agents write the same handover simultaneously. If another agent may be editing, coordinate and re-fetch before writing to prevent lost updates.
5. **Cross-agent coordination.** There is no guaranteed direct ChatGPT-agent-to-agent channel. Coordinate through GitHub branches/PRs and these handover files. State ownership of files/tasks, exact base/head SHA, test commands, results and artifacts. Read the newest handover before continuing another agent's work.
6. **Do not deploy or spend release credits as a side effect.** Inspect workflow triggers before pushing commits or dispatching checks. Do not trigger Cloudflare/Netlify builds, previews, retries, production deployment, or other credit-consuming work unless the user explicitly authorizes it or the handover clearly permits it. If no safe non-deploying test method is confirmed, record the blocker and stop before triggering it.
7. **Keep release gates intact.** Do not merge draft PRs, change production/live data or schema, upload to Axxess, alter DNS/payment settings, distribute the APK, or change customer-facing stock/catalogue data without the relevant explicit approval. Supplier stock/discontinuation reconciliation is PAUSED pending supplier finalization.
8. **Separate evidence from assumptions.** Label each item as verified, partially validated, unresolved, blocked, or not run. Do not present source inspection as browser acceptance, a successful test as deployment health, or an old preview/build as the current head's status.

## PERMANENT USER INSTRUCTIONS — 8 LOCKED RULES

These eight rules are user-authoritative and must be copied into every new handover file without omission, alteration, or reinterpretation. They may not be edited, removed, or weakened unless the user explicitly gives permission.

1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**

### RULE-PRESERVATION REQUIREMENT

- The eight rules above are locked user instructions.
- Do not delete, merge, reorder, weaken, reinterpret, or silently edit them.
- If the user requests that any of the eight rules be edited or removed, first reproduce all eight rules exactly as currently recorded, then handle the user's explicit authorized change.
- Any new handover file must contain all eight rules exactly and prominently.
- Verified project progress may be appended around these rules, but must not override them.

## CURRENT VERIFIED CHECKPOINT — 2026-10-20

- PR #68 (live category navigation): OPEN / DRAFT / UNMERGED. Head: `47a634429783326cca9128770386046a3009a6fb`. Source checks `39415362757` and public SKU exposure audit `39415362782` passed. The required browser-navigation regression has **NOT RUN**; its gate remains OPEN.
- PR #70 (design/responsive polish): OPEN / DRAFT / UNMERGED. Head: `89a0a11f7bdb84a1d2ce8f55e18f27d12d0ca1ca`. Responsive Playwright run `39429111752` and SKU exposure audit `39429111750` passed, but these do not establish current Cloudflare preview health or owner visual approval. Current-head Cloudflare build status remains UNRESOLVED.
- Existing browser test success for PR #70 is not a substitute for the PR #68 category navigation test.
- No new deployment, build retry, merge, production/live-data write, schema change, Axxess/DNS/payment change, or stock reconciliation was performed in the last recorded run.
- Supplier stock/discontinuation reconciliation remains PAUSED pending supplier finalization.
- Customer launch remains **HOLD** until outstanding checks and owner approval are complete.
- Keep the approved reference storefront above unchanged as the comparison baseline. Do not assume any other preview URL is current or approved.

## NEXT AGENT — SAFEST NEXT ACTION

1. Read the latest entries in `AI_HANDOVER_PERMANENT.md` and confirm current PR heads/status before acting.
2. Find or establish a local/isolated browser runner for PR #68 with mocked category/product responses. First prove the runner cannot trigger Cloudflare/Netlify deployment hooks; do not push a PR commit or run a preview workflow merely to test.
3. If safely available, test root-category clicks, subcategory drill-down, product counts, browser-back navigation, and vehicle-finder exemptions; save actual logs/results and update the permanent handover.
4. If no confirmed non-deploying browser runner is available, record the blocker and leave the gate OPEN. Check the existing PR #70 Cloudflare build's final state/log only; do not retry/redeploy.
5. Keep PR #68 and #70 draft/unmerged, launch HOLD, and supplier reconciliation paused unless the owner explicitly changes those instructions.

**No task is considered complete merely because it was investigated.** The next agent must update this file only when its guidance/checkpoint materially changes, and must always append detailed dated outcomes to `AI_HANDOVER_PERMANENT.md`.


## LATEST VERIFIED CHECKPOINT — 2026-10-20, continuation run 17

- **PR #68 isolated Playwright regression: PASS** for mocked navigation/fitment acceptance. Exact source head tested: `47a634429783326cca9128770386046a3009a6fb`; base `recovery/approved-preview-index-new` at `712a805a1fe395bdb80f9344952016f136438a5f`.
- Isolated runner branch: `test/pr68-isolated-playwright-2026-10-20`; harness commit `cbb62314817ffa79b230c8ea2c9dc0a21d27353f`. Successful run `39450493966`, job `118723695961`; artifact `12278521131`. This branch used only a local static server and mocked Supabase fixtures. Its only runs were the source-check workflow; no Cloudflare Pages or Netlify deployment was triggered and no credits were used.
- Checks passed: all eight root categories visible; recursive category counts; root-category click; subcategory drill-down; exact product count/cards; browser Back to parent; Auto Electrical retains fitment guidance; Vehicle Security, Car Audio, Automotive Accessories, Marine, Tools/Consumables, Camping/Outdoors and Trailer/Canopy omit fitment-specific detail/advice.
- PR #68 remains OPEN/DRAFT/UNMERGED at `47a634429783326cca9128770386046a3009a6fb`. PR #70 remains OPEN/DRAFT/UNMERGED at `9698f4c0f3c117cafb01b2c75b77197d2705b517`. Customer launch remains HOLD. This is mocked browser acceptance only, not live catalogue/data validation or owner approval.
- **Next safest action:** preserve the isolated test branch (do not merge it to storefront branches), review the current PR #68 head and carry this successful test evidence into the PR review if the head is unchanged. Continue independent read-only work alongside the desktop agent; no production promotion or launch until all other release gates and owner approval are complete.
- Detailed run log and scope limits: `AI_HANDOVER_PERMANENT.md`, run 17 outcome, commit `8744bc2260a29220a09451334723201c6cb6323b`.


## LATEST CHECKPOINT — 2026-10-20, preview mismatch recovery continuation

- Read `AI_HANDOVER.md`, `AI_HANDOVER_PERMANENT.md`, and `HANDOVER_CURRENT.md` before work. Detailed evidence is appended to `AI_HANDOVER_PERMANENT.md` in commit `96d8282ad02fe9e312d59f73f70f60ec106dac56`.
- Confirmed likely source of blank category artwork: `index-new.html` used `loremflickr.com` query URLs and its error handler removed the broken image without a usable fallback. The banner range text omitted Marine.
- Correction committed to isolated design review branch `design/brighter-brand-category-images-2026-10-20`: `f19e60c03b1aa6273989199cc24bec6c30842a4d`. Marine is now in the banner; image URLs use fixed Unsplash CDN IDs chosen by category label; verified updated source has no loremflickr URL. Image relevance and real network loading are not yet verified.
- Public SKU Exposure Audit passed: run `39452408700`. Responsive layout browser acceptance is still in progress: run `39452408814`. The review deploy workflow is push-triggered for this source file and the commit was the requested final-test preview step. Do not dispatch or retry another deployment until current deployment status is checked.
- **Preview status:** exact URL for the new commit is NOT YET CONFIRMED. Do not present the older review URL as containing this correction. Next agent must retrieve the Cloudflare review deployment result for commit `f19e60c03b1aa6273989199cc24bec6c30842a4d`, then test the exact URL and image loading before calling it ready.
- PR #70 remains draft/open/unmerged. Approved reference `https://1fdda0ab.get-wired-autoworx-store.pages.dev/store` preserved. No merge, production promotion, Axxess/DNS, Supabase, checkout/payment, catalogue/stock or supplier changes. Customer launch remains HOLD.


## LATEST VERIFIED CHECKPOINT — 2026-10-20, continuation run 18

- Isolated PR #68 Playwright runner preserved unchanged on `test/pr68-isolated-playwright-2026-10-20`, commit `cbb62314817ffa79b230c8ea2c9dc0a21d27353f`. Existing runs `39450021059` and `39450493966` are successful; browser job `118723695961`; artifact `12278521131`. The runner uses a local static server and mocked Supabase fixtures; no Cloudflare/Netlify workflow or credits were used. Do not merge the test branch.
- Current draft PRs rechecked: #67 head `7c1cfae0821d1c4de5593c15fe60ea1264b3c93d`; #66 head `e29b1f69d5fab7379dd38b344b171f630d60b67c`; #68 head `47a634429783326cca9128770386046a3009a6fb`; #70 head `9698f4c0f3c117cafb01b2c75b77197d2705b517`. All OPEN/DRAFT/UNMERGED. The successful PR #68 mocked browser test is evidence for that gate only, not merge or launch approval.
- Independent PR #67 review: source indicates a likely browser CORS/preflight blocker (owner UI sends Authorization + JSON cross-origin requests; function has no OPTIONS handler/CORS response headers and authenticates before method dispatch); audit insert errors are ignored after mutations; workflow uses Deno/static assertions but lacks executable auth-negative, hierarchy, and audit-failure tests. No source edits or Supabase deployment occurred. See `AI_HANDOVER_PERMANENT.md`, run 18 outcome, commit `5c5b221380619390c25d492601b28667ae23312b`.
- Independent PR #66 comparison: policy links are added to checkout beside order notes; final package still needs to verify both policy-page paths. No live checkout test or order was run.
- Only handover files were updated; desktop-agent branches and all customer-facing/live systems remain untouched. Customer launch HOLD; supplier reconciliation PAUSED; no Axxess/DNS/payment/catalogue/stock/schema changes, merges, deployments, or APK distribution.
- **Next safest action:** preserve the runner and coordinate with the desktop agent before editing any shared branch. Implement and test PR #67 CORS/preflight and fail-closed audit handling on an agreed isolated branch with mocked executable tests, without deploying Supabase. Leave all draft PRs unmerged until review and owner approval.


## LATEST VERIFIED CHECKPOINT — 2026-10-20, continuation run 19

- **Preview deployment resolved at workflow level:** Cloudflare Pages review deploy run `39452404463` completed SUCCESS for `f19e60c03b1aa6273989199cc24bec6c30842a4d`; log reports `https://fccc47b7.get-wired-autoworx-store.pages.dev` and alias `https://review-70.get-wired-autoworx-store.pages.dev`. Open the `/store` path. The merged PR #70 body separately lists `https://ebe5ddb2.get-wired-autoworx-store.pages.dev/store`; these different hashes are distinct records and must not be assumed identical. If the first link does not show the desired version, test the PR-recorded URL in a normal browser and report which deployment is current. Do not trigger another deploy just to reconcile this.
- Responsive layout browser acceptance run `39452408814` PASSED and Public SKU Exposure Audit run `39452408700` PASSED on the same source commit. Responsive test used local static pages/mocked Supabase data, and passed 320/360/390/768/1440 widths with no horizontal overflow. It does not verify remote image loading/relevance or live data. Direct open via web retrieval tool failed with an access-tool error, which is not proof the Pages site is down.
- PR #70 is now CLOSED/MERGED into `recovery/approved-preview-index-new` at `39d4c77096e1460e131ebfaeff8672aaedcb93e7`. PR description says the owner approved this as the continuing layout baseline; this is not approval to promote to production or launch. The merge was observed in GitHub metadata, not performed by this run.
- PR #66, #67 and #68 remain open/draft/unmerged. Preserve PR #68's isolated Playwright runner and artifacts. PR #67 needs CORS/preflight and fail-closed audit handling plus executable mocked tests, but coordinate before shared edits; do not deploy Supabase. PR #66 policy links need final-package path checks.
- Handover detail and URLs are in `AI_HANDOVER_PERMANENT.md`, run 19 outcome; `HANDOVER_CURRENT.md` contains the current checkpoint. No new deployment, credit spend, merge, production promotion, live Supabase/schema/data, stock/catalogue, Axxess/DNS/payment or APK change was made in this run. Customer launch remains HOLD; supplier reconciliation remains PAUSED.


### Run 19 follow-up — checkout policy link target files
- PR #66 source branch `fix/checkout-policy-links-2026-10-20` has both referenced files: `terms-and-conditions.html` (blob `802b3210b7a82938ce2c2ca5e6f6c87ddec19e75`) and `returns-refunds.html` (blob `48d92c06943ef9c99ef959c984f34750a6200801`). Checkout source with the links is blob `32b6f623a454fb7832146ace7addded054fe2a9d`. Both targets also exist on main and recovery baseline. This is source-level existence only; packaged/live browser verification remains for final testing.


## LATEST VERIFIED CHECKPOINT — 2026-10-20, continuation run 20

- All three handovers were read before project work. Task-start and detailed outcome are appended in `AI_HANDOVER_PERMANENT.md`; latest outcome commit `c1241b51335272a10686e4e9922a2778d6038473`. Current handover refreshed in commit `3c3f1f567a4842d775ecf342b72dacb226a1f6d3`.
- PR #66 remains OPEN/DRAFT/UNMERGED at `e29b1f69d5fab7379dd38b344b171f630d60b67c`. Source checkout links point to existing root policy files, but exact served/package browser test is still NOT VERIFIED. Existing Pages preview `https://03b01bae.get-wired-autoworx-store.pages.dev` could not be opened by the web retrieval tool; do not infer outage from that limitation.
- PR #67 remains OPEN/DRAFT/UNMERGED at `7c1cfae0821d1c4de5593c15fe60ea1264b3c93d`; likely CORS preflight issue and ignored audit insert errors remain. No source edits due potential desktop-agent overlap and Cloudflare preview trigger risk.
- PR #68 remains OPEN/DRAFT/UNMERGED at `47a634429783326cca9128770386046a3009a6fb`; isolated mocked Playwright test remains PASS; preserve its test branch/artifact.
- PR #70 is CLOSED/MERGED into `recovery/approved-preview-index-new` at `39d4c77096e1460e131ebfaeff8672aaedcb93e7`. Existing review deploy run `39452404463` succeeded for source `f19e60c03b1aa6273989199cc24bec6c30842a4d`, job `118730382190`. URLs with deployment IDs `fccc47b7` and `ebe5ddb2` remain distinct/unreconciled; do not claim identical served content or production approval.
- No new deploy/retry, credits, source PR edit, merge, Supabase write/deploy, production/live data, catalogue/stock, Axxess/DNS/payment, or APK distribution. Customer launch HOLD; supplier reconciliation PAUSED. Next safest action: remain read-only until desktop-agent ownership is clear, then prepare an isolated PR #67 CORS/audit patch and mocked tests only if its branch/push is proven non-deploying.


## LATEST VERIFIED CHECKPOINT — 2026-10-20, continuation run 21

- Read both required handovers before work. Detailed outcome is appended to `AI_HANDOVER_PERMANENT.md` in commit `5874da34ebc88d30e81f1b3e623162c6406383cb`.
- PR #68 exact head `47a634429783326cca9128770386046a3009a6fb`: isolated Playwright navigation/fitment regression PASS, run `39450493966`, browser job `118723695961`, artifact `12278521131`. This used local static server + mocked Supabase and covers eight roots, category drill-down, direct/recursive counts, product cards, browser Back and fitment exemptions. It does NOT certify live Supabase/catalogue data or live image network loading. PR #68 remains OPEN/DRAFT/UNMERGED; do not merge automatically.
- PR #70 status corrected from stale prior entries: GitHub API confirms CLOSED/MERGED, merge commit `39d4c77096e1460e131ebfaeff8672aaedcb93e7`; design source `f19e60c03b1aa6273989199cc24bec6c30842a4d`. Existing review deployment run `39452404463` succeeded and logs immutable URL `https://fccc47b7.get-wired-autoworx-store.pages.dev/store` with alias `https://review-70.get-wired-autoworx-store.pages.dev/store`. PR body separately records `https://ebe5ddb2.get-wired-autoworx-store.pages.dev/store`; those deployment IDs must not be conflated.
- Attempted live HTTP reads of reference/review URLs; web retrieval cannot access them and container client failed DNS resolution before connection. This is an environment access blocker, not proof the sites are down. Therefore current served DOM/source fingerprint and actual remote image load/relevance remain OPEN.
- Existing responsive mocked Playwright run `39452408814` PASS at 320/360/390/768/1440px; SKU audit `39452408700` PASS. No source changes, deployments/retries, Cloudflare/Netlify credits, merges, live data or production changes occurred.
- Next action: use a network-enabled browser/runner that can open existing immutable preview URLs without triggering deployment; compare page fingerprint/assets with source commit `f19e60c...`, resolve whether `ebe5ddb2` is a separate older deployment, and check actual image response/relevance. Do not redeploy just to resolve this. Launch HOLD; supplier reconciliation PAUSED.


## Continuation run 22 — 2026-10-20
- Task started after reading all three handover files. Full task-start/outcome ledger is in `AI_HANDOVER_PERMANENT.md`.
- Preliminary checks are read-only; no deploy, merge, production/live data, Axxess/DNS/payment, catalogue/stock, or APK change is authorized.


## Continuation run 23 — 2026-10-20
- Read all three handovers; rechecked existing GitHub Actions evidence read-only. Design source `f19e60c03b1aa6273989199cc24bec6c30842a4d`: SKU audit `39452408700` PASS, responsive acceptance `39452408814` PASS; existing preview deployment `39452404463` / job `118730382190` remains successful. No new deployment/retry.
- Existing browser/network blocker remains: actual served content, remote image status/relevance, live counts/links, and the differing `fccc47b7` vs `ebe5ddb2` deployments are not reconciled. Do not redeploy just to compare them.
- No app source, PR, production, live Supabase, catalogue/stock, Axxess/DNS/payment or APK changes. Customer launch HOLD; supplier reconciliation PAUSED. Next: verify existing URLs using a network-enabled real browser; preserve draft PRs and isolated test runner.


## LATEST CHECKPOINT — 2026-10-20, continuation run 24

- Re-read `AI_HANDOVER.md`, `AI_HANDOVER_PERMANENT.md`, and `HANDOVER_CURRENT.md` before continuing.
- PR #68 remains OPEN/DRAFT/UNMERGED at head `47a634429783326cca9128770386046a3009a6fb`. Existing isolated mocked Playwright regression PASS: run `39450493966`, job `118723695961`, artifact `12278521131`.
- Cloudflare Pages bot reports the existing deployment for the PR #68 head succeeded at `https://93f742c0.get-wired-autoworx-store.pages.dev`; branch alias `https://qa-live-category-navigation.get-wired-autoworx-store.pages.dev`. The separate Workers build failure is not the Pages deployment.
- Attempted to open `/category.html`, `/store`, and PR #68 via the available web retrieval interface; it could not access them. Live category click-through, live counts/product links, and served-source fingerprint remain BLOCKED / NOT VERIFIED. No new deployment was triggered.
- Master handover outcome appended in commit `8aea51aae720bd6b64bfffadef213c5e89389a28`.
- No source changes, merges, deployment retries, credit spend, live data/schema/catalogue/stock changes, Axxess/DNS/payment changes, or APK distribution. Customer launch remains HOLD; supplier reconciliation remains PAUSED.
- Next: use a network-enabled browser to verify the existing immutable preview URL and category click-through; do not redeploy just to work around browser-access limitations.


## OWNER-REPORTED PR #68 VISUAL/IMAGE FAILURE — 2026-10-20

- Owner reports PR #68 preview has missing pictures and looks unlike the approved desktop storefront. Treat visual acceptance as FAILED / NOT ACCEPTED; do not rely on mocked navigation tests as evidence of visual correctness.
- Read-only compare of approved baseline `1a76108c7415ade3bab07461ac27af16ce2fa8f8` with PR #68 head `47a634429783326cca9128770386046a3009a6fb` shows only workflow `.github/workflows/live-category-tree-check.yml` and `category.html` changed (3 commits ahead).
- Source inspection confirms `category.html` renders generated inline SVG/emoji category illustrations via `artFor(label)`, not real category/product photography, and uses a separate light-theme styling override that visually diverges from the dark metallic/red-blue storefront. This explains the wrong category-card visuals/style. Exact product-list image failure is not yet diagnosed because live browser/network verification remains blocked.
- Master handover record appended in commit `5769821cca990c3c0e8ef40a56410eb032f619a0`.
- Next: inspect actual product-list image URL construction and asset paths; then make a narrowly scoped fix on the isolated PR #68 branch and validate real image requests and visual parity before any controlled preview deployment. Keep PR draft/unmerged; no deployment/credit spend or production/data changes without authorization. Customer launch HOLD; supplier reconciliation PAUSED.


## 2026-10-20 — Owner direction: close PR #68; continue from PR #70 baseline
- PR #68 was closed (not merged) at owner direction. Verified state: closed, merged=false. No branch deletion and no deployment were performed.
- PR #70 is already merged into `recovery/approved-preview-index-new`; approved layout/content commit `f19e60c03b1aa6273989199cc24bec6c30842a4d`, merge commit `39d4c77096e1460e131ebfaeff8672aaedcb93e7`.
- Continue all storefront design/visual work from PR #70's approved baseline, not PR #68. Existing review URL: `https://ebe5ddb2.get-wired-autoworx-store.pages.dev/store`; branch alias: `https://design-brighter-brand-catego.get-wired-autoworx-store.pages.dev/store`.
- Required next work: inspect/fix real image URL loading and image relevance; verify actual browser requests and visual parity at desktop/mobile. Existing mocked responsive tests are not enough. Use the current preview first; do not redeploy unless a fix is ready for final verification and deployment is explicitly safe. Keep production/launch on HOLD; no Axxess/DNS, production Supabase/catalogue/stock, payment, or APK changes.


## Latest checkpoint — 2026-10-20, continuation run 26
- PR #68 remains retired/closed, not to be reopened. Work continued from the PR #70 approved recovery baseline.
- Concrete source regressions found: root `category-navigation.js` forcibly replaced category photo sources with generated SVG/emoji illustrations; `category.html` applied a light-theme override. Isolated fix is in draft PR #71: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/71.
- Source-level only; real image requests/relevance and desktop/mobile screenshot parity are NOT VERIFIED because a network-enabled browser is unavailable. Do not treat PR or deployment metadata as visual acceptance.
- Product listings still use local exact-SKU WebP images (1,000 assets listed) and hide failed images into a neutral placeholder; database `image_url` is not used in `products.html`. Avoid unverified image substitutions.
- No merge/deployment retry, production/Supabase/catalogue/stock, Axxess/DNS/payment, or APK changes. Launch HOLD; supplier reconciliation PAUSED. Next: check PR #71 existing CI/Pages metadata without retries, then perform real-browser image/visual tests before further image changes.
