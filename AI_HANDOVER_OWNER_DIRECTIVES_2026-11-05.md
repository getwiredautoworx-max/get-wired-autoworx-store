# GET WIRED AUTOWORX — OWNER-DIRECTED AUTHORITATIVE RESET
**Date:** 5 November 2026  
**Authority:** Explicit owner confirmation in the 5 November 2026 conversation.  
**Status:** Binding project instruction. This document supersedes every older conflicting handover instruction, task list, supplier scope, category structure, workflow and proposed development plan. Do not revive superseded work unless the owner explicitly reauthorises it.

## 1. Single source of truth and precedence
1. Follow this document, the latest owner-approved permanent handover, and the owner's newest direct instructions.
2. The newest explicit owner instruction wins over older handover text, old task lists, old category trees, old assumptions and assistant-generated plans.
3. Treat older conflicting instructions as obsolete. Do not continue them merely because they remain in a historical handover.
4. Before each work session, read the latest accessible permanent handover and current handover; record a task-start entry before other work. If the expected file/path is missing, report the exact branch/path issue and locate the accessible canonical copy. Never claim a file was read or updated when it was not.
5. Maintain one authoritative execution plan and one coordinated candidate. Avoid disconnected repair branches, duplicated work and repeated status-only activity.

## 2. Supplier scope and pricing — corrected by owner
### ASC
- Current scope is **ASC catalogues only**.
- **Do not process ASC Buyers Guides**: no extraction, OCR, reconciliation, categorisation, importing or integration of Buyers Guides unless the owner explicitly reauthorises this.
- ASC currently has no usable/current supplier pricing. For ASC catalogue products without verified pricing, use the exact customer-facing wording: **"Price On Request due to Limited Stock and Availability"**.
- Keep those products quote-only and do not invent costs, RRPs, selling prices or stock. Update pricing only when current ASC pricing is supplied and verified.
- Historical September price-scaling findings are not authority for current prices; reconcile only against valid current ASC source data when supplied.

### Planetworld, Audio Connections, Caelex and other RRP suppliers
- These suppliers have RRP information. Do **not** apply ASC's no-pricing/quote-only rule to them by default.
- Preserve and use each supplier's applicable published RRP and the owner's approved supplier-specific pricing rules. Verify source currency, VAT treatment, model/variant and any cost-floor or margin issue before proposing a change.
- Do not replace RRP with cost-based guesses. Do not alter live prices or publish/import supplier data without explicit owner approval.
- Planetworld's 19 zero-RRP records remain a separate owner-audit group where applicable; never silently blend them into positive-RRP products.

## 3. Catalogue-first scope
- Build and prove one repeatable workflow using **supplier catalogues** first.
- Do not expand into Buyers Guides, stock feeds, unrelated historical audits or other supplier documents unless the owner explicitly changes the scope.
- For every catalogue, preserve source identity and traceability: supplier, source filename/version/date, page, exact model/variant, source SKU where permitted, source price/RRP if present, image reference, extracted description/specifications, proposed Get Wired SKU, category decision and confidence/status.
- Distinguish source-confirmed facts from OCR/extraction suggestions and human-reviewed decisions.
- No automatic product moves, deduplication deletions, image substitutions or data imports. Similar models/variants are not duplicates without exact evidence.
- Candidate data and files must be conspicuously marked **DO NOT IMPORT** until validation and owner approval.

## 4. Repeatable catalogue workflow — build once, reuse
1. **Intake and inventory:** register catalogue file, supplier, revision/date, page count and source authority; detect duplicate/older versions.
2. **Extraction:** extract product rows and page references; retain original source wording and source image/page pointers.
3. **Identity resolution:** verify exact manufacturer, model, variant, EAN/MPN where available; flag ambiguity rather than guessing.
4. **Image reconciliation:** match image to exact model/variant using the catalogue first and manufacturer evidence second; mark uncertain or permission-unclear assets as unverified/candidate.
5. **Category mapping:** map to the owner's current approved store hierarchy; keep proposed category separate from confirmed category; never auto-move.
6. **Supplier-specific pricing:** apply the correct supplier rule (ASC quote-only until pricing exists; RRP suppliers retain published RRP and approved formula); record VAT basis, source date, arithmetic and margin/cost-floor exceptions.
7. **GW data preparation:** prepare GW SKU, title, customer description, specs, image, category, price state and availability state consistently.
8. **Quality gates:** check exact identity, variant, image, category, price, duplicates, missing fields, prohibited supplier references and quote-only rules.
9. **Staging output:** generate a reviewable catalogue package/report clearly marked DO NOT IMPORT; no live data changes.
10. **Validation and owner review:** run deterministic checks and visual spot checks, record evidence and unresolved exceptions, then request approval only for decisions that genuinely require the owner.
11. **Reuse:** once the first catalogue passes end-to-end validation, freeze the schema, rules, QA checklist and output format; reuse them for the next catalogue/supplier with only supplier-specific pricing and source adapters changed.

