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
