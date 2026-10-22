# Get Wired AutoWorx — Continuation Handover Supplement
Date: 2026-10-22 (South Africa)

This supplement records the latest continuation point. Read this alongside `HANDOVER_CURRENT.md`; it does not replace the main handover.

## 1. Latest owner request: Planetworld dealer pricelist
- Owner shared https://dealer.planetworld.co.za/brands/hertz and asked how Planetworld can help the store.
- Working assumption confirmed by owner: Planetworld has no API and sells to physical shops/dealers; dealers place orders online and Planetworld delivers. A dealer-download pricelist is available.
- Owner cannot upload more attachments in ChatGPT at present. Do not ask them to re-upload the file here or claim its contents have been inspected.
- Next path when the file can be accessed: owner downloads the dealer pricelist locally and places it in the GitHub repository using GitHub's web upload (prefer a private/restricted branch or private repo if the pricelist is confidential; check supplier terms before committing). Alternatively, paste a small sample of column headers and 5–10 rows into Gemini or a repository-side analysis workflow. Do not expose dealer-only prices publicly.
- Analyse the file as a supplier source, not an API: identify file type, sheets/columns, SKU/brand, description, dealer cost, VAT basis, RRP if present, stock/status, discontinued flags, and image/product references. Build a read-only mapping report and staged delta CSV first. Match exact SKU/brand before fuzzy description; flag ambiguous rows for review. Apply store pricing only after confirming cost excludes VAT and current pricing policy; do not import or update live stock/prices automatically.
- Operational advantage: maintain a repeatable local/GitHub pricelist snapshot and diff each new download against the prior snapshot; highlight new, changed-price, discontinued, unavailable and unmatched products. Dealer web ordering remains manual unless Planetworld later provides an authorised integration/export process. No scraping around login controls, no guessed API, and no automated order submission.

## 2. AI picture-search rate limit — no-cost phased plan
- Previous deployed part-image-search request returned HTTP 429 on 2026-10-22. Available evidence did not distinguish provider quota exhaustion from request-rate throttling. Do not claim the cause is proven.
- Owner instructed: proceed one phase at a time; do not advance until the current phase is fully resolved, tested, and working.
- Phase 1 (next): inspect current function and logs, identify provider and exact response headers/body without logging secrets or user image data; establish whether 429 means per-minute throttling or exhausted/free-tier quota. Add bounded error handling and a clear user-facing fallback; no repeated retries that consume quota. Test with mocked 429, timeout, invalid input and success responses. Do not proceed to Phase 2 until tests pass.
- Phase 2 (only after Phase 1 passes): reduce provider calls through client-side image resizing/compression, request-size limits, duplicate-request suppression, short-lived caching where privacy-safe, and strict rate limits. Verify that no credentials are exposed in browser code.
- Phase 3 (only after Phase 2 passes): implement a zero-cost fallback that does not require a generative-image API—for example, local image matching against an approved product-image index using perceptual hashes/embeddings only if the chosen library and hosting costs are genuinely zero. If no reliable free inference path exists, retain keyword/SKU search and manual Request a Part as the fallback rather than promise free AI inference.
- Each phase must have tests and recorded evidence before the next starts. No production data changes or unrelated storefront edits.

## 3. Storefront / Part Search checkpoint
- Repository: https://github.com/getwiredautoworx-max/get-wired-autoworx-store
- PR #78, “Fix early Part Search and Request a Part startup race”: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/78
- PR intent: establish stable early click handlers, queue clicks during async startup, replay once modal/catalogue handlers are ready, and test immediate clicks before catalogue load. Current check found the PR still listed; this check did not establish a completed passing workflow result. Do not merge or claim fixed until the exact PR head's required CI results pass.
- Owner confirmed root-to-www redirect works. Do not repeat DNS troubleshooting.
- Axxess hosted files previously differed from current GitHub source. Do not upload a package without explicit owner approval, a verified backup, and a package built from the exact validated commit. Retest live Part Search and Request a Part after any approved upload.

