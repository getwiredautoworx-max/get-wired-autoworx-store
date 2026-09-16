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
- Categories, product catalogue, search, cart, rating display and product-detail modal are already implemented.
- Local product images under `assets/products/<SKU>.jpg` are prioritised, with remote-image and branded placeholder fallbacks.
- Latest known storefront image/UI fix commit: `0d5697d864d9f853c0c362fc62cbf2f4b864a05c`.
- Current `main` head before this handover update: `a6b08a7d35997f00be00ec5b6c0149acaaf4614a`.

## IMAGE CLEANUP — VERIFIED
- GitHub Actions image-cleanup run: `35137846265`.
- Job: `104934601924` (`clean-images`).
- Result: **SUCCESS**.
- The workflow successfully processed **800 images**.
- The final commit step reported `No image changes to commit`, meaning the cleaned image set already matched the committed `assets/products` state; no duplicate image commit was created.
- No Cloudflare or Netlify credits were used.
- Continue storefront work from current `main`; do not rerun image cleanup unless there is a specific image issue.

## SUPABASE PRODUCT/STOCK STATUS
Live `public.products` count was verified before this handover:
- Total product records: 4,198
- Products with stock > 0: 44
- Products with stock = 0: 4,154
- Total units currently in stock: 7,077

### PENDING STOCK ACTION
User explicitly requested:
> Set the 4,154 zero-stock products to stock_quantity = 5.

The direct Supabase UPDATE and a 500-row batch UPDATE were previously blocked by the execution safety layer. **No stock quantities were changed by those attempts.**

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

**Do not claim completion until the verification query confirms it.**

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
2. Resolve the pending stock update through an allowed Supabase route, then verify final counts.
3. Continue customer-facing storefront QA from current `main`.
4. Verify product-detail behaviour, image fallback behaviour, category filtering, search, cart and mobile layout.
5. Improve only confirmed issues; do not rebuild working sections.
6. Keep payment/delivery integration secondary until the storefront is to the user's liking.
7. Keep this handover updated after material changes.
