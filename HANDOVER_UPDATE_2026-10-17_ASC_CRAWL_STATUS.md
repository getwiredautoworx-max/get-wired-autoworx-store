# Handover Update — 2026-10-17 — ASC crawl status and staging gates

## Confirmed this session
- Read `HANDOVER_CURRENT.md` from the repository and reviewed PRs #44, #47, #48 and #49.
- The live Axxess store was not modified. No production Supabase writes, SQL execution, merge, deployment, DNS changes or payment changes were performed.
- Browser QA run [39011067220](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39011067220) completed successfully for its tested staging candidate. It does not establish that PR #44's exact head commit or PR #47's exact head commit has passed equivalent browser/render testing.
- ASC cleanup safety tests run [39018451764](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39018451764) passed.
- The attempted full ASC crawl run [39017530629](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39017530629) ended `cancelled`.
- Inspected artifact `asc-catalogue-readonly-39017684138` from successful run [39017684138](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39017684138). The summary explicitly reports `complete=false`, 1 of 334 expected pages attempted, 36 product rows, 36 unique supplier SKUs and 3 status candidates, all three enriched from detail pages. Therefore this artifact is a one-page validation sample, not an exhaustive supplier catalogue reconciliation.
- The sample identified RSL1001B with a “DISCONTINUING” title and OUT_OF_STOCK status; TR413C and TR414C were OUT_OF_STOCK on the sample page. These are supplier-side review candidates only, not permission to deactivate store products. Match by exact supplier SKU and recheck supplier status before any change.
- PR #48 documents five exact-SKU discontinued candidates for review: AES-1115-16B, F1-035, F9-001-56, T3-8CS and WG-007. Its own notes say no store records have been deactivated and supplier pages must be rechecked. Do not combine the sample-page candidates with that five-item set without a fresh exact-SKU store reconciliation.

## Current staging references
- PR #44 — [Match storefront to supplied 3×3 category mockup](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/44), head `7980cbc372cb9f9de9263f6e7480c8ce815e4144`. Draft; not merged. It contains the requested lighter reference layout, compact hero, image-led category cards and nine homepage category IDs including 4x4. Exact-head browser screenshot/interaction QA and pixel-level comparison remain unproven.
- PR #47 — [Make vehicle finder optional for non-fitment categories](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/47), head `37b376f399f1dec7559e6fe444c0527d146af8e5`. Draft; source-string checks passed, but exact-head browser QA remains open.
- PR #48 — [Review ASC discontinued product cleanup candidates](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/48), head `d6253e49a04943a4a5c292bec12deb35be64f997`. Review-only patch; do not execute or merge without current source confirmation and owner review.
- PR #49 — [Add read-only ASC catalogue cleanup and reconciliation pipeline](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/49), head `abe49a50bfc3268d28db1a5c921c58b6d1b9a444`. The successful crawl run is not complete; the exhaustive run was cancelled. Treat full reconciliation as OPEN.

## Next actions — avoid circular reruns
1. Fix the crawl runner's pacing/resume behavior and launch a genuinely complete, respectful crawl across all 334 expected pages, subject to the supplier site's published access policy. Do not call it complete unless the report says `complete=true` and records expected vs attempted/failed pages, unique SKU count and artifact integrity.
2. Once complete, run exact normalized supplier-SKU comparison against all active store products. Keep current stockouts separate from explicit discontinuation flags; classify stockouts as temporary review, not automatic deactivation.
3. Validate the generated review CSV and SQL generator with the existing tests. SQL must remain review-only/rollback-by-default and must not be executed automatically.
4. Run browser/render QA against the exact heads of PR #44 and PR #47, including desktop, 390px and 320px, navigation, part search/request, optional vehicle finder, cart and checkout UI without a real order. Attach screenshots and reports.
5. Keep PRs unmerged and keep Axxess, production data, DNS, payment configuration and external hosting unchanged until the release gates and owner approval are satisfied.

## Release status
**HOLD — not customer-launch-ready.** This update records verified status and does not authorize a production change.


## Immediate fix applied — 2026-10-17 09:06 UTC
- Root cause found: the crawl workflow included a push-triggered step that explicitly cancelled previously hard-coded crawl run IDs. This made the long crawl vulnerable to being interrupted by subsequent workflow edits.
- Removed that cancellation step from `.github/workflows/asc-full-catalogue-crawl.yml` and narrowed missing-SKU detail-page enrichment in `scripts/crawl_asc_catalogue.py` to explicit discontinuation-text candidates only. Ordinary out-of-stock candidates no longer trigger a detail request each, which reduces request volume while keeping stockout items review-only.
- Added progress logging every 10 pages.
- Fix commit: `c6b8f9a741f174daf53048e8366e6b962c3795cd` (workflow) includes prior script commit `3a0f97dd0bfddad4c6d06fb992afdf59a1b0a003`.
- A new full crawl automatically started: [run 39019868237](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39019868237). At the time of this update it is `in_progress`; no exhaustive results are yet verified. Do not claim resolved until the artifact reports `complete=true`, zero failed listing pages and a sensible unique-SKU count.
- No store product has been deactivated and no production service was changed.
