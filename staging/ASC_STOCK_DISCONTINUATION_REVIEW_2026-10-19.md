# ASC status review — 2026-10-19

This is a staging-only review queue, not a production update. Companion CSV: `ASC_STOCK_DISCONTINUATION_REVIEW_2026-10-19.csv`.

## Read-only store baseline
- 4,187 active products out of 4,198 rows.
- 0 active products have zero store quantity, non-positive price, or blank image URL; 86 active rows use a placeholder URL.
- `public.supplier_stock` has 0 rows.
- `public.asc_stock_verification` has 36 rows, all `IN_STOCK`, all checked at 2026-09-16 16:34:49 UTC. All 36 supplier SKUs join to products; 34 matching products remain active. These records are stale and do not prove current availability.

## Exact-SKU candidates
- `F1-035`: ASC search result labels the Fiat electric fuel pump “WILL DISCONTINUE” and shows 15 in stock; store row is active with store quantity 5.
- `F9-001-56`: ASC result labels the Canter fan blade “DISCONTINUED NOT VIABLE” and shows 3 in stock; store row is active with quantity 5.
- `FC-011`: conflicting cached results — category page says “will discontinue” / 19 in stock, while the exact product page says in stock / 44. No action until reconciled.
- `H5-001-8`: ASC product result says out of stock; store row is active with quantity 5.
- `T3-8CS`: ASC result labels the spanner set “DISCONTINUED” and shows 113 in stock.
- `WG-007`: ASC result says “SUPPLIER WILL DISCONTINUE CONFIRMED” and shows 111 in stock.

The evidence URLs and freshness caveats are in the CSV. Search-result pages were cached, with crawl-age labels of roughly one to five months; direct refresh attempts failed with cache misses/timeouts. Treat these as review candidates only, not current supplier stock. Recheck exact supplier SKU and source page live before changing customer availability or active status. Unknown, ambiguous, or network-failure results must stay `REVIEW`. No Supabase data was changed.
