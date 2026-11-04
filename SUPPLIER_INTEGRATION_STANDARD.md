# Get Wired AutoWorx — Supplier Integration Standard

**Status:** Owner-directed permanent working standard, established 2026-11-03.  
**Pilot suppliers:** Planetworld and Audio Connections.  
**Rollout rule:** Do not begin ASC or Electro-city supplier integration until the owner has reviewed and accepted the Planetworld + Audio Connections pilot result.

This is the repeatable method for every supplier and every category added to Get Wired AutoWorx. Preserve this method across handovers and future work; do not improvise a different catalogue structure for each supplier.

## 1. Start with source truth
- Inventory every original catalogue, workbook, price list, guide, image pack and stock file before extracting.
- Preserve original filenames, dates, validity, page/sheet, headings, row numbers, supplier part codes and model references.
- Never silently overwrite, rename, discard or merge source records.
- Treat dated price/stock data as a dated snapshot, not current availability.
- Separate supplier source files and private dealer information from customer-facing assets.

## 2. Build a normalised internal offer ledger
One row represents one supplier offer. Capture:
- supplier identity (internal only), source file/page/sheet/date and source row;
- supplier code, manufacturer/OEM model, brand and exact description;
- product specifications, fitment and supporting evidence;
- dealer cost, VAT basis, RRP, discounts and price validity;
- stock/lead-time evidence and its timestamp;
- image URL/file, exact-model match, resolution and usage permission;
- GW SKU candidate and collision-check result;
- category, subcategory, brand and component group;
- status: VERIFIED, REVIEW, QUOTE ONLY, EXPIRED or REJECTED.

Do not invent missing values. Keep unknowns explicitly unknown.

## 3. Reconcile identity before categorising or deduplicating
- Match exact manufacturer model/OEM code and specifications first.
- Use supplier cross-references and fitment only when source evidence supports them.
- Similar descriptions or similar-looking images are not proof of equivalence.
- A brand homepage can confirm brand identity/spelling only. It does not verify an individual product, model, variant, specification or image. Record brand-only evidence separately and never count it as a product reference.
- If supplier source specifications conflict with manufacturer evidence, record both values and both sources, flag the discrepancy, and block final customer specifications until confirmed. Never silently overwrite the supplier source or substitute a manufacturer figure.
- Keep separate supplier offers internally even when they resolve to one customer product.
- Suppress duplicate display rows only after comparing source provenance, model, description/specification and image; never delete source evidence because two codes look alike.
- Preserve distinct variants, sizes, impedance, channel count, connector, fitment and package quantity.

## 4. Apply the approved Get Wired category and navigation hierarchy
- Homepage has exactly the three owner-approved startup buttons:
  1. Car Audio / Home Entertainment / Lifestyle
  2. Auto Electrical Parts & Spares
  3. Car Care & Accessories
- Do not restore the old eight-root layout.
- Every category, subcategory, brand, catalogue, product, policy and checkout page uses the same approved homepage shell and responsive navigation.
- Under Car Audio / Home Entertainment / Lifestyle, organise by clear departments, then brand buttons with brand logos, then useful product/component groupings.
- Keep Car Audio & Video as one department; Harnesses, Trims & Fitment is a separate component group/button, not a duplicate Car Audio department.
- Keep Marine Audio separate. Keep Home Entertainment, Installed AV, DJ, Studio, Band & Live Sound, Musical Instruments and Lifestyle products in their appropriate source departments.
- Supplier names, dealer costs, raw supplier codes and internal review labels never appear to customers.

## 5. Images and product content
- Use the exact product/variant image from an authorised supplier or manufacturer source.
- Check the image visually against the exact model, variant, finish and package; record the source and permission.
- A manufacturer page URL or search result is not itself an approved image asset.
- Never substitute generic, stock, reused or merely similar product images.
- If no verified image exists, show no false product image and keep the row in review until resolved.
- Write clear, accurate customer descriptions from manufacturer/supplier evidence. Do not invent features, ratings, fitment or compatibility.
- Product image and description must not overlap; GW product code and key details must remain legible on mobile.

