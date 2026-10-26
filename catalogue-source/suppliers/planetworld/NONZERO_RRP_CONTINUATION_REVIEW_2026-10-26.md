# Planetworld non-zero-RRP continuation review — 2026-10-26

**Status:** Read-only triage on the previous audit artifact. This is not a fresh workbook rerun and is not an approved price list or catalogue import.

## Scope applied
- Set aside all **19 zero-RRP rows** for owner personal audit. They are excluded from the continuation count below.
- Excluded the 26 extracted rows from the duplicate source `jbl-price-list-2026-10-25 (1).xlsx`; retain `jbl-price-list-2026-10-25.xlsx`.
- Remaining triage scope from the prior artifact: **3,298 non-zero-RRP rows across 47 source workbooks**. These figures are derived by filtering the earlier artifact, not by re-reading the current XLSX files.

## Other-item triage counts
- **18 rows** where RRP minus 1% falls below estimated VAT-inclusive dealer cost.
- **19 rows** where RRP minus 2% falls below estimated VAT-inclusive dealer cost.
- **32 rows** still flagged for duplicate model/SKU identifiers after excluding the duplicate JBL workbook; these need identity review, not automatic deletion.
- **1,016 rows** in component groups explicitly marked “Review Component”.
- **1,348 rows** with broad category guess “REVIEW - UNCLASSIFIED”.
- No missing model/SKU or missing/unmapped RRP was reported in the prior artifact for the remaining rows.

These flags are screening aids only. They do not prove supplier mistakes or establish a safe selling price. Cost comparison converts dealer cost marked Excl to VAT-inclusive using 15%; freight, overhead, payment fees, warranty/returns and other costs are not included.

## Priority 1 — below-cost risk at RRP less 1%
These 18 remaining rows need identity, source RRP and VAT-basis confirmation before any price suggestion is considered:

| Source workbook | Row | Brand / model | RRP | Estimated cost incl. VAT | Difference at RRP−1% |
|---|---:|---|---:|---:|---:|
| harness-and-trims-price-list-2026-10-25.xlsx | 6 | Harness and Trims / 86180 | 312.00 | 412.85 | -103.97 |
| harness-and-trims-price-list-2026-10-25.xlsx | 9 | Harness and Trims / 90008003 | 329.00 | 355.35 | -29.64 |
| harness-and-trims-price-list-2026-10-25.xlsx | 35 | Harness and Trims / 90013009 | 152.00 | 182.85 | -32.37 |
| harness-and-trims-price-list-2026-10-25.xlsx | 38 | Harness and Trims / 90014004 | 311.00 | 355.35 | -47.46 |
| harness-and-trims-price-list-2026-10-25.xlsx | 42 | Harness and Trims / 90022538 | 829.00 | 953.35 | -132.64 |
| harness-and-trims-price-list-2026-10-25.xlsx | 43 | Harness and Trims / 90022567 | 229.00 | 240.35 | -13.64 |
| ibanez-price-list-2026-10-25.xlsx | 268 | Ibanez / IAB541-WR | 99.00 | 746.35 | -648.34 |
| jbl-price-list-2026-10-25.xlsx | 7 | JBL / IRX108BT-EK | 8,599.00 | 17,708.85 | -9,195.84 |
| jbl-price-list-2026-10-25.xlsx | 12 | JBL / JBL-EON710-EK | 15,399.00 | 38,868.85 | -23,623.84 |
| one-price-list-2026-10-25.xlsx | 18 | One / ISA-ON115-3LX | 4,543.00 | 4,598.85 | -101.28 |
| one-price-list-2026-10-25.xlsx | 131 | One / ON1509-LX1 | 2,250.00 | 2,873.85 | -646.35 |
| one-price-list-2026-10-25.xlsx | 155 | One / ON263-FK2 | 1,500.00 | 1,725.00 | -240.00 |
| paiste-price-list-2026-10-25.xlsx | 55 | Paiste / 0004801419 | 3,549.00 | 7,243.85 | -3,730.34 |
| remo-price-list-2026-10-25.xlsx | 80 | Remo / HK-2417-00 | 286.00 | 286.35 | -3.21 |
| soundcraft-price-list-2026-10-25.xlsx | 7 | Soundcraft / 5085985EU | 4,599.00 | 9,888.85 | -5,335.84 |
| vogels-price-list-2026-10-25.xlsx | 30 | Vogels / 7225154 | 1,506.00 | 1,506.50 | -15.56 |
| vogels-price-list-2026-10-25.xlsx | 81 | Vogels / PFW4600 | 999.00 | 999.35 | -10.34 |
| vogels-price-list-2026-10-25.xlsx | 82 | Vogels / THIN215 | 399.00 | 399.05 | -4.04 |

The above values come from the older audit extract and must be revalidated against the current source workbooks before any owner decision. RRP−1%/2% is not approved selling-price guidance.

## Priority 2 — classification and manufacturer matching
1. Preserve each supplier's own Division field as the source classification.
2. Refine the 1,016 “Review Component” rows by reading full descriptions/model codes; do not force uncertain rows into a store category.
3. Resolve the 1,348 broad unclassified category guesses from source evidence.
4. Verify exact model/variant on official manufacturer pages and record the URL, match confidence, and whether the image actually depicts the exact model. Family-only matches are not exact matches.
5. Keep the 32 duplicate model/SKU flags as review candidates until brand/model identity is confirmed.

## Safety and next run
- Zero-RRP owner-audit list remains separate and is not processed in this continuation.
- Duplicate JBL rows are excluded from this filtered review, but the suffixed workbook's physical deletion was previously blocked; do not claim it has been deleted.
- No XLSX, live catalogue, live prices, stock, checkout, payments, Axxess, DNS, or production settings were changed.
- Next evidence needed: rerun the audit against the current 47 XLSX files, then produce refreshed non-zero-RRP rows, refreshed pricing/duplicate flags, and a prioritized exact-model manufacturer-match queue.
