# Checkout and delivery hardening — development-only review
Date: 2026-10-09
Branch: dev/checkout-delivery-hardening
Status: investigation complete; no production code or database changed.

## Confirmed issues
1. The active `store-checkout` Edge Function forwards the client-supplied `p_delivery_fee` directly to the public RPC. It does not authenticate a server-issued quote or calculate the required R15 dispatch fee.
2. The active newer `public.create_store_order(text,text,text,text,text,text,text,numeric,text,text,jsonb)` RPC derives `v_is_pickup` from `p_payment_method = 'cash_on_pickup'`. It accepts a zero-fee pickup branch even though the current storefront is delivery-only.
3. The same RPC accepts any positive caller-provided delivery fee; it does not verify a quote ID/provider/price and does not enforce the R15 dispatch fee.
4. The legacy overload `public.create_store_order(text,text,text,jsonb,text,jsonb,text)` still supports `p_delivery_method='pickup'`, uses legacy product columns `is_active/stock`, and calculates delivery from arbitrary JSON. Its execution grants/callers have not yet been verified.
5. Checkout displays a PAXI locator and asks the customer to enter the point name/code in free-form notes. There is no structured point selection/validation, so destination persistence is not guaranteed.
6. `shipping-quote` calculates parcel data from request-body weight/dimensions. A zero/missing total weight becomes a provisional 1 kg. Provider URL/token configuration and upstream response schemas are not verified end-to-end.
7. Packaging is calculated by the database at R35 per item. Do not duplicate or change this fee during delivery fixes.

## Safety constraints
- This is a development-only plan. No live orders, payments, database writes, Edge Function deployments, or hosting credits were used.
- Do not change production SQL/functions until exact RPC grants/callers, quote-token design, schema compatibility, and test paths are confirmed.
- Do not disable/remove the legacy RPC until callers and execution privileges are verified.
- Never trust browser-supplied shipping prices, parcel weights, dimensions, stock, or payment state.

## Implementation order
1. Verify both RPC overload grants and search repository call sites for each signature.
2. Design a server-issued, short-lived delivery quote token/record bound to normalized destination, parcel inputs, provider/service, amount, and expiry. Recompute R15 exactly once server-side per order/address; reject altered/expired quotes.
3. Enforce delivery-only in the authoritative order RPC; allow only explicitly supported payment methods; reject pickup/cash-on-pickup even for direct RPC requests.
4. Require a PAXI point code/name when PAXI is selected and persist it in validated order metadata or dedicated columns; do not accept free-form notes as proof of selection.
5. Prefer trusted product dimensions/weights; if unavailable, mark quote provisional and require manual confirmation rather than silently implying a firm live rate.
6. Test in isolated development: pickup attempt, zero/negative/forged fees, quote tampering/expiry, R15 once for 1 and 5 items, quantity/stock concurrency, invalid payment method, missing PAXI point, malformed items, and legacy-call compatibility.
7. Only after all tests pass and owner authorizes final testing, prepare reviewed production migration/function deployment and then run the controlled live test matrix. Keep Cloudflare/Netlify credits untouched until final testing.
