# June–September Exact-SKU Join Baseline — 2026-10-14

## Scope and files checked

- June source: `June Buyer's Guide (1).pdf`, 32 printed pages.
- June OCR staging: `June Buyers Guide — OCR Staging` sheet in `Get_Wired_AutoWorx_Buyers_Guides_Audit_June_August_2026.xlsx` (470 rows).
- September candidate source: `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv` (800 rows; 800 distinct SKU strings).

## Baseline exact-key join (before applying the new visual correction ledger)

- Exact case-insensitive SKU matches: **82 of 470** June OCR staging rows.
- No additional matches were found by punctuation-only normalization; this does not attempt fuzzy-description matching.
- **388 June staging rows remain unmatched** in this baseline. Applying the visual correction ledger may improve this count, so 82 is not the final reconciled match total.
- The June staging descriptions are placeholders and costs are blank. A key match alone does not verify the description, cost, fitment, image, category, or live eligibility.

## September staging pricing formula check

- September staging has 800 rows; 791 have both a numeric `cost_price` and `price`, while 9 do not.
- All 791 priced rows have `price` equal to approximately `cost_price × 1.15` (VAT only). **0 of 791** match the required final customer-price formula `cost_price × 1.15 × 1.35`.
- Example from the staging CSV: SKU `SFBP2-G1500-13A`, cost `R48,079.00`, staged price `R55,290.85` (VAT only); applying the documented formula gives `R74,642.65` before any other commercial review. This is an analysis example, not an approved price update.
- Therefore the September staging CSV is a source for candidate SKU/cost evidence only; do **not** import its `price` column as the customer-facing final price.

## Required next steps

1. Apply `catalogue-audits/JUNE_GUIDE_OCR_CORRECTIONS_2026-10-14.csv` to a separate staging copy and retain the original workbook unchanged.
2. Re-run the exact-SKU join after corrections; inspect the 388 unmatched candidates against the printed pages and current source guides.
3. For every accepted row, verify supplier SKU, description, source page, cost excl. VAT, and any fitment/category/image evidence. Keep promotions separate from normal cost prices.
4. Recalculate final customer prices with the documented formula and independently validate rounding.
5. Keep all work staging-only until explicit approval; no live database/catalogue or hosting writes are authorized by this audit.

## Status

**Partial audit only — not import-ready.** This baseline identifies a pricing-formula defect in the September staging file and a large unresolved exact-SKU join. It does not modify the live catalogue.
