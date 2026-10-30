# Get Wired AutoWorx — Monitor Run 16 / Task Start

**Date:** 30 October 2026, 15:38 SAST  
**Repository:** `getwiredautoworx-max/get-wired-autoworx-store`  
**Starting refs read:**
- `AI_HANDOVER_PERMANENT.md` blob `018c1972efa6cecbeea50e26a2cf3475b532d31b`.
- `HANDOVER_CURRENT.md` blob `664e11718befaa4baa4bfae45d53b53e0f1ad811`.
- Latest dated update `HANDOVER_UPDATE_2026-10-30_MONITOR_RUN_14.md` blob `56d9643d1dfd4a3ca0e3920a465fb914ec7c857b`. The main tree returned no `HANDOVER_CHECKPOINT_*.md` files.
- Also read `AI_HANDOVER.md` blob `7e54af361ceb74e6bcf245f1cd2a68ae9fca20b7`.

## Task start and owner direction
- Continue owner-directed ASC exclusion plus Planetworld and Audio Connections Car Audio preview, with brand-logo buttons, exact-model image matching and evidence-based features/descriptions. Band Instruments must remain a separate top-level/button route, never mixed into Car Audio.
- Latest handover says the exact owner-directed ASC reset already zeroed 36 matched ledger SKUs / 7,037 units, with 0 positive stock remaining in that ledger; a preview scan showed 34 ASC rows at zero. This run must verify current source/preview state, not repeat or broaden the reset. Preserve 11 retained legacy `IASC-` image sources and the 4,101 WebP cache assets.
- Current preview work: PR #135 draft, head `4f633c11c765d32e209c2f7444301c0786b5294b`, integrates 68 manufacturer-verified Planetworld candidate rows in the main store preview, all with neutral placeholders because all 68 image approvals are NOT_APPROVED. Seven exact-model image assets exist in earlier PR #130/#129 work (3 Alpine, 2 Audison, 2 Kicker), but the new 68-row section still uses placeholders pending approval. Planetworld source stock is the 25-Oct snapshot and must not be represented as live availability.
- Audio Connections has 13 Sony Mobile ES candidates in the current handover; their internal staging publication status and category mapping need reconciliation. Owner's authorised-dealer status is already confirmed; do not ask for proof again. Band instruments are separate.
- Monitor workflows: staging category navigation, buyer-guide extraction, ASC Exact-SKU Image Sync, storefront smoke/production QA, Pages/Cloudflare. Use exact run IDs and latest attempts; rerun only safe failed/cancelled staging jobs where job-only rerun is supported. Do not rerun production-linked Workers or live-site QA.
- Safety: no production/live Supabase writes, no Axxess upload, DNS/payment changes, PR merge, public stock/price/product/image publication, or Cloudflare/Netlify release credits without applicable explicit approval. Preserve eight roots, 107-row no-write price audit, and 198-row manual category review.

## Current execution plan
1. Verify latest PR #135/#134/#130 heads and workflow attempts; check the exact preview deployment and existing browser/package failures.
2. Verify the ASC exclusion from the current populated preview and exact source ledger, without repeating the 36-SKU reset.
3. Inspect Planetworld 68-row source and exact manufacturer crosswalk; reconcile Audio Connections 13 candidates using exact model numbers and existing source evidence. Keep image status/approval explicit; do not substitute lookalikes.
4. Inspect storefront implementation and test evidence for brand buttons/logos and separate Band Instruments route. Make a review-only change only if the exact source and safe branch mechanism are available.
5. Record every material result, run/commit IDs, counts, failures, rerun decision and next action in this update and the permanent handover where a safe GitHub write is available.

## Permanent owner rules
1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**
