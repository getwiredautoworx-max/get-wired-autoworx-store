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


## Approved-root hierarchy check — follow-up read-only SQL
The eight IDs currently hard-coded as storefront roots do not yet represent the intended taxonomy consistently. Recursive counts including descendants:

| Database root label | Active flag | Category nodes | Active products in its subtree |
|---|---:|---:|---:|
| Alarms & Security (UI label: Vehicle Security) | true | 10 | 2 |
| Automotive Accessories (UI label: Accessories) | true | 46 | 446 |
| Camping / Leisure / Outdoors | false | 4 | 0 |
| Car Audio | true | 20 | 41 |
| Electrical (UI label: Auto Electrical) | true | 56 | 0 |
| Marine Spares & Accessories | true | 10 | 0 |
| Tools & Workshop (UI label: Tools / Hardware / Consumables) | true | 24 | 407 |
| Trailer & Canopy | false | 3 | 80 |

Total in these eight subtrees: 976, matching the earlier audit; 3,211 active products remain outside them.

### Implications
- The Auto Electrical and Marine roots have **zero active products in their own descendants**. The many products labelled Electrical Spares, Fuses, Relays, Marine/Boat Accessories etc. are likely still attached to legacy categories whose parent chains are not under the intended roots.
- Camping / Leisure / Outdoors is inactive and has zero active products in its tree. Trailer & Canopy is inactive but has 80 active products in its subtree.
- The category page hard-codes the approved root IDs and overrides their display labels, so it can display a friendly name even while the underlying root label/parent hierarchy is inconsistent. This does not make the product assignments correct.
- Do not simply flip inactive flags or move all legacy category groups by name. First resolve the full leaf-category mapping, then attach only verified leaf categories to the correct root and verify the 4,187 active products are discoverable in the intended hierarchy.
- This was read-only. No active flags, category links, or product rows changed.


## Legacy-category routing candidates — category-name pass only
These are **proposed routing candidates**, not confirmed product-level assignments. Because each legacy category is currently unparented, the category itself must be reviewed before attaching it to an approved root.

| Legacy category | Active products | Proposed destination | Confidence / handling |
|---|---:|---|---|
| Electrical Spares | 270 | Auto Electrical Spares | High category-level candidate; still sample product titles for mechanical contamination. |
| Switches | 114 | Auto Electrical Spares | High |
| Fuses | 110 | Auto Electrical Spares | High |
| Sockets | 93 | Auto Electrical Spares or Tools/Hardware | Medium; automotive electrical sockets vs workshop sockets need sampling. |
| Relays | 51 | Auto Electrical Spares | High |
| Battery | 50 | Auto Electrical Spares | High for vehicle batteries/terminals/charging; review mixed items. |
| Regulators | 41 | Auto Electrical Spares | High |
| Ignition Spares | 20 | Auto Electrical Spares | High |
| Sensors | 18 | Auto Electrical Spares | Medium-high; confirm automotive sensor types. |
| Globes and Globe Holders | 18 | Auto Electrical Spares | High for vehicle 12V/24V items; review general lighting. |
| Multimeters | 3 | Tools/Hardware/Consumables | High |
| Automotive Tools | 427 | Tools/Hardware/Consumables | High category-level candidate; product sample required because source contains electrical accessories. |
| Abrasives | 103 | Tools/Hardware/Consumables | High |
| Spanners | 72 | Tools/Hardware/Consumables | High |
| Measuring Tools | 30 | Tools/Hardware/Consumables | High |
| Screwdrivers | 30 | Tools/Hardware/Consumables | High |
| Drill Bits | 23 | Tools/Hardware/Consumables | High |
| Garden Tools and Accessories | 7 | Camping/Leisure/Outdoors or Tools/Hardware/Consumables | Medium; inspect item types and intended range. |
| Boat Accessories | 53 | Marine Spares & Accessories | Medium; 25 items were previously seen with generic source category Parts, so inspect product-level evidence. |
| 4X4 Outdoor | 22 | Accessories or Camping/Leisure/Outdoors | Medium; mixed-use items require review. |
| Trailer & Towing | 19 | Trailer & Canopy | High category-level candidate; verify towing items fit intended range. |
| Aerials | 4 | Car Audio | Medium-high; confirm vehicle-audio aerials vs other antenna types. |
| Lamps | 148 | Auto Electrical Spares or Accessories | Medium; distinguish vehicle 12V/24V lamps from general/camping lights. |
| Spotlights | 29 | Auto Electrical Spares or Camping/Leisure/Outdoors | Medium; vehicle/boat spotlights vs portable outdoor lights. |
| Wheel Accessories | 135 | Accessories | Medium; tyre/wheel hardware may include mechanical/consumable stock. |
| Mirrors | 79 | Accessories | Medium-high; vehicle mirrors likely, but inspect product sample. |
| Door Parts | 51 | Accessories or Vehicle Security | Medium; handles/window mechanisms vs locks/central locking. |
| Wipers | 45 | Accessories | High category-level candidate. |
| Clamps | 32 | Tools/Hardware/Consumables or Auto Electrical Spares | Low-medium; clamps vary widely. |
| Thermostats & Pipes | 32 | Manual review / do not auto-publish to electrical | High confidence this is not an electrical-spares category; intended store range decision required. |
| Suspension | 28 | Manual review / quarantine | Do not route to Auto Electrical Spares. |
| Fuel Pumps & Oil Filter | 27 | Manual review / split by exact product | Fuel pumps may be electrical, oil filters are mechanical service parts; category is mixed. |
| Brake Parts | 25 | Manual review / quarantine | Mechanical braking items; do not route to electrical spares. |
| Panel Clips | 25 | Accessories | Medium-high; confirm automotive trim clips. |
| Automotive Accessories | 22 | Accessories | High category-level candidate, with product-level exception checks. |
| Steering Wheel Covers | 17 | Accessories | High |
| Radiator Caps & Bottles | 12 | Manual review / quarantine | Mechanical cooling parts; do not route to electrical spares. |
| Trailer & Canopy | approved root already has 80 active products | Trailer & Canopy | Root is currently inactive; do not toggle until final taxonomy review. |
| Spare Parts | 879 | Manual SKU-level classification | Too broad for safe category-level routing. |
| Door Parts | 51 | Accessories / Vehicle Security | Product-level split required. |
| Cylinders | 5 | Manual review | Meaning varies; do not infer. |
| Hand & Foot Pumps | 5 | Tools/Hardware or Camping/Leisure | Medium-low; inspect item purpose. |
| Lifestyle | 11 | Camping/Leisure/Outdoors or Accessories | Low; inspect products. |
| Padlocks | 8 | Vehicle Security or Tools/Hardware | Medium-low; use product context. |
| Racing Stickers | 6 | Accessories | High |
| Mirrors / Wheel Covers | 79 / 12 | Accessories | High category-level candidates, with sample check. |

