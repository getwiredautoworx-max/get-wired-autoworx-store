# Get Wired AutoWorx — Current Handover Checkpoint
Date: 2026-10-14 (South Africa)

## Operating rules
- Preserve the functioning live store. Do not execute the unsafe September SQL or write to production Supabase during reconciliation.
- Build/review in staging first; batch approved final sync to GitHub, Supabase SQL/data and Axxess into one controlled release.
- Axxess is the primary host. Owner emailed Axxess about root/www DNS and SSL; await their response before DNS/SSL changes. Do not stop independent work while waiting.
- PayFast and PayJustNow remain deferred temporarily, per owner instruction. No real orders or payment changes.
- Required customer price formula: supplier cost excluding VAT × 1.15 × 1.35, rounded to cents. Never promote expired guide prices as current without supplier confirmation.
- Keep eight storefront categories and preserve ASC source category/subcategory as separate evidence.

## Current verified live baseline
- Last verified inventory baseline: 4,187 active products, 4,187 distinct supplier SKUs and 4,187 public SKUs.
- Last audit reported no missing image_url, missing costs, invalid/non-positive prices, or live formula mismatches. That baseline does not clear the separate September 800-row import candidate or 38 flagged live price-scaling defects.
- Release gate workflow run 38559111166 succeeded for the tested deployment's HTTPS/routes, version marker, desktop/mobile category navigation, checkout UI without a real order, and payment-readiness report. Monitoring runs 38559165567 and 38559212408 succeeded. Do not rerun these without new code or a failure.
- No production catalogue writes, SQL execution, deployment, Axxess upload, DNS change, or payment setting change in this reconciliation pass.

## 2026-10-14 — Row-level category audit progress
- Reviewed all 800 rows in the existing review-only category crosswalk and created:
  /mnt/data/Get_Wired_AutoWorx_800_Row_Level_Category_Audit_QUEUE_2026-10-14.csv
- The queue retains every exact SKU, product name, source guide page, source category/subcategory, candidate slug and proposed top-level category. It adds an explicit row-level audit finding and never marks a row import-eligible.
- Triage counts: 34 AERIALS rows need a specific decision because the candidate slug maps them to Car Audio & Entertainment; 94 mechanical/vehicle-spares family rows need category-scope verification; 42 specialist 4x4/trailer/outdoor/marine rows need specialist-category verification; 630 rows still require source-page/product-family review. These are triage flags, not approved remappings.
- This is now a concrete 800-row review queue, not a claim that the 800 categories are verified. All 800 remain held from import pending row-level source validation.
- Previous normalized crosswalk counts remain candidate-only: 412 automotive-accessories; 242 tools-workshop; 103 electrical/lighting; 38 car-audio; 5 marine. 383 rows require slug normalization, and 417 currently use one of the intended top-level slugs. Source subcategory accuracy is not yet passed.

## September 800-row candidate — hard release blocker
- 800 rows / 800 unique SKUs: 791 priced candidates and 9 quote-only candidates.
- Formula audit: 0/791 SQL candidate prices use the required full formula; the candidate uses VAT-only cost × 1.15. The nine unpriced SKUs (M501WCC, A1-002, A1-003, MA330, MA342, MA342/2, N-FC001, WP25, N-CP002) can be coerced to zero and marked active by the unsafe SQL. Never execute it.
- Review-only formula-corrected CSV exists at /mnt/data/Get_Wired_AutoWorx_800_Formula_Corrected_REVIEW_ONLY_2026-10-14.csv. It is not import-ready: 791 calculated prices are only mathematical candidates, not confirmed current supplier prices; nine rows stay quote-only/blank; 0/800 import eligible.
- Original September guide offer expired 2026-09-30. The guide verifies historical source values, not current prices.

## Image reconciliation / permission gate
- 38 live price-scaling defect SKUs are in /mnt/data/Get_Wired_AutoWorx_38_SKU_Exact_Review_2026-10-14.csv. All 38 are historical source-matched; all 38 require current supplier price confirmation before changing published prices.
- 30/38 appear in the unmatched-image queue with no verified image; the other 8 are not listed there, which is not proof of correctness.
- September guide page 104 has explicit no-verified-image placeholders for winches EWV4500 and ROMA13XP. Exact model panels exist for LEOPARD and LION compressor models. The other 34 held SKUs have only grouped/family imagery, not size-specific images.
- ASC source guide warns unauthorized use is prohibited. Publication rights are not confirmed. Internal evidence crops at /mnt/data/Get_Wired_AutoWorx_September_Source_Image_Evidence_2026-10-14.zip are QA evidence only and must not be published without permission. Do not guess image paths or assign nearby supplier-number images based on filename alone.
- No verified current supplier price response or image-use permission has been received/recorded. These require supplier/rights-holder confirmation; do not describe them as resolved.

## Go-live task register and realistic ETAs
ETAs below are work estimates after required evidence/access arrives, not promises or claims that third parties have replied. External response times are outside our control.

| Priority | Remaining task / exit criteria | ETA from required input | Current status |
|---|---|---|---|
| P0 | Corrected, safe 800-row catalogue candidate: exact SKU/description/cost/page joins; correct full price formula; quote-only rows cannot be active/zero-priced | 1–2 focused work sessions after source files are fixed and complete | BLOCKED: existing positioned extraction has proven SKU/price association errors |
| P0 | Row-level category validation for all 800 SKUs against source page and agreed eight-category taxonomy | 2–4 focused work sessions; queue created, 800 rows still require review | IN PROGRESS: audit queue generated; no rows approved |
| P0 | Verify product image by exact SKU; secure usage permission or substitute authorized supplier images | 1–3 work sessions for matching once image index/assets are accessible; permission timing depends on supplier/rights holder | BLOCKED: 0/800 verified September candidate image paths; rights unknown |
| P0 | Current supplier price confirmation for 38 flagged live SKUs and any selected launch candidates | 1 work session to reconcile written response once received; supplier response time unknown | WAITING ON SUPPLIER; September values expired |
| P1 | Reconcile live 4,187 SKUs against staged approved source-delta ledger; classify KEEP/UPDATE/ADD/QUOTE/REVIEW | 1–2 work sessions after clean candidate, image and price evidence | NOT STARTED to pass standard; baseline exists only |
| P1 | Staging QA: desktop/mobile category and subcategory navigation, product detail, search, cart, checkout, delivery and policy links; no real payment | 1 work session after candidate is stable | Partial evidence exists for tested deployment; full catalogue and Axxess DNS/SSL not proven |
| P1 | Axxess root/www DNS, SSL and canonical redirect verification | 30–60 minutes after Axxess confirms changes/propagation | WAITING FOR AXXESS; owner has sent request |
| P1 | Final one-batch release: reviewed data sync, one Axxess package upload, live smoke tests, rollback checkpoint | 1 focused work session after all P0/P1 gates pass | NOT AUTHORIZED / NOT READY |
| P2 | PayFast/PayJustNow live URL and policy approval, then sandbox/live checkout proof | After store release; external approval time unknown | DEFERRED per owner instruction |
| P2 | Optional Cloudflare/GitHub/Supabase mirror sync and deployment consistency check | Batch with final release; only after access/token blocker is solved | NOT READY; avoid repeated builds/credit use |

