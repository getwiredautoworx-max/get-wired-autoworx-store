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


## 2026-11-04 owner correction — Car Audio & Video accessories hierarchy

- Correct customer-facing hierarchy: **Audio, Entertainment & Music → Car Audio & Video → Accessories → Aerials** and **Audio, Entertainment & Music → Car Audio & Video → Accessories → Trims & Harnesses**.
- **Aerials** and **Trims & Harnesses** are sibling subcategories under **Accessories**. Each must have its own distinct customer-facing button and its own respective product listing/view.
- Neither is a top-level homepage category. Trims & Harnesses must not be placed as a sibling of Accessories directly under Car Audio & Video, nor merged into the Aerials listing.
- This is a navigation/taxonomy correction for the future catalogue structure. It does not authorise importing/restoring ASC catalogue data in the current Planetworld + Audio Connections pilot; ASC source data remains deferred to the separate fresh-upload task.
- No storefront code or catalogue data was changed in this handover-only update. The hierarchy must be implemented and then checked against the exact candidate head before it is described as complete.


## 2026-11-04 execution update — Car Audio Accessories taxonomy

- Updated assets/category-tree.json to Car Audio & Video → Accessories → Aerials and Trims & Harnesses. Aerials and Trims & Harnesses are separate sibling nodes/buttons under Accessories, not direct children of Car Audio.
- Preserved the existing Trims & Harnesses UUID 13b36e2a-a5c7-471e-83ef-3ad180e66d3d. Added Accessories UUID 8d3c2e91-8b57-4b2c-9a7d-3f0f6a2b4c11 and Aerials UUID b0b4c7d1-2f68-4c8a-9e51-6d2a3f7b8c90.
- Added static regression assertions to tests/three-category-storefront-structure.test.cjs for the parent-child hierarchy and two distinct sibling entries.
- Commits: taxonomy 8b22958f1a5c8033700d81666c345132956ef74b; test assertion e12b9e6ea2cfcf67532f885ce219644b81f6d447.
- Outstanding: the test suite has not been executed on this head. preview-audio.html still needs explicit Accessories → Aerials / Trims & Harnesses navigation and correct product filtering. Do not mark the navigation complete until route wiring and exact-head tests pass.
- Current supplier scope remains Planetworld + Audio Connections. ASC catalogue data remains deferred to the separate fresh-upload task.
- No GitHub Actions, Cloudflare build/deployment, Supabase write, production change, supplier activation or live catalogue change was triggered.


## 2026-11-04 execution update — Accessories routes wired

- Updated homepage navigation so Aerials is no longer injected as a direct Car Audio button. The category tree now supplies Aerials and Trims & Harnesses as separate children of Accessories.
- Updated category.html leaf routing: Aerials opens its own Car Audio filtered view; Trims & Harnesses opens a dedicated Car Audio component view for Harnesses, Trims & Fitment.
- Updated preview-audio.html so a direct component route can display matching products even when the brand filter is All brands.
- Extended tests/three-category-storefront-structure.test.cjs with checks for both dedicated routes and direct component product visibility.
- Read-only GitHub-content assertions on current files passed 8/8: Accessories parent, exact two sibling children, no direct homepage Aerials button, both route mappings, component product visibility, 47 dedicated Planetworld trims/harness rows, and zero Audio Connections rows leaking into that dedicated group. This is an API-content assertion only; it is not the Node regression suite or browser QA.
- New commits: homepage navigation 20fcee970d9ca99f6ae5f4c94c50ff0d59dc0998; category leaf routes 2a1498bbdc22200383afd15b82eb7375634c9b91; audio filtered-view behavior 0ab507454705934bce18722a71e93eb355ea5d94; regression coverage a9457dfb16f16bfadaeb25c160923c15c401a151.
- Aerials has its own route/button but no current Planetworld/Audio Connections products have been asserted for it; ASC aerial source records remain deferred to the separate fresh-upload task. The 47 Planetworld Harnesses & Trims rows are the current product set for the Trims & Harnesses route.
- Still outstanding: run the full regression suite and browser/device checks on the exact final head, reconcile remaining Planetworld and Audio Connections records/images/pricing/identity, verify combined catalogue behavior and hosted preview. No Actions or Cloudflare run was triggered due to resource restrictions.


