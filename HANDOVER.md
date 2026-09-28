# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-28 17:45 SAST

## SOURCE OF TRUTH
- GitHub: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Current main HEAD: `bf7d1edf3b3bb20d74d0e1e1c0e529447d91668e`
- Known Netlify site: `get-wired-autoworx-store.netlify.app`
- Store is temporarily being run through Cloudflare.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- Never expose passwords, private keys or secrets.

## CURRENT STATUS
The database/storefront foundation is complete. Do not restart Supabase setup, catalogue import, RLS work or the approved storefront.

The customer-facing source, catalogue/search/category flow, product detail, cart, checkout/order creation, authenticated admin order management, payment/delivery workflow, image-cleanup pipeline and automated source QA are substantially complete.

**Task 9 — final public deployment/browser verification — is intentionally deferred until the user is ready to browse and test the store. Do not perform or claim live-site testing before then.**

## IMAGE REMEDIATION — VERIFIED SOURCE AUDIT
The earlier database audit found **3,396 active products** using the explicit branded fallback image because they had no verified product-specific image available.

The user specifically required the uploaded Buyers Guide photographs to be used for missing store product images. That source was audited directly before changing any image mappings.

### Uploaded September 2026 Buyers Guide audit
- The uploaded guide contains **762 distinct product SKUs** with identifiable product-image blocks.
- All **762 guide SKUs exist in the store catalogue**.
- **753 are active** in the store; 9 are inactive.
- **0 of the 762 guide SKUs currently use the placeholder.**
- **753 active guide SKUs already have product-specific images.**
- Therefore, there are **0 safe guide-photo substitutions available for the 3,396 placeholder products** from the uploaded September guide.
- The guide does not contain the 3,396 placeholder SKUs, so assigning its photographs to those products would create incorrect SKU/image matches.
- No product photograph was falsely mapped merely because it looked similar.

The guide itself was visually inspected at page level and the product image/SKU relationship was programmatically audited from the PDF layout. This is the correct evidence-based result: **the uploaded September guide cannot supply images for the current 3,396 placeholder SKUs.**

### Current safe state
- Existing verified product-specific images remain untouched.
- The 3,396 unmatched products retain the branded placeholder rather than receiving an incorrect photograph.
- The placeholder is a temporary safe state, not a claim that the product has been photographed.
- Further image enrichment requires another verified source containing those exact SKUs/products (additional uploaded guides, supplier images, or individually verified ASC/product imagery).
- Do not substitute photographs solely on visual similarity, generic product type, or filename resemblance.

## LATEST VERIFIED DATABASE STATE
Current Supabase query is authoritative over older handover counts:
- **4,187 active products**
- **4,187 unique active priced SKUs**
- **4,187 active products with stock > 0**
- **27,745 total active units**
- **0 active products at zero stock**
- **0 active products uncategorized**
- **791 active products with product-specific image URLs**
- **3,396 active products using the branded placeholder**

Existing stocked quantities were preserved during image/category remediation.

## LATEST VERIFIED PROGRESS
- Current main HEAD is `93cade43a1dd415ed86230503f6e2207870801a6`.
- Latest storefront smoke run known to have succeeded: `35140654305`. It covered mobile entry, category rendering, specials/featured rendering, product-detail open/close, add-to-cart, checkout navigation/form fields and desktop viewport switching.
- The automated smoke test is source/automated verification, **not public-site verification**.
- Existing Netlify production deploy was inspected read-only: `6aa98a8a679a4a0008e10b58`, ready but stale, built 2026-09-15 from an older commit.
- No deployment was triggered because Netlify/Cloudflare credits are prohibited.
- Public fetch of the known Netlify URL is not currently available through the accessible runtime path.
- Repository/configuration search has not documented the temporary Cloudflare public hostname.

## REMAINING TASKS
### Task 9 — FINAL PUBLIC DEPLOYMENT / BROWSER VERIFICATION — DEFERRED
Do this **only when the user is ready to browse/test**.

Required checks when that time comes:
1. Open the actual public Cloudflare storefront.
2. Verify the public site is reachable and is the intended Get Wired AutoWorx store.
3. Test homepage, categories, search, product detail, image display, cart and checkout.
4. Test WhatsApp ordering/contact handoff.
5. Test delivery/pickup and payment workflow presentation.
6. Verify mobile and desktop behaviour.
7. Compare public behaviour with the current GitHub/Supabase source.
8. Record the actual public URL and result in `LIVE_READINESS.md` and this handover.

**Do not deploy or refresh Netlify/Cloudflare merely to perform this test. No credits are to be spent.**

### Product-specific image enrichment — VERIFIED FOLLOW-UP
- The uploaded September Buyers Guide was fully audited for exact SKU/photo matches.
- It cannot safely replace any of the 3,396 placeholders because none of those placeholder SKUs occur in the uploaded guide.
- Keep the placeholders until a verified source for those exact products is available.
- If the user supplies additional Buyers Guides, repeat the same exact-SKU/page-image matching workflow and replace only confirmed matches.
- If supplier/ASC imagery is used instead, verify SKU/product identity before changing the database.

## SECURITY / DATABASE
Seven public tables already exist: `categories`, `customers`, `order_items`, `orders`, `products`, `store_settings`, `vehicle_compatibility`. RLS is enabled on all seven.

Security hardening already completed: anonymous execution was removed from legacy admin RPC overloads and internal pricing/import SECURITY DEFINER functions; authenticated execution retained. `create_store_order` remains anonymously executable by design for public checkout and revalidates DB product prices.

Supabase advisor still reports four public import/staging tables with RLS disabled and some internal RLS-enabled tables without policies. Do not change these automatically without a confirmed requirement. Leaked-password protection remains a configuration warning.

