# Supplier Catalogue Library

This is the single parent folder for supplier catalogues and reference documents used by Get Wired AutoWorx.

**Owner confirmation (2026-10-27): all supplier folders currently listed here are authorised for catalogue use.** Use these sources proactively for catalogue review, extraction, matching, analysis and preparation while supplier IT teams work through technical integration. This permission does not itself authorise writes to live stock, prices, product listings, or production systems.

## Supplier folders
- `Audio Connections/` — catalogues, price lists and reference documents.
- `ASC/` — catalogues, monthly Buyer's Guides, price lists and reference documents; interim permission to use ASC catalogues has been granted to Get Wired AutoWorx as an authorised dealer while ASC's IT department works on a longer-term solution.
- `Electrocity/` — catalogues, price lists and reference documents; interim permission to use Electrocity catalogues has been granted to Get Wired AutoWorx as an authorised dealer while Electrocity's IT department works on a longer-term solution.
- `Planetworld/` — dealer price lists, catalogues and reference documents.
- `Caelex/` — catalogues, price lists and reference documents.

## Handling rules
- Upload supplier documents only into the matching supplier's subfolder.
- ASC and Electrocity have granted interim permission to use their catalogues for authorised dealer work while their IT departments investigate a longer-term solution. This permits catalogue reference and analysis; it does not by itself authorise live stock, price, product-listing, or database writes.
- Do not import or change live stock, prices, product listings, or catalogue data without explicit owner authorisation.
- Do not upload passwords, API keys, customer personal information, or other secrets.
- Keep supplier files and all work in this repository; do not create separate top-level supplier folders elsewhere.


## Verified supplier-folder inventory — 2026-10-27

Recursive Git tree scan of the `main` branch (tree SHA `08b97bed8e05c18bd3696262593d4c12da8822e2`) found **44 tracked files** under `suppliers/`: 38 PDFs and 6 Markdown README files.

| Supplier folder | PDF files | README | Notes |
|---|---:|---|---|
| `ASC/` | 35 | Present | 35 supplier reference PDFs retained in the authorised ASC folder. |
| `Audio Connections/` | 2 | Present | STARSOUND and Sony Mobile ES dealer price lists. |
| `Caelex/` | 1 | Present | Halloween Week Deals PDF. |
| `Electrocity/` | 0 | Present | Folder currently contains its README only; no catalogue/price-list PDFs are tracked yet. |
| `Planetworld/` | 0 | Present | Folder currently contains its README only; no dealer price-list/catalogue PDFs are tracked yet. |

The repository root currently has **zero tracked PDFs**; all 38 tracked supplier PDFs are inside their respective supplier subfolders. This is a path/file-type inventory only; PDF contents, duplicate editions, expiry, pricing accuracy, and SKU completeness have not been audited by this scan. Do not infer that empty Electrocity/Planetworld folders mean the suppliers are unauthorised; upload their approved source files to their named folders when available. Keep live product/stock/price imports on hold until explicitly approved by the owner.


## Owner-approved active catalogue scope — 2026-11-03

The owner has narrowed all future catalogue work to **ASC, Audio Connections and Planetworld only**. This instruction supersedes older supplier-library notes above wherever they imply that Electrocity or Caelex remain in the active integration scope.

- **Active suppliers:** `ASC/`, `Audio Connections/` and `Planetworld/`.
- **ASC source restriction:** use the current approved ASC product-family catalogues only. Do not use the 800+ legacy monthly ASC Buyer's Guide stock listings as import sources; retain original guides solely as archived reference material.
- **Excluded suppliers:** `Electrocity/` and `Caelex/` remain preserved in the repository for audit/reference only. Do not extract, stage, import, activate or publish their products unless the owner changes this scope in writing.
- Existing supplier source files remain intact. Do not delete source documents as part of clearing storefront stock.
- Product imports must be staged, validated and previewed first. Do not write new product rows or activate supplier catalogue items until the batch has passed the agreed SKU, description, image, price and category checks.
