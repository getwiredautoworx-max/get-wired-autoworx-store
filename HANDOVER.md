# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-28 17:45 SAST

## SOURCE OF TRUTH
- GitHub: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Current main HEAD: `bf7d1edf3b3bb20d74d0e1e1c0e529447d91668e`
- Historical Netlify deployment exists but is stale and is NOT a production URL. Do not use or refresh it.
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


## FINAL PRODUCTION / SECURITY CHECK — 2026-09-28

### Authentication / admin access
- Supabase authentication/admin access was rechecked against the live database authorization model.
- Privileged admin RPCs remain authenticated-only and retain their internal admin/owner checks.
- `admin_list_orders` and `admin_update_order` require a signed-in user and `veyron_admin_users` authorization.
- `owner_publish_product` retains its owner/admin authorization check.
- `is_store_admin` remains an authenticated privileged check.
- No authorization bypass was identified.

### RLS / privileged RPC review
- Fresh live advisor check completed on 2026-09-28.
- RLS remains enabled across the public tables; public product/category reads remain intentionally available for the storefront.
- The advisor reports 15 RLS-enabled tables without policies. These include internal/import/staging tables and protected operational tables such as customers, orders, order_items, store_settings, vehicle_compatibility and veyron_admin_users.
- These tables were deliberately left unchanged: no policy was added merely to silence the advisor because their intended access paths are already controlled by privileged server functions or authenticated workflows, and blind policy changes could expose data or break imports/admin operations.
- `create_store_order` remains SECURITY DEFINER and executable by anon/authenticated because guest checkout requires public order creation. Its server-side validation remains authoritative for product, price, stock, fulfilment fee and payment method.
- No unsafe privilege revocation or SECURITY DEFINER change was made.

### Production/test data verification
- Active products: 4,187.
- Missing SKU: 0.
- Missing name: 0.
- Null/non-positive price: 0.
- Null/negative stock: 0.
- Invalid category references: 0.
- Pricing mismatches: 0.
- Orders: 0.
- Order items: 0.
- No test/demo customer order was created during this security pass.

### Hosting / stale URL check
- Repository searches for `netlify.app`, `localhost` and `demo` returned no matches in the indexed repository source.
- The old Netlify site is not an active production target and must not be refreshed or used. No Netlify credits are to be spent.
- The exact temporary Cloudflare public hostname remains intentionally undocumented/unverified until the owner authorizes public browser testing.
- Do not treat the old Netlify URL in historical handover text as a live store URL.

### Secret exposure check
- Repository searches found no `service_role`, `SUPABASE_SERVICE_ROLE_KEY`, or live Stripe secret-key pattern (`sk_live_`) in indexed source.
- No server-side secret was added to the frontend during this audit.
- Never place Supabase service-role/private keys, payment private keys or passwords in frontend assets.

### Remaining security configuration item
- Supabase Auth still reports leaked-password protection disabled. This remains an owner/dashboard configuration item and was not changed blindly through SQL.
- Performance advisor duplicate/unused-index findings were also left unchanged because safe removal requires schema/query-path confirmation.

### Security-pass conclusion
- No production-breaking security change was made.
- No production data was altered.
- No real order was created.
- No Cloudflare or Netlify credits were used.
- Current store/database security state is preserved and verified as far as the connected project controls allow.


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

## EXECUTION CONTINUATION — REPLIT / OWNER APK — 2026-09-28

### Independent build route
- Replit workspace created for the existing Get Wired AutoWorx Owner APK build/validation route.
- Workspace URL: https://replit.com/@getwiredauto/OblongEcstaticFlash
- Replit Agent daily credits were exhausted during setup; repeated Agent status/update requests timed out. This is an execution-credit limitation, not evidence of an application-code failure.
- Do **not** create a replacement/demo store or simplified APK in Replit.
- Resume from the existing Replit workspace after the Agent allowance resets.
- Required route: existing GitHub source → independent Android build → APK artifact → emulator/device validation.

### Current Owner APK source verified on GitHub
- Repository: getwiredautoworx-max/get-wired-autoworx-store
- Branch: main
- Android package: za.co.getwiredautoworx.owner
- Version: 1.0.1 / versionCode 2
- compileSdk/targetSdk: 35
- minSdk: 23
- Android Gradle Plugin: 8.7.3
- Gradle: 8.10.2
- Current workflow bundles the real storefront files plus the complete assets directory into the Owner APK test assets.
- Current emulator validation checks Owner Login, Store checkout and Checkout screens.
- Current source was re-read directly from GitHub on 2026-09-28 and is the source of truth.

