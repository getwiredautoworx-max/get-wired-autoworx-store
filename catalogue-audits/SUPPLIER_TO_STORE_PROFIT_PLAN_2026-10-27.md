> **SUPERSESSION NOTICE — 2026-11-08:** Historical reference only. Current authority is `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md` (including its dated Section 10), `HANDOVER_CURRENT.md`, and the latest direct owner instructions. This document's older supplier scope, category tree, and pricing formulas are not current instructions. Do not process ASC Buyers Guides. Display Price On Request for all supplier products until current supplier pricing and stock can be updated reliably. No live import or production change is authorised by this historical document.

# Supplier-to-Store Profit Plan — 2026-10-27

## Objective
Build one customer-facing listing per genuinely equivalent product, source each order from the supplier with the best verified total economics, use the strongest accurate authorised image, and maximise profit without sacrificing product correctness, warranty or delivery reliability.

## Execution order

### 1. Establish the supplier source inventory
- ASC: buyer's guides (Feb–September), October promotional catalogue, specialist catalogues, stock-arrival notices, Suzuki/Renault/Toyota/Nissan new-arrival catalogue, and "Regulators NoPrice".
- Electrocity: process its authorised supplier resources as soon as its price/catalogue files are present in the supplier folder or accessible source library. Current tracked folder currently contains README only.
- Caelex: Halloween Week Deals PDF; extract products, codes, deal prices, validity dates and images. Treat deals as date-limited, not permanent costs.
- Audio Connections: Starsound August 2026 and Sony Mobile ES September 2026 dealer price lists.
- Planetworld: process the 2026-10-25 brand price lists already staged under catalogue-source/suppliers/planetworld/incoming-xlsx/ (large multi-brand set), then merge with any supplier-level source files.
- Retain original filename, page/sheet, date/validity and supplier code for every extracted row.

### 2. Create a normalised internal offer table
One row per supplier offer, not one row per public listing. Fields:
- supplier, source file, source page/sheet, source date and price validity
- supplier SKU, manufacturer/OEM code, cross-reference, brand and product description
- specifications/fitment and evidence reference
- supplier cost, VAT basis, discount/deal expiry, stock/lead-time evidence
- image source, image-match confidence and usage permission/source
- inbound delivery/collection cost allocation, packaging, expected customer courier cost/subsidy, payment fee, expected return/warranty risk
- computed landed cost, selling price, net contribution and margin
- confidence/status: verified, needs review, quote-only, expired, discontinued or rejected

### 3. Match equivalent offers across suppliers
- Match exact manufacturer/OEM part number and specification first.
- Then use explicit supplier cross-references and catalogue fitment.
- Do not merge based on similar wording or a similar-looking image alone.
- Keep all supplier offers internally; publish one deduplicated customer listing for each verified equivalent product.
- Preferred source is the offer with the best risk-adjusted landed cost and dependable supply, not simply the lowest printed price.

### 4. Image selection
- Compare all authorised images and illustrated catalogue cards for the matched product.
- Choose the clearest, most accurate image with suitable resolution/cropping.
- Keep supplier/product/page attribution in the internal manifest.
- Never use an image of a merely similar part as if it were the exact product. If no reliable image exists, use an honest placeholder until verified.

### 5. Price and profit calculation
- Establish whether supplier cost is VAT-inclusive or VAT-exclusive before calculating.
- Include inbound delivery/collection allocated per unit, packaging/handling, customer courier cost not recovered from the buyer, payment fees, discounts and an allowance for realistic warranty/return exposure.
- Calculate net contribution and margin before choosing a competitive retail price.
- Use the owner's agreed markup only as a baseline after VAT treatment is verified; do not apply it blindly to promotional prices, historic prices or corrupted OCR.
- Never publish expired deals as current costs. Use quote-only when a legitimate product is verified but no dependable current cost is available.

### 6. Store integration and QA
- Preserve PR#74/current accepted storefront as rollback baseline; PR#94 is not considered verified or promoted until its exact head passes review.
- Stage catalogue improvements in a separate branch/PR with an import preview and diff report.
- Test SKU search, name/code search, category placement, image loading, mobile product cards, product details, part request, cart and price/availability display.
- No live stock, price, listing, database, Axxess, DNS, payment, or production deployment changes without explicit owner approval.

## Current known starting evidence (2026-10-27)
- ASC vehicle-catalogue pilot: 406 code-like page occurrences / 381 distinct tokens; 42 exact token hits against a historical June–August workbook. These are candidate matches, not 42 approved products.
- 19 exact-hit occurrences had implausible costs above R1,000,000; quarantine from pricing until source-page verification.
- Current ASC trade price list was not located in the inspected tracked source set/Library search. Continue image/fitment extraction; do not wait idle. The current price list is needed to approve current ASC costs.
- Planetworld has multiple dated 2026-10-25 XLSX price lists already staged and a cost-floor review queue; these are a practical first batch for machine-readable cross-supplier matching.
- Audio Connections has two dated dealer price lists in suppliers/Audio Connections.
- Caelex has a dated Halloween promotional PDF; capture validity and don't assume ongoing availability.
- Electrocity's tracked suppliers/Electrocity folder currently contains README only, despite owner-confirmed interim permission to use authorised supplier material. Process any available connected/Library files; if no actual files are accessible, record the precise missing source instead of inventing data.

## Immediate work queue
1. Parse the Planetworld 2026-10-25 XLSX batch into a consistent offer ledger and calculate source-data quality/duplicate-code counts.
2. Extract Audio Connections dealer price lists and Caelex dated offers into the same schema.
3. Join these against existing product/store records and other supplier offers by verified manufacturer code.
4. Continue ASC catalogue card/code/fitment extraction while seeking its current trade list.
5. Produce a ranked opportunity list: same product available from multiple suppliers, lower landed-cost source, missing/weak image, profitable products absent from the store, and records blocked by stale/unknown costs.
6. Report measurable outputs and update HANDOVER_CURRENT.md after each meaningful execution pass.

## Status labels are mandatory
No row is silently promoted to live. Use:
- VERIFIED: identity, current cost basis and image/source are supported.
- REVIEW: plausible candidate needing human/source confirmation.
- QUOTE ONLY: product identity is supported but current cost/availability isn't.
- EXPIRED: dated offer is no longer current.
- REJECTED: wrong match, duplicate artifact, corrupt extraction or unsupported claim.
