# Get Wired AutoWorx — Bob Go Delivery Integration Specification

**Date:** 17 September 2026  
**Repository:** `getwiredautoworx-max/get-wired-autoworx-store`  
**Branch:** `main`

## Objective
Provide customers with live delivery choices and current courier pricing during checkout, without exposing courier credentials in browser code and without hard-coding a nationwide delivery fee.

## Verified provider capabilities
Bob Go documents a Rates at checkout feature that can request **real-time courier rates** using the order weight, customer delivery address and collection address. Bob Go also supports multiple service levels, including door-to-door delivery and pickup points, and its open API supports custom integrations that can display rates, create/sync orders, generate shipments and track deliveries. Bob Go provides a sandbox for integration testing.

## Store architecture
1. Customer adds products to cart.
2. Checkout verifies that products are still active.
3. Customer selects nationwide delivery and enters the delivery address, city and postal code.
4. Store calculates/loads the shipment parcel data from the cart.
5. Browser sends only checkout/shipment details to a server-side delivery quote endpoint.
6. Server-side adapter calls Bob Go using a secret API credential stored in Netlify environment variables or another server-side secret store.
7. Store displays the returned delivery options, price and delivery timeframe.
8. Customer selects one delivery option.
9. The selected provider/rate/reference is retained with the pending order.
10. Payment remains a separate final-phase integration. Shipment booking occurs only after the required payment/order conditions are satisfied.
11. Booking/tracking/webhook handling is added after quote flow is proven.

## Product shipment data
The `public.products` table now contains these nullable fields for courier rating:
- `weight_kg`
- `length_cm`
- `width_cm`
- `height_cm`

These fields were added to Supabase on 17 September 2026 and verified immediately after migration.

## Important pricing rule
A single courier cannot truthfully be declared permanently cheapest. The delivered price depends on route, parcel weight/dimensions, service level and applicable surcharges. The checkout should therefore present the live options returned for the customer's actual shipment.

Bob Go states that courier rates are based on order weight and addresses and that surcharges can affect final shipment charges. Rate-card amounts are VAT-inclusive but additional shipment-specific surcharges may apply.

## Current implementation state
- Database shipping-dimension fields: **complete and verified**.
- Existing checkout: **preserved**; no production courier pricing has been invented or hard-coded.
- Bob Go live API credentials: **not yet supplied/connected**.
- Server-side quote adapter: **blocked until provider credentials/API access are available**.
- Production deployment: **intentionally deferred under the project credit/deployment lock**.

## Required provider/user input before live quote integration
1. Bob Go account creation/activation.
2. Bob Go API channel/API key and webhook secret, if required for the selected API flow.
3. Confirmation of collection address and default/predefined parcel settings.
4. Bob Go account courier/service levels available to the store.
5. Confirmation of any account-specific surcharges, liability/insurance and booking rules.
6. Netlify server-side environment variables may be added only when the credentials are supplied/authorized.

## Security requirements
- Never place Bob Go API keys in `index.html`, `store.html`, `checkout.html`, browser JavaScript, Supabase public data or Git history.
- Use a server-side endpoint for all privileged courier API calls.
- Validate product IDs, quantities, address fields and parcel values server-side.
- Recalculate shipment data from trusted product records rather than trusting browser-supplied prices.
- Store the selected quote/provider/reference against the order to prevent delivery-fee duplication or later ambiguity.
- Add idempotency to booking and webhook processing before enabling automatic shipment creation.

## Recommended checkout presentation
- **Door delivery — live courier quote**
- **Pickup point / locker — live available options** where supported
- Show provider/service name, estimated timeframe and customer charge.
- Make the selected delivery option explicit in the final order summary.
- If a live quote cannot be obtained, do not silently invent a price. Fall back to a clearly labelled manual delivery-confirmation path until the live quote service is available.

## Final deployment rule
Do not deploy the live courier integration until the provider credentials, server-side endpoint, quote calculation, order persistence, error handling and customer checkout flow have been tested together. This preserves the existing Netlify-credit lock and avoids repeated production deployments.
