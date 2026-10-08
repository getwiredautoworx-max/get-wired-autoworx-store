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
