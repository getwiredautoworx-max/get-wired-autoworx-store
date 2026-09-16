# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-16 21:50 SAST

## SOURCE OF TRUTH
- GitHub: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Current main HEAD: `ad05565a4ce7309489698899ffe07428d98dde7c`
- Known Netlify site: `get-wired-autoworx-store.netlify.app`
- Store is temporarily being run through Cloudflare.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- Never expose passwords, private keys or secrets.

## CURRENT STATUS
Database/catalogue setup is complete and must not be rebuilt. Approved customer storefront, catalogue/search/category flow, product detail, cart, checkout/order creation, authenticated admin order management, payment/delivery workflow, image cleanup and automated QA are substantially complete.

The remaining production item is genuine public deployment/browser verification. Source readiness must not be called live verification.

## LATEST VERIFIED PROGRESS
- Current source HEAD verified: `ad05565a4ce7309489698899ffe07428d98dde7c`.
- Latest storefront smoke run `35140654305` succeeded on the current source/workflow.
- Smoke coverage: mobile entry, category rendering, specials/featured rendering, product detail open/close, add-to-cart, checkout navigation/form fields and desktop viewport switching.
- Existing Netlify production deploy was inspected read-only: `6aa98a8a679a4a0008e10b58`, ready but stale, built 2026-09-15 from commit `37654d7c2e8e38dad80f9edf33413aa1be62d1a4`.
- No deployment was triggered because Netlify/Cloudflare credits are prohibited.
- Public fetch of the known Netlify URL is not available through the current web/runtime path; therefore **NOT LIVE-VERIFIED**.
- Repository/configuration search does not document the temporary Cloudflare public hostname.

## NEXT WORK
1. Continue credit-free source audit and automated QA.
2. Fix only confirmed defects.
3. Read-only inspect public deployment whenever an accessible path exists.
4. Compare public deployment with current GitHub source where possible.
5. Keep `LIVE_READINESS.md` and this file updated with actual verification.
6. Never deploy to refresh a stale site if it consumes Netlify or Cloudflare credits.
7. Only mark the store live-verified after genuine public deployment/browser verification.

## DATABASE / CATALOGUE — DO NOT REBUILD
Seven public tables already exist: `categories`, `customers`, `order_items`, `orders`, `products`, `store_settings`, `vehicle_compatibility`. RLS is enabled on all seven.

Verified catalogue/stock state:
- 4,198 active products
- 4,188 unique priced SKUs
- 0 uncategorized products
- 4,162 products at stock quantity 5
- 0 products at zero stock
- 27,847 total units
- Existing stocked quantities preserved; previously zero-stock products were initialized to 5 as documented.

Security hardening already completed: anonymous execution was removed from legacy admin RPC overloads and internal pricing/import SECURITY DEFINER functions; authenticated execution retained. `create_store_order` remains anonymously executable by design for public checkout and revalidates DB product prices.

Supabase advisor still reports four public import/staging tables with RLS disabled and some internal RLS-enabled tables without policies. Do not change these automatically without a confirmed requirement. Leaked-password protection remains a configuration warning.

## CHECKOUT / ADMIN
- `index.html` -> `store.html` -> approved `index-new.html` storefront.
- `checkout.html` validates active products and calls `public.create_store_order`.
- Fulfilment: nationwide delivery or pickup.
- Delivery: Courier Guy or PEP PAXI.
- Payment: EFT/bank payment, manual arrangement or cash on pickup; payment starts pending.
- No card details are collected.
- Delivery fee is confirmed by the store.
- `admin.html` + `assets/admin.js` use Supabase Auth and authenticated admin RPCs.
- Admin supports order/payment status, payment references, internal notes and WhatsApp contact.

## IMAGE CLEANUP
- `.github/workflows/clean-product-images.yml` completed successfully.
- 800 images processed; final commit reported no image changes were required.
- Do not rerun unless a specific image problem is identified.

## CATALOGUE SOURCE WARNING
- Validated source: `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv`.
- **DO NOT USE THE OLD 1,109-ROW CSV**; it contained incorrect product/SKU/price pairings.
- Do not infer missing prices or compatibility.

## PRICING RULE
`cost × 1.15 VAT × 1.35 markup`, displaying VAT-inclusive retail pricing. Where requested, compare with current South African retail-market pricing.

## BRAND REQUIREMENTS
Get Wired AutoWorx
- CALL / WHATSAPP 074 4884 234
- 29 Wattlebrook Crescent, Brookdale, Phoenix, Durban
- Pick up available
- Nationwide delivery via Courier Guy or PEP PAXI
- Best prices, best products, guaranteed.
- 4.7★ Google Rating without review count
- PRODUCT SPECIFIC WARRANTY
- Brand New • OEM Quality Replacement Parts where appropriate; do not claim original OEM manufacturer parts unless verified.
- Installation wording: `Installation Services Available`
- Use `Spares & Accessories`
- Category strip: `Auto Electrical / Sound / Security / Spares & Accessories`
- No Twitter/X or TikTok.

## FINAL RULE
**Continue from this handover. Do not restart completed database work, do not use the obsolete 1,109-row CSV, do not spend Cloudflare or Netlify credits, and do not claim live verification unless it has actually been performed.**