**Planning estimate:** 6–10 focused work sessions from the point the required supplier/image evidence and usable source candidate are available, plus third-party response/propagation time. This is not a calendar launch date. A credible date can only be set after P0 evidence gaps and Axxess response are cleared. Customer launch remains HOLD today.

## Exact customer launch exit checklist
1. 800-row source candidate reconciles 800/800 unique expected SKUs; each row has verified same-card SKU/description/price/category evidence or is explicitly excluded/quote-only.
2. All 791 intended priced rows have confirmed current supplier costs and correct formula; no zero-price active rows; nine quote-only items are excluded from sale until priced.
3. No product goes live with a guessed/mismatched image. Each published image has exact-SKU/model evidence and permission or is replaced by an authorized asset.
4. Every published row has approved category/subcategory and valid product detail.
5. Staged-vs-live SKU delta reviewed; backup and rollback available; no unreviewed bulk overwrite.
6. Axxess root and www both resolve correctly with valid SSL and email DNS preserved.
7. Storefront, mobile, search, cart, shipping/pickup, checkout and policies pass live smoke tests. Payment-provider approvals are then completed before claiming online payments ready.
8. Single controlled release and post-release verification recorded; handover and release evidence committed.

## Immediate next actions (no circular reruns)
1. Use the new 800-row row-level category audit queue to resolve highest-risk specialist mappings first: AERIALS (34), mechanical/vehicle spares (94), and 4x4/trailer/outdoor/marine (42). Preserve source subcategory and page evidence; do not auto-approve.
2. Continue exact-SKU image index reconciliation for all 38 held SKUs and the 800-row candidate. Use only positive SKU-to-image evidence; permission is a separate gate.
3. Prepare a supplier confirmation request list covering the 38 held SKUs with exact SKU, description, historical September cost, and requested current cost/availability; mark all historic values expired until reply.
4. Continue independent staged work while Axxess and supplier responses are pending. Do not rerun successful release/monitoring workflows without a new change or failure.
5. Update this handover after each material change with actual counts, links, blockers, and revised ETA.

## Safety / release status
**RELEASE HOLD — NOT READY FOR CUSTOMER LAUNCH.** No SQL was executed, no production product/price/category/image changes were made, and no deployment/upload was performed in this pass.

## Additional deliverable — supplier confirmation request register (2026-10-14)
- Created /mnt/data/Get_Wired_AutoWorx_Supplier_Price_and_Image_Permission_Request_38_SKUs_2026-10-14.csv with 38 exact-SKU rows.
- Each row includes the product description, historical September source page/cost and validity warning, plus blank fields for current supplier cost, stock availability, effective/expiry dates, exact SKU/description confirmation, image-use permission, permission to crop/edit/watermark, approved image file/URL, supplier response date and contact reference.
- This is a ready-to-send request register, not supplier confirmation. It has not been sent externally because no supplier contact/channel was provided in this workflow. Supplier reply and image rights remain outstanding.


## PERMANENT CATEGORY-MAPPING RULE — OWNER DIRECTIVE (2026-10-14)
- Do not leave valid products unclassified merely because a top-level SQL slug is broad, inconsistent, or absent from the eight storefront categories.
- The Buyers Guide's printed category/subcategory is the primary taxonomy evidence. SKU prefix (first 3–5 characters, where meaningful) is a cross-check; use product description and application as additional checks. Never treat prefix alone as infallible when prefixes overlap or the description conflicts.
- Map every valid source subcategory under the most relevant of the eight agreed storefront top-level categories. If no suitable subcategory exists, CREATE a temporary subcategory under the correct top-level category and preserve the original ASC source heading in the mapping data. Temporary means a staging/store-taxonomy addition, not a new top-level storefront category unless explicitly approved.
- Examples: AERIALS belongs under Car Audio & Entertainment > Aerials (temporary subcategory if not already present); 4X4 OUTDOOR under Automotive Accessories > 4x4 & Outdoor; TRAILER & TOWING under Automotive Accessories > Trailer & Towing; vehicle-specific brake/suspension/ignition/thermostat spare parts under Auto Electrical Spares only if they are actually electrical/electronic, otherwise use an appropriate Auto Spares/Vehicle Spares subcategory under the agreed closest top-level category pending owner-approved taxonomy scope. Do not mislabel mechanical items as electrical just to force a fit.
- Tools source headings such as SOCKETS, SPANNERS, DRILL BITS, ABRASIVES, HAND TOOLS, CONSUMABLES and HARDWARE should become their own sensible subcategories under Tools, Hardware & Consumables. Keep distinct ranges (e.g., Clips, Spanners, Winches/Winch Spares, Switches/Relays) grouped by product family.
- Use deterministic prefix-family mapping where the supplier SKU convention supports it; record the prefix rule, source heading and exceptions. Apply it across the complete candidate dataset, not only to flagged samples. Do not use the previous 34/94/42 counts as blockers requiring manual category invention; they are work-queue signals that should be resolved by this mapping method.
- Status discipline: category mapping can be resolved in staging from guide headings/prefix/product family without supplier price or image permission. Price confirmation and image rights are separate launch gates; never conflate them with category validation. Do not change production taxonomy or publish products during staging review.
- Required next category output: a revised 800-row mapping with (a) approved top-level category candidate, (b) source subcategory retained, (c) proposed storefront subcategory, (d) SKU-prefix rule where supported, (e) confidence/reason, and (f) explicit exception only where the evidence conflicts. Temporary subcategories are acceptable and should reduce unresolved-category count instead of keeping ordinary product families on HOLD.


