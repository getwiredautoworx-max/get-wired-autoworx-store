# Get Wired AutoWorx — 24/7 Execution Operating Contract

**Canonical status (2026-11-08):** The controller and public-safe ASC worker workflow files are present on `main`. The controller is configured for a 15-minute schedule plus workflow events; the ASC worker is configured for a four-hour schedule plus manual dispatch and PR validation. A configured schedule is not proof of uninterrupted execution or successful processing. Verify the actual default-branch scheduled run ID, SHA, conclusion and checkpoint before claiming recurring execution is operating. This replaces the stale statement that the worker exists only on a draft branch.

## Operating model

`automation/task-queue.json` is the single task register. A queue flag alone never starts work: automatic tasks must have a named workflow that implements them. GitHub Actions is scheduled/event-driven, not a permanently running process.

## Workflow configuration on main

- **Background Task Controller:** `.github/workflows/background-task-controller.yml`; every 15 minutes plus manual dispatch and workflow completion events. It checks selected workflows and may request one bounded retry only for its explicit non-production QA/audit/packaging allowlist. It must not retry production, deploy or data-write workflows.
- **Public-safe ASC catalogue worker:** `.github/workflows/store-24x7-catalogue-worker.yml`; every four hours UTC plus manual dispatch and PR validation. It is limited to the six approved ASC catalogue PDFs, OCR/page provenance and review-only outputs. Checkpoint writes go only to `automation/catalogue-extraction-checkpoints`.
- **Read-only task monitor:** `.github/workflows/store-task-monitor.yml`; daily/manual configuration. It inventories runs and expected evidence; it does not process catalogue tasks or restart/deploy workflows.

For every scheduled worker, record run ID, event, branch, SHA, conclusion, checkpoint and output counts. PR validation is not scheduled execution. A successful OCR run does not approve identity, fitment, images or product content.

## ASC controls

- Source inventory must match exactly the six owner-approved ASC catalogue PDFs; fail closed on any missing/extra source.
- Preserve originals and page/source provenance. OCR is extraction evidence only.
- Keep every output review-only / `DO NOT IMPORT` until independent QA and owner approval.
- No ASC Buyers Guides unless explicitly reauthorised.
- Exact customer label: `Price On Request due to Limited Stock and Availability`.
- ASC image editing follows the owner's 50-sample-first approval and scoped-category boundaries.

## Confidential supplier-data boundary

The repository is public. Audio Connections and Planetworld source material may contain confidential dealer pricing, costs, stock and supplier metadata. Owner authority to use this data is not authority to disclose it publicly. Do not process these sources or create derivatives on public runners, in public logs/artifacts, or on public branches/commits. A private owner-controlled processing boundary must be established and verified first. This does not authorise repository visibility changes, private-repository creation, history rewriting or ref deletion without separate owner approval.

## Customer price and content rules

- Current owner instruction (2026-11-08): **Price On Request for all supplier products** until current supplier pricing and stock can be updated reliably. Do not display historical RRP/dealer values as current customer prices.
- Keep historical/source price, current verified supplier price, stock validity and customer display state separate in private review data.
- Never expose supplier names, supplier-only SKUs, dealer cost, confidential source workbooks or internal audit metadata to customers.
- Group products by product/category, not supplier folder. Supplier folders remain internal source tracking.
- Require exact model/variant and image identity. Quarantine ambiguity; never substitute a similar product or silently delete a record.
- All staged candidates remain `DO NOT IMPORT` until independent verification and owner approval.

## Other workstreams

- **Electro-city:** ignition looms & modules PDF is the pilot; 29-record sample. Top image number is OEM part number; lower number is private supplier SKU. Research fitment by OEM number and never expose supplier SKU. Keep GWA-EC-000012 / IG-T003 quarantined pending supplier clarification. Do not switch to the converters PDF.
- **Audio/video:** public-safe navigation/presentation can continue. Hold supplier-source and derivative catalogue processing until the private-data boundary is verified. Preserve brand → product type → products order and exact image matching.
- **Storefront:** one consolidated current-main-based candidate. PR #168 is a visual reference; PR #178 is not a wholesale merge candidate.

## Recovery, concurrency and release

- One active worker per workstream/output; use concurrency groups and bounded idempotent batches.
- Record task/run ID, source revision, exact commit, completed cursor/counts, outputs, exceptions and next action at each checkpoint.
- Durable lease/heartbeat and stale-lease recovery are not yet proven by the current queue; do not claim full 24/7 autonomy until implemented and failure-tested.
- Investigate failures before retry. At most one retry for deterministic, explicitly allowlisted non-production QA/audit/packaging failures. Never blind-retry data writes, image sync, category writes, deploys or production jobs.
- Preserve the newest two valid recovery packages and recent QA evidence; cleanup must not delete audit/rollback material prematurely.
- No live database, product, category, price, stock, payment, DNS, Axxess or production hosting changes without explicit owner approval. No PR merge or production deployment without separate approval.
- Release requires exact-head tests, same-SHA hosted staging verification, mobile/desktop checks, owner acceptance and explicit release approval.

## Proof required for reliable 24/7 operation

Demonstrate normal completion, worker interruption, expired lease, duplicate dispatch, API outage, invalid queue, failed QA, checkpoint recovery and missed-schedule detection. Measure success rate over repeated meaningful runs. A cron expression or one successful run is not proof of continuous reliable execution.
