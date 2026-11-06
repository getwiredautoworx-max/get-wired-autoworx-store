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


### Owner decision — pilot-first image correction (6 Nov 2026, latest)
- Owner explicitly directed: correct the 50 sample images first; once the sample method is accepted, apply the same method to the remaining catalogue records and upload them.
- Inspection found the existing image script did not meet the owner's revised acceptance criteria: it tight-cropped product bounds, used a generated text watermark instead of the actual logo, and its workflow committed image outputs automatically. Treat the previous image output as rejected; do not describe the 50 images as corrected.
- Replaced the processing approach with a conservative six-catalogue pilot. The new script reads preserved originals, never crops or enlarges the source frame, contains the complete image on a 600×600 neutral canvas, uses the actual `assets/gw-logo.png` in the reserved lower margin, and only OCR-cleans catalogue text in outer bands. OCR text near the product is reported for manual review rather than erased.
- Sample set: Aerials `asc-ma522.jpg`; Sensors `asc-01080.jpg`; Switches `asc-21849.jpg`; Globes `asc-9005-cbl-h.jpg`; Fuel Pumps `asc-f1-012.jpg`; Car Mats `asc-m7-avan01.jpg`.
- Updated `tests/test_asc_watermark.py` for full-frame contain, actual logo asset, deterministic regeneration and OCR cleanup reporting.
- Replaced the old image workflow with an artifact-only six-sample review workflow. It does not write image binaries, commit outputs, push to main, or deploy. This protects the 50 current pilot images until the owner accepts the visual treatment.
- Script commit: `51d8a9a62cdf9ce4eab45ccadb0cc82194fa596b`; test commit: `506645b34ba4c7190c6349902af7042e870c853a`; workflow commit / run head: `dc148102eedafc41ca9b775378a755ecab9619b4`.
- GitHub Actions run `42185179286` (“ASC Image Pilot Review”) was triggered on the branch. At the time of this update it was still running dependency installation; tests, image generation, artifact upload and visual review are NOT yet confirmed.
- Important limitation: this is a cautious pilot preparation, not yet proof that every ASC watermark has been removed. Inspect the six rendered samples and OCR review report first. Any graphical ASC mark not removed by safe OCR cleanup must be addressed before approval; never hide or inpaint product detail.
- Next: finish and inspect the six-sample artifact; fix any issues; then generate and visually review all 50 from originals, update preview image references only after owner acceptance, and only then apply the same verified method to the remaining 933 records. Keep all catalogue data preview-only, preserve source/page traceability, and retain null price/stock.
- This supersedes earlier handover/PR wording that described the old text-watermark outputs as complete or accepted. Production remains HOLD; PR #177 remains draft/unmerged.


### Six-sample visual inspection checkpoint — 6 Nov 2026
- Pilot workflow run `42185290533` passed its two regression tests, generated six outputs, validated six catalogue labels and uploaded artifact `asc-six-catalogue-image-sample` (artifact ID `13487411001`). This first output set was visually inspected and rejected: the original 181×209 source card crops contain substantial white margin, so contain-layout alone made products too small and catalogue wording remained in the image.
- Untouched original pilot crops were then added to the artifact. Visual inspection confirmed that the 181×209 source card crop itself is insufficient for some products; the ignition-switch crop appears cut at the right edge. Padding cannot recover missing source pixels.
- The workflow now packages all six original ASC PDFs alongside the original sample crops and six rendered samples so full-resolution page extraction and crop bounds can be checked. Updated workflow commit: `38edb9be697d948c2b0c570e024f8b2e6b20f3fd`.
- Latest full-source review run: `42185605356` on the exact workflow commit above. It was still in progress at this checkpoint; its PDF-inclusive artifact and final result are not yet verified.
- Current image output remains a rejected experiment only. No pilot product image binaries or preview manifest references have been replaced. No production or live catalogue changes.
- Next technical step is to render each selected source PDF page at high resolution, locate the exact catalogue card/product-photo region, exclude the printed description and header, and ensure the complete physical product bounds remain inside the crop. Where the source PDF page itself clips an item, flag for a better source image rather than inventing missing edges.
- The sample acceptance gate remains: all six catalogues represented; full product and components visible; no embedded catalogue description; actual `assets/gw-logo.png` clearly visible without obscuring product; ASC watermark properly replaced only where safely possible; source PDF/page and original hashes preserved; idempotent processing; visual owner review before the remaining 44 pilot images or 933 further records are processed.
- Do not batch the current method. Do not describe the 50 sample as corrected. Production remains HOLD; PR #177 remains OPEN / DRAFT / UNMERGED.
