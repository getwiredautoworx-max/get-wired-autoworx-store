# Audio catalogue data-source reconciliation — 2026-11-06

Status: READ-ONLY FINDINGS — NO DATABASE WRITES / NO IMPORT / NO PUBLICATION.

## Verified storefront data source

The current customer storefront in `index-new.html` reads active records from the Supabase REST endpoint `public.products` and refreshes categories from `public.categories`. The product listing pages `products.html` and `preview-products.html` also query `public.products`. The review prototype `catalogue-review/car-audio-navigation-prototype.html` is a separate private JSON-backed review tool; it is not the customer storefront's product source.

## Read-only database counts — project Store (`ojytykqpvonxvepprgbh`)

| Table | Rows |
|---|---:|
| `public.products` | 0 |
| `gw_private.supplier_catalog_items` | 0 |
| `gw_private.product_supplier_codes` | 0 |
| `gw_private.catalogue_product_staging` | 770 |

The 770 private staging rows split as follows:

| Supplier | Rows | Missing category | Model not verified/pending | Image not approved/not verified/required | Description field populated | Publication |
|---|---:|---:|---:|---:|---:|---|
| Planetworld | 702 | 31 | 702 | 702 | 702 | REVIEW_ONLY |
| Audio Connections | 68 | 0 | 53 | 61 | 68 | REVIEW_ONLY |

A populated staging description field is not proof of a verified customer-facing description. No staging rows are approved for import/publication. The current public product count of zero means the customer storefront has no product records in this connected project, even though private source staging exists.

## Historical evidence conflict

Repository documents dated 2026-10-30 describe a seed of 770 inactive/unlinked rows into `gw_private.supplier_catalog_items` and say it was applied. The live read-only count now returns zero for that table and 770 in `gw_private.catalogue_product_staging`. Treat the older README/SQL summary as historical, not proof of current database contents. Reconcile this difference using current project identity, migrations and source provenance before considering any import. Do not execute the historical seed SQL or create public products.

## OneNav work already recorded

- 290 unique Planetworld One source rows; 45 detailed model-audit overlaps; 245 unmatched source rows are recorded in `catalogue-review/onenav-245-source-row-reconciliation-register.csv` as provisional/manual-review groups, not final classifications.
- The register's current provisional groups are for source-row triage only. Every row still requires original source-page identity, model/variant, product-vs-component status, fitment, category, description, image and rights checks.
- OA312-1 and OA015-1 official page gallery artwork was visually rejected because the visible image model is OA1409-CPAA. OA014-1 image remains pending. ON425-1LX has a 600×600 exact official image candidate; it is not yet approved for publication. ON016-2LX official page supports its model and A11 specification description; image remains pending.
- See `catalogue-review/onenav-image-verification-2026-11-06.md` and `catalogue-review/onenav-manufacturer-image-crosscheck-2026-11-06.md`.

## Required next steps

1. Preserve the no-write boundary. Do not seed, migrate, activate, link or publish any staging row without explicit owner approval.
2. Reconcile the historical 2026-10-30 supplier seed claims against current schema, migrations, branch history and the 770-row staging table. Establish whether the current staging table is the authoritative source and why the supplier_catalog_items table is empty.
3. Continue OneNav source-row and exact image/description work privately. Do not treat the 245 provisional categories as final.
4. Before any customer preview claim, distinguish the JSON-backed review prototype from the actual storefront, which reads `public.products`.
5. Keep PR #178 draft/unmerged, production HOLD, and functional tests deferred until owner banking details.
