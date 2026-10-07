# GET WIRED AUTOWORX ONLINE STORE — HANDOVER / CONTINUE FROM HERE

## STATUS
Updated: 2026-09-19
Repository: `getwiredautoworx-max/get-wired-autoworx-store`
Default branch: `main`
Supabase project: `ojytykqpvonxvepprgbh`

The existing storefront remains the foundation. No rebuild of the preferred storefront design was performed.

Current deployment platform: **Cloudflare**. Cloudflare credits are reserved and have not been used during this QA continuation. GitHub `main` remains the source of truth. Netlify is legacy/reference only for this project.

## THE 8 PERMANENT RULES

1. Preserve existing store as foundation; do not rebuild unnecessarily or overwrite working components.
2. Execute efficiently in one flow; complete all available tasks instead of stopping after every individual step.
3. Only interrupt when genuinely necessary; notify user when input/approval/credentials/permissions are actually required.
4. The 8 rules are permanent; read at start of every continuation session and carry into every new handover.
5. All 8 rules must be copied unchanged into every new handover; may not be omitted/edited/removed without permission. If rules themselves edited/removed, reproduce all 8 first.
6. Do not use Cloudflare or Netlify credits until final testing; reserve credit-dependent work for end-stage testing/deployment.
7. Update master handover after every successfully completed task so next session continues from exact current state.
8. Maintain project continuity and authority; existing work, decisions, data, structure and approved requirements remain in force unless user explicitly authorizes change; do not assume changes that could interfere with online store.

## CURRENT VERIFIED DATABASE STATE — 2026-09-19

Direct Supabase verification shows:
- 4,187 active products.
- 4,187 active priced products.
- 4,187 unique active SKUs.
- 4,187 active products with stock quantity > 0.
- 4,187 active products with an `image_url` value.
- 3,396 of those image URLs are the deliberate branded `/assets/product-placeholder.svg` fallback.
- 791 active products therefore have product-specific image URLs.
- All 4,187 active product prices currently match the approved `cost_price × 1.15 × 1.35` calculation when rounded to 2 decimals.

Do not interpret the placeholder count as verified product imagery. A placeholder is not a product photograph.

## STOREFRONT DESIGN / ROUTING

- `index.html` continues to route to `store.html`.
- `store.html` continues to load `index-new.html` as the customer storefront.
- Existing dark blue/red automotive storefront, GW logo, category system, product grid, search, cart and product-detail flow remain intact.
- No unnecessary redesign/rebuild is authorised.

## CATALOGUE / IMAGE RULES

- The customer-facing PDF catalogue is separate from the live storefront work.
- Catalogue has no stock quantity/stock number.
- Catalogue must show customer-facing product information only: product image, product name/description, GW SKU, verified vehicle/application where available, final advertised selling price and GW branding/watermark.
- Never show supplier cost, original supplier price, internal stock number or unverified application.
- For store product images, only exact SKU-verified images may replace the branded placeholder. Never substitute a visually similar product.
- Existing `clean-product-images.yml` remains preserved for the supplied image package and creates consistent 1200x1200 ecommerce images.
- `assets/product-image-fallback.js` uses a verified SKU-named local asset only when present and fails closed when absent.
- Do not claim the image project is complete while 3,396 active products still use placeholders.

## PRICING / CHECKOUT

- Approved customer price formula remains cost excluding VAT × 1.15 VAT × 1.35 markup.
- Customer delivery is **R15.00 per delivery address/order**, not per item.
- Phoenix Plaza is internal dispatch reference only and must not be presented as a customer collection location.
- `checkout-v2.html` is the active checkout route.
- Payment methods remain EFT/manual payment/cash-on-pickup with payment pending until Get Wired AutoWorx confirms payment.

### 2026-09-19 SERVER-SIDE DELIVERY FIX — COMPLETED

The Supabase `create_store_order` function was updated through migration `enforce_fixed_r15_delivery`.
- Delivery fee is now server-enforced at **R15.00** regardless of any client-supplied delivery-fee value.
- The order total is calculated from the verified product prices plus the fixed R15 fee.
- Function definition was re-read after migration and confirmed to contain `v_fee numeric := 15.00` and write that fee to the order.

This prevents a modified client from bypassing or changing the required R15 delivery charge.

## SECURITY / PERFORMANCE QA

