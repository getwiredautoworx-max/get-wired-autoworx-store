# GET WIRED AUTOWORX ONLINE STORE — HANDOVER / CONTINUE FROM HERE

## STATUS
Updated: 2026-10-09
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


## 2026-10-07 — AXXESS CONTROL PANEL ACCESS CONFIRMED

- [x] User has successfully entered the Axxess **XS Linux Hosting DirectAdmin control panel** for `getwiredauto.co.za`.
- [x] Control panel account overview confirms: Disk Space **0 B / 2 GB**, Bandwidth **0 B / Unlimited**, Inodes **0 / Unlimited**, E-mails **0 / 75**, FTP Accounts **0 / 2**, Databases **0 / 5**.
- [x] This confirms the hosting account is provisioned and the control panel is accessible.
- [ ] Next physical action: use the control panel **Menu** to locate **File Manager** and open the domain's `public_html` document root.
- [ ] Do not create an FTP user or database for the storefront upload unless a later step specifically requires it.
- [ ] Do not send Axxess passwords, FTP credentials, or other secrets into chat.


## 2026-10-07 — AXXESS PUBLIC_HTML INSPECTED / READY FOR STOREFRONT UPLOAD

- [x] User opened DirectAdmin System Info & Files → File Manager.
- [x] User located the domain folder Get Wired Auto.co.za and opened it.
- [x] User opened the domain's public_html document root.
- [x] Current fresh document root contains only the default cgi-bin folder and default index.html placeholder.
- [x] cgi-bin must be preserved; it is not part of the storefront replacement.
- [x] GitHub main source was independently re-read before upload planning. Current verified entry flow remains index.html → store.html → index-new.html; checkout-v2.html is present; CNAME contains www.getwiredauto.co.za.
- [x] Current store.html explicitly references required local assets/scripts including assets/product-image-fallback.js, assets/category-cleanup.js, assets/progressive-store-enhancements.js, and category-navigation.js; therefore the storefront must be uploaded with its supporting asset/script files, not only index.html.
- [ ] Do not delete cgi-bin.
- [ ] Next physical deployment action: obtain the current GitHub main storefront package and upload the required website files/folders into this public_html, replacing the default placeholder index.html only as part of the complete storefront upload.
- [ ] Do not upload repository-only documentation, .git data, GitHub workflow files, or unrelated development files into public_html.
- [ ] After upload, verify file paths and public site response before SSL/HTTPS configuration.


## 2026-10-07 — OWNER APK BUILD + EMULATOR VALIDATION VERIFIED SUCCESSFULLY

- [x] Re-located the dedicated APK repository: `getwiredautoworx-max/get-wired-autoworx-owner-apk-validation`. It is public, active, and has the Owner APK workflow.
- [x] Latest Owner APK workflow run **#44** completed successfully on 2026-10-07.
- [x] Latest commit: `cbbbce20eb92e4adae0776c1a77823eb46b97d09` — **Fix emulator smoke test install order**.
- [x] Build job completed successfully: debug APK built and checksum recorded.
- [x] Emulator job completed successfully. The Android emulator smoke test itself completed successfully after the install-order fix.
- [x] This is the first current-turn verification that BOTH the APK build and emulator smoke test have passed in the same workflow run.
- [x] GitHub Actions artifact `get-wired-owner-debug` exists and is not expired. Artifact ID: `11493167703`.
- [x] Artifact SHA-256 digest recorded by GitHub: `2d151aa2a4d713f33f7512e0d6fe7c06eab4522c69d42acb17fa8b80f569b534`.
- [x] Artifact was downloaded successfully into the working environment as `get-wired-owner-debug.zip` for APK extraction/owner testing.
- [x] The artifact is currently scheduled to expire **2027-01-05** unless retained/replaced by GitHub according to its artifact policy.
- [x] Previous failed run #43 is superseded by successful run #44; no further fix is required for the specific emulator install-order failure.
- [ ] Extract the APK from the validated artifact and perform final user-device installation/testing. This is the next owner-facing APK step.
- [ ] Final owner-device validation should cover login/authentication, owner dashboard, product/catalogue management, order/customer views, supplier/reference workflow, and connection to the canonical storefront/Supabase environment as implemented.
- [ ] Do not claim the APK is fully production-ready until the APK has been installed and exercised on the owner's Android device.
- [x] No Replit credits used for this successful build/validation path.

## 2026-10-07 — CURRENT PRIORITY ORDER AFTER APK VALIDATION

1. [x] APK build + emulator smoke validation — completed successfully.
2. [ ] Deliver/extract validated APK for owner Android-device testing.
3. [ ] Complete Axxess `public_html` storefront upload while preserving `cgi-bin`.
4. [ ] Configure/verify Axxess Let's Encrypt SSL and HTTPS.
5. [ ] Perform public storefront browser QA on Android and desktop.
6. [ ] Test APK against the live storefront/backend after Axxess DNS/SSL is confirmed.
7. [ ] Complete payment automation (PayFast) after storefront approval.
8. [ ] Complete supplier/courier automation after payment-flow approval.
9. [ ] Continue exact SKU image/category QA; never guess product images or fitment.