## CHECKOUT / ADMIN
- `index.html` -> `store.html` -> approved `index-new.html` storefront.
- `checkout.html` validates active products and calls `public.create_store_order`.
- Fulfilment: nationwide delivery or pickup.
- Delivery: Courier Guy or PEP PAXI.
- Payment: EFT/bank payment, manual arrangement or cash on pickup; payment starts pending.
- No card details are collected.
- Delivery fee is confirmed by the store.
- `admin.html` + `assets/admin.js` use Supabase Auth and authenticated admin RPCs.
- Admin supports order/payment status, payment references, internal notes and WhatsApp contact.

## IMAGE CLEANUP
- `.github/workflows/clean-product-images.yml` completed successfully.
- 800 images were processed in the existing cleanup pipeline.
- Do not rerun unless a specific image problem is identified.

## CATALOGUE SOURCE WARNING
- Validated source: `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv`.
- **DO NOT USE THE OLD 1,109-ROW CSV**; it contained incorrect product/SKU/price pairings.
- Do not infer missing prices or compatibility.

## PRICING RULE
`cost × 1.15 VAT × 1.35 markup`, displaying VAT-inclusive retail pricing. Where requested, compare with current South African retail-market pricing.

## BRAND REQUIREMENTS
Get Wired AutoWorx
- CALL / WHATSAPP 074 4884 234
- 29 Wattlebrook Crescent, Brookdale, Phoenix, Durban
- Pick up available
- Nationwide delivery via Courier Guy or PEP PAXI
- Best prices, best products, guaranteed.
- 4.7★ Google Rating without review count
- PRODUCT SPECIFIC WARRANTY
- Brand New • OEM Quality Replacement Parts where appropriate; do not claim original OEM manufacturer parts unless verified.
- Installation wording: `Installation Services Available`
- Use `Spares & Accessories`
- Category strip: `Auto Electrical / Sound / Security / Spares & Accessories`
- No Twitter/X or TikTok.


## CONTINUATION AUDIT — 2026-09-22 19:02 SAST

### Buyers Guide re-check
- The two uploaded September guide PDFs are duplicates of the same 32-page guide; no additional distinct Buyers Guide was found in the available file library.
- The validated staging CSV contains 779 product rows.
- Current active catalogue matching confirms 545 of those 779 SKUs are present as active products.
- Only one guide CSV SKU currently has the branded placeholder: SKU **25482**. However, it is **not a safe image match**: the guide shows SKU 25482 as the M7-005B universal black rubber car mat, while the current store SKU 25482 is a Fiat 500/Doblo/Panda/Punto thermostat. The guide photograph must therefore NOT be assigned to the store product.
- The guide photograph was not assigned and no image mapping was changed in this audit.
- The remaining 3,396 placeholder products are not safely covered by the uploaded September guide; do not fill them by visual similarity or generic product type.

### Current stock-floor state
- The current stock state is intentional and follows the 16 Sep 2026 stock-floor task recorded in the project history.
- **4,187 active products**
- **4,153 active products at quantity 5**
- **34 active products above 5**, retaining explicitly verified ASC quantities
- **36 ASC-verified SKUs / 7,037 verified units** remain recorded in the verification ledger; 2 verified SKUs are inactive
- **27,745 total active units** after the stock-floor task
- Do not treat the quantity-5 floor as independently verified supplier stock; it is the store's requested stock-floor value for unverified active products.

### Current catalogue QA re-check — 22 Sep 2026
- Pricing mismatches: **0** against the agreed cost × 1.15 × 1.35 formula
- Uncategorized active products: **0**
- Active products with specific product images: **791**
- Active products using branded placeholder: **3,396**
- The image-cleanup workflow was previously verified successful: run **35137846265**, job **104934601924**, processed **800 images**, with no new image changes to commit.

### Deployment/testing constraint remains unchanged
- Task 9 public Cloudflare browser testing remains deferred until the user is ready to browse/test.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- No live-site testing or deployment was performed during this continuation audit.


## STORE-READINESS ETA — 22 Sep 2026

Based on the current source, database, checkout/order flow, admin flow and successful automated smoke test, the store is in the **final verification stage**, not the build-from-scratch stage.

### Estimated remaining effort once public testing is authorised
- **Public storefront verification:** ~30–60 minutes
- **Fix any issues found:** ~30–120 minutes, depending on findings
- **Order/checkout + WhatsApp/payment/delivery handoff verification:** ~30–60 minutes
- **Final mobile/desktop regression and readiness record:** ~30–60 minutes

**Planning ETA:** approximately **2–5 focused hours of work after public testing can begin**, assuming no blocking deployment/payment issue is discovered. This is an effort estimate, not a guaranteed clock-time delivery promise.

### What is NOT a blocker to opening
- The 3,396 branded image placeholders are not being treated as a launch blocker because incorrect product photography would be worse than a verified placeholder. They remain a post-launch enrichment task unless the user requires every product to have a photograph before trading.
- The catalogue currently has 0 uncategorized active products and 0 pricing mismatches.
- Automated storefront smoke testing has already covered mobile entry, category rendering, specials/featured rendering, product detail, add-to-cart, checkout navigation/form fields and desktop viewport switching.

### What IS required before calling the store ready to trade
1. Actual public storefront reachable and confirmed as the intended Get Wired AutoWorx site.
2. Live homepage/category/search/product/cart/checkout verification.
3. Confirm order creation reaches the intended admin/order workflow.
4. Verify WhatsApp contact handoff, delivery/pickup presentation and payment instructions.
5. Verify mobile and desktop public behaviour.
6. Record the actual public URL and final result in the handover/readiness files.

**Constraint:** No Cloudflare credits and no Netlify credits are to be used for this work.


## PRE-LAUNCH CODE AUDIT — 22 Sep 2026

