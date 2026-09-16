# GET WIRED AUTOWORX — PERMANENT AI HANDOVER / CONTINUATION CONTROL

**Purpose:** Persistent continuation instructions for future ChatGPT conversations working on the Get Wired AutoWorx store. This file is operational documentation only and must never be imported, bundled, deployed, or used as storefront/runtime code.

**Created:** 16 September 2026
**Repository:** getwiredautoworx-max/get-wired-autoworx-store
**Branch:** main

## 1. PERMANENT USER INSTRUCTIONS

1. This file must not be deleted and must not interfere with the store. It is purely for continuity between conversations.
2. ChatGPT should continue all required project tasks rather than stopping merely to update or notify the user.
3. After each successful task completion, update this handover file with the verified result so the next conversation does not repeat completed work.
4. Notify the user only when an issue genuinely requires user input/permission or when an important result needs their attention.
5. Do not use Cloudflare credits or Netlify credits without explicit user permission.
6. Keep the workflow efficient and fast. Prefer direct execution, batching, verification, and automation over repeated explanations or unnecessary questions.
7. When an issue appears, find a workable solution and resolve it where technically possible. Do not stop at describing the problem.
8. Add valid user suggestions/requirements to this handover so they persist into future conversations.
9. ChatGPT may add useful continuation rules, verified project state, safeguards, or workflow improvements when doing so makes the next AI interface more efficient.
10. Complete incomplete tasks before moving to the next appropriate task. Do not restart work that is already verified.
11. The user may edit this file at any time. A user-edited version becomes the authoritative continuation instruction and should replace/update prior instructions where the text conflicts.

## 2. CORE EXECUTION RULE

**Continue from the current verified state. Do not rebuild the store unless the user explicitly requests a rebuild.**

When a task is incomplete:
- inspect the existing implementation/database/files first;
- identify the smallest safe path to completion;
- execute the work in manageable batches when large;
- verify the result with an independent check;
- record the successful result here;
- immediately continue to the next incomplete task.

Do not repeatedly ask the user to perform actions that ChatGPT can perform through connected tools.

## 3. STORE IDENTITY / LOCKED PROJECT

- Business: Get Wired AutoWorx
- Descriptor: Sound & Security • Auto Electrical
- Established: 2012
- Address: 29 Wattlebrook Crescent, Brookdale, Phoenix, Durban
- Phone: 0744884234
- Email: getwiredautoworx@gmail.com
- Desired domain: getwiredautoworx.co.za
- Interim Netlify URL: https://get-wired-autoworx-store.netlify.app
- Netlify project: get-wired-autoworx-store
- Netlify site ID: c6dbf7bb-ecf4-44d4-b50b-4167e0eedd60
- GitHub repo: getwiredautoworx-max/get-wired-autoworx-store
- Branch: main
- Supabase project ref: ojytykqpvonxvepprgbh
- Supabase URL: https://ojytykqpvonxvepprgbh.supabase.co

## 4. STOREFRONT IS LOCKED

Do not redesign/remove working elements without explicit instruction.

Approved design/functionality includes:
- dark blue/red automotive theme;
- large GW logo;
- sticky header;
- search;
- cart;
- hero;
- Google rating display;
- warranty/service strip;
- category navigation;
- homepage Specials/Featured products;
- full catalogue through category → subcategory → product navigation;
- product details;
- cart/checkout;
- WhatsApp/contact/delivery information;
- mobile bottom navigation;
- footer;
- authenticated admin functionality.

Existing working functionality must be preserved while catalogue/database/image work is performed.

## 5. CURRENT CATALOGUE / SUPABASE STATE — VERIFIED 16 SEP 2026

The previous 791-product state was incomplete. The current database has now been extended to the full catalogue import.

