# Get Wired AutoWorx — Catalogue and Preview Status
**Updated:** 2026-11-03  
**Repository:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store  
**Canonical review:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/168  
**Candidate branch:** `integration/three-category-catalogue-preview-final-2026-11-03`  
**Exact PR head checked:** `77322ca93f13a6dfa4e3ebffb02d290aff0c5aa9`  
**Main head checked:** `a50ff4e193ca46072958cc3451c884620d07263e`

## Owner's standing instructions — protected
- Streamline all Work
- Don't work in circles and waste time
- Don't notify me with what you are going to do next, instead continue until successfully resolved
- Work smart and not hard
- Find solutions when there are problems and don't stop until successfully resolved
- Notify me only when user input is needed
- Always read handover file and execute exactly as instructed.
- Always update handover.

Do not edit, shorten, reorder, or remove these instructions without the owner's explicit permission.

## Verified catalogue source state
- **Planetworld:** 3,317 source records; 3,135 unique browse rows; 702 rows with `division === "Car Audio"`.
- Planetworld collections: Home Entertainment 461; Car Audio & Video 627; Band & Live Sound 792; Musical Instruments 850; Installed AV 435; DJ 15; Harnesses & Trims 47; Studio Equipment 62; Marine Audio 28. Total 3,317.
- **Audio Connections:** 66 review records from 68 source rows; two rows excluded pending review; all 66 marked `PREVIEW_ONLY_NOT_LIVE`; four image URLs on catalogue rows.
- Exact-model review set: 68 rows, 21 image URLs: 8 visually verified Audison images, 4 official Kicker product-page candidates not visually verified, and 9 pre-existing candidates. Image candidates are not blanket approval for publication.
- Category tree: 27 records; exactly three active top-level roots in the requested order: Car Audio / Home Entertainment / Lifestyle; Auto Electrical Parts & Spares; Car Care & Accessories.
- Supplier identities and dealer costs/supplier SKUs must remain private in customer-facing assets. No public product import or Supabase write was made.

## Exact-head verification and blockers
- PR #168 is **draft/open/unmerged**.
- Cloudflare Pages Public Package QA run `41614133122`, job `125843198256`, failed before runner assignment. The job has no runner ID, steps, or logs. Therefore **no Node tests or package build ran**; do not claim application tests passed or failed.
- No exact-head hosted non-production Pages preview deployment is verified. Older preview URLs do not prove this head is deployed.
- Do not trigger the isolated Pages deployment marker, production/release workflows, or any production change while runner allocation is unavailable.
- Functional/browser/checkout testing remains deferred until the owner adds banking details, per owner instruction. Continue catalogue/storefront work without blocking on payments.
- Production remains **HOLD**. No merge, production deployment, Axxess upload, DNS/payment change, live stock/price change, or live data write is authorized without explicit owner approval.

## Next work, in order
1. Restore/confirm GitHub Actions runner allocation or use an available trusted environment to execute exact-head checks.
2. Run the public-package builder, the ASC catalogue, audio catalogue, and three-category structural Node tests, plus the public SKU/privacy audit.
3. After checks pass, deploy only a dedicated non-production preview and verify the deployed commit and rendered category/catalogue routes.
4. Record unresolved image gaps and preview limitations for owner review. Keep PR #168 draft until exact-head tests, verified preview, and owner acceptance are evidenced.

## Relationship to earlier handover
This file is a dated status supplement. The large `HANDOVER_2026-11-02_OWNER_CONTINUATION.md` contains historical notes and older PR/branch references; this document supersedes those references only for the current catalogue/preview checkpoint. Preserve its protected owner-instruction block.


## Follow-up execution attempt — 2026-11-03
- Verified the current draft PR #168 head is `581deae0428126badcb90c0d1148e8a8c3309259`; main is `a50ff4e193ca46072958cc3451c884620d07263e`. PR remains open, draft, unmerged.
- The exact-head Cloudflare Pages Public Package QA run `41618453591` failed. Its job `125861439639` has no runner ID, no step records, and no logs. A targeted retry of the preceding failed job was accepted by GitHub but the new attempt again ended failed before any steps could run. No application test result was produced.
- GitHub's log endpoint returned a missing log blob for the job, consistent with no runner output. The local container also cannot resolve github.com, so a local clone/test run is unavailable from this execution environment.
- No deploy was attempted, no deployment marker was created, no merge occurred, and no production or live-data change was made. This remains an infrastructure execution blocker, not proof that application code failed tests.
- Next required action is to restore repository/account GitHub Actions runner allocation or provide a trusted environment with repository checkout/network access. Once available, execute the existing public-package build, all catalogue/category Node tests, and public SKU/privacy audit on the exact PR head; then verify a dedicated non-production preview against that same commit. Until then, preview readiness is NOT VERIFIED.