## 2026-11-04 — Reconciliation of Car Audio Accessories routes and verification state

- Re-read the current PR #168 head before this documentation update: `f43a51a284b8f901765063dea837dd904b273c08`.
- The route implementation is present in source; the previous handover statement that route wiring still needed implementation was stale and incorrect.
- `assets/category-tree.json` defines Accessories beneath Car Audio, with Aerials and Trims & Harnesses as separate child nodes.
- `category.html` maps the Aerials UUID to its own Car Audio search route and the Trims & Harnesses UUID to its own Car Audio component route.
- `preview-audio.html` initializes department/brand/component/search from URL parameters. A selected component is filtered while brand remains “All brands”; the dedicated Harnesses & Trims source collection resolves to 47 Planetworld rows. Audio Connections installation kits are explicitly excluded from this dedicated group.
- `tests/three-category-storefront-structure.test.cjs` contains assertions for the Accessories hierarchy, distinct child routes, product visibility with All brands, the 47-row dedicated fitment group, combined supplier catalogue handling and duplicate Car Audio button suppression.
- Current evidence is source inspection and test assertions only. No exact-head Node test execution or interactive desktop/mobile browser run has been confirmed for head `f43a51a284b8f901765063dea837dd904b273c08`. Therefore do not say the issue is fully verified or owner-accepted.
- GitHub Actions public-runner eligibility was incorrectly treated as blocked by the exhausted private-repository minutes allowance. Public repository workflows can use eligible GitHub-hosted runners; check workflow triggers and exact run status rather than assuming minutes are exhausted. The connected GitHub actions tools expose run inspection and retry, but no workflow-dispatch action.
- The Actions run lookup for this exact SHA returned no pull-request-triggered workflow runs; this is not proof that no push-triggered run exists. Inspect the Actions run list/status and use a path-matching PR update or owner UI dispatch where the workflow is manual-only. Do not use Cloudflare deployment workflows without the required explicit approval/credentials.
- Aerials has a route but no Planetworld/Audio Connections records; ASC source records remain deferred. This is an expected empty state for the current supplier pilot, not permission to import ASC.
- PR #168 remains draft/unmerged; production remains HOLD. No live stock, price, payment, DNS, Axxess or Supabase changes.


## 2026-11-04 — Exact-head runner failure diagnosis and category route correction

- Public GitHub Actions runner eligibility was confirmed by actual execution; the latest prior workflow run 41801511406 successfully allocated a hosted Ubuntu runner, checked out PR #168 head 281b67d3671b81eeb5d19aec7dc3bd5853543d6b, installed Python 3.12 and Node 22, and passed root-count/catalogue-count/Planetworld held-row checks.
- The full regression failed at tests/three-category-storefront-structure.test.cjs:25 because its expected first root label was stale ("Car Audio / Home Entertainment / Lifestyle"); the current owner-approved category tree label is "Audio, Entertainment & Music". The public preview category page also retained the stale root label.
- Source inspection found a functional route defect in preview-category.html: its Car Audio special-case branch compared against obsolete category UUID 5ab55c53-eee3-41ce-ad48-04ad6df85181, while the current category-tree.json uses e3d19d20-fb46-426c-9f64-221d863add0b. Updated both old UUID occurrences and the stale root label in preview-category.html.
- Updated the two stale root-label expectations in tests/three-category-storefront-structure.test.cjs.
- Commits: preview-category route correction a50fc78a162aadefc909a323ca342bc66f8fb854; regression fixture correction 010c8fe8b5a9adc3eae9f00cd67bf5afac4a60aa.
- Push-triggered Actions run 41801826778 is testing exact code head 010c8fe8b5a9adc3eae9f00cd67bf5afac4a60aa. At handover update time it was in progress; final result not yet available. Earlier failing run 41801511406 is diagnostic evidence only and must not be described as the current result.
- Next: inspect final output of run 41801826778; fix the next concrete failing assertion if any; run full tests on the final post-handover head; verify preview route/button behavior in an actual hosted preview and mobile/desktop browser. Do not mark closed until those checks and owner acceptance.
- No production deploy, merge, payment/checkout activation, DNS, Axxess upload, Supabase write, or live stock/price changes.


