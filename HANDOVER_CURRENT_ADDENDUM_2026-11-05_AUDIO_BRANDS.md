# Audio brand continuation handover

Date: 5 November 2026, 18:15 SAST

PR #178 remains the sole candidate, OPEN / DRAFT / UNMERGED. Production HOLD.

Owner instruction: complete one audio brand end-to-end before moving to another. OneNav is first and is not yet complete.

Run 42061224427 failed in the customer-only package build at source row 2129 because the OA115-1 source title had repeated spaces compared with the audit title. This was a formatting-only mismatch. Commit 705d0c38f64b803b6d6e068e726a9938bfbc6e29 normalizes whitespace only; it preserves all source rows and validation. Expected totals remain 21 OneNav pages/descriptions, 6 image candidates, 15 missing OneNav images, 68 verified manufacturer models/images, and 3,228 unmatched rows.

Exact-head owner-preview run 42061845444 is for SHA 705d0c38f64b803b6d6e068e726a9938bfbc6e29. At last check it was in progress. Do not issue a preview until build, regression, exact-SHA deployment marker and hosted mobile/desktop QA pass.

Next: monitor run 42061845444; continue OneNav image and dedicated brand-page verification only. Do not move to the next brand until OneNav is verified. No production, live stock/price, Supabase, Axxess, DNS or payment changes.

## 18:20 SAST — EXACT-HEAD HOSTED QA FINDING

- Run [42061845444](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42061845444) completed with failure on exact SHA 705d0c38f64b803b6d6e068e726a9938bfbc6e29. Package build, catalogue/category/SKU regression, non-production Pages deployment, deployed-SHA marker, all eight department images, OneNav and Amplified logo loads, Kicker directory/brand-page logo loads, RRP audit and all 74 image loads passed.
- The only failure was a stale hosted assertion: it correctly measured 74 Planetworld image URLs and 74 loaded, zero failed, but the workflow still expected 68. The six additional OneNav exact-fitment candidates are valid catalogue information and must remain; do not delete them to satisfy the stale assertion.
- Corrected .github/workflows/owner-preview-exact-sha.yml to require 74/74 loaded Planetworld+OneNav image candidates and zero failures. Commit: 2055dc4764c4d6280b6d026a105fecadc759f6a2.
- A fresh exact-head workflow has been triggered by this workflow change. Its current result must be checked before issuing any preview. The previous deployment at SHA 705d0c3 is not preview-accepted because hosted QA failed on the stale assertion.
- Current brand sequence remains One / OneNav first. It is not complete: image gaps and dedicated brand-page verification remain. Continue one brand only.


## 18:22 SAST — EXACT-HEAD HOSTED QA PASS

- Run [42062037287](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42062037287) PASSED all steps on tested source SHA `2055dc4764c4d6280b6d026a105fecadc759f6a2`: package build, catalogue/category/SKU regression, non-production Pages deployment, exact deployed-SHA marker, and hosted mobile/desktop browser QA.
- Verified preview: `https://f7c8a080.get-wired-autoworx-store.pages.dev` (tested SHA 2055dc4). Hosted QA reports three approved root categories, eight audio department images loaded, OneNav directory and dedicated-page wordmark loaded, Amplified and Kicker logos loaded, Sony logo loaded, Alpine Halo11 product image loaded with media/details separated, 74/74 Planetworld+OneNav image URLs loaded, 66/66 Audio Connections image URLs loaded, 0 JavaScript errors, and 1365px desktop viewport. Mobile viewport check is part of the same passing workflow.
- OneNav product route returned 65 products, 6 image candidates and 6 review notes. The page is still incomplete: 21 of 65 cards have exact official manufacturer descriptions, 6 exact-model image candidates are present, 15 verified pages still need exact photos, and 44 product cards remain unmatched. Do not call OneNav resolved or move to the next brand.
- Audio Connections still has a separate low-resolution exception: BlackSpider Lynx image loads but natural width is 104px (source filename 105.png). Record for later; do not switch focus away from OneNav.
- Current branch head after the preview run is `212c50d46e5afb4a88fd516f88f11d90f5e67c1a`, which adds this handover documentation only; tested storefront source remains SHA 2055dc4. Do not issue the preview to the owner as final readiness: OneNav product reconciliation remains open. Production HOLD.


