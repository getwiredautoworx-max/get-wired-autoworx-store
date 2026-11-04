# Store-wide price display policy — owner instruction 2026-11-04

## Customer-facing rule
Effective for the storefront catalogue until the owner authorises price publication:

**Display this exact text for every product instead of a numeric price:**
> Price On Request Due to Stock Availability

This applies to every product across every supplier and category, not only ASC products. Do not display numeric selling prices, dealer costs, cost prices, historic prices, or cached prices while this policy is active.

## Enquiry behaviour
- Product enquiry / request-price action should remain available and identify the product name and its customer-facing SKU.
- The customer-facing message should ask the customer to confirm current price and stock availability.
- Do not add a product to a priced checkout/cart flow while its price is unpublished or unverified. A price enquiry is not an order confirmation.
- Do not imply that stock is available merely because a product is listed.

## Pricelist activation workflow
- When a supplier pricelist is uploaded, parse and reconcile it against the exact supplier SKU and the current catalogue record.
- Validate supplier identity, effective date/version, currency, VAT treatment and any applicable owner pricing rules before calculating or publishing a selling price.
- Update the product from the exact reconciled current pricelist entry; do not match by description alone.
- Confirm stock/availability separately where the pricelist does not provide reliable stock information.
- Only after the owner-approved price and required availability checks pass may that product's numeric price replace the request text.
- Until then, keep the exact request text visible.
- Maintain an audit trail of source pricelist, source SKU, matched product SKU, effective date, calculation and approval status.

## Implementation / release control
- This is a store-wide customer-facing requirement. Apply it consistently on category/product cards, product detail pages, search results, related products, cart/checkout and any other customer-visible price surface.
- Hide numeric price sorting/filtering while prices are suppressed, or replace it with a non-price sort. Do not leave controls that imply unpublished prices are being compared.
- Owner has not authorised a production deployment, live database write, price import, or publication of numeric prices. Changes remain staged until reviewed and approved.
