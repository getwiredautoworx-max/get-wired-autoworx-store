# ASC / Buyer Guide Category Crosswalk Gap Audit
Date: 13 October 2026
Branch: `audit/buyer-guide-extraction`
Status: **READ-ONLY AUDIT — NOT APPROVED FOR PRODUCT IMPORT OR LIVE CATEGORY WRITES**

## Purpose
Reconcile the current source-heading crosswalk and the proposed customer-facing hierarchy before product-level catalogue import. This report records coverage gaps and unresolved headings only. It does not authorize changing live products, category IDs, prices, stock, images, or active flags.

## Verified input files
- `staging/source-extracts/ASC_SOURCE_CATEGORY_CROSSWALK_2026-10-13.csv`
- `staging/source-extracts/category-reconciliation-review-v5.csv`
- `staging/source-extracts/STORE_CATEGORY_HIERARCHY_2026-10-13.json`
- `staging/source-extracts/PRODUCT_GROUPING_RULES_2026-10-13.json`
- `CATEGORY_MAPPING_REVIEW_2026-10-09.md`
- `PROPOSED_FINAL_CATEGORY_TREE_AND_MAPPING_PLAN_2026-10-11.md`

## Reconciliation counts

| Measure | Verified count | Interpretation |
|---|---:|---|
| Buyer-guide heading rows in review v5 | 148 | Heading occurrences/records across February, March, May, June, July, August and September sources |
| Unique crosswalk heading rows | 115 | Crosswalk aggregates variants/repeated source headings |
| Occurrence total recorded in crosswalk | 165 | Source occurrence field total; not directly interchangeable with review-v5 row count |
| Proposed customer-facing roots | 8 | Matches the approved eight-root navigation |
| Proposed child headings in taxonomy JSON | 71 | Current staging taxonomy only |
| Crosswalk rows pending page-image QA | 105 / 115 | 91.3% still require visual verification |
| Crosswalk rows visually verified in a prior QA record | 9 / 115 | 7.8% |
| Crosswalk rows marked “Needs review” for evidence | 10 / 115 | Must resolve before treating those headings as verified |
| Crosswalk rows routed outside approved roots pending scope decision | 15 / 115 | Do not force into another category |
| Crosswalk rows needing item/application classification | 6 / 115 | Resolve at SKU/product level |
| Promotion-only headings | 2 / 115 | Do not create permanent navigation categories |
| Crosswalk rows with any review/conflict/promotion destination | 24 / 115 | Manual reconciliation queue |

**Important:** The 115-row crosswalk and the 148-row review v5 are different representations. Do not assume that one row equals one source occurrence. Exact source heading variants and guide/page references must remain preserved.

## Unresolved heading queue

