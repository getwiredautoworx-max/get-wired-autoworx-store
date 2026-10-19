# ASC exact-SKU status refresh — 2026-10-19

**Result:** 6/6 supplier SKUs were found by exact SKU in the public ASC WooCommerce Store API. Product pages were fetched and parsed. This refresh supersedes the cached-search observations in the earlier review CSV. No Supabase or storefront product rows were changed.

| Supplier SKU | Current ASC page result | Qty shown | Staging recommendation |
|---|---|---:|---|
| F1-035 | **WILL DISCONTINUE**, currently in stock | 14 | Keep sellable while supplier stock remains; flag/block replenishment |
| F9-001-56 | **DISCONTINUED NOT VIABLE**, out of stock | — | Hide/deactivate candidate, but first confirm Get Wired has no physical stock; store qty 5 is unverified/default |
| FC-011 | Exact match is the **WILL DISCONTINUE** listing, currently in stock | 18 | Prior cached conflict resolved by exact-SKU refresh; keep sellable while stock remains, flag/block replenishment |
| H5-001-8 | In stock; earlier cached out-of-stock result was stale | 83 | Keep active; do not mark out of stock |
| T3-8CS | **DISCONTINUED**, currently in stock | 96 | Keep sellable while supplier stock remains; flag/block replenishment |
| WG-007 | **SUPPLIER WILL DISCONTINUE CONFIRMED**, out of stock | — | Hide/deactivate candidate, but first confirm Get Wired has no physical stock; store qty 5 is unverified/default |

## Source evidence
- F1-035 — https://accessoriesspares.co.za/product/fuel-pump-elect-fiat-will-discontinue/ — checked 2026-10-19 18:55:52 UTC
- F9-001-56 — https://accessoriesspares.co.za/product/fan-blade-mitsu-canter-3-5r-97-410mm/ — checked 2026-10-19 18:55:57 UTC
- FC-011 — https://accessoriesspares.co.za/product/lock-up-fuel-cap-alfa-bmw-merc-1418-22-will-discontinue/ — checked 2026-10-19 18:56:03 UTC
- H5-001-8 — https://accessoriesspares.co.za/product/cotton-braided-fuel-hose-8mm15m-roll-wl10-15bar-b-p30-40bar/ — checked 2026-10-19 18:56:08 UTC
- T3-8CS — https://accessoriesspares.co.za/product/spanner-set-8pc-carbon-steel-blister/ — checked 2026-10-19 18:56:14 UTC
- WG-007 — https://accessoriesspares.co.za/product/wiper-grommets-universal-supplier-will-discontinue-confirmed/ — checked 2026-10-19 18:56:19 UTC

The run used exact supplier-SKU API matches and page text. The full machine-readable evidence is available as the GitHub Actions artifact from [run 39306382481](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39306382481). The refreshed per-SKU decision/source evidence is emitted to the artifact CSV and JSON.

## Safe cleanup rule
- Discontinued + currently in stock: keep available while supplier stock remains, but do not replenish without confirmation.
- Explicitly discontinued + out of stock: stage as hide/deactivate candidate only after owner confirms there is no physical stock held by Get Wired.
- Current in-stock source evidence overrides older cached out-of-stock search snippets.
- Store stock quantity 5 is unverified/default inventory and must not be treated as proof of physical stock or supplier stock.
- All recommendations are staging-only; `production_write=NONE`.