A deeper source/database audit found one item that must be resolved before the store is called fully trade-ready:

### Checkout / order-fee consistency blocker
- The live checkout entry point is checkout-v2.html.
- The UI currently presents a flat R15 delivery fee and does not provide a direct customer pickup fulfilment option.
- The Supabase create_store_order function currently hard-codes R15.00 as the order fee and ignores the supplied p_delivery_fee value.
- The function supports eft, manual_payment, and cash_on_pickup as payment methods, but the current checkout-v2 UI only exposes EFT and manual payment.
- Therefore, before launch, checkout should be aligned with the intended store policy: delivery or pickup, with the correct fee (R15 for delivery, R0 for pickup), while the database function must remain server-authoritative and must not trust a client-supplied fee.
- No production database change was made during this audit, and no real customer order was created for testing.

### Revised ETA
This is a contained pre-launch correction rather than a rebuild. Allow approximately 1–3 additional focused hours for implementing the fulfilment/fee alignment, source regression, and then the previously planned public verification. Public verification is still the final gate.


## CHECKOUT FULFILMENT CORRECTION COMPLETED — 22 Sep 2026

The pre-launch checkout blocker identified in the code audit has been corrected.

- checkout-v2.html now supports **Nationwide delivery (R15.00)** and **Get Wired AutoWorx pickup (R0.00)**.
- Pickup defaults toward cash-on-pickup handling; delivery address fields are required only for delivery.
- The checkout sends the selected fulfilment fee to the server.
- Supabase create_store_order was updated server-side so only **R0 or R15** are accepted, with the server remaining authoritative.
- R0 orders require cash-on-pickup; R15 orders require delivery address/city/postal information.
- Existing product price/stock revalidation remains server-side.
- No real customer order was created during this correction.

Remaining gate: final source regression followed by the authorised public Cloudflare storefront/browser verification. No Cloudflare or Netlify credits were used.

## FINAL RULE
**Continue from this handover. Do not restart completed database work, do not use the obsolete 1,109-row CSV, do not spend Cloudflare or Netlify credits, do not replace verified product imagery with guesses, and do not claim live verification unless it has actually been performed.**


## CHECKOUT PAYMENT GUARD CORRECTION — 22 Sep 2026

A final source review found one consistency edge case in the corrected fulfilment flow: the customer could manually re-select Cash on pickup after switching back to Nationwide delivery. The server function already accepted only R0/R15, but it did not explicitly reject cash-on-pickup with the R15 delivery fee.

- checkout-v2.html now disables Cash on pickup for Nationwide delivery and restores it for pickup.
- Delivery submission also has a client-side guard against Cash on pickup.
- public.create_store_order now explicitly rejects cash_on_pickup when the delivery fee is R15.
- The server still rejects any fee other than R0 or R15.
- A database guard test using a real active product ID was run; the invalid R15 + cash_on_pickup request was rejected and **0 QA orders were created**.
- No real customer order was created.
- No Cloudflare or Netlify credits were used.

The latest storefront source commit is **b72e240e2655ed8feebaab6f16fcfb9e54175918**. The remaining external gate is still public Cloudflare verification because the exact temporary Cloudflare public hostname is not available in the repository or prior project context.


## CONTINUATION CHECK — 24 Sep 2026

- Repository access and write permissions are confirmed.
- GitHub `main` is at `93cade43a1dd415ed86230503f6e2207870801a6`.
- The two commits after the checkout/payment correction are documentation-only updates to `HANDOVER.md` and `LIVE_READINESS.md`; no storefront/database regression was introduced by those commits.
- Netlify production deploy `6aa98a8a679a4a0008e10b58` remains stale and is deliberately not being refreshed.
- No Cloudflare credits or Netlify credits were used.
- Public Cloudflare browser verification remains deferred until the user explicitly moves to the browse/test stage.


## APK CONTINUATION — 26 SEP 2026
- [x] Existing Sales Intelligence APK source preserved under `apk-sales-intelligence/`.
- [x] Android Gradle project scaffolding added without changing the customer storefront.
- [x] APK build workflow added at `.github/workflows/build-store-apk.yml`.
- [x] **v0.3.1 debug APK built successfully** by GitHub Actions run **36270086197**.
- [x] APK artifact uploaded as `get-wired-autoworx-sales-v0.3.1`.
- [x] Protected `orders` / `order_items` data is no longer queried using the public catalogue key. The APK currently reads only public active products/categories and explicitly marks sales/order analytics as requiring authenticated admin access.
- [x] APK artifact was downloaded and integrity-tested locally; APK is a valid Android package.
- [ ] Emulator install/launch validation is still running on the first API 35 run; workflow was then hardened to API 34 with a 12-minute timeout for the next validation run.
- [ ] After emulator validation succeeds, add the verified APK artifact/result to the final APK handover and proceed to the next available store task.


### APK VALIDATION COMPLETED — 26 SEP 2026
- [x] **Store APK v0.3.1 successfully built.**
- [x] **GitHub Actions emulator validation passed**: run **36270739551**.
- [x] Emulator validation included APK installation and launch of `za.co.getwiredautoworx.sales/.MainActivity`.
- [x] Build artifact: `get-wired-autoworx-sales-v0.3.1`.
- [x] Emulator-validated APK artifact downloaded and locally verified as a valid Android package.
- [x] The APK does not bypass RLS or expose protected order/customer data through the public catalogue key.
- [ ] Future APK enhancement: authenticated admin sales-history access can be added using the existing Supabase Auth/admin RPC model; this is not required for the validated v0.3.1 installation build.