| Source heading | Guide reference | Current destination / hold reason |
|---|---|---|
| Auto Spares | May 2026 p.4–7 | Broad source heading; SKU and store-scope review |
| AUTO SPARES | August 2026 p.23–26; September 2026 p.15, 18–22 | Keep out of approved roots unless exact item is confirmed in scope |
| Automotive Brake & Clutch | February 2026 p.22–23 | Mechanical items not automatically in scope |
| Automotive Door Parts | February 2026 p.23 | Classify by actual function; do not infer security |
| Automotive Gaskets | February 2026 p.21 | Mechanical parts; hold |
| Automotive Spare Parts | February 2026 p.23–26 | Generic heading; product-level evidence required |
| Automotive Spare Parts-Quantum | February 2026 p.27 | Preserve Quantum source distinction; review SKU and function |
| AUTOMOTIVE SPARES | July 2026 p.22–24; June 2026 p.19 | Broad heading; do not force mechanical items into approved roots |
| Automotive Window Spares | February 2026 p.29 | Classify by actual function; do not infer security |
| BRAKE SPARES & CYLINDERS | June 2026 p.20 | Mechanical/out-of-scope hold |
| DOOR PARTS | June 2026 p.18–19; July 2026 p.12–13; September 2026 p.8–9; February 2026 p.6, 23 | Conflicting context; SKU/application required |
| Engine Cooling | May 2026 p.13–14 | Mechanical cooling items must not be forced into Auto Electrical |
| ENGINE TIMING KITS | June 2026 p.22–23 | Mechanical engine parts; hold |
| FUEL PUMPS | June 2026 p.15 | Classify only after exact item/function check; verified electrical fuel-pump SKUs may qualify under the approved electrical hierarchy |
| Pumps And Filters | May 2026 p.12 | Mixed heading; separate fuel, marine and general pumps by SKU/application |
| Safety | March 2026 p.27–28; May 2026 p.3 | Broad heading; classify item-by-item |
| Spare Parts | March 2026 p.8–11 | Generic heading; do not infer destination |
| SPECIAL DISCOUNTED PRICE | March 2026 p.30–32; May 2026 p.30–32 | Promotion block, not a permanent category |
| SUPER SAVE | August 2026 p.31–32 | Promotion block, not a permanent category |
| TAPPET COVERS | June 2026 p.30 | Mechanical engine parts; hold |
| Winches & Spares | May 2026 p.11 | Keep winches and spares related, then classify hand/ATV/trailer/vehicle application |
| FAN BLADES | June 2026 p.15 | Confirm automotive/electrical scope before mapping |
| HAND WINCHES (SPECIAL DISCOUNTED PRICE) | June 2026 p.31 | Classify by winch application; promotion label is not a permanent category |
| TAPPET COVERS / ENGINE PARTS | June 2026 p.30 | Mechanical engine parts; some SKU transcription remains uncertain |

## Rules to preserve during mapping
1. Keep the exact ASC/source heading, source subcategory, source SKU, guide/month and page reference as audit evidence. Store destination root/leaf must be separate fields.
2. Use exact SKU plus product identity, title, description and fitment. Do not map solely from source metadata or broad keywords.
3. Do not force mechanical brakes, suspension, gearbox, engine timing, gaskets, tappet covers or generic cooling parts into Auto Electrical Spares or Automotive Accessories.
4. Keep the exact-SKU verified corrections already recorded in the permanent handover. A broad source heading does not invalidate a specific verified SKU mapping.
5. Preserve useful specialist subcategories under the correct approved root. Avoid flattening all products into root categories.
6. Keep clips and fasteners together where product function agrees; keep spanners/wrenches together; separate individual tools from kits/sets; keep switches and relays in the electrical family; relate winches and winch spares while separating by application.
7. Treat promotional headings as merchandising evidence only, not permanent categories or proof of current pricing.
8. Where page-image verification is pending, retain that status; do not relabel OCR/text-extracted headings as visually verified.
9. Any low-confidence or conflicting row remains in a manual-review queue. Do not delete or re-parent categories and do not update live product rows in this audit stage.

## Next bounded tasks
1. **Visual source QA:** Prioritize the 10 crosswalk headings with `evidence_status=Needs review`, then review the remaining 105 page-image-pending crosswalk entries in bounded guide/month batches. Record the checked page range and outcome; keep original source PDFs unchanged.
2. **Taxonomy reconciliation:** Compare every source heading variant against the 71-child staging hierarchy. Confirm exact source-to-store destination, or retain a reasoned review/hold destination.
3. **SKU-level mapping:** Build a full candidate export with product UUID, public SKU, name, description, current category path, source heading/subheading, proposed store root/leaf, confidence, evidence and review status. This is separate from this source-heading audit.
4. **Approval gate:** No product import or category writes until source crosswalk gaps are resolved, ambiguous/mechanical items are explicitly held, and the complete active catalogue reconciles to the verified 4,187 active-product baseline in the permanent handover.

## Current decision
The source taxonomy and proposed store hierarchy are usable as a **staging review framework**, not as an import-ready final mapping. The key blockers are page-image verification and item/SKU-level resolution of the 24 review/conflict/promotion headings. No live database rows were changed.


