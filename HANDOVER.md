# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-28 17:45 SAST

## SOURCE OF TRUTH
- GitHub: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Current main HEAD: `bf7d1edf3b3bb20d74d0e1e1c0e529447d91668e`
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
- Current main HEAD is `93cade43a1dd415ed86230503f6e2207870801a6`.
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


## CONTINUATION AUDIT — 2026-09-22 19:02 SAST

### Buyers Guide re-check
- The two uploaded September guide PDFs are duplicates of the same 32-page guide; no additional distinct Buyers Guide was found in the available file library.
- The validated staging CSV contains 779 product rows.
- Current active catalogue matching confirms 545 of those 779 SKUs are present as active products.
- Only one guide CSV SKU currently has the branded placeholder: SKU **25482**. However, it is **not a safe image match**: the guide shows SKU 25482 as the M7-005B universal black rubber car mat, while the current store SKU 25482 is a Fiat 500/Doblo/Panda/Punto thermostat. The guide photograph must therefore NOT be assigned to the store product.
- The guide photograph was not assigned and no image mapping was changed in this audit.
- The remaining 3,396 placeholder products are not safely covered by the uploaded September guide; do not fill them by visual similarity or generic product type.

### Current stock-floor state
- The current stock state is intentional and follows the 16 Sep 2026 stock-floor task recorded in the project history.
- **4,187 active products**
- **4,153 active products at quantity 5**
- **34 active products above 5**, retaining explicitly verified ASC quantities
- **36 ASC-verified SKUs / 7,037 verified units** remain recorded in the verification ledger; 2 verified SKUs are inactive
- **27,745 total active units** after the stock-floor task
- Do not treat the quantity-5 floor as independently verified supplier stock; it is the store's requested stock-floor value for unverified active products.

### Current catalogue QA re-check — 22 Sep 2026
- Pricing mismatches: **0** against the agreed cost × 1.15 × 1.35 formula
- Uncategorized active products: **0**
- Active products with specific product images: **791**
- Active products using branded placeholder: **3,396**
- The image-cleanup workflow was previously verified successful: run **35137846265**, job **104934601924**, processed **800 images**, with no new image changes to commit.

### Deployment/testing constraint remains unchanged
- Task 9 public Cloudflare browser testing remains deferred until the user is ready to browse/test.
- **NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- No live-site testing or deployment was performed during this continuation audit.


## STORE-READINESS ETA — 22 Sep 2026

Based on the current source, database, checkout/order flow, admin flow and successful automated smoke test, the store is in the **final verification stage**, not the build-from-scratch stage.

### Estimated remaining effort once public testing is authorised
- **Public storefront verification:** ~30–60 minutes
- **Fix any issues found:** ~30–120 minutes, depending on findings
- **Order/checkout + WhatsApp/payment/delivery handoff verification:** ~30–60 minutes
- **Final mobile/desktop regression and readiness record:** ~30–60 minutes

**Planning ETA:** approximately **2–5 focused hours of work after public testing can begin**, assuming no blocking deployment/payment issue is discovered. This is an effort estimate, not a guaranteed clock-time delivery promise.

### What is NOT a blocker to opening
- The 3,396 branded image placeholders are not being treated as a launch blocker because incorrect product photography would be worse than a verified placeholder. They remain a post-launch enrichment task unless the user requires every product to have a photograph before trading.
- The catalogue currently has 0 uncategorized active products and 0 pricing mismatches.
- Automated storefront smoke testing has already covered mobile entry, category rendering, specials/featured rendering, product detail, add-to-cart, checkout navigation/form fields and desktop viewport switching.

### What IS required before calling the store ready to trade
1. Actual public storefront reachable and confirmed as the intended Get Wired AutoWorx site.
2. Live homepage/category/search/product/cart/checkout verification.
3. Confirm order creation reaches the intended admin/order workflow.
4. Verify WhatsApp contact handoff, delivery/pickup presentation and payment instructions.
5. Verify mobile and desktop public behaviour.
6. Record the actual public URL and final result in the handover/readiness files.

**Constraint:** No Cloudflare credits and no Netlify credits are to be used for this work.


## PRE-LAUNCH CODE AUDIT — 22 Sep 2026

A deeper source/database audit found one item that must be resolved before the store is called fully trade-ready:

### Checkout / order-fee consistency blocker
- The live checkout entry point is checkout-v2.html.
- The UI currently presents a flat R15 delivery fee and does not provide a direct customer pickup fulfilment option.
- The Supabase create_store_order function currently hard-codes R15.00 as the order fee and ignores the supplied p_delivery_fee value.
- The function supports eft, manual_payment, and cash_on_pickup as payment methods, but the current checkout-v2 UI only exposes EFT and manual payment.
- Therefore, before launch, checkout should be aligned with the intended store policy: delivery or pickup, with the correct fee (R15 for delivery, R0 for pickup), while the database function must remain server-authoritative and must not trust a client-supplied fee.
- No production database change was made during this audit, and no real customer order was created for testing.

### Revised ETA
This is a contained pre-launch correction rather than a rebuild. Allow approximately 1–3 additional focused hours for implementing the fulfilment/fee alignment, source regression, and then the previously planned public verification. Public verification is still the final gate.


## CHECKOUT FULFILMENT CORRECTION COMPLETED — 22 Sep 2026

The pre-launch checkout blocker identified in the code audit has been corrected.