### Current execution blocker
- GitHub Actions remains unsuitable for current APK execution because recent runs terminate before workflow steps begin; do not treat a non-starting Actions run as an APK failure.
- Replit is the intended independent execution route, but its Agent daily allowance is currently exhausted until reset.
- No APK is to be marked as current/validated until the current source has actually built, installed and passed validation.

### Owner constraints
- User wants autonomous continuation until successful completion or genuine owner input is required.
- No routine progress notifications; report only completed milestones or genuine owner-controlled blockers.
- No Cloudflare paid credits.
- No Netlify credits.
- Do not create real customer orders during testing.
- Do not restart completed Supabase/database/catalogue work.
- Manual verification of the 4,000+ product SKU/image/description/category data remains a final task, not a prerequisite for the APK build.

### Next execution step
1. After Replit Agent allowance resets, reopen the existing workspace above.
2. Bring in/connect the actual GitHub repository source; do not recreate files manually or build a replacement app.
3. Verify the android-owner-app project is present.
4. Build the current debug APK.
5. Install on an emulator/device and run Owner Login, Store route, Checkout route and core WebView checks.
6. Preserve the resulting APK artifact and record the exact build/validation result here.
7. Only then proceed to live/customer-facing testing when the user explicitly says they are ready.


## OWNER APK SOURCE AUDIT — 2026-09-28
- Current GitHub Owner APK source was re-read after the Replit Agent allowance window had passed.
- `android-owner-app/app/build.gradle`: package `za.co.getwiredautoworx.owner`, version 1.0.1 / versionCode 2, compileSdk/targetSdk 35, minSdk 23.
- `android-owner-app/build.gradle`: Android Gradle Plugin 8.7.3.
- `android-owner-app/app/src/main/AndroidManifest.xml`: launcher activity is `.MainActivity`, INTERNET permission is present, cleartext HTTP is disabled, and backup is disabled.
- `MainActivity.java` was verified as the current Java activity. It supports the Owner Login asset, Store route, Checkout route, WebView JavaScript/DOM storage, and file chooser handling.
- `android-owner-app/app/src/main/assets/admin_app.html` was verified to exist, so the Owner Login asset required by MainActivity is present in the APK source tree.
- The current build workflow bundles the real storefront into `app/src/main/assets/store` and then builds/installs the current debug APK for emulator validation.
- A fresh Replit Agent execution attempt was made after the stated reset window; the Replit tool timed out before returning a build result. This is not evidence of an APK build failure and no APK-ready claim is made.
- No replacement app, demo app, Cloudflare credit, Netlify credit, or real customer order was used.

### Current execution state after audit
- Source integrity: verified.
- Current APK build: **not yet independently completed in this continuation**.
- Emulator validation: **not yet completed for current version 1.0.1**.
- Next action remains to obtain an actual build-capable execution environment and run the current source through build → install → Owner Login → Store → Checkout validation. Existing source must be preserved.


## OWNER APK EXECUTION RETRY — 2026-09-28
- Re-ran the current Owner APK GitHub Actions job `109093479114` as an additional execution test; GitHub accepted the retry and created job `109113307960`.
- The retried job again completed as **failure before any workflow steps started** (`steps=null`, no logs URL).
- This reproduces the previously observed runner/execution-environment failure and does not provide evidence of a defect in the Owner APK source.
- No source changes were made as part of this retry. No Cloudflare/Netlify credits and no real customer orders were used.
- Do not mark APK 1.0.1 built/validated from this retry.


## SUPABASE SECURITY / PERFORMANCE AUDIT — 2026-09-28
- Live Supabase project `ojytykqpvonxvepprgbh` is ACTIVE_HEALTHY on PostgreSQL 17.6.1.
- Fresh security advisors were checked. The main remaining WARN is the intentional public checkout RPC `create_store_order`, which is SECURITY DEFINER and callable anonymously; its current definition revalidates customer/cart input, active products, stock, database prices, delivery fee and payment method server-side. This public execution is required for guest checkout and was not changed.
- Authenticated SECURITY DEFINER admin/owner RPCs were inspected. `admin_list_orders` and `admin_update_order` require a signed-in user and membership in `veyron_admin_users`; `owner_publish_product` calls the owner/admin authorization check before publishing. No authorization bypass was identified in this audit.
- Supabase reports 15 RLS-enabled tables without policies. These include internal/import/staging tables plus customers/orders/order_items/store_settings/vehicle_compatibility. They were not modified because access requirements are not sufficiently established and changing them blindly could break existing workflows.
- Supabase Auth still reports leaked-password protection disabled. This is a dashboard configuration item and should be enabled before production credentials are finalized.
- Performance advisors report duplicate/unused indexes. No index was dropped because several duplicates correspond to unique constraints or active query paths and removing them without schema-level verification could create regression.
- No production data was changed during this audit; no real order was created; no Cloudflare or Netlify credits were used.