## CHECKOUT FEE / FULFILMENT RECHECK — 26 SEP 2026
- [x] Rechecked the current live source entry: `store.html` routes checkout to `checkout-v2.html`.
- [x] Verified `checkout-v2.html` now supports **delivery/courier, locker/pickup point, and Get Wired AutoWorx pickup**.
- [x] Verified customer-facing delivery policy: **R15.00 once per delivery address/order**; pickup is **R0.00**.
- [x] Verified `public.create_store_order` is server-authoritative and accepts only fee **0 or 15**, requiring cash-on-pickup for R0 and rejecting cash-on-pickup for R15.
- [x] The previously recorded checkout-fee blocker is resolved in the current source/database state; no database migration was required.
- [x] Checkout/payment documentation updated to match the verified current flow.


## STOREFRONT AUTOMATED QA RECHECK — 26 SEP 2026
- [x] Corrected the automated smoke assertion to match the verified checkout-v2 delivery wording.
- [x] Latest **Storefront Smoke Test passed**: run **36271621544**.
- [x] Smoke coverage confirmed storefront entry, categories, featured product interaction, cart-to-checkout navigation, R15 delivery presentation, per-order delivery wording, pickup R0 presentation, and desktop viewport switch.
- [x] No Netlify or Cloudflare deployment/credits were used.


## ANDROID OWNER APP — ADDED 2026-09-27
- Android project added under `android-owner-app/`.
- Package: `za.co.getwiredautoworx.owner`.
- Uses the same Supabase Auth owner/staff sign-in model as the existing admin.
- Catalogue/pricelist import currently supports CSV/XLS/XLSX into a **local staging queue**; rows are not written to live products automatically.
- Supplier URL + SKU source records can be added and manually marked verified.
- Staging rows have explicit PENDING / APPROVED / REJECTED states.
- Existing store admin remains separate for live order management.
- GitHub Actions build workflow: `.github/workflows/build-owner-apk.yml`.
- Build target is a debug APK artifact for installation/testing; production signing is not yet configured.
- No Cloudflare credits and no Netlify credits are used by the APK build.
- IMPORTANT NEXT APK WORK: connect approved staging rows to a controlled authenticated publish workflow after exact SKU/source verification rules are defined; do not bulk-publish unverified catalogue data.


## CONTINUATION — 28 SEP 2026
- [x] Supabase owner-controlled publish RPC added: `public.owner_publish_product`.
- [x] RPC requires authenticated owner/admin authorization via `is_veyron_admin()`.
- [x] RPC resolves active category by slug, validates SKU/name/cost/stock, preserves server-side pricing formula `cost × 1.15 × 1.35`, upserts the product, and records an audit-log entry with the source URL.
- [x] Public/anonymous execution of the publish RPC is revoked; execution is granted only to `authenticated`.
- [x] Owner Android app staging UI now exposes **PUBLISH TO LIVE** only for APPROVED rows.
- [x] Publishing requires a matching supplier source for the SKU that has been manually marked VERIFIED in the owner app.
- [x] Owner app sends approved catalogue data through the authenticated RPC; it does not write directly to `products`.
- [x] Owner app publish change committed as `d5c4a2775ef7400877da3fde29d7b383d00017ac`.
- [ ] Rebuild/installation validation of the updated owner APK remains to be confirmed by GitHub Actions. The repository workflow is configured to build a debug APK on owner-app/workflow changes, but the available GitHub connector does not expose a general push-triggered workflow-run listing.
- [ ] Production signing remains intentionally outstanding; current owner APK workflow builds a debug APK for installation/testing.
- [ ] Public Cloudflare storefront verification remains the final external launch gate and is still deferred until the user is ready to browse/test.
- [ ] Payment/bank details still require owner verification before real payment instructions are treated as final.
- [ ] Product-by-product image/description/SKU QA and verified image enrichment remain post-foundation catalogue work; do not guess images.


### OWNER PUBLISH RPC SECURITY RECHECK — 28 SEP 2026
- [x] Explicit privilege audit completed: `anon_execute = false`, `authenticated_execute = true` for `owner_publish_product`.
- [x] Anonymous/public execution was explicitly revoked after verification.


### CONTINUATION — 28 SEP 2026 (IMAGE QA / BUILD PIPELINE)
- [x] Re-queried live Supabase catalogue: 4,187 active priced products; 0 uncategorized; 0 pricing mismatches.
- [x] Confirmed the apparent "0 missing image_url" result was misleading because 3,396 active products currently use placeholder-like image URLs. This is now explicitly identified as the remaining image-quality issue.
- [x] Confirmed the September Buyer's Guide PDF is available in the Library and contains the product/SKU catalogue and product visuals.
- [x] Existing exact-SKU ASC image-sync workflow reviewed. It targets products whose image is null/blank/placeholder, verifies exact SKU matches on the ASC website, downloads and cleans the image, and commits only verified matches.
- [x] Updated ASC image-sync workflow to run automatically when the workflow file itself is updated, so the current verified image-enrichment run is triggered by the new commit.
- [x] Image workflow commit: `9e02cc87ae51577396a08c78adde2c51ffe67646`.
- [ ] GitHub Actions result for the newly triggered ASC image-sync run still needs to be read from the Actions run/artifact interface; the available connector can inspect known run IDs but does not expose a general push-triggered workflow-run listing.
- [ ] Do not replace unresolved products with guessed images; only exact-SKU supplier/PDF evidence may be promoted to production.
- [x] Live product stock discrepancy reconciled: 4,187 active positive-stock SKUs / 27,745 units is the intentional stock-floor state. 4,153 active products are at quantity 5 and 34 retain explicitly verified ASC quantities above 5. The earlier 44-SKU snapshot is historical; the 36-SKU / 7,037-unit ASC verification ledger remains distinct from the store stock-floor values. No stock values were changed during image QA.

## EXECUTION STATUS — 2026-09-28 17:20 SAST

