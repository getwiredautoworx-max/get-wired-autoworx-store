# Get Wired AutoWorx — Live Readiness

Updated: 2026-09-16

## Current verification
- GitHub `main` currently points to `c08a07a28a4955f3ec516dbd809925c93add200f` (`Replace handover with consolidated master continuation file`).
- The approved source storefront remains `index-new.html`; `index.html` routes through `store.html` so checkout remains reachable after adding a cart item.
- The latest storefront smoke run `35139606426` completed successfully; job `104941519746` reported `STOREFRONT_SMOKE_PASS` after testing mobile entry, live category/specials rendering, product detail open/close, add-to-cart, checkout navigation and checkout form fields, then switching to desktop viewport.
- The smoke test is a local/source test, not public-site verification.
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
- Re-checked function privileges: the affected functions now show `anon_execute = false` and `authenticated_execute = true`.
- Supabase security advisor still reports four public import/staging tables with RLS disabled and several RLS-enabled internal tables with no policies. These appear to be import/staging/internal infrastructure and have not been changed automatically because doing so without confirmed access requirements could break legitimate workflows.
- The advisor also reports SECURITY DEFINER functions executable by authenticated users; authenticated execution is intentionally retained for admin/import workflows and the functions themselves enforce their intended checks where applicable.
- Leaked-password protection remains a Supabase Auth configuration warning and has not been changed as part of this source/storefront continuation.

## Final source/database smoke-test checklist
1. Homepage/store entry routes to the approved storefront wrapper. **PASS**
2. Specials/Featured products render from the live catalogue query. **PASS — confirmed by automated smoke test**
3. All Products loads the catalogue. **PASS by source verification**
4. Category -> subcategory navigation returns products. **PASS by source verification**
5. Search searches name, SKU, description, compatible vehicles and specifications. **PASS by source verification**
6. Product detail shows SKU, price, vehicle/application information, description/specifications and order/delivery information. **PASS — confirmed by automated smoke test for modal open/close; content by source verification**
7. Cart persists through localStorage and calculates quantities/totals. **PASS — add-to-cart and checkout access confirmed by automated smoke test**
8. Checkout verifies active products and creates an order through `create_store_order`. **PASS; database function transaction tested with rollback**
9. WhatsApp order handoff is present for store and checkout. **PASS by source verification**
10. Mobile navigation/layout rules are present for 900px and 480px breakpoints. **PASS; mobile viewport included in automated smoke test**
11. Admin login uses Supabase Auth and admin RPCs enforce the authorised admin allowlist. **PASS by source/database verification; anonymous execution of legacy admin overloads additionally hardened in this verification**
12. Payment workflow supports EFT/manual payment/cash-on-pickup with pending/paid/failed/refunded/cancelled admin statuses. **PASS**
13. Delivery workflow records delivery/pickup and customer address details, with Courier Guy / PEP PAXI stated and delivery fee confirmed by the store. **PASS**

## Public deployment verification
- Known Netlify production deploy remains `6aa98a8a679a4a0008e10b58`, created 2026-09-15 and built from commit `37654d7c2e8e38dad80f9edf33413aa1be62d1a4`.
- Current GitHub `main` is newer than that deployment, so the known Netlify deployment is stale relative to source.
- A read-only fetch of the known Netlify URL could not be completed from the available web/runtime fetch paths during this verification. Therefore the store is **not marked live-verified**.
- The temporary Cloudflare public hostname is not documented in repository/configuration search results available here.
- No Netlify or Cloudflare deployment was triggered, because doing so would violate the standing no-credit constraint.

## Deployment constraint
- Repository changes remain committed to `main`.
- Netlify deployment is intentionally not triggered because Netlify credits must not be used.
- Cloudflare credits must not be used.
- Source and automated browser readiness are verified; public deployment/browser verification remains pending a credit-free accessible publishing path.
