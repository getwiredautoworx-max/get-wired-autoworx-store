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

## 2026-10-14 additional automotive/tool source-heading findings

- September pp.16-17 were checked for **ATV WINCHES & WHEEL CAPS**. These pages are a Runva ATV winch promotional feature (p.16) and a WHEEL NUT BOLT HEAD COVERS feature (p.17); the exact aggregate heading is not printed on those pages.
- August p.5-6 and September p.5-6 show the exact printed headings **4X4 AND OUTDOOR / 4X4 OUTDOOR**, **ACCESSORIES**, and **AUTOMOTIVE ACCESSORIES**. “AUTO ACCESSORIES” is an aggregate/alias label rather than the exact printed heading on the checked pages.
- May pp.7-8 show **MIRRORS**, **ELECTRICAL SPARES**, and **FUSES**. “Auto Electrical” is a broader/TOC label, not the exact heading on the checked pages.
- August p.13 and p.18 show **PANEL CLIPS**, **ELECTRICAL SPARES**, **FUSES**, **RELAYS**, and **GAUGES**; “AUTO ELECTRICAL” is an aggregate label on these cited pages.
- February pp.22-23 show distinct headings **HAND TOOLS**, **HOSES**, **BRAKE PARTS**, **CLUTCH MASTER CYLINDERS**, **DOOR PARTS**, **SOUND**, and **AIR FILTERS**. “Automotive Brake & Clutch”, “Automotive Door Parts”, and “Automotive Sound” are aggregate/TOC variants, not exact printed headings on the cited page images.
- February p.27 shows **SPARE PARTS QUANTUM**; pp.27-29 show **WHEEL ACCESSORIES**; p.29 shows **WINDOW SPARES**. March p.12 and May p.26 confirm **AUTOMOTIVE TOOLS**. “AUTO TOOLS” is an alias, not the exact printed heading on August pp.26-27 and September p.23.
- March p.12 and May p.26 confirm AUTOMOTIVE TOOLS, but February p.30 and May pp.27-29 remain pending for the full crosswalk reference set. February p.9 confirms AUTOMOTIVE HARDWARE, but February p.10 remains pending.
- The crosswalk now has page-image findings recorded for **34 of 115 rows**; **81 rows have no page-image finding yet**. Some of the 34 findings are explicitly partial/alias findings and still have uninspected cited pages. There are zero rows left in the former `Needs review` status, but page-image verification is not complete.
- Crosswalk latest update: `2f362dfe9cb4a749aef48740d43d8fffadb6d455`; subsequent March Automotive Accessories row update: `b4f694483d92f186ae9d101be28686badad131e9`. Keep printed heading, TOC/aggregate label, and product-level category decision as three separate fields.

## 2026-10-14 further source-page verification

- February p.10 confirms **AUTOMOTIVE HARDWARE** and **CHEMICALS LUBRICANTS AND OILS**; p.21 shows distinct **TERMINALS**, **TOGGLE SWITCH**, **WARNING LIGHTS**, **RADIATOR FANS**, **ELECTRICAL-QUANTUM**, **GASKETS** and **GAUGES** sections. “Automotive Gaskets” and “Automotive Gauges” are aggregate/TOC variants; printed headings are GASKETS and GAUGES.
- February p.30 confirms **AUTOMOTIVE TOOLS**; March p.12 and May p.26 also confirm this heading. May pp.27-29 remain pending for the full Automotive Tools reference range.
- June p.20 confirms **BRAKE SPARES & CYLINDERS**.
- February p.4 and August p.4 confirm **CAMPING**. March p.13 confirms **CUTTING TOOLS**.
- May pp.4-7 show separate ACCESSORIES, CHEMICALS, DOOR SPARES, PANEL CLIPS, MIRRORS and ELECTRICAL SPARES sections; “Auto Spares” is not a single printed heading across that range. February pp.23-26 similarly contain distinct section headings rather than one uniform Automotive Spare Parts heading.
- February p.23 shows **DOOR PARTS**, **SOUND**, **AIR FILTERS** and **CLUTCH MASTER CYLINDERS** as distinct headings. These should not be merged into a single broad heading when mapping actual SKUs.
- Updated crosswalk now records page-image findings for **42/115 rows**, with **73 rows having no page-image finding yet**. Of the 42 rows with findings, 17 are explicitly partial, aggregate-label or heading-variant findings; some source pages within those rows remain pending. Former `Needs review` queue remains empty, but the full crosswalk is not complete.
- Latest crosswalk commit: `926bf528f00c65ed082f7a92a6129940be86f667`.