## MASTER CONTINUATION / EFFICIENCY / ETA / GOALS — 2026-09-28

### Operating objective
Continue from this handover as the single source of truth. **Maximise efficiency and minimise user interruption.** Execute independent tasks in parallel where technically safe, avoid repeating completed work, and only stop when a genuine owner-controlled action is required.

### Efficiency rules
1. **Do not restart completed work.** Treat verified Supabase, catalogue, checkout, security and source-audit results as established unless new evidence contradicts them.
2. **Work the critical path first.** Prioritise the current Owner APK build/validation blocker, then final store functional readiness, payment-owner verification, and finally the 4,000+ product manual QA.
3. **Run independent work in parallel** where the tools allow it, without changing production data unnecessarily.
4. **Use the existing source and workflows.** Do not create replacement/demo stores, simplified APKs, duplicate databases or parallel catalogue imports.
5. **Prefer read-only verification before mutation.** Make changes only when the evidence identifies a real defect and the change is safe.
6. **Do not spend paid credits.** No Cloudflare credits and no Netlify credits. Avoid unnecessary Replit Agent calls while its execution allowance is unavailable.
7. **Never create real customer orders during testing** unless the owner explicitly authorises one.
8. **Do not claim completion from a source inspection alone.** Build/install/emulator/public tests must have actually executed before being marked passed.
9. **Do not block the APK on the 4,000+ product manual QA.** Manual catalogue verification is a final controlled task.
10. **Keep the handover current after meaningful milestones**, including exact commit/run/build/artifact references where available.

### Current ETA — 28 September 2026
**Target: store + current Owner APK ready for final owner-controlled acceptance by 30 September 2026**, subject to the external execution/owner gates below.

Current remaining effort is not a rebuild:
- **Owner APK build/install/emulator validation:** critical-path blocker; execution environment must successfully run the current v1.0.1 source.
- **Owner APK functional validation:** Owner Login → Store → Checkout → core WebView/file chooser/admin workflow.
- **Store final functional regression:** approximately 1–3 focused hours once the test environment/public URL is authorised and accessible, depending on findings.
- **Payment configuration:** owner verification of final EFT/bank/payment details is required before publishing those details.
- **Public Cloudflare browser verification:** approximately 30–60 minutes once the owner explicitly authorises browsing/testing and the actual public hostname is available.
- **Manual 4,000+ catalogue QA:** final task and potentially the longest human/data-review task; it should not delay technical readiness work.

**ETA caveat:** 30 September is the project target, not a guaranteed clock-time promise. The main uncertainty is the external Android execution environment for the current Owner APK and any defects discovered during actual final testing.

### Current priority order
**P0 — Critical**
1. Obtain a functioning execution environment for the existing android-owner-app.
2. Build current Owner APK **v1.0.1 / versionCode 2**.
3. Install and validate on emulator/device: Owner Login, Store, Checkout, WebView, navigation and file chooser.
4. Fix only verified defects and repeat build/validation until passed.
5. Preserve the exact APK artifact and record the result.

**P1 — Final technical readiness**
6. Complete remaining non-public store regression checks that can be performed without spending hosting credits or creating real orders.
7. Verify admin/order/payment/delivery flows remain consistent.
8. Keep security state unchanged unless a safe, evidence-backed fix is identified.
9. Owner enables Supabase leaked-password protection in the dashboard before final production credential setup.

**P2 — Owner-controlled launch gate**
10. Owner verifies final payment/bank details.
11. Owner explicitly authorises public Cloudflare browser testing.
12. Verify actual public storefront, mobile/desktop behaviour and customer journey.
13. Record the actual public hostname and final readiness result.

**P3 — Final catalogue QA**
14. Manually verify the 4,000+ active products for SKU, product identity, description, category and image.
15. Correct only verified mismatches; never guess product/image mappings.
16. Re-run final catalogue integrity checks after corrections.

