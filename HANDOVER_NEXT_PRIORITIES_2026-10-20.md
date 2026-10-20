# Get Wired AutoWorx — Handover Addendum

Date: 2026-10-20 (SAST)
Purpose: continuation priorities; this addendum supplements HANDOVER_CURRENT.md.

## Ordered next tasks
1. Harden the read-only Accessories Spares Centre (ASC) audit against intermittent API timeouts. Add bounded retries/backoff, polite request pacing, explicit timeouts, pagination/JSON validation, and clear completion state. Resume/checkpoint only if it can be made safe and reproducible. A partial crawl must never be reported as a full inventory.
2. Produce a trustworthy review ledger (CSV + JSON summary + SQL proposal only). Include audit timestamp, crawl completion/page counts, supplier SKU/URL/status/quantity exactly as returned, store product ID/SKU/name, exact-SKU match result, duplicates/missing matches, identity-review result, evidence and proposed action. Distinguish unavailable stock fields from zero/out-of-stock. If the crawl is incomplete, do not generate an actionable patch proposal. SQL updates must remain commented out pending manual review and explicit owner approval.
3. Complete secure owner stock/category management review in PR #67. Inspect the `veyron-admin` Edge Function for server-side role authorization, fail-closed unauthenticated/non-admin behavior, strict field allowlists, product/category ID validation and safe stock quantity validation. Add/run positive and negative tests. Client-side UI checks alone are insufficient. Keep PR draft/unmerged until security evidence is documented and owner approves deployment.
4. Test the owner app on the physical Hisense M72 Pro. Android emulator install/launch is not proof of physical-device acceptance. Required Edge Function review/deployment remains outstanding.
5. Test PR #68 category/subcategory navigation and grouped product lists in a browser. Verify PR #66 policy links and checkout flow without activating payment providers or placing a real order. Keep each change isolated from the approved storefront.
6. Update the primary handover after each meaningful result with commit/run links, test evidence, failure/blocker details and owner-only actions. Claim completion only when supported by evidence.

## Evidence and current blockers
- Historical last successful ASC baseline: 12,006 supplier products scanned; 4,187 active store products read; 526 exact-SKU cleanup candidates (158 discontinued-wording candidates and 368 out-of-stock signals); 152 identity-review flags. These counts are historical and must not be represented as current until a complete fresh crawl succeeds.
- ASC audit run 39415950064 failed on a 25-second read timeout against the public supplier Store API and generated no report artifact. This is not evidence of any specific product's stock/status.
- Review-only package/test run: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39416291962 . SQL proposal statements were commented out; no Supabase product updates were made.
- Owner catalogue app emulator evidence: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39415638473 . Debug APK is approximately 24 KB. Physical Hisense M72 Pro testing and `veyron-admin` security review/deployment remain outstanding.
- Category source checks: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/39415358544 . PR #68 remains draft/unmerged and browser navigation is not yet verified. PR #66 checkout policy links and PR #67 owner manager remain draft/unmerged.

## Release guardrails
- Approved preview: https://e245f05c.get-wired-autoworx-store.pages.dev/store
- Original owner-approved reference: https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- Do not merge draft PRs, promote production, upload to Axxess, change DNS, write Supabase data/schema, apply catalogue cleanup, activate payments, or place real orders without explicit owner approval for that action.
- Customer launch status: HOLD. Do not replace either approved preview/reference with a divergent build.
