# Category Mapping Review — 9 October 2026

## Purpose
Record verified catalogue classification problems and define a safe SKU-level correction method. This is a review report, not a database migration.

## Current verified state
- Active catalogue: 4,187 products.
- Prior category-tree audit: 976 active products inside the eight approved storefront roots/descendants; 3,211 outside that tree.
- No category or product rows were changed in this review.
- Supplier metadata `specifications.source_category` is useful evidence but is not reliable enough to be the sole reassignment rule.

## SKU-level examples from read-only SQL samples

| SKU | Product | Current category | Source category | Review finding |
|---|---|---|---|---|
| 4427SW | 2.5/8" White/Silver Electronic Oil Pressure Gauge | Fuses | Auto Electrical | Current leaf is inconsistent with product name; review under electrical gauges/instruments. |
| 6114B | 2" Digital Water Temperature Gauge | Fuses | Auto Electrical | Current leaf is inconsistent with product name; review under electrical gauges/instruments. |
| G1-5026 | 2" LCD Oil Pressure Water Gauge 12V | Fuses | Auto Electrical | Current leaf is inconsistent with product name; review under electrical gauges/instruments. |
| 140805 | Ratchet wire-terminal crimping tool | Hand Tools | Auto Electrical | Product is a tool; likely Tools/Hardware/Consumables despite supplier source category. |
| HYI-BD01 | Brake Disc Front Hyundai i10 | Electrical Spares | Auto Electrical | Product is mechanical braking stock; do not map to Auto Electrical Spares solely from source metadata. |
| AH8891C | Brake Shoe Set VW Passat/Polo | 4X4 Outdoor | Accessories | Mechanical brake item; quarantine from automatic accessory/electrical mapping pending catalogue policy. |
| RB-016 | Radiator Bottle Ford Fiesta | Air Filters | Accessories | Product title/current leaf mismatch; not an electrical-spares item. |
| 311100 | Utility blades in dispenser | Automotive Accessories | Accessories | Review for Tools/Hardware/Consumables. |
| 310018 | Utility cutter with auto-lock | Automotive Accessories | Accessories | Review for Tools/Hardware/Consumables. |
| EX908-2M | 2M aerial extension | Aerials | Accessories | Existing specialist leaf may be valid; do not flatten to the Accessories root without confirming hierarchy. |

## Recommended mapping rules
1. Preserve good specialist leaves (e.g. Fuses, Relays, Switches, Battery, Aerials) only when their parent chain belongs to the correct approved storefront root.
2. Use SKU, product name, description, existing leaf category, supplier source category and source subcategory together.
3. Treat explicit tool terms (crimping tool, utility cutter/blade, torque wrench, caliper wind-back tool, oil-filter tool) as Tools/Hardware/Consumables candidates, even if supplier metadata says Auto Electrical or Accessories.
4. Treat explicit electrical items (alternators, starters, ignition coils, regulators, relays, fuses, wiring terminals, 12V/24V electrical sensors) as Auto Electrical Spares candidates, but exclude clearly mechanical items such as brake discs/shoes, engine, suspension and gearbox parts.
5. Treat marine/boat/rigging terms as Marine Spares & Accessories only when the product itself supports that classification; generic “Parts” metadata is not enough.
6. Treat car-audio/head-unit/speaker/amplifier/aerial items as Car Audio only where the product name and existing specialist leaf agree.
7. Do not auto-move ambiguous lighting, generic Parts/Auto Spares, mixed-use accessories or malformed product names. Send them to manual review.
8. Before any write, produce a full candidate export with product ID, public SKU, name, description, current leaf and parent chain, source category/subcategory, suggested root/leaf, confidence and reason. Apply only high-confidence rows in a separately reviewed batch and verify counts afterwards.

## Next verification
- Resolve the actual eight approved root IDs and the intended child hierarchy.
- Export the complete 4,187-row product/category dataset in bounded batches so a review file is comprehensive rather than a sample.
- Build the candidate map and confidence tiers.
- No bulk category writes until the full map is inspected; avoid promoting mechanical parts into electrical spares or losing valid specialist leaf categories.
- Browser category navigation and category product counts remain unverified until Axxess is accessible.

## ETA
- Full candidate export and rule-based review: 30–60 minutes once all rows can be retrieved reliably.
- Corrections and regression checks: depends on the number of ambiguous rows; do not estimate completion until the report is reviewed.
