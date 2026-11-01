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
