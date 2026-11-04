# Price display implementation audit — 2026-11-04

Owner instruction: all products must display the exact text "Price On Request Due to Stock Availability" until current pricelists are uploaded and reconciled.

## Main-branch source findings
- `products.html` currently calculates `priceVerified(p)` and renders a numeric ZAR price when the product has a positive price and is not marked `QUOTE_REQUIRED`. Otherwise it renders the shorter text `Price on request`, with a separate `Current price must be confirmed` message. This does not meet the new owner instruction.
- `product.html` has the same numeric-price-or-short-request-text pattern. This also does not meet the new instruction.
- `products.html` still offers price-low and price-high sort modes. These must be hidden/disabled while all numeric prices are suppressed.
- Therefore the new price policy is documented, but storefront implementation is NOT complete. No code has been changed in main or PR #168, and no production deployment has been made.
- Before implementation is released, audit every customer-facing price surface, including preview routes, product cards, product details, search/related products, cart and checkout. Ensure a hidden numeric price cannot still enter a payable cart/order path.
- When a current pricelist is uploaded, match by exact supplier SKU and supplier, validate list version/effective date and owner pricing rules, then publish numeric price only after approval. Stock/availability must be checked separately.

## Required customer-facing copy
`Price On Request Due to Stock Availability`

## Release state
Staged policy only. Production HOLD. No price import, product activation, Supabase write, PR merge or deployment.
