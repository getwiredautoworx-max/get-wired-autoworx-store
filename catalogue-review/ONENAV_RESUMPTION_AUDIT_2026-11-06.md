# OneNav catalogue resumption audit — 2026-11-06

**Scope:** OneNav only. Owner has explicitly resumed the previously paused audio/video enrichment workstream. Do not move to another brand until the OneNav work is complete or an owner-dependent blocker is recorded.

## Current audit baseline

Source: `catalogue-review/planetworld-one-official-model-audit.csv` on the active integration branch.

- 45 review rows; 45 unique supplier SKU references; no duplicate SKU references.
- 42 records have individual official product pages; 3 are supported by official OneNav Classic category-page fitment listings.
- All 45 rows have a source title, official page, model-match evidence containing the exact SKU, and a customer description.
- Product-line evidence in the existing audio regression suite: 43 Classic, 1 Evolution, 1 unclassified. Do not force the unclassified product into a series.
- Enrichment states: 40 `DETAILS_VERIFIED_IMAGE_PENDING`; 5 `OWNER_PREVIEW_CANDIDATE_ONLY`.
- Seven image URLs are staged as candidates (all distinct); 38 rows have no image URL. None of these figures represents production image approval.
- The storefront-source reconciliation now identifies 63 unique `One`-brand `Head Units & Media Players` titles in the 3,317-row preview dataset. 44 titles match the 45-row official-model audit after whitespace/case normalization; 19 unique titles are outside it. All 19 now have exact source-title links to 20 supplier rows in the 25-Oct workbook snapshot. This is a source-row reconciliation only, not manufacturer identity verification or import approval.

## Evidence checks in this continuation

- OneNav official page confirms SKU `OA015-1`, Land Cruiser Pick Up 2012+, and the Classic product specifications: https://onenav.co.za/product/onenav-classic-9inch-for-land-cruiser-pick-up-2012/
- The official page's two gallery assets were visually inspected. The radio face carries generic hardware marking `OA1409-CPAA`, not `OA015-1`; do not use those assets as exact OA015-1 product images. The existing retailer image remains review-only pending exact visual recheck and image-use permission.
- OneNav official pages confirm `OA011-1` as the FJ Cruiser Black Classic fitment and `OA013-1` as the Hilux/Fortuner 2011–2015 Classic fitment:
  - https://onenav.co.za/product/onenav-classic-9inch-for-toyota-fj-cruiser-black-2007/
  - https://onenav.co.za/product/onenav-classic-9inch-for-hilux-fortuner-2011-2015/
- The `ON115-3LX` review-row exception is now corrected: `customer_brand_display` is **OneNav**, while the customer description retains **OneNav Evolution** for Isuzu RBA/RBB. The exact official page still reports no image asset, so image status remains pending. Correction committed as `8c570c275770471d27824f7da10e75368179fdd5`. https://onenav.co.za/product/onenav-9-inch-for-isuzu-rba-rbb/

## Next work

1. Verify manufacturer model/variant identities and exact images for the 19 newly reconciled source rows. One duplicate-title group (`ON019-A121M` and `ON019-A14`, source rows 116–117) remains ambiguous; preserve both and do not merge or choose one without evidence. The other 18 title groups have one source-row match each, but still require manufacturer identity and image review.
2. Resolve exact product-image matches for the 38 rows without image URLs and review all seven existing candidates. Keep all candidate images review-only until exact fitment and rights are verified.
3. Keep OneNav as the active brand. Do not advance to Sony, JBL, Klipsch, Hertz, or another brand yet.
4. Run the new standalone deterministic audit test locally when a repository checkout is available. Do not trigger hosted Actions merely to run this review; no Actions/release credits were intentionally consumed in this continuation.

## Guardrails

All content remains internal review/staging and **DO NOT IMPORT**. No GW SKU assignment, supplier price/RRP changes, stock changes, live product/category writes, Supabase writes, supplier activation, public image approval, merge, deployment, Axxess upload, DNS/payment changes or checkout testing occurred. PR #178 remains draft/unmerged; production HOLD.


## Resumption work completed in this session

