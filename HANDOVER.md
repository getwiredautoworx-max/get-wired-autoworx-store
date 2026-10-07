# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-10-07 09:29 SAST

## SOURCE OF TRUTH
- Repository: getwiredautoworx-max/get-wired-autoworx-store
- Branch: main
- Production Owner APK source: android-owner-app/
- Package: za.co.getwiredautoworx.owner
- Production APK source/version currently documented: v1.0.1 / versionCode 2
- compileSdk/targetSdk: 35
- NO REPLIT CREDITS. NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.
- Do not expose secrets, passwords, private keys or tokens.
- Existing store is the foundation. Do not rebuild unnecessarily.

---

# 1. SUCCESSFULLY COMPLETED / VERIFIED

## 1.1 Storefront
- Customer storefront source/routing complete.
- Automated Storefront Smoke Test 36750308661 = SUCCESS.
- Mobile entry, catalogue/category rendering, product detail, add-to-cart, checkout navigation/form behaviour and desktop viewport checks passed.
- Automated smoke testing is not a substitute for public browser testing.
- No storefront/database rebuild is currently justified.

## 1.2 Database / catalogue
- 4,187 active products.
- 4,187 active priced/unique active SKUs.
- 4,187 active products with stock > 0.
- 27,745 total active units.
- 0 uncategorized active products.
- 0 pricing mismatches.
- 791 active products with product-specific verified images.
- 3,396 active products use the safe branded placeholder.
- RLS enabled on the seven approved public tables.
- Pricing formula: supplier cost × 1.15 VAT × 1.35 markup.
- Obsolete 1,109-row CSV must never be used.

## 1.3 Checkout / orders
- Server-authoritative product, price, stock, fulfilment and payment validation complete.
- Store pickup from the owner's premises = R0.
- Delivery is NOT a fixed R15 fee: delivery is charged according to the courier/PAXI quotation for the customer's destination.
- Packaging = R25 per item.
- Cash-on-pickup restricted to pickup.
- EFT/manual payment/cash-on-pickup paths implemented as applicable.
- No real customer order created during QA.
- No card details collected.

## 1.4 Admin / security
- Supabase Auth/admin RPC authorization reviewed and passed.
- No authorization bypass identified.
- No service-role/private payment secrets found in indexed frontend source.
- No production data changed during latest automated QA.
- Leaked-password protection remains an owner dashboard configuration item.

## 1.5 Catalogue image and category work — 30 September 2026
- Uploaded ASC catalogue sources processed:
  - ASC- Seat and steering wheel covers.pdf
  - ASC- Viscous Units and Fan Blades.pdf
- Catalogue image/SKU relationships were matched by exact SKU/product identity.
- No unsafe visual-similarity substitutions were made.
- 99 exact-SKU catalogue images were extracted and prepared as JPEG assets.
- Prepared image pack:
  - Get_Wired_AutoWorx_Catalogue_SKU_Images.zip
  - 99 JPEG assets
  - 277,297 bytes extracted
  - Exact-SKU filenames
  - SHA-256 manifest recorded in the working output
- Supabase category corrections were successfully applied for the matched catalogue products, including:
  - Fan Blades
  - Fan Clutches
  - Complete Fans
  - Seat Covers
  - STEERING WHEEL COVERS
- The 99 matched products were verified as existing in Supabase.
- The matched products were verified as categorised.
- Existing verified images remain preserved.
- New image_url values were intentionally NOT changed before the binary assets were committed. This prevents broken production image URLs.

### IMPORTANT IMAGE STATUS
The catalogue-image extraction and category assignment are complete, but the 99 JPEG binaries are NOT yet confirmed as committed to the production GitHub repository. Therefore:
- Do NOT claim all 99 new images are live.
- Do NOT point products at nonexistent asset paths.
- Keep the safe placeholder until repository assets and final image URLs are verified.
- The prepared ZIP is the ready-to-commit asset package.

## 1.6 Image audit / enrichment
- September Buyers Guide exact-SKU/photo audit completed.
- No unsafe visual-similarity substitutions made.
- 3,396 placeholders intentionally remain where no verified exact-SKU image exists.
- Image cleanup workflow processed 800 images successfully.
- Remaining placeholder enrichment is not currently a technical launch blocker.

## 1.7 Owner APK
- Exact production-source workflow 36750308741 = SUCCESS.
- Job 110006925647 = SUCCESS.
- Production APK build, storefront bundling, artifact preservation and emulator validation all passed.
- Artifact 11114172502: get-wired-autoworx-owner-debug-apk.
- Artifact size: 88,454,478 bytes.
- Artifact digest: sha256:137bf0a7ea3a02c7e0b9c77019a081d641bafa599ce4a1ec15e5a43718337fd9.
- Artifact expiry: 2026-12-29.
- Earlier isolated validation run 36558844914 also passed, but used validation v1.0.2/versionCode 3 and is supporting evidence only.
- Emulator smoke-test workflow was corrected in commit d24ff82feece2d38d6a2c250a651da1a821775e3.
- Automated emulator validation proves build/install/launch/activity execution.
- Remaining Owner APK work is functional acceptance and, only if required, a signed release build.

---

# 2. HOSTING / DEPLOYMENT STATUS

## 2.1 Cloudflare Pages
Correct deployment command:
npx wrangler pages deploy . --project-name=get-wired-autoworx-store --branch=main

- Run 36750308973 / Job 110006926556.
- Correct Pages command was reached.
- Failure is due to missing CLOUDFLARE_API_TOKEN in GitHub Actions.
- No Cloudflare credits were used.
- No token should ever be pasted into chat/source.

## 2.2 GitHub Pages
- Run 36750308896 / Job 110006927074.
- Get Pages site: Not Found.
- Create Pages site: Resource not accessible by integration.
- Connected Actions integration cannot create the Pages site.
- This is not a storefront-code failure.
- Repository-side recovery completed:
  - Root CNAME committed for getwiredautoworx.co.za.
  - Recovery instructions committed in GITHUB_PAGES_RECOVERY.md.
  - Prepared route: GitHub Pages -> Deploy from a branch -> main -> /(root).

Settings page:
https://github.com/getwiredautoworx-max/get-wired-autoworx-store/settings/pages

## 2.3 Netlify
- Historical deployment is stale and is NOT a production target.
- Do not deploy or refresh Netlify.
- Do not spend Netlify credits.

---

# 3. REMAINING TASKS WITH ETA

ETAs below are working estimates, not guarantees. They assume no new defects are discovered and required owner-controlled credentials/settings are supplied when needed.

## P0 — PUBLIC HOSTING
### Owner action required
Choose ONE hosting route.

### Route A — GitHub Pages
1. Open repository Settings -> Pages.
2. Set Source = Deploy from a branch.
3. Branch = main.
4. Folder = /(root).
5. Save.
6. Wait for Pages publication.
7. Notify Veyron that it has been saved so the public URL can be verified.

