# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-09-30 SAST

## SOURCE OF TRUTH
- Repository: getwiredautoworx-max/get-wired-autoworx-store
- Branch: main
- Production Owner APK source: android-owner-app/
- Package: za.co.getwiredautoworx.owner
- Production APK version: 1.0.1 / versionCode 2
- compileSdk/targetSdk: 35
- Store remains subject to final public verification before being called LIVE.
- **NO REPLIT CREDITS. NO CLOUDFLARE CREDITS. NO NETLIFY CREDITS.**
- Never expose secrets, passwords, private keys or tokens.

## CURRENT EXECUTIVE STATUS

### COMPLETED / VERIFIED
1. Storefront source and routing are implemented and smoke-tested.
2. Supabase/database/catalogue foundation is complete; do not restart this work.
3. Checkout fulfilment/payment guard corrections are complete and source-regression tested.
4. Admin authentication/RPC security review completed.
5. Product-image cleanup pipeline completed; verified images were not replaced with unsafe guesses.
6. Exact production Owner APK build completed successfully.
7. Exact production Owner APK emulator validation completed successfully.
8. Storefront automated smoke test completed successfully.
9. Cloudflare Pages deployment path was corrected from the obsolete Workers command to the correct Pages command.
10. Cloudflare deployment failure was independently identified as a missing GitHub Actions secret: CLOUDFLARE_API_TOKEN.
11. GitHub Pages fallback was independently tested and conclusively blocked at Pages-site creation because the GitHub Actions integration lacks permission to create the Pages site.
12. A repository-side GitHub Pages recovery route has now been prepared: branch-based Pages publishing plus a CNAME for getwiredautoworx.co.za.

### NOT YET COMPLETE
1. Owner-side GitHub Pages site creation/configuration.
2. Alternatively, Cloudflare Pages deployment requires the repository Actions secret CLOUDFLARE_API_TOKEN.
3. Final public storefront/browser regression.
4. Owner verification of final EFT/bank/payment details.
5. Final Owner APK functional acceptance beyond the verified emulator/launcher path, where owner credentials/UI acceptance are required.
6. Production release/signing approval if a signed release APK is required.
7. Only after the above gates may the store/APK be called live-ready.

## OWNER APK — VERIFIED

### Exact production workflow
- Workflow: .github/workflows/build-owner-apk.yml
- Production source is the authoritative private store repository, not the later validation-only v1.0.2 source.
- Production APK: v1.0.1, versionCode 2.
- Package: za.co.getwiredautoworx.owner.

### Successful production validation
- Run: 36750308741
- Result: SUCCESS
- Job: 110006925647 — SUCCESS
- Successful stages included checkout, Java, Android SDK, Gradle, storefront bundling, debug APK build, artifact preservation and emulator validation.
- Emulator validation completed successfully after the smoke-test script was corrected.
- Artifact: 11114172502
- Artifact name: get-wired-autoworx-owner-debug-apk
- Artifact size: 88,454,478 bytes
- Artifact digest: sha256:137bf0a7ea3a02c7e0b9c77019a081d641bafa599ce4a1ec15e5a43718337fd9
- Artifact expiry: 2026-12-29
- This is the exact production-source APK validation result.

### Earlier validation route
- Isolated validation run: 36558844914
- Build job: 109374518041 — SUCCESS
- Emulator job: 109374948898 — SUCCESS
- Artifact: 11028297177, get-wired-owner-debug
- APK SHA-256 recorded: a15cac3c4126c8bd7c9d2abffd94b121c5e2aac1b26275bf19246760b1f7185b
- This earlier validation repository used v1.0.2/versionCode 3 and therefore is supporting evidence for the emulator route, not the authoritative production version.

### Production APK workflow fixes
- Commit d24ff82feece2d38d6a2c250a651da1a821775e3 corrected the emulator smoke-test implementation after an earlier shell-loop failure.
- Earlier run 36746358501 built the exact production APK successfully but emulator smoke testing failed because the action split malformed shell loops. The emulator itself booted. The workflow was then corrected.
- Subsequent production run 36750308741 completed successfully.

