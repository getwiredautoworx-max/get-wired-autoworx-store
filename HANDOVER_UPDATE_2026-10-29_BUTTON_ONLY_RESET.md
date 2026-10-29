# STOREFRONT BUTTON-ONLY RESET — 2026-10-29

## Owner instruction — permanent rule
- The storefront must be blanked to a **buttons-only category navigation** before the catalogue is rebuilt. Hide/remove product cards, product lists, prices, catalogue images, featured/special product sections, product search results and other product-display content from the storefront presentation.
- Keep only the approved category/subcategory navigation buttons (including the eight approved main categories); expand/collapse navigation must work on mobile and desktop.
- This is a deliberate reset, not permission to delete supplier source catalogues, product records, pricing records, stock data, images/originals, admin tools, checkout code, backups or historical work. Preserve these records and assets unless the owner separately authorises changes.
- Refill buttons/navigation and reload product content only after product-to-model/SKU/image/description/price/category mapping is verified. Never guess product matches or infer that a cross-catalogue listing is a duplicate product.
- Treat a product appearing in multiple supplier guides/catalogues as a **cross-catalogue match requiring verification**, not a duplicate SKU/product by itself. Compare manufacturer/model, image, description and supplier source before classifying. Do not delete or merge records based solely on a repeated model/SKU flag.
- Work in a review-only branch/PR and verify the button navigation before any merge. No production deployment, Axxess upload, DNS/payment changes, live stock/catalogue/price writes or Cloudflare/Netlify credit use without explicit owner approval.
- Record each implementation/test outcome in this file and HANDOVER_CURRENT.md; only claim a change is complete after the commit and read-back/preview evidence are verified.

## Implementation status
- Owner requested a storefront reset to buttons only on 2026-10-29.
- Proposed implementation replaces the product-heavy index-new.html presentation with the eight approved main category buttons and expandable subcategory buttons; no products or prices are displayed.
- Review branch: feat/button-only-storefront-reset-2026-10-29. This branch must remain unmerged until review and preview checks. Production remains unchanged.


## Verification workflow correction — 2026-10-29
- The first PR #109 Storefront Smoke Test run (40918640378) failed before tests started because Playwright 1.55 does not support the ubuntu-latest image selected on 2026-10-29 (runner ubuntu 26.04). This is an environment compatibility failure, not a storefront assertion result.
- Added a dedicated button-only Playwright workflow pinned to ubuntu-24.04, testing widths 360, 390, 768 and 1280px, eight main buttons, child/brand buttons, expand/collapse, no product/price/search elements and no horizontal overflow.
- The legacy full-commerce smoke workflow is skipped only for this temporary button-only reset branch because its assertions require product cards and Part Search that are intentionally hidden. It is pinned to ubuntu-24.04 for future compatible runs. Other branches retain the existing smoke tests.
- Status pending the new workflow run and its logs. No production deployment or live catalogue/stock/price/payment/DNS changes authorized or made.
