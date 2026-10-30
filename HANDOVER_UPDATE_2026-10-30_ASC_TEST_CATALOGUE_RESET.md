# Get Wired AutoWorx — ASC Test Catalogue Reset & Android Workstream Handover

**Checkpoint:** 30 October 2026  
**Repository:** `getwiredautoworx-max/get-wired-autoworx-store`  
**Base branch:** `main`  
**Cleanup branch:** `cleanup/asc-catalogues-stock-reset-2026-10-30`

## 1. Owner instruction

The owner requests:
- Remove the existing ASC catalogue and ASC stock-source material from the current GitHub repository working tree.
- Owner will provide one new test catalogue. Use that source as the controlled test for the revised bulk-processing workflow.
- Work in coordination with the separate Android ChatGPT agent, which will handle other store-related tasks.
- Target completion today, 30 October 2026.

## 2. Files targeted for this reset

- All 34 PDF files previously tracked under `suppliers/ASC/` (monthly Buyer’s Guides, product/vehicle catalogues, new arrivals and stock-arrival/numbered references).
- `Get_Wired_AutoWorx_4186_CATALOG_IMPORT.sql` (legacy 4,186-SKU catalogue import payload derived from historical Buyer’s Guides).
- `STOCK_SYNC_STATUS_2026-09-16.md` (ASC verified-stock summary containing 36 SKU quantities).
- `catalogue-audits/ASC_VEHICLE_CATALOGUE_PRICE_CROSSCHECK_PILOT_2026-10-27.md` (ASC-only staging audit).
- `.github/workflows/asc-sku-image-sync-bounded.yml` (scheduled ASC image-sync workflow that could continue writing to GitHub).
- `scripts/asc_image_sync_bounded.py` and `image-sync/asc_image_sync_report.json` (automation implementation and its ASC-specific report).
- Replace `suppliers/ASC/README.md` with a clean test-intake instruction file.

The changes are being made on a dedicated branch so they can be reviewed before the main branch is changed. An older branch named `audit/asc-catalogue-cleanup` is 959 commits behind and diverged from current main; it is not to be merged or used as the cleanup baseline.

## 3. Explicitly out of scope — do not change

- Do not delete or deactivate product rows in Supabase.
- Do not change current physical stock quantities, including the 11 existing `IASC-` product records (currently 55 recorded units in total).
- Do not delete or rewrite `public.asc_stock_verification` or other Supabase data as part of a GitHub-file request.
- Do not delete the 4,101 existing files under `assets/products_webp/`. The storefront's `product-image` Edge Function uses this cache for current product photos; bulk deletion would break existing images. Replace only after exact new image matches have been verified and storage URLs are ready.
- Do not delete the 11 legacy `assets/products/IASC-*.jpg` source files in this reset; retain until their fallback usage is checked against the new product image pipeline.
- Do not delete the generic, unattributed `data/STORE_STOCK_IMPORT_2026-09-16.csv` until ASC provenance is proven. It is held out of the new import pipeline.
- Preserve storefront layout/code, categories, checkout, non-ASC supplier sources and current customer-facing image assets.
- No Netlify or Cloudflare credits. No production deployment.

## 4. Workstream split

### ASC catalogue workstream — this agent
Own:
- GitHub ASC source reset and its verification.
- Receive the new owner-supplied test catalogue.
- Preserve the original and record file hash, date/edition and page count.
- Extract products in batches to a review-only staging CSV/XLSX.
- Produce cleaned image crops/contact sheet, edited customer descriptions, supplier-code to internal-SKU map, category/fitment/specification fields, pricing/stock exception report.
- Start with a 25-product pilot; no live database import before validation and owner approval.
- Once pilot rules are proven, process controlled batches with idempotent matching and batch rollback manifest.
- Never guess product identity, image link, cost, fitment or stock.

### Android agent — separate store workstream
Own other store tasks that do not overlap the ASC source-reset branch or pilot pipeline. Suitable separate work includes Android owner/admin interface, mobile workflow, read-only storefront checks, or checkout/payment/security QA.

Coordination rules:
1. The Android agent must read this handover and the current GitHub PR/branch status before writing to shared resources.
2. Avoid simultaneous changes to `main`, the same Supabase tables/functions/policies, product image storage, catalogue import functions, or deployment settings.
3. While the ASC agent is extracting/reviewing the test catalogue, Android work should not bulk-write `public.products`, `public.categories`, `gw_private.product_supplier_codes`, or product image storage.
4. Android changes should use their own branch/PR and identify touched files, Supabase objects and validation evidence.
5. If either agent needs a shared resource, coordinate through the owner and this handover before writing.
6. Record work as inspected, staged, committed, merged, deployed or verified-live; these statuses are not interchangeable.

The owner reports using the same Google email login on Windows and Android. Separate ChatGPT chats do not provide each other automatic visibility of their live task state. This handover/PR is the shared coordination record; each agent must re-read it before acting.

## 5. ASC test-catalogue pipeline

1. **Intake:** Preserve original PDF and create SHA-256, page-count and edition manifest.
2. **Extraction:** Capture code/SKU, product name, printed description, source category, page, dimensions, electrical details, fitment and printed price fields.
3. **Image editing:** Extract the exact illustrated product image/card; crop and standardise background/size without altering product identity or adding unverified features. Build a contact sheet.
4. **SKU mapping:** Keep supplier code verbatim and assign a unique ASC-prefixed internal code according to the approved internal SKU scheme. Preserve OEM/cross-reference tokens in separate fields.
5. **Description editing:** Correct grammar and presentation while retaining all source facts. Unsupported claims go to exceptions.
6. **Pricing:** Use verified dealer cost ex VAT and the established `cost_price × 1.15 × 1.35` VAT-inclusive formula. No RRP-as-cost assumptions.
7. **Availability:** Do not infer physical stock from catalogue listing. Record physical stock only from a verified stock source. Supplier orderability must be labelled separately.
8. **Pilot:** 25 products. Deliver staged spreadsheet, image ZIP/contact sheet, duplicate report and exceptions report.
9. **Approval/import:** Only after pilot passes. Use a secured, authenticated, idempotent importer with a batch log and rollback manifest. Do not use legacy unauthenticated import functions.
10. **Storefront verification:** Check actual customer-visible image/title/description/category/price/availability after each approved batch.

## 6. Same-day target and honest status

The GitHub reset and handoff should be completed today. Completion of the entire ASC catalogue depends on the test catalogue being supplied and on the source being readable and complete. Do not promise full catalogue completion before its size/quality is inspected. A successful first-day deliverable is a verified reset plus one completed 25-product pilot and an accurate time/batch estimate for remaining rows.

## 7. No false completion claims

At the point this handover was prepared:
- The live Supabase schema was inspected read-only.
- Current product count was 4,200; 11 `IASC-` products have 55 units recorded in `public.products`.
- The existing ASC supplier-specific `gw_private.product_supplier_codes` mapping count was zero; do not assume it is populated.
- The current product-image endpoint relies on GitHub WebP assets, so that cache is preserved.
- No Supabase row, stock value, live product image, production deployment or storefront code has been changed by this GitHub cleanup.
- Record actual branch commit, PR number, merge status, and verified residual-file scan when complete.
