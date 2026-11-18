# HANDOVER CURRENT — 18 November 2026

## Owner-approved reset: Audio & Entertainment only

The active working scope is now a clean Audio & Entertainment storefront. This supersedes the Electrocity Auto Electrical priority recorded in earlier handovers.

### Keep
- Get Wired AutoWorx logo, branding, colours, homepage and storefront shell.
- Audio & Entertainment category and its existing subcategories/navigation.
- Existing curated audio preview records, approved audio imagery and audio source/evidence files.
- Cart, checkout, customer, admin and order-management code.
- Existing Supabase integration, authentication, RLS, security tests and delivery/payment infrastructure.

### Remove from the current working tree
- ASC and all ASC-derived catalogue assets.
- Electrocity Auto Electrical catalogues, images, extraction outputs and pilot records.
- Caelex and other non-audio supplier/catalogue material.
- Non-audio catalogue review, staging and preview material.

### Safety and release boundary
- Work continues on existing draft PR #213; do not create another working branch.
- Keep `main` unchanged until the owner reviews and approves the candidate.
- Do not write to Supabase, import products, change live prices/stock, deploy Cloudflare/Axxess, alter DNS or activate checkout/payment changes without explicit approval.
- Historical commits remain available for recovery. Do not bulk-delete Git branches or history as part of this reset.
- Audio catalogue records remain review-only until product descriptions, exact images, prices and availability are verified and approved.
- The 790 legacy product image files and 4,101 WebP assets are retained temporarily because they are not yet mapped reliably to audio/non-audio SKUs. Do not bulk-delete or publish them until image-to-product references are audited.

### Immediate next work
1. Complete the audio-only category and customer-facing preview route.
2. Run desktop and Android storefront checks.
3. Verify that no non-audio catalogue or supplier material appears in the customer view.
4. Confirm cart, checkout, customer and admin flows still load without changing production data.
5. Produce a customer-facing preview URL only after the preview build and tests pass.