Estimated owner setup time: 5–10 minutes.
Estimated publication/propagation: 5–30 minutes.
Estimated time from successful setting change to first public live test: approximately 15–45 minutes.

### Route B — Cloudflare Pages
1. Create/use an appropriate Cloudflare API token.
2. Add it to GitHub repository Actions secrets as CLOUDFLARE_API_TOKEN.
3. Never paste the token into chat/source.
4. Rerun the Cloudflare Pages workflow.
5. Verify the resulting public hostname.

Estimated owner setup time: 10–20 minutes.
Estimated deployment verification after secret is available: 10–20 minutes.

RECOMMENDED WORKFLOW FOR THIS HANDOVER:
Use GitHub Pages first if the objective is to avoid Cloudflare/Netlify credit use.

## P1 — PUBLIC LIVE STOREFRONT TEST
Dependency: public URL must exist.

Test:
1. HTTPS/reachability.
2. Correct Get Wired AutoWorx storefront.
3. Homepage.
4. Categories/subcategories.
5. Search.
6. Product detail.
7. Product images/fallbacks.
8. Cart.
9. Checkout.
10. Delivery vs pickup.
11. Payment instructions.
12. WhatsApp/contact handoff.
13. Mobile viewport.
14. Desktop viewport.
15. Browser console/network errors where observable.
16. Compare deployed behaviour with GitHub/Supabase.
17. Confirm no critical production error.

Estimated execution: 45–90 minutes.
Target: begin immediately after public URL is available.

## P1 — CATALOGUE IMAGE ASSET DEPLOYMENT
Dependency: repository binary-upload route or approved storage route.

Remaining:
1. Commit the 99 prepared exact-SKU JPEG binaries.
2. Verify every committed filename/path.
3. Update only the corresponding product image_url values.
4. Verify image loading in the deployed storefront.
5. Confirm placeholders remain only where no verified exact-SKU image exists.

Estimated execution after a supported binary/storage upload path is available: 30–60 minutes.
Current status: prepared and ready; production binary commit is still pending.
This is not a reason to break the currently working placeholder image system.

## P1 — OWNER APK FUNCTIONAL ACCEPTANCE
Dependency: authenticated owner access may be required.

Remaining:
1. Owner Login.
2. Owner/admin dashboard loads.
3. Product/catalogue navigation.
4. Product/cart path where exposed by the Owner app.
5. Checkout/storefront path.
6. Back navigation.
7. WebView file chooser if required by admin.
8. Confirm no runtime crash or blocking WebView error.

Estimated execution: 30–60 minutes.
Do not invent credentials or bypass authentication.

## P1 — PAYMENT / BANK-DETAIL VERIFICATION
Owner-controlled.

Verify final customer-facing:
- Bank name.
- Account/beneficiary details.
- Payment reference instructions.
- Payment confirmation workflow.
- No obsolete/test banking details remain.

Estimated owner verification: 15–30 minutes.
Do not place private banking information in chat.

## P1 — APK RELEASE DECISION
Two possible states:

### Internal Owner use
- Current verified debug APK may be used for internal acceptance testing.

### Distributable production APK required
1. Production signing configuration.
2. Application ID/version/versionCode verification.
3. Signed release APK.
4. SHA-256 verification.
5. Signed APK installation test.
6. Confirm it is genuinely release-signed.

Estimated: 30–60 minutes after signing configuration is available.
Do not call the current debug artifact a Play Store/release-signed APK.

## P2 — PRODUCTION DEPLOYMENT REGRESSION
After hosting is live:
- Verify future push/deployment workflow behaviour.
- Confirm no test/validation source is deployed.
- Confirm production APK workflow still uses authoritative android-owner-app.
- Confirm obsolete Netlify/Workers deployment is not triggered.
- Record final production commit/run references.

Estimated: 20–40 minutes.

## P2 — FINAL OPERATIONAL QA
Before declaring trading-ready:
- Test one complete non-production checkout/order path without creating a real customer order.
- Verify order reference generation.
- Verify admin order visibility.
- Verify payment status handling.
- Verify delivery/pickup status handling.
- Verify WhatsApp handoff.
- Verify stock/price revalidation.
- Verify mobile layout on owner's Android device if available.
- Record findings.

Estimated: 30–60 minutes.

## P3 — POST-LAUNCH ENRICHMENT
Not a launch gate unless specifically made mandatory:
- Replace remaining verified placeholders with exact-SKU imagery.
- Expand product imagery/vehicle compatibility.
- Add further payment automation if desired.
- Add analytics/monitoring.
- Add signed release distribution/Play Store packaging.
- Improve admin operational tooling.
- Continue catalogue QA.

ETA: ongoing after live testing.

---

# 4. LIVE-TEST ETA

## Fastest realistic path
If GitHub Pages is selected and the owner completes the Pages setting now:

- Owner hosting action: 5–10 min
- Publication/propagation: 5–30 min
- First public browser verification: 15–45 min after save
- Initial live storefront QA: 45–90 min

### Expected first live testing window
Approximately 15–45 minutes after successful GitHub Pages configuration.

### Expected full live-readiness window
Approximately 2–4 hours after public hosting is available, assuming:
- no new critical defects,
- payment details are confirmed,
- authenticated Owner APK acceptance can be completed,
- and no additional hosting problem occurs.

If a signed production APK is required, allow an additional approximately 30–60 minutes.

---

# 5. CURRENT BLOCKERS — EXACTLY DEFINED

1. PUBLIC HOSTING
   - Owner action required.
   - GitHub Actions cannot create the Pages site.
   - Cloudflare Actions lacks CLOUDFLARE_API_TOKEN.
   - This is the immediate gate to public browser testing.

2. PUBLIC BROWSER VERIFICATION
   - Cannot be completed until a reachable public production URL exists.

3. CATALOGUE BINARY IMAGE COMMIT
   - 99 exact-SKU images are prepared.
   - Binary repository/storage commit and final image_url verification remain pending.
   - Existing safe placeholders are intentionally retained until deployment is verified.

4. PAYMENT/BANK DETAIL CONFIRMATION
   - Owner-controlled final verification.

5. OWNER APK FUNCTIONAL ACCEPTANCE
   - Automated build/install/launch validation passed.
   - Authenticated functional acceptance remains.

6. SIGNED RELEASE APK
   - Only a blocker if a production-signed/distributable APK is required now.
   - Not required to perform initial web storefront live testing.

No storefront/database rebuild is currently justified.

---

# 6. FINAL RELEASE GATE

The store may be called LIVE-READY only after:
- Public URL is reachable.
- Public storefront regression passes.
- Checkout/order flow is verified.
- Payment/bank details are confirmed.
- Owner APK functional acceptance is complete.
- Any required signed release APK is built and verified.
- No critical production errors remain.

