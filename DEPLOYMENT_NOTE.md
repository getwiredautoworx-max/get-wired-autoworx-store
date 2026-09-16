# Deployment Note — Get Wired AutoWorx

The current production deployment platform is **Cloudflare**. GitHub `main` is the source of truth.

The repository has been validated at code level and the automated storefront smoke test passes. The smoke test confirms the active storefront route and fixed R15.00 delivery requirement.

**Cloudflare credit protection:** no Cloudflare deployment/build was triggered during this QA continuation. Cloudflare credit-dependent work remains reserved for final live testing/deployment.

## Final live deployment checklist
1. Publish the current approved `main` build through the existing Cloudflare project.
2. Verify the published storefront on Android/mobile.
3. Verify the published storefront on desktop.
4. Verify one cart item = R15.00 delivery.
5. Verify multiple cart items for the same delivery address = R15.00 delivery total, not R15 per item.
6. Verify Phoenix Plaza is not displayed as a customer pickup/collection location.
7. Verify the checkout route reaches `checkout-v2.html`.
8. Verify the published storefront matches the approved dark blue/red design before final approval.

Do not revert to the legacy Netlify deployment instructions in this file.
