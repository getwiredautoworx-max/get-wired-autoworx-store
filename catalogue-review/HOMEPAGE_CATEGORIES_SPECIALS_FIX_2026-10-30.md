# Homepage categories and Specials loading repair — 2026-10-30

## Owner-reported defect
Homepage category tiles and the Specials section did not load in the Get Wired storefront preview.

## Investigation evidence
- Read-only Supabase inspection: `public.categories` has 243 rows / 166 active rows; `public.products` has 4,200 rows / 4,187 active rows; 8 active products have `featured=true`.
- Public `anon` SELECT grants and active-row SELECT RLS policies exist for both categories and products. This is not an empty catalogue or missing public read permission.
- Static compilation of the current PR #136 HTML found two JavaScript/markup blockers:
  1. `productImageMarkup()` contained an invalid nested quote sequence in its inline image-error handler, causing the main storefront script not to parse.
  2. The `gwVerifiedCatalogueData` script was not closed before `</body></html>` and the `gw-preview-guard` script, so the latter markup was parsed as JavaScript and failed.
- The previous loader also rendered Specials only after awaiting the complete active catalogue query (4,187 rows), and requested exact counts on every paginated API call.

## Preview-only fixes committed to PR #136 branch `gw-store-preview-1030`
- `06b80b886a83e4f2a13468c10e8041f46bedb72f`: render the local `assets/category-tree.json` snapshot immediately; refresh categories independently; load featured products in a separate small query; remove exact-count overhead; use 500-row pages; preserve category counts from the snapshot while live products load.
- `08aab1131c045caf3aa0a4d2f4a5ccbec993dacc`: replace malformed inline image-error string with a delegated image-error listener and safe placeholder.
- `f52c7efa8ff7583ec1732d785bc903f49f95b6b6`: close the verified-catalogue script before the preview guard and close the document correctly.
- Exact static validation against `f52c7efa8ff7583ec1732d785bc903f49f95b6b6`: all 7 inline scripts compile with V8; loader checks confirm the snapshot loads before live categories, featured products are fetched independently of the full catalogue, exact-count headers are removed, all 8 configured homepage root category IDs remain present, and the document closes correctly.

## Deployment / acceptance status
- Cloudflare Pages bot had acknowledged commit `f52c7ef` with build **in progress** at last inspection. No successful deployment for this repaired head has yet been confirmed.
- GitHub Actions exact-head workflow results had not yet appeared for `f52c7ef`; the previously observed runner/job-start failure remains unresolved.
- Desktop/mobile hosted browser acceptance is still outstanding. Do not call the defect resolved for customers until the repaired preview is deployed and category tiles, subcategories, featured specials, and product navigation are visibly verified on desktop and mobile.
- PR #136 remains draft / unmerged. Production remains HOLD.

## Safety
No Supabase data, RLS, grants, migrations, supplier catalogue rows, live stock, prices, production checkout, Axxess, DNS, production hosting or payment settings were changed. All code fixes are confined to the PR #136 preview branch.


## Deployment and CI follow-up — 2026-10-30

- Cloudflare Pages bot confirmed SUCCESS for exact repaired head `f52c7efa8ff7583ec1732d785bc903f49f95b6b6`.
- Immutable preview: https://c168b29f.get-wired-autoworx-store.pages.dev/preview-store.html
- Branch preview: https://gw-store-preview-1030.get-wired-autoworx-store.pages.dev/preview-store.html
- Fresh exact-head GitHub Actions checks were created (Storefront Smoke, Cloudflare Pages Public Package QA, Catalogue Image Audit, Populated Store Preview Browser QA, Public SKU Exposure Audit, Minimal Runner Diagnostic); all six completed FAILURE before job steps. Diagnostic job 124179259135 and browser job 124179258439 both report `logs_url=null` and `steps=null`. No browser assertion executed; the Actions runner/job-start issue remains unresolved.
- Static source validation is green (7/7 inline scripts parse), but no hosted visual/browser acceptance has been completed. Keep PR #136 draft and production HOLD until categories, subcategories, Specials and product navigation are confirmed on desktop and mobile.