- Recorded owner-authorised workstream resumption in `HANDOVER_CURRENT.md`, commit `2f2722f640258a81e41ca6c12888aec13c960d44`.
- Added this OneNav evidence/exception report, initially committed as `80786c15a7b3ea018fa04ed61e8789446582888c`.
- Added standalone deterministic audit test `tests/onenav-source-audit.test.cjs`, commit `599436e35027807f5e15e83b5a4b4212998292b0`.
- Ran the same 20 audit invariants directly against the active-branch CSV during this session: **20/20 passed**. This was a direct data-validation run, not execution of the committed Node test file and not a GitHub Actions run. The new test is not yet wired into hosted Actions; no hosted Actions/release credits were intentionally consumed.
- The data validation identified one documented review-field exception: `ON115-3LX` has a blank `customer_brand_display`, although its exact official OneNav page identifies it as OneNav Evolution for Isuzu RBA/RBB. The source audit CSV was not changed in this pass; preserve this as an open correction rather than claiming it was fixed.
- Official image review for OA015-1 found that the OneNav product page lists the correct SKU, but its gallery product image displays generic hardware code `OA1409-CPAA`; that image is not an exact OA015-1 image and is rejected for SKU-level matching. The retailer listing candidate remains review-only.
- Latest documentation/test commit is `599436e35027807f5e15e83b5a4b4212998292b0`. The existing `.preview-deploy-request` still names older commit `1bc6686f252bc08d55534fc7412ddfb2e44db2b4`; it does not request deployment of the current branch head. No current preview is claimed.
- Current work remains OneNav only. The 19 storefront cards outside the 45-row audit, 38 missing exact-image URLs, seven unapproved image candidates, and the ON115-3LX brand-field exception remain open. Do not move to another brand.


## Follow-on correction — 2026-11-06

- Corrected the `ON115-3LX` row's `customer_brand_display` from blank to `OneNav`; Evolution remains correctly represented in the product description. The image remains pending because the official page provides no exact image asset.
- Commit: `8c570c275770471d27824f7da10e75368179fdd5`.
- The 19-card reconciliation remains open. Initial guesses for common storefront product-data paths were not found on this branch; no source path or card identity has been invented.


## Storefront coverage reconciliation — 2026-11-06

- Located the actual preview data path from `preview-audio-products.html`: `assets/planetworld-catalogue-preview.json`. The file is a 3,317-record dated preview snapshot. Its exact One-brand/head-unit slice contains 66 rows and 63 unique titles.
- Compared those 63 unique titles with the 45-row official OneNav model audit using normalized exact source titles. 44 unique titles match the audit; the remaining **19 unique storefront card titles** were mapped to **20 supplier rows** in `catalogue-review/planetworld-row-chunks/planetworld-rows-05.csv` (source workbook `one-price-list-2026-10-25.xlsx`, Products sheet).
- Reconciliation output: `catalogue-review/onenav-uncovered-storefront-card-reconciliation-2026-11-06.csv`, commit `2a1e773b9bdc146fde69ec2949ad8aeb6fc9f1eb`. All rows are explicitly `DO NOT IMPORT`; manufacturer model and image matching remain unverified.
- One title maps to two different supplier SKUs: `ON019-A121M` and `ON019-A14` (source rows 116–117). Do not merge or choose one without exact model/variant evidence. The other 18 title groups each link to one source row. The 19 include non-OneNav/adjacent items (OneAcoustic, generic Android radio, DVR, MOST box); preserve their current title/source identity and review correct brand/type before any customer-facing use.
- Exact source-row links close the *source mapping* gap only. They do not establish manufacturer model identity, image correctness/rights, or import approval.


## Manufacturer evidence follow-up — 2026-11-06