The store must NOT be called LIVE merely because:
- GitHub Actions passed,
- the APK build passed,
- emulator validation passed,
- automated smoke tests passed,
- or catalogue/database QA passed.

Public browser evidence is required.

---

# 7. ABSOLUTE PROJECT RULES

- NO REPLIT CREDITS.
- NO CLOUDFLARE CREDITS.
- NO NETLIFY CREDITS.
- Do not restart completed Supabase/catalogue/storefront work.
- Do not use the obsolete 1,109-row CSV.
- Do not guess product-image mappings.
- Match catalogue images by exact SKU/product identity.
- Do not expose secrets.
- Do not create real customer orders during QA without explicit authorization.
- Do not claim public/live verification without actual public browser evidence.
- Preserve the existing safe image fallback.
- Do not point products at nonexistent image paths.
- Continue from this handover; do not restart completed tasks.

---

# 8. HANDOVER CHECKPOINT

At 2026-09-30 SAST:

COMPLETED:
- Storefront build and automated smoke validation.
- Supabase/catalogue state and pricing QA.
- Category completeness.
- Checkout/order validation.
- Admin/security review.
- 791 verified product-specific images retained.
- 99 additional exact-SKU catalogue images extracted and prepared.
- Catalogue-derived category corrections for the matched products.
- Owner APK production-source build and emulator validation.
- GitHub Pages recovery files/CNAME preparation.

PENDING:
- Owner selects/configures public hosting route.
- Public URL publication.
- Public browser/live storefront testing.
- Commit/deploy the 99 prepared catalogue image binaries and verify image URLs.
- Owner APK functional acceptance.
- Final payment/bank-detail confirmation.
- Signed release APK only if required.
- Final operational QA and live-readiness sign-off.

NEXT ACTION:
Complete the GitHub Pages Settings -> Pages configuration (or provide the Cloudflare Actions secret through GitHub, never chat). Once a public URL exists, proceed directly to live browser testing and record the results here.


---

# 9. EXCEL CATEGORY MANAGEMENT WORKBOOK — 30 SEPTEMBER 2026

A full editable Excel category-management workbook has been created and persisted for continuation in future chats.

## Workbook
- Filename: `Get_Wired_AutoWorx_Full_Category_Management_Workbook.xlsx`
- Persistent Library path: `/Get Wired AutoWorx/Get_Wired_AutoWorx_Full_Category_Management_Workbook.xlsx`
- Library file ID: `libfile_7d909cd6bf9c8191ba0b29a5e45c2934`
- Format: Microsoft Excel `.xlsx`
- Workbook verified successfully after creation.
- Total worksheets/tabs: 61.
- Sheets are intentionally UNPROTECTED and editable.

## Workbook structure
- `00 INDEX` — navigation and workbook summary.
- Main catalogue categories are represented as PAGE sheets.
- Because Excel does not support true nested tabs, each subcategory is represented by its own worksheet tab and is linked from its parent PAGE sheet.
- 5 main catalogue categories/pages:
  - Accessories
  - Auto Spares
  - Auto Tools
  - Hardware
  - Portable Compressors
- 51 subcategory tabs.
- `ALL PRODUCTS` — complete editable source catalogue listing.
- `CATEGORY MAP` — editable category/subcategory reference and item counts.
- `UNCATEGORIZED` — dedicated editable holding sheet for products with no category/subcategory.
- `LIVE DB CATEGORY AUDIT` — reserved audit sheet distinguishing the validated source workbook structure from the larger live Supabase category tree.

## Product scope / source
- Workbook is based on the validated `September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv`.
- 800 catalogue rows.
- 800 unique SKUs.
- 791 fixed-price rows.
- 9 rows with blank/system-dependent pricing; no prices were invented.
- 0 uncategorized rows in the validated source at workbook creation time.
- Source category/subcategory values were read from the validated catalogue specifications; they were not guessed or silently replaced.
- All product/category cells remain editable.
- The workbook does NOT silently overwrite the live Supabase category structure.
- It is a management/editing workbook and source-control aid; database changes must still be deliberately applied and verified.

## Important continuation rule
When the owner asks for the workbook in a future chat, search the Library for:
`Get_Wired_AutoWorx_Full_Category_Management_Workbook.xlsx`

Do not recreate it from an older CSV unless explicitly instructed. Preserve this workbook as the current category-management workbook until a newer verified version replaces it.



---

# 10. LIVE VERIFICATION UPDATE — 1 OCTOBER 2026 SAST

The following state was independently re-verified against the current GitHub repository and live Supabase database before continuation.

## 10.1 GitHub source
- Repository: getwiredautoworx-max/get-wired-autoworx-store
- Branch: main
- Latest main commit at verification: `ddc615aed9cc4679af2889a187376cf64e2c0ddd`
- Latest commit message: Add editable Excel category management workbook to handover.
- Root `index.html` redirects to `store.html`.
- `store.html` loads the current storefront and the existing fallback/category/progressive enhancement scripts.
- Root `CNAME` is present with `getwiredautoworx.co.za`.
- Repository visibility currently reports PUBLIC. This differs from older handover wording that described the repository as private; do not assume private visibility.

## 10.2 Live Supabase catalogue verification
Verified directly against `public.products`:
- Total product rows: 4,198.
- Active products: 4,187.
- Active products in stock: 4,187.
- Active products with price: 4,187.
- Active products with an image URL: 4,187.
- Active products without an image URL: 0.
- Active products without a category: 0.
- Total active stock units: 27,745.
- Pricing mismatches against supplier cost × 1.15 × 1.35: 0.
- Active products missing cost: 0.
- Active products missing price: 0.
- Active category IDs represented: 86.

## 10.3 Current image state
- 791 active products reference `assets/products/` repository image paths.
- 3,396 active products use the safe branded placeholder.
- 791 repository-backed image URLs are currently populated; the placeholder system remains intentionally active for products without verified exact-SKU imagery.
- This means the storefront currently has image coverage for all 4,187 active products, but it must NOT be described as 4,187 verified product-specific photographs.
- Exact-SKU matching remains mandatory; no visual-similarity substitutions are permitted.

## 10.4 Category workbook
- Current editable workbook remains `Get_Wired_AutoWorx_Full_Category_Management_Workbook.xlsx`.
- Verified workbook contains 61 worksheets.
- 5 main category PAGE sheets.
- 51 subcategory tabs.
- ALL PRODUCTS, CATEGORY MAP, UNCATEGORIZED and LIVE DB CATEGORY AUDIT worksheets included.
- Workbook remains unprotected/editable.
- Validated source scope remains 800 catalogue rows / 800 unique SKUs / 791 fixed-price / 9 system-dependent-price rows.
- The workbook is a management/source-control aid and does not silently overwrite Supabase.

