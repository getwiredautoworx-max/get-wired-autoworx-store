# Repository Overview — Get Wired AutoWorx

## Verified entry points and deployment targets

- **Primary live host:** Axxess shared Linux hosting; static storefront files are served from `public_html`.
- **Repository default-branch entry point:** `index.html` immediately redirects to `store.html`. The repository's root entry file is therefore a static HTML redirect, not evidence of a Next.js runtime.
- **Storefront pages/assets:** `store.html` and sibling HTML pages such as `checkout.html`, plus the repository's `assets/` directory. Confirm the current tree before assuming any particular file exists in a release package.
- **Backend:** Supabase project ref `ojytykqpvonxvepprgbh`; public `products` and `categories` tables are protected by row-level security. Edge Functions include `get-wired-store`, catalogue import functions and `part-image-search`.
- **Automation:** GitHub Actions workflows validate selected repository artifacts. A green workflow proves only the checks it actually runs.
- **Mirrors/previews:** Cloudflare Pages and an older Netlify deployment exist in project history. They are not the primary production host. Do not assume a mirror deploy updates Axxess.

## Data flow (intended; verify against the current deployed artifact)

1. Customer opens the static storefront hosted by Axxess.
2. Storefront code calls the configured public backend/API for category and product data; inspect the deployed files and network behavior before assuming a specific endpoint or table contract.
3. Catalogue imports are staged and validated before any approved publication. Do not execute the unsafe September import SQL.
4. Checkout collects order information and uses only payment methods actually configured and approved for production. Do not claim PayFast or PayJustNow is active until merchant verification and controlled testing are complete.
5. Part-image search, when configured, sends an uploaded photo to the `part-image-search` Supabase Edge Function; the function asks the vision model for a cautious description and ranks active catalogue candidates. Results are suggestions, not guaranteed fitment.

## Data and publication boundaries

- Supplier cost, supplier SKU, internal review state, secret keys and unpublished records must never be returned to public customers.
- Customer price calculation: supplier cost excluding VAT × 1.15 × 1.35, rounded to cents, but only current supplier-confirmed cost may be used for publication.
- The eight approved customer-facing categories are: Auto Electrical Spares; Vehicle Security; Car Audio & Entertainment; Automotive Accessories; Marine Spares & Accessories; Tools, Hardware & Consumables; Camping, Leisure & Outdoors; Trailer & Canopy.
- Preserve original supplier category/subcategory and evidence during mapping. Do not infer a part's fitment, price, exact image or permission from a filename or broad family grouping.

## Current verified schema snapshot (read-only, 2026-10-15)

- `public.products`: 4,198 rows.
- `public.categories`: 242 rows.
- Root categories include both customer-facing and catalogue-import-generated names. The root-category set is not yet reconciled to the approved eight. Do not perform a production taxonomy mutation as part of documentation work.
- `part-image-search`: ACTIVE, version 2; this confirms deployment status only, not provider-secret readiness or successful end-to-end matching.

## Release discipline

Follow `docs/OPERATOR_RUNBOOK.md` and the central `HANDOVER_CURRENT.md`. Stage first, capture the exact commit and test evidence, preserve a rollback artifact, and batch the approved final synchronization. Never expose secrets or bypass owner/supplier approval gates.