## OWNER CHECKPOINT — EXACT TASKS TO REACH LIVE-TESTING READINESS (2026-10-14)

This section records the latest owner-facing release plan. “Ready for live testing” means the approved/staged catalogue and the live Axxess site pass controlled functional smoke tests; it does not mean public customer launch or payment-provider approval. Do not describe the store as test-ready until the applicable exit criteria below are evidenced.

### P0 — Catalogue and data integrity gates

1. **Repair and validate the 800-row candidate.** Reconcile every expected SKU to its correct product description, historical source/page and cost; resolve extraction/join errors; prove 800/800 unique expected SKUs or explicitly account for each excluded row. Apply the required review-price formula `round(cost_ex_vat * 1.15 * 1.35, 2)` only as a calculation, not as proof of current supplier pricing. Keep the nine quote-only SKUs (M501WCC, A1-002, A1-003, MA330, MA342, MA342/2, N-FC001, WP25, N-CP002) blank/quote-only and excluded from sale. Prevent any unpriced row from becoming active at zero. Never execute the unsafe September SQL. Exit evidence: row-level reconciliation report, formula audit, explicit exclusions and no unexplained SKU/cost associations. Estimate: 1–2 focused sessions once source discrepancies are resolved.

2. **Produce the revised full 800-row category mapping.** Use Buyers Guide source category/subcategory as primary evidence; description/application and meaningful first 3–5 SKU characters are cross-checks. Map each valid item to one of the eight approved top-level categories and create sensible staging subcategories where necessary; preserve original source headings. Group families correctly (Aerials; Clips; Spanners; Winches/Winch Spares; Switches/Relays; trailer/canopy; mechanical vehicle spares). Document only real evidence conflicts as exceptions. All rows stay staging-only and import-ineligible until other gates pass. Exit evidence: revised CSV with source heading/page, proposed top-level and subcategory, prefix rule where supported, confidence/reason, and explicit exceptions. Estimate: 2–4 focused sessions for row-level validation. **Status at checkpoint: required output not yet generated.**

3. **Verify images and usage rights.** Match each selected candidate product to an exact SKU/model image using positive evidence; replace incorrect/missing images with authorized supplier assets or exclude affected items from the test catalogue. Obtain permission for any ASC/supplier-guide image before publication. Do not publish QA crops or inferred filename matches. Exit evidence: image-to-SKU crosswalk and rights/asset source record; every test-catalogue product has a verified image or is explicitly excluded. Known: 30/38 price-held SKUs appear in the unmatched-image queue; the other eight are not automatically verified. The September 800-row candidate has no verified image paths yet. Estimate: 1–3 sessions for matching after assets/indexes are accessible; third-party rights response time unknown.

4. **Resolve the 38 live price-scaling defects.** Request and reconcile current written supplier cost/availability/validity for each exact SKU. Do not change live prices using expired September values. Exit evidence: per-SKU decision backed by current cost and formula, or an explicit HOLD/exclusion. Estimate: 1 session to reconcile responses after receipt; supplier response time unknown.

### P1 — Site, data delta and test evidence

5. **Verify Axxess DNS/SSL/canonical behaviour.** Test root and www domain variants, valid SSL, intended canonical redirect and preservation of MX/SPF/DKIM. Owner has contacted Axxess; do not change DNS blindly while awaiting their response. Exit evidence: timestamped checks of both URLs and email DNS. Estimate: 30–60 minutes after provider changes/propagation if no new issue occurs. Status: waiting on Axxess.

6. **Run complete controlled storefront and checkout QA.** Test desktop/mobile navigation, all eight categories/subcategories, search, product details/images, cart/quantities/totals, delivery and pickup, required checkout fields, policy links and error handling. No real paid order and no payment setting changes. Record pass/fail and retest critical fixes. Prior release-gate workflow 38559111166 passed its specified narrower tests, but does not prove this full-catalogue/Axxess test complete. Estimate: 1 focused session after candidate and domain are stable.

7. **Reconcile staged candidate against live baseline.** The last verified baseline is 4,187 active products/SKUs. Produce a per-SKU KEEP/UPDATE/ADD/QUOTE/HOLD ledger, detect duplicates and unintended deletions/overwrites, review each proposed price/category/image change, and prepare backup plus rollback. Exit evidence: reviewed delta with no unexplained changes. Estimate: 1–2 sessions after reliable catalogue/evidence is available.

8. **Single controlled release and post-upload verification.** Only after applicable P0/P1 criteria pass: record approved build/data version; package the approved changes once; perform one controlled Axxess upload with rollback checkpoint; verify deployed version, root/www, routes, mobile, catalogue sample, cart and checkout; record test evidence and update this handover. No production bulk write or deployment is authorized before the gate passes. Estimate: 1 focused session after all gates pass.

### Deferred, not part of this live-testing gate

- PayFast and PayJustNow approval/payment verification remain deferred per owner instruction. Required before claiming online payments are production-ready, not a reason to perform real payment tests now.
- Cloudflare/GitHub/Supabase mirror synchronization should be batched with the final release only where needed and when access/token blockers are resolved. Avoid repeated builds and credit use.
- Successful release-gate/monitoring workflows must not be rerun without a relevant code change or failure.

### Readiness status and planning estimate

**NOT READY FOR LIVE TESTING OF THE RECONCILED CATALOGUE. CUSTOMER LAUNCH HOLD.** The earlier workflow success covers only its recorded test scope. The 800-row category mapping is still to be generated; catalogue associations, exact-SKU image evidence/rights, current pricing for 38 held SKUs, Axxess DNS/SSL and full QA remain open to the extent recorded above. Planning estimate remains 6–10 focused work sessions after required source/evidence is accessible, plus external supplier/Axxess response and propagation time. This is not a calendar launch promise.

### Immediate execution order (no circular reruns)

