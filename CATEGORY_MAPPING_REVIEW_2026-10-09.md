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


## Third correction batch — clear small legacy categories
Moved 62 active products from eight clearly named unparented categories into their existing specialist children:
- Aerials → Car Audio (4)
- Multimeters, Garden Tools and Accessories, Padlocks, Hand & Foot Pumps → Tools/Hardware/Consumables (23 total)
- Racing Stickers, Steering Wheel Covers, Wheel Covers → Accessories (35 total)

### Latest verification
- Active products: **4,187**
- Inside approved category trees: **3,034**
- Outside approved category trees: **1,153**
- Active products without category: **0**
- No product records deleted or deactivated.

The remaining broad/mixed categories (notably Spare Parts, Abrasives, Sockets, Clamps and mechanical parts) are intentionally left for more detailed classification.


## Fourth and fifth correction batches — ignition components and workshop sockets
- Moved **66** remaining explicit ignition-barrel/ignition-loom/ignition-set/starter-kit/brush-holder/contact products from Spare Parts to Electrical Spares, requiring both source category Auto Electrical and a specific product-name match.
- Reviewed 93 products in legacy Sockets: 55 names containing “socket” moved to Sockets; 10 containing “spanner” moved to Spanners; remaining 28 workshop-tool items moved to Hand Tools. No product records were deleted/deactivated.
- Latest verified totals: **4,187 active products; 3,193 inside approved trees; 994 outside; zero active products without a category**.


## Sixth correction batch — outdoor and lifestyle categories
- Moved **19** non-mechanical products from legacy 4X4 Outdoor into the existing 4X4 Outdoor child category; product names matching mechanical indicators were deliberately excluded for manual review.
- Moved **11** Lifestyle products into the existing Lifestyle child category and reparented both 4X4 Outdoor and Lifestyle children under Camping / Leisure / Outdoors.
- Latest verified totals: **4,187 active products; 3,223 inside approved trees; 964 outside; zero active products without a category**.
- Remaining outside-tree groups: Spare Parts 697; Abrasives 103; Clamps 32; Thermostats & Pipes 32; Suspension 28; Fuel Pumps & Oil Filter 27; Brake Parts 25; Radiator Caps & Bottles 12; Cylinders 5; plus three mechanical 4X4 items held for review. Mechanical/mixed groups remain untouched rather than mislabelled as electrical spares.


## CATEGORY STRUCTURE PROPOSAL — 2026-10-11 (OWNER SELECTED; MAPPING REVIEW ONLY)

Owner selected these eight public storefront categories, with no extra changes requested:
1. Auto Electrical Spares
2. Vehicle Security
3. Car Audio & Entertainment
4. Automotive Accessories
5. Marine Spares & Accessories
6. Tools, Hardware & Consumables
7. Camping, Leisure & Outdoors
8. Trailer & Canopy

Proposed tree (public-facing; child categories are proposed navigation labels, not yet a database migration):
- Auto Electrical Spares
  - 12V Light-Duty Vehicles (cars, bakkies, etc.)
    - Alternators & Alternator Spares; Starter Motors & Starter Spares; Fuel Pumps; Ignition Coils & Ignition; Sensors; Fans & Fan Spares; Relays; Switches; Fuses; Wiring & Connectors; Lamps & Vehicle Electrical Lighting; Batteries (only where stocked/verified)
  - 24V Heavy-Duty Vehicles (trucks, buses, etc.)
    - Alternators & Alternator Spares; Starter Motors & Starter Spares; Fuel Pumps; Sensors; Fans & Fan Spares; Relays; Switches; Fuses; Wiring & Connectors; Lamps & Vehicle Electrical Lighting
  - General Auto Electrical (only products not reliably assigned to 12V/24V)
- Vehicle Security
  - Vehicle Alarms; Central Locking; Immobilisers; Remote Controls; Vehicle Tracking; Central-Locking Parts
- Car Audio & Entertainment
  - Head Units / Radios; Speakers; Amplifiers; Subwoofers; Aerials; Crossovers & Equalisers; Audio Wiring & Installation; Multimedia / DVD
- Automotive Accessories
  - Interior Accessories; Exterior Accessories; Car Mats; Seat Covers; Gear Knobs & Hand-Brake Covers; Steering-Wheel Covers; Mirrors (accessory fitment only); Wheel Accessories & Covers; Panel Clips; Lighting Accessories; General Accessories; Safety Accessories
