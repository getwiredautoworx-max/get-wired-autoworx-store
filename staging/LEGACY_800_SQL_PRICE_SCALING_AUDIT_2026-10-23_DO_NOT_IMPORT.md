# Legacy September 800-row SQL pricing audit — DO NOT IMPORT

**Audit date:** 2026-10-23 (SAST)  
**Scope:** Read-only comparison of Library artifact `Get_Wired_AutoWorx_800_PRODUCTS_CORRECTED.sql` against `Get_Wired_AutoWorx_STORE_STOCK_Feb-Sep_2026_VERIFIED.xlsx` and the current Supabase staging/live formula summaries.  
**Decision:** **REJECT the legacy SQL as an import candidate.** This report is evidence only; it does not authorize any live write, active-flag change, deployment, or catalogue import.

## Verified counts

- Legacy SQL payload: **800 rows / 800 unique supplier SKUs** across four 200-row JSON chunks.
- Exact SKU + product-name + source-page matches to the verified workbook: **791/791 priced rows**.
- Verified workbook final retail prices pass `round(cost_ex_vat × 1.15 × 1.35, 2)`: **791/791**.
- Legacy cost scaling: **791/791** legacy costs are within R0.50 of **100 × verified workbook cost**; 753 are exactly 100× and the remainder differ only within the workbook's cent-rounding tolerance.
- Legacy selling price: **789/791** match `round(legacy_cost × 1.15, 2)`; two have a one-cent rounding difference. **0/791** legacy prices pass the required combined formula against the legacy inflated cost.
- Asterisk/quote-only rows: **9**. Each has source marker `*`, null cost/price, and `active=true` in the legacy SQL. The current live records were read-only checked and are already `active=false`, cost R0.00, price R0.00; no explicit `specifications.price_status` is set.
- Current Supabase staging table: **4,187** rows; September source group has **791** rows and all 791 match the combined formula. Current live products: **4,187 active**, **0 active formula mismatches**, **0 active invalid/unpriced rows**. Therefore the confirmed defect is isolated to the legacy SQL artifact, not the current staging/live data.

## Concrete example

| Field | Legacy SQL | Verified workbook |
|---|---:|---:|
| SKU | `SFBP2-G1500-13A` | `SFBP2-G1500-13A` |
| Source page | 3 | 3 |
| Cost excl. VAT | R48,079.00 | R480.79 |
| Selling price | R55,290.85 | R746.43 |
| Formula price from verified cost | — | R746.43 |

The legacy SQL interprets a cents value as rand (cost ×100) and then calculates VAT-only pricing. Applying the 35% markup to the inflated legacy cost would still be wrong by roughly 100×; correct the cost basis first using the verified workbook.

## Asterisk rows

The nine source SKUs are `M501WCC`, `A1-002`, `A1-003`, `MA330`, `MA342`, `MA342/2`, `N-FC001`, `WP25`, and `N-CP002`. They must remain “Query price & availability” and inactive until a current exact-SKU priced source is verified. The legacy SQL would mark them active, so it must not be run. A separate nine-row candidate list records source page, current inactive state, and `DO NOT IMPORT` guard.

## Related exceptions — do not conflate

- The 107-row October source-image reconciliation is CLOSED/PASS for all 107 rows; keep those prices unchanged.
- Six historical staging/live delta SKUs overlap the 107 October-verified set and are superseded by that evidence.
- `EX908-18`, `GH-581`, and `KT1035CB14` are one-cent rounding-convention exceptions, not proof of a scaling defect.
- The historic 418 one-cent workbook exceptions are rounding-method differences, not confirmed wrong supplier costs.

## Artifacts and hashes

- Legacy SQL SHA-256: `d2f31a19c7bc8c1007ee844d2bef838fbc3d5323b9bff85cdccf979d98f1e9d3`
- Verified workbook SHA-256: `c8dd0b280aebfd0b44d76085690230ddf754735de80911735053563fa9a72d87`
- Detailed 800-row audit CSV generated for review: `LEGACY_800_SQL_PRICE_SCALING_AUDIT_2026-10-23_DO_NOT_IMPORT.csv` (SHA-256 `b0b985ade31b231223caa17d946c2191efa4ea1338b9b78fc41b9f42754b6389`). It carries the verified source values and a `DO NOT IMPORT` guard on every row.

## Required action

1. Do not execute or import `Get_Wired_AutoWorx_800_PRODUCTS_CORRECTED.sql`.
2. Use the verified workbook/current staging table as the source reference for further staged review; keep all changes separate from live data.
3. If a future import is approved, require preflight checks for cost scale, VAT/markup formula, exact SKU/name/page match, and quote-only active-state handling.
4. Do not add `QUOTE_REQUIRED` metadata or change active flags in production without explicit owner approval.
5. October later-price verification for the nine asterisk items remains open because the October guide source artifact was not found in the inspected GitHub audit branch.
