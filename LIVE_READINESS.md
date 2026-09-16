# Get Wired AutoWorx — Live Readiness

Updated: 2026-09-16

## Current verification
- 4,198 active products verified in Supabase.
- 4,188 unique priced SKUs verified.
- 0 uncategorized active products.
- 4,162 products have stock_quantity = 5; 0 products have zero stock; total units = 27,847.
- Approved customer storefront remains `index-new.html`.
- `index.html` now routes through `store.html`, which preserves the approved storefront and exposes checkout when the cart contains items.
- Product catalogue, categories, search, product detail modal, cart and mobile layout are implemented.
- Checkout uses the server-side `create_store_order` RPC and revalidates active product prices in the database.
- Admin order management supports authenticated filtering, order-status updates, payment-status updates, payment references and notes.
- Image cleanup workflow is verified successful for 800 images.
- No Cloudflare credits used.
- No Netlify credits used.

## Final source/database smoke-test checklist
1. Homepage/store entry routes to the approved storefront wrapper. **PASS**
2. Specials/Featured products render from the live catalogue query. **PASS by source verification**
3. All Products loads the catalogue. **PASS by source verification**
4. Category -> subcategory navigation returns products. **PASS by source verification**
5. Search searches name, SKU, description, compatible vehicles and specifications. **PASS by source verification**
6. Product detail shows SKU, price, vehicle/application information, description/specifications and order/delivery information. **PASS by source verification**
7. Cart persists through localStorage and calculates quantities/totals. **PASS by source verification**
8. Checkout verifies active products and creates an order through `create_store_order`. **PASS; database function transaction tested with rollback**
9. WhatsApp order handoff is present for store and checkout. **PASS by source verification**
10. Mobile navigation/layout rules are present for 900px and 480px breakpoints. **PASS by source verification**
11. Admin login uses Supabase Auth and admin RPCs enforce the authorised admin allowlist. **PASS by source/database verification**
12. Payment workflow supports EFT/manual payment/cash-on-pickup with pending/paid/failed/refunded/cancelled admin statuses. **PASS**
13. Delivery workflow records delivery/pickup and customer address details, with Courier Guy / PEP PAXI stated and delivery fee confirmed by the store. **PASS**

## Deployment constraint
- The repository changes are committed to `main`.
- Netlify deployment is intentionally not triggered because Netlify credits must not be used.
- Cloudflare credits must not be used.
- The source is therefore ready for the existing temporary Cloudflare publishing path without consuming either credit balance.