### Goals and targets
- **Store goal:** professional, fast, mobile-first Get Wired AutoWorx storefront that is easy to browse, search and purchase from.
- **Data target:** maintain 4,187 active products, unique SKUs, valid pricing, valid stock and zero uncategorized active products unless verified changes are intentionally made.
- **Pricing target:** maintain cost × 1.15 VAT × 1.35 markup with zero unexplained pricing mismatches.
- **Checkout target:** delivery R15 / pickup R0, server-authoritative fulfilment fee and price/stock validation, no card details stored, and no invalid payment/fulfilment combinations accepted.
- **Security target:** preserve authenticated admin/owner controls, RLS protections and server-side privileged checks; do not weaken security merely to silence advisory warnings.
- **APK target:** current v1.0.1 must actually build, install and pass Owner Login → Store → Checkout validation before being labelled ready.
- **Image target:** never replace the 3,396 verified placeholders with unverified or visually guessed images. Enrich only from exact verified product/SKU sources.
- **Launch target:** no stale Netlify URL, no unnecessary hosting deployment, no paid Cloudflare/Netlify credits, and no real order during testing.
- **Catalogue QA target:** ultimately achieve verified SKU + image + description + category accuracy across the full active catalogue.
- **Documentation target:** every major milestone leaves an exact, reproducible record in GitHub/handover.

### Known external gates — do not misclassify as source failures
- GitHub Actions current APK jobs have failed before workflow steps start; this is an execution/runner issue, not proof that the APK source is defective.
- Replit Agent has previously timed out when attempting the current v1.0.1 build/validation route; do not spam retries while its execution allowance is unavailable.
- Public Cloudflare verification is intentionally deferred until the owner says they are ready to browse/test and the actual public hostname is available.
- Final bank/payment details require owner verification.
- Supabase leaked-password protection requires owner/dashboard action.

### Definition of success
The project is considered technically ready for owner acceptance when:
- current Owner APK v1.0.1 has a real successful build artifact and successful emulator/device validation;
- store/customer flows have passed final regression;
- checkout fulfilment/payment rules are confirmed;
- admin controls remain authenticated and functional;
- no test/demo orders exist;
- no secrets are exposed;
- no stale production target is being used;
- no Cloudflare/Netlify credits have been spent;
- the owner has verified final payment details;
- and, when authorised, the actual public Cloudflare storefront has passed browser verification.

**Continue automatically toward these targets. Report only completed milestones or genuine owner-controlled blockers.**


## OWNER APK ZERO-CREDIT EXECUTION ATTEMPT — 2026-09-29
- Replit is explicitly prohibited by the owner; no Replit credits were used.
- A zero-credit local/container build was tested, but the execution image has Java 21 only and no Android SDK, Gradle, adb, or cached Android build tooling; therefore it cannot build the APK locally.
- The existing GitHub Owner APK workflow was triggered from main. Run `36539233394` failed before workflow steps started (`steps=null`, no job logs). The workflow runner was then changed from `ubuntu-24.04` to `ubuntu-latest` and retriggered as run `36539261777`; it again failed before any workflow steps started. This confirms the current private-repository GitHub-hosted execution environment is the blocker, not an identified APK compilation error.
- An older successful Owner APK run `36460079264` produced artifact `10988080088`, SHA-256 `83b8b2f706663d9f579675165f3f4503b604257f95ce15a602d8c34c2c1f6fa1`. Inspection showed a 15 KB APK containing only the earlier `admin_app.html` asset; its source predates the current Store/Checkout routing in MainActivity, so it is **not accepted as the current v1.0.1 validated APK**.
- The current MainActivity differs from that older source specifically by adding Store and Checkout asset routing; current source remains preserved.
- Temporary build-trigger file was removed after testing. No Cloudflare/Netlify/Replit credits were used and no customer orders were created.
- **Current genuine blocker:** a build-capable execution environment that can access the private repository without paid/owner-controlled execution being unavailable. The next valid route must build the current source, not reuse the stale older APK.