Verified current state:
- buyers_guides_import_staging rows: **4,187**
- distinct staged SKUs: **4,187**
- staged rows with cost: **4,187**
- active products: **4,187**
- active unique SKUs: **4,187**
- active products with cost: **4,187**
- pricing mismatches: **0**
- storefront_products rows: **4,187**
- storefront active rows: **4,187**
- storefront/product exact matches: **4,187**
- current products table total including inactive/history rows: **4,198**
- currently recorded stock > 0: **816** products
- ASC verified stock rows currently matched: **36 SKUs / 7,037 units**
- verified ASC quantities range: **7–1,005**

The catalogue import routine successfully reported **4,187 products upserted**.

Important: Do not describe 791 as the current catalogue total. 791 was the earlier incomplete state.

## 6. CURRENT STOCK WORK

The full 4,187-product catalogue is loaded. Stock verification/reconciliation remains a separate task and must continue from the verified source data.

Known current database stock verification table:
- `asc_stock_verification`: 36 rows / 36 SKUs
- `supplier_stock`: currently 0 rows

Do not invent stock quantities.
Do not treat an old default quantity as verified supplier stock.
Where multiple source documents contain the same SKU, reconcile rather than blindly summing unless the sources clearly represent separate stock pools.
Prefer the latest/explicitly verified stock source for the current quantity.

## 7. PRICING RULE — LOCKED

Supplier cost is ex VAT.

Advertised selling price formula:
**cost × 1.15 VAT × 1.35 markup**

Equivalent:
**cost + 15% VAT, then +35% markup on VAT-inclusive cost.**

Final advertised selling price must be VAT-inclusive.
Show only the final selling price to customers unless the user specifically requests the calculation.

## 8. CATALOGUE SOURCE FILES IDENTIFIED

Relevant stored project files include:
- Get_Wired_AutoWorx_4186_CATALOG_IMPORT.sql
- store_catalogue_step1_final.csv
- Get_Wired_AutoWorx_STORE_STOCK_Feb-Sep_2026_VERIFIED.xlsx
- Get_Wired_AutoWorx_Buyers_Guides_Audit_June_August_2026.xlsx
- Feb Buyer's Guide.pdf
- March Buyer's Guide.pdf
- July Buyer's Guide.pdf
- August Buyer's Guide.pdf
- September Buyer's Guide.pdf
- Get_Wired_AutoWorx_FULL_STORE_INVENTORY_Feb-Sep_2026.docx
- Get_Wired_AutoWorx_CORRECTED_PRICE_AUDIT_Feb-Aug_2026.xlsx

Search the available project/conversation/Library files before asking the user to upload a source that may already exist.

## 9. DATABASE SAFETY

Existing Supabase routines include:
- `import_buyers_guides_catalog()`
- `import_get_wired_product(...)`
- `import_products_batch(...)`
- `run_catalog_import_sql(...)`

Relevant tables include:
- products
- storefront_products
- categories
- buyers_guides_import_staging
- asc_stock_verification
- supplier_stock
- orders
- order_items
- customers
- store_settings
- vehicle_compatibility

Do not damage checkout/admin functionality while updating catalogue or stock.
Verify product counts, SKU uniqueness, price formula, category assignment, and storefront synchronization after bulk changes.

## 10. CATEGORY STRUCTURE

The desired storefront hierarchy must remain usable for customers and should map products logically into category → subcategory → product navigation.

Requested major product groupings include:
- Auto Electrical Spares
  - 12V Light Duty Vehicles
  - 24V Heavy Duty Vehicles
  - Ignition Coils
  - Fuel Pumps / Petrol / Diesel
  - Ignition & Door Barrel Sets
  - Starters / Starter Spares
  - Alternators / Alternator Spares
  - Batteries
  - Tappet Covers
  - Thermostat Housings
  - Side Mirrors
  - Fans & Fan Spares
- Vehicle Security
  - Car Alarm / Immobiliser Systems
  - Central Locking
- Car Audio
  - Head Units
  - Speakers
  - Amplifiers
  - Subwoofers
  - Audio Wiring / Installation