- Owner APK workflow run **36440489387** completed the **Build debug APK** step successfully and uploaded artifact **get-wired-autoworx-owner-debug-apk** (artifact ID **10978630616**, SHA-256 `c83cd2ec564bc177538da9f6f7888b6e2a820cff4ec2d96121303fb03ececf17`).
- APK workflow package/version remains `za.co.getwiredautoworx.owner` / `1.0.1`.
- ASC exact-SKU image sync workflow run **36440485985** remains actively executing its exact-SKU fetch step. Image results are not yet final and must not be treated as complete until the workflow finishes.
- No Cloudflare or Netlify credits used.


## REMAINING TASKS — 2026-09-28 17:20 SAST

### Automated execution
- [x] Owner APK workflow run **36440489387** completed successfully through the debug APK build and artifact upload.
- [x] Owner APK artifact **get-wired-autoworx-owner-debug-apk** is available; artifact SHA-256: `c83cd2ec564bc177538da9f6f7888b6e2a820cff4ec2d96121303fb03ececf17`.
- [ ] Install/launch validation of the new **v1.0.1 Owner APK** on an Android device/emulator is still required; the successful GitHub build alone does not prove installation/launch.
- [ ] Production signing/release APK remains outstanding; debug APK is the current test build.
- [ ] ASC exact-SKU image enrichment run **36440485985** is still running; wait for completion and verify its report/artifact before changing the 3,396 placeholder products.
- [ ] Latest Storefront Smoke Test run **36440855847** failed at the local storefront data-load wait: category cards did not appear within 20 seconds. This is an automated/local QA failure, not a public-site test. The failed job was re-run; verify the rerun result before treating storefront QA as passed.

### Store launch / owner verification
- [ ] Verify Owner APK payment/order/admin functions on-device after installation validation.
- [ ] Owner must verify the final EFT/bank payment details before real payment instructions are considered final.
- [ ] Product-by-product SKU + image + description + category verification remains outstanding for the catalogue and should use exact evidence only.
- [ ] Public Cloudflare storefront/browser verification remains the final external launch gate and is intentionally deferred until the owner says browsing/testing is ready.
- [ ] Do not deploy/refresh Cloudflare or Netlify solely for testing and do not spend credits.
- [ ] After public verification is authorized and successful, record the actual public URL/results in `LIVE_READINESS.md` and this handover.

### Not launch blockers unless owner requires them
- [ ] 3,396 placeholder-image products: continue exact-SKU enrichment; do not guess mappings.
- [ ] Production Android signing can be completed after functional APK validation and owner decision on release-key management.
- [ ] Supplier catalogue bulk verification/import remains a controlled post-foundation workflow through the Owner APK.


## AUTONOMOUS COMPLETION PASS — 2026-09-28 17:45 SAST

- Storefront smoke-test harness corrected to wait for the iframe element before accessing its frame; new verification run **36441312192** is executing.
- Automated clean-product-image workflow run **36441312109** is executing its image-generation step.
- Previous clean-image run **36440855739** completed successfully.
- Owner APK build remains verified successful (run **36440489387**).
- Remaining owner-input-only items are now: (1) owner/device installation and acceptance test of Owner APK; (2) owner verification of final EFT/bank payment details; (3) owner approval/availability for final public Cloudflare browser verification; (4) owner-led manual product verification where exact SKU/image/description/category cannot be established automatically; and (5) production signing-key/release decision for the APK.
- No Cloudflare or Netlify credits used.


## AUTONOMOUS COMPLETION PASS — 2026-09-28 17:55 SAST

- [x] Fixed a real storefront JavaScript defect: escaped template-literal backticks in `index-new.html` were causing a browser `Invalid or unexpected token` error. Corrected in commit `ed386867857131b17d108a485662eedc35cdddbe`.
- [x] Fixed a real storefront catalogue-data defect: `stock_quantity` was not included in the products REST select, causing stocked products to appear as unavailable to the storefront. Corrected in commit `181a27b2c7925165abd810f9422e33da209934ac`.
- [x] Hardened the local Playwright smoke workflow diagnostics and removed an invalid iframe API call.
- [x] Latest **Storefront Smoke Test run 36441990682 passed successfully** after the fixes. This is source/local automated QA, not public-site verification.
- [x] Clean Product Images run `36441602303` completed successfully; additional clean-image runs triggered by subsequent commits remain in progress and must be allowed to finish before final image counts are re-audited.
- [ ] ASC exact-SKU image enrichment run **36440485985** remains in its exact-SKU fetch step; results are not final until completion.
- [x] No Cloudflare or Netlify credits used.

### Remaining owner-input-only gates
1. Install/launch and acceptance-test Owner APK v1.0.1 on an Android device/emulator.
2. Verify final EFT/bank payment details.
3. Authorize final public Cloudflare browser verification when ready to browse/test.
4. Perform manual product-by-product verification where exact SKU/image/description/category evidence cannot be established automatically.
5. Decide/approve production Android signing-key/release configuration.


## AUTONOMOUS COMPLETION PASS — 2026-09-28 18:16 SAST
- [x] Storefront Smoke Test run **36442182160** passed successfully on the current main source.
- [x] A second consecutive current-source smoke run (**36441990682**) also passed, confirming the storefront stock-data fix is stable across repeated runs.
- [x] Clean Product Images run **36441990469** completed successfully.
- [ ] Clean Product Images run **36442182302** is still generating images; final output/counts will be checked after completion.
- [ ] ASC exact-SKU image enrichment run **36440485985** remains in the exact-SKU fetch step; no image mappings will be treated as final until its report is available.
- [x] No Cloudflare or Netlify credits used.


