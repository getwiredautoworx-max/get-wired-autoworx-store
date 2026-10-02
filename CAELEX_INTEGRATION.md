# Caelex Infolog Supplier Integration

Updated 2 October 2026.

## Verified portal
- Portal: https://caelexinfolog.co.za/Caelex/
- Supplier connection: `Caelex Infolog`
- Query channel: `portal`
- Supabase supplier connection ID: `8d6a189f-5c37-48f1-8e78-9c84ff7dddc7`

## Verified search capabilities
The logged-in Caelex screen supplied for the integration confirms:
- Number Search
- Electrolog Number Search
- Keyword Search
- Numbers starting with
- Numbers containing
- Numbers ending with
- Vehicle Search

The Vehicle Search example shown was:
- Category: ELECTRICAL
- Product group: FUEL PUMPS
- Vehicle: MERCEDES-BENZ
- Application: C36 AMG

The result returned supplier item `FLP012CX` with description `PUMP FUEL 12V UNIVERSAL - 4 BAR`.

## Get Wired workflow
1. Customer selects **QUERY PRICE & AVAILABILITY**.
2. Store creates a private quote request and validates the Get Wired SKU.
3. Server resolves the supplier connection and supplier stock/part number mapping.
4. Caelex Number Search is preferred where an exact supplier number is known.
5. Vehicle Search is used when vehicle/application data is required to identify the supplier item.
6. Supplier response records availability, supplier cost, lead time, packaging, freight, warranty/returns and validity.
7. Owner approval is required before the customer receives a final price.
8. Customer receives the complete quotation by the configured customer channel.
9. Customer accepts the quotation.
10. A connected payment provider generates the secure paylink.
11. Confirmed payment authorizes supplier procurement.
12. Delivery/collection and tracking are recorded against the quote.

## Security boundary
Caelex is a logged-in supplier portal. The integration must use an authorized supplier session/API/feed or an explicitly permitted supplier communication channel. It must not bypass CAPTCHA, anti-bot controls, access restrictions or other technical controls.

Supplier credentials/session material must not be placed in the Android APK or exposed to the customer browser.

## Current implementation
The private quote engine is already deployed in the Supabase project. The Caelex supplier connection has now been registered as an active portal supplier with the verified search modes above.

The remaining integration step is the authorized portal query adapter/session mechanism. The public web crawler cannot use the user's logged-in browser session, so no claim is made that a live Caelex query has been automated yet.

## Pricing
Existing rule remains:
`supplier cost × 1.15 VAT × 1.35 markup`

Freight and packaging remain separate quote components until Owner approval.