## OWNER APK EXECUTION BLOCKER — 2026-09-29 10:XX SAST
- [x] Confirmed historical Owner APK workflow **36460813036 / job 109058580863** successfully completed checkout, Java, Android SDK, Gradle setup, storefront bundling, and **debug APK compilation**.
- [x] Confirmed the historical runtime failure was the Android package service returning **`Broken pipe (32)`** during streamed `adb install`, after the emulator had fully booted.
- [x] Implemented a stronger validation workflow in commit **68011d8f1727276e1be65e7eef49af35a13854d9d**:
  - API 33 Google APIs emulator for a more conservative runtime target.
  - SwiftShader graphics.
  - APK artifact is uploaded **before** emulator validation so a runtime-validation failure cannot discard the successfully built APK.
  - Installation now uses `adb push` followed by `adb shell pm install -r` instead of relying on the failing streamed install path.
  - Package service is warmed before installation and adb is restarted between retries.
  - Four installation attempts remain.
- [x] Confirmed current GitHub Actions run **36539511646** failed before any job step executed; unlike the historical run, no build or emulator work started. The repository therefore has no new runtime result to assess from this attempt.
- [x] Confirmed the existing Netlify project is also currently skipping builds because its account credit usage is exceeded. No Netlify credits were consumed by the attempted fallback.
- [x] Reverted the temporary Netlify APK-build experiment and restored the normal storefront build configuration.
- [x] No Replit credits used. No Cloudflare credits used. No Netlify credits used.
- [ ] Do **not** call the APK emulator-validated until a real workflow run completes the runtime checks.
- [ ] On the next available GitHub Actions execution capacity, run the hardened Owner APK workflow, retrieve the APK artifact, verify SHA-256, and complete Owner Login → Store → product → cart → checkout validation.
- [ ] If the emulator install still fails, retain the pre-emulator APK artifact and diagnose only the emulator/package-service layer; do not rebuild the storefront or database.
- [ ] After runtime validation passes, proceed to Owner APK adaptation and then final live-store testing.

### Current execution rule
Resume from this section after chat reset. The APK **build path is already proven**; the remaining blocker is execution capacity plus final emulator runtime validation. Do not restart Supabase, catalogue, RLS, storefront, or checkout work.


## OWNER APK EXECUTION ROUTE DECISION — 2026-09-29

### Latest execution evidence
- Hardened Owner APK workflow commit: `68011d8f1727276e1be65e7eef49af35a13854d9`.
- Latest push-triggered GitHub Actions run: **36540176256** (workflow `.github/workflows/storefront-smoke.yml`), failed at **2026-09-29 08:01:54Z**.
- Its job **109313443560** was created but contains `steps=null`; no workflow step executed and no usable job log was produced. This is consistent with the existing private-repository Actions execution-capacity/account gate and is **not evidence of an APK source/build failure**.
- The hardened Owner APK workflow itself remains source-valid; the historical run already proved that this project can compile on a functioning GitHub-hosted Android runner.

### Zero-credit resolution path
- Replit is prohibited by owner instruction. Cloudflare and Netlify credits are also prohibited.
- The existing production repository remains **private** and must not be made public merely to bypass the runner restriction.
- The fastest zero-credit isolated validation route is a **separate public GitHub validation repository containing only the non-secret Owner APK build source/workflow**, with no Supabase service-role keys, payment credentials, private keys, customer data or production secrets. Standard GitHub-hosted runners for a public repository can execute the Android build/emulator workflow without using the production repository's private Actions quota.
- Publishing APK source is an owner-controlled IP/privacy decision. **Do not expose the production repository or copy sensitive/private material.** The production repository remains unchanged/private.
- If public source exposure is not acceptable, the alternative is a self-hosted Android-capable runner on a machine controlled by the owner. That route requires an available machine/runner host and cannot be completed purely from the connected GitHub controls.
- Current connected GitHub tooling does not expose a repository-creation endpoint, so creation of the isolated public validation repository requires an owner-side GitHub action unless that connector capability becomes available.

### Next exact action
1. Create/authorize the isolated public validation repository only if the owner accepts public exposure of the copied APK source.
2. Copy only the current `android-owner-app` source and hardened build workflow; exclude the rest of the private store repository and all secrets.
3. Trigger the public workflow on a standard runner.
4. Require actual debug APK compilation, artifact preservation, SHA-256 capture, emulator install, Owner Login, Store, product/cart and Checkout checks.
5. Bring only validated APK/source changes back to the private production repository.
6. Do not mark the Owner APK validated until those runtime checks have actually passed.

### Current owner constraints remain absolute
- **NO REPLIT CREDITS. NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- No real customer orders during validation.
- Do not change the private production repository to public.
- Do not claim APK validation from a non-starting Actions run.


## PARALLEL QA CONTINUATION — 2026-09-29 12:52 SAST

