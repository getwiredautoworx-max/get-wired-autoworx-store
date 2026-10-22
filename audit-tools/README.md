# ASC supplier-status reconciliation (review-only)

This tool prepares a review ledger to identify Accessories Spares Centre (ASC) items explicitly marked WILL DISCONTINUE, DISCONTINUED, OUT OF STOCK, or with an explicit supplier quantity of zero. It does not log in to ASC, scrape protected pages, connect to Supabase, or mutate live stock/products.

## Inputs

1. An authorised/current ASC product-stock CSV export (--supplier). Common supplier SKU, name, status, quantity, and product URL column names are accepted.
2. A read-only export of current store products (--inventory) with at least the supplier SKU column named sku; include public_sku, name, active, and stock_quantity for a useful report.

The source date is recorded for audit traceability and defaults to today's UTC date. Only use supplier data the owner is authorised to access.

## Run

    python audit-tools/asc_supplier_status_reconcile.py --self-test
    python audit-tools/asc_supplier_status_reconcile.py --supplier /path/to/asc-current-stock.csv --inventory /path/to/store-products-read-only.csv --checked-at 2026-10-20 --out reports/asc_supplier_status_reconciliation

The output is a CSV decision ledger plus a JSON summary.

## Decision rules

- Exact normalized supplier SKU match only. No fuzzy product-name matching.
- Duplicate supplier or store SKUs are blocked for manual resolution.
- Explicit discontinued / will-discontinue status becomes DEACTIVATE_CANDIDATE.
- Explicit out-of-stock status or quantity zero becomes SET_STOCK_ZERO_CANDIDATE; temporary stock-out is not treated as discontinuation.
- Unknown status, unmatched SKUs, missing data, and ambiguous matches are review-only.
- No proposed action is applied automatically. A human must verify current supplier evidence, order dependencies, schema fields, and business intent before creating a separate approved patch.

## Current limitation

No complete, current ASC stock/status feed was found in the available project context. Therefore no real SKU has been labelled discontinued or out of stock by this commit, and no live catalogue record has been changed.


## Automated live audit

The separate `asc_live_status_audit.py` uses the public ASC WooCommerce Store API and the storefront's public Supabase publishable key, which is constrained by RLS to active public products. It reads but never writes either system. The GitHub Actions workflow runs on the related pull-request changes and publishes a CSV + JSON report artifact for seven days. The crawl is paginated, rate-limited, and bounded to 250 pages. If the public endpoint denies or limits access, the job fails safely rather than attempting login or bypassing restrictions.


## Offline review queue and commented patch proposal

After downloading `asc_live_status_audit.csv` from a successful live-audit artifact, run:

    python audit-tools/enrich_asc_status_report.py --input reports/asc_live_status_audit.csv --out reports/asc_status_review_queue

This creates a review CSV, summary JSON and a SQL proposal with every UPDATE commented out. It adds name-similarity review flags but never approves a change. Candidates flagged for manual identity review are excluded from the SQL proposal. Even entries that pass the similarity screen require manual SKU/product and current supplier-status confirmation.

The full live ASC crawl is manually dispatched to avoid repeated supplier requests during ordinary PR commits. Pull requests run only the no-network self-tests; the live scan reads but never writes to either system.