## 10.5 Hosting gate
- No Netlify deployment has been triggered.
- No Cloudflare credit/token has been used.
- Public browser testing remains blocked until the GitHub Pages site is actually created/published or another approved public host is configured.
- The repository already contains the root CNAME and recovery instructions.
- Owner action remains: GitHub Settings -> Pages -> Deploy from a branch -> main -> /(root) -> Save.
- After publication, perform the full public browser regression before calling the store LIVE.

## 10.6 Current build position
COMPLETED / VERIFIED:
- Storefront build and automated smoke validation.
- Live catalogue/database count, stock and price QA.
- Category completeness.
- Checkout/order validation.
- Admin/security review.
- Existing image fallback.
- Owner APK build/install/emulator validation.
- Editable category-management workbook.
- GitHub Pages recovery/CNAME preparation.

PENDING:
- Create/publish public hosting endpoint.
- Public browser/live storefront regression.
- Owner APK functional acceptance.
- Final owner-controlled payment/bank-detail confirmation.
- Signed release APK only if a distributable production APK is required.
- Final operational QA and live-readiness sign-off.

NEXT EXECUTION POINT:
Do not rebuild the storefront or database. Once public hosting is configured, immediately perform public browser testing and record results. Continue image enrichment separately without replacing the safe fallback.


---

# 11. WORKBOOK + STORE/APK ACTION REGISTER — 1 OCTOBER 2026

## 11.1 Editable Excel workbook delivered
- User-facing download filename: `Get_Wired_AutoWorx_Editable_Category_Workbook.xlsx`.
- Built from the current full category-management workbook and validated by reopening the generated XLSX.
- 62 worksheets total.
- Includes a `START HERE` guide, 5 main-category PAGE sheets, 51 subcategory worksheets/tabs, plus index, all-products, category map, uncategorized and live database category audit sheets.
- Workbook is editable; worksheet protection is disabled.
- The `UNCATEGORIZED` sheet is retained for reviewing products without a category.
- Workbook edits do not automatically update Supabase; any approved changes must be reviewed/imported separately.
- Note: Excel represents worksheets as tabs. The workbook uses dedicated `PAGE - [main category]` overview sheets and separate `[main category] - [subcategory]` worksheets for the subcategories.

## 11.2 APK status — verified
- Owner APK workflow run #? latest successful validation run: `36750308741` on 30 September 2026.
- Build debug APK: SUCCESS.
- APK artifact preserved: `get-wired-autoworx-owner-debug-apk`.
- Android emulator validation: SUCCESS.
- Artifact size: 88,454,478 bytes.
- Artifact SHA-256: `137bf0a7ea3a02c7e0b9c77019a081d641bafa599ce4a1ec15e5a43718337fd9`.
- Artifact expires 29 December 2026.
- Run: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/36750308741
- User previously reported “App not installed” on the Android phone. Therefore emulator validation is not the same as successful installation on the user's device. Phone install/launch acceptance remains OPEN.
- APK PR #4 (`ci: expose production Owner APK validation`) remains open; PR #3 (`Isolated Sales Intelligence APK v0.3.0`) remains open as draft and must stay isolated until QA is accepted.
- Do not claim production-signed/release APK is complete; the verified artifact is a debug APK.

## 11.3 Latest automated checks
- Storefront Smoke Test for latest main handover commit `f7bfc164a6b48de09cabc84e8d81c1d86fa2399f`: SUCCESS.
- Clean Product Images workflow for that commit: running at last check; verify final result later.
- Deploy Store to Cloudflare Pages workflow for that commit: FAILURE. Inspect logs/configuration before retrying. Do not assume hosting is live.
- Netlify was not used for this work. Cloudflare deploy workflow was triggered automatically by the repository push; do not initiate paid services or spend credits without explicit approval.

## 11.4 Remaining tasks — in priority order
1. **Owner: configure/publish the approved hosting endpoint.** GitHub Pages recovery instructions are in `GITHUB_PAGES_RECOVERY.md`; the Pages source must be configured by an account owner/admin if the connector cannot do it. Confirm custom-domain/DNS requirements for `getwiredautoworx.co.za`.
2. **Build/Dev: diagnose the failing Cloudflare Pages workflow** and decide whether it is obsolete or should be repaired. Do not spend paid credits or alter the selected hosting plan without owner approval.
3. **QA: public live-store regression** after hosting is published: homepage, category navigation, search, product detail, product images/fallback, cart, checkout, R15 delivery charge per delivery address/order, mobile layout and desktop layout.
4. **Owner + QA: test APK on the actual Android phone.** Download the artifact, attempt installation, capture the exact Android error if it fails, and verify launch/navigation if it installs.
5. **Build: APK release readiness.** Decide whether a signed release APK is required; if yes, configure signing securely and produce/verify a release artifact. Keep signing secrets out of repository and chat.
6. **Owner: payment readiness.** Confirm PayFast verification/KYC and final payment account/business details before enabling live payments. Do not enable payment collection until owner confirms.
7. **Owner + Ops: supplier stock/price and fulfilment acceptance.** Confirm supplier stock-check process, dispatch workflow, and delivery wording before accepting paid orders.
8. **Catalogue: continue exact-SKU image enrichment.** Keep branded fallback for products without verified exact images; do not substitute visually similar parts.
9. **Final QA/sign-off:** run an end-to-end test order/payment simulation, confirm order notifications and stock handling, and record owner approval before announcing the store live.

## 11.5 Tasks requiring owner input/action
- Configure GitHub Pages at https://github.com/getwiredautoworx-max/get-wired-autoworx-store/settings/pages if choosing the documented GitHub Pages route: Source = Deploy from a branch; branch = `main`; folder = `/(root)`; Save.
- Confirm whether `getwiredautoworx.co.za` is the intended live domain and whether DNS access is available.
- Confirm preferred hosting route and whether any Cloudflare plan/credits may be used. Until confirmed, avoid paid hosting changes.
- Install/test the APK on the actual phone and send the exact error text/screenshot if it still says “App not installed”.
- Confirm whether a signed production APK is required, or whether the current debug APK is only for internal testing.
- Complete PayFast verification and confirm when live payment setup may proceed.
- Approve final supplier/dispatch and delivery operating process before live paid orders.
- Review/approve final live-store appearance and end-to-end test before public launch.

## 11.6 ETA / launch gate
- No reliable calendar ETA can be promised until hosting is published and the owner-dependent items above are resolved.
- Once the public endpoint is available and APK/payment decisions are confirmed, estimate remaining QA in hours based on the actual test results.
- Current status: **NOT LIVE / NOT SIGNED OFF**. Do not advertise the store as live until public testing and owner approval are complete.


---

# 12. LIVE CONTINUATION UPDATE — 1 OCTOBER 2026 18:52 SAST