- Supabase security advisor currently reports RLS-enabled internal tables without policies and several SECURITY DEFINER functions. These findings should not be changed blindly because the access model for the import/admin/order workflow must be preserved.
- `create_store_order` intentionally remains SECURITY DEFINER because public checkout must create orders while the exposed data tables have restrictive RLS. Its function body validates customer/cart/payment inputs and now server-enforces R15 delivery.
- Supabase performance advisor reports unused/duplicate indexes. Do not remove them without query-plan testing; duplicate indexes are not a storefront blocker.
- Leaked-password protection remains a Supabase Auth configuration warning and should be enabled before final production hardening.

## DEPLOYMENT CONSTRAINT

- Repository/source readiness is verified.
- Netlify deployment must not be triggered because Netlify credits are reserved/not to be used.
- Cloudflare deployment/testing must not be triggered until final live testing is authorised and the existing Cloudflare project/URL is accessible.
- The public site has not been independently browser-verified from this environment; do not claim it has.

## CURRENT NEXT WORK

1. Continue exact SKU-based image coverage using the supplied buyers guides and approved image sources. Target the remaining 3,396 placeholder products; never guess an image.
2. Verify category/subcategory/product navigation against the 4,187 active products.
3. Verify specials/featured products remain homepage-only as required and do not contaminate category pages.
4. Re-run source-level checkout QA after the R15 server-side fix.
5. Perform final live Cloudflare Android/desktop testing only when the existing live URL/project is available and deployment testing is authorised.
6. Complete PayFast/payment automation only after storefront approval.
7. Complete supplier-order/courier automation only after payment flow approval.

## IMPORTANT PRESERVATION NOTES

- Do not use the old 1,109-row CSV.
- Do not automatically reassign the protected manual-review products.
- Do not replace the preferred storefront with a different template merely to solve one issue.
- Do not expose Phoenix Plaza as a customer collection address.
- Do not charge R15 per item.
- Do not use Netlify/Cloudflare credit-dependent work before final testing.
- Do not introduce third-party data sharing without explicit owner approval.


## 2026-10-02 — PAXI PORTAL / CHECKOUT INTEGRATION CONTINUATION
- [x] Verified from PAXI's current official business documentation that PAXI provides an official Point Locator widget and API integration path for online stores. The published locator iframe is suitable for the current storefront without requiring PAXI API credentials.
- [x] Added the official PAXI Point Locator iframe to `checkout-v2.html`, using PAXI's published locator endpoint and retaining the existing storefront design and R15 customer delivery-charge rule.
- [x] Added checkout guidance instructing customers who choose PAXI to select a destination point and enter the PAXI Point name/code in Order notes for order capture. No unverified Phoenix Plaza/PAXI point code was hard-coded.
- [x] Commit: `d04d5af948dfed02bcb6eea9f51936b3f6cca18b`.
- [x] PAXI's official documentation confirms published bag limits/pricing: Standard up to 5kg; Large up to 10kg; 3–5 business days and 7–9 business days options. API access is provider-gated and PAXI states a minimum monthly parcel volume applies.
- [ ] PAXI authenticated portal/API credentials cannot be read or extracted through the public web session. The supplied portal URL is reachable, but the authenticated dashboard contents are not exposed to this environment. Do not invent or request credentials in source code.
- [ ] Next PAXI integration step when account/API access is available: obtain the official API integration specification/credentials from PAXI, then implement server-side point selection/order registration/tracking and persist the PAXI point/reference against the order. Keep secrets server-side only.
- [x] No Cloudflare or Netlify deployment/credits used during this pass.


## 2026-10-02 — PAXI API ACCESS BLOCK BYPASSED WITH ZERO-CREDIT PORTAL WORKFLOW
- [x] Re-verified PAXI's official business tools: PAXI confirms that API integration exists but requires qualification/contact with PAXI; the public site does not expose the authenticated API specification or credentials. citeturn2view1
- [x] Implemented an immediate zero-credit operational fallback in the owner/admin order screen: **PAXI REGISTRATION** now loads the complete order/customer/address/PAXI-point/order-item registration pack, copies it to the administrator clipboard, and opens the authenticated PAXI Portal.
- [x] This avoids retyping customer/order data into the PAXI Portal while keeping PAXI credentials outside the storefront and repository.
- [x] Verified the new admin code exists on GitHub main.
- [x] Commit: `bc1ad0f8b5c9d56537b7fc5a83e2512c81bc7f16`.
- [ ] Final fully automatic API booking remains provider-gated. PAXI's official site explicitly directs businesses to contact PAXI for API integration and states a minimum monthly parcel qualification applies. citeturn2view1
- [ ] Once PAXI supplies API access/specification, replace the portal handoff with server-side booking/tracking while retaining the same order data and no browser-side secrets.
- [x] No Cloudflare or Netlify credits used.

