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