## Runner recovery diagnostic added — 2026-11-03
- Added `.github/workflows/runner-diagnostic-current-branch.yml` on the candidate branch at commit `c239878aedff4c963af3c7c03d3b4c425703d965`. It is restricted to the candidate branch / PR path and is intended to confirm runner execution and validate the three-root category structure plus non-empty Planetworld and Audio Connections preview catalogues.
- The GitHub connector's PR-only workflow-run/status queries returned no associated PR run/status for this push commit; they do not expose a confirmed execution result for this push-triggered diagnostic. Therefore runner recovery is still **not verified** and the diagnostic must not be described as passed.
- No deployment or production action was taken. Keep PR #168 draft/unmerged until an actual run, tests, and same-head non-production preview are evidenced.


## 2026-11-03 RUNNER FAILURE ROOT-CAUSE INVESTIGATION — VERIFIED
- Re-read current PR #168 metadata: open/draft/unmerged, head `47841be7db8a1495645ae414e60da1438c4ee994`, base `a50ff4e193ca46072958cc3451c884620d07263e`. Earlier head references in this file are historical and must not be treated as current.
- Queried the GitHub Actions run collection directly for this candidate branch. Eight runs are recorded. All eight ended `failure` within seconds; latest two runs at current head `47841be7db8a1495645ae414e60da1438c4ee994` are Cloudflare Pages Public Package QA run `41620625294` and Runner Recovery Check run `41620625281`.
- Retrieved the underlying GitHub job records. Current-head runner diagnostic job `125865096136` and package QA job `125843198256` report `runner_id=0`, empty runner name, empty runner-group ID/name, and `steps=[]`. Diagnostic push run `41620557596` likewise failed in ~4 seconds with no steps. This proves the failure occurs before a GitHub-hosted runner is allocated; no checkout, setup, build, Node test, or catalogue assertion ran. It is not an application test failure.
- Repeated pattern across both the minimal runner diagnostic workflow and the package QA workflow, on both push and pull_request events, rules out a single workflow script/test as the cause. The connected GitHub integration does not expose runner provisioning, Actions billing/usage, repository Actions settings, or a workflow-dispatch/re-enable operation. No permission to change account billing or Actions settings is available through this connection. Do not claim a confirmed billing cause; likely fault domain is repository/account Actions runner provisioning or Actions availability/policy.
- Job log endpoint returns BlobNotFound and job records contain no step output, consistent with no runner process ever starting. No app-level diagnostic log exists to inspect.
- The runner diagnostic workflow itself is correctly scoped to this candidate branch and includes a minimal ubuntu-24.04 job; it also fails before the first step. Repeated reruns/commits will not fix a runner allocation fault and should stop until GitHub Actions runner service is restored.
- **Action required outside the connected GitHub API:** owner/repository administrator must open GitHub repository Settings → Actions → General and verify Actions are enabled and allowed actions/runners are not restricted; inspect account billing/usage and any spending limit/plan or concurrency restriction; then check GitHub Actions service status/support if settings and billing are normal. This is the specific external access boundary preventing automated recovery from this connection.
- Catalogue source integration remains staged in PR #168, not merged or published. Counts recorded in PR: Planetworld 3,317 source rows / 3,135 unique browse rows / 702 Car Audio division rows; Audio Connections 66 review rows from 68 source rows; ASC six PDFs / 50 exact visually reviewed pilot records. All supplier data remains review-only. No hosted exact-head preview verified.
- No changes to production, live catalogue, prices, stock, Supabase, DNS, payments, or Axxess. PR remains draft/unmerged. Do not claim catalogue integration verification is complete until runner allocation works, exact-head tests pass, and the dedicated non-production preview is verified.


