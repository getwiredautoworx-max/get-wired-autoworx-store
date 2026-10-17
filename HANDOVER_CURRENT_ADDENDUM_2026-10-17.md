# Get Wired AutoWorx — Handover Addendum
Date: 2026-10-17 (South Africa)

## Image replacement continuation — verified checkpoint

- Workflow remains staging-first. The live Axxess store, production Supabase data/schema, DNS, payment settings and real orders remain untouched.
- Inspected the accessible Library source file `store_catalogue_step1_final.csv` read-only. It contains 1,109 rows and 954 distinct SKU values, so 155 rows exceed the unique-SKU count and duplicate SKU rows require reconciliation. All 1,109 rows are marked `STAGING - category to be confirmed`.
- Its eight columns are `catalogue_page`, `product_name`, `sku`, `supplier_cost_ex_vat`, `category_status`, `active`, `stock_quantity`, and `selling_price`. There are no image paths/URLs, model IDs, dimensions, colour, application, asset-source or rights fields. This file cannot be treated as an image-to-SKU crosswalk or used to justify image replacement.
- Existing recovery checkpoint reports 791/800 candidate SKU image tiles recovered from the September supplier catalogue, with nine quote-only/unpriced SKUs lacking recovered images. Sixteen of the 791 are flagged for low-resolution review. All recovered supplier-catalogue images remain internal QA assets until usage rights are documented. Recovery counts are historical evidence, not proof that every image is physically correct or publishable.
- The latest recorded PR #54 exact-head workflow evidence for commit `d76617cf57c764f91d9e95f354c9981695f0ee6a` reports browser QA run `39023530087`, package run `39023530019`, smoke run `39023530003`, and public SKU exposure audit `39023530022` as successful. Browser QA covers responsive rendering and interaction checks; it does not certify exact product identity or image rights.
- Current checkpoint: **0 newly verified rights-cleared image replacements**. This means none were evidenced in the inspected files; it does not prove that no suitable licensed assets exist elsewhere. No product/category image was swapped and no storefront code change was made.

## Acceptance rule for every replacement

Record the exact SKU/model and application; compare physical shape, dimensions, colour, connectors/mounting points and intended fitment; record source URL/file and rights-holder/licence/permission evidence, including permitted edits. Accept only when identity and rights both pass. Otherwise retain a neutral placeholder or hold the product image. Do not use supplier catalogue imagery publicly without permission, and do not substitute a generic family image for a size/model-specific part.

## Next actions

1. Retrieve the actual 800-row image crosswalk and recovery ZIP from the existing workflow/source location; inspect exact-SKU and title/model evidence and the 16 low-resolution flags.
2. Reconcile duplicate SKU rows in the accessible 1,109-row source CSV before relying on it for item-level decisions.
3. Maintain a separate asset-rights ledger with image URL/file, rights basis, evidence reference, permitted modifications, physical-match result and decision.
4. After a real mapping/code change, run targeted image checks and exact-head browser QA at 1440px, 390px and 320px; capture screenshots and console/network errors.
5. Keep PR #54 review-only and the release hold active until product identity, rights, data and launch gates pass and the owner accepts the staged result.

## Blockers and ETA

- Image replacement remains **BLOCKED** pending access to the actual crosswalk/assets and rights-cleared replacement evidence.
- Crosswalk/image inventory review: one focused session after the correct files are accessible. Rights review depends on evidence for each asset; no honest completion date can be given in advance.
- No Axxess upload, merge, production SQL/data write, DNS/payment change, or Cloudflare/Netlify credit use was performed.


## Visual QA artifact reinspection — acceptance correction

- Downloaded and inspected browser QA artifact `staging-browser-qa-31` (artifact ID `12097437510`, SHA-256 `f5af40bdef86a08cf5020be333203062daa147ec36a110f386c78372f668fe07`). The saved screenshots show an excessively tall category section with very narrow subcategory cards and large empty areas. This is a visual-quality concern even though the automated checks passed.
- The artifact report was produced against the older commit `d76617cf57c764f91d9e95f354c9981695f0ee6a`. The current review branch's `index-new.html` has a different blob SHA (`63321c6d1ce50137eea704ed324910999c2f739d`) and uses symbol/emoji category art. Therefore run #31 screenshots are **not current-head visual acceptance evidence** and must not be presented as proof that the latest branch's rendered design is acceptable.
- The report's “broken images” metric counts only images that are both complete and have zero natural width. The saved metrics contain many incomplete/zero-width image entries (likely unloaded or failed requests); those were not classified as broken by that check. Image loading QA must explicitly distinguish lazy/unrequested images from failed image requests and should verify visible images after scrolling/loading.
- Corrected status: **current review-branch visual QA is pending**, and the previously saved screenshots are rejected as visual acceptance evidence. No production change was made. Next action is a fresh browser run on the actual current PR head, with screenshots captured in the initial page state plus an explicit visual category-layout assertion and a visible-image load/error audit.


## Recovered 53-image ZIP inspected — not publishable as-is

- Located and inspected Library archive `Get_Wired_AutoWorx_VERIFIED_SKU_IMAGES_53.zip` (2,977,230 bytes). It contains **53 PNG product images** named by SKU and a 53-row `verified_picture_catalogue_items.csv` manifest.
- Built and visually inspected an internal contact sheet. The images visibly carry ASC / Accessories Spares Centre watermarks. The ZIP/manifest contains no licence, rights-holder authorisation, permission record, or permitted-edit terms. “Verified” in the filename/manifest is not evidence of publication rights.
- Decision: **reject all 53 as replacement assets for public use unless explicit reuse permission is later documented**. Do not crop, erase or obscure the watermark to try to make them usable. SKU-named files are a useful internal identity-review lead only; each still needs product/application/physical-feature confirmation, and the CSV contains some source category assignments that conflict with product descriptions (for example, a fuel-pump description appears under a globes subcategory), so do not trust its category field without reconciliation.
- This inspection improved the evidence base but does not resolve the image replacement task. Newly accepted public-use replacements remain **0**. The 53 watermarked images remain internal QA evidence only; no image was uploaded or published.


## Deliverable — 53-SKU image rights review register

- Generated `Get_Wired_AutoWorx_53_SKU_Image_Rights_Review_Register_2026-10-17.csv` with 53 rows, image filename and pixel dimensions, SKU/product/category details from the ZIP manifest, visible ASC watermark status, exact-identity/application review status, rights/licence evidence field, edit/crop permission field, and public-use decision.
- All 53 rows are marked **HOLD — do not publish** because the archive contains no licence/permission evidence and the images visibly carry ASC watermarks. Exact SKU filenames are recorded as a lead, not accepted as sufficient physical-match evidence.
- The register is a review aid, not an import file and not a permission request. No supplier was contacted; no image was altered or published.