1. Generate the revised 800-row staging category mapping using the permanent owner directive; record actual resulting category counts and true exceptions.
2. Continue exact-SKU/source/cost reconciliation and produce an evidence-backed candidate; never execute the unsafe September SQL.
3. Continue image crosswalk and supplier rights request; keep unverified items out of any test catalogue.
4. Obtain current supplier prices for the 38 held SKUs or mark each held.
5. Continue independent staging work while Axxess/supplier replies are pending.
6. Once applicable gates pass, perform the controlled QA and one-batch release; update this handover with measured results and commit references.

No production catalogue write, unsafe SQL execution, deployment/upload, DNS change, or payment-setting change was performed by this handover update.


## OWNER DIRECTIVE — LIVE-TESTING TASK TRACKER CHECKPOINT (2026-10-14)

Owner reiterated that readiness must be evidence-based and requested execution through completion, with handover updated. Do not claim tasks are resolved unless exit evidence exists. Do not repeat successful workflows without a relevant change/failure.

### New deliverable: revised 800-row category mapping (STAGING ONLY)
- Generated local file: `/mnt/data/Get_Wired_AutoWorx_800_Category_Mapping_REVISED_STAGING_2026-10-14.csv`.
- Validation: 800 rows; 800 unique SKUs. Every row has a proposed storefront top-level category, proposed subcategory, source category/subcategory retained, mapping confidence/reason, exception flag, `Import_Eligible=False`, `Staging_Only=True`, and a status explicitly stating it is proposed staging mapping, not production-approved.
- Proposed top-level counts (staging proposals, not final approved taxonomy): Automotive Accessories 361; Tools, Hardware & Consumables 253; Auto Electrical Spares 117; Car Audio & Entertainment 34; Trailer & Canopy 20; Camping, Leisure & Outdoors 10; Marine Spares & Accessories 5. Vehicle Security currently has 0 proposed rows in this candidate based on available source headings/descriptions; do not manufacture assignments without evidence.
- Confidence counts: High 610; Medium 184; Low 6. Six low-confidence rows are under the promotional source heading `New Arrivals`; product-family evidence is insufficient to approve them, so retain explicit exceptions for follow-up.
- Important limitations: this is a deterministic first-pass staging map based on source headings and available product descriptions, not proof that all 800 source pages/images have been visually verified. SKU-prefix rules are only populated where a meaningful family rule was defensible; do not infer prefixes where unsupported. The file does not authorize production taxonomy changes or import. All 800 remain import-ineligible pending pricing, image/rights and catalogue-integrity gates.
- Mapping file has been created locally; it has not yet been committed as a downloadable artifact in GitHub. Use the conversation download link for this generated CSV where available.

### Exact live-testing readiness task tracker — current evidence
1. **800-row SKU/description/cost reconciliation and safe price candidate:** OPEN / BLOCKED. Prior audit proved candidate SQL price formula is VAT-only and source join errors exist. Required formula remains cost ex VAT × 1.15 × 1.35; mathematical recalculation does not verify current supplier price. Never execute the unsafe September SQL. Keep nine quote-only SKUs excluded from sale and not active at zero.
2. **Category mapping:** FIRST-PASS STAGING DELIVERABLE GENERATED. 800/800 rows mapped to a proposed top-level category and subcategory; 6 low-confidence New Arrivals exceptions remain. This does not pass full source-page validation or authorize import. Next: resolve those six with exact description/SKU-prefix evidence and retain the source heading.
3. **Exact-SKU image verification and usage rights:** OPEN / BLOCKED. 30/38 held SKUs are in the unmatched-image queue; absence from the queue is not proof. The 800-row candidate's image paths/rights remain unproven. Use only exact SKU/model evidence and authorized images.
4. **Current prices for 38 live price-scaling defects:** OPEN / WAITING ON SUPPLIER. No current written supplier confirmation recorded. Correct only from current cost evidence or hold the affected SKU.
5. **Axxess root/www DNS and SSL:** OPEN / WAITING ON AXXESS. Verify both root and www, certificate validity, canonical behavior and preservation of MX/SPF/DKIM after provider action.
6. **Complete controlled storefront/checkout QA:** OPEN / PARTIAL. Earlier workflow 38559111166 passed its defined limited test scope; this is not full catalogue QA or proof of current root/www SSL. No real paid order; PayFast/PayJustNow settings remain untouched.
7. **Staged-to-live 4,187-SKU delta ledger, backup and rollback:** OPEN. Baseline recorded as 4,187 active products/SKUs; a reviewed KEEP/UPDATE/ADD/QUOTE/HOLD ledger is not yet evidenced.
8. **One controlled release, post-upload smoke tests and exact deployed-version record:** OPEN / NOT AUTHORIZED. Only proceed when applicable gates pass; one approved package/upload, rollback checkpoint, post-upload tests and handover evidence.

### Excluded/deferred work
- PayFast and PayJustNow approval/payment verification remain deferred per owner instruction. They are not prerequisites for non-payment storefront testing, but are required before claiming online payments are production-ready.
- Cloudflare/GitHub/Supabase mirror synchronization is to be batched with final release only where required and when access/token blockers are resolved. Avoid repeated builds/credit use.
- Do not rerun the previously successful release-gate/monitoring workflows absent relevant changes or failures.

### Current decision
**NOT YET READY FOR LIVE TESTING OF THE RECONCILED CATALOGUE; CUSTOMER LAUNCH HOLD.** The revised category mapping is now generated as a staging deliverable, reducing the previous category-review queue to six explicitly low-confidence promotional-heading rows for follow-up, but catalogue source joins, current pricing, exact-SKU image evidence/rights, Axxess DNS/SSL, complete QA and the live-delta/rollback ledger remain open. No production catalogue change, SQL execution, deployment/upload, DNS change or payment-setting change was made in this checkpoint.

### Immediate next execution order
1. Resolve six New Arrivals rows from product descriptions and SKU-family evidence; update the mapping and handover with actual outcomes.
2. Continue correcting 800-row source SKU/description/cost joins and safe formula audit; keep all records staging-only.
3. Build/continue exact-SKU image crosswalk and supplier rights request; do not publish unauthorized guide crops.
4. Reconcile supplier responses for the 38 held price SKUs; hold any without current evidence.
5. Continue Axxess-independent QA and prepare the staged-to-live change ledger/rollback plan.
6. After external dependencies and applicable exit criteria pass, perform controlled QA and a single release; record the deployed version and post-upload smoke-test evidence.


