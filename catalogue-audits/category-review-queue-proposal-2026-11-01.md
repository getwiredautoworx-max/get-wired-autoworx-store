# Category Review Queue — Read-only proposal

**Snapshot:** 1 November 2026  
**Source:** `public.category_review_queue` (198 rows)  
**Purpose:** conservative review aid only. This file is not a Supabase import or an approved category-change list.

## Snapshot findings
- Queue rows: **198**
- Blank product names: **0** (this corrects an earlier handover note that reported 9)
- Weak/blank/SPECIAL guide classifications: **10**
- Keyword-assisted suggestions: **63**
- Manual review retained: **135**

## Proposed-root triage
- MANUAL_REVIEW — LOW: 135
- Automotive Accessories — MEDIUM: 18
- Auto Electrical Spares — MEDIUM: 18
- Tools, Hardware & Consumables — HIGH: 14
- Camping, Leisure & Outdoors — HIGH: 9
- Tools, Hardware & Consumables — MEDIUM: 2
- Marine Spares & Accessories — MEDIUM: 1
- Car Audio & Entertainment — HIGH: 1

## Rules and cautions
- Suggestions use product names and buyer-guide subcategory text; the existing category is included only as context, with the 4X4/winch cross-check retained for the Camping hierarchy.
- Mechanical/service parts (brakes, clutch cylinders, hoses, filters, pumps, engine/cooling parts) are left for manual review rather than forced into Auto Electrical Spares or Automotive Accessories.
- `SPECIAL`, `SUPERSAVE`, malformed guide labels, mixed-use items and unclear products remain manual unless the product name independently establishes a category.
- Every row has `owner_review_required=YES`. Even HIGH confidence is a review suggestion, not permission to reclassify.
- This queue is only 198 flagged rows, not the complete 4,187-active-product SKU mapping.
- No prices, dealer costs or stock values are included. No live product/category rows were changed.
