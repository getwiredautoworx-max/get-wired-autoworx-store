# September Buyer’s Guide — quote-only rule and reconciliation status
Date: 2026-10-14

## Authoritative asterisk rule
All source items marked * mean the price was unavailable at print time. If the item does not appear in a later guide with pricing, it must remain **“Query price & availability.”** It is not a zero-price item and must not receive an inferred retail price.

Confirmed source-card entries:
- p.6 M501WCC — White Plastic Canopy Clips (Pairs)
- p.10 A1-002, A1-003, MA330, MA342, MA342/2
- p.19 N-FC001 — Non Locking Fuel Cap Nissan
- p.20 WP25 — 25mm Zinc Plated Welsh Plug
- p.22 N-CP002 — Caliper Pin With Rubber Upper Nissan E20

## Latest read-only Supabase reconciliation
Project: ojytykqpvonxvepprgbh. Source: buyers_guides_import_staging where source_guide contains September. Live join: upper(trim(staging.sku)) = upper(trim(products.sku)).
- Staging priced rows: 791
- Distinct normalized supplier SKUs: 791
- Unmatched live supplier SKUs: 0
- Live name mismatches: 3
- Missing image_url fields: 0
- Missing product category links: 0
- Formula differences using round(cost_price * 1.15 * 1.35, 2): 3 (EX908-18, GH-581, KT1035CB14; each a one-cent issue)
- Separate previously documented staging/live price differences: 9
- Important: image_url being present does NOT establish that the returned image depicts the correct SKU. Visual SKU-to-image proof remains outstanding.
- 791 priced staging rows do not prove the complete 800-row source baseline because the nine asterisked quote-only records are not in this staging query.

## Required next execution order
1. Create a complete 800-row audit ledger: 791 priced + 9 quote-only; quote-only records explicitly marked “Query price & availability” and excluded from priced import.
2. Review three live-name mismatches and correct only from the guide/source evidence.
3. Reconcile the nine staging/live price differences and three one-cent formula differences to the printed price and agreed rounding rule; maintain per-SKU evidence and do not overwrite blindly.
4. Visually validate all 791 priced product images against source cards / approved clean images. A working URL alone is not pass evidence. Quarantine mismatches/unverifiable image records.
5. Validate category/subcategory against the guide's source subcategory for all 791 priced records; map to approved storefront taxonomy without bulk-defaulting.
6. Rerun checks and require zero unexplained price, name, SKU, image and category exceptions.
7. Run staging browser/mobile checkout tests; then verify production-domain HTTPS and deployed version.
8. Only after all prior gates pass, perform one controlled release sync and repeat smoke tests.

## Release status
NOT READY FOR LIVE TESTING. Supplier-SKU join is clean for 791 priced staging rows, but the complete 800-record ledger, visual image identity, category review, name/price exception resolution, and staging/deployed browser QA are not all passed. This was read-only analysis; no production product or price changes were made.
