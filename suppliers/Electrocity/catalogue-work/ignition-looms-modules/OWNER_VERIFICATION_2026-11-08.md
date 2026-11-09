# Owner-side verification addendum — 2026-11-08

**Scope:** Jules Electrocity paired ignition modules + ignition looms pilot (Issue #182 / PR #185).
**Disposition:** Extraction package structurally verified; review-only pilot acceptance recorded with one source-caption discrepancy resolved by excluding unsupported applications. No import or live change.

## Source identity

The current `main` Git tree was checked directly:
- `(1)IGNITION MODULES.pdf`: blob SHA `5fdddd9bfeed32ac5c32263f724e8fd82db8583a`, 342,493 bytes.
- `IGNITION LOOMS.pdf`: blob SHA `0875d983b2b535a79b66c55e6d818bb1ffb7c098`, 66,694 bytes.

Both match the owner-approved source override. The manifest records 5 pages / 26 module rows and 1 page / 3 loom rows (29 total). The rejected converters and ignition-coils PDFs are excluded.

## Independent structural checks on the PR package

- `extracted-raw.csv`: 29 data rows, 23 columns.
- `normalised-review.csv`: 29 data rows, 42 columns.
- All 29 provisional IDs are unique.
- All 29 rows have source path, source SHA-256, page/callout, OEM number, private Electrocity SKU, positional labels, research sources/access date, confidence and QA status.
- All required structured JSON fields parse; each row has at least one HTTP(S) research-source URL.
- 29 page-evidence PNG files are present (3,685,221 bytes combined). These are source-evidence crops, not a claim that every crop was independently visually re-adjudicated in this review.
- All six commercial fields (price, currency, price type, VAT basis, pack basis and stock) remain blank/unknown.
- Row-level confidence totals: 3 confirmed, 26 corroborated, 0 possible-only, 0 unverified.
- QA status totals: 28 `REVIEW_PASSED`, 1 `REVIEW_PASSED_SOURCE_DISCREPANCY_EXCLUDED`.
- The only row where the literal SKU string also appears in the candidate description is `TP1015B`; the source prints the same literal as both OEM number and SKU, and the row is already flagged as a numbering anomaly. It is retained as the OEM number, not treated as a distinct private SKU disclosure.

## Corrections and workflow evidence

- Corrected the QA report's inconsistent confidence totals in commit `2952d643b5f4a28450f78bec45cae69c9a1411b4`.
- Public SKU Exposure Audit run `42470803229` completed successfully against that corrected commit. This workflow is a customer-facing source audit only; it is not a substitute for full catalogue-specific QA or independent fitment research.
- The PR has no submitted review approvals and no combined commit statuses were returned at the time of this check.

## Outstanding acceptance notes

1. `GWA-EC-000012 / IG-T003`: the source-caption conflict is resolved for customer-facing scope. The official Mobiletron part page and NIPARTS OE-cross-reference record support Toyota applications; the printed Fiat/Peugeot/Renault claim is unsupported and excluded. No model/year fitment is published for GM/Isuzu/Mitsubishi solely from their OE-maker references.
2. The 29 source crops and research links are present, but the fitment classifications should remain evidence-tiered; do not promote corroborated or unverified applications to confirmed OEM fitment.
3. PR #185 remains OPEN and UNMERGED. This review does not authorise merge, product creation, price/stock changes, image publication, database writes, Axxess uploads, deployment or production changes.

**Final assessment:** Jules delivered the complete paired-pilot review package and its structural evidence. The 29-row pilot remains a DO NOT IMPORT review package pending owner acceptance. The IG-T003 source-caption discrepancy has been resolved for customer-facing scope by excluding unsupported Fiat/Peugeot/Renault applications; corroborated Toyota model/year applications remain review-only.


## 2026-11-09 owner-side fitment exception follow-up — GWA-EC-000012 / IG-T003

Checked the official [Mobiletron IG-T003 product page](https://www.mobiletron.com/Product/detail/2801/IG-T003). It identifies an inductive/pick-up ignition module and lists OE-maker cross-references for Denso, GM, Isuzu, Lucas, Mitsubishi and Toyota. It does not supply direct vehicle-model applications or reconcile the Electrocity source caption “FIAT/PEUGEOT/RENAUL”.

NIPARTS' structured ICM597 record lists overlapping OE references GM 94404544, Isuzu 8944045440 and Toyota 8962010090/8962010120/8962016070, plus Toyota model/year applications: Carina II (T17), Celica (AT16/ST16), Corolla E8/E9, Hiace III and Starlet P7/P8/EP91. The normalised candidate now includes only these corroborated Toyota applications, with VIN/engine verification required. The unsupported Fiat/Peugeot/Renault caption is excluded. The row is `corroborated` and `REVIEW_PASSED_SOURCE_DISCREPANCY_EXCLUDED`; no GM/Isuzu/Mitsubishi vehicle-model claims are made from OE-maker references alone. The review package remains DO NOT IMPORT pending owner acceptance. No import, merge, publication or live change is authorised.