- checkout-v2.html now supports **Nationwide delivery (R15.00)** and **Get Wired AutoWorx pickup (R0.00)**.
- Pickup defaults toward cash-on-pickup handling; delivery address fields are required only for delivery.
- The checkout sends the selected fulfilment fee to the server.
- Supabase create_store_order was updated server-side so only **R0 or R15** are accepted, with the server remaining authoritative.
- R0 orders require cash-on-pickup; R15 orders require delivery address/city/postal information.
- Existing product price/stock revalidation remains server-side.
- No real customer order was created during this correction.

Remaining gate: final source regression followed by the authorised public Cloudflare storefront/browser verification. No Cloudflare or Netlify credits were used.

## FINAL RULE
**Continue from this handover. Do not restart completed database work, do not use the obsolete 1,109-row CSV, do not spend Cloudflare or Netlify credits, do not replace verified product imagery with guesses, and do not claim live verification unless it has actually been performed.**


## CHECKOUT PAYMENT GUARD CORRECTION — 22 Sep 2026

A final source review found one consistency edge case in the corrected fulfilment flow: the customer could manually re-select Cash on pickup after switching back to Nationwide delivery. The server function already accepted only R0/R15, but it did not explicitly reject cash-on-pickup with the R15 delivery fee.

- checkout-v2.html now disables Cash on pickup for Nationwide delivery and restores it for pickup.
- Delivery submission also has a client-side guard against Cash on pickup.
- public.create_store_order now explicitly rejects cash_on_pickup when the delivery fee is R15.
- The server still rejects any fee other than R0 or R15.
- A database guard test using a real active product ID was run; the invalid R15 + cash_on_pickup request was rejected and **0 QA orders were created**.
- No real customer order was created.
- No Cloudflare or Netlify credits were used.

The latest storefront source commit is **b72e240e2655ed8feebaab6f16fcfb9e54175918**. The remaining external gate is still public Cloudflare verification because the exact temporary Cloudflare public hostname is not available in the repository or prior project context.


## CONTINUATION CHECK — 24 Sep 2026

- Repository access and write permissions are confirmed.
- GitHub `main` is at `93cade43a1dd415ed86230503f6e2207870801a6`.
- The two commits after the checkout/payment correction are documentation-only updates to `HANDOVER.md` and `LIVE_READINESS.md`; no storefront/database regression was introduced by those commits.
- Netlify production deploy `6aa98a8a679a4a0008e10b58` remains stale and is deliberately not being refreshed.
- No Cloudflare credits or Netlify credits were used.
- Public Cloudflare browser verification remains deferred until the user explicitly moves to the browse/test stage.


## APK CONTINUATION — 26 SEP 2026
- [x] Existing Sales Intelligence APK source preserved under `apk-sales-intelligence/`.
- [x] Android Gradle project scaffolding added without changing the customer storefront.
- [x] APK build workflow added at `.github/workflows/build-store-apk.yml`.
- [x] **v0.3.1 debug APK built successfully** by GitHub Actions run **36270086197**.

## EXECUTION CONTINUATION — REPLIT / OWNER APK — 2026-09-28

### Independent build route
- Replit workspace created for the existing Get Wired AutoWorx Owner APK build/validation route.
- Workspace URL: https://replit.com/@getwiredauto/OblongEcstaticFlash
- Replit Agent daily credits were exhausted during setup; repeated Agent status/update requests timed out. This is an execution-credit limitation, not evidence of an application-code failure.
- Do **not** create a replacement/demo store or simplified APK in Replit.
- Resume from the existing Replit workspace after the Agent allowance resets.
- Required route: existing GitHub source → independent Android build → APK artifact → emulator/device validation.

### Current Owner APK source verified on GitHub
- Repository: getwiredautoworx-max/get-wired-autoworx-store
- Branch: main
- Android package: za.co.getwiredautoworx.owner
- Version: 1.0.1 / versionCode 2
- compileSdk/targetSdk: 35
- minSdk: 23
- Android Gradle Plugin: 8.7.3
- Gradle: 8.10.2
- Current workflow bundles the real storefront files plus the complete assets directory into the Owner APK test assets.
- Current emulator validation checks Owner Login, Store checkout and Checkout screens.
- Current source was re-read directly from GitHub on 2026-09-28 and is the source of truth.

### Current execution blocker
- GitHub Actions remains unsuitable for current APK execution because recent runs terminate before workflow steps begin; do not treat a non-starting Actions run as an APK failure.
- Replit is the intended independent execution route, but its Agent daily allowance is currently exhausted until reset.
- No APK is to be marked as current/validated until the current source has actually built, installed and passed validation.

### Owner constraints
- User wants autonomous continuation until successful completion or genuine owner input is required.
- No routine progress notifications; report only completed milestones or genuine owner-controlled blockers.
- No Cloudflare paid credits.
- No Netlify credits.
- Do not create real customer orders during testing.
- Do not restart completed Supabase/database/catalogue work.
- Manual verification of the 4,000+ product SKU/image/description/category data remains a final task, not a prerequisite for the APK build.

### Next execution step
1. After Replit Agent allowance resets, reopen the existing workspace above.
2. Bring in/connect the actual GitHub repository source; do not recreate files manually or build a replacement app.
3. Verify the android-owner-app project is present.
4. Build the current debug APK.
5. Install on an emulator/device and run Owner Login, Store route, Checkout route and core WebView checks.
6. Preserve the resulting APK artifact and record the exact build/validation result here.
7. Only then proceed to live/customer-facing testing when the user explicitly says they are ready.
