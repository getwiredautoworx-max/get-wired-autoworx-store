# Planetworld Supplier References

**Owner confirmation (2026-10-27):** supplier documents may be used for catalogue review, extraction, matching and analysis. This does not by itself authorise live stock, price, product-listing or production database writes.

## Source files
- 47 original XLSX price-list workbooks, relocated byte-for-byte on 2026-10-29 from `catalogue-source/suppliers/planetworld/incoming-xlsx/`.
- File names, byte sizes and original Git blob SHAs are recorded in `REPOSITORY_FILE_RECONCILIATION_2026-10-29.md`.

## Controls
- This private repository contains dealer cost, RRP and other potentially confidential supplier data. **Do not make the repository public** while these files are present.
- Keep original source workbooks unchanged.
- Analyse and prepare proposed customer listings separately. Do not import or modify live stock, prices or catalogue data without explicit owner authorisation.
- Do not upload secrets or customer personal information.


## 2026-11-03 intake checkpoint
- Repository directory currently contains 47 original XLSX price-list workbooks. The review report references 48 source workbooks; the separate Hertz source price-list workbook is not present in this folder or the repository. Hertz brand review is tracked under `suppliers/Hertz/`.
- The private `gw_private.supplier_catalog_items` intake contains 702 Planetworld rows. They remain inactive/quote-on-request, with zero linked public product records and zero verified image URLs.
- The Library review workbook records 81 candidate Get Wired SKUs as staging-only; they are not live product SKUs and are not approved for publication.
- Use verified Recommended Retail Price (RRP), not supplier cost, as the customer pricing basis. Apply the owner-approved 1–2 point RRP discount only after the current RRP is verified and margin remains positive after delivery/other costs. If RRP is missing or unverified, keep the item in review/price-on-request status.
- Preserve all source workbooks unchanged. No supplier rows, live stock, live prices, public product links or production records were changed by this intake checkpoint.