## 2026-10-07 18:20 SAST — FINAL AUTOMATED CHECKPOINT
- [x] Owner APK Run #44 independently verified terminal SUCCESS: build + Android API 35 emulator install/launch smoke test.
- [x] Validated APK artifact remains active in GitHub Actions: `get-wired-owner-debug`, artifact ID `11493167703`, SHA-256 `2d151aa2a4d713f33f7512e0d6fe7c06eab4522c69d42acb17fa8b80f569b534`.
- [x] Supabase project `Store` independently rechecked as ACTIVE_HEALTHY; all inspected public tables have RLS enabled.
- [x] Supabase security advisor currently has one WARN only: leaked password protection disabled. No unsafe database mutation was made; enabling this is a Supabase Auth dashboard/provider setting.
- [x] Performance advisor findings are INFO-level unused-index notices; no indexes were removed because they span current/future quote/payment infrastructure.
- [x] Expected store Edge Functions are present, including shipping-quote, store-checkout, payment-gateway and get-wired-store.
- [x] GitHub Pages staging remains excluded from the production path; its historical failure is repository Pages-site provisioning/permission related, not storefront code.
- [ ] Axxess XS `public_html` upload + SSL/public-browser verification remains the only hosting gate that requires authenticated control-panel access not exposed to this session.
- [ ] Live Owner login, controlled order/payment reconciliation and physical Android-device acceptance remain owner-input gates; no credentials or payment data are fabricated or bypassed.
- [x] No Replit, Cloudflare or Netlify credit-dependent deployment was initiated during this checkpoint.


## 2026-10-07 — NEW-CHAT HANDOVER CHECKPOINT / CONTINUATION BASELINE

This section is the authoritative continuation point for the next chat. Historical sections above are retained for audit history; where older entries conflict with later owner-approved rules, the latest checkpoint below controls.

### CURRENT VERIFIED STATE
- [x] Owner APK Run #44: terminal SUCCESS — build + Android API 35 emulator install/launch smoke test.
- [x] Owner APK artifact: `get-wired-owner-debug`, GitHub artifact ID `11493167703`, SHA-256 `2d151aa2a4d713f33f7512e0d6fe7c06eab4522c69d42acb17fa8b80f569b534`.
- [x] Validated APK ZIP was downloaded from GitHub Actions into the working environment as `/mnt/data/get-wired-owner-debug.zip` for extraction/testing.
- [ ] Physical Android-device installation and acceptance testing remain outstanding.
- [x] Owner APK canonical WebView/admin route is `https://www.getwiredauto.co.za/admin.html`; the obsolete `getwiredautoworx.co.za` route was corrected before Run #44.
- [x] Supabase store project `ojytykqpvonxvepprgbh` is ACTIVE_HEALTHY; inspected public tables have RLS enabled.
- [ ] Supabase Auth leaked-password protection remains the one current security-advisor WARN and requires dashboard/provider configuration; do not make unrelated database changes to address it.
- [x] Expected store Edge Functions remain present, including `shipping-quote`, `store-checkout`, `payment-gateway`, and `get-wired-store`.
- [x] No Replit, Cloudflare, or Netlify credit-dependent deployment was used for the current checkpoint.

### AXXESS — CURRENT PRODUCTION PATH
- [x] Axxess XS Linux hosting for `getwiredauto.co.za` is provisioned and DirectAdmin access is confirmed.
- [x] Domain `public_html` was inspected and currently contains only the default `cgi-bin` directory and placeholder `index.html`.
- [ ] Upload the complete approved storefront from GitHub main into `public_html`; preserve `cgi-bin` and do not upload `.git`, GitHub workflow files, documentation, or unrelated development files.
- [ ] Enable/verify free Let's Encrypt SSL for the domain and `www`, then force HTTPS.
- [ ] Public browser verification after DNS/SSL: homepage, navigation/categories, vehicle finder/fitment, product detail, cart, checkout-v2, Supabase catalogue loading, WhatsApp links, and mobile/desktop layout.
- [ ] Do not claim the Axxess site is live until the public URL is directly verified.

### CURRENT CUSTOMER ORDER RULES — AUTHORITATIVE
- Pickup from the owner's premises: **FREE / no pickup charge**.
- Delivery: **charged according to the selected courier/PAXI quotation and subject to quotation**; no fixed R15/R35 delivery fee is current.
- Packaging: **R25 per item**.
- Full payment confirms the order.
- Do not reintroduce historical fixed-delivery values from older handover sections.

### CURRENT RELEASE ORDER
1. Axxess storefront upload.
2. Axxess SSL/HTTPS.
3. Public Android + desktop storefront QA.
4. Install/test validated Owner APK on physical Android device.
5. Test Owner APK against the live storefront/Supabase backend.
6. Controlled checkout/order/payment reconciliation using approved owner test details.
7. PayFast automation after storefront approval.
8. Supplier/courier automation after payment-flow approval.
9. Continue exact SKU image/category verification; never guess product images or fitment.

### TRUE OWNER/AUTHENTICATED GATES
Only these items currently require owner-side access or physical resources:
- Axxess authenticated File Manager upload + SSL configuration.
- Physical Android device for APK acceptance.
- Authorised Owner/admin credentials for live login testing.
- Approved controlled payment/test-order details for payment reconciliation.

Do not ask the owner to repeat already completed technical work. Continue all independent GitHub/Supabase/source QA first, then request only the specific owner action required for the next gate.

### NEXT-CHAT INSTRUCTION
Start from this checkpoint. Do not restart the project, rebuild the storefront unnecessarily, redo completed catalogue/database work, use the old 1,109-row CSV, consume Replit/Cloudflare/Netlify credits, or claim Axxess deployment/live testing until directly verified. The immediate priority is to get the complete storefront package into Axxess `public_html`, preserving `cgi-bin`, then verify SSL and the public site.

## 2026-10-07 — AUTOMATED TASKS 2/3/4/7/8 CONTINUATION CHECKPOINT