## 4. Android owner APK blocker
- Hisense M72 Pro (Android 13); owner computer is Windows 7 Professional 64-bit.
- install107 still fails on the physical phone with generic “App wasn't installed”. CI/emulator success is not physical-device acceptance.
- Current Windows ADB executable fails with missing `GetSystemTimePreciseAsFile` in `Kernel32.dll`; do not ask owner to repeat commands with that incompatible ADB.
- Stop speculative APK rebuilds, package-ID rotation, APK-size inflation and blind re-signing. Obtain the actual Package Manager failure reason through a trustworthy Windows-7-compatible diagnostic path or a reputable on-device installer/log diagnostic. No untrusted executable mirrors.
- Do not alter production storefront, Axxess, DNS, Supabase, catalogue, payments, or launch settings to solve APK installation.

## 5. Global release constraints
- Customer launch remains **HOLD**.
- PayFast/PayJustNow remain deferred.
- Supplier catalogue/stock changes remain staged/read-only until the owner authorises the supplier data workflow and exact reconciliation is complete.
- PR #67 owner/admin management remains draft/unmerged pending security negative tests and mutation/audit integrity work.
- Never claim “completed” without test evidence. Update this supplement or the main handover after each material phase result; do not repeat already-failed diagnostics or work in circles.


## 6. AI picture-search Phase 1 — log diagnosis and draft fix (2026-10-22)
- Read-only Supabase logs for request at 2026-10-22 12:49:17 UTC conclusively show OpenAI returned HTTP 429 with `type: insufficient_quota`, `code: credit_balance_exhausted`, and message that no credits remain. This is exhausted API credit balance, not merely a per-minute throttle.
- Function log execution/request correlation: function `part-image-search`, deployment version 2, request ID `01a163a8-8b63-770e-ac6f-2868cb994669`. Do not publish API keys or raw customer images.
- Draft PR #85: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/85
- Branch: `fix/part-image-search-quota-errors`; head `d102513524fd5c9097f89e9a1cdc0744a3c09ab8`.
- Changes in draft: detect `insufficient_quota` / `credit_balance_exhausted`, return a clear no-credit message directing customers to Part Search or Request a Part, keep transient rate limiting distinct, avoid logging the raw provider response body, and add regression assertions plus a focused Actions workflow.
- Current status: PR open, draft, unmerged. The GitHub workflow-run lookup returned no run record for this head at the time checked; therefore CI is **not yet verified**. The static assertions have not been accepted as a substitute for a passing CI run or live behavior test.
- Phase 1 acceptance remains OPEN. Next: ensure regression test executes in CI, inspect actual pass output, review UI fallback text/behavior, and only then mark Phase 1 complete. Do not start Phase 2 or deploy the function before those checks pass.
- No Supabase deployment, billing change, production storefront change, catalogue write, or repeat AI request was performed.


## 7. AI picture-search Phase 1 — CI result (2026-10-22, latest check)
- GitHub Actions run `39825203734`, workflow `Part Image Search Quota Regression`, run #1: **completed / success**. Job `quota-regression` and step `Test exhausted-credit and rate-limit handling` both completed successfully.
- The workflow's seven source-content regression assertions passed: quota-code recognition, customer-facing no-credit message, separate transient 429 message, Part Search/Request a Part fallback, logging status/code without raw provider body, and no raw-body logging pattern.
- Important test-scope limit: this workflow currently verifies source patterns, not a simulated invocation of the edge handler, not browser UI behavior, and not a live successful image search. It does not by itself prove Phase 1 fully resolved.
- PR #85 remains draft and unmerged: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/85. Its branch code is not deployed to Supabase; production function on `main` still has the older generic 429 message and logs a truncated raw upstream response body. Do not imply the customer-facing production behavior has changed.
- A separate `Storefront Smoke Test` workflow run #977 (run ID `39825203452`) was still in progress when checked; it is not the quota regression test and must not be conflated with it.
- Phase 1 remains **OPEN / partially verified**. Next work: strengthen tests to exercise an isolated error-mapping function with mocked quota and transient-rate-limit responses, verify the storefront displays the fallback without repeated retries, inspect the smoke-test result if relevant, and update the PR/handover with evidence. Do not deploy or start Phase 2 until all acceptance checks pass.


