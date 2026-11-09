# 24/7 Store Execution — Operating Contract

**Status:** Draft implementation on `automation/24x7-store-workers-2026-11-08`. This is not active on the default branch until the owner reviews and approves the automation PR.

## Operating model

The store uses one owner-directed task queue at `automation/task-queue.json`. Every task declares its priority, status, execution mode, source evidence, success criteria and next action. Scheduled jobs may only execute tasks explicitly marked automatic and supported by a named, bounded worker.

The GitHub runner is event-driven, not a permanently running process. The first public-safe worker is scheduled every four hours and can also be run manually. The existing background controller continues its 15-minute monitoring cycle.

## Worker 1: public-safe ASC catalogue extraction

The first worker:
- Checks that the ASC source folder contains exactly the six owner-approved catalogue PDFs.
- Fails closed if any extra or missing PDF is found; it will not accidentally process an unapproved document.
- Runs the existing OCR/text extraction script and retains page/source provenance.
- Produces review-only evidence. OCR is not editorial verification and does not approve fitment, specs, images or product listings.
- Commits changed extraction evidence only to `automation/catalogue-extraction-checkpoints`, never to the production site or live catalogue.
- Runs queue validation on each scheduled/manual/PR execution.

The workflow runs every four hours (UTC cron `23 */4 * * *`). Its execution summary is recorded in the GitHub Actions run summary.

## Confidential supplier-data boundary

The repository is public. Audio Connections price lists and Planetworld workbooks can contain confidential dealer pricing, cost, stock or supplier metadata. They must not be processed into public logs, public artifacts, public branches or public commits merely because the owner authorised their use for this project.

Accordingly, the queue explicitly disables Audio Connections / Planetworld automated extraction on the public runner. That work requires an owner-controlled private GitHub repository or another private execution environment with access controls and secret handling. No private repository or private storage is created by this change.

## Tasks that still need model/editorial work

OCR and deterministic scripts cannot safely complete:
- Exact product identity and model/variant resolution.
- Product descriptions beyond what the source proves.
- Exact image matching, watermark editing and visual approval.
- Vehicle-fitment confirmation.
- Supplier clarification for the quarantined Electrocity row.
- Consolidated storefront coding and customer-journey review.

These remain review-required tasks in the queue. They must be processed in small batches and saved as review-only candidates. If an AI provider is later connected, its use must be explicitly configured, cost-bounded and restricted to source-grounded candidate drafts; it must not approve or publish its own output.

## Recovery, concurrency and release

- One worker concurrency group prevents overlapping runs of this pipeline.
- Source inventory mismatch, extraction failure or missing evidence fails the run rather than guessing.
- Generated review outputs are idempotent; unchanged output does not create a new commit.
- A failed run is investigated before any retry; no blind retries of data writes or deployments.
- All candidate records remain `DO NOT IMPORT`.
- No live database, price, stock, product, category, payment, DNS, Axxess or production hosting changes are performed.
- No production deployment or PR merge is performed by this worker.

## Expansion path

1. Verify the draft PR's queue validator and worker workflow.
2. Obtain owner approval to merge the non-production automation workflow to `main`; until then, scheduled execution is not active.
3. Establish a private execution boundary for confidential Audio Connections / Planetworld materials.
4. Add deterministic Electrocity evidence checks and supplier-specific adapters.
5. Add bounded model-assisted candidate drafting only after a provider, budget ceiling and private data boundary are confirmed.
6. Add storefront task workers only where changes can be isolated, tested and submitted as reviewable PRs.
7. Keep exact-head QA, hosted preview verification and owner acceptance as release gates.

**Definition of 24/7 operation:** safe, scheduled jobs continue processing eligible work and recording checkpoints while the owner is away. It does not mean unattended publication, a permanently running ChatGPT session, or automatic production release.