### Task 2 — Automated production/source QA
- [x] Added `.github/workflows/store-production-qa.yml`.
- [x] Automated checks cover required storefront files/routes, obsolete-domain references, current pickup/delivery/packaging wording, active catalogue accessibility, zero uncategorized active products, zero null image URLs, zero null prices, and public-source security boundaries.
- [x] Workflow is source-controlled on main; live public-browser verification remains a separate Axxess gate.

### Task 3 — Checkout automation verification
- [x] Re-read live Supabase `store-checkout` Edge Function: ACTIVE, version 1.
- [x] Confirmed checkout function accepts only the intended order fields, validates customer name/cart size, and delegates authoritative order creation to `public.create_store_order`.
- [x] Re-read live `shipping-quote` Edge Function: ACTIVE, version 2.
- [x] Confirmed delivery quotation flow supports live configured courier rates plus published PAXI options, with provisional-weight labelling when product weights are unavailable.
- [x] Confirmed current checkout source enforces quotation-before-submit for delivery and server-side pricing/order validation remains authoritative.
- [ ] No real customer order was created during this verification.

### Task 4 — Owner APK release automation
- [x] Owner APK source now has a release signing configuration driven only by runtime CI environment variables; no signing password/key was committed.
- [x] Owner APK workflow now contains a `signed-release` job that generates a temporary CI signing keystore, builds `assembleRelease`, verifies the APK with `apksigner`, records SHA-256, and uploads `get-wired-owner-signed-release`.
- [x] Existing Run #44 debug/emulator-success artifact remains authoritative for the previous validation.
- [ ] Physical Android installation/acceptance of the new signed release remains owner-device testing.

### Task 7 — Catalogue/image automation
- [x] Existing exact-SKU catalogue image audit workflow was re-hardened.
- [x] Image audit now runs on product-image changes and on a daily schedule, uses the modern Supabase publishable key, has read-only GitHub permissions, validates public SKU/image-reference integrity, and uploads an audit report.
- [x] Current Supabase image audit: 4,187 active products; 792 product-image function references; 3,395 branded placeholders; 0 null image URLs.
- [ ] Remaining image work is exact-SKU image coverage/verification; placeholders must not be replaced by guessed images.

### Task 8 — Security automation
- [x] Supabase Security Advisor rechecked: one WARN only — leaked password protection disabled. No unsafe DB mutation was made.
- [x] Performance Advisor rechecked: INFO-only unused-index findings; no indexes removed.
- [x] Automated public-source security QA now rejects obsolete domain references and exposed supplier-cost/service-role/secret-key references.
- [ ] Leaked-password protection still requires Supabase Auth dashboard/provider configuration and is not an automated database task.
- [x] No Replit, Cloudflare, or Netlify credits used.

### ETA / LIVE STATUS
- Independent automated work for tasks 2/3/4/7/8 is now substantially complete.
- The store is **not yet live on Axxess** because `public_html` still requires the approved storefront upload and SSL/HTTPS setup.
- After Axxess upload + SSL, estimated final live QA is **1–2 hours** if DNS/SSL propagate normally and no live defect is found.
- Owner APK physical-device acceptance can run in parallel and does not need to delay the storefront once Axxess is live.
- Remaining launch gates: Axxess upload, SSL/HTTPS, public Android/desktop storefront QA, live APK/backend test, and controlled order/payment reconciliation.
### TASK ATTEMPT / RECOVERY NOTE
- [x] Image-audit workflow creation was attempted once and GitHub returned HTTP 422 because the target workflow file already existed; no duplicate file was created. Recovery: existing workflow was fetched, re-hardened, and committed successfully as `e33fa505cb298d1a1c50be03c0158f1114cb7466`.

## 2026-10-07 — HANDOVER UPDATE / LATEST CONTINUATION STATUS

- [x] Master handover refreshed after the latest task execution.
- [x] Tasks 2, 3, 4, 7 and 8 have been executed independently without waiting for Axxess confirmation.
- [x] Task 2 automated production/source QA workflow added and committed.
- [x] Task 3 live checkout/shipping Edge Functions re-read and verified; no live customer order was created.
- [x] Task 4 Owner APK signed-release CI automation added without committing any permanent signing secret or keystore.
- [x] Task 7 catalogue/image audit automation hardened and scheduled; current database image state remains 792 product-image function references, 3,395 branded placeholders, and 0 null image URLs.
- [x] Task 8 security automation hardened; Security Advisor remains WARN-only for leaked password protection, requiring Supabase Auth dashboard configuration.
- [x] One attempted duplicate image-audit workflow creation returned GitHub HTTP 422 because the workflow already existed. Recovery was completed by updating the existing workflow; recovery commit: `e33fa505cb298d1a1c50be03c0158f1114cb7466`.
- [x] Handover was updated after that failed attempt and again after the completed task sequence, preserving the failure/recovery record.

### LIVE ETA
- Store is **not live yet**.
- Axxess remains the final hosting gate: upload approved storefront to `public_html`, preserve `cgi-bin`, configure Let's Encrypt SSL/HTTPS, then perform public Android/desktop QA.
- Once Axxess upload + SSL are completed, current estimated time to live verification is **approximately 1–2 hours**, assuming normal DNS/SSL propagation and no blocking live defect.
- Owner APK physical-device acceptance and live APK/backend testing can proceed in parallel after the public site is reachable.

## 2026-10-08 — DNS-INDEPENDENT PRODUCTION CONTINUATION CHECKPOINT

