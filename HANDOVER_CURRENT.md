# GET WIRED AUTOWORX — CURRENT EXECUTION HANDOVER

**Updated:** 2026-11-08 19:44 SAST  
**Authority:** `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md`, the owner's newest direct instructions, and verified repository/workflow evidence.  
**Purpose:** This is the concise current operating handover. Older execution logs previously accumulated in this file remain recoverable from Git history at the commit immediately before this update (`f51ee4bd547d733605e3197bfef73381d96633ae`). Historical entries are not current instructions unless reaffirmed below or by the owner.

## 1. Owner operating standard — 90/10 reliability

Build procedures to correctly handle at least 90% of foreseeable normal work and failure scenarios, then detect, contain and repair the remainder. Do not use "unforeseen events" as an excuse for weak preparation.

Every workstream must have:
- A unique task ID, accountable worker, defined inputs, dependencies, scope and acceptance criteria.
- A preflight check for current owner instructions, permission, source validity, security boundary and existing work.
- Bounded, idempotent work batches; no duplicate concurrent edits to the same output.
- Persistent checkpoints containing task/run ID, source and output references, counts, exceptions and exact commit SHA.
- Independent validation; a worker cannot approve its own output.
- A recoverable failure path that resumes from the last verified checkpoint, with bounded retries only for safe deterministic infrastructure/QA failures.
- An exception record for unresolved identity, image, specification, supplier or owner decisions.
- A current handover update after material work.

Report only evidence-backed states: implemented, workflow-tested, exact-head tested, hosted-preview verified, owner accepted, or production released. These are distinct states.

## 2. Non-negotiable project and release rules

- One consolidated customer storefront and one validated product-data layer; no competing catalogues or disconnected storefront branches.
- Three homepage departments only:
  1. Auto Electrical Spares
  2. Car Audio / Home Entertainment
  3. Car Care & Accessories
- Customer pages must not expose supplier names, confidential supplier metadata or internal supplier SKUs.
- Catalogue-first source scope. No ASC Buyers Guides unless explicitly reauthorised.
- Exact product/model/variant identity and exact image matching are required. Ambiguity is quarantined; never guess, substitute a similar model or silently delete a record.
- All catalogue candidates remain review-only / DO NOT IMPORT until independently verified and owner-approved.
- **Current price display instruction (2026-11-08):** use Price On Request while supplier pricing and stock are awaiting reliable direct updates. Keep historical/source prices private and distinguish them from current verified supplier prices and customer display status. This newest owner instruction supersedes older handover text that proposed displaying RRP-derived prices.
- ASC's approved wording remains: **Price On Request due to Limited Stock and Availability.**
- No production merge/deployment, Axxess upload, DNS change, payment activation, live Supabase write, live catalogue/price/stock/active-flag change or paid hosting/automation spend without the owner's explicit approval.
- Production remains HOLD. Exact-head tests, same-SHA hosted preview verification, owner acceptance and separate release approval are mandatory.

## 3. Security boundary — unresolved critical blocker

The storefront GitHub repository `getwiredautoworx-max/get-wired-autoworx-store` was verified **public** on 2026-11-08. Confidential supplier source files and potentially sensitive derived material are present in the repository. This creates a public-exposure risk; owner authority to use supplier information does not authorise public disclosure.

Required architecture:
- Keep the public storefront repository only for public-safe code, sanitised customer-facing data and non-confidential QA evidence.
- Move confidential supplier originals, price lists, cost/stock data and sensitive derivative files to an owner-controlled private repository or private storage/execution environment.
- Process confidential material only inside that private boundary. Public workflows must fail closed if confidential inputs are present or referenced.
- Before any public-history sanitisation, create and verify a secure private backup and inventory all affected branches, PR refs, workflow artifacts and derived files.
- Record limits honestly: GitHub forks, clones, caches and previously downloaded copies may not be retractable.

**Approval status:** No owner approval to create/migrate to private storage, change repository visibility, rewrite public Git history, delete refs or remove PRs has been recorded. Do not perform these consequential actions without explicit approval. Until the boundary is resolved, do not process confidential Planetworld or Audio Connections material on public runners or create new public derivatives from it. Public-safe work may continue.

## 4. Implementable workflow — one operating pipeline