## 12.1 Access / execution capability restored
- GitHub repository access is currently working with admin/maintain/push permissions.
- Repository source remains the authoritative storefront source; no rebuild/restart was performed.
- Latest source commits include the launch/action register and the APK install-test correction.

## 12.2 Storefront automated verification
- Supabase direct verification: 4,187 active products; 4,187 priced; 4,187 unique active SKUs; 4,187 in stock; 4,187 with image_url; 3,396 safe branded placeholders; 0 pricing errors.
- Latest pre-change Storefront Smoke Test passed.
- New Storefront Smoke Test is running against the current source and includes category rendering, featured product modal, cart -> checkout, R15 delivery, pickup R0 and desktop viewport checks.

## 12.3 Owner APK install-conflict fix executed
- Root cause mitigation for the previously reported phone message 'App not installed' has been implemented without changing the production application ID.
- Debug/test builds now use applicationId suffix .test, versionCode 3 and versionName 1.0.2-test so the install-test APK can coexist with an existing Owner APK instead of failing on package/signature replacement.
- Emulator validation workflow now installs/launches za.co.getwiredautoworx.owner.test.
- New validation run 36895104669 is executing; final success/failure is still pending.
- Production package remains za.co.getwiredautoworx.owner; no production-signed APK is being claimed.

## 12.4 Hosting diagnosis completed
- Cloudflare Pages workflow failure was inspected directly.
- Exact failure: GitHub Actions has no CLOUDFLARE_API_TOKEN; Wrangler reaches the deployment command and then stops because the token is absent.
- No Cloudflare credit was consumed.
- GitHub Pages recovery workflow was also tested; actions/configure-pages cannot create the Pages site because the connected integration lacks the repository Pages administration permission.
- Therefore public hosting remains the only immediate owner-controlled gate to public browser testing.

## 12.5 Remaining tasks — execution state
COMPLETED / VERIFIED:
- Storefront source and database foundation preserved.
- Current Supabase catalogue/pricing verification.
- Automated storefront regression suite present and passing on the prior main handover.
- Owner APK build/emulator validation already proven on the production source.
- APK phone-install conflict mitigation implemented and validation triggered.
- Cloudflare failure root cause identified.
- GitHub Pages failure root cause identified.
- Exact-SKU image safety rules preserved.

RUNNING:
- Current Owner APK install-test build/validation run 36895104669.
- Current Storefront Smoke Test run 36895104683.
- Current clean product image workflow run 36895104626.

OWNER INPUT STILL REQUIRED:
1. Create/enable the GitHub Pages site in repository Settings -> Pages, Source = Deploy from a branch, branch = main, folder = /(root), OR provide Cloudflare Actions credentials through GitHub Secrets (never chat).
2. Confirm DNS/custom-domain control for getwiredautoworx.co.za before final domain cutover.
3. Test the newly generated install-test APK on the physical Android phone.
4. Confirm whether a signed production APK is required now or only after web-store acceptance.
5. Complete final PayFast/payment-account verification before enabling live payment collection.
6. Approve supplier dispatch/fulfilment operating procedure before accepting live paid orders.

NOT LAUNCH BLOCKERS:
- Remaining 3,396 placeholder images. They are intentionally safe fallbacks and can be enriched after launch using exact-SKU verification.
- Signed APK, if only required for later production distribution rather than internal testing.

## 12.6 Current ETA
- Code/test readiness: immediate; automated QA is running against the current source.
- Public testing: approximately 15–45 minutes after a public hosting endpoint is successfully enabled, followed by approximately 45–90 minutes of live regression.
- Full live-readiness: approximately 2–4 hours after public hosting is available, assuming no new critical defect and owner-controlled payment/APK/operational gates are resolved.
- The store is NOT to be called LIVE until public browser evidence and owner sign-off exist.


---

# 13. EXECUTION HANDOVER — 1 OCTOBER 2026

## Objective
Continue the existing Get Wired AutoWorx store from its current state. Do not rebuild or restart. Execute all available remaining work and leave only genuine owner-controlled gates.

## Verified current state
- Repository: getwiredautoworx-max/get-wired-autoworx-store, main branch.
- Storefront source is preserved as the authoritative build.
- Supabase project: ojytykqpvonxvepprgbh.
- Current database verification: 4,187 active products; 4,187 priced active products; 4,187 unique active SKUs; 4,187 active products with stock; 4,187 active products with image URLs; 0 pricing-formula errors.
- Pricing formula verified as cost x 1.15 VAT x 1.35 markup, with displayed final price only.
- 3,396 products currently use safe branded fallback imagery; these are not treated as verified product-specific images.
- Exact-SKU matching remains mandatory for catalogue/store image replacement. Unverified images remain excluded from product-specific use.
- Existing storefront regression coverage includes category rendering, featured product modal, cart/checkout, R15 delivery, R0 pickup and desktop viewport checks.

## APK execution
- Owner APK project exists in android-owner-app.
- Production application ID remains za.co.getwiredautoworx.owner.
- Debug/test application ID now uses za.co.getwiredautoworx.owner.test.
- Debug/test version is 1.0.2-test, versionCode 3.
- This specifically addresses the previous physical-phone 'App not installed' conflict by allowing the test package to coexist with an existing production package.
- Validation workflow bundles the current storefront into the APK, builds the debug APK, uploads the artifact, installs it into an Android emulator and launches it.
- Validation run 36895104669 was triggered and must be checked to completion before declaring APK validation passed.

## Current automation runs
- Owner APK validation: run 36895104669.
- Storefront smoke test: run 36895104683.
- Clean product-image workflow: run 36895104626.
- These runs must be allowed to finish and their conclusions recorded before final release status is claimed.

## Hosting execution
- Cloudflare deployment workflow was investigated. The deployment reaches Wrangler but fails because CLOUDFLARE_API_TOKEN is not available to GitHub Actions.
- GitHub Pages recovery was investigated. The connected GitHub integration cannot create/administrate the repository Pages site.
- No false claim of a public deployment is permitted.
- The immediate public-testing gate is therefore repository Pages activation by the repository owner, or provision of Cloudflare deployment credentials through GitHub Secrets.
- Credentials must never be placed in chat or committed to the repository.

## Remaining owner-controlled gates
1. Enable GitHub Pages for the repository (Settings -> Pages -> Deploy from a branch -> main -> /(root)), OR add a Cloudflare API token to GitHub Actions Secrets.
2. Confirm control of getwiredautoworx.co.za for final DNS/custom-domain cutover.
3. Install and test the new Owner install-test APK on the physical Android phone.
4. Complete PayFast/payment-account verification before enabling live payments.
5. Confirm final fulfilment/dispatch procedure before accepting paid orders.
6. Decide whether a signed production APK is required immediately or after web-store acceptance.

