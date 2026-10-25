# Supplier Catalogue Source Control

This area controls supplier-source intake and the safe processing of supplier catalogues for the separate Planetworld/storefront work.

## Rules
- Keep each supplier's original workbooks in that supplier's `incoming-xlsx/` workspace only when the repository's visibility permits it.
- **This repository is public. Do not commit original XLSX price lists, dealer costs, discounts, trading terms, account data, or other confidential supplier information.** Use a private approved location or attach workbooks privately in ChatGPT for processing.
- Do not store confidential raw supplier data in GitHub just because an incoming folder exists.
- Store only sanitized, owner-approved outputs in the repository.
- Never change live store stock/catalogue, pricing, production settings, payment, or DNS as part of this workflow without explicit approval.
- Do not guess product specifications, categories, SKUs, or manufacturer image matches. Flag unresolved items.

## Standard supplier lifecycle
1. Receive workbook privately and record filename/date/source in that supplier's handover log.
2. Inspect every worksheet and its real column headers.
3. Normalize and classify rows using evidence from the workbook and manufacturer sources.
4. Produce exception reports for duplicates, missing/ambiguous model numbers, pricing gaps, unclear categories, and unverified images.
5. Save sanitized customer-facing output only after checking that private commercial fields are excluded.
6. Test the isolated storefront on desktop and mobile before any integration approval.

See [supplier workspaces](suppliers/README.md).
