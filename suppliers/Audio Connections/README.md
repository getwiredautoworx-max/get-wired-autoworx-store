# Audio Connections — Supplier Documents

**Owner confirmation (2026-10-27):** all supplier folders in the GitHub supplier library are authorised for catalogue use. Use Audio Connections catalogue material proactively for authorised dealer catalogue review, extraction, matching and analysis. Keep source documents intact. This permission does not by itself authorise changes to live stock, prices, product listings, or production catalogue/database records; obtain explicit owner approval for those writes.


This folder is reserved for Audio Connections supplier documents, price lists, catalogues, and related reference files.

- Upload supplier files here after confirming the correct supplier and file version.
- Do not store passwords, API keys, customer personal information, or other secrets in this repository.
- Files in this folder are reference material only. Do not import prices, stock, or catalogue changes into the live store unless the owner explicitly authorizes that work.


## Sony Mobile ES — September 2026 review intake

- Source: `Sony Mobile ES Dealer Price List Sept 26.pdf` (2 pages, September 2026).
- Staged 15 exact model rows in `staging/sony-mobile-es-sept-2026-review.csv`, preserving source page, model, description, printed dealer price (Price Ex), and printed RRP.
- Seven speaker/grille records, three subwoofers and five amplifiers.
- The source explicitly marks `XS-690ES` as **Sold Out**; the staging row is inactive/review-only.
- The RRP VAT basis is not specified in the source; the CSV does not assume that it includes VAT. The source warns prices can change with exchange-rate fluctuations.
- Read-only Supabase matching against product SKU, public SKU, product name/description and private supplier-code mappings found **zero exact Sony Mobile ES model matches**. No current store item was changed.
- The source PDF contains no product photographs. No GW SKU, current stock, exact image, public description or live selling price has been assigned. `XS-W122ES` and `XS-W124ES` share the same headline specification in the PDF and require exact variant/image confirmation.
- Treat every row as `REVIEW_ONLY`; confirm a current dealer price list, exact product images/usage rights, GW SKU assignment and stock before any product creation or publication. Supplier identity remains internal and must not appear in customer-facing labels.