## 2026-11-03 PR #168 OWNER PREVIEW MILESTONE — LIVE RECHECK
- Owner's immediate milestone is a genuinely browsable staging store built from the exact PR #168 head, not another static-check report. Keep PR draft/unmerged and production HOLD.
- Re-read PR #168 through GitHub at 2026-11-03 13:55 SAST: open/draft/unmerged; branch `integration/three-category-catalogue-preview-final-2026-11-03`; head `9387fef2096f63787f3c70849a2e29721d564a3c`; base `main` at `a50ff4e193ca46072958cc3451c884620d07263e`; mergeable reported false. The PR head has advanced repeatedly; always re-read before claiming a preview matches it.
- Latest current-branch runner diagnostic run `41631977184`, job `125903577673`, on head `9387fef2096f63787f3c70849a2e29721d564a3c`, failed in about two seconds before runner allocation: `runner_id=0`, no runner name, no steps. This is not an application-test result; no checkout, package build, Node test or browser test ran.
- Existing `.github/workflows/publish-approved-storefront-preview.yml` is NOT a valid PR #168 preview path: it triggers only on a special marker branch and checks out `main`, then deploys to Cloudflare Pages branch `approved-storefront-preview`. It would publish main, not the PR candidate. Do not trigger it.
- Existing `.github/workflows/cloudflare-layout-preview.yml` also checks out `main` and deploys to Cloudflare. Do not trigger it. Production deploy workflow is manual-only and must not be used for this milestone.
- Cloudflare Pages Public Package QA builds an isolated allowlisted preview package only when a runner exists; it does not itself publish a hosted URL. A separate exact-head staging deployment path would need to be deliberately implemented and owner-authorized. Do not spend Cloudflare credits or publish to Axxess/Netlify without explicit approval.
- No connected GitHub action is available to alter Actions account billing, runner restrictions, or dispatch a workflow. Owner/admin action required: repository Settings → Actions → General; verify Actions are enabled and allowed actions/runners are not restricted; inspect account billing/usage/spending limits. Do not assert billing is the cause until checked.
- No hosted staging URL for exact PR #168 head is currently verified. Older Cloudflare previews are stale/unproven. No production, DNS, Axxess, payment, Supabase, catalogue or live-data changes were made.
- Next gate: restore runner allocation (or provide a trusted checkout/build environment), run exact-head allowlist build + ASC/audio/three-category tests + public SKU/privacy audit; then create a dedicated preview from the exact PR head on an explicitly approved non-production host and verify the deployed SHA, mobile/desktop navigation, catalogue routes, images, no page errors, and no writes. Keep the preview noindex and checkout-disabled until owner approval.


## 2026-11-03 PR #168 RUNNER TROUBLESHOOTING RECHECK

- Re-read PR #168 live: open, draft, unmerged, mergeable=false; branch `integration/three-category-catalogue-preview-final-2026-11-03`; head at this check `bbccdbd53386955d48f4e65b1b4abad1a5fe103a`. 129 commits, 86 changed files. Do not assume this SHA remains current after any further branch update.
- Latest diagnostic workflow run `41632168476`, job `125904198809`: completed failure; `runner_id=0`, no runner name, no steps, no logs URL. Attempt to retrieve job logs returned BlobNotFound. This confirms failure before execution, not a source/build/test failure.
- Repo is private. Connected GitHub app has admin/maintain/push permissions. This does not expose account-level billing or Actions runner policy settings.
- GitHub documentation confirms private-repository Actions compute is subject to plan included usage and may be blocked after included compute is exhausted if no valid payment method is on file; this is a possible cause only, not yet confirmed. Check account Billing & licensing → Usage (Actions compute/storage) and Budgets/spending limits before changing payment settings.
- Owner/admin must inspect repository Settings → Actions → General: confirm Actions are enabled and allowed actions/workflows policy permits this repo. Also inspect organization/account Actions runner restrictions if applicable. Since workflow uses `runs-on: ubuntu-latest`, do not create or switch to a self-hosted runner as a speculative fix.
- Current deploy workflows were re-read: production Cloudflare workflow is manual-only and deploys `main`; the isolated preview workflow checks out `main`; layout preview also checks out `main`. None is valid for PR #168 exact-head staging. Do not trigger them or spend Cloudflare credits.
- Required owner evidence: screenshot of repository Settings → Actions → General showing Actions permissions and runner policy; separately check account Billing & licensing → Usage/Budgets. Redact payment details. After settings are confirmed, retry a small non-deploy diagnostic on the exact latest PR head, then run the allowlisted package build/tests. Do not merge or deploy production.


## 2026-11-04 OWNER CONTINUATION — PLANETWORLD + AUDIO CONNECTIONS

