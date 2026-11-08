> **HISTORICAL / SUPERSEDED — 2026-11-08:** This file records an earlier review or instruction set, not the current storefront specification. Current authority is `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md` (including dated Section 10), `HANDOVER_CURRENT.md`, and the latest direct owner instructions. The current customer storefront has exactly three main departments: Auto Electrical Spares; Car Audio / Home Entertainment; Car Care & Accessories. Customer-facing price display is Price On Request for all supplier products until current supplier pricing and stock can be updated reliably. Do not use this historical file to authorise category changes, catalogue processing, price display, import or production release.

# Audio continuation addendum — 2026-11-06

**Scope:** PR #178 only; OneNav remains the active brand. Private review only; DO NOT IMPORT / DO NOT PUBLISH.

## Work completed in this continuation

- Re-read AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md and HANDOVER_CURRENT.md on the active integration branch before continuing.
- Inspected the OneNav 45-row official-model audit, the 23-row unmatched head-unit evidence file, the 245-row One/OneNav source triage, and the audio image/description approval-gap report.
- Opened the official OneNav page for ON418-1LX. The page identifies the SKU, Nissan Magnite and 9-inch Evolution. Its linked image is https://onenav.co.za/wp-content/uploads/2025/03/Nissan-MAGNITE-ON418-1LX-600x600.png; the visible image label contains the exact model and the asset is 600×600.
- Opened the official OneNav page for ON425-1LX. The page identifies the SKU, Mitsubishi Eclipse Cross 2018–2020 A11 and 9-inch Evolution. Its linked image is https://onenav.co.za/wp-content/uploads/2025/03/Mitsubishi-ECLIPSE-CROSS-ON425-1LX-600x600.png; the visible image label contains the exact model and the asset is 600×600.
- Recorded the two images as exact-model manufacturer candidates, not publication approvals, in catalogue-review/onenav-official-image-candidates-2026-11-06.md (commit 5b5198396c1f91d6c29e5f223e2c55123d49c05c). Manufacturer-hosted provenance does not by itself establish image reuse permission.
- Identified a live SKU discrepancy for ON413-1A10: the official 2023 catalogue lists ON413-1A10, while the current official product page lists ON413-1A for the same Qashqai/X-Trail application. The page image is not assigned to the supplier row pending confirmation.
- Reconfirmed that ON418-1LX Evolution must not be conflated with OA418-1 Classic, and ON425-1LX Evolution must not be conflated with OA425-1 Classic.

## Evidence references

- ON418-1LX official product page: https://onenav.co.za/product/onenav-9inch-for-nissan-magnite-without-factory-camera-9-inch-2/
- ON425-1LX official product page: https://onenav.co.za/product/onenav-mitsubishi-eclipse-cross-2018-2020-9-inch-a11/
- ON413 official product page: https://onenav.co.za/product/onenav-10-1inch-for-nissan-qashqai-x-trail-2015/
- Official 2023 OneNav catalogue: https://onenav.co.za/wp-content/uploads/2023/02/OneNav-Catalogue_Web.pdf

## Verification and release state

- No customer-facing product JSON, catalogue price, stock, GW SKU or category mapping was changed.
- No live Supabase write, public product creation, supplier activation, Axxess upload, DNS/payment change, production deployment or merge was performed.
- Exact-head build, regression tests, deployed-SHA marker and hosted 390px/1365px browser QA are still unverified for the latest candidate. No current preview URL is authorised for owner review.
- PR #178 remains OPEN / DRAFT / UNMERGED; production remains HOLD.

## Next execution

Continue the exact-model image audit for the remaining OneNav gaps and unmatched source rows. Only add manufacturer-exact candidates with visible model evidence; keep uncertain codes, variants and image rights explicitly unresolved. Then integrate approved review candidates into the non-production preview, run exact-head build/regressions, verify hosted image loading and mobile/desktop navigation, and issue one preview only when all required checks match the deployed SHA.

## Owner preview trigger follow-up — 2026-11-06

