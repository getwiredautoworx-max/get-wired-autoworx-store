# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-10-07 17:20 SAST

## CURRENT CHECKPOINT
- This handover is the authoritative restart point for the next session.
- Latest instruction: continue later from this checkpoint without repeating completed work.
- Current production direction: **Axxess XS + existing domain + Supabase + GitHub**.
- User requires execution-focused progress, with the handover updated after each completed task.

## HOSTING DECISION — AXXESS XS
- [x] Selected **Axxess XS Linux Hosting — R69/month** as the initial South African production-hosting target.
- [x] Start with the smallest suitable plan; upgrade only if actual storage/resource usage requires it.
- [x] Axxess S/R79 was considered, but XS is preferred initially.
- [x] DirectAdmin is sufficient; do not purchase cPanel unnecessarily.
- [x] Existing canonical domain remains **www.getwiredauto.co.za**.
- [x] Do NOT transfer or re-register the domain.
- [ ] Axxess account activation/payment not yet independently verified in connected tools.
- [ ] Axxess DirectAdmin/hosting credentials and exact DNS targets still required from Axxess.
- [ ] Never guess Axxess DNS records.

## COST-CONTROLLED ARCHITECTURE
- **Axxess XS:** selected South African production web host, target R69/month.
- **Supabase:** single source of truth for products, categories, customers, orders, stock, fitment, pricing and backend validation.
- **GitHub:** source control/master repository and deployment source.
- **Cloudflare:** technical fallback/DNS/CDN/security only; **NO CLOUDFLARE CREDITS**.
- **Netlify:** excluded; no Netlify credits.
- **Replit:** excluded; no Replit credits.
- Do NOT create a duplicate MySQL catalogue on Axxess.
- Do NOT upload all catalogue images blindly to the 2 GB XS plan; measure asset footprint first.

## GITHUB PAGES / STAGING BLOCKER — RESOLVED
- Earlier GitHub Pages workflow failed because the Actions integration could not create the Pages site.
- Owner manually enabled GitHub Pages: Settings → Pages → Deploy from a branch → main → /(root).
- Dynamic Pages workflow subsequently completed successfully:
  - Run **37588242362** = success.
  - Build job **112683299304** = success.
  - Report-build-status job **112683483345** = success.
  - Deploy job **112683483350** = success.
- Root CNAME was later set to the only approved canonical domain: **www.getwiredauto.co.za**.
- CNAME commit: **272a1cc5381cf574e191533a6a008661911cafc7**.
- GitHub Pages remains a validated technical fallback/staging route, not the selected paid production host.
- Public browser/DNS reachability must not be claimed until independently tested.

## IMMEDIATE AXXESS MIGRATION SEQUENCE
1. Confirm Axxess XS account/order activation.
2. Obtain DirectAdmin access and exact hosting/DNS details. Never share credentials in chat.
3. Prepare the existing storefront from GitHub; **no rebuild**.
4. Upload storefront to Axxess and test before changing DNS.
5. Enable/verify Axxess SSL/HTTPS.
6. Point **www.getwiredauto.co.za** using only the exact Axxess DNS records supplied by Axxess.
7. Run public storefront regression and non-production checkout QA.
8. Deploy and verify the 99 exact-SKU image binaries.
9. Complete Owner APK functional acceptance.
10. Verify final payment/bank details and complete operational QA.
11. Upgrade Axxess only if actual usage proves XS insufficient.

## STORE / SUPABASE VERIFIED STATE
- Repository: **getwiredautoworx-max/get-wired-autoworx-store**, branch **main**.
- Existing storefront is the production foundation; automated smoke test **36750308661 = SUCCESS**.
- Supabase: **4,187 active products**, **4,187 active priced/unique active SKUs**, **27,745 active units**, **0 uncategorized**, **0 pricing mismatches**.
- Pricing: supplier cost × **1.15 VAT × 1.35 markup**.
- Fulfilment: **pickup from premises = R0**; **packaging = R25 per item**; **delivery = actual Courier Guy/PAXI quotation, subject to quotation**. No fixed R15 delivery fee.
- RLS/security and server-authoritative validation remain in place.
- Public customer-facing SKU system uses proprietary GW-XXXXXXXX-style public SKUs; supplier codes remain private.
- Supplier sourcing architecture remains private/internal.

