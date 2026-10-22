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
