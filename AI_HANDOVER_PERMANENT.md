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
- Netlify site ID: c6dbf7bb-ecf4-44d4-b50b-4167e0eedd60
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

## TASK 5 — DELIVERY — YOUR COURIER / PAXI
- [x] Investigated Your Courier public booking model: customer-facing flow is WhatsApp-based for local and national South African deliveries.
- [x] Identified `portal.yourcourier.co.za` as the Your Courier white-label customer portal.
- [x] Identified public ParcelOps REST API documentation supporting courier quote, booking, tracking and documents; public webhook example uses `tenantSlug: your-courier`.
- [x] Created `YOUR_COURIER_DELIVERY_INTEGRATION_SPEC.md` with the intended checkout architecture and security requirements.
- [x] Selected preferred architecture: server-side real-time courier quote before payment; no hard-coded delivery price and no browser/API-key exposure.
- [ ] Confirm with Your Courier that Get Wired AutoWorx can obtain API access/key and exact quote endpoint/schema.
- [ ] Obtain Your Courier business tariff/account pricing and parcel limits.
- [ ] Confirm required weight/dimensions, insurance and booking/payment sequencing.
- [ ] Implement secure server-side quote adapter once provider access is confirmed.
- [ ] Store quote/reference/provider/final delivery charge against order; prevent duplicate delivery fees.
- [ ] Implement booking/tracking/webhook handling and idempotency after payment flow is ready.
- [ ] PEP PAXI requirements/config/pricing/tracking.
- [ ] Customer provider choice.
- [ ] Delivery fee exactly once.
- [ ] Delivery information stored/admin-visible.

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

## LATEST PROJECT SUMMARY — 16 SEP 2026
- 4,187 active products; 0 below stock floor; 36 ASC-verified SKUs / 7,037 units.
- 198 products remain reserved for manual category decisions; Product Type is mandatory for those decisions.
- Word worksheet completed and contains all 198 reserved products plus the required decision fields.
- Full supplier-stock reconciliation is still incomplete.
- Checkout uses `manual_payment`.
- Checkout now filters cart verification to active products and requires core delivery address details for delivery orders.
- Your Courier investigation found a viable server-side quote/booking architecture via its white-label ParcelOps portal/API, subject to Your Courier enabling API access and supplying credentials/tariffs.
- Your Courier integration architecture is documented; no live courier credentials have been added and no production delivery pricing has been assumed.
- PayFast integration remains final-phase because merchant credentials/verification and secure server-side callback handling are required.
- Auth leaked-password protection is intentionally deferred to user action before final hosting/release.
- Product images are intentionally deferred.
- Netlify/Cloudflare credits have not been used.

## 16 SEP 2026 — CONTINUATION UPDATE
- Verified repository: `getwiredautoworx-max/get-wired-autoworx-store`, default branch `main`.
- Verified the previously supplied commit `0fde2ad4ec15c4bb9816019ad76c2a9962481785` exists in the repository history. That commit records the no-Cloudflare-credit/no-Netlify-credit constraint.
- Verified the current repository has advanced beyond that commit; latest continuation work includes checkout QA hardening, security/integrity updates, manual category-sort documentation and Your Courier architecture/investigation.
- Inspected the image-cleanup workflow and identified the earlier failure cause: the workflow run cleaned 800 images successfully but attempted to push from an outdated checkout.
- Verified the workflow source now contains the synchronization fix (`fetch origin main` + `reset --hard origin/main`) before image generation and again before commit/push.
- Triggered the corrected workflow from the current `main` branch with commit `836a3586938a9c5649d4a27fe50a60b98e9d811a`.
- **Image cleanup is NOT marked complete yet.** A successful workflow result and resulting repository image commit still require verification.
- No Cloudflare credits or Netlify credits were used for this continuation.

## 17 SEP 2026 — BOB GO DELIVERY ARCHITECTURE / SHIPPING DATA
- Current courier architecture has been expanded from a single-provider Your Courier model to a courier-agnostic live-rate model with **Bob Go as the primary integration target**, while retaining Your Courier/PAXI as possible alternatives or fulfilment options.
- Current Bob Go documentation confirms that its Courier rates can request real-time pricing based on order weight, customer delivery address and collection address. Bob Go also documents pickup-point service levels and an open API for live rates, order/shipment automation and tracking. A sandbox is available for integration testing.
- Created `BOB_GO_DELIVERY_INTEGRATION_SPEC.md` in the repository with the server-side architecture, security rules, checkout presentation and provider-input requirements.
- Added and verified four nullable shipping-dimension fields to `public.products`: `weight_kg`, `length_cm`, `width_cm`, `height_cm`.
- No existing product pricing, stock, catalogue design or checkout payment flow was changed by the shipping-dimension migration.
- No Bob Go credentials have been added, exposed or invented. The live quote adapter remains blocked only by provider/account credentials and exact account/API configuration.
- The store will not advertise a fabricated nationwide delivery price. Live delivery options will be based on the actual customer address and parcel data once Bob Go is connected.
- Netlify/Cloudflare credits remain unused for this work.

## CURRENT BLOCKERS REQUIRING USER/PROVIDER INPUT
These are the only classes of remaining work that cannot be truthfully completed without external/user-controlled inputs:
1. 198 manual category/Product Type decisions.
2. Complete supplier stock feed/account data.
3. PayFast merchant verification/credentials and final callback configuration.
4. Bob Go API access/credentials and account-specific courier/tariff/parcel configuration for the primary live-rate integration.
5. Your Courier API access/credentials and business tariff/parcel rules if retained as a direct fallback/provider option.
6. PEP PAXI account/pricing/tracking requirements.
7. User enabling Supabase Auth leaked-password protection before final release.
8. Final credit-dependent hosting/live deployment and customer testing at the end of the workflow.

## AUTHORITY
If the user edits this file, preserve their edits and treat the latest user-edited content as authoritative. ChatGPT may append verified progress but must not silently remove user instructions.
