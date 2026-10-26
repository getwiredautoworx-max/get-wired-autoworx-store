# Planetworld non-zero-RRP review — refreshed audit 2026-10-26 07:26 UTC

**Audit run:** [40288470708 — successful](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40288470708)  
**Artifact:** `planetworld-workbook-audit`, created 2026-10-26 07:52:42 UTC.  
**Mode:** Read-only; no source XLSX, catalogue, price, stock, image, or production data was changed.

## Scope and exclusion rules
- The audit scanned 48 XLSX files, 96 sheets, and extracted 3,343 rows; 0 workbook read errors.
- 19 zero-RRP rows are **set aside for the owner's personal audit** and excluded from all continuation counts below.
- 26 rows from `jbl-price-list-2026-10-25 (1).xlsx` are excluded as an identical product-data duplicate of `jbl-price-list-2026-10-25.xlsx`. The duplicate source file still exists in the audited input set; it has not been deleted.
- Remaining review scope: **3,298 non-zero-RRP rows across 47 source workbooks**, after the two exclusions above.

## Refreshed screening counts for remaining items
- **18 rows**: RRP minus 1% is below estimated dealer cost including VAT.
- **19 rows**: RRP minus 2% is below estimated dealer cost including VAT.
- **0 duplicate model/SKU flags** remain after the audit logic was corrected to exclude rows from the identical duplicate JBL workbook before calculating duplicate keys and to preserve meaningful plus signs in model codes. The 26 repeated rows in the duplicate JBL workbook remain explicitly flagged as duplicate-workbook rows and are not included in the continuation scope.
- **0 rows** remain marked “Review Component”; all 3,298 continuation rows now have a heuristic component guess. This is not a claim that all exact product identities or images have been verified.
- **0 rows** remain “REVIEW - UNCLASSIFIED” in the top-level category guess; all 3,298 continuation rows now have a heuristic category. These mappings remain review-only and must not be imported without validation.
- 0 missing model/SKU, 0 missing/unmapped RRP, and 0 missing descriptions were reported in the filtered non-zero scope.

**Cost caution:** Dealer cost marked Excl was estimated inclusive of 15% VAT. Differences exclude freight, overhead, payment fees, warranty/returns and other costs. These are risk flags, not approved selling prices. RRP source fields appear VAT-inclusive. Do not apply a blanket 1–2% reduction to rows where the result is below estimated cost.

## Priority 1 — 18 non-zero-RRP cost-floor flags
The difference columns below show the estimated amount by which (RRP × 0.99) falls below VAT-inclusive dealer cost. All 18 rows also fail the RRP−2% check.

| Workbook / row | Brand / model | RRP | Est. cost incl. VAT | Difference at RRP−1% |
|---|---|---:|---:|---:|
| jbl-price-list-2026-10-25.xlsx / 12 | JBL / JBL-EON710-EK | 15,399.00 | 38,868.85 | -23,623.84 |
| jbl-price-list-2026-10-25.xlsx / 7 | JBL / IRX108BT-EK | 8,599.00 | 17,708.85 | -9,195.84 |
| soundcraft-price-list-2026-10-25.xlsx / 7 | Soundcraft / 5085985EU | 4,599.00 | 9,888.85 | -5,335.84 |
| paiste-price-list-2026-10-25.xlsx / 55 | Paiste / 0004801419 | 3,549.00 | 7,243.85 | -3,730.34 |
| ibanez-price-list-2026-10-25.xlsx / 268 | Ibanez / IAB541-WR | 99.00 | 746.35 | -648.34 |
| one-price-list-2026-10-25.xlsx / 131 | One / ON1509-LX1 | 2,250.00 | 2,873.85 | -646.35 |
| one-price-list-2026-10-25.xlsx / 155 | One / ON263-FK2 | 1,500.00 | 1,725.00 | -240.00 |
| harness-and-trims-price-list-2026-10-25.xlsx / 42 | Harness and Trims / 90022538 | 829.00 | 953.35 | -132.64 |
| harness-and-trims-price-list-2026-10-25.xlsx / 6 | Harness and Trims / 86180 | 312.00 | 412.85 | -103.97 |
| one-price-list-2026-10-25.xlsx / 18 | One / ISA-ON115-3LX | 4,543.00 | 4,598.85 | -101.28 |
| harness-and-trims-price-list-2026-10-25.xlsx / 38 | Harness and Trims / 90014004 | 311.00 | 355.35 | -47.46 |
| harness-and-trims-price-list-2026-10-25.xlsx / 35 | Harness and Trims / 90013009 | 152.00 | 182.85 | -32.37 |
| harness-and-trims-price-list-2026-10-25.xlsx / 9 | Harness and Trims / 90008003 | 329.00 | 355.35 | -29.64 |
| vogels-price-list-2026-10-25.xlsx / 30 | Vogels / 7225154 | 1,506.00 | 1,506.50 | -15.56 |
| harness-and-trims-price-list-2026-10-25.xlsx / 43 | Harness and Trims / 90022567 | 229.00 | 240.35 | -13.64 |
| vogels-price-list-2026-10-25.xlsx / 81 | Vogels / PFW4600 | 999.00 | 999.35 | -10.34 |
| vogels-price-list-2026-10-25.xlsx / 82 | Vogels / THIN215 | 399.00 | 399.05 | -4.04 |
| remo-price-list-2026-10-25.xlsx / 80 | Remo / HK-2417-00 | 286.00 | 286.35 | -3.21 |