All agents and workers (including Jules) must use the same queue and release process:

1. **Register:** create/maintain one task record with ID, priority, owner/worker, scope, inputs, dependencies, acceptance criteria and next action.
2. **Preflight:** read current directives and handover; verify permissions, source scope, data sensitivity, existing task/PR/workflow and output ownership.
3. **Claim:** acquire a task lease/concurrency lock; do not start if another worker owns the same output.
4. **Checkpoint:** record baseline commit, source revision, completed-item cursor and recovery point.
5. **Execute:** work in bounded batches and write only to an isolated review branch or review-only output.
6. **Validate:** run schema, identity, variant, image, description, category, price-state, duplicate and supplier-data exposure checks. Quarantine exceptions.
7. **Test:** run the relevant automated tests; then test affected routes and responsive mobile/desktop layouts.
8. **Integrate:** selectively integrate verified changes into one current-main-based candidate. Never wholesale-merge stale/divergent branches.
9. **Preview:** deploy only an authorised, cost-free staging preview; verify deployed SHA equals tested SHA and run hosted browser checks.
10. **Record/recover:** update task status, evidence, counts, exceptions, checkpoint and handover. On failure, diagnose before retrying; resume from last verified checkpoint.

Task states: `blocked`, `ready`, `claimed`, `in_progress`, `validation_failed`, `review_required`, `complete_verified`, `owner_accepted`. A task is not complete merely because a worker or workflow exits successfully.

## 5. Existing automation — verified state and gaps

### Existing components on main
- `automation/task-queue.json` (schema version 2; eight workstreams).
- `automation/24x7-worker-operating-contract.md`.
- `.github/workflows/background-task-controller.yml` — 15-minute scheduled/event-driven controller.
- `.github/workflows/store-24x7-catalogue-worker.yml` — public-safe ASC extraction worker, four-hour schedule, 30-minute limit, serial concurrency group.
- `.github/workflows/store-task-monitor.yml` — daily/on-demand read-only monitor.
- `scripts/background_task_controller.py` and `scripts/validate_automation_queue.py`.

### Evidence checked on 2026-11-08
- Background controller run **42500323085** passed on PR #187 head `873054fa31a89acb10bed72b8ec3e56feb70319a`; this is PR validation, not proof that the fix is on main.
- Main controller run **42497778254** failed at main SHA `f51ee4bd547d733605e3197bfef73381d96633ae`: `KeyError: 'description'` while rendering queue task summaries. The current queue uses `success_criteria` and `next_action`, not a mandatory `description` field.
- Main scheduled controller run **42493918272** passed before the later workflow_run failure. Therefore the controller has both successful and failed evidence; do not call it fully reliable yet.
- Public-safe ASC worker run **42500731670** passed in PR validation on PR #183 head `a1e0b2a201533caabb0ba6e0eb2827051007c6db`. This proves the worker/queue checks passed for that PR execution; it does not prove the six catalogues are fully reviewed, imported or customer-ready.
- The operating contract currently says the worker is a draft on `automation/24x7-store-workers-2026-11-08` awaiting approval, while the workflow and contract files are already present on main and the worker is configured with a schedule. Correct this documentation/configuration mismatch and verify actual default-branch scheduled runs before claiming the worker is active 24/7.
- Controller cleanup logic contains a retention inconsistency: the stale build cutoff is 24 hours while the log text says 7 days. Correct retention deliberately; preserve a known-good release package and a previous recovery candidate. Do not delete evidence needed for audit or rollback.
- Controller PR #187 and PR #188 overlap. Consolidate into one fix after reviewing their exact diffs and tests. Do not merge both or duplicate controller implementations.
- A successful workflow is not evidence of persistent, around-the-clock execution. GitHub Actions is scheduled/event-driven, not a permanently running process. Prove cadence, missed-run detection, checkpoint durability, lease expiry, watchdog recovery and bounded retry before advertising 24/7 reliability.

