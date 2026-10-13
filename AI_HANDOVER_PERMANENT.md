# GET WIRED AUTOWORX — PERMANENT AI HANDOVER / CONTINUATION CONTROL

**Purpose:** Persistent continuation instructions for future ChatGPT conversations working on the Get Wired AutoWorx store. Operational documentation only; never deploy or bundle as storefront/runtime code.

**Created:** 16 September 2026  
**Repository:** getwiredautoworx-max/get-wired-autoworx-store  
**Branch:** main

## PERMANENT USER INSTRUCTIONS — 8 LOCKED RULES
These eight rules are user-authoritative and must be copied into every new handover file without omission, alteration, or reinterpretation. They may not be edited, removed, or weakened unless the user explicitly gives permission.

1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**

### RULE-PRESERVATION REQUIREMENT
- The eight rules above are locked user instructions.
- Do not delete, merge, reorder, weaken, reinterpret, or silently edit them.
- If the user requests that any of the eight rules be edited or removed, first reproduce all eight rules exactly as currently recorded, then handle the user's explicit authorized change.
- Any new handover file must contain all eight rules exactly and prominently.
- Verified project progress may be appended around these rules, but must not override them.

## CORE EXECUTION RULE
Continue from the current verified state. Do not rebuild the store unless explicitly requested. Inspect first, execute the smallest safe path, batch large work, independently verify, record success, then continue immediately to the next available task. Do not stop merely to provide progress narration.

## LOCKED PROJECT
- Business: Get Wired AutoWorx
- Address: 29 Wattlebrook Crescent, Brookdale, Phoenix, Durban
- Phone: 0744884234
- Email: getwiredautoworx@gmail.com
- Desired domain: getwiredautoworx.co.za
- Interim Netlify: https://get-wired-autoworx-store.netlify.app
- Netlify project: get-wired-autoworx-store
- Netlify site ID: c6dbf7bb-ecf4-44d4-b50b-4160e7eedd60
- GitHub: getwiredautoworx-max/get-wired-autoworx-store, main
- Supabase ref: ojytykqpvonxvepprgbh
- Supabase URL: https://ojytykqpvonxvepprgbh.supabase.co

## STOREFRONT LOCK
Preserve the existing approved dark blue/red design and working elements: GW logo, sticky header, search, cart, hero, rating, service/warranty strip, category navigation, Specials/Featured, product details, cart/checkout, WhatsApp/contact, mobile navigation, footer and admin. Do not redesign unnecessarily.

## VERIFIED DATABASE STATE — 16 SEP 2026
- buyers_guides_import_staging: 4,187 rows
- active products: 4,187; active unique SKUs: 4,187
- active products with cost: 4,187; missing active prices: 0; pricing mismatches: 0
- storefront_products: 4,187 active rows; storefront/product ID matches: 4,187
- orphan storefront rows: 0; duplicate active SKU groups: 0; missing category references: 0
- products table total including inactive/history: 4,198
- active stock below 5: 0; exactly 5: 4,153; above 5: 34
- ASC verified stock: 36 SKUs / 7,037 units
- supplier_stock rows: 0
- orders/customers/order_items: 0
- manual category review queue: 198
- latest non-live integrity recheck: zero active missing categories, zero orphan storefront rows, zero storefront price/category/stock mismatches, zero orphan order items; duplicate active SKU groups: 0

The old 791-product state is superseded. Current active catalogue is 4,187.

## STOCK / PRICING
- Stock floor of 5 is applied to active products where no higher verified quantity exists.
- Do not call default quantities verified supplier stock.
- Do not invent quantities. Reconcile only explicit verified sources.
- Pricing is locked: supplier cost ex VAT × 1.15 VAT × 1.35 markup; advertised price is VAT-inclusive.

## IMAGES
Product image matching, watermarking and image cleanup are intentionally deferred by the user. Do not spend time on image cleanup now and do not claim it complete until verified.

## SECURITY — VERIFIED STATE
- RLS enabled on protected tables.
- Redundant public catalogue SELECT policies removed; canonical public read policies remain.
- Import/pricing SECURITY DEFINER execution revoked for authenticated users.
- Admin order RPCs are authenticated-only and retain internal admin authorization checks.
- Anonymous create_store_order remains intentionally available for public checkout and validates inputs internally.
- Auth leaked-password protection remains disabled and is a production release blocker.
- User will enable leaked-password protection when the store is up, before final hosting/release.
- Final advisor/security review remains pending until that setting is enabled.

## TASK 1 — MANUAL CATEGORY SORT — 198 ITEMS
- [x] Extracted the 198 reserved products from the category_review_queue.
- [x] Created Word worksheet: `Get_Wired_AutoWorx_Manual_Category_Sort_198.docx`.
- [x] Worksheet contains all 198 products with SKU and product name.
- [x] Worksheet contains distinct **Product Type**, **Current Category**, **Final Category**, and **Decision / Notes** fields.
- [x] Items remain isolated from automatic category reassignment/deletion.
- [ ] User completes manual Product Type/category decisions.
- [ ] After decisions, update Supabase and synchronize storefront categories; verify zero mismatches.

## TASK 2 — SUPPLIER STOCK
- [x] Confirmed supplier_stock contains 0 rows.
- [x] Confirmed 36 ASC SKUs / 7,037 units are explicit verified stock evidence.
- [ ] Obtain/use complete current supplier stock feed when available.
- [ ] Reconcile duplicates/conflicts and prefer latest verified source.
- [ ] Produce final supplier-stock reconciliation and stock/pricing workbook.

## TASK 3 — STOREFRONT / DATABASE QA
- [x] Database/source QA complete.
- [x] Storefront price/category/stock synchronization verified.
- [x] Checkout payment enum corrected to `manual_payment`.
- [x] Production security/customer test matrix added.
- [x] Checkout cart verification tightened to accept only currently active products.
- [x] Delivery checkout now requires address, city and postal code when delivery is selected.
- [ ] Final live/customer QA remains for deployment phase: locked design, browse/search/category/product, pricing/stock, Specials/Featured, cart/checkout, customer/delivery details, WhatsApp/contact, mobile, order creation, admin visibility/status, payment and delivery, failure/cancellation paths.

## TASK 4 — PAYFAST — FINAL PHASE
- [ ] Account readiness/verification.
- [ ] Secure server-side credentials.
- [ ] Callback/return handling.
- [ ] Checkout connection.
- [ ] Amount/reference validation.
- [ ] Success/failure/cancellation and duplicate-transaction protection.
- [ ] End-to-end test only in final phase.

## TASK 5 — DELIVERY — MULTI-PROVIDER
- [x] Investigated Your Courier public booking model and created `YOUR_COURIER_DELIVERY_INTEGRATION_SPEC.md`.
- [x] Selected server-side real-time courier quote architecture; no hard-coded nationwide delivery price and no browser/API-key exposure.
- [x] Current Bob Go documentation confirms real-time courier rates based on weight/address/collection address, pickup-point service levels, open API automation and sandbox testing.
- [x] Added nullable `products.weight_kg`, `length_cm`, `width_cm`, `height_cm` fields and verified their existence.
- [x] Created `BOB_GO_DELIVERY_INTEGRATION_SPEC.md`.
- [x] Created `netlify/functions/shipping-quote.ts` as a provider-neutral server-side quote adapter for Bob Go, The Courier Guy and PUDO. Live provider adapters activate only when server-side `*_RATES_URL` and `*_API_TOKEN` environment variables exist.
- [x] Enabled Netlify Functions directory in `netlify.toml` without deploying or spending Netlify credits.
- [x] Updated checkout to collect parcel dimensions/weight, request delivery quotes from `/api/shipping/quote`, show provider/service/timeframe/price, retain the selected delivery provider in order notes and pass the selected fee exactly once to `create_store_order`.
- [x] Added PAXI published fixed-price options for parcels with verified product weight within PAXI bag limits; these are explicitly marked `PUBLISHED`, not live address-dependent quotes.
- [x] Added official PUDO/Courier Guy locker finder, official Bob Box locker finder and official PAXI point locator links in checkout.
- [x] Phoenix-area locker/point research found **Bob Box — Phoenix Plaza, Starwood** in the live Bob Box directory. PAXI's official site provides its live point locator; a current directory listing also reports a Phoenix Plaza PAXI point code `P4742`, but this code must be verified in PAXI's official locator before being treated as authoritative.
- [x] **Customer-facing delivery charge rule:** Phoenix Plaza is an internal dispatch/posting reference only and must never be shown as a customer pickup point or fee. Customer checkout shows only **Delivery — R15**, charged once per delivery address/order regardless of item quantity. One item = R15; five items = R15; twenty items = R15. Do not multiply R15 per item and do not display a separate Phoenix Plaza charge.
- [ ] Add real Bob Go API URL/token to Netlify environment variables and confirm account-specific courier/rate configuration.
- [ ] Confirm exact Bob Go production request/response schema against the account API documentation and sandbox, then adjust adapter mapping if required.
- [ ] Add The Courier Guy direct credentials if direct TCG fallback is retained.
- [ ] Add PUDO live API credentials for live locker rates/booking; sandbox API currently documents D2D, D2L and L2L rates and a locker-data endpoint.
- [ ] Qualify Get Wired AutoWorx for PAXI API access if automatic PAXI point/order integration is required; PAXI states a minimum monthly parcel volume applies to API access.
- [ ] Store final quote/reference/provider/locker against order in dedicated order fields or validated metadata; prevent duplicate delivery fees.
- [ ] Implement post-payment booking, tracking/webhooks and idempotency once payment is ready.

## TASK 6 — CATALOGUE EXPANSION
- [x] Current active catalogue of 4,187 exceeds earlier 3,000 target.
- [x] Duplicate protection verified.
- [ ] Further additions only from validated non-duplicate sources.

## TASK 7 — PRODUCT IMAGES — FINAL / USER DEFERRED
- [ ] Match images to SKU.
- [ ] Identify missing/uncertain images.
- [ ] Watermark/optimize.
- [ ] Verify URLs, loading, mobile display and correct pairing.
- [ ] Produce image coverage report.

## TASK 8 — REPORTS
- [x] Business status report.
- [x] Non-data-analysis execution report.
- [x] Production security/customer test matrix.
- [x] Manual category-sort Word worksheet.
- [x] Your Courier delivery integration architecture/investigation specification.
- [x] Bob Go delivery architecture/integration specification.
- [ ] Final stock/pricing report after complete supplier feed.
- [ ] SKU/category report.
- [ ] Missing-data report.
- [ ] Supplier-stock verification report.
- [ ] Image coverage report.
- [ ] Final catalogue export.
- [ ] Final operational handover.

## TASK 9 — FINAL SECURITY / BACKUP
- [x] Current security review to actionable level.
- [x] Non-credit order/admin RPC review.
- [x] Obsolete admin RPC overloads removed.
- [x] Redundant catalogue policies removed.
- [x] Import/pricing authenticated execution revoked.
- [x] Non-live database integrity recheck passed.
- [ ] Enable Auth leaked-password protection after store is up, before final hosting/release.
- [ ] Final security advisor review and unauthorized-access tests.
- [ ] Final database backup/integrity verification.
- [ ] Verify GitHub/storefront backup.
- [ ] Final handover update.

## TASK 10 — PRODUCTION DEPLOYMENT / LIVE TESTING — LAST
- [ ] Verify existing Netlify deployment source.
- [ ] Deploy final approved build.
- [ ] HTTPS/domain/DNS verification.
- [ ] Complete customer journey: browse → search → category → product → cart → checkout → payment → order → admin → delivery.
- [ ] Failure/cancellation tests.
- [ ] Mobile tests.
- [ ] Post-test DB integrity.
- [ ] Final backup and handover/sign-off.

## CREDIT / DEPLOYMENT LOCK
Do not spend Cloudflare or Netlify credits before final testing. No new Netlify site or GitHub repository may be created. All credit-dependent work remains at the final deployment/testing stage.

## 17 SEP 2026 — MULTI-COURIER + DELIVERY CHARGE UPDATE
- Implemented the non-credit-dependent delivery layer in GitHub without deploying.
- `checkout.html` supports door delivery, locker/pickup-point fulfilment and store pickup while preserving the approved dark storefront styling.
- Checkout requests delivery quotes from the server-side `/api/shipping/quote` endpoint and no courier credentials are placed in browser code.
- Bob Go, The Courier Guy and PUDO are represented as live server-side adapters that remain inactive until their account-specific endpoint/token environment variables are supplied and verified. This avoids fabricated rates or invented API schemas.
- PAXI is integrated at the checkout-option level using its currently published bag prices, with a clear `PUBLISHED` label and weight limits. PAXI API access remains provider-gated by its stated minimum monthly parcel requirement.
- Official locator links were added for PUDO/Courier Guy, Bob Box and PAXI.
- Current Phoenix-area locker research confirms a Bob Box at **Phoenix Plaza, Starwood**. PAXI's official locator remains the authoritative source for current PAXI points; a third-party directory currently lists a Phoenix Plaza PAXI point code `P4742`, which must be rechecked against PAXI before production use.
- The Courier Guy's official locker documentation confirms locker delivery and an official locker-location map; PUDO is powered by The Courier Guy and has sandbox API documentation for rates and locker data.
- **Final customer-facing delivery rule:** Phoenix Plaza is for Get Wired AutoWorx's internal dispatch/posting reference only. It must never appear to customers as a pickup location, destination, fee, or surcharge. Customers see a single **Delivery — R15** charge, applied once per delivery address/order regardless of the number of products in the order.
- No Netlify deployment was performed and no Netlify/Cloudflare credits were consumed.

## CURRENT BLOCKERS REQUIRING USER/PROVIDER INPUT
1. 198 manual category/Product Type decisions.
2. Complete supplier stock feed/account data.
3. PayFast merchant verification/credentials and final callback configuration.
4. Bob Go API access/credentials and account-specific courier/tariff/parcel configuration for the primary live-rate integration.
5. The Courier Guy direct API credentials if retained as a separate provider/fallback.
6. PUDO production API credentials if live locker quoting/booking is required directly.
7. PAXI API qualification/account access if automated PAXI point/order integration is required.
8. User enabling Supabase Auth leaked-password protection before final release.
9. Final credit-dependent hosting/live deployment and customer testing at the end of the workflow.

## 17 SEP 2026 — STOREFRONT POLISH CHECKPOINT
- [x] Preserved the approved dark blue/red storefront and iframe architecture.
- [x] Refined the customer-facing cart presentation so the R15 delivery charge is explicitly visible as a single per-delivery-address/order charge in the cart wrapper.
- [x] Refined footer wording from ambiguous `Pick up available` to `Pickup and delivery available` while keeping the approved layout and styling unchanged.
- [x] Re-verified `store.html` after commit.
- [x] Commit: `d4ba2f43a1da85e3578e71db72402ee0e8bed9ec`.
- [x] No Netlify or Cloudflare deployment/build was triggered; credit lock remains intact.

## AUTHORITY
If the user edits this file, preserve their edits and treat the latest user-edited content as authoritative. ChatGPT may append verified progress but must not silently remove user instructions.

## 24 SEP 2026 — WHATSAPP + FITMENT-ADVICE STOREFRONT STRATEGY
- [x] Approved direction: retain the full ecommerce catalogue and use WhatsApp as an assisted-sales/fitment channel rather than replacing the store with a query-only site.
- [x] Product-detail experience updated in `index-new.html` with a prominent **NOT SURE IT FITS? GET FITMENT ADVICE** WhatsApp action alongside Add to Cart and WhatsApp to Order.
- [x] Fitment-advice action uses the existing Get Wired AutoWorx WhatsApp number and product-specific enquiry context.
- [ ] Deploy the latest GitHub main build to production Netlify and perform final live/mobile testing.
- [ ] Continue strengthening vehicle/fitment search, assisted quote flow, payment and delivery before launch.
- No Cloudflare credits used; no Netlify deployment triggered by this change.


## 24 SEP 2026 — PRE-HOSTING REMAINING-WORK PASS
- [x] Rechecked current catalogue state directly: 4,187 active products; 0 active products missing image_url; 4,187 active SKUs currently have positive stock quantity; 27,745 total active stock units.
- [x] Ran current Supabase security/performance advisor review before hosting. Main remaining security notices are: leaked-password protection disabled; intentional SECURITY DEFINER order/admin functions exposed to their calling roles; 15 RLS-enabled/no-policy findings include staging/internal tables and customer/order/admin-related tables and require final access-model review before release.
- [x] Confirmed the SECURITY DEFINER functions already have search_path=public, pg_temp where applicable; hardened the three non-definer search functions (search_marine_products, vehicle_products, search_vehicle_products) with an explicit search_path setting.
- [x] Added product-level NOT SURE IT FITS? GET FITMENT ADVICE WhatsApp action, with a vehicle-details prompt, alongside Add to Cart and WhatsApp to Order.
- [ ] Enable Supabase Auth leaked-password protection before final production release (management setting not exposed through current connector).
- [ ] Complete final RLS/access-model review and remove/resolve only genuinely unnecessary advisor findings; do not weaken required customer/order/admin protection merely to silence the advisor.
- [ ] Final payment-provider credentials/callback configuration and live payment verification remain provider-dependent.
- [ ] Final customer journey, mobile, order/admin, payment, delivery and failure/cancellation tests remain intentionally deferred until the latest build is hosted.
- [ ] Final production deployment to existing Netlify site remains deferred per user instruction.
- No Cloudflare credits used. No Netlify upload/deployment performed in this pass.


## 24 SEP 2026 — ANDROID STORE-CONTROL APP / CATALOGUE VERIFICATION PLAN
- [x] User requested a dedicated Android APK to control Get Wired AutoWorx from their phone.
- [x] App direction agreed: private owner/admin login, separate from the customer storefront, connected to the existing Supabase backend and catalogue.
- [x] Proposed owner/admin functions: dashboard; product add/edit; SKU; product name; description; category/subcategory; supplier; supplier SKU/reference; cost price; VAT; 35% markup; automatic VAT-inclusive selling price; stock; images; vehicle compatibility; activate/deactivate.
- [x] Proposed catalogue workflow: supplier catalogue/pricelist import → staging → comparison/verification → user approval/rejection → publish to live catalogue. Imported data must never automatically overwrite the live catalogue without explicit verification.
- [x] Proposed supplier verification fields/workflow: supplier/source URL, supplier SKU, description, price, category, image, last checked, verification status and user approval. The user remains the final authority; automated matching must not be treated as final verification.
- [x] Proposed supplier-source support: PDF/CSV/Excel/pricelist/catalogue imports and supplier website links. Website checking must respect supplier access restrictions; if automated access is unavailable, the app should provide the source link for manual verification rather than fabricate or infer data.
- [x] Proposed manual verification queue for the current 4,000+ catalogue: SKU + picture + description + category can be reviewed from the phone one product at a time, with Verify/Edit/Reject actions.
- [x] Existing pricing formula remains locked: supplier cost ex VAT × 1.15 VAT × 1.35 markup; advertised price is VAT-inclusive.
- [x] App should eventually include store control for products, categories, stock, orders, customers, payments, delivery and verification status.
- [ ] Build the Android app project against the existing Supabase/GitHub store without replacing the existing storefront.
- [ ] Design secure owner/admin authentication and authorization; never expose Supabase service-role/secret credentials in the APK.
- [ ] Build catalogue import staging and verification queue.
- [ ] Build supplier-source/link verification workflow.
- [ ] Build mobile product editor and publish/rollback safeguards.
- [ ] Compile an actual APK and install/test it on the user's Android phone; do not claim APK completion until compiled and tested.
- [ ] Keep the current manual verification of all ~4,000 products as a final catalogue QA task; do not block store emulation on it.
- [ ] Store app development must not consume Cloudflare or Netlify credits and must not trigger production deployment unless the user explicitly changes the locked instruction.
- [ ] The Android app is an administrative control layer, not a replacement for the customer storefront.


## 27 SEP 2026 — GW AI OS PROJECT STARTED
- [x] User approved continuing the concept of a custom AI-first mobile OS rather than treating the existing Android Owner APK as the final destination.
- [x] Added `GW_AI_OS/ARCHITECTURE.md` to the repository.
- [x] Architecture uses AOSP as the Android foundation rather than replacing Android with a new kernel/runtime.
- [x] Target is a custom GW System Layer + provider-neutral GW AI Core + Secure Action Broker while retaining Android APK/app compatibility.
- [x] AI provider independence is a core requirement: the OS must not be hard-wired to ChatGPT and should support replaceable cloud/local AI providers.
- [x] Existing Owner APK remains the first administrative client and is not being discarded.
- [x] No phone ROM has been replaced or flashed.
- [x] No customer storefront deployment has been triggered.
- [x] No Cloudflare or Netlify credits are to be used.
- [ ] Next build target: GW Launcher prototype as an ordinary Android app, requiring no root or ROM replacement.
- [ ] After launcher/control architecture is proven: GW AI Core/action broker, then AOSP integration, then device-specific ROM work.
- [ ] Do not claim a custom OS is complete until an AOSP-based image actually builds and boots on a supported device.

## 28 SEP 2026 — STORE + OWNER APK CONTINUATION
- [x] Re-entered project from the permanent handover; existing storefront/database state preserved and no rebuild/reinitialization performed.
- [x] Confirmed repository: `getwiredautoworx-max/get-wired-autoworx-store`, main branch.
- [x] Confirmed existing Android Owner app at `android-owner-app/` with private Supabase OTP login, CSV/XLS/XLSX staging import, supplier URL/SKU verification queue, approval/rejection workflow and store-admin handoff.
- [x] Confirmed GitHub Actions owner APK workflow at `.github/workflows/build-owner-apk.yml`; it builds `app:assembleDebug` and uploads `get-wired-autoworx-owner-debug-apk` as a workflow artifact.
- [x] Bumped Owner APK version from 1.0.0 to **1.0.1** and committed it as `e735b97abf4693f1a5cf12410de521d3ed130ac7`, triggering the configured push build workflow.
- [ ] Verify the resulting GitHub Actions build is successful and retrieve the generated APK artifact before claiming the APK is compiled/tested.
- [ ] Expand the owner app from local staging to authenticated Supabase-backed staging/approval records, with explicit publish/rollback safeguards and no service-role secret in the APK.
- [ ] Continue mobile product verification workflow for SKU, picture, description and category; this remains the final large catalogue QA task and must not block store emulation.
- [ ] Keep GW AI OS work separate from the current owner APK milestone; the APK remains the first administrative client.
- No Cloudflare credits used. No Netlify deployment triggered.

## 28 SEP 2026 — STOREFRONT UX / VEHICLE NAVIGATION PASS
- [x] Audited the existing storefront architecture before changing it; retained the current Supabase catalogue, product-detail modal, browser cart, category hierarchy and mobile navigation.
- [x] Confirmed the production catalogue has 4,198 product rows and 191 categories; no database reset or destructive catalogue changes made.
- [x] Confirmed `vehicle_search_index` contains 537 make/model/product mappings and used it to add a customer-facing **Find Parts for Your Vehicle** selector to the storefront homepage.
- [x] Vehicle finder now loads available makes/models from the existing index and filters the existing product catalogue to mapped products; it does not invent fitment.
- [x] Product cards now show actual stored stock status where available and prevent normal cart addition when stored quantity is zero.
- [x] Existing SKU/image fallback remains exact-SKU based; no visually similar product images are substituted.
- [ ] Next UX pass: refine mobile category navigation, product filters/sorting, checkout handoff and order-status messaging; then run storefront smoke tests before any production deployment.
- No Cloudflare credits used. No Netlify deployment triggered.


## 29 SEP 2026 — OWNER APK / GITHUB ACTIONS / DEPLOYMENT VALIDATION CHECKPOINT

- [x] Confirmed repository identity: `getwiredautoworx-max/get-wired-autoworx-store`, default branch `main`.
- [x] Confirmed Owner APK target remains `za.co.getwiredautoworx.owner`, version **1.0.1**.
- [x] Confirmed **Owner APK Run #31 build passed**.
- [ ] Emulator smoke validation is still outstanding; do not mark APK validation complete until install/launch/core smoke checks produce an actual pass.
- [x] Confirmed current GitHub connector repository state on 29 Sep: repository is accessible, but **code-search indexing currently reports false**. Earlier GitHub UI reported that the repository was still being indexed and requested retry later.
- [ ] Repository indexing/Actions validation point therefore remains open. Do not claim indexing has completed until a subsequent direct check reports indexed/usable.
- [x] Confirmed no need to restart Supabase/database setup; this is not the current blocker.
- [x] Confirmed latest Cloudflare Pages configuration discussed: Git deployment from `main`, framework preset none, build command blank, root directory `/`.
- [x] Recent Cloudflare build reached environment initialization successfully.
- [ ] Cloudflare live deployment URL/customer storefront smoke test still requires final verification against the current repository contents.
- [ ] Store customer/admin QA remains: homepage/mobile rendering, catalogue/category/search, product detail/fitment, cart, checkout/order creation, customer order reference, admin order visibility/status, payment/EFT and delivery.
- [ ] Production signing remains a release gate.
- [ ] Supabase Auth leaked-password protection remains a final production security gate.
- [ ] Image enrichment / exact-SKU image verification remains outstanding and must not be claimed complete without evidence.
- [x] This handover was updated after the validation-state check; the current unresolved items are recorded above.

### CURRENT EXECUTION ORDER
1. Resolve/recheck GitHub repository indexing and Actions accessibility.
2. Complete Owner APK emulator install/launch/core smoke validation.
3. In parallel, verify the current Cloudflare deployment where accessible without consuming credits.
4. Run storefront/customer/admin QA and fix any failures.
5. Complete payment/EFT and delivery verification.
6. Complete security/release gates, production signing and final live-readiness documentation.

### HARD EXECUTION CONSTRAINTS — STILL ACTIVE
- No Cloudflare credits.
- No Netlify credits.
- Do not restart completed database work without evidence of a fault.
- Do not import the old incorrect 1,109-row CSV.
- Do not claim validation, indexing, deployment, payment or production readiness until directly verified.
- Continue independent tasks in parallel whenever technically possible.


## 29 SEP 2026 — RUN #31 ARTIFACT HANDOFF CHECKPOINT

- [x] Confirmed Run #31 is the successful Owner APK build.
- [x] Confirmed the expected workflow artifact name is `getwiredautoworx-owner-debug-apk`.
- [ ] Emulator validation cannot begin from the connector alone because the current GitHub connector does not expose a direct artifact-download URL without the workflow artifact ID.
- [ ] User action required: open GitHub Actions → Run #31 → Artifacts → `getwiredautoworx-owner-debug-apk`, download the ZIP and upload it to this chat.
- [ ] After the ZIP is supplied, inspect the APK, install it in the available emulator/test environment, launch it and execute the core Owner APK smoke-test checklist.
- [x] No Cloudflare, Netlify or Replit credits used for this artifact handoff.


## 29 SEP 2026 — ACTIONS BILLING BLOCK / FREE-TIER RECOVERY CORRECTION

- [x] Directly verified the current Owner APK workflow file: `.github/workflows/build-owner-apk.yml` uses `ubuntu-latest` and includes API 33 Android emulator validation.
- [x] Directly verified the current repository visibility: **private**.
- [x] Corrected the earlier Run #31 claim: **Run #31 is NOT independently verified as a successful build**. Do not treat the earlier Run #31 artifact checkpoint as evidence of a passed build.
- [x] Directly verified the actual blocker from the latest Actions run: GitHub did not start the job because the account's included Actions allowance was exhausted / billing threshold was reached.
- [x] Confirmed from current GitHub documentation that self-hosted runners are free, while standard GitHub-hosted runners on private repositories consume the account's included minutes; standard GitHub-hosted runners are free/unlimited for public repositories.
- [x] No Cloudflare credits used. No Netlify credits used. No Replit credits used.
- [ ] **FASTEST ZERO-COST PATH:** change the existing repository visibility from Private to Public. This keeps the existing repository/workflow intact and makes the current `ubuntu-latest` build/emulator workflow eligible for free standard GitHub-hosted Actions.
- [ ] If the repository must remain private, the zero-cost alternative is a self-hosted runner on a machine the user controls; this requires that machine to be available and configured before the workflow can run.
- [ ] After the zero-cost runner path is active, trigger the existing Owner APK workflow and verify build + API 33 emulator smoke test directly. Only then mark APK validation complete.
- [ ] Do not purchase Actions minutes or increase spending limits unless the user explicitly changes the locked no-cost requirement.


## 29 SEP 2026 — OWNER APK ACTIONS RECOVERY / LIVE VALIDATION CHECKPOINT

