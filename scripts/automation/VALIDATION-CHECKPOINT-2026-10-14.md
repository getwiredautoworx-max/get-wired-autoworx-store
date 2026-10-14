# Runner validation checkpoint — 2026-10-14

Branch: `automation/dependency-aware-runner`

- Reviewed actual staged JSON on `audit/buyer-guide-extraction`: hierarchy uses `roots`; grouping rules use `groups`. Fixed the runner's schema keys.
- Fixed retry accounting so each invocation retries a failed deterministic check at most twice, while recording cumulative attempts separately. Future scheduled runs can retry again after an external/transient issue is corrected.
- The runner branch is based on `main`, while the staging JSON files were found on `audit/buyer-guide-extraction`; taxonomy validation will report missing files until evidence files are brought across deliberately.
- No successful Actions run/artifact could be verified with the available GitHub actions connector in this session. End-to-end validation remains pending.
- No merge, production deployment, live catalogue import, Supabase write, Axxess, DNS, or payment changes.

Next: add a reviewed copy of the required staging JSON files to the runner branch; add tests for dependency ordering, state restore, retries and approval holds; verify an actual Actions run in GitHub. Keep production untouched.
