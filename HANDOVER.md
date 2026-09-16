# GET WIRED AUTOWORX ONLINE STORE — HANDOVER

Updated: 2026-09-16

## SOURCE OF TRUTH
- GitHub repository: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Netlify site: `get-wired-autoworx-store.netlify.app`
- Store is currently being run through Cloudflare temporarily.
- Do not redesign the approved storefront unless explicitly requested.
- **Do not use Cloudflare credits.**
- **Do not use Netlify credits.**

## FINAL BUILD STATUS — ALL 10 REMAINING TASKS COMPLETED
1. Customer storefront QA — completed.
2. Product-detail and image behaviour — completed/verified.
3. Search and category filtering — completed/verified.
4. Cart behaviour — completed/verified; checkout access added through `store.html`.
5. Mobile layout — completed/verified from current responsive CSS.
6. Customer checkout/order flow — completed with `checkout.html` and `public.create_store_order`.
7. Admin/order management — completed; authenticated admin dashboard now supports order/payment status updates, payment references and notes.
8. Payment/delivery workflow — completed for production-safe EFT/manual-payment/cash-on-pickup workflow and delivery/pickup capture. No gateway credentials are stored or exposed.
9. Final live-store readiness checks — completed at source/database level without consuming deployment credits. Netlify was not triggered; Cloudflare credits were not used.
10. Final handover update — completed in this file and `LIVE_READINESS.md`.

## CURRENT STOREFRONT STATE
- Approved customer-facing storefront remains `index-new.html`.
- `index.html` now routes through `store.html`.
- `store.html` preserves the approved storefront inside a same-origin wrapper and exposes a CHECKOUT button whenever the browser cart contains items.
- `checkout.html` is the customer checkout/order page.
- Storefront reads live Supabase catalogue data.
- Categories, product catalogue, search, cart, rating display and product-detail modal are implemented.
- Product detail includes SKU, price, vehicle/application information, product information/specifications, order/delivery information, Add to Cart and WhatsApp order handoff.
- Local product images under `assets/products/<SKU>.jpg` are committed and the existing storefront image handling remains intact.

## IMAGE CLEANUP — VERIFIED
- GitHub Actions image-cleanup run: `35137846265`.
- Job: `104934601924` (`clean-images`).
- Result: **SUCCESS**.
- Workflow successfully processed **800 images**.
- Final commit step reported `No image changes to commit`; the cleaned image set already matched the committed `assets/products` state, so no duplicate image commit was created.
- No Cloudflare or Netlify credits were used.
- Do not rerun image cleanup unless a specific image issue is identified.

## SUPABASE PRODUCT/STOCK STATUS — COMPLETED
Verified live `public.products` state:
- Total product records: **4,198**
- Products with stock_quantity = 5: **4,162**
- Products with stock_quantity = 0: **0**
- Total units currently in stock: **27,847**

The 4,154 products that were previously at zero stock were updated to `stock_quantity = 5`. Eight products were already at 5, producing the verified total of 4,162 products at stock 5. Existing stocked quantities were preserved.

## CHECKOUT / ORDER FLOW — COMPLETED
- `checkout.html` verifies current active products from Supabase before submission.
- Customer details captured: name, phone, email, fulfilment, address, province, postal code and notes.
- Fulfilment options: nationwide delivery or pickup.
- Delivery wording: Courier Guy or PEP PAXI.
- Payment methods: EFT / bank payment, manual payment arrangement, cash on pickup.
- Card details are not collected by the storefront.
- Checkout calls `public.create_store_order` through the Supabase Data API.
- The database function re-reads active product rows and uses database prices, so browser-supplied prices cannot set the order price.
- Order and order-item creation occurs inside the database function.
- Payment starts as `pending`; order starts as `pending`.
- Order numbers use the existing identity column on `public.orders`.
- The order function was repaired to match the actual `customers.name` schema.
- A transaction test successfully created and rolled back a QA order, leaving no test order behind.

## ADMIN / ORDER MANAGEMENT — COMPLETED
- `admin.html` provides authenticated staff login using Supabase Auth magic link.
- `assets/admin.js` loads orders through the authenticated admin RPC.
- Admin can filter by order/payment status.
- Admin can update order status, payment status, payment reference and internal notes.
- Admin can contact the customer through WhatsApp.
- Anonymous execution of admin listing/update RPCs is revoked.
- Verified privileges: anonymous can create store orders; anonymous cannot execute admin listing/update RPCs; authenticated users have execute privilege, while the RPC itself enforces the store-admin allowlist.

## PAYMENT / DELIVERY — COMPLETED
- Production-safe payment workflow is EFT/manual payment/cash-on-pickup with admin payment-status confirmation.
- No third-party gateway credentials are stored in GitHub or exposed in browser code.
- Delivery/pickup choice and address data are recorded with the order.
- Delivery fee is currently confirmed by the store rather than invented by the storefront.
- Courier Guy / PEP PAXI are the stated delivery channels.
- A future payment gateway can be added server-side without exposing merchant secrets.

## CATALOGUE
- Source: September Buyer's Guide PDF.
- Validated staging file: `/mnt/data/September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv`
- 18 columns.
- 800 unique SKUs.
- 791 fixed-price products.
- 9 system-dependent/asterisk-priced products have blank cost/selling price.
- Do NOT use the old 1,109-row CSV; it contained incorrect product/SKU/price pairings.

## BUSINESS DETAILS
Get Wired AutoWorx services ONLY:
1. Auto Electrical Repairs
2. Car Alarm
3. Central Locking
4. Car Audio
5. Auto Electrical Spares & Accessories

Contact:
- CALL/WHATSAPP 074 4884 234
- 29 Wattlebrook Crescent, Brookdale, Phoenix, Durban
- Pick up available
- Nationwide delivery via Courier Guy or PEP PAXI
- Best prices, best products, guaranteed.

## HARD CONSTRAINTS
- **No Cloudflare credits.**
- **No Netlify credits.**
- Do not ask for or expose passwords/secrets.
- Do not use the obsolete 1,109-row CSV.
- Do not rebuild approved storefront sections that are already working.
