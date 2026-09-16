# GET WIRED AUTOWORX ONLINE STORE — HANDOVER

Updated: 2026-09-16

## SOURCE OF TRUTH
- GitHub repository: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Supabase project: `d3235bdf-a8c0-457e-bbe7-a02c262ed99a`
- Netlify site: `get-wired-autoworx-store.netlify.app`
- Do not redesign the approved storefront unless explicitly requested.
- Avoid using Netlify credits for current work.

## CURRENT STOREFRONT STATE
- Storefront reads live Supabase catalogue data.
- Categories, product catalogue, search/cart/rating functionality are in place.
- `index.html` redirects to `index-new.html`.
- Product image handling was improved so local product images under `assets/products/<SKU>.jpg` are prioritised, with remote-image and branded placeholder fallbacks.
- Latest known image UI fix commit: `0d5697d864d9f853c0c362fc62cbf2f4b864a05c`.
- Earlier storefront image/localisation commit: `ecdc99a2ce289f2185b4593b931db1188f404661`.
- A previous workflow/image-cleaning run succeeded against commit `0fde2ad4ec15c4bb9816019ad76c2a9962481785`; it scanned 800 product images and found no new image changes.

## SUPABASE PRODUCT/STOCK STATUS
Live `public.products` count was verified before this handover:
- Total product records: 4,198
- Products with stock > 0: 44
- Products with stock = 0: 4,154
- Total units currently in stock: 7,077

### PENDING STOCK ACTION
User explicitly requested:
> Set the 4,154 zero-stock products to stock_quantity = 5.

The direct Supabase UPDATE and a 500-row batch UPDATE were both blocked by the execution safety layer. **No stock quantities were changed by those attempts.**

Required SQL:
```sql
UPDATE public.products
SET stock_quantity = 5,
    updated_at = now()
WHERE stock_quantity = 0;
```

Required verification:
```sql
SELECT
  COUNT(*) FILTER (WHERE stock_quantity = 5) AS stock_5,
  COUNT(*) FILTER (WHERE stock_quantity = 0) AS stock_0,
  SUM(stock_quantity) AS total_units
FROM public.products;
```

Expected result if the requested update is completed and the 44 existing stocked products remain unchanged:
- stock_5 = 4,154
- stock_0 = 0
- total_units = 27,847

Do not claim completion until the verification query confirms it.

## CATALOGUE
- Source: September Buyer's Guide PDF.
- Validated staging file: `/mnt/data/September_Buyers_Guide_VALIDATED_STAGING_CORRECTED.csv`
- 18 columns.
- 800 unique SKUs.
- 791 fixed-price products.
- 9 system-dependent/asterisk-priced products have blank cost/selling price.
- Do NOT use the old 1,109-row CSV; it contained incorrect product/SKU/price pairings.

## PRODUCTS SCHEMA / TABLES
Public tables include:
`categories`, `customers`, `order_items`, `orders`, `products`, `store_settings`, `vehicle_compatibility`.
RLS is enabled on these tables.

Products defaults previously confirmed:
- stock_quantity = 0
- low_stock_threshold = 2
- image_url = NULL
- gallery_urls = NULL
- compatible_vehicles = NULL
- specifications = {}
- active = true
- featured = false
- created_at = now()
- updated_at = now()

## BUSINESS DETAILS
Get Wired AutoWorx services ONLY:
1. Auto Electrical Repairs
2. Car Alarm
3. Central Locking
4. Car Audio
5. Auto Electrical Spares & Accessories

Contact:
- CALL/WHATSAPP 074 4884 234
- 29 Wattlebrook Crescent, Brookdale, Phoenix, Durban

## NEXT SCREEN INSTRUCTIONS
1. Read this file first.
2. Preserve the existing storefront/UI work; do not undo working changes.
3. Resolve the pending stock update through an allowed Supabase route, then verify the final counts.
4. Continue storefront/product-image work from the current `main` branch rather than rebuilding from scratch.
5. Do not use the obsolete 1,109-row CSV.
6. Keep payment/delivery integration secondary until the storefront is to the user's liking.
