# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-30 SAST

## SOURCE OF TRUTH
- Repository: getwiredautoworx-max/get-wired-autoworx-store
- Branch: main
- Production Owner APK source: android-owner-app/
- Package: za.co.getwiredautoworx.owner
- Production APK: v1.0.1 / versionCode 2
- compileSdk/targetSdk: 35
- NO REPLIT CREDITS. NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.
- Do not expose secrets, passwords, private keys or tokens.

## COMPLETED / VERIFIED

### Storefront
- Customer storefront source/routing complete.
- Automated Storefront Smoke Test 36750308661 = SUCCESS.
- Mobile entry, catalogue/category rendering, product detail, add-to-cart, checkout navigation/form behaviour and desktop viewport checks passed.
- Automated smoke testing is not a substitute for public browser testing.

### Database / catalogue
- 4,187 active products.
- 4,187 active priced/unique active SKUs.
- 4,187 active products with stock > 0.
- 27,745 total active units.
- 0 uncategorized active products.
- 0 pricing mismatches.
- 791 active products with product-specific images.
- 3,396 active products use the safe branded placeholder.
- RLS enabled on the seven approved public tables.
- Pricing formula: cost × 1.15 VAT × 1.35 markup.
- Obsolete 1,109-row CSV must never be used.

### Checkout / orders
- Server-authoritative product, price, stock, fulfilment and payment validation complete.
- Nationwide delivery = R15.
- Store pickup = R0.
- Cash-on-pickup restricted to pickup.
- EFT/manual payment/cash-on-pickup paths implemented as applicable.
- No real customer order created during QA.
- No card details collected.

### Admin / security
- Supabase Auth/admin RPC authorization reviewed and passed.
- No authorization bypass identified.
- No service-role/private payment secrets found in indexed frontend source.
- No production data changed during latest QA.
- Leaked-password protection remains an owner dashboard configuration item.

### Images
- September Buyers Guide exact SKU/photo audit completed.
- No unsafe visual-similarity substitutions made.
- 3,396 placeholders intentionally remain where no verified exact-SKU image exists.
- Image cleanup workflow processed 800 images successfully.

### Owner APK
- Exact production-source workflow 36750308741 = SUCCESS.
- Job 110006925647 = SUCCESS.
- Production APK build, storefront bundling, artifact preservation and emulator validation all passed.
- Artifact 11114172502, get-wired-autoworx-owner-debug-apk.
- Artifact size: 88,454,478 bytes.
- Artifact digest: sha256:137bf0a7ea3a02c7e0b9c77019a081d641bafa599ce4a1ec15e5a43718337fd9.
- Artifact expiry: 2026-12-29.
- Earlier isolated validation run 36558844914 also passed, but used validation v1.0.2/versionCode 3 and is supporting evidence only.
- Emulator smoke-test workflow was corrected in commit d24ff82feece2d38d6a2c250a651da1a821775e3.

## HOSTING / DEPLOYMENT STATUS

### Cloudflare Pages
Correct deployment command: npx wrangler pages deploy . --project-name=get-wired-autoworx-store --branch=main
- Run 36750308973 / Job 110006926556.
- Correct Pages command reached.
- Failure is exclusively due to missing CLOUDFLARE_API_TOKEN in GitHub Actions.
- No Cloudflare credits were used.

### GitHub Pages
- Run 36750308896 / Job 110006927074.
- Get Pages site: Not Found.
- Create Pages site: Resource not accessible by integration.
- This proves the connected Actions integration cannot create the Pages site.
- This is not a storefront-code failure.

Repository-side recovery completed:
- Root CNAME committed for getwiredautoworx.co.za.
- Recovery instructions committed in GITHUB_PAGES_RECOVERY.md.
- Prepared route: GitHub Pages -> Deploy from a branch -> main -> /(root).

Settings:
https://github.com/getwiredautoworx-max/get-wired-autoworx-store/settings/pages

### Netlify
- Historical deployment is stale and not a production target.
- Do not deploy or refresh Netlify.

## ALL REMAINING TASKS

### P0 — Public hosting unblock
Owner input required: complete ONE route.

Route A — GitHub Pages, no credit use:
1. Open repository Settings -> Pages.
2. Set Source = Deploy from a branch.
3. Branch = main.
4. Folder = /(root).
5. Save.
6. Wait for Pages to publish.
7. Tell me when saved so the resulting public URL can be verified.

Route B — Cloudflare Pages:
1. Create/use an appropriate Cloudflare API token.
2. Add it to GitHub repository Actions secrets as CLOUDFLARE_API_TOKEN.
3. Never paste the token into chat/source.
4. Rerun the Cloudflare Pages workflow.
5. Verify the resulting public hostname.
- No Cloudflare credits need to be purchased for this configuration route.

