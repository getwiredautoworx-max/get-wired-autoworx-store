# GET WIRED AUTOWORX — CATALOGUE CONTINUATION HANDOVER
**Updated:** 29 October 2026, 16:15 SAST  
**Repository:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store  
**Status:** Continuation checkpoint; review-only; no customer-facing import or production change.

## PERMANENT USER INSTRUCTIONS — 8 LOCKED RULES
1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**

## CURRENT TASK — OWNER'S LATEST DIRECTIONS
- Prioritise reorganising supplier catalogues into product pictures only, organised by category/subcategory; keep descriptions and prices tied to the exact product.
- Customer-facing product pictures must show the assigned Get Wired (GW) SKU, replacing the supplier SKU printed on the picture. Keep supplier SKU internally for ordering and traceability.
- Never pair a picture, description, price, supplier SKU, GW SKU, category or subcategory by visual guess. Match exact manufacturer/supplier SKU and source evidence; send ambiguous records to review.
- Continue Planetworld and Audio Connections processing while preparing the approved ASC replacement dataset separately.
- Price-less products must be labelled exactly: **“Price on Request due to Limited Stock and Availability”** Do not invent a price. Keep Planetworld's 19 zero-RRP items on the owner's audit hold; don't infer that zero means out of stock or special order.
- Return address is private and is to be communicated to the buyer in writing only when a return is required. Returns/pickups are by appointment only; **No Walk-ins; No C.O.D.** Customer may collect only after payment and after Get Wired notifies them that the order is ready.
- Catalogue images must remain legible on both phone and PC. Prefer clean, high-quality PNG exports; use 300 DPI as a print/master target, but for web/mobile optimise pixel dimensions and file size (DPI metadata alone does not improve screen sharpness). Retain source PDFs and originals.
- Storefront launch remains HOLD; do not merge draft PRs, deploy, consume Cloudflare/Netlify credits, alter Axxess/DNS/payment, or mutate live prices/stock/catalogue/Supabase without explicit approval.

## VERIFIED REPOSITORY INVENTORY AT THIS CHECK
- Repository is private.
- Planetworld incoming workbook folder: `catalogue-source/suppliers/planetworld/incoming-xlsx/`; 47 XLSX files are reported in the prior verified monitor record. The current GitHub contents endpoint confirms the folder and workbook files are present. The workbook binaries have **not** yet been extracted into reviewable product records in this pass.
- Audio Connections source folder: `suppliers/Audio Connections/`; two PDFs are present: Starsound August 2026 dealer price list and Sony Mobile ES September 2026 dealer price list. They are supplier source documents, not yet a verified customer-facing product-picture catalogue import.
- Existing Planetworld phone review `catalogue-source/suppliers/planetworld/MOBILE_REVIEW_2026-10-26.md` says the last certified audit covered 47 XLSX, 94 sheets, 3,317 rows, zero workbook errors; that audit/artifact is historical and must not be represented as a fresh extraction of the current source set.
- Supplier README at `suppliers/README.md` currently lists Planetworld with no PDFs in the canonical `suppliers/Planetworld/` folder; the XLSX set remains in `catalogue-source/suppliers/planetworld/incoming-xlsx/`. Do not claim the supplier-folder upload/reorganisation is finished.
- Current Planetworld hold: 19 zero-RRP rows reserved for owner audit. Earlier price suggestions are review-only, not approved selling prices. Do not overwrite previously verified October prices with unverified rows.
- ASC data must be rebuilt only from owner-approved dated Buyers Guides (September, October and November), vehicle-parts catalogues and new-arrivals catalogues. Do not treat existing ASC store-stock listing as authoritative import input. Do not delete or reload live ASC stock without explicit approval.
- Existing 198 category rows remain manual review; 107 October price rows remain no-write per prior monitor checkpoint.

## NEXT EXECUTION STEPS
1. Find or create a non-production, binary-preserving workflow to parse Planetworld XLSX files into a supplier-separated review dataset. Do not use the GitHub text-file API to alter binary XLSX contents.
2. Extract Audio Connections PDFs to page-referenced rows; preserve exact item/model, source page, supplier SKU, price and stated price basis/validity. Verify any model/image pair before generating customer-facing picture.
3. Prepare mapping columns: source path/page/sheet/row; supplier; supplier SKU/manufacturer model; assigned GW SKU; exact description/specification; price and basis; category/subcategory; image source; review status. Unknowns stay blank/flagged, never guessed.
4. Build image-label replacements only after exact identity mapping. Preserve the original image; produce a separate output copy; inspect the resulting SKU label at phone and desktop sizes.
5. Keep all output in a review-only branch/PR and verify duplicate SKU, missing fields, image/SKU mismatches, price basis and categories before any proposed import.
6. Continue approved ASC source extraction in parallel, but do not let it block Planetworld/Audio Connections.
7. Update `HANDOVER_CURRENT.md` and `AI_HANDOVER_PERMANENT.md` after each verified material result; keep the eight locked rules unchanged.

## RELEASE / DATA SAFETY STATUS
No live product/price/stock/category write, ASC deletion/reload, Supabase mutation, PR merge, production deployment, Axxess/DNS/payment change or Cloudflare/Netlify credit use was made in this continuation check. Catalogue extraction/import completion is **not claimed**. Customer launch remains **HOLD**.


## CONTINUATION CORRECTION — 29 October 2026, 19:58 SAST

- Read back the current master handover, permanent handover, catalogue continuation and the latest monitor checkpoint before continuing.
- Mandatory exact customer-facing fallback for every unverified/missing selling price: **“Price on Request due to Limited Stock and Availability”**. The earlier shorter phrase in this handover has been corrected; do not use the shorter wording.
- The corrected Planetworld review workbook in the Library is a filtered legacy review report, not a fresh source audit. Its 19 zero-RRP, 37/38 potential below-cost, and 32 model/SKU-match flags remain advisory queues only. The 32 flags are not confirmed duplicates: source-file provenance, exact model, full description/specifications and actual product image must be checked before any duplicate decision. Do not delete or suppress listings on flags alone.
- Current verified supplier sources remain 47 Planetworld XLSX files under `catalogue-source/suppliers/planetworld/incoming-xlsx/` and two Audio Connections PDFs under `suppliers/Audio Connections/`. The canonical `suppliers/Planetworld/` folder is not yet populated with those XLSX files; no binary move, fresh workbook parse, Audio Connections extraction, GW-SKU assignment, image-label replacement or store import is claimed by this checkpoint.
- Next work remains source-led and review-only: inspect source rows and images together; retain source path/sheet/row or PDF page; preserve supplier SKU internally; assign/relabel GW SKU only after an exact documented match; leave uncertain matches unresolved. Continue Planetworld and Audio Connections without waiting on ASC, but do not change live stock/prices/catalogue/Supabase, production hosting, Axxess, DNS or payments.
- No supplier binary or live store data was changed in this continuation checkpoint. Launch remains HOLD.