## OWNER CONTINUATION CHECKPOINT — 2026-10-14 18:55 SAST

Owner requested continuation, six-row exception resolution and handover update. Preserve the release hold and do not perform the controlled release until gates pass.

### Work performed in this continuation
- Re-read the current main-branch handover and searched the available Library artifacts for the staging category map and row-level evidence.
- Confirmed the revised 800-row category mapping CSV is referenced as a local staging artifact but is not present at the expected path in the current execution workspace and is not committed at the repository root. Therefore the exact six low-confidence row IDs/SKUs could not be safely enumerated from the authoritative mapping file in this pass. Do not fabricate six SKU identities or claim the six exceptions are resolved.
- Recovered illustrated catalogue source evidence for products formerly grouped under Accessories / New Arrivals. The following identities support family-level category decisions once the exact candidate row is confirmed:
  - SFBP2-G1100-13A and SFBP2-G1500-13A: Seaflo 24V automatic bilge pumps — Marine Spares & Accessories, marine pump subcategory.
  - SFCBS-275-201 and SFCBS-300-202: battery isolator switches — electrical switching/battery isolation products; final top-level placement depends on recorded product application, with marine placement only where supported.
  - SFDP1-015-080-31: 12V high-pressure water pump — Marine Spares & Accessories only if source application confirms marine use; otherwise application review.
  - NO-001-24V-NB: universal 24V radiator fan — Auto Electrical Spares if vehicle cooling/electrical application is confirmed; do not classify from SKU alone.
  - 560102: 115mm Velcro pad — Tools, Hardware & Consumables / consumables, subject to exact source wording.
  - STUD1005, T39B, T39CH, T39G, T53B, T53CH, T53G, T54B, T54CH and T54G: wheel stud / wheel nut covers — Automotive Accessories / wheel hardware, preserving fitment.
- These are evidence-backed family examples, not proof they are the six low-confidence rows. Do not use historic advertised prices as current prices; the September offer expired 2026-09-30.
- No database write, SQL execution, deployment, Axxess upload, DNS change, or payment-setting change was made.

### Immediate blocker / next action
Recover Get_Wired_AutoWorx_800_Category_Mapping_REVISED_STAGING_2026-10-14.csv from the prior execution artifact or regenerate it from the authoritative 800-row source workbook. Filter exactly the six low-confidence/exception rows under New Arrivals; use each exact SKU, full description, source page and family evidence to set the staging subcategory and rationale. Preserve source heading and keep Import_Eligible=False. Then validate all 800 rows and commit the corrected staging CSV plus evidence summary. Do not mark any row approved merely because its category is plausible.

### Release decision (unchanged)
**RELEASE HOLD — NOT READY FOR LIVE TESTING OF THE RECONCILED CATALOGUE.** No exact deployed version is recorded because no controlled release has been authorized or performed and catalogue gates have not passed. Record a deployment version only after an approved package is deployed and post-upload smoke tests pass. PayFast/PayJustNow remain deferred as instructed.


## PERMANENT OWNER DIRECTIVE — ACCOUNTABILITY, EXECUTION, MONITORING AND CUSTOMER ETA (2026-10-14)

This section is a permanent project operating requirement. Preserve it in future handover updates; do not delete, weaken, or silently rewrite it. Amend only to add evidence or with the owner's explicit approval.

### Required owner questions and evidence-based answers
- **ETA until customers can use the store:** Current planning estimate remains 6–10 focused work sessions after the necessary source files/evidence are accessible and supplier/hosting-provider dependencies are resolved, plus unknown third-party response/propagation time. This is not a promised calendar date. Current status is CUSTOMER LAUNCH HOLD. Re-estimate after each material gate passes and state the remaining critical path; do not imply an exact launch date without evidence.
- **Are automated tasks running?** Only identify automation as running when an actual configured workflow/schedule/monitoring job and its latest run/result can be named. The recorded successful GitHub workflows are historical evidence for their specific scope, not proof that an agent is continuously working in the background. No continuous autonomous work or monitoring may be claimed unless a live schedule/job and run history are verified. Do not rerun successful workflows without a relevant change or failure.
- **Is the handover updated after tasks, monitoring, execution and failures?** Yes is the required operating standard, but every claim must be backed by an actual handover commit. After each material action, record task attempted, exact artifact/commit, measurable outcome/counts, pass/fail, failure cause, recommended corrective action, dependencies/owner input, and updated ETA. If no change was executed, say so. Do not claim continuous updates between active sessions or background monitoring unless that is genuinely configured and evidenced.
- **Are we working in circles?** Prevent this by reading the latest handover before action; preserving successful test evidence; not repeating unchanged checks; choosing the next unresolved blocker; reusing existing source artifacts; recording a clear exit criterion and result; and avoiding repeated uploads/builds or circular planning. A failed attempt must change the approach or name the concrete missing dependency.
- **Are work and resource use efficient, fast, honest and reliable?** Measure against completed artifacts, validated row counts, test results, commits and resolved blockers—not assurances. Use staging first, batch final syncs, minimize build/credit usage, and distinguish completed, partial, blocked, waiting-on-owner/provider, and not-started tasks. Never claim a test, supplier reply, deployment, or success that has not been observed.
- **Is there deliberate sabotage or work against the owner?** No intentional sabotage is being performed. Intent is not a substitute for evidence: maintain auditability, protect production, report failures plainly, and make changes only within the documented release rules. Do not dismiss the owner's concern with reassurance alone; demonstrate alignment through commits, measured results, and preserved instructions.
- **Can the instructions be read and executed?** The current handover is the authoritative workflow record. Read it before continuing, follow permanent owner directives, and report a specific blocker where access/source evidence prevents execution. Do not silently ignore instructions or change policy at discretion. When two instructions conflict, preserve production safety and ask only for the minimum decision genuinely needed.
- **Are handover instructions being edited at discretion?** Do not remove or weaken permanent owner directives. Append dated checkpoints and correct factual errors transparently, preserving history. Any proposed change to a permanent requirement needs explicit owner approval.

