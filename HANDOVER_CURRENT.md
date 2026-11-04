# Get Wired AutoWorx — Current Handover

**Updated:** 2026-11-04 (SAST)
**Repository:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store
**Active PR:** https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/168 (OPEN / DRAFT / UNMERGED)
**Working branch:** `integration/three-category-catalogue-preview-final-2026-11-03`
**Parent head before this handover commit:** `6857add492dee32a1c96ca2f8d93cb11c7295e22`

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
- Manual review reconciled 236 staging CSV exceptions with 234 preview rows. 232/234 preview rows have been classified. Two are explicitly held pending source clarification: OneNav BOX-10 (“Nissan Box”) and ON014-F3 (Prado 10.1-inch item type unclear). Kicker 47KPB2 and 51KMC4 are Marine Audio; Kicker keychain is excluded as non-audio merchandise.
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
