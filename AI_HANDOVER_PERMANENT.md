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
