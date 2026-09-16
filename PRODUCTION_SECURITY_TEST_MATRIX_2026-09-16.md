# GET WIRED AUTOWORX — PRODUCTION SECURITY & CUSTOMER TEST MATRIX

Updated: 16 September 2026

## Purpose
Final pre-production checklist for the existing Get Wired AutoWorx storefront. This document is a test control, not storefront code. No Netlify or Cloudflare credits are required for the non-credit checks below.

## Security gates
- [x] RLS enabled on protected customer/order/admin/import tables.
- [x] Internal import/verification tables intentionally have no ordinary client policies.
- [x] Anonymous checkout is limited to `create_store_order`.
- [x] Admin order RPCs require authenticated users and perform admin authorization checks.
- [x] Legacy admin RPC overloads removed.
- [x] Import/pricing SECURITY DEFINER RPCs no longer executable by `authenticated`.
- [x] Public catalogue reads remain available.
- [x] Publishable Supabase keys contain no service-role secret.
- [ ] Enable Supabase Auth leaked-password protection before production sign-off.
- [ ] Final security-advisor review after remaining DDL/integration changes.

## Customer-data protection
- [ ] Anonymous customer cannot read `customers`.
- [ ] Anonymous customer cannot read `orders`.
- [ ] Anonymous customer cannot read `order_items`.
- [ ] Anonymous customer cannot modify existing orders/customers.
- [ ] Non-admin customer cannot retrieve admin order data.
- [ ] Customer cannot invoke import/pricing functions.
- [ ] Checkout accepts only valid product IDs/quantities and database prices.
- [ ] Checkout does not expose payment credentials or card data.

## Storefront tests
- [ ] Homepage and locked design load correctly.
- [ ] Header/logo/navigation load.
- [ ] Categories load and filter correctly.
- [ ] Search works, including empty-search behavior.
- [ ] Featured/Specials load.
- [ ] Product details show correct SKU/reference, price and stock.
- [ ] Missing/broken image fallback does not break product cards.
- [ ] Add/increase/decrease/remove cart items.
- [ ] Cart persists during navigation and total recalculates.
- [ ] Empty cart cannot submit an order.

## Checkout tests
- [ ] Name and phone are required.
- [ ] Delivery address is required for delivery and not required for pickup.
- [ ] Fulfilment choice is persisted to the order.
- [ ] Current product prices are re-read from the database before submission.
- [ ] Current pre-PayFast payment enum is `manual_payment`.
- [ ] Submit button disables during submission.
- [ ] Successful order returns authoritative database total and order number.
- [ ] Cart clears only after successful order creation.
- [ ] Failed submission leaves cart available for retry.
- [ ] WhatsApp confirmation contains order number, items, total and fulfilment.

## Order/database tests
- [ ] One checkout creates exactly one order and expected order_items.
- [ ] Database price, not browser price, determines total.
- [ ] Invalid product IDs and quantities are rejected.
- [ ] Duplicate submission does not create unintended duplicate orders.
- [ ] Order starts `pending`; payment starts `pending`.
- [ ] Customer and delivery information is stored correctly.

## Admin tests
- [ ] Unauthenticated user cannot access protected order data.
- [ ] Authenticated non-admin cannot retrieve admin order data.
- [ ] Authorized admin can list orders.
- [ ] Authorized admin can update order/payment status.
- [ ] Payment reference and internal notes are retained.
- [ ] Admin can view customer/delivery details.

## PayFast final-phase tests
- [ ] Account verified and merchant credentials stored server-side only.
- [ ] Return/callback endpoints configured.
- [ ] Success callback validates amount/reference before marking paid.
- [ ] Failure/cancellation leaves order unpaid/pending.
- [ ] Duplicate callback is idempotent.
- [ ] Client-supplied payment amount is never trusted.
- [ ] Test transaction passes before production credentials are enabled.

## Delivery final-phase tests
- [ ] Pickup has no delivery charge.
- [ ] Provider selection is stored.
- [ ] Approved provider pricing is applied once.
- [ ] Final total equals product total + approved delivery charge.
- [ ] Full address data reaches order/admin record.
- [ ] Provider tracking/reference can be stored.
- [ ] Failed delivery creation cannot falsely mark delivery complete.

## Mobile/responsive tests
- [ ] 390px mobile header/navigation works.
- [ ] Search/category/product/cart/checkout work on mobile.
- [ ] Checkout fields fit the viewport.
- [ ] WhatsApp link works.
- [ ] No horizontal overflow.
- [ ] 1280px desktop layout remains intact.

## Live deployment gate — last
- [ ] Existing Netlify site and GitHub deployment source verified.
- [ ] Final approved commit deployed.
- [ ] Production HTTPS loads.
- [ ] No unintended redesign.
- [ ] `getwiredautoworx.co.za` DNS/HTTPS verified.
- [ ] Complete browse → search → category → product → cart → checkout → payment → order → admin → delivery journey passes.
- [ ] Failure/cancellation paths pass.
- [ ] Final database integrity checks pass.
- [ ] Final backup created and integrity verified.
- [ ] Final handover updated.

## Release blockers
Do not sign off production while any of these remain unresolved:
1. Auth leaked-password protection disabled.
2. Customer/order data readable or writable by unauthorized roles.
3. Admin RPC accessible without successful admin authorization.
4. Checkout trusts browser-submitted prices.
5. Payment callback can mark an order paid without transaction/reference/amount validation.
6. Delivery charge can be duplicated or incorrectly included.
7. Production storefront differs from the approved locked design.
8. Final backup cannot be verified.

## Credit control
Netlify/Cloudflare credit-consuming deployment, domain and live tests remain last. This matrix is designed so security and test preparation are completed before those credits are used.
