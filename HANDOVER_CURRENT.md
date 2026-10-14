# Get Wired AutoWorx — Current Handover Checkpoint
Date: 2026-10-14 (South Africa)

## Operating rules
- Preserve the functioning live store. Do not execute the unsafe September SQL or write to production Supabase during reconciliation.
- Build/review in staging first; batch approved final sync to GitHub, Supabase SQL/data and Axxess into one controlled release.
- Axxess is the primary host. Owner emailed Axxess about root/www DNS and SSL; await their response before DNS/SSL changes. Do not stop independent work while waiting.
- PayFast and PayJustNow remain deferred temporarily, per owner instruction. No real orders or payment changes.
- Required customer price formula: supplier cost excluding VAT × 1.15 × 1.35, rounded to cents. Never promote expired guide prices as current without supplier confirmation.
- Keep eight storefront categories and preserve ASC source category/subcategory as separate evidence.

## Current verified live baseline
- Last verified inventory baseline: 4,187 active products, 4,187 distinct supplier SKUs and 4,187 public SKUs.
- Last audit reported no missing image_url, missing costs, invalid/non-positive prices, or live formula mismatches. That baseline does not clear the separate September 800-row import candidate or 38 flagged live price-scaling defects.
- Release gate workflow run 38559111166 succeeded for the tested deployment's HTTPS/routes, version marker, desktop/mobile category navigation, checkout UI without a real order, and payment-readiness report. Monitoring runs 38559165567 and 38559212408 succeeded. Do not rerun these without new code or a failure.
- No production catalogue writes, SQL execution, deployment, Axxess upload, DNS change, or payment setting change in this reconciliation pass.

## 2026-10-14 — Row-level category audit progress
- Reviewed all 800 rows in the existing review-only category crosswalk and created:
  /mnt/data/Get_Wired_AutoWorx_800_Row_Level_Category_Audit_QUEUE_2026-10-14.csv
- The queue retains every exact SKU, product name, source guide page, source category/subcategory, candidate slug and proposed top-level category. It adds an explicit row-level audit finding and never marks a row import-eligible.
- Triage counts: 34 AERIALS rows need a specific decision because the candidate slug maps them to Car Audio & Entertainment; 94 mechanical/vehicle-spares family rows need category-scope verification; 42 specialist 4x4/trailer/outdoor/marine rows need specialist-category verification; 630 rows still require source-page/product-family review. These are triage flags, not approved remappings.
- This is now a concrete 800-row review queue, not a claim that the 800 categories are verified. All 800 remain held from import pending row-level source validation.
- Previous normalized crosswalk counts remain candidate-only: 412 automotive-accessories; 242 tools-workshop; 103 electrical/lighting; 38 car-audio; 5 marine. 383 rows require slug normalization, and 417 currently use one of the intended top-level slugs. Source subcategory accuracy is not yet passed.

## September 800-row candidate — hard release blocker
- 800 rows / 800 unique SKUs: 791 priced candidates and 9 quote-only candidates.
- Formula audit: 0/791 SQL candidate prices use the required full formula; the candidate uses VAT-only cost × 1.15. The nine unpriced SKUs (M501WCC, A1-002, A1-003, MA330, MA342, MA342/2, N-FC001, WP25, N-CP002) can be coerced to zero and marked active by the unsafe SQL. Never execute it.
- Review-only formula-corrected CSV exists at /mnt/data/Get_Wired_AutoWorx_800_Formula_Corrected_REVIEW_ONLY_2026-10-14.csv. It is not import-ready: 791 calculated prices are only mathematical candidates, not confirmed current supplier prices; nine rows stay quote-only/blank; 0/800 import eligible.
- Original September guide offer expired 2026-09-30. The guide verifies historical source values, not current prices.

## Image reconciliation / permission gate
- 38 live price-scaling defect SKUs are in /mnt/data/Get_Wired_AutoWorx_38_SKU_Exact_Review_2026-10-14.csv. All 38 are historical source-matched; all 38 require current supplier price confirmation before changing published prices.
- 30/38 appear in the unmatched-image queue with no verified image; the other 8 are not listed there, which is not proof of correctness.
- September guide page 104 has explicit no-verified-image placeholders for winches EWV4500 and ROMA13XP. Exact model panels exist for LEOPARD and LION compressor models. The other 34 held SKUs have only grouped/family imagery, not size-specific images.
- ASC source guide warns unauthorized use is prohibited. Publication rights are not confirmed. Internal evidence crops at /mnt/data/Get_Wired_AutoWorx_September_Source_Image_Evidence_2026-10-14.zip are QA evidence only and must not be published without permission. Do not guess image paths or assign nearby supplier-number images based on filename alone.
- No verified current supplier price response or image-use permission has been received/recorded. These require supplier/rights-holder confirmation; do not describe them as resolved.

## Go-live task register and realistic ETAs
ETAs below are work estimates after required evidence/access arrives, not promises or claims that third parties have replied. External response times are outside our control.