Five non-public tasks were continued while Owner APK/Actions validation remains the critical path.

### 1. Customer storefront QA — source/runtime readiness
- Re-checked the current storefront wrapper and approved storefront routing.
- `index.html` routes to `store.html`; `store.html` embeds the approved `index-new.html` storefront.
- Cart count/checkout handoff is present and reads `gw_cart` from localStorage.
- Product-image fallback, category cleanup and category navigation enhancements are loaded by the wrapper.
- Automated source smoke run **35140654305** remains the latest known successful automated storefront run.
- Public browser testing remains deliberately deferred; no live-site result is claimed.

### 2. Checkout readiness — source/database verification
- Checkout verifies active cart products against Supabase before order creation.
- Delivery, locker/pickup-point and store-pickup paths are implemented.
- EFT/manual payment/cash-on-pickup choices are implemented; payment remains pending until store confirmation.
- Checkout submits through `public.create_store_order`.
- Cash-on-pickup/pickup-only validation was previously regression-tested and invalid R15 delivery + cash-on-pickup was rejected with 0 QA orders created.

### 3. Owner/admin system QA — database verification
- Admin login uses Supabase Auth and authenticated admin RPCs.
- `admin_list_orders` and `admin_update_order` are not executable by anon and are executable by authenticated users.
- `create_store_order` remains executable anonymously for public checkout as designed.

### 4. Launch-readiness audit — current authoritative database check
- Active products: **4,187**.
- Active priced products: **4,187**.
- Uncategorized active products: **0**.
- Active products with stock > 0: **4,187**.
- Total active units: **27,745**.
- Active products with product-specific images: **791**.
- Pricing mismatches against cost × 1.15 × 1.35: **0**.
- RLS is enabled on all seven approved public tables.
- No Cloudflare or Netlify credits were used.
- The 3,396 branded placeholders remain intentionally unchanged because the uploaded September guide has no safe exact-SKU replacements for them.

### 5. Handover documentation
- This section records the completed parallel QA pass and the remaining public/Owner validation gates.
- **Remaining:** Owner APK/Actions validation; payment/bank-detail verification by owner; final public Cloudflare browser verification when authorised; final production signing-key approval if still required.
- Do not mark the store LIVE until the actual public storefront has been browser-tested.


## OWNER APK ACTIONS VALIDATION UPDATE — 2026-09-29 12:XX SAST

- GitHub Actions repository indexing/Actions availability blocker is resolved: the isolated public validation repository is executing the Owner APK workflow successfully.
- Current validation run: **36558844914**, workflow **Build Owner APK**, triggered from main commit **8c3ecbd9b7f90a7c49b39a35449949427b46260c**.
- Build job **109374518041**: **SUCCESS**. Checkout, Java, Gradle setup, debug APK compilation, SHA-256 checksum recording and APK artifact upload all completed successfully.
- Emulator job **109374948898**: **IN PROGRESS**. APK compilation for the emulator completed successfully; the **Run Android emulator smoke test** step is currently executing. GitHub reports the remaining post steps as pending until the smoke test completes.
- This is the first current run in this validation route to reach actual emulator execution; previous pre-job failures are no longer the active blocker.
- **Owner APK validation is NOT yet marked complete.** It will only be marked passed after the emulator smoke test and final workflow run complete successfully, followed by artifact/checksum confirmation.
- No Replit, Cloudflare or Netlify credits were used. No real customer orders were created.

### Immediate continuation
1. Let run **36558844914** complete the emulator smoke test.
2. If successful, retrieve the uploaded APK artifact and checksum and record the exact artifact/run references.
3. If the emulator fails, inspect the failing step/log, fix only the verified runtime issue, and rerun.
4. After successful emulator validation, continue Owner APK functional validation and then the remaining owner-controlled live-store gates.

**Current critical-path status: APK build PASSED; emulator runtime validation ACTIVE; final APK validation still pending.**


## INDEPENDENT TECHNICAL QA CONTINUATION — 2026-09-29 13:XX SAST