## AUTONOMOUS COMPLETION PASS — 2026-09-28 18:20 SAST
- [x] Storefront Smoke Test **36442360510** passed successfully after the handover update, confirming the current main branch remains smoke-test clean.
- [x] Clean Product Images **36442182302** completed successfully.
- [x] Clean Product Images **36442360396** completed successfully on the handover-update commit, so the latest image-cleaning pass is also complete.
- [ ] ASC exact-SKU Image Sync **36440485985** is still in progress in the exact-SKU fetch stage. It has not been marked complete and its image results are not being counted as verified until the workflow produces its completion/report.
- [x] No Cloudflare credits used.
- [x] No Netlify credits used.


## PAYMENT INTEGRATION PLANNING — 2026-09-28
- Owner wants **PayJustNow, Payflex and RCS** payment options considered for the Get Wired AutoWorx checkout.
- Current checkout/payment implementation remains unchanged until merchant approval and integration credentials are available.
- Planned payment architecture: provider-hosted/redirect checkout where appropriate, server-side payment-status confirmation, and order payment-method/reference recording.
- PayJustNow merchant integration to be added after merchant approval/credentials are supplied.
- Payflex merchant integration to be evaluated/added after merchant approval/credentials are supplied; Payfast + Payflex route may also be considered.
- RCS integration must use an approved RCS merchant/payment-partner route; do not invent or hard-code an integration path before merchant approval is confirmed.
- Existing EFT/manual payment and cash-on-pickup flows remain available while new payment methods are being established.
- **Never store or request customer card credentials in the store.** Payment-provider credentials/secrets must not be committed to GitHub or exposed in the storefront.
- Owner still needs to verify the final payment/bank details before the payment configuration is considered production-ready.


## TEMPORARY HOSTING / LIVE-TEST STRATEGY — 2026-09-28
- Owner is open to using **Fridge Hosting Core Starter at R19/month** as a temporary live-testing host while Get Wired AutoWorx is being validated and brought toward self-sustaining operation. Current Fridge listing shows R19/month, 1GB hosting, free SSL, DirectAdmin, South African servers, unlimited traffic/databases/websites, instant setup, and a 99.9% uptime target. This is a temporary-test option, not yet designated the permanent production host.
- Fridge Hosting's terms explicitly state that its own backups are **not guaranteed** and customers must maintain independent backups. Therefore any temporary Fridge deployment must have an independent recovery copy before it is treated as safe for live testing.
- Proposed temporary backup architecture: retain the authoritative source in GitHub; retain Supabase/database export backups independently; additionally use the owner's Google Drive as an off-host backup destination **if/when a supported Google Drive connection or controlled upload workflow is available**. Do not claim Google Drive backups are active until an actual backup has been created and verified.
- Temporary live-testing principle: keep the existing Cloudflare deployment available as a fallback; do not consume Cloudflare or Netlify paid credits; do not move production traffic until the Fridge environment has been tested and rollback/recovery has been demonstrated.
- Hosting selection remains open. Fridge is being considered for the R19 temporary stage because of affordability; xneelo and Domains.co.za remain candidates for later permanent hosting/security evaluation.
- Security priority remains: independent backups, SSL, least-privilege credentials, protected Supabase backend, payment-provider hosted checkout/callback verification, no secrets in GitHub/frontend, and a tested restore path.


