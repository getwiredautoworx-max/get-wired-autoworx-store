# Planetworld positive-RRP cost-floor review queue
**Prepared:** 26 October 2026  
**Status:** Private, read-only review aid. Not approved selling prices or catalogue data.

## Scope and rules
- Derived from the successful current-main audit artifact for run [40287579649](https://github.com/getwiredautoworx-max/get-wired-autoworx-store/actions/runs/40287579649).
- Contains **19 distinct positive-RRP rows** flagged below estimated VAT-inclusive dealer cost at RRP−1%, RRP−2%, or both.
- The 19 zero-RRP owner-hold rows are excluded from this queue and from price suggestions.
- Source headers detected for this queue are `Retail Price (Incl)` and `Dealer Price (Excl)`; the audit estimates cost including VAT by multiplying dealer cost by 1.15. This is a mechanical source-column check, not confirmation that each row's values or VAT treatment are correct.
- Validate supplier source values, product/model identity and price basis before making any pricing decision. Do not modify source XLSX files, publish prices, or import data.

## Candidate rows
| Source workbook / row | Model/SKU | Description | RRP incl VAT | Dealer cost excl VAT | Estimated cost incl VAT | RRP−1% less cost | RRP−2% less cost |
|---|---|---|---:|---:|---:|---:|---:|
| harness-and-trims-price-list-2026-10-25.xlsx / Products row 6 | 86180 | ISO2CAR mute adaptor Toyota | R312.00 | R359.00 | R412.85 | −R103.97 | −R107.09 |
| harness-and-trims-price-list-2026-10-25.xlsx / Products row 9 | 90008003 | 2-Din Toyota Corolla 2007–2013 | R329.00 | R309.00 | R355.35 | −R29.64 | −R32.93 |
| harness-and-trims-price-list-2026-10-25.xlsx / Products row 23 | 90011904 | 2-Din Toyota OEM Head Unit Black | R349.00 | R299.00 | R343.85 | +R1.66 | −R1.83 |
| harness-and-trims-price-list-2026-10-25.xlsx / Products row 35 | 90013009 | Antenna Adaptor Amplified DBL Fakra to Bullet | R152.00 | R159.00 | R182.85 | −R32.37 | −R33.89 |
| harness-and-trims-price-list-2026-10-25.xlsx / Products row 38 | 90014004 | 2-Din Universal Cage Kit 180×113 mm | R311.00 | R309.00 | R355.35 | −R47.46 | −R50.57 |
| harness-and-trims-price-list-2026-10-25.xlsx / Products row 42 | 90022538 | 9-inch VW Polo 2014+ | R829.00 | R829.00 | R953.35 | −R132.64 | −R140.93 |
| harness-and-trims-price-list-2026-10-25.xlsx / Products row 43 | 90022567 | 9-inch Suzuki Alivio/Ciaz 2014+ | R229.00 | R209.00 | R240.35 | −R13.64 | −R15.93 |
| ibanez-price-list-2026-10-25.xlsx / Products row 268 | IAB541-WR | Ibanez Powerpad Series | R99.00 | R649.00 | R746.35 | −R648.34 | −R649.33 |
| jbl-price-list-2026-10-25.xlsx / Products row 7 | IRX108BT-EK | JBL 8-inch powered speaker with Bluetooth | R8,599.00 | R15,399.00 | R17,708.85 | −R9,195.84 | −R9,281.83 |
| jbl-price-list-2026-10-25.xlsx / Products row 12 | JBL-EON710-EK | JBL EON710 10-inch powered PA speaker | R15,399.00 | R33,799.00 | R38,868.85 | −R23,623.84 | −R23,777.83 |
| one-price-list-2026-10-25.xlsx / Products row 18 | ISA-ON115-3LX | OneNav 9-inch for Isuzu RBA/RBB | R4,543.00 | R3,999.00 | R4,598.85 | −R101.28 | −R146.71 |
| one-price-list-2026-10-25.xlsx / Products row 131 | ON1509-LX1 | OneNav Evolution 9-inch screen with slim chassis | R2,250.00 | R2,499.00 | R2,873.85 | −R646.35 | −R668.85 |
| one-price-list-2026-10-25.xlsx / Products row 155 | ON263-FK2 | OneNav fitment kit for Ford Ranger XLS 2015+ | R1,500.00 | R1,500.00 | R1,725.00 | −R240.00 | −R255.00 |
| paiste-price-list-2026-10-25.xlsx / Products row 55 | 0004801419 | Paiste 19-inch Signature Dark Energy Crash Mk I | R3,549.00 | R6,299.00 | R7,243.85 | −R3,730.34 | −R3,765.83 |
| remo-price-list-2026-10-25.xlsx / Products row 80 | HK-2417-00 | Remo Active Snare Dampening System | R286.00 | R249.00 | R286.35 | −R3.21 | −R6.07 |
| soundcraft-price-list-2026-10-25.xlsx / Products row 7 | 5085985EU | Soundcraft Notepad 12-channel desktop mixer | R4,599.00 | R8,599.00 | R9,888.85 | −R5,335.84 | −R5,381.83 |
| vogels-price-list-2026-10-25.xlsx / Products row 30 | 7225154 | Vogel's PUC 2515 pole, 150 cm, silver | R1,506.00 | R1,310.00 | R1,506.50 | −R15.56 | −R30.62 |
| vogels-price-list-2026-10-25.xlsx / Products row 81 | PFW4600 | Vogel's Pro wall mount, 55–65 inch, 75 kg | R999.00 | R869.00 | R999.35 | −R10.34 | −R20.33 |
| vogels-price-list-2026-10-25.xlsx / Products row 82 | THIN215 | Vogel's THIN215 LED wall support | R399.00 | R347.00 | R399.05 | −R4.04 | −R8.03 |

## Interpretation
Several rows show unusually large differences between RRP and estimated dealer cost (notably Ibanez, JBL, Paiste and Soundcraft). These must be treated as **source-value / price-basis verification flags**, not as permission to change either price. Even small below-cost differences remain below cost under the stated VAT assumption.

## Next action
Verify the exact source workbook row and product identity for these 19 candidates; ask Planetworld for clarification where the source values or price basis remain inconsistent. Keep all price and stock work review-only pending supplier authorisation. Customer launch remains **HOLD**.
