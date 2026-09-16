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
- database stock_quantity > 0: 4,187 active products after stock-floor task
- ASC verified stock: 36 SKUs / 7,037 units
- supplier_stock rows: 0

The catalogue import routine successfully reported 4,187 products upserted. The old 791-product state is superseded and must not be reported as current.

## STOCK WORK — CURRENT LIMIT
The catalogue is complete; full supplier stock verification/reconciliation is not. The available stored stock workbook/report identifies 36 ASC website-verified quantities. Do not convert default 5 quantities into verified stock. Do not invent quantities. Reconcile duplicate SKU sources and prefer the latest explicitly verified source.

### STOCK QUANTITY INCREASE TO 5
- **Status: SUCCESSFULLY COMPLETED AND INDEPENDENTLY VERIFIED — 16 SEP 2026.**
- Verified all active products: 4,187 active products; 0 active products remain below stock quantity 5.
- 4,153 active products are exactly at quantity 5; 34 active products retain quantities above 5 because they have explicitly verified ASC stock.
- All 34 active ASC-verified SKUs match their verified quantities with 0 mismatches.
- The ASC verification table contains 36 verified SKUs / 7,037 verified units; 2 of those verified SKUs are not active products and were preserved unchanged.
- No verified ASC quantity was overwritten by the stock-floor task.
- A subsequent explicit zero-stock sweep was executed and independently verified: 0 active products remain at quantity 0, and 0 active products remain below quantity 5. No inactive zero-stock products remain either.

## PRICING — LOCKED
Supplier cost is ex VAT. Advertised price = cost × 1.15 VAT × 1.35 markup. Final advertised price is VAT-inclusive.

## CATALOGUE / SOURCE FILES
Relevant stored files include Get_Wired_AutoWorx_STORE_STOCK_Feb-Sep_2026_VERIFIED.xlsx/docx, Get_Wired_AutoWorx_ASC_Verified_Audit_2026-09-16.xlsx, Get_Wired_AutoWorx_Buyers_Guides_Audit_June_August_2026.xlsx, Get_Wired_AutoWorx_FULL_STORE_INVENTORY_Feb-Sep_2026.docx, Get_Wired_AutoWorx_4186_CATALOG_IMPORT.sql, store_catalogue_step1_final.csv, Get_Wired_AutoWorx_CORRECTED_PRICE_AUDIT_Feb-Aug_2026.xlsx and the Feb/March/July/August/September buyer guides. Search available files before requesting re-upload.

## CATEGORY STRUCTURE
Preserve logical category → subcategory → product navigation. Major groups include Auto Electrical Spares, Vehicle Security, Car Audio, Accessories, Marine Spares & Accessories, Tools/Hardware/Consumables, Camping/Leisure/Outdoors and Trailer & Canopy, with the requested Auto Electrical 12V/24V hierarchy.

## IMAGES
Do not claim image cleanup complete until the GitHub workflow/result is verified. Previous workflow #19 / ID 35020123380 cleaned 800 images successfully but failed only at push because the runner had checked out an older commit and remote main had advanced. The workflow was then corrected to synchronize with current main before generation/push. New run #45 / ID 35137232280 was triggered from commit `21f32a3670f2b53a8b245dbe18d4d6817061437f`; verify its final conclusion before claiming image cleanup complete. User has explicitly deferred catalogue image work to a later session.

## NETLIFY / CLOUDFLARE
Do not spend Cloudflare or Netlify credits without explicit permission. Do not create another Netlify site or GitHub repo. All credit-dependent work remains deferred to final testing.

## SECURITY — RLS REMEDIATION COMPLETED
- User explicitly authorized execution in the Supabase SQL Editor on 16 Sep 2026.
- RLS is now enabled on all four internal tables: `public.asc_stock_verification`, `public.buyers_guides_import_staging`, `public.catalog_import_runs`, and `public.catalog_full_import_payload`.
- Verified directly in PostgreSQL that `rowsecurity=true` for all four tables.
- Verified there are no public/authenticated policies on these internal tables; they therefore remain protected from ordinary client-role access rather than being exposed by permissive policies.
- Supabase advisor security remediation is recorded as completed for this specific RLS issue.

## REQUIRED VERIFICATION AFTER MAJOR TASKS
Verify active count, SKU uniqueness, missing costs, pricing formula, category refs, storefront sync, stock source, image integrity where relevant, and checkout/admin integrity.

## MASTER STOCK WORKBOOK
When stock verification/reconciliation is complete, produce an Excel workbook with category, subcategory, SKU, product, verified quantity, cost ex VAT, VAT 15%, cost+VAT, 35% markup, final advertised selling price and source reference; master sheet plus category sheets where practical. Do not label the workbook final while stock remains unverified.

## CATEGORY AUDIT NOTE — 16 SEP 2026
Database integrity is clean at the FK/SKU/storefront level, but the active products are still distributed across many source-derived categories and noisy numbered source subcategories. Live staging review confirms the source data contains many repeated/numbered variants such as `4X4 AND OUTDOOR 5`, `ELECTRICAL SPARES & ACCESSORIES 15`, `SPARE PARTS 23`, `HAND TOOLS 29`, `WIPERS 11`, etc. These require deterministic normalization rather than broad string replacement. The requested customer-facing hierarchy must be mapped SKU-by-SKU/source-subcategory-aware and independently verified before destructive category changes.