### Execution protocol — required for every continuation
1. Fetch and read the latest main-branch HANDOVER_CURRENT.md before modifying project artifacts.
2. Identify the highest-priority unfinished task and its exact exit evidence. Inspect existing artifacts before regenerating anything; search repository and Library/workspace, and verify actual paths.
3. Execute a concrete staging action in the current session. Do not substitute another planning-only response when the required artifact and tools are accessible.
4. Validate output with measurable checks (row counts, uniqueness, missing fields, exact joins, formula audit, test results). Keep import eligibility false until all relevant gates pass.
5. If blocked, record the exact missing artifact/access/third-party response, the searches/checks attempted, what evidence was recovered, and the single next corrective action. Do not invent identifiers or mark unresolved work complete.
6. Update this handover after each material execution, monitoring result, failure or newly confirmed dependency. Commit the handover change and any safe staging artifact; report the exact commit and links.
7. Do not deploy, upload to Axxess, change DNS, write production data, execute the unsafe SQL, or change payment settings until the documented release gates pass. PayFast and PayJustNow remain deferred as instructed.
8. At release, record the exact source commit/build identifier and deployed version only after deployment succeeds; then record post-upload smoke-test evidence. If no deployment occurred, explicitly state that there is no new deployed version.

### Current accountability checkpoint — 2026-10-14
- Latest handover checkpoint was committed as 1cd8734980063bd3a5bc1cae2f5ac713a33ee446.
- Repository search did not find the revised 800-row category mapping CSV committed on the default branch; the Library search did not return the CSV itself. The prior handover describes a local generated file, but its exact six low-confidence rows cannot be reliably recovered from available results in this session. This is an artifact-recovery failure, not a completed six-row resolution.
- Current category evidence is insufficient to safely name and correct the exact six exceptions. Next action is to recover/materialize the precise CSV from the original artifact, or regenerate it from the authoritative 800-row workbook and validate it. Then resolve the six exact rows using SKU, full description, source heading/page and defensible product-family evidence, preserve source headings, and keep all rows staging-only.
- Catalogue SKU/description/cost reconciliation remains blocked by known source join errors; all 800 candidate rows remain import-ineligible. Image/usage rights, current prices for the 38 flagged live SKUs, Axxess DNS/SSL verification, complete QA and staged-to-live delta/rollback ledger remain open as listed above.
- No production data or settings changed, no deployment occurred, and no new deployed version exists from this continuation.
- Automated background execution/continuous monitoring has not been verified as currently running. Do not claim it is running unless a configured schedule/workflow and current run evidence are checked and recorded.
- Customer launch remains HOLD. Planning estimate: 6–10 focused work sessions after source/evidence is available, plus supplier/Axxess response and propagation time; calendar date unknown.



## PERMANENT OWNER DIRECTIVE — NO MORE PLANNING-ONLY RESPONSES; ACTIVE EXECUTION BLOCKS (2026-10-14)

Owner stated: “Yet you continue to update me with useless data and nonsense explaining and still you refuse to execute my instructions...” Owner requests 15 minutes of continuous task execution, frequent handover updates, and an estimate of what can be completed in two hours. Preserve this feedback as an execution requirement, not as a reason to send reassurance in place of work.

### Required behavior
- During each active session, execute concrete work continuously while tools and evidence are available. Do not stop after updating the handover or repeat the same blocker summary when there is a viable artifact-recovery, validation, code or staging action to attempt.
- Use short execution batches with measurable outputs; after each material batch, commit the handover and continue to the next unfinished task within the active session.
- Prioritize recovery of the missing 800-row mapping and exact six exception records, then perform deterministic row-level category corrections, validate row counts and unique SKUs, and continue the source SKU/description/cost/formula audit. Keep all work staging-only and import-ineligible.
- Inspect existing SQL/CSV/workbook and Library artifacts before claiming a source is unavailable. If an exact artifact is missing, recover its data from a verified source artifact where safe, document the provenance, and label the reconstruction accurately; do not treat the unsafe SQL as executable or production-ready.
- Every checkpoint must say what was actually executed, counts before/after, artifact paths/commit links, validation outcomes, failures and the next concrete action. Do not pad the response with explanations that are not paired with work.
- Two-hour estimate must be capacity-based, not a guarantee: with source artifacts accessible, target to recover and validate the 800-row staging map; resolve all six category exceptions if source evidence is sufficient; produce row-count/uniqueness/required-field and price-formula audits; and prepare/commit a corrected staging artifact plus updated handover. If evidence or permissions block any task, complete independent audits and record the exact residual blocker. Do not promise completion of supplier-dependent price confirmation, image-use permission, Axxess response, deployment or release within two hours.
- No deployment, production data write, unsafe SQL execution, DNS/payment change or customer launch without the documented release gates passing. PayFast/PayJustNow remain deferred.

### Current active execution record
- Repository mapping CSV search returned no committed mapping file. A Library semantic search located the archived September import SQL, which contains a JSON product payload and can be used as a read-only recovery source for row identities/category evidence, not as SQL to execute. A recovery summary also states that a separate reconstructed 800-row staging candidate was derived from the reconciled inventory workbook and is not the original September candidate.
- Next action in this session: inspect the archived SQL payload read-only to extract the exact six low-confidence New Arrivals records; recover or regenerate a separate staging CSV from a verified data artifact; run structural validation and document any source limitations. No production writes.



## ACTIVE EXECUTION CHECKPOINT — 2026-10-14 19:30 SAST

Owner requested a 15-minute continuous execution block, no planning-only replies, permanent handover tracking, and a realistic estimate of two-hour output. This checkpoint records actual work executed in this session.

