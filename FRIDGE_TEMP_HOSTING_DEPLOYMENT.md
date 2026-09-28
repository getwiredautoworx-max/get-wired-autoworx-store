# Fridge Temporary Hosting Deployment Plan — Get Wired AutoWorx

Temporary low-cost live-testing environment while permanent hosting is deferred.

- Fridge Core Starter is currently listed at R19/month with 1GB hosting, free Let's Encrypt SSL, DirectAdmin, unlimited websites/databases/traffic/mailboxes, NVMe storage, South African servers and a 99.9% uptime target.
- Fridge states its backups are not guaranteed. Independent backups are mandatory; Fridge backups must not be the authoritative recovery copy.
- Deploy only approved customer-facing storefront files. Never upload Supabase service-role keys, payment secrets, GitHub tokens, APK signing keys or other private credentials.
- Supabase remains the authoritative backend. Fridge is only the hosting layer.
- Keep the current Cloudflare deployment untouched as fallback. No paid Cloudflare or Netlify credits.
- Before public testing: enable/verify SSL, configure a temporary hostname/domain, verify Supabase connectivity, and test Android/desktop browsing, search, categories, product details, images, cart, checkout, WhatsApp, delivery/pickup and payment presentation.
- Real payment collection remains blocked until payment-provider credentials and final payment details are verified.
- Current GitHub repository tree is approximately 98.8MB, with approximately 89.1MB under assets/, so a 1GB allocation is ample for the repository footprint; only required storefront files should be deployed.
- GitHub main is the storefront source of truth; Supabase exports are data-recovery copies.
- Google Drive was proposed as an additional temporary backup destination, but the Google Drive connector is currently unavailable in this ChatGPT environment. It is NOT marked active until an actual backup and restore test succeeds.
- Permanent hosting remains open for later security, backup, performance, support, ISP/network and cost comparison.
