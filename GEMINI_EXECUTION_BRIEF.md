# Gemini Execution Brief — Get Wired AutoWorx
Date: 2026-10-15
Status: STAGING/DOCUMENTATION TASKS AUTHORIZED; production release remains HOLD.

## Purpose
Read this file and the current handover before doing work:
- [Current handover checkpoint](HANDOVER_CURRENT.md)
- [Full chronological handover](HANDOVER.md)
- [Repository](https://github.com/getwiredautoworx-max/get-wired-autoworx-store)
- [Live store](https://www.getwiredauto.co.za/)

The aim is to reduce duplicated effort and produce concrete, reviewable artifacts while catalogue and supplier evidence gates remain open.

## Working agreement and division of labour
Gemini should focus first on independent, low-risk documentation/data-contract work. ChatGPT remains coordinator for the execution log, evidence reconciliation, gate tracking, and validation against the agreed taxonomy/pricing rules. The owner remains the authority for scope decisions and any production release.

## Priority 1 — Knowledge base / policy pack
Create a concise, maintainable knowledge base suitable for future customer support and a custom GPT. Draft separate documents or sections for:
1. Store identity and scope: Get Wired AutoWorx; “Sound & Security • Auto Electrical”; “Your 1 Stop Automotive shopping experience.”
2. Product scope and the eight approved storefront top-level categories:
   - Auto Electrical Spares
   - Vehicle Security
   - Car Audio & Entertainment
   - Automotive Accessories
   - Marine Spares & Accessories
   - Tools, Hardware & Consumables
   - Camping, Leisure & Outdoors
   - Trailer & Canopy
3. Delivery/pickup and checkout wording; do not invent courier fees, delivery promises, stock guarantees, or payment methods.
4. Returns/refunds and warranty language, preserving the currently documented owner policy and clearly flagging wording needing owner/legal confirmation. Do not invent statutory/legal claims.
5. Product questions, compatibility/application, quote-only products, special orders, electrical/electronic installation evidence, and escalation to the business.
6. FAQs and safe response rules: do not claim compatibility unless source evidence supports it; ask for vehicle make/model/year/engine or part number where necessary; route uncertain items to manual confirmation.
7. Privacy/contact and payment FAQ: current checkout evidence reports Direct EFT only. PayFast and PayJustNow are deferred/not confirmed; never claim they are available until verified.
8. A source-of-truth register labelling claims confirmed, owner-confirmation-needed, or unverified.

Deliverable: docs/knowledge-base/ with an index/README and individual Markdown files. Keep customer-facing copy distinct from internal operating instructions. Flag policy contradictions rather than silently resolving them.

## Priority 2 — Product data contract and CSV/JSON schema
Draft and document a versioned schema for the replacement catalogue, plus a sample file containing synthetic examples only. Do not use invented example products as real inventory.

Required fields where applicable:
- supplier_sku (private/internal)
- public_sku (GW-XXXXXXXX format; never expose supplier SKU publicly)
- product_name and product_description
- vehicle/application/compatibility notes
- approved top-level category and proposed storefront subcategory
- exact ASC source category/subcategory and source guide/page
- supplier_cost_ex_vat, supplier_price_effective_date, supplier_price_expiry_date, supplier_confirmation_reference
- customer_price (derived only after current supplier cost is verified)
- image path/URL, image asset hash, exact SKU/model evidence, source, permission status, crop/edit/watermark permission
- stock/availability status, quote_only flag, active/publish_eligible flag
- review status (Approved/Pending/Rejected/Hold), confidence/reason, reviewer and timestamp
- source catalogue/version and audit trail fields.

Rules:
- Customer-price calculation: round(supplier cost excluding VAT × 1.15 × 1.35, 2). Keep cost and customer price distinct; a calculation does not prove the underlying cost is current.
- Never activate unpriced products or convert blanks to zero. The nine quote-only codes in the current handover must stay quote-only until priced and verified.
- Historical guides are not proof of current supplier cost/availability.
- Exact SKU/model evidence is required for image mapping. Image rights are a separate gate; source-image matching alone does not grant permission.
- Preserve source taxonomy independently of storefront taxonomy.
- Include machine-readable validation rules and examples of invalid rows.
- Do not execute or reuse the unsafe archived September SQL as an import mechanism.

Deliverables: versioned schema (JSON Schema or equivalent), field dictionary, sample CSV/JSON, and validation checklist/script if feasible. Mark synthetic examples clearly.

## Priority 3 — API/repository documentation
Inspect the current repo before writing. Document only interfaces that actually exist. If an endpoint or integration does not exist, label it proposed/not implemented.
- Repository architecture and key storefront entry points.
- Existing category/navigation data flow.
- Current build/package workflow and what it does/does not deploy.
- Existing background task controller and monitoring workflow: scheduled/event-triggered workflows are not resident daemons; describe actual triggers, artifacts, and retry restrictions accurately.
- Proposed OpenAPI spec only for real or explicitly proposed endpoints; mark proposed endpoints as such.
- Error handling, data validation, security, secrets, and safe checkout test behavior.
- How to run available checks and distinguish a successful workflow run from business-level catalogue approval.

## Priority 4 — README and operator runbook
Improve repository documentation with live store URL; staging-vs-production boundary; current release status and known blockers; safe validation steps; package workflow versus actual Axxess upload (GitHub artifact creation does not automatically deploy to Axxess); rollback evidence requirements; owner/supplier actions needed and how to record responses; links to current and full handover.
Do not overwrite the existing execution history; add concise links/summary only.

## Critical constraints
1. Do not merge to main, deploy, upload to Axxess, run SQL, mutate Supabase production data, alter DNS, or change payment settings.
2. Work on a separate branch and submit a reviewable pull request or patch. Never commit secrets, credentials, customer data, or supplier-confidential price lists.
3. Do not delete/replace existing project files or change storefront behavior as part of the documentation task.
4. Do not fabricate supplier confirmation, image-use permission, current prices, product mappings, test results, or live payment readiness.
5. Do not label the catalogue or release ready. The project remains HOLD until the evidence gates in HANDOVER_CURRENT.md pass.
6. Avoid repeating successful QA runs unless code changes or a real failure requires it. Record actual workflow IDs and exact commit SHA when tests are run.
7. Keep the existing eight top-level categories. Temporary subcategories may be proposed under the correct root in staging, preserving the original ASC heading. Do not add a ninth storefront root.
8. Keep internal notes (supplier cost, SKU mapping confidence, permission status) out of customer-facing content.
9. Do not claim Gemini has edited the repository unless a branch/commit/PR exists and is linked.

## Expected output / acceptance criteria
- Priority 1 knowledge-base pack completed with source/status labels and unresolved-policy questions listed.
- Priority 2 schema, field dictionary, synthetic examples and validation rules completed; quote-only/unpriced and image-rights rules are enforced.
- Priority 3 architecture/API docs match actual repository behavior; proposed components are explicitly labelled.
- Priority 4 README/runbook updated without deleting history or changing runtime behavior.
- All work is in a separate branch with a PR or patch, files listed, checks performed, results, unresolved items, and no production writes.
- Report concise facts: branch name, PR URL, commit SHA, files changed, checks run and pass/fail, and next owner decisions required.

## Suggested first message from Gemini
“I have read HANDOVER_CURRENT.md and GEMINI_EXECUTION_BRIEF.md. I will start with the knowledge-base pack, then the catalogue schema, repository/API docs and runbook. I will work on a separate branch, use synthetic examples only, preserve the release hold, and submit a reviewable PR without deployment or production writes.”