**Recommended handling:** retain supplier RRP as a reference field; do not derive or publish a discounted selling price for these 18 until model, RRP basis, dealer cost and any source data error are verified. Some extreme differences may indicate mismatched units/columns or source price errors and require source-row inspection.

## Priority 2 — component and category refinement
- Preserve the supplier's Division as the primary source classification.
- Review the 1,016 component-review rows from full descriptions and exact model codes; do not force a guess.
- Review the 1,348 unclassified category guesses.
- Continue official manufacturer exact-model/variant checks for non-zero-RRP items; record exact-match confidence and source URL. No family-only image should be labelled as an exact match.
- The 26 duplicate JBL rows are excluded from the continuation analysis, but the duplicate source workbook remains in the input folder. Remove it only through safe source-file management with owner approval. The audit now distinguishes KT7800 from KT7800+ and Q7 TF B/W from Q7 TF+ B/W.

## Next actions
1. Keep the 19 zero-RRP items untouched in the separate [owner audit hold list](ZERO_RRP_OWNER_AUDIT_HOLD_2026-10-26.md).
2. Inspect the 18 cost-floor flags against the exact current source workbook rows and validate any suspicious RRP/cost field mappings.
3. Continue exact-model matching and category/component refinement.
4. Remove the duplicate JBL source workbook only after owner confirmation / safe source-file management; the current audit excludes its rows for analysis but does not delete it.
5. Keep all findings review-only until the owner authorizes any supplier/catalogue changes.


## Duplicate-key false-positive fix verified
The audit script was corrected so identical duplicate-workbook rows are excluded before SKU duplicate counting and plus signs remain meaningful in model keys. Latest run **40288470708** succeeded; artifact summary reports **0 duplicate model/SKU flags** and still identifies 26 rows from the identical JBL duplicate workbook. The former On Stage/Roborock flags were false positives caused by punctuation normalization; official/source checks confirm KT7800 vs KT7800+ and Q7 TF vs Q7 TF+ are distinct variants. Targeted component/category rules reduced filtered component-review rows from 1,016 to 777 and broad unclassified rows from 1,348 to 468. No source XLSX was edited or deleted.


## Latest classification pass — verified 2026-10-26 07:37 UTC
- Latest successful audit run: [40288470708](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40288470708), artifact ID `12634850671`.
- Filtered 3,298-row continuation scope: **777** component-review rows remain (408 Musical Instruments, 255 Installed AV, 94 Car Audio, 20 Home Retail); **468** category guesses remain broadly unclassified.
- Targeted rules reduced component-review rows from 1,016 to 0 and broad unclassified rows from 1,348 to 0. All remaining 3,298 rows have review-only component and category suggestions; exact model/variant and image checks remain a separate task. These remain heuristic suggestions requiring review, not approved catalogue mappings.