## 6. GW SKU and supplier-code handling
- Generate or assign a GW SKU only after exact identity is established and the candidate is checked against the existing GW SKU namespace.
- A proposed/collision-checked SKU is not an inserted or approved SKU.
- A collision-free candidate code does not prove product identity. If brand/model/variant evidence is incomplete, keep the code in a separate held-candidate field and leave the assigned/proposed GW SKU blank.
- Supplier SKUs remain internal; replace them on customer-facing listings with the GW SKU.
- Keep manufacturer model numbers visible where useful for customer search and fitment, but do not expose dealer-only supplier references.

## 7. Pricing, margin and availability
- Establish whether every input is VAT-inclusive or VAT-exclusive before calculation.
- Keep dealer cost private. Include VAT, inbound delivery/collection, packaging, payment fees, discounts, customer courier subsidy, warranty/returns exposure and other applicable costs when assessing landed cost and contribution.
- Apply the owner's supplier-specific pricing decision only after the cost basis and validity are confirmed. Do not blindly apply a markup or discount.
- For Planetworld, the agreed starting benchmark is listed VAT-inclusive RRP less 1–2%, subject to a positive verified cost floor and owner approval. Zero-RRP, missing-price and below-cost cases are held for review/quote-only; never calculate from zero.
- For Audio Connections, preserve the source-specific VAT basis: the August 2026 Starsound list explicitly states dealer prices are VAT-exclusive. The Sony September 2026 list has separate Price Ex and RRP columns; the owner has separately confirmed that Sony RRP is VAT-inclusive. Apply the 1–2% proposal directly to that VAT-inclusive RRP, compare against VAT-inclusive dealer cost, and calculate gross profit exclusive of VAT. Do not add VAT to the Sony RRP a second time. Any proposal remains provisional until current dealer cost and availability are confirmed.
- Use the exact customer-facing fallback when price is not verified: **“Price on Request due to Limited Stock and Availability.”**
- Never present historic stock as live. Confirm current availability and lead time before order.

## 8. Supplier comparison and customer listing
- Compare equivalent offers across all approved suppliers using verified landed cost, image quality, supply reliability, warranty and delivery.
- Retain every supplier offer internally; create one customer-facing listing per genuinely equivalent product.
- Choose the best risk-adjusted supplier source, not automatically the lowest printed cost.
- Keep all supplier identity, dealer price and margin workings private.

## 9. Staged integration and verification
For each supplier or major category pilot, copy and complete `SUPPLIER_PILOT_TEMPLATE.md`; keep the filled copy with the pilot audit and handover. Then follow this sequence:
1. Source inventory and provenance audit.
2. Normalised offer ledger and extraction reconciliation.
3. Identity/model/variant and duplicate audit.
4. Category/subcategory/component and brand-button audit.
5. GW SKU collision audit.
6. Exact-image and usage-permission review.
7. Description/specification review.
8. VAT, cost-floor, RRP and margin review.
9. Current availability/lead-time review.
10. Customer-facing preview with the shared homepage shell.
11. Search, filtering, pagination, category navigation and mobile presentation checks.
12. Diff report and owner review/acceptance.

Record measurable counts, unresolved exceptions and evidence. A task is not complete because a page renders or a record exists.

## 10. Release and owner-acceptance gates
- Supplier catalogue work is preview/review only until the owner accepts it.
- Do not import, activate or publish supplier items, live prices, stock or categories without separate explicit owner approval.
- Do not write to Supabase/live data, change payments, upload to Axxess, alter DNS, merge to production or deploy production without the required separate approval.
- Functional checkout/payment testing remains last, after the owner adds banking details.
- Never claim readiness without exact-head tests, verified staging preview and owner acceptance.

## 11. Pilot acceptance rule
Planetworld and Audio Connections together are the proving ground for this standard. The owner must be able to review the actual catalogue presentation, accurate products, correct grouping, usable images, GW SKUs, honest prices/availability and consistent page shell. Fix the method and the pilot until accepted. Only then reuse the same standard for ASC, Electro-city and every later supplier/category.
