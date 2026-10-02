# Caelex Query Adapter

Updated 2 October 2026.

## Status
The Get Wired private quote system now has a deployed `caelex-query` Supabase Edge Function and a private `gw_private.caelex_queries` queue.

Supabase function:
- Name: `caelex-query`
- Version: 1
- Status: ACTIVE
- Project: `ojytykqpvonxvepprgbh`

## Supported Caelex modes
- number
- electrolog_number
- keyword
- starts_with
- contains
- ends_with
- vehicle

## Runtime behavior
1. An owner/admin creates a Caelex query against an existing quote request.
2. The adapter creates a private query record and links it to the quote.
3. If `CAELEX_API_URL` is configured as an authorised supplier API/feed, the adapter posts the query and converts the response into `supplier_quote_responses`.
4. If no authorised API/feed is configured, the adapter returns a `PENDING_AUTHORIZED_SESSION` portal-bridge response containing the query payload.
5. An authorised Caelex session can submit the result through the adapter's `result` action.
6. The supplier response is then attached to the quote and the quote moves to `SUPPLIER_RESPONSE`.

## Security
- The adapter requires an authenticated Get Wired admin.
- Supplier credentials/session material are never sent to customers or stored in the Android APK.
- No CAPTCHA, anti-bot, login or access restriction is bypassed.
- Caelex remains the source of truth for supplier availability/cost.
- API credentials, if supplied, must be stored as Supabase Edge Function secrets.

## Important limitation
The Caelex screen verified for this project is a logged-in web portal. The current environment has no access to that user's live browser session/cookies, and no Caelex API/feed credential has been supplied. Therefore the backend adapter is production-ready for an authorised API/feed or authorised portal bridge, but it does not falsely claim that a live portal query is already automated.

## Quote flow
Customer Query -> Get Wired SKU validation -> private quote -> Caelex query queue -> supplier response -> owner approval -> customer offer -> payment -> procurement -> fulfilment/tracking.

Existing selling-price rule remains:
supplier cost x 1.15 VAT x 1.35 markup.

Freight and packaging remain separate quote components until owner approval.
