# Get Wired AutoWorx — Current Handover

**Updated:** 2026-11-04 (SAST)
**Repository:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store
**Active PR:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/168 (OPEN / DRAFT / UNMERGED)
**Working branch:** `integration/three-category-catalogue-preview-final-2026-11-03`
**Parent head before this handover commit:** `1b5f1c5d25bb0f5597ba7e25bacbe3746fa1ab83`

## Owner's standing rules
- Always read and update the handover.
- Do not loop on status explanations; make tangible progress.
- Customer catalogue groups by product identity/function, never by supplier. Supplier folders are internal sourcing records only.
- The approved three homepage roots remain unchanged; all subpages use the approved shared shell.
- Production remains HOLD. No merge, production deploy, Axxess upload, DNS/payment change, Supabase write, live stock/price change or supplier activation without explicit approval.
- Do not claim readiness without exact-head tests, successful current preview deployment and owner acceptance.

## Current workstream — Planetworld + Audio Connections pilot
- Continue completing the combined Car Audio & Video pilot before starting ASC/Electro-city.
- Planetworld Car Audio source contains 702 rows. Audio Connections preview contains 66 rows. Supplier identities are internal; both catalogues must be grouped together by product/brand/component.
- Manual review reconciled 236 staging CSV exceptions with 234 preview rows. 232/234 preview rows have been classified. Two are explicitly held pending source clarification: OneNav BOX-10 (“Nissan Box”) and ON014-F3 (Prado 10.1-inch item type unclear). Kicker 47KPB2 and 51KMC4 are Marine Audio; Kicker keychain is retained in the internal source snapshot with an explicit exclusion label and filtered from customer-facing Car Audio navigation.
- Detailed decision record: `catalogue-review/planetworld-car-audio-manual-review-2026-11-04.json`.

## Exact-head verification
- Parent head before this handover commit: `6857add492dee32a1c96ca2f8d93cb11c7295e22`.
- Runner diagnostic run 41796540711 succeeded on that head. It checks 3 active roots and expected catalogue counts; it is not the full regression/browser suite.
- Cloudflare Pages check for that head was in progress, deployment ID `8272f312-a225-44e5-bba8-aa6358ea3c57`; no successful exact-head preview URL recorded yet. Recheck the new head after this handover commit.
- Do not claim browser/phone acceptance. Full Node regression suite and hosted browser QA still require recorded exact-head results.

## Canonical handover history
- Detailed current project history and design contract: `HANDOVER_2026-11-03_CATALOGUE_STATUS.md`.
- Owner continuation notes: `HANDOVER_2026-11-02_OWNER_CONTINUATION.md`.
- The previously referenced `AI_HANDOVER_PERMANENT.md` is not present at the active branch root; do not assume it exists or cite it as read.

## Next execution rules
1. Recheck branch head, PR #168, Actions checks and Cloudflare Pages deployment after this handover commit.
2. Keep BOX-10 and ON014-F3 held until exact supplier descriptions confirm product type; do not invent categories.
3. Run the complete Node regression tests and isolated public Pages package QA on the exact final head; record results and preview URL.
4. Verify preview rendering at mobile widths and desktop; request owner phone acceptance. Do not merge or deploy production.


## 2026-11-04 test coverage refinement
- Preserved the 3,317 Planetworld total and 702 Car Audio division rows; the non-audio keychain is hidden by the customer route filter, not removed from source data.
- Added regression checks for the two held rows and the keychain exclusion.
- Expanded the active runner workflow to build the isolated preview package and execute Node ASC/audio/storefront tests plus the public SKU exposure audit. Check the new exact-head run before claiming test success.


## 2026-11-04 ASC root correction
- Fixed stale preview data and navigation so Aerials is under Car Audio, Car Mats is under Car Care & Accessories, and sensors/switches/globes/fuel pumps remain under Auto Electrical Parts & Spares.
- Full suite on parent head f90a520 passed structural and preview package build, then failed the ASC hierarchy assertion because of the incorrect root fields. Corrected to the test's owner-approved hierarchy; full suite rerun is pending.
- Parent head: `f90a520e0681e3d3f3f3e77478858fa540a58416`. Prior Pages preview: `https://3f273f37.get-wired-autoworx-store.pages.dev`; it does not contain this correction.


## 2026-11-04 regression fixture correction
- The ASC root data and homepage links were corrected on parent head 9e235da; ASC preview and audio preview tests passed. The remaining failure was a stale expected-root list in tests/three-category-storefront-structure.test.cjs. Updated that fixture to the approved three-root hierarchy and the correct Aerials/Car Mats navigation.
- Parent head: `9e235da782c0516891346bbcf225fdfbb4050a3a`. Full suite rerun pending on the next head.


## 2026-11-04 ASC source PDF privacy test correction
- The full regression run reached the ASC unit test after the hierarchy fix. The test contained stale assertions requiring supplier source PDFs to be published and linked, contrary to the secure allowlist. Updated it to verify source PDFs remain internal and absent from Pages preview.
- Parent head: `83e7f8dfdc664c33edd118b70bdb55b771d1c45f`. Full suite rerun pending.