## 19:05 SAST — CONTINUATION RE-ENTRY / BEFORE NEXT ONE NAV PASS

- Re-read the current branch and audio addendum before continuing. The branch head has advanced to `01ef301a799732b53c1e9f3791c55c6feb2d7f38` (catalogue classification correction for OA266-1); this is newer than the earlier docs-only checkpoint and must be treated as current. Do not assume the PR metadata snapshot or older addendum reflects current file state.
- Exact-head preview run `42062037287` remains a successful test of source SHA `2055dc4764c4d6280b6d026a105fecadc759f6a2`, not of later source changes at branch head `01ef301`. Its preview remains historical evidence only until a fresh exact-head run is completed.
- Re-read of `catalogue-review/planetworld-one-official-model-audit.csv` at current branch head found 31 OneNav model rows with official product-page/SKU/fitment evidence. Several additional image rows have advanced since the earlier 21-description/6-image summary; the older totals are not safe to carry forward without a fresh parser/reconciliation. OneNav remains the only active brand; do not move to another brand.
- Current next task: recompute OneNav description/image status from the current audit and enrichment inputs, then resolve only exact model/fitment image candidates. Keep variant mismatches rejected and retain pending flags where no exact asset can be substantiated. No production, live price/stock, Supabase, Axxess, DNS, payment or checkout changes.
- This entry is the pre-work checkpoint; update again with actual reconciliation results and exact-head verification after the next material change.


## 19:25 SAST — ONE NAV IMAGE/IDENTITY RESEARCH RESULT

- Recomputed the current official-model audit at code head `01ef301a799732b53c1e9f3791c55c6feb2d7f38`: 32 OneNav rows are present in the audit (including both product series/fitment entries); six rows currently have image candidate URLs and 26 do not. These are audit-row counts, not the storefront's 65-card product count. Do not repeat the older 15-missing-photo / 21-described summary as if it were the current full audit.
- Current official OneNav pages independently confirm SKU and fitment for OA016-2 (Corolla Cross 2021+, 9-inch screen / 10.1-inch frame), OA115-1 (Isuzu 2012+), OA198-1 (Hyundai i20 2019+), OA199-1 (Tucson 2018+), OA017-2 (Fortuner 2019+), and OA312-1 (Hyundai H1 2015–2018). OneNav's Classic overview confirms the common Classic specifications: 9-inch 1024×600 screen, wired Apple CarPlay/Android Auto, built-in DSP/multi-band EQ, steering-wheel-control readiness, Bluetooth/external microphone, 4×40W max output, 4.1-channel line-out, RCA/video inputs/outputs and front/rear camera inputs. Keep fitment-specific wording and frame sizes distinct.
- OA017-1 Fortuner (2016–2019) was also found on an independent South African retailer page with the exact OA017-1 SKU and Classic fitment, confirming the product identity/specification. The page extraction did not expose a retrievable primary image asset URL. A11/Evolution Fortuner images and the generic OneNav dash image were rejected as non-exact OA017-1 Classic artwork. No new product image was approved or added.
- Research sources: OneNav Classic overview https://onenav.co.za/onenav-classic/ ; official product pages https://onenav.co.za/product/onenav-classic-9-inch-for-corrola-cross-2021-10-1-inch-frame/ , https://onenav.co.za/product/onenav-classic-9inch-for-isuzu-2012/ , https://onenav.co.za/product/onenav-classic-9inch-for-i-20-2019/ , https://onenav.co.za/product/onenav-classic-9inch-for-tucson-2018/ , https://onenav.co.za/product/onenav-classic-9-inch-for-toyota-fortuner-2019-10-1-inch-frame/ ; OA017-1 retailer SKU page https://www.autostyle.co.za/product/one-nav-oa017-1-9-media-player-suitable-for-toyota-fortuner-2016-2019/ .
- Decision: retain all image-pending states where the exact asset cannot be validated. Do not fill image slots with visually similar but different Classic/Evolution/A11/Pro variants. No source/product catalogue content was changed in this research pass; OneNav remains incomplete and is still the only active brand.
- Exact-head QA is still required for the latest code head `01ef301`; successful run `42062037287` tested the older source SHA `2055dc4`. The branch now contains documentation commits after that tested SHA. Do not call the newer branch preview-verified until the workflow runs against the exact current source head.
- No production, stock, price, payment, checkout, Supabase, Axxess or DNS changes. Next: continue exact image sourcing and reconciliation for OneNav only; update this addendum after each material verified result. Do not advance to another brand.


