# Owner handover addendum — 2026-11-06
## ASC product-image correction and GitHub Copilot preparation

Repository: getwiredautoworx-max/get-wired-autoworx-store  
Active workstream: PR #177 — https://github.com/getwiredautoworx-max/get-wired-autoworx-store/pull/177  
Branch: `integration/asc-auto-electrical-clean-2026-11-05`

### Explicit owner decisions
1. Owner confirms ASC permits removal of ASC watermarks and replacement with the Get Wired AutoWorx logo.
2. Owner approves proceeding with GitHub Copilot setup for this repository.
3. Owner corrected the prior image-treatment result: product images had been enlarged/cropped so the complete product was not visible, while the Get Wired branding was tiny text rather than the actual logo. That treatment is rejected and must be corrected from preserved originals.

### ASC image acceptance requirements — supersede the earlier pilot watermark presentation
- Remove the ASC watermark from ASC images and replace it with the actual Get Wired AutoWorx logo asset at `assets/gw-logo.png`. This permission applies to ASC only; do not extend it to other suppliers.
- Do not use a text-only "GET WIRED AUTOWORX" substitute. Use the actual logo image.
- Show the entire product, including all edges, fittings and components. Do not enlarge the product to fill the square, crop product edges, or use destructive trimming. Preserve source aspect ratio and add neutral/white padding where needed.
- The Get Wired logo watermark must be clearly visible at normal catalogue-card size and on mobile, but must not cover key product details. Tune its scale and placement against the product image; do not make it tiny.
- Remove catalogue descriptions, headings, page numbers and other catalogue text from the product-photo area. Keep product descriptions in the storefront text fields, outside the image.
- Always regenerate from untouched original catalogue crops, never from a previously watermarked or repeatedly compressed output. Keep source originals, source PDF/page references and deterministic output mapping. Processing must be idempotent and must not stack marks.
- Review a representative set including Fuel Pumps (the previously defective example), aerials, mats, sensors, switches and globes before batch processing all 50 pilot images. Verify full product bounds, no embedded description text, actual logo visibility, image dimensions, source backup preservation and repeat-run idempotence. Then verify all affected cards on mobile and desktop in the hosted preview.
- Do not claim the image correction is complete until the revised image files are committed and the exact deployed preview has been visually checked. This addendum records permission and acceptance criteria, not completed image processing.

### GitHub Copilot setup — repository preparation committed
- Added repository-wide instructions at `.github/copilot-instructions.md` on the active PR #177 branch.
- Commit: `639a9cb83b598e4debf758d3c0acd2447fb440d8`.
- File verified on the branch: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/integration/asc-auto-electrical-clean-2026-11-05/.github/copilot-instructions.md
- Instructions cover owner authority, production hold, preview-only catalogue handling, source traceability, ASC-specific watermark permission, actual logo usage, image-quality acceptance, and validation/reporting rules.
- No GitHub Actions workflow runs or status checks were returned for this documentation commit at the time of verification.
- Repository instructions are preparation, not proof that a Copilot subscription, Copilot coding agent entitlement, repository feature setting or code-review feature has been enabled. Owner must have an eligible Copilot plan and enable/use the desired Copilot features in GitHub. Do not claim account-level activation without confirming it in GitHub.
- PR #177 remains draft/unmerged. No production action was taken.

### Immediate continuation
1. Correct the image-processing pipeline and pilot images from originals using the acceptance criteria above.
2. Visually inspect the Fuel Pumps example and at least one image from each other catalogue family before processing the remaining pilot images.
3. Verify all six catalogue routes and the revised images on the exact hosted preview head, desktop and mobile.
4. Use Copilot for bounded code-review or implementation tasks only after the owner confirms the feature is available; review all generated diffs and test results.
5. Keep the remaining 933 source records review-only until their product identity, descriptions, fitments and image matches are reconciled.

### Release boundary
Production remains HOLD. No merge, production deployment, Axxess upload, DNS change, Supabase write, live price/stock/category mutation, payment activation or checkout activation is authorized by this addendum.
