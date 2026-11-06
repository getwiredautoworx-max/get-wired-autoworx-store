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
