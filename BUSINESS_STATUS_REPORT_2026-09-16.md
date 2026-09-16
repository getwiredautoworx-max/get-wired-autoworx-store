# Get Wired AutoWorx — Business Status Report

**Date:** 16 September 2026

## Executive summary
The current database/catalogue foundation is verified and stable. The active catalogue is 4,187 products, already above the earlier 3,000-item target. No destructive catalogue changes were made during QA. The remaining work is deliberately separated into non-credit verification/reporting and final-phase customer-facing integrations/testing. The permanent handover contains the detailed Tasks 1–10 execution checklist and locked workflow requirements.

## Catalogue
- Active products: 4,187
- Active unique SKUs: 4,187
- Missing active cost prices: 0
- Missing active selling prices: 0
- Pricing mismatches: 0
- Active storefront rows: 4,187
- Storefront field mismatches (price/category/stock): 0
- Duplicate active SKU groups: 0
- Missing category references: 0

## Pricing
- Locked formula: supplier cost ex VAT × 1.15 VAT × 1.35 markup
- Advertised price is VAT-inclusive.
- Current pricing audit: 0 mismatches.

## Stock
- Active products below quantity 5: 0
- Active products exactly at quantity 5: 4,153
- Active products above quantity 5: 34
- ASC-verified SKUs: 36
- ASC-verified units: 7,037
- Stored `supplier_stock` rows: 0
- Full supplier-stock reconciliation: **not yet complete**; no complete verified bulk supplier feed is currently stored.
- No supplier quantity has been invented or treated as verified without evidence.

## Categories
- Remaining manual category-sort queue: 198 items
- These items are intentionally reserved for manual user sorting and must not be auto-assigned or deleted.
- Manual worksheet requirement now includes a distinct **Product Type** field, separate from current category and buyer-guide subcategory.
- Previously resolved category mappings were synchronized to the storefront with 0 category mismatches.

## Orders / Customers
- Orders currently recorded: 0
- Customers currently recorded: 0
- Order items currently recorded: 0
- No historical order data was altered during QA.

## Security / database QA
- RLS is enabled on the inspected public tables, including catalogue, customer/order, admin, import/verification and automation tables.
- Public catalogue read access is provided by active-product and active-category SELECT policies.
- Duplicate-looking public SELECT policies on `products` and `categories` were consolidated by removing the redundant lowercase-named policies; canonical public read policies remain.
- Security-definer order/admin functions were inspected; admin functions perform explicit admin authorization checks, while anonymous checkout order creation is intentionally exposed and validates its inputs internally.
- Import/pricing SECURITY DEFINER RPCs were removed from the `authenticated` execution surface.
- Supabase Auth leaked-password protection remains a final security configuration item.
- Remaining advisor WARN items are intentional/known until final Auth and deployment testing; they are not being hidden by unsafe policy changes.

## Storefront / checkout QA
- Existing `index.html` routes into `store.html`; `store.html` wraps the approved `index-new.html` storefront.
- `checkout.html` re-reads active product records before order creation and does not treat browser-submitted prices as authoritative.
- Current checkout supports EFT/bank payment, manual payment arrangement and cash on pickup.
- PayFast is not yet connected and remains final-phase work.
- Delivery selection and address capture are present; delivery fee is currently confirmed by the store and the checkout submits R0.00 as a pre-integration state. This is not the final customer delivery charge.
- Storefront checkout payment enum was corrected to `manual_payment` to match the database order workflow.
- No storefront redesign or live deployment was performed during this QA pass.

## Production test readiness
A dedicated `PRODUCTION_SECURITY_TEST_MATRIX_2026-09-16.md` was added to GitHub. It defines security gates, customer-data tests, browse/search/category/product/cart/checkout tests, order/database checks, admin authorization tests, PayFast and delivery final-phase tests, mobile/responsive checks, deployment gates and explicit release blockers.

## Catalogue target
The current active catalogue of 4,187 products already exceeds the earlier 3,000-item target. Further expansion should therefore be based on validated, non-duplicate additions rather than quantity alone.

## Source/stock limitation
The stored September Buyer’s Guide explicitly states that prices are valid while stocks last and that asterisk-priced items are system-dependent and may vary. It therefore cannot be treated as a complete live stock feed. The current verified stock position is based only on explicitly stored verification evidence.

## QA status
Database-to-storefront consistency is verified at the database level. Non-credit source-code and security QA has been performed without deployment. Customer-facing live interaction testing remains pending until final deployment testing is permitted.

## Remaining task structure
### Non-credit / verification work
- Supplier-stock reconciliation using only available verified evidence; complete feed remains pending.
- Database/storefront QA maintenance and re-verification.
- Catalogue expansion only when validated non-duplicate stock becomes available.
- Final business reports and exports.
- Final security/backup review.

### Final-phase work
1. Manual category-sort worksheet — 198 items with Product Type field
2. PayFast integration and verification
3. Delivery integration — Your Courier / PEP PAXI
4. Catalogue image matching/watermarking
5. Production deployment and complete live customer journey testing
6. Final stock-reconciled Excel workbook after a complete verified supplier-stock feed is available

## Final-phase controls
- Product images remain explicitly deferred until the final phase/user-directed image session.
- PayFast credentials/verification are not assumed complete.
- Delivery integrations are not assumed complete.
- Live payment, delivery, order or production-test results are not claimed until actually tested.
- Netlify/Cloudflare credits remain protected and must not be used before final testing.
- No new Netlify site or GitHub repository is required.

## Continuation instruction
Continue from this verified state. Do not rebuild the store. Do not use Netlify or Cloudflare credits before final testing. Do not invent supplier stock, product images, payment status, delivery status, or live-test results. After every successful task, update the permanent handover and this business status report as appropriate.

## Latest documentation update
**16 September 2026:** Production security/customer test matrix added. Redundant catalogue read policies removed, import/pricing authenticated execution revoked, and storefront checkout payment enum aligned with the database workflow. No Netlify/Cloudflare credits used.
