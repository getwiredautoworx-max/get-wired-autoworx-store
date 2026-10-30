# Get Wired AutoWorx — Task Start / Monitor Run 17

**Started:** 2026-10-30, current session (SAST)

## Handover read
- Read `AI_HANDOVER_PERMANENT.md` (blob `72446cfbeacda551eff5b39375cc0372e41a30db`) and `HANDOVER_CURRENT.md` (blob `aef852c1d232710e5c82b335b912598baa253360`) before action. Read latest Run 16 results and Run 16 task-start files.
- Run 16 establishes: ASC exact reset 36 ledger SKUs / 7,037 units to zero; preview currently 34 ASC matches, all zero. This is not proof all ASC records/assets are deleted. Retained 11 IASC rows / 55 units and 4,101 WebP cache assets are protected; do not broaden reset.
- Planetworld: 702 source rows, 627 Car Audio products, 28 marine, 47 harness/trims; 245 component rows manual review; dated 25-Oct preview snapshot has 68 rows (44 positive / 24 zero), seven exact-model image sources. Audio Connections: 13 Sony candidates, zero high-resolution images approved, zero GW SKU assignments, zero customer-visible products approved.
- Current Car Audio navigation prototype has nine text-wordmark buttons and separate Band Instruments & Studio button, but is not integrated into populated preview and authentic brand-logo assets are absent.
- Run 16 PR #136 six jobs failed before steps (runs 41068900432, 41068900530, 41068900280, 41068900358, 41068900567, 41068900363; logs_url and steps null). No blind reruns. Connector cannot list exhaustive latest runs/workflow enablement. Historical category nav, buyer guide, ASC sync successes are not current-run proof.

## Run 17 scope
1. Recheck current PR heads and workflow status for staging category navigation, buyer-guide extraction, ASC Exact-SKU Image Sync, storefront smoke/production QA and Pages/Cloudflare. Rerun only eligible non-production failed/cancelled jobs if a supported job-only rerun is exposed; never rerun production.
2. Continue Car Audio review from existing evidence: do not invent exact-model images, features, logos, GW SKUs or availability. Preserve Band Instruments separation.
3. Verify ASC zero state only; no additional deletion. No live product/stock/price changes, merge, production deploy, Axxess/Supabase mutation, DNS/payment change or Cloudflare/Netlify credit use.
4. Record all material findings and next precise action in permanent handover and this run update.
