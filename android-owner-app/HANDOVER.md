# Get Wired AutoWorx Owner APK — continuation handover

Updated: 2026-11-07
Active source: `android-owner-app/` in `getwiredautoworx-max/get-wired-autoworx-store`
Working branch: `apk/owner-app-security-artifact-2026-11-07`
Base commit: `3e64d08a0c7c1ce124bdb1fb6db6c26905ec0717`

## Project position

The integrated Owner APK project in the storefront repository is the active source. Do not resume from the older validation-only WebView wrapper repository unless the owner explicitly asks for it. The integrated app is a mobile Owner control app, not merely a link launcher.

Existing functionality in the integrated project:
- Supabase Owner login (password and email-link options).
- Local CSV / XLS / XLSX catalogue and pricelist staging.
- Manual SKU-to-supplier-URL source tracking and verification status.
- Explicit row review before the separate `owner_publish_product` RPC action.
- Caelex portal launch and authenticated page capture bridge.
- Bundled customer storefront test route.
- Store admin/order-management route.
- Supplier quote request workflow.

App identity on the integrated source:
- Package: `za.co.getwiredautoworx.owner`
- Version: `1.0.2` / versionCode `3`
- Debug test variant suffix: `.test`
- Android min SDK 23, target/compile SDK 35.

## Changes on this branch

- Isolated the JavaScript interface exposed to the Caelex portal from the more privileged Owner-side bridge. Caelex receives only page-capture and return-to-app operations; it cannot read or clear locally stored captures or launch other Owner operations.
- Restricted in-WebView top-level navigation to bundled `file:///android_asset/` pages and the explicit Caelex portal origin. Other HTTP(S), mailto and tel links open in the external Android app/browser.
- Kept file selection available for the local catalogue import workflow.
- Corrected supplier source links to navigate through the external-link policy instead of opening a blank WebView target.
- Removed the repository-variable gate that previously prevented the APK artifact from uploading by default. The workflow now uploads the debug install-test APK and SHA-256 checksum with 7-day retention.
- Emulator job installs and launches the `.test` package on Android API 35.

## Build and release boundaries

- The workflow must reach terminal success before the APK is described as built and emulator-validated.
- Expected artifact name: `get-wired-autoworx-owner-install-test-apk`.
- This debug APK is for installation/testing only. It is not a stable signed production release.
- A permanent owner-controlled signing identity is still required for repeatable release upgrades. Do not generate a fresh temporary release key per build and present it as an update-safe production APK. The owner-controlled keystore must remain outside Git and be supplied through protected GitHub Actions secrets when the owner is ready.
- Physical installation and acceptance on the owner's Android phone remain outstanding until the owner installs and tests the artifact.
- No credentials, signing keys, payment secrets or supplier passwords may be committed or requested in chat.

## Store safety constraints

- Do not import or publish catalogues, change live prices/stock/categories, write to production Supabase, merge to main, deploy to Axxess/Cloudflare/Netlify, or alter DNS/payment settings without the owner's explicit approval.
- Catalogue rows remain local review staging until an owner deliberately approves an individual publish action.
- Keep the Owner APK separate from the customer storefront release and separate from future pet projects.
- Do not spend Replit, Cloudflare or Netlify credits.

## Next steps

1. Run the branch workflow and verify Gradle build, APK artifact, SHA-256, emulator installation and launch.
2. Inspect the artifact contents and confirm the bundled storefront/admin assets are present.
3. Fix any compile, build or emulator failures on this branch; do not claim success until the exact head is validated.
4. Add automated tests for CSV/XLSX import, duplicate supplier SKU detection, source verification evidence, and prevention of accidental duplicate publish.
5. Review catalogue staging durability/export and make the source-verification process evidence-based before expanding live publishing.
6. Create a permanent release signing process only after the owner supplies an owner-controlled signing identity through GitHub secrets.
7. Ask the owner to install the debug APK on the Android phone and report the actual result.

## Current validation state

Pending until the GitHub Actions run for this branch reaches a terminal result. No APK artifact or emulator result is claimed by this handover.


## 2026-11-07 follow-up

- Draft PR: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/184
- Latest branch head at this checkpoint: `721952bf86fb8d498a95b8490d59f9d669106956`.
- Follow-up fix ensures Caelex capture validation and WebView access happen on the Android UI thread.
- Build workflow now also declares a `pull_request` trigger for PRs targeting `main`.
- GitHub Actions run metadata and commit status checks have not yet returned a run/check for the latest PR head. Therefore no build, artifact or emulator success is claimed.
- Cloudflare's existing PR integration posted a separate storefront preview status; this is not an APK build or APK validation result. Do not use that preview as evidence of APK readiness.


- Latest follow-up commit: `a2bfe6aa47eb8e92b0c6523fa37cc532b71e7225`.
- Removed the Owner-screen Caelex capture button because capture is now deliberately available only through the Caelex page's limited bridge overlay. The Owner screen retains local capture review and clear controls.
- Build/emulator validation remains unverified; no GitHub Actions run or commit status has been returned for this PR head.
