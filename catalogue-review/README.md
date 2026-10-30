# Catalogue review branch — 2026-10-30

**Branch:** `catalogue/ingest-review-2026-10-30`  
**Purpose:** private, read-only supplier extraction and navigation review. Nothing in this folder is a customer-facing catalogue or production import.

## Verified source extraction

- Planetworld: 47/47 XLSX opened; 94 sheets; 0 workbook errors; 3,317 Products-sheet rows. Source file, sheet and row provenance is retained in seven CSV chunks.
- Audio Connections: both PDFs opened and all four pages extracted/rendered:
  - `STARSOUND Price Lists 05 August 2026.pdf` (2 pages)
  - `Sony Mobile ES Dealer Price List Sept 26.pdf` (2 pages)

## Planetworld navigation review

- Car Audio: 702 source rows = 627 manufacturer-brand product rows, 47 Harnesses & Trims component-group rows, 28 Marine Audio rows. Nine brand candidates: Alpine, Amplified, Audison, Focal, JVC, Kenwood, Kicker, One and Pioneer. One product-type row remains manual review.
- Musical Instruments: 1,719 source rows across 21 brands. Navigation candidates split into Band Instruments (1,273), Studio & Pro Audio (230), Instrument Cases & Accessories (191), and DJ Equipment (25). Five component rows remain manual review.
- Prototype pages:
  - `car-audio-navigation-prototype.html`
  - `band-instruments-navigation-prototype.html`
- All prototype product cards intentionally omit prices, stock, pictures and GW SKUs until exact verification.

## Audio Connections product review

- `audio-connections-product-review.csv`: 68 source rows (53 Starsound + 15 Sony).
- Three Starsound rows have no numeric price; use owner-approved wording **“Price on Request due to Limited Stock and Availability.”**
- Sony XS-690ES is marked SOLD OUT in the supplier PDF; do not list as available.
- Sony official model audit: exact official page found for 14/15 models; XS-680G has no exact manufacturer page located.
- The PDF contains 21 embedded images. Sony page-one images are low resolution; page two reuses one image for XS-W122ES/XS-W124ES and one generic amplifier image for five XM models. These shared/low-resolution images are reference-only. Starsound PDF has no product images.

## Hertz review

- Separate Library staging workbook: 89 rows, 12 subcategories.
- 12 exact official Hertz product pages have been found and model descriptions/specifications transcribed.
- Raw metadata retrieval was challenged (HTTP 202); browser-based image audit is running. No Hertz image is approved yet; 77 other staged rows still need exact page/image matches.
- Do not publish or copy confidential dealer-cost fields from the Library workbook.

## Image and SKU safety

- Existing `assets/products/` contains 800 JPG files; exact filename comparison against the 3,317 Planetworld supplier item codes found no relevant exact match (one unrelated CS01 camera-shoe row only).
- Existing `assets/products_webp/` contains 1,000 files named by public GW SKU, not supplier model. Do not map by visual similarity.
- `catalogue-image-matching/README.md` requires exact product match, private supplier-code mapping, exact `public_sku`, visual verification, and final asset existence before image replacement.
- `supabase/functions/product-image/index.ts` resolves the public `public_sku` and reads supplier codes only from private `gw_private.product_supplier_codes`. No public-SKU generator was found in repository source. No new GW SKU has been assigned and no Supabase product/mapping write is approved or performed.
- Product images, manufacturer descriptions and GW SKUs remain unverified for the 627 Planetworld Car Audio products and most Audio Connections products.

## QA and release boundary

- Car Audio navigation prototype QA passed on 360, 390, 768 and 1,280 px in run 41014374943. Expanded Band Instruments/Studio/DJ QA is running after fixing test navigation depth.
- Main storefront remains the owner-approved buttons-only mode. Do not expose the review CSVs or remove the buttons-only gate.
- Repository is private. No Axxess, DNS, checkout/payment, Supabase, live stock, production catalogue, Cloudflare or Netlify changes; no PR merge.
- Payment readiness remains the final launch blocker after catalogue/product presentation is verified.

## Next actions

1. Finish Hertz and Sony browser-based official image retrieval; visually inspect every candidate before marking verified.
2. Continue exact-model page/image matching for Planetworld Car Audio; use supplier item code as a search candidate only, never as a confirmed manufacturer model or GW SKU.
3. Obtain high-resolution images for exact models; no low-resolution/shared PDF image substitutions.
4. Finish manufacturer descriptions/specs for Planetworld and Audio Connections; keep all unverified rows quarantined.
5. Finalise logo assets from official sources for brand buttons; text wordmarks remain until logos are verified.
6. Integrate only verified products into a review build; rerun populated-mode browser/mobile tests before any production action.
