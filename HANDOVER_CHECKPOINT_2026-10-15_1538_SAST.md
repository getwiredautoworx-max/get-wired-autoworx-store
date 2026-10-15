# Get Wired AutoWorx — Monitoring Checkpoint
Date: 2026-10-15 15:38 SAST (13:38 UTC)

## Task-start entry
Read before continuing: AI_HANDOVER_PERMANENT.md, HANDOVER_CURRENT.md, HANDOVER.md, and HANDOVER_UPDATE_2026-10-14_QA_AUTOMATION.md. This checkpoint records the current monitoring state and does not authorize production changes.

## Verified workflow outcomes
- Staging Category Navigation Chromium Acceptance #12 succeeded: run 38521429939, commit 14c16fa76f0e3c2c58596ff69608edc18e0b5578. Original #3 also succeeded: run 38435206322, commit 03cd8d9e229e4f22a899744559b477a3a7df9180. Staging only; manual visual/mobile checks remain separate.
- Buyer-guide extraction #74 succeeded: run 38525300051, commit 999c715872d6b07d98c559605739283f38dbcd88; no new extraction output.
- ASC Exact-SKU Image Sync (Bounded) #51 succeeded as a no-op: run 38715297484, commit 452eef5886b734ff53cf3b48d6e2680395cb4f03; 86 missing targets, 0 eligible, 0 attempted. Script version 9, 40-item batches, four workers and bounded requests.
- Image report: 3,396 unique public-SKU attempts; 3,310 matched; 29 sku_not_in_search_results; 57 no_product_cards; 86 unresolved. Preserve unmatched outcomes; no guessed images.
- Catalogue Image Audit #296 succeeded: run 38720889586. Active products 4,187; public-SKU WebP assets 4,101; proxy references 4,093; direct WebP references 8; placeholders 86; invalid/mismatched references 0. Effective coverage 4,101/4,187 = 97.95%.
- Storefront Smoke Test #716 succeeded: run 38731487776; PR #33 smoke #723 succeeded: run 38734765125.
- PR #32 staging smoke run 38733078647, attempt 3, failed: assertion expects obsolete “Auto Electrical” rather than approved “Auto Electrical Spares”. Do not retry until test code changes. Proposed one-line fix was blocked by safety checks.
- Store Production QA #205 run 38720889604, attempt 2, failed at public-source security scan. The scan includes .github/scripts/generate_docs.js synthetic documentation templates; canonical domain, category/snapshot and exact-SKU WebP checks passed. Fix scanner scope in a staging PR; do not rerun production QA before code changes.
- Read-only browser smoke run 38730017198 failed PAGE_CONTENT (body text length 8 at DOMContentLoaded); screenshots later showed content, but desktop homepage category area showed “Categories are being updated”. Mobile search/filter layout needs manual review. Do not rerun this live-site QA automatically.
- Live Release Gates #16 succeeded: run 38727022998, commit 328df2838047856390f2edc14170af8196643479. Real order submission was intercepted.
- Pages #1251 succeeded: run 38733941247. Later Pages #1197 succeeded: run 38692417237, main commit dbcbd06265492a085f582a1e175a8f9a6fe48235. No Axxess upload.
- Cloudflare #311 remains failed: run 37912001486, empty CLOUDFLARE_API_TOKEN; retry disallowed. No credential/DNS changes.
- Background Task Controller #170 succeeded: run 38734860588, artifact 11971701787; attention_required, 9 workflows checked, 2 completed non-successful, 0 in progress, 0 retries, 0 monitoring errors. Event-triggered only; no continuous-monitoring claim.
- Legacy image sync run 35470550225 remains failed at attempt 2 due non-fast-forward push; obsolete workflow not rerun.
- Part Image Search Safety Checks #13 succeeded: run 38734765486. PR #33 remains staging-only; migration/function not deployed.

## Read-only data checks
- Supabase project ojytykqpvonxvepprgbh: 4,198 product rows, 4,187 active; 4,187 unique public and legacy SKUs; zero missing SKUs/costs/prices/image URLs; zero formula mismatches; 86 image placeholders.
- Price formula: round(cost_price * 1.15 * 1.35, 2).
- Product-image Edge Function ACTIVE version 11. Logs for 2026-10-14T13:13Z–2026-10-15T13:12:48Z: 567 requests, 0 HTTP 404, 0 non-200; mean 741.9 ms, p95 1,171.1 ms, max 7,859 ms.
- October price queue: 107/107 rows closed with original-page evidence and correct formula prices; no writes. Use updated_reconciliation_status/effective_status, not stale review_status.
- Category manual-review queue: 198 rows; all SKUs found in expected OCR (193 one-page, 5 multi-page); OCR is not approval. Suggestions: 11 suppressed, 151 without reliable keyword candidate, 36 require original-page image review.
- Separate outside-hierarchy inventory: 565 rows (161 CANDIDATE_MAP, 83 owner-scope quarantine, 321 out-of-scope quarantine); reconcile separately from 198-row queue and 16 provisional candidates.
- Active-product counts under current live legacy roots: Electrical 1,149; Spare Parts 565; Alarms & Security 2; Automotive Accessories 874; Camping / Leisure / Outdoors 84; Car Audio 46; Marine Spares & Accessories 57; Tools & Workshop 1,321; Trailer & Canopy 89. Total 4,187. These are nine legacy labels, not the approved eight display roots. The 565 Spare Parts products remain unmapped/held.
- Category snapshot refresh #7 succeeded: run 38704119764, 165 active categories and 4,187 products, no commit needed. Checked-in snapshot remains dated 11 October with 58 root nodes.
- Axxess support pending; email not checked because no authorized connector. PayFast not integrated; PayJustNow unconfirmed.

## Next precise actions
1. Correct the stale “Auto Electrical” assertion to “Auto Electrical Spares” in a staging PR and let CI run after code changes.
2. Restrict the public-source security scan to shipped public runtime assets and exclude .github/scripts; then allow normal PR CI to run. Do not manually rerun production QA.
3. Manually review the desktop category fallback and mobile search/filter layout; stage any fixes only.
4. Reconcile 198 manual rows, 565 outside-hierarchy rows and 16 provisional candidates; preserve the approved eight-root taxonomy and all pricing rules.
5. Investigate 86 unresolved image SKUs after cooldown; no fuzzy matching or guessed images, and verify image rights.
6. Locate the original corrected September CSV/image folder; reconstructed 800-row list remains import-blocked.
7. Keep Axxess-first coordinated final sync pending owner approval.

## Safety
No live product/category/price/stock/image writes, production workflow reruns, Axxess uploads, DNS/payment credential changes, Cloudflare/Netlify credit use or real orders/payments occurred. This is documentation only; permanent handover still requires review/merge.