## Execution rules
- Do not rebuild the store from scratch.
- Do not replace verified catalogue data with guesses.
- Do not assign catalogue images to products without exact SKU verification.
- Do not enable live payments until payment verification and end-to-end testing are complete.
- Do not call the store LIVE until public browser testing has passed and owner acceptance exists.
- Continue automatically through all tasks that are technically executable with current access.

## Release target
Target state: public browser storefront + validated checkout + verified catalogue/pricing + validated Owner APK + controlled payment activation + final owner acceptance.

## Current ETA
- Code/database readiness: ready for public testing.
- Public testing: approximately 15–45 minutes after hosting activation.
- Full regression: approximately 45–90 minutes after public endpoint availability.
- Full live-readiness: approximately 2–4 hours after public hosting and owner-controlled gates are available, assuming no new critical defect.


## 13.1 Execution update
- Storefront Smoke Test run 36895104683 completed SUCCESS.
- Clean Product Images run 36895104626 completed SUCCESS.
- Owner APK run 36895104669: Gradle APK compilation and artifact upload completed SUCCESS; emulator validation failed because the GitHub runner could not download the Android Emulator archive (ZIP preparation error), not because the APK failed to build/install.
- Emulator workflow was corrected to use API 35 and an explicit emulator build, then the failed APK job was re-run automatically.
- Public hosting remains the only major external gate after automated validation.

## 13.2 Execution update — 1 October 2026 (APK validation recovery)
- Verified automation results after the previous handover update:
  - Storefront Smoke Test run 36895710215: SUCCESS.
  - Clean Product Images run 36895710183: SUCCESS.
  - Cloudflare Pages production deploy run 36895711094: FAILED because GitHub Actions does not have the required CLOUDFLARE_API_TOKEN; no public Cloudflare deployment is claimed.
  - Owner APK validation run 36895610556: APK compilation and artifact upload succeeded; emulator validation failed before boot because the emulator action rejected the explicitly supplied emulator-build value 35.4.10. The APK itself was built successfully and artifact ID 11178962942 was created.
- Corrective action executed in commit e7412f2e143024b4eb3dbcece6f3d776a1c8a2c8:
  - Removed the unsupported explicit emulator-build input.
  - Removed the unsupported startup-timeout input; the action's supported emulator-boot-timeout remains configured at 600 seconds.
  - Kept API level 35, Google APIs, x86_64 and forced AVD creation.
  - The workflow will automatically run again from this corrective commit.
- Next automated gate: confirm the new Owner APK workflow reaches successful build + emulator install + launch validation.
- If emulator infrastructure fails again while APK build/artifact remains successful, treat it as CI/emulator infrastructure rather than an APK compilation defect and continue with physical-device APK testing.
- Public hosting remains blocked only by owner-controlled GitHub Pages activation or Cloudflare credentials in GitHub Secrets.
- No credentials are to be placed in chat or committed to the repository.

## 13.3 New-chat continuation point
- Resume from commit e7412f2e143024b4eb3dbcece6f3d776a1c8a2c8.
- First action in the next chat: check the Owner APK workflow triggered by this commit and inspect its final job conclusion.
- Then update this handover with the result before moving to public-hosting/browser regression.
- Do not rebuild the storefront, catalogue, database or image library.



# 14. OWN GET WIRED AUTOWORX SKU SYSTEM — 1 OCTOBER 2026

## Objective
Protect Get Wired AutoWorx's supplier sourcing information by using a proprietary customer-facing SKU system. Competitors and public customers must not be able to identify supplier stock codes simply by inspecting the storefront.

## SKU architecture — EXECUTED
- A new proprietary customer-facing field has been added to `public.products`: `public_sku`.
- Every active product now has a unique Get Wired AutoWorx SKU in the format `GW-XXXXXXXX`.
- The public SKU is derived from the product's internal UUID hash, not from the supplier SKU, product name, category, or supplier numbering system.
- Current verification: 4,187 active products; 4,187 have a populated proprietary `public_sku`; 0 active products are missing one.
- A unique database index protects `public_sku` uniqueness.
- A private Supabase schema `gw_private` has been created.
- Private supplier mapping table: `gw_private.product_supplier_codes`.
- The private mapping stores the original supplier SKU against the product ID so exact catalogue/image/stock matching can continue internally.
- Existing supplier-code data was copied into the private mapping without changing product pricing, stock, categories, descriptions or images.
- Migration applied successfully: `add_get_wired_public_sku_and_private_supplier_map`.

## Customer-facing rule
- Customers should see only the Get Wired AutoWorx proprietary SKU, e.g. `GW-XXXXXXXX`.
- Supplier SKUs must never be displayed on product cards, product details, WhatsApp messages, checkout, order confirmations, public catalogue pages, SEO-visible text, or customer-facing PDFs.
- Public search should work with the proprietary Get Wired SKU, product name, vehicle/application and other approved public information.
- Supplier names/codes must not be exposed merely because the same supplier catalogue is used internally.

## Internal matching rule
- Supplier SKU remains an INTERNAL matching key only.
- New catalogues may continue to be cross-referenced by exact supplier SKU internally.
- Catalogue image replacement remains exact-SKU only: exact internal supplier SKU match + better verified image.
- No visual-similarity substitution is permitted.
- No supplier code is to be converted into a public Get Wired SKU by copying, abbreviating, prefixing or otherwise revealing the supplier numbering pattern.
- The proprietary Get Wired SKU remains stable for the life of the product record.

## Migration / compatibility rule
- The existing `products.sku` field has NOT been blindly overwritten yet, because current image-sync/import workflows still use the legacy supplier SKU and changing it without updating those workflows could break exact image matching.
- The database now has the proprietary `public_sku` plus a private supplier-code map.
- Next implementation step is to migrate all public storefront, product-detail, cart, checkout, WhatsApp and order-display code to use `public_sku` while keeping supplier-code matching available only to trusted internal workflows.
- Before removing or changing legacy `products.sku`, all catalogue import, image-sync, admin and reporting workflows must be updated and regression-tested.
- Do not expose the private supplier mapping through the public storefront/API.

## Security requirement
- The private supplier-code map is intentionally separated from the public product presentation.
- Never put supplier mappings, supplier price lists, supplier URLs or supplier-code crosswalks into customer-visible assets.
- Never commit supplier secrets or credentials to GitHub.
- Any future supplier-code lookup used by automation must use a protected server-side/internal path rather than exposing the mapping to anonymous storefront users.

## Future catalogue uploads
When the owner uploads additional catalogues:
1. Identify the supplier SKU internally.
2. Match it against the private supplier mapping.
3. Confirm the corresponding Get Wired AutoWorx `public_sku`.
4. Compare the catalogue image with the current store image.
5. Replace the store image only when the exact internal SKU matches and the new image is demonstrably better/verified.
6. Keep unmatched or personally unverified images excluded.
7. Never publish the supplier SKU.
8. Preserve stock, price, category and product identity unless separately approved.