### Baseline and release controls
- PR #168 remains the sole forward-working baseline: `integration/three-category-catalogue-preview-final-2026-11-03`. PR #169 remains excluded. Keep PR #168 draft/unmerged.
- The approved homepage uses exactly the three startup roots. Preserve the single Car Audio & Video department path and the separate Harnesses, Trims & Fitment button/group. Every subpage keeps the shared homepage shell.
- Production remains HOLD. No merge, production deployment, Axxess upload, DNS/payment change, Supabase write, live stock/price/category update, or supplier activation is authorized.

### Exact preview evidence
- Cloudflare Pages reported a successful deployment for exact PR #168 commit `f3e7ea241e185e02f61d171313b012aaf46710d7`, deployment `c250f5bc-01ad-4b3d-a015-1835c042f048`.
- Owner preview: https://c250f5bc.get-wired-autoworx-store.pages.dev/owner-preview.html
- Audio catalogue: https://c250f5bc.get-wired-autoworx-store.pages.dev/preview-audio.html
- Planetworld catalogue: https://c250f5bc.get-wired-autoworx-store.pages.dev/preview-planetworld.html
- This is a Pages deployment, distinct from the separate Cloudflare Workers build, which failed. The external page reader could not independently fetch the pages.dev routes; desktop/mobile browser acceptance and owner visual acceptance are still outstanding.
- GitHub Actions has not produced an executable runner/test result; previous jobs failed before runner allocation with runner_id=0 / no steps. Do not label this an application-test failure or repeat blind retries.

### Audio Connections supplier wattage — owner direction and source reconciliation
- Owner instruction: use Audio Connections' supplied wattage as the authority for its dealer catalogue; do not substitute public manufacturer/retailer marketing claims where they conflict with the supplier's supplied specification.
- Source files reviewed: `STARSOUND Price Lists 05 AUGUST 2026.pdf` and `Sony Mobile ES Dealer Price List Sept 26.pdf` from the Library.
- Owner-confirmed resolution for `SSA-ATOM13800.4`: **100 W RMS nominal ×4**. The 13,800 figure is marketing/maximum, not RMS; do not substitute the public Starsound 80 W RMS claim.
- Updated preview-only record `ac-040` in `assets/audio-connections-catalogue-preview.json` to display “100 W RMS nominal ×4” in its title and description. This change is on the PR #168 branch at commit `accd2392ecb9bea8838face3e1223db867dfe155`; a new exact-head Pages deployment is pending verification. No supplier identity, supplier SKU, cost, stock or live data was exposed or changed.
- Other evidence conflicts remain controlled and must not be silently “corrected” from public listings:
  - `SSW12-6300`: supplier list says 300 W; public manufacturer evidence says 400 W RMS. Retain supplier's 300 W value; do not relabel it RMS.
  - `SSAR 22000.1`: supplier list says 1700 RMS; public manufacturer evidence says 1800 W RMS at 1 Ω. Retain supplier's 1700 W RMS.
  - `SSA-R 5000.4`: supplier list text is truncated as “60RM”; public evidence says 65 W/channel at 4 Ω. Keep the source transcription flagged for clarification; do not infer the missing characters.
  - `SSA-SB2000.1`: official page's specification-table model is `SSAD-SB-2000.1`; exact variant identity remains unresolved.
  - `SSW8”-8000D2` and `SSS6501 PRO`: available evidence is retailer-only, insufficient for manufacturer verification; keep claims conservative and review-only.
- Use the Sony supplier PDF for Mobile ES wattage specifications; preserve separate peak and RMS values and channel/impedance conditions exactly as supplied. Do not infer wattage for products where the source gives none.

### Catalogue state at this checkpoint
- Planetworld: 3,317 source rows; 702 Car Audio division rows; 47 Harnesses & Trims records; 28 Marine Audio records; 3,135 unique browse rows per the source audit. Exact-model enrichment is a separate 68-record set with 61 image URLs, not full-catalogue image coverage.
- Audio Connections: 66 retained preview records from 68 source rows; 2 excluded pending review; 13 proposed GW SKUs and 53 without proposed GW SKUs; 4 image URLs. All 66 remain `PREVIEW_ONLY_NOT_LIVE`. The source lists provide power ratings only where explicitly stated; do not invent missing wattage.
- Keep supplier names, dealer costs and supplier identifiers out of customer-facing catalogue assets. Proposed GW SKUs remain review-only and are not inserted into live systems.
- The 66 Audio Connections records and 3,317 Planetworld records remain staging/review data only. No imports or Supabase writes.

