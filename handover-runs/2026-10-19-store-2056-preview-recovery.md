# 20:56 SAST storefront recovery — 2026-10-19

## Purpose
Recover an isolated preview of the store source from the owner's preferred 20:56 SAST checkpoint. This is a preview-only branch and must not be merged or deployed to production without explicit approval.

## Source integrity
- Recovery branch: `recovery/store-2056-checkpoint`
- Branch base commit: `75e1e3d2da969f886b98c96e0ac2e390ed0f1f3a`
- Checkpoint commit: `6b7cf26b86fd4eaa1a88baad1c1d20efd2d5c9c8`
- `index-new.html` blob SHA at both commits: `420279137007c8ee7252e5c0d471e99b3705375d`
- The source file is therefore byte-identical to the recorded checkpoint.

## Existing browser QA evidence
Artifact `staging-browser-qa-118`, workflow run `39299231700`, tested revision `51768071066662aad5440208ce2064f3da39572e`. Its retained screenshots at 1440px, 390px, and 320px show the hero action buttons separated rather than overlapping. The report records no horizontal overflow and no measured header/category overlaps. This evidence does NOT prove that the artifact was built from the exact 20:56 checkpoint or that the current public preview serves that source.

## Remaining blockers
- No verified Cloudflare preview URL has yet been tied to this recovery branch / exact source.
- The QA screenshots show eight product cards using `product-image-pending.svg`; product imagery is not launch-ready.
- Do not dispatch `.github/workflows/cloudflare-layout-preview.yml`: it checks out `main` and deploys to the `layout-fix-preview` Pages branch, not this recovery branch.
- No production deployment, Axxess/DNS change, Supabase write, checkout/payment change, or merge is authorized by this recovery work.
- Store release remains HOLD.

## Next step
Use a draft PR/Cloudflare preview solely to obtain a preview for this exact branch, verify the served source/revision, and visually inspect desktop/mobile. If no isolated preview can be generated, keep the restored source and report the exact access/configuration blocker rather than deploying production.
