## CURRENT CLEAN-CANDIDATE CHECKPOINT — 2026-10-31

- Active branch: `integration/clean-main-planetworld-partsearch-2026-10-31`; latest head `5ea37f54caa65852c1e794564918794714d9adc3`; compare with main: 27 ahead / 0 behind.
- Local Node execution of fetched catalogue matcher/test contents passed 13 assertions. Do not misreport this as GitHub Actions or browser acceptance.
- Eight-root source count now has a regression assertion; stale nine-root CSS comment corrected.
- Planetworld counts re-parsed: 3,317 broad rows, 37 without indicative price, zero broad-feed image/model fields; 68 curated exact-model rows, all with model/page, 11 with imageUrl in current curated JSON, 7 exact-model image sources in separate review preview.
- Continue no-credit source audit. Full browser/device acceptance and the repository Audio test remain open. No Actions, merge, deploy or live-data write.

---

> **MANDATORY FIRST ACTION FOR EVERY AGENT/SESSION:** Read the root [`AGENTS.md`](AGENTS.md), then the latest [`HANDOVER_CURRENT.md`](HANDOVER_CURRENT.md) entry, then this execution-control file. Verify the actual branch/head and resume the first unfinished task. Do not start with a fresh plan, repeat completed audits, or ask the owner to retrain the session. If this sequence is not completed, work must not proceed.

# 48-Hour Execution Control — Get Wired AutoWorx
Date: 2026-10-31 SAST
Status: Active deadline; this is an operating addendum to HANDOVER_CURRENT.md.

## Mandatory process of elimination
1. Read the latest HANDOVER_CURRENT.md entry first. Resume the highest-priority OPEN task; do not restart a completed audit unless the code/head/evidence changed.
2. Reproduce the exact failure at the current candidate commit. Record route, file, record, test and expected result.
3. List plausible causes; eliminate them one at a time with evidence. No guessing, circular re-audits, repeated blind retries, or status-only updates.
4. Make the smallest reversible fix on an isolated branch. Do not patch production, force-push, or merge the diverged PR #139.
5. Verify with the strongest available method that does not consume Actions minutes: local deterministic checks, then local browser runner if available, then one controlled hosted run after 1-Nov only after quota/runner confirmation.
6. Re-fetch the changed file and inspect the diff. Record exact commit, files, command, output and remaining issue.
7. Update HANDOVER_CURRENT.md in the same session after every material success/failure/blocker/owner decision/task switch. Include evidence, action, result, next single action, owner dependency and acceptance condition.
8. Never repeat a VERIFIED task unless its source changed, regression appeared, or prior evidence was incomplete. Never call static inspection a test pass.

## Active execution order
**P0 — Candidate integration safety.** PR #139 remains draft/diverged/non-mergeable; do not merge or force-push it. Active clean candidate branch is `integration/clean-main-planetworld-partsearch-2026-10-31`, latest verified head `5ea37f54caa65852c1e794564918794714d9adc3`, 27 ahead / 0 behind main as of 2026-10-31. Continue only on this clean branch and re-fetch its head before each write. Merge and launch remain unapproved pending exact-head Node/audio QA, desktop/mobile browser acceptance, image exceptions and SKU-level category mapping.

**P1 — Part Search.** Free deterministic matcher exists; preview request handoff is WhatsApp-only and photo attachment is manual. Inspect matcher + tests together. Execute cases for existing-store match, exact Planetworld model, broad title/brand, typo/no-match, quote-only and WhatsApp request. Fix reproduced defects.

**P1 — Planetworld product presentation.** Broad feed: 3,317 rows; curated references: 68. Thirty-seven broad rows lack indicative price and remain quote-only. Curated JSON has no imageUrl; manufacturer product-page links are not proof of product images. Produce exact exception lists; use only exact verified model/image matches; retain neutral placeholders otherwise. Never invent prices or images.

**P1 — Audio hierarchy.** Verify the main Audio entry and all nine departments through brand, component, product card and quote handoff. Source checks are not browser acceptance.

**P1 — Eight main categories/subcategories.** Eight approved root IDs exist; dated snapshot records 34/85 child branches empty and duplicate/legacy rows. Prepare SKU-level evidence mapping against authoritative buyer-guide/product evidence. No Supabase category writes, renames or reparenting without owner approval.

**P1 — Desktop/mobile acceptance.** No current-head hosted browser pass is established. Use local browser tooling if available; otherwise prepare exact test commands and correct stale workflow assumptions. On 1-Nov check Actions quota and runner before one controlled run. Acceptance: exact-head preview URL, desktop 1365/1366px, mobile 390px and 320px, interactions and results recorded.

**P2 — WhatsApp.** Verify encoded request/order details, business number and no private address/bank leakage. Distinguish link generation/opening from a message actually sent.

**Separate owner dependency — ASC.** Keep ASC separate. No fresh post-reset owner-supplied source catalogue is present in main. Do not reuse historical catalogues or generic stock files. When source arrives, hash it, stage it and run the 25-product pilot for owner review.

**Deferred — Payment/production.** Leave banking, payment activation, Axxess, DNS, production, Supabase writes, live stock/prices/catalogue and supplier activation unchanged absent explicit owner approval.

## Hard constraints
- Actions minutes exhausted through 31-Oct-2026. No Actions dispatch/retry before 1-Nov; confirm quota and runner first after reset.
- Existing stock is testing data only. Planetworld 25-Oct figures are dated snapshot data, not live stock/pricing.
- Do not invent SKUs, models, images, prices, category assignments, test results or preview URLs.
- Notifications are not completion. Report only after material action or when a genuine owner-supplied dependency prevents safe progress.

## Required closeout record
Task/priority | candidate branch + SHA | reproduced failure/evidence | cause eliminated | changed files | verification + exact result | state (OPEN/BLOCKED-OWNER/VERIFIED) | next single action | do-not-repeat note.

The 48-hour target is a deadline for focused execution, not permission to bypass safety gates or claim readiness without evidence. Continue through the queue; do not reset the clock by writing another plan.


## Execution checkpoint — candidate divergence eliminated by comparison — 2026-10-31 SAST

- Compared PR #139 candidate checkpoint f21afa51ca58b08db102f130bec705a1c5edf247 against current main e35d3bb9b6080c79090f925c85bd9155f29b987c: candidate is 61 commits ahead / 17 behind, status diverged; merge base dbe69f61bf468af313c3f3b749a73dc42992126b.
- Then compared merge base to current main. All 17 main-only commits touch documentation/handover files only: AI_HANDOVER_PERMANENT.md, HANDOVER_CURRENT.md and three dated handover/checkpoint documents, including this execution-control addendum. No storefront source, workflow, catalogue or asset file is changed on main relative to the merge base.
- This eliminates the hypothesis that main has 17 new storefront-code changes that need porting into the candidate. The divergence is documentation-only on the main side. The candidate side still contains code/workflow/catalogue changes listed in the candidate-vs-main comparison and needs review before integration.
- Safe next action: obtain exact current PR head + tree and current main tree; construct a fresh branch from current main and port candidate code/config/assets selectively while retaining current main's handover files. Do not merge PR #139 or copy its stale HANDOVER_CURRENT.md over main. No force-push, merge, Actions run or production change performed.