## SECURITY AUDIT — COMPLETED FIX
- [x] Supabase security advisor identified public.export_store_catalog_data() as a publicly executable SECURITY DEFINER RPC.
- [x] Verified the function was owned by postgres, was SECURITY DEFINER, and was executable by public, anon, and authenticated.
- [x] Verified the function exported supplier cost_price and therefore must not be publicly callable.
- [x] Revoked EXECUTE from public, anon and authenticated for public.export_store_catalog_data().
- [x] Post-fix verification: anon_execute=false, authenticated_execute=false, public_execute=false.
- [x] Security advisor re-run: the two SECURITY DEFINER executable warnings are cleared.
- [ ] Remaining Supabase security advisory: Leaked Password Protection is disabled. This is an Auth dashboard/configuration item and has not been changed automatically because no connected Auth-settings mutation tool is available.
- Performance advisor reports unused-index informational notices; these are not production blockers and should not be removed blindly.

## IMAGE STATUS — VERIFIED INVENTORY
- [x] Current GitHub main inventory contains **800 JPEG product images** under assets/products/.
- [x] Measured binary footprint: **205,424,314 bytes (~195.91 MiB)** for those 800 JPEGs.
- [x] Exact filename-to-database SKU check: **795** files match a database SKU; **787** of those matches are active products.
- [x] Supabase active catalogue image state currently reports **792** product-image function URLs, **3,395** branded placeholders, and **0** null image URLs.
- [ ] Image-quality/watermark verification of all 800 binaries remains outstanding.
- [ ] Do not blindly upload/rewrite all image URLs; preserve exact-SKU matching and branded fallback controls.
- The previous 99-image deployment checkpoint is superseded by this current measured 800-file repository inventory; the 99-item set should be treated as a targeted verified subset, not the total local image count.

- 99 exact-SKU JPEG assets prepared and matched to existing/categorised products.
- 99 binary image deployment remains pending; URLs were intentionally not changed until binaries are actually committed.
- Safe branded placeholders remain for products without verified exact-SKU imagery.
- 800-image cleanup completed; 3,396 safe branded placeholders remain where no verified exact-SKU image exists.
- Image-quality/watermark workflow exists but successful production completion still needs verification.