## 2026-10-07 — AXXESS XS LINUX HOSTING ACTIVATED / NEW PRIMARY STATIC HOSTING ROUTE

- [x] Axxess **XS Linux Hosting DirectAdmin** service is active for **getwiredauto.co.za**.
- [x] Axxess account panel shows service created **2026-10-07**, next renewal **2026-11-01**.
- [x] Hosting allocation currently shown by Axxess: **2.00 GB hosting space**, 5 MySQL databases, 75 email accounts, 75 mail lists, 10 auto-responders, 2 FTP accounts, 1 subdomain.
- [x] Axxess hosting hostname: **dahost11.vpslocal.co.za**; server IP: **156.155.252.98**.
- [x] Axxess nameservers supplied for this hosting: **ns1.clusterdns.co.za (41.76.111.83)** and **ns2.clusterdns.co.za**.
- [x] Repository `CNAME` already contains **www.getwiredauto.co.za**, so the repository's intended custom-domain hostname matches the Axxess-hosted domain.
- [x] Current storefront remains a static HTML/JS site using the live Supabase project `ojytykqpvonxvepprgbh`; Axxess does not replace or migrate Supabase.
- [x] Axxess is now the preferred **zero-Cloudflare-credit hosting path** for the storefront. Cloudflare remains available as a fallback/staging path and is not to be used for this Axxess deployment.
- [x] Axxess official help confirms DirectAdmin supports File Manager/FTP and that website files normally live under the domain's `public_html` directory.
- [x] Axxess official SSL guidance confirms free automatic Let's Encrypt SSL is available in DirectAdmin and supports forcing HTTPS.
- [ ] User-side Axxess action still required: open **Hosting Control Service Panel / DirectAdmin**, confirm the domain's document root and open File Manager. Do **not** send passwords or credentials into chat.
- [ ] Upload the approved storefront files from GitHub `main` into the Axxess domain's `public_html` document root, preserving the existing `assets/`, `functions/`, JavaScript, HTML and support files required by the current storefront.
- [ ] After upload, enable/verify the Axxess free Let's Encrypt certificate for both the apex domain and `www`, then force HTTPS.
- [ ] Browser QA after DNS/SSL is live: homepage, categories, vehicle finder, product details, cart, checkout-v2, Supabase product loading, supplier-source request, WhatsApp links, and mobile layout.
- [ ] Confirm customer delivery wording is the approved current business rule before final launch. The historical handover entries before this update contain older delivery values and must not override the latest owner-approved delivery/packaging terms.
- [ ] The current owner-approved physical-order wording for the storefront must remain: **pickup from the owner's premises has no pickup charge; delivery is quoted according to the selected courier/PAXI option and is subject to quotation; packaging is R25 per item**. Do not reintroduce R15 delivery as the current business rule.
- [ ] Preferred future brand/domain concept `gwautostore.co.za` remains separate from the currently active Axxess service `getwiredauto.co.za`; do not change domains without explicit owner approval.

## 2026-10-07 — FINAL AXXESS DEPLOYMENT CHECKPOINT

- [x] Master handover Axxess section committed at **abff3f24b5b076bd76aaf4c7e82a8766589af42d**.
- [x] `DEPLOYMENT_NOTE.md` updated to make Axxess the current hosting route and to replace obsolete fixed-R15 deployment wording with the owner-approved current checkout rules; commit **194e715d7e746aae52dc83a7ea6ea76c3ee84904**.
- [x] `checkout-v2.html` source rechecked on GitHub main and confirmed: pickup has no delivery charge, packaging is R25 per item, delivery is separately quoted by courier/PAXI, and delivery orders require quotation confirmation.
- [x] No storefront database migration or product-data mutation was performed during the Axxess hosting setup.
- [x] No Cloudflare deployment was triggered by these documentation-only commits because the Cloudflare workflow path filters do not include Markdown-only changes.
- [x] No Netlify deployment was triggered.
- [ ] Remaining physical action is the Axxess DirectAdmin upload/SSL setup and public-browser QA. This requires access through the user's authenticated Axxess control panel; credentials must not be shared in chat.