- Added `assets/audio-types/OWNER_PREVIEW_VALIDATION_REQUEST_2026-11-06.txt` as a non-product, non-customer-facing change to trigger the existing PR workflow through its declared `assets/audio-types/**` path filter. Commit: `492aca51903eb1ae620bed4981e54450f5985d3a`.
- Confirmed the trigger file is included in PR #178's changed-file list and the PR head now points to that exact commit.
- Checked the commit workflow-run wrapper and combined commit status after the update: zero associated PR workflow runs and zero statuses were returned. Therefore no build, test, deployment, or hosted browser result exists yet. The marker is only a trigger attempt, not a preview.
- The next blocker is repository Actions execution/visibility or permissions. Do not claim deployment, use a stale alias, or bypass the release gates. PR #178 remains draft and production remains on hold.

## Exact-head owner preview deployed and hosted QA passed — 2026-11-06 18:15 SAST

This section supersedes the earlier “Owner preview trigger follow-up” statement that no workflow run was visible.

### Exact run and deployed preview
- GitHub Actions run: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42268763455 — **completed SUCCESS**.
- Tested and deployed source SHA: `c98097a111c32f29a1b9573c8d0425533765dcdc`.
- Immutable owner-preview deployment: https://a877160d.get-wired-autoworx-store.pages.dev/owner-preview.html
- Audio department: https://a877160d.get-wired-autoworx-store.pages.dev/preview-audio.html?department=Car%20Audio
- OneNav product review: https://a877160d.get-wired-autoworx-store.pages.dev/preview-audio-products.html?department=Car%20Audio&brand=One&component=Head%20Units%20%26%20Media%20Players&label=Car%20Audio%20%26%20Video
- The workflow's exact deployed-SHA marker check passed for the tested source SHA. The customer-only Pages package built successfully; exact-head Node regression suites, three-category structure checks, and public SKU/privacy audit all passed.
- Hosted Playwright checks passed at 390px mobile and 1365px desktop. Confirmed three homepage roots, four audio collage images, correct Car Audio → brand navigation, Aerials navigation, no JavaScript errors, and no desktop horizontal overflow. Checkout remained hidden and preview writes remained blocked.

### Hosted catalogue/image results
- Planetworld source: 3,317 rows, including 702 Car Audio rows. The exact-model preview enrichment now records 45 OneNav official product pages and 45 verified descriptions; 6 image candidates remain owner-preview-only and 39 exact-fitment images remain unavailable/rejected. A previously rejected image for OA015-1 and OA716-1 is now withheld while the verified descriptions remain available.
- The preview carries 74 Planetworld exact-model image candidates (68 verified non-OneNav models + 6 OneNav candidates); hosted image audit: **74/74 loaded**.
- Audio Connections preview: 66 records with descriptions and image URLs; hosted image audit: **66/66 loaded**. BlackSpider Lynx remains a low-resolution exception at 104px and needs a better exact product asset.
- The OneNav product review route displayed 64 products, 6 image candidates and 6 review notes. These are preview/review records, not approved public catalogue publication.
- Planetworld RRP rule passed hosted audit: published VAT-inclusive RRP less 2%, no second VAT addition; 19 zero-RRP records remain quote-only and 19 below-estimated-cost rows remain flagged for owner review.

### Outstanding blockers — do not mark the audio category complete
- Current connected Store project read-only snapshot remains `public.products=0`, `gw_private.supplier_catalog_items=0`, `gw_private.product_supplier_codes=0`, and 770 rows in private `gw_private.catalogue_product_staging`, all REVIEW_ONLY (702 Planetworld + 68 Audio Connections). The customer storefront reads active `public.products`; the preview's JSON catalogue routes are separate review-only data. No database writes or imports were made.
- Planetworld's wider catalogue is not fully reconciled: 3,204 rows remain unmatched by the exact-model enrichment, 31 staging rows lack a category, and supplier staging descriptions are not automatically approved customer copy.
- OneNav still has 39 missing/rejected exact-fitment images; the six candidate images remain rights/owner-review pending. BlackSpider Lynx requires a higher-resolution exact image.
- Therefore the **owner preview is ready for review**, but the entire audio catalogue is **not yet complete or production-ready**.

### Release boundary
- PR #178 remains OPEN / DRAFT / UNMERGED. Production HOLD.
- No Axxess upload, DNS change, Supabase write/import, live stock or price change, supplier activation, checkout/payment activation, merge or production deployment was performed.
- Functional transaction testing remains deferred until the owner adds banking details and authorises that work.
- Next work: continue exact-model identity/image/description/category/SKU review for the unmatched Planetworld records, replace the low-resolution Lynx image, reconcile the live/private data-source discrepancy without writing data, then re-run exact-head preview QA after substantive changes.