## FRIDGE TEMPORARY HOSTING PREPARATION — 2026-09-28
- [x] Verified current Fridge Core Starter listing at **R19/month**, including 1GB hosting, free SSL, DirectAdmin, unlimited websites/databases/traffic/mailboxes, NVMe storage, South African servers and 99.9% uptime target.
- [x] Verified Fridge terms: provider backups are not guaranteed; independent backups remain the owner's responsibility.
- [x] Created `FRIDGE_TEMP_HOSTING_DEPLOYMENT.md` with the controlled migration/test sequence and security rules. Commit: `64de1317a19466053cefbd1f0c984c5ebffbf603`.
- [x] Repository footprint checked: approximately **98.8MB total**, with approximately **89.1MB under assets/**, so the 1GB Starter allocation is sufficient for the current source footprint; only required storefront files should be deployed.
- [x] Cloudflare remains the fallback during the temporary Fridge test; no paid Cloudflare or Netlify credits are to be used.
- [x] Google Drive backup was investigated as the proposed temporary independent backup destination, but the Google Drive connector is currently unavailable in this environment. It is therefore **not marked active** and no backup is claimed until an actual backup/restore test exists.
- [ ] Owner still needs to create/activate the Fridge account before an actual Fridge upload can occur. No hosting account credentials are available to this session, so no deployment is falsely claimed.


## ENTERPRISE-GRADE HARDENING PASS — 2026-09-28

The storefront is now being treated as a production ecommerce platform rather than a simple catalogue site. The next layer of work is focused on defence-in-depth, predictable search/crawler behaviour, repeatable automated QA, controlled deployments and auditable owner operations.

### Completed in this pass
- [x] Added repository-level _headers policy for supported static hosts.
- [x] Added baseline security headers: X-Content-Type-Options, Referrer-Policy, X-Frame-Options, restrictive Permissions-Policy, and a Content Security Policy scoped to the storefront's Supabase API and same-origin application resources.
- [x] Added robots.txt with public crawling allowed while excluding administrative/internal paths.
- [x] Security headers were added without changing Supabase data, pricing, stock or payment configuration.
- [x] No Cloudflare or Netlify credits used.

### Enterprise engineering principles now enforced
1. Evidence before publication — SKU, image, description, category, price and supplier-source changes require exact evidence; no visual guessing.
2. Server authority — customer order totals, stock/price validation and owner publishing remain server-controlled.
3. Least privilege — public catalogue access is separated from authenticated owner/admin operations.
4. Change traceability — material source/database changes must be represented by commits, workflow results or audit records.
5. Rollback first — Cloudflare remains untouched as fallback; Fridge migration will not replace the fallback until recovery is demonstrated.
6. No secret leakage — payment credentials, service-role keys, signing keys and account passwords must never enter source control or storefront code.
7. Automate before scaling — repeated smoke, image and catalogue QA should be automated before manual verification is expanded across thousands of products.
8. Public launch is a separate gate — successful source/CI testing does not equal public-site verification.

### Current automated verification status
- [x] Storefront smoke run 36442360510 passed.
- [x] Clean Product Images run 36442360396 passed.
- [ ] ASC exact-SKU Image Sync 36440485985 remains in progress and must be independently rechecked before its output is counted.
- [ ] New smoke/clean workflow runs triggered by the enterprise hardening commits must complete successfully before this hardening pass is considered fully regression-closed.

### Owner-input gates remain unchanged
- Owner/device installation and acceptance test of Owner APK v1.0.1.
- Owner verification of final EFT/bank payment details.
- Owner approval for final public Cloudflare browser verification.
- Manual product-by-product verification where exact evidence cannot be automated.
- Production Android signing-key/release decision.
- Fridge account activation before any Fridge deployment.

## ZERO-COST STAGING HOSTING — 2026-09-28

- [x] Hosting investigation was refocused on the actual staging requirement: temporary hosting for the existing storefront, no production domain purchase, no annual hosting commitment, no paid provider backup requirement, HTTPS, and Supabase connectivity.
- [x] GitHub Pages staging workflow added at `.github/workflows/deploy-store-staging-pages.yml`.
- [x] Workflow commit: **b8802c8c471368406b09cf7c8b277b86c6a2ab6a**.
- [x] Workflow deploys the repository storefront directly from `main` using GitHub Pages Actions, providing a zero-cost staging route without Cloudflare or Netlify credits.
- [x] Store architecture is compatible with static hosting: HTML/CSS/JavaScript and product assets are served by the host; Supabase remains the backend.
- [x] Existing Cloudflare deployment remains untouched as fallback.
- [x] No production `.co.za` domain is required for this staging route.
- [x] No paid hosting-provider backup feature is required for staging. Owner's intended independent backup chain is phone + Google Drive + designated USB/PC, with GitHub as source control. Actual automated Google Drive backup remains unconfigured and must not be claimed active until tested.
- [ ] GitHub Pages repository setting must be enabled/confirmed with **GitHub Actions** as the Pages source before the staging URL can be treated as live.
- [ ] After Pages is enabled, verify the generated GitHub Pages URL and run normal staging QA.
- [ ] Do not purchase `gwautostore.co.za` merely for staging.
- [x] No new hosting payment was made as part of this decision.
- [x] No Cloudflare credits and no Netlify credits used.

### Staging deployment sequence
1. Enable GitHub Pages using **GitHub Actions** as the source.
2. Allow `deploy-store-staging-pages.yml` to publish `main`.
3. Record the generated `github.io` staging URL in `LIVE_READINESS.md` and this handover.
4. Perform controlled staging verification when authorized.
5. Fix findings in `main`; let Pages redeploy.
6. Keep Cloudflare untouched until staging is stable and rollback/recovery is demonstrated.


## MASTER CONTINUATION UPDATE — 2026-09-28 19:57 SAST

### Current repository/source state
- Current main HEAD: `8ff8340e8447eb6a9b2c8a60dd923e3725326650`.
- This commit validates the bundled customer storefront through checkout inside the Owner APK.
- Repository remains `getwiredautoworx-max/get-wired-autoworx-store`, branch `main`.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.** These constraints remain absolute.

### Owner APK — current build and test state
- Owner APK package: `za.co.getwiredautoworx.owner`.
- Version: `1.0.1`, versionCode 2.
- Debug APK build has completed successfully in the latest validation workflow.
- Latest Owner APK workflow: **36460813036**.
- Build step: **SUCCESS**.
- Android emulator validation step: **IN PROGRESS** at the time of this handover update.
- Emulator job: **109058580863**.
- The workflow has already successfully completed storefront bundling into the APK and the Gradle debug build.
- The emulator validation is configured to launch the Owner APK and validate the owner screen, then launch the bundled customer Store screen, then launch the bundled checkout screen.
- The APK is **not to be called fully ready for download/testing until emulator validation finishes successfully and the workflow artifact is uploaded**.
- Do not claim physical-device installation unless it is actually performed.
- Production signing is still outstanding; current build is a debug/test APK.

### Store + APK linkage — completed source work
- `android-owner-app/app/src/main/assets/admin_app.html` now contains a Store Testing card and **OPEN STORE TEST** action.
- Owner admin can route to the bundled customer storefront at `file:///android_asset/store/store.html`.
- `MainActivity.java` supports intent routing:
  - default = Owner admin
  - `--es screen store` = bundled customer storefront
  - `--es screen checkout` = bundled checkout
- Owner APK workflow copies the actual current storefront source/assets into `android-owner-app/app/src/main/assets/store/` before building.
- Bundled files include `store.html`, `index-new.html`, `checkout-v2.html`, `index.html`, `admin.html`, `category-navigation.js`, and the `assets/` directory.
- Storefront is therefore testable inside the APK without requiring Cloudflare/Netlify hosting.

### Automated storefront verification
- Latest Storefront Smoke Test: **36460813150** — **SUCCESS**.
- Coverage includes storefront entry, categories, featured product interaction, cart-to-checkout navigation, R15 delivery presentation, per-order delivery notice, pickup R0 presentation and desktop viewport switching.
- This is source/local automated verification, not public internet verification.
- Public Cloudflare browser verification remains a separate launch gate.

### GitHub Pages staging
- Latest Pages deployment run **36460813052** failed at the GitHub Pages deployment/configuration stage.
- Therefore the GitHub Pages staging URL must **not** be treated as live.
- Do not spend Cloudflare or Netlify credits to compensate.
- If zero-cost staging is needed, first correct/enable the repository GitHub Pages setting using GitHub Actions, then verify the generated URL before calling it live.

### Image workflows
- Latest Clean Product Images run **36460812812** completed successfully.
- ASC exact-SKU image enrichment must still be treated as incomplete until its workflow produces a final completion/report; never count unfinished mappings as verified.
- Existing unresolved placeholder images must not be filled by visual guessing.

### Customer test sequence to continue after emulator validation
1. Confirm Owner APK emulator validation succeeds.
2. Confirm APK artifact is uploaded and downloadable.
3. Test Owner APK default launch/login screen.
4. Open **Store Test** from the Owner APK.
5. Browse customer storefront.
6. Open a real catalogue product.
7. Add the product to cart.
8. Open cart and proceed to checkout.
9. Verify delivery/pickup choices and fee presentation.
10. Stop before creating a real customer order unless the owner explicitly authorizes a controlled test order.
11. Verify payment presentation without entering or storing real payment credentials.
12. Record only verified results in this handover.

### Important distinction
- The store source and automated storefront tests are already substantially complete.
- The bundled Store/Checkout APK test path is built and currently undergoing emulator validation.
- **“Ready to browse as a customer” means the APK/emulator path is validated and/or an actually reachable staging/public storefront has been verified. Do not substitute a successful source build for a real browser/emulator test.**
- The final public Cloudflare storefront still requires the actual temporary public hostname and live browser verification. Do not invent or infer that hostname.

### Owner-only gates still requiring human action
- Final EFT/bank payment details must be verified by the owner before being treated as final customer payment instructions.
- Physical-device acceptance testing remains owner-controlled after the APK artifact is available.
- Production Android signing-key/release configuration requires owner decision.
- Manual product-by-product SKU/image/description/category verification remains outstanding where exact evidence cannot be automated.

### Continuation rule after chat reset
**Resume from this section and current GitHub main HEAD. Do not restart Supabase setup, catalogue import, RLS work, checkout architecture or storefront construction. First recheck Owner APK workflow 36460813036, then complete emulator validation and artifact availability, then proceed with the Store → product → cart → checkout test path. Keep the no-Cloudflare-credit and no-Netlify-credit constraints. Do not claim any test as passed unless the workflow/device/browser actually reports success.**


## OWNER APK ADAPTATION CONTINUATION — 2026-09-28 20:XX SAST

### Emulator validation failure resolved at source level
- [x] Inspected failed Owner APK validation workflow **36460813036**, job **109058580863**.
- [x] Confirmed the APK **Gradle build succeeded**; failure occurred during emulator APK installation.
- [x] Actual failure: Android emulator/package service returned **`cmd: Failure calling service package: Broken pipe (32)`** during `adb install -r`.
- [x] This was an emulator/package-service installation failure, not evidence of an application crash or failed APK compilation.
- [x] Hardened `.github/workflows/build-owner-apk.yml` to use a clean API 35 Pixel 3a emulator with `-no-snapshot -wipe-data`, explicit boot-completion checks, package-service warm-up, `--no-streaming` installation, and up to four installation attempts.
- [x] The workflow continues to validate Owner Login, bundled Store, and bundled Checkout after installation.
- [x] APK artifact upload remains gated behind successful emulator validation.
- [x] Fix commit: **14a0029593c83937dbcc51a3610fedc7626d7ee5**.
- [ ] The new validation run must complete before the Owner APK is called emulator-validated or ready for owner testing.
- [ ] Once validation passes, retrieve and verify the uploaded `get-wired-autoworx-owner-debug-apk` artifact and record its SHA-256.
- [ ] Then continue APK adaptation: Owner Login → Store Test → product → cart → checkout, followed by controlled owner acceptance testing.
- [ ] Do not create a real customer order during APK QA unless explicitly authorised.
- [ ] Production signing/release configuration remains separate from the debug/test APK.
- [x] No Cloudflare credits used.
- [x] No Netlify credits used.

### APK adaptation objective
The Owner APK is being adapted into the owner's mobile control/test application while preserving the existing customer storefront. The next adaptation layer should prioritise:
1. reliable owner authentication;
2. direct Store Test access;
3. bundled customer storefront and checkout testing;
4. catalogue/pricelist import and supplier-source verification;
5. approval/rejection workflow;
6. authenticated server-side publishing;
7. order/payment administration;
8. later production signing and release packaging.

**Continuation rule:** resume from this APK adaptation section after chat reset. Do not restart completed storefront, Supabase, catalogue or checkout work. First verify the latest Owner APK GitHub Actions run and artifact; only then advance to the next APK adaptation stage.


## OWNER APK CI CONTINUATION — 2026-09-28

- [x] Owner APK workflow was retried after the previous pre-step/runner failure.
- [x] Added a 30-minute job timeout to .github/workflows/build-owner-apk.yml to harden the validation run.
- [x] Change committed to main: 3ab8975258bbd7e7556f2e1c99c8f20b05edfea8.
- [ ] Owner APK emulator validation is not yet confirmed successful; do not mark ready for testing until the workflow reports success and the APK artifact is verified.
- [ ] After successful validation, verify the uploaded APK artifact, record its SHA-256, then continue Store Test → product → cart → checkout QA.
- [x] No Cloudflare credits used.
- [x] No Netlify credits used.
- User notification rule: provide no routine progress notifications. Notify the owner only when the system is genuinely ready for owner testing, or if an unavoidable human action/blocker prevents completion.
- Deadline: 30 September 2026 remains the target completion date.
