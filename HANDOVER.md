# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-16

## SOURCE OF TRUTH
- GitHub repository: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Current main HEAD at this handover update: `02a96c26631d28e9b11b35b03a8cff743f230a1a`
- Known Netlify site: `get-wired-autoworx-store.netlify.app`
- Store is currently being run through Cloudflare temporarily.
- Do not redesign the approved storefront unless explicitly requested.
- **NO CLOUDFLARE CREDITS.**
- **NO NETLIFY CREDITS.**
- Never ask for or expose passwords, private keys or secrets.

## CURRENT BUILD STATUS
The database, catalogue, approved customer storefront, product-detail experience, image workflow, cart, checkout/order creation and authenticated admin order-management source are substantially complete.

Source-level and automated browser verification are now confirmed. The next explicit verification target remains **actual live public deployment/browser verification**. Source-level readiness must not be described as live-site verification.

## LATEST VERIFIED PROGRESS
- Current `main` was fetched and verified before this update.
- Latest storefront smoke run: `35139606426`.
- Smoke job: `104941519746`.
- Smoke result: **SUCCESS** with `STOREFRONT_SMOKE_PASS`.
- Smoke covered mobile storefront entry, category rendering, specials/featured rendering, product-detail modal open/close, add-to-cart, checkout navigation, checkout name/phone fields, and a desktop viewport switch.
- Repository search found no documented Cloudflare hostname/configuration.
- Known Netlify production deploy remains stale relative to current source and was not refreshed because no Netlify credits may be used.
- Direct public Netlify fetching was not available through the current web/runtime fetch paths, so the store is **not live-verified**.

## COMPLETED BUILD WORK
1. Customer storefront QA — completed at source/automated QA level.
2. Product-detail and image behaviour — completed/verified.
3. Search and category filtering — completed/verified.
4. Cart behaviour — completed/verified; checkout access added through `store.html`.
5. Mobile layout — completed/verified from responsive CSS and smoke-test design.
6. Customer checkout/order flow — completed with `checkout.html` and `public.create_store_order`.
7. Admin/order management — completed with authenticated admin RPCs.
8. Payment/delivery workflow — completed for EFT/manual-payment/cash-on-pickup and delivery/pickup capture.
9. Image cleanup — GitHub Actions runs succeeded; 800 images processed and no duplicate image commit was needed.
10. Stock initialization — completed and verified.
11. Security hardening — legacy anonymous execution grants were removed from old admin RPC overloads and internal pricing/import SECURITY DEFINER RPCs; authenticated execution was retained.

## NEXT SESSION — DO THIS FIRST
1. Fetch and verify the current `main` HEAD and file state.
2. Check the latest GitHub Actions runs, especially storefront smoke testing and image cleanup.
3. If storefront smoke testing failed, inspect logs, fix only the confirmed defect, and rerun the smoke test.
4. Read-only inspect the public storefront URL. Known Netlify URL: `https://get-wired-autoworx-store.netlify.app`.
5. Determine whether a Cloudflare public hostname is documented in the repository/configuration. Do not spend Cloudflare credits.
6. Where accessible, verify homepage, live catalogue loading, category filtering, search, product detail, cart, checkout route, mobile layout and WhatsApp/contact links.
7. Compare public deployment behaviour with the current GitHub source where possible.
8. If the live deployment is stale and refreshing it would consume Netlify/Cloudflare credits, **do not deploy**. Record that the source is ready and deployment remains pending an authorized credit-free path.
9. Update `LIVE_READINESS.md` and this handover with actual verified results.
10. Only call the store **live-verified** after genuine public deployment verification.

## COMPLETE CREDIT-FREE WORK STILL AVAILABLE
### Storefront / UX
- Full source audit and bug fixing.
- Automated browser smoke tests through GitHub Actions.
- Desktop and mobile responsive QA/fixes.
- Search, category navigation and filtering improvements.
- Product-detail modal/content/image improvements.
- Cart quantity/removal/total/persistence improvements.
- Checkout validation, errors and confirmation improvements.
- WhatsApp order handoff improvements.
- Accessibility: labels, keyboard navigation, semantic HTML and readability.
- Performance: image loading, lazy loading and frontend efficiency.
- Customer-facing copy and branding consistency review.