## 2026-11-04 — Audio navigation/filtering fixed and verified

Exact candidate head at verification: `776c840bb79a4833e0859d493b7463e6a34c1e73` on PR #168 / branch `integration/three-category-catalogue-preview-final-2026-11-03`.

### Defects fixed
- `category.html` previously attached a listener to a missing `#search` element; the resulting TypeError stopped `main()` before category buttons rendered. The optional listener is now guarded so the category tree initializes.
- Aligned the category root label to **Audio, Entertainment & Music** and the Car Audio node to **Car Audio & Video**.
- Confirmed the approved nested structure: **Car Audio & Video → Accessories → Aerials / Trims & Harnesses**. Aerials and Trims & Harnesses are distinct sibling routes; neither is a direct homepage root button.
- Direct search routes now render their own filtered product panel even when the brand/component selectors are not selected. Aerials therefore shows a dedicated empty state while its catalogue source remains deferred; it no longer drops the user onto the generic unfiltered department page.
- Trims & Harnesses route returns 47 Planetworld rows with Audio Connections products excluded from that group.
- Corrected homepage grid overrides: the later `#categoryGrid.cats` CSS had reset alignment to stretch and made sibling category cards cover expanded links. Final CSS keeps root cards intrinsic-height and the expanded child links tappable.
- Kept Marine Audio separate from Car Audio & Video. Brand and component selection is cumulative; department/brand landing pages hide product stock until a component is selected. Verified Sony → Amplifiers and Kicker → Subwoofers filtering.
- Supplier names, dealer costs and supplier SKUs remain absent from the customer-facing preview.

### Verification evidence
- GitHub Actions full regression / public package build: **PASS**, run `41804164474`, exact head `776c840bb79a4833e0859d493b7463e6a34c1e73`.
  - `PAGES_PUBLIC_BUILD_PASS`: 4,133 files / 4,101 WebP images.
  - `AUDIO_CATALOGUE_PREVIEW_PASS`: 3,317 Planetworld rows; 702 Car Audio division rows; 66 Audio Connections rows; 2 excluded rows; 65 exact image candidates; preview-only.
  - `THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS`.
  - `PUBLIC SKU EXPOSURE AUDIT: PASSED`.
  - `GW_FULL_STOREFRONT_REGRESSION_PASS`.
- Owner preview desktop/mobile Playwright: **PASS**, run `41804164656`, exact head `776c840bb79a4833e0859d493b7463e6a34c1e73`.
  - Three approved homepage roots.
  - Sony → Amplifiers returns filtered products; department and brand pages hide stock until component selection.
  - Trims & Harnesses returns exactly 47 products.
  - Aerials opens its own filtered route.
  - Checkout hidden; Supabase writes blocked; no browser JavaScript errors.
- Dedicated accessory route Playwright: **PASS**, run `41804074552` on runtime-identical code head `8a0d55f87657303455d394045fcae3fc1a77ff0b`; later changes through `776c840` were test/workflow-only.
- Netlify Deploy Preview: **READY** for exact head `776c840bb79a4833e0859d493b7463e6a34c1e73`; deploy ID `6aeaf4a0b68f051d9f119166`.
  - Owner route: `https://6aeaf4a0b68f051d9f119166--get-wired-autoworx-store.netlify.app/owner-preview.html`
  - Preview context only; no production deploy.

### Still open — supplier pilot, not navigation
- Planetworld: 3,317 broad source rows; 702 Car Audio division rows. The 68-record verified-model reference set is not blanket coverage for the full feed; remaining Car Audio classification, model/image evidence and reconciliation must be completed.
- Audio Connections: 66 retained records, all preview-only; 4 currently have image URLs, 53 lack proposed GW SKUs, and 3 lack indicative prices. Complete exact product/image evidence and GW SKU reconciliation before calling the supplier pilot complete.
- Do not start ASC/Electro-city until the Planetworld + Audio Connections pilot is owner-accepted. Aerials remains an empty route until the separately authorised ASC source upload.
- No live stock/price activation, banking/payment, checkout, DNS, Axxess upload, production deployment, or Supabase production writes. PR #168 remains draft/unmerged; production remains HOLD.

