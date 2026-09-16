# GET WIRED AUTOWORX — YOUR COURIER DELIVERY INTEGRATION SPEC

**Date:** 16 September 2026  
**Status:** Architecture prepared; credentials/provider enablement still required before live integration.

## Investigation result

Your Courier's public site presents WhatsApp as its current customer-facing booking flow for local and national South African deliveries. It accepts parcel/furniture/appliance delivery requests and matches jobs with verified drivers.

The Your Courier customer portal is `portal.yourcourier.co.za`. Public ParcelOps documentation identifies that portal as a white-label courier portal and provides a REST API capable of quoting, booking, tracking and retrieving shipment documents. The public API documentation also shows a `tenantSlug` of `your-courier` in a webhook example. This is strong evidence that Your Courier's portal is running on ParcelOps infrastructure, but it does **not** by itself prove that Get Wired AutoWorx has API access enabled. API access must be confirmed with Your Courier and an API key issued through the courier customer portal.

## Target checkout workflow

1. Customer selects **Delivery**.
2. Customer enters delivery address, city/suburb and postal code.
3. Store determines the parcel details available for the cart (item count, weight and dimensions where known).
4. Server-side delivery quote function sends collection address, destination and parcel data to Your Courier/ParcelOps.
5. Courier quote is returned.
6. Store displays the returned delivery charge before payment.
7. Order total becomes **products + quoted delivery charge**.
8. Customer pays the exact final amount.
9. Only after successful payment/order confirmation should shipment booking be created, subject to the final payment and delivery workflow.
10. Store saves the quoted delivery amount, quote/reference, provider, and later waybill/tracking number against the order.
11. Delivery status webhooks update the order/delivery record idempotently.

## Security requirements

- Do **not** place a Your Courier/ParcelOps API key in browser JavaScript.
- API calls must be server-side (Supabase Edge Function or another approved server endpoint).
- Customer addresses must not be exposed to unrelated third parties beyond the courier request required to quote/book the delivery.
- Store the quote returned by the courier rather than trusting a browser-submitted delivery amount.
- Validate the quote against the cart/order before accepting payment.
- Save the provider quote/reference and final charged amount for reconciliation.
- Webhook signatures must be verified and duplicate delivery events must be idempotent.
- Do not create a shipment or charge a delivery fee twice.

## API capability identified

ParcelOps documents a REST API with Bearer API-key authentication and customer-scoped access. Its documentation states that the API supports quote, booking, tracking and shipment documents, with webhooks for collection, out-for-delivery, delivered and failed-delivery events. Webhook payloads include a unique delivery ID and signed HMAC-SHA256 headers for verification.

## What remains provider-dependent

- Whether Your Courier will issue/enable an API key for Get Wired AutoWorx.
- Exact quote endpoint/request schema and required parcel dimensions/weight.
- Your Courier business tariff and any account-specific rates.
- Whether quoting can be performed without first creating a shipment.
- Maximum/minimum parcel sizes and weight limits for automotive parts.
- Insurance/declared-value rules.
- Booking timing and cancellation rules.
- Whether payment must be completed before courier booking.

## Store implementation decision

Do **not** hard-code a delivery price. Do **not** scrape WhatsApp responses. The preferred implementation is a server-side real-time quote before payment, with WhatsApp retained as a manual fallback if the API is unavailable.

If Your Courier confirms API access, implement the courier adapter behind a provider-neutral delivery-quote interface so PAXI or another courier can be added later without redesigning checkout.

## Current checkout compatibility

The existing checkout already requires address, city and postal code for delivery and keeps delivery charge separate from the product total. The current delivery charge remains pending/zero until a verified provider quote is available. This is intentional and must not be replaced with a guessed amount.

## No-credit status

This investigation and architecture work does not require Netlify or Cloudflare credits. Live courier credentials, live quoting, payment integration and production deployment remain final-phase activities.
