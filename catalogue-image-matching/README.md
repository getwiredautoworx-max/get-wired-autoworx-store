# Get Wired AutoWorx — Catalogue/Image Matching Framework

## Purpose
Prepare future Buyer’s Guides and supplier/accessory catalogues for controlled image enrichment without exposing supplier identifiers to customers and without replacing an image on visual similarity alone.

## Required decision chain
1. Extract catalogue item and source image.
2. Resolve the catalogue/supplier identifier internally against the private supplier-code mapping.
3. Resolve the matching product to the proprietary public_sku.
4. Require an exact internal product match before an image is eligible.
5. Compare the candidate image with the current store image.
6. Replace only when exact match + verified approval + materially better image are all true.
7. No exact match = exclude.
8. Uncertain verification = REVIEW/quarantine; do not publish.
9. Never publish supplier SKU, supplier URL, supplier catalogue identifier, or supplier metadata.
10. Never change products.image_url until the binary asset exists at its final production path and passes validation.

## Decision states
- VERIFIED_REPLACE — exact match + verified + better image.
- VERIFIED_KEEP — exact match but current image is equal/better.
- REVIEW — possible match or image-quality question; do not publish.
- EXCLUDE — no exact match, unverified, or missing asset.

## Public/private boundary
The public storefront uses public_sku. Supplier identifiers remain internal-only. Matching jobs must use privileged/internal access and must not place supplier mappings in browser code, public JSON, catalogue PDFs, SEO text, checkout, WhatsApp messages, or order confirmations.

## When file/image access is available
Use each incoming catalogue as an input dataset. Do not rebuild the existing catalogue or overwrite verified imagery wholesale. Process only exact matches and preserve the existing fallback system for everything else.