### Work executed and validated
1. **Recovered the 800-row source payload read-only.** Materialized the archived Library file `Get_Wired_AutoWorx_800_PRODUCT_IMPORT-1.sql` and parsed only the JSON payload between its `$catalog$` delimiters. The SQL was not executed. This is a recovered source snapshot, not the missing original revised mapping CSV and not a production-safe import.
2. **Rebuilt a separate staging mapping file** at `/mnt/data/Get_Wired_AutoWorx_800_Mapping_RECOVERED_STAGING_2026-10-14.csv` and a validation report at `/mnt/data/Get_Wired_AutoWorx_800_Recovery_Audit_2026-10-14.txt`. The CSV includes original SKU/name/description, source heading/page, original category slug, proposed top-level/subcategory, mapping rationale/confidence, price and image evidence flags, formula candidate marked non-current, sale gate and import gate.
3. **Structural validation:** 800 rows; 800 unique SKUs; 0 duplicate rows; 0 missing SKUs; 0 missing product names. `Import_Eligible=False` and `Staging_Only=True` for all 800 rows.
4. **Recovered New Arrivals:** 17 exact rows on source page 3 were identified. Proposed staging family placements now cover 16 rows: 2 Seaflo bilge pumps → Marine Spares & Accessories > Bilge Pumps; Velcro pad 560102 → Tools, Hardware & Consumables > Abrasives & Consumables; NO-001-24V-NB radiator fan → Auto Electrical Spares > Cooling Fans (application confirmation still needed); STUD1005 Toyota Land Cruiser wheel stud → Automotive Accessories > Wheel Hardware / Vehicle Spares (taxonomy remains provisional); two SFCBS battery isolators → Auto Electrical Spares > Battery Isolator Switches (application not stated); ten wheel nut-cover variants → Automotive Accessories > Wheel Accessories / Wheel Nut Covers. SFDP1-015-080-31 high-pressure 12V water pump remains an explicit application-review exception because the recovered row does not state the application. These are newly reconstructed row-level decisions; do not claim they are byte-for-byte the six original low-confidence flags, because the original revised CSV itself was not recovered.
5. **Pricing safety audit:** 791 rows have positive historical cost values and all 791 archived candidate selling prices fail the required full formula `round(cost_ex_vat * 1.15 * 1.35, 2)` when checked in the same raw numeric units; the archived candidate values are not current supplier price confirmation. Nine rows have blank/zero cost and are the known quote-only SKUs: M501WCC, A1-002, A1-003, MA330, MA342, MA342/2, N-FC001, WP25, N-CP002. The unsafe SQL payload marks these nine rows active despite absent price fields; this is a concrete reason it must never be executed. All nine are explicitly flagged `QUOTE_ONLY_UNPRICED_EXCLUDE_FROM_SALE` in the recovered staging CSV.
6. **Image gate:** 800/800 rows have no image path in the recovered SQL payload. This is not proof no image exists elsewhere; it means this payload provides zero image-path evidence. All remain image-unverified and rights-unverified.
7. **Proposed top-level counts in this reconstruction only:** Automotive Accessories 407; Tools, Hardware & Consumables 243; Auto Electrical Spares 106; Car Audio & Entertainment 38; Marine Spares & Accessories 6. The recovered payload's existing category slugs cover only these five proposed groups; the other three approved storefront categories have zero rows in this reconstruction. Do not treat these as final approved category counts or as full source-page verification.
8. **Artifact persistence:** uploaded the text audit successfully to Library as `Get_Wired_AutoWorx_800_Recovery_Audit_2026-10-14.txt`. CSV upload and compressed ZIP upload both failed because the Library storage limit is reached. The CSV and ZIP remain in the active working container; verified paths are recorded above. Do not claim the CSV is committed to GitHub or persisted in Library. A download link can be provided from the verified container path in the active conversation.
9. **Automation check limitation:** attempted a GitHub Actions API read through the generic fetch connector, but the connector rejected the API URL as not an allowed endpoint. Therefore this session did not verify whether any schedule/continuous monitoring is active. No new workflow was launched and no background execution is claimed.

### Current blocker status after this execution block
- The missing original revised category CSV was not found in the repository search. The recovered CSV is a labelled reconstruction from the archived SQL JSON payload, not the exact original artifact.
- The original six low-confidence row identities cannot be proven against the missing CSV. The recovered 17 New Arrivals rows have new proposals, but SFDP1-015-080-31 remains an application-review exception and STUD1005 remains taxonomy-provisional. Continue by recovering the original mapping if possible or use this reconstruction with explicit provenance and do not claim exact original exception closure.
- All 800 rows remain import-ineligible. Price formula/current-price gate, exact image matching/rights, category/source-page validation, Axxess DNS/SSL, full storefront QA, live delta/rollback and controlled release remain open.
- No production data write, SQL execution, Axxess upload, deployment, DNS change or payment-setting change was performed. PayFast/PayJustNow remain deferred. No new deployed version exists.

### Two-hour execution estimate (capacity, not a guarantee)
If the current source artifacts remain accessible, two focused hours can reasonably target: (a) validate and refine the reconstructed 800-row mapping; (b) complete source-evidence decisions for the remaining New Arrivals application/taxonomy rows where the archived source and product descriptions support it; (c) generate a row-level 800-SKU cost/formula/quote-only audit and duplicate/missing-field report; (d) compare against the exact 38-SKU price-hold queue; and (e) commit the resulting safe staging artifacts and update this handover. Supplier price confirmation, image-use rights, Axxess response/propagation, complete deployment QA and production release cannot be promised within two hours because they depend on external evidence/provider action and must pass release gates. The CSV is currently not committed to GitHub due the available tool path not supporting direct transfer of the generated local file contents in this session; do not imply otherwise.

### Immediate next execution order
1. Use the recovered staging CSV and authoritative source PDFs to verify the six original exception identities if they can be recovered; otherwise explicitly rename them as reconstruction exceptions and preserve provenance.
2. Resolve the remaining SFDP1 application question from the source guide/product application; resolve STUD1005's taxonomy using source heading and owner-approved scope, without mislabelling it electrical.
3. Produce a clean row-level cost/formula and quote-only safety audit; never execute the unsafe SQL or import the candidate prices.
4. Continue exact-SKU image matching and rights checks, supplier current-cost requests, and independent Axxess QA.
5. Commit each actual result and update the handover after the batch; release only when gates pass.



## EXECUTION UPDATE — EXACT 800-ROW COST JOIN COMPLETED (2026-10-14 19:40 SAST)

