# Planetworld parallel storefront (isolated pilot)

This folder is the planned independent storefront build using the accepted Get Wired AutoWorx visual/layout baseline and a Planetworld-only customer-facing dataset. It is not connected to the live catalogue or live Supabase data.

## MVP boundary

- Reuse the accepted storefront layout and responsive behaviour rather than redesigning.
- Use a separate static, sanitised Planetworld product dataset; do not query or mutate the live store's product/stock tables.
- Keep product discovery, category/brand/component browsing, search and product detail pages in scope.
- Treat prices and availability according to fields verified in the supplied Planetworld workbook; never assume stock or pricing semantics.
- Until payment and fulfilment are separately approved, use enquiry/request-to-order flow only. Do not represent checkout/payment as live.
- Build and test in a separate branch/preview. Do not deploy to Axxess or alter the existing production domain, DNS, payments or base store.

## Build gate

The Planetworld workbook is not yet available in the current Library search. Once uploaded, inspect its sheets and columns first, map the actual product data, then build the isolated dataset and UI against real records. A usable 48-hour pilot is a target, not a guarantee; workbook quality and image/pricing fields determine what can be verified in that window.

## Integration later

The separate dataset can remain a standalone store, or its sanitised customer-facing products can later be mapped into the base store through an explicit reviewed integration. Supplier source records remain isolated either way.
