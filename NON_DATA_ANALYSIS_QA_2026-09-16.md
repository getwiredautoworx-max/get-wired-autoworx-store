# Get Wired AutoWorx — Non-Data-Analysis QA

Date: 16 September 2026

## Scope
Non-destructive review only. No Netlify deployment, no Cloudflare work, no image processing, no 198-item category reassignment, and no payment-provider activation.

## GitHub storefront review
Reviewed the existing storefront entry points:
- `index.html`
- `store.html`
- `index-new.html`
- `checkout.html`

Findings:
- `index.html` routes into the existing `store.html` wrapper.
- `store.html` embeds the current `index-new.html` storefront and exposes checkout when the browser cart contains items.
- The storefront preserves the dark blue/red visual system, GW logo, search, cart, hero, categories, specials, services, mobile navigation and footer structure.
- `checkout.html` verifies active product records from Supabase before submitting an order.
- Browser prices are not used as the authoritative order price; the database order function re-reads product data.
- No live deployment was performed.

## Checkout/payment boundary
Current checkout supports EFT/bank payment, manual payment arrangement and cash on pickup.

PayFast is not yet connected. The following remain final-phase work:
- PayFast verification/documents.
- Secure merchant configuration.
- Return/callback handling.
- Duplicate-order protection.
- Payment success/failure/cancellation testing.

## Delivery boundary
Current checkout records delivery versus pickup and captures delivery address details. The storefront currently submits delivery fee R0.00 while displaying that delivery charges are confirmed by the store.

This is recorded as a pre-integration state. Final delivery work must configure verified charges and provider/order linkage before production payment testing.

## Supabase RLS review
A current PostgreSQL metadata check shows RLS enabled on all inspected public tables, including catalogue, customer/order, admin, import/verification and automation tables.

Current public read policies exist for active `products` and active `categories`. Admin-oriented policies are restricted to authenticated roles.

Two duplicate-looking public SELECT policies exist on both `products` and `categories` (`Public can read active ...` and `public can read active ...`). They were NOT removed during this pass because changing security policies without a full policy-expression review could alter access behavior. They are recorded for final security cleanup/review.

## Security conclusion
No security weakening was performed. The existing protected internal tables remain protected, and no public policies were added merely to silence advisor findings.

## Deferred work
- 198-item manual category worksheet with Product Type field — awaiting data-analysis/file-generation availability.
- Full supplier-stock reconciliation — no complete supplier feed currently stored.
- Product images/watermarking — user-deferred final phase.
- PayFast — final phase.
- Delivery integration — final phase.
- Netlify/Cloudflare deployment and live testing — last phase.

## Credit control
No Netlify or Cloudflare credits were consumed during this QA pass.