### Concrete result
- Parsed the historical 4,186-row catalogue SQL as read-only source data and joined it against all 800 rows in the archived 800-row candidate. The 4,186-row SQL was not executed.
- Exact SKU joins: **791/800**. The remaining **9/800** are the established quote-only SKUs (M501WCC, A1-002, A1-003, MA330, MA342, MA342/2, N-FC001, WP25, N-CP002).
- On the 791 joined rows, **791/791 product descriptions match exactly** and **791/791 source page numbers match exactly** between the archived candidate and the 4,186-row historical reference.
- The 38-SKU price-hold register was also joined: **38/38 exact SKUs match the 800-row candidate**, and the candidate costs match the register's historical September costs for all 38.
- **753 rows** in the archived JSON payload have cost values 100x the historical Rand costs in the 4,186-row reference. The other **38** belong to the separate 38-SKU hold list and their costs match that hold register; the older 4,186-row SQL stores these 38 at approximately 1/100 scale, so use the dedicated hold register as the historical source for this subset. This confirms a mixed-scale data defect and is not authorization to update production.
- Archived selling-price values are VAT-only (`cost × 1.15`) on **791/791** matched rows; the required customer-price calculation is `round(cost_ex_vat * 1.15 * 1.35, 2)`. Historical September prices expired 2026-09-30, so computed outputs remain non-current mathematical candidates only.
- Generated `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_STAGING_2026-10-14.csv` and `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_AUDIT_2026-10-14.txt`. The CSV contains exact join status, source descriptions/pages/headings, chosen historical cost source, scale action, formula status, quote-only status, and false import/current-price/image-rights gates for every row.
- Validation: 800 rows; 800 unique SKUs; 791 exact matches; 9 quote-only no-match rows; 0 description mismatches among matched rows; 0 source-page mismatches; 38/38 held costs match the separate hold register; 0/800 import-eligible.

### Required interpretation / release hold
This is meaningful staging reconciliation progress, not customer-ready pricing. The 753 scale corrections and 38 historical cost matches are derived from expired guide evidence; current supplier price confirmation remains required for all 791 priced rows selected for any release. The 38 flagged products remain held until supplier confirmation. The nine quote-only SKUs must remain blank and excluded from sale. All 800 still lack verified image paths in the archived payload; image permission and exact SKU-to-image checks remain open. The missing original revised mapping CSV has not been recovered, so the reconstructed mapping remains labelled as such and the six original low-confidence row IDs cannot be claimed resolved exactly. No production write, SQL execution, deployment, Axxess upload, DNS change or payment setting change occurred.

### Artifacts
- Reconstructed 800-row staging mapping: `/mnt/data/Get_Wired_AutoWorx_800_Mapping_RECOVERED_STAGING_2026-10-14.csv` (800 unique rows; all staging-only).
- Exact historical SKU/cost reconciliation: `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_STAGING_2026-10-14.csv`.
- Exact join audit: `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_AUDIT_2026-10-14.txt`.
- Library storage limit blocked persistence of the 492 KB CSV and its ZIP. The exact files are present in the current working container; do not claim they are committed to GitHub or persisted in Library.

### Next action
Continue exact source/image review and fix the six original mapping exceptions only if their original identities can be recovered; otherwise track the reconstructed New Arrivals decisions as separate, provenance-labelled corrections. Build the image-to-SKU crosswalk and prepare current supplier price confirmations. Keep release held until current prices, images/rights, category gates, Axxess DNS/SSL, full QA, live delta and rollback pass.


## CORRECTION / LATEST STAGING ARTIFACT STATE — 2026-10-14 19:45 SAST

- The recovered mapping CSV was updated after cross-checking the 4,186-row historical catalogue. STUD1005 is now placed under Automotive Accessories > Wheel Accessories because adjacent STUD10xx wheel-stud source records explicitly use WHEEL ACCESSORIES. SFDP1-015-080-31 now has a provisional staging placement under Marine Spares & Accessories > Water Pumps based on the SF product-family and adjacent Seaflo pump records; its marine/RV application still requires confirmation before product approval.
- New Arrivals rows: 17/17 now have a staging category proposal. This does not mean the original six low-confidence flags were recovered byte-for-byte or that product approvals passed. Source/application confirmation notes remain on selected families.
- Updated recovery audit: `/mnt/data/Get_Wired_AutoWorx_800_Recovery_Audit_2026-10-14.txt`. Updated exact cost join artifacts: `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_STAGING_2026-10-14.csv` and `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_AUDIT_2026-10-14.txt`.
- Created combined local pack `/mnt/data/Get_Wired_AutoWorx_800_Staging_Recovery_Pack_2026-10-14.zip` containing the recovered mapping, recovery audit, exact historical cost join CSV and cost audit report. The files exist in the current working container; Library storage limit prevented CSV/ZIP persistence, and these generated data files are not committed to GitHub. Do not claim otherwise.
- Verified core counts remain 800 rows / 800 unique SKUs / 0 import-eligible; exact historical join 791/800, 791/791 description matches, 791/791 source-page matches, 38/38 historical hold-register cost matches, 753 historical source costs requiring scale normalization, 791 archived candidate prices VAT-only, and 9 quote-only rows kept excluded. All 800 lack image paths in the recovered payload.
- Customer launch and reconciled-catalogue live testing remain on hold. No production writes, SQL execution, deployment, Axxess upload, DNS change or payment-setting change.


## FORMULA-TO-SOURCE CROSS-CHECK — 2026-10-14 19:50 SAST

- Added formula-vs-historical-price checks to the 800-row reconciled staging CSV. For the 753 rows whose 4,186-row historical reference is on the comparable Rand scale, the required full formula matches the historical advertised price on **750 rows**; **3 one-cent exceptions** remain: `KT1035CB14`, `EX908-18`, `GH-581`. These are historical rounding/source differences and must be preserved for review rather than bulk-overwritten.
- The 38 held SKUs are excluded from comparison to the 4,186-row SQL advertised price because that source has a confirmed approximately 1/100 scale defect for this subset. Their historical costs match the separate price-hold register 38/38; current supplier confirmation is still outstanding.
- Nine quote-only SKUs remain unpriced and excluded. Across the entire 800-row candidate: 0 import-eligible; 0 current supplier price confirmations; 0 verified image paths in the recovered payload.
- Updated files in the working container: `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_STAGING_2026-10-14.csv`, `/mnt/data/Get_Wired_AutoWorx_800_RECONCILED_HISTORICAL_COST_AUDIT_2026-10-14.txt`, and `/mnt/data/Get_Wired_AutoWorx_800_Staging_Recovery_Pack_2026-10-14.zip`. Library storage limit still blocks the large CSV/ZIP upload; the text audit from the earlier recovery checkpoint is in Library. Generated CSV/ZIP files are not committed to GitHub.
- No production changes, SQL execution, deployment, DNS change or payment-setting change. Release hold remains in force.