### VERIFIED DATABASE / SECURITY STATE
- [x] Supabase production project ojytykqpvonxvepprgbh was rechecked directly.
- [x] Active products: **4,187**.
- [x] Active priced products: **4,187**.
- [x] Unique active SKUs: **4,187**.
- [x] Active products with null image URLs: **0**.
- [x] Active products without category: **0**.
- [x] Active pricing mismatches against cost_price × 1.15 × 1.35: **0**.
- [x] Active products using the branded placeholder image: **3,395**. Exact-SKU image coverage remains the unfinished catalogue-image task; no guessed substitutions are permitted.
- [x] Total product rows: **4,198**; distinct SKUs: **4,198**; active rows: **4,187**.
- [x] Public categories: **241 total / 157 active / 57 active top-level**. Existing category structure was not rewritten.
- [x] Category manual-review queue currently contains **198** records. These remain protected from automatic reassignment.
- [x] All inspected public production tables remain RLS-enabled.
- [x] admin_list_orders, admin_update_order, and both create_store_order overloads are not executable by anon, authenticated, or PUBLIC; privileged execution remains restricted.
- [x] Supabase Security Advisor currently reports **one WARN only: Leaked Password Protection Disabled**. No unrelated database mutation was made.
- [x] Supabase Performance Advisor currently reports INFO-only unused-index findings. No indexes were removed.
- [x] Supabase current documentation/changelog was checked before this continuation. The upcoming October 30, 2026 Data API auto-exposure enforcement concerns newly created public tables; existing tables retain their current grants. No production schema change was made because of this check.

### CHECKOUT / COMMERCIAL RULE RECONCILIATION
- [x] Re-read live store-checkout Edge Function: ACTIVE, version 1, JWT verification intentionally disabled for public checkout.
- [x] Re-read live shipping-quote Edge Function: ACTIVE, version 2.
- [x] Current active checkout-v2.html source is authoritative.
- [x] Current commercial rule is **R35.00 packaging per item**, **R0 pickup**, and **delivery charged according to selected courier/PAXI quotation and subject to quotation**.
- [x] Delivery checkout requires a quotation before a delivery order can be submitted.
- [x] Server-side order creation remains authoritative for product pricing, stock and packaging calculation.
- [x] Legacy checkout.html contained stale R25 wording and was converted to a redirect-only compatibility page to checkout-v2.html. Commit: e2a95f5e83b87d62464ac2727b45d7361394e1bf.
- [x] Checkout documentation was reconciled with the current R35 rule. Commit: 1bd92c80ded36d1471e70c794923fd13a47567a1.
- [x] No customer/order/product data was created or changed during this reconciliation.

### STOREFRONT / SEO SOURCE QA
- [x] Current route remains index.html → store.html → index-new.html; store.html exposes checkout-v2.html.
- [x] Current storefront source retains category navigation, vehicle finder/fitment, product grid, cart, product detail, fitment-help, WhatsApp and mobile controls.
- [x] robots.txt continues to allow the public storefront while disallowing admin/private development paths.
- [x] Added production SEO metadata to index-new.html: descriptive title, meta description, canonical https://www.getwiredauto.co.za/, robots directive, Open Graph title/description/url/image. Commit: 12e129c927fb0440e93aeca3c2115376d216c16d.
- [x] No deployment or credit-dependent preview was triggered.

### CURRENT REMAINING WORK THAT DOES NOT REQUIRE DNS
1. [ ] Exact-SKU product-image coverage and visual verification for the remaining **3,395** branded placeholders. Do not guess images.
2. [ ] Protected category-review queue/manual catalogue reconciliation for the **198** queued records where catalogue mapping needs human confirmation.
3. [ ] Final source-level regression of all storefront routes after the latest SEO/checkout commits; automated/live browser testing remains separate.
4. [ ] Owner APK physical-device installation/acceptance and owner-login functional test. Emulator validation is already successful; this is a genuine physical-device gate.
5. [ ] PayFast/live payment automation remains owner/provider-gated; no live payment credentials are present.
6. [ ] Supplier/courier automated registration/tracking remains provider-gated; PAXI portal fallback is already implemented.
7. [ ] Supabase Auth leaked-password protection remains an owner/dashboard configuration gate.
8. [ ] Backup/recovery confirmation and final production checklist can be completed independently; no destructive backup/index changes are required.
9. [ ] Axxess upload/SSL/public-domain browser testing remains DNS/owner-access dependent and is intentionally excluded from this DNS-independent work.

### CURRENT AUTHORITATIVE OWNER INPUTS / GATES
- Physical Android device for Owner APK acceptance.
- Owner/admin credentials when live authenticated testing is reached.
- Payment-provider credentials/merchant approval for live payment automation.
- Provider API access for fully automatic courier/PAXI registration where required.
- Axxess authenticated File Manager/SSL actions and public DNS propagation for live-domain verification.

### NO-CIRCLE / PRESERVATION CHECK
- [x] No storefront rebuild.
- [x] No catalogue re-import.
- [x] No old 1,109-row CSV use.
- [x] No blind image substitution.
- [x] No unnecessary Supabase schema/data mutation.
- [x] No unused-index removal.
- [x] No Cloudflare, Netlify or Replit credit-dependent deployment used.
- [x] Permanent 8 rules above remain unchanged and continue to govern all future sessions.

## 2026-10-08 — 8-TASK EXECUTION PASS

### 1. Exact-SKU image task
- [x] Database image invariant revalidated: 0 active null image URLs.
- [x] Current remaining branded-placeholder count confirmed at **3,395**.
- [ ] Final exact-SKU visual verification remains open because it requires reviewing the source image set against catalogue products; no automatic/guessed substitutions were made.

### 2. Category reconciliation
- [x] Category structure and protected review queue rechecked.
- [x] **198** category-review records remain protected.
- [ ] Manual confirmation is still required for those records; automatically changing them would violate the no-guessing/no-circle rule.