## 8. AI picture-search Phase 1 — behavioral mapper tests added and passed
- Refactored the PR branch to isolate provider error mapping in `supabase/functions/part-image-search/provider-error.js`, imported by `index.ts`.
- Replaced source-only quota assertions with behavioral Node tests that invoke the actual mapper for: exhausted credit balance, `insufficient_quota` type, transient rate-limit 429, malformed provider body, authentication failure, and other provider errors. Integration assertions also check that the edge handler uses the mapper and logs only status/code.
- GitHub Actions run ID `39825992864`, run #4 of `Part Image Search Quota Regression`: **completed / success**. Job `quota-regression` and test step `Test exhausted-credit and rate-limit handling` completed successfully.
- Latest test commit: `3fb539670df50ae20bac47d8ef23b0cd9774c1b4`. PR #85 remains draft and unmerged.
- Remaining Phase 1 acceptance items: verify the storefront UI surfaces the no-credit message correctly and does not auto-retry; inspect current PR diff/other relevant CI results; no live image-search success can be tested against OpenAI while its credit balance is exhausted. Do not deploy to production merely to test the error handler.
- Phase 1 status remains **OPEN / implementation and error-mapping CI verified; storefront integration acceptance outstanding**. Phase 2 remains blocked.


## 9. Frontend fallback source review (2026-10-22)
- Reviewed `index-new.html` on the PR branch. The picture-search handler performs one fetch per user click; there is no automatic retry loop. On a non-OK response it displays the returned `payload.error` in the AI status area, and its `finally` block re-enables the identify button. This supports a single clear error/fallback flow in source.
- This is a source review only, not a browser interaction test. The current AI modal and Request a Part modal have not yet been exercised in a browser with a simulated quota response. Do not mark frontend integration accepted until that test is recorded.
- At last check, Storefront Smoke Test run ID `39825992749` (run #980) remained in progress at the Chromium installation step; no result should be inferred.


## 6. Owner-requested Terms & Conditions change — 2026-10-22
- Owner requested: change the returns terms to state **no cash refund; provide credit against other purchases**.
- Updated on GitHub `main`:
  - `TERMS_AND_CONDITIONS.md` — discretionary/voluntary returns now offer store credit instead of cash; the existing 25% handling/restocking fee remains only where legally permitted.
  - `terms-and-conditions.html` — matching customer-facing Terms page language.
  - `returns-refunds.html` — matching customer-facing Returns & Refunds page language.
- Important legal guardrail: the no-cash/store-credit rule is explicitly limited to discretionary/voluntary returns. It does **not** override any cash refund or other remedy required by the South African Consumer Protection Act, ECTA, or other mandatory law. Statutory refunds/remedies must still be honoured where applicable. The 25% fee must not be applied where prohibited by law.
- Changes were written to GitHub `main`; this does **not** mean the Axxess/live domain has been updated or that production display has been verified. Do not deploy or upload to Axxess without owner approval.
- Verification still needed: inspect the final three files on GitHub, run relevant storefront/policy smoke checks if available, and later verify the published page only after an approved deployment. Recommend South African consumer-law review before treating this wording as final legal advice.


### Follow-up owner clarification — store-credit exclusions (2026-10-22)
- Owner specified that store credit must automatically exclude unrelated/ancillary costs, including delivery, packaging, courier charges and any other related or unrelated costs.
- Added matching wording to `TERMS_AND_CONDITIONS.md`, `terms-and-conditions.html`, and `returns-refunds.html`: discretionary store credit is calculated on the eligible product price only and excludes delivery, packaging, courier, shipping, installation, handling and any other ancillary, related or unrelated costs or charges.
- Legal safeguard retained: excluded charges must still be refunded/included if applicable South African law requires it. This is a GitHub source change only; live Axxess deployment remains untouched pending owner approval.

## CUSTOMER ACCESS, ACCOUNT LOGIN & TERMS ACCEPTANCE REQUIREMENT — 2026-10-22

Owner-approved target behaviour:
- On first storefront entry, show a clear blocking Terms & Conditions dialogue before the customer can enter the store. The customer must explicitly accept to continue; declining does not permit store access.
- After acceptance, customers may browse/search categories and products without creating an account or logging in.
- Add account registration, sign-in, sign-out and password-recovery flows. A customer must have a valid authenticated account to proceed with purchase/checkout. Preserve the cart across the login/registration interruption where possible.
- Use the existing Supabase Auth service; never store customer passwords in the storefront database or local storage. The frontend publishable key is not a substitute for server-side authentication.
- Record acceptance as durable evidence tied to the authenticated customer where available: terms document/version or content hash, accepted-at timestamp generated by the trusted server/database, user ID, and the exact acceptance action. Do not treat a localStorage flag or a logged-in session alone as proof of acceptance. Consider POPIA data minimisation before recording IP/device data.
- Re-prompt for acceptance whenever the terms version/hash changes. Link to the full Terms & Conditions and Returns & Refunds pages from the dialogue and checkout.
- Enforce the purchase gate in the server-side checkout function/RPC, not just by hiding or disabling buttons. The checkout endpoint currently reports verify_jwt=false and the current function code accepts order fields without validating a customer session or a stored terms acceptance. Treat that as a confirmed implementation gap to address in the isolated change.
- Link the authenticated Supabase user to the existing `public.customers.auth_user_id` relationship; preserve current price-verification and order validation gates. Review RLS and the order-creation RPC before any schema/function changes.
- Preserve South African statutory consumer rights. Acceptance must not waive rights that cannot lawfully be excluded.
- Work GitHub-first in an isolated branch/PR. Do not deploy the Edge Function, apply a production database migration, change Axxess/Cloudflare, or touch payment settings until implementation and automated tests pass and owner approval is obtained.

Initial inspection evidence:
- Storefront entry: `index.html` redirects to `store.html`; `store.html` embeds `index-new.html` in an iframe.
- Supabase project `ojytykqpvonxvepprgbh` has existing `public.customers.auth_user_id -> auth.users.id` foreign key, plus `customer_addresses.user_id -> auth.users.id`; customers and orders tables currently report zero rows.
- The deployed `store-checkout` Edge Function is ACTIVE at version 5 but has `verify_jwt=false`. Its current source validates product SKUs and verified prices, then calls `create_store_order_v2`; it does not currently authenticate the customer or verify a recorded current-terms acceptance before order creation.
- No customer-facing source, database schema, Edge Function, live hosting, DNS, payment configuration or production data was changed during this inspection.

Phased acceptance criteria (do not skip ahead):
1. Implement the Terms gate and browse-without-login UI in a GitHub-only branch; test first visit, accept/decline, mobile layout, and direct entry points.
2. Implement Supabase customer registration/login/session/recovery and preserve browsing/cart state; test registration, email verification behaviour, login/logout, invalid credentials and recovery using test accounts.
3. Implement durable versioned terms-acceptance evidence and secure RLS/server-side validation; test that missing, stale, and fabricated client-side acceptance are rejected.
4. Enforce authenticated-customer and current-terms checks in checkout server-side, keeping existing price gates; test unauthenticated, unaccepted, stale-terms and valid-session cases with mocked/intercepted order creation. Do not create real orders during QA.
5. Run full storefront and checkout regression checks against the exact branch head. Only then request approval for production migration/function deployment and a separately approved hosting update. Customer launch remains HOLD until the approved release is verified.