## 5. Storefront development strategy
- First reconcile the actual repository, branches, PRs, workflows and current preview. Do not assume historical handover status is still current.
- Establish one agreed storefront architecture and one consolidated integration candidate; do not create branches for isolated cosmetic demonstrations.
- Preserve the owner's latest agreed current rebuild structure: **three main categories**, not the obsolete eight-category tree. Do not resurrect old categories without explicit approval.
- Complete the customer navigation in this order: main category → visual subcategory page → brand/manufacturer page where relevant → product-type page → product listing/detail.
- Category and subcategory tiles must use relevant images; brand tiles must use relevant brand logos; product-type tiles must depict the actual product type. Avoid long vertical button bars and generic unrelated placeholders.
- Car Audio & Video must follow department → brand → product type (e.g. radios, speakers/components, amplifiers) → products. Selecting a brand must navigate to its own view/page rather than merely appending stock below the same page.
- Keep a consistent storefront shell, branding, header/footer and navigation across pages. Prioritise mobile layout and touch navigation.
- Use real product catalogue content and exact matching images; descriptions must not obscure product images. Do not expose supplier names or internal source data to customers.
- Do not call the store preview-ready until exact-head build/tests, correct preview deployment and owner-facing browser verification all refer to the same commit.
- Banking details/payment activation and final payment/customer transaction tests remain deferred until the owner supplies banking details and explicitly authorises the relevant work.

## 6. Execution, monitoring and release controls
- Work in one coordinated GitHub/Supabase/Cloudflare release process, with Axxess-first sequencing where relevant, to minimise duplicated work and credits.
- Read and monitor background workflows during each work session; report actual run/job/attempt/commit status. Monitoring is scheduled/check-based, not continuous.
- Never duplicate queued/in-progress workflows. Retry only safe staging tasks with a supported action and verify the retry. Never rerun production/deployment jobs without explicit owner approval.
- Do not merge PRs, deploy, upload to Axxess, change DNS, alter payments/banking, write live Supabase data, change live catalogue/prices/stock/active flags, or consume release credits without explicit owner approval.
- No production or customer go-live until exact-head tests, verified preview, owner acceptance and explicit release approval.
- Record material successes, failures, blockers and next actions with evidence/counts/IDs in the current handover. Do not report unsupported completion or repeat already-completed tasks.

## 7. Immediate execution sequence
1. Reconcile the current GitHub state and identify the actual authoritative branches/files; verify this addendum is visible from the working branch.
2. Create a single architecture/data-flow map for the current three-category storefront and catalogue pipeline.
3. Select one representative **catalogue** (not a Buyers Guide) and run it through intake → extraction → identity → image → category → supplier pricing → GW SKU → QA → DO NOT IMPORT staging.
4. Fix the workflow/schema until the sample is accurate, repeatable and easy to audit.
5. Freeze the reusable catalogue template, validation rules, exception report and handover instructions.
6. Apply the proven workflow to the remaining approved catalogues in priority order, preserving supplier-specific RRP/quote-only distinctions.
7. Integrate validated catalogue output into one consolidated non-production preview and complete exact-head desktop/mobile checks.
8. Present one preview and a concise list of owner decisions/blockers. Do not fragment delivery into disconnected preview branches.
9. Only after owner acceptance, prepare the coordinated release checklist. Production remains HOLD until explicit approval.

## 8. Current task-start record
- 2026-11-05 09:40 SAST: Owner confirmed this authority and corrected the supplier pricing distinction. Task: supersede older conflicting instructions, exclude ASC Buyers Guides, preserve RRP processing for RRP suppliers, and establish the catalogue-first reusable workflow above.
- Status at creation: instruction update in progress; no code, supplier workbook, live data, price, stock, active flag, PR, deployment, hosting, DNS or payment changes authorised or performed.


## 9. Publication and handover reconciliation record
- This authoritative reset was published and read-back verified on `main` and `docs/planetworld-blocker-handover-2026-10-26` on 2026-11-05. The file exists at repository root on both refs; exact path: `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md`.
- This is an additive, binding instruction overlay. It does not erase historical evidence or rewrite the very large legacy `HANDOVER_CURRENT.md`; all conflicting historical instructions in that file are superseded by this owner-authorised document and the owner's newest direct instructions.
- Task outcome: SUCCESS — owner-authoritative precedence, ASC catalogue-only scope, exclusion of ASC Buyers Guides, RRP-supplier pricing distinction, catalogue-first reusable workflow, three-category storefront direction, and execution/release gates are recorded. No code, supplier workbook, live data, price, stock, active flag, PR, deployment, hosting, DNS or payment changes were made.
- Next action: begin the repository-wide reconciliation under sections 1 and 7, then record verified branch/PR/workflow state and the first representative catalogue workflow result in the current handover. Do not resume Buyers Guide processing.


## 10. Owner clarification — retail catalogue use and repository visibility (2026-11-09)
- The business is a **retailer to the general public**. Supplier catalogues are source material for Get Wired AutoWorx retail product listings: product identity, descriptions, images and specifications. Their wholesale value is limited because wholesale prices require a separate qualifying dealer relationship with the supplier.
- Keep the main GitHub repository public. **Do not require a private repository, private runner or separate private execution environment as a prerequisite** for catalogue extraction, review or storefront enrichment. Do not pause authorised catalogue work on that basis.
- Use the existing public repository and approved workflows for catalogue processing, subject to the owner's existing product-data and release rules. Do not change repository visibility, create unnecessary infrastructure, or introduce extra hosting services.
- Customer-facing rules remain: hide supplier names and internal supplier SKUs; do not expose dealer-only cost/wholesale information as retail prices; apply the owner's Price On Request and other supplier-specific pricing instructions; never invent price or stock.
- This clarification does not authorise exposing credentials, access tokens, personal data, or other genuine secrets. It also does not relax the production hold, no-live-write rules, exact-head QA, staging verification, or owner approval for release.
- This section supersedes any older handover language that made a private supplier-data boundary a blanket blocker to catalogue processing.
