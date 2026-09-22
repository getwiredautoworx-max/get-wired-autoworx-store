# Get Wired AutoWorx — Live Readiness

Updated: 2026-09-16 22:45 SAST

## Current verification
- GitHub `main` current HEAD after the latest handover/image-source audit update is `45e0641f5ab05049f925857cb5e4ace8e5968249`.
- The approved source storefront remains `index-new.html`; `index.html` routes through `store.html` so checkout remains reachable after adding a cart item.
- Latest storefront smoke run known to have succeeded: `35140654305`. Smoke coverage includes mobile entry, live category/specials rendering, product-detail open/close, add-to-cart, checkout navigation/form fields and desktop viewport switching.
- The smoke test is source/automated verification, **not public-site verification**.
- Current Supabase state: 4,187 active products; 4,187 unique active priced SKUs; 0 uncategorized; 4,187 active products with stock > 0; 27,745 total active units; 0 zero-stock active products.
- 791 active products have product-specific image URLs.
- 3,396 active products use the explicit branded placeholder `/assets/product-placeholder.svg` because no verified product-specific image was available.

## Buyers Guide image-source audit
- The uploaded September 2026 Buyers Guide was directly audited at page/image level.
- It contains 762 distinct product SKUs with identifiable product-image blocks.
- All 762 guide SKUs exist in the store; 753 are active and 9 inactive.
- None of the 762 guide SKUs currently uses the placeholder; the 753 active guide SKUs already have product-specific images.
- Therefore the uploaded September guide provides **0 safe image substitutions for the 3,396 placeholder products**.
- No photograph was mapped to a different SKU merely because it looked similar.
- The 3,396 unmatched products remain on the branded placeholder until another verified source containing those exact products/SKUs is available.

## Security hardening completed during this verification
- Removed public/anonymous execution from legacy admin RPC overloads and internal pricing/import SECURITY DEFINER RPCs.
- Re-granted authenticated execution to those functions so the authenticated admin/import workflow remains available.
- Re-checked function privileges: affected functions now show `anon_execute = false` and `authenticated_execute = true`.
- Supabase security advisor still reports four public import/staging tables with RLS disabled and several RLS-enabled internal tables with no policies. These have not been changed automatically because access requirements are not confirmed.
- Leaked-password protection remains a Supabase Auth configuration warning.

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

## Public deployment verification — DEFERRED
- Task 9 is deliberately **not being tested yet**, per user instruction.
- When the user is ready to browse/test, verify the actual public Cloudflare storefront end-to-end and record the public URL and results here.
- Do not claim live verification before that test occurs.
- Known Netlify production deploy `6aa98a8a679a4a0008e10b58` remains stale relative to current GitHub source and must not be refreshed because Netlify credits are prohibited.
- The temporary Cloudflare public hostname is not documented in repository/configuration search results available here.


## CONTINUATION AUDIT — 2026-09-22 19:02 SAST

### Buyers Guide re-check
- The two uploaded September guide PDFs are duplicates of the same 32-page guide; no additional distinct Buyers Guide was found in the available file library.
- The validated staging CSV contains 779 product rows.
- Current active catalogue matching confirms 545 of those 779 SKUs are present as active products.
- Only one guide CSV SKU currently has the branded placeholder: SKU **25482**. However, it is **not a safe image match**: the guide shows SKU 25482 as the M7-005B universal black rubber car mat, while the current store SKU 25482 is a Fiat 500/Doblo/Panda/Punto thermostat. The guide photograph must therefore NOT be assigned to the store product.
- The guide photograph was not assigned and no image mapping was changed in this audit.
- The remaining 3,396 placeholder products are not safely covered by the uploaded September guide; do not fill them by visual similarity or generic product type.

### Important stock-state discrepancy found
A fresh Supabase audit on 2026-09-22 19:02 SAST reports:
- **4,187 active products**
- **4,187 active products with stock_quantity > 0**
- **0 active products with stock_quantity = 0**
- **27,745 total active units**
- **4,153 active products have stock_quantity exactly 5**
- All 4,187 active products have updated_at on 2026-09-16.

This does **not** match the user's previously verified 2026-09-16 stock state of 44 stocked products / 7,077 units. The database column default is 0, so the mass value of 5 was written by an import/update operation rather than being the column default.

**Do not silently overwrite or guess stock quantities.** Existing verified stock must be preserved. The exact 44-SKU / 7,077-unit source must be recovered or re-verified before correcting the current stock state.

### Deployment/testing constraint remains unchanged
- Task 9 public Cloudflare browser testing remains deferred until the user is ready to browse/test.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- No live-site testing or deployment was performed during this continuation audit.

## Deployment constraint
- Repository/source readiness is verified.
- Netlify deployment is intentionally not triggered because Netlify credits must not be used.
- Cloudflare credits must not be used.
- Public deployment/browser verification is deferred until the user is ready to browse/test.

### Current stock-floor state
- The current stock state is intentional and follows the 16 Sep 2026 stock-floor task recorded in the project history.
- **4,187 active products**
- **4,153 active products at quantity 5**
- **34 active products above 5**, retaining explicitly verified ASC quantities
- **36 ASC-verified SKUs / 7,037 verified units** remain recorded in the verification ledger; 2 verified SKUs are inactive
- **27,745 total active units** after the stock-floor task
- Do not treat the quantity-5 floor as independently verified supplier stock; it is the store's requested stock-floor value for unverified active products.

### Current catalogue QA re-check — 22 Sep 2026
- Pricing mismatches: **0** against the agreed cost × 1.15 × 1.35 formula
- Uncategorized active products: **0**
- Active products with specific product images: **791**
- Active products using branded placeholder: **3,396**
- The image-cleanup workflow was previously verified successful: run **35137846265**, job **104934601924**, processed **800 images**, with no new image changes to commit.

### Deployment/testing constraint remains unchanged
- Task 9 public Cloudflare browser testing remains deferred until the user is ready to browse/test.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- No live-site testing or deployment was performed during this continuation audit.


## FINAL SOURCE REGRESSION — 22 Sep 2026

- Latest GitHub main HEAD: **b72e240e2655ed8feebaab6f16fcfb9e54175918**.
- Checkout payment/fulfilment edge case corrected: Cash on pickup is now pickup-only in both UI and server validation.
- Supabase verification: invalid R15 delivery + cash_on_pickup request rejected; **0 QA orders created**.
- No real customer order was created.
- No Cloudflare or Netlify credits used.

## PUBLIC VERIFICATION STATUS
The final public verification cannot yet be truthfully marked complete because the exact temporary Cloudflare public hostname is not documented in GitHub or the available prior project context. The known Netlify URL is a stale deployment and is not the current Cloudflare production target, so it must not be used as a substitute for live Cloudflare verification.