### Automation implementation order
1. Reconcile PR #187/#188 into one controller fix; fix queue rendering against the actual schema and add regression tests for missing optional fields.
2. Correct retention rules and preserve rollback/evidence artifacts.
3. Reconcile the task-queue schema and validator; add explicit task state, lease/heartbeat, checkpoint, retry count, last error, output references and timestamps without breaking existing tasks.
4. Make checkpoint state durable and recoverable; ensure event-driven and scheduled reconciliation are idempotent.
5. Align the operating contract with actual workflow triggers and default-branch state.
6. Prove normal completion, worker interruption, expired lease, duplicate dispatch, API outage, invalid queue, failed QA and recovery from checkpoint in test runs.
7. Only then expand to additional public-safe workers. Confidential supplier work remains private-boundary-only.

## 6. Workstream order and acceptance criteria

1. **Security containment:** obtain owner decision on private supplier-data boundary; no confidential public-runner processing while unresolved.
2. **Controller:** resolve #187/#188 overlap; fix schema mismatch; exact-head tests and failure/recovery tests pass.
3. **ASC six catalogues:** verify all six catalogue families, source/page provenance, identity, image, category and review registers. Repair PR #183's missing-test dependency without weakening tests or discarding valid data. ASC Car Mats belong under Car Care & Accessories; ASC Aerials under Car Audio & Video → Accessories → ASC Aerials.
4. **Electro-city ignition pilot:** source pilot is ignition looms & modules PDF, not converters. Verify all 29 pilot records and OEM fitment evidence. Keep internal supplier SKUs private. Keep GWA-EC-000012 / IG-T003 quarantined pending supplier clarification.
5. **Audio/video:** continue bounded exact-model product description/image work and brand → product-type → product navigation. Current owner direction allows autonomous audio/video enrichment; preserve verified progress and do not reuse stale OneNav counts without a fresh audit. Confidential source processing must remain private-boundary-only.
6. **Car Care & Accessories:** build the third department and its approved subcategories, including Car Mats, using verified catalogue material.
7. **Consolidated storefront:** selectively reconcile the current candidate using main as base and preserve the owner-preferred visual baseline from PR #168 where appropriate. PR #178 is not safe to merge wholesale; its branch diverges significantly from main. Avoid parallel competing storefront candidates.
8. **Preview:** exact-head automated QA, immutable deployment-SHA confirmation, mobile-first hosted browser checks, desktop checks, no JS errors/overflow, and one consolidated owner preview. No preview-ready claim from an older SHA.

## 7. Current PR snapshot — last verified 2026-11-08

| PR | Purpose | Last verified head | Current handling |
|---|---|---|---|
| #187 | Background controller repair | `873054fa31a89acb10bed72b8ec3e56feb70319a` | Tests passed on PR; review and reconcile |
| #188 | Second controller repair | `c74c100f88f4c260a40fb787105479cc0eea3440` | Overlaps #187; consolidate, do not duplicate |
| #183 | ASC six-catalogue reload | `a1e0b2a201533caabb0ba6e0eb2827051007c6db` | Review missing-test dependency and catalogue accuracy |
| #185 | Electro-city ignition pilot | `30fe3a92d0ce865d87b9369b02c42aaa7afab417` | Verify 29 records and fitment exceptions |
| #178 | Audio/storefront candidate | `c5c4989f01e018bb9040b14feaa0ccbec71c3ff4` | Draft; do not wholesale merge; selectively reconcile |
| #168 | Owner-preferred storefront baseline | `9f01966dbefc98321c5b9a3c76f31cdc8de15755` | Use as visual reference where still applicable; verify current content |

These are a snapshot, not a substitute for refreshing PR heads and workflow results before the next action. No PR is approved to merge by this handover.

## 8. Pricing, catalogue and customer presentation rules

- ASC: exact approved Price On Request wording; do not invent prices or stock.
- Current general owner instruction: all supplier products use Price On Request until current supplier pricing and stock can be updated reliably. Preserve source RRP/dealer data privately for later approved synchronisation; never display stale prices as current.
- Keep supplier names, supplier-only codes, dealer cost, source workbooks and internal audit metadata out of customer-facing output.
- Catalogue product grouping should be by product/category, not by supplier folders. Supplier folders remain internal source-tracking structures.
- Audio Connections: retain verified manufacturer/supplier specifications and distinguish unresolved discrepancies. Prefer the higher output only where the owner has explicitly directed that rule and the source comparison is clear; do not invent RMS, colour or variant.
- Electro-city: top image number is OEM part number; lower number is internal supplier SKU. Research fitment using OEM part number; do not expose supplier SKU.
- ASC images may be edited under the owner's authorisation: test the approved 50-sample image workflow first, remove catalogue-description text overlaid on product images, and apply the Get Wired AutoWorx watermark as directed. Do not change unrelated category content during a scoped image task.

