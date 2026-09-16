# GET WIRED AUTOWORX — PERMANENT AI HANDOVER / CONTINUATION CONTROL

**Purpose:** Persistent continuation instructions for future ChatGPT conversations working on the Get Wired AutoWorx store. This file is operational documentation only and must never be imported, bundled, deployed, or used as storefront/runtime code.

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
Continue from the current verified state. Do not rebuild the store unless explicitly requested. Inspect first, execute the smallest safe path, batch large work, independently verify, record success in this handover, then continue immediately to the next available task. Do not stop merely to provide progress narration.

## STORE / LOCKED PROJECT
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
Do not redesign/remove working elements. Preserve dark blue/red theme, GW logo, sticky header, search, cart, hero, rating, service/warranty strip, category navigation, homepage Specials/Featured, product details, cart/checkout, WhatsApp/contact, mobile nav, footer and admin.

## VERIFIED DATABASE STATE — 16 SEP 2026
- buyers_guides_import_staging: 4,187 rows
- distinct staged SKUs: 4,187
- active products: 4,187
- active unique SKUs: 4,187
- active products with cost: 4,187
- pricing mismatches: 0
- storefront_products: 4,187 active rows
- storefront/product ID matches: 4,187
- orphan storefront rows: 0
- duplicate active SKU groups: 0
- missing category references: 0
- current products table total including inactive/history: 4,198
- active stock below 5: 0
- active stock exactly 5: 4,153
- active stock above 5: 34
- ASC verified stock: 36 SKUs / 7,037 units
- supplier_stock rows: 0
- orders: 0
- customers: 0
- order_items: 0
- manual category review queue: 198

The catalogue import routine successfully reported 4,187 products upserted. The old 791-product state is superseded and must not be reported as current.

## STOCK WORK — CURRENT LIMIT
The catalogue is complete; full supplier stock verification/reconciliation is not. The available stored stock evidence identifies 36 ASC website-verified quantities. Do not convert default 5 quantities into verified stock. Do not invent quantities. Reconcile duplicate SKU sources and prefer the latest explicitly verified source.

## PRICING — LOCKED
Supplier cost is ex VAT. Advertised price = cost × 1.15 VAT × 1.35 markup. Final advertised price is VAT-inclusive.

## IMAGES
Catalogue image matching/watermarking is deferred to the final phase at the user's direction. Do not spend time on image cleanup now. Do not claim image cleanup complete until the GitHub workflow/result is verified.

## NETLIFY / CLOUDFLARE
Do not spend Cloudflare or Netlify credits without explicit permission. Do not create another Netlify site or GitHub repo. All credit-dependent work remains deferred to final testing.

## SECURITY — CURRENT VERIFIED STATE
- RLS remains enabled on protected tables.
- Redundant public catalogue SELECT policies were removed; canonical public catalogue read policies remain.
- Import/pricing SECURITY DEFINER RPCs are no longer executable by `authenticated`.
- Admin order RPCs remain authenticated-only at the execution layer and retain internal admin authorization checks.
- Anonymous `create_store_order` remains intentionally executable for public checkout and validates inputs internally.
- Supabase Auth leaked-password protection remains disabled and is a production release blocker.
- Current security-advisor review still reports intentional protected-table RLS/no-policy INFO findings, the public checkout SECURITY DEFINER WARN, four authenticated SECURITY DEFINER WARNs for admin/utility functions, and the Auth leaked-password WARN. The four authenticated WARNs now exclude import/pricing RPCs that were explicitly revoked.

## REQUIRED VERIFICATION AFTER MAJOR TASKS
Verify active count, SKU uniqueness, missing costs, pricing formula, category refs, storefront sync, stock source, image integrity where relevant, and checkout/admin integrity.

# DETAILED REMAINING TASK LIST

## TASK 1 — MANUAL CATEGORY-SORT WORKSHEET — FINAL PHASE
- [ ] Extract all 198 reserved products.
- [ ] Include SKU, product name and current category.
- [ ] Include a separate Product Type field identifying what the item actually is.
- [ ] Include useful category options where appropriate.
- [ ] Create separate Word section: MANUAL CATEGORY SORT — 198 ITEMS.
- [ ] Keep all 198 isolated from automatic reassignment.
- [ ] Do not delete any of these products without explicit instruction.
- [ ] After user decisions, update Supabase categories.
- [ ] Synchronize storefront category IDs.
- [ ] Verify 0 category mismatches.

## TASK 2 — SUPPLIER-STOCK RECONCILIATION
- [x] Search available stored supplier/source material.
- [x] Confirm supplier_stock contains 0 rows.
- [x] Confirm 36 ASC SKUs / 7,037 units are explicit verified stock evidence.
- [ ] Obtain/use a complete current supplier stock feed if one becomes available.
- [ ] Reconcile duplicate/conflicting SKU sources.
- [ ] Prefer the latest explicitly verified source.
- [ ] Update quantities only from verified evidence.
- [ ] Produce final supplier-stock reconciliation report.
- [ ] Produce final stock/pricing workbook after full reconciliation.

