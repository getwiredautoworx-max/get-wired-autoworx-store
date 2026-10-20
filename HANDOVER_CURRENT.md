# Get Wired AutoWorx — Current Handover
Updated: 2026-10-20 SAST

## OWNER DIRECTIVE — SINGLE APPROVED STOREFRONT ONLY (2026-10-20)
- **Only approved storefront/reference:** https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- **Authoritative source commit:** `1a76108c7415ade3bab07461ac27af16ce2fa8f8` (the commit associated with the approved 20:56 reference deployment).
- Owner explicitly directs that this exact approved source replaces the divergent recovery build; do not mix in, inherit, merge, or rebuild from other storefront variants.
- The recovery branch `recovery/approved-preview-index-new` is being reset to the exact approved source commit so its tracked build tree matches that version, rather than keeping the partial restoration commits.
- Keep historical Git commits for traceability; “remove other versions from the build” means exclude them from the active source tree, not erase repository history.
- This is a source-selection/handover correction, **not proof of a newly deployed preview**. Do not claim the branch URL has refreshed or visually passed until a deployment/check is evidenced.
- Do not merge to `main`, change Axxess/DNS/production, or change payment/catalogue systems as part of this task. Existing production release HOLD remains in force.

## Owner-approved baseline (authoritative)
- Owner confirms the original working storefront around 20:56 SAST is the reference: https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- PR #54 Cloudflare Pages bot associated that preview with commit `1a76108c7415ade3bab07461ac27af16ce2fa8f8`.
- Owner rejects the storefront inherited by `6b7cf26b86fd4eaa1a88baad1c1d20efd2d5c9c8` as the old broken version. Do not use it as the baseline.
- Continue restoring the existing storefront; do not restart, redesign, or build a replacement/demo.

## Latest completed work
- Owner-correction record saved: `handover-runs/2026-10-20-owner-approved-preview-correction.md`, commit `f994e56ea749bd77e01fe68e29652f96414a43f2`.
- Isolated restoration branch: `recovery/approved-preview-index-new`.
- PR #64 open/unmerged: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/64
- Latest known PR head: `e2e51ccfde1f25c4cb5f0b6dba68b53124edc6f4`.
- Restored `index-new.html` from approved source exactly; verified blob SHA `d274b0ffdaa0a1c45939933e308c4c65acb85554` (144,657 characters).
- Restored `assets/product-image-pending.svg`, missing from main but referenced by approved HTML; verified blob SHA `d5d140d1a5045fa912cd2345e3d27e9e642a0ba9`.
- `product-details.js` is identical at main and approved source: `46003d9dee01a4853ee835f30d6b4ca74d064ea6`.
- Detailed restoration log saved at `handover-runs/2026-10-20-controlled-approved-source-restoration.md`, commit `18374704f09a07b55b89b0bebf0cc09b9b769c3b`.

## Current status — be precise
- PR #64 remains open and unmerged; no merge or production promotion.
- At last check, no Cloudflare preview comment/status was available for the new PR head. Preview deployment is unverified.
- Browser inspection tool could not open the approved or recovery preview URLs; this is a tool limitation, not proof that the owner's URL is broken.
- Approved HTML also references `assets/gw-logo.png`; its presence/content was not established by text-only file retrieval. Verify via repository tree or rendered preview.
- Matching hashes prove the two restored files match the approved source, not that every dependency or final layout is correct.
- The full approved source branch diverges heavily from main (155 ahead / 144 behind); do not merge that entire branch or force-push main.

## Continue from this exact point
1. Inspect PR #64 current head, latest status checks, and comments for a Cloudflare Pages preview URL. Do not assume a preview exists.
2. If no preview exists, find a safe way to trigger/obtain a PR preview without re-enabling any disabled production/worker build or changing production settings.
3. Verify the exact preview at desktop/mobile sizes 1440px, 390px and 320px. Check no overlaps or horizontal overflow; distinct working Shop Now, Part Search and Request a Part controls; category navigation; image and logo loading.
4. Verify `assets/gw-logo.png` and other dependencies referenced by restored HTML. Restore further files only when proven necessary and matching the approved source. Avoid broad CSS rewrites or blind rebuilds.
5. Record findings and update this handover after meaningful success/failure. Do not mark work complete on investigation or deploy success alone.
6. Keep PR #64 unmerged until exact preview visually matches owner-approved reference. After evidence passes, report it and follow release gates before any merge/promotion.
7. Leave Axxess, production domain/DNS, Supabase data, checkout and payment settings unchanged until owner approves the verified release.

## Remaining launch gates
- Final storefront/mobile acceptance and source/dependency parity.
- Correct catalogue products, categories, prices and high-quality images; current image coverage has not been confirmed complete.
- Supplier stock/discontinued reconciliation.
- Secure product/category admin CRUD and simple stock/subcategory editing.
- Checkout, policy and payment-provider verification once the store URL is approved.
- Owner's final acceptance.
Customer launch remains HOLD.

## Owner workflow preferences
- Build and test in GitHub first; only move to Axxess when owner approves the build.
- Do not ask owner to upload ZIPs for small changes.
- Do not ask for owner input unless an actual external requirement/approval is needed.
- Keep the existing storefront and resolve the root cause; do not circle through repeated redesigns.
- Never claim “completed” without evidence.

## Safety/change record
- No PR merged; no main force-push.
- No production deploy, Axxess upload, DNS, Supabase, checkout, or payment settings changed during this restoration.
- Restoration changes are isolated to `recovery/approved-preview-index-new`.
- This handover update is a documentation-only change on main.