## 9. Next execution actions

1. Review the exact diffs and latest checks for PR #187 and #188; choose one controller implementation and close the other only after its useful changes/tests are reconciled.
2. Correct the controller's queue-schema rendering failure and add a regression test that would have caught `KeyError: 'description'`.
3. Fix the artifact retention inconsistency and verify rollback/evidence retention.
4. Update the automation operating contract to accurately describe which workflows are on main, which are draft, and which schedules have actually run.
5. Add persistent task lease/checkpoint/recovery evidence and prove the failure scenarios listed above.
6. Reconcile the queue's stale statuses and current Price On Request rule; do not let the old OneNav or supplier RRP assumptions silently drive work.
7. Continue safe ASC and Electro-city evidence validation; continue audio/storefront work only within the confidentiality boundary.
8. Prepare one integrated storefront candidate and a single exact-SHA preview after the above dependencies are satisfied.

## 10. Explicitly not done in this update

- No code or workflow files changed.
- No PR merged, closed, or force-pushed.
- No repository visibility change, private repository/storage creation, history rewrite or sensitive-ref deletion.
- No confidential supplier files processed or copied.
- No production deployment, Axxess upload, DNS/payment change, live Supabase write, live catalogue/price/stock change or paid service/credit use.
- This handover update records verified evidence and the implementation path; it does not claim the workflow has already been fully implemented or proven 90% reliable.


---

## AUTOMATION RECOVERY AUDIT — 2026-11-09 05:26 SAST

### Background Task Controller — confirmed main-branch failure
- Current main head observed in GitHub Actions: `5e748e09343f7879c66124778d42ee202caf1e00`.
- Scheduled controller run `42535626925` (2026-11-08 23:32 UTC) and run `42553921263` (2026-11-09 02:59 UTC) both failed in step **Build task checkpoint from queue and recent workflow results**.
- Exact traceback: `scripts/background_task_controller.py:189`, `KeyError: 'description'`. Queue schema v2 supplies `success_criteria` and `next_action`; the main controller still dereferences the removed legacy `description` field. Syntax validation passes; controller execution fails.

### Controller repair candidates
- PR #187: OPEN, UNMERGED, current head `873054fa31a89acb10bed72b8ec3e56feb70319a`, current compare against main is 6 commits ahead / 1 behind, status diverged, GitHub reports mergeable=false. Exact-head controller run `42500323085` and catalogue QA run `42500323139` both passed. Catalogue QA explicitly skipped optional ASC staged-data, ASC owner-preview, audio catalogue and hosted browser suites because those files were absent on that isolated PR branch; skipped suites are not passes. PR #187 contains the queue-schema fix plus optional-suite guards. No merge or deployment performed.
- PR #188: OPEN / DRAFT / UNMERGED, head `c74c100f88f4c260a40fb787105479cc0eea3440`, one-file queue-schema fix, GitHub reports mergeable=true, but no workflow runs were returned for its head. It duplicates the controller fix without the additional QA guards from PR #187. No merge performed.
- Do not merge either PR automatically. Reconcile one tested repair against current main, preserve the single-fix approach, obtain owner approval before merge, then verify a new scheduled main controller run.

### Public-safe ASC extraction worker
- Scheduled worker run `42520746794` (2026-11-08 20:33 UTC) completed SUCCESS on main SHA `5e748e09343f7879c66124778d42ee202caf1e00`. All workflow steps, including task-queue validation and bounded ASC extraction, passed.
- The worker log reports **no source extraction changes; no checkpoint commit required**. Existing checkpoint branch `automation/catalogue-extraction-checkpoints` contains review-only text for the six approved ASC catalogues: 72/72 source pages have text/OCR extraction (Aerials 7, Sensors 9, Switches 22, Globes 11, Car Mats 11, Fuel Pumps 12). This is extraction evidence only, not product identity, fitment, image, specification or listing approval.
- No later scheduled worker run was present in the latest 100 workflow runs inspected at 05:26 SAST; the 2026-11-09 00:23 UTC slot was not observed. Check the next expected 04:23 UTC slot (06:23 SAST) before claiming the four-hour schedule is reliable.
- The controller's failures do not themselves invalidate the independent ASC worker run. No ASC data was imported or published.