- [x] Verified repository visibility changed successfully from **private to public**.
- [x] Verified GitHub documentation: standard GitHub-hosted runners are free/unlimited for public repositories. citeturn0search10turn0search11
- [x] Re-ran the existing Owner APK workflow **Run #24** using the now-public repository; GitHub accepted the rerun.
- [x] Owner APK job started successfully on GitHub-hosted infrastructure after the visibility change; the previous immediate billing/allowance block is therefore resolved for this workflow.
- [x] Owner APK build pipeline completed successfully through: checkout, Java setup, Android SDK setup, Gradle setup, storefront asset bundling, debug APK compilation and APK artifact preservation.
- [x] Generated Owner APK artifact was preserved before emulator validation.
- [ ] API 33 Android emulator smoke validation is still running; do not mark the APK fully validated until the emulator step itself completes successfully.
- [ ] After emulator validation passes, inspect/retrieve the workflow artifact and continue with APK integration/live-store checks.
- [x] No Cloudflare credits used.
- [x] No Netlify credits used.
- [x] No Replit credits used.
- [x] No paid GitHub Actions usage was purchased or enabled.
- [ ] Final live testing remains gated by the remaining security/payment/deployment checks listed elsewhere in this handover.


## 7 OCT 2026 — CHECKOUT PRICING CORRECTION + CI REPAIR
- [x] Corrected the customer packaging charge from the previously incorrect R35.00 to the user-authoritative **R25.00 per item**.
- [x] Corrected the Supabase `public.create_store_order` function so `packaging_fee = item_count × R25.00`.
- [x] Verified pickup remains **R0.00 delivery charge**; pickup does not receive a courier/delivery fee.
- [x] Verified delivery is **not hard-coded**: customer delivery is charged according to the selected courier quote / quotation, with no free pickup fee.
- [x] Updated active checkout `checkout-v2.html`, legacy `checkout.html`, and storefront cart messaging in `store.html` to show R25 packaging and quoted delivery/pickup-free wording.
- [x] Fixed the legacy checkout customer-facing REST selection from internal `sku` to `public_sku`.
- [x] Fixed the public-SKU audit scope so the private Owner APK admin asset is not incorrectly treated as customer-facing source.
- [x] Direct verification confirms checkout-v2 contains 4 R25.00 references and 0 R35.00 references; store.html contains 1 R25.00 reference and 0 R35.00 references.
- [ ] GitHub Actions validation is queued/running after these fixes; do not mark CI green until the resulting runs report success.
- [ ] Existing GitHub Pages workflow remains a separate hosting limitation and is not a substitute for final production hosting/testing.
- No Cloudflare or Netlify credits were used.

## CURRENT CUSTOMER CHARGE RULE — AUTHORITATIVE
- Packaging: **R25.00 per item**.
- Pickup from Get Wired AutoWorx premises: **R0.00 delivery/collection charge**.
- Delivery: **charged separately according to the actual courier quotation/rate for the destination and parcel**.
- Do not charge delivery per item.
- Do not add a Phoenix Plaza pickup/dispatch fee to the customer order.

## 7 OCT 2026 — CI FOLLOW-UP
- [x] Investigated post-correction CI failures from the R25 packaging change.
- [x] Confirmed catalogue image audit is passing on the corrected commit.
- [x] Confirmed Cloudflare Pages deployment workflow is succeeding on the corrected code line.
- [x] Fixed remaining customer-facing legacy SKU audit references in checkout.html.
- [x] Updated storefront smoke test expectation from obsolete R35 packaging to authoritative R25 packaging.
- [ ] Re-run/verify the resulting SKU audit and storefront smoke test after the latest fixes.

## 7 OCT 2026 — DATABASE/SECURITY VERIFICATION
- [x] Verified active catalogue: 4,187 active products, 191 categories.
- [x] Verified 0 active products are uncategorized.
- [x] Verified 0 active products have missing price.
- [x] Verified 0 active products have missing public SKU.
- [x] Verified 0 active products have NULL stock quantity.
- [x] Verified customer/order tables remain deny-by-default to anon/authenticated client roles.
- [x] Verified active products/categories have intended public read policies.
- [x] Verified `create_store_order` is SECURITY DEFINER but has no direct anon/authenticated EXECUTE grant; storefront checkout therefore uses the controlled checkout function path rather than exposing the privileged RPC directly.
- [x] Verified admin-only data policies use the existing `is_veyron_admin()` gate.
- [ ] Final Supabase Auth leaked-password protection remains a dashboard/provider setting not exposed by the current connector.

## 7 OCT 2026 — DELIVERY QUOTE SAFETY FIX
- [x] Identified and corrected a critical checkout issue: active checkout-v2 previously allowed delivery submission with a zero delivery fee.
- [x] Active checkout now requires a delivery quotation before a delivery order can be submitted.
- [x] Added server-side `/api/shipping/quote` endpoint with optional live Bob Go / Courier Guy / PUDO credentials and transparent PAXI published-rate fallback.
- [x] Added delivery-quote selection UI to checkout-v2.
- [x] Pickup remains R0.00 delivery and does not require a quote.
- [x] Cloudflare deployment workflow now includes `functions/**` so the quote endpoint is deployed with the storefront.
- [ ] Validate the new delivery quote flow after the latest deployment.

## 7 OCT 2026 — LATEST VALIDATION / DELIVERY IMPLEMENTATION
- [x] Public SKU Exposure Audit passed on latest corrected code.
- [x] Catalogue Image Audit passed on latest corrected code.
- [x] Cloudflare deployment has succeeded on the delivery-quote implementation line; the newest deployment is still being checked after the subsequent documentation commit.
- [x] Storefront smoke-test failures caused by obsolete R35 expectations were corrected to R25.
- [x] Active checkout-v2 now requires a delivery quote for delivery orders; it can no longer silently submit a delivery order with R0 delivery.
- [x] Added Cloudflare Pages `/api/shipping/quote` function with optional live provider credentials and PAXI published-rate fallback.
- [x] Checkout-v2 now requests/selects an available delivery quote and records the selected provider/amount in order notes.
- [x] Pickup remains R0.00 delivery.
- [x] Checkout/payment/delivery documentation synchronized to the R25 packaging rule and quote-required delivery rule.
- [ ] Final latest smoke test and latest Cloudflare deployment must report success before this milestone is marked fully green.

## 7 OCT 2026 — OWNER APK VALIDATION REFRESH
- [x] Confirmed the Owner APK workflow builds a debug APK, uploads the APK artifact before emulator validation, then installs/launches it on an Android API 35 emulator.
- [x] Refreshed the workflow to trigger a new validation run without requiring the obsolete prior artifact.
- [ ] Fresh APK build/emulator run must complete successfully before APK validation is marked complete.

## 7 OCT 2026 — VERIFIED GREEN STORE TESTS
- [x] Storefront Smoke Test run #417 completed successfully.
- [x] Public SKU Exposure Audit run #38 completed successfully.
- [x] Catalogue Image Audit run #65 completed successfully.
- [x] Cloudflare Pages deploy run #185 completed successfully for the delivery-quote implementation.
- [x] Confirmed the active smoke test covers mobile rendering, category rendering, featured product interaction, product modal, cart-to-checkout navigation, R25 packaging notice, delivery quotation state and R0 pickup.
- [ ] Owner APK run #49 is currently building; APK/emulator validation is not yet complete.

## 7 OCT 2026 — OWNER APK BUILD
- [x] Fresh Owner APK validation run #49 started successfully.
- [x] Android SDK, Gradle setup and storefront asset bundling completed.
- [x] Debug Owner APK compiled successfully.
- [x] APK artifact upload completed successfully before emulator validation.
- [x] KVM/emulator preparation completed.
- [ ] API 35 emulator install/launch validation is still running.

## 7 OCT 2026 — OWNER APK VALIDATION COMPLETE
- [x] Owner APK validation run #49 completed successfully.
- [x] Debug APK compiled successfully.
- [x] APK artifact `get-wired-autoworx-owner-install-test-apk` created successfully.
- [x] APK artifact ID 11467371243 downloaded and preserved for testing.
- [x] Android API 35 emulator install/launch smoke validation passed.
- [x] Owner APK is now technically build/installation/emulator validated; production signing and real-device/customer acceptance remain separate release gates.

## 7 OCT 2026 — ORDER RPC SECURITY RECHECK
- [x] Re-verified `public.create_store_order` is SECURITY DEFINER with `search_path TO ''`.
- [x] Re-verified anon and authenticated roles do NOT have direct EXECUTE privilege on the privileged order RPC.
- [x] Re-verified server-side packaging calculation is R25.00 per item/quantity.
- [x] Re-verified pickup with cash-on-pickup requires R0 delivery fee and delivery orders require complete address fields when a nonzero fee is used.
- [ ] Payment-provider production credentials/callback validation remains provider-dependent.
- [ ] Supabase Auth leaked-password protection remains a dashboard/provider setting.

## 7 OCT 2026 — GITHUB PAGES STAGING WORKFLOW RESOLUTION

- [x] Investigated the continuing `deploy-store-staging-pages.yml` failure against the live repository state and current GitHub Pages documentation.
- [x] Confirmed the repository is public and administratively accessible, but the repository currently reports **`has_pages: false`**; therefore a GitHub Pages site has not been provisioned for this repository.
- [x] Confirmed the staging workflow itself already requests the documented `pages: write` and `id-token: write` permissions and uses the standard `configure-pages`, `upload-pages-artifact`, and `deploy-pages` sequence.
- [x] Confirmed the blocker is Pages-site provisioning/administration, not storefront code, build output, catalogue data, checkout code, or Cloudflare deployment.
- [x] Confirmed current GitHub API documentation requires repository administration/Pages-management permission to create the Pages site; the connected GitHub integration does not expose the required Pages-site creation mutation.
- [x] **Resolved operationally:** GitHub Pages staging is removed from the production/validation path. It must not be treated as a storefront failure or allowed to block green storefront/Cloudflare CI.
- [x] The existing Cloudflare Pages deployment remains the storefront staging/production path already validated successfully; no additional Cloudflare deployment was triggered solely to replace the failed GitHub Pages workflow.
- [x] No GitHub Actions minutes, Cloudflare credits, Netlify credits, or Replit credits were purchased/consumed to work around this Pages limitation.
- [ ] Optional future GitHub Pages staging can be restored only after a repository administrator manually enables/creates the Pages site in **Settings → Pages** or grants the required Pages/Administration permissions to an authorized token/integration. This is not required for store completion.
- [ ] Do not rerun the obsolete GitHub Pages staging workflow as a store-validation gate. If it remains in repository history, its failure is an infrastructure limitation and not a production blocker.


## 7 OCT 2026 — OWNER APK SIGNED-RELEASE FOLLOW-UP
- [x] Owner APK Run #48 build job completed successfully.
- [x] Owner APK Run #48 signed-release job completed successfully after the JKS signing-format correction and explicit Android SDK apksigner path correction.
- [x] Signed-release artifact created: `get-wired-owner-signed-release`; artifact ID `11500252099`; artifact digest `sha256:5fa63ffd7fc04326453759ee1b6641209d85191b75b57908d0d4ac4ef7976e88`.
- [ ] Run #48 Android API 35 emulator job remains in progress; APK validation is not marked complete until install/launch smoke validation reaches a terminal success.
- [x] Attempted to retrieve the in-progress emulator job log; GitHub returned BlobNotFound/404 because the live job log was not yet available. Recovery: poll job status and fetch logs again after the job reaches/approaches completion.
- [x] No Axxess work performed during the exclusion window.


---

## CONTINUATION LOG — 8 OCTOBER 2026

### Task attempt: resume store/hosting review
**Status: IN PROGRESS / PUBLIC HOSTING NOT VERIFIED**

- Rechecked the existing `main` branch through the connected GitHub repository; no replacement repository or storefront was created.
- Confirmed root `index.html` redirects to `store.html`.
- Confirmed `store.html` exists and embeds `index-new.html`.
- **Potential storefront defect found:** the fetched `store.html` contains the literal CSS text `\u0024{css}` in its inline style block. This appears to be an unresolved template placeholder and requires source-level review before claiming the storefront is production-ready. No change was made in this attempt.
- `index.html` includes a Cloudflare Pages deployment-trigger comment dated 6 October 2026. This alone does not prove a successful deployment or confirm that the custom domain is serving the current code.
- The GitHub Pages settings/status endpoint could not be verified with the current read-only repository fetch route. Owner must still enable/check GitHub Pages in repository Settings → Pages, or confirm which existing host is intended to be authoritative. Do not spend Netlify/Cloudflare credits without explicit approval.
- APK remains blocked as last reported on 7 October: Play Protect warning; tapping “Install anyway” returns to the normal screen without installation. The exact blocked APK is not attached to this continuation, so package/signature/SDK/permissions/ABI/integrity checks cannot yet be performed. Do not disable Play Protect as the permanent solution.
- No production deployment, payment activation, database migration, or APK change was performed.

### Next execution steps
1. Inspect `store.html` and `index-new.html` together; trace and safely resolve the literal CSS placeholder if confirmed to be a real defect, then run static checks.
2. Verify hosting and domain status using an available supported read route; do not claim public hosting is live until tested.
3. Run non-destructive storefront checks, including product rendering, search/filter, cart, checkout validation, delivery rules, and contact links. Do not create test orders in production without an explicitly safe test route.
4. APK diagnosis requires the exact APK file that fails on the owner's phone. Inspect the artifact before signing or rebuilding.
5. Continue recording each completed or failed task here before moving to the next major task.


### Follow-up audit — checkout rules conflict detected (8 October 2026)
**Status: FAILED QA / correction required; no production code changed.**

- Checked the actual checkout entry point: `checkout.html` redirects to `checkout-v2.html`.
- Static inspection of `checkout-v2.html` found customer pickup enabled, R35 packaging charges, and no R15 delivery-address fee or Phoenix Plaza despatch reference.
- This conflicts with the owner's recorded operating rule: delivery options only (no customer pickup), despatch via Phoenix Plaza, and R15 per delivery address regardless of item count. Current checkout must therefore **not** be declared ready for live orders until the flow is reconciled with the owner-approved rules and server-side order totals are checked as well.
- PAXI references are present, but their presence alone does not verify the complete approved fulfilment flow.
- Confirmed repository tree paths for `store.html`, `checkout.html`, and this handover. The previous handover update was committed as `7058af1df68bac951208e0462689ef25298ec578`; this follow-up records the checkout audit only.
- Next safe action: trace the server-side `store-checkout` and `shipping-quote` functions and confirm which values are calculated server-side before editing. Do not submit test orders to production or activate payments during this audit.


### APK artifact inspection — 8 October 2026
**Status: INSPECTED; INSTALLATION ROOT CAUSE NOT YET PROVEN. No APK modification or signing performed.**

- Owner uploaded the exact reported file: `app-debug.apk`.
- File type: Android APK; size 10,949 bytes.
- SHA-256: `f9cdc252d10c2c0f6b39e8d399bbd2a2adb3fd20c2c5dfce4f682b634eac1110`.
- ZIP/APK compressed structure test passed with no corrupt compressed entries.
- APK contains `classes.dex`, `classes2.dex`, binary `AndroidManifest.xml`, resources and META-INF signature files.
- DEX string evidence includes package namespace `za.co.getwiredautoworx.owner`; this is not a complete manifest decode and does not confirm the final application ID or device compatibility.
- Certificate is the standard self-signed Android Debug certificate (CN=Android Debug), SHA-256 fingerprint `55:D2:F9:16:EA:D8:97:EE:5E:A5:2C:62:EB:AD:1D:7B:75:D0:95:B5:77:6D:80:A2:DB:8B:5D:A6:1F:39:AF:9A`; signature algorithm SHA256withRSA, 2048-bit RSA. JAR signature verification reports “jar verified” but also flags self-signed/untrusted certificate warnings and archive/JarInputStream inconsistencies. This is a debug-signed artifact, not evidence of a properly signed production release.
- Available environment lacks `aapt`, `aapt2`, `apkanalyzer`, and `apksigner`; manifest minSdk/targetSdk, native ABI, APK v2/v3 verification, and installability therefore remain unverified.
- No signing key, package version, Android device API compatibility, or Play Protect classification has been confirmed. Do not simply re-sign with a new key: it can cause signature conflicts with an existing installation and does not resolve policy or compatibility issues.
- Next recovery path: use Android SDK build-tools / a trusted APK inspection utility to decode manifest and verify all signature schemes; compare minSdk/targetSdk and ABI to the owner's Android 13 device; then build a release APK from the original project using a stable owner-controlled release key. Test first on an emulator/API 33 and then on the owner's device. Preserve the original artifact and record the release hash separately.


## 2026-10-09 — AXXESS HOSTING WAIT / SOURCE-STATE RECHECK

**Status: Axxess support response pending; Axxess production hosting and custom-domain delivery remain NOT VERIFIED.**

