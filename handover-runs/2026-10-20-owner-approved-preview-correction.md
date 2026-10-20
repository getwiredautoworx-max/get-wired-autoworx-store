# Get Wired AutoWorx — Owner Correction: Approved Preview Baseline
Date: 2026-10-20 SAST

## Owner correction — authoritative
- Owner explicitly rejects the preview attributed to commit `6b7cf26b86fd4eaa1a88baad1c1d20efd2d5c9c8` as the old broken storefront. Do NOT treat that commit as the approved visual baseline, and do not repeat the previous assumption that it is the working source checkpoint.
- Owner confirms the original approved working version is the reference: https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- GitHub PR #54's Cloudflare Pages bot records that URL as a successful Pages preview for commit `1a76108c7415ade3bab07461ac27af16ce2fa8f8`; branch preview: https://review-staging-ui-verificati-hog1.get-wired-autoworx-store.pages.dev
- PR #62's separate recovery preview is https://b9d0ca19.get-wired-autoworx-store.pages.dev/store, for head `55c36171bd8fe0a0ccb4ddcba3e1ecfb6604590b`. Do not assume this matches the owner-approved version.

## Repository evidence that distinguishes the versions
- Commit `6b7cf26b86fd4eaa1a88baad1c1d20efd2d5c9c8` has a documentation-only diff; it does not itself contain a storefront code change. Its deployed tree inherited the then-current `main` storefront files.
- `index-new.html` blob at `main`: `589e5ba3caeaa709b22b92493c5d6271b72b503d` (102,711 characters).
- `index-new.html` blob at owner-approved preview commit `1a76108c7415ade3bab07461ac27af16ce2fa8f8`: `d274b0ffdaa0a1c45939933e308c4c65acb85554` (144,657 characters).
- This confirms the approved preview and current main tree do not have the same storefront HTML blob. The exact visual difference still needs browser access or owner-provided comparison evidence; do not claim visual parity from source hashes alone.
- Current `store.html` on main loads `index-new.html` in an iframe, so the `index-new.html` mismatch is directly relevant to the storefront.

## Current decision / next actions
1. Use the owner-approved preview URL above as the source of truth; disregard the rejected `6b7cf26` baseline.
2. Avoid another blind rebuild or broad CSS rewrite. Reconcile the approved PR #54 tree against main and restore the approved source as a controlled change, keeping the release isolated until the exact preview is confirmed.
3. The connected browser inspection tool reports both preview URLs as inaccessible, so it cannot independently confirm visual equivalence in this run. This is a tool limitation, not proof the owner-approved URL is broken.
4. Keep Axxess, production domain/DNS, Supabase data, checkout, payment settings, and production deployment unchanged until the relevant release gate and owner approval.
5. Continue with the existing storefront; do not create a replacement/demo store. Keep the distinct Shop Now, Part Search, and Request a Part controls and avoid the later mobile CSS that caused overlap.
6. Product/category admin CRUD, catalogue image coverage, current stock-state reconciliation, and final storefront/mobile acceptance remain outstanding. Do not claim these are complete.

## Status
- Confirmed: owner-approved preview URL and its Cloudflare Pages commit association from PR #54 bot comment.
- Confirmed: approved preview's `index-new.html` blob differs from `main`; the rejected commit is documentation-only.
- Not verified: live visual comparison; browser inspection returned URL-inaccessible for both previews.
- No storefront code, branch refs, PR state, production deployment, Axxess files, DNS, Supabase data, checkout or payment configuration changed by this handover entry.
- Next task: prepare a single controlled source-restoration change from the approved PR #54 tree, then verify that exact preview before promoting anything to production.