## 19:40 SAST — ONE NAV IMAGE CANDIDATE TRIAGE (FOLLOW-UP)

- OA015-1 Land Cruiser Pick Up (2012+) image-search result from Go-4LO shows a fascia visibly marked `OA1409-CPAA`; despite the matching retailer page title, this is not the OA015-1 image. Rejected; do not use.
- OA411-1 Nissan NP200 image-search results resolve to Planetworld product assets for `ON411-1A11` (A11 series), not the OA411-1 Classic SKU. Rejected; do not use or relabel.
- OA312-1 Hyundai H1 2015–2018 image from Autotec visually matches the H1 vehicle-fitment multimedia fascia and product page, but the retailer page does not expose the OA312-1 SKU. Retain only as an owner-preview candidate, not as a final SKU-level image approval. Existing candidate remains review-only.
- OA009-1 official page confirms Classic model/SKU and fitment, but the Evolution/ON009-1LX and Pro/ON009-2A images are not interchangeable with OA009-1. No exact Classic OA009-1 asset was substantiated in this pass.
- OA016-2, OA115-1, OA198-1 and OA199-1 official product pages confirm the SKU and vehicle fitment, but the image results did not expose a demonstrably exact image asset for these SKU-specific Classic models. Keep pending rather than use adjacent generation/series imagery.
- Image-search review therefore produced no new approved image asset in this pass. Existing candidate count remains six; no catalogue/image mapping was changed. OneNav is still not complete; 44 storefront product cards remain unmatched per last hosted report, and exact-photo coverage remains a blocker. Do not move to another brand.
- The current branch head before this documentation update was `73ee5be7c499caf4b0186b702d4ff14a38172739`; this documentation-only commit does not change tested storefront code. Latest hosted QA run `42062037287` tested SHA `2055dc4764c4d6280b6d026a105fecadc759f6a2`, not the newer catalogue/doc state. A fresh exact-head workflow is still required before treating the latest branch as preview-verified.
- No production or live customer data changes. Next: continue OneNav-only exact image sourcing, prioritising missing Classic SKUs and product-page descriptions; preserve series/fitment distinctions and rerun exact-head QA after any source changes.


## 18:26 SAST — ONE NAV 32-ROW / SEVEN-IMAGE RECONCILIATION

- Reconciled the current OneNav audit after the 32-page expansion. Current totals are 32 exact official product pages/descriptions, 7 image candidates, 25 exact-model pages without an image, 68 other verified manufacturer-model images, 75 total product-image candidates, and 3,217 unmatched Planetworld rows. Keep these current totals; earlier 21/6/15 and 89/74 figures are superseded.
- OA716-1 has a Planetworld product image whose asset path includes the exact SKU and the source product page identifies the Classic Baleno/Starlet fitment. The square 1026×1026 image has an explicit `image_crop=false` decision; the enrichment script now preserves that no-crop decision so the image renders contained instead of being forced into a 4:3 cover crop. OA015-1 uses the separate The4x4Store product image with matching OA015-1 listing/fitment; the unrelated Go-4LO image visibly marked OA1409-CPAA remains rejected.
- Exact image-search triage rejected: OA115-2/OA115-3 shared Isuzu asset for OA115-1; Evolution/A11 Hilux and Corolla Cross images for Classic SKUs; Hyundai i20 Pro image for OA198-1 Classic; Evolution/A11 Urban Cruiser image for OA717-1 Classic; and generic Pajero/third-party Accent imagery. No additional images were approved in this search pass.
- Fixed the enrichment guard from 21 to 32 audited OneNav pages; updated regression expectations for 100 descriptions, 25 missing OneNav images, 75 image candidates and 3,217 unmatched rows; added an explicit OA716-1 no-crop regression assertion; corrected the aggregate image count to include candidate images regardless of whether cropping is applied.
- Exact-head workflow [42064245979](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42064245979) is running on SHA `99a98998f7c62aeaeee427d3150d7eb346ff9a5d`. Customer-only package build and exact-head catalogue/category/SKU regression have passed; non-production deployment and hosted mobile/desktop QA are still in progress. Do not issue a refreshed preview until the deployed-SHA marker and hosted checks pass.
- OneNav remains the only active brand. Do not move to the next brand until all OneNav cards, exact photos and descriptions are resolved and verified. Production remains HOLD; no live price/stock, Supabase, Axxess, DNS, payment or checkout changes.


