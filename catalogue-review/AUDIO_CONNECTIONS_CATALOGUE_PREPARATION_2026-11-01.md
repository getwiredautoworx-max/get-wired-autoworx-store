# Audio Connections catalogue preparation — 1 November 2026

## Source files
- `suppliers/Audio Connections/Sony Mobile ES Dealer Price List Sept 26.pdf` — September 2026, 2 pages.
- `suppliers/Audio Connections/STARSOUND Price Lists 05 AUGUST 2026.pdf` — 5 August 2026, 2 pages.
- Both files were compared with the newly supplied attachments; Git blob hashes match exactly. Originals are retained.

## Reconciliation
- 68 source rows: 15 Sony; 53 Starsound / Reference Audio / RA / Black Spider.
- 63 proposed prices; 3 Starsound rows have no dealer price; 1 Sony model is explicitly sold out; 1 Sony accessory model (XS-680G) remains unresolved and is excluded from the preview.
- 66 records are loaded into the isolated Audio & Entertainment preview dataset: 63 with proposed prices and 3 quote-only rows.
- No GW SKU is assigned. No supplier availability or stock is inferred. No image is approved: Starsound has no product images in its PDF; Sony embedded images are low-resolution or reused across multiple models.

## Pricing applied
- Sony models with exact manufacturer model matches and printed RRP: proposed price = printed RRP × 0.98 (2% below RRP). Owner confirmed that the printed Sony RRP is VAT-inclusive. Proposed price = printed VAT-inclusive RRP × 0.98 (2% below RRP).
- Starsound / Reference Audio / RA / Black Spider rows: source states all prices are VAT-exclusive. Proposed VAT-inclusive customer price = round(dealer price ex VAT × 1.15 × 1.35, 2), matching the current store formula.
- Missing dealer prices use exactly: “Price on Request due to Limited Stock and Availability”.
- Sony XS-690ES is excluded because the source says SOLD OUT. Sony XS-680G is held because exact accessory model identity and a suitable image remain unverified.

## Safety / release status
- `assets/audio-connections-catalogue-preview.json` contains customer-facing preview fields only; no dealer costs or supplier RRP columns are included.
- `catalogue-review/audio-connections-pricing-review-2026-11-01.csv` is private review data and includes dealer prices and pricing calculations.
- Preview-only; not a live catalogue import. Supplier relationship remains inactive pending onboarding confirmation. No Supabase, stock, live price, production, checkout/payment, Axxess or DNS changes.


## OWNER PRICING CLARIFICATION — 2026-11-01

- Owner confirmed: **Sony's printed RRP already includes VAT**.
- Sony proposal therefore remains `round(printed RRP × 0.98, 2)`, with no additional VAT multiplier. The resulting customer price is VAT-inclusive and 2% below the printed RRP.
- Updated the preview JSON price notes, private pricing audit VAT-basis field, and preparation notes. No Sony proposed prices changed; only the incorrect “VAT basis unconfirmed” caveat was removed.
- This clarification does not authorize a live price import, catalogue publication, supplier activation, stock change, production deployment or merge. PR #142 remains a draft preview candidate pending exact-head browser QA and other release gates.


## 2026-11-03 — OFFICIAL IMAGE SOURCE CROSSWALK UPDATE
- Four official Sony image-source URLs are now captured in the private image-source manifest: XS-160ES, XS-680ES, XS-W104ES and XM-5ES. The XM-5ES image URL is from the official Sony Australia store asset path; the exact Sony model support page is retained in the crosswalk.
- All four remain image-source candidates only. No image binary has been downloaded or approved for customer publication. Visual/load, exact model/variant and usage-permission review remains outstanding.
- The supplier-to-GW-SKU crosswalk contains 13 collision-checked Sony GW SKU candidates in private staging only; no product insert, public SKU, supplier activation or live catalogue change occurred.
- Sony price basis remains: dealer price ex VAT; printed RRP VAT-inclusive as owner-confirmed; review price = printed RRP × 0.98, no extra VAT multiplier. Current availability is not stated in the September 2026 PDF.


## 2026-11-03 — OWNER PREVIEW SKU / IMAGE LINKAGE
- The 66-row owner-review JSON now carries 13 proposed collision-checked Get Wired SKUs for the exact-model Sony candidates, matched by manufacturer model to the private staging crosswalk. These are staging candidates only; no public product rows were inserted. The other 53 Audio Connections records have no proposed GW SKU in this set and remain held.
- Four official Sony image-source candidates (XS-160ES, XS-680ES, XS-W104ES, XM-5ES) are linked to the matching review records. None is downloaded or approved for customer publication; 62 of the 66 records have no image source and remain text-only.
- Removed supplier-name and source-file fields from the customer-style preview JSON. The noindex Audio & Entertainment review page now displays proposed Get Wired SKUs where available, uses the four official image candidates for owner review, and renders no generic image placeholders. Records without image candidates have no image block.
- The review page remains noindex and is not included in the public Pages build. No public category link, supplier activation, stock/price update or live product write occurred.


## 2026-11-03 — OFFICIAL BRAND PAGE MATCHES FOR NON-SONY MODELS
- Seven Starsound model names are now linked to official Starsound category listings (four subwoofer/flat-subwoofer entries and three amplifier entries). These are official category listings, not individual product pages; formatting differences are retained in the source-to-official model crosswalk.
- The BlackSpider Bullet Lynx row now links to its exact official product page and uses the official model description/specifications. The direct image asset URL has not been captured.
- Forty-five other non-Sony Audio Connections models remain without an exact official listing/product page. No new GW SKU was generated for the eight matches; the 13 Sony candidate GW SKUs remain private staging only.
- Official page evidence does not confirm current dealer stock, price, image rights or publication permission. All rows remain private/inactive.