### Immediate next actions
1. Verify the Pages deployment for the latest post-wattage-correction PR #168 head; capture the exact SHA, deployment URL and build result.
2. Review the Audio Connections page for the owner-requested single Car Audio & Video route and separate Harnesses, Trims & Fitment button; check wattage display for the owner-confirmed SSA-ATOM13800.4 value.
3. Continue exact-model image and GW SKU reconciliation using supplier source evidence; do not fabricate missing images/SKUs or alter prices/stock.
4. Keep the next supplier milestone blocked until Planetworld + Audio Connections pilot meets owner expectations. ASC and Electro-city remain later workstreams.
5. Update this handover with the next verified exact-head deployment and any remaining evidence gaps. Do not claim readiness without exact-head tests, a verified preview, and owner acceptance.


## 2026-11-04 AUDIO FITMENT FILTER CORRECTION — EXACT SOURCE SCOPE

- A read-only audit found the prior keyword classifier was too broad: it grouped generic wiring/installation accessories and Audio Connections amplifier installation kits into “Harnesses, Trims & Fitment”. The broad filter matched 214 Planetworld rows (183 even after removing generic installation/wiring keywords), not the owner's intended 47-row source collection.
- Corrected `preview-audio.html` so “Harnesses, Trims & Fitment” is driven only by the dedicated Planetworld `collection === "Harnesses & Trims"` / explicit `component === "Harnesses, Trims & Fitment"` classification.
- Exact source count verified: 47 Planetworld rows; 7 Audio Connections amplifier installation-kit records are excluded from this dedicated fitment group.
- Added regression assertions to `tests/three-category-storefront-structure.test.cjs` requiring exactly 47 dedicated Planetworld records and zero generic Audio Connections installation-kit records in the group.
- Code commits: wattage correction `accd2392ecb9bea8838face3e1223db867dfe155`; exact fitment classifier `9c0f1ae1e179e016271700266fdd013a340cc94d`; regression test `5317e1118c2e5ab98b8c41f716b228f6584b5eab`.
- The prior confirmed Pages deployment `c250f5bc` is for the earlier `f3e7ea2` head and does **not** include these subsequent data/classifier/test changes. The new branch head must receive a fresh successful Pages deployment before the updated preview is represented as current. The owner preview remains noindex and checkout-disabled; do not use the stale preview as acceptance evidence.
- No production deployment, merge, Supabase write, live catalogue import, price/stock change, Axxess or DNS/payment change was made.


## 2026-11-04 LATEST PAGES PREVIEW RECHECK

- Cloudflare Pages confirmed **Deploy successful** for functional candidate commit `ea5cce0d680ea7636a819e2420e20cfd7f09fd24`.
- Deployment/preview host: `https://b6ac37ec.get-wired-autoworx-store.pages.dev`
- Owner route: `/owner-preview.html`; Audio Connections route: `/preview-audio.html`; Planetworld route: `/preview-planetworld.html`.
- Branch alias: `https://integration-three-category-c.get-wired-autoworx-store.pages.dev`.
- The deployment includes the SSA-ATOM13800.4 supplier wattage correction, exact 47-row fitment classifier, and regression assertions. The subsequent branch commit `bc926324889339b4442daae94c653efe2285850c` only refined an inert source comment to prompt a fresh staging rebuild; it made no functional change. Do not describe the preview as exact-head for `bc926324` unless Cloudflare confirms that SHA.
- The Pages build success is deployment evidence, not owner visual acceptance or desktop/mobile browser acceptance. The external page reader remains unable to retrieve the pages.dev content in this session. GitHub Actions runner allocation is still not verified.
- No merge, production deployment, live data write, payment, stock, price, DNS or Axxess change.


## 2026-11-04 OWNER CORRECTION — ONE COMBINED CAR AUDIO & VIDEO CATALOGUE