## 2026-10-14 priority page-image QA update

Ten records in the prior `evidence_status=Needs review` queue were checked against original Library PDF page images and their crosswalk rows were updated in commit `046ba8cd1fc391e97f83d4c556b5d6940f58b951`.

- **Nine printed section headings confirmed:** AERIAL (February p.5); AUTOMOTIVE ACCESSORIES (February pp.6–8); FUSES (February p.14 and May p.9); GAUGES (March pp.5–6); GLOBES (February p.12 and March p.8); IGNITION COILS (May p.15); SECURITY (February p.36 and March p.28); SOCKETS (March p.24); BOOSTER CABLES (May p.18).
- **One heading candidate disproved as a standalone heading:** MIRRORS (May p.7). The printed page heading is AUTOMOTIVE ACCESSORIES; mirror products appear within that section. Do not treat “MIRRORS” as a separate printed section heading on that page. Mirror products still require item/SKU classification.
- May p.18 confirms BOOSTER CABLES and prints JC200AMP at R100.99 excl. VAT and JC400AMP at R168.73 excl. VAT. These are printed guide prices, not supplier cost prices; no live price was changed.
- Source crosswalk evidence and visual-verification statuses now record these findings. This resolves the priority evidence-status queue only; it does not finish the remaining page-image QA, resolve all 115 unique heading rows, or authorize category/product writes.
- Visual QA surfaced important mapping caution: February p.6 includes exhaust tail pieces inside the broader AUTOMOTIVE ACCESSORIES section, so the source section heading alone is not proof that each item belongs in the approved storefront. March p.24 has SOCKETS and GARDEN TOOLS as separate printed sections on the same page. Continue classifying actual products by exact SKU/function rather than copying a page-wide label.


## 2026-10-14 additional page-image QA batch

Eleven more crosswalk records were reviewed against original source page images; crosswalk commit `370ab341f2a0285ac83ae675f2999c7696ddb307`.

- June p.3 confirms **4X4 & OUTDOOR**.
- July p.7 is printed **4X4 AND OUTDOOR**, not “4X4 AND CAMPING”; the latter is an alias/extraction discrepancy.
- February p.4 is printed **CAMPING**, while March p.4 is printed **4X4 AND OUTDOOR**; record this as a source-to-source heading difference, not a single heading on both pages.
- August and September p.5 confirm **4X4 OUTDOOR**; their p.4 is **ACCESSORIES**.
- March p.13 confirms **ABRASIVES**; May p.26, June p.24, and August pp.30-31 confirm the same section. Adjacent CUTTING TOOLS, CONSUMABLES, PADLOCKS and BOAT ACCESSORIES are distinct headings.
- May p.3-4 contains separate OUTDOOR, SAFETY, ACCESSORIES, CHEMICALS, DOOR SPARES and PANEL CLIPS headings; do not interpret the whole spread as a single Accessories section.
- August and September p.4 confirm **ACCESSORIES**; February p.8 confirms **QUANTUM ACCESSORIES**; February p.9 confirms **ADHESIVES AND SILICONES**; June and September p.10 confirm **AERIALS**.
- Current crosswalk status after this batch: **21/115 rows have page-image findings recorded; 94 remain pending**. There are now zero entries left in the former `Needs review` status, but 94 other rows still need source-page review. A page-image heading finding does not authorize moving products: item-level category scope must still be validated by exact SKU and product function.


### Correction — MIRRORS heading (2026-10-14)

A direct reinspection of the May 2026 p.7 page image shows **MIRRORS is printed as a standalone section heading at the top of the page**. The earlier statement in this audit that MIRRORS was not a standalone heading was a visual misread and is superseded. The crosswalk row was corrected in commit `fe163813b591b3cbbefec09e9db50287997d0de3`. Keep the page-image finding as confirmed; product-level category decisions remain separate.
