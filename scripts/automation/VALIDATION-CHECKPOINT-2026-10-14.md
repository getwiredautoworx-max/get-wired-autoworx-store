# Runner validation checkpoint — 2026-10-14

Branch: `automation/dependency-aware-runner`

- Reviewed actual staged JSON on `audit/buyer-guide-extraction`: hierarchy uses `roots`; grouping rules use `groups`. Fixed the runner's schema keys.
- Fixed retry accounting so each invocation retries a failed deterministic check at most twice, while recording cumulative attempts separately. Future scheduled runs can retry again after an external/transient issue is corrected.
- The runner branch is based on `main`, while the staging JSON files were found on `audit/buyer-guide-extraction`; taxonomy validation will report missing files until evidence files are brought across deliberately.
- No successful Actions run/artifact could be verified with the available GitHub actions connector in this session. End-to-end validation remains pending.
- No merge, production deployment, live catalogue import, Supabase write, Axxess, DNS, or payment changes.

Next: add a reviewed copy of the required staging JSON files to the runner branch; add tests for dependency ordering, state restore, retries and approval holds; verify an actual Actions run in GitHub. Keep production untouched.


## Follow-up — live Actions verification

- Draft PR: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/15 (still unmerged).
- Successful runner workflow: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38548278162
- Syntax/regression tests and bounded task execution passed. The second workflow invocation restored cache key `task-runner-state-38548207996`, retaining prior task state/attempt totals.
- Successful report artifact from the preceding run: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38548002385/artifacts/11885735904. The report path was corrected to a visible filename because GitHub excludes hidden files from artifacts by default.
- Existing controller source and scheduled workflow were found and statically checked. Retry policy remains one retry within six hours for allowlisted QA/audit/packaging only; image sync, category writes and deployment are excluded.
- Further fixes committed: actual hierarchy/grouping keys (`roots`/`groups`), retry-per-run with cumulative accounting, testable CLI argument parsing, controller syntax/policy check, and dependency-aware approval status so release cannot appear ready while upstream approvals are blocked.
- A new run for latest dependency-status fix is pending verification. The schedule will not be active from the default branch until the draft PR is approved/merged; do not merge without owner review.
- Still blocked: catalogue original-page visual verification, exact-SKU/price reconciliation, browser/mobile QA, and live controller API token/permissions outcome verification. No production, Supabase, Axxess, payment or live catalogue changes.


## Latest final validation — 2026-10-14 10:17 UTC

- Latest workflow run for the dependency-status fix completed successfully: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38548438163
- Syntax/regression tests: PASS. Bounded runner execution: PASS. State cache save: PASS. JSON report artifact upload: PASS.
- Report artifact: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/38548438163/artifacts/11885940538 (expires 2026-11-13).
- Verified task states in the latest log: `repo_safety=passed`, `staging_taxonomy=passed` (8 roots / 17 proposed rules), `controller_presence=passed` (source syntax and safe retry allowlist verified), `catalogue_source_qa=blocked_approval`, `browser_qa=blocked_approval`, `release=blocked_dependency`. This is the intended safe stop, not a failed run.
- Prior-run state cache restore was observed in run 38548278162; state timestamps/attempt totals persisted into later invocations.
- The draft PR remains unmerged. The scheduled 30-minute workflow is therefore not yet enabled on the default branch; branch-triggered runs are proven. Do not merge without owner review.
- Controller runtime token/permission and its own scheduled monitor artifacts remain a separate operational check. Catalogue visual evidence, exact-SKU/price reconciliation and storefront browser/mobile QA remain held for evidence; production catalogue is untouched.