- Owner clarified the required structure: **all Car Audio & Video products from Audio Connections and Planetworld are together in one customer-facing subcategory**. Do not create supplier-specific Car Audio catalogue branches or separate supplier brand lists. Supplier identity is internal sourcing metadata only.
- Customer route: combined root `Car Audio / Home Entertainment / Lifestyle` → `Car Audio & Video` → one merged brand list → product family/subcategory → matching products. A brand (e.g. Sony, Alpine, JBL, Pioneer, Kenwood) must show records from both suppliers together where available.
- Confirmed source assets: Planetworld catalogue contains 3,317 records (including 702 Car Audio division rows); Audio Connections contains 66 Car Audio rows. The existing audio page already fetches Planetworld, exact-model enrichment and Audio Connections data, and combines them in one array. The customer navigation had not made this unified journey sufficiently clear, and a separate Planetworld review page exposed supplier-location stock and duplicated the impression of a separate supplier catalogue.
- Changes made on PR #168 branch:
  - `index-new.html`: changed the Car Audio navigation child label from “Browse Car Audio Catalogue” to “Car Audio & Video”.
  - `preview-audio.html`: brand and product-type selections now navigate to stable filtered routes using `department`, `brand`, and `component` query parameters. The page reports combined catalogue and brand counts. The source merge remains `rows=enriched.concat(verifiedOnly,audioConnections)`; Car Audio rows are selected by division across both sources.
  - `preview-planetworld.html`: removed the standalone 68-row supplier-stock card catalogue; this legacy route now redirects into the combined Car Audio & Video catalogue. No supplier-location stock snapshot is rendered as a separate customer catalogue.
  - `tests/three-category-storefront-structure.test.cjs`: added assertions for merged supplier data, combined Car Audio routing, brand/type filtered routes, home label, and redirect/no-stock legacy route.
- Latest exact PR #168 head: `ef36025de59c6c474148e8b1af0edd2d24e4e4f3`. Cloudflare Pages reported build in progress for this exact SHA at check time; no new successful deployment URL is yet confirmed. Do not present the previous `b6ac37ec` deployment as containing these changes.
- The regression test source has been updated but has **not yet been executed** against this exact head. Need capture test result and Cloudflare Pages exact-head success, then owner visual review on desktop/mobile.
- Keep PR #168 draft/open and production HOLD. No merge, production deployment, Axxess upload, DNS/payment change, live price/stock write or Supabase mutation.


### Combined Car Audio deployment evidence update
- Cloudflare Pages confirmed **Deploy successful** for functional catalogue commit `ef36025de59c6c474148e8b1af0edd2d24e4e4f3`.
- Preview host: `https://1db71fb0.get-wired-autoworx-store.pages.dev`
- Combined Car Audio & Video route: `https://1db71fb0.get-wired-autoworx-store.pages.dev/preview-audio.html?department=Car%20Audio`
- The deployment includes the combined supplier source array, brand/type query routes, homepage Car Audio & Video label, and the Planetworld legacy-route redirect/removal of separate stock cards.
- Latest branch commit `47ae9609efcc8666880fdf6bd281ddfaf21ec558` changes only this handover document after the successful functional deployment; no application source changed after `ef36025`.
- Browser page retrieval was attempted but the external reader could not access the pages.dev route. Treat Pages deployment as successful, but browser rendering/owner acceptance remains pending. The updated regression test file is committed but no executed test report is yet available.


## 2026-11-04 OWNER STANDARD — STORE-WIDE SUPPLIER-INDEPENDENT PRODUCT GROUPING

This is the permanent catalogue architecture for every current and future supplier/category. It supersedes any supplier-first customer-facing navigation.

### Customer-facing catalogue rules
- **Group by product identity, function and application — never by supplier.** Customers must find the same kind of product together in one category/subcategory, regardless of which supplier supplies it.
- Examples explicitly confirmed by the owner:
  - All fuel pumps together under one **Fuel Pumps** product category.
  - All 12V starters together under one **12V Starters** product category.
  - All car audio/video products from Planetworld, Audio Connections and any future suppliers together under **Car Audio & Video**, with one combined brand list and product-type groups.
- A customer navigates: store department/category → product category/subcategory → brand/product filters as useful → products. Supplier is never a top-level, category, subcategory, brand-navigation or stock-list page for customers.
- Same products/compatible product families from multiple suppliers are displayed together in the same customer-facing group. Preserve real model/variant differences and accurate specifications; do not falsely merge different models into one SKU. Where the exact same product is sourced from multiple suppliers, reconcile the offers/stock internally and avoid duplicate customer product cards unless there is a genuine distinct offer/variant that needs to be shown.
- Supplier names, dealer costs, supplier SKUs, supplier-only stock sheets and supplier folder paths are internal operational information and must not leak into customer-facing navigation, labels, descriptions, metadata, public assets or preview pages.