### Audio/storefront automation reconciliation
- PR #178 was re-read from GitHub: OPEN / DRAFT / UNMERGED, head `c5c4989f01e018bb9040b14feaa0ccbec71c3ff4`, mergeable=false. This differs from the older automation checkpoint `578f5402a417b00d2502d95fd4a4632b9561ff40`; the older SHA must not be treated as current. No current preview for the latest head is verified.
- The scheduled automation previously titled “Continue Get Wired AutoWorx catalogue work” has been changed to a coordination/recovery monitor so it does not duplicate product edits. “Advance Get Wired audio and video catalogue” remains the sole audio catalogue editing worker. Both saved prompts now enforce the public-repository confidentiality boundary and the live-PR/head verification gate. Both updates were confirmed successful.
- The immediate run request for the previously failed catalogue automation was accepted as inline work, but the automation dashboard still records the prior scheduled attempt as failed; no successful new run record is yet present. Do not report the scheduled automation as recovered until a later run is recorded successful.
- Critical security boundary remains active: do not process confidential supplier originals, price lists, costs, stock, workbooks, internal supplier SKUs or sensitive derivatives on the public repository/runner. Planetworld and Audio Connections processing requires an owner-controlled private execution boundary. No deployment, Cloudflare/Netlify credit use, merge, live data change or production action was performed.

### Next actions
1. Reconcile PR #187's tested controller fix against the current main handover-only commit; resolve the branch conflict/mergeability and re-run exact-head checks without triggering paid preview deployments. Obtain owner approval before any merge.
2. Verify the next scheduled ASC worker run and inspect its summary/checkpoint, distinguishing no-change success from new extraction progress.
3. Keep the two audio automations separated (monitor vs sole editor), verify their next recorded runs, and keep PR #178 unchanged until its live head/base/mergeability and private-data boundaries are resolved.
4. Keep production HOLD; no Axxess, DNS, live database, live catalogue, price/stock, payment or publication changes.


---

## EXECUTION CONTINUATION — 2026-11-09 05:36 SAST

### Background Task Controller — repaired and exact main-run verified
- Main commits: `04e56042fb982ec43e5c31d627ace03ab81ed201` updates `scripts/background_task_controller.py` to render schema-v2 tasks using `success_criteria` when legacy `description` is absent, with safe defaults for optional display fields; `ad0c9dc43a4685b6285795c0d7fc5017bd0d2548` adds push validation triggers for controller code and task-queue changes.
- Exact-main workflow run [42557051967](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42557051967), head `ad0c9dc43a4685b6285795c0d7fc5017bd0d2548`, completed **SUCCESS**. Confirmed steps: Python syntax validation, controller/task-queue checkpoint generation, artifact cleanup. Artifact upload was skipped by the existing quota/configuration guard. This resolves the reproduced `KeyError: 'description'` failure for this code path; continue monitoring scheduled runs for recurrence.
- The repair was applied directly to main; no PR was merged. PR #187 and #188 remain open and are now redundant/stale candidates. Do not merge either; do not close them without owner direction. PR #187 still contains optional QA-suite guards that were not included in the minimal main repair.
- The controller is scheduled every 15 minutes, but scheduled reliability is not yet proven by a sustained sequence of successful runs. A single successful push-triggered run is not 24/7 reliability proof.

