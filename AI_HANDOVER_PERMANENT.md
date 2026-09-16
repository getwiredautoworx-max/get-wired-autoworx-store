# GET WIRED AUTOWORX — PERMANENT AI HANDOVER / CONTINUATION CONTROL

**Purpose:** Persistent continuation instructions for future ChatGPT conversations working on the Get Wired AutoWorx store. This file is operational documentation only and must never be imported, bundled, deployed, or used as storefront/runtime code.

**Created:** 16 September 2026
**Repository:** getwiredautoworx-max/get-wired-autoworx-store
**Branch:** main

## PERMANENT USER INSTRUCTIONS
1. Do not delete this file or let it interfere with the store.
2. Continue required project tasks rather than stopping merely to update/notify.
3. After each successful task, update this handover with the verified result.
4. Notify the user only when user input/permission is genuinely required or an important result needs attention.
5. Do not use Cloudflare credits or Netlify credits without explicit user permission.
6. Keep workflow efficient: direct execution, batching, verification and automation.
7. Find and resolve workable solutions instead of stopping at describing issues.
8. Preserve valid user suggestions/requirements here.
9. ChatGPT may add useful continuation rules, safeguards and verified state.
10. Complete incomplete tasks before moving to the next; do not restart verified work.
11. User edits to this file are authoritative.

## CORE EXECUTION RULE
Continue from the current verified state. Do not rebuild the store unless explicitly requested. Inspect first, execute the smallest safe path, batch large work, independently verify, record success, then continue.

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
- database stock_quantity > 0: 816 products
- ASC verified stock: 36 SKUs / 7,037 units
- supplier_stock rows: 0

The catalogue import routine successfully reported 4,187 products upserted. The old 791-product state is superseded and must not be reported as current.

## STOCK WORK — CURRENT LIMIT
The catalogue is complete; stock verification/reconciliation is not. The available stored stock workbook/report explicitly identifies 36 ASC website-verified quantities and uses quantity 5 as a temporary default for unverified items. The separate ASC audit states it is an interim audit and that remaining live-stock records require a bulk ASC stock/pricelist export. Do not convert default 5 quantities into verified stock. Do not invent quantities. Reconcile duplicate SKU sources and prefer the latest explicitly verified source.

Current 36 verified ASC SKUs are recorded in `asc_stock_verification` and include examples such as 339-10=1002, 516IFF=788, H170W24V=1005, S14-130BL=285, S14-530R=208, S14-830BL=74 and SCL014=77.

## PRICING — LOCKED
Supplier cost is ex VAT. Advertised price = cost × 1.15 VAT × 1.35 markup. Final advertised price is VAT-inclusive.

## CATALOGUE / SOURCE FILES
Relevant stored files include Get_Wired_AutoWorx_STORE_STOCK_Feb-Sep_2026_VERIFIED.xlsx/docx, Get_Wired_AutoWorx_ASC_Verified_Audit_2026-09-16.xlsx, Get_Wired_AutoWorx_Buyers_Guides_Audit_June_August_2026.xlsx, Get_Wired_AutoWorx_FULL_STORE_INVENTORY_Feb-Sep_2026.docx, Get_Wired_AutoWorx_4186_CATALOG_IMPORT.sql, store_catalogue_step1_final.csv, Get_Wired_AutoWorx_CORRECTED_PRICE_AUDIT_Feb-Aug_2026.xlsx and the Feb/March/July/August/September buyer guides. Search available files before requesting re-upload.

## CATEGORY STRUCTURE
Preserve logical category → subcategory → product navigation. Major groups include Auto Electrical Spares, Vehicle Security, Car Audio, Accessories, Marine Spares & Accessories, Tools/Hardware/Consumables, Camping/Leisure/Outdoors and Trailer & Canopy, with the requested Auto Electrical 12V/24V hierarchy.

## IMAGES
Do not claim image cleanup complete until the GitHub workflow/result is verified. Previous workflow #19 / ID 35020123380 cleaned 800 images successfully but failed only at push because the runner had an outdated main ref. The workflow was then corrected to synchronize with current main before generation/push. New run #45 / ID 35137232280 was triggered from commit 21f32a3670f2b53a8b245dbe18d4d6817061437f and was observed in progress; verify its final conclusion before claiming image cleanup complete.