## STOREFRONT — VERIFIED

### Automated smoke test
- Storefront Smoke Test run: 36750308661
- Result: SUCCESS
- Covers automated storefront source/runtime checks including mobile entry, catalogue/category rendering, product detail, add-to-cart, checkout navigation/form behaviour and desktop viewport handling.

### Source routing
- index.html routes to store.html.
- store.html loads the approved customer storefront.
- Cart/checkout handoff is implemented.
- Product image fallback and category/navigation enhancements are retained.

### Public verification status
- Automated smoke success is NOT public-site verification.
- Actual public production hostname still requires final browser testing.
- Do not call the store LIVE until public verification is completed.

## DATABASE / CATALOGUE — COMPLETED

Authoritative latest verified state:
- 4,187 active products
- 4,187 active priced/unique active SKUs
- 4,187 active products with stock > 0
- 27,745 total active units
- 0 uncategorized active products
- 0 pricing mismatches
- 791 active products with product-specific images
- 3,396 active products use the safe branded placeholder
- Seven approved public tables exist and RLS is enabled.
- Pricing formula: cost × 1.15 VAT × 1.35 markup.

### Catalogue rules
- Do NOT use the obsolete 1,109-row CSV.
- Validated source: September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv.
- Existing verified stock and product data must not be rebuilt unnecessarily.

## IMAGE QA — COMPLETED / SAFE STATE

- September Buyers Guide was audited for exact SKU/photo relationships.
- No unsafe visual-similarity substitutions were made.
- The guide does not provide safe exact-SKU photographs for the 3,396 placeholder products.
- Existing verified product-specific images remain untouched.
- Additional image enrichment requires a verified source containing the exact SKU/product.

## CHECKOUT / ORDER FLOW — COMPLETED

- Customer checkout revalidates active cart products against Supabase before order creation.
- Server-side create_store_order remains authoritative for product, price, stock, fulfilment and payment validation.
- Nationwide delivery and store pickup are implemented.
- Delivery fee: R15.
- Pickup fee: R0.
- Cash-on-pickup is restricted to pickup.
- EFT/manual payment/cash-on-pickup handling is implemented as applicable.
- No real customer order has been created during QA.
- Payment remains pending until store confirmation.
- No card details are collected.

## ADMIN / SECURITY — VERIFIED

- Supabase Auth protects admin access.
- admin_list_orders and admin_update_order require authenticated/admin authorization.
- owner/admin publishing controls remain protected.
- No authorization bypass was identified in the latest security review.
- No service-role key, Supabase service-role secret or live Stripe secret was found in indexed frontend source.
- No production customer data was altered during the latest QA passes.
- Supabase leaked-password protection remains an owner dashboard configuration item.
- Do not make blind RLS/advisor changes merely to silence warnings.

## IMAGE CLEANUP PIPELINE — COMPLETED
- .github/workflows/clean-product-images.yml completed successfully.
- 800 images were processed.
- Do not rerun without a specific verified image problem.

## HOSTING / DEPLOYMENT

### Cloudflare Pages
Correct command is:
npx wrangler pages deploy . --project-name=get-wired-autoworx-store --branch=main

The previous Workers-style deployment command was removed because it incorrectly included repository objects and hit asset-size limitations.

Latest independently verified Cloudflare failure:
- Run: 36750308973
- Job: 110006926556
- Wrangler installed successfully.
- Correct Pages command was reached.
- Failure reason:
  CLOUDFLARE_API_TOKEN is required in the non-interactive GitHub Actions environment.
- This is an Actions secret/configuration blocker, not a storefront-code failure.
- No Cloudflare credits were used.

