# Checkout / Payment / Delivery Workflow

Updated: 2026-09-16

## Customer checkout
- `store.html` wraps the approved `index-new.html` storefront and exposes a checkout button whenever the browser cart contains items.
- `checkout.html` verifies the current active products and prices from Supabase before order submission.
- Customer details: name, phone, email, fulfilment, address, province, postal code and notes.
- Fulfilment: nationwide delivery or pickup.
- Delivery provider wording: Courier Guy or PEP PAXI.
- Payment methods supported by the live order workflow: EFT / bank payment, manual payment arrangement, and cash on pickup.
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

## Payment integration boundary
- No third-party payment gateway credentials are stored in the repository or exposed to customers.
- The current production-safe payment workflow is EFT/manual payment/cash-on-pickup with admin payment-status confirmation.
- A future gateway can be added server-side without exposing merchant secrets in the storefront.

## Delivery integration boundary
- Customer checkout records delivery versus pickup and delivery address information.
- Delivery fee is currently confirmed by the store rather than invented by the storefront.
- Courier Guy / PEP PAXI are the stated delivery channels.
