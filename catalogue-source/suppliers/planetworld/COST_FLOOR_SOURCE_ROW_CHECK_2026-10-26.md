# Planetworld cost-floor source-row check — 2026-10-26

**Source:** latest successful read-only audit artifact from run [40285978617](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40285978617).  
**Purpose:** validate the mapped source fields for non-zero-RRP risk rows. Read-only; no supplier workbook or live data changed.

## What the source rows confirm
For the listed rows, the audit mapped the supplier's **Retail Price (Incl)** as RRP and **Dealer Price (Excl)** as dealer cost. Adding 15% VAT to the dealer cost makes the listed RRP lower than estimated VAT-inclusive cost for 18 rows, before any proposed discount. The fields are not obviously swapped or unmapped in the extracted source rows, but source errors, bundle treatment, pricing policy, and supplier price basis still need confirmation. These are not approved prices.

| Workbook / row | Model / short description | Dealer cost excl. VAT | Retail Price (Incl) | Est. cost incl. VAT | RRP−1% less than cost by |
|---|---|---:|---:|---:|---:|
| jbl-price-list-2026-10-25.xlsx / 12 | JBL-EON710-EK, EON710 powered PA speaker | 33,799.00 | 15,399.00 | 38,868.85 | 23,623.84 |
| jbl-price-list-2026-10-25.xlsx / 7 | IRX108BT-EK, powered Bluetooth speaker | 15,399.00 | 8,599.00 | 17,708.85 | 9,195.84 |
| soundcraft-price-list-2026-10-25.xlsx / 7 | 5085985EU, Notepad 12-channel mixer | 8,599.00 | 4,599.00 | 9,888.85 | 5,335.84 |
| paiste-price-list-2026-10-25.xlsx / 55 | 0004801419, 19-inch Dark Energy Crash | 6,299.00 | 3,549.00 | 7,243.85 | 3,730.34 |
| ibanez-price-list-2026-10-25.xlsx / 268 | IAB541-WR, Powerpad series | 649.00 | 99.00 | 746.35 | 648.34 |
| one-price-list-2026-10-25.xlsx / 131 | ON1509-LX1, OneNav Evolution 9-inch screen | 2,499.00 | 2,250.00 | 2,873.85 | 646.35 |
| one-price-list-2026-10-25.xlsx / 155 | ON263-FK2, OneNav Ford Ranger fitment kit; Bundle=Yes | 1,500.00 | 1,500.00 | 1,725.00 | 240.00 |
| harness-and-trims-price-list-2026-10-25.xlsx / 42 | 90022538, VW Polo 9-inch fitment | 829.00 | 829.00 | 953.35 | 132.64 |
| harness-and-trims-price-list-2026-10-25.xlsx / 6 | 86180, Toyota ISO2CAR mute adaptor | 359.00 | 312.00 | 412.85 | 103.97 |
| one-price-list-2026-10-25.xlsx / 18 | ISA-ON115-3LX, OneNav Isuzu RBA/RBB; Bundle=Yes | 3,999.00 | 4,543.00 | 4,598.85 | 101.28 |
| harness-and-trims-price-list-2026-10-25.xlsx / 38 | 90014004, universal 2-DIN cage kit | 309.00 | 311.00 | 355.35 | 47.46 |
| harness-and-trims-price-list-2026-10-25.xlsx / 35 | 90013009, amplified Fakra-to-bullet antenna adaptor | 159.00 | 152.00 | 182.85 | 32.37 |
| harness-and-trims-price-list-2026-10-25.xlsx / 9 | 90008003, Toyota Corolla 2-DIN kit | 309.00 | 329.00 | 355.35 | 29.64 |
| vogels-price-list-2026-10-25.xlsx / 30 | 7225154, PUC 2515 ceiling pole | 1,310.00 | 1,506.00 | 1,506.50 | 15.56 |
| harness-and-trims-price-list-2026-10-25.xlsx / 43 | 90022567, Suzuki Alivio/Ciaz fitment | 209.00 | 229.00 | 240.35 | 13.64 |
| vogels-price-list-2026-10-25.xlsx / 81 | PFW4600, flat TV wall mount | 869.00 | 999.00 | 999.35 | 10.34 |
| vogels-price-list-2026-10-25.xlsx / 82 | THIN215, TV wall support | 347.00 | 399.00 | 399.05 | 4.04 |
| remo-price-list-2026-10-25.xlsx / 80 | HK-2417-00, Active Snare Dampening System | 249.00 | 286.00 | 286.35 | 3.21 |

## One additional 2% sensitivity flag
`harness-and-trims-price-list-2026-10-25.xlsx`, row 23, model `90011904`, “2-Din Toyota OEM Head Unit Black”: dealer cost excl. VAT **299.00**, Retail Price (Incl) **349.00**, estimated VAT-inclusive cost **343.85**. It is about **R1.66 above estimated cost at full RRP**, but falls about **R1.83 below cost at RRP−2%**. This row is not in the 18-row RRP−1% list.

## Next action / disposition
1. Ask Planetworld to confirm the correct RRP, dealer cost, bundle/pack basis, and VAT treatment for these rows—especially the extreme JBL, Soundcraft, Paiste and Ibanez gaps.
2. Keep the 18 cost-floor rows out of any automatic 1–2% price reduction pending confirmation.
3. Keep all 19 zero-RRP rows in the separate owner-audit list.
4. No source workbook was changed, no price was overwritten, and no catalogue import occurred.
