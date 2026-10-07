# GET WIRED AUTOWORX ONLINE STORE — MASTER HANDOVER

Updated: 2026-10-07 10:35 SAST

## HOSTING DECISION — AXXESS XS
- [x] Selected **Axxess XS Linux Hosting — R69/month** as the initial South African production-hosting target.
- [x] Decision is cost-controlled: start with the smallest suitable plan and upgrade only if actual storage/usage requires it.
- [x] Axxess S/R79 was considered, but XS is preferred initially because the storefront is lightweight and Supabase remains the database/backend.
- [x] DirectAdmin should be used; do not purchase cPanel unnecessarily.
- [x] Existing canonical domain remains **www.getwiredauto.co.za** and should NOT be transferred or re-registered.
- [ ] Axxess account activation/payment not yet independently verified in connected tools.
- [ ] Axxess hosting credentials/server DNS details not yet obtained.
- [ ] Exact Axxess DNS target/nameservers must be obtained from Axxess; do not guess records.

## COST-CONTROLLED ARCHITECTURE
- **Axxess XS:** South African production web hosting, target R69/month.
- **Supabase:** remains the single source of truth for products, categories, customers, orders, stock, fitment, pricing and backend validation.
- **GitHub:** remains source control/master repository and deployment source.
- **Cloudflare:** optional fallback/DNS/CDN/security only; **NO CLOUDFLARE CREDITS** are to be used unnecessarily.
- **Netlify:** excluded; no Netlify credits.
- **Replit:** excluded; no Replit credits.
- Do NOT create a duplicate MySQL catalogue on Axxess. The existing Supabase database remains authoritative.
- Do NOT upload all catalogue images blindly to Axxess XS. First measure the production asset footprint; XS has 2 GB storage.

## IMMEDIATE MIGRATION SEQUENCE
1. Owner completes Axxess XS order using **Hosting Only/existing domain**, without transferring/registering the domain.
2. Obtain Axxess DirectAdmin and DNS/hosting details without sharing credentials in chat.
3. Prepare the existing GitHub storefront for Axxess; no rebuild.
4. Upload production storefront files to Axxess and test before changing DNS.
5. Enable/verify Axxess SSL/HTTPS.
6. Point www.getwiredauto.co.za to Axxess using the exact records supplied by Axxess.
7. Run public storefront regression and non-production checkout QA.
8. Deploy/verify the 99 exact-SKU image binaries safely.
9. Complete Owner APK functional acceptance.
10. Verify final payment/bank details and complete operational QA.
11. Upgrade Axxess only if actual usage demonstrates that XS is insufficient.

## DOMAIN RULE
- Only customer-facing production domain: **www.getwiredauto.co.za**.
- Do NOT transfer the domain unless explicitly decided later.
- Do NOT register a second customer-facing domain.
- Do NOT use the old getwiredautoworx.co.za domain.

## CURRENT BLOCKERS / PENDING
- Axxess XS account activation and hosting details.
- Axxess DNS configuration and domain pointing.
- Public HTTPS/browser verification after migration.
- 99 exact-SKU image binary deployment/verification.
- Owner APK functional acceptance.
- Final payment/bank-detail verification.
- Final operational QA.

## EXISTING VERIFIED PROJECT STATE
- Repository: getwiredautoworx-max/get-wired-autoworx-store, branch main.
- Storefront is existing production foundation; automated smoke test 36750308661 = SUCCESS.
- Supabase: 4,187 active products; 4,187 active priced/unique active SKUs; 27,745 active units; 0 uncategorized; 0 pricing mismatches.
- Pricing formula: supplier cost × 1.15 VAT × 1.35 markup.
- Pickup = R0; packaging = R25 per item; delivery = actual Courier Guy/PAXI quotation, subject to quotation; no fixed R15 delivery fee.
- RLS/security and server-authoritative validation remain in place.
- 99 exact-SKU JPEG images prepared but binary production deployment remains pending.
- Owner APK production-source build/emulator validation passed; functional acceptance remains pending.
- Cloudflare Pages and GitHub Pages remain available as technical fallback/staging paths, but Axxess is now the selected production-hosting direction.

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

## CONTINUATION
This checkpoint supersedes older hosting instructions that treated GitHub Pages as the immediate production route. The current preferred production route is **Axxess XS + existing domain + Supabase + GitHub**, with Cloudflare kept optional and cost-free unless deliberately needed.

Previous handover evidence and detailed historical sections remain preserved in Git history.
