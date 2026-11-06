# Audio Image and Description Approval Gap — 2026-11-06

Status: PRIVATE / DO NOT IMPORT / NOT CUSTOMER READY.

## Planetworld audit coverage

| Brand/source audit | Source/audit rows | Current image evidence | Customer publication state |
|---|---:|---|---|
| One / OneNav | 290 source; 45 detailed audit | 39 pending; 6 candidates only; 0 approved final images established | Incomplete; 245 source rows not yet reconciled to detailed model audit |
| Kicker | 189 | Manufacturer pages/collections often list exact models, but binary assets are not downloaded/approved | Incomplete |
| Audison | 94 detailed audit rows (96 in combined tree after two reclassified harness records) | Page/range imagery exists for some rows, but assets not downloaded/approved | Incomplete; two rows need source/manual clarification |
| Alpine | 58 | 3 high-resolution URLs located but binary assets not downloaded/approved; remaining assets pending | Incomplete |
| Focal/JVC/Kenwood/Pioneer | 21 | Official pages/collections found for many; no final assets approved; bundle/suffix exceptions remain | Incomplete |
| Amplified | 3 | No exact official matches in the current audit | Incomplete |
| Marine Audio | 28 Kicker rows in the 702-row Planetworld staging | Exact page/collection matches exist, but image assets not downloaded/approved | Separate Marine category; incomplete |
| Harness & Trims | 47 separate source rows | Must be treated as component/accessory group, not a brand | Incomplete |

## Kicker detail

- 189 rows in the manufacturer audit.
- 33 products have manufacturer-reviewed product records in `kicker-manufacturer-product-review.json`.
- The audit includes many official product or collection matches, but no matching original binary asset is approved merely because a page contains imagery.
- 28 marine records are separated from the car-audio rows in the staging summary and must not be displayed under Car Audio.

## OneNav image failures verified visually

- OA015-1 official page: its gallery images display product artwork with different printed model codes (OA1409-CPAA and CA4090-CPAA). Both are rejected as OA015-1 images. Do not crop away the model code to disguise the mismatch.
- OA014-1 official page confirms the exact product title, SKU, Toyota Prado 2002–2009 fitment and 9-inch Classic specifications, but the extracted page does not expose a downloadable image asset. Keep image pending.
- The OneNav audit also records multiple wrong-series/wrong-variant image rejections (Evolution/A11/Pro vs Classic), plus low-resolution or third-party-only candidates. These remain rejected or pending, not approved.

## Quality rules

1. Official page/collection match is not the same as an approved image asset.
2. Exact model and variant must be visible or otherwise independently verifiable; never use a similar-looking generation or vehicle-fitment image.
3. Asset must be captured at usable resolution, visually checked, with source URL, page URL and permission basis recorded.
4. Product description must be supported by manufacturer or catalogue facts; do not copy supplier-only labels or invent fitment/specs.
5. GW SKU must be generated and collision-checked independently of supplier item codes.
6. Car Audio, Marine Audio, Home Audio/Cinema, Studio/Music and installation components must remain correctly separated in the current three-main-category storefront architecture.
7. Every listing must pass image, description, SKU, category and supplier-data privacy gates before it can enter the non-production owner preview.

## Overall finding

The audio category is not resolved. Existing manufacturer audits establish useful model/page evidence, but the gap is still the actual product-image asset capture/approval, complete customer descriptions, GW SKU mapping, and end-to-end row reconciliation. No customer-facing products or images should be published from these audits yet.
