# Get Wired AutoWorx — Continuation Checkpoint
**Date:** 2026-10-26 (SAST)  
**Resume point:** intermittent product-image proxy 404 investigation.

## Confirmed state
- Read the preceding image-proxy sections in `HANDOVER_CURRENT.md` before acting.
- Existing source inspection recorded earlier confirms `assets/products/WP3_4.jpg` and `assets/products_webp/GW-D44F3E5F.webp` exist on GitHub `main`; deployed `product-image` Edge Function version 11 matches the inspected source/fallback logic. A later code-search miss for binary assets is inconclusive, not proof of absence.
- Read-only Supabase inspection found both probe products active and mapped: `GW-D44F3E5F` → `WP3/4`; `GW-026C7F71` → `GF-239/240`. Edge logs show alternating HTTP 200/404 responses. Root cause is not proven; function-level logs do not expose the failing branch.
- The smoke probes mix per-product image availability with endpoint health. Both products are also flagged as unapproved taxonomy candidates. Do not alter their catalogue data/categories.

## Next actions
1. Re-open `supabase/functions/product-image/index.ts`, `.github/workflows/catalogue-image-audit.yml`, and the relevant repository tree on `main`; inspect both exact public WebP and legacy JPG assets plus existing tests. Do not retry the production audit.
2. Create an isolated branch and add staging/local tests for SKU parsing, slash-to-underscore path normalisation, exact public WebP resolution, legacy fallback, and explicit failure classification. Fixtures must be local; no production calls/data changes.
3. If improving diagnostics, prepare a review-only patch that logs safe branch outcome/status/timing without supplier secrets, signed URLs, customer IPs, or credentials. Do not deploy; any production Edge Function change needs explicit owner approval.
4. Run only local/unit checks; record actual pass/fail output and exact branch/commit. Inspect the diff and update this checkpoint after results or blockers.

## Guardrails
- No product, stock, supplier mapping, image, secret, Supabase production setting, Axxess/DNS, checkout/payment, or live deployment changes without explicit owner approval.
- No blind retry loops or unnecessary Cloudflare/Netlify builds/credits.
- Customer launch remains **HOLD** until release checks pass and the owner approves. Preserve the currently accepted store build as baseline.
- Do not claim a fix, preview, or deployment is ready unless verified.