## 2026-11-04 — Route-level navigation and product-filter verification

- Current working PR: #168 (draft, unmerged); working branch: `integration/three-category-catalogue-preview-final-2026-11-03`.
- Exact code/test head at this checkpoint: `776c840bb79a4833e0859d493b7463e6a34c1e73`.
- Implemented customer navigation hierarchy: three approved roots → Car Audio & Video → Accessories → separate Aerials and Trims & Harnesses routes. Aerials opens its own filtered empty state while ASC remains deferred; Trims & Harnesses opens its own component listing.
- Fixed expanded homepage category layout so stretched sibling root cards no longer cover expanded subcategory tap targets.
- Product filtering is exercised through real browser interaction: department → brand → component. Kicker → Subwoofers results are checked to contain Kicker products only. Owner preview additionally checks Sony → Amplifiers, and that department/brand landing pages hide product stock until a component is selected.
- Browser QA evidence:
  - Owner Store Preview Browser QA run **41804164656** — SUCCESS on exact head `776c840bb79a4833e0859d493b7463e6a34c1e73`. Checks approved roots, category navigation, Sony amplifier filter, 47 Trims & Harnesses products, Aerials route, checkout hidden, Supabase writes blocked, and desktop overflow.
  - Full Current Branch Runner / public Pages package regression run **41804164474** — SUCCESS on exact head `776c840bb79a4833e0859d493b7463e6a34c1e73`. Build included seven preview routes, 4,101 WebP assets, and excluded supplier/internal review files; storefront structure, audio catalogue tests and public SKU exposure audit all passed.
  - Car Audio Accessories Route Browser QA run **41804074552** — SUCCESS on head `8a0d55f87657303455d394045fcae3fc1a77ff0b`; checked the three roots, separate Accessories child buttons, 47 Trims & Harnesses rows, Aerials empty filtered route, Kicker → Subwoofers brand/component filter and no JavaScript errors. Subsequent source change was the homepage expanded-card layout fix; the exact latest-head Owner Preview browser test then passed the category interaction flow.
- Catalogue invariants preserved: Planetworld source 3,317 rows / 702 Car Audio division rows; Audio Connections 66 preview rows; two source-ambiguous Planetworld items remain held; Marine Audio remains separate; customer catalogue remains supplier-neutral. ASC catalogue data remains deferred.
- Remaining acceptance: no exact-head Cloudflare Pages hosted preview URL has been deployed from this PR branch. Existing deploy workflows either check out `main` or deploy `main`; do not run them for this candidate. A dedicated non-production branch deployment must use this exact candidate head and the public-only package. Owner real-phone acceptance remains outstanding.
- Release boundary unchanged: PR #168 remains draft/unmerged; production remains HOLD. No production deployment, Axxess upload, DNS/payment change, Supabase write, live stock/price/category change or supplier activation.


## 2026-11-04 — Hosted Netlify Deploy Preview verified

- Netlify Deploy Preview ID: `6aeaf4a0b68f051d9f119166`; state: `ready`; context: `deploy-preview`; PR: #168.
- Exact deployed commit: `776c840bb79a4833e0859d493b7463e6a34c1e73` (matches the passing full regression and owner-preview browser QA runs above).
- Owner preview URL: https://deploy-preview-168--get-wired-autoworx-store.netlify.app/owner-preview.html
- Deploy permalink: https://6aeaf4a0b68f051d9f119166--get-wired-autoworx-store.netlify.app
- Netlify confirmed the deployment is ready and that no password or SSO gate is configured. Treat this URL as publicly shareable; do not put credentials, banking details, or private supplier material into it.
- The page is an owner-review preview only. Checkout and Supabase writes are blocked by the preview wrapper; no production deploy was made. The Netlify project’s primary published deploy was not changed by this Deploy Preview.
- This supersedes the previous statement that no exact-head hosted preview URL existed: there is now an exact-head Netlify Deploy Preview. It does not imply production readiness or owner acceptance.
- Still outstanding for supplier-pilot closure: Planetworld remaining Car Audio classification/reconciliation and Audio Connections product/image/GW-SKU evidence; real-phone owner acceptance remains outstanding. ASC/Electro-city stay deferred until the Planetworld + Audio Connections pilot is accepted.

