# Get Wired AutoWorx — Stock Sync Status — 2026-09-16

## Completed
- Rechecked the Supabase product stock workflow.
- Corrected active-product advertised prices to the agreed formula: `cost × 1.15 VAT × 1.35 markup`, rounded to 2 decimals where cost is present.
- Added `public.asc_stock_verification` as an admin-side verification ledger. It distinguishes `IN_STOCK`, `OUT_OF_STOCK`, `UNVERIFIED`, and `DISCONTINUED` and stores source URL, verified quantity and timestamp.
- Verified 36 SKU/stock records against public Accessories Spares Centre catalogue pages and recorded them in the ledger.
- Updated matching live-store stock quantities for those verified SKUs.
- GitHub Actions image workflow previously completed successfully; no Cloudflare credits were used for this work.

## ASC-verified stock recorded
CL01=47; SCL014=77; SCL011-S=220; DLS-IZD=14; DL-CC01=95; DLS-TE=107;
H1155W-NB=67; H4P43T60/55W-NB=21; H155W-NB=174; H755W-NB=59; H170W24V=1005; H370W24V=361; 339-10=1002; 880-LED=72;
CL203=726; 516IFF=788; A3-101BL=69; A3-001BL=247;
6007-2=7; 6007-3=12; 6007-23=84; 6007-21=10; 6007-12=21; B7-007BL=95;
S14-830BL=74; S14-820BL=100; S14-820GY=128; S14-410B=211; S14-540BL=114; S14-530G=86; S14-630GY=111; S14-340BL=84; S14-530R=208; S14-630R=157; S14-130BL=285; S14-120GY=99.

## Remaining hard blocker
The ASC website exposes stock on public category/shop pages but does not provide a public bulk stock export through the available web access. The store contains hundreds of additional zero/unverified SKUs. Absence from a search result cannot safely be treated as zero stock.

To finish the complete SKU-by-SKU live ASC reconciliation without inventing stock figures, the remaining required source is an ASC stock/pricelist export containing SKU and current quantity (CSV/XLSX is sufficient). Once available, it can be matched by SKU with no duplicates; confirmed zero stock can go to the ASC Query pool, while unverified remains unverified.
