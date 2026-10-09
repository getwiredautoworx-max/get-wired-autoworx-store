# Deployment Note — Get Wired AutoWorx

## Current hosting route — 2026-10-07

The current preferred storefront host is **Axxess XS Linux Hosting DirectAdmin** for:

- **getwiredauto.co.za**
- **www.getwiredauto.co.za**

GitHub `main` remains the source of truth.
Supabase remains the backend/database and is **not** migrated to Axxess.

The repository `CNAME` already contains `www.getwiredauto.co.za`.

## Axxess deployment

1. Open the Axxess Client Control Panel and choose **Open your hosting control panel**.
2. In DirectAdmin open **File Manager**.
3. Use the domain's **public_html** document root.
4. Upload the approved GitHub `main` storefront files, preserving the required HTML, JS, CSS, `assets/`, `functions/` and support files.
5. Verify the site's default `index.html` remains the entry point and routes to the approved storefront.
6. In DirectAdmin go to **Account Manager → SSL Certificates** and enable the free automatic Let's Encrypt certificate for the domain and www host, then force HTTPS.
7. Test the public domain from Android/mobile and desktop.

Axxess official documentation states that website files normally use `public_html`, and its DirectAdmin SSL flow supports free automatic Let's Encrypt certificates and forcing HTTPS.

## Current approved checkout rules

- **Pickup from the owner's premises:** no pickup/delivery charge.
- **Delivery:** quoted separately according to the selected courier/PAXI option and subject to quotation.
- **Packaging:** **R35.00 per item/quantity** (current approved rule; this supersedes older R25.00 notes).
- Delivery orders must have a confirmed delivery quotation before submission.
- Customer pickup has a R0.00 delivery charge.
- Full payment confirms the order.
- Do not reintroduce the historical fixed R15 delivery charge or Phoenix Plaza despatch fee.

The current `checkout-v2.html` source has been updated to reflect these rules. The production database order function must remain the authority for the final calculated order total.

## Final live QA

- Homepage loads on `https://getwiredauto.co.za` and `https://www.getwiredauto.co.za`.
- Categories/subcategories navigate correctly.
- Product search, product detail, SKU display and image handling work.
- Vehicle make/model finder works against Supabase.
- Cart works.
- Checkout reaches `checkout-v2.html`.
- Pickup remains free (R0.00 delivery charge).
- Delivery quote workflow is enforced.
- Packaging is calculated at R35 per item/quantity.
- Supabase product loading and order creation work.
- Supplier-source request works.
- WhatsApp links work.
- Mobile layout works.
- SSL/HTTPS is active.
- No stale Cloudflare/Netlify production URL is presented to customers.

## Cloudflare / GitHub Pages

Axxess is the current zero-Cloudflare-credit production path. Cloudflare and GitHub Pages are not required for the storefront to go live.

Historical Cloudflare/GitHub Pages workflows are retained for fallback/reference and must not be triggered as part of the Axxess deployment unless explicitly authorised.

Do not spend Netlify or Cloudflare credits during the Axxess staging/verification process.


## 2026-10-09 — Current QA and fallback deployment status

- Axxess XS Linux Hosting DirectAdmin remains the primary production route; the approved deployment process is to upload/synchronise repository files to the domain's `public_html`, then verify SSL and storefront behaviour.
- The Cloudflare Pages GitHub Action currently fails before deployment because the runner has no `CLOUDFLARE_API_TOKEN`. Cloudflare is a fallback, not the current primary route. Do not change DNS to accommodate this failed fallback.
- GitHub Pages reported a successful workflow run, but that status is not evidence that Axxess `public_html`, the custom domain, checkout or product images are live and correct.
- Current approved checkout rules: R35.00 packaging per item/quantity, free pickup, delivery quoted by actual parcel and destination. A live Supabase function restriction requiring at least R59.95 delivery was removed on 2026-10-09; any positive selected delivery quote is now accepted by the database function.
- Catalogue audit: 4,187 active products, no missing image URLs, category IDs or prices; 3,395 products still use generic/placeholder-named image URLs and need SKU-matched image replacement.