- **Official exact match:** OneNav's own product page for `OneNav 10.1inch for Corrola Cross A11 (2021+)` confirms SKU `ON016-2LX`, Toyota fitment, OneNav Evolution series, 10-inch screen, wireless/wired OneConnect, Bluetooth 5.4, DSP and 4 × 45 W output. Product page: https://onenav.co.za/product/onenav-10-1inch-for-corrola-cross-a11-2021/. The reconciliation CSV now records this as an official exact SKU/title match. The image remains unextracted/unapproved.
- **Reseller-only evidence:** NXT Level Tech lists `ON015-3` with the matching Land Cruiser 70 Series/buttons title, but this is not an official manufacturer SKU page. Keep identity and image approval pending: https://nxtleveltech.co.za/product/onenav-9in-radio-for-land-cruiser-70-series-with-buttons.
- **Variant conflict:** NXT Level Tech lists `ON412-1LX` as a 10.1-inch H1 A11 unit, while OneNav's own Evolution catalogue lists an H1 A11 9-inch product. Do not merge or copy specs/images until the exact variant is resolved. NXT page: https://nxtleveltech.co.za/product/onenav-101inch-for-h1-2015-2018-a11; official category evidence: https://onenav.co.za/product-category/onenav-evolution/page/2/.
- **Reseller type reference only:** A Just4Fun listing includes manufacturer type `ON014-1A11` for Prado 2002–2009, but this does not replace exact official manufacturer evidence; the 2023 OneNav PDF catalogue lists the older `ON014-1A10` code for that fitment. Treat A11/A10 as separate until confirmed. Evidence: https://just4fun4x4.co.za/shop/onenav-for-toyota-prado-free-reverse-camera/ and https://onenav.co.za/wp-content/uploads/2023/02/OneNav-Catalogue_Web.pdf.
- Updated reconciliation CSV commit: `ffec6769aee7fbba073e3eb4dac5afb840501344`. Evidence labels distinguish official manufacturer proof from reseller-only references; all rows remain `DO NOT IMPORT`.


## Further OneNav variant checks — 2026-11-06

- Official OneNav Evolution category results list `OneNav 9inch for Prado A11 (2002-2009)`, confirming product-line title/fitment, but not its SKU. A reseller type reference says `ON014-1A11`; the 2023 official PDF catalogue lists older `ON014-1A10` for the same Prado years. Keep the A11/A10 code conflict open; do not pick one by inference. Official category: https://onenav.co.za/product-category/onenav-evolution/page/3/.
- The H1 A11 discrepancy is now stronger: OneNav's own product page identifies the H1 A11 as `ON312-1LX` with a 9-inch screen, whereas NXT Level Tech lists the supplier row `ON412-1LX` as 10.1-inch. Same vehicle/year title does not establish same variant; treat as unresolved and do not transfer images/specs. Official page: https://onenav.co.za/product/onenav-9-inch-for-h1-2015-2018-a11/.
- Updated evidence classifications in the uncovered-card CSV, commit `e10e5a37d3391f55e7d677c35a0a5dc2414065d2`. `ON016-2LX` remains the sole exact official SKU/title match in the 19-card set; all other entries are either category/reseller evidence or unresolved.


## Additional exact catalogue checks — 2026-11-06

- `OA-5263BT`: OneNav's official shop page confirms exact title and SKU for **OneAcoustic Pro Series 1DIN media player with Bluetooth**. This is a separate OneAcoustic product family, not a OneNav head unit; the storefront brand needs to reflect OneAcoustic if this card is ever approved. https://onenav.co.za/product/oneacoustic-pro-series-1din-media-player-with-bt/.
- `ON413-1A10`: the official OneNav 2023 catalogue explicitly identifies Nissan Qashqai / X-Trail (2015+) and 10.1-inch screen. This is an exact manufacturer catalogue SKU/fitment match. The PDF image has not been extracted/approved.
- `ON019-A121M` / `ON019-A14`: both supplier rows share the same title, while the official 2023 catalogue lists `ON019-A101M`. Keep both source SKUs and the code mismatch open; no merge or inferred alias.
- `ON103-CPAA`: supplier code prefix conflicts with official catalogue `OA103-CPAA` for the 6.8-inch universal unit. Do not normalize ON/OA prefixes.
- `ON665-1A11` and `ON669-A14`: official catalogue lists related but different codes `ON665-1A10` (Golf 7) and `ON669-A101M` (VW universal). Keep suffix/fitment conflicts unresolved.
- Reconciliation CSV updated in commit `428c6ac5398e70ae8fa66097e3eba1985ed2234a`. It now contains three exact manufacturer-supported matches across the 19 uncovered cards: `OA-5263BT`, `ON016-2LX`, and `ON413-1A10`. The OA-5263BT match is OneAcoustic, not OneNav.
- Regression test source updated to assert precisely those three official matches, commit `d3c322fc9a0671878b54d502d1dfb399f740406d`. The Node test remains unexecuted; direct data assertions will be rerun separately.


## Further exact SKU conflict checks — 2026-11-06

