# Planetworld supplier workspace

Purpose: prepare a separate Planetworld-powered storefront using the accepted Get Wired AutoWorx layout while ASC and other supplier authorisations remain pending.

## Source handling

- The Planetworld XLSX workbook is required before product extraction can begin. It has not been located in the current ChatGPT Library search, so it must be uploaded to this chat if it has not already been attached in another session.
- Keep the raw workbook private; this repository is public and must not contain the original price list or confidential dealer terms.
- Preserve the original supplier SKU/model exactly in a private working copy.
- Do not invent missing product fields or claim image matches without exact model evidence.
- Separate supplier cost, calculated selling price, public advertised price and stock availability as distinct fields.
- Do not import supplier stock into the live Get Wired store.

## Planned outputs

- Private normalized workbook/CSV for audit and editing.
- Sanitised product dataset for the separate storefront, containing only owner-approved customer-facing fields.
- Category map: Audio/Video segment → brand → component/product type, where supported by the actual workbook.
- Image source and exact-model match status.
- Exceptions report for missing model, duplicate SKU, unclear category, missing price or unverified image.

## Status

**Waiting for Planetworld XLSX.** No Planetworld products, prices, stock quantities, images or category counts have been inferred. No production catalogue, payment, Axxess or DNS changes are authorised by this workspace.


## Standardized supplier controls added (2026-10-25)

The workspace now has `processed/`, `exceptions/`, `image-matches/`, and `handover/` subfolders alongside the existing `incoming-xlsx/`. Use the matching folder for each output type. Since the repository is public, the incoming folder contains instructions only; submit the actual confidential XLSX privately in ChatGPT or approved private storage.
