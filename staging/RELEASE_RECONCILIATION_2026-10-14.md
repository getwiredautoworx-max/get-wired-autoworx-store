# Get Wired AutoWorx — September Source Reconciliation Checkpoint
Date: 2026-10-14 (South Africa)

## Verified by read-only Supabase queries

Project: `ojytykqpvonxvepprgbh`
Production catalogue was not modified.

- `buyers_guides_import_staging` contains **791 September Buyer’s Guide rows**, with 791 distinct normalized supplier SKUs.
- All 791 staging rows have a cost, advertised price, source page and source category.
- Exact join on normalized supplier SKU to `public.products.sku`: **791/791 exact matches**, all 791 matched products are active. This resolves the *SKU join* for the priced portion of the September staging set.
- The expected nine system-priced/asterisk rows are **not present** in the September staging table. Therefore 791 + 9 = 800 source baseline is not yet reconciled.
- Staging formula check `round(cost_price * 1.15 * 1.35, 2)` versus `advertised_price`: **3 mismatches**.
- Comparison against live product names/prices: **3 name differences** and **9 live-price differences**. These are review exceptions, not automatic instructions to overwrite live data.
- The 9 live-price differences found by exact supplier SKU are:
  - F7-106-16 — staged R13.89, live R14.25
  - GUT12 — staged R100.56, live R103.21
  - H15-LED-H — staged R624.71, live R641.15
  - HP16-L — staged R289.67, live R297.29
  - MA562BB — staged R93.99, live R96.47
  - Remaining differences must be enumerated from the same query output before any action; do not treat this partial display as the complete list.
- Three name differences include SKU 360103 (staging name has a category-heading fragment prefixed to the product description), F1-053 (staging name has a leading fragment), and HCG44W-10 (staging and live names differ in formatting). Verify against the original September PDF card images before changing names/categories.
- Product image URLs returned by the live catalogue use the `product-image` Edge Function keyed by public GW SKU. That URL alone does **not** prove the resolved image depicts the correct product. Image-to-SKU visual verification remains outstanding.

## Resolution status

**Partially resolved: exact SKU mapping for 791 priced September staging rows is verified. Release remains HOLD.**

Do not import the current candidate extraction or overwrite live prices/categories/images based solely on these joins. The staging table has not yet proven the 800-row baseline, the nine quote/system-priced rows are missing, three formula exceptions need review, nine live price differences need source-page comparison, and image identity is not visually verified.

## Next efficient actions

1. Retrieve the complete exception list with exact supplier SKU, staging cost/price, formula result, live price, category, image URL and source page.
2. Recheck each exception against the exact PDF card region; fix the staged file only, preserving source-page evidence.
3. Locate the nine asterisk/system-priced entries in the PDF and classify them `QUOTE` (not zero-priced products), retaining source page and product code.
4. Generate a full 800-record staged ledger, deduplicate and assert: 800 unique SKUs; 791 fixed-price; 9 quote/system-priced; no SKU-price cross-card assignments.
5. Visually verify image identity against supplier code/product description. Keep uncertain images as the GW placeholder and status `REVIEW`; do not reuse nearby card images.
6. Run final exact-SKU join and category validation. Only after review/approval, perform one controlled synchronization.

## Changes / safeguards

- Read-only SQL only; no live products, prices, categories, image mappings, stock, orders, database schema, hosting, DNS or payment settings changed.
- No deployment or hosting credits used.
- PayFast and PayJustNow remain deferred as requested.