## Business protection objective
The store is being designed so that a competitor can identify the Get Wired AutoWorx product, proprietary SKU and advertised selling price, but cannot use the public SKU alone to infer the supplier's catalogue code/numbering system.

## Status
- Proprietary SKU database layer: EXECUTED AND VERIFIED.
- Public storefront migration to proprietary SKU: PENDING.
- Supplier-code public exposure audit: PENDING before final live launch.
- Exact-SKU catalogue/image matching capability: PRESERVED.
- No catalogue/database rebuild was performed.

## Continuation instruction
Treat this SKU-protection architecture as a permanent project rule. All future store, APK, catalogue, image, stock, import, reporting and customer-facing work must follow it.


---

# 15. PROPRIETARY PUBLIC SKU ROLLOUT + SUPPLIER PROTECTION — 1 OCTOBER 2026

## 15.1 Database layer — EXECUTED / VERIFIED
- 4,187 active products.
- 4,187 active products have a proprietary public_sku.
- 4,187 distinct public_sku values; 0 duplicate active public SKUs.
- 0 active public SKUs have an invalid GW-XXXXXXXX format.
- Proprietary format: GW-XXXXXXXX.
- Original supplier SKU remains mapped internally in gw_private.product_supplier_codes.
- gw_private.product_supplier_codes has RLS enabled.
- anon and authenticated have no SELECT privilege on the private supplier-code table.
- Public supplier mapping is not exposed through the customer storefront.

## 15.2 Customer-facing SKU migration — EXECUTED
The primary customer-facing paths now use public_sku:
- index-new.html storefront cards/search/product detail/WhatsApp messages.
- products.html category product cards/search/cart.
- product-details.js product detail and WhatsApp.
- checkout-v2.html cart/order summary.
- Customer-facing SKU text must show only the GW-XXXXXXXX proprietary SKU.

Existing products.sku was deliberately retained for internal compatibility. Do NOT delete/overwrite it until every internal catalogue/image/admin/reporting workflow has been migrated and regression-tested.

## 15.3 Supplier-code protection audit — EXECUTED
- Added scripts/public-sku-audit.py.
- Added .github/workflows/public-sku-exposure-audit.yml.
- The audit scans customer-facing HTML/JS/CSS/JSON for legacy runtime SKU references, supplier_sku identifiers and supplier website references.
- Internal ASC image-sync workflow is explicitly excluded from the customer-facing scan because it is an internal matching workflow.
- Any future public source containing supplier identifiers must fail the audit before release.

## 15.4 Catalogue/image matching framework — PREPARED
Added catalogue-image-matching/README.md defining the permanent controlled workflow:
- Catalogue item/image → internal supplier-code resolution → proprietary public_sku.
- Exact internal match required.
- Candidate image must be verified and materially better before replacement.
- REVIEW/EXCLUDE states prevent uncertain images from reaching production.
- Existing verified images and safe fallbacks remain protected.
- Supplier identifiers must never enter customer-facing PDFs, browser code, checkout, WhatsApp, SEO text or order confirmations.
- image_url must not be changed until the corresponding binary asset exists at its final production path and has passed validation.

## 15.5 Important implementation boundary
The former supplier-specific public GitHub image-sync workflow has been removed because the repository is public and the workflow itself exposed supplier identity/logic. Future image matching must run through an internal/privileged workflow using the private supplier-code mapping. Do not publish the private mapping, supplier URL or supplier identifiers in repository source.

## 15.6 Current next execution
1. Run/verify the new public SKU exposure audit.
2. Regression-test storefront, product detail, cart and checkout against public_sku.
3. Migrate internal ASC image matching to use the private mapping with privileged/internal access.
4. Resume catalogue/image binary processing when file/image access is available.
5. Keep hosting/public browser verification and APK acceptance gates unchanged.

## 15.7 Commits
- Public SKU storefront migration completed across primary customer-facing paths.
- Public SKU audit + catalogue matching framework committed immediately afterward.\n- Latest public-SKU hardening commit: f8d27c324b24b698cb7986a1835a11112e39e14c8.
- Database protection verified directly against Supabase.

## 15.8 Verification performed
- Direct Supabase verification confirms 4,187/4,187 active products have valid unique public_sku values.
- Direct Supabase verification confirms gw_private.product_supplier_codes has RLS enabled and anon/authenticated SELECT access revoked.
- Direct source audit of the primary storefront, product listing, product detail and checkout files found 0 legacy p.sku/x.sku references and 0 supplier website references.
- Supabase security advisor still reports the private mapping table as RLS-enabled with no policy; this is intentional deny-by-default defence because anon/authenticated have no table/schema access. Existing SECURITY DEFINER RPC advisories are pre-existing operational/security items and were not changed as part of the SKU migration.


### SUPPLIER NETWORK / SOURCE-ON-DEMAND INTEGRATION — 2 OCTOBER 2026
- [x] Expanded the supplier architecture without rebuilding the existing store.
- [x] Added supplier-specific mapping support to the private `gw_private.product_supplier_codes` table via nullable `supplier_id`, preserving the existing exact supplier-SKU matching workflow.
- [x] Added private `gw_private.supplier_catalog_items` for authorised supplier catalogue products. Supplier SKU/source data remains server-side and is never exposed to customers.
- [x] Added private `gw_private.quote_supplier_attempts` so one customer sourcing request can be queued against multiple active suppliers.
- [x] Upgraded `supplier-quote` from v9 to **v10**. Product quote requests now prefer an explicitly mapped supplier, then the product's configured supplier, then the normal priority fallback.
- [x] Added `sourcing_request` to `supplier-quote` for products/parts not currently in the Get Wired catalogue. It creates one customer-facing quote reference and queues the request against the active supplier network without exposing supplier codes.
- [x] Added a customer-facing **SOURCE A PART / CAN'T FIND THE PART?** workflow to the storefront. Customers can submit a product/vehicle requirement, quantity and contact/delivery information for supplier sourcing.
- [x] Added the same sourcing prompt to the product-listing page.
- [x] Current active supplier network includes Caelex Infolog, Accessories Spares Centre and Electro City.
- [ ] Actual third-party supplier product advertising/catalogue publication remains controlled: supplier product data/images may only be published where the supplier authorises their use or supplies an approved feed/catalogue. Public supplier catalogues are used for discovery/cross-reference only until that permission/feed exists.
- [ ] Live supplier price/availability remains dependent on each supplier's authorised query channel. No supplier price is invented or shown as confirmed before supplier response.
- [ ] Live payment link generation remains blocked until PayFast/Payflex/PayJustNow merchant onboarding/credentials are completed.


