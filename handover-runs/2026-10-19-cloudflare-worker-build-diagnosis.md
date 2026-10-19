# Get Wired AutoWorx — Cloudflare Worker Build Failure Diagnosis
Date: 2026-10-19 (South Africa)

## Evidence and root cause
- User supplied failed Cloudflare build log from 2026-10-19 17:27 UTC.
- Configured deploy command is `npx wrangler deploy`.
- Wrangler explicitly warns it is being run on a Pages project and says `wrangler pages deploy` should be used; it then fails with `Missing entry-point to Worker script or to assets directory`.
- Repository `wrangler.toml` contains:
  `name = "get-wired-autoworx-store"`
  `pages_build_output_dir = "."`
  `compatibility_date = "2026-10-06"`
  This is Pages output configuration, not a Worker script entry point or Worker assets configuration.
- Existing `.github/workflows/cloudflare-pages-deploy.yml` uses `wrangler pages deploy . --project-name=get-wired-autoworx-store --branch=main`, confirming a distinct Pages deployment route exists.
- Previous handover identifies the Worker preview hostname as `get-wired-autoworx-store.getwiredautoworx.workers.dev` and the separate Pages hostname as `get-wired-autoworx-store.pages.dev`.
- Cloudflare Worker dashboard reports static-assets-only limitations (no runtime variables/bindings/triggers). No Worker-specific source entry point has been identified.

## Diagnosis
The failing Worker Git build is invoking the generic Worker deploy command against a repository configured for a static Pages site. No evidence currently indicates that a separate Worker is required for the storefront. The static storefront is deployed through Cloudflare Pages separately.

## Next action — owner dashboard click required
On the exact Worker dashboard page currently open:
1. Under **Builds**, enable/check **Disable builds** for this Worker only.
2. Save the change using the page's **Save changes** control.
3. Do not delete the Worker.
4. Do not change the separate Pages project, its deployment settings, repository workflow, DNS, Axxess, payments, or catalogue.
5. Then open the separate Pages project at `https://dash.cloudflare.com/` → Workers & Pages → `get-wired-autoworx-store.pages.dev` and confirm its latest deployment status / visit `https://get-wired-autoworx-store.pages.dev`.

## Status / guardrails
- Diagnosis: **CONFIRMED from log and repository configuration**.
- Worker build integration disablement: **PENDING owner action**; assistant has no connected Cloudflare dashboard write action.
- Worker preview: **not yet verified working**. Disabling this redundant build integration stops the failing Worker build; it does not make the `.workers.dev` hostname a working storefront.
- Pages storefront: keep untouched during this action.
- Production/Axxess/DNS/payment/catalogue: no changes made.
- Customer launch: **HOLD** until the Pages preview and required storefront checks are verified.

## Verification evidence
- Failed command: `npx wrangler deploy`
- Error: `Missing entry-point to Worker script or to assets directory`
- Wrangler warning: `You have run wrangler deploy on a Pages project, wrangler pages deploy should be used instead.`
- Repository Pages workflow: `.github/workflows/cloudflare-pages-deploy.yml`
- Repository config: `wrangler.toml`
