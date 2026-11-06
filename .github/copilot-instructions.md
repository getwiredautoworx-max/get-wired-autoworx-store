# GitHub Copilot instructions — Get Wired AutoWorx

## Project and authority
This repository contains the Get Wired AutoWorx automotive e-commerce storefront, catalogue data and assets, supporting owner/admin tooling, and validation/deployment workflows. The storefront uses browser JavaScript/HTML/CSS, Supabase services and Cloudflare Pages previews; inspect the current files and workflows before assuming a framework, package manager, build command or deployment path.

Before substantive work, read the latest owner handover and execution brief linked from the repository README, then inspect the active pull request/branch and the owner's latest direct instructions. The owner's latest instruction takes precedence over older notes. Keep the handover current when meaningful progress, decisions, blockers or failures occur.

## Non-negotiable owner and release controls
- Treat production as HOLD unless the owner explicitly approves a specific production action. Never merge, deploy to production, upload to Axxess, change DNS, alter payment configuration, make live stock/price/category changes, or write production Supabase data without explicit approval.
- Work on a dedicated reviewable branch and pull request. Keep catalogue and storefront work preview-only until the owner accepts the exact preview and explicitly authorizes release.
- Never claim completion/readiness based on local tests alone. Record exact commit SHA, relevant workflow run IDs, hosted preview URL, browser/device coverage, failures and owner acceptance status. Do not claim an unverified check passed.
- Do not trigger production/release workflows, credit-consuming deployments, or broad workflow reruns automatically. Inspect workflow definitions and obtain owner approval when a run could affect production or incur meaningful cost.
- Never commit secrets, credentials, customer personal data, private banking/payment information or confidential supplier pricing.

## Storefront and catalogue rules
- Preserve the approved eight top-level storefront categories and owner-directed hierarchy. Current ASC placements: Aerials under Car Audio Accessories; Car Mats under Car Care & Accessories; Sensors, Switches, Automotive Globes and Fuel Pumps each in their own subcategory under Auto Electrical Parts & Spares. Do not silently move products or invent categories.
- Keep supplier names and supplier-only identifiers out of customer-facing content unless the owner expressly approves disclosure. Preserve source traceability internally: supplier/source file/version/page, exact model/variant/SKU evidence, proposed Get Wired SKU, category decision, confidence and review state.
- Never invent product identity, compatibility, technical specifications, prices, stock, availability or Get Wired SKUs. Distinguish OCR/extraction suggestions from source-confirmed facts and human-reviewed decisions. Unverified records remain review-only and non-purchasable.
- Keep product photographs separate from descriptions. Do not bake catalogue headings/descriptions into the displayed image or obscure product details with text. Preserve the complete product and its proportions; do not enlarge/crop so edges or components disappear. Prefer contain/padding over destructive cropping.
- For ASC images only, the owner has explicitly confirmed supplier permission to remove the ASC watermark and replace it with the Get Wired AutoWorx logo. Use the repository's actual `assets/gw-logo.png` asset; do not recreate the logo as text. Apply a clearly visible but unobtrusive watermark that does not obscure the product. Preserve untouched source originals and source/page/hash traceability. Make the processing repeatable and idempotent: reprocessing must not stack watermarks or degrade an already processed image. This ASC permission does not extend to other suppliers or assets.
- Image identity and image-use permission are separate checks. Record the owner's ASC permission accurately, but do not generalize it to Planetworld, Electro-city, Audio Connections or other sources.
- Keep product descriptions in the store's text fields, not in the image pixels. Check mobile and desktop rendering, including full-product visibility and watermark legibility.

## Engineering and validation practices
- First inspect the relevant code, data contract, tests and GitHub Actions workflow. Follow existing patterns; avoid broad rewrites and unrelated cleanup.
- Do not assume a root `package.json` or a particular npm/build/lint command exists. Discover and document actual scripts/workflows before running commands. Never invent a test result.
- Make small, focused changes. Add or update regression tests for defects, especially image geometry/watermark behavior, category routing, image loading, customer-facing text separation and preview/production safety boundaries.
- For image-processing changes, test a representative sample including Fuel Pumps and any previously defective images. Verify output dimensions, full product bounds, readable watermark, no catalogue description text, source backup preservation and repeat-run idempotence.
- For UI changes, validate all affected routes and category links, product image loading, no horizontal overflow, and mobile/desktop layouts. Use the project's established browser QA rather than substituting screenshots or static inspection for runtime verification.
- Keep supplier records preview-only unless separately authorized. Do not activate checkout/payment, expose unapproved stock/pricing, or change Supabase production data as part of catalogue enrichment.
- Report what changed, files/records affected, exact commit SHA, tests actually run and their results, preview URL, remaining uncertainties and owner decisions required.

## Collaboration
Copilot is an assistant, not an approval authority. Propose changes in reviewable diffs; explain risks and evidence. Do not merge, deploy, publish, or treat inferred instructions as owner approval. If instructions conflict or source evidence is missing, preserve the safer existing state and ask one concise question only when the missing decision blocks progress.
