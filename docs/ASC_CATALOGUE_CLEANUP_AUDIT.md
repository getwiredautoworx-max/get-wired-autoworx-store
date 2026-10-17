# ASC catalogue cleanup audit — review-only workflow

## Purpose
Cross-reference an owner-exported store inventory CSV against a current Accessories Spares Centre (ASC) catalogue CSV and create a review patch for exact supplier-SKU matches whose supplier title/status indicates discontinuation or out-of-stock status.

## Run
```bash
python3 scripts/asc_catalogue_cleanup_audit.py --store store-products.csv --asc asc-catalogue.csv --output asc-cleanup-review.csv
python3 -m unittest scripts/test_asc_catalogue_cleanup_audit.py
``

Store export should include `supplier_sku` (preferred), `public_sku`, `name`, `active`, and `stock_quantity`. The script also accepts `sku` as a fallback, but only use that if it is the supplier's exact SKU, not the generated public SKU. ASC export should include `SKU` and a product `Name` or `Title`, and preferably `Stock status` and/or `Stock`.

## Action rules
- Exact SKU plus explicit discontinued / will-discontinue / not-viable text → `DEACTIVATE_AFTER_REVIEW`.
- Exact SKU plus out-of-stock/zero supplier quantity without explicit discontinued text → `REVIEW_TEMPORARY_STOCKOUT`; not auto-deactivated because supplier stockouts can be temporary.
- Duplicate ASC rows for one SKU → `MANUAL_REVIEW`.
- Fuzzy name matches and unmatched SKUs are excluded. Never infer an SKU match from a similar description.

## Safety boundary
This is a local CSV patch generator only. It has no Supabase client, credentials, network calls, or database write code. Review the generated CSV and verify each supplier listing before any approved database change. It does not delete product rows; approved actions should normally set `active=false` to preserve order/audit references.

## Current evidence / limitation
A read-only Supabase audit on 2026-10-17 found 4,187 active products, zero active products with `stock_quantity=0`, and zero active product names/descriptions/specifications containing the searched discontinued/out-of-stock/not-viable indicators. That does not prove supplier status is clean: ASC's public catalogue itself contains discontinued and out-of-stock examples. The current store export and current supplier catalogue export must be matched by supplier SKU to identify overlaps. Do not claim the cleanup has completed until the CSV audit output has been reviewed.


## Automated read-only path (added 2026-10-17)

The GitHub Actions workflow `ASC full catalogue read-only crawl` runs `scripts/crawl_asc_catalogue.py`. It checks ASC `robots.txt`, crawls the public shop pages with a minimum 0.8-second global request start interval, retries failed listing pages, and resolves missing SKUs only for products flagged discontinued/out-of-stock. It writes a full catalogue CSV, status-candidate CSV, and a completeness summary to a 7-day GitHub Actions artifact. A partial run must remain marked `complete=false` and is not a cleanup result.

The workflow `ASC to store read-only reconciliation` downloads a completed crawl artifact and runs `scripts/compare_asc_store_readonly.py`. That script reads the existing public Supabase URL/publishable key from `index-new.html`, requests only `sku`, `public_sku`, `name`, `active`, `stock_quantity`, and `price` from active `public.products` rows via REST GET, and exact-matches normalized supplier SKU. It does not request `cost_price`, export the full store inventory to an artifact, or write to Supabase. The output artifact contains only exact-SKU status candidates and a summary.

## Release gate

- Require crawl summary `complete=true`, `failed_pages=[]`, `detail_fetch_failures=[]`, and zero unresolved candidate SKUs before calling the supplier scan exhaustive.
- Run the reconciliation against the successful full-crawl artifact; check exact-SKU match counts and inspect `asc_store_review_patch.csv`.
- `DEACTIVATE_AFTER_REVIEW` is a proposal for explicit discontinued/not-viable labels; `REVIEW_TEMPORARY_STOCKOUT` is not proof of discontinuation. Verify supplier orderability when supplier stock counts conflict with status text.
- No automated deactivation/deletion is permitted by either script. A separate owner-approved patch is required for any production write.