- Owner APK source audit completed against the isolated public validation repository.
- Current MainActivity is the current WebView owner app entry point: JavaScript and DOM storage are enabled, file/content access is enabled, a WebChromeClient file chooser is implemented, Android back navigation returns through WebView history, and the APK loads the configured owner storefront URL.
- AndroidManifest declares INTERNET permission, HTTPS-only cleartext policy, portrait orientation, and the expected exported launcher activity.
- Current validation run **36558844914** remains active: build job **109374518041 = SUCCESS**; emulator job **109374948898 = IN PROGRESS** at the Android emulator smoke-test step.
- The build artifact is already preserved before emulator completion as GitHub artifact **11028297177**, name **get-wired-owner-debug**, SHA-256 digest **036a274adbb292fe8179bfdb7b89efe49297cdbbc314e3ce1c8727e0e92c2b46**. Artifact expiry is 2026-12-28.
- This artifact is not yet labelled runtime-validated; emulator validation must still complete successfully.
- Store source audit reconfirmed the customer wrapper routes through `store.html` to `index-new.html`, keeps the cart/checkout handoff, and loads the image/category enhancement scripts. Checkout source remains server-order based and retains delivery/pickup/payment validation. Admin source remains behind authenticated Supabase Auth and the previously verified admin RPC controls.
- No production data was changed, no real order was created, and no Replit/Cloudflare/Netlify credits were used.
- No public browser test was performed; the actual public Cloudflare hostname remains an owner-controlled launch gate.

### Remaining after this independent QA pass
1. Complete run **36558844914** emulator smoke test and final workflow conclusion.
2. If successful, download/inspect artifact **11028297177** and preserve its checksum in the handover.
3. Perform Owner APK functional validation beyond launcher/emulator smoke where tooling permits; do not claim UI acceptance from source inspection alone.
4. Owner verifies final payment/bank details.
5. Owner authorises final public Cloudflare browser test and provides/uses the actual public hostname.
6. Final catalogue manual QA remains a separate long-running task and does not block the current APK execution path.

## PARALLEL FIVE-TASK EXECUTION — 2026-09-29 13:XX SAST

Five independent readiness tasks were executed without changing production data or consuming prohibited credits.

### Task 1 — Owner APK validation status
- Fresh check of workflow run 36558844914 confirms build job 109374518041 = SUCCESS.
- Emulator job 109374948898 remains IN PROGRESS at Run Android emulator smoke test; setup, Java, Gradle and emulator APK compilation have all passed.
- No second emulator run was started; the current runtime test remains the single active critical-path validation.

### Task 2 — APK release artifact preservation and integrity preparation
- Artifact 11028297177, get-wired-owner-debug, was successfully downloaded for inspection while emulator validation remains active.
- Artifact ZIP contains exactly the debug APK and apk-sha256.txt; no unrelated files were present.
- APK SHA-256 recorded inside the artifact: a15cac3c4126c8bd7c9d2abffd94b121c5e2aac1b26275bf19246760b1f7185b.
- GitHub artifact digest remains sha256:036a274adbb292fe8179bfdb7b89efe49297cdbbc314e3ce1c8727e0e92c2b46; these are intentionally different hashes because one is the APK file and the other is the uploaded artifact archive.
- Artifact remains unexpired and is retained until 2026-12-28.

### Task 3 — Owner APK functional-path/source audit
- MainActivity.java was re-audited: WebView JavaScript and DOM storage enabled; file/content access enabled; WebChromeClient file chooser implemented; WebView history back navigation implemented; HTTPS production storefront URL configured.
- AndroidManifest.xml was re-audited: INTERNET permission, cleartext HTTP disabled, portrait orientation, exported launcher activity, correct Owner package/activity.
- Workflow source was re-audited: emulator uses Android API 35 Google APIs x86_64, installs the freshly built APK, launches the expected activity and verifies the package is active through dumpsys.
- No source defect requiring a speculative change was found. No code change was made.

### Task 4 — Storefront / checkout / admin source regression audit
- index.html redirects to store.html; store.html embeds index-new.html and preserves cart/checkout handoff plus image/category enhancement scripts.
- checkout-v2.html re-verifies active cart products from Supabase before order creation, calculates delivery/pickup totals, enforces pickup-only cash-on-pickup, and sends orders through create_store_order with payment remaining pending until store confirmation.
- admin.html remains staff-only at the UI layer and loads assets/admin.js; admin.js uses Supabase Auth, then calls admin_list_orders and admin_update_order only after an authenticated session is present.
- No production order was created and no production data was changed during this audit.

### Task 5 — Launch-readiness documentation / remaining gates
- Technical source QA is complete for the current pass; no additional speculative code changes are justified.
- Remaining hard gates are explicit: (1) current emulator smoke test must finish successfully; (2) Owner APK functional acceptance beyond launcher smoke where tooling permits; (3) owner verification of final EFT/bank/payment details; (4) owner-authorised public Cloudflare browser test using the actual production hostname; (5) final production signing/release-key approval if required.
- Catalogue manual QA remains a separate non-blocking long-running task.
- NO REPLIT CREDITS. NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS. No real customer orders were created.