## 2026-11-04 — PR #168 non-production staging preview deployed

- Added a dedicated exact-triggering-commit deployment workflow: `.github/workflows/deploy-pr-168-staging-preview.yml`. It builds with `GW_INCLUDE_PREVIEW_ROUTES=1`, checks that owner/category/audio preview routes exist, and deploys only to Cloudflare Pages branch `pr-168-staging-preview`.
- Trigger commit: `af25aa9c5440c430d3a6a0422357db3a882ddc62`.
- Deployment run **41804611258** — SUCCESS. Cloudflare returned the alias: https://pr-168-staging-preview.get-wired-autoworx-store.pages.dev/
- The deployment is non-production. It does not change the `main` Pages branch or live domain. The public-only builder excluded suppliers, catalogue-review/source files, staging, Supabase and GitHub workflow files; source PDFs were not published.
- Owner Store Preview Browser QA run **41804611196** — SUCCESS on the same deployment-triggering commit. It checked approved root navigation, Sony → Amplifiers, department/brand stock hiding, 47 Trims & Harnesses rows, Aerials route, checkout hidden and Supabase writes blocked.
- Full regression previously passed on code head `776c840bb79a4833e0859d493b7463e6a34c1e73` (run **41804164474**). The later `af25aa9` commit added only the non-production deploy workflow and trigger marker; an additional runner regression is running against that commit.
- A further route-browser QA run is running after adding `index-new.html` to the route workflow's path filters, so homepage layout changes trigger route checks.
- Owner must still review the staging preview on a real phone and explicitly accept the category/navigation appearance. Do not mark owner acceptance complete without that confirmation.
- Production remains HOLD; PR #168 remains draft/unmerged. No production deployment, live DNS/payment change, Axxess upload, Supabase write, live stock/price change or supplier activation.

## 2026-11-04 — Final browser/regression verification closeout

- Latest application source head verified: `49166f76ab38d5c451757fec20584c6d0e7d75f5`. The only subsequent commit through current handover head `ca30ff594c4254beb6ae3c702e1201ba14197e62` updates this handover; no application source changed.
- Car Audio Accessories Route Browser QA run **41804797751** — SUCCESS on `49166f76ab38d5c451757fec20584c6d0e7d75f5`. It checked the three approved roots, Accessories with separate Aerials and Trims & Harnesses buttons, the 47-row Trims & Harnesses filtered listing, Aerials' separate zero-result filtered state, Kicker → Subwoofers filtering with no other brands leaking into results, zero browser JS errors and desktop horizontal overflow.
- Owner Store Preview Browser QA run **41804797657** — SUCCESS on the same source head. It checked the actual homepage → Car Audio & Video catalogue path, Sony → Amplifiers filtering, hidden products before component selection, separate Aerials/Trims routes, 47 fitment rows, checkout suppression and blocked Supabase writes.
- Current Branch Runner / full public Pages package regression run **41804797350** — SUCCESS on the same source head. Public SKU exposure audit, catalogue structure, Planetworld/Audio Connections preview tests and public package exclusions passed.
- Non-production Cloudflare Pages deployment run **41804611258** — SUCCESS; alias https://pr-168-staging-preview.get-wired-autoworx-store.pages.dev/ . It deployed the candidate at trigger commit `af25aa9c5440c430d3a6a0422357db3a882ddc62`. The application source was unchanged through `49166f7`; subsequent commits added QA path coverage and handover documentation only.
- Automated implementation and verification for route navigation and product filtering are complete. The remaining acceptance item is the owner's real-device review of the staging URL. Do not mark owner acceptance complete until explicitly confirmed.
- PR #168 remains draft/unmerged and production remains HOLD.

