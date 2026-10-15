# Get Wired AutoWorx — Follow-up Verification — 2026-10-15 18:40 SAST

## Exact live-source mismatch narrowed

The failed Live Release Gates run #17 job log was inspected. Among the five explicitly hashed live files, four match repository source and one does not:
- Match: `index.html`
- **Mismatch: `index-new.html`**
- Match: `category.html`
- Match: `checkout-v2.html`
- Match: `assets/category-tree.json`

Live route HTTP checks returned 200 for `/index.html`, `/checkout-v2.html`, and `/returns-refunds.html`. This narrows the mismatch to the deployed `index-new.html` in the logged comparison. The verified Axxess deployment ZIP includes the repository's current `index-new.html`. Axxess has not been changed; resolve via an approved upload/sync only after preserving the current installation and reviewing the package.

## APK download recovered and verified

- Dedicated APK repository: https://github.com/getwiredautoworx-max/get-wired-autoworx-owner-apk-validation
- Run #48: https://github.com/getwiredautoworx-max/get-wired-autoworx-owner-apk-validation/actions/runs/37658519204
- Signed-release artifact: ID `11500252099`, name `get-wired-owner-signed-release`, available until 2027-01-05.
- All three jobs passed: debug build, signed-release build/signature verification, and Android emulator smoke test.
- Downloaded artifact ZIP and verified its integrity; extracted APK is an Android package with an APK signing block. SHA-256 from artifact's signed checksum file: `45a981a454131b30b899f7595c668b1f30cddf2bfd95863743d39c040e406497`.
- The release uses a temporary CI signing key, not a stable owner-approved production signing identity. Physical install/launch/acceptance on the owner's Android device remains outstanding.
- User-facing file links were supplied in chat for the signed-release artifact ZIP and extracted APK. The storefront deployment ZIP and APK are separate deliverables.

## Release posture

Storefront release remains HOLD: the live `index-new.html` source mismatch and PayFast/PayJustNow readiness remain unresolved. No Axxess upload, Supabase database write, DNS change, or payment configuration change was performed.
