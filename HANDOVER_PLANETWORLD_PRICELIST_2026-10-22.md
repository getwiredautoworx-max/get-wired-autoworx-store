# Get Wired AutoWorx — Planetworld Pricelist Handover
Date: 2026-10-22 (SAST)
Repository: https://github.com/getwiredautoworx-max/get-wired-autoworx-store

## Current task
Owner wants to use Planetworld's dealer downloadable pricelist to assess the commercial opportunity for Hertz products and design a practical supplier-assisted catalogue/order process. Planetworld has no API; dealer orders are placed online through its dealer portal and Planetworld delivers to the dealer.

## Verified repository visibility
- GitHub repository `getwiredautoworx-max/get-wired-autoworx-store` was checked using the connected GitHub integration on 2026-10-22.
- Reported visibility is **PUBLIC**.
- Therefore, DO NOT upload the Planetworld dealer pricelist, dealer cost data, or other confidential supplier information to this repository, any public branch, commit, issue, or pull request.
- The owner has exhausted ChatGPT file attachments for now, so direct upload into this conversation is not currently available.

## User-facing discussion so far
- Recommended using Planetworld dealer pricing to build an accurate Hertz catalogue and a manual dealer-availability check workflow rather than trying to invent an API.
- Proposed product groups: speakers/component kits, subwoofers, amplifiers, DSP processors, and marine audio.
- Proposed workflow: customer browses product -> Get Wired verifies current dealer price/stock/lead time in portal -> sends confirmed quote -> after customer approval/payment under published terms, Get Wired places the dealer order and tracks delivery.
- Suggested bundles and installation/fitment offerings where Get Wired provides them.
- Price formula previously specified by owner for the store is supplier cost × 1.15 VAT × 1.35 markup; apply only to verified cost data and account for shipping/other costs as appropriate. Do not present dealer prices as retail prices or assume stock from a pricelist.
- Need respect Planetworld's terms and obtain permission for any commercial republication of supplier descriptions/images where required.

## Next continuation point
1. Ask owner to confirm whether they have access to a **private** GitHub repository or another private storage location. Do not ask them to put confidential pricing in the current public store repo.
2. If a private repository is available, guide the owner to upload the original file there using GitHub's web UI. Prefer a separate private supplier-data repository or private branch/repository configured with private visibility; visibility is a repository-level property, so a branch in the existing public repository is NOT safe.
3. If no private repository is available, alternatives that do not require ChatGPT attachment upload:
   - Open the pricelist locally and paste a small representative sample of column headings and a few rows into chat, redacting sensitive account details; or
   - Convert a copy to CSV locally and share only non-confidential product fields / selected rows in chat; or
   - use an owner-controlled private cloud drive and a supported connected-file workflow if available.
   Do not claim that a private-drive URL can be accessed unless an appropriate connector/tool is available.
4. Once the file can be read, inspect its format and fields; report row count, SKU/model uniqueness, product families, missing/duplicate fields, discontinued/availability indicators, and cost coverage. Preserve source rows and make a separate proposed import/analysis output; do not overwrite production catalogue.
5. Build a small sample first and validate product identity, categories, prices, and status before scaling.
6. No live deployment, Axxess/DNS change, catalogue publication, customer-facing price changes, or order placement without the owner's explicit approval and evidence-based QA.

## Current status
- Pricelist not yet received/read.
- No supplier data imported, modified, or published.
- No repository deployment or production changes made as part of this task.
- Waiting for owner to confirm private repository/storage option or provide a safe sample.

## CONTINUATION UPDATE — HERTZ DEALER FILE ANALYSED LOCALLY — 2026-10-26

- Located and read the previously uploaded Library file `hertz-price-list-2026-10-22.xlsx`; source metadata says 89 records, filtered to Brand=Hertz, Division=Car Audio, pulled 22 October 2026 at 14:39:28. This file is now available to the current workflow; do not ask the owner to upload it again.
- Read-only audit: 89 product rows, 89 unique item codes, no duplicate codes, no missing dealer-cost fields. The regional stock columns are a dated snapshot only, not current availability. 62 rows show stock in at least one listed region and 27 show zero across the listed regions; verify availability and lead time in the dealer portal before quoting.
- Joined the 89 rows against the existing Hertz classification workbook. 12 rows have an official exact-model product page recorded; the remaining 77 still require exact model/product-page verification. Even the 12 existing page matches still need direct image-asset verification. All products are Car Audio; this source file does not establish Home Theatre, Studio/Pro AV, or Marine inventory.
- Built a local staging workbook at `/mnt/data/Planetworld_Hertz_Staging_Analysis_2026-10-26.xlsx` for owner review. It includes the source product/cost/dated regional-stock fields, proposed categories, the owner pricing formula, comparison with supplier retail values, and model/image verification statuses. It is a working analysis only, not an import file or approved customer price list.
- Pricing QA: the owner formula (dealer cost excluding VAT × 1.15 × 1.35) produces a higher result than the source supplier Retail Price (Incl) for all 89 rows, averaging approximately 3.36% above that listed retail value. This is a pricing-policy/competitiveness review flag, not a recommendation to override the owner's formula or supplier retail price. Owner must decide whether to keep the formula, use supplier RRP, or handle exceptions before publication.
- Confidentiality: confirmed accessible repositories for this account are both PUBLIC; no private supplier-data repository is available through the current connected GitHub listing, and the available GitHub actions do not create a repository. Therefore the source XLSX and pricing/stock staging workbook were **not uploaded or committed** to GitHub. Do not place them in this public repository or any public branch. A separate private repository or owner-controlled private storage is still needed for persistent supplier-source storage.
- No catalogue import, store price/stock update, Axxess/DNS/payment/Supabase change, supplier order, or customer-facing publication was made.

### Next actions
1. Owner review the downloadable local staging workbook; decide pricing treatment after considering the ~3.36% average premium over the supplier's listed inclusive retail price.
2. Obtain/create a private repository or approved private storage for the confidential source and staging workbook. The existing public repository is not suitable.
3. Continue exact manufacturer page/image validation for the 77 unresolved rows; verify images individually even for the 12 page-matched rows.
4. Confirm current dealer availability and lead times in Planetworld's portal immediately before quoting; never treat the 22-Oct stock columns as live.
5. Only after owner approval, prepare a separate non-live catalogue delta for review. No production catalogue or stock changes until explicitly authorised.
