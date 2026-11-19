# HANDOVER CURRENT — 18 November 2026

## Owner-approved reset: Audio & Entertainment only

The active working scope is a clean Audio & Entertainment storefront. This supersedes the previous Electrocity Auto Electrical priority.

### Current repository state
- Repository: `getwiredautoworx-max/get-wired-autoworx-store`
- Working branch: `owner/electrocity-auto-electrical-priority-2026-11-17-final` (existing branch retained; its historical name does not describe the current contents).
- Existing PR: [#213 — Owner reset: Audio & Entertainment only](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/213)
- PR #213 is OPEN and DRAFT, not merged.
- At this checkpoint, PR #213 is 83 commits ahead of `main` and 0 behind.
- `main` remains at `7ec84e6e1254e2f6598305f42702beab3ade7901`; this reset has not changed main.
- PR head before this handover update: `acb2f9f736f516f156016d6f12d98d2559884c94`. The storefront/package checkpoint remains `c6a3e64cf9835c52af6fd00cb6354352625decb6`; intervening commits were documentation/handover updates.
- 350 files were removed from the previous working candidate during this reset.
- The previously audited tracked tree contained 5,242 files. Remaining supplier folder is Audio Connections only; remaining supplier source PDFs are STARSOUND and Sony Mobile ES.
- Customer-facing category snapshot: 15 audio/entertainment categories and subcategories. No ASC, Electrocity, Caelex, Auto Electrical or ignition catalogue paths remain in the current tree.

### Keep
- Get Wired AutoWorx logo, brand colours, homepage and storefront shell.
- Audio & Entertainment root category and its audio subcategories/navigation.
- Existing curated audio preview records, approved audio imagery and audio source/evidence files.
- Cart, checkout, customer accounts, admin and order-management code.
- Existing Supabase integration, authentication, RLS, security tests, payment and delivery infrastructure.

### Removed from the current working tree
- ASC and ASC-derived catalogue/source/review files.
- Electrocity Auto Electrical catalogues, ignition source material, extracted images and pilot records.
- Caelex supplier documents and integration notes.
- Non-audio supplier source catalogues, review data, staging material and category previews.
- Auto Electrical preview records, image-processing script, routes and obsolete QA workflow/tests.
- Old three-category storefront tests and category-navigation mappings for non-audio departments.

### Preserved but quarantined pending image mapping
- The 790 legacy product images and 4,101 WebP assets remain temporarily in GitHub because they are not reliably mapped to audio/non-audio SKUs. They are excluded from the public Pages preview package and are not displayed as products. Do not bulk-delete or expose them until image-to-product references are audited.
- Historical Git commits remain available for recovery; no bulk Git branch or history deletion is part of this reset.

### QA checkpoint — storefront/package commit `c6a3e64cf9835c52af6fd00cb6354352625decb6`
Passed:
- Audio-only storefront scope test (15 categories).
- Cloudflare public-package build and public preview data sanitisation.
- Storefront smoke test and button-only smoke test.
- Owner preview mobile and desktop browser QA.
- Supplier catalogue review-data QA.
- Catalogue image audit.
- Public SKU exposure audit.
- Axxess package preparation (artifact only; no Axxess upload).
- Cloudflare Pages branch preview deployment for the non-production owner preview.

Build log confirmed: `PAGES_PUBLIC_BUILD_PASS files=56 unclassified_legacy_images_excluded=true`.

### Owner APK — emulator validation PASSED
- Latest workflow: [Build and Validate Get Wired AutoWorx Owner APK](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489949)
- Latest run `44244489949`, attempt 1, completed successfully on 18 November 2026 for candidate commit `acb2f9f736f516f156016d6f12d98d2559884c94`. Earlier run `44244249805` also passed.
- Passed: Owner WebView security-boundary check, debug APK build, SHA-256 recording, install-test artifact upload, Android emulator startup and APK emulator validation.
- Install-test APK artifact: `get-wired-autoworx-owner-install-test-apk`; artifact ID `14401315584`; expires 25 November 2026.
- Artifact digest: `sha256:e87eab8e20b975d2922dac7fc5a01ec6d22fd330548d5253ce6cb36ab4731f58`.
- Emulator success does not replace a final physical Android phone install/use test.

### Latest full QA refresh — candidate commit `acb2f9f736f516f156016d6f12d98d2559884c94`
The following latest candidate checks all completed successfully on 18 November 2026:
- [Owner APK build and Android emulator validation](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489949).
- [Owner preview mobile and desktop browser QA](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489998). The browser job installed Chromium/Playwright, started a local static preview server, and passed the mobile/desktop owner-preview and audio-product-route check.
- [Cloudflare Pages public package QA](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489902).
- [Storefront smoke test](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489970) and [button-only smoke test](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244490028).
- [Supplier catalogue review-data QA](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489850), [catalogue image audit](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489903), [public SKU exposure audit](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244489977), and [Axxess package preparation](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/44244490017) all passed.

These automated checks validate the static owner preview and APK launch/install path. They do not constitute an owner visual sign-off, a physical phone test, live checkout/payment test, or production release.

### Customer-facing non-production preview
**Commit-specific owner preview:** https://dfb42c3a.get-wired-autoworx-store.pages.dev/owner-preview.html

**Branch preview:** https://owner-electrocity-auto-elect-jlhe.get-wired-autoworx-store.pages.dev/owner-preview.html

- Cloudflare Pages deployed the branch preview for storefront/package commit `c6a3e64`. The commit-specific URL is preferred for this tested package.
- The owner-preview route blocks checkout and Supabase write actions.
- The public package contains 56 allowlisted files and excludes supplier source folders, review/staging data and the unclassified legacy WebP image library.
- The branch URL contains the former Electrocity slug because the existing PR branch was reused; the current store tree itself has no Electrocity catalogue paths.
- This is a non-production preview, not the production website.

### Audio pricing and Planetworld reconciliation — 18 November 2026
- Owner confirmed Audio Connections products must show a verified price when the supplier list supports one; Price On Request is not a blanket rule for Audio & Entertainment.
- Confirmed cause of the all-POR display: `preview-audio.html` hard-coded `CUSTOMER_PRICE_DISPLAY="Price On Request"` and returned that for every product, regardless of any verified customer-facing price field. The public-data sanitiser does not strip numeric selling prices.
- Corrected the preview display rule in commit `413f67f8c7d8f6ac6ffab99cd805479ef90f684c`: it now displays only an explicit VAT-inclusive `customerPriceIncl` or `sellingPriceIncl` value; it never exposes dealer cost/price fields or calculates a price in the browser. Until product records receive verified selling prices, those products will still correctly show Price On Request.
- Current Audio Connections secondary preview snapshot contains 72 records (Sony 13, Starsound 49, RA 2, BlackSpider 1, Alpine 6). All 72 currently have null indicative prices and POR labels; no numeric prices or dealer-price fields are present in that snapshot. This is a data-reconciliation gap, not evidence that the supplier PDFs contain no prices.
- The current branch retains the STARSOUND (5 Aug 2026) and Sony Mobile ES (Sept 2026) supplier PDFs, but no verified product-to-price reconciliation has yet been completed. Match exact model/SKU first; keep stock/availability separate; use the owner's established cost × 1.15 × 1.35 rule only after confirming the supplier field is the correct ex-VAT dealer cost. Do not put dealer costs into public preview data.
- Planetworld is included as a second car-audio supplier to reconcile, not as a source of musical-instrument listings. The retained Planetworld taxonomy review describes 702 Car Audio source rows: One 290, Kicker 189, Audison 94, Alpine 58, JVC 13, Kenwood 4, Amplified 3, Focal 2 and Pioneer 2. Its keyword component classification is provisional; 245 rows remain unclassified/manual review. It explicitly records no verified product images and no approved pricing/stock values.
- Planetworld supplier workbooks are not present in the current PR branch; the older Planetworld review/source records are on the default-branch history, not an approved import. No Planetworld product prices have been added to the customer preview. Obtain/reinstate the current authorised Planetworld car-audio price workbook/source in a private review boundary before reconciling it. Keep confidential dealer cost and stock data out of public commits, logs and artifacts; only publish verified customer-facing selling prices.
- No catalogue price records, supplier source PDFs, stock values, Supabase data or production data were changed in this pricing-rule correction. Preview remains non-production and requires QA refresh after this commit.

### Known separate check
- A separate Cloudflare Workers build check failed on an earlier revision. The Cloudflare Pages preview build/deployment passed. Keep these as separate integrations; do not represent the earlier Workers failure as a failed Pages deployment or as a production release.

### Release boundary
- PR #213 remains OPEN/DRAFT and has not been merged.
- `main` remains unchanged.
- No Supabase production writes/imports, live price or stock changes, Axxess upload, DNS/payment changes or checkout activation occurred.
- No production deployment was performed.
- Audio catalogue records remain review-only until product descriptions, exact images, prices and availability are verified and approved.
- Do not merge, deploy or change production data without explicit owner approval.

### Immediate next work — continue in this order
1. Review the non-production owner preview on desktop and Android; capture specific layout, navigation, image and product-card issues.
2. Verify the preview's cart interactions and confirm checkout, customer-account and admin routes are safely gated; do not enable live order/payment writes.
3. Audit the quarantined legacy image libraries and map only confirmed audio images to the correct audio products. Do not bulk-delete unmatched images.
4. Review Audio Connections / STARSOUND / Sony Mobile ES source records and reconcile product descriptions, model numbers, images and category placement.
5. Perform a physical Android Owner APK install/use test using the install-test artifact while it remains available.
6. Re-run the relevant QA after any code changes and refresh the customer-facing preview.
7. Present the updated preview and findings for owner approval. Do not merge or deploy without explicit approval.

## Working rules
- Keep one unified working candidate in existing PR #213; do not create more branches for this work.
- Do not reintroduce ASC, Electrocity, Caelex or Auto Electrical catalogue scope unless the owner changes the priority.
- No production Supabase writes, Axxess upload, DNS/payment changes, merge or production deployment without explicit owner approval.
