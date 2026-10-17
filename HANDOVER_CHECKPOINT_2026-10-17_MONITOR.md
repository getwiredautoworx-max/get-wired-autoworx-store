# Get Wired AutoWorx — Handover Checkpoint
Date: 2026-10-17 (South Africa)

## PERMANENT USER INSTRUCTIONS — 8 LOCKED RULES
1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**

## 2026-10-17 15:26 SAST — task start
- Read AI_HANDOVER_PERMANENT.md and latest available HANDOVER_UPDATE_2026-10-14_QA_AUTOMATION.md. No HANDOVER_CHECKPOINT_*.md exists on main.
- Starting main commit: dbee407e513b57e50c93db18cbc97b9e18e617c6. Current task branch: docs/monitor-handover-2026-10-17-monitor. Draft PR #45 remains open but unmerged.
- In progress: inspect actual latest attempts/conclusions for staging category-navigation Chromium acceptance, buyer-guide extraction, ASC Exact-SKU Image Sync, storefront smoke/production QA, GitHub Pages and Cloudflare workflows; inspect failed job logs and retry only safe failed staging jobs when supported.
- Guardrails: no production/deploy reruns, live-data writes, Axxess upload, DNS/payment credential changes, or Cloudflare/Netlify credit usage without owner approval. Preserve eight approved roots and pricing rules; 107 October price rows need no writes; 198 category rows remain manual review; do not restart catalogue or auto-move products.
- No production, database, DNS, payment, hosting or storefront files changed at task start.
