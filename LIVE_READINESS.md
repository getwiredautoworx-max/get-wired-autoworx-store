# Get Wired AutoWorx — Live Readiness

## Current verification
- 791 active catalogue products verified in Supabase.
- 791 priced active products verified; 0 active products without price.
- 12 active featured/special products verified.
- Pricing audit: 0 mismatches against the stored catalogue pricing validation.
- Seven intended active top-level categories verified.
- Legacy duplicate top-level categories remain inactive.
- Product image fallback uses exact SKU matching rather than loose product-name matching.
- Checkout uses the server-side `create_store_order` RPC.
- Existing Netlify build command remains unchanged.

## Publishing blocker
The current Netlify account has exhausted its available production deploy credits. No storefront redesign or replacement site is required. Once credits are available, deploy the current `main` branch and perform final live smoke testing.

## Final smoke-test checklist after deployment
1. Homepage loads and shows Specials/Featured products only.
2. All Products loads the catalogue.
3. Category -> subcategory navigation returns products.
4. Search returns relevant products.
5. Product detail pages show correct SKU, price and image where available.
6. Cart totals match catalogue prices.
7. Checkout creates an order through the server-side RPC.
8. WhatsApp order handoff opens correctly.
9. Mobile navigation/layout works.
10. Admin login/order management works for the authorised owner account.