### 3. Final source regression
- [x] Current checkout route reconciled: legacy checkout redirects to checkout-v2.
- [x] SEO metadata committed.
- [x] robots.txt reviewed; admin/private paths remain disallowed.
- [x] Repository code search found no matches for service_role, sb_secret_, sk_live_, stale Cloudflare Pages hostname, netlify.app, or R25.
- [x] No customer data or production catalogue data changed during regression.
- [ ] Live browser regression remains blocked by DNS; source-level regression is complete for this pass.

### 4. Owner APK physical acceptance
- [x] Automated emulator validation remains authoritative: Run #50 full success.
- [ ] Physical-phone installation/login cannot be truthfully marked complete without the physical device. This is an owner-side hardware gate.

### 5. Payment automation
- [x] No live payment credentials or fake payment URL introduced.
- [ ] Live payment-provider integration cannot be completed without merchant/provider credentials and the provider's live API contract. This remains a genuine owner/provider gate.

### 6. Courier/PAXI automation
- [x] Current shipping quotation path remains intact.
- [ ] Fully automatic courier/PAXI registration/tracking cannot be completed without provider API credentials/access. PAXI/courier quotation fallback remains the safe current path.

### 7. Supabase Auth leaked-password protection
- [x] Security Advisor finding revalidated.
- [x] Supabase documentation confirms leaked-password protection is an Auth setting and is available on Pro and above.
- [ ] No account-level Auth setting was changed without owner authorization/required plan access. This remains an owner dashboard gate.

### 8. Backup/recovery
- [x] Supabase project health revalidated: **ACTIVE_HEALTHY**, Postgres 17.6.1.166.
- [x] No destructive schema/data operation was performed.
- [ ] A platform backup/restore drill cannot be truthfully marked successful from the available connector because backup/restore management is not exposed here. Axxess DirectAdmin backup confirmation also requires hosting-panel access.

### FINAL STATUS OF THIS 8-TASK PASS
- Independently executable tasks were completed/revalidated as far as available tooling permits.
- The remaining unchecked items are **not failed tasks**; they are genuine physical/provider/account-access gates.
- No DNS work was performed.
- No Cloudflare, Netlify or Replit credit-dependent work was performed.
- Master handover updated after this pass.

## 2026-10-09 — AXXESS UPLOAD PACKAGE BUILT / AWAITING USER UPLOAD

- [x] GitHub Actions workflow “Prepare Axxess upload package” run #4 completed successfully in 15 seconds.
- [x] Commit: `b5f66a666d369502201c2a76ef4387e0a2d2d7de`.
- [x] Artifact: `axxess-storefront-upload`, 54.7 MB.
- [x] Artifact SHA-256 shown by GitHub: `5f12833d18707e27af368f0040933e85a10ec632c7f3580054f3cf2c8fea43ad`.
- [x] Workflow notices: Node.js 20 deprecation notice for `actions/checkout@v4` and `actions/upload-artifact@v4`; Ubuntu-latest migration notice for 2026-10-19. Neither blocked the build.
- [x] Supplemental checkpoint created: `HANDOVER_2026-10-09_AXXESS_UPLOAD.md`, commit `67ab7f287c6ab2d7d4a1f243bb33c8ff96c52af3`.
- [ ] User still needs to download the artifact from https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/37956100308 (scroll to Artifacts and select `axxess-storefront-upload`).
- [ ] ZIP has not yet been confirmed downloaded or extracted into Axxess DirectAdmin `public_html`.
- [ ] Live website, SSL and product/category/cart/checkout functionality have not been verified after this package upload. Do not claim deployment is complete until tested.
- [ ] Next: back up existing `public_html` files if possible, extract the ZIP contents directly into `public_html` (not a nested folder), preserve `cgi-bin` and unrelated hosting files, then test https://www.getwiredauto.co.za.
- ETA: allow 15–30 minutes for careful upload and basic QA once the user has the ZIP and is in DirectAdmin; actual duration depends on connection and extraction speed.
- Failure recovery: if extraction fails, redownload the artifact, confirm the Axxess 2 GB allocation has space, and use DirectAdmin File Manager's supported extraction method. Do not delete live files blindly.
- [x] No Cloudflare or Netlify deployment/credits used for this package build.


## 2026-10-09 — OWNER CONFIRMED AXXESS UPLOAD AND STOREFRONT LOAD

- [x] Owner confirms the existing `public_html` was backed up.
- [x] Owner confirms the Axxess upload package was uploaded and unzipped into the existing web root.
- [x] Owner confirms the store was opened and loaded successfully after extraction. This supersedes the previous entry's assumption that upload/extraction was still pending.
- [ ] Do not ask the owner to repeat backup, upload, unzip, or initial-load steps.
- [ ] Deployment is not yet fully verified: successful initial page load does not prove product images, product/category filtering, search, cart totals, checkout/order submission, Supabase calls, and HTTPS/SSL are all correct. Continue with targeted checks from the current live state, not redeployment.
- [ ] The next troubleshooting step must be to identify the exact remaining fault (if any) using current live behavior and existing repo/source; do not assume upload failed and do not instruct another upload without evidence.
- Process correction: the previous handover checkpoint was stale because it was not updated after the owner completed the upload. Future handover entries must be updated as soon as owner reports a completed action, and all guidance must be grounded in that latest state.
- Current known artifact remains run #4, commit `b5f66a666d369502201c2a76ef4387e0a2d2d7de`, 54.7 MB, SHA-256 `5f12833d18707e27af368f0040933e85a10ec632c7f3580054f3cf2c8fea43ad`.


## 2026-10-09 — POST-UPLOAD CHECKOUT SOURCE / DATABASE QA

