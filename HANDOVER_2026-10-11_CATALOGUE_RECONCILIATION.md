# Get Wired AutoWorx — Handover Update — 11 October 2026

## PERMANENT USER INSTRUCTIONS — 8 LOCKED RULES
1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**

## Catalogue reconciliation — owner decisions
- Inspect all relevant ASC/supplier catalogues and price lists from June 2026 through the latest available date, plus vehicle-specific catalogues even when prices are absent.
- Match vehicle-catalogue SKU/reference codes against the newest applicable supplier price lists. Keep source filename, supplier, date, page/sheet, matched code, cost basis, and confidence.
- Valid products without a reliable price remain listed as **Price on Request — Request a Quote**. Never invent a price or discard a valid vehicle-specific item for lacking a printed price.
- Preserve ASC categories and subcategories. Incrementally merge newer catalogue evidence into existing records; do not rebuild from scratch.
- Preserve existing verified product IDs, customer-facing GW SKUs, image links, order references and storefront behaviour. No destructive live changes before mapping validation.
- Selling price for a verified supplier cost **excluding VAT**: cost × 1.15 × 1.35. Do not apply VAT twice.
- Status rules: VERIFIED_PRICE only for reliable SKU/price-list match; QUOTE_REQUIRED for unpriced/unmatched valid products; REVIEW_MATCH for uncertain cross-references or conflicts.
- Do not use the previously flagged 1,109-row CSV with incorrect SKU/product/price pairings as a trusted import source.

## Sources confirmed in the recovered Library (inspection remains incomplete)
- Get_Wired_AutoWorx_Buyers_Guides_Audit_June_August_2026.xlsx: prior audit reports 3,704 unique SKU records, 4,820 line occurrences, 470 June OCR staging records; counts are not proof each row is verified.
- ASC-Suzuki-Parts-Catalogue.pdf and ASC-Renault-and-Dacia-Parts-Catalogue.pdf: vehicle-specific catalogues; prices are stated to be on the current trade price list.
- Get_Wired_AutoWorx_CORRECTED_PRICE_AUDIT_Feb-Aug_2026.xlsx: prior audit reports 3,578 source-resolved unique SKUs and 126 unresolved rows; June OCR remains pending and September guide was absent from that audit’s file set. Re-check current sources before relying on counts.
- Get_Wired_AutoWorx_ASC_Verified_Audit_2026-09-16.xlsx: interim 36-row audit, not a full reconciliation.
- Get_Wired_AutoWorx_ILLUSTRATED_PRODUCT_CATALOGUE_CLEAN_2026-09-19.pdf: prior illustrated output reporting 4,186 priced SKUs; not source of truth.
- Get_Wired_AutoWorx_Catalogue_Tracking.xlsx: older snapshot reports 4,187 active products, 58 main categories and 277 subcategory tabs; query current database before edits.

## Required execution sequence
1. Inventory every source dated June 2026 to current: Buyer’s Guides, supplier price lists, stock-arrival PDFs, vehicle-specific catalogues, and prior audit/staging workbooks. Record filename, supplier/date, page/sheet count, and inspection status.
2. Build a consolidated exact-code cross-reference: catalogue reference → price-list reference → cost and VAT basis → calculated retail → source page/sheet/date → match confidence.
3. Preserve ASC category/subcategory structure and add/update only evidence-backed differences.
4. Keep valid unmatched items quote-only. Do not infer vehicle compatibility or assign images by visual similarity.
5. Report additions, updates, duplicates, verified-price rows, quote-only rows, review matches, category/fitment conflicts and image gaps.
6. Produce one validated delta-update package; test it before any live import/deployment.

## ETA, failures and solutions
- Full ETA is not responsibly estimable until source inventory and page/sheet counts are measured. First milestone: source register and exact-code matchability counts.
- Risks: stale/missing price lists, alternate references, repeated monthly entries, fitment conflicts, and unverified images. Keep uncertain cases in review/quote status, preserve provenance, and never guess.
- Current blocker is incomplete source-by-source inspection and reconciliation, not lack of a workflow. Do not claim completion before counts and exceptions are verified.
- Do not use Cloudflare or Netlify credits before final testing. No owner input currently required.
- Continue from verified state; avoid repeated uploads, destructive edits, and circular retries. Update the handover after every completed task.


