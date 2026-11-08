> **HISTORICAL / SUPERSEDED — 2026-11-08:** This file records an earlier review or instruction set, not the current storefront specification. Current authority is `AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md` (including dated Section 10), `HANDOVER_CURRENT.md`, and the latest direct owner instructions. The current customer storefront has exactly three main departments: Auto Electrical Spares; Car Audio / Home Entertainment; Car Care & Accessories. Customer-facing price display is Price On Request for all supplier products until current supplier pricing and stock can be updated reliably. Do not use this historical file to authorise category changes, catalogue processing, price display, import or production release.

# Live Category & Catalogue Audit — 1 November 2026

**Status:** Read-only audit. No product/category/stock/price records were changed. This report is evidence for review, not approval to reclassify live products.

## Database snapshot

Read-only queries against the existing Supabase project returned:

| Measure | Current result |
|---|---:|
| Product rows | 4,200 |
| Active products | 4,187 |
| Inactive products | 13 |
| Category rows | 243 |
| Top-level category rows | 66 |
| Active products with NULL category_id | 0 |
| Products with an invalid non-NULL category_id | 0 |
| Active products with blank/missing image_url | 0 |

Image URL presence does not prove the remote image loads or depicts the correct model. The live category counts supersede older 166-category / 58-root reports.

## Top-level direct assignment counts

These counts are for products assigned directly to the named root, not descendant totals.

| Current root | Direct active products | Root rows with same label |
|---|---:|---:|
| Automotive Accessories | 288 | 3 |
| Spare Parts | 136 | 1 |
| Tools & Workshop | 133 | 2 |
| Trailer & Canopy | 64 | 1 |
| Car Audio | 39 | 2 |
| Camping / Leisure / Outdoors | 9 | 1 |
| Marine Spares & Accessories | 5 | 1 |
| Electrical | 3 | 2 |
| Alarms & Security | 2 | 2 |
| 4X4 Outdoor | 0 | 1 |

The live schema therefore does not yet implement the proposed eight customer-facing roots as a clean, unique top-level tree. Several approved root concepts currently exist under legacy/specialist names, while multiple same-label root rows exist.

## High-volume current category leaves

| Current category label | Active products |
|---|---:|
| ELECTRICAL SPARES | 506 |
| Hand Tools | 324 |
| AUTOMOTIVE TOOLS | 321 |
| Automotive Accessories | 288 |
| SWITCHES | 169 |
| Spanners & Wrenches | 148 |
| PANEL CLIPS | 141 |
| LAMPS | 138 |
| Spare Parts | 136 |
| WHEEL ACCESSORIES | 136 |
| Tools & Workshop | 133 |
| FUSES | 94 |
| AUTOMOTIVE ACCESSORIES | 85 |
| Consumables | 84 |
| Trailer & Canopy | 64 |
| ACCESSORIES | 60 |
| MIRRORS | 58 |
| SOCKETS | 55 |
| RELAYS | 53 |
| BOAT ACCESSORIES | 52 |

## Concrete exception candidates from live product rows

The following rows have product-name evidence that conflicts with the assigned category. They are candidates for human review, not automatic reclassification:

| Public SKU | Supplier/internal SKU | Product | Current category | Review direction |
|---|---|---|---|---|
| GW-13B062D4 | HYI-BD01 | Brake Disc Front Hyundai i10 | ELECTRICAL SPARES | Mechanical Brake Parts / Spare Parts |
| GW-EBE9C177 | HYI-BD02 | Brake Disc Front Hyundai i10 Grand | ELECTRICAL SPARES | Mechanical Brake Parts / Spare Parts |
| GW-E3D54ABD | X0950200-BD | Brake Bell Drive Kit incl. brake shoe/disc | Automotive Accessories | Mechanical / specialist equipment; inspect full product use |

