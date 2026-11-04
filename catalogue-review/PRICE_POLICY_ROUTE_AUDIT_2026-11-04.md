# Store-wide price policy route audit — 2026-11-04

Owner rule: all products display "Price On Request Due to Stock Availability" until the exact current supplier pricelist is reconciled and the owner approves publication.

## Updated in this staging branch
- products.html — numeric product price rendering disabled; exact owner text displayed; price sorting removed; enquiry action updated.
- product.html — numeric product price rendering disabled; exact owner text displayed; enquiry action updated.
- checkout-v2.html — all cart items are directed to price/availability confirmation before normal checkout.

## Remaining route work
- preview-store.html is a large legacy/preview storefront route and still contains numeric-price paths in product cards, product detail, quick-search result rows, and existing-cart summaries, plus price sorting. It is NOT yet updated in this branch.
- preview-products.html also contains numeric-price rendering and price sorting. Confirm whether this is reachable by customers before release; if reachable, apply the same policy.
- Audit all other routes and any old browser-cart state. The checkout gate must remain in place while numeric prices are suppressed.

## Verification status
- GitHub source readback confirmed the three updated files. No browser/device QA has been run yet.
- No PR has been opened, no merge/deployment or production database write has been made.
- Do not call the store-wide policy implementation complete until all reachable customer-facing routes are updated and browser-tested.