## 2026-10-11 — SOURCE INVENTORY / FIRST RECONCILIATION PASS
- Materialized and inspected the October Buyer's Guide (32 pages; 70,691 extracted text characters), October Promotions 2026 (20 pages; 27,489 extracted text characters), Suzuki vehicle catalogue (15 pages; 17,515 extracted text characters), and Renault/Dacia vehicle catalogue (14 pages; 15,512 extracted text characters).
- Extracted 1,319 unique code-like candidates from the October guide. This is a staging list, not a count of verified products. 522 code candidates had adjacent OCR price patterns; prices are marked as candidates because the raised-cent typography and ex-VAT basis require visual verification.
- Extracted 345 unique code-like candidates across Suzuki and Renault/Dacia catalogues. 45 exact code candidates also appear in the October guide; 44 have adjacent OCR price candidates. These must be visually checked before price use. Other catalogue lines remain in review/quote queue; absence from the guide alone does not prove no current price.
- Updated workpaper now includes source register, October SKU cross-reference, vehicle-catalogue code/price cross-reference, and previous unresolved price queue. No live product rows changed.
- Confirmed previous price audit's 418 formula failures and 126 unresolved rows; no bulk price import is safe until formula/source errors are reconciled.
- Next step: visually verify extracted code/price candidates against the source page images and check exact SKU/cost/current price basis against live products before preparing any delta import. Keep all uncertain lines REVIEW_MATCH/QUOTE_REQUIRED.
- Measured scope so far: 32 + 20 + 15 + 14 PDF pages inspected for extractable text; detailed visual verification and full cross-source matching remain outstanding. ETA for final package still depends on exception rates after visual checks.


## 2026-10-11 — VERIFIED PRICE CORRECTIONS APPLIED
- Spatial PDF text-span analysis confirmed the raised-cent price typography; manually inspected October Buyer's Guide pages 23, 26, and 27 for exact product/price placement.
- Exact SKU and product match verified for three active live records; updated only cost_price, advertised price, and source/verification fields in specifications. Preserved product ID, SKU, image_url and category_id. No product was added/deleted and no deployment was triggered.
  - I1-154, page 23: ex-VAT cost R318.78 (was R299.98); advertised price R494.91 (was R465.72).
  - RN-MF01, page 26: ex-VAT cost R76.72 (was R70.82); advertised price R119.11 (was R109.95).
  - RT-EM02, page 27: ex-VAT cost R587.79 (was R572.72); advertised price R912.54 (was R889.15).
- Re-read live rows after update: all three formula checks passed using round(cost_price × 1.15 × 1.35, 2). Source file/date/page and VERIFIED_PRICE status are stored in product specifications.
- Workpaper refreshed with spatially aligned price candidates, vehicle-code match queue, and a verified correction log. 534 October guide code candidates have spatially aligned price values; do not bulk-apply them without exact product match and page/source review.
- Remaining risks: 418 prior-audit formula failures; 126 unresolved historic prices; 470 June OCR staging rows; vehicle-specific code candidates beyond exact live matches still need match/quote processing. No full catalogue import or category changes made.


## 2026-10-11 — RESUMED HANDOVER / LIVE DATABASE CHECK
- Re-read this master handover before continuing. Permanent eight rules and owner decisions remain unchanged.
- Read-only live Supabase count checked at 2026-10-11: **4,198 total product rows; 4,187 active; 4,187 active with a positive price; 0 active unpriced; 0 active rows missing SKU**. This confirms the current live catalogue has no quote-only active records yet; it does not prove that all source catalogue items have been imported or priced correctly.
- Reconfirmed prior audit coverage gap: the corrected Feb–Aug audit lists February, March, May, July and August as source-resolved; June was scanned/OCR and not price-verified; September was absent from that audit's source set. October guide/promotions and Suzuki/Renault-Dacia catalogues have since been staged as noted above.
- No live product rows were changed in this resume check. No Cloudflare/Netlify build or credits used.
- Immediate forward path: build and validate a source-driven delta, not a full re-import. First resolve the 418 formula failures and 126 historic unresolved rows against their cited source pages, complete June OCR verification, compare September/October current prices, and exact-code match the 345 vehicle-catalogue candidates against the applicable current supplier price lists. Unmatched valid vehicle-specific products are to be added to the proposed package as quote-only (Price on Request — Request a Quote) after checking for existing duplicates; they must not be discarded or assigned guessed prices.
- Acceptance gate before import: every proposed row must include product/reference code, customer-facing name/description, fitment evidence, ASC category/subcategory, source filename/date/page or sheet, cost basis/VAT status, image reference if verified, status, and action (add/update/quote/review). Automated formula checks plus duplicate/SKU collision checks must pass. Existing product IDs, GW SKUs, image URLs, categories and order links must remain unchanged unless a reviewed delta explicitly requires a safe update.
- ETA: a reliable full-completion ETA remains unavailable until June OCR and the outstanding source-page exception queue are measured. Next measurable milestone is a source register with inspected/pending page counts and exact-code match totals. No owner input currently required.
