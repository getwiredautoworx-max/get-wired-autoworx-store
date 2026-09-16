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

### STOCK QUANTITY INCREASE TO 5
- **Status: SUCCESSFULLY COMPLETED AND INDEPENDENTLY VERIFIED — 16 SEP 2026.**
- Verified all active products: 4,187 active products; 0 active products remain below stock quantity 5.
- 4,153 active products are exactly at quantity 5; 34 active products retain quantities above 5 because they have explicitly verified ASC stock.
- Storefront stock is synchronized with products with 0 stock mismatches.
- The ASC verification table contains 36 verified SKUs / 7,037 verified units; 2 of those verified SKUs are not active products and were preserved unchanged.
- No verified ASC quantity was overwritten by the stock-floor task.

## PRICING — LOCKED
Supplier cost is ex VAT. Advertised price = cost × 1.15 VAT × 1.35 markup. Final advertised price is VAT-inclusive.

## CATALOGUE / SOURCE FILES
Relevant stored files include Get_Wired_AutoWorx_STORE_STOCK_Feb-Sep_2026_VERIFIED.xlsx/docx, Get_Wired_AutoWorx_ASC_Verified_Audit_2026-09-16.xlsx, Get_Wired_AutoWorx_Buyers_Guides_Audit_June_August_2026.xlsx, Get_Wired_AutoWorx_FULL_STORE_INVENTORY_Feb-Sep_2026.docx, Get_Wired_AutoWorx_4186_CATALOG_IMPORT.sql, store_catalogue_step1_final.csv, Get_Wired_AutoWorx_CORRECTED_PRICE_AUDIT_Feb-Aug_2026.xlsx and the Feb/March/July/August/September buyer guides. Search available files before requesting re-upload.

## CATEGORY STRUCTURE
Preserve logical category → subcategory → product navigation. Major groups include Auto Electrical Spares, Vehicle Security, Car Audio, Accessories, Marine Spares & Accessories, Tools/Hardware/Consumables, Camping/Leisure/Outdoors and Trailer & Canopy, with the requested Auto Electrical 12V/24V hierarchy.

## IMAGES
Catalogue image matching/watermarking is **deferred to the final phase** at the user's direction. Do not spend time on image cleanup now. Do not claim image cleanup complete until the GitHub workflow/result is verified.

## NETLIFY / CLOUDFLARE
Do not spend Cloudflare or Netlify credits without explicit permission. Do not create another Netlify site or GitHub repo. All credit-dependent work remains deferred to final testing.

## SECURITY — CURRENT VERIFIED STATE
- RLS is enabled on the internal import/verification tables previously remediated.
- Current Supabase security advisor reports informational RLS-enabled/no-policy findings on protected internal/admin tables. These are intentionally not exposed through ordinary client-role policies and require final security review rather than blind policy creation.
- Security-definer order/admin functions were inspected. Admin functions explicitly verify authenticated admin membership through `veyron_admin_users`; `create_store_order` is intentionally callable for anonymous checkout and validates inputs inside the function.
- Supabase Auth leaked-password protection is currently reported disabled and remains a final security configuration item.
- Security findings are documented rather than weakened merely to silence advisor warnings.

## REQUIRED VERIFICATION AFTER MAJOR TASKS
Verify active count, SKU uniqueness, missing costs, pricing formula, category refs, storefront sync, stock source, image integrity where relevant, and checkout/admin integrity.

## BUSINESS REPORTS
- Updated `BUSINESS_STATUS_REPORT_2026-09-16.md` with the current verified catalogue, stock, category, order/customer, security and QA status.
- Current active catalogue of 4,187 already exceeds the earlier 3,000-item target; further expansion is now **validation-led**, not quantity-led.
- Final master stock/pricing Excel workbook remains pending until a complete verified supplier-stock feed is available.

## FINAL-PHASE TASK QUEUE — USER REQUESTED 16 SEP 2026
The following tasks are explicitly moved to the end and must remain in the handover until completed:

### TASK 1 — Manual category-sort list / Word worksheet
- Prepare the separate Word worksheet section **MANUAL CATEGORY SORT — 198 ITEMS**.
- Keep all 198 items isolated from automatically resolved categories.
- Do not auto-assign or delete these items unless explicitly requested.

### TASK 4 — Payments
- Complete PayFast integration.
- Verify PayFast account/documents as required by PayFast.
- Implement payment confirmation → order flow.
- Handle failed/cancelled payments safely.
- Perform payment testing only in final testing phase.

### TASK 5 — Delivery
- Complete Your Courier / PEP PAXI delivery integration.
- Configure delivery options and pricing.
- Link customer delivery details to orders.
- Verify order → delivery workflow in final testing.

### TASK 7 — Product images
- Match catalogue images to SKUs.
- Identify unresolved/missing images.
- Apply the user's watermarking requirement.
- Verify final image coverage.
- User has explicitly deferred this work until later/final phase.

### TASK 10 — Production deployment / live testing
- Verify Netlify production deployment.
- Verify getwiredautoworx.co.za, DNS/Cloudflare if required, HTTPS and redirects.
- Run the complete live customer journey: browse → search → category → product → cart → checkout → payment → order → delivery/admin.
- This is the only phase where Netlify/Cloudflare credit-dependent work may be performed, and only under the locked workflow rules.

