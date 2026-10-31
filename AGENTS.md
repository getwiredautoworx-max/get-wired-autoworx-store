# Mandatory Agent Entry Point — Get Wired AutoWorx

**STOP: do not start implementation, analysis, testing or planning until you have completed this entry sequence.**

## Required startup sequence
1. Read this `AGENTS.md` in full.
2. Read `HANDOVER_CURRENT.md` from the exact branch you are working on. Start with the latest dated entry, then consult earlier entries only for context needed by the active task.
3. Read `HANDOVER_EXECUTION_CONTROL_48H.md` and follow its active priority order and hard constraints.
4. Verify the current branch, HEAD SHA, main comparison and relevant PR/preview status from GitHub. Do not rely on stale SHAs or status copied from an earlier session.
5. Identify the first unfinished action in the latest handover checkpoint. Execute it. Do not send the owner a plan in place of doing the work.

## Non-negotiable continuation rules
- The repository handover is the project memory. Never ask the owner to repeat requirements already recorded there.
- Do not restart completed tasks or repeat verified audits unless source, branch, test evidence or requirements changed. If repetition is necessary, state the changed evidence and reason in the handover.
- Do not substitute progress narration for implementation. Keep owner updates brief; send them only for significant verified progress, a genuine owner dependency, or a material safety decision.
- After every material success, failure, blocker or task switch, update `HANDOVER_CURRENT.md` in the same session with exact branch/SHA, files, action, evidence, verification level, remaining gap and next single action.
- Distinguish source inspection from executed tests, build/package checks, hosted CI, exact-head preview verification and desktop/mobile device acceptance. Never overstate evidence.
- Investigate no-cost and no-allocation alternatives before declaring a blocker. Do not repeat blind retries.
- Never merge, force-push, deploy production, alter Axxess/DNS, enable payments, write to Supabase, change live stock/prices/catalogue, or activate suppliers without the owner's explicit approval.
- ASC remains a separate supplier task. Existing stock is test data only. Planetworld 25-Oct-2026 data is a dated snapshot, not live stock/pricing.
- Do not claim readiness or completion without exact evidence. The active candidate remains unapproved until the handover's acceptance gates are met.

## Session closeout
Before ending, update the handover and leave one precise resume instruction naming the file/test/command/repository operation, prerequisites, and expected evidence. A future agent must be able to resume without retraining the owner.

**If you cannot access or read these files, do not improvise or restart. Report the access failure clearly and request the missing repository access.**