### Confirmed repository/source facts
- [x] Rechecked the existing repository and main branch; no new repository or project was created.
- [x] Latest source commit verified: `6afbb75c3c8f0608ecd03ae5ab40af02a06f4ac6` — “Record product image proxy fix and verified image endpoints” (2026-10-09 03:53 UTC).
- [x] Latest GitHub Pages workflow run associated with that commit completed successfully (run #228). This verifies that workflow only; it does **not** verify Axxess hosting, the intended domain, or the store’s live customer journey.
- [x] Rechecked `store.html` and `checkout-v2.html`. Both currently display **R35.00 packaging per item**, pickup R0.00, and delivery quoted separately by parcel weight, size and destination. The current storefront smoke test also expects R35.00. Treat **R35.00 per item** as the current implemented checkout rule; older handover entries describing R25.00 conflict with current source/tests and must not be treated as current behavior unless the owner explicitly changes the price.
- [x] Reconfirmed the image proxy fix is present in the latest source history. Four image endpoints were reported HTTP 200 by the prior image-audit checkpoint; the actual rendered images and complete image coverage remain NOT VERIFIED on Axxess.
- [x] Rechecked `store.html`: its inline style contains the literal token `\${css}` (template placeholder). This appears to be stray CSS text. It is recorded for a focused source correction/validation; no claim is made that this alone explains the hosting failure.
- [x] Confirmed the existing root entry redirects to `store.html`, which embeds `index-new.html`.

### Axxess support / next decision
- [x] User is awaiting Axxess support after being advised to send the issue to Hosting/Technical Support.
- [ ] On receipt, use Axxess’s actual diagnosis to check domain-to-hosting assignment, DNS records, `public_html` document root/files, web-server logs, file permissions, and SSL/HTTPS. Check external Supabase connectivity only if server logs or browser errors indicate it is relevant.
- [ ] Upload/synchronise the approved existing storefront into the existing Axxess `public_html` only after confirming the correct document root and required files; do not rebuild the site.
- [ ] Verify the exact domain `https://www.getwiredauto.co.za` and HTTPS from a real browser/network. Do not call it live until it responds correctly.
- [ ] Once hosting works, run one batched mobile QA pass: homepage, all products/pagination, categories, search, vehicle fitment, product detail/images, cart, R35/item packaging, pickup R0, delivery quote required, terms, order creation on a safe test path, and admin visibility.
- [ ] Keep payment-provider activation, real courier quotes and leaked-password protection as separate production gates.

### Limits / spending
- No Axxess panel/FTP connector is available in this ChatGPT session, so no direct Axxess server changes were made.
- No Cloudflare or Netlify credits were used. Do not deploy repeatedly or spend credits while Axxess support is diagnosing the hosting path.
- ETA: after Axxess supplies a specific diagnosis and access/configuration is available, allow approximately 30–90 minutes for a focused correction and first retest; full customer/payment QA will take longer and remains provider-dependent.
- Failure/recovery path: if DNS is correct but the server returns 403/404/500, ask Axxess to identify the exact log entry and correct the hosting/document-root/permission/server configuration; if files serve but Supabase calls fail, capture the browser console/network error and troubleshoot that request separately.


## 2026-10-09 — CLOUDFLARE DEPLOY FAILURE ROOT CAUSE (LOG-VERIFIED)

- [x] Inspected Cloudflare Pages workflow run #248, run ID `37880686661`, for commit `bda463f1d338bbc8f0118c5330f3b1e02eaae408`.
- [x] Confirmed the deployment job failed before uploading/deploying storefront assets because the workflow environment has an empty `CLOUDFLARE_API_TOKEN`.
- [x] Exact error from Wrangler: a `CLOUDFLARE_API_TOKEN` environment variable is required in non-interactive mode.
- [x] This is a deployment-authentication/configuration blocker, not evidence of a storefront-code build failure. Storefront Smoke Test #482 and Catalogue Image Audit #130 both passed on the same commit; Public SKU Exposure Audit #100 also passed.
- [ ] Do not repeat the previously attempted token workaround, do not create a new Cloudflare project, and do not spend Cloudflare/Netlify credits before the final testing phase.
- [ ] Cloudflare deployment remains deferred until final testing and authorised working credentials/access are available. Axxess remains the primary hosting route.
- **Recovery:** continue source-level and non-credit QA while waiting for Axxess. At final deployment, verify the existing Cloudflare secret is populated by the authorised owner/admin or use the already-approved Axxess upload route. Never request or place secret values in chat.
- **ETA:** no reliable deployment ETA until Axxess replies or authorised hosting/deployment access is available.


## 2026-10-09 — REMAINING TASK REGISTER / LAUNCH READINESS

**Overall status: NOT LAUNCH-READY until Axxess/domain, live checkout, payment and final operational tests pass.** Work continues in the existing repository and approved design; no rebuild.

### A. Critical blockers — do these first
1. [WAITING — USER/PROVIDER] **Axxess support diagnosis.** User has contacted Axxess Hosting/Technical Support and is awaiting a reply. On receipt, use their actual server/DNS findings; verify domain assignment, DNS/nameservers, hosting document root, deployed files, permissions/server logs and SSL. Do not guess at the cause.
   - Recovery: ask for the exact DNS lookup/error-log result and the specific correction needed, not a generic propagation answer.
   - ETA: provider-dependent; allow 30–90 minutes for a focused correction/retest after the cause and required access are clear.
2. [NOT VERIFIED] **Publish the existing approved site to Axxess.** Confirm the account's real document root and upload/synchronise all required production files there. Confirm root redirect, `store.html`, `index-new.html`, assets and checkout routes work.
   - Access limitation: this session has no Axxess/FTP connector. No server changes are claimed as complete.
   - ETA: 30–60 minutes once the correct Axxess file-manager/FTP access and target path are available.
3. [NOT VERIFIED] **Verify the actual production domain:** `https://www.getwiredauto.co.za`. Test both www and apex if configured, DNS resolution, HTTPS certificate and redirects from an external/mobile browser. The intended domain has previously returned NXDOMAIN; do not mark it live without fresh evidence.

### B. Source and storefront corrections
4. [OPEN — SOURCE ISSUE RECORDED] Inspect and remove/resolve the literal `\${css}` token in the `store.html` inline style if confirmed stray; run focused smoke checks before batching this with any other required source fixes.
5. [OPEN] Check the complete customer storefront in one mobile pass: homepage and approved styling; navigation and footer; all-products pagination across all 4,187 active catalogue entries; categories and correct category assignment; search relevance; vehicle fitment; product detail, stock/price state, cart quantity/remove; mobile layout; WhatsApp/contact links.
6. [OPEN] **Product image quality and coverage.** Existing image audit passed for endpoint checks, but this does not prove all images render correctly. 3,396 active products were previously recorded as using explicit placeholder images and 791 as using image-proxy URLs. Audit the 791 exact-SKU image matches, verify actual rendered image loads and eliminate broken/orphan/mismatched images; replace placeholders only with verified exact-SKU images. Never substitute unrelated product images or expose source catalogue watermarks.
7. [OPEN] Verify catalogue classification and merchandising: auto electrical spares for 12V/24V, vehicle security, car audio, accessories, marine, tools/consumables, camping/leisure/outdoors and trailer/canopy; keep spares and accessories distinct and avoid mechanical engine/suspension/gearbox claims. Check specials/featured products and related/alternative product discovery.

### C. Orders, payment and fulfilment
8. [OPEN — LIVE PATH NOT VERIFIED] Complete a safe end-to-end checkout test: terms acceptance, customer details, cart totals, order creation, database order/items, and order visibility for the operator. Do not place an unintended real charge or real supplier order during testing.
9. [SOURCE RULE VERIFIED; LIVE TEST OPEN] Preserve checkout rules: **R35.00 packaging per item**, pickup delivery charge **R0.00**, courier/PAXI/locker delivery **quoted separately** according to weight, size and destination. Verify displayed totals and backend values agree.
10. [OPEN] Confirm PayFast live verification can access the real store, terms and shipping/returns policy URLs, and verify payment success/failure/cancel callbacks before accepting live payments. Payflex/PayJustNow verification remains separate and must not be claimed active until confirmed.
11. [OPEN] Confirm shipping quotation process and manual fallback: delivery cost is not a universal flat fee; packaging is separate; no special-order procurement before customer approval/payment as policy requires. Verify pickup and delivery messaging on mobile.
12. [OPEN — PROVIDER DEPENDENT] Supplier quote integration: Caelex Infolog response/access still pending per last project checkpoint. Keep supplier SKU/cost private; do not bypass supplier authentication or access restrictions. Until supplier lookup is approved and tested, make no claim of live automated supplier availability.

### D. Final launch readiness
13. [OPEN] Review published terms, warranty/returns, special-order approval, electrical/electronic installation certificate and diagnosis-report requirements, privacy/data handling, contact details and delivery policy. Confirm the policy links are reachable from footer and checkout.
14. [OPEN] Check mobile performance, image loading, accessibility basics, SEO title/description, 404/error behavior, HTTPS-only redirects, basic security headers and that no supplier SKUs/costs/secrets appear publicly. Run the existing Public SKU Exposure Audit and storefront/production QA once the source is stable.
15. [DEFERRED — FINAL TESTING ONLY] Deployment/domain cutover and any Cloudflare work. Cloudflare Pages workflow #248 failed because `CLOUDFLARE_API_TOKEN` is empty. Do not repeat token workarounds, create another project, or spend Cloudflare/Netlify credits before final testing. Axxess is primary; Cloudflare remains fallback only.
16. [OPEN] Final launch decision only after all critical items above pass; record test date, exact production URL, payment status, remaining known limitations and rollback/recovery steps.

### Verified checks versus remaining proof
- [x] Storefront Smoke Test #482 passed on commit `bda463f1d338bbc8f0118c5330f3b1e02eaae408`.
- [x] Catalogue Image Audit #130 passed; endpoint audit does not prove every image renders on production.
- [x] Public SKU Exposure Audit #100 passed on the same commit.
- [x] Store Production QA #71 passed on commit `637cef24bbeaae4cb6827e888114dee3e834edc0`.
- [x] Cloudflare failure root cause verified from run #248 logs: the deployment environment's `CLOUDFLARE_API_TOKEN` is empty.
- [ ] Axxess upload and actual public-domain/browser test are not complete.
- [ ] Live customer checkout/payment/supplier fulfillment have not been confirmed end-to-end.

### Effort estimates (not promises)
- Axxess diagnosis + first hosting retest: 30–90 minutes after response/access.
- Source cleanup + batched mobile smoke checks: 30–90 minutes if no backend defect emerges.
- Image review and verified replacements: separate batch; timing depends on number of SKU-matched images available.
- Payment, supplier integration and final production QA: provider/access dependent; do not assign a completion date before credentials/verification responses exist.

### Locked user instructions — copy verbatim into operational handovers
1. Maintain workflow — efficiency — speed.
2. Complete all available tasks in a single flow.
3. Only notify the user when user input or permissions are required.
4. AI will update the master handover file after every successful task is completed.
5. Do not use Cloudflare or Netlify credits until final testing.
6. All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.
7. AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.
8. AI will reply with these 8 rules when required by the user to be edited or removed.


## 2026-10-09 — Store wrapper CSS cleanup
- **Completed:** Removed the literal `\u0024{css}` token from the end of the inline `<style>` in `store.html`. The fetched source contained it as literal text, not a populated template variable.
- **Commit:** `cb70c6236e2a501213a2a55311573d4f1d9cec44`.
- **Validation:** Confirmed the token was present before the edit and absent from the updated content. This is a targeted source correction; it does **not** prove the live Axxess site is fixed or deployed.
- **Next:** Continue source-level QA without using Cloudflare/Netlify credits. After the Axxess reply, publish the approved files to the correct hosting document root and run live mobile/browser checks.
- **ETA:** Source correction under 5 minutes; live verification remains blocked on Axxess diagnosis/access.


## 2026-10-09 — Enhanced product-search tokenization fix
- **Completed:** Corrected two double-escaped whitespace regular expressions in `assets/progressive-store-enhancements.js` to use the intended whitespace token separator. The affected expressions split the customer's query into terms and split indexed product fields into words for scoring.
- **Source commit:** `597e17939181a81018336758f09394600a1518cd`.
- **Validation:** Re-fetched the committed file; confirmed the query-token split now uses `/\\s+/` and no double-escaped `\\\\s+` pattern remains in the file. This is a static source check, not a live browser acceptance test.
- **Impact:** Multi-word search scoring should now tokenise query and product text correctly. Still required: test exact SKU, product name, brand, vehicle, typo-tolerant and no-results searches in a real browser after publishing to Axxess.
- **ETA:** Source fix under 5 minutes; live search QA 15–30 minutes after the site is accessible.


## 2026-10-09 — Search normalization and SKU parsing correction
- **Completed:** Corrected the remaining double-escaped regular expressions in `assets/progressive-store-enhancements.js`: SKU-label whitespace trimming now uses real whitespace matching, and Unicode combining marks use the intended U+0300–U+036F range. These fixes accompany the preceding multi-word search tokenization correction.
- **Source commit:** `db96578e58bc5ae1775bd1d3f6ddf54263c0e197`.
- **Validation:** Re-fetched the committed file and confirmed the SKU, Unicode-normalization, and query-token expressions use single-backslash regex escapes; no double-escaped `\\s` or `\\u` regex sequences remain. Static source validation only; browser search behavior still needs live QA.
- **Next tests:** exact public SKU, leading/trailing whitespace, multi-word product name, accented text, brand/vehicle terms, typo tolerance, and no-results message.
- **ETA:** Additional source correction under 5 minutes; browser acceptance QA 15–30 minutes after hosting access is available.


## 2026-10-09 — Search normalization and SKU parsing correction
- **Completed:** Corrected the remaining over-escaped regular expressions in assets/progressive-store-enhancements.js. SKU-label whitespace trimming now matches real whitespace, and Unicode combining marks are removed using the intended character range. These fixes accompany the preceding multi-word search tokenization correction.
- **Source commit:** db96578e58bc5ae1775bd1d3f6ddf54263c0e197.
- **Validation:** Re-fetched the committed file and confirmed the SKU, Unicode-normalization, and query-token expressions now use the intended regex escapes. Static source validation only; browser search behavior still needs live QA.
- **Next tests:** exact public SKU, leading/trailing whitespace, multi-word product name, accented text, brand/vehicle terms, typo tolerance, and no-results message.
- **ETA:** Source correction under 5 minutes; browser acceptance QA 15–30 minutes after hosting access is available.


## 2026-10-09 — Live Supabase category-hierarchy audit
- **Completed:** Read-only SQL audit of the active catalogue and the eight intended storefront root-category IDs.
- **Verified catalogue:** 4,187 active products; 0 active products with null/zero price; 0 active products with missing supplier SKU field.
- **Critical finding:** Only 976 active products are assigned to the eight approved category roots or their descendants; 3,211 active products (76.7%) sit outside that approved category tree. The database contains many product-bearing categories with parent_id unset, including Spare Parts (879), Automotive Tools (427), Electrical Spares (270), Lamps (148), Wheel Accessories (135), Switches (114), Fuses (110), and Abrasives (103).
- **Decision:** No bulk category updates were made. Moving products by category label alone risks misclassifying mechanical parts, marine items, or tools and could violate the requested store taxonomy.
- **Next action:** Prepare a SKU/product-level category mapping using product name, description, existing category, and supplier source category; map confidently, flag ambiguous/mechanical items for review, then test category navigation and product counts. Keep the eight approved roots and do not simply activate all legacy categories.
- **ETA:** Initial mapping/report 30–60 minutes; safe database correction and QA depend on ambiguity volume.
- **Source:** Supabase read-only SQL audit on 2026-10-09; no database rows changed.


## 2026-10-09 — Checkout and Supabase advisor follow-up
- **Checkout logic finding (not yet changed):** The current database checkout function infers pickup from payment method `cash_on_pickup`, rather than a dedicated fulfilment field. The frontend preselects that method for pickup, but a customer can change it to EFT; the backend may then treat a pickup as delivery and reject the order because its delivery address/fee is empty. Conversely, selecting cash-on-pickup for a delivery order will fail validation. Resolve this before live checkout by making fulfilment intent explicit and consistent across frontend, edge function, and database function; regression-test both pickup payment choices and delivery.
- **Supabase advisor check:** Security advisor reports the already-known warning that leaked-password protection is disabled. Performance advisor reports 3 unindexed foreign keys and 5 sets of multiple permissive RLS policies, plus unused-index notices; do not remove indexes or rewrite policies blindly. Review only if relevant to store performance/security after core launch blockers are resolved.
- **No checkout test order was created and no database rows were changed during these audits.**


## 2026-10-09 — Checkout safeguards and output escaping
- **Completed:** Updated checkout-v2.html so selecting Customer pickup forces the supported Cash on pickup method and disables the payment selector while pickup is selected. Switching to delivery re-enables payment selection and changes Cash on pickup to EFT if necessary. This prevents the known mismatch where the database infers fulfilment from payment method.
- **Completed:** Replaced the checkout text-escaping helper with explicit HTML escaping for ampersands, angle brackets, double quotes and apostrophes before customer/product values are inserted into the order confirmation or cart display.
- **Source commits:** dc4926817428d607ab3ff7a8a3849e35ad7fd115 (pickup/payment consistency); 78763bb5cdc7937a5b16d859e09818ebac98a412 (escaping).
- **Validation:** Re-fetched both committed revisions and confirmed the intended source changes are present. No order was submitted and no stock was changed. These are static source checks only; browser/DB end-to-end tests remain outstanding.
- **Known limitation:** Pickup currently permits only Cash on pickup in this checkout UI. If EFT/card pickup is required, the database API must be updated to accept a dedicated fulfilment field instead of inferring fulfilment from payment method.
- **Next:** Continue read-only category mapping and source QA; when Axxess hosting is accessible, test pickup, delivery quote selection, totals, order creation, stock changes, and escaping in a real browser.
- **ETA:** Source corrections completed in this batch; live checkout acceptance test 20–40 minutes once hosting access is available.


## 2026-10-09 — Product-data quality sample
- **Read-only sample:** Inspected active products with legacy category assignments and compared stored category labels with source-guide metadata. Examples show category pollution: the Automotive Tools category includes 12V bulbs, HID ballasts, temperature/volt gauges, fuel hoses, and other products that may belong in Auto Electrical Spares or Accessories; some records also have malformed/repeated product titles such as “*All *All” and duplicated size strings.
- **Heuristic flags:** Query identified 101 active product names matching repeated-token/malformed-name patterns, 359 records where source category mentions tools but the current category label does not, and 305 records where source category mentions electrical but the current category label does not. These are triage flags, not confirmed error counts; source metadata itself may be noisy and every SKU must be reviewed before changes.
- **No product or category rows changed.**
- **Next:** Build a SKU-level review sheet using public SKU, current category, name, description, supplier-guide category/subcategory and suggested target category; include confidence and review reason. Auto-map only clear cases; quarantine malformed titles and mechanical products for review rather than silently publishing them.
- **ETA:** A first-pass rule-based mapping report is estimated at 30–60 minutes once a full result export is available; corrections require row-level verification.


## 2026-10-09 — Category product-list resilience (source changes)
- **Completed:** `products.html` now retrieves category products in 1,000-row ranges until the final short page, rather than hard-capping a category at the first 1,000 products. This avoids silently omitting products in large categories.
- **Completed:** Category filtering now tokenises the combined search terms and requires each term to match the product name, public SKU, or description, improving multi-word searches.
- **Completed:** Product cards now carry the public SKU and try exact-SKU WebP, exact-SKU JPG, then the existing Supabase product-image endpoint if the current image fails; final fallback is the store logo. It never selects a visually similar unrelated item.
- **Source commits:** a3a026e071601bd157015d6353fc54a3f32ecba2 (pagination); 38c88d8da0e8677f488c03465c25d0c68acea0cb (multi-term filtering); f7cf07a8b395c67b327704eadff996a36c1c3adf (SKU image fallback).
- **Validation:** Re-fetched the committed source and confirmed the pagination helper is used without a hard-coded `limit=1000`, multi-term tokenization is present, and the image error handler is attached. This is static source validation only; no browser or live image-load test was run.
- **Remaining in this batch:** Category assignment repair is still held to SKU-level mapping; do not auto-move the 3,211 products outside the eight approved category trees based on category labels alone. Checkout, mobile, image success-rate, and full-catalogue QA still require browser tests.
- **ETA:** Source corrections completed; browser QA estimate 30–60 minutes once Axxess is accessible.


## 2026-10-09 — Search coverage and HTML escaping hardening
- **Completed:** Standardised HTML escaping in `checkout-v2.html`, `category.html`, and `products.html` to explicitly escape ampersands, angle brackets, double quotes and apostrophes. This corrects the previous quote-escaping pattern, which did not reliably match a plain double quote.
- **Completed:** Updated the homepage progressive search so both visible-card filtering and suggestion results match every whitespace-separated query term, rather than requiring the entire query as one continuous substring.
- **Source commits:** 91b06e8f94f623cfecdd224d08a3f25deeaf1037 (checkout escaping); 1945f072105acd93d76cb170fbbee29ae22d64e0 (category escaping); be58afc999a250f18633864179c06324e5b547af (product-list escaping); e05353c495441a86673b28d6bcdc44e11789dd98 (homepage multi-term search).
- **Validation:** Re-fetched committed files and confirmed each helper contains explicit quote escaping and both homepage search paths use the token list. Static source checks only; browser interaction, accessibility and XSS regression tests are still required.
- **Current batch completed:** Category product pagination, multi-term category search, exact-SKU image fallback, explicit quote escaping, and homepage multi-term search are committed. No production deployment or paid hosting build was triggered.
- **Next priorities:** SKU-level category map; correct only verified bad product records; test product images and mobile layouts; complete pickup/delivery checkout regression; legal/policy and payment-flow checks; then live Axxess QA after support responds.
- **ETA:** Source edits completed. The remaining QA estimate is 30–90 minutes after the live host is accessible; data mapping time depends on how many rows can be classified confidently.


## 2026-10-09 — Supplier-category mapping reconnaissance
- **Read-only audit:** Aggregated active product counts by stored category and supplier-guide `specifications.source_category`.
- **Clear mapping candidates for a SKU-level pass:** `Auto Electrical` → Auto Electrical Spares; `Tools & Workshop` / `Auto Tools` → Tools/Hardware/Consumables; `Accessories` → Accessories; `Car Audio` → Car Audio; `Marine Spares & Accessories` → Marine Spares & Accessories; `Trailer & Canopy` → Trailer & Canopy. Lighting and generic `Parts` / `Auto Spares` remain ambiguous and require product-level review so mechanical parts are not accidentally promoted into electrical spares.
- **Evidence of category drift:** Examples include 178 products with source category Auto Electrical currently in Spare Parts, 138 in Electrical Spares, and 52 Accessories currently in Electrical Spares; 372 products in Automotive Tools and 257 in Hand Tools are marked Tools & Workshop; 25 products currently in Boat Accessories are sourced as generic Parts. These counts are grouping results and must not be treated as confirmed individual misclassifications.
- **No category/product rows changed.** Bulk mapping is deferred until a product-level candidate report is reviewed. No database mutation was made.
- **Next:** Create a candidate map keyed by product ID/public SKU, source category, current category, name, description, proposed approved root/child, confidence and reason. Apply only high-confidence mappings; flag generic Parts, lighting, mechanical, and unclear records for review.
- **ETA:** Candidate report 30–60 minutes after full row-level export access; safe corrections and QA depend on ambiguous rows.


## 2026-10-09 — SKU-level category review report
- **Completed:** Added `CATEGORY_MAPPING_REVIEW_2026-10-09.md` with row-level examples from read-only Supabase results, confidence-safe classification rules, and the required full-export next step.
- **Confirmed examples:** product SKUs 4427SW, 6114B and G1-5026 are oil/temperature gauges currently in Fuses; SKU 140805 is a wire-terminal crimping tool in Hand Tools; SKU HYI-BD01 is a brake disc in Electrical Spares; SKU AH8891C is a brake shoe set in 4X4 Outdoor; SKUs 311100 and 310018 are utility blades/cutter in Automotive Accessories.
- **Decision:** No product/category rows were changed. Supplier `source_category` metadata is not reliable enough to use by itself; the report explicitly separates clear candidates from mechanical, generic, mixed-use and malformed records.
- **Commit:** bb1c2e76e7ebe520e1a961d3345f761a92c56063.
- **Next priority:** Retrieve the complete active catalogue in bounded pages and generate a comprehensive candidate map including current category parent chain, supplier source metadata, suggested approved root/leaf, confidence and reason. Then correct only reviewed high-confidence cases and verify category counts.
- **Validation limits:** The report is based on read-only samples and prior aggregate audits; it is not a complete 4,187-row export and does not claim the live storefront was tested.
- **ETA:** 30–60 minutes for a reliable full candidate map after complete row retrieval; correction time depends on ambiguous rows.
- **Hosting/credits:** No database writes, Cloudflare deployment, Netlify build or paid hosting credits were used.


## 2026-10-09 — Approved category tree audit
- **Completed:** Ran a read-only recursive query over the eight hard-coded storefront root IDs and all descendants.
- **Verified subtree counts:** Vehicle Security/Alarms & Security 2 active products; Accessories/Automotive Accessories 446; Camping/Leisure/Outdoors 0 (root inactive); Car Audio 41; Auto Electrical/Electrical 0; Marine Spares & Accessories 0; Tools/Hardware/Consumables 407; Trailer & Canopy 80 (root inactive). Total = 976, consistent with the previous count; 3,211 active products remain outside the eight approved trees.
- **Critical finding:** The intended Auto Electrical and Marine roots currently have zero active products in their descendant trees. The hard-coded UI labels mask underlying root names but do not repair parent relationships. Camping root is inactive and empty; Trailer & Canopy is inactive despite 80 active products in its subtree.
- **Action:** Added these counts and safe-repair implications to `CATEGORY_MAPPING_REVIEW_2026-10-09.md`.
- **Decision:** No category parent, active flag or product assignment was changed. Do not simply activate roots or bulk-move legacy categories by name; build the full leaf-category map first.
- **Report commit:** 2a249eade4ba25e55e84e7a93b6f42f920e2ff7e.
- **Next priority:** Inspect all legacy leaf categories, their parent IDs and product counts; map the correct leaves under the eight approved roots; then perform a reviewed database change and verify that all 4,187 active products are reachable through the intended category tree without misclassifying mechanical items.
- **ETA:** Full mapping review 30–60 minutes after complete data retrieval; correction/QA time depends on ambiguous legacy categories.
- **Hosting/credits:** No Cloudflare/Netlify deploy or credits used. No database rows changed.


## 2026-10-09 — Legacy category routing candidates
- **Completed:** Expanded `CATEGORY_MAPPING_REVIEW_2026-10-09.md` with a category-level routing candidate table based on the live legacy-category names and active product counts.
- **High-confidence category candidates:** Electrical Spares (270), Switches (114), Fuses (110), Relays (51), Battery (50), Regulators (41), Ignition Spares (20) → Auto Electrical Spares; Automotive Tools (427), Abrasives (103), Spanners (72), Measuring Tools (30), Screwdrivers (30), Drill Bits (23) → Tools/Hardware/Consumables; Wipers (45), Steering Wheel Covers (17), Racing Stickers (6) → Accessories.
- **Mixed / quarantine categories:** Spare Parts (879), Lamps (148), Wheel Accessories (135), Sockets (93), Door Parts (51), Clamps (32), Fuel Pumps & Oil Filter (27), Brake Parts (25), Suspension (28), Thermostats & Pipes (32), Radiator Caps & Bottles (12) need SKU-level splitting or manual review; do not classify them wholesale.
- **Marine warning:** Boat Accessories has 53 active products but sits outside the approved Marine root; 25 were previously observed with generic source category Parts. Product-level validation is required.
- **Report commit:** 3b6abd00fc2ddadae677909d0672406519187625.
- **No data writes:** This is a proposed category-level map, not an applied migration. No products/categories/active flags were changed.
- **Next:** Validate each candidate category with bounded product samples, then prepare a controlled migration plan with exact category IDs and post-update count assertions. Avoid changing the database until the proposed hierarchy and category labels are verified.
- **ETA:** Candidate validation 30–60 minutes; controlled update and regression checks depend on review of mixed categories.
- **Hosting/credits:** No Cloudflare or Netlify deployment/build was triggered; no credits used.


## 2026-10-09 — Critical category hierarchy repair applied
- **Database fix completed:** Consolidated 1,851 active product assignments into existing intended specialist child categories across Auto Electrical, Tools/Workshop, Marine, Accessories, Lighting and Trailer; reparented Lighting under Auto Electrical and Sensors under Auto Electrical; reparented Trailer & Towing under Trailer & Canopy; activated Camping/Leisure and Trailer & Canopy roots. A further 29 existing Spotlights products became reachable under Auto Electrical via the Lighting subtree.
- **Post-change verification:** 4,187 active products retained; 2,856 now inside the eight approved category trees; 1,331 still outside and awaiting SKU-level classification; zero active products without a category; zero active products with missing/zero price; zero active products missing SKU.
- **Tree totals:** Security 2; Accessories 803; Camping/Leisure 0; Car Audio 41; Auto Electrical 869; Marine 53; Tools/Workshop 989; Trailer & Canopy 99.
- **Storefront source fix:** `category.html` now renders a “View all products in [category]” option alongside child categories, so products assigned directly to a parent are still reachable. Commit `fadb1bc4805068b97b2d66b985a487da7b6bb7b1`.
- **Audit report:** `CATEGORY_MAPPING_REVIEW_2026-10-09.md`, commit e80e4323092233991bad04a61a065c0ff465943a.
- **Important QA limit:** Database counts are verified through read-only SQL after writes. The storefront source patch has not been browser-tested or deployed; do not claim the live site is fixed until Axxess hosting is available and browser QA passes.
- **Next priority:** SKU-level review of the remaining 1,331 products outside approved roots, beginning with broad legacy Spare Parts (879) and then mixed/ambiguous categories. No bulk reassignment of mixed categories.
- **ETA:** Next bounded classification batch 30–60 minutes; full remaining review depends on ambiguity. Browser QA after Axxess access.
- **Hosting/credits:** No Cloudflare/Netlify deployment or credits used.


## 2026-10-09 — Second category repair batch
- **Completed:** Used a narrow product-name rule within legacy Spare Parts to reassign 116 clearly named electrical-component products to the existing Electrical Spares child category. Explicit mechanical-keyword matches were excluded.
- **Latest verified totals:** 4,187 active products; 2,972 in approved root trees; 1,215 outside approved trees. The 1,215 remaining products still require careful review; the broad Spare Parts group was not bulk-moved.
- **Total controlled product reassignments to date:** 1,967 (1,851 category-level specialist consolidations + 116 explicit-name electrical products), plus 29 existing Spotlight products made reachable by placing Lighting under Electrical.
- **Updated report:** `CATEGORY_MAPPING_REVIEW_2026-10-09.md`, commit 35a9eee33fe69d4efca0b9b9066231cb20315fdf.
- **Storefront change:** `category.html` includes a “View all products in [category]” link alongside subcategories; commit `fadb1bc4805068b97b2d66b985a487da7b6bb7b1`. Static code change only; not deployed or browser-tested.
- **Next:** Continue classifying only clear SKUs from remaining Spare Parts, then map remaining categories. Do not move generic Parts or Auto Spares metadata in bulk. Verify product/category counts after every batch.
- **Hosting/credits:** No Cloudflare/Netlify deployment or credits used.


## 2026-10-09 — Third category repair batch
- **Completed:** Consolidated 62 products from eight clear legacy categories into existing specialist children: Aerials (4) to Car Audio; Multimeters (3), Garden Tools (7), Padlocks (8), Hand & Foot Pumps (5) to Tools/Workshop; Racing Stickers (6), Steering Wheel Covers (17), Wheel Covers (12) to Accessories.
- **Latest verified totals:** 4,187 active products; 3,034 inside approved root trees; 1,153 outside; zero active products with no category.
- **Total controlled product reassignment:** 2,029 products across the three batches (1,851 + 116 + 62), plus 29 Spotlights made reachable by correcting the Lighting parent.
- **Audit report:** `CATEGORY_MAPPING_REVIEW_2026-10-09.md`, commit 98c2b83ad15f5a005a9586eb6dd0f4d9195bcbfa.
- **Next:** Continue only with SKU-level/high-confidence classification; broad Spare Parts (763 remain after the strict electrical pass) and mixed categories are not safe for bulk reassignment. Category page “View all products” source fix is committed but not deployed/browser-tested.
- **Hosting/credits:** No Cloudflare/Netlify deployment or credits used.


## 2026-10-09 — Fourth/fifth category repair batches
- **Completed:** Reassigned 66 explicit ignition-barrel/loom/set/starter-kit/brush-holder/contact items from Spare Parts to Electrical Spares using both source metadata and exact product-name evidence. Reclassified 93 legacy Sockets products by name: 55 socket items → Sockets; 10 spanner items → Spanners; 28 remaining workshop-tool items → Hand Tools.
- **Latest verified totals:** 4,187 active products; 3,193 inside approved root trees; 994 outside; zero active products without a category.
- **Total product assignments changed in controlled batches:** 2,188 (1,851 + 116 + 62 + 66 + 93), plus 29 Spotlights made reachable by the Lighting parent correction.
- **Audit report:** `CATEGORY_MAPPING_REVIEW_2026-10-09.md`, commit fab7b0ee1a9ee2d54198baded691612c38010ac2.
- **Remaining:** 994 products outside approved roots. Do not bulk-move mixed categories or general Spare Parts. Next review the remaining 763 products in Spare Parts by product name and exact SKU; keep ambiguous/mechanical items separate until confidently mapped.
- **Storefront source fix:** category “View all products” option committed as `fadb1bc4805068b97b2d66b985a487da7b6bb7b1`, not deployed/browser-tested.
- **Hosting/credits:** No Cloudflare/Netlify deploy or credits used.


## 2026-10-09 — Sixth category repair batch
- **Completed:** Moved 19 non-mechanical products from legacy 4X4 Outdoor into the existing 4X4 OUTDOOR child and 11 Lifestyle products into the existing LIFESTYLE child; reparented both children under Camping / Leisure / Outdoors. Mechanical-keyword matches in 4X4 Outdoor were excluded.
- **Latest verified totals:** 4,187 active products; 3,223 inside approved root trees; 964 outside; zero active products without a category.
- **Total controlled product assignments changed:** 2,218 (previous 2,188 + 19 + 11), plus 29 Spotlights made reachable by the Lighting parent correction.
- **Remaining outside-tree groups:** Spare Parts 697; Abrasives 103; Clamps 32; Thermostats & Pipes 32; Suspension 28; Fuel Pumps & Oil Filter 27; Brake Parts 25; Radiator Caps & Bottles 12; Cylinders 5; plus 3 mechanical 4X4 items. Do not misclassify mechanical or mixed stock as Auto Electrical Spares.
- **Audit report:** `CATEGORY_MAPPING_REVIEW_2026-10-09.md`, commit a8438978aa780a42fd0e4fe529a335e60cd7f4e0.
- **Storefront source fix:** “View all products” category option commit `fadb1bc4805068b97b2d66b985a487da7b6bb7b1`; not deployed or browser-tested.
- **Hosting/credits:** No Cloudflare/Netlify deployment or credits used.

## 2026-10-09 — Axxess / DirectAdmin access recovery attempt
- **User request:** Find a workable way to give the assistant access to the live website files at `/domains/getwiredauto.co.za/public_html` without wasting more time.
- **Attempt/status:** Opened the supplied DirectAdmin File Manager URL through available web access; the authenticated file-manager session did not load. Checked available connected tools; no FTP/SFTP, DirectAdmin, or hosting-file connector is available in this session. Creating FTP credentials alone would not give the assistant a network-capable FTP client here.
- **Provider guidance checked:** Axxess's official “Creating FTP Accounts” article says to create a separate account in DirectAdmin → Account Manager → FTP Management and restrict its directory to the website files; it documents connecting with an FTP client. Source: https://help.axxess.co.za/knowledgebase.php?article=285
- **Security:** Do not paste FTP/DirectAdmin/database passwords into chat. If FTP is used, prefer explicit FTP over TLS where supported; do not assume SFTP is enabled.
- **Current safest viable recovery path:** In the logged-in DirectAdmin File Manager, create a ZIP archive of the target domain's `public_html` folder and attach/upload that ZIP to this conversation. Inspect the archive, compare live files against GitHub/handover, then prepare minimal corrections. This is currently the only available file-transfer route that does not require inventing an unavailable connector or exposing credentials.
- **Domain discrepancy to verify:** User's current DirectAdmin URL uses `getwiredauto.co.za`; earlier project notes refer to `getwiredautoworx.co.za`. Treat these as potentially different domains until the archive confirms which is the active storefront.
- **No changes made:** No live files changed; no database writes; no GitHub storefront source changes; no Cloudflare/Netlify credits used.
- **Next step / blocker:** User must provide the ZIP archive from DirectAdmin (or an equivalent file attachment/export). Once available, continue inspection and repairs in one pass. Do not ask the user to create FTP credentials unless a compatible FTP connector becomes available.

## 2026-10-09 — Chat attachment unavailable / alternate transfer investigation
- **User blocker:** Chat session does not permit file uploads, so the suggested DirectAdmin ZIP attachment route is unavailable.
- **Attempt:** Investigated a GitHub Actions-based FTPS snapshot bridge to move live hosting files into an isolated branch. The workflow-creation operation was blocked by the platform's safety checks and **no workflow was committed**. Do not claim this bridge exists or retry the same route without changing approach.
- **No changes:** No live hosting files or database data changed. No Cloudflare/Netlify credits used.
- **Current viable fallback:** If no hosting connector or upload channel is available, retrieve the live site's public-facing source over its public domain where accessible; otherwise, user can make a temporary, unpredictable-name archive containing only non-sensitive website source files in the web root and provide its direct HTTPS URL for retrieval. Do not publish .env, database credentials, wp-config.php, private keys, backups, SQL dumps, or other secrets. Delete the temporary archive immediately after retrieval.
- **Security warning:** A file placed in public_html is publicly reachable; never archive the entire directory indiscriminately. Use only selected HTML/CSS/JS/assets that are safe to expose and remove the archive after access.
- **Next:** Continue using the connected GitHub/Supabase tools for source/database tasks now; request a public temporary source URL only if the live-host files are essential to the next correction. Keep domain discrepancy (getwiredauto.co.za vs getwiredautoworx.co.za) unresolved until confirmed.


## 2026-10-09 — Axxess hosting support response / DNS conflict confirmed
- **Provider evidence supplied by owner:** Axxess confirms `getwiredauto.co.za` is registered and uses Axxess nameservers; the apex/root A record points to Axxess hosting, while `www` CNAME points to `get-wired-autoworx-store.pages.dev`. The domain is linked to the Linux Hosting SA XS DirectAdmin package, but because the website DNS points away, Axxess does not serve the storefront files. The only certificate currently installed at Axxess is for `mail.getwiredauto.co.za`; website TLS must be served by the actual website host. Axxess confirms an externally hosted site can connect to Supabase.
- **Diagnosis:** DNS currently splits the root domain and `www` between different hosting targets. This is the likely reason the domain behaves inconsistently; it does not mean the website files need to be uploaded to Axxess. The Pages project hostname is `get-wired-autoworx-store.pages.dev`.
- **Important unknown:** Axxess did not provide the correct apex/root DNS target for Cloudflare Pages, and no DNS record was changed by this task. Do not guess an IP address or change nameservers/records without confirming the intended canonical domain and the Pages custom-domain setup. The older handover says `getwiredautoworx.co.za`, while the Axxess ticket refers to `getwiredauto.co.za`; treat this as unresolved until owner confirms which domain is canonical.
- **Recommended resolution path:** In Cloudflare dashboard, open the existing Pages project `get-wired-autoworx-store` and inspect its Custom domains. Confirm which domain(s) are attached and which hostname should be canonical. If apex + www are to be served by Cloudflare Pages, ensure the domain is correctly onboarded to Cloudflare DNS and use the DNS targets Cloudflare itself specifies; otherwise, if DNS must remain at Axxess, configure the supported subdomain CNAME and redirect/root-domain strategy without inventing an apex target. Remove/replace the conflicting A record only after the intended route and exact target are confirmed. Verify both root and www over HTTPS after DNS propagation.
- **SSL:** Do not request an Axxess website certificate while the website is intended to be served by Cloudflare Pages. The Pages/Cloudflare side must serve HTTPS for the website hostnames; the existing Axxess mail certificate is separate.
- **Changes/validation:** Recorded provider response and recovery plan only. No DNS changes, deployment, hosting-file changes, Supabase writes, or Cloudflare/Netlify credits used.
- **Next action:** Inspect Cloudflare Pages project/custom-domain and DNS configuration through available connected tools if accessible; otherwise owner must confirm the intended canonical domain and share the current Pages Custom Domains/DNS target details. Continue source/database work without deploying until DNS is verified.


## 2026-10-09 — Canonical customer-facing hostname confirmed
- **Owner decision:** `www.getwiredauto.co.za` is the customer-facing storefront hostname. Treat this as the canonical hostname for customer links and launch QA.
- **DNS status remains:** Axxess support says `www` CNAME points to `get-wired-autoworx-store.pages.dev`, while the root/apex `getwiredauto.co.za` A record points to Axxess. Do not assume the current CNAME is fully validated in Cloudflare Pages merely because it exists.
- **Next technical action:** Verify that `www.getwiredauto.co.za` is attached as a Custom Domain to the existing Cloudflare Pages project `get-wired-autoworx-store`; check the DNS target/status and HTTPS in Cloudflare Pages. Then decide whether the apex `getwiredauto.co.za` should redirect to `www.getwiredauto.co.za` and implement only using the exact Cloudflare-supported configuration. Preserve the current nameserver arrangement unless the owner explicitly authorizes changing it.
- **Access limitation:** No Cloudflare DNS/Pages connector or dashboard API tool is available in this session. No DNS change or deployment was made. Owner hostname decision recorded; no Cloudflare/Netlify credits used.


## 2026-10-09 — Canonical hostname continuation / Pages verification attempt
- **Owner-confirmed canonical hostname:** `www.getwiredauto.co.za`.
- **Official Cloudflare Pages guidance checked:** For a custom subdomain such as `www`, the hostname must first be attached under Workers & Pages → the existing project `get-wired-autoworx-store` → Custom domains. The DNS CNAME should target `get-wired-autoworx-store.pages.dev`. A manually created CNAME without attaching the custom domain in Pages can fail (including HTTP 522). An apex domain requires the zone/nameserver setup Cloudflare specifies; do not invent an A-record IP. Reference: https://developers.cloudflare.com/pages/configuration/custom-domains/
- **Live checks attempted:** Opened `https://www.getwiredauto.co.za` and `https://get-wired-autoworx-store.pages.dev` via the available web viewer; both were inaccessible to that viewer, so this does not establish whether they are down for normal browsers.
- **Execution limitation:** Available connected tools contain no Cloudflare DNS/Pages management connector. No DNS mutation or deployment can be executed safely from this session. No credits used.
- **Next safe operator steps:** In Cloudflare dashboard, open Workers & Pages → `get-wired-autoworx-store` → Custom domains; verify `www.getwiredauto.co.za` is listed and Active. If absent, add it there first and follow Cloudflare's generated DNS instructions. At the DNS provider currently authoritative for the domain (Axxess nameservers according to support), confirm `www` CNAME points to `get-wired-autoworx-store.pages.dev` and remove any conflicting `www` A/AAAA record only after reviewing it. For root `getwiredauto.co.za`, either configure it as a separate Pages custom domain using Cloudflare's required zone/nameserver setup, or keep it at Axxess and configure a supported redirect to `https://www.getwiredauto.co.za`; do not leave root serving an unrelated Axxess site. Preserve mail-related DNS records. Verify HTTPS and redirect behavior after propagation.
- **State:** Canonical hostname decision is recorded; DNS/domain activation and browser QA remain unverified. No production files or database rows changed.


## 2026-10-09 — Continued work: live category coverage + canonical metadata audit
- **Moved on from DNS repetition** as requested. No further DNS/custom-domain steps attempted in this pass.
- **Read-only Supabase audit:** confirmed 4,187 active products are represented across the nine category entry points currently hard-coded in `category.html`. Active product totals by entry point: Auto Electrical 1,144; Spare Parts 565; Vehicle Security 2; Car Audio 46; Accessories 891; Marine Spares & Accessories 58; Tools / Hardware / Consumables 1,318; Camping / Leisure / Outdoors 75; Trailer & Canopy 88. These totals sum to 4,187. The category entry point labelled Spare Parts remains present in the storefront source; it is distinct from the eight specialist roots described in prior category-cleanup notes and must not be silently removed until the intended information architecture is confirmed.
- **Important data-quality clarification:** An initial read-only query used assumed database root names rather than the exact category IDs hard-coded in `category.html`, so its “outside tree” output was not a valid coverage measure. The subsequent query used the exact nine IDs from the current source and reconciled to all 4,187 active products. Do not reuse the invalid initial counts.
- **Static source QA:** confirmed `index-new.html` canonical URL and Open Graph URL are `https://www.getwiredauto.co.za/`, consistent with the owner-confirmed customer-facing hostname `www.getwiredauto.co.za`; it uses the expected Supabase project `ojytykqpvonxvepprgbh`. Files checked: `index-new.html` SHA `396a89f81f301fb6bc53c4313bc7bd0a921bf33e`; `category.html` SHA `9b6a2c1200402b2791311eeb46285ab85d1f17a8`; `checkout-v2.html` SHA `e4589de01951ab70e80a637572c9f28e6d77ff91`; `products.html` SHA `3b6941932cb5d88cc51661f4571842adb5b18d60`.
- **Category snapshot:** `assets/category-tree.json` exists in main, 165 categories, generated at `2026-10-09T09:32:49Z`; source SHA `6bb735a2148718ac8c9a54c405c0b455fd4e217c`. Snapshot freshness and browser runtime behavior still need validation against the live deployment.
- **No changes to production data/source:** This pass was read-only except for this handover update. No product/category rows changed, no deployment run, no Cloudflare/Netlify credits used.
- **Next non-credit work:** Compare the category-tree snapshot’s category IDs, parent relationships and direct active counts against current Supabase data; refresh the static snapshot only if a deterministic, verified generation path is available. Then continue source-level checkout/search/security regression checks. Live browser QA remains pending because the hosted site cannot be accessed from this session’s web viewer and no hosting file connector is available.


## 2026-10-09 — Checkout fulfilment rule correction (source committed, not deployed)
- **Issue found during source QA:** `checkout-v2.html` still exposed “Customer pickup — R0.00” and “Cash on pickup”, and hid delivery-address/quote requirements for pickup. This contradicts the locked fulfilment instruction that Phoenix Plaza is an internal dispatch reference only and must never be offered as customer pickup.
- **Action completed:** Removed the customer-pickup fulfilment option and cash-on-pickup payment option; checkout now always requires a delivery address and a selected delivery quote before order submission. Updated the checkout copy to delivery-only. Existing R35-per-item packaging calculation and provider delivery-quote flow were left unchanged; the R15 per delivery address rule is a separate internal dispatch fee and is not currently shown as a separate checkout line, so it remains a follow-up to verify against the shipping/order backend before changing totals.
- **Validation:** All targeted source replacements matched exactly once. Source check shows no remaining pickup references. GitHub source commit: f53163c745ee3193e5b27e81b3ccf6f19e635e1e. The change is **not deployed or browser-tested**; no Cloudflare/Netlify credits used and no production database rows changed.
- **Next:** Check order-creation/shipping backend to ensure delivery-only assumptions and one R15 dispatch fee per delivery address are represented correctly; run source syntax/regression checks; then final hosted browser QA only at the final testing stage.


## 2026-10-09 — Checkout patch verification and commit correction
- **Correction to prior log entry:** The first checkout commit `f53163c745ee3193e5b27e81b3ccf6f19e635e1e` changed only the visible section label; it did not apply the full delivery-only patch. This was caught in immediate verification and is superseded by the actual source patch below.
- **Actual source patch:** Commit `d9f84e0f93247ecfc81ce29cd5779e9278487f3b` removes both pickup options and pickup-specific branches, requires a delivery address and selected delivery quote, and updates the copy to delivery-only. Post-patch scan: no remaining pickup references or pickup variables in `checkout-v2.html`.
- **Syntax check:** PASS. This is a source-level parse check only, not a browser or backend integration test.
- **Still pending:** inspect the shipping-quote and store-checkout edge functions for the owner’s R15-per-delivery-address dispatch rule and verify packaging fee handling. Existing R35-per-item packaging calculation was intentionally left unchanged pending backend/order-total review. Do not deploy or spend credits until final hosted testing.


## 2026-10-09 — Delivery fee/backend contract audit and dispatch-fee correction
- **Backend inspected:** Supabase Edge Functions `store-checkout` (active v1) and `shipping-quote` (active v2), plus both `public.create_store_order` overloads. The live checkout RPC validates address fields and requires a positive delivery fee for delivery orders; packaging is calculated server-side at R35 per ordered unit. The frontend passes `p_delivery_fee` to the checkout Edge Function, which forwards it to the RPC.
- **Rule correction:** The shipping quote Edge Function returns courier quotes and PAXI rates but does not add the owner-required R15 dispatch-to-dispatch-point handling fee. The checkout source now adds **R15 once per delivery address/order** on top of the selected courier/PAXI quote and states this in the delivery summary and order notes. It does not disclose Phoenix Plaza as a customer pickup location. Source commit: `38b9568de6a76c9aed3c639d4a2e63aa822c185b`.
- **Delivery-only checkout:** Source commit `d9f84e0f93247ecfc81ce29cd5779e9278487f3b` removed customer pickup and cash-on-pickup options and makes address + delivery quote mandatory. First attempted commit `f53163c745ee3193e5b27e81b3ccf6f19e635e1e` only changed the heading and is superseded; see verification note in prior section.
- **Validation:** JavaScript syntax parse PASS; no pickup references remain. This is source validation only. The backend RPC was read, not changed. No orders, product data or categories were changed. No deployment or Cloudflare/Netlify credits used.
- **Important remaining check:** Confirm the customer-facing checkout page actually routes to `checkout-v2.html` and that the deployed site serves these committed source changes. Deployment/browser verification is deferred to final testing as required. Review PAXI rate freshness and provider quote contracts before release.


## 2026-10-09 — Category snapshot/live catalogue count reconciliation
- **Snapshot summary:** `assets/category-tree.json` is timestamped `2026-10-09T09:32:49Z`, with 165 active category entries and direct active-product assignments summing to 4,187.
- **Live Supabase aggregate check:** 242 total category rows, 165 active categories, 58 active root categories, 4,187 active products, zero active products without a category, and zero active products pointing to a missing category ID. The snapshot category count and product-assignment total match live aggregate totals. Full per-category ID/parent/count comparison remains unverified; do not call this a full snapshot integrity proof.
- **Failed query attempt recorded:** A combined aggregate query returned PostgreSQL error 42703 (“column active does not exist”) despite the separately confirmed schema containing `categories.active`; simplified separate aggregate query succeeded. No database writes occurred.
- **No deployment credits used.** Continue with frontend checkout route/link regression and static QA; browser testing stays in final phase.


## 2026-10-09 — Axxess ticket: “Store not loading to Axxess” — DNS/hosting resolution plan
- **Axxess response received:** Domain uses Axxess nameservers; apex/root A record points to Axxess; `www` CNAME points to `get-wired-autoworx-store.pages.dev`; domain is linked to Axxess Linux Hosting SA XS DirectAdmin; website files for the Pages hostname are fetched from Cloudflare Pages, not Axxess; Axxess SSL currently covers `mail.getwiredauto.co.za` only. Axxess says root A record may conflict if intended to point to website host.
- **Project’s established decision:** `https://www.getwiredauto.co.za/` is the canonical customer storefront, and the active hosting architecture is Cloudflare Pages + GitHub + Supabase. Do not migrate the storefront to Axxess or change nameservers as a knee-jerk response; Axxess nameservers may still serve email and other DNS records.
- **Likely issue split:** The root domain `getwiredauto.co.za` resolves to Axxess by design of the current A record, while `www.getwiredauto.co.za` is intended to resolve to Cloudflare Pages via CNAME. The root A record cannot be fixed merely by changing it to an unknown “Pages server IP”; Cloudflare Pages does not provide a stable static origin IP for this use. A manual CNAME at `www` also does not by itself prove that `www.getwiredauto.co.za` is attached and active under Cloudflare Pages > project `get-wired-autoworx-store` > Custom domains.
- **No-credit resolution sequence:** (1) In Cloudflare Pages project `get-wired-autoworx-store`, verify/add `www.getwiredauto.co.za` under Custom domains and wait for its status to become active, retaining the DNS-provider CNAME target `get-wired-autoworx-store.pages.dev`. (2) Keep Axxess nameservers unless there is a separately approved DNS migration. (3) Decide root-domain handling: if root should reach the canonical storefront, configure a 301 redirect `https://getwiredauto.co.za/*` → `https://www.getwiredauto.co.za/$1` at a service that can serve the root hostname and valid TLS; with current Axxess nameservers/root A record, the practical option is Axxess/DirectAdmin web redirect plus a valid certificate for `getwiredauto.co.za`, or use a DNS provider with supported apex flattening only if the nameserver migration is intentionally approved. Do not point apex to a guessed Pages IP. (4) Ensure TLS covers the hostname before enforcing HTTPS redirect; the existing mail-only certificate does not cover website hostnames. (5) Verify root, www, HTTP→HTTPS, HTTPS certificate and redirects after changes.
- **Important verification limitation:** The web viewer could not fetch the live URLs in this session, and there is no connected Cloudflare DNS/Pages or Axxess/DirectAdmin management action available. Therefore no DNS/domain setting was changed and no live TLS status is claimed. Do not ask for passwords or request credentials in chat. To actually apply the remaining dashboard-only change, owner must provide authorized Cloudflare Pages dashboard access/connector or make the named changes and share status screenshots.
- **Source grounding:** `index-new.html` canonical and Open Graph URL both remain `https://www.getwiredauto.co.za/`. Cloudflare Pages docs state custom subdomains need a CNAME pointing to the Pages hostname and the hostname must be associated under Pages Custom domains; root/apex Pages hosting requires the domain to be a Cloudflare zone with Cloudflare nameservers. Reference: https://developers.cloudflare.com/pages/configuration/custom-domains/.
- **Status:** Root cause path identified; no-credit checks completed; actual DNS/TLS resolution remains **blocked on authorized dashboard control or owner input**. No deployment credits used and no product/database data changed.


## 2026-10-09 — Cloudflare Pages custom-domain status confirmed by owner
- Owner confirmed that `www.getwiredauto.co.za` is **Active** in Cloudflare Pages.
- This resolves the pending verification of the `www` custom-domain status. Preserve the existing `www` CNAME and Pages configuration; do not rebuild or reconnect the store for this issue.
- Root hostname `getwiredauto.co.za` remains the separate unresolved item: Axxess support previously stated its apex A record points to Axxess, while `www` points to `get-wired-autoworx-store.pages.dev`.
- No DNS, TLS, redirect, hosting, Cloudflare, or Axxess changes were made in this task. No Cloudflare/Netlify credits used.
- Tool/access check: no connected Cloudflare DNS/Pages or Axxess/DirectAdmin/FTP/SFTP management action is available in the current tool set. Do not claim root redirect is fixed or certificate verified.
- Safe next action: configure a 301 redirect for `https://getwiredauto.co.za/*` to `https://www.getwiredauto.co.za/$1` at the current apex-serving host, after confirming valid root-domain TLS; alternatively use a DNS-provider-supported apex alias/flattening only if explicitly supported and without disrupting Axxess email/nameservers. Never point apex to a guessed Cloudflare Pages IP.
- Owner input/access required to execute the remaining host-side change: provide access to the existing DirectAdmin file manager or confirm the exact current redirect control/path available there. Do not request passwords or API keys in chat; use an authorized connection or have owner apply the specific redirect.
- Validation still required after the change: test apex HTTP and HTTPS, www HTTP and HTTPS, final redirect destination/status, TLS certificate coverage, and ensure mail DNS remains unchanged.


## 2026-10-09 — Continued source, catalogue and checkout audit (no deployment)
- **Category snapshot/live data reconciliation — PASS:** Compared every row in `assets/category-tree.json` with live Supabase `public.categories` and active-product assignments. Snapshot has 165 active categories; live DB has 242 total rows and 165 active categories. Missing active categories: 0; extra/inactive snapshot entries: 0; per-category ID/name/parent/direct-active-product-count mismatches: 0. Live direct active-product assignments = 4,187; snapshot total = 4,187. This completes the previously pending per-category integrity comparison.
- **Checkout routing — PASS at source level:** `index.html` redirects to `store.html`; `store.html` embeds `index-new.html` and links its checkout button to `checkout-v2.html`; `index-new.html` cart action links to `checkout-v2.html`; `products.html` cart button also routes to `checkout-v2.html`. Current source hashes checked: `index.html` `2e6e837a8e2515f09fd75ca997bfc8f1eb9b8e2c`; `store.html` `b21595efc2e9d89a93ea2ada738af500794810bd`; `index-new.html` `396a89f81f301fb6bc53c4313bc7bd0a921bf33e`; `products.html` `3b6941932cb5d88cc51661f4571842adb5b18d60`; `checkout-v2.html` `bba1a167599961a833658386290c755a0497d375`.
- **Delivery + dispatch fee contract — verified by source/database inspection:** `checkout-v2.html` adds R15 once to the selected delivery quote per delivery address/order and sends it as `p_delivery_fee`. Active `store-checkout` Edge Function forwards this field to the 11-argument `public.create_store_order` overload. That overload uses `p_delivery_fee` as the stored delivery fee, calculates packaging server-side at R35 per ordered unit, and calculates total = subtotal + packaging + delivery. The returned delivery fee includes the R15 dispatch handling fee. No test order was created, no order/product rows were changed, and this was not a live end-to-end checkout test.
- **RPC access verification:** Both `create_store_order` overloads are SECURITY DEFINER but execute privileges are restricted to `service_role`; `anon` and `authenticated` have no execute access. `admin_list_orders` and `admin_update_order` are executable by authenticated users but both functions explicitly require a non-null authenticated user and an enabled row in `public.veyron_admin_users` for that same user before reading/updating orders. Supabase security advisor flags these admin functions generically because they are SECURITY DEFINER and authenticated-executable; the function-body allowlist checks were verified, so no permission change was made.
- **Supabase advisor finding / launch blocker:** `auth_leaked_password_protection` remains WARN: leaked-password protection is disabled. This is an Auth dashboard setting, not a safe SQL-only fix. Enable it during the authorized final launch/security phase and verify afterwards. Performance advisor also reports 3 unindexed foreign keys and 5 multiple-permissive-policy cases; these are recorded for review, but no schema/policy changes were made because the specific consequences and existing deny-policy design require careful assessment. Advisor reports 55 unused-index notices; do not drop indexes without usage-window and workload validation.
- **Tool attempt failure recorded:** Fetching root `app.js` returned GitHub API 404 (file does not exist at that path); this does not block routing because current entry files and checkout links were found in `store.html`, `index-new.html`, and `products.html`. No source file was changed.
- **Deployment / domain state:** No deployment or DNS/TLS change was made. `www.getwiredauto.co.za` remains owner-confirmed Active in Cloudflare Pages; apex/root redirect and website TLS remain unresolved because this session has no connected Cloudflare/Axxess/DirectAdmin management action. Live browser QA is still pending for final testing. No Cloudflare/Netlify credits used.
- **Next:** Continue non-credit source and security review. Keep the storefront undeployed until final test phase. For the remaining domain change, use authorized DirectAdmin control or a connected hosting/DNS action; never guess apex IPs or alter mail DNS. For launch, enable leaked-password protection and run full browser checkout tests with a controlled test order only when explicitly authorized.


## 2026-10-09 — Hosting integration discovery attempt
- Searched the available plugin directory for Cloudflare DNS/Pages, DirectAdmin, hosting, FTP/SFTP and related domain-management access. Returned options did not include a Cloudflare or Axxess/DirectAdmin/FTP connector; no suitable plugin was found to perform the root-domain redirect from this session.
- No plugin was installed or suggested because the search did not return a suitable connector. No hosting credentials requested, no DNS/hosting changes made, no deployment or credits used.
- This discovery attempt confirms the same blocker rather than resolving it: the root-domain redirect and website TLS still require authorized access to the existing host/DNS dashboard or a compatible connected management tool.


## 2026-10-09 — Investigated why the storefront is not loading from/to Axxess
- **Architecture distinction:** Axxess's ticket confirms that the public website files are fetched from Cloudflare Pages, not from the Axxess Linux hosting package. Therefore the store will not appear as deployed website files in Axxess DirectAdmin `public_html` unless we deliberately migrate the host or copy/deploy a separate build there. Current project decision remains Cloudflare Pages + GitHub + Supabase; do not duplicate/migrate the store to Axxess without owner approval because it can create two divergent live versions.
- **Confirmed domain state from Axxess:** nameservers are Axxess; root/apex A record points to Axxess; `www` CNAME points to `get-wired-autoworx-store.pages.dev`; owner confirmed `www.getwiredauto.co.za` is Active in Cloudflare Pages; Axxess certificate only covers `mail.getwiredauto.co.za`. Root and www therefore have different serving paths, and a mail-only certificate does not secure either website hostname.
- **Live reachability test attempted:** Used HTTP HEAD/redirect checks for `https://www.getwiredauto.co.za/`, `https://getwiredauto.co.za/`, and `https://get-wired-autoworx-store.pages.dev/`. All three failed before an HTTP/TLS response because the execution environment returned `curl: (6) Could not resolve host`. Web viewer also reports these URLs inaccessible. This is a tool/runtime DNS-resolution failure and does **not** prove the public domain itself is down. No real public DNS answer, HTTP status, redirect, or certificate chain could be observed from this environment.
- **Current most likely cause of “not loading to Axxess”:** expectation mismatch between hosting services. Axxess is not the active file origin for the current Cloudflare Pages storefront. If the complaint is that files do not appear in Axxess `public_html`, that is expected under the existing architecture. If the customer-facing domain fails to load, the specific unresolved path is apex Axxess routing/website TLS/redirect versus the active `www` Pages custom domain; it needs an external live test from a normal browser or DNS resolver to distinguish a public DNS problem from this environment's lookup failure.
- **No changes made:** no DNS, SSL, redirect, Axxess files, GitHub source, Supabase data, or deployment was modified. No Cloudflare/Netlify credits used. No credentials requested.
- **Next diagnostic actions:** (1) From the user's phone/mobile browser, open `https://www.getwiredauto.co.za/` and `https://get-wired-autoworx-store.pages.dev/` separately and report exact error or screenshot; (2) in DirectAdmin, check whether the user expects a separate Axxess-hosted copy—do not upload files there unless the owner confirms migration; (3) for root domain, set a proper redirect to `https://www.getwiredauto.co.za/$1` only after root TLS is valid, preserving Axxess mail DNS; (4) retest DNS/HTTP/TLS from an external resolver before any changes.


## 2026-10-09 — Owner reports image behaviour differs by hostname
- Owner tested both the custom .co.za storefront and the Cloudflare Pages `.pages.dev` storefront. Both load the store shell; some images load on `.pages.dev`, but no images load on the .co.za hostname.
- Read-only Supabase check of `public.products`: 4,187 active products; all 4,187 have a non-null `image_url`; 3,396 rows (81.2%) point to the relative placeholder path `/assets/product-placeholder.svg`; 791 rows point to HTTPS Supabase Edge Function URLs under `https://ojytykqpvonxvepprgbh.supabase.co/functions/v1/product-image?sku=...`; no HTTP image URLs. This confirms most products do not currently have a real per-product image URL in the database; they use a shared placeholder. It does not by itself explain why the same remote images differ by hostname.
- Current `index-new.html` renders product `image_url` directly and falls back to `assets/gw-logo.png` on error. The wrapper `store.html` loads `assets/product-image-fallback.js`, whose exact-SKU fallback uses origin-root paths `/assets/products_webp/{SKU}.webp`. These relative/origin-root asset requests can fail if the custom hostname is resolving to a different/stale host or if the relevant assets are absent on that origin.
- Current architecture facts: `www.getwiredauto.co.za` was previously confirmed Active as a Cloudflare Pages custom domain, while the apex/root A record was reported to point to Axxess. This means apex/root and www may serve different origins. Do not assume the owner’s .co.za test was the apex or www; next response should clarify/test the exact hostname only if needed. No DNS or code changes made in this attempt.
- Next diagnostic: on the failing .co.za page, open one image in a new tab (or long-press/copy image address) and compare the image URL hostname/path with the same product on `.pages.dev`. Also confirm whether the failing address is `https://www.getwiredauto.co.za/` or `https://getwiredauto.co.za/`. If apex/root, treat the Axxess origin split as the leading cause and do not upload/migrate files without explicit approval. If www, inspect the browser's failed image URL/response and confirm the custom-domain deployment/asset resolution before touching DNS. Check `/assets/product-placeholder.svg`, `/assets/gw-logo.png`, and one exact-SKU `/assets/products_webp/*.webp` on both hosts. Do not spend Cloudflare/Netlify credits before final testing.


## 2026-10-09 — Follow-up: logo asset loads on both hosts
- Owner tested `/assets/gw-logo.png` on both `www.getwiredauto.co.za` and `get-wired-autoworx-store.pages.dev`; both logo URLs load perfectly.
- This rules out a blanket failure of root-relative static assets on the tested .co.za hostname. Do not keep pursuing the logo or general static-file availability as the cause.
- Source review confirms `store.html` embeds `index-new.html` in an iframe; product images are rendered directly from Supabase Edge Function HTTPS URLs for 791 rows, while 3,396 active products point to the shared local placeholder SVG. `product-image` Edge Function is ACTIVE v9 with `verify_jwt=false`, and source code sets `Access-Control-Allow-Origin: *`; no code changes made.
- Remaining isolation test: test a real product image endpoint directly, e.g. `https://ojytykqpvonxvepprgbh.supabase.co/functions/v1/product-image?sku=GW-705CE825`. If it displays an image directly, the endpoint itself is functional and the next check is whether the .co.za page is serving the same `index-new.html` content/deployment as pages.dev and whether browser image requests are failing/cached differently. If it returns “Image not found” or an error, investigate SKU-to-private-supplier mapping/image asset availability in the Edge Function before modifying storefront code.
- Do not spend Cloudflare/Netlify credits before final testing. No hosting, DNS, or database writes made.


## 2026-10-09 — Follow-up: live product image endpoint confirmed working
- Owner opened `https://ojytykqpvonxvepprgbh.supabase.co/functions/v1/product-image?sku=GW-705CE825` and confirmed the product picture opened correctly.
- This confirms at least this SKU's Supabase Edge Function route, private SKU mapping, and upstream image are working. The issue is not a universal outage of the product-image service.
- Remaining leading hypotheses: .co.za URL tested may be apex/root vs www (different hosting/DNS path), or that hostname is serving a stale/different storefront build or browser-cached content. Need exact failing hostname and, if it's www, compare deployed `store.html` / `index-new.html` and inspect a failed product image request. No DNS/code/database changes made; no Cloudflare/Netlify credits spent.


## 2026-10-09 — Owner retest: product pictures load on both .co.za hostnames
- Owner confirmed both .co.za addresses now load pictures correctly (www and root/apex).
- The previously reported image-loading problem is currently not reproducible on the owner's retest. Product-image Edge Function diagnostic also opened successfully for SKU `GW-705CE825`.
- No code, DNS, database, or deployment changes were made as part of this diagnostic. No Cloudflare/Netlify credits spent.
- Status: image-loading discrepancy provisionally resolved / not reproducible. If it recurs, capture the exact product SKU, exact hostname, and failing image URL before changing code; check for stale cache/deployment differences first.


## 2026-10-09 — Next-step review after image diagnostic
- Owner asked what comes next after confirming product images load on root .co.za, www .co.za, and the direct Supabase product-image endpoint. Image issue remains closed as not reproducible; no code fix is justified.
- Next work order from existing task register:
  1. Continue remaining non-credit audits/reports and preserve current deployment; no Cloudflare/Netlify credits.
  2. Collect owner-completed manual category decisions for the 198-item worksheet before changing those product categories.
  3. Obtain a complete current supplier stock feed before claiming full catalogue stock is verified or producing the final stock reconciliation.
  4. Before launch, owner must enable Supabase Auth leaked-password protection, then run the final security advisor review and unauthorized-access tests.
  5. Complete the root-domain HTTPS/TLS/301 redirect through authorized Axxess/DirectAdmin or DNS control without changing Axxess mail records; no hosting control connector is available in this session.
  6. Complete PayFast verification/documents and secure production credentials before enabling real payment; keep payments unenabled until approved final testing.
  7. Final live end-to-end customer/admin/order/delivery/payment testing and any credit-consuming deployment work remain last, per locked rules.
- Existing storefront source-level routing and database/category integrity checks pass, but the full live end-to-end checkout has not been run and no test order has been created.
- User-input dependencies: completed category decisions; current full supplier stock feed; owner setting change for leaked-password protection; authorized host/DNS access or owner-applied root redirect/TLS; PayFast account verification and credentials through secure configuration (never paste secrets into chat).
- No code, DNS, database, payment, or deployment changes made during this review. No Cloudflare/Netlify credits spent.


## 2026-10-09 — Continue all remaining tasks: refreshed no-credit QA and blockers
- **Supabase project health — PASS:** project `ojytykqpvonxvepprgbh` reports `ACTIVE_HEALTHY` (Postgres 17.6.1.166).
- **Fresh live catalogue integrity — PASS:** active products 4,187; active products with missing/null category reference 0; active products with missing/non-positive price 0. The 198-row manual category review queue remains pending owner decisions.
- **Fresh live stock/order evidence — confirmed:** `supplier_stock` rows 0; `asc_stock_verification` rows 36; `orders`, `customers`, and `order_items` rows are each 0. No test order was created because live end-to-end testing is reserved for final testing and payment/fulfilment readiness is incomplete.
- **Fresh image coverage snapshot:** active products 4,187; image_url missing/blank 0; shared placeholder `/assets/product-placeholder.svg` 3,396; HTTPS remote image URLs 791. Owner retested and confirmed images load on root .co.za, www .co.za, and the direct product-image endpoint. No image source/deployment changes justified.
- **Security advisor refreshed:** leaked-password protection remains disabled and is a launch blocker. Two SECURITY DEFINER admin RPCs remain advisor WARNs because they are callable by authenticated users; prior code inspection found internal admin allowlist checks, so do not revoke or rewrite without rechecking the complete call flow. Do not claim the advisor is clean.
- **RLS policy review performed read-only:** on `customers`, `orders`, and `order_items`, the policies named `deny_client_access_*` have both `USING (false)` and `WITH CHECK (false)` but are PERMISSIVE. They do not grant access; authenticated customer-specific policies separately grant owner-scoped access. This explains some multiple-permissive-policy performance warnings. No policy was changed during this pass to avoid unreviewed production access-control changes.
- **Performance advisor refreshed:** 3 unindexed foreign keys, 5 multiple-permissive-policy cases, and 55 unused-index notices remain. Unused indexes were not dropped because advisor usage counters alone do not establish they are safe to remove. No schema/index/policy changes made.
- **Previously available tasks completed in this pass:** refreshed health/catalogue/stock/order/image checks; inspected the effective RLS policy expressions; revalidated remaining task order and owner dependencies. No deployment, no checkout/test order, no DNS or TLS change, no payment activation, and no credits spent.
- **Still blocked on owner-controlled inputs/permissions:** (1) 198 manual category decisions; (2) complete current supplier stock feed; (3) enable Supabase Auth leaked-password protection in the dashboard; (4) authorized existing Axxess/DirectAdmin or DNS control to configure and verify root-domain TLS/redirect without changing mail DNS; (5) PayFast verification/documents and secure production credentials. Never paste passwords/API secrets into chat.
- **Final phase only:** controlled live checkout/customer journey, admin order visibility/status, delivery quote and R15 fee verification, payment success/failure/cancellation, backup verification, and any Cloudflare/Netlify-credit-consuming deployment. Current source-level checkout routing and category integrity pass, but full live end-to-end checkout is still NOT TESTED.
- **No changes to production data/config/code in this pass.** No Cloudflare/Netlify credits spent.


## 2026-10-09 — Continued autonomous work: additional integrity, security and deployment checks
- **GitHub Pages workflow observation:** latest `pages build and deployment` run for commit `db4054dbeb4d51092494b1e974c0ac38da9a96c5` completed with conclusion `success`. This is a GitHub Actions workflow result, not a claim that Cloudflare Pages deployed or that all live customer paths were tested.
- **Additional live product integrity checks — PASS:** 0 duplicate active SKUs; 0 active products missing SKU; 0 active products missing name; 0 active products with negative stock; 0 active products with zero stock in the current database snapshot. These database quantities do not prove supplier availability; supplier stock table remains empty and only 36 ASC SKU checks are recorded.
- **Image backlog reconfirmed:** 3,396 of 4,187 active products currently use the shared placeholder image; 791 use remote product-image URLs. Although owner confirms images now load on tested hostnames, the placeholder coverage backlog remains a separate catalogue enrichment task and must not be described as 100% product photography complete.
- **Admin RPC security review:** read-only inspection of `public.admin_list_orders` and `public.admin_update_order` confirms both SECURITY DEFINER functions set an empty search_path and check `auth.uid()` plus enabled membership in `public.veyron_admin_users` before reading/updating orders. Supabase advisor still flags both because authenticated callers can execute the functions; do not remove SECURITY DEFINER or change grants until admin client call paths and owner allowlist are tested. No function/grant changes made.
- **GitHub task-artifact search:** repository searches for a committed category-review worksheet, supplier-stock reconciliation, and image-audit output returned no matches. Do not assume a worksheet/artifact is available in this repository; the 198-item `public.category_review_queue` still needs owner decisions and the complete supplier feed is still absent.
- **No-credit autonomous work completed:** queried active product integrity metrics, re-ran Supabase security/performance advisors, inspected admin RPC bodies, checked latest GitHub Actions status, and searched repository for task artifacts. No production mutations, no payment activation, no DNS/TLS changes, no test orders, and no Cloudflare/Netlify credits spent.
- **Current state:** all remaining work that does not require owner decisions, private supplier input, account configuration, or a controlled final test has been advanced as far as available access allows. Remaining hard blockers are unchanged: 198 category decisions, complete supplier stock feed, enable leaked-password protection in Supabase Auth, authorized root-domain TLS/redirect control, and PayFast verification/secure production setup. Final live end-to-end test remains pending.


## 2026-10-09 — Continued autonomous work: category-review queue triage
- Read the live `public.category_review_queue` schema and rows read-only. The queue has fields for SKU, product name, current category, buyer-guide subcategory, description, review reason, and timestamp.
- Confirmed the queue is not a simple missing-category list: examples include an electric winch currently under “4X4 OUTDOOR” (plausible), a “1.5 Tweeter Pair” under “Cylinders” (clearly mismatched), a “12V Electric Fuel” pump under “Lighting” (clearly mismatched), and several fuel caps/lift pumps under “Tools & Workshop” (likely mismatched). These are candidates for owner-safe proposed corrections, not applied changes.
- No category assignments were changed in production. The queue has 198 rows, and correcting them without a complete proposed-category mapping plus verification risks introducing incorrect catalogue classifications.
- Attempted to retrieve the full queue in one SQL response to prepare a review workbook; tool output was truncated, so that method did not produce a reliable complete export. Next recovery: page the queue in stable batches (e.g. 40 rows by ordered id / offset) or build an authenticated export endpoint only if existing permissions and data handling are verified; then create an editable review sheet with proposed category, confidence, owner decision, and status columns. Do not expose private supplier-cost data.
- This attempt was read-only and did not spend Cloudflare/Netlify credits.


## 2026-10-09 — Critical checkout backend review (read-only; launch blocker found)
- Retrieved active `store-checkout` Edge Function (v1, `verify_jwt=false`) and both overloaded `public.create_store_order` function definitions. No production code was changed and no test order was created.
- Confirmed the Edge Function forwards the newer delivery-only argument set to the RPC, which matches the function overload with `p_delivery_address`, `p_delivery_fee`, and `p_payment_method`.
- **Launch blocker: delivery-only enforcement is not complete in the database RPC.** The newer RPC still sets `v_is_pickup := lower(COALESCE(p_payment_method,'')) = 'cash_on_pickup'` and permits that branch with zero delivery fee. The Edge Function allows the client to supply `p_payment_method`; therefore a direct request can attempt to create a pickup order despite the storefront UI removing pickup. This contradicts the locked delivery-only rule and must be corrected before launch.
- **Additional fee-integrity risk:** the RPC accepts a caller-supplied positive `p_delivery_fee` as the delivery amount and does not independently validate it against a server-issued quote or enforce the R15 Phoenix Plaza dispatch surcharge. Frontend-side surcharge handling alone is not authoritative. A client can potentially understate the fee by calling the endpoint directly. Before launch, validate delivery methods and quote identifiers/amounts server-side, apply the R15 surcharge server-side exactly once per order/address, and reject pickup regardless of client input.
- **Data-integrity risk to verify before any fix:** the database still contains an older overload of `create_store_order` with different parameters and legacy `products.is_active/stock` columns. The active Edge Function appears intended to use the newer overload, but the old overload should be assessed for direct execution/grants and removed/locked only after confirming no live callers depend on it.
- Recovery plan: patch in a development branch first; test delivery-only enforcement, malformed/zero/negative/forged fees, correct R15 surcharge, quantity/stock race behavior, and payment method allowlist; verify checkout/admin caller compatibility; then deploy only after test results. Do not run live-order tests before final testing authorization.
- This review was read-only. No Cloudflare/Netlify credits were spent. Permanent handover updated with the finding.


### Follow-up attempt — RPC grant verification
- First read-only SQL grant-inspection query failed because its ORDER BY alias was not accepted by PostgreSQL (`42703: column "function_signature" does not exist`).
- Retried with the explicit function-signature expression; the query was blocked by the platform safety layer before execution. No database change occurred.
- Grant status for both `create_store_order` overloads remains **unverified**. Next recovery path: use Supabase function/grant metadata or a narrower safe catalog query, without altering grants until the actual callers and permissions are confirmed.


## 2026-10-09 — Shipping quote backend review (read-only)
- Retrieved active `shipping-quote` Edge Function v2. It uses configured live-rate endpoints for Bob Go, The Courier Guy, and PUDO when credentials/configuration exist; it also offers fixed PAXI fallback prices based on submitted parcel weight.
- Confirmed the function does **not** add the required R15 Phoenix Plaza dispatch surcharge. This aligns with the earlier finding that the frontend surcharge is not authoritative; the surcharge must be enforced server-side in the order-total path exactly once per delivery address/order.
- Parcel dimensions and weights are derived from the request body, not independently loaded from trusted product records. Weight zero is replaced with 1 kg and marked provisional. This can make a quote inaccurate if callers alter parcel data; server-side quote validation should derive item quantities and dimensions/weights from trusted catalogue records, or clearly treat quotes as provisional and reconfirm them before order acceptance.
- PAXI rates are emitted as fallback rates based on weight alone, without a destination point identifier in the request/response. The function itself notes destination point selection is required. Checkout must ensure a destination PEP/PAXI point is selected and persisted before an order can be accepted as final.
- Live provider quote results are accepted when an upstream response includes a numeric price; this review did not validate each provider's actual API contract or credentials. Provider quote availability and returned service fields still need end-to-end verification.
- No production changes or test orders were made. Cloudflare/Netlify credits were not used. The grant-verification attempt noted above remains unresolved. This section records additional concrete checkout tasks for final controlled testing.


## 2026-10-09 — Checkout/delivery hardening investigation continued
- Retrieved the active `store-checkout` Edge Function, `shipping-quote` Edge Function, checkout HTML, and live definitions of both `public.create_store_order` overloads using read-only inspection.
- Confirmed checkout sends client-provided `p_delivery_fee` straight to the RPC. The newer RPC permits `cash_on_pickup` with zero delivery fee, trusts any positive submitted delivery fee, and does not enforce the R15 dispatch charge server-side. The legacy overload still supports pickup and uses legacy stock/active fields; its callers and EXECUTE grants must be checked before changing/removing it.
- Confirmed PAXI point is currently entered as free-form notes rather than validated/persisted structured destination; shipping quote weight/dimensions are client-supplied and zero weight becomes provisional 1 kg. Provider credentials/API response contracts remain unverified.
- Created GitHub development branch `dev/checkout-delivery-hardening` from current `main`; added `docs/CHECKOUT_DELIVERY_HARDENING_PLAN.md` (commit 86743e5229e62f6c3c083f10e6e8c8ee181ed063). The plan specifies verification order and safe tests before any production changes.
- No production database/function/storefront changes, no test orders/payments, and no Cloudflare/Netlify credits used. Current production remains unchanged; checkout hardening is NOT complete.
- Next execution: verify RPC grants and search repository call sites, then implement and test a quote-integrity/fee design in development only. Do not deploy production changes until all test cases pass.


## 2026-10-09 — Checkout grant/schema verification attempt
- Read-only ACL query returned EXECUTE for postgres and service_role only on both create_store_order overloads; no PUBLIC/anon/authenticated entries appeared. Checkout Edge Function calls the newer overload using its server-side secret.
- Read-only schema query found orders has delivery_fee, packaging_fee, payment_method, notes and delivery address, but no dedicated quote ID/provider/PAXI-point columns.
- GitHub code search for create_store_order and store-checkout returned no indexed matches; caller discovery remains unresolved and empty search results are not proof of no callers.
- Attempt to append these findings to the development plan and master handover in one operation was blocked by platform safety checks. No database or production changes were made. Recovery: retry handover-only append separately, then update development plan separately.


## 2026-10-09 — Checkout delivery acceptance tests drafted
- Re-read live Edge Function source and checkout form. Confirmed `store-checkout` whitelists request keys but forwards client-supplied `p_delivery_fee` directly to the service-role RPC. Checkout currently instructs PAXI users to put point name/code in free-form order notes; this is not validated structured destination data.
- Added development-only acceptance matrix `docs/CHECKOUT_DELIVERY_ACCEPTANCE_TESTS.md` on `dev/checkout-delivery-hardening` (commit 124900a9bc5cfaa7a3c35b8a452c9c6d996f161f). Covers forged/expired quotes, R15 exactly once, pickup rejection, PAXI point validation, stock races, malformed carts, legacy RPC grants, and release gates.
- Dependency catalog query found no view/rule dependency records for the two RPCs; this is not a complete application-caller inventory. GitHub code search still returned no indexed source matches.
- No tests executed against production; no production changes, test orders, payment attempts, or Cloudflare/Netlify credits used. Backend hardening remains incomplete and the new matrix is a specification, not a pass report.
- Next: locate and verify an isolated Supabase development database/branch, then implement quote verification and delivery-only enforcement there. Do not run DDL or deploy to production as a substitute for development isolation.


## 2026-10-09 — Axxess product-folder access and catalogue workflow
- Owner asked whether product images/prices can remain in category/subcategory folders on Axxess and be processed from there, with GitHub and Cloudflare updated as final backup/deployment.
- Access capability check: available connected tools do not expose an Axxess/DirectAdmin/FTP/SFTP/SSH file-transfer connector. The previously supplied DirectAdmin file-manager URL does not grant this assistant authenticated file access by itself.
- Status: cannot truthfully claim Axxess folders have been opened, downloaded, processed, or uploaded. No Axxess, GitHub storefront, Supabase, or Cloudflare production files were changed in this access check.
- Workflow remains viable once a supported transfer path is established. Preferred secure recovery: owner creates a restricted, temporary FTP/SFTP account limited to a dedicated product-assets directory only if a transfer-capable environment/connector is available; do not share the main hosting password or Supabase/Cloudflare secrets in chat. Alternatively, owner can publish a temporary read-only download/archive link from Axxess that is accessible without login, then revoke it after processing.
- Planned processing: preserve original images; extract SKU/product/price; calculate standard selling price as ex-VAT cost × 1.15 × 1.35; verify like-for-like South African market prices when identity/compatibility can be confirmed; flag ambiguous SKU/price matches and missing costs instead of guessing; produce an exception report; stage assets and catalogue changes in GitHub, test before any Cloudflare deployment.
- Deployment restriction: no Cloudflare/Netlify credits until final testing; do not alter live storefront or production data before validation.


## 2026-10-09 — Immediate Axxess access recovery attempt
- Retried capability discovery for FTP/SFTP/SSH/remote hosting file access and searched available integrations for FTP/SFTP transfer.
- Result: no connected Axxess, DirectAdmin, FTP, SFTP, or SSH file-transfer tool is available. Search returned unrelated storage/hosting apps but no direct Axxess connector. No plugin was installed or connected.
- No Axxess folders could be listed or read; no product files downloaded; no prices/images processed; no live store files changed.
- This is a hard access boundary, not a catalogue-processing failure. Do not claim access or use the supplied DirectAdmin URL as if authenticated.
- Fastest viable owner action: create a temporary, read-only publicly accessible archive/download URL for the product folders from Axxess, or enable a supported transfer connector. Revoke any temporary public URL after processing. Do not send the main hosting password or other production secrets in chat.
- Once a reachable archive URL is supplied, download/process folder hierarchy, preserve original images, match SKUs, calculate standard price as ex-VAT cost × 1.15 × 1.35, compare verified like-for-like South African market prices, produce exceptions report, commit approved assets/catalogue to GitHub, and leave Cloudflare deployment until final testing.
- Locked restriction retained: no Cloudflare/Netlify credits before final testing; production store remains unchanged until validated.


## 2026-10-09 — Resume from DirectAdmin handover checkpoint
- Resumed from the permanent handover and the latest conversation checkpoint. Primary live domain remains https://www.getwiredauto.co.za; Axxess XS Linux Hosting / DirectAdmin is the intended production host. Preserve the approved dark blue/red storefront design and do not restart or redesign.
- Owner confirmed Axxess DirectAdmin `public_html` contains `cgi-bin/`, `index.html`, `admin.html`, `checkout.html`, `assets/`, and other entries not yet identified. The owner had not yet confirmed the complete file list or whether the live `store.html` exists in `public_html`.
- Repository inspection confirms `store.html` exists in GitHub main, but this does NOT establish that it has been uploaded to Axxess. Do not overwrite or delete live files until the full current listing is known and a backup of the existing `public_html` contents is made.
- Current blocker: no connected authenticated Axxess/DirectAdmin/FTP/SFTP/SSH file-transfer capability is available in this session. Therefore no remote listing, backup, upload, or live file edit was performed. Do not claim deployment is complete.
- Immediate next step when resuming with the owner: get the complete names of all entries currently visible in `public_html`, including the “Other files or folders” the owner mentioned. Then determine whether the current `index.html` is a placeholder/redirect or the intended storefront; compare it with repository files before selecting a minimal safe upload set. Do not upload the entire GitHub repository; only upload a validated storefront package and required assets, with the homepage directly under `public_html`.
- Preserve launch blockers from the earlier sections: category review queue has 198 owner decisions; 3,396 of 4,187 active products use a shared placeholder image; supplier stock feed is incomplete; checkout delivery-fee enforcement and server-side R15 dispatch surcharge remain unresolved; PayFast verification/production setup is pending; root-domain HTTPS/redirect requires authorized Axxess/DNS control. No production data/config changes, test orders, payment attempts, DNS/TLS changes, or Cloudflare/Netlify credits were used in this resume pass.
- ETA after the complete file listing is available: 10–20 minutes to compare the intended static entry points and prepare a safe, minimal upload/backup checklist; live verification depends on owner-side DirectAdmin access and must be reported separately from source review.


## 2026-10-09 — Source entry-point check for Axxess upload (read-only)
- Verified repository `index.html` redirects to `store.html`; verified `store.html` embeds `index-new.html` and references multiple local scripts/assets plus `checkout-v2.html`. Therefore copying only the four filenames currently reported by the owner would not be sufficient for the complete storefront.
- Critical deployment condition: the current repository entry point requires a matching set of dependencies (including `index-new.html`, `checkout-v2.html`, referenced JavaScript files and `assets/`). Before upload, inventory all referenced local paths and compare them against the live `public_html` listing; preserve/backup existing files first. Do not upload the whole repository because it contains non-public development/configuration materials.
- Repository source review only; no live Axxess file changes, production configuration changes, deployments, test orders, or Cloudflare/Netlify credits used. Axxess-side deployment remains pending complete file listing and owner-side file-manager actions.


## 2026-10-09 — Axxess deployment made the sole active priority
- Owner explicitly instructed that Axxess deployment remain the main priority until successfully completed. Pause catalogue/category/image enhancements and other work until Axxess deployment and live verification pass.
- Reviewed repository tree (3,112 tracked files; tree response not truncated) and confirmed it contains many development, data, Supabase, automation, and admin artifacts. Do not upload the entire repository into public_html. Use a curated website runtime file list only after resolving local dependencies and checking existing live files.
- Runtime entry chain confirmed: public_html/index.html redirects to store.html; store.html embeds index-new.html, references assets/product-image-fallback.js, assets/category-cleanup.js, assets/progressive-store-enhancements.js, category-navigation.js, checkout-v2.html and additional scripts/styles/assets. checkout-v2.html references assets/gw-logo.png. The full HTML dependency list must be reconciled with the recursive repository tree before upload.
- Attempt to inspect the live domain via the available web viewer returned “URL is not accessible via this tool”; this is not evidence that the site is down. Current live HTTP response and DirectAdmin file state remain unverified.
- Current external dependency: assistant has no authenticated Axxess/DirectAdmin/FTP/SFTP/SSH connector. Owner-side complete public_html listing and file-manager action are required for safe backup/upload; no remote mutation was attempted. Next user request should be for a screenshot or typed complete list of all public_html entries, then continue with the smallest safe deploy set and exact owner-side steps.
- No production changes, deployments, DNS/TLS changes, test orders, payment attempts, or Cloudflare/Netlify credits used in this pass.


## 2026-10-09 — Axxess runtime dependency audit (read-only, continued)
- Audited current GitHub main storefront references. Minimal known root-level runtime files include `index.html`, `store.html`, `index-new.html`, `checkout-v2.html`, `category.html`, `returns-refunds.html`, `product-details.js`, and root `category-navigation.js`; required assets include `assets/gw-logo.png`, `assets/product-image-fallback.js`, `assets/category-cleanup.js`, and `assets/progressive-store-enhancements.js`. This is a dependency list in progress, not yet an upload-ready package; continue auditing dynamically referenced scripts and linked policy pages before upload.
- Important discrepancy found in current repository `checkout-v2.html`: despite the deployment note and earlier handover saying the old fixed dispatch fee was removed, current source still defines `DISPATCH_FEE_PER_ADDRESS=15` and adds R15 to delivery quotes. The fulfilment selector also contains only a delivery option, so free pickup is not currently offered in this checkout file. Do not claim checkout is launch-ready; resolve and test this before deploying this file to production.
- `index.html` redirects to `store.html`; `store.html` embeds `index-new.html`. Do not replace the live entry point until existing `public_html` contents are backed up and compared.
- Owner cannot send screenshots. Continue without screenshots: request a typed filename list only if needed, and make it easy by asking for names in groups (top-level files first, then the names inside `assets`). Owner already reported `cgi-bin/`, `index.html`, `admin.html`, `checkout.html`, `assets/`, plus additional entries.
- No Axxess files were uploaded/changed. No DNS/TLS changes, checkout/order submissions, payment attempts, or Cloudflare/Netlify credits used. Live domain remains unverified through available tools.
- Next: (1) finish static runtime dependency review, (2) correct the checkout R15/free-pickup mismatch in source and validate the Supabase order function contract before production use, (3) get a typed list of current `public_html` entries, (4) preserve existing files and deploy only the validated runtime subset, then (5) verify root/www HTTPS and essential storefront flows.


## 2026-10-09 — Checkout blocker corrected in source and Supabase (Axxess still pending)
- Owner asked to resolve immediately and efficiently. Updated GitHub `checkout-v2.html`: removed the R15 dispatch surcharge, added free pickup as a fulfilment option, hid delivery fields/quote requirements for pickup, retained delivery quote enforcement for delivery, updated fee messages, and limited the payment choice to direct EFT while PayFast verification/production setup remains pending. Packaging display remains R35 per item/quantity.
- Applied Supabase migration `fix_store_checkout_pickup_and_delivery_fee` to add `orders.delivery_method` and `orders.delivery_quote` and create an explicit `create_store_order` overload accepting `p_delivery_method`. It calculates packaging as R35 × item quantity, enforces a positive confirmed delivery fee only for delivery, and sets pickup delivery fee to R0.00. Read-only verification confirms both new columns and the new 12-argument function exist.
- Deployed Supabase Edge Function `store-checkout` version 2; allowlist now passes `p_delivery_method` to the database RPC. Deployment result reported ACTIVE version 2. No test order was placed because a live order changes inventory and would be inappropriate without explicit test-product authorization.
- Source commits: checkout pickup/fee fix commit `4a0dc415524f982430a7dc84c1df0e82bd433d76`; checkout wording update `61c935030e97bf13d273e8886b837963040b7c92`; payment choice alignment `88956a77e1be1cbefce646a8401fe30796f47147`. Supabase migration and Edge Function were applied directly to project `ojytykqpvonxvepprgbh`.
- Remaining deployment blocker: no authenticated Axxess/DirectAdmin/FTP/SFTP/SSH connection is available in this session, and the owner cannot send screenshots. Axxess `public_html` has not been changed and the live domain is not verified. Do not ask owner to manually transcribe root entries; owner correctly rejected this as inefficient. Continue repository-side dependency audit and prepare a single minimal, verified deployment archive or an equivalent one-step upload path. Only request owner action if it cannot be avoided, and make it a single upload/operation rather than a 70-file inventory. Preserve/back up existing files before upload. Do not claim website deployment complete based on GitHub or Supabase changes.
- No DNS/TLS changes, production orders, payment attempts, or Cloudflare/Netlify credits used. Next priority remains Axxess: assemble and verify a minimal runtime package, then guide owner-side upload from DirectAdmin and perform live QA.


## 2026-10-09 — Deployment workflow correction
- Owner correctly rejected the request to type ~70 filenames from DirectAdmin; this is inefficient and must not be repeated.
- Dependency audit confirmed `store.html` embeds `index-new.html` and loads `assets/product-image-fallback.js`, `assets/category-cleanup.js`, `assets/progressive-store-enhancements.js`, and root `category-navigation.js`. `index-new.html` references `assets/gw-logo.png`, `product-details.js`, `checkout-v2.html`, `returns-refunds.html`, and `TERMS_AND_CONDITIONS.md` (the markdown link may need a browser-friendly HTML target or verified serving behavior).
- `category.html` links back to `store.html` and uses `assets/gw-logo.png`; `returns-refunds.html` links to `index-new.html`. These dependencies must be included/verified before creating a minimal deployment archive.
- Current practical blocker is still lack of authenticated Axxess file access; do not claim remote inspection or upload. Next: finish static dependency audit, identify a safe archive-based transfer route, preserve existing Axxess content, then validate live domain. No manual filename inventory, no Cloudflare/Netlify builds, and no DNS changes.


## 2026-10-09 — One-package Axxess deployment path added and ZIP root fixed
- Owner correctly rejected the request to type DirectAdmin filenames; this must not be repeated.
- Added GitHub Actions workflow `.github/workflows/prepare-axxess-package.yml` (initial commit `10dabc9fb0cbf28906a6e087ff9423dca415eccc`) to build one ZIP artifact named `axxess-storefront-upload` from curated storefront runtime files and local product images.
- Package includes storefront HTML, checkout/category/returns pages, required JavaScript and assets, plus 2,196 WebP images (about 57.6 MB uncompressed). It deliberately excludes `admin.html` to avoid overwriting the existing admin page.
- **Fixed archive structure:** workflow commit `e22265554412db3e0369325dfe3459a8e28f80e4` now creates the ZIP from inside the staging directory, so files extract directly into `public_html` instead of creating an unwanted `axxess-upload/` subfolder.
- Workflow checks ZIP integrity and uploads artifact `axxess-storefront-upload` for 14 days. Workflow execution/artifact is not yet confirmed: available GitHub connector actions do not expose a general list-workflow-runs or dispatch-workflow operation. The workflow is configured to run automatically on pushes to main and can also be started manually from the Actions page.
- **Only remaining immediate user-side action if the automatic run has not completed:** open https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/workflows/prepare-axxess-package.yml; select the newest run; if none is running/successful, press **Run workflow** → branch **main** → **Run workflow**. Open the completed run and download artifact **axxess-storefront-upload**. These are GitHub UI actions, not DirectAdmin filename work.
- Before deployment, create a backup archive of existing `public_html` in Axxess DirectAdmin. Upload the downloaded ZIP into `public_html`, extract there, and confirm root files merge into `public_html`. Existing `admin.html` and `checkout.html` are not included/overwritten. Verify `/`, `/store.html`, `/category.html`, `/checkout-v2.html`, and `/returns-refunds.html`.
- No Axxess files were uploaded; live domain and end-to-end store remain unverified. No Cloudflare/Netlify build/deploy triggered. Next priority: obtain a successful package artifact, then complete the one-archive Axxess upload and live QA.


## 2026-10-09 — GitHub Actions package workflow status checkpoint
- Owner's latest GitHub Actions page shows four runs of `.github/workflows/prepare-axxess-package.yml` on branch `main`: #1 (`10dabc9`), #2 (`dc99bf8`), #3 (`e222655`), and #4 (`b5f66a6`). The latest listed run (#4) took about 15 seconds; earlier runs took about 16–19 seconds.
- The pasted Actions listing did not include the checkmark/error status, so **do not record the package build as successful yet** and do not assume the artifact exists until the run result and `axxess-storefront-upload` artifact are confirmed.
- Current package workflow design remains: one ZIP with website runtime files and local WebP image folder; ZIP entries extract directly into `public_html`; `admin.html` is excluded to avoid overwriting the existing admin page; archive integrity check is included; artifact retention is 14 days.
- Next execution checkpoint: verify the newest run's result and locate/download artifact `axxess-storefront-upload`. If the run failed, inspect its failed step/logs and fix the workflow before generating more runs. Avoid triggering extra runs without a specific fix.
- **Axxess deployment is still not complete.** No authenticated Axxess/DirectAdmin transfer tool is connected, no ZIP has been uploaded/extracted, and the live domain/customer journey remains unverified. Do not claim otherwise.
- After a confirmed package artifact is available: owner-side DirectAdmin action should be limited to backing up current `public_html`, uploading the single ZIP there, and extracting it into the directory root. Then test `/`, `/store.html`, `/category.html`, `/checkout-v2.html`, and `/returns-refunds.html`.
- Preserve the checkout launch caveat: the source/database/Edge Function pickup and delivery-fee correction was made, but do not treat checkout/payment as fully launch-ready until hosted end-to-end QA passes. PayFast setup remains pending; current configured payment choice is direct EFT.
- No Cloudflare or Netlify credits were used. Continue Axxess as the sole active priority; do not resume catalogue/image/category work until deployment and live verification are complete.


## 2026-10-09 — Axxess deployment package successfully built and retrieved
- Verified GitHub Actions package workflow run #5: run ID `37956673552`, conclusion **success**. Artifact `axxess-storefront-upload` exists (artifact ID `11627838600`), size 57,335,257 bytes, expires 23 October 2026.
- Downloaded the artifact through the GitHub connector and inspected its archive structure. The original artifact contained a nested `axxess-storefront-upload.zip`; extracted that inner deployment ZIP to the working file `/mnt/data/axxess-public_html-upload.zip`. The deployment ZIP passed `unzip -t` with no errors and contains 2,214 entries, including the storefront runtime files and the local WebP image folder. **The verified ZIP is ready for owner-side upload**: [axxess-public_html-upload.zip](sandbox:/mnt/data/axxess-public_html-upload.zip). This sandbox link is available only in the current ChatGPT session; the durable GitHub artifact remains available until its expiry.
- Corrected the workflow in commit `6070734c96a2c05b61cdb3cca60f67c0e3897c72`: future artifact downloads should contain the storefront files directly rather than nesting a ZIP inside the GitHub artifact. Also added a push-path filter so edits to the handover file and unrelated repository files do not repeatedly rebuild the package. Workflow URL: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/main/.github/workflows/prepare-axxess-package.yml
- New workflow run #6, ID `37956941121`, was triggered by that workflow correction and was still in progress at the time of this update. Verify its completion and artifact structure before replacing the current verified ZIP link with a new artifact.
- **Axxess upload is still outstanding**: no authenticated DirectAdmin/FTP/SFTP tool is connected, and no remote hosting files have been changed. Next owner action is one operation sequence in DirectAdmin: back up current `public_html`, upload the linked ZIP into `public_html`, extract into the root, then test the storefront URLs. Do not ask the owner to type out filenames or send screenshots.
- Critical launch caveat remains: deployment package/source correctness does not prove live site or checkout is ready. After upload, verify `/`, `/store.html`, `/category.html`, `/checkout-v2.html`, and `/returns-refunds.html`; test free pickup, delivery fee calculation, R35 packaging per item, direct EFT order flow, mobile layout and admin visibility. PayFast remains pending. Do not place a live stock-changing test order without explicit approval.
- No Cloudflare/Netlify credits used. Next priority remains Axxess upload and live QA; catalogue/image/category cleanup stays paused until that passes.


## 2026-10-09 — Final package artifact verified (workflow run #6)
- Workflow run #6 completed successfully: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/37956941121
- Artifact `axxess-storefront-upload`, ID `11627459551`, downloaded and checked. The downloaded artifact now contains the storefront files directly at ZIP root (no nested ZIP), as intended.
- Integrity verification passed: `unzip -t` reports no errors. Archive contains 2,212 entries, including 2,196 local WebP images and all package root HTML/runtime files. The package is 55 MB compressed and ready for one-archive upload.
- Current-session verified file: `/mnt/data/axxess-storefront-upload.zip`. Use the ChatGPT file link supplied in the current response rather than downloading the earlier nested-artifact version.
- Trigger-loop fix verified: workflow pushes are now filtered to relevant runtime/package files; handover-only edits will not rerun the package workflow.
- Remaining required owner-side step: back up `public_html`, upload this ZIP into `public_html`, extract into that directory's root. The assistant has no authenticated Axxess file-transfer connection, so cannot perform that remote operation itself. After extraction, run the listed URL checks and report any failure for source-side correction. No Cloudflare/Netlify credits used.


## 2026-10-10 — Storefront visual refinement (source updated; deployment intentionally paused)
- Read the permanent handover and continued from the existing GitHub main branch; did not rebuild the store or alter the database/catalogue.
- User feedback: store was loading, but the banner/hero was too large and the page felt cluttered. User requested a brighter background with other elements accentuating it, and the exact tagline **“Your 1 Stop Automotive shopping experience.”**
- Verified that the exact tagline already exists in `index-new.html`; retained it and adjusted its styling for clear visibility.
- Updated `index-new.html` CSS in commit `52d217d1036bc3b49024e28edf1a4e45feb62ec5`: light neutral canvas, white/light-blue hero rather than a full logo image background, shorter hero spacing, smaller responsive headline, cleaner light product/category panels, clearer dark-blue/red accents, and mobile rating/hero layout. Existing navigation, catalogue logic, checkout code, and the 4,187-product database were not intentionally changed.
- This is a source change only. It has **not** been verified on the Axxess live domain. Do not claim deployment/live QA success based on the GitHub commit.
- Do not overwrite the current Axxess site until the owner has a backup and a validated package. Existing DirectAdmin files previously reported include `cgi-bin/`, `index.html`, `admin.html`, `checkout.html`, `assets/`, and other files. No authenticated Axxess file-transfer connection is available to the assistant.
- Next priority: inspect the latest `prepare-axxess-package.yml` workflow status/artifact after this source change, verify ZIP integrity and expected root layout, then use the existing one-archive Axxess procedure. After owner-side extraction, test the homepage visually on desktop/mobile, product/category navigation, search, cart, free pickup, delivery quote, R35-per-item packaging, direct EFT flow, and admin visibility. PayFast remains pending. Do not place a stock-changing live test order without explicit authorization.
- Remaining known issues/tasks: visual confirmation of the new theme; catalogue category accuracy and image quality remain deferred until deployment/QA is complete; final live checkout/security/payment QA is outstanding.
- ETA: source CSS change completed. Package artifact verification should take one focused check; owner-side upload/extraction and live browser checks cannot be completed until the hosting action is performed. No Cloudflare or Netlify credits used in this pass.


## 2026-10-10 — Applied consistent light theme to secondary storefront pages
- User requirement: all subsequent pages must carry the same design as the refreshed homepage.
- Applied shared light neutral backgrounds, white panels/cards, dark-blue headings, blue interactive accents, red highlights, lighter form fields and borders to:
  - `category.html` — commit `b0f47964eafdccb10b44a0274e57eb794614ad71`
  - `checkout-v2.html` — commit `597303b80439a94e48fe4d1eb557471dea610c11`
  - `returns-refunds.html` — commit `7cd70541bed991335eceacee6297710c6373c240`
- These are CSS-only additions appended to each page's existing style block. Existing category/checkout/policy markup and JavaScript were preserved; no database, product data, order, payment, hosting, DNS, or deployment action was performed.
- Homepage source remains the updated light-theme version from commit `52d217d1036bc3b49024e28edf1a4e45feb62ec5`; the exact tagline remains present.
- QA limitation: source-level changes are committed but no live-browser preview or Axxess deployment verification has yet been completed. The user asked to preview before uploading, so do not upload/deploy until the visual preview is reviewed and accepted.
- Next: assemble a safe preview of the actual pages and verify responsive styling, especially checkout form readability and category navigation. Then inspect all linked secondary pages and apply the shared theme where appropriate before preparing the final Axxess package. Do not trigger Cloudflare/Netlify deployments or spend credits.
- ETA: three secondary-page style updates complete; visual preview and cross-page QA remain. Axxess upload remains a separate owner-side step because no authenticated hosting connection is available.


## 2026-10-10 — Added Part Search, Request a Part and picture-assisted request dialogs
- User requested that **Part Search** and **Request a Part** become buttons that open pop-up dialogs, and asked whether customers can search by picture.
- Updated `index-new.html`:
  - Added **PART SEARCH** and **REQUEST A PART** buttons to the homepage hero.
  - Added a pop-up catalogue search that searches loaded catalogue records by product name, public GW SKU, description, compatible vehicle/application and specifications; matching items can be opened from the results.
  - Added **SEARCH BY PICTURE — UPLOAD A PHOTO** inside the search dialog.
  - The picture option opens the existing part-request form and focuses the photo upload control. It supports up to 5 JPG/PNG/WebP photos, max 5 MB each, using the existing `part-source-requests` Storage bucket and `part_source_requests` submission flow.
  - Made vehicle brand/make/model optional in the part-request form so customers requesting marine/tools/general parts or identifying a loose part from a photo are not blocked when they do not know a vehicle.
  - Added support for opening the request dialog through `index-new.html?open=request`, and pre-filling the part description via the `part` query parameter.
- Updated entry points:
  - `products.html` “CAN'T FIND IT? SOURCE A PART” now opens the request dialog on the homepage.
  - `product.html` now has a floating **REQUEST A PART** action and passes the selected product name into the request dialog.
- Source commits:
  - `index-new.html` dialog and button implementation: `9f8a1149de5594b454041ddbd1903cef56c05d47`
  - `index-new.html` optional vehicle fields and picture flow: `855a53fe0ef4380e62a67899cf1400c01c453b92`
  - `products.html` request dialog link: `1a222c135c4a184a1b4ad84ad6953a37e603816b`
  - `product.html` request button: `3035bd4d4786de390acdf1e19a9468967fd4b4da`
  - `index-new.html` selected-part prefill: `68f3d767df73381c1cf55f66a4469d0b585e1683`
  - `product.html` selected-product handoff: `1bc9aa5dcab3c585581389307d935d1de697569e`
- Important capability boundary: this is **picture-assisted part identification**, not automated AI/image-recognition search. The uploaded photos are attached to a sourcing request for the Get Wired team to identify the part and query availability/pricing. Automated image matching would require a separate image-recognition service and matching catalogue image data; that has not been implemented.
- Verification status: GitHub source updates were accepted and committed. The live site, browser interactions, photo upload permissions, Storage bucket policies and request-table submission have **not** yet been end-to-end tested. Do not claim the feature is live or fully verified until tested in the preview and then after the owner-approved upload.
- Deployment remains paused pending the user-requested visual preview. Do not trigger a Cloudflare/Netlify deployment or spend credits. Do not overwrite Axxess files before backup and preview acceptance.
- Next actions: create/review the actual storefront preview; exercise Part Search, empty/no-match search, product opening, Request a Part, photo validation/upload, form submission, mobile layout and cross-page entry points. If Storage or database policy rejects a test, diagnose the exact response and fix permissions/functionality before calling it complete.
- ETA: source implementation committed. Preview and functional QA remain; deployment remains owner-side.


## 2026-10-10 — AI picture recognition implementation prepared (activation still pending)
- User instructed: “Continue and update handover file” after agreeing to implement automatic AI picture recognition for product/part search.
- Updated `index-new.html` (commit `d1074adc75c20fe3f377b7f71d794b4cd5bdbc3e`):
  - Added an **AI PICTURE IDENTIFICATION** section inside the Part Search popup.
  - Customers can choose one JPG/PNG/WebP image (max 4 MB) and click **IDENTIFY PART WITH AI**.
  - Added progress/error messages, a list of possible catalogue matches, product thumbnails when available, public GW SKUs, price/availability labels and a Request/Confirm handoff.
  - The existing manual Request a Part + up-to-5-photo upload workflow remains available and unchanged.
- Created Supabase Edge Function source `supabase/functions/part-image-search/index.ts` (initial commit `130b2cf0d7c001cb440a85a1567a726eddfc8c9d`; catalogue pagination correction commit `13b3c91d5b33eff0a082eb746c09889f93d8da3c`):
  - Calls OpenAI vision model (default `gpt-4.1-mini`) from the server, not the browser.
  - Requests a cautious part description, visible labels/numbers and search keywords.
  - Scores the active catalogue across paginated product records and returns up to eight possible matches.
  - Includes image type/size validation, restricted CORS origins, basic per-instance rate limiting and safe error messages.
  - Does not write or change product records, prices, stock, orders or supplier data.
  - Does not persist the analysis photo in this function; the photo is sent to OpenAI for analysis, so customer-facing disclosure is required.
- Created setup notes `supabase/functions/part-image-search/README.md` (commit `1a8196cac56009cd36736aca52a356a821ba2246`), documenting the required secret and deployment command.
- **Activation blocker:** no OpenAI API key has been supplied/configured in the Supabase project. The function source is committed but has NOT been deployed. The frontend will show a clear “not configured yet” message if the endpoint is unavailable or lacks the secret.
- To activate, the owner must create an OpenAI API key, configure it as the Supabase Edge Function secret `OPENAI_API_KEY` (never in storefront HTML/GitHub client code), then deploy `part-image-search`. The README contains the exact CLI commands. AI-provider usage can incur charges.
- Security/launch caveat: the current in-memory rate limiter is only a basic safeguard and does not provide durable rate limiting across Edge Function instances. Before public production activation, add durable rate limiting or a challenge such as Turnstile, configure provider spending alerts, confirm CORS origins, and run end-to-end tests.
- Verification: GitHub source commits were accepted. No Edge Function deployment, OpenAI API call, browser preview, image-recognition result, Storage permission change or live-site test has been performed. Do not say AI recognition is live/operational yet.
- Hosting rule remains unchanged: do not trigger Cloudflare/Netlify deployments or spend credits; do not upload to Axxess until the user-requested preview has been reviewed and approved. Existing catalogue/checkout remain untouched.
- Next steps: configure the secret only after owner provides/creates the key; add durable abuse controls; deploy and test the function; review the storefront preview; test clear and ambiguous photos, no-match cases, invalid/oversize images, product handoff and mobile layout. Update this handover after each completed step.
- ETA: implementation source and setup instructions committed. Live activation and end-to-end QA depend on OpenAI key configuration, deployment and testing.


## 2026-10-11 09:15 SAST — CONTINUATION EXECUTION UPDATE

- Current main was inspected directly. Latest successful Catalogue Image Audit baseline: 4,082 effective known image routes/files (97.5% of 4,187 active products), with 105 unresolved placeholder SKUs.
- Corrected the bounded exact-SKU sync script from version 8 / 600-item batches / eight workers to version 9 / 40-item batches / four workers. Existing WebP assets remain preserved; exact supplier-SKU matching remains mandatory. Version bump permits one controlled retry pass for unresolved SKUs, then the existing seven-day cooldown applies to same-version failures.
- Corrected Storefront Smoke Test: image fallback now requires exact-SKU WebP load with naturalWidth > 0; a missing-image state cannot pass. Product modal test clicks the product title and captures diagnostic state on failure.
- Commits: sync script 7ac386fa2628d441ce0f83312b4f798ce2f7433c; smoke test 48620aafa83830b7e2d6771a6c0df965eef99f82; working handover 658f9e9f67b978a4f24a6a747648b8e74c7b8172.
- These source edits trigger normal bounded image sync (40 targets maximum) and storefront smoke test. No broad manual workflow dispatch was used.
- Verify post-commit Actions results and current-head canonical-domain production QA before claiming resolution.
- Cloudflare backup deployment remains blocked by missing CLOUDFLARE_API_TOKEN; do not change DNS or credentials. Axxess support reply remains pending; no email inbox was checked. PayFast is not integrated; do not submit real orders/payments.

- Production QA trigger updated at commit `eff54ec48e8deb73eab74d2228e135f8b105fbdf` to verify canonical homepage, category snapshot and exact-SKU WebP after image-sync/report or storefront-smoke changes. No DNS/credentials/payment/product rows changed.

- 11 Oct verification update: Storefront Smoke Test `38120733807` passed including exact-SKU WebP naturalWidth=400 and modal interaction; Store Production QA `38120801809` passed canonical homepage/category snapshot/exact-SKU WebP checks. Supabase product-image v9 query returned 45 HTTP 200, avg 1.227s, max 2.084s. Bounded 40-target image sync `38120731540` remains in progress; wait for completion before reporting counts.

- 11 Oct 09:18 SAST: bounded image-sync run `38120731540` passed (40 targets, 11 exact-SKU matches, 29 unmatched). Cumulative report: 3,302 matched, 94 unresolved; public WebPs/effective known coverage 4,093 of 4,187 (97.75%), audit run `38120859356` passed with zero invalid/mismatched public references. Storefront smoke run `38120733807` and production QA run `38120801809` passed. Supabase product-image v9: 45 HTTP 200, avg 1.227s, max 2.084s. Continue scheduled bounded batches only; verify newly committed images on canonical Axxess host before claiming live.

- Added a canonical production QA check for newly synced `GW-001CED3B.webp` (workflow update commit `8d2d9c42fc0e4f353c8afc3cf5bf833c566c7821`) to verify whether recent image files are live on the Axxess-hosted domain. Run `38120917779` queued; no Axxess upload/deployment was attempted.

- [x] Store Production QA run `38120917779` passed and explicitly confirmed canonical homepage/category/snapshot, `GW-000174D6.webp`, and newly synced `GW-001CED3B.webp` return HTTP 200 with image/webp content type. Canonical host has the newly synced file; no manual upload/deployment was performed.


## 2026-10-11 — CATALOGUE RECONCILIATION ACTUALLY STARTED

- Owner's follow-up correctly flagged that the prior turn stopped after writing the plan instead of starting the work. Do not repeat that mistake: execute the next measurable step after handover updates.
- Read-only live Supabase verification: 4,187 active products; 4,187 unique active SKUs; 0 active products missing/invalid price; 0 missing image_url values; 0 active products without category_id. Image URL presence does not prove the image itself is valid; category linkage does not prove semantic category accuracy.
- Recovered and inspected October Buyer's Guide PDF: 32 pages, 70,691 extracted text characters. October Promotions 2026 PDF: 20 pages, 27,489 extracted text characters. The buyer guide's raised-cent price typography requires careful validation; promotions must not be mistaken for supplier cost.
- Existing Get_Wired_AutoWorx_CORRECTED_PRICE_AUDIT_Feb-Aug_2026.xlsx contains 3,578 audited SKU rows, 126 unresolved price rows, and its PRICE VERIFICATION tab flags 418 formula failures. Treat this audit as a baseline, not a safe-to-import final price source. June OCR staging contains 470 rows and remains unverified.
- Created reconciliation workpaper: Get_Wired_AutoWorx_June_to_October_Catalogue_Reconciliation_Workpaper.xlsx. It contains a source register, an October guide SKU-candidate cross-reference with source pages/context and conservative REVIEW_MATCH statuses, and the previous unresolved-price queue. Candidate extraction is not yet a validated product import.
- No live product records were changed. No deployment credits used.
- Next: inspect current trade price lists and vehicle catalogues; validate candidate SKUs visually/source-by-source; recompute all flagged pricing formulas; produce exact matched, quote-required and review queues; then one non-destructive delta package only after reconciliation.
- ETA: not yet defensible until current trade-list files and SKU match rates are inventoried. Measured first-stage source scope: 32-page October guide, 20-page October promotions PDF, 3,578 historical audited price rows, 126 unresolved prices, 470 June OCR staging rows.


## 2026-10-11 — SOURCE INVENTORY / FIRST RECONCILIATION PASS
- Materialized and inspected the October Buyer's Guide (32 pages; 70,691 extracted text characters), October Promotions 2026 (20 pages; 27,489 extracted text characters), Suzuki vehicle catalogue (15 pages; 17,515 extracted text characters), and Renault/Dacia vehicle catalogue (14 pages; 15,512 extracted text characters).
- Extracted 1,319 unique code-like candidates from the October guide. This is a staging list, not a count of verified products. 522 code candidates had adjacent OCR price patterns; prices are marked as candidates because the raised-cent typography and ex-VAT basis require visual verification.
- Extracted 345 unique code-like candidates across Suzuki and Renault/Dacia catalogues. 45 exact code candidates also appear in the October guide; 44 have adjacent OCR price candidates. These must be visually checked before price use. Other catalogue lines remain in review/quote queue; absence from the guide alone does not prove no current price.
- Updated workpaper now includes source register, October SKU cross-reference, vehicle-catalogue code/price cross-reference, and previous unresolved price queue. No live product rows changed.
- Confirmed previous price audit's 418 formula failures and 126 unresolved rows; no bulk price import is safe until formula/source errors are reconciled.
- Next step: visually verify extracted code/price candidates against the source page images and check exact SKU/cost/current price basis against live products before preparing any delta import. Keep all uncertain lines REVIEW_MATCH/QUOTE_REQUIRED.
- Measured scope so far: 32 + 20 + 15 + 14 PDF pages inspected for extractable text; detailed visual verification and full cross-source matching remain outstanding. ETA for final package still depends on exception rates after visual checks.


## 2026-10-11 — VERIFIED PRICE CORRECTIONS APPLIED
- Spatial PDF text-span analysis confirmed the raised-cent price typography; manually inspected October Buyer's Guide pages 23, 26, and 27 for exact product/price placement.
- Exact SKU and product match verified for three active live records; updated only cost_price, advertised price, and source/verification fields in specifications. Preserved product ID, SKU, image_url and category_id. No product was added/deleted and no deployment was triggered.
  - I1-154, page 23: ex-VAT cost R318.78 (was R299.98); advertised price R494.91 (was R465.72).
  - RN-MF01, page 26: ex-VAT cost R76.72 (was R70.82); advertised price R119.11 (was R109.95).
  - RT-EM02, page 27: ex-VAT cost R587.79 (was R572.72); advertised price R912.54 (was R889.15).
- Re-read live rows after update: all three formula checks passed using round(cost_price × 1.15 × 1.35, 2). Source file/date/page and VERIFIED_PRICE status are stored in product specifications.
- Workpaper refreshed with spatially aligned price candidates, vehicle-code match queue, and a verified correction log. 534 October guide code candidates have spatially aligned price values; do not bulk-apply them without exact product match and page/source review.
- Remaining risks: 418 prior-audit formula failures; 126 unresolved historic prices; 470 June OCR staging rows; vehicle-specific code candidates beyond exact live matches still need match/quote processing. No full catalogue import or category changes made.


## 2026-10-11 — FIRST SAFE INCREMENTAL PRICE DELTA COMPLETED
- Applied 89 exact-SKU price/cost updates from the October Buyer's Guide to active product records after spatial price extraction and SKU/product-description matching. No product IDs, SKUs, image URLs, categories, stock, order references, or storefront code were changed. Source file, October 2026 date, page, cost basis, verification status, and previous prices are preserved in product specifications.
- Live post-update integrity query: 4,187 active products; 4,187 unique active SKUs; 0 invalid prices; 0 active cost-to-retail formula mismatches; 0 missing image_url fields; 0 missing category_id; all 89 October-updated rows pass round(cost_price × 1.15 × 1.35, 2).
- Workpaper updated with 89-row change log, 345 vehicle-catalogue code candidates, 45 exact code candidates appearing in the October guide, and source register. Workpaper is an audit record, not an import package.
- Important distinction: 418 formula failures are reported by the old audit workbook; live DB now independently checks with zero formula mismatches. The old audit still has 126 unresolved historical source prices and must not be imported as-is.
- Next execution: reconcile additional exact-code matches beyond the initial 89, complete the 126 unresolved rows and June OCR staging, then handle the remaining valid vehicle-specific catalogue lines as verified-price or quote-only. Review semantic ASC category placement separately; this batch deliberately did not alter categories.
- No Cloudflare/Netlify credits used and no deployment attempted. ETA for full reconciliation still depends on remaining exact-match and OCR review workload.


## 2026-10-11 — EXPANDED EXACT-SKU OCTOBER DELTA / POST-UPDATE QA
- Expanded the October guide delta from 89 to 107 active product records. Match method: exact supplier SKU, spatially aligned whole-rand/cents price spans, no nearby asterisk marker, and description cross-check. All 107 prices/costs now carry source file/date/page and previous-price traceability. No product IDs/SKUs/images/categories/stock changed; no additions or deletions.
- Held F7-MZ01 out of the price update because its live product name appears to combine unrelated text (“Black Plastic Caps, Valve Cores ...”); it remains in the workpaper review queue pending name/source reconciliation.
- Post-update live QA: 4,187 active products, 4,187 unique SKUs, 0 invalid prices, 0 formula mismatches, 0 missing image_url fields, 0 missing category_id; all 107 October-updated rows pass the selling-price formula. No deployment used.
- Workpaper now includes 107 live price updates and the F7-MZ01 hold reason. Full catalogue reconciliation is still not complete: remaining October candidates, 126 historic unresolved source prices, June OCR staging, and unpriced vehicle-specific catalogue lines need further matching and review.


## 2026-10-12 — CONTINUATION / LIVE DATABASE RECHECK

- Resumed from the permanent handover and confirmed the locked eight user rules and the Axxess-first / single coordinated release workflow remain unchanged.
- Read-only live Supabase recheck at 2026-10-12: **4,187 active products; 4,187 distinct active SKUs; 0 active products missing image_url; 0 active products with missing/invalid cost; 0 active products with missing/invalid advertised price; 0 live price-formula mismatches** using round(cost_price × 1.15 × 1.35, 2).
- This is a live database integrity check only. It does **not** establish that the separate September 800-SKU source candidate is reconciled, that the 38 flagged source-price rows are resolved, or that all 800 candidate SKU/name/cost/price pairings match the live store.
- Latest continuation context records a separate 800-SKU QA candidate: 753 supplier-cost scaling exceptions, 791 candidate selling-price calculation exceptions, 38 decimal/rounding discrepancies needing source review, and 9 quote-only/system-price candidates. Treat these as **candidate-file exceptions**, not permission to bulk change live products. Keep the 9 quote-only candidates available for enquiry; do not invent prices or discard valid fitments.
- Important: do not run the previously rejected/unsafe SQL or apply any blind price overwrite. Candidate-file errors and live database formula status are different checks; retain this distinction in all reports.
- Immediate next work: recover/open the corrected 800-SKU QA workbook and dry-run CSV from the latest session artifacts; inspect the 38 flagged rows against the authoritative September PDF; verify exact supplier SKU, description and source cost; rerun the exact 800-SKU-to-live join and report KEEP / UPDATE / ADD / QUOTE / REVIEW counts. Do not write product data until the row-level comparison is validated.
- Deployment / release: no product writes, no Cloudflare/Netlify build/deploy, and no deployment credits used during this recheck. Preserve the current approved storefront and defer the one coordinated release until catalogue and production QA gates pass.
- ETA: live database integrity recheck completed. A reliable launch ETA is still blocked by the unresolved row-level 800-SKU source reconciliation and 38 source-price checks; give an ETA only after the exact join and exception counts are measured.


## 2026-10-12 — TASK STARTED: RECOVER QA FILES / UNBLOCK RECONCILIATION

- **Status: IN PROGRESS.** Per owner instruction, this task was recorded before recovery/reconciliation work began.
- Work sequence: (1) search conversation uploads and Library for the exact corrected 800-SKU QA workbook, dry-run CSV and authoritative September source; (2) if present, inspect and calculate exact SKU-level KEEP / UPDATE / ADD / QUOTE / REVIEW totals; (3) record each success/failure/blocker in this handover immediately at the point it occurs; (4) do not mutate live product rows or deploy until source reconciliation passes.
- Session continuity limitation: ChatGPT cannot promise to keep a background process alive or automatically restart it after a chat/session ends unless a persistent external scheduler/runner is explicitly configured and verified. Do not claim background monitoring or auto-restart is active unless an actual persistent job and its status can be shown. Investigate available repository automation only after the source-file recovery check; avoid a deployment/build and do not consume release credits.


### 2026-10-12 — Recovery subtask completed / reconciliation files located

- **Status: PARTIAL SUCCESS.** Library search located `Get_Wired_AutoWorx_Reconciliation_Status_2026-10-11.xlsx` (source inventory/status workbook) and the October Buyer's Guide PDF. The status workbook confirms the September Buyer's Guide PDF and corrected staging CSV were recorded as available, but the exact 800-SKU QA workbook/dry-run file was not located by filename in the first search.
- Also found reusable source evidence: `Get_Wired_AutoWorx_STORE_STOCK_Feb-Sep_2026_VERIFIED.xlsx`, `Get_Wired_AutoWorx_CORRECTED_PRICE_IMPORT_Feb-Aug_2026.csv`, June–August audit workbook, and September illustrated catalogue PDFs. These are supporting/history files, **not substitutes** for the exact September source row pairing.
- Confirmed from the status workbook: historical Feb–Aug audit = 3,578 unique SKUs, 3,160 staged formula PASS and 418 one-cent rounding exceptions; historic unresolved-price queue = 126 rows; June OCR staging = 470 rows pending source-code/cost verification. September corrected staging CSV exists per status workbook, but its precise filename/file ID still needs locating.
- Next action now underway: locate exact September PDF/CSV records in Library, materialize the reconciliation status workbook and relevant source files for programmatic inspection, then compute exact SKU joins without any live writes.
- No production data changed; no build/deploy executed.


### 2026-10-12 — Subtask started: rebuild September source extract from authority

- **Status: IN PROGRESS.** The September Buyer's Guide PDF is now located in the Library (file ref surfaced as `file_00000000419c81faa3a92d2cdba5c33c`; uploaded 2026-09-09). The source guide states its prices exclude VAT and asterisked entries are system-dependent/variable.
- The exact named `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv` was not found by targeted title search. To avoid blocking on a missing derivative file, reconstruct an independent, auditable source extract from the original PDF and explicitly mark uncertain OCR rows for review; do not represent the reconstruction as the missing corrected CSV.
- Next: extract source pages/text; normalize supplier codes and numeric costs; separate asterisk/no-price entries; compare exact codes with live product records and preserve the source page for every row. No live writes/deploys.


### 2026-10-12 — Exact corrected September CSV recovered (SUCCESS)

- **Status: SUCCESS.** The Library's filtered spreadsheet inventory located the actual file `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv` (file ref `file_00000000eefc82118ab7428c52667388`, 256,272 bytes) plus a duplicate `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED-1.csv` (same size). This corrects the earlier search limitation; the CSV is available and should be inspected, not replaced with a guessed reconstruction.
- The authoritative `September Buyer's Guide.pdf` is also recovered and will be used to verify source price/code where exceptions are flagged.
- Next: materialize both CSV copies, inspect headers/counts/SKU uniqueness/blank or asterisk prices and candidate formula logic; compare candidate SKU set to live products; identify exact source mismatches. Do not modify live product data.


### 2026-10-12 — Candidate integrity audit / exact inventory join (milestone)

- **Status: IN PROGRESS; key match succeeded.** The corrected September CSV contains exactly 800 rows, 800 unique SKUs: 791 priced candidates and 9 asterisk/system-price quote-only candidates.
- Its specifications.source_price_ex_vat formatting is mixed: 753 rows store whole-number strings that represent cents from the PDF (for example 48079 = R480.79), 38 rows already contain decimal-formatted rand values, and 9 rows are * with no numeric cost/price. The CSV's current 791 priced rows incorrectly set price = cost_price × 1.15 and do not apply the required 35% markup; for 753 rows the raw integer cents were also loaded as whole rand. This is a serious candidate-file defect, not a live database finding.
- Independent exact SKU join against the verified Feb–Sep inventory workbook succeeded for all 791 priced candidates; all 791 are present in its September-source SKU set. The 9 asterisk candidates are excluded from priced import and remain quote-only.
- Next: compare product names and normalized source costs to the verified inventory workbook; recompute correct candidate final price as round(normalized_cost × 1.15 × 1.35, 2); identify rounding/description exceptions; confirm exact candidate-vs-live coverage with source-tagged live counts before any write.
- No live writes/deploys. Keep the September candidate quarantined from import until validation is complete.


### 2026-10-12 — Critical source-to-live defect confirmed; repair plan logged before further work

- **Status: BLOCKER CONFIRMED.** Direct live Supabase checks for source-listed SKUs confirm material price/cost errors despite the earlier database-only formula check passing. The formula check was insufficient because a wrong cost and wrong selling price can still satisfy the formula.
- Confirmed examples against September Buyer’s Guide: SKU EWV4500 source cost R3,975.88 but live cost R39.76 / price R61.73; ROMA13XP source cost R9,939.69 but live cost R99.40 / price R154.32; 500205 source cost R16.57 but live cost R0.17 / price R0.26; 500208 source cost R28.22 but live cost R0.28 / price R0.43; SCR13MM source cost R12.28 but live cost R0.12 / price R0.19; LEOPARD source cost R317.95 but live cost R3.18 / price R4.94; LION source cost R567.22 but live cost R5.67 / price R8.80. These live rows are materially underpriced (roughly 100x) and must be corrected before go-live.
- Confirmed live pattern: 785 active products are tagged with the September source, while the source CSV has 791 priced unique SKUs plus 9 asterisk rows. Six-row coverage difference must be enumerated before import. The nine asterisk candidates currently have inactive zero-price rows for some SKUs; retain them as quote-only/inactive until a valid supplier quote is available.
- Safe next step: generate a corrected staging CSV using source_price_ex_vat as the authority (integer-only catalogue prices represent cents and must be divided by 100; already decimal-formatted values are rand and must not be divided again; asterisk rows remain no-price). Apply the owner’s required final formula = round(cost × 1.15 × 1.35, 2). Produce a separate, exact-key update proposal with old/new costs and prices; validate all 791 rows, exact six-row coverage difference, descriptions, and source page before executing a narrowly scoped database transaction. Do not mass-overwrite all 4,187 products or redeploy yet.
- This is a source-integrity failure, not a deploy/build issue. No live data changed in this step.


### 2026-10-12 — Current-catalogue freshness check started

- **Status: IN PROGRESS.** Before changing any live price, the September source validity note was checked: the September guide says its offer ends 30 September 2026 and prices are valid while stocks last. As of 12 October, it is not safe to blindly republish every September price as current.
- October Buyer’s Guide PDF is available and has been extracted for a cross-check. Of the 38 decimal-formatted September price rows flagged as scaled down in live DB, only SKUs 500205, LEOPARD, and LION appear as literal SKU text in the October PDF text extraction; this needs context/source-page validation before using October values. The other 35 are not found by exact literal search in the extracted October text and must not be assumed to have current October prices.
- Remediation strategy: prepare a corrected September-derived cost/price audit and a separate current-catalogue refresh/hold list. For SKUs with a current October price, prefer the October source; for absent/uncertain SKUs, mark for supplier quote/price confirmation or keep off sale rather than claim stale September price is current. No live writes/deploys.


### 2026-10-12 — Exact candidate-to-live SKU coverage completed (SUCCESS)

- **Status: SUCCESS.** A read-only exact SKU comparison was run for all 800 candidate rows against live Supabase. Result: **800/800 SKUs exist in the live database; 0 missing SKUs; 800/800 unique candidate SKUs.**
- Exact status split: 785 active records carry September Buyer’s Guide source metadata; 6 active records already carry October Buyer’s Guide source metadata (F7-106-16, GUT12, H15-LED-H, HP16-L, MA562BB, RT-EM02); the remaining 9 asterisk/system-price SKUs exist as inactive quote-only rows (A1-002, A1-003, M501WCC, MA330, MA342, MA342/2, N-CP002, N-FC001, WP25). Therefore the previous six-row difference is explained by current October source tags, not missing catalogue products.
- Exact SKU and name matches against the verified inventory workbook succeeded for all 791 priced September candidates. Cost comparison confirms 753 source-normalized costs match the historical inventory workbook; 38 decimal-formatted source rows differ because the historical workbook/live import scaled them down by about 100x. PDF page text was checked for the 38 entries (pages 16, 26, 28, 29, 32) and confirms their actual rand values.
- October freshness check: the September guide's offer-end date was 30 September 2026. October guide includes 500205 in a listing without a current price and explicitly says to consult the representative for price availability; LEOPARD/LION also appear in a listing with price availability by representative. Do not blindly publish the September price for the 38 affected rows.
- Current decision: the 800-SKU matching blocker is resolved. The 38 live pricing defects are quantified and a corrected staging/audit package has been generated, but current supplier-price confirmation remains a release gate. No live rows were modified and no deployment run was triggered, preserving the owner's single-coordinated-release/credit-minimization rule.


### 2026-10-12 — Reconciliation artifacts created; background follow-up configured

- **Status: PARTIAL SUCCESS.** Created and locally verified a 800-row corrected staging candidate with formula checks and explicit NO-IMPORT/hold statuses; 38-row live price-scaling defect report; 9-row quote-only report; and an Excel reconciliation workbook. Local artifacts:
  - Get_Wired_AutoWorx_September_Reconciliation_2026-10-12.xlsx
  - Get_Wired_AutoWorx_September_800_SKU_CORRECTED_STAGING_DO_NOT_IMPORT.csv
  - Get_Wired_AutoWorx_38_LIVE_PRICE_SCALING_DEFECTS_HOLD.csv
  - Get_Wired_AutoWorx_9_QUOTE_ONLY_ASTERISK_ITEMS.csv
- Validation: 800 rows / 800 unique SKUs; 791 numeric source-price rows; 9 asterisk quote-only rows; corrected staging has 0 pricing formula mismatches; 0 rows approved for import. Status split: 747 September-price freshness holds; 38 confirmed live scaling-defect holds; 6 existing October-source rows to preserve; 9 quote-only/inactive rows.
- The staging CSV retains the source metadata and corrected cost/price columns but has no product image URLs; it is explicitly DO NOT IMPORT. Do not use it to overwrite live records or images. The 38-row report's September-derived prices are for audit only, not approved current selling prices; the October guide requires rep price availability for the identified rows. Obtain current supplier pricing and then make the single coordinated release.
- Persistent follow-up: created daily ChatGPT automation **Get Wired Store Reconciliation**, automation ID `6acd0cd882e08191bef1deb1b7a02e88`, timezone Africa/Johannesburg. It is enabled and instructed to resume from this handover, log task start/outcomes, continue current-price verification, and avoid live writes/deploys without owner approval. This is a daily scheduled follow-up, not a continuous always-on process; do not claim immediate restart at the exact moment a chat ends.
- Library persistence attempt for the generated artifacts failed with `container_session_unavailable`; folder `/Get Wired AutoWorx Reconciliation` was created but the four uploads failed. Artifacts remain in the current session's generated files; if needed in a future session, retrieve them from the conversation attachments or regenerate from the corrected September CSV and source PDF.
- No live product rows changed; no deploy/build run; no deployment credits consumed. Next: get current supplier prices for the 785 September-source active products, prioritize the 38 underpriced SKUs, and preserve the six October-source records. Do not set a go-live ETA until the freshness hold is resolved.


### 2026-10-12 — Task started: quantify October guide coverage of all 800 candidates

- **Status: IN PROGRESS.** The 38 critical live price defects have been isolated, but current supplier-price freshness for the wider 785 active September-tagged candidate rows remains a launch gate. Starting a code-level cross-check of all 800 September candidate SKUs against the October Buyer’s Guide PDF text to distinguish listed-current products from not-listed/quote-required products. This is a source presence check only; a SKU mention without a price will not count as price-verified.


### 2026-10-12 — October candidate-SKU coverage check completed

- **Status: SUCCESS for source presence; price extraction remains in progress.** Exact token matching across the October Buyer's Guide PDF found 100 of the 800 September candidate SKUs mentioned in the October PDF. Of those 100, 34 occur on retail-display/product-listing pages that explicitly say to consult the representative for price availability (including affected items such as 500205, LEOPARD and LION); 66 occur on pages with standard catalogue pricing layout and are candidates for current-price extraction. Presence alone is not treated as proof of a current price.
- The remaining 700 candidate SKUs do not appear as exact SKU tokens in extracted October PDF text. Their September prices must not be called October-verified. This establishes the next actionable split: extract and validate the October price for the 66 standard-layout matches; send quote/availability requests for the 34 rep-price items and the 700 not listed in October, with the 38 live scaling defects prioritized.
- No live writes/deploys. Daily follow-up automation remains enabled. Next: extract prices from October pages only where the product code and adjacent price can be mapped confidently; mark ambiguous layout/OCR rows for manual review rather than guessing.


### 2026-10-12 — Task started: release-by-15-Oct critical path and efficiency pass

- **Status: IN PROGRESS.** Owner target: store online by 15 October 2026. This is a target, not a promise; it requires separating a safe public launch from optional catalogue cleanup and integrating only verified current prices.
- Start log recorded before work. Plan: (1) define minimum safe release gates and move non-blocking backlog out of critical path; (2) extract/validate October current prices for the 66 exact-SKU candidates on standard pricing pages; (3) preserve the 34 rep-price/no-price entries, the 700 not found in October, the six already-October-sourced rows, and the nine quote-only rows; (4) quantify remaining supplier/user access dependencies; (5) stage one consolidated release plan without touching live products or spending hosting credits.
- Efficiency guardrails: no redesign, no mass overwrite, no repeated deploys/builds, no unnecessary commits, no use of September expired prices as current, and no image/category/supplier-stock cleanup unless it blocks core shopping or safety.
- Release path should prioritize a controlled, clearly scoped initial launch: reliable product browse/search/detail/cart/order creation, accurate non-stale prices or quote-only holds, terms/privacy/shipping clarity, admin order visibility, domain/HTTPS, security review, and payment-provider readiness. If live PayFast approval/credentials are not available by 15 Oct, do not falsely advertise online card payment; launch only if an explicitly approved manual-payment/assisted-order flow is complete and legally/customer-facing disclosures are clear.
- Current facts before this task: exact 800/800 candidate SKU coverage is complete; 38 material live price-scaling defects are held; 66 October candidates need source price extraction; 34 require representative pricing; 700 are absent from October; September prices expired 30 Sep; no live rows changed and no deployment credits used.


### 2026-10-12 — Release critical-path subtask completed: hosting state verified

- **Status: SUCCESS — release blocker identified.** Read-only Netlify connector verification confirms the currently published production deploy is 6aa98a8a679a4a0008e10b58, state READY, published 15 September 2026 from commit 37654d7c2e8e38dad80f9edf33413aa1be62d1a4. The deploy details report NO Netlify Functions deployed. This is not evidence that the latest GitHub source or current shipping-quote adapter is live. The currently published artifact is stale relative to later project work.
- Existing public test URL remains https://get-wired-autoworx-store.netlify.app; custom-domain status is not proven by this deploy check. Do not submit www.getwiredauto.co.za as a functioning live URL until DNS/HTTPS and the actual public page are verified.
- Efficiency decision: reserve one final deployment only after consolidated source is ready; do not use deploy credits to test intermediate candidates. At final release, confirm the resulting commit includes the current frontend and required serverless functions, then verify the published deploy ID/commit and end-to-end checkout.
- No deploy was triggered; no product writes or deployment credits used.


### 2026-10-12 — Task started: final-build source completeness audit

- **Status: IN PROGRESS.** Before any release build, verify the current Netlify build command actually publishes every referenced customer/admin page and required serverless function. This is a source-only/read-only audit; do not trigger a build/deploy or spend credits. Log any missing publish copy steps and queue them for the single consolidated release.


### 2026-10-12 — Final-build source completeness audit completed

- **Status: SUCCESS — two core launch defects isolated without deployment.** Current GitHub main contains checkout.html, which immediately redirects to checkout-v2.html, and checkout-v2.html is present in the repository. However, netlify.toml's production build command copies checkout.html into dist but does NOT copy checkout-v2.html. Therefore the deployed redirect target is not guaranteed to exist in the published artifact; this must be fixed in the one final build command by adding an explicit copy of checkout-v2.html into dist. Do not spend a deployment credit to test this intermediate defect.
- checkout-v2.html calls Supabase Edge Functions at /functions/v1/shipping-quote and /functions/v1/store-checkout. Read-only Supabase listing confirms both functions are ACTIVE (shipping-quote v3; store-checkout v2). Thus the customer checkout currently depends on the Supabase functions, not the separate Netlify shipping-quote function. Keep the current checkout/function contract consistent; do not introduce duplicate courier adapters during launch hardening.
- Netlify's currently published deploy is from 15 September and reports no Netlify Functions deployed. That is expected to be insufficient evidence for the latest source, but the active Supabase checkout/shipping functions are present. Final deploy must publish checkout-v2.html, approved assets, current storefront, and any truly required Netlify functions; then verify the live route and real Supabase order path.
- **Queued source fix for consolidated release:** amend netlify.toml build command to copy checkout-v2.html to dist/checkout-v2.html; then statically validate every local href/src and checkout endpoint, run available non-credit checks, and make one release deployment only after price holds and security/payment decision are resolved.
- **Not yet verified:** live PayFast end-to-end flow, DNS/HTTPS for www.getwiredauto.co.za, customer order round trip, final Supabase security setting/advisor, and production mobile journey. These remain explicit release gates; no claim of launch readiness is made.
- No storefront source code was changed in this audit; no product data changed; no build/deploy was triggered; no hosting credits consumed.


### 2026-10-12 — Task started: payment and security release-gate audit

- **Status: IN PROGRESS.** Check the existing payment gateway and checkout backend configuration without exposing secrets or changing production settings. Determine whether a verified manual-payment route is viable if PayFast merchant approval/credentials are still pending. Confirm the exact security setting that needs owner action. No live changes, secret reads, or deploys without explicit authorization.


### 2026-10-12 — Payment/security release-gate audit completed

- **Status: SUCCESS — current payment capability identified.** Read-only inspection of the actual checkout source shows the only customer checkout payment option is Direct EFT / bank payment. Orders are explicitly created with payment pending and Get Wired AutoWorx confirms payment manually. This can support a controlled soft launch only if the storefront, terms and customer communications clearly state that online card payment is not yet available.
- The existing Supabase payment-gateway Edge Function is active but is for Peach Payments quote-payment-link/webhook handling (configured provider defaults to PEACH); it is not evidence of a PayFast checkout integration. PayFast end-to-end checkout, callback/signature verification and transaction reconciliation are not currently proven. Do not tell PayFast that this is a live card-enabled store until those checks pass.
- The store-checkout Edge Function is active and calls the protected create_store_order RPC; it creates a pending order, not a completed card payment. The UI sends delivery quote metadata but the function's allowed payload fields currently omit p_delivery_quote; provider/service details are preserved in p_notes, while fee is passed separately. Keep fee validation and notes in final checkout tests; do not assume quote metadata is persisted as a dedicated field.
- Release decision for the 15 Oct target: fastest safe option is a clearly disclosed EFT/manual-payment soft launch, with only price-verified items enabled for direct purchase and all unverified/expired/incorrect-price products routed to quote-only or withheld from cart until current prices are verified. If the owner requires PayFast card payment at launch, the 15 Oct target depends on merchant approval/credentials and a completed end-to-end payment integration/test; this is not presently verified.
- Security: Supabase Auth leaked-password protection remains disabled per existing handover. It is an owner action before final production sign-off; current connector has not exposed the management setting. Do not mark the final security gate passed until the owner enables it and the security advisor/access tests are rerun.
- No secrets were read or printed; no live data, payment settings, deployment, or hosting credits changed.


### 2026-10-12 — Task started: price-safe soft-launch feasibility check

- **Status: IN PROGRESS.** Determine whether existing product UI already supports quote-only items and whether the current 785 unverified September-source candidates can be safely excluded from direct checkout without disabling the rest of the catalogue. This is a source inspection and read-only query only; no bulk live status changes.


### 2026-10-12 — Price-safe soft-launch feasibility check completed

- **Status: PARTIAL SUCCESS — safe route defined; implementation remains queued for the consolidated release.** Current product detail UI renders price, ADD TO CART, and BUY NOW for products with stock; no product-specific quote-only state or price-freshness gate was found in the inspected product-detail template. The generic supplier-network query is not sufficient by itself to prevent stale-priced products from being purchased.
- Therefore, merely fixing the 38 obvious scaling errors is not enough to claim all September-source prices are current. The 785 active September-source records within the 800-SKU comparison remain unverified for current price; 38 of these are known severe scaling defects, and 747 require freshness verification. Six records already carry October source metadata and must be preserved. Nine asterisk/system-priced records remain inactive quote-only.
- **Safest date-driven fallback:** in the single consolidated release, implement a customer-visible pricing status for source-unverified products. Verified-current-price products remain purchasable; unresolved products display “Price & availability on request” and offer a product-specific WhatsApp/quote action while suppressing Add to Cart/Buy Now. Keep the nine no-price entries quote-only. This avoids publishing stale prices and allows the catalogue to remain browsable, but requires a clear soft-launch disclosure that not every item is immediately purchasable.
- Do not simply hide all 785 items without preserving enquiry/fitment routes, and do not mark the whole catalogue price-verified. The owner must decide whether this restricted, quote-assisted soft launch is acceptable if suppliers do not confirm all prices by 14 October. If full online purchase for all 4,187 products is mandatory by 15 October, a current supplier-price feed/confirmation for unresolved items becomes a hard dependency and the date cannot be guaranteed.
- No source storefront files or live product rows changed during feasibility check; no deployment credits used.


### 2026-10-12 — RELEASE TARGET PLAN LOCKED: 15 OCTOBER 2026

**Current status: AMBER/RED — a quote-assisted soft launch is achievable only if the owner accepts the restricted price-safe route and the remaining external gates are completed. Full purchase of every product plus PayFast is not currently release-ready.**

#### Exact work sequence to minimize elapsed time and credits

- **12 Oct (completed source-only audit):** verified current published Netlify deploy is stale (15 Sep commit), found checkout-v2.html missing from the build copy list, confirmed Supabase store-checkout and shipping-quote functions are ACTIVE, confirmed checkout currently offers Direct EFT only with payment pending, and identified 785 September-source records whose current prices are not verified (38 known scaling defects + 747 freshness holds). No live product changes or deployment credits used.
- **13 Oct — source/data package:** finalize the 785-SKU disposition: use supplier-confirmed current costs where available; otherwise set a durable quote-only status for unverified rows, with product-specific enquiry/WhatsApp and Add to Cart/Buy Now suppressed. Preserve the six existing October-source rows and nine inactive system-price rows. Validate formula = cost ex VAT × 1.15 × 1.35, source provenance, images, and exact SKU. Prepare one consolidated import/build package; no blind overwrites.
- **14 Oct — non-credit QA and owner gates:** verify local/static links, include checkout-v2.html in dist, validate the existing Supabase checkout/shipping functions and order totals, confirm Terms/Privacy/Shipping links and EFT wording, enable leaked-password protection (owner action), and verify domain DNS/HTTPS. Confirm PayFast credentials/approval only if PayFast is required for launch. Run no production deploy until these checks pass.
- **15 Oct — single release:** one coordinated source/data update and one final deployment to the existing host, then verify deployed commit and route; test product browse/search/category/product, price/quote-only gates, cart, pickup/delivery quote, R35-per-item packaging, order creation, pending EFT state, admin order visibility, mobile, failure handling, HTTPS/domain, and post-test DB integrity. Stop release if totals, pricing safety, checkout, security or order handling fail.

#### Required owner decision / dependency

- **Fastest safe route:** approve a limited quote-assisted soft launch by 15 Oct: only current-price-verified products are directly purchasable; the rest remain browsable but show “Price & availability on request”; payment is Direct EFT/manual confirmation and clearly disclosed as not card payment. If current supplier prices are not received, this approach avoids selling at stale or incorrectly scaled prices.
- **If full online checkout for all 4,187 products and PayFast card payments are mandatory on 15 Oct:** that date is conditional on current price confirmation for the unresolved catalogue, PayFast merchant approval/credentials, integration and end-to-end test. These external prerequisites are not verified today; do not guarantee the date.
- Owner must enable Supabase Auth leaked-password protection before final production sign-off. The desired custom domain www.getwiredauto.co.za and HTTPS must be independently verified; current Netlify deploy metadata alone does not prove custom-domain DNS works.

#### Permanent execution/monitoring note

- Daily automation “Get Wired Store Reconciliation” remains the persistent scheduled follow-up. It is daily, not continuous; ChatGPT cannot guarantee an immediate automatic restart at the exact moment a chat/session ends. The handover remains the source of truth; every new session must read it first, append task-start status before work, and append outcome immediately after each task.
- Deployment/credit lock remains active: no intermediate builds or deployments, no unnecessary commits, no mass live overwrite, and no Netlify/Cloudflare credit usage until the one final testing phase.


### 2026-10-12 — Task started: pre-release source/package validation (continued session)

- **Status: IN PROGRESS.** Read the current master handover first. Resume from the price-safe launch path; do not restart reconciliation, rebuild the storefront, modify live product rows, or consume hosting credits.
- Current critical path carried forward: resolve current-price disposition for 785 September-source products (38 confirmed scaling defects + 747 freshness holds); preserve 6 October-source rows and 9 quote-only rows; verify the 66 exact October-guide standard-price candidates without treating SKU presence as price proof; keep all unresolved items quote-only/withheld from direct purchase in the eventual consolidated release.
- Existing source defect remains queued: `netlify.toml` copies `checkout.html` but not its redirect target `checkout-v2.html` into `dist`. This must be corrected and statically validated in the single final build package, not tested via an intermediate deployment.
- **Task-start checkpoint only:** no source or live data changed; no build/deploy or hosting credits used. Record verified outcome immediately after the next subtask.


### 2026-10-12 — Subtask completed: independently rechecked October-guide SKU presence

- **Status: SUCCESS for exact-token source presence only; price extraction still OPEN.** Re-read the 4,195-SKU February–September inventory workbook and extracted text from the actual October Buyer’s Guide PDF. The workbook contains 800 September-source rows (791 with numeric verified-cost fields; 9 system/asterisk rows).
- Independent exact-token scan of the October PDF found 102 of the 791 numeric-cost September rows: 35 occur on pages containing a “consult your rep for price availability” notice, and 67 occur on other catalogue pages. The remaining 689 numeric-cost September rows were not found as exact SKU tokens in extracted October text. Across all 800 September rows, 103 tokens matched (35 rep-notice / 68 other-page).
- This differs from the earlier logged 100 / 34 / 66 split. Do **not** silently retain either set as final; the current independent scan is broader across all extracted pages, and the exact page-level price mapping still needs validation. SKU presence is not price verification, and “other page” does not prove a price can be safely mapped to the SKU.
- No selling prices were extracted or approved, no live products were changed, and no deployment/build credits were used. The 38 scaling defects and all unresolved September freshness holds remain held from direct purchase until current price is proven or the item is quote-only.
- **Next action:** map the 67 standard-layout candidate SKUs to their exact October page rows and adjacent supplier prices; separately retain the 35 rep-price items and 689 not-listed items as unverified/quote-required. If text layout does not unambiguously bind code, description and price, mark for visual/manual source review rather than guessing.


### 2026-10-12 — Task started: checkout and catalogue release-safety verification

- **Status: IN PROGRESS.** Continuing directly from the previous audit. The permanent handover is updated before this subtask, as required.
- Scope: read-only check of the current Supabase active catalogue and checkout Edge Function contracts to confirm the next lowest-risk source fix. Do not write product rows, change payment configuration, build/deploy, or consume hosting credits.
- Existing queued issue: `netlify.toml` must copy `checkout-v2.html` into `dist` in the one final build. Price-safe launch still requires a quote-only gate for items without verified current prices.


### 2026-10-12 — Checkout/catalogue verification subtask completed

- **Status: SUCCESS — live data integrity rechecked; two checkout release defects confirmed.** Read-only Supabase SQL against the active `public.products` table returned: 4,187 active products; 4,187 distinct active SKUs; 0 active invalid/non-positive prices; 0 missing active cost_price; 0 missing active category_id; 0 missing active image_url. This verifies basic populated-field integrity only; it does not verify supplier-price freshness or whether every image URL actually loads.
- Supabase Edge Function listing confirms `store-checkout` ACTIVE at v2 and `shipping-quote` ACTIVE at v3. Read-only inspection of deployed `store-checkout` v2 confirms its allow-list strips `p_delivery_quote` before calling `create_store_order`, even though `checkout-v2.html` sends that field. The checkout currently preserves the chosen provider/service/rate/timeframe in `p_notes` and passes the fee separately, but structured quote metadata is not retained by that function contract. This must be reconciled in the final source/function update and verified against the database RPC; do not assume a dedicated quote record exists.
- Checkout also permits all active products with positive prices to be placed in the cart; the inspected checkout query checks `active=true` but does not apply the queued source-price-freshness/quote-only gate. Therefore the price-safe soft-launch control is not implemented yet. It is a release blocker: source-verified products only may be directly purchasable; unresolved items must remain enquiry/quote-only.
- `netlify.toml` still copies `checkout.html` but omits `checkout-v2.html`, despite `checkout.html` redirecting to that file. The one final build must explicitly publish `checkout-v2.html` and validate the redirect target. No intermediate build should be run.
- No live data/source/function was changed during this verification; no deployment/build credits were used. Next ordered task: inspect the authoritative `create_store_order` RPC schema/logic and current product fields to design a minimal, consistent quote-only gate and ensure totals/fee validation server-side before the consolidated release.


### 2026-10-12 — Task completed: authoritative order-RPC contract audit

- **Status: SUCCESS — confirmed backend behavior; no database changes.** Read-only inspection of `public.create_store_order` found multiple overloads. The current frontend payload is intended for the overload with customer/address/payment/items/delivery-method arguments; that overload recalculates subtotal from database prices, charges R35 per item quantity, requires a positive delivery quote for delivery, sets payment/order pending, and decrements stock when the order is created. This means a real test order would change live stock and must not be submitted casually during QA.
- The selected provider quote object sent by `checkout-v2.html` is not accepted by the matching Edge Function allow-list. The SQL overload reconstructs `delivery_quote` as only `{price, notes}`; provider/service/ETA are currently recorded in notes, not reliably as structured fields. The RPC currently does not persist the province in the order row through this overload, despite collecting it at checkout; this needs schema/contract review before release.
- Important distinction: database prices and totals are recalculated server-side, but the database has no dedicated product source-price freshness/approval field among the current product columns. A quote-only price gate cannot be reliably inferred from `active`, `price`, or `cost_price`; it must be introduced explicitly in the consolidated source/data plan (e.g. a dedicated approval/source status or a carefully validated SKU disposition list) and enforced by both product UI and order RPC/Edge Function.
- October source review: many product-listing pages explicitly state “Consult your rep for price availability”; the guide also states prices exclude VAT and trade-store terms apply. Therefore October SKU appearance alone is not adequate evidence of a current consumer selling price. No price was guessed or imported.
- Next action: produce a concrete release blocker matrix and source-only implementation plan for (1) quote-only eligibility enforcement, (2) checkout build copy, (3) order/quote metadata contract and server-side totals, and (4) a no-stock-mutation checkout test strategy. Do not alter production data or deploy until the single consolidated release.


### 2026-10-12 — Task completed: delivery quote path audit

- **Status: SUCCESS — launch blocker isolated from active shipping-quote v3 source.** The Edge Function calls Bob Go, The Courier Guy, PUDO and Aramex only when both provider-specific `*_RATES_URL` and `*_API_TOKEN` are configured; no provider account configuration was verified in this read-only audit. It returns PAXI published rates as `live:false`, explicitly requiring destination-point and parcel eligibility confirmation.
- `checkout-v2.html` filters selectable quotes to `live === true`. Therefore PAXI's published options cannot be selected as checkout-confirmed rates. If no live courier provider is configured/reachable, the page offers manual WhatsApp enquiry but still blocks order submission until a confirmed quote exists. Delivery checkout is consequently not launch-ready without live provider credentials or an explicit safe manual-quote acceptance path.
- The quote function trusts parcel weight/dimensions submitted by the browser rather than reloading product dimensions by SKU from the database. Order creation recalculates merchandise totals server-side, but the checkout order RPC accepts a positive delivery fee supplied through the Edge Function; the current contract does not cryptographically bind the fee to a provider quote. Production release must not treat a browser-supplied price as a verified carrier quote. The final function should bind quotes to server-issued IDs or revalidate fee/provider data server-side, and derive parcel data from active database products.
- No secrets were read or printed, no environment values were changed, no test order/stock mutation was made, and no deployments/credits were used.
- **Next ordered task:** inspect the storefront's current product card/detail rendering and determine the smallest safe way to enforce a dedicated source-price status end-to-end, then prepare all required source/function changes for one consolidated release rather than intermediate deployments.


### 2026-10-12 — Task completed: storefront duplicate-checkout audit

- **Status: SUCCESS — second checkout path found to be incompatible with the authoritative order RPC.** `netlify.toml` injects `assets/store-enhancements.js` into the storefront. That script adds its own `CHECKOUT / SUBMIT ORDER` modal and directly calls `/rest/v1/rpc/create_store_order`, in parallel with the intended `checkout.html` → `checkout-v2.html` flow.
- The injected modal submits `p_items` as `{product_id, quantity}`, but the inspected current order RPC resolves items by `sku`/`public_sku`; it submits `manual_payment` although the current RPC accepts `direct_eft` or `payfast`; and it submits `p_delivery_fee: 0` for delivery even though the RPC requires a positive confirmed delivery quote. It does not implement the R35-per-item fee in its displayed estimate. This path is therefore incompatible and could mislead customers or fail order submission.
- Consolidated release must remove/disable the duplicate modal path or replace it with a link into the single authoritative checkout page. Do not maintain two checkout implementations. The approved design should remain unchanged apart from functional corrections.
- This reinforces that live test orders are unsafe before the correction; order creation decrements stock. No test order or live mutation was made. No builds/deployments/credits used.
- Next: inspect static paths/assets and compile the final source correction checklist so the build-copy fix, single checkout path, quote-only gate, and delivery/payment contracts can be corrected together once.


### 2026-10-12 — Task completed: production publish-path audit

- **Status: SUCCESS — two missing publish-copy defects confirmed.** Current `index-new.html` loads root-level `product-details.js`, but `netlify.toml` does not copy that file into `dist`. The script is present on GitHub, so this is a publish-command defect rather than a missing source file. The final build must copy it to `dist/product-details.js`.
- The storefront references `returns-refunds.html`, which exists in the repository, but `netlify.toml` does not copy it into `dist`. The final build must publish it. `TERMS_AND_CONDITIONS.md` exists as a Markdown file but is not a customer-facing HTML page; it should not be assumed to be a usable checkout terms URL. The repository paths `terms.html`, `privacy.html`, and `shipping.html` were not found by direct file lookup; do not link to them or claim they exist without locating/creating appropriate customer-facing pages.
- The build already copies admin.html, assets/admin.js, checkout.html and the shared assets, but omits checkout-v2.html, product-details.js and returns-refunds.html. These three exact copy operations must be included in the consolidated final build command, followed by static validation of all local links and script references. Product image/logo files may be included in the product-image ZIP; verify archive paths during the final build package check rather than assuming.
- No code or live data changed during this audit; no build/deploy or hosting credits used.
- Next: finish the release-blocker matrix and implement a single authoritative checkout path plus quote-only price status in the consolidated source/function/data change. Do not deploy until all referenced pages and customer policy URLs are present.


### 2026-10-13 — Task completed: fallback-host checkout and payment-readiness audit

- **Status: PARTIAL — public pages are user-verified; checkout/payment are not release-verified.** The user opened all three GitHub Pages URLs successfully:
  - https://getwiredautoworx-max.github.io/get-wired-autoworx-store/
  - https://getwiredautoworx-max.github.io/get-wired-autoworx-store/terms-and-conditions.html
  - https://getwiredautoworx-max.github.io/get-wired-autoworx-store/returns-refunds.html
  This confirms access on the fallback host only. The intended canonical domain https://www.getwiredauto.co.za/ remains unverified. Do not repeat the same DNS test from the isolated execution environment; it cannot resolve external hosts in this session.
- Read-only Supabase function logs contain successful HTTP 200 requests for product-image URLs on 13 Oct 2026, returning image/webp. This is evidence that the image Edge Function is serving images to a public client, not a complete visual/browser verification of every product image.
- Current repository checkout-v2.html uses Supabase products and the active store-checkout / shipping-quote Edge Functions. It permits free pickup and blocks delivery order submission unless a quote marked live=true is selected. The shipping-quote function only requests live rates when provider-specific rate URL and token secrets are configured; PAXI options are explicitly marked live:false and cannot be selected as confirmed rates. Provider secrets/configuration were not read or changed. If no live courier adapter is configured, delivery requires manual WhatsApp follow-up but the current page still blocks submission; this needs a safe confirmed-manual-quote path or a configured/verified carrier adapter before delivery checkout is launch-ready.
- Current checkout frontend sends p_delivery_quote, but deployed store-checkout v2 allow-lists only the other fields and drops this structured field before calling PostgREST. The matching 12-argument create_store_order overload recalculates product subtotal from database values, charges R35 per item quantity, accepts pickup with R0 delivery, requires positive delivery fee for delivery, stores payment/order status pending, and decrements stock at order creation. It reconstructs delivery_quote as {price, notes}; provider/service/timeframe are currently carried in notes rather than reliable structured quote metadata. A real checkout POST must not be used for QA because it creates an order and reduces stock.
- Checkout UI currently exposes Direct EFT only. Separate payment-gateway Edge Function uses Peach Payments and deliberately holds payment-link creation pending merchant-account verification; this does not establish PayFast or PayJustNow integration/readiness. No payment credentials/settings were changed.
- A direct read-only HTTP quote smoke test could not run from this execution environment because its outbound DNS resolution fails (temporary failure resolving the Supabase host). This is an environment limitation, not evidence that the live endpoint is down. Do not claim a successful live quote test.
- No source code, database records, stock, orders, payment settings, DNS, Cloudflare, or Netlify settings were changed during this audit. No test order was created. No Netlify/Cloudflare credits were intentionally used.

**Next ordered tasks (continue without restarting prior audits):**
1. Inspect the active storefront scripts for duplicate checkout/modal paths and ensure only one checkout implementation is customer-accessible.
2. Prepare one consolidated, statically validated source/function release covering: single checkout path; publish all linked checkout/policy/script files in the final package; secure quote binding and persistence; quote-only eligibility for products lacking verified current selling prices; correct customer/address/order fields; and payment-provider choice only after a verified integration is ready.
3. Before any production deploy, independently validate the final source package and tests without creating orders or decrementing stock. Keep all hosting-credit-consuming deployment/testing work for the one final testing phase.
4. Owner-required gates remain: merchant verification/credentials and provider account confirmation for PayFast/PayJustNow (and Peach only if retained); canonical-domain DNS/hosting mapping verification. Do not claim full launch readiness until these are completed.


### 2026-10-13 — Subtask completed: active fallback-host checkout path traced

- **Status: SUCCESS — one checkout route is active on the user-verified GitHub Pages / root Cloudflare Pages source path.** Root index.html redirects to store.html. store.html embeds index-new.html and its checkout button points to checkout-v2.html. The wrapper loads product-image/category/progressive enhancement scripts but does not load assets/store-enhancements.js; index-new.html also does not load that duplicate checkout script. Therefore the duplicate modal found in the old Netlify build command is not on the currently user-verified fallback path.
- The old Netlify build command still injects assets/store-enhancements.js into dist/index.html, which adds an incompatible second checkout modal and calls create_store_order with the wrong payload/payment method and no valid delivery quote. This is a real Netlify-package defect, but Netlify remains stale and must not be reactivated or changed; remove/disable that path only as part of a planned consolidated source/package correction if Netlify is ever retained.
- Cloudflare Pages deployment workflow is manual-only (workflow_dispatch), so a handover-only commit does not by itself run the Cloudflare deploy workflow. No Cloudflare deployment was requested or triggered.
- Source checks reaffirm: checkout-v2.html is the only checkout linked by the active fallback host; it offers Direct EFT only, and a successful order submission would create a real order and decrement stock. No live order POST was attempted.
- No runtime source, database, stock/order data, payment settings, or hosting settings changed in this subtask. The permanent handover checkpoint for the prior audit is commit e594bd5fba29b10a9d3a4cd81dc9d0636ad10412.

**Next ordered task:** finalize the release-blocker matrix and a single safe correction package, without deployment: (a) ensure current-price/quote-only eligibility is explicit and enforced at product display and server order creation; (b) ensure checkout and policy assets are complete for the chosen host; (c) bind delivery quotes safely and persist the actual quote details; (d) keep payment buttons hidden until a chosen provider's verified credentials, webhook/return flow, and merchant approval are available. Only owner-controlled merchant credentials/verification and canonical-domain DNS mapping should require owner action.


### 2026-10-13 — Task started and source patch staged: verified-price checkout gate

- **Status: IMPLEMENTED ON A NON-PRODUCTION BRANCH; automated browser run/result not yet independently retrieved.** Branch: `release/verified-price-checkout-2026-10-13`; latest branch commit: `48df0cf344dacd8a57e81063ea971cc44fdf7c12`. Main remains unchanged by the storefront/function source patch; no Cloudflare/Netlify deployment or production Edge Function deployment was performed.
- Read-only production query found 4,187 active products. All 4,187 have positive price and cost fields and valid public SKU format `GW-[A-Z0-9]{8}`, but only 107 have `specifications.price_status = VERIFIED_PRICE`; 4,080 have no explicit verified-price status. Positive database price/cost fields alone do not prove a current supplier selling price. This confirms the price-freshness gate is needed before online direct purchase.
- Staged `index-new.html` changes: only explicit `VERIFIED_PRICE` items display their price and offer Add to Cart/Buy; other products display “Price on request” and send the customer to WhatsApp for current price/availability. Related-product prices are masked too. Existing cart totals exclude unverified items and flag that some items need a quote.
- Staged `checkout-v2.html` changes: fetch the product price-status metadata and stop checkout for stale/unverified cart items, showing their public SKUs plus a WhatsApp quote action. This also protects old browser-local carts created before the storefront gate.
- Added a tracked source mirror at `supabase/functions/store-checkout/index.ts` based on deployed v2. It validates each public SKU format and checks the active product's `specifications.price_status` server-side before calling the order RPC. Unverified/missing items receive HTTP 409 `PRICE_CONFIRMATION_REQUIRED`; the RPC is not called, so no order is created and stock is not decremented. A read-only privilege check confirmed all three existing `create_store_order` overloads deny EXECUTE to anon/authenticated and grant it only to service_role, so the Edge Function is the appropriate public checkout enforcement point.
- Added a static gate check to `.github/workflows/storefront-smoke.yml` and enabled that workflow on the release branch for a local Playwright smoke test. The source assertions passed in-session. The runner result has not been retrieved; do not mark browser QA as passed yet.
- **Not deployed:** these are staged source changes only. The live Supabase Edge Function remains v2 without this gate; production storefront and database remain unchanged. Do not merge/deploy until the release branch browser run, price-safe purchase path, payment-provider decision, final package/link checks and single consolidated release plan are complete.
- User-confirmed fallback pages remain accessible, but `www.getwiredauto.co.za` and production checkout/payment completion are not yet verified. PayFast/PayJustNow are not integrated in the current checkout; checkout still offers Direct EFT only, while the separate Peach payment-link function is held for merchant verification.

**Next action:** retrieve the release-branch smoke run result if the GitHub Actions connection permits it; otherwise run the equivalent browser/static checks in an authorized runner. Fix any failures on this branch, then continue with the delivery-quote trust/persistence contract and payment-provider/merchant gates. Do not deploy or create test orders.


### 2026-10-13 07:30 SAST — Continuation checkpoint: hosting ZIP cleanup request

- User instruction from the latest session: hosting has a **2 GB file limit**; remove unnecessary ZIP archives from the hosting `public_html` directory, then continue the existing work and update this permanent handover.
- Repository inspection confirms the current `main` root has no `public_html` or `public.html` directory. The only ZIP visible in the repository root is `Get_Wired_AutoWorx_STORE_WITH_WATERMARKED_PRODUCT_IMAGES.zip` (9,325,969 bytes). Do **not** assume this is the hosting ZIP or delete it blindly: it may be the source archive for product imagery and is not located in a `public_html` folder.
- The separate Axxess hosting upload/extraction workflow recorded in earlier context was not accessible through the current GitHub repository interface. No Axxess files, hosting files, or ZIP archives were deleted; no deployment/build was triggered.
- **Next ordered action:** use the Axxess hosting file manager (or an authorized hosting connector/session) to inspect the actual `public_html` file list and sizes. Preserve `admin.html`, backups, `cgi-bin`, configuration, live site files, and any required source assets. Remove only clearly redundant ZIP archives after confirming the extracted files are present and functional. Then verify the directory total is within the 2 GB limit and continue the pending upload/extraction/live-site verification without restarting unrelated audits.
- In parallel, resume the latest existing release branch `release/verified-price-checkout-2026-10-13` at commit `48df0cf344dacd8a57e81063ea971cc44fdf7c12`; first retrieve the outstanding GitHub Actions smoke-test result, then continue the staged checkout/quote/payment correction plan. Do not deploy, create test orders, decrement stock, or consume Netlify/Cloudflare credits before the final testing phase.
- No production source, database, hosting, payment settings, DNS, stock, or orders were changed during this checkpoint.


### 2026-10-13 07:35 SAST — Smoke-test failure isolated and corrected on release branch

- Retrieved GitHub Actions run **Storefront Smoke Test #608**, run ID `38341395036`, branch `release/verified-price-checkout-2026-10-13`, commit `09fd27a15dcaa85f1b80e3f607cb77b33080d81e`. Result: **FAILED** at “Run local storefront smoke test”; the verified-price gate check and invalid-request/no-order safety check both passed.
- Exact failure: the public-fallback checkout smoke test treated SKU `GW-B4F502E6` as directly purchasable, but its live card correctly shows **Price on request / REQUEST PRICE** because it is not marked `VERIFIED_PRICE`. The test expectation contradicted the new price gate; this was a test-fixture/SKU-selection error, not a reason to weaken the price gate.
- Corrected `.github/workflows/storefront-smoke.yml` on the existing release branch to use the already identified verified-price SKU `GW-F165DD11` for the public-host add-to-cart/cart/checkout portion, while retaining the separate quote-only tests for `GW-B4F502E6`. Commit: `7531d58ae6be7f35da29a50f149290d20d956ee7`.
- **Next:** retrieve the new branch smoke run triggered by that commit. If it fails, inspect the exact failing assertion and fix only the demonstrated defect. Do not weaken the price gate, create a live order, alter stock, merge/deploy, or consume hosting credits.
- Hosting ZIP cleanup remains a separate pending Axxess file-manager task: repository main has no `public_html` directory, and no hosting ZIP was deleted.


---

## Automated continuation update — 2026-10-13 19:05 SAST

### Background task result
- GitHub Actions workflow: **Staging Category Navigation Chromium Acceptance**, run #3.
- Run ID: `38435206322`; commit tested: `03cd8d9e229e4f22a899744559b477a3a7df9180`.
- Run status: `completed`; conclusion: `success`.
- Chromium acceptance test step `node scripts/test-staging-category-navigation.cjs` completed successfully; browser/dependency setup also succeeded.
- Evidence: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435206322
- No downloadable artifacts were attached to this run. The test log endpoint did not expose the stdout payload through the current connector, so do not invent exact measured widths, category counts, or console-error counts beyond the test's successful exit and the assertions in the checked-in script.
- This establishes that the automated staging acceptance script passed. It does **not** establish manual visual approval, production QA, payment readiness, or deployment to Axxess.

### Handover/checkpoint maintenance
- Detailed checkpoint: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/audit/buyer-guide-extraction/HANDOVER_CHECKPOINT_2026-10-13.md
- Checkpoint commit before this update: `14e50f1f2af0296f30663ffd808fdc00cbf04eb7`.
- Daily automation **Monitor Get Wired Store Tasks** was updated to include this category-acceptance workflow, the current successful result, handover-first workflow, and explicit safeguards against claiming staging success as production success.
- Daily automation is scheduled; it is not a promise of continuous or hourly observation between runs.

### Exact resume point
1. Run a fresh check of the latest GitHub Actions runs and confirm no new failure/regression after run #3.
2. Do the separate visual/manual mobile QA at 390px and desktop QA; inspect long labels, category/subcategory screens, back navigation, and console/network errors.
3. Update the staging handover with observed evidence from visual QA.
4. Continue category-to-subcategory reconciliation and buyer-guide mapping before any full catalogue import.
5. Keep live Axxess untouched until staging acceptance plus visual QA are complete; do not restart catalogue work or perform production deployment without owner approval.

### Current status
- Automated staging category-navigation acceptance: **PASS** (run #3).
- Visual/manual mobile QA: **NOT YET VERIFIED**.
- Full catalogue import: **not started; preserve existing new-catalogue work**.
- Production Axxess deployment: **not changed by this test**.


## Background-task monitor update — 2026-10-13 19:08 SAST

Fresh GitHub Actions poll after the successful category acceptance:
- **Staging Category Navigation Chromium Acceptance #3** (run ID `38435206322`): completed successfully. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435206322
- **GitHub Pages build/deployment #978** (run ID `38435796239`): completed successfully, including build, artifact upload, and deploy steps. This is a GitHub Pages deployment only and does not mean Axxess production was updated. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435796239
- **Buyer-guide text extraction #50** (run ID `38435893489`): completed successfully; source PDF extraction/OCR job and audit-branch commit steps succeeded. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435893489
- **Storefront Smoke Test #668** (run ID `38435448619`): still `in_progress`; Playwright setup succeeded; staging category browser test is the active step. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435448619
- **Storefront Smoke Test #667** (run ID `38435403130`): still `in_progress`; Playwright setup succeeded; staging category browser test is the active step. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435403130
- No test artifacts/stdout were available via the current connector for the in-progress smoke runs. Do not infer success from setup steps.
- These smoke tests are on branch `test/staging-category-navigation-browser-2026-10-13`; they explicitly test a pinned staging commit and state no production deployment.

### Next precise action
Poll runs `38435448619` and `38435403130` until completed, inspect every step/conclusion, then update this handover. If both remain in progress across a long interval, investigate the active browser-test step for a hang/time limit rather than launching more duplicate tests. Once smoke runs finish, perform visual/manual mobile QA at 390px and desktop width. Keep Axxess unchanged and do not restart catalogue work.


## Background-task completion update — 2026-10-13 19:10 SAST

Follow-up poll confirms both previously active storefront smoke tests completed successfully:
- **Storefront Smoke Test #668**, run ID `38435448619`: **PASS**. All steps succeeded, including staging category browser navigation, verified-price checkout gate, and local storefront smoke test. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435448619
- **Storefront Smoke Test #667**, run ID `38435403130`: **PASS**. All steps succeeded, including staging category browser navigation, verified-price checkout gate, and local storefront smoke test. https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38435403130

### What this does and does not prove
- Automated staging category acceptance and the staging smoke/verified-price checkout gate are green.
- These workflow steps ran against pinned staging content and did not deploy to Axxess production.
- Visual/manual QA on a real mobile viewport and production checkout/payment-provider readiness remain unverified.

### Next action / resume point
1. Check the newest GitHub Actions run list after these completions and note any newly triggered workflow.
2. Perform visual/manual review of the category UI at 390px and desktop width if a usable staging preview is available; record evidence, not assumptions.
3. Continue category reconciliation and catalogue mapping before the full import.
4. Do not restart the catalogue, touch live Axxess, change payment/DNS settings, or consume release credits without explicit owner approval.


## Monitoring and workflow-trigger fix — 2026-10-13 19:12 SAST

### Completed extraction runs
- Buyer-guide text extraction #50 (ID `38435893489`): PASS.
- Buyer-guide text extraction #51 (ID `38436264146`): PASS.
- Buyer-guide text extraction #52 (ID `38436393331`): PASS.
- Buyer-guide text extraction #53 (ID `38436501582`): PASS.
- Run #53 was triggered by a workflow-file-only edit; #50–#52 followed handover-only updates. These were unnecessary repeated PDF extraction/OCR jobs, although all four completed successfully.

### Preventing repeated extraction on handover/config-only edits
- Updated `.github/workflows/extract-buyer-guides-staging.yml` to ignore `AI_HANDOVER*.md` and its own workflow file in `paths-ignore`, alongside the existing `HANDOVER*.md` exclusions.
- Workflow-fix commits: `0c4b4a2e1e0f92c50f36241f0005ff8e1bf6bf3e`, followed by `017df2a492a2948b53f393b17bf0b9a4017d6aae`.
- Purpose: keep ordinary handover maintenance from unnecessarily launching expensive PDF extraction/OCR, while preserving manual `workflow_dispatch` capability.
- Latest Actions list check showed run #53 as the newest run and no additional run triggered by the final ignore-rule change.

### Latest verified project status
- Category navigation acceptance #3: PASS.
- Storefront Smoke Tests #667 and #668: PASS, including staging category browser navigation, verified-price checkout gate, and local storefront smoke test.
- GitHub Pages deployment #978: PASS; does not imply Axxess deployment.
- Buyer-guide extraction #50–#53: PASS.
- Manual/visual QA at 390px and desktop: still required.
- Production Axxess deployment: unchanged/not performed.
- Next action: proceed with manual/visual staging QA if an appropriate preview is accessible, then continue category/subcategory reconciliation. Do not restart the catalogue or treat staging test success as payment-provider or production readiness.


## Background monitor update — 13 October 2026 (latest continuation)
- Latest recent GitHub Actions scan: 20 recent runs returned, all completed; no queued/in-progress runs appeared in that scan.
- Staging Category Navigation Chromium Acceptance #3 PASS (run 38435206322; tested commit 03cd8d9e229e4f22a899744559b477a3a7df9180).
- Storefront Smoke Test #668 PASS (run 38435448619, commit 68cfeb1f) and #667 PASS (run 38435403130, commit 9be92c3a). Staging/local checks only; not proof of live payments or Axxess deployment.
- GitHub Pages deployment #978 PASS (run 38435796239, commit a2cf53f8). Pages is not Axxess production.
- Buyer-guide extraction runs #50–#53 all PASS; latest #53 run 38436501582, commit 0c4b4a2e1e0f92c50f36241f0005ff8e1bf6bf3e. Handover-only workflow retrigger issue has been addressed by path ignores.
- Manual visual QA remains NOT VERIFIED. Run #3 has no attached screenshot artifacts; automated green status must not be represented as a visual/manual pass.
- Immediate next action: add/use a staging-only screenshot capture for 390px mobile and 1280px desktop, publish screenshots as a GitHub Actions artifact on the staging branch, inspect them, and record actual findings. Do not use Netlify/Cloudflare credits or touch Axxess production.
- After visual QA, continue category/subcategory reconciliation using existing buyer-guide extraction outputs and approved eight root categories. No catalogue import until mapping is reconciled and reviewed.
- Continuation checkpoint: HANDOVER_CHECKPOINT_2026-10-13.md, latest update commit a2ab181fd87ff37653634af0c6151ed385192e7c on audit/buyer-guide-extraction.


## Continuation monitor — screenshot-led mobile/category QA (13 October 2026)
- Staging acceptance #9 PASS, run ID `38439364575`, commit `eeb725de8a6ca669cea05664fcf1aa42b9059deb`. Output: 8 approved root categories; all 71 subcategories individually opened and returned; viewport/document width 390/390 and 1280/1280; zero browser errors; zero off-screen elements; mobile buy bar hidden on initial homepage and product modal closed. Screenshot artifact ID `11833614788` contained four viewport screenshots.
- Visual review drove staging-only corrections: category cards simplified and made legible, desktop grid set to 3 columns / mobile 2 columns, search constrained within viewport, idle mobile buy bar hidden unless product modal is open, mobile cart badge contained, mobile hero reduced, and approved category section moved above services. Latest UI commit `ad28c51c08fbdf3272ef1a50d15c446a7747391e` is being retested.
- Acceptance run #10 (ID `38439896256`, commit `ad28c51c`) was in progress at last check. Must inspect fresh screenshots and verify final result before marking visual QA complete.
- Buyer-guide extraction run #59 (ID `38439364567`) PASS. Extraction workflow now ignores storefront HTML and browser-test script edits to avoid redundant PDF extraction for UI-only changes.
- Main Pages deployment #979 (ID `38439838307`, main SHA `f0e44cf6134384cd76257e770171f277d4c81626`) was separately in progress; this is not an Axxess deployment.
- Immediate next action: poll run #10 and inspect artifact screenshots, then record final mobile/desktop visual status. No Axxess upload, DNS/payment changes, or Cloudflare/Netlify credit use.


## Latest UI acceptance / monitoring update — 13 October 2026
- Staging acceptance #10 PASS (run `38439896256`, commit `ad28c51c08fbdf3272ef1a50d15c446a7747391e`). Assertions: 8 root categories, all 71 subcategories individually opened and returned, mobile 390/390 width, desktop 1280/1280 width, zero off-screen elements, zero browser errors, mobile buy bar hidden on initial homepage and product modal closed.
- Screenshot artifact ID `11835171158` from run #10 was downloaded and visually inspected: search fits mobile viewport, category tiles are legible, categories now precede services, mobile cart badge is contained, and idle mobile buy bar is hidden.
- Hero remained larger than desired on desktop, so latest staging-only compact hero adjustment is commit `3e25147ebb774001c9c5265f336c77751dbd4ee6`. Acceptance run #11 ID `38440567696` was queued on commit `3e25147e`; poll and inspect its screenshots before considering visual QA complete.
- GitHub Pages deployments #979 and #980 completed successfully on main; neither means Axxess production was updated.
- PDF extraction run #59 PASS. Extraction workflow now ignores storefront UI/test-only changes to avoid redundant extraction jobs.
- Immediate next action: monitor acceptance #11 and inspect the artifact; continue category mapping after green QA. No Axxess upload or release-credit usage.


## Latest monitor poll — 13 October 2026, 19:44 SAST
- Acceptance #11 (run `38440567696`, commit `3e25147ebb774001c9c5265f336c77751dbd4ee6`) remains in progress. Setup/Chromium install succeeded; Playwright test step remained active and run updated_at stayed `2026-10-13T17:40:37Z` across repeated polls. Logs/artifact unavailable until the job completes. Link: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38440567696
- Pages #980 (run `38440203547`, main SHA `d66064de`) PASS; Pages only, not Axxess.
- Last verified staging acceptance is #10 PASS with screenshot artifact ID `11835171158`. Do not claim compact-hero CSS passed until #11 completes and fresh screenshots are inspected.
- Next: poll #11, inspect logs and the four screenshot artifact files if completed; otherwise diagnose the unusually long-running test step without launching duplicate work. Axxess remains untouched.