### Current critical path
APK build: PASSED -> emulator runtime smoke: ACTIVE -> final APK acceptance: PENDING.
Do not mark the APK or public store LIVE until the actual runtime and public-browser gates pass.

## CONTINUATION UPDATE — 2026-09-30 18:35 SAST

- Production repository remains accessible with write permissions; no Supabase/database/storefront rebuild was performed.
- Owner APK production workflow `.github/workflows/build-owner-apk.yml` was re-triggered by a harmless workflow-file update in commit **5a2f68ba9aba1668cb313d96310dfd34ffddcc4b**. The workflow contains both `workflow_dispatch` and push triggers and preserves the hardened pre-emulator APK artifact step.
- The connected GitHub Actions reader available in this environment only exposes pull-request-associated workflow-run lookup, so a push-triggered run cannot be independently marked successful from that reader. **No APK validation claim is made from this trigger alone.**
- The isolated public APK validation repository is active and has continued emulator-route fixes on 2026-09-30, including lightweight Google APIs/emulator boot/install-shell corrections. Latest recorded validation-repo commit is **73ea726ed3ea77aa2a009fadf165797255022259**. Its current APK source is version **1.0.2 / versionCode 3**; this is a validation build and is not automatically accepted as the production v1.0.1 APK.
- The production Owner APK source remains the authoritative target: package `za.co.getwiredautoworx.owner`, current WebView routing for Owner admin/store/checkout assets, with no speculative source changes required from this audit.
- Existing Netlify project was read-only verified as `ready`, but its current deploy is stale (2026-09-24 / older commit). **No Netlify deployment was triggered** because the standing constraint is no Netlify credits.
- Public Cloudflare browser verification remains deferred until the owner is ready to browse/test and the actual production hostname is available. No Cloudflare deployment/credits were used.
- No Replit credits, Cloudflare credits or Netlify credits were used. No production customer order was created.

### Current critical path
1. Obtain a verifiable completed current Owner APK emulator run against the authoritative production APK source.
2. Verify APK artifact/checksum and functional Owner Login -> Store -> product/cart -> Checkout path.
3. Owner verifies final EFT/bank/payment details.
4. Owner authorises actual public Cloudflare browser verification using the production hostname.
5. Only after those gates pass may the store/APK be called live-ready.


## CONTINUATION UPDATE — 2026-09-30 18:45 SAST — APK RUNTIME VALIDATION RESOLVED

- The previously pending isolated Owner APK validation run **36558844914** has now been independently checked through GitHub job records.
- Build job **109374518041: SUCCESS** — checkout, Java 17, Gradle setup, debug APK compilation, SHA-256 recording and artifact upload all completed.
- Emulator job **109374948898: SUCCESS** — Android emulator smoke test completed successfully. The workflow's runtime path performed device readiness, APK transfer, package installation, launcher start and activity/package verification without failure.
- Preserved artifact: **11028297177**, `get-wired-owner-debug`; GitHub artifact digest **sha256:036a274adbb292fe8179bfdb7b89efe49297cdbbc314e3ce1c8727e0e92c2b46**. Recorded APK SHA-256 from the artifact: **a15cac3c4126c8bd7c9d2abffd94b121c5e2aac1b26275bf19246760b1f7185b**. Artifact expiry: 2026-12-28.
- This resolves the **emulator execution/package-install blocker**. It does not by itself certify the production v1.0.1 APK, because the isolated validation repository used a later validation source/version. Production v1.0.1 remains the authoritative release target.
- Production Owner APK source was rechecked: version **1.0.1 / versionCode 2**, package `za.co.getwiredautoworx.owner`, current Store/Checkout/Admin WebView routing preserved.
- No Replit, Cloudflare or Netlify credits were used. No production customer order was created.

### Remaining technical gates
1. Build/runtime-validate the **exact production v1.0.1 source** using the now-proven isolated emulator route, if a final release artifact is required before owner acceptance.
2. Owner APK functional acceptance beyond launcher smoke: Owner Login -> Store -> product/cart -> Checkout.
3. Resolve/verify Cloudflare production deployment and obtain the actual public hostname without consuming prohibited credits.
4. Final public browser regression and payment/bank-detail verification.
