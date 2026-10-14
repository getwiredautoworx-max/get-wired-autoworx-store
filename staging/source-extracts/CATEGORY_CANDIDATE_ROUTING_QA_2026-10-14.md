# Candidate category routing QA — 2026-10-14

## Scope and decision

This is a validation checkpoint for the 18 proposed routes in `CATEGORY_REVIEW_QUEUE_CANDIDATE_ROUTING_2026-10-14.csv`. It is **not an approval to change live categories**. Title-based fit was reviewed against the recorded product names and source metadata. Where the source page label is a promotional banner, mixed heading, or conflicts with the product function, the candidate remains provisional until the original product row is confirmed on the guide page.

## Route-by-route disposition

| SKU | Product | Candidate destination | QA disposition | Remaining check |
|---|---|---|---|---|
| D9-FR1522 | Tail Gate Trim With Led Ranger T6/T7 | Automotive Accessories > Panel Clips & Trim | Provisional — title fit plausible | Confirm it is trim (not an electrical light assembly); March p.32 is a SPECIAL promotion page label, not a product category. |
| 5021 | Temperature 52mm Digital Turbo Gauge | Auto Electrical Spares > Gauges & Instruments | Provisional — title fit plausible | Confirm exact item and application on August p.32; SUPERSAVE is a promotion label. |
| 5029 | 52mm Digital Gauge | Auto Electrical Spares > Gauges & Instruments | Provisional — title fit plausible | Confirm gauge type/application on August p.32; SUPERSAVE is a promotion label. |
| BT44-12 | Eye To Eye Battery 300mm | Auto Electrical Spares > Batteries & Accessories | Provisional — likely fit | Verify the exact SKU/title and whether this is a battery cable/lead rather than a battery; February p.10 is a broad AUTOMOTIVE HARDWARE heading. |
| BT44-25 | Eye To Eye Battery 625mm | Auto Electrical Spares > Batteries & Accessories | Provisional — likely fit | Same check as BT44-12; confirm the item's actual function and length. |
| BT44-36 | Eye To Eye Battery 900mm | Auto Electrical Spares > Batteries & Accessories | Provisional — likely fit | Same check as BT44-12; confirm the item's actual function and length. |
| 2727SW-R | 2” Oil Pressure Gauge | Auto Electrical Spares > Gauges & Instruments | Provisional — title fit plausible | Confirm whether gauge is electrical/mechanical and verify the cited February p.21 row; current source subcategory says TERMINALS, which conflicts with the title. |
| A7-TBH01 | Starter Brush Holder Toyota Quantum | Auto Electrical Spares > Charging & Starting | Provisional — likely fit | Verify exact SKU/title on February p.21; source subcategory TERMINALS is not sufficient evidence for this item. |
| RSL1002B | 100-piece Yellow Quick-Splice Connectors — 30 A | Auto Electrical Spares > Electrical Spares | Provisional — likely fit | Confirm electrical connector rating and exact August p.15 item row. |
| NA540B | 100pce 5X40mm Grey Nylon Anchor Plug | Tools, Hardware & Consumables > Fasteners & Hardware | Provisional — likely fit | Confirm wall/anchor plug product row on May p.32; page metadata is a mixed code list, not a reliable heading. |
| NA860 | 10pce 8X60mm Grey Nylon Anchor Plug | Tools, Hardware & Consumables > Fasteners & Hardware | Provisional — likely fit | Same check as NA540B; do not confuse a wall plug with marine anchoring equipment. |
| 6007-13 | Rod Fishing Rod Holder Mount Rubber Suction Mount | Marine Spares & Accessories > Rigging & Fittings | **HOLD — application confirmation required** | Candidate confidence is medium. Confirm marine use and mounting/application before routing. March p.31 SPECIAL is a promotion label. |
| 02-09 | Turbo Golf 1 Mirror Base | Automotive Accessories > Mirrors | Provisional — likely fit | Confirm exact vehicle fitment and August p.32 item row; SUPERSAVE is a promotion label. |
| 017SK | Starter Kit Lucas 2M100 | Auto Electrical Spares > Charging & Starting | **HOLD — exact function confirmation required** | “Starter kit” is ambiguous without the original item row; September p.15 REGULATORS does not itself establish the product's function. |
| CVR22 | 22mm Chrome Bar Ratchet Spanner | Tools, Hardware & Consumables > Spanners & Wrenches | Provisional — likely fit | Confirm exact item on August p.32; SUPERSAVE is a promotion label. |
| 10212 | Sensor Intake Manifold Beetle, Pressor Renault/Micra/Juke/Qashqai | Auto Electrical Spares > Sensors | Provisional — likely fit | Confirm the sensor type and exact item row; August p.20 SPOTLIGHTS conflicts with the product title and cannot validate this route. |
| Q-OLS01 | Oil Level Sensor For Toyota Quantum 05-14 | Auto Electrical Spares > Sensors | Provisional — likely fit | Confirm exact item row; August p.20 SPOTLIGHTS conflicts with the product title. |
| S5-26651 | Sensor Oil Pressure Switch Citroen/Peugeot/Volvo | Auto Electrical Spares > Switches | Provisional — likely fit | Confirm whether this is a pressure switch/sensor and exact item row; August p.20 SPOTLIGHTS conflicts with the product title. |

## Result

- 18 proposals reviewed.
- 16 remain provisional pending exact source-row/context checks.
- 2 explicitly held for product-function/application confirmation: `6007-13` and `017SK`.
- No proposal is promoted to production-approved status by this report.
- No live product, category, price, stock, checkout, or deployment setting was changed.

## Next action (avoid repeated first-pass work)

1. Locate the exact original guide rows for the 16 provisional items and correct each source page/subcategory field where the current metadata conflicts with the title.
2. Resolve the two source-crosswalk page-reference mismatches separately: `IGNITION BARRELS AND SWITCHES` (June p.31 currently points to HAND WINCHES / SPECIAL DISCOUNTED PRICE) and `WATER SPORTS` (June p.30 currently points to TAPPET COVERS / SPECIAL DISCOUNTED PRICE). Do not infer replacement pages from nearby page numbers.
3. Rebuild the candidate routing export once from the corrected evidence; keep the remaining 180 queue rows held unless item-level evidence supports a destination.
4. Only after review, run category integrity and storefront acceptance checks. Do not deploy during this audit.