### Catalogue / products
- Audit missing names, prices, categories, images, specifications and compatibility.
- Duplicate/near-duplicate SKU review where data permits.
- Product description/specification validation.
- Vehicle compatibility/application validation.
- Image coverage/problem-image audit.
- Product merchandising and category improvements.
- Pricing review using the established pricing rules and current South African retail-market evidence when requested.

### Checkout / admin / database integration
- End-to-end order-flow testing.
- Delivery/pickup rules and messaging review.
- Payment-method/pending-payment handling improvements.
- Order-confirmation improvements.
- Admin status/payment-reference/internal-note workflow improvements.
- Supabase RPC/security/integration audit.
- Additional safeguards only when supported by a confirmed requirement.

### Deployment / production preparation without credits
- Repository/source readiness audit.
- CI and browser-test readiness.
- Read-only public deployment inspection.
- Source-versus-deployment comparison.
- Credit-free deployment checklist/package preparation.
- No Netlify or Cloudflare deployment solely to refresh a stale site when credits would be consumed.

### Later production/commercial work, only when an authorized deployment/payment path exists
- Final production domain/hostname configuration.
- Production deployment.
- Real payment gateway integration.
- Production delivery-fee rules.
- Transactional email/SMS/WhatsApp automation.
- Analytics/conversion tracking.
- SEO metadata, sitemap and search-engine indexing.
- Production security/privacy/legal hardening.
- Final live checkout/payment testing.

## DATABASE / SUPABASE STATUS — DO NOT REBUILD
Supabase database setup was already completed and should not be repeated unless a confirmed defect requires it.

Seven public tables exist:
- `categories`
- `customers`
- `order_items`
- `orders`
- `products`
- `store_settings`
- `vehicle_compatibility`

RLS is enabled on all seven tables.

### Stock — verified
- 4,198 active products.
- 4,188 unique priced SKUs.
- 0 uncategorized products.
- 4,162 products at stock quantity 5.
- 0 products at zero stock.
- Total stock: 27,847 units.
- 4,154 previously zero-stock products were set to 5; eight were already at 5. Existing stocked quantities were preserved.

### Security advisor status
- Supabase security advisor currently reports four public import/staging tables with RLS disabled: `asc_stock_verification`, `buyers_guides_import_staging`, `catalog_import_runs`, `catalog_full_import_payload`.
- It also reports internal tables with RLS enabled but no policies, including the seven store tables and import/runtime tables. These have not been changed automatically because they may be internal/service-role workflows and policy changes without confirmed requirements could break legitimate operations.
- Anonymous execution was explicitly removed from legacy admin RPC overloads and internal pricing/import SECURITY DEFINER functions. Re-check confirmed `anon_execute = false` and `authenticated_execute = true` for those functions.
- `create_store_order` remains executable anonymously by design because the customer checkout is public; it validates inputs and re-reads DB product prices before creating an order.
- Supabase Auth leaked-password protection remains a configuration warning and has not been changed in this continuation.

## CHECKOUT / ORDER FLOW
`checkout.html`:
- Verifies active product data/prices from Supabase before submission.
- Captures customer name, phone, email, fulfilment, address/province/postal code and notes.
- Fulfilment: nationwide delivery or pickup.
- Delivery channels: Courier Guy or PEP PAXI.
- Payment: EFT/bank payment, manual payment arrangement, cash on pickup.
- No card details are collected.
- Calls `public.create_store_order`.
- Database function re-reads active product rows and uses DB prices, not browser prices.
- Order and order-item creation occurs inside the database function.
- Payment status starts `pending`; order status starts `pending`.
- Existing identity/default is used for order numbers.
- Order function was repaired to match the actual `customers.name` schema.
- QA order transaction was successfully created and rolled back; no test order remained.
- Delivery fee is confirmed by the store rather than invented by the storefront.

## ADMIN / ORDER MANAGEMENT
- `admin.html` uses Supabase Auth magic-link login.
- `assets/admin.js` loads orders through authenticated admin RPC.
- Admin can filter order/payment status.
- Admin can update order status, payment status, payment reference and internal notes.
- Admin can contact customers through WhatsApp.
- Anonymous execution of admin listing/update RPCs is now revoked for all current and legacy overloads.
- Authenticated execution is allowed, with the RPC enforcing the store-admin allowlist.
- Do not expose admin credentials or secrets.