### SUPPLIER NETWORK IMPLEMENTATION CHECKPOINT — 2 OCTOBER 2026
- `supplier-quote` is now v10.
- Storefront sourcing UI commit: `bf8c4654df6b9c7b0a586fda9f07d68b549e4f98`.
- Product-listing sourcing prompt commit: `f4a46571d859d432bd8eab8ae467cef618f1cd2e`.
- Handover supplier-network sections committed after implementation.
- Database verification: 3 active suppliers; 4,198 private supplier-code mappings; 0 authorised supplier catalogue items published; 0 quote supplier attempts currently queued.
- Security advisor after this DDL reports only the pre-existing leaked-password protection warning plus expected RLS-without-policy INFO findings for the two new private tables. The private tables deliberately deny anon/authenticated access.


### PRODUCT IMAGE QUALITY + WATERMARK UPDATE — 2 OCTOBER 2026
- [x] Updated the automated Clean Product Images workflow in commit dd073610dff803573ecd61662162400a80d41ebe.
- [x] All generated ecommerce product images now receive a permanent **GET WIRED AUTOWORX** watermark, including a restrained central ownership mark and a small corner brand mark.
- [x] Image output upgraded from 1200x1200 to **1600x1600**, JPEG quality **98**, 4:4:4 chroma (subsampling=0), progressive encoding and 300 DPI metadata.
- [x] Existing exact-SKU / verified-image protection remains unchanged: no visual-similarity substitution is authorised and uncertain/unverified catalogue images remain excluded.
- [ ] The updated workflow must complete successfully and the resulting image set must be verified before this image pass is marked fully complete.


---

# 16. CURRENT CONTINUATION CHECKPOINT — 7 OCTOBER 2026

## 16.1 Current verified position
- Storefront remains the production foundation; no rebuild is justified.
- Current Owner APK workflow is present and corrected for emulator validation: builds debug APK, preserves artifact, launches API 35 emulator, installs APK and checks Owner activity starts.
- GitHub Pages remains blocked by the connected Actions integration's inability to create the Pages site. This is infrastructure/integration, not storefront code.
- Cloudflare Pages workflow is correctly configured for Wrangler Pages deployment but requires the owner-controlled `CLOUDFLARE_API_TOKEN`. No Cloudflare credits are to be used.
- Netlify remains excluded from production. No Netlify credits are to be used.

## 16.2 Remaining tasks — priority order
### P0 — Reachable public hosting
- Establish a reachable public hosting route.
- GitHub Pages: enable Pages manually in repository Settings -> Pages -> Deploy from a branch -> main -> /(root), if the account UI permits it.
- If GitHub Pages remains blocked, Cloudflare Pages can be used only after the owner adds `CLOUDFLARE_API_TOKEN` to GitHub Actions secrets. Never paste the token into chat/source.

### P1 — Public browser/live storefront verification
Once a public URL exists, verify homepage, navigation, categories/subcategories, search, product detail/public SKU, images/placeholders, cart, checkout, pickup vs quoted delivery, R25 packaging per item, payment instructions, WhatsApp handoff, mobile/desktop behaviour, console/network errors and production/source/database consistency.

### P1 — Fulfilment pricing correction
- Pickup from owner's premises = R0.
- Packaging = R25 per item.
- Delivery = actual Courier Guy/PAXI quotation and subject to quotation.
- No fixed R15 nationwide delivery fee is to be displayed or used.

### P1 — 99 exact-SKU image binaries
- 99 exact-SKU JPEG assets are prepared.
- Commit binaries through a supported repository/storage path.
- Only after final asset paths exist, update corresponding `image_url` values and verify deployed loading.
- Preserve safe branded placeholders for unmatched products.

### P1 — Owner APK functional acceptance
- Test Owner login/authentication, dashboard, catalogue/product management, storefront/checkout paths exposed by the app, back navigation/WebView behaviour and runtime stability.
- Do not invent credentials or bypass authentication.

### P1 — Payment/bank-detail final verification
- Confirm final customer-facing EFT/bank/payment-reference details.
- Do not put private banking information into chat.

### P1/P2 — Signed release APK, if required
- Current debug APK is for internal acceptance only.
- If distributable production APK is required: build signed release, verify application ID/version/versionCode, SHA-256, signature and installation.

### P2 — Final operational QA
After public hosting: run a non-production checkout/order-path test without creating a real customer order; verify order references/admin visibility, payment/fulfilment statuses, stock/price revalidation, pickup/quoted delivery and WhatsApp handoff.

### P2 — Production deployment regression
Verify the selected deployment path from current `main`, confirm no test source is deployed, confirm Owner APK workflow uses authoritative `android-owner-app`, and record final production commit/run evidence.

### P3 — Post-launch enrichment
Continue exact-SKU imagery, catalogue/compatibility QA, admin improvements, authorised supplier catalogue/feed publication, and payment-provider automation after merchant onboarding. These are not launch gates unless explicitly promoted.

## 16.3 Do not redo
- Do not rebuild the storefront.
- Do not redo completed Supabase/catalogue foundation.
- Do not use the obsolete 1,109-row CSV.
- Do not substitute images by visual similarity.
- Do not spend Replit, Cloudflare or Netlify credits.
- Do not claim public/live until actual public browser evidence exists.

## 16.4 Immediate sequence
1. Establish reachable public hosting without prohibited credits.
2. Run public storefront regression.
3. Correct/verify pickup, quoted delivery and R25 packaging logic.
4. Deploy the 99 exact-SKU binaries safely and verify.
5. Complete Owner APK functional acceptance.
6. Verify final payment/bank details.
7. Run final operational QA.
8. Build signed release APK if required.
9. Record final live-readiness evidence.

This section supersedes older conflicting blocker descriptions.

# 17. VERIFIED GITHUB PAGES RECOVERY — 7 OCTOBER 2026

- [x] GitHub Pages manual setup completed by owner: Settings → Pages → Deploy from a branch → main → /(root).
- [x] GitHub's generated pages build and deployment run 37588242362 completed successfully.
- [x] Build job 112683299304 = success.
- [x] Report-build-status job 112683483345 = success.
- [x] Deploy job 112683483350 = success.
- [x] Previous Pages site-creation/integration blocker is resolved.
- [ ] Public browser verification remains required before declaring the storefront publicly reachable.
- [x] Active storefront wrapper links to checkout-v2.html.
- [x] checkout-v2 uses pickup R0 delivery, R25/item packaging, and separate Courier Guy/PAXI quotation for delivery.
- [x] Delivery orders require a quotation; cash-on-pickup is restricted to pickup.
- [ ] End-to-end browser checkout test remains pending until public access is reachable.
- [ ] 99 exact-SKU image binaries remain pending deployment/verification.
- [ ] Owner APK functional acceptance remains pending.
- [ ] Final payment/bank-detail verification and final operational QA remain pending.
