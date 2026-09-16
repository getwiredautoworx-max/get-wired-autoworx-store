# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-16 22:15 SAST

## SOURCE OF TRUTH
- GitHub: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Current main HEAD after image/catalogue remediation: `6ec64c9a48824745e326980152ab499823f2f61e`
- Known Netlify site: `get-wired-autoworx-store.netlify.app`
- Store is temporarily being run through Cloudflare.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- Never expose passwords, private keys or secrets.

## CURRENT STATUS
The database/storefront foundation is complete. Do not restart Supabase setup, catalogue import, RLS work or the approved storefront.

The customer-facing source, catalogue/search/category flow, product detail, cart, checkout/order creation, authenticated admin order management, payment/delivery workflow, image-cleanup pipeline and automated source QA are substantially complete.

**Task 9 — final public deployment/browser verification — is intentionally deferred until the user is ready to browse and test the store. Do not perform or claim live-site testing before then.**

## COMPLETED REMEDIATION — CATALOGUE IMAGES
The previous audit found 3,396 active products with no `image_url` or gallery URL. This has now been resolved at the storefront/data-safety level without inventing or incorrectly mapping product photographs:

- Added `assets/product-placeholder.svg` as a permanent branded fallback image.
- Updated all 3,396 affected active products to use `/assets/product-placeholder.svg`.
- Verified: **0 active products now have a blank/missing image URL or gallery**.
- The placeholder clearly states that the product image is being verified/sourced; it does **not** falsely represent a product photograph.
- Existing verified product-specific images were left untouched.
- Product-specific image enrichment remains a non-blocking follow-up and may replace placeholders only with verified matching imagery.
- Existing image-cleanup workflow remains complete; do not rerun it blindly.

## COMPLETED REMEDIATION — CATEGORIES
The catalogue audit also found 33 active uncategorized products. All were reviewed by product name and assigned to an existing appropriate category; the remaining concrete item (`176464`, concrete nails) was assigned to Hardware.

Verified now:
- **0 active products uncategorized.**

## LATEST VERIFIED DATABASE STATE
Current Supabase query is authoritative over older handover counts:
- **4,187 active products**
- **4,187 unique active priced SKUs**
- **4,187 active products with stock > 0**
- **27,745 total active units**
- **0 active products at zero stock**
- **0 active products uncategorized**
- **3,396 active products use the new branded image placeholder pending verified product-specific imagery**
- 4,153 active products currently have stock quantity 5; 34 have other positive quantities.

Existing stocked quantities were preserved during this remediation.

## LATEST VERIFIED PROGRESS
- Added the safe product-image fallback in commit `6ec64c9a48824745e326980152ab499823f2f61e`.
- Latest known storefront smoke run: `35140654305` succeeded. It covered mobile entry, category rendering, specials/featured rendering, product-detail open/close, add-to-cart, checkout navigation/form fields and desktop viewport switching.
- The automated smoke test is source/automated verification, **not public-site verification**.
- Existing Netlify production deploy was inspected read-only: `6aa98a8a679a4a0008e10b58`, ready but stale, built 2026-09-15 from commit `37654d7c2e8e38dad80f9edf33413aa1be62d1a4`.
- No deployment was triggered because Netlify/Cloudflare credits are prohibited.
- Public fetch of the known Netlify URL is not currently available through the accessible runtime path.
- Repository/configuration search has not documented the temporary Cloudflare public hostname.

## REMAINING TASKS
### Task 9 — FINAL PUBLIC DEPLOYMENT / BROWSER VERIFICATION — DEFERRED
Do this **only when the user is ready to browse/test**.

Required checks when that time comes:
1. Open the actual public Cloudflare storefront.
2. Verify the public site is reachable and is the intended Get Wired AutoWorx store.
3. Test homepage, categories, search, product detail, image display, cart and checkout.
4. Test WhatsApp ordering/contact handoff.
5. Test delivery/pickup and payment workflow presentation.
6. Verify mobile and desktop behaviour.
7. Compare public behaviour with the current GitHub/Supabase source.
8. Record the actual public URL and result in `LIVE_READINESS.md` and this handover.

**Do not deploy or refresh Netlify/Cloudflare merely to perform this test. No credits are to be spent.**

### Product-specific image enrichment — NON-BLOCKING FOLLOW-UP
- The 3,396 placeholders prevent broken/blank product cards but are deliberately not represented as real product photographs.
- Replace placeholders progressively only when a verified matching product image is available.
- Authoritative sources may include verified supplier/ASC product imagery or correctly matched customer-supplied images.
- Never map an image to a SKU solely because it looks similar or because a filename happens to resemble another SKU.

## SECURITY / DATABASE
Seven public tables already exist: `categories`, `customers`, `order_items`, `orders`, `products`, `store_settings`, `vehicle_compatibility`. RLS is enabled on all seven.

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
- 800 images were processed in the existing cleanup pipeline.
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
**Continue from this handover. Do not restart completed database work, do not use the obsolete 1,109-row CSV, do not spend Cloudflare or Netlify credits, do not replace verified product imagery with guesses, and do not claim live verification unless it has actually been performed.**
