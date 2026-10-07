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
- **Packaging:** **R25.00 per item**.
- Delivery orders must have a confirmed delivery quotation before submission.
- Full payment confirms the order.
- Do not reintroduce the historical fixed R15 delivery charge.

The current `checkout-v2.html` source has been checked and already reflects these rules.

## Final live QA

- Homepage loads on `https://getwiredauto.co.za` and `https://www.getwiredauto.co.za`.
- Categories/subcategories navigate correctly.
- Product search, product detail, SKU display and image handling work.
- Vehicle make/model finder works against Supabase.
- Cart works.
- Checkout reaches `checkout-v2.html`.
- Pickup remains free.
- Delivery quote workflow is enforced.
- Packaging is calculated at R25 per item.
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
