# Get Wired AutoWorx — Storefront Visual QA Handover
Date: 2026-11-05 (SAST)
Active workstream: PR #178 — Single active clean-main storefront preview
Branch: integration/owner-preview-single-task-2026-11-05
Status: owner-reported visual defects recorded; repair and exact-head verification outstanding.

## Owner-confirmed progress
- Category and subcategory navigation now loads very well. Preserve the current hierarchy and working routes.

## Outstanding owner-reported defects
1. Subcategory button logos/artwork are missing across other categories/departments, explicitly including DJ Equipment.
2. Car Audio brand directory lacks Amplified and One X replacement-radio logos.
3. Product listings in all categories show descriptions/prices without product photos; Car Audio is especially incomplete, with most photos and descriptions missing.
4. Kicker logo on the Car Audio brand/subcategory tile is too small.

## Initial source inspection / diagnostic clues
- Current active PR workflow explicitly packages dedicated preview audio routes and tests Klipsch logo visibility; existing checks do not cover all subcategory artwork, Amplified/One X, Kicker sizing, or broad product photo/description coverage.
- preview-audio-brand.html constrains the brand hero logo (160px × 72px, mobile 110px × 60px) and contains a Kicker-specific transform. Owner still reports the Kicker tile/logo is too small, so test rendered image bounds on phone and desktop rather than assuming the transform is sufficient.
- preview-audio-products.html has a deliberate photo-pending presentation for records without a matched image. This indicates at least some missing product photography may be missing/unverified source data, not just a CSS issue.
- Main-branch assets/product-image-fallback.js deliberately refuses to substitute unverified images and displays a neutral placeholder. Do not bypass that safeguard or map visually similar products.
- preview-audio.html and dedicated routes are branch-specific; inspect the active PR branch, not main, before editing.

## Required next execution
1. Inspect the exact current PR #178 head and audit each department/subcategory card's image source, natural dimensions, alt text and load state.
2. Repair the missing category/subcategory artwork with semantically relevant verified images; no cartoon or unrelated generic artwork.
3. Add the correct Amplified and One X replacement-radio brand logos and enlarge Kicker while preserving aspect ratio.
4. Audit all category product records for image/description source coverage. Restore exact model/SKU-matched photos and source-supported product descriptions/features. Where no verified image exists, retain an honest placeholder and list the missing exact models rather than inventing a match.
5. Add exact-head regression assertions covering every department/subcategory image, Amplified/One X logo visibility, Kicker rendered dimensions, and product image/description coverage, especially Car Audio.
6. Run Node regression tests and hosted Playwright checks at 390px mobile and 1365px desktop. Record missing counts, image naturalWidth/alt text, console errors, and deployed SHA.
7. Do not send a new preview URL until the tested exact SHA is deployed and all requested checks pass.

## Release boundary
Preview only. Keep PR #178 draft and unmerged. No production deployment, Axxess upload, DNS changes, Supabase/live writes, supplier activation, live stock/price/category changes, checkout/payment activation or customer launch without explicit owner approval.

## Task log
- 2026-11-05 15:04 SAST — owner feedback recorded in PR #178 comment (GitHub comment ID 6658747851). No code, catalogue, price, stock, database, hosting or deployment changes made in this pass.

## Follow-up source inspection — 2026-11-05 15:08 SAST
- Active branch `preview-audio.html` already contains explicit BRAND_LOGOS mappings for Amplified / Amplified Audio and One X / OneNav. The user-visible failure therefore needs a runtime audit of actual brand button rows, URL loading, and rendered image dimensions; do not simply duplicate mappings without finding why the logos are absent.
- Active branch `preview-audio-brand.html` also has explicit One X and Amplified logo URL selection. Verify both logo URLs return an image and the corresponding brand page receives the expected brand value.
- Kicker is currently constrained by the brand-directory tile rule to 150px max width / 48px max height with a 1.28 transform; the separate brand hero applies 1.42 transform. The owner complaint refers to the subcategory/brand tile, so target the directory tile's actual rendered bounds.
- Active branch `preview-audio-products.html` deliberately renders an explicit pending-photo state when `imageUrl` is empty. In the connected Audio Connections preview JSON, sampled Sony Mobile ES records have detailed descriptions but empty `imageUrl` fields (e.g. XS-163ES, XS-162ES, XS-692ES); at least part of the photo gap is missing source image mapping, not just layout.
- `preview-audio.html` product-card renderer includes `p.description` only when present. Missing descriptions therefore need source-data enrichment for exact model records, while retaining the rule not to invent specifications.
- Next repair must separate: (a) image URL/asset availability and load failures, (b) records with no verified image URL, and (c) records with no description. Add counts and representative exact SKUs/models to QA output.


## Continued owner visual repair — 2026-11-05
- Owner clarified that Get Wired AutoWorx sells authentic products it is authorised to sell and expects corresponding genuine brand/manufacturer and supplier catalogue imagery used for those products. Treat this as owner authorization to use supplied/approved catalogue imagery for the preview, subject to applicable brand/supplier conditions; do not represent it as a blanket legal determination. Do not hold back approved product images merely because they are branded.
- Code change committed in `preview-audio.html`: One X / OneNav aliases now resolve through one normalized logo key; any Amplified name resolves through the Amplified official logo key. This addresses the existing mismatch risk where actual catalogue brand labels differ from the exact aliases previously handled.
- Kicker directory tile enlarged from 150×48 CSS px + 1.28 transform to 176×60 + 1.38 transform, with a wider tile to prevent clipping. The separate Kicker hero treatment remains unchanged.
- Regression test updated to assert One X/OneNav and Amplified alias normalization plus the new Kicker tile dimensions.
- Added `catalogue-review/AUDIO_CONNECTIONS_MISSING_PRODUCT_IMAGES_2026-11-05.json`: exact-model audit of the Audio Connections preview records. 66 records total; 4 carry image URLs and 62 have no verified product image URL. All 66 sampled records have descriptions. The missing image list records exact model/title, brand and component; do not fill with generic type photos. Source matching work remains open.
- Important distinction: category/department button artwork uses separate category-level photographs; product cards must use exact product images. Do not treat category art as product photography.
- No hosted runtime browser verification or deployment pass has yet been run for these latest code changes. Do not claim these repairs are visually verified or issue a fresh preview URL until exact-head workflow, image naturalWidth checks and mobile/desktop browser tests pass.
