# Get Wired AutoWorx — September Source Reconciliation Checkpoint
Date: 2026-10-14 (South Africa)

## Verified by read-only Supabase queries

Project: `ojytykqpvonxvepprgbh`
Production catalogue was not modified.

- `buyers_guides_import_staging` contains **791 September Buyer’s Guide rows**, with 791 distinct normalized supplier SKUs.
- All 791 staging rows have a cost, advertised price, source page and source category.
- Exact join on normalized supplier SKU to `public.products.sku`: **791/791 exact matches**, all 791 matched products are active. This resolves the *SKU join* for the priced portion of the September staging set.
- The expected nine system-priced/asterisk rows are **not present** in the September staging table. Therefore the 800-record baseline is not yet reconciled.
- Staging formula check `round(cost_price * 1.15 * 1.35, 2)` versus `advertised_price`: **3 mismatches**.
- Comparison against live product names/prices: **3 name differences** and **9 live-price differences**. These are review exceptions, not automatic instructions to overwrite live data.
- Exact-SKU live-price differences (source page in parentheses):
  - EX908-18 — staging R21.73, live R21.74 (p.10)
  - F7-106-16 — staging R13.89, live R14.25 (p.9)
  - GH-581 — staging R21.73, live R21.74 (p.13)
  - GUT12 — staging R100.56, live R103.21 (p.21)
  - H15-LED-H — staging R624.71, live R641.15 (p.13)
  - HP16-L — staging R289.67, live R297.29 (p.5)
  - KT1035CB14 — staging R804.19, live R804.20 (p.8)
  - MA562BB — staging R93.99, live R96.47 (p.10)
  - RT-EM02 — staging R889.15, live R912.54 (p.21)
- Three name differences include SKU 360103 (staging name has a category-heading fragment prefixed to the product description), F1-053 (staging name has a leading fragment), and HCG44W-10 (staging and live names differ in formatting). Verify against the original September PDF card images before changing names/categories.
- Product image URLs returned by the live catalogue use the `product-image` Edge Function keyed by public GW SKU. That URL alone does **not** prove the resolved image depicts the correct product. Image-to-SKU visual verification remains outstanding.

## Resolution status

**Partially resolved: exact SKU mapping for 791 priced September staging rows is verified. Release remains HOLD.**

Do not import the current candidate extraction or overwrite live prices/categories/images based solely on these joins. The staging table has not yet proven the 800-record baseline, the nine quote/system-priced rows are missing, three formula exceptions need review, nine live price differences need source-page comparison, and image identity is not visually verified.

## Next efficient actions

1. Recheck the nine listed price exceptions against the exact PDF card region; determine whether the guide price or current live price is authoritative for each SKU. Do not overwrite live prices from the join alone.
2. Recheck the three formula exceptions against the original printed price glyphs and the agreed final-price rounding rule.
3. Locate the nine asterisk/system-priced entries in the PDF and classify them `QUOTE` (not zero-priced products), retaining source page and product code.
4. Generate a full 800-record staged ledger, deduplicate and assert: 800 unique SKUs; 791 fixed-price; 9 quote/system-priced; no SKU-price cross-card assignments.
5. Visually verify image identity against supplier code/product description. Keep uncertain images as the GW placeholder and status `REVIEW`; do not reuse nearby card images.
6. Run final exact-SKU join and category validation. Only after review/approval, perform one controlled synchronization.

## Changes / safeguards

- Read-only SQL only; no live products, prices, categories, image mappings, stock, orders, database schema, hosting, DNS or payment settings changed.
- No deployment or hosting credits used.
- PayFast and PayJustNow remain deferred as requested.