### Internal repository and sourcing rules
- Keep separate supplier folders in the repository (e.g. `suppliers/Planetworld`, `suppliers/Audio Connections`, `suppliers/ASC`, `suppliers/Electrocity`, `suppliers/Caelex`, `suppliers/Hertz`) so the owner/team can edit, audit, reconcile and track each supplier's catalogues, price lists, stock sheets, incoming files, exceptions and supplier-specific updates independently.
- Supplier folders are the internal source-of-truth/workbench only. They must not determine the public shop hierarchy.
- Build a supplier-neutral product catalogue/index from the supplier source folders. Keep supplier-to-product mapping, supplier SKU, dealer cost, stock evidence, update date and source-file provenance in internal-only records. The customer catalogue consumes only approved customer-safe product fields and owner-approved prices/stock.
- When another supplier is added, map its products into existing product categories/brands/product types first. Do not create a new supplier-facing storefront branch or duplicate category merely because the source came from a new supplier.
- Preserve supplier provenance and reconciliation traceability internally; never sacrifice it by flattening or deleting supplier source folders.

### Implementation/acceptance rule
- Apply this architecture to the current Planetworld + Audio Connections pilot first, then reuse it for ASC, Electrocity and all later suppliers after owner acceptance.
- Add regression coverage that tests supplier-independent grouping across multiple suppliers (including Fuel Pumps and 12V Starters), checks supplier provenance remains available internally, and checks supplier names/costs/SKUs/source paths are absent from customer-facing output.
- Do not mark the catalogue architecture complete until source mapping, cross-supplier grouping, customer-facing navigation, deduplication/variant handling, and preview rendering have been verified. No live stock/price import or production release without separate owner approval.


## 2026-11-04 — PLANETWORLD CAR AUDIO MANUAL CLASSIFICATION PASS

- Owner instruction: continue the 234-row Planetworld Car Audio manual-review task through completion and always update handover.
- Reconciled the actual source staging CSV against the preview JSON: **236 rows** were marked unclassified in the CSV, while **234 rows** were unclassified in the customer-preview JSON. Two source rows (Kicker 47KPB2 and 51KMC4) were already correctly grouped in the preview under **Marine Audio**; they were reconciled in the source staging file rather than counted as additional preview rows.
- Reviewed all 234 preview rows and all 236 source staging exceptions. **232 preview rows are now classified** by product/component family, irrespective of supplier. The Kicker 51KEYCHAIN item is excluded from the customer-facing audio catalogue as non-audio merchandise.
- **Two preview rows remain held, not guessed:** (1) One / BOX-10 / “Nissan Box” — OneNav’s public listing repeats the product name but does not state what the part is; (2) One / ON014-F3 / Toyota Land Cruiser Prado (150), 10.1-inch, 2013–2017 — available description does not state whether the item is a head unit or fascia/frame. Both need supplier confirmation before customer grouping.
- Major classification groups include OneNav head units, OneNav fascia/fitment frames, speakers, subwoofers/enclosures, speaker accessories, remotes, harnesses, wiring, parking sensors, displays, cameras/DVRs, vehicle integration modules, amplifiers, audio packages and Marine Audio. Kicker 47KPB2 / 51KMC4 remain under Marine Audio.
- Evidence references checked: Alpine KAC-001 official installation manual; Alpine LC70-269P product listing; OneNav 10.1-to-9-inch adapter and Nissan Box listings; Kicker 47KPB2 marine/powersports soundbar; Kicker PWB4100 power cable; Audison official collection/product references. Product descriptions were not fabricated; ambiguous rows remain held.
- Updated files: `assets/planetworld-catalogue-preview.json`, `catalogue-review/planetworld-car-audio-staging.csv`, `catalogue-review/planetworld-car-audio-taxonomy-review.json`, and new `catalogue-review/planetworld-car-audio-manual-review-2026-11-04.json`.
- Exact branch head before this handover commit: `6857add492dee32a1c96ca2f8d93cb11c7295e22`. GitHub runner diagnostic run **41796540711** completed SUCCESS on that exact head; it verified the three active category roots and catalogue row counts (Planetworld 3,317; Audio Connections 66). This diagnostic is not the full Node/browser suite.
- Cloudflare Pages exact-head build for `6857add492dee32a1c96ca2f8d93cb11c7295e22` was IN PROGRESS at last check (deployment ID `8272f312-a225-44e5-bba8-aa6358ea3c57`). No new URL or exact-head deployment success has yet been recorded. Check the post-handover head's deployment/checks before presenting the preview as current.
- PR #168 remains OPEN / DRAFT / UNMERGED. No merge, production deploy, Supabase write, live price/stock update, supplier activation, payment/DNS/Axxess change. Production remains HOLD. Owner phone acceptance and full browser verification remain outstanding.


