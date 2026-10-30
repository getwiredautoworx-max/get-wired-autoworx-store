# Supplier-to-GW mapping proposal — 2026-10-30

## What the audit established
- The 4,200-row live `public.products` catalogue has no matching products for the audio brands in these supplier files.
- No Planetworld or Audio Connections supplier connection currently exists.
- The private `supplier_catalog_items` table supports a nullable `public_product_id`, so unmatched supplier products can be staged without inventing a public product ID.
- The private `product_supplier_codes` table links a supplier SKU to a product, but its primary key is `product_id` (one supplier-code row per product).

## Simplest safe process
1. Confirm the two supplier relationships and trade terms using the official contact details in `supplier-connection-proposals-2026-10-30.csv`.
2. If approved, apply the separate review-only SQL proposal. It creates the two supplier connections as **inactive** and stages all 770 source rows with `public_product_id = NULL`, `active = false`, and `quote_on_request = true`.
3. Use `supplier-gw-crosswalk-2026-10-30.csv` to review manufacturer model matches. It proposes 81 collision-checked GW public SKU values for exact individual manufacturer-page matches. Candidate values are not inserted.
4. For each approved new product, create the product record with its proposed GW public SKU, exact manufacturer description, approved high-resolution image and owner-approved price/availability. Then set the supplier catalogue row's `public_product_id` and create the corresponding `product_supplier_codes` row.
5. Keep collection-only, no-page, image-unapproved, price-unconfirmed and supplier-sold-out records inactive/held. Do not publish them.

## Safety
The SQL is a draft file under `catalogue-review/`, not a migration. It has **not** been executed. No Supabase writes, supplier inserts, product rows, stock, prices, images or publication changes were made.