## 2026-11-04 — Exact-head route, filter, regression and hosted preview closure

- Application/test source head verified: `49166f76ab38d5c451757fec20584c6d0e7d75f5`. The later PR head `ca30ff594c4254beb6ae3c702e1201ba14197e62` changes only this handover file; no storefront source or test code changed after the verified source head.
- **Route/navigation issue: implementation and automated verification CLOSED.**
  - Owner Store Preview Browser QA run **41804797657** — SUCCESS on source head `49166f7`.
  - Dedicated Car Audio Accessories Route Browser QA run **41804797751** — SUCCESS on source head `49166f7`.
  - Full Current Branch Runner / public package regression run **41804797350** — SUCCESS on source head `49166f7`.
- Verified in browser:
  - The three homepage roots are Audio, Entertainment & Music; Auto Electrical Parts & Spares; Car Care & Accessories.
  - Car Audio & Video → Accessories contains exactly two distinct buttons: Aerials and Trims & Harnesses.
  - Trims & Harnesses opens its own product view with **47 matching Planetworld rows**; no Audio Connections fitment rows leak into this group.
  - Aerials opens its own filtered state with **0 matching products**, expected while ASC catalogue source data remains deferred.
  - Brand/component filtering is cumulative: Sony → Amplifiers returns filtered products; Kicker → Subwoofers returns Kicker-only products.
  - Department and brand landing pages hide product stock until a component is selected.
  - No browser JavaScript errors; mobile viewport route checks and desktop-width overflow check passed.
  - Owner preview hides checkout and confirms Supabase writes are blocked.
- Full regression output: `PAGES_PUBLIC_BUILD_PASS files=4133 webp_images=4101`; `AUDIO_CATALOGUE_PREVIEW_PASS` (Planetworld 3,317 source rows / 702 Car Audio division rows; Audio Connections 66 retained rows / 2 excluded; 65 approved image candidates); `THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS`; `PUBLIC SKU EXPOSURE AUDIT: PASSED`; `GW_FULL_STOREFRONT_REGRESSION_PASS`.
- **Hosted preview deployed:** Cloudflare Pages check run **126489043229** — SUCCESS on source head `49166f7`.
  - Branch preview: https://integration-three-category-c.get-wired-autoworx-store.pages.dev/owner-preview.html
  - Immutable deployment preview: https://d4344795.get-wired-autoworx-store.pages.dev/owner-preview.html
  - Separate non-production staging deployment run **41804611258** also succeeded at https://pr-168-staging-preview.get-wired-autoworx-store.pages.dev/owner-preview.html (trigger commit `af25aa9`; customer-only preview package, no source PDFs).
- The old “GitHub Actions minutes exhausted” assumption is resolved: public-repository hosted runners ran the exact test and browser workflows successfully. No private-minute allowance was needed for these public-repository runs.
- Separate check: the legacy **Workers Builds** integration check failed on this candidate while **Cloudflare Pages** succeeded. Do not conflate the Workers build status with the Pages preview deployment; investigate before any merge if that check is required.
- **Still open for supplier-pilot closure (not navigation):**
  - Planetworld: reconcile remaining Car Audio classification/model/image evidence across the 702 source rows; preserve the two source-ambiguous held rows and the explicitly excluded non-audio row.
  - Audio Connections: 66 retained preview-only rows; 4 image URLs currently present; 53 proposed GW SKUs still missing and 3 records lack indicative prices. Complete SKU, image/product-evidence and price reconciliation before pilot acceptance.
  - Do not start ASC/Electro-city until Planetworld + Audio Connections are completed and owner-accepted. Aerials remains empty until the separately authorised fresh ASC upload.
  - Owner still needs to inspect the hosted preview on the real phone and explicitly accept the layout. Automated browser success is not owner acceptance.
- PR #168 remains draft/unmerged. Production remains HOLD. No production deploy, merge, live stock/price activation, banking/payment activation, checkout go-live, DNS change, Axxess upload or Supabase production write is authorised.


