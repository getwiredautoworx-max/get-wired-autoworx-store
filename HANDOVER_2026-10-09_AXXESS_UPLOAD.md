# GET WIRED AUTOWORX — HANDOVER MESSAGE
Updated: 2026-10-09 18:25 SAST
Repository: https://github.com/getwiredautoworx-max/get-wired-autoworx-store
Branch: main
Master handover: GET_WIRED_AUTOWORX_HANDOVER.md

## THE 8 PERMANENT RULES
1. Preserve existing store as foundation; do not rebuild unnecessarily or overwrite working components.
2. Execute efficiently in one flow; complete all available tasks instead of stopping after every individual step.
3. Only interrupt when genuinely necessary; notify user when input/approval/credentials/permissions are actually required.
4. The 8 rules are permanent; read at start of every continuation session and carry into every new handover.
5. All 8 rules must be copied unchanged into every new handover; may not be omitted/edited/removed without permission. If rules themselves edited/removed, reproduce all 8 first.
6. Do not use Cloudflare or Netlify credits until final testing; reserve credit-dependent work for end-stage testing/deployment.
7. Update master handover after every successfully completed task so next session continues from exact current state.
8. Maintain project continuity and authority; existing work, decisions, data, structure and approved requirements remain in force unless user explicitly authorizes change; do not assume changes that could interfere with online store.

## CURRENT AXXESS UPLOAD CHECKPOINT — 2026-10-09

### Verified
- GitHub Actions workflow “Prepare Axxess upload package” run #4 completed successfully in 15 seconds.
- Commit: b5f66a666d369502201c2a76ef4387e0a2d2d7de.
- Artifact: axxess-storefront-upload, 54.7 MB.
- Artifact SHA-256 shown by GitHub: 5f12833d18707e27af368f0040933e85a10ec632c7f3580054f3cf2c8fea43ad.
- Workflow notices: Node.js 20 deprecation notice for actions/checkout@v4 and actions/upload-artifact@v4; Ubuntu-latest migration notice for 2026-10-19. These did not fail this build.
- The artifact exists at: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/37956100308
- User's Axxess DirectAdmin File Manager was previously opened; current target is the domain's public_html directory for getwiredauto.co.za.
- Intended public URL: https://www.getwiredauto.co.za

### Not yet verified / do not claim complete
- The 54.7 MB artifact has not yet been confirmed downloaded to the user's device.
- The ZIP has NOT yet been extracted into Axxess public_html.
- Live hosting files, SSL, DNS and public storefront functionality have NOT been independently verified after upload.
- A successful GitHub Actions package build does not prove that the website is working on Axxess.

### Exact next actions
1. User opens the workflow link above, scrolls to Artifacts, and downloads “axxess-storefront-upload”.
2. In DirectAdmin File Manager, open public_html. Before overwriting existing files, make a backup if possible.
3. Extract the ZIP contents directly into public_html, not into a nested new folder. Allow package files to replace their older counterparts only after backup. Preserve cgi-bin and unrelated hosting files.
4. Verify the ZIP contains the expected website entry point and required assets before or during extraction. Do not delete existing files blindly.
5. Test https://www.getwiredauto.co.za and check homepage/backgrounds, images, categories, search, product details, cart and checkout. Check SSL for both apex and www.
6. Record results and failures in this handover and the master handover. Do not claim any live test succeeded without evidence.

## DEPLOYMENT / CREDIT GUARDRAILS
- Axxess is the current target for this static storefront upload.
- Do not trigger Cloudflare or Netlify deployment/credits for this Axxess task.
- Do not change hosting settings, DNS or domain configuration without need and explicit authorization.
- Never ask the user to paste passwords or private credentials into chat.

## CURRENT STATUS
- Package build: SUCCESS.
- Artifact download: awaiting user confirmation.
- Axxess upload/extraction: NOT DONE / awaiting user action.
- Live-site QA after upload: NOT DONE.
- ETA: User-controlled download and extraction usually take several minutes; allow another 15–30 minutes for careful upload and basic QA once files are in place. This is an estimate, not a completed task.
- Known build notices: Node.js 20 deprecation and Ubuntu runner migration; neither blocked artifact generation.
- If ZIP extraction fails: try downloading the artifact again, confirm available disk space (Axxess account allocation is 2 GB), and extract via DirectAdmin File Manager or upload/extract using the hosting provider's supported method. Do not partially delete the live site as a workaround.

## STORE REQUIREMENTS TO PRESERVE
- Preserve the approved existing storefront design; do not redesign or rebuild.
- Customer-facing store is static HTML/JS and uses the existing Supabase project; do not assume Supabase data is bundled in the ZIP.
- Product images must be exact-SKU verified; do not substitute visually similar products or claim image coverage is complete while placeholders remain.
- Keep product categories and subcategories correctly assigned; accessories/spares must not be mixed incorrectly.
- Current owner-approved checkout terms recorded in the master handover: pickup has no pickup charge; delivery is quoted according to selected courier/PAXI option; packaging is R25 per item. Do not revive older fixed-R15 delivery rules.
- Keep supplier SKUs and supplier cost information hidden from customers.