## TASK 3 — STOREFRONT / DATABASE QA
### Database/source QA
- [x] Active products and unique SKUs.
- [x] Storefront row integrity.
- [x] Price/category/stock synchronization.
- [x] Category references.
- [x] Duplicate SKU check.
- [x] Stock floor.
- [x] Pricing formula.
- [x] Non-credit source-code QA of storefront, checkout and admin paths.
- [x] Corrected storefront checkout payment enum mismatch.
- [x] Added tightened production security/customer test matrix.

### Live/customer QA — FINAL DEPLOYMENT PHASE
- [ ] Homepage and locked design.
- [ ] Search.
- [ ] Categories/subcategories.
- [ ] Product filtering/details.
- [ ] Pricing and stock display.
- [ ] Specials/Featured.
- [ ] Cart/checkout.
- [ ] Customer/delivery details.
- [ ] WhatsApp/contact.
- [ ] Mobile responsiveness.
- [ ] Order/customer/order-item creation.
- [ ] Admin order visibility/status.
- [ ] Payment status.
- [ ] Delivery information.
- [ ] Failed/cancelled transaction handling.

## TASK 4 — PAYFAST — FINAL PHASE
- [ ] Confirm account readiness and verification.
- [ ] Configure credentials securely/server-side.
- [ ] Configure return/callback handling.
- [ ] Connect checkout.
- [ ] Validate amount/reference.
- [ ] Success/failure/cancellation handling.
- [ ] Duplicate transaction protection.
- [ ] End-to-end test only in final phase.

## TASK 5 — DELIVERY — FINAL PHASE
- [ ] Your Courier integration method/configuration/pricing/tracking.
- [ ] PEP PAXI requirements/configuration/pricing/tracking.
- [ ] Customer provider choice.
- [ ] Delivery fee added exactly once.
- [ ] Delivery information stored and visible to admin.

## TASK 6 — CATALOGUE EXPANSION
- [x] Earlier 3,000-product target exceeded; current active catalogue is 4,187.
- [x] Duplicate protection verified.
- [ ] Further additions only from validated non-duplicate sources.

## TASK 7 — PRODUCT IMAGES / WATERMARKING — FINAL PHASE / USER DEFERRED
- [ ] Match image to SKU.
- [ ] Identify missing/uncertain images.
- [ ] Apply watermarking.
- [ ] Optimize and verify image URLs/loading/mobile display.
- [ ] Verify no incorrect product/image pairings.
- [ ] Produce final image coverage report.

## TASK 8 — FINAL BUSINESS REPORTS
- [x] Business status report.
- [x] Non-data-analysis execution report.
- [x] Production security/customer test matrix.
- [ ] Final stock/pricing report after complete verified supplier feed.
- [ ] SKU/category report.
- [ ] Manual category worksheet.
- [ ] Missing-data report.
- [ ] Supplier-stock verification report.
- [ ] Image coverage report.
- [ ] Final catalogue export.
- [ ] Final operational handover.

## TASK 9 — FINAL SECURITY / BACKUP
- [x] Current security review completed to actionable level.
- [x] Non-credit order/admin RPC review completed.
- [x] Obsolete admin RPC overloads removed and privileges rechecked.
- [x] Redundant public catalogue policies removed and canonical policies retained.
- [x] Import/pricing authenticated execution revoked.
- [x] Production security/customer test matrix added.
- [ ] Enable Auth leaked-password protection.
- [ ] Final security-advisor review.
- [ ] Verify RLS and client access for all relevant tables.
- [ ] Final unauthorized-access tests.
- [ ] Final database backup and integrity verification.
- [ ] Verify GitHub/storefront backup.
- [ ] Final handover update.

## TASK 10 — PRODUCTION DEPLOYMENT / COMPLETE LIVE TESTING — LAST
- [ ] Existing Netlify project/deployment source verified.
- [ ] Final approved build deployed.
- [ ] Production HTTPS verified.
- [ ] Domain/DNS/HTTPS verified.
- [ ] No unintended storefront redesign.
- [ ] Complete customer journey: browse → search → category → product → cart → checkout → payment → order → admin → delivery.
- [ ] Failure/cancellation paths.
- [ ] Mobile journey.
- [ ] Database integrity after tests.
- [ ] Final backup.
- [ ] Final handover/sign-off.

## CREDIT / DEPLOYMENT LOCK
Do not spend Cloudflare or Netlify credits before final testing. No new Netlify site or GitHub repository may be created. All credit-dependent work remains at the final deployment/testing stage.

## LATEST PROJECT SUMMARY — 16 SEP 2026
- Catalogue: 4,187 active products.
- Stock floor: 0 active products below 5.
- Verified ASC stock: 36 SKUs / 7,037 units.
- Full supplier stock reconciliation remains incomplete.
- 198 products remain reserved for manual category sorting with Product Type required.
- Nine non-data-analysis tasks were completed in the continuation pass.
- Checkout enum defect corrected to `manual_payment`.
- Production security/test matrix added.
- Redundant catalogue read policies and authenticated import/pricing execution were tightened.
- Netlify/Cloudflare credits have not been used.

## AUTHORITY
If the user edits this file, preserve their edits and treat the latest user-edited content as authoritative. ChatGPT may append verified progress but must not silently remove user instructions.