| Priority | Remaining task / exit criteria | ETA from required input | Current status |
|---|---|---|---|
| P0 | Corrected, safe 800-row catalogue candidate: exact SKU/description/cost/page joins; correct full price formula; quote-only rows cannot be active/zero-priced | 1–2 focused work sessions after source files are fixed and complete | BLOCKED: existing positioned extraction has proven SKU/price association errors |
| P0 | Row-level category validation for all 800 SKUs against source page and agreed eight-category taxonomy | 2–4 focused work sessions; queue created, 800 rows still require review | IN PROGRESS: audit queue generated; no rows approved |
| P0 | Verify product image by exact SKU; secure usage permission or substitute authorized supplier images | 1–3 work sessions for matching once image index/assets are accessible; permission timing depends on supplier/rights holder | BLOCKED: 0/800 verified September candidate image paths; rights unknown |
| P0 | Current supplier price confirmation for 38 flagged live SKUs and any selected launch candidates | 1 work session to reconcile written response once received; supplier response time unknown | WAITING ON SUPPLIER; September values expired |
| P1 | Reconcile live 4,187 SKUs against staged approved source-delta ledger; classify KEEP/UPDATE/ADD/QUOTE/REVIEW | 1–2 work sessions after clean candidate, image and price evidence | NOT STARTED to pass standard; baseline exists only |
| P1 | Staging QA: desktop/mobile category and subcategory navigation, product detail, search, cart, checkout, delivery and policy links; no real payment | 1 work session after candidate is stable | Partial evidence exists for tested deployment; full catalogue and Axxess DNS/SSL not proven |
| P1 | Axxess root/www DNS, SSL and canonical redirect verification | 30–60 minutes after Axxess confirms changes/propagation | WAITING FOR AXXESS; owner has sent request |
| P1 | Final one-batch release: reviewed data sync, one Axxess package upload, live smoke tests, rollback checkpoint | 1 focused work session after all P0/P1 gates pass | NOT AUTHORIZED / NOT READY |
| P2 | PayFast/PayJustNow live URL and policy approval, then sandbox/live checkout proof | After store release; external approval time unknown | DEFERRED per owner instruction |
| P2 | Optional Cloudflare/GitHub/Supabase mirror sync and deployment consistency check | Batch with final release; only after access/token blocker is solved | NOT READY; avoid repeated builds/credit use |

**Planning estimate:** 6–10 focused work sessions from the point the required supplier/image evidence and usable source candidate are available, plus third-party response/propagation time. This is not a calendar launch date. A credible date can only be set after P0 evidence gaps and Axxess response are cleared. Customer launch remains HOLD today.

## Exact customer launch exit checklist
1. 800-row source candidate reconciles 800/800 unique expected SKUs; each row has verified same-card SKU/description/price/category evidence or is explicitly excluded/quote-only.
2. All 791 intended priced rows have confirmed current supplier costs and correct formula; no zero-price active rows; nine quote-only items are excluded from sale until priced.
3. No product goes live with a guessed/mismatched image. Each published image has exact-SKU/model evidence and permission or is replaced by an authorized asset.
4. Every published row has approved category/subcategory and valid product detail.
5. Staged-vs-live SKU delta reviewed; backup and rollback available; no unreviewed bulk overwrite.
6. Axxess root and www both resolve correctly with valid SSL and email DNS preserved.
7. Storefront, mobile, search, cart, shipping/pickup, checkout and policies pass live smoke tests. Payment-provider approvals are then completed before claiming online payments ready.
8. Single controlled release and post-release verification recorded; handover and release evidence committed.

## Immediate next actions (no circular reruns)
1. Use the new 800-row row-level category audit queue to resolve highest-risk specialist mappings first: AERIALS (34), mechanical/vehicle spares (94), and 4x4/trailer/outdoor/marine (42). Preserve source subcategory and page evidence; do not auto-approve.
2. Continue exact-SKU image index reconciliation for all 38 held SKUs and the 800-row candidate. Use only positive SKU-to-image evidence; permission is a separate gate.
3. Prepare a supplier confirmation request list covering the 38 held SKUs with exact SKU, description, historical September cost, and requested current cost/availability; mark all historic values expired until reply.
4. Continue independent staged work while Axxess and supplier responses are pending. Do not rerun successful release/monitoring workflows without a new change or failure.
5. Update this handover after each material change with actual counts, links, blockers, and revised ETA.

## Safety / release status
**RELEASE HOLD — NOT READY FOR CUSTOMER LAUNCH.** No SQL was executed, no production product/price/category/image changes were made, and no deployment/upload was performed in this pass.

## Additional deliverable — supplier confirmation request register (2026-10-14)
- Created /mnt/data/Get_Wired_AutoWorx_Supplier_Price_and_Image_Permission_Request_38_SKUs_2026-10-14.csv with 38 exact-SKU rows.
- Each row includes the product description, historical September source page/cost and validity warning, plus blank fields for current supplier cost, stock availability, effective/expiry dates, exact SKU/description confirmation, image-use permission, permission to crop/edit/watermark, approved image file/URL, supplier response date and contact reference.
- This is a ready-to-send request register, not supplier confirmation. It has not been sent externally because no supplier contact/channel was provided in this workflow. Supplier reply and image rights remain outstanding.