- [x] Owner has already backed up the existing Axxess `public_html`, uploaded and extracted the approved package, and confirmed that the storefront loads. Do not repeat those steps.
- [x] Read the current `checkout-v2.html` source from GitHub main and inspected the deployed Supabase `store-checkout` and `shipping-quote` Edge Functions plus the live database function definitions/schema.
- [x] Confirmed checkout front end calculates packaging as **R35 × item quantity**, displays pickup at **R0 delivery**, requires a selected positive delivery quote for delivery orders, and submits the order to the `store-checkout` Edge Function.
- [x] Confirmed the active `store-checkout` Edge Function forwards the supported customer, address, payment, cart, delivery fee and fulfilment fields to `create_store_order`; the current database function recalculates product subtotal from active database prices, checks stock, decrements stock, calculates packaging at R35 per quantity, forces pickup delivery to R0, and records the order with payment pending.
- [x] Confirmed live database schema contains the checkout's expected `public_sku`, `active`, `stock_quantity`, parcel-dimension fields and order delivery/packaging columns.
- [!] **Delivery quote integrity issue identified:** `shipping-quote` can return PAXI published rates with `live:false` and a note that destination-point and parcel eligibility still need confirmation. Current checkout lets a customer select these provisional options and submit them as if confirmed; the database only validates that the submitted delivery fee is positive. This does not meet the rule that delivery must be quoted/confirmed. Fix before treating delivery checkout as production-ready: provisional PAXI rates must not count as confirmed, and a safe staff-confirmed/manual quote path must exist without trusting an arbitrary customer-entered fee.
- [!] Current checkout request payload includes `p_delivery_quote`, but the Edge Function allowlist omits it; the database RPC currently stores only a simplified quote record built from the fee and notes. Provider/service/timeframe should be preserved as structured order data when fixing the quote-confirmation path.
- [ ] **Not yet end-to-end verified:** no live order has been submitted in this QA pass because a valid order changes stock and creates a real customer/order record. Do not claim successful live order submission until a controlled, explicitly authorised test order or a safe non-mutating test route is used.
- [ ] Test `pickup` and delivery end-to-end on the Axxess live domain after correcting the quote-confirmation issue. Confirm subtotal, R35-per-quantity packaging, R0 pickup delivery, confirmed delivery fee, order number/status, persisted quote/provider details, and stock/order-item updates. Keep payment status pending; do not trigger payment or courier bookings.
- [x] No Axxess re-upload, Cloudflare deploy, or Netlify deploy was triggered during this source/database QA.


## 2026-10-09 — 10-MINUTE AXXESS PUSH: CHECKOUT HOTFIX COMPLETED IN SOURCE

- [x] Patched `checkout-v2.html` on `main` to stop provisional PAXI published rates (`live:false`) being selectable as confirmed delivery quotations.
- [x] Provisional PAXI prices remain visible as clearly labelled indicative information, but have no selectable radio button. The order form still blocks delivery submission unless a live/confirmed rate is selected; the manual WhatsApp quote path remains visible.
- [x] Fixed confirmed-rate selection indexing so live rates remain selectable even when provisional PAXI rates sort ahead of them.
- [x] Order notes now preserve the selected live provider, service, price and timeframe for the store team.
- [x] Static source checks passed for provisional-rate blocking, live-only selection, selection indexing, delivery submission gate, quote notes, R35-per-item packaging and R0 pickup.
- [x] Checkout hotfix commits: `b08495628b6e1d3a99b04de2c18a07b7939b2e8a` and follow-up index fix `bc2d36d8dc82784c4e02fc5a41f08f3bae2e0`. Current checkout file blob SHA: `ac95dc81e46d905cc6f919bc5a41f08f9b80e4a8`.
- [ ] **Axxess production files not yet updated by this assistant.** The package workflow watches `checkout-v2.html` and should build a fresh `axxess-storefront-upload` artifact automatically after the push. Available GitHub connector tools here do not expose a general list-workflow-runs/dispatch operation, and direct GitHub download from the runtime failed due DNS/network resolution. Do not claim a fresh ZIP was downloaded or that Axxess now serves this hotfix.
- [ ] Fastest remaining owner-side step, if the latest workflow run is green: GitHub repository → Actions → latest successful **Prepare Axxess upload package** run → download `axxess-storefront-upload` artifact; in Axxess DirectAdmin File Manager upload/extract the ZIP into `public_html`, replacing updated storefront files while retaining the existing backup and `admin.html`. This is a new hotfix package deployment, not a repeat of the earlier completed upload.
- [ ] After the new package is extracted, test `/checkout-v2.html`: pickup shows R0 delivery; packaging is R35 per unit quantity; provisional PAXI entries cannot be selected; only live rates can be selected for delivery; order submission has not yet been end-to-end tested in this pass. Do not create a fake order or claim order success without a controlled authorised test.
- [ ] No Supabase schema/data changes, stock mutations, payment initiation, courier booking, Cloudflare deploy or Netlify deploy were performed.
- Failure/limitation recorded: direct runtime network access to GitHub was unavailable (DNS resolution failed); no FTP/DirectAdmin connector or authorised Axxess credentials are available to upload files directly from this session.


## 2026-10-09 — RELEASE VERIFICATION FOLLOW-UP

