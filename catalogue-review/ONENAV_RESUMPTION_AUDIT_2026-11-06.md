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
- The previous handover states that the 45-row audit covers 42 individual page entries plus 3 category-listed fitments, while 19 of 64 storefront cards are outside this audit. The 19 remain an explicit coverage gap.

## Evidence checks in this continuation

- OneNav official page confirms SKU `OA015-1`, Land Cruiser Pick Up 2012+, and the Classic product specifications: https://onenav.co.za/product/onenav-classic-9inch-for-land-cruiser-pick-up-2012/
- The official page's two gallery assets were visually inspected. The radio face carries generic hardware marking `OA1409-CPAA`, not `OA015-1`; do not use those assets as exact OA015-1 product images. The existing retailer image remains review-only pending exact visual recheck and image-use permission.
- OneNav official pages confirm `OA011-1` as the FJ Cruiser Black Classic fitment and `OA013-1` as the Hilux/Fortuner 2011–2015 Classic fitment:
  - https://onenav.co.za/product/onenav-classic-9inch-for-toyota-fj-cruiser-black-2007/
  - https://onenav.co.za/product/onenav-classic-9inch-for-hilux-fortuner-2011-2015/
- One exception needs a small data correction: `ON115-3LX` is confirmed by the official product page as **OneNav Evolution** for Isuzu RBA/RBB, but its audit row currently has a blank `customer_brand_display`. The customer-facing parent brand should be OneNav while the product line remains Evolution. Its official page reports no image asset; keep image pending. https://onenav.co.za/product/onenav-9-inch-for-isuzu-rba-rbb/

## Next work

1. Correct the `ON115-3LX` parent brand display to OneNav in the review CSV, preserving Evolution as its series and keeping its image pending.
2. Reconcile the 19 storefront cards not covered by the 45-row audit against the source catalogue; do not infer missing SKU/variant identity.
3. Resolve exact product-image matches for the 38 rows without image URLs and review all seven existing candidates. Keep all candidate images review-only until exact fitment and rights are verified.
4. Keep OneNav as the active brand. Do not advance to Sony, JBL, Klipsch, Hertz, or another brand yet.
5. Run the new standalone deterministic audit test locally when a repository checkout is available. Do not trigger hosted Actions merely to run this review; no Actions/release credits were intentionally consumed in this continuation.

## Guardrails

All content remains internal review/staging and **DO NOT IMPORT**. No GW SKU assignment, supplier price/RRP changes, stock changes, live product/category writes, Supabase writes, supplier activation, public image approval, merge, deployment, Axxess upload, DNS/payment changes or checkout testing occurred. PR #178 remains draft/unmerged; production HOLD.