### Jules PR reconciliation — exact evidence
- PR #183 (ASC six-catalogue reload): head `a1e0b2a201533caabb0ba6e0eb2827051007c6db`; current compare to main `ad0c9dc43a4685b6285795c0d7fc5017bd0d2548` is 18 ahead / 10 behind, diverged. Public-safe catalogue worker run [42500731670](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42500731670) passed but made no new extraction commit. Catalogue QA run [42500731634](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42500731634) failed in the ASC review-data check because `tests/auto-electrical-review-population.test.cjs` is absent on that PR branch. Core supplier routing/static tests, Deno type-check and responsive checks passed; preview build/audio/owner-preview suites were skipped. The PR advertises 978 catalogue rows (979 CSV lines including header), but all records remain review-only / DO NOT IMPORT; no merge or import.
- PR #185 (Electrocity ignition pilot): head `30fe3a92d0ce865d87b9369b02c42aaa7afab417`; current compare is 6 ahead / 10 behind, diverged. Public SKU Exposure Audit run [42470895672](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42470895672) passed; this is not full catalogue/fitment QA. No import or merge.
- Confidentiality stop: PR #185 contains supplier-derived review artefacts in this public repository. The owner's rule is that Electrocity's internal supplier SKU must not be customer-facing; more broadly, confidential supplier originals, internal SKUs and sensitive derivatives must not be processed or exposed through public repository/runners. Do not inspect, copy, process, publish, merge or further enrich those supplier-derived files until an owner-controlled private execution boundary or explicit redaction/containment plan is approved. Do not change repository visibility or rewrite history without owner approval.
- PR #178 remains OPEN / DRAFT / UNMERGED, head `c5c4989f01e018bb9040b14feaa0ccbec71c3ff4`; current compare is 1,001 ahead / 36 behind, diverged; mergeable=false. No current exact-head preview exists. Do not rebase, merge, deploy or claim preview readiness.

### ASC worker schedule
- Latest confirmed scheduled main-branch ASC worker remains run [42520746794](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42520746794), SUCCESS, with no changed extraction outputs. No later scheduled ASC worker run is visible in the latest 100 main-branch Actions runs inspected at 05:36 SAST.
- Worker cron is `23 */4 * * *`; next expected slot after this audit is 06:23 SAST. Verify the actual run and outputs before claiming schedule reliability or new catalogue progress.

### Current automation execution state
- The controller now has a verified successful main run, but this does not establish continuous operation. The ChatGPT automation records still show the last scheduled audio editing run completed on 2026-11-08 with OneNav-only review changes, while the coordination monitor's last recorded scheduled run is failed; the updated monitor prompt has not yet produced a new recorded successful run. The ASC daily monitor has no recorded run yet. Next-run timestamps are null in the automation dashboard.
- Continue one audio editor only, with separate monitoring; however, PR #178's divergence and the public supplier-data boundary currently block further edits to its branch. No Cloudflare/Netlify credits, deployment, Axxess, DNS, live database, live price/stock, checkout/payment or production changes.
- Production remains HOLD. All supplier-derived candidate data remains review-only / DO NOT IMPORT. Do not process ASC Buyers Guides.

### Next actions
1. Observe the next 06:23 SAST ASC worker slot; confirm run ID, conclusion and whether any outputs actually changed.
2. Keep monitoring the 15-minute controller schedule and confirm at least several consecutive scheduled successes, not just the push-triggered repair run.
3. Resolve the public-repository confidentiality boundary before further Electrocity, Planetworld or Audio Connections processing.
4. Have Jules address the missing optional-test guard on PR #183 only if this can be done without processing confidential material; then re-run exact-head checks. Do not wholesale rebase or merge the 18-commit branch.
5. Keep PR #178 unchanged until a single current-main-based integration plan and private data boundary are established.
6. Preserve production HOLD and all no-deploy/no-live-write restrictions.


---

## OWNER CLARIFICATION — RETAIL CATALOGUE PROCESSING AND PUBLIC REPOSITORY — 2026-11-09

The owner has clarified the business model and corrected the previous blanket confidentiality restriction:
- Get Wired AutoWorx is a **retailer to the general public**. Supplier catalogues are source material for product identity, descriptions, images and specifications. Their wholesale value is limited because wholesale pricing requires a separate qualifying dealer relationship with the supplier.
- Keep the main GitHub repository public. Do not require a private repository, private runner or separate private execution environment as a prerequisite for authorised catalogue extraction, review, enrichment or storefront work. Do not pause catalogue work on that basis.
- Continue catalogue processing in the existing repository and approved workflows. Avoid unnecessary infrastructure or hosting changes.
- Keep supplier names and internal supplier SKUs out of customer-facing pages. Do not expose dealer-only wholesale costs as retail prices. Follow the owner's Price On Request and supplier-specific pricing rules; never invent prices or stock.
- Normal protection of credentials, tokens and genuinely sensitive personal/security data remains required. This is not a reason to block catalogue source processing.
- Production remains HOLD. No production deployment, Axxess upload, DNS change, live Supabase/catalogue/price/stock write, payment activation or publication without the required explicit owner approval. A staging preview still requires exact-head build/tests, deployed-SHA confirmation and mobile/desktop browser verification.