- [x] Re-read the live `.github/workflows/prepare-axxess-package.yml` on `main`. It is configured to run on pushes to `main` when `checkout-v2.html` changes, and packages the storefront into `axxess-storefront-upload.zip` with 2,196 local WebP product images.
- [x] Confirmed the checkout hotfix commit is present in GitHub: `bc2d36d8dc82784c4e02fc8a2bc61358f3bae2e0` (Fix confirmed courier rate selection index).
- [x] Checked the commit combined-status endpoint; it returned no status entries. This is **not** proof that the package build succeeded.
- [ ] Fresh workflow run and artifact still not independently verified: the available GitHub connector exposes artifact lookup only when a workflow run ID is known, but no general workflow-run listing or dispatch operation. Do not use old artifact `11627089901` / run `37956100308`; it predates the checkout hotfix.
- [ ] Live domain browser test could not be completed through the available web fetcher for `https://www.getwiredauto.co.za/` or `/checkout-v2.html`; this does not establish whether the site is up/down. No live checkout result is claimed.
- [ ] Deployment remains the actual gate: obtain the latest successful workflow artifact after commit `bc2d36d`, upload/extract into the existing Axxess `public_html` (preserve `admin.html` and backup), then test pickup and delivery flows. Do not create a production order without explicit approval because order creation may decrement stock.
- Next action: open the repository Actions page at https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/workflows/prepare-axxess-package.yml, open the newest run after `bc2d36d`, and download its `axxess-storefront-upload` artifact only if the run succeeded. Then deploy and test on Axxess.


## 2026-10-09 — ACTION TAKEN TO FORCE A FRESH PACKAGE BUILD

- [x] Created a new commit to the watched workflow file to force a fresh GitHub Actions package build from current `main`: commit `ef3238ce51ff57f15c4cb3c4e0e4e29c0323bbbf` (adds a workflow comment only; no storefront logic change).
- [x] This commit changes `.github/workflows/prepare-axxess-package.yml`, which is explicitly included in its own push path filter; therefore it should trigger the packaging workflow.
- [ ] Run status and artifact still need confirmation. The available connector lacks general workflow-run listing/dispatch; direct web open of the Actions page returned a cache-miss fetch failure. Do not state build succeeded until run/artifact is visible.
- [ ] Axxess deployment remains blocked by no hosting/FTP connector in this session. The practical route is to download the fresh artifact from Actions and extract it in DirectAdmin `public_html`, preserving `admin.html` and the backup.
- [ ] Live checkout route could not be fetched by the web tool; no live checkout test or order is claimed.
- Root cause of delay: I had not attempted to force a new workflow build using the workflow's own watched-path trigger. That corrective action is now committed; follow up by checking Actions and deploy the resulting artifact.


## 2026-10-10 — FRESH AXXESS HOTFIX ARTIFACT VERIFIED

- [x] Retrieved the current master handover before continuing. Preserve the already-completed Axxess backup/upload/extraction; do not repeat the original deployment steps.
- [x] Checked GitHub Actions workflow history. The latest successful **Prepare Axxess upload package** run is [run 37965454384](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/37965454384), on commit `ef3238ce51ff57f15c4cb3c4e0e4e29c0323bbbf` (workflow-trigger comment commit; storefront hotfix from `bc2d36d8` is included).
- [x] Verified the run's artifact: `axxess-storefront-upload`, artifact ID `11632849925`, 57,525,957 bytes (~54.9 MiB), created 2026-10-09 17:19 UTC, not expired.
- [x] Downloaded the exact artifact into the current working session as `/mnt/data/axxess-storefront-upload.zip`.
- [x] Inspected ZIP contents: 2,212 entries, 58,530,113 uncompressed bytes; includes root-level `checkout-v2.html` (14,677 bytes), `index.html`, and product images under `assets/products_webp/`; `admin.html` is not included, so the existing admin file will not be overwritten by extracting this package.
- [ ] Owner must deploy this **new hotfix package** to the already-backed-up Axxess `public_html` to make the provisional-PAXI checkout fix live. This is not a request to repeat the initial upload; it updates the newer checkout hotfix.
- [ ] After extraction, verify `https://www.getwiredauto.co.za/checkout-v2.html`: pickup delivery R0; packaging R35 per item quantity; provisional PAXI rates display as indicative only and are not selectable; delivery submission requires a confirmed/live rate or manual quote path.
- [ ] Still do not submit a real production order without explicit authorisation. Order creation can create customer/order records and decrement stock.
- [ ] Live Axxess browser QA (images/categories/cart/checkout/SSL) is not claimed complete by this package inspection. Confirm from the actual domain after the hotfix is deployed.
- ETA: ZIP transfer/extraction should generally take 5–15 minutes depending on connection and DirectAdmin extraction speed; allow another 10–20 minutes for the targeted checkout and storefront smoke checks.
- Failure recovery: keep the existing backup; extract package contents into the existing `public_html` root, not a nested folder; do not delete `admin.html` or unrelated hosting files. If ZIP upload fails, retry the verified artifact download before changing any live files.
- [x] No Netlify or Cloudflare deployment/credits used. No database, stock, order, payment, or courier changes made.


## 2026-10-10 — USER REPORT: CHECKOUT APPEARS TO WORK; NEXT PRIORITY CATALOGUE QA

