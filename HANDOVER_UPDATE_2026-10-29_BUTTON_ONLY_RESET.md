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


---

## BUTTON-ONLY RESET — VERIFIED CI CHECKPOINT 2026-10-29 19:27 SAST

- Targeted Playwright workflow runs `40920767259` and `40920910617` both completed SUCCESS. The latest branch head at the time was `1a9a4bd4027cd6417e2cfedd70050d4a03a3e0fa`; run `40920910617` passed its targeted button-only tests. Tests reported `BUTTON_ONLY_PASS` at 360px, 390px, 768px and 1280px: 8 main category buttons, 31 child/brand buttons, category expand/collapse works, no product/pricing/search UI, no non-logo images, no horizontal overflow and no browser page errors.
- The legacy Storefront Smoke Test was correctly skipped for button-only mode (latest observed run `40920910443`), not counted as a pass. The Axxess package job was skipped after the mode-detection fix (run `40920910463`), preventing future ZIP/artifact generation while the button-only marker is present. An earlier PR package run `40920766946` completed, but the artifact list for that run returned zero artifacts; no Axxess upload or production deploy occurred.
- The dedicated button-only workflow now supports both pull_request and main push so it will test the intentional blank state after an approved merge. Legacy commerce smoke and Axxess packaging now detect `data-storefront-mode="buttons-only"` and skip incompatible commerce checks/package creation only while that marker is present. Removing the marker when the catalogue is rebuilt restores the normal path.
- Cloudflare Pages reported successful preview commit `ebad842f1a5dbe80e5dfc90827d0b2a60b7db814`, URL `https://86ce16bc.get-wired-autoworx-store.pages.dev`, plus stable branch preview `https://feat-button-only-storefront.get-wired-autoworx-store.pages.dev`. This preview commit predates removal of the explanatory notice. Later deployment status messages were asynchronous/out of order; exact latest storefront content commit `58282129aa1b131f306346ee1bcb63daa72ac617` / current branch head `a64149f292585817e39031d21ab23de8030cc540` was not yet conclusively reported as deployed. Do not claim exact-head preview verified until Cloudflare status confirms it.
- PR #109 remains draft/open/unmerged. Keep production unchanged until exact latest Pages preview status is verified. The user has explicitly directed the button-only reset; proceed after review checks, preserving the existing guardrails against live data, payment, DNS, supplier catalogue and stock changes.
