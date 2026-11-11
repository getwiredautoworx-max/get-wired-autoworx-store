# Consolidation repair — task start

- Date: 2026-11-11
- Task: consolidate remaining safe, owner-authorised storefront and catalogue work into one current-main-based candidate.
- Canonical baseline: `main` at `daf2d08f46306ee7ac666c61d57bdaff65676f07`.
- Working branch: `integration/consolidation-repair-2026-11-11`, created directly from that exact main SHA.
- Authority read before work: `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md` and `HANDOVER_CURRENT.md`.
- Release boundary: production HOLD; no Axxess upload, DNS/payment change, live Supabase/catalogue/price/stock write, paid hosting action, or production deployment.
- Initial reconciliation finding: PR #189 is 52 commits ahead and 244 behind current main (diverged); it is not a safe merge candidate. Its report identifies a public supplier-data route still returning HTTP 200 and a Cloudflare Workers Builds check tied to a production Worker. Do not merge it wholesale.
- PR #178 is explicitly stale/divergent and not eligible for wholesale merge.
- PR #191 is explicitly a temporary ASC image-pilot execution harness and must not be merged.
- PR #187/#188 contain overlapping controller fixes; inspect current-main code before selecting changes. The current main controller already has an inline schema-v2 fallback in its queue-summary rendering; do not reapply a stale duplicate fix without proving a remaining defect.
- PR #183 contains review-only ASC staging records with internal supplier identifiers; keep them out of public customer data and do not merge blindly.
- PR #185 contains Electro-city review evidence including internal supplier SKU references; keep review-only and do not expose internal supplier identifiers.
- Next execution: inspect current-main storefront/category population and the latest candidate datasets; selectively port only public-safe, validated work; run exact-head tests; update this record and the permanent handover with commit/test evidence.
- Status at task start: no PR merged, no deployment or live-data action performed.
