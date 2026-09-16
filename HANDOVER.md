# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-16 22:47 SAST

## SOURCE OF TRUTH
- GitHub: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Current main HEAD: `a4eae6a3af94887998bc6cc79cce9874cf683772`
- Known Netlify site: `get-wired-autoworx-store.netlify.app`
- Store is temporarily being run through Cloudflare.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- Never expose passwords, private keys or secrets.

## CURRENT STATUS
The database/storefront foundation is complete. Do not restart Supabase setup, catalogue import, RLS work or the approved storefront.

The customer-facing source, catalogue/search/category flow, product detail, cart, checkout/order creation, authenticated admin order management, payment/delivery workflow, image-cleanup pipeline and automated source QA are substantially complete.

**Task 9 — final public deployment/browser verification — is intentionally deferred until the user is ready to browse and test the store. Do not perform or claim live-site testing before then.**

## IMAGE REMEDIATION — VERIFIED SOURCE AUDIT
The earlier database audit found **3,396 active products** using the explicit branded fallback image because they had no verified product-specific image available.

The user specifically required the uploaded Buyers Guide photographs to be used for missing store product images. That source was audited directly before changing any image mappings.

### Uploaded September 2026 Buyers Guide audit
- The uploaded guide contains **762 distinct product SKUs** with identifiable product-image blocks.
- All **762 guide SKUs exist in the store catalogue**.
- **753 are active** in the store; 9 are inactive.
- **0 of the 762 guide SKUs currently use the placeholder.**
- **753 active guide SKUs already have product-specific images.**
- Therefore, there are **0 safe guide-photo substitutions available for the 3,396 placeholder products** from the uploaded September guide.
- The guide does not contain the 3,396 placeholder SKUs, so assigning its photographs to those products would create incorrect SKU/image matches.
- No product photograph was falsely mapped merely because it looked similar.

The guide itself was visually inspected at page level and the product image/SKU relationship was programmatically audited from the PDF layout. This is the correct evidence-based result: **the uploaded September guide cannot supply images for the current 3,396 placeholder SKUs.**

### Current safe state
- Existing verified product-specific images remain untouched.
- The 3,396 unmatched products retain the branded placeholder rather than receiving an incorrect photograph.
- The placeholder is a temporary safe state, not a claim that the product has been photographed.
- Further image enrichment requires another verified source containing those exact SKUs/products (additional uploaded guides, supplier images, or individually verified ASC/product imagery).
- Do not substitute photographs solely on visual similarity, generic product type, or filename resemblance.

## LATEST VERIFIED DATABASE STATE
Current Supabase query is authoritative over older handover counts:
- **4,187 active products**
- **4,187 unique active priced SKUs**
- **4,187 active products with stock > 0**
- **27,745 total active units**
- **0 active products at zero stock**
- **0 active products uncategorized**
- **791 active products with product-specific image URLs**
- **3,396 active products using the branded placeholder**

Existing stocked quantities were preserved during image/category remediation.

## LATEST VERIFIED PROGRESS
- Current main HEAD is `a4eae6a3af94887998bc6cc79cce9874cf683772`.
- Latest storefront smoke run known to have succeeded: `35140654305`. It covered mobile entry, category rendering, specials/featured rendering, product-detail open/close, add-to-cart, checkout navigation/form fields and desktop viewport switching.
- The automated smoke test is source/automated verification, **not public-site verification**.
- Existing Netlify production deploy was inspected read-only: `6aa98a8a679a4a0008e10b58`, ready but stale, built 2026-09-15 from an older commit.
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

### Product-specific image enrichment — VERIFIED FOLLOW-UP
- The uploaded September Buyers Guide was fully audited for exact SKU/photo matches.
- It cannot safely replace any of the 3,396 placeholders because none of those placeholder SKUs occur in the uploaded guide.
- Keep the placeholders until a verified source for those exact products is available.
- If the user supplies additional Buyers Guides, repeat the same exact-SKU/page-image matching workflow and replace only confirmed matches.
- If supplier/ASC imagery is used instead, verify SKU/product identity before changing the database.

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