## 19:28 SAST — EXACT-HEAD HOSTED QA PASS (32 ONE NAV ROWS / 7 IMAGE CANDIDATES)

- Run [42064310557](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42064310557) PASSED on exact source SHA `6d25f204a29b641753d018c5e1d41e5b7e8a8adc`: customer-only package build, catalogue/category/SKU regression, non-production Pages deployment, deployed-SHA verification and hosted mobile/desktop browser QA.
- Current preview URL: `https://90cfcbb7.get-wired-autoworx-store.pages.dev`. Hosted results: three approved root categories; eight audio department images loaded; OneNav directory/dedicated-page wordmark loaded; Sony, Amplified and Kicker logos loaded; 75/75 exact product image URLs loaded; Audio Connections 66/66 images loaded; zero JavaScript errors; 1365px desktop and mobile viewport checks passed.
- OneNav product route reports 65 products, 7 image candidates and 7 review notes. Audit now has 32 verified manufacturer/product-page descriptions, 7 image candidates and 25 verified-page image gaps. Therefore 33 product cards still lack exact manufacturer descriptions and 58 of 65 cards still lack an image URL. Keep the 7 image URLs as owner-preview candidates; they are not final owner-approved assets. OA716-1 is explicitly no-crop and its image loaded successfully.
- Do not call OneNav resolved or advance to another brand. Continue OneNav only: resolve the remaining 33 product descriptions, source exact photos for the 58 image-less products, and separate any OneAcoustic/other sub-brand records from the OneNav listing without deleting supplier data.
- Audio Connections BlackSpider Lynx remains a later low-resolution exception (104px natural width). Do not switch focus from OneNav yet.
- Production HOLD. No Axxess, DNS, Supabase writes, live stock/price changes, payment activation, checkout or production deployment.


## 18:30 SAST — EXACT-HEAD PREVIEW AND HOSTED QA PASSED

- Successful workflow: [42064310557](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/42064310557), conclusion `success`, tested source SHA `6d25f204a29b641753d018c5e1d41e5b7e8a8adc`. The subsequent branch-head commit `2e6459064b2a8dd341ab2da6fad1ca47e4702efd` is documentation-only; tested storefront code is unchanged.
- Exact non-production preview, deployed source marker matched the tested SHA: https://90cfcbb7.get-wired-autoworx-store.pages.dev/
- Hosted QA results: customer package build PASS; exact-head Node/category/catalogue/public-SKU regressions PASS; deployment PASS; exact deployed-SHA check PASS; Chromium browser QA PASS on mobile and desktop; 0 JavaScript errors; desktop viewport width/scroll width both 1365px; all eight audio department images loaded; all 75 product image URLs loaded (75/75, zero failures); Audio Connections images 66/66 loaded (the Bullet Lynx 104px image remains explicitly low-resolution).
- OneNav hosted product page: 65 cards; 7 image candidates loaded; 7 review notes displayed; common Classic specification text present. This proves image loading and route rendering, not full OneNav completion or final image-rights approval. The seven candidates remain owner-preview only. Twenty-five of the 32 audited OneNav model pages still lack an exact approved photo; 33 storefront cards remain outside the 32-page official audit, and the hosted page visibly includes products whose descriptions remain pending (e.g. Isuzu RBA/RBB and Toyota 280mm with CANBUS). Continue OneNav only.
- Brand checks also passed for the OneNav wordmark, Amplified logo, Kicker directory and dedicated brand-page marks, and Sony logo. The Alpine Halo11 product image loaded and its description remained separate from the photo.
- Preview remains inspection-only. No production merge/deploy, no Axxess, DNS, Supabase, stock, price, payment or checkout changes. Production HOLD remains in force. Do not advance to another brand until all OneNav cards have correct descriptions/photos and the remaining gaps are verified.