- Accessories
- Marine Spares & Accessories
- Tools / Hardware / Consumables
- Camping / Leisure / Outdoors
- Trailer & Canopy

Do not flatten the hierarchy merely to make importing easier.

## 11. IMAGES

The previous handover recorded an image-cleanup workflow and exact SKU image matching work.

Do not claim image cleanup is complete until the GitHub workflow/result is actually verified.
Do not invent name-based image substitutions when an exact SKU mapping is required.

Previous image-cleanup trigger recorded:
- Workflow run: #19
- Run ID: 35020123380
- Trigger commit: 5a65a955447319931b918e0074d11cfe3b56ebf4

Next image task should verify the workflow result and repository image state before changing anything.

## 12. NETLIFY / CLOUDFLARE RESTRICTION

- Do **not** spend Cloudflare credits without explicit user permission.
- Do **not** spend Netlify credits without explicit user permission.
- Netlify production deployment had previously been blocked by exhausted credits.
- Do not repeatedly ask the user to press Trigger Deploy while credits are unavailable.
- Do not create another Netlify site.
- Do not create another GitHub repository.
- Do not alter the locked Netlify build command unless explicitly instructed.

## 13. REQUIRED VERIFICATION AFTER MAJOR TASKS

After a catalogue/database task, verify:
1. expected active product count;
2. distinct SKU count;
3. duplicate active SKUs;
4. missing costs;
5. pricing formula mismatches;
6. category/subcategory assignments;
7. storefront_products synchronization;
8. stock values against the verified source;
9. image URL/reference integrity where relevant;
10. checkout/admin integrity.

After image work, verify:
1. exact SKU/image mapping;
2. broken image references;
3. orphan image files where detectable;
4. no unintended checkout/admin changes;
5. homepage Specials-only behaviour;
6. category/subcategory/product navigation.

## 14. MASTER STOCK / EXCEL OUTPUT

Once stock verification/reconciliation is complete, create/update a master Excel workbook containing at minimum:
- category;
- subcategory;
- SKU;
- product;
- verified quantity;
- cost ex VAT;
- VAT 15%;
- cost + VAT;
- 35% markup;
- final advertised selling price;
- stock/source reference where available.

Use one master sheet plus relevant category sheets where practical.
The workbook is an operational report, not storefront code.

## 15. CONTINUATION ORDER

Always continue unfinished work in this order unless a dependency requires otherwise:

A. Complete and verify full catalogue import.
B. Reconcile verified stock from all available guides/pricelists/verified supplier sources.
C. Verify pricing for every active product.
D. Verify category/subcategory structure and storefront synchronization.
E. Complete and verify image cleanup/mapping.
F. Verify homepage Specials-only and full catalogue navigation.
G. Verify checkout/admin integrity.
H. Produce the final master stock/pricing workbook.
I. Verify deployment only when deployment credits/capability are available and permitted.
J. Update this handover file after every successful milestone.

## 16. CHANGE LOG

### 16 Sep 2026 — Permanent handover created
- Created this file as the persistent AI continuation control document.
- Recorded user rules 1–11.
- Recorded current verified catalogue state: 4,187 active unique SKUs.
- Recorded 4,187 staged rows and 4,187 storefront rows.
- Recorded pricing mismatch count: 0.
- Recorded current stock verification state: 36 ASC-verified SKUs / 7,037 units.
- Recorded Cloudflare/Netlify credit restriction.

### Prior state — 15 Sep 2026
- Existing handover: HANDOVER_2026-09-15.md
- Earlier active catalogue audit: 791 products.
- This 791-product figure is superseded by the 4,187-product verified catalogue state above.

## 17. AUTHORITY / EDITING

This file is intended to remain in the repository permanently.

If the user edits this file:
- preserve the user's edits;
- treat the latest user-edited content as authoritative;
- reconcile new instructions with existing verified project state;
- update this file rather than creating competing continuation instructions unless a separate file is explicitly requested.

ChatGPT may append verified progress and useful operational safeguards, but must not silently remove user instructions.