### GitHub Pages fallback
A GitHub Pages staging workflow was tested:
- Run: 36750308896
- Job: 110006927074
- Failure:
  Get Pages site failed: Not Found
  Create Pages site failed: Resource not accessible by integration
- This independently confirms the connected GitHub Actions integration cannot create the Pages site.
- This is a repository/account permission/configuration limitation, not a storefront-code failure.

### Current GitHub Pages recovery solution
Repository-side preparation completed:
- Root CNAME committed in commit 56efe6f90dae5b25cff312aca95bc52514ec7080.
- CNAME value: getwiredautoworx.co.za
- Recovery instructions committed in GITHUB_PAGES_RECOVERY.md.
- Recovery documentation commit: 298f7ea22aaf8d119cf47f764587be3a46596d2c.

Owner action required:
1. Open repository Settings → Pages.
2. Under Build and deployment, choose Source: Deploy from a branch.
3. Select branch main.
4. Select folder /(root).
5. Save.
6. GitHub Pages can then publish the existing root index.html without requiring the blocked Actions integration to create the Pages site.

Exact settings page:
https://github.com/getwiredautoworx-max/get-wired-autoworx-store/settings/pages

Do not purchase or consume Cloudflare, Netlify or Replit credits.

### Netlify
- Historical Netlify deployment is stale and is NOT a production target.
- Do not refresh/deploy Netlify because no Netlify credits may be used.

## CURRENT REQUIRED OWNER INPUT

The immediate deployment unblock is one of these two routes:

### Route A — GitHub Pages
Owner enables:
Settings → Pages → Deploy from a branch → main → /(root) → Save.

### Route B — Cloudflare Pages
Owner provides/configures the GitHub Actions secret:
CLOUDFLARE_API_TOKEN

The token must be entered as a GitHub Actions repository secret and must never be placed in source code or chat.

Route A is the prepared no-credit fallback. Route B retains the existing Cloudflare deployment architecture.

## FINAL PUBLIC VERIFICATION GATE

After a public URL is available:
1. Open the actual public Get Wired AutoWorx storefront.
2. Verify homepage.
3. Verify categories/search.
4. Verify product detail/images.
5. Verify cart.
6. Verify checkout.
7. Verify delivery/pickup/payment presentation.
8. Verify WhatsApp/contact handoff.
9. Verify mobile and desktop behaviour.
10. Compare public result with the current GitHub/Supabase source.
11. Record the actual public URL and result in LIVE_READINESS.md and this handover.
12. Do not create a real customer order during validation unless explicitly authorised.

## FINAL RELEASE STATUS

### Verified successful
- Storefront source QA: PASS
- Storefront automated smoke test: PASS — run 36750308661
- Exact production Owner APK build: PASS
- Exact production Owner APK emulator validation: PASS — run 36750308741 / job 110006925647
- APK artifact preservation: PASS — artifact 11114172502
- Database/catalogue QA: PASS
- Pricing formula QA: PASS
- Checkout fulfilment/fee guard: PASS
- Admin/security source review: PASS
- Image-cleanup pipeline: PASS
- Cloudflare Pages command/path correction: PASS
- GitHub Pages recovery preparation: PASS

### Still pending
- GitHub Pages owner-side enablement OR Cloudflare Actions token configuration
- Public production URL verification
- Final public browser regression
- Owner verification of final payment/bank details
- Final Owner APK functional acceptance beyond automated emulator checks where owner credentials are required
- Final signed/release APK approval if required

## ABSOLUTE PROJECT RULES
- NO REPLIT CREDITS.
- NO CLOUDFLARE CREDITS.
- NO NETLIFY CREDITS.
- Do not restart completed Supabase/catalogue/storefront work.
- Do not use the obsolete 1,109-row CSV.
- Do not guess product-image mappings.
- Do not expose secrets.
- Do not create real customer orders during QA without explicit authorization.
- Do not claim the store is LIVE until the actual public site has been browser-tested.
- Continue from this handover rather than restarting previous work.
