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
