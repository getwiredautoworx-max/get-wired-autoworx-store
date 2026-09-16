# GET WIRED AUTOWORX ONLINE STORE — HANDOVER / CONTINUE FROM HERE

## STATUS
Updated: 2026-09-17
Repository: `getwiredautoworx-max/get-wired-autoworx-store`
Default branch: `main`

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

## COMPLETED STOREFRONT CONTINUATION TASKS

### 1. Requirements locked
- Preferred existing storefront is preserved.
- Existing Supabase connection remains in use.
- Existing GitHub repository remains in use.
- Current deployment platform is Cloudflare.
- No new Netlify site was created.
- No unnecessary redesign/rebuild was performed.

### 2. Preferred storefront design preserved
- `index.html` continues to route to `store.html`.
- `store.html` continues to load `index-new.html` as the customer storefront.
- The current dark blue/red automotive storefront, logo, category system, product grid, search, cart and product detail flow remain intact.

### 3. Catalogue and pricing source verified
- Current validated source remains `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv`.
- The validated catalogue is approximately 800 unique SKUs: 791 fixed-price products plus 9 system-dependent/asterisk-priced products.
- Old 1,109-row CSV must not be used because it contained incorrect SKU/product/price pairings.
- Storefront prices are based on the approved supplier-cost pricing structure: cost excluding VAT × 1.15 VAT × 1.35 markup.
- Products with system-dependent/asterisk pricing remain price-on-request rather than inventing a fixed price.
- The 198-product manual category review worksheet remains protected from automatic reassignment.

### 4. Delivery requirement locked and implemented
- Customer delivery charge is **R15.00 per delivery address/order**, not per item.
- One item = R15 delivery.
- Five items in the same order/address = R15 delivery.
- Phoenix Plaza is **internal dispatch reference only** and is not presented as a customer collection location.
- Customer-facing checkout does not present Phoenix Plaza as a pickup point.
- A new `checkout-v2.html` implements the fixed R15 delivery charge and is now the active checkout route.
- The previous dynamic courier/locker checkout remains in `checkout.html` for preservation/reference but is no longer the active floating checkout route.

### 5. Storefront QA baseline verified
- Repository and current `main` branch were inspected directly.
- `index.html` -> `store.html` -> `index-new.html` routing is intact.
- Live Supabase product/category loading remains in `index-new.html`.
- Browser cart remains based on `gw_cart` localStorage.
- Product search, category filtering, product detail modal and add-to-cart flow remain present.
- No payment credentials are exposed; the current order flow keeps payment pending until store confirmation.

### 6. Missing-image fallback verified
- Product cards already use a deliberate fallback when `image_url` is blank: a non-breaking lightning placeholder is rendered instead of leaving an empty image area.
- Product detail view also has a fallback when `image_url` is blank.
- This protects the storefront while the catalogue image-loading project continues.
- Do not replace this fallback with guessed product images. Product imagery must remain accurate to the actual SKU.

### 7. Checkout/order flow advanced
- Active checkout now loads and verifies cart products from Supabase.
- It calculates subtotal plus one fixed R15 delivery charge.
- It collects customer name, phone, email, delivery address, city, province and postal code.
- It submits the order through the existing `create_store_order` RPC.
- Order payment status remains pending until Get Wired AutoWorx confirms payment.
- WhatsApp order confirmation remains available.
- No PayFast activation or payment processing was introduced prematurely.

### 8. Master handover updated
- This file is the current repository handover.
- Latest relevant commits:
  - `9d1d877104ba25f5dafa40e348779b0a7dcec74e` — corrected the automated storefront smoke test to use the active `checkout-v2.html` route and verify the fixed R15 delivery requirement.
  - `659556b2fed929d9f5d8ff4f2b5f3ca377ddf805` — added fixed-R15 checkout.
  - `a43623798727cd1af78863ccc13c4aa42ac75bdb` — routed the active checkout button to the fixed-R15 checkout.
- GitHub Actions smoke-test run `35157945337` completed successfully.
- Smoke test verified mobile storefront loading, category/product loading, product detail modal, add-to-cart, active checkout routing, customer fields, **R15.00 delivery**, and the explicit **not charged per item** delivery notice.
- No Cloudflare deployment or Cloudflare credits were used for this QA run.
- Previous known project commit before this continuation: `0fde2ad4ec15c4bb9816019ad76c2a9962481785`.

## CURRENT NEXT WORK — AFTER AUTOMATED QA

1. Test the live published Cloudflare storefront on phone and desktop without changing the approved design.
2. Confirm a one-item cart shows R15 delivery.
3. Confirm a multi-item cart still shows only R15 delivery for the same address.
4. Confirm Phoenix Plaza is not exposed as a customer pickup location.
5. Continue the catalogue image project toward accurate images for all validated products.
6. Verify supplier stock before products are treated as orderable stock.
7. Complete PayFast verification only after the storefront is approved by the owner.
8. Complete supplier-order and courier/PAXI automation after payment flow is approved.

## IMPORTANT PRESERVATION NOTES

- Do not use the old 1,109-row CSV.
- Do not automatically reassign the 198 manual-review products.
- Do not replace the preferred storefront with a different template merely to solve one issue.
- Do not expose Phoenix Plaza as a customer collection address.
- Do not charge R15 per item.
- Do not use Netlify/Cloudflare credit-dependent work before final testing.
- Do not introduce third-party data sharing without explicit owner approval.
