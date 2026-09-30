# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-30 SAST

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
- Nationwide delivery = R15.
- Store pickup = R0.
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
