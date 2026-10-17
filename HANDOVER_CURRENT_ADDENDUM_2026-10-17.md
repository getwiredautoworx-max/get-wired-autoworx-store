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
