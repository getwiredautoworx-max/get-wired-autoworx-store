# Get Wired AutoWorx — 20:56 checkpoint recovery continuation
Date: 2026-10-20 SAST — handover update

## Owner-approved baseline and constraints
- Owner confirms the store at approximately 20:56 SAST was the correct version and wants it preserved: https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- No redesign. Only precise, minor fixes if the recovery preview is proven to differ from the approved reference.
- Keep Shop Now, Part Search, and Request a Part separate and functional. Do not apply the later mobile CSS changes that caused overlap.
- Keep recovery and all testing isolated in GitHub previews. Do not change production, Axxess, DNS, checkout, payments, or Supabase without explicit owner approval.
- The approved reference is not proof that the recovery preview renders identically; visual equivalence must be checked before accepting further changes.

## Verified recovery source
- Preferred source checkpoint: commit `6b7cf26b86fd4eaa1a88baad1c1d20efd2d5c9c8` (20:56 SAST).
- Restored `index-new.html` blob SHA: `420279137007c8ee7252e5c0d471e99b3705375d`, byte-identical to the checkpoint.
- Restoration commit on main: `75e1e3d2da969f886b98c96e0ac2e390ed0f1f3a`; the later mobile CSS override is not present in this restored file.
- Preview-only PR #62: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/62
- Recovery branch: `recovery/store-2056-checkpoint`, head `55c36171bd8fe0a0ccb4ddcba3e1ecfb6604590b`.

## Preview deployment evidence and gaps
- Cloudflare PR bot reported successful Pages deployment for recovery head `55c3617`.
- Preview URL: https://b9d0ca19.get-wired-autoworx-store.pages.dev/store
- Branch preview URL: https://recovery-store-2056-checkpoi.get-wired-autoworx-store.pages.dev/store
- A separate Cloudflare Workers build comment for the same commit reports failure. This is a separate integration from the successful Pages preview.
- Visual equivalence and button separation have NOT been independently verified in the recovery preview. A successful deployment is not visual acceptance.
- Existing responsive QA run `39299231700` passed at 1440px, 390px and 320px for revision `51768071066662aad5440208ce2064f3da39572e`, not the exact checkpoint; screenshots showed placeholder product images.

## Next actions / release gate
1. Verify the recovery preview against the approved reference, including mobile rendering and all three distinct buttons.
2. If a defect is proven, make one targeted change on an isolated review branch and re-test; no broad mobile CSS changes.
3. Keep PR #62 unmerged until visual acceptance.
4. Do not trigger `.github/workflows/cloudflare-layout-preview.yml` for this recovery: it checks out `main`, not the recovery branch.
5. No production deployment, Axxess change, DNS change, Supabase write, checkout/payment change, or merge is authorized by this handover update.
- Store release remains HOLD until visual verification is complete.