- `ON017-2A11`: official OneNav product page confirms Toyota Fortuner with CAN bus (2019+) and 9-inch Evolution specs, but the official SKU is `ON017-2LX`. Supplier code suffix differs; no alias assumed. https://onenav.co.za/product/onenav-9inch-for-toyota-fortuner-with-canbus-2019/.
- `ON015-3`: official OneNav Land Cruiser 70 Series (2012–2026) page gives SKU `ONO15-3A14` (letter O after N), while supplier row and reseller page show `ON015-3` (zero). Preserve the O/0 distinction; no exact SKU match claimed. https://onenav.co.za/product/onenav-9inch-for-land-cruiser-70-series-2012-2026/.
- `ON-DVRSD`: official OneX Lenovo DVR for OneNav page confirms the product but shows SKU `ONDVRSD` without the supplier hyphen. Record as a formatting/code discrepancy; do not silently rewrite. https://onenav.co.za/product/onex-lenovo-digital-video-recorder-for-onenav-with16g-micro-sd-card/.
- Updated uncovered-card CSV commit `bfe5c5a52cf8767066dfadbc1a1f1e9650e3d3ab`. These checks add product/title evidence but do not increase the count of exact supplier-SKU matches.


## Official Evolution SKU confirmation — 2026-11-06

- `ON425-1LX`: OneNav's official product page confirms the exact title **OneNav Mitsubishi Eclipse Cross 2018–2020 (9 Inch) A11**, exact SKU `ON425-1LX`, Mitsubishi fitment, 9-inch Evolution series and its 12-band DSP / 4 × 45 W feature set. Image remains unextracted/unapproved. https://onenav.co.za/product/onenav-mitsubishi-eclipse-cross-2018-2020-9-inch-a11/.
- This raises official exact manufacturer SKU/title matches in the 19-card set to four: `OA-5263BT` (OneAcoustic, distinct brand), `ON016-2LX`, `ON413-1A10`, and `ON425-1LX`.
- Updated CSV commit `27e44ce2220367f5df9df06807f625e82c07f529`; regression-test source commit `7303c77eab939b94b7eee7c3e85d12f20cbb3671`.


## Exact image candidate — ON425-1LX — 2026-11-06

- Inspected the official OneNav product page gallery. Its image label explicitly identifies `Mitsubishi ECLIPSE CROSS ON425-1LX`; the 600 × 600 image visually shows the vehicle-specific 9-inch fascia/radio. This is an exact model image candidate, not a generic image.
- Image candidate URL: https://onenav.co.za/wp-content/uploads/2025/03/Mitsubishi-ECLIPSE-CROSS-ON425-1LX-600x600.png.
- Staged in the 19-card reconciliation row as `EXACT_OFFICIAL_MODEL_IMAGE_CANDIDATE; RIGHTS_REVIEW_PENDING`, commit `1308e01de8be366e52189af71d196575b656801a`. Do not publish or import until reuse rights are confirmed; OneNav site copyright notice does not itself grant reuse permission.


## Exact catalogue visual candidate — ON413-1A10 — 2026-11-06

- Inspected the official OneNav 2023 catalogue PDF page 13 (zero-based PDF page 12). The visual is a Nissan Qashqai/X-Trail cabin with the displayed product label `ON413-1A10 (2015+)` and `10.1-inch screen`, matching the exact supplier SKU/fitment.
- Staged as `EXACT_OFFICIAL_CATALOGUE_VISUAL_CANDIDATE; RIGHTS_REVIEW_PENDING` in the uncovered-card reconciliation CSV, commit `16568fe0a97e3dfb6331b1facf7cf5850121b61f`. This is a manufacturer-catalogue visual candidate, not approved for publication; image reuse rights remain unconfirmed.


## 2026-11-07 — latest evidence and coverage reconciliation

**This dated checkpoint supersedes the older image-count baseline above; it does not promote any candidate to import/publication approval.**

### Reconciled 45-row official-model audit

The current `planetworld-one-official-model-audit.csv` contains 45 unique source SKU rows and 45 customer-description drafts, with these current enrichment states:

- 39 `DETAILS_VERIFIED_IMAGE_PENDING`
- 4 `OWNER_PREVIEW_CANDIDATE_ONLY`
- 2 `DETAILS_VERIFIED_IMAGE_REJECTED`
- 6 distinct image URLs remain attached to review rows; 39 rows have no image URL.
- The two rejected rows are OA015-1 and OA716-1. The observed gallery/product assets visibly identify other hardware codes, not the exact source SKU/fitment. Those images remain rejected; no replacement or generic image was substituted.

