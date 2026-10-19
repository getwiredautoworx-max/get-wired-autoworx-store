# Get Wired AutoWorx — 20:56 checkpoint recovery continuation
Date: 2026-10-19 23:48 SAST

## Verified recovery source
- Owner-designated reference preview: https://1fdda0ab.get-wired-autoworx-store.pages.dev/store
- Preferred source checkpoint: commit `6b7cf26b86fd4eaa1a88baad1c1d20efd2d5c9c8` (20:56 SAST).
- The restored `index-new.html` blob SHA is `420279137007c8ee7252e5c0d471e99b3705375d`, byte-identical to the checkpoint.
- Restoration commit on main: `75e1e3d2da969f886b98c96e0ac2e390ed0f1f3a`; the later mobile CSS override is not present in this restored file.
- Preview-only PR #62: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/62
- Recovery branch: `recovery/store-2056-checkpoint`, head `55c36171bd8fe0a0ccb4ddcba3e1ecfb6604590b`.

## Preview deployment evidence
- Cloudflare PR bot reported successful Pages deployment for recovery head `55c3617`.
- Preview URL: https://b9d0ca19.get-wired-autoworx-store.pages.dev/store
- Branch preview URL: https://recovery-store-2056-checkpoi.get-wired-autoworx-store.pages.dev/store
- A separate Cloudflare Workers build comment for the same commit reports failure. Do not confuse that Worker build with the successful Pages preview; they are separate deployment integrations.
- Current web inspection tool could not fetch the preview pages, so the actual rendered layout and button separation have NOT been independently visually verified in this continuation. A successful Cloudflare deployment is not itself visual acceptance.
- Existing responsive QA run `39299231700` passed at 1440px, 390px and 320px for revision `51768071066662aad5440208ce2064f3da39572e`, but this is not proof that the exact checkpoint was served by the preview. Its screenshots show placeholder product images.

## Safety / next action
- Preserve the 20:56 checkpoint as the visual baseline.
- Check the restored preview on the owner's Android phone at the exact `/store` path. Confirm Shop Now, Part Search and Request a Part are distinct, do not overlap, and the rest of the layout matches the reference.
- If a defect is found, make one targeted change on an isolated review branch, then re-preview and verify; do not reapply broad mobile CSS changes.
- Keep PR #62 unmerged pending visual acceptance.
- Do not trigger the manual workflow `.github/workflows/cloudflare-layout-preview.yml` for this recovery: it checks out `main`, not the recovery branch.
- No production deployment, Axxess change, DNS change, Supabase write, checkout/payment change, or merge occurred during this continuation.
- Store release remains HOLD.
