# Get Wired AutoWorx — Live Readiness

Updated: 2026-09-16 21:47 SAST

## Current verification
- GitHub `main` current HEAD after the latest handover update is `ea10e2f49a1e335a45efa91c18dfeaf7df65dbcf`.
- The approved source storefront remains `index-new.html`; `index.html` routes through `store.html` so checkout remains reachable after adding a cart item.
- Latest storefront smoke run `35140654305` completed successfully on the current source and workflow; earlier job `104941519746` reported `STOREFRONT_SMOKE_PASS`.
- Smoke coverage includes mobile entry, live category/specials rendering, product-detail open/close, add-to-cart, checkout navigation/form fields, and desktop viewport switching.
- The smoke test is source/automated verification, not public-site verification.
- 4,198 active products verified in Supabase.
- 4,188 unique priced SKUs verified.
- 0 uncategorized active products.
- 4,162 products have stock_quantity = 5; 0 products have zero stock; total units = 27,847.
- Product catalogue, categories, search, product detail modal, cart, mobile layout and checkout are implemented.
- Checkout uses the server-side `create_store_order` RPC and revalidates active product prices in the database.
- Admin order management supports authenticated filtering, order-status updates, payment-status updates, payment references and notes.
- Image cleanup workflows completed successfully; no new image changes were required.
- No Cloudflare credits used.
- No Netlify credits used.

## Security hardening completed during this verification
- Confirmed that older overloaded admin RPC signatures still had `anon` execution through the inherited `PUBLIC` grant.
- Removed public/anonymous execution from the legacy admin RPC overloads and from internal pricing/import SECURITY DEFINER RPCs.
- Re-granted authenticated execution to those functions so the authenticated admin/import workflow remains available.
- Re-checked function privileges: affected functions now show `anon_execute = false` and `authenticated_execute = true`.
- Supabase security advisor still reports four public import/staging tables with RLS disabled and several RLS-enabled internal tables with no policies. These appear to be import/staging/internal infrastructure and have not been changed automatically because doing so without confirmed access requirements could break legitimate workflows.
- Leaked-password protection remains a Supabase Auth configuration warning and has not been changed as part of this source/storefront continuation.

## Source/database smoke-test checklist
1. Homepage/store entry routes to approved storefront wrapper. **PASS**
2. Specials/Featured products render from live catalogue query. **PASS — automated smoke**
3. All Products loads catalogue. **PASS by source verification**
4. Category -> subcategory navigation returns products. **PASS by source verification**
5. Search covers name, SKU, description, compatible vehicles and specifications. **PASS by source verification**
6. Product detail shows SKU, price, application information, description/specifications and order/delivery information. **PASS — modal open/close automated; content source-verified**
7. Cart persists through localStorage and calculates quantities/totals. **PASS — automated add-to-cart/checkout access**
8. Checkout verifies active products and creates an order through `create_store_order`. **PASS; database transaction tested with rollback**
9. WhatsApp order handoff is present for store and checkout. **PASS by source verification**
10. Mobile navigation/layout rules are present for 900px and 480px breakpoints. **PASS — mobile viewport included in smoke test**
11. Admin login uses Supabase Auth and admin RPCs enforce authorised admin allowlist. **PASS by source/database verification**
12. Payment workflow supports EFT/manual payment/cash-on-pickup with pending/paid/failed/refunded/cancelled admin statuses. **PASS**
13. Delivery workflow records delivery/pickup and customer address details, with Courier Guy / PEP PAXI stated and delivery fee confirmed by the store. **PASS**

## Public deployment verification
- Netlify read-only inspection confirms production deploy `6aa98a8a679a4a0008e10b58` is ready but stale relative to current GitHub source. It was created 2026-09-15 from commit `37654d7c2e8e38dad80f9edf33413aa1be62d1a4`.
- Current source is newer than that deployment, so the existing Netlify site cannot be treated as the current source release.
- Public fetch of the known Netlify URL is not currently available through the accessible web/runtime path. Therefore the store is **not marked live-verified**.
- The temporary Cloudflare public hostname is not documented in repository/configuration search results available here.
- No Netlify or Cloudflare deployment was triggered because doing so would violate the standing no-credit constraint.

## Deployment constraint
- Repository/source readiness is verified.
- Netlify deployment is intentionally not triggered because Netlify credits must not be used.
- Cloudflare credits must not be used.
- Public deployment/browser verification remains pending a genuinely accessible credit-free publishing path.