## 2026-11-04 — CATALOGUE EXCLUSION AND REGRESSION COVERAGE
- Preserved the Planetworld source snapshot invariants: 3,317 total rows and 702 Car Audio division rows. The non-audio Kicker keychain remains in the internal source snapshot with an explicit exclusion component; customer-facing Car Audio navigation now filters it out.
- Added regression assertions for exactly two source-ambiguous held rows, the non-audio exclusion, and the customer route filter.
- Expanded the active branch runner diagnostic to build the isolated preview package and execute the three Node storefront regression suites plus the public SKU exposure audit. This is the first actual test execution path on this branch; the earlier runner recovery check only validated root/category counts.
- Exact parent head before this commit: `1b5f1c5d25bb0f5597ba7e25bacbe3746fa1ab83`. New commit will trigger fresh runner and Cloudflare Pages checks; record their final results before any preview/readiness claim.
- PR #168 stays draft/open/unmerged; production remains HOLD.


## 2026-11-04 — ASC ROOT PLACEMENT REGRESSION FIX
- The newly executed Node suite surfaced a genuine stale ASC navigation/data mismatch: Aerials and Car Mats were both assigned to Auto Electrical Parts & Spares, while the maintained regression fixture and approved three-root hierarchy place Aerials under Car Audio and Car Mats under Car Care & Accessories.
- Corrected `assets/asc-catalogue-preview-data.json` root assignments and moved the Aerials and Car Mats catalogue buttons to their approved parent sections in `index-new.html`. Sensors, switches, globes and fuel pumps remain under Auto Electrical Parts & Spares.
- The first full-suite run on `f90a520e0681e3d3f3f3e77478858fa540a58416` passed the runner/root/catalogue/manual-review assertions and public Pages package build, then failed at `tests/asc-catalogue-preview.test.cjs:5` because of these two stale root assignments. No production or live-data changes were made. Re-run the complete suite on the corrected head.
- Cloudflare Pages deployment for `f90a520e0681e3d3f3f3e77478858fa540a58416` succeeded: `https://3f273f37.get-wired-autoworx-store.pages.dev`. This deployment includes the Planetworld review changes but predates the ASC root correction.
- The separate legacy Workers Build failed (build ID `d1fa08b5-eeaa-4fef-8748-095ba9fb58bd`); it is not the Pages preview deployment and was not retried. PR #168 remains draft/open/unmerged; production HOLD.


## 2026-11-04 — REGRESSION FIXTURE ALIGNED TO APPROVED ASC ROOTS
- The full suite on `9e235da782c0516891346bbcf225fdfbb4050a3a` passed `tests/asc-catalogue-preview.test.cjs` and `tests/audio-catalogue-preview.test.cjs`, plus the isolated preview package build and manual-review invariant. It then failed in `tests/three-category-storefront-structure.test.cjs:99` because that second test file still expected the superseded placements (Aerials and Car Mats under Auto Electrical).
- Updated the stale fixture to require the approved placements: Aerials → Car Audio; Car Mats → Car Care & Accessories; Automotive Sensors, Automotive Switches, Automotive Globes and Fuel Pumps → Auto Electrical Parts & Spares. Added assertions for the matching homepage catalogue buttons and to prevent the old locations returning.
- No production, live database, price, stock, payment, DNS or Axxess changes. PR #168 remains draft/open/unmerged. Re-run full exact-head suite and confirm Pages deployment after this test-only correction.


## 2026-11-04 — ASC SOURCE-PDF PRIVACY TEST CORRECTION
- Full suite on `83e7f8dfdc664c33edd118b70bdb55b771d1c45f` passed the three-root/manual-review structural assertions and Cloudflare Pages deployed successfully. The ASC unit test then failed because its old assertions required supplier source PDFs to be copied into the public preview package and exposed via `source_pdf` fields.
- That expectation contradicted the current secure Pages allowlist, the explicit exclusion of supplier folders/PDFs, and the separate regression assertion that public catalogue data must not contain source PDF paths. The route also intentionally displays “Source catalogue pending” and no source-PDF link.
- Corrected `tests/asc-catalogue-preview.test.cjs` to verify the original PDFs remain in the internal `suppliers/ASC` folder while no supplier PDF path or file enters the public preview. The test now asserts the route does not expose “View complete original”. This preserves supplier confidentiality rather than weakening the security boundary.
- Re-run the complete suite on the next exact head. No supplier PDFs, live data, price/stock, payments, Supabase, DNS or production deployment changed.