## CONTINUATION ORDER
A. Catalogue import — COMPLETE/VERIFIED.
B. Supplier-stock reconciliation — COMPLETE to the available evidence; `supplier_stock` is empty, so only explicitly evidenced ASC quantities are verified. Full reconciliation remains pending receipt of a complete supplier feed.
C. Stock quantity increase to 5 — COMPLETE/VERIFIED.
D. Verify pricing — COMPLETE/VERIFIED (0 mismatches).
E. Storefront/database QA — database consistency verified: 4,187 active products, 4,187 storefront rows, 0 price/category/stock field mismatches. Live UI testing remains final-phase.
F. Catalogue expansion — current catalogue already 4,187 active products, exceeding the earlier 3,000 target. Continue only with validated non-duplicates if a quality source becomes available.
G. Business reports — status report updated; final stock/pricing workbook remains pending until a complete verified supplier-stock feed is available.
H. Security/backup — security review completed to current actionable level; final Auth/security configuration and backup verification remain final review items.
I. **FINAL PHASE:** Tasks 1, 4, 5, 7 and 10 above.
J. Update this handover after every milestone.

## CHANGE LOG
### 16 Sep 2026 — Continuation summary and remaining-task pass
- User instructed: prepare summary, then continue with all remaining tasks.
- Current verified state was rechecked without using Netlify/Cloudflare credits.
- Supplier-stock evidence was searched again; `supplier_stock` remains empty and no unverified stock was invented.
- Business status report was updated with the verified catalogue, stock, pricing, category, security and final-phase status.
- Final-phase tasks remain deliberately deferred as instructed.

### 16 Sep 2026 — User-directed task reprioritization
- User instructed continuation of Tasks **2, 3, 6, 8, 9** now.
- User instructed Tasks **1, 4, 5, 7, 10** to be added to this handover and completed last.
- This ordering is authoritative for continuation.

### 16 Sep 2026 — Supplier stock reconciliation pass
- Inspected database supplier-stock structures and stored supplier/source files.
- Confirmed `supplier_stock` contains 0 rows; therefore no complete stored supplier bulk stock feed exists.
- Confirmed 36 explicit ASC website-verified SKUs / 7,037 units remain the only verified bulk stock evidence currently stored.
- Reconciled active matching ASC quantities into `products` and synchronized `storefront_products`; final storefront stock mismatch count: 0.
- Preserved stock floor 5 for products without explicit verified quantities; no invented supplier stock was added.

### 16 Sep 2026 — Storefront/database QA pass
- Verified 4,187 active products and 4,187 storefront rows.
- Verified 0 missing active cost prices and 0 missing active selling prices.
- Verified 0 storefront price/category/stock mismatches.
- Verified 0 duplicate active SKU groups and 0 missing category references.
- Verified order/customer/order-item tables are currently empty, so no historical order data was altered.
- Inspected current storefront code: index redirects to store.html; store.html loads index-new.html; customer-facing UI contains the locked dark blue/red design, search, cart, category grid, specials, product details, WhatsApp and mobile navigation. Live interaction testing remains deferred to final deployment testing.

### 16 Sep 2026 — Catalogue expansion review
- Current active catalogue: 4,187 products.
- Earlier 3,000-item target is already exceeded.
- No additional bulk import was performed because further quantity without validated non-duplicate source quality would add unnecessary risk.

### 16 Sep 2026 — Business reports
- Created/updated `BUSINESS_STATUS_REPORT_2026-09-16.md` in GitHub.
- Report records verified catalogue, stock, category, order/customer, security and QA metrics.
- Final master stock/pricing workbook remains pending until a complete verified supplier-stock feed is available.

### 16 Sep 2026 — Security review
- Ran current Supabase security advisor.
- Confirmed internal RLS/no-policy findings are present on protected internal/admin tables.
- Inspected SECURITY DEFINER order/admin functions; admin functions perform explicit admin authorization checks, while anonymous order creation is intentionally exposed for checkout and validates inputs internally.
- Recorded Auth leaked-password protection as a final security configuration item rather than making an unsafe blind change.

### 16 Sep 2026 — Category cleanup and manual-sort queue
- Safely resolved 194 category-review items using deterministic semantic mappings.
- `category_review_queue` now contains 198 items reserved for manual user sorting.
- No valid products were deleted.
- Synced storefront category IDs and verified 0 category mismatches.

### 16 Sep 2026 — Stock quantity floor and zero-stock sweep
- Completed and independently verified active stock floor of 5.
- 4,153 active products are exactly 5; 34 are above 5 based on explicit verified ASC stock.
- 0 active products remain below 5.

### 16 Sep 2026 — Permanent handover rules locked
- The user's 8 rules are authoritative and must be carried unchanged into every new handover/session.
- Any requested edit/removal of a rule requires reproducing all 8 rules first.

## AUTHORITY
If the user edits this file, preserve their edits and treat the latest user-edited content as authoritative. ChatGPT may append verified progress but must not silently remove user instructions.