## OWNER APK STATUS
- Production source path: **android-owner-app/**
- Package: **za.co.getwiredautoworx.owner**
- Production source/version: **v1.0.1 / versionCode 2**
- compileSdk/targetSdk: **35**
- Production-source workflow **36750308741 = SUCCESS**.
- Job **110006925647 = SUCCESS**.
- Debug APK artifact **11114172502**, SHA-256 **137bf0a7ea3a02c7e0b9c77019a081d641bafa599ce4a1ec15e5a43718337fd9**, expiry **2026-12-29**.
- Latest Actions listing: **Build and Validate Get Wired AutoWorx Owner APK**, run **37586809507 = SUCCESS**.
- Automated validation proves build/install/launch/activity execution.
- Remaining: functional acceptance of login, dashboard, catalogue/product management, storefront/checkout path, back navigation/WebView and runtime stability; signed release build only if required.
- Do not invent credentials or bypass authentication.

## DOMAIN RULE
- Only customer-facing production domain: **www.getwiredauto.co.za**.
- Do not use **getwiredautoworx.co.za**.
- Do not register a second customer-facing domain.
- Do not transfer the existing domain unless explicitly decided later.

## CURRENT REMAINING TASKS
1. Axxess account activation/payment verification.
2. Axxess DirectAdmin + exact DNS/hosting details.
3. Axxess storefront upload and pre-DNS test.
4. SSL/HTTPS verification.
5. DNS cutover for www.getwiredauto.co.za.
6. Public production regression.
7. 99 exact-SKU image binaries deployment/verification.
8. Owner APK functional acceptance.
9. Enable Supabase leaked-password protection in Auth settings.
10. Final payment/bank-detail verification.
11. Final operational QA.
12. Final handover update after every completed task.

## PROJECT RULES
- NO REPLIT CREDITS.
- NO CLOUDFLARE CREDITS.
- NO NETLIFY CREDITS.
- Do not restart completed work without evidence of a defect.
- Do not use the obsolete 1,109-row CSV.
- Do not expose secrets, passwords, private keys, tokens or private banking details.
- Do not claim live/public verification without actual evidence.
- Do not create real customer orders during QA without explicit authorization.
- Preserve safe branded image fallbacks and exact-SKU matching controls.
- Delivery is never a fixed R15 fee: pickup R0, packaging R25/item, delivery by actual courier/PAXI quotation subject to quotation.

## AXXESS HOSTING DETAILS RECEIVED — 2026-10-07
- Linux Control Panel host: dahost11.vpslocal.co.za:2222
- Server IP: 156.155.252.98
- Assigned nameserver 1: ns1.clusterdns.co.za — 41.76.111.83
- Assigned nameserver 2: ns2.clusterdns.co.za — 154.0.166.77
- Assigned nameserver 3: ns3.hostdns.co.za — 198.244.190.151
- Assigned nameserver 4: ns4.clusterdns.org — 160.119.253.29
- These are now the authoritative Axxess hosting/DNS values supplied by the user; do not substitute guessed records.
- Account activation/payment confirmation remains outstanding.
- No DirectAdmin password, payment data, tokens or other credentials are stored in this handover.

## CONTINUATION CHECKPOINT — 2026-10-07 17:20 SAST
- [x] Independent production-code audit found a static-hosting incompatibility: checkout was calling Axxess-incompatible `/api/shipping/quote`.
- [x] Deployed Supabase Edge Function `shipping-quote` (ACTIVE v1) for public delivery-quote calculation.
- [x] Updated `checkout-v2.html` to call `https://ojytykqpvonxvepprgbh.supabase.co/functions/v1/shipping-quote` instead of `/api/shipping/quote`.
- [x] Verified repository checkout no longer contains the obsolete `/api/shipping/quote` call and does contain the Supabase shipping endpoint.
- [x] Rechecked official PAXI pricing. Current published store-to-store rates used by the quote function: Standard 7–9 days R59.95; Standard 3–5 days R109.95; Large 7–9 days R119.95; Large 3–5 days R139.95. PAXI API remains provider-gated.
- [ ] Live HTTP invocation test of the new quote function remains pending because the current runtime cannot make outbound DNS requests; this must be tested during browser/live QA after DNS is active.
- [ ] No real order was created.
- GitHub checkout commit: `35fa2fca8113bd380c805e2f66f2fa2270e42630`.
- Supabase shipping function deployment ID: `ba634408-9d56-4db0-b79a-8e3d6a10f1fa`.
- Source: official PAXI pricing pages verified 2026-10-07.

## CONTINUATION CHECKPOINT — 2026-10-07
- Completed while DNS is pending: Axxess storefront upload, extraction, root placement and preservation of the original Axxess index backup.
- Current blocker: domain DNS/activation at Axxess; do not modify MX records or guess DNS records.
- Independent work completed: Supabase Security Advisor rechecked. Only remaining warning is **Leaked Password Protection Disabled**; this requires Auth dashboard/configuration and no connected Auth-settings mutation tool is available.
- Current Supabase policy inventory confirms public read policies for customer-facing catalogue/settings/fitment and deny-client-access policies for customers/orders/order_items.
- Owner APK latest repository activity remains the emulator-validation work from 2026-09-30; functional acceptance still requires device/user testing.
- Do not consume Cloudflare, Netlify or Replit credits.

## PERMANENT 8 RULES — COPY UNCHANGED
1. Preserve existing store as foundation; do not rebuild unnecessarily or overwrite working components.
2. Execute efficiently in one flow; complete all available tasks instead of stopping after every individual step.
3. Only interrupt when genuinely necessary; notify user when input/approval/credentials/permissions are actually required.
4. The 8 rules are permanent; read at start of every continuation session and carry into every new handover.
5. All 8 rules must be copied unchanged into every new handover; may not be omitted/edited/removed without permission. If rules themselves edited/removed, reproduce all 8 first.
6. Do not use Cloudflare or Netlify credits until final testing; reserve credit-dependent work for end-stage testing/deployment.
7. Update master handover after every successfully completed task so next session continues from exact current state.
8. Maintain project continuity and authority; existing work, decisions, data, structure and approved requirements remain in force unless user explicitly authorizes change; do not assume changes that could interfere with online store.

## RESTART INSTRUCTION
When continuing, first verify the current GitHub main state and Axxess account/hosting status, then execute the next unresolved migration task. Do not redo the completed GitHub Pages permission fix or other verified work unless a new defect is demonstrated.

Previous detailed handover evidence remains preserved in Git history.