- [x] User reports the checkout seems to be working fine. Treat this as a positive user-observed smoke test, not proof that every payment, delivery, and order-persistence path is verified.
- [x] Retrieved the latest successful Catalogue Image Audit workflow result (run [38017931131](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38017931131); artifact ID `11657220424`) and read its JSON report.
- [x] Audit report counts: 4,187 active products; 791 public proxy image references; 3,396 placeholder image URLs; 3,945 public SKU WebP assets; 3,154 placeholder products have a known WebP asset; effective known image coverage 3,945; 242 placeholder products have no known matching WebP asset; 0 invalid/mismatched public image references; 800 internal source image files.
- [ ] Next priority is catalogue/category correctness, not another checkout rebuild. The 242 products without known matching WebP assets need an exact-SKU image match or a clean “image unavailable” fallback; do not assign unrelated images or publish catalogue-watermarked source images.
- [ ] Critical known category issue from `CATEGORY_MAPPING_REVIEW_2026-10-09.md`: previous tree audit found only 976 active products within the eight intended storefront roots/descendants and 3,211 outside them. Examples include tools in electrical/accessory categories and mechanical brake parts under electrical/outdoor categories. The full SKU-level candidate export and category hierarchy correction are still outstanding.
- [ ] Safest next action: retrieve the complete active product/category dataset in bounded read-only batches, produce a SKU-level mapping report with current parent chain and suggested root/leaf plus reason/confidence, then apply only high-confidence reviewed changes. Do not bulk-reassign by supplier source category alone.
- [ ] After taxonomy/image changes, test homepage category tiles, each root and child category, product filtering, search, product detail images, cart totals, and checkout on `https://www.getwiredauto.co.za`.
- [ ] Checkout follow-up is limited to verifying exact packaging arithmetic for quantity >1, pickup R0, and that provisional delivery prices cannot be selected as confirmed. No payment initiation, courier booking, or unapproved real order.
- ETA: image exception report and category mapping should be tackled in bounded stages; do not claim a completion ETA until the full dataset can be retrieved and the number of ambiguous SKUs is known.
- No product/category database writes were made in this pass. No hosting files changed and no Netlify/Cloudflare deployment was triggered.


## 2026-10-10 — CONTINUED CATEGORY AUDIT (READ-ONLY)

- [x] Queried the live Supabase `categories` table read-only. Confirmed a structural duplication issue: active top-level categories include both intended storefront roots and many catalogue-specific top-level nodes (for example Abrasives, Battery, Brake Parts, Clamps, Cylinders, Door Parts, Fuses, Hand Tools, Spanners, Switches, etc.). Some parallel active and inactive/legacy roots also exist for Accessories, Automotive Accessories, Car Audio and Electrical.
- [x] Re-read the more recent `CATEGORY_MAPPING_REVIEW_2026-10-09.md`. Its later correction-batch record supersedes the older 976-in-tree figure: latest recorded count is **4,187 active products; 3,223 inside approved trees; 964 outside; zero active products without a category**. Remaining out-of-tree groups listed there: Spare Parts 697; Abrasives 103; Clamps 32; Thermostats & Pipes 32; Suspension 28; Fuel Pumps & Oil Filter 27; Brake Parts 25; Radiator Caps & Bottles 12; Cylinders 5; plus three mechanical 4X4 items held for review. These figures are the last documented review totals and should be re-counted before any further writes.
- [x] Confirmed current product schema includes product ID, category_id, SKU/public_sku, name, description, image_url, gallery_urls and specifications. Product data query was blocked by the connected SQL safety gate in this pass, so no new SKU-level export was produced.
- [ ] Next safe step: resolve the canonical active storefront roots and category navigation behavior in code before moving the remaining out-of-tree groups. Do not deactivate or delete top-level catalogue nodes yet: first check all product references, frontend root IDs/slugs and category page behavior.
- [ ] Then export remaining out-of-tree products in bounded read-only batches through an approved path and create a SKU-level proposal with current category, parent chain, recommended destination, confidence and rationale. Move only high-confidence candidates; keep mechanical/mixed/ambiguous items for manual review.
- [ ] Reconcile image audit figures with the current live data and exact SKU matching before changing product image URLs.
- [x] No product/category database writes, stock/order changes, hosting uploads or deploys made during this read-only audit.


## 2026-10-10 — STOREFRONT CATEGORY NAVIGATION SOURCE CHECK

- [x] Read-only inspection of `category.html`, `products.html`, `store.html`, `category-navigation.js`, `assets/category-cleanup.js`, and `assets/category-tree.json`.
- [x] Confirmed category pages are driven by a **static JSON snapshot** (`assets/category-tree.json`) generated at **2026-10-09 09:32:49 UTC**, not by a fresh category query in the browser. Product listing pages query live Supabase product rows by one exact `category_id`, so products in descendant leaves are not automatically included in a parent category's product list; users must navigate the hierarchy correctly.
- [x] Confirmed `category.html` hardcodes **nine** top-level roots, including a generic **Spare Parts** root. This is inconsistent with the intended clean storefront grouping and risks exposing mixed/mechanical catalogue content as a main shop category. Do not simply remove that root until the products assigned there have been reviewed/reclassified, because that could make items harder to find.
- [x] Parsed the existing snapshot: 165 active category rows; the nine hardcoded roots calculate to 4,187 products in total in that snapshot, but this conflicts with the newer correction-review record (3,223 in approved trees and 964 outside). Therefore the snapshot is stale relative to the latest documented category correction batches and must be regenerated/reconciled before it is trusted for customer navigation.
- [x] Confirmed the homepage-to-category bridge only maps seven labels/IDs and still uses legacy labels such as “Auto Electrical”, “Car Alarms & Immobilizers”, “Reverse Camera”, “Car Lighting & LEDs”, and “Diagnostic Testing & Repairs”. This mapping should be aligned with the final approved storefront labels and IDs after the category mapping proposal is reconciled.
- [ ] Next: update the snapshot-generation workflow to run after the latest reviewed category changes, then compare live category counts with the generated JSON and the storefront root IDs. Produce a delta report first; do not silently overwrite product assignments or hide categories.
- [ ] After reconciliation, update navigation in one controlled code change: the approved main category list, homepage bridge aliases, and category snapshot must agree. Then build a test report for each root and representative leaf page, including count and exact SKU checks.
- [x] No live product/category rows changed; no hosting upload, checkout change, or deployment made in this pass.