Earlier reviewed examples remain valid for evidence-led review:
- 4427SW, 6114B and G1-5026 are automotive gauges assigned to Fuses.
- 140805 is a ratchet wire-terminal crimping tool assigned to Hand Tools (candidate is likely already in a suitable tools branch; verify parent chain).
- AH8891C brake shoe set assigned to 4X4 Outdoor.
- RB-016 radiator bottle assigned to Air Filters.
- 311100 utility blades and 310018 utility cutter assigned to Automotive Accessories.
- EX908-2M aerial extension assigned to Aerials; retain specialist leaf pending confirmation of intended audio/communications use.

## Safe mapping procedure

1. Preserve current product IDs, SKUs, names, descriptions, images and source metadata in a read-only export.
2. Resolve each SKU using product title/description, manufacturer model, source category, source subcategory, vehicle/marine application, and source-guide page evidence together.
3. Keep mechanical braking, suspension, cooling and engine parts out of Auto Electrical Spares even when supplier metadata says “Auto Electrical”.
4. Route hand tools, cutting tools, workshop consumables and diagnostic tools to Tools, Hardware & Consumables when product evidence confirms that use.
5. Retain specialist child categories such as Fuses, Relays, Switches, Aerials and Speakers beneath the correct approved root; do not flatten all items to root level.
6. Flag ambiguous/mixed-use products for manual review. Never infer a category from a supplier heading alone.
7. Produce a full SKU-level proposal with confidence, evidence and exception reason; obtain owner approval before any Supabase category assignment write.

## Release boundary

This report does not authorise changes to live category rows, product category_id values, stock, prices, supplier catalogues, checkout, payments, DNS, Axxess or production deployment. Existing stock and price data remain unchanged.


## Fresh review-queue triage — read-only snapshot, 1 November 2026

A fresh read-only query of `public.category_review_queue` now returns 198 rows, **0 missing/blank product names**, **0 blank classifications**, and **10 rows classified only as `SPECIAL`**. This supersedes the earlier checkpoint that reported nine missing names; all ten `SPECIAL` rows join to a live product name by SKU.

| SKU | Product name | Candidate direction from name only | Status |
|---|---|---|---|
| 6007-13 | Rod Fishing Rod Holder Mount Rubber Suction Mount | Marine Spares & Accessories → Fishing Accessories / Rod Holders | Candidate; confirm source application |
| 6007-14 | Heavy Duty Fishing Holder With Gutter | Marine Spares & Accessories → Fishing Accessories / Rod Holders | Candidate; confirm source application |
| 6007-6L-PG | Bicycle Rack 4 Carrier Plastic Gear | Automotive Accessories → Carriers & Racks | Candidate; confirm vehicle fitment |
| C3-504 | Wax High Golden Soft Wax High Coat Gloss Shine Clear Safe 230G | Tools, Hardware & Consumables → Car Care / Cleaning | Candidate |
| D9-009B | Black Tank Cover Black 2012 | Unresolved; possible vehicle/canopy accessory | Manual source lookup required |
| D9-FR2201 | Fender Vent Set Ranger T9 2022- | Automotive Accessories → Exterior Styling / Body Trim | Candidate; confirm model fitment |
| D9-NN1513 | Dress Up Kit Exterior Nissan Navara 2015-2018 Rbs Style | Automotive Accessories → Exterior Styling / Body Kits | Candidate; confirm model fitment |
| JG0160BEIP | Visbella Jelly Cleaning Mint 160G Bottle | Tools, Hardware & Consumables → Cleaning Supplies | Candidate |
| JG0160YWIP | Visbella Jelly Cleaning Lemon 160G Bottle | Tools, Hardware & Consumables → Cleaning Supplies | Candidate |
| M305 | Cleaning 300Ml Plyfit Spray Paint Metallic Gold | Tools, Hardware & Consumables → Paints & Consumables | Candidate |

These are triage suggestions from product names/descriptions only, not approved category assignments. Supplier/source-page evidence and owner approval remain required before any live category writes. No database changes were made.