## Earlier component classification pass — 2026-10-26 07:42 UTC (superseded by the final pass below)
- Latest successful audit run: [40288470708](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40288470708), artifact ID `12635006256`.
- Filtered non-zero continuation scope: 3,298 rows; **273** component-review rows remain (129 Musical Instruments, 98 Installed AV, 44 Car Audio, 2 Home Retail); **468** broad unclassified category guesses remain.
- Component-review backlog is down 743 rows from the initial filtered snapshot (1,016 → 273) using brand-aware rules for known supplier ranges. All suggested classifications remain review-only; exact model/variant and official image/source checks are still required before catalogue use.


## Final classification pass — verified 2026-10-26 07:52 UTC
- Latest successful audit: [run 40288470708](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40288470708), artifact ID `12635400900`.
- Source audit: 48 XLSX files, 96 sheets, 3,343 rows extracted, 0 workbook errors. The input set still contains the identical JBL duplicate workbook (26 rows) and the 19 zero-RRP owner-hold rows.
- Excluding the 19 zero-RRP owner-hold rows and 26 rows from the duplicate JBL workbook leaves **3,298 non-zero-RRP rows**. **0 component-review flags, 0 unclassified category guesses, and 0 duplicate model/SKU flags** remain in this filtered scope.
- Heuristic category distribution in the filtered scope: Musical Instruments & Accessories 1,492; Car Audio 644; Headsets & Conferencing 480; Home Theatre / Hi-Fi 424; DJ / Studio / Pro Audio 213; Robotic Vacuums & Home Care 21; Speakers 14; Pool Cleaning & Outdoor 5; Home Automation & Lighting Controls 5.
- **Important:** this completes the first-pass categorization only. It does not mean all 3,298 exact manufacturer model/variant matches, product images, image permissions, pricing correctness or availability have been individually verified. Continue exact model/image-source verification in batches.


---

## Corrected audit refresh — 2026-10-26 10:12 SAST

**Authoritative latest run:** [40290002999 — successful](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40290002999), artifact ID `12635711006`.

- Confirmed current source scan: 48 XLSX files, 96 sheets, 3,343 rows extracted, 0 workbook read errors.
- Scope remains 3,298 non-zero-RRP rows after excluding 19 owner-hold zero-RRP rows and 26 rows from the identical duplicate JBL workbook.
- Corrected price-risk count: 18 rows below estimated VAT-inclusive dealer cost at RRP−1%; 19 rows below estimated cost at RRP−2%. This is 19 distinct SKUs total; SKU `90011904` is the extra row that only fails the 2% test.
- Missing model/SKU, missing/unmapped RRP, and missing descriptions: 0 in this extracted scope. Duplicate model/SKU flags: 0 after identical duplicate workbook exclusion.
- The CSV assigns a heuristic category and component to every row (zero blanks and zero literal “unclassified” labels), but these are suggestions, not validated catalogue mappings. Do not interpret those zero counts as zero product-classification risk. Exact model/variant verification and fit to Get Wired's actual storefront categories remain incomplete.
- Source-row check confirms the headers are consistently `Dealer Price (Excl)`, `Retail Price (Excl)`, and `Retail Price (Incl)` on the listed exception workbooks. This means the extreme gaps are present in the workbook's source values, not caused by the audit selecting an unmapped RRP header. It still does not prove whether source values, pack basis, or supplier pricing are correct.
- Exact-model work already added to this report: Paiste `0004801419` and Soundcraft `5085985EU` are corroborated to exact model; OneNav `ON1509-LX1` remains unverified. Targeted web searches for the exact `ON1509-LX1` code did not return a reliable official OneNav or Planetworld match in this pass. Keep the item unverified and request supplier confirmation rather than substituting a sibling model.
- The supplier clarification message remains a draft and has **not** been sent. Owner review/authorized sending is still required. Zero-RRP items are deliberately excluded from that request.

No supplier XLSX, catalogue, price, stock, image, production, Axxess, DNS, checkout, payment, or Supabase data was changed. Customer launch remains HOLD.
