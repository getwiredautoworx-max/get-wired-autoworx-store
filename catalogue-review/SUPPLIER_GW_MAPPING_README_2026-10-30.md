# Supplier-to-GW mapping — 2026-10-30

## Verified and staged
- Live `public.products` contains 4,200 rows; no existing audio-brand products matched these supplier records.
- Two private supplier connections are registered:
  - **Planetworld / TOMS Sound & Music (Pty) Ltd** — ID `29e1acee-b1a6-5630-83c3-0150ea993479`, **active**. Planetworld's 2026-10-20 welcome email confirms dealer onboarding is complete and the account is ready to trade. Sales contact: Sashini via `salesdesk@planetworld.co.za`.
  - **Audio Connections** — ID `806ef592-6f25-5116-bee6-335e26f8b609`, **inactive**. No dealer-onboarding confirmation was found in connected email; keep inactive until confirmed.
- All 770 supplier source rows are staged in `gw_private.supplier_catalog_items`: 702 Planetworld + 68 Audio Connections.
- Post-write read-only verification: 770 unique supplier/SKU pairs; 0 active catalogue rows; 0 linked public product IDs; 770 quote-on-request rows; 0 public descriptions; 0 public image URLs.
- The seed SQL was applied on 2026-10-30. It is kept as an idempotent record of the initial staging operation, not as a migration. Planetworld was activated separately after the dealer welcome confirmation; the staged catalogue rows remain inactive.

## Simplest next steps
1. Use the confirmed Planetworld sales contact for exact product/price/availability and approved high-resolution image requests. Keep the staged catalogue items inactive until each product is verified.
2. Confirm the Audio Connections dealer relationship and trade terms before activating that supplier.
3. Use `supplier-gw-crosswalk-2026-10-30.csv` to review the 81 exact individual manufacturer-page candidates with proposed `GW-XXXXXXXX` values. They are collision-checked but **not inserted** into `public.products`.
4. Verify exact model descriptions, approved high-resolution images, price/VAT basis and supplier availability.
5. Only after those checks, create the inactive product records with approved GW public SKUs, then link the corresponding staged supplier rows by setting `public_product_id` and inserting `product_supplier_codes`.
6. Keep collection-only, no-page, image-unapproved, price-unconfirmed and supplier-sold-out records inactive/held.

## Safety
No public product rows, product_supplier_codes rows, prices, stock, image URLs, active supplier catalogue rows or customer-visible listings were created/changed. Planetworld's supplier connection is active because dealer onboarding was confirmed; Audio Connections remains inactive. All 770 catalogue items are private, inactive and unlinked. No Edge Function or production deployment was performed.
