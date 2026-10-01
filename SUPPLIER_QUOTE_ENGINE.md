# Supplier Quote Engine Foundation

Implemented 1 October 2026.

## Live Supabase foundation
The project now contains a private `gw_private` quote/procurement data layer:
- supplier connections and permitted communication channels
- customer quote requests
- supplier responses, including private supplier cost
- customer offers
- payment-link records
- supplier/customer messages
- immutable quote event history

All quote tables are RLS-enabled and the private schema is not granted to anonymous/authenticated Data API roles. The intended runtime is a privileged Edge Function with explicit owner authorization for internal actions.

## Workflow
Customer request:
`REQUESTED → SENT_TO_SUPPLIER → SUPPLIER_RESPONSE → OWNER_REVIEW → QUOTED_TO_CUSTOMER → ACCEPTED_PAYMENT_PENDING → PAID → SUPPLIER_ORDERED → DISPATCHED → DELIVERED`

Terminal states include EXPIRED, DECLINED and CANCELLED.

## Security rules
- Customer browser never supplies or receives supplier cost.
- Supplier credentials are not stored in the Android APK.
- Supplier access must use an authorised API/feed/email/WhatsApp Business/manual channel.
- CAPTCHA, anti-bot controls and access restrictions must never be bypassed.
- Customer pricing is not final until a supplier response and required Owner approval exist.
- Payment credentials are not collected or stored by Get Wired AutoWorx.

## Current implementation boundary
The database foundation is live. The Edge Function source is stored here for controlled deployment. The actual supplier salesman adapter, transactional email provider, WhatsApp Business API and payment provider require their provider-specific credentials/configuration. The first supplier website URL will be used to determine the permitted query method.

## Price calculation
The existing business rule remains supplier cost × 1.15 VAT × 1.35 markup. Freight and packaging are tracked separately and can be included in the final customer total after Owner approval.
