# GET WIRED AUTOWORX — HANDOVER UPDATE — 2026-10-14
## Audit continuation checkpoint (staging only)

**Repository:** getwiredautoworx-max/get-wired-autoworx-store  
**Branch:** audit/buyer-guide-extraction  
**Purpose:** Continue the June Buyer’s Guide SKU, price, and category reconciliation without restarting the catalogue or changing production.

## PERMANENT USER INSTRUCTIONS — 8 LOCKED RULES
These eight rules are user-authoritative and must be copied into every new handover file without omission, alteration, or reinterpretation. They may not be edited, removed, or weakened unless the user explicitly gives permission.

1. **Maintain workflow — efficiency — speed.**
2. **Complete all available tasks in a single flow.**
3. **Only notify the user when user input or permissions are required.**
4. **AI will update the master handover file after every successful task is completed.**
5. **Do not use Cloudflare or Netlify credits until final testing.**
6. **All tasks requiring Cloudflare or Netlify credits will be added to the handover file to be completed at the very end, during the testing phase.**
7. **AI will copy these rules into every new handover file and will not leave any rule out or edit any rule without user permission.**
8. **AI will reply with these 8 rules when required by the user to be edited or removed.**

### Rule-preservation requirement
Do not delete, merge, reorder, weaken, reinterpret, or silently edit the eight locked rules above. Verified progress may be appended around them.

## Verified status at this checkpoint
- GitHub Actions run **38387571992** (“Extract Buyer Guide PDF Text (Staging Only)”) completed with conclusion **success** on 2026-10-13. This confirms the extraction workflow ran; it does not mean catalogue reconciliation or storefront QA is complete.
- The run’s job steps completed successfully. No workflow artifacts were published by that run.
- The audit branch contains June OCR output and page-level OCR text for all 32 pages, the June pages 29–32 visual cross-check CSV, the page 32 spanners exact-SKU reconciliation files, category crosswalk/review files, July–September exact-code candidate cross-checks, and the 2026-10-14 category review and price-difference queues.
- Recent audit commits include:
  - `bdc24fd5fbddacb9386d59f8a5f55a0d5a385187` — “Log visually confirmed June source products missing from staging”
  - `a705e7a574e5535e3ee996d17e3ae28e9c4be231` — “Record June staging SKU mismatches confirmed against source images”
  - `eb7d09fc01a59a8547539301c897a60854ca6162` — “Extend June page 32 visual reconciliation and flag staging gaps”
- The main-branch permanent handover was inspected at the start of this continuation. A previous checkpoint recorded all 32 June pages visually reviewed, with 470 OCR records and 126 historical prices still requiring reconciliation. Treat those as prior checkpoint counts, not proof that the remaining records are reconciled.
- No production catalogue, Supabase data, Axxess files, Cloudflare, or Netlify were changed in this continuation.

## Required next actions (in order)
1. Inspect the current category review queue and exact-SKU/live-vs-guide price-difference CSVs. Quantify rows by status and identify records with exact source evidence.
2. Continue the June exact-SKU reconciliation from original page images/OCR; record confirmed matches, confirmed mismatches, missing staging items, and unresolved OCR/code ambiguity separately.
3. Verify the SKU and price joins against July–September guide candidates, preserving guide/page provenance and never using approximate description-only joins as confirmed matches.
4. Review category mappings against the ASC crosswalk and approved store hierarchy. Keep unresolved categories in a review queue; do not silently move production products.
5. Run validation against the staging files and independently check counts, duplicates, missing/invalid prices, SKU collisions, and category gaps.
6. Update this handover with measured counts and commit hashes after each material successful task.
7. Only after exact-SKU validation and staging storefront QA pass, prepare one final synchronized production update. Do not touch live catalogue/database/Axxess before validation. Defer any Cloudflare/Netlify credit-consuming task until final testing.

## Current blockers / acceptance criteria
- Full June exact-SKU and historical-price reconciliation is not yet proven complete.
- July–September cross-guide reconciliation and category validation are not yet proven complete.
- Staged storefront testing and live browser verification are not yet proven complete.
- Do not claim successful resolution until the corresponding data checks and tests produce recorded passing results.
- No ETA is asserted until the remaining row counts and validation effort are measured.

## Continuation rule
Continue from the existing audit branch and records. Do not restart the catalogue, rebuild the site, or deploy while reconciliation remains unresolved.

## Follow-up finding — 2026-10-14, CSV sample inspection
- Inspected the first rows of `EXACT_SKU_LIVE_VS_GUIDE_STAGING_PRICE_DIFFERENCES_2026-10-14.csv`. At least the sampled rows `C10-001` and `H4-062` have an old `review_status` saying price differences require review, while `updated_reconciliation_status` says the October original page image was visually checked, the printed cost matches the live cost, the selling price remains formula-correct, and no live write is needed.
- This is a **status-field inconsistency in the sampled rows**, not proof that the whole CSV is inconsistent. Downstream reports must prioritize the newest evidence/status field and these records should be excluded from any price-change batch unless a new contradiction is found.
- The category queue sample also includes obviously conflicting examples (e.g. rubber reducers and concertina hoses routed to “Cylinders” because of guide page/category OCR context). They remain review candidates and must not be auto-moved solely from these CSV labels.
- The June pages 29–32 visual cross-check sample explicitly marks its rows `VISUALLY_CONFIRMED_CODE_ONLY`; this confirms the code/description only and does **not** confirm current cost or price. Historical promotional prices remain historical, not current price authority.
- Next bounded task: reconcile the stale review labels against `updated_reconciliation_status` systematically, then report exact row counts by effective status before any price edits. Do not edit production data.
