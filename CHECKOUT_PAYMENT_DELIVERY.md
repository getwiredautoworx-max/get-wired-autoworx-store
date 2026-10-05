# Checkout / Payment / Delivery Workflow

Updated: 2026-09-16

## Customer checkout
- `store.html` wraps the approved `index-new.html` storefront and exposes a checkout button whenever the browser cart contains items.
- `checkout.html` verifies the current active products and prices from Supabase before order submission.
- The injected storefront checkout enhancement in `assets/store-enhancements.js` now uses the validated `manual_payment` RPC value; this matches `public.create_store_order` and removes the previously detected `manual_confirmation` mismatch.
- Customer details: name, phone, email, fulfilment, address, province, postal code and notes.
- Fulfilment: door delivery/courier, locker/pickup point, or pickup from Get Wired AutoWorx in the current `checkout-v2.html` flow.
- Customer-facing checkout policy: packaging is R35.00 per item. There is no standard nationwide fixed delivery charge. Delivery is quoted separately where applicable; pickup has R0.00 delivery charge.
- Delivery provider wording: Courier Guy or PEP PAXI.
- Payment methods supported by the current order workflow: EFT / bank payment, manual payment arrangement, and cash on pickup.
- Card details are never collected by the storefront.

## Order creation
- Checkout calls the protected database transaction function `public.create_store_order` through the Supabase Data API.
- Product IDs and quantities are submitted; the database re-reads the active product rows and uses the database price rather than trusting browser prices.
- Orders and order items are created atomically inside the database function.
- Order numbers use the existing identity column on `public.orders`.
- Payment status starts as `pending`; order status starts as `pending`.

## Admin workflow
- `admin.html` / `assets/admin.js` provide authenticated owner/admin access.
- Admin can filter orders, view customer/order/payment information, update order status, update payment status, record payment references and internal notes, and contact the customer through WhatsApp.
- Admin RPC access is restricted to authenticated admin users; anonymous execution of admin listing/update RPCs is revoked.
- Legacy overloaded admin RPC definitions were removed after confirming the storefront uses the current validated signatures. Only the current admin-list and admin-update signatures remain.

## Payment integration boundary
- No third-party payment gateway credentials are stored in the repository or exposed to customers.
- The current production-safe payment workflow is EFT/manual payment/cash-on-pickup with admin payment-status confirmation.
- PayFast is not yet connected; PayFast verification, secure credential configuration, callbacks/return handling, duplicate-order protection and end-to-end payment testing remain final-phase work.
- A future gateway can be added server-side without exposing merchant secrets in the storefront.

## Delivery integration boundary
- Customer checkout records delivery versus pickup and delivery address information.
- Delivery fee is currently confirmed by the store rather than invented by the storefront.
- Current checkout submits the selected courier delivery quote separately. Packaging is calculated server-side at R35.00 per item/quantity. Pickup has R0.00 delivery charge.
- The authoritative `public.create_store_order` function no longer enforces the old R15 rule. It accepts a verified non-negative courier delivery fee (or R0 for pickup) and calculates packaging server-side at R35.00 per item.
- Courier Guy / PEP PAXI are the stated delivery channels.
- Automated delivery pricing, provider integration, tracking/reference handling and order-to-delivery linkage remain final-phase work.

## Non-credit QA — 16 Sep 2026
- Reviewed `index.html`, `store.html`, `index-new.html`, `checkout.html`, `admin.html`, `assets/admin.js`, `assets/store-enhancements.js` and `netlify.toml` through the GitHub repository without deploying or consuming Netlify/Cloudflare credits.
- `index.html` redirects into the existing `store.html` wrapper; no new Netlify site or replacement storefront was introduced.
- `store.html` embeds `index-new.html` and exposes the cart checkout action.
- `checkout.html` re-reads active product records before order creation and calls `create_store_order`; browser-submitted product prices are not used as the authoritative price.
- The enhanced storefront checkout had a payment enum mismatch (`manual_confirmation` versus the database's accepted `manual_payment`); this was corrected and committed as `e1609510e217ab4b7c20dd152d30e43be2374429`.
- Current live checkout does not contain PayFast integration; this remains intentionally deferred to final testing.
- Current delivery fee is deliberately not calculated by the storefront and is documented as a pre-integration state.
- No source-code redesign was performed.

## Final testing dependencies
1. PayFast account verification and secure server-side integration.
2. Delivery-provider configuration and verified delivery pricing.
3. Complete live checkout/payment/delivery testing.
4. Final deployment only after the above are approved.


## COMMERCIAL FEE UPDATE — 4 OCTOBER 2026
- [x] Removed the old nationwide R15 delivery-charge enforcement from `public.create_store_order`.
- [x] Added `orders.packaging_fee`.
- [x] Server calculates packaging at **R35.00 × total item quantity**; browser-supplied packaging is not trusted.
- [x] Checkout displays packaging separately from courier delivery.
- [x] Delivery remains a separate courier quote where applicable; pickup has no delivery charge.
- [x] `checkout.html` and `checkout-v2.html` updated to remove R15 wording and show R35-per-item packaging.