### Corrected execution priority
1. Resume the approved ASC catalogue workflow and complete product-level verification; the existing 72-page OCR checkpoint is extraction progress, not completion.
2. Reconcile Jules' ASC and Electro-city deliverables against current main and fix their QA/test dependencies without discarding valid catalogue work.
3. Resume audio/video product and image enrichment using the approved catalogue sources; keep supplier identity and internal SKU fields out of customer views.
4. Build one consolidated three-category storefront candidate from current main; do not wholesale merge the stale, highly divergent PR #178.
5. Run exact-head regression and mobile/desktop preview QA, then request explicit approval for the staging deployment if it requires Cloudflare credits. Do not use production deployment.

This owner clarification supersedes the earlier blanket private-data-boundary statements in this handover and any automation prompts. Those statements must not be used to stop authorised catalogue work.


## OWNER PRICE-DISPLAY OVERRIDE — 2026-11-09
The owner's latest instruction supersedes older RRP display rules: all supplier products must show **Price On Request** until current supplier prices and stock can be synchronised reliably and the owner approves that process. Do not display stale catalogue RRPs, dealer prices or calculated selling prices as current retail prices. Preserve source price evidence internally for future reconciliation. ASC must use the exact customer-facing wording **Price On Request due to Limited Stock and Availability**; other suppliers use generic **Price On Request** unless directed otherwise. Do not invent stock or orderability.


## AUDIO WORK SESSION START — 2026-11-09 09:19 SAST

- Authoritative owner directives were read first from `main` (`AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md`, blob `7335e2c4ef60a7e4305fb42424b3342500b93700)); current `main` handover was then read (`HANDOVER_CURRENT.md`, blob `6d69164f6e173a8be17506c1c5282f4832daacca)).
- Live main head is `f947d33d6a102129307f4e74833798525974c4c3`. PR #190 branch `integration/storefront-current-main-2026-11-09` is exactly at `e6ddad26488710d3ce54efae50ab3ed9b7f6ab40`; comparison against current main is **24 ahead / 3 behind**, merge base `8a1119e44b6586934e32265e0bd7729263f6ea95`. It is therefore no longer 1 ahead / 0 behind. PR #190 remains the sole coordinated integration candidate and is not being modified in this session.
- PR #190 exact-head GitHub Actions run set on `e6ddad26488710d3ce54efae50ab3ed9b7f6ab40` returned 11/11 successful PR workflow runs (IDs 42567300754, 42567300792, 42567300834, 42567300845, 42567300848, 42567300874, 42567300878, 42567300892, 42567300907, 42567300931, 42567301056). These include non-deploying package QA and mobile/desktop browser QA; they do not resolve the separate Cloudflare Pages Git-integration bot's reported automatic PR build failure.
- PR #190 description also claims a successful Pages deployment on the same SHA, while the latest owner-provided run context reports a Cloudflare PR build failure and no verified exact-SHA preview. These signals conflict and the Cloudflare dashboard build log/credit implication is not available through the current GitHub connector. Treat hosted preview status as **UNVERIFIED / NOT READY**. No deployment, workflow dispatch, credit use or further commit to PR #190 is permitted until that conflict is understood.
- To continue safe catalogue/QA work without changing PR #190, created a non-PR work branch `work/audio-one-nav-enrichment-2026-11-09` from the exact PR #190 head. This is a temporary work branch only, not a competing integration candidate or pull request. It will hold one bounded OneNav review/test increment for later selective reconciliation; no Cloudflare PR build should be triggered because no PR is opened.
- Workstream remains OneNav only. Next action: reconcile the OneNav audit rows and product page behaviour, focusing on exact image and route integrity; keep all candidate records review-only / DO NOT IMPORT. Do not touch ASC work or production.
