# Approved-root category coverage audit — 2026-11-01

## Read-only result
- Queried the live Supabase product/category tables using SELECT only; no live product/category/price/stock/image rows were changed.
- Active products: **4,187**.
- Products within the eight approved active root trees: **3,622**.
- Active products outside those root trees: **565**.
- Of those 565, **37** are already represented in the existing category review queue; **528** were not. The companion CSV contains those 528 only.
- The 528 rows are grouped by their current legacy category in the CSV. The largest groups are Spare Parts (126), Mirrors (56), Door Parts (51), Suspension (44), Thermostats & Pipes (44), Wipers (44), Exhaust Tail Pieces (42), and Brake Parts (38).

## Handling rule
This is a **review queue, not an import file**. Preserve the eight approved roots. Trace each product to the original supplier catalogue or buyer's guide and confirm the correct leaf before routing. Do not auto-move items by keyword, do not treat OCR presence as approval, and do not write any category changes to Supabase as part of this review.
