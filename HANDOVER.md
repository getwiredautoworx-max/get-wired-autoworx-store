# GET WIRED AUTOWORX ONLINE STORE — HANDOVER

Updated: 2026-09-16

## SOURCE OF TRUTH
- GitHub repository: `getwiredautoworx-max/get-wired-autoworx-store`
- Branch: `main`
- Netlify site: `get-wired-autoworx-store.netlify.app`
- Store is currently being run through Cloudflare temporarily.
- Do not redesign the approved storefront unless explicitly requested.
- **Do not use Cloudflare credits.**
- **Do not use Netlify credits.**

## CURRENT STOREFRONT STATE
- Customer-facing storefront is in `index-new.html`; `index.html` redirects to it.
- Storefront reads live Supabase catalogue data.
- Categories, product catalogue, search, cart, rating display and product-detail modal are implemented.
- Local product images under `assets/products/<SKU>.jpg` are prioritised, with remote-image and branded placeholder fallbacks.
- Latest known storefront image/UI fix commit: `0d5697d864d9f853c0c362fc62cbf2f4b864a05c`.
- Current main includes the image-cleanup workflow synchronization fix commit `a6b08a7d35997f00be00ec5b6c0149acaaf4614a`.

## IMAGE CLEANUP — VERIFIED
- GitHub Actions image-cleanup run: `35137846265`.
- Job: `104934601924` (`clean-images`).
- Result: **SUCCESS**.
- Workflow successfully processed **800 images**.
- Final commit step reported `No image changes to commit`; the cleaned image set already matched the committed `assets/products` state, so no duplicate image commit was created.
- No Cloudflare or Netlify credits were used.
- Do not rerun image cleanup unless a specific image issue is identified.

## SUPABASE PRODUCT/STOCK STATUS — COMPLETED
The requested zero-stock update has now been successfully applied.

Verified live `public.products` state:
- Total product records: **4,198**
- Products with stock_quantity = 5: **4,162**
- Products with stock_quantity = 0: **0**
- Total units currently in stock: **27,847**

The 4,154 products that were previously at zero stock were updated to `stock_quantity = 5`. Eight products were already at 5, producing the verified total of 4,162 products at stock 5. Existing stocked quantities were preserved.

Verification query used:
```sql
SELECT
  COUNT(*) FILTER (WHERE stock_quantity = 5) AS stock_5,
  COUNT(*) FILTER (WHERE stock_quantity = 0) AS stock_0,
  COUNT(*) AS total_products,
  SUM(stock_quantity) AS total_units
FROM public.products;
```

Verified result:
- stock_5 = 4,162
- stock_0 = 0
- total_products = 4,198
- total_units = 27,847

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
- Pick up available
- Nationwide delivery via Courier Guy or PEP PAXI
- Best prices, best products, guaranteed.

## CURRENT NEXT TASKS
1. Preserve the existing approved storefront/UI.
2. Perform customer-facing QA from current `main`.
3. Verify product-detail behaviour, image fallback behaviour, category filtering, search, cart and mobile layout.
4. Improve only confirmed storefront issues; do not rebuild working sections.
5. Build/verify the customer checkout/order flow after storefront QA.
6. Then address admin/order management and payment/delivery integration.
7. Keep this handover updated after every material change.

## HARD CONSTRAINTS
- **No Cloudflare credits.**
- **No Netlify credits.**
- Do not ask for or expose passwords/secrets.
- Do not use the obsolete 1,109-row CSV.