## 2026-10-14 latest crosswalk count reconciliation

The current CSV's `visual_verification_status` field has **59 new page-image findings recorded**, **8 rows marked as verified in the earlier visual-QA pass**, and **48 rows still awaiting page-image verification** (47 explicitly pending plus one not visually verified in this step). Of the 59 new findings, **25 rows remain partial, aggregate-label or heading-variant findings**; the exact cited page range is not fully closed for all of them. Do not use the earlier interim counts of 34 or 42 as current.

## 2026-10-14 October price-candidate image verification

The October exact-SKU price-difference report was expanded with live product names, extracted October title context and a text-overlap review screen. A visual review of October pp.4, 11, 23, 26 and 29 resolved the six low/medium-context rows:
- RTD532 — page 4, R99.37
- G1034 — page 11, R26.59
- H755W-NB — page 11, R16.47
- IG-MAN1 — page 23, R310.56
- TOY-001 — page 26, R23.54
- T923 — page 29, R49.10

Each exact SKU, item description and printed amount matches the live product's cost price; live selling price remains formula-correct. The report now has **107/107 October printed prices equal to live cost**, with **13 item descriptions individually verified** (the previous seven plus these six) and **94 rows with high title-text overlap** that still need quick identity spot-checking. This is a review report only; no price writes were made. Latest report commit `53117f2feefb1ca2b6b3ca509847984c6f3a1447`.

## 2026-10-14 latest source-page QA count and additional findings

- Additional page images confirm March p.7 **AUTOMOTIVE ELECTRICAL**, June p.19 **AUTOMOTIVE SPARES** (July p.22 instead shows SWITCHES and SPARE PARTS), March p.27 **CONSUMABLES**, June p.25 **DRILLING TOOLS**, May p.3 **OUTDOOR**, August p.31 **PADLOCKS**, May pp.5-6 **PANEL CLIPS**, and sampled **LIFESTYLE** headings.
- Current crosswalk counts after this batch: **67 rows with new page-image findings**, **8 rows verified in prior visual QA**, **39 explicitly pending**, and **1 not visually verified in this step**. **29 rows are partial/aggregate/heading-variant findings**; cited pages noted as pending are not closed. The former `Needs review` queue remains empty.
- Latest crosswalk commit: `f68c2d93da155bf6edee1b194b28ca79fa3d0ed8`.

## 2026-10-14 all-row first-pass source evidence checkpoint

- Every one of the **115 crosswalk rows** now has either a new original-page-image finding (**107 rows**) or an earlier visual-QA record (**8 rows**); there are **0 rows left without any page-image finding/status**.
- **46 rows are still partial/aggregate-label/heading-variant findings** because cited page ranges contain mixed headings, promotional/brand features, or additional pages that have not yet been checked. These rows are not considered fully closed; continue page-range verification and preserve their caveats.
- New findings include June p.6 GENERAL ACCESSORIES; March p.14 HAND TOOLS; February p.36 mixed HAND TOOLS/SECURITY/STRAPS & TIE DOWNS; July p.31 SPANNERS/ADHESIVES AND SILICONES/CONSUMABLES; May pp.16-17 IGNITION COILS; August p.16 CARPET CAR MAT SETS; March p.8 SPARE PARTS; March/May p.30 SPECIAL DISCOUNTED PRICE promotional banners; and August p.32 SUPER SAVE promotional banner.
- The latest source evidence does not justify copying TOC labels, brand names, or promotional banners into permanent store categories. Keep those as aliases, product features or promotional tags; category assignment remains exact-SKU and item-function based.
- Latest crosswalk commit: `3489749f5a2c867343741b840eca75d64bb660aa`.