## 2026-11-04 — Route blocker resolved on latest verified candidate

- Latest verified application/test head: `787dd596a201412693230880187ea05fc8ce7b9b`. The later commit `b4f593495bfb4d7c9a6a4ebfe32044d7be1854eb` updates only the internal Planetworld taxonomy-review metadata to match the completed classification; it does not change storefront code or tests.
- **The previously reported route-level buttons and product-filtering blocker is CLOSED for automated implementation and QA.**
  - Dedicated Car Audio Accessories Route Browser QA run **41808941493** — SUCCESS on `787dd59`.
  - Current Branch Runner / full public-package regression run **41808941434** — SUCCESS on `787dd59`.
  - Owner Store Preview Browser QA run **41808941525** — SUCCESS on `787dd59`, including the deployed hosted-preview interaction check.
  - Cloudflare Pages exact-head check **126503286295** — SUCCESS; immutable preview: https://c1e01abf.get-wired-autoworx-store.pages.dev/owner-preview.html
- Root cause found and fixed for the hosted owner-preview discrepancy: live Supabase category refresh could replace the committed local category snapshot in the embedded storefront, so the hosted preview did not consistently render the approved nested Car Audio route. The owner-preview iframe now loads `index-new.html?ownerPreview=1`; owner-preview mode skips the live category refresh and uses the committed category snapshot. Regression coverage requires this exact iframe flag. The hosted test now confirms the Car Audio & Video route, Sony → Amplifiers, the 47-row Trims & Harnesses filter, Aerials' separate empty route, checkout suppression, and blocked Supabase writes.
- Full regression on `787dd59`: `PAGES_PUBLIC_BUILD_PASS files=4133 webp_images=4101`; `AUDIO_CATALOGUE_PREVIEW_PASS` (Planetworld 3,317 rows / 702 Car Audio rows; Audio Connections 66 retained rows / 2 excluded; 65 approved image candidates); `THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS`; `PUBLIC SKU EXPOSURE AUDIT: PASSED`; `GW_FULL_STOREFRONT_REGRESSION_PASS`.
- Planetworld review metadata was inconsistent with the current preview data. The two formerly ambiguous rows are now classified preview-only with qualified evidence: BOX-10 → Car Audio Accessories based on reseller-catalogue corroboration (exact physical form/fitment still unverified); ON014-F3 → Fascia & Fitting Kits based on adjacent ON014-F1/ON014-F4 model-family context (exact fitment/image still unverified). All 234 formerly unclassified preview rows are now assigned a component; zero remain held/unclassified. Updated `catalogue-review/planetworld-car-audio-taxonomy-review.json` to match the current preview and manual-review record. No live data, pricing, stock, SKU, or supplier activation changed.
- Audio Connections supplier review continued in parallel: latest source update restored Sony wattage details from the supplier review. Current preview remains 66 rows, with 13 proposed GW SKUs present (53 still need proposals/reconciliation), 4 image URLs, and 3 rows without indicative prices. Seven Starsound power strings remain flagged for supplier confirmation; do not guess RMS/peak values or missing digits.
- Exact hosted preview for the verified code/test head: https://c1e01abf.get-wired-autoworx-store.pages.dev/owner-preview.html . Netlify Deploy Preview is also being generated automatically for PR #168; prefer the immutable Cloudflare URL above for the exact verified head.
- The legacy **Workers Builds** integration check continues to fail while Cloudflare Pages succeeds. It is a separate legacy Worker build integration and did not prevent the exact-head Pages preview deployment or browser QA. Investigate before merge if it is a required status; do not treat it as a Pages deployment failure.
- **Owner acceptance remains outstanding:** the owner must inspect the exact hosted preview on a real phone and explicitly accept the layout. Automated browser checks do not replace this acceptance.
- PR #168 remains draft/open/unmerged. Production remains HOLD. No production deployment, Axxess upload, DNS/payment change, banking details, live stock/price update, checkout go-live, supplier activation, or Supabase production write is authorised.
