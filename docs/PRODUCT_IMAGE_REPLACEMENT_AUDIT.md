# Product Image Replacement and Rights Verification

Status: staging policy and audit checklist; no individual product image is approved by this document.

## Non-negotiable exact-match rule
Never replace an individual product image with a visually similar part. The replacement must be verified against the exact supplier/manufacturer part number or SKU and all available identifying details:
- Manufacturer/brand and exact part number, including suffix/revision.
- Physical form, dimensions, mounting points, connector/pin layout, terminal orientation, number of terminals, and included hardware.
- Colour, finish, material, markings, and package contents where relevant.
- Vehicle/application and fitment range; voltage/current/rating and left/right/front/rear distinctions where relevant.
- Any model-year or production revision that changes the part.

A matching category, title, vehicle, or approximate appearance alone is insufficient. If any important detail cannot be verified, retain the existing image only if its rights are documented; otherwise use the store's neutral “image being verified” placeholder and flag the product for manual review. Do not fabricate OEM/aftermarket equivalence.

## Image-rights gate
Do not assume an image is copyright-free because it is online, unwatermarked, supplied by a reseller, or depicts a generic aftermarket part. Accept only:
1. Original photograph taken by Get Wired AutoWorx or a contributor with documented commercial-use rights; or
2. Manufacturer/distributor asset with written permission covering commercial e-commerce use and necessary resizing/cropping; or
3. An image carrying a verified licence that explicitly permits commercial reuse and modification, with attribution/other conditions recorded.

Record the original source URL/file, rights holder, licence/permission evidence, retrieval date, permitted edits, attribution requirements, and reviewer. Never remove watermarks or supplier marks to conceal provenance. Never label an aftermarket part as OEM. Use wording such as “aftermarket replacement for [application]” only when the application is independently confirmed.

## Per-image audit record
Track at least:
- public GW SKU, internal product ID, supplier SKU/part number
- current image URL/path and proposed replacement path
- brand, part number, revision, dimensions, colour/finish, connectors/mounts, vehicle/application
- evidence used for match (manufacturer data sheet/catalogue page, dated supplier confirmation, comparison photos)
- source URL, rights owner, licence/permission evidence, permission date and permitted modifications
- status: PENDING_MATCH, PENDING_RIGHTS, APPROVED, REJECTED, or PLACEHOLDER
- reviewer, review date, notes

Only set APPROVED when both exact-part identity and commercial image rights are verified. Keep unverified items out of production release.

## Homepage category cards
Category tiles are navigational labels, not individual product listings. Use original simple vector/icon artwork for category-level navigation rather than selecting a random product photo from a category. This prevents an unverified product image from implying that it represents every product in the category. Individual product cards/details must use SKU-verified imagery or the neutral placeholder.

## Workflow
1. Export active products with public SKU, internal ID, supplier SKU, title, application, specifications, and current image path from staging.
2. Match candidate aftermarket manufacturer images against exact supplier part number and dimensions/specifications.
3. Capture licensing evidence before downloading or modifying any image.
4. Prepare an image change manifest; do not overwrite original images. Include before/after thumbnails for owner review.
5. Run automated dimension/format checks plus manual identity and rights review.
6. Re-run desktop/mobile browser QA only after the approved staging changes.
7. No production image changes until owner approves the manifest and screenshots.

## Current first pass
- Removed random product-derived photos from the eight homepage category cards on the staging review branch; replaced them with original category-level icon artwork.
- This does not replace or approve any individual product image. SKU-by-SKU replacement remains pending export of product/image records, exact part cross-references, and commercial licence evidence.
- Live Axxess store remains unchanged.