## MANUAL CATEGORY SORT QUEUE — 198 ITEMS
**Status: RESERVED FOR USER MANUAL SORTING — DO NOT AUTO-ASSIGN OR DELETE.**

- **198 category-review items** remain after the latest safe semantic category cleanup.
- These 198 items are intentionally set aside as a separate manual-sorting label for the user.
- They are to be transferred into the Word worksheet under a separate label: **MANUAL CATEGORY SORT — 198 ITEMS**.
- User will sort these items manually later.
- Do not automatically reassign, delete, or otherwise alter these 198 items unless the user explicitly requests it.
- When the Word worksheet is prepared, keep these 198 items in their own clearly separated section/label so they cannot be confused with completed category assignments.
- This manual queue is separate from image work and must not delay other available store tasks.

## CONTINUATION ORDER
A. Catalogue import — COMPLETE/VERIFIED.
B. Reconcile verified stock from all available guides/pricelists/verified supplier sources — INCOMPLETE; currently limited by absence of a complete verified ASC bulk stock source. Continue searching stored sources and reconcile any newly evidenced quantities.
C. Stock quantity increase to 5 — COMPLETE/VERIFIED, including explicit zero-stock sweep.
D. Verify pricing — COMPLETE/VERIFIED (0 mismatches).
E. Verify category/subcategory and storefront sync — database-level integrity COMPLETE; customer-facing category normalization remains to be completed safely; **198 items are reserved for manual user sorting in the Word worksheet**; storefront UI still requires live verification when deployment is available.
F. Image cleanup/mapping — workflow result still requires final verification; user has deferred catalogue image work to a later session.
G. Homepage Specials-only/full navigation — pending live storefront verification.
H. Checkout/admin integrity — pending live storefront verification.
I. Final master stock/pricing workbook — after stock reconciliation.
J. Deployment verification — only when credits/capability are available and permitted.
K. Update this handover after each milestone.

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

### 16 Sep 2026 — Stock quantity floor completed and verified
- Inspected the live Supabase product and ASC verification state before making changes.
- Verified 4,187 active products and 0 active products below quantity 5.
- Verified 4,153 active products at quantity 5 and 34 active products above 5.
- Verified all 34 active ASC-linked quantities match their recorded verified quantities with 0 mismatches.
- Preserved all explicitly verified ASC quantities.
- Task marked **SUCCESSFULLY COMPLETED** after independent verification.

### 16 Sep 2026 — Explicit zero-stock sweep
- User requested a final sweep to change all stock quantities equal to 0 to 5.
- Executed against active products; no rows required changing because the prior stock-floor task had already eliminated all active zero quantities.
- Independently verified: 0 active zero-stock products, 0 active products below 5, 4,153 exactly at 5 and 34 above 5.
- Confirmed no inactive zero-stock products remain.

### 16 Sep 2026 — Category source audit refresh
- Queried all buyer-guide source category/subcategory combinations across the 4,187-row staging catalogue.
- Confirmed numerous numbered/legacy source-subcategory variants that cannot be safely normalized by simple name replacement.
- Confirmed `category_review_queue` currently contains 435 review rows.
- No destructive category reassignment was made without a deterministic mapping.

### 16 Sep 2026 — Category cleanup and manual-sort queue created
- Safely resolved 194 category-review items using deterministic semantic mappings to relevant existing customer-facing categories.
- `category_review_queue` reduced from 392 to **198** remaining items.
- No valid products were deleted.
- Synced `storefront_products` category IDs from `products` by SKU; verified 4,187 storefront rows with 0 category mismatches.
- The remaining **198 items are now explicitly reserved for manual user sorting** and must be placed in the Word worksheet under the separate label **MANUAL CATEGORY SORT — 198 ITEMS**.
- These 198 items must not be auto-assigned or deleted unless explicitly requested by the user.

### 16 Sep 2026 — Image workflow repair
- Inspected failed workflow #19 / ID 35020123380.
- Confirmed image processing itself completed **800 images**; failure occurred at Git push because the runner had checked out an older commit and remote main had advanced.
- Updated `.github/workflows/clean-product-images.yml` to fetch/reset to current `origin/main` before image generation and before push.
- Triggered new workflow run #45 / ID 35137232280 from commit `21f32a3670f2b53a8b245dbe18d4d6817061437f`.
- Final result must be checked before declaring image cleanup complete; catalogue image work is currently deferred by the user.

### 16 Sep 2026 — Category audit
- Direct Supabase category/count audit shows no FK failures or duplicate active SKUs, but source-derived category distribution is not yet normalized into the requested customer-facing hierarchy.
- Several requested hierarchy nodes have zero active products while source categories hold the catalogue. Safe deterministic mapping is required before changing category assignments.

### 16 Sep 2026 — Security advisor review and RLS remediation
- Supabase advisor reported RLS disabled on four internal tables.
- User explicitly authorized the SQL Editor change.
- RLS was enabled on all four internal tables.
- Independently verified `rowsecurity=true` on all four and confirmed no ordinary public/authenticated policies exist on them.
- Security remediation recorded as complete.

### 16 Sep 2026 — Permanent handover rules locked
- The user's 8 rules are authoritative and must be carried unchanged into every new handover/session.
- Any requested edit/removal of a rule requires reproducing all 8 rules first.

## AUTHORITY
If the user edits this file, preserve their edits and treat the latest user-edited content as authoritative. ChatGPT may append verified progress but must not silently remove user instructions.
