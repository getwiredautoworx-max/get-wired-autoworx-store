# GET WIRED AUTOWORX ONLINE STORE — HANDOVER / CONTINUE FROM HERE

## STATUS
Updated: 2026-09-19
Repository: `getwiredautoworx-max/get-wired-autoworx-store`
Default branch: `main`
Supabase project: `ojytykqpvonxvepprgbh`

The existing storefront remains the foundation. No rebuild of the preferred storefront design was performed.

Current deployment platform: **Cloudflare**. Cloudflare credits are reserved and have not been used during this QA continuation. GitHub `main` remains the source of truth. Netlify is legacy/reference only for this project.

## THE 8 PERMANENT RULES

1. Preserve existing store as foundation; do not rebuild unnecessarily or overwrite working components.
2. Execute efficiently in one flow; complete all available tasks instead of stopping after every individual step.
3. Only interrupt when genuinely necessary; notify user when input/approval/credentials/permissions are actually required.
4. The 8 rules are permanent; read at start of every continuation session and carry into every new handover.
5. All 8 rules must be copied unchanged into every new handover; may not be omitted/edited/removed without permission. If rules themselves edited/removed, reproduce all 8 first.
6. Do not use Cloudflare or Netlify credits until final testing; reserve credit-dependent work for end-stage testing/deployment.
7. Update master handover after every successfully completed task so next session continues from exact current state.
8. Maintain project continuity and authority; existing work, decisions, data, structure and approved requirements remain in force unless user explicitly authorizes change; do not assume changes that could interfere with online store.

## CURRENT VERIFIED DATABASE STATE — 2026-09-19

Direct Supabase verification shows:
- 4,187 active products.
- 4,187 active priced products.
- 4,187 unique active SKUs.
- 4,187 active products with stock quantity > 0.
- 4,187 active products with an `image_url` value.
- 3,396 of those image URLs are the deliberate branded `/assets/product-placeholder.svg` fallback.
- 791 active products therefore have product-specific image URLs.
- All 4,187 active product prices currently match the approved `cost_price × 1.15 × 1.35` calculation when rounded to 2 decimals.

Do not interpret the placeholder count as verified product imagery. A placeholder is not a product photograph.

## STOREFRONT DESIGN / ROUTING

- `index.html` continues to route to `store.html`.
- `store.html` continues to load `index-new.html` as the customer storefront.
- Existing dark blue/red automotive storefront, GW logo, category system, product grid, search, cart and product-detail flow remain intact.
- No unnecessary redesign/rebuild is authorised.

## CATALOGUE / IMAGE RULES

- The customer-facing PDF catalogue is separate from the live storefront work.
- Catalogue has no stock quantity/stock number.
- Catalogue must show customer-facing product information only: product image, product name/description, GW SKU, verified vehicle/application where available, final advertised selling price and GW branding/watermark.
- Never show supplier cost, original supplier price, internal stock number or unverified application.
- For store product images, only exact SKU-verified images may replace the branded placeholder. Never substitute a visually similar product.
- Existing `clean-product-images.yml` remains preserved for the supplied image package and creates consistent 1200x1200 ecommerce images.
- `assets/product-image-fallback.js` uses a verified SKU-named local asset only when present and fails closed when absent.
- Do not claim the image project is complete while 3,396 active products still use placeholders.

## PRICING / CHECKOUT

- Approved customer price formula remains cost excluding VAT × 1.15 VAT × 1.35 markup.
- Customer delivery is **R15.00 per delivery address/order**, not per item.
- Phoenix Plaza is internal dispatch reference only and must not be presented as a customer collection location.
- `checkout-v2.html` is the active checkout route.
- Payment methods remain EFT/manual payment/cash-on-pickup with payment pending until Get Wired AutoWorx confirms payment.

### 2026-09-19 SERVER-SIDE DELIVERY FIX — COMPLETED

The Supabase `create_store_order` function was updated through migration `enforce_fixed_r15_delivery`.
- Delivery fee is now server-enforced at **R15.00** regardless of any client-supplied delivery-fee value.
- The order total is calculated from the verified product prices plus the fixed R15 fee.
- Function definition was re-read after migration and confirmed to contain `v_fee numeric := 15.00` and write that fee to the order.

This prevents a modified client from bypassing or changing the required R15 delivery charge.

## SECURITY / PERFORMANCE QA

- Supabase security advisor currently reports RLS-enabled internal tables without policies and several SECURITY DEFINER functions. These findings should not be changed blindly because the access model for the import/admin/order workflow must be preserved.
- `create_store_order` intentionally remains SECURITY DEFINER because public checkout must create orders while the exposed data tables have restrictive RLS. Its function body validates customer/cart/payment inputs and now server-enforces R15 delivery.
- Supabase performance advisor reports unused/duplicate indexes. Do not remove them without query-plan testing; duplicate indexes are not a storefront blocker.
- Leaked-password protection remains a Supabase Auth configuration warning and should be enabled before final production hardening.

## DEPLOYMENT CONSTRAINT

- Repository/source readiness is verified.
- Netlify deployment must not be triggered because Netlify credits are reserved/not to be used.
- Cloudflare deployment/testing must not be triggered until final live testing is authorised and the existing Cloudflare project/URL is accessible.
- The public site has not been independently browser-verified from this environment; do not claim it has.

## CURRENT NEXT WORK

1. Continue exact SKU-based image coverage using the supplied buyers guides and approved image sources. Target the remaining 3,396 placeholder products; never guess an image.
2. Verify category/subcategory/product navigation against the 4,187 active products.
3. Verify specials/featured products remain homepage-only as required and do not contaminate category pages.
4. Re-run source-level checkout QA after the R15 server-side fix.
5. Perform final live Cloudflare Android/desktop testing only when the existing live URL/project is available and deployment testing is authorised.
6. Complete PayFast/payment automation only after storefront approval.
7. Complete supplier-order/courier automation only after payment flow approval.

## IMPORTANT PRESERVATION NOTES

- Do not use the old 1,109-row CSV.
- Do not automatically reassign the protected manual-review products.
- Do not replace the preferred storefront with a different template merely to solve one issue.
- Do not expose Phoenix Plaza as a customer collection address.
- Do not charge R15 per item.
- Do not use Netlify/Cloudflare credit-dependent work before final testing.
- Do not introduce third-party data sharing without explicit owner approval.