## Priority order for safe repair
1. Preserve the current approved eight root IDs but resolve their names, active status and parent chains.
2. Create/verify the required root nodes for Auto Electrical Spares and Marine, because their current trees have zero active products.
3. Review the strongest legacy category candidates first (Fuses, Switches, Relays, Battery, Regulators, Ignition Spares; Spanners, Screwdrivers, Abrasives, Drill Bits).
4. Split mixed categories such as Fuel Pumps & Oil Filter, Lamps, Spotlights, Sockets, Door Parts and Clamps at SKU level.
5. Leave Spare Parts, mechanical categories, malformed titles and ambiguous items unassigned to the new approved roots until individually reviewed.
6. Only then execute a controlled parent/category update and verify every active product is reachable, with no duplicate SKUs, missing category references or mechanical items mislabelled as electrical.



## Immediate hierarchy repair applied — 9 October 2026
The first controlled repair batch is now applied to Supabase and verified. This is a real database change, not merely a proposed map.

### Product-category assignments consolidated
Moved active product assignments into existing specialist child categories under the approved roots:
- Auto Electrical: Electrical Spares (270), Switches (114), Fuses (110), Relays (51), Battery (50), Regulators (41), Ignition Spares (20).
- Tools/Workshop: Automotive Tools (427), Spanners (72), Measuring Tools (30), Screwdrivers (30), Drill Bits (23).
- Marine: Boat Accessories (53).
- Accessories: Mirrors (79), Panel Clips (25), Wheel Accessories (135), Wipers (45), Automotive Accessories (22), Door Parts (51).
- Lighting: Lamps (148), Globes and Globe Holders (18); the Lighting category was attached under the Auto Electrical root.
- Trailer: Trailer & Towing (19), with the child moved under Trailer & Canopy.
- Reparented Sensors under Auto Electrical.
- Activated Camping / Leisure / Outdoors and Trailer & Canopy roots.

Total products reassigned to existing child categories: **1,851** (1,291 + 303 + 257); plus 29 existing Spotlights products became reachable when Lighting was placed under Auto Electrical. No product records were deleted or deactivated.

### Post-change verification
- Active catalogue remains **4,187**.
- Active products inside the eight approved root trees: **2,856**.
- Active products still outside those trees: **1,331**.
- Active products with no category: **0**.
- Active products with missing/zero price: **0**.
- Active products with missing SKU: **0**.
- Tree totals: Security 2; Accessories 803; Camping/Leisure 0; Car Audio 41; Auto Electrical/Electrical 869; Marine 53; Tools/Workshop 989; Trailer & Canopy 99.

### Storefront navigation fix
Committed a change to `category.html` so a category with children also offers a **“View all products in [category]”** link. This makes products assigned directly to a root/category accessible alongside subcategories (for example, the direct products in Car Audio, Accessories and Trailer & Canopy).
- Commit: `fadb1bc4805068b97b2d66b985a487da7b6bb7b1`
- Static source was updated; browser/live QA is still pending and no deployment was triggered.

### Remaining work
The 1,331 products outside the approved roots are mostly broad or mixed legacy categories, especially Spare Parts (879), plus ambiguous mechanical, general lighting, hardware and mixed accessories. Do not bulk-move these without product-level review. Next, sample and split Spare Parts by clear SKU/name evidence, then check root-direct products and each category navigation path. The Camping/Leisure tree is active but currently contains no active products.


## Second correction batch — Spare Parts high-confidence SKU rules
A product-name rule was applied only to explicit electrical component names within the broad legacy **Spare Parts** category. The rule excluded names matching mechanical indicators (brake, suspension, gearbox, engine mount, oil filter, thermostat, radiator, steering rack, wheel bearing, clutch).

- **116 products** were reassigned to the existing Electrical Spares child category based on explicit names such as ignition coils, alternator components, starter solenoids, battery cables/terminals, fuse holders, relays, terminals/connectors and vehicle bulbs.
- This is a narrow, name-based pass, not a claim that all remaining Spare Parts records have been classified.
- Post-batch active products: **4,187**; inside approved category trees: **2,972**; outside approved trees: **1,215**.
- No product was deleted or deactivated. The broad remaining Spare Parts population was not bulk-moved.