- Marine Spares & Accessories
  - Marine Electrical; Marine Lighting; Marine Audio; Marine Spares; Pumps & Plumbing; Marine Rigging; Boat Accessories
- Tools, Hardware & Consumables
  - Automotive Tools; Hand Tools; Electrical Tools; Diagnostic Tools; Measuring Tools & Multimeters; Cutting Tools & Drill Bits; Spanners / Sockets / Screwdrivers; Clamps; Hardware / Padlocks / Fasteners; Abrasives; Workshop Equipment; Consumables; Garden Tools (only if suitable for the store)
- Camping, Leisure & Outdoors
  - Camping; Lifestyle / Outdoor Living; 4x4 Outdoor; Winches; Winch Spares & Accessories; Portable Compressors; Hand & Foot Pumps; Outdoor Lighting
- Trailer & Canopy
  - Trailer; Trailer & Towing; Trailer Electrical / Lighting; Canopy; Towing & Recovery

Product-mapping plan (no writes/deletions performed):
1. Use active product UUID/SKU/name/current category as the migration key; preserve SKU, price, cost, stock, image URL, compatibility, specifications and active status.
2. Build explicit old-category-ID -> proposed-category-ID mapping, then review product-level exceptions by SKU and name. Never migrate on a vague keyword alone.
3. Keep families distinct: auto electrical spares vs automotive accessories; security vs audio; marine vs road-vehicle products; tools vs the part they service; camping/outdoors vs marine; trailer/canopy vs general accessories.
4. Map only high-confidence categories automatically. Existing category records include duplicate root names and 242 total categories; resolve duplicate roots by UUID and active SKU membership, not name alone.
5. Treat generic/mixed buckets as manual-review queues, especially root 'Spare Parts' (136 active products in the latest query), generic 'Electrical', generic 'Accessories', 'General Accessories', 'General Parts', and any product filed under a misleading family. The generic Spare Parts bucket has legacy mechanical-style subcategories (e.g. brakes, suspension, cylinders, exhaust, hoses, thermostats, wipers); do NOT automatically relabel these as Auto Electrical Spares. Flag them for owner/business-scope review because the store positioning excludes mechanical parts.
6. For overlaps, classify by product function and fitment: vehicle electrical lamp/bulb vs decorative/accessory light; marine pump vs general pump; winch part vs workshop tool; trailer lamp/wiring vs generic auto electrical. If evidence is insufficient, leave current category untouched and report SKU as unresolved.
7. Before database changes, produce a SKU-level CSV/report with old category path, proposed category path, confidence (high/medium/manual), rationale, and scope exception. No category deletes or product moves until mapping is reviewed.
8. After owner mapping approval, apply a transaction/guarded migration; verify exactly 4,187 active products remain, zero active products uncategorized, and no product, pricing, stock, image, compatibility or order fields changed. Then regenerate category tree, run category/navigation smoke tests and QA, build one fresh Axxess package only once, and preserve existing Axxess admin.html and cgi-bin.

Read-only category notes:
- 242 category records exist; duplicate root names and legacy/empty records are present.
- Root counts are not final family totals because children and duplicates exist.
- Examples of populated branches: Automotive Accessories root (288 active); Car Audio root (39); Marine Spares & Accessories root (5) plus BOAT ACCESSORIES child (52); Tools & Workshop root (133) plus populated children; Camping / Leisure / Outdoors root (9) plus populated children; Trailer & Canopy root (64) plus populated children; Alarms & Security root (2) plus security child categories. These are current-category counts, not proposed totals.
- Preserve previously confirmed exact-SKU corrections: 7 fuel-pump SKUs to 12V Light-Duty > Fuel Pumps; 9 camping SKUs to Camping/Leisure > Lifestyle; A10-048 fuel-pump-removal tool to Tools & Workshop > Automotive Tools.
- Existing category-tree JSON was refreshed after those exact-SKU fixes. No broad restructuring has been performed.
- Next: prepare SKU-level mapping output and exception list from active products/categories; report ambiguous/mechanical-scope products separately. Do not delete categories, update products.category_id, or build/upload an Axxess release before mapping review.
- ETA: tree and mapping rules drafted; SKU-level mapping audit is next. No Axxess upload initiated.
