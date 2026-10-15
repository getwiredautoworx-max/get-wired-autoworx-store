# 08. Source-of-Truth Register

A claim is not verified merely because an agent or workflow reports success. Check the artifact at the exact remote commit.

| Area | Required evidence | Current handling |
|---|---|---|
| Code and documentation | Exact GitHub branch, SHA, and file contents | Verify remote commit before acceptance |
| Store release | Release-gate run and read-only desktop/mobile checks on the exact candidate | Customer launch HOLD |
| DNS and SSL | Current Axxess DNS/SSL evidence and external checks | Unresolved; do not change DNS without evidence |
| Catalogue and prices | Supplier source, SKU/part match, current price confirmation, review status | Candidate rows remain staging/review-only |
| Price formula | Confirmed supplier cost excluding VAT and approved calculation | round(cost × 1.15 × 1.35, 2); historical costs are not current price evidence |
| Images | Exact-SKU match and usage-rights evidence | Unverified images remain unpublished |
| Payments | Provider approval and successful authorized test | Do not claim PayFast/PayJustNow are active without proof |
| Customer policies | Current published pages and owner/legal review where needed | Reconcile contradictions before launch |
| Database changes | Reviewed migration, backup/rollback plan, staging test, explicit authorization | No production SQL/data writes without approval |

## Coordination protocol
1. Read HANDOVER_CURRENT.md before starting.
2. Claim a bounded task and define evidence expected.
3. Work on the existing relevant feature branch; avoid duplicate PRs and simultaneous edits to the same file.
4. Record exact commit/run URLs, counts, pass/fail, blockers, and next action.
5. Verify remote artifacts before marking complete.
6. Do not merge, deploy, upload to Axxess, modify DNS/payment settings, or write production data while release HOLD remains active.