## STOREFRONT FILE STRUCTURE
- `index.html` routes to `store.html`.
- `store.html` wraps the approved `index-new.html` and exposes CHECKOUT when the browser cart contains items.
- `index-new.html` = approved main customer storefront.
- `checkout.html` = customer checkout.
- `admin.html` + `assets/admin.js` = authenticated admin order management.
- `assets/products/<SKU>.jpg` = product image convention.

Storefront includes:
- live Supabase catalogue loading
- category grid
- featured/specials products
- search
- product-detail modal
- SKU/price/application/specification information
- cart
- WhatsApp ordering
- responsive mobile layout
- checkout entry point

## IMAGE CLEANUP — VERIFIED
- Workflow: `.github/workflows/clean-product-images.yml`.
- Successful runs include `35137846265` / job `104934601924` and later `35138859298`.
- Processed 800 images.
- Final commit step reported `No image changes to commit`; committed image set already matched the cleaned output.
- Do not rerun image cleanup unless a specific image problem is identified.
- No Cloudflare or Netlify credits were used.

## CATALOGUE SOURCE / HISTORICAL WARNING
- Catalogue source: September Buyer's Guide.
- Validated staging source previously used: `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv`.
- That staging set contained 18 columns, 800 unique SKUs, 791 fixed-price products and 9 system-dependent/asterisk-priced products with blank cost/selling price.
- **DO NOT USE THE OLD 1,109-ROW CSV.** It contained incorrect product/SKU/price pairings.
- Do not infer missing prices or compatibility when the source does not establish them.

## PRICING RULE
Established business pricing formula:
- cost × 1.15 VAT × 1.35 markup
- Display VAT-inclusive retail pricing.
- Where requested, validate against current South African online/retail market pricing so prices are not unrealistically low.

## BRAND / BUSINESS REQUIREMENTS
Business: **Get Wired AutoWorx**

Contact:
- CALL / WHATSAPP 074 4884 234
- 29 Wattlebrook Crescent, Brookdale, Phoenix, Durban
- Pick up available
- Nationwide delivery via Courier Guy or PEP PAXI
- Best prices, best products, guaranteed.

Customer-facing requirements:
- 4.7★ Google Rating, **without review count**.
- PRODUCT SPECIFIC WARRANTY.
- Brand New • OEM Quality Replacement Parts may be used where appropriate; do not claim products are original OEM manufacturer parts unless verified.
- Primary focus is product sales.
- Installation wording: `Installation Services Available`.
- Use `Spares & Accessories`.
- Category strip: `Auto Electrical / Sound / Security / Spares & Accessories`.
- No Twitter/X or TikTok.

## PRODUCT IMAGE / ARTWORK REQUIREMENTS
For future product ads/catalogue artwork:
- Use supplied product photos as the primary reference.
- Clean/improve poor product images where appropriate.
- Better online product references may be used when the supplied image is inadequate.
- Compatible vehicle imagery/backgrounds may be added where appropriate and reliably verified.
- Never leave overlap or elements from another advertisement.
- Do not expose supplier/reference numbers on artwork.
- Customer-facing part numbers may be shown only when verified and appropriate.
- Do not describe products as original OEM manufacturer parts unless independently verified.

## PAYMENT / DELIVERY BOUNDARY
- Current production-safe workflow: EFT/manual payment/cash on pickup.
- Payment remains pending until store confirmation.
- No gateway credentials are stored or exposed in browser code.
- Delivery/pickup selection and address data are recorded with the order.
- Delivery fee is confirmed by the store.
- Future payment gateway integration should keep merchant secrets server-side.

## HISTORICAL BUILD CONTINUATION RULE
The original project direction was to move away from repeated database/RLS inspection and focus on the actual customer-facing store: homepage, categories, product search/grid, product pages/details, cart, checkout, then order/payment/admin and final polish. The database is already established. Continue from the current source rather than restarting that sequence.

## FINAL RULE
**Continue from this handover. Do not restart completed database work, do not use the obsolete 1,109-row CSV, do not spend Cloudflare or Netlify credits, and do not claim live verification unless it has actually been performed.**
