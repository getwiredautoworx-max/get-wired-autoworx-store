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
