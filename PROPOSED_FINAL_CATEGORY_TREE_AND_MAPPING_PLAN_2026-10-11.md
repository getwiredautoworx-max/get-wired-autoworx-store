# Get Wired AutoWorx — Proposed Final Category Tree & Mapping Plan
Updated: 2026-10-11
Status: PROPOSAL ONLY — NO DATABASE OR STOREFRONT CATEGORY CHANGES AUTHORISED BY THIS FILE

## Objective
Prepare the approved eight customer-facing categories and a safe mapping method for the next Axxess storefront package. This document is a review plan, not a migration. Do not delete, deactivate, rename, re-parent categories or move products until the complete SKU-level mapping has been checked.

## Final customer-facing main categories
1. Auto Electrical Spares
2. Vehicle Security
3. Car Audio & Entertainment
4. Automotive Accessories
5. Marine Spares & Accessories
6. Tools, Hardware & Consumables
7. Camping, Leisure & Outdoors
8. Trailer & Canopy

These are the only eight top-level categories intended for customer-facing main navigation. Specialist categories should remain as useful children beneath the correct root. Do not flatten everything into the root.

## Proposed tree and candidate child groups

### 1. Auto Electrical Spares
Candidate children: 12V Light Duty Vehicles; 24V Heavy Duty Vehicles; Batteries & Accessories; Charging & Starting (alternators/starters); Ignition Spares; Regulators; Relays; Fuses; Switches; Sensors; Globes & Globe Holders; vehicle wiring, terminals and electrical connectors; automotive gauges/instruments; vehicle electrical pumps/fans only when the item is demonstrably electrical/automotive.
Mapping exclusions: brake discs/shoes, suspension, gearbox, engine mechanical parts, radiator caps/bottles, thermostats and generic mechanical service parts must not be routed here solely because supplier metadata says “Auto Electrical”.

### 2. Vehicle Security
Candidate children: Alarms & Immobilisers; Central Locking; Central Locking Parts; vehicle-specific locking/security; security accessories where the product title confirms the purpose.
Review: door handles/window mechanisms and generic padlocks are not automatically vehicle security; split by actual product use.

### 3. Car Audio & Entertainment
Candidate children: Head Units & Receivers; Speakers; Amplifiers; Subwoofers; Crossovers; Audio Wiring & Installation; Aerials confirmed for vehicle audio; multimedia/DVD/entertainment and compatible audio accessories.
Review: general radio/communications aerials or unrelated antennas need manual classification.

### 4. Automotive Accessories
Candidate children: Car Mats; Mirrors; Wipers; Wheel Covers & Wheel Accessories; Steering Wheel Covers; vehicle trim/panel clips; door accessories; racing stickers; confirmed automotive convenience accessories; vehicle-specific non-electrical accessories.
Review: do not place mechanical brake/cooling/suspension parts here simply to avoid an “outside tree” result. Mixed-use lamps, spotlights, clamps and 4X4 products require SKU-level review.

### 5. Marine Spares & Accessories
Candidate children: Boat Accessories; Marine Electrical; marine lighting; marine wiring/switches; boat-specific fittings, rigging and confirmed marine spares.
Review: product name/description must support marine use; generic “Parts” metadata alone is insufficient. Where an item is also a generic electrical component, choose a single primary category based on the verified product and store merchandising rule.

### 6. Tools, Hardware & Consumables
Candidate children: Automotive Tools; Hand Tools; Spanners; Screwdrivers; Cutting Tools; Drill Bits; Abrasives; Measuring Tools; Diagnostic Tools; Multimeters; workshop consumables; utility blades/cutters; crimping tools; clamps only after checking their function; other verified workshop hardware.
Review: a product's use as a tool overrides misleading supplier source-category labels, but not the need to confirm the product title.

### 7. Camping, Leisure & Outdoors
Candidate children: Camping & Outdoor; 4X4 Outdoor; portable/outdoor lighting; leisure power and outdoor accessories; lifestyle/outdoor items; hand/foot pumps only when the product is intended for outdoor/leisure use.
Review: separate vehicle-mounted 4X4 accessories, workshop tools and boat-specific products into their appropriate roots when evidence supports that classification.

### 8. Trailer & Canopy
Candidate children: Trailer & Towing; Canopy Accessories; trailer electrical/lighting; trailer fittings and confirmed trailer-specific accessories.
Review: do not activate/re-parent the current root or move its products until root status, child assignments and duplicate legacy categories have been checked together.

## Mapping workflow — required before any live write
1. Export all 4,187 active products in bounded read-only batches. Include product ID, public SKU, product name, description, specifications/source category/source subcategory, current category ID/name, full parent chain, active status and image reference.
2. Build a candidate row for every product with proposed root, proposed specialist leaf, confidence (high/medium/low), evidence and reason.
3. Use product title/description, current leaf and parent chain, SKU and supplier metadata together. Supplier source category is supporting evidence only.
4. Flag ambiguous, mixed-use, malformed or mechanical products for manual review. Do not automatically map them.
5. Compare proposed assignments against the current live category tree and homepage/category navigation aliases. Report duplicate roots, orphan categories, inactive roots with assigned products and name/slug collisions.
6. Produce a before/after count report per root and leaf, plus a list of products that would remain unmapped. No rows are changed during this stage.
7. Only after the owner-reviewed mapping is accepted: make one controlled, reversible batch; verify all 4,187 active products remain active and correctly priced, and verify no SKU/product/image/order/stock fields changed.
8. Regenerate the category-tree JSON from the post-change live data; compare live counts to snapshot counts; test all eight roots, representative leaves, search and product detail; then prepare one Axxess upload package.

## Confidence rules
- High: unambiguous product title and description, specialist leaf, and application agree.
- Medium: likely destination but one field is broad, mixed-use, or incomplete; sample/verify before approval.
- Low/manual: generic “Spare Parts”, “Parts”, ambiguous “Cylinders”, mixed “Fuel Pumps & Oil Filter”, ambiguous clamps/lamps/spotlights, malformed names, mechanical parts outside the intended store scope, or conflicting category evidence.

## Known audit caveats to reconcile
- The category mapping review records older counts of 976 inside approved trees / 3,211 outside, then later correction notes 3,223 inside / 964 outside. These are different audit points, not a single current baseline.
- The generated category snapshot is timestamped 2026-10-11 08:00 UTC and lists duplicate legacy/catalogue roots alongside intended customer-facing roots. It must be reconciled against live product assignments before it is used as the final navigation source.
- The current customer page hard-codes root IDs and legacy aliases; final root IDs and homepage aliases must be verified against the live category rows before editing navigation.
- No product/category database writes, category deactivations, product moves, hosting upload or deployment were performed by creating this proposal.

## Completion gate
Do not mark the category task complete until a complete SKU-level mapping report exists, all ambiguous rows are explicitly held for review, counts reconcile to the live 4,187 active products, and navigation tests pass. The next Axxess package should be prepared only after that gate and the existing upload/deployment constraints are respected.
