# Planetworld parallel storefront (isolated pilot)

A separate Planetworld storefront shell now exists at `planetworld-store/index.html`. It follows the accepted Get Wired AutoWorx storefront's familiar structure and responsive navigation, but uses a distinct **charcoal / teal / light-grey** theme.

## Current verified state

- [Open the storefront source](./index.html)
- The header, search, category and brand sections, product-list area, responsive layout, and product-enquiry dialog are implemented.
- The current catalogue array is intentionally empty. No sample products, brands, prices, stock counts, supplier images or availability claims are fabricated.
- The request form prepares a local text file; it does not send an enquiry, create an order, or take payment.
- No live Supabase product/category endpoint is called. The pilot is isolated from live catalogue and stock records.
- This is source code on the working branch, not a deployed or browser-tested preview. Do not call it launch-ready.

## Next build gate: Planetworld XLSX

When the owner uploads the Planetworld workbook, inspect every relevant sheet and the real field names before adding data. Then:

1. Map actual product identifiers, names, brands, categories, component types, descriptions and any price/availability fields.
2. Build the category → segment → brand → component/product navigation using only values supported by the workbook.
3. Match product images to exact manufacturer model numbers; mark unresolved matches instead of substituting generic or incorrect images.
4. Use only owner-approved, sanitised customer-facing data in the public repository. Raw supplier workbooks, dealer/wholesale prices, discounts, stock feeds, account details and trading terms must remain private.
5. Test desktop and mobile layout, search/filter/navigation, enquiry preparation, accessibility basics and data isolation; obtain a real preview URL and record actual test results before requesting owner approval.

## Scope and safety

- Reuse the approved layout pattern; do not redesign the main store.
- Keep a separate, sanitised Planetworld dataset. Never query or mutate live store product/stock tables.
- Until payment and fulfilment are explicitly approved, use enquiry/request-to-order only; do not imply checkout or payment is available.
- Do not merge, deploy to Axxess, change DNS, alter the main store, or activate payments without explicit owner approval.
- A usable pilot within 48 hours of receiving a usable workbook is a target, not a guarantee; workbook quality and image verification determine what can be completed.
- After acceptance, the owner can choose a standalone catalogue or a reviewed integration into the main store.
