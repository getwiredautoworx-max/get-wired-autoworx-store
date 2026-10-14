# Get Wired AutoWorx — Live Testing Readiness
Date: 2026-10-14

## Verified source evidence
Original 32-page September Buyer's Guide PDF inspected. The nine asterisked entries are confirmed:
- Page 6: M501WCC — White Plastic Canopy Clips (Pairs)
- Page 10: A1-002, A1-003, MA330, MA342, MA342/2 — aerials
- Page 19: N-FC001 — Non Locking Fuel Cap Nissan
- Page 20: WP25 — 25mm Zinc Plated Welsh Plug
- Page 22: N-CP002 — Caliper Pin With Rubber Upper Nissan E20
The guide states asterisked items are priced per supplier system and can vary during the month. Keep these nine quote-only; do not invent prices or include them in priced import.

## Formula exceptions confirmed from source pages
Formula: supplier cost excl VAT × 1.15 VAT × 1.35 markup.
- EX908-18 — p.10; cost R14.00; formula retail R21.74
- GH-581 — p.13; cost R14.00; formula retail R21.74
- KT1035CB14 — p.8; cost R518.00; formula retail R804.20
Resolve any one-cent differences against the approved rounding policy; do not blindly overwrite.

## Remaining tasks before live testing — execute in order
1. Freeze a versioned 800-row September staging baseline; verify 800 distinct source records = 791 priced + 9 quote-only, normalize SKU without changing original codes, and reconcile all source page references.
2. Resolve all nine staged-to-live price discrepancies against original source prices and the approved formula/rounding policy; record approved values and audit trail. No bulk update until exceptions are signed off by evidence.
3. Verify product identity for every September record: supplier SKU + description + source-page image must match the product image served by the store. URL presence alone is not proof. Quarantine mismatches and missing/unverifiable images; never substitute guessed images.
4. Correct product names/descriptions and map each record from the source guide taxonomy into the agreed storefront category/subcategory. Preserve source category/page evidence; do not default all records to Accessories or Car Audio.
5. Run automated staging checks: 800 source rows; 791 priced and 9 quote-only; no duplicate normalized SKUs; no unexplained SKU joins; no price formula exceptions left unresolved; no image/category/description mismatches; no invalid price/stock fields; no missing mandatory fields. Export a signed exception report.
6. Reconcile staged records to the live catalogue by stable supplier SKU and public GW SKU; explain every unmatched, duplicate, overwritten, or conflicting row. Confirm the expected product count and price delta before preparing any production migration.
7. Test the release candidate in staging only: product search, category/subcategory browsing, product details/images, cart quantity/update/remove, checkout validation, shipping/pickup selection, order creation, confirmation/error handling, mobile layout and navigation, keyboard/accessibility basics, and responsive breakpoints. Use test orders only; do not process live payments.
8. Verify production-domain HTTPS, deployed version, asset loading, routes, and browser/mobile behavior against the exact release candidate. Keep PayFast and PayJustNow deferred until the live URL and required policy pages are ready for provider review.
9. Run a final no-write release gate and capture evidence: staging import diff, source-to-SKU audit, image/category QA results, price reconciliation, test results, rollback plan, and exact artifact/version hashes.
10. Only after all gates pass, perform the user-preferred single controlled sync to GitHub, Supabase and Axxess, then repeat smoke tests against the deployed version. Do not use Netlify/Cloudflare credits or change production catalogue data before approval.

## Current release decision
NOT READY FOR LIVE TESTING. Original source evidence for the nine asterisk items and three formula exceptions has been recovered, but full 800-row image/category/SKU validation, live-price reconciliation, staging browser/mobile QA, and deployed-version verification remain open. No production catalogue or price changes were made during this source inspection.
