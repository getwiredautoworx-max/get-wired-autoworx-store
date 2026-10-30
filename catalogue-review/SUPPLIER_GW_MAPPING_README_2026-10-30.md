# Supplier-to-GW mapping — 2026-10-30

## Verified and staged
- Live `public.products` contains 4,200 rows; no existing audio-brand products matched these supplier records.
- Two private supplier connections are now registered **inactive**:
  - Planetworld / TOMS Sound & Music (Pty) Ltd: `29e1acee-b1a6-5630-83c3-0150ea993479`
  - Audio Connections: `806ef592-6f25-5116-bee6-335e26f8b609`
- All 770 supplier source rows are staged in `gw_private.supplier_catalog_items`: 702 Planetworld + 68 Audio Connections.
- Live read-only verification after the insert: 770 unique supplier/SKU pairs; 0 active rows; 0 linked public product IDs; 770 quote-on-request rows; 0 public descriptions; 0 public image URLs.
- The seed SQL was applied on 2026-10-30. It is kept as an idempotent record of the staging operation, not as a migration.

## Simplest next steps
1. Confirm the Get Wired dealer relationships and trade terms with each supplier; keep both supplier connections inactive until confirmed.
2. Use `supplier-gw-crosswalk-2026-10-30.csv` to review the 81 exact individual manufacturer-page candidates with proposed `GW-XXXXXXXX` values. They are collision-checked but **not inserted** into `public.products`.
3. Verify exact model descriptions, approved high-resolution images, price/VAT basis and supplier availability.
4. Only after those checks, create the inactive product records with the approved GW public SKUs, then link the corresponding staged supplier rows by setting `public_product_id` and inserting `product_supplier_codes`.
5. Keep collection-only, no-page, image-unapproved, price-unconfirmed and supplier-sold-out records inactive/held.

## Safety
No public product rows, product_supplier_codes rows, prices, stock, image URLs, active supplier rows or customer-visible listings were created/changed. The two supplier connections and 770 staged catalogue rows are private and inactive. No Edge Function or production deployment was performed.