### P1 — Public storefront verification
Once a public URL exists:
1. Verify HTTPS/reachability.
2. Confirm it is the intended Get Wired AutoWorx storefront.
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
17. Record URL/results in LIVE_READINESS.md and this handover.

### P1 — Owner APK functional acceptance
Automated production emulator validation proves build/install/launch/activity execution. Remaining functional acceptance:
1. Owner Login.
2. Owner/admin dashboard loads.
3. Product/catalogue navigation.
4. Product/cart path where exposed by the Owner app.
5. Checkout/storefront path.
6. Back navigation.
7. WebView file chooser if required by admin.
8. Confirm no runtime crash or blocking WebView error.
- Do not invent credentials or bypass authentication.
- Owner credentials/input may be required for authenticated screens.

### P1 — Payment/bank-detail verification
Owner must verify final customer-facing EFT/bank/payment details:
- Bank name.
- Account/beneficiary details.
- Payment reference instructions.
- Payment confirmation workflow.
- No obsolete/test banking details remain.
- Do not place private payment information in chat.

### P1 — APK release decision
- Decide whether verified debug APK is sufficient for internal Owner use.
- If distributable production APK is required, create/verify production signing configuration.
- Verify application ID/version/versionCode.
- Build signed release APK.
- Verify SHA-256.
- Install/test signed release.
- Never put signing keys/passwords in source.
- Do not call debug artifact a Play Store/release-signed APK.

### P2 — Production deployment regression
After hosting is live:
- Verify future push/deployment workflow behaviour.
- Confirm no test/validation source is deployed.
- Confirm production APK workflow still uses authoritative android-owner-app.
- Confirm obsolete Netlify/Workers deployment is not triggered.
- Record final production commit/run references.

### P2 — Catalogue/image enrichment
Not currently a technical launch blocker:
- Obtain verified supplier/ASC/product-image sources for remaining placeholders.
- Match by exact SKU/product identity only.
- Never substitute by visual similarity.
- Re-run image QA after verified enrichment.
- Preserve the existing 791 verified images.

### P2 — Final operational QA
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

### P3 — Post-launch improvements
Not launch gates unless made mandatory:
- Replace remaining verified placeholders with exact-SKU imagery.
- Expand product imagery/vehicle compatibility.
- Add further payment automation if desired.
- Add analytics/monitoring.
- Add signed release distribution/Play Store packaging.
- Improve admin operational tooling.
- Continue catalogue QA.

## CURRENT BLOCKERS — EXACTLY DEFINED
1. Public hosting creation/configuration — owner action required because GitHub Actions cannot create Pages and Cloudflare Actions lacks CLOUDFLARE_API_TOKEN.
2. Public browser verification — requires a reachable public production URL.
3. Final payment/bank-detail confirmation — owner-controlled.
4. Authenticated Owner APK functional acceptance — owner credentials/input may be required.
5. Signed release APK — only required if production-signed distribution is desired.

No storefront/database rebuild is currently justified.

## FINAL RELEASE GATE
The store may be called LIVE-READY only after:
- Public URL is reachable.
- Public storefront regression passes.
- Checkout/order flow is verified.
- Payment/bank details are confirmed.
- Owner APK functional acceptance is complete.
- Any required signed release APK is built and verified.
- No critical production errors remain.

The store must NOT be called LIVE merely because GitHub Actions, the APK build, or automated smoke tests passed.

## ABSOLUTE PROJECT RULES
- NO REPLIT CREDITS.
- NO CLOUDFLARE CREDITS.
- NO NETLIFY CREDITS.
- Do not restart completed Supabase/catalogue/storefront work.
- Do not use the obsolete 1,109-row CSV.
- Do not guess product-image mappings.
- Do not expose secrets.
- Do not create real customer orders during QA without explicit authorization.
- Do not claim public/live verification without actual public browser evidence.
- Continue from this handover; do not restart completed tasks.


### 2026-09-30 — Uploaded ASC catalogue image/category update
- Source catalogues processed: ASC- Seat and steering wheel covers.pdf and ASC- Viscous Units and Fan Blades.pdf.
- Catalogue pages are image-based; product image/SKU relationships were extracted from the catalogue layout and matched by exact SKU, not visual similarity.
- Supabase category corrections applied for the matched catalogue SKUs: Seat Covers, STEERING WHEEL COVERS, Fan Blades, Fan Clutches, and Complete Fans.
- Exact-SKU image pack prepared for 99 matched existing store products.
- The generated JPEGs are packaged as Get_Wired_AutoWorx_Catalogue_SKU_Images.zip for the repository asset commit.
- IMPORTANT: product image_url values have NOT been pointed at new paths yet; this prevents broken image URLs until the JPEG binaries are committed to the production repository.
- Do not claim this image update is fully deployed until the JPEG assets are committed and storefront image URLs are verified.