The earlier baseline (40 pending / 5 candidate / 7 URLs / 38 gaps) is stale and must not be used in new status reports or tests. The deterministic audit test was corrected to assert the current 39 / 4 / 2 / 6 / 39 totals.

### Two additional official-page identity checks

- **OA418-1 Classic / Nissan Magnite:** the official OneNav page for this vehicle currently identifies `ON418-1LX` and describes OneNav Evolution. It does not establish a Classic `OA418-1` product. The official URL is recorded in the 23-row unmatched-head-unit evidence register, but OA418-1 remains `UNVERIFIED` with `IMAGE_PENDING`; do not transfer Evolution images/specifications.
- **ON015-3 / Land Cruiser 70 Series with buttons:** the official OneNav page confirms a 9-inch Land Cruiser 70 Series product for 2012–2026, but the page's printed SKU is `ONO15-3A14` (letter O), whereas the supplier source row is `ON015-3` (zero). This is an identity/code conflict, not an exact SKU match. The row is quarantined as `IDENTITY_CONFLICT`; no image or specifications are assigned pending supplier confirmation.

### Review-register integrity repair

The 23-row unmatched-head-unit CSV had seven fields per record but only six column headers. The missing `model_identity_status` column is now named explicitly, the `image_status` and `review_note` columns are aligned, and the ISA-ON115-3LX alias-confirmation note is no longer misfiled as an image status. The dedicated test now validates all seven columns, all 23 unique rows, allowed identity/image states, and the three critical decisions above.

The exact-head preview workflow now runs `tests/onenav-source-audit.test.cjs` whenever this private register or test changes. It no longer deploys solely because `HANDOVER_CURRENT.md` changed; handover-only commits do not alter customer assets and should not consume preview build/deploy runs.

### Current blockers and next action

- The 245-row unmatched OneNav source triage remains 245/245 `MANUAL_SOURCE_VERIFICATION_REQUIRED`; it is keyword triage, not manufacturer verification.
- The 86-row fitment-kit crosswalk still has no exact kit image verified for any row (52 family-supported, 25 partial-variant, 6 no exact catalogue match, 3 conflicts).
- The 16-row camera/accessory register still has 14 image-pending rows, one candidate not visually verified and one code-mismatch image rejection.
- Continue OneNav only. Next priority is exact manufacturer evidence and exact images for the remaining head-unit/accessory records; do not advance to another brand while OneNav remains incomplete.

All changes remain private review-only / DO NOT IMPORT. No customer-facing product JSON, price, stock, GW SKU, public product, Supabase/live database, supplier activation, merge, deployment, Axxess, DNS or payment data was changed by this audit correction.


### 245-row source workload decomposition

The current 245-row source triage register contains the following provisional groups (these are keyword/source-description classifications only, not manufacturer verification or product approvals):

- 123 Installation / Vehicle Harnesses / Trims — all provisional components.
- 76 Mounting Frames / Brackets — all provisional components.
- 14 Cameras / Monitors — product-or-component status still requires item-level verification.
- 22 Head Units / Media Players — provisional product rows.
- 10 Unresolved / Manual Review — no category/product-type decision.

Overall: 199 provisional components, 14 provisional product-or-component rows, 22 provisional products and 10 unresolved rows. This is why the 245-row register must not be treated as 245 ready-to-list products. Continue item-level identity, exact fitment, bundle/component and image verification before any category or listing decision.


## 2026-11-07 — OneX camera and smart-mirror manufacturer evidence

The private 16-row camera/accessory register now includes these additional official OneNav findings:

