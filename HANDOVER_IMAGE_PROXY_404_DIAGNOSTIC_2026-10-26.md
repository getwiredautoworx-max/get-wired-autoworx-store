# Get Wired AutoWorx — Image Proxy 404 Diagnostic Follow-up

**Date:** 2026-10-26 (SAST)  
**Scope:** Read-only source and audit inspection. No production writes, image changes, deployment, reruns, Axxess/DNS/payment changes, or Cloudflare/Netlify credit use.

## Verified findings

- The failed Catalogue Image Audit (run [40288619507](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40288619507), attempt 3, job `121609906245`) reported HTTP 404 for `GW-D44F3E5F`. Do not rerun the same check without changing the test design.
- `staging/CATEGORY_OUTSIDE_HIERARCHY_CANDIDATES_2026-10-14.csv` identifies `GW-D44F3E5F` as “3/4\" Zinc Plated Welsh Plug”, current category “Spare Parts”, disposition `QUARANTINE_OUT_OF_SCOPE`, approval `NOT_APPROVED — READ ONLY CANDIDATE`. This is a taxonomy-review candidate, not authorization to change the live product or image.
- `supabase/functions/product-image/index.ts` returns 404 if the requested public SKU does not resolve to an active product; it also returns 404 when no exact public-SKU WebP succeeds and the private supplier-code mapping or matching legacy JPG cannot be resolved. Therefore the 404 alone does not identify which condition occurred.
- `.github/workflows/catalogue-image-audit.yml` hard-codes four SKU proxy smoke probes, including `GW-D44F3E5F`. Its broad audit checks URL shape and public WebP filenames, but that does not prove each legacy supplier mapping is valid. The current workflow fails at a probe SKU and therefore does not distinguish proxy health from a missing per-product image.
- Source inspection does **not** establish whether the failure is an inactive/missing product, missing private mapping, missing upstream image, or transient upstream failure. No database query or function-log evidence was collected in this follow-up.

## Next safe action

Inspect read-only product status, private supplier mapping existence, exact public WebP filename, and edge-function logs for the failing SKU using authorized project access. Then revise the audit on an isolated branch so endpoint health is tested separately from per-SKU image availability, with explicit classification rather than repeated retries. Do not change the catalogue, substitute an image, deploy, or modify production settings without owner approval.

## Result

Source-level diagnosis narrowed the possible 404 causes and found that the failing probe is also an unapproved/out-of-scope taxonomy candidate. Root cause remains unconfirmed. Customer launch remains HOLD.
