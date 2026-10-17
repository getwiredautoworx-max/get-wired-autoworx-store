# ASC discontinued / out-of-stock cross-reference — 2026-10-17

## Scope and safety

- Repository: https://github.com/getwiredautoworx-max/get-wired-autoworx-store
- Live supplier catalogue: https://accessoriesspares.co.za/
- Store database: Supabase project `ojytykqpvonxvepprgbh`.
- This is a review-only audit. No production rows were changed.
- Current DB read-only checks found 4,187 active products; zero active products have `stock_quantity <= 0`; zero active products have “WILL DISCONTINUE” / “DISCONTINUED” markers in their store-side name or description.
- The ASC public catalogue contains explicit discontinued/discontinuing labels even on products that still show positive stock. Those are flagged because supplier stock remaining does not mean the line will continue to be replenished.
- The supplier-stock sync table currently has 0 rows and the supplier catalogue staging table has 0 rows. The 36 existing `asc_stock_verification` records were last checked on 2026-09-16, so they are not a complete current feed.
- Therefore the evidence below is a targeted, exact supplier-SKU cross-reference from current public indexed ASC pages, not a full crawl of all 12,000+ ASC products. Recheck each ASC page immediately before applying the patch. Out-of-stock-only items should ideally be confirmed on the live page at apply time because availability can change.

## Exact matches found in the store database

| ASC supplier SKU | Store product name | Public SKU | ASC evidence | ASC stock shown | Store state |
|---|---|---|---|---:|---|
| AES-1115-16B | 65mm Metal Adjustable Door Switch | GW-7CABCBE7 | DISCONTINUED BY MAKER | 52 | active |
| F1-035 | 12V Electric Fuel Fiat Pressure:3 Bar | GW-D655BEE8 | WILL DISCONTINUE | 15 | active |
| F9-001-56 | 410mm Fan Blade Canter 3.5R 97- | GW-A16BA2A4 | DISCONTINUED NOT VIABLE | 3 | active |
| T3-8CS | Tube Plug 8pce Spanner Set Steel | GW-CDF8245E | DISCONTINUED | 113 | active |
| WG-007 | Wiper Grommets Universal | GW-B7FA9084 | SUPPLIER WILL DISCONTINUE CONFIRMED | 111 | active |

All five exact supplier SKUs matched one active product in the store database. ASC pages show positive stock for these lines, but each product is explicitly marked discontinued/discontinuing. The proposed action is to set `public.products.active = false`, not delete the rows and not overwrite the store stock quantity.

## Public ASC evidence

- AES-1115-16B — https://accessoriesspares.co.za/product-category/automotive/page/69/
- F1-035 — https://accessoriesspares.co.za/shop/page/172/
- F9-001-56 — https://accessoriesspares.co.za/product-category/automotive/electrical/fan-blades/page/3/?per_page=18
- T3-8CS — https://accessoriesspares.co.za/shop/page/400/
- WG-007 — https://accessoriesspares.co.za/product-category/automotive/page/259/?layout=grid&per_page=24

## Deliverables

- `supabase/review/asc-discontinued-cleanup-2026-10-17.sql` — exact-SKU SQL patch with preview-only default; requires explicit `-v APPLY_CLEANUP=true` to apply.
- `scripts/asc_cleanup_from_export.py` — reusable standard-library CSV-to-review/SQL generator for future ASC stock exports.
- The SQL patch is not applied to Supabase. Do not merge/run until the owner reviews the preview and confirms the latest supplier status.

## Important caveats

- “Out of stock” may be temporary; this patch is focused on explicit discontinuation labels. Use the generator to review zero/out-of-stock statuses from a fresh supplier export before deciding whether to deactivate.
- Never delete product rows: order/quote/vehicle records may reference them. Soft deactivation preserves historical references.
- Never infer a supplier SKU from product-name similarity. Exact supplier SKU match is required.


## Superseding reconciliation note — 2026-10-17

The status table above records the earlier public indexed-page snapshot and must not be treated as current verified supplier orderability. A later owner-submitted audit reports conflicting classifications for several candidates. Until every listing is rechecked by exact SKU on the current ASC portal:

- **AES-1115-16B:** potential confirmed-discontinued candidate, but the current orderability/stock evidence must be refreshed before deactivation.
- **F1-035:** `WILL DISCONTINUE` means inventory/replenishment hold pending supplier confirmation, not immediate unpublishing.
- **F9-001-56:** conflict between a temporary-stockout report and the earlier discontinued/not-viable snapshot; manual review only.
- **T3-8CS:** conflict between an active/backorder report and the earlier discontinued snapshot; manual review only.
- **WG-007:** owner-submitted report says the listing returns HTTP 404, while the earlier snapshot reported a discontinuation note. HTTP 404 alone does not establish status; obtain written supplier confirmation.

The SQL patch was hardened so every candidate has `freshly_verified=false` and `owner_approved=false` by default. Even if `APPLY_CLEANUP=true` is supplied, only a row explicitly rechecked by exact SKU and approved by the owner can qualify, and only when the status is confirmed `DISCONTINUED`. `WILL_DISCONTINUE`, conflicts, stockouts and unknown/missing listings are excluded. Local stock is never overwritten. The SQL has not been executed.