- **OX-4991DVR — Bracket Mount Smart Mirror:** official OneNav product page explicitly prints SKU `OX-4991DVR` and the matching bracket-mount smart-mirror/DVR/Wi-Fi/4K title. The page currently exposes no product-image filename or detailed specifications in the retrieved content. Identity/title are manufacturer-verified; image/specification state remains pending.
- **OX-LCAM001 — License Plate Camera:** official OneNav page explicitly prints SKU `OX-LCAM001`, describes the number-plate holder with centred camera, adjustable viewing angle and 140° view, and links the exact `CL433RVDVR_web-600x600.jpg` asset. The official 600×600 image was visually inspected and depicts the matching camera/number-plate frame. Image status is `OFFICIAL_IMAGE_CANDIDATE_RIGHTS_REVIEW_PENDING`; no customer publication until reuse rights/owner approval are established. Image URL: `https://onenav.co.za/wp-content/uploads/2022/04/CL433RVDVR_web-600x600.jpg`.
- **OX-4990DVR — Universal Mount Smart Mirror:** official OneNav page confirms exact SKU and title, but provides no retrievable image filename or detailed specifications. A third-party image-search result for a visually similar mirror visibly states `ON4988-X`; that asset is rejected for OX-4990DVR and the exact image remains pending.
- **OX434RC — Bracket Mount Rear View Mirror Monitor:** official OneNav page identifies a related product as `ON434`, not `OX434RC`. Its visible image filenames are `SmartMirror-with-DVR-ON4988-B.png` and `SmartMirror-with-DVR-ON4988-C.png`, which carry another code family. Keep the source row quarantined and do not assign those images/specifications pending supplier confirmation.

These are source-identity/image decisions only. No image was added to customer-facing data, no GW SKU was proposed, and no price/stock was inferred.


## 2026-11-08 09:52 SAST — Nissan Qashqai / X-Trail ON413-1A10

- Reconciled source code `ON413-1A10` against the official OneNav 2023 catalogue, page 13 (PDF page 13 / zero-based page 12). The page visibly identifies Nissan Qashqai / X-Trail (2015+), exact code `ON413-1A10`, and a 10.1-inch screen. The same page's product image shows the matching Nissan Qashqai/X-Trail dashboard and is an owner-authorized catalogue-image candidate.
- Manufacturer catalogue feature panel supports a conservative customer description: Android 10, Bluetooth, Wi-Fi, wireless OneConnect for Android/iPhone, steering-control integration, software updates and 3-year warranty. No unlisted CPU, RAM, storage, output power, camera compatibility or other Evolution specifications were inferred.
- Updated `catalogue-review/onenav-23-unmatched-headunit-evidence-2026-11-06.csv`: exact manufacturer title and paraphrased description added; model status remains `VERIFIED_OFFICIAL_CATALOGUE`; image status is `EXACT_SOURCE_CATALOGUE_IMAGE_VERIFIED_CROP_PENDING`. The official PDF page is recorded as the image source; `image_url_candidate` is intentionally blank because a standalone crop file has not yet been extracted. The record remains DO NOT IMPORT.
- Updated `tests/onenav-source-audit.test.cjs` to recognise the explicit crop-pending state and assert the exact code/fitment/title/description/source-page, plus the fail-closed blank image URL. A missing comma found during diff inspection was corrected in follow-up commit `6da177f0d081bf8838f1964e929abefd6d6f3110`.
- Commits: data update `fd26f96a3fb8774d4beecea1f241a2137bce2e99`; regression update `e414c498befea854816c80a62d57e91d9575178a`; syntax correction `6da177f0d081bf8838f1964e929abefd6d6f3110`. The following handover commit records the checkpoint.
- Current OneNav review totals remain: 45 official-model audit rows (39 details verified/image pending, 4 preview candidates, 2 rejected image records; 7 distinct candidate image URLs); 23 unmatched head-unit evidence rows (23 unique codes); 16 camera/accessory rows; 86 fitment-kit rows with no exact kit image yet; 76 frame/trim rows; 32 harness/fitment rows; and 245 unmatched source rows still requiring manual source/model verification. These are review counts, not import-ready products.
- Validation performed in this run: read-back of the 23-row CSV retained 23 unique codes; ON413-1A10 has the exact new description, official catalogue source page 13, crop-pending state and intentionally blank image URL; test assertions were read back. A JavaScript syntax-compile and focused data assertions are recorded in the handover. The committed Node test was not executed and no hosted Actions workflow was triggered; do not claim full test-suite/CI pass.
- No storefront JSON, product image asset, GW SKU, price, stock, Supabase/live catalogue, customer-facing route, deployment, merge, Axxess, DNS, payment or production data was changed.
- Next: extract the exact Qashqai/X-Trail catalogue image crop into the private review asset tree, then verify crop dimensions and match. Continue OneNav only; do not transfer the image to Classic/Evolution variants or another model.