## NETLIFY / CLOUDFLARE
Do not spend Cloudflare or Netlify credits without explicit permission. Do not create another Netlify site or GitHub repo. Existing Netlify deployment was previously blocked by exhausted credits.

## REQUIRED VERIFICATION AFTER MAJOR TASKS
Verify active count, SKU uniqueness, missing costs, pricing formula, category refs, storefront sync, stock source, image integrity where relevant, and checkout/admin integrity.

## MASTER STOCK WORKBOOK
When stock verification/reconciliation is complete, produce an Excel workbook with category, subcategory, SKU, product, verified quantity, cost ex VAT, VAT 15%, cost+VAT, 35% markup, final advertised selling price and source reference; master sheet plus category sheets where practical. Do not label the workbook final while stock remains unverified.

## CATEGORY AUDIT NOTE — 16 SEP 2026
Database integrity is clean at the FK/SKU/storefront level, but the active products are still distributed across many source-derived categories (for example Automotive Accessories, Parts, Electrical, Lighting and Tools & Workshop), while several requested customer-facing hierarchy categories currently contain zero products. This is a mapping/normalization task, not a database-integrity failure. Do not perform a broad destructive remap without first deriving a deterministic SKU/source-subcategory mapping and independently verifying the result.

## CONTINUATION ORDER
A. Catalogue import — COMPLETE/VERIFIED.
B. Reconcile verified stock from all available guides/pricelists/verified supplier sources — INCOMPLETE; currently blocked by absence of a complete verified ASC bulk stock source. Continue searching stored sources and reconcile any newly evidenced quantities.
C. Verify pricing — COMPLETE/VERIFIED (0 mismatches).
D. Verify category/subcategory and storefront sync — database-level integrity COMPLETE; customer-facing category normalization remains to be completed safely; storefront UI still requires live verification when deployment is available.
E. Image cleanup/mapping — workflow rerun in progress; verify final result.
F. Homepage Specials-only/full navigation — pending live storefront verification.
G. Checkout/admin integrity — pending live storefront verification.
H. Final master stock/pricing workbook — after stock reconciliation.
I. Deployment verification — only when credits/capability are available and permitted.
J. Update this handover after each milestone.

## CHANGE LOG
### 16 Sep 2026 — Database verification refresh
- Rechecked Supabase directly.
- Confirmed 4,187 active unique products, all priced.
- Confirmed 0 pricing mismatches under cost × 1.15 × 1.35.
- Confirmed 0 duplicate active SKU groups.
- Confirmed 0 missing category references.
- Confirmed 4,187 storefront active ID matches and 0 orphan storefront rows.
- Confirmed 36 ASC verified SKUs / 7,037 units.
- Confirmed supplier_stock remains empty.
- Confirmed stock reconciliation remains the main unfinished database task.

### 16 Sep 2026 — Image workflow repair
- Inspected failed workflow #19 / ID 35020123380.
- Confirmed image processing itself completed **800 images**; failure occurred at Git push because the runner had checked out an older commit and remote main had advanced.
- Updated `.github/workflows/clean-product-images.yml` to fetch/reset to current `origin/main` before image generation and before push.
- Triggered new workflow run #45 / ID 35137232280 from commit `21f32a3670f2b53a8b245dbe18d4d6817061437f`.
- Run was observed in progress; final result must be checked before declaring image cleanup complete.

### 16 Sep 2026 — Category audit
- Direct Supabase category/count audit shows no FK failures or duplicate active SKUs, but source-derived category distribution is not yet normalized into the requested customer-facing hierarchy.
- Several requested hierarchy nodes have zero active products while source categories hold the catalogue. Safe deterministic mapping is required before changing category assignments.

### 16 Sep 2026 — Permanent handover created/continued
- Persistent continuation rules and project state recorded.

## AUTHORITY
If the user edits this file, preserve their edits and treat the latest user-edited content as authoritative. ChatGPT may append verified progress but must not silently remove user instructions.
