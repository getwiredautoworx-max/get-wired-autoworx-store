# Audio catalogue price and Starsound specification reconciliation — 4 November 2026

## Three previously missing indicative market references

These are South African third-party retail comparisons added to the preview's `indicativePrice` field. They are **not** Audio Connections dealer prices, supplier costs, supplier RRPs, or approved Get Wired selling prices. The catalogue cards continue to say "Indicative preview" and request a current quote; all records remain `PREVIEW_ONLY_NOT_LIVE`.

| Record | Normalized model | Indicative market reference | Evidence |
|---|---|---:|---|
| ac-023 | SSW-8-8000D2 | R1,395 | [Autostyle exact-model listing](https://www.autostyle.co.za/product/starsound-ssw-8-8000d2-8-8000w-dvc-2ohm-subwoofer/) |
| ac-025 | SSW-B12-2800 | R1,299 | [PriceCheck exact-model offer (Bradlows and Russells)](https://www.pricecheck.co.za/offers/258568978/SSW-B12-2800%2B12-INCH%2BBass%2BReflex%2BVented%2BSubwoofer) |
| ac-027 | SSW-F12-5150SVC | R795 | [Autostyle exact-model listing](https://www.autostyle.co.za/product/starsound-ssw-f12-5150svc-12-flat-series-svc-subwoofer/) |

Each record now has a source URL, source label, checked date (2026-11-04), explicit retail-comparable-only price basis and a customer-visible description caveat. No selling price or margin has been approved.

## Previously ambiguous Starsound amplifier power labels

Eight records had incomplete, malformed or unclear power strings. Their model numbers and descriptions were reconciled against exact-model manufacturer pages where retrievable, otherwise specialist South African retailer specification listings. ac-032 is explicitly retailer-corroborated rather than manufacturer-confirmed; supplier confirmation remains required. No ambiguous source wattage was silently converted into a guess.

| Record | Normalized model | Reconciled specification | Evidence status |
|---|---|---|---|
| ac-032 | SSA-ATOM-13500.1 | 520 W RMS @ 1 Ω; 380 W RMS @ 2 Ω; 230 W RMS @ 4 Ω; 600 W maximum output | Two independent exact-model South African retailer listings agree: https://maxmotorsport.co.za/products/star-sound-atom-series-micro-monoblock-amplifier-13500w and https://soundslimited.co.za/products/starsound-atom-1ch-micro-amplifier-ssa-atom-13500-1-small-footprint-1ch-mono-amplifier. Manufacturer page could not be independently retrieved; supplier confirmation required. |
| ac-034 | SSA-H-8200.1 | 600 W RMS @ 1 Ω; 300 W @ 2 Ω; 150 W @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-h-8200-1/ |
| ac-037 | SSA-R-5000.4 | 65 W ×4 @ 4 Ω; 95 W ×4 @ 2 Ω; 180 W ×2 bridged @ 4 Ω | Specialist retailer cross-check: https://jmsounds.co.za/product-tag/starsound/ |
| ac-038 | SSA-HORNET-7600.4 | 65 W ×4 @ 2 Ω; 45 W ×4 @ 4 Ω; 90 W bridged @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-hornet-7600-4/ |
| ac-039 | SSA-J-10000.4 | 90 W ×4 @ 2 Ω; 60 W ×4 @ 4 Ω; 140 W bridged @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-j-10000-4/ |
| ac-040 | SSA-ATOM-13800.4 | 320 W ×4 @ 1 Ω; 160 W ×4 @ 2 Ω; 80 W ×4 @ 4 Ω; 160 W bridged @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-atom-13800-4/ |
| ac-041 | SSA-M5-80.600 | 80 W ×4 + 250 W sub @ 4 Ω; 140 W ×4 + 410 W sub @ 2 Ω; 600 W sub @ 1 Ω; 240 W ×2 bridged @ 4 Ω | Specialist retailer cross-check: https://www.autostyle.co.za/product/starsound-ssa-m5-80-600-5-channel-high-fidelity-class-d-amplifier/ |
| ac-042 | SSA-M4-80.4 | 80 W ×4 @ 4 Ω; 140 W ×4 @ 2 Ω; 240 W ×2 bridged @ 4 Ω | Specialist retailer cross-check: https://jmsounds.co.za/product/star-sound-ssa-m4-80-4-4-channel-amplifier/ |

## Additional Starsound power/specification reconciliation

Eight amplifier rows were corrected against exact-model pages or specialist retailer specification sheets:
- SSA-ATOM-13500.1 — 500 W RMS @ 1 Ω / 250 W RMS @ 2 Ω (official)
- SSA-H-8200.1 — 600 / 300 / 150 W RMS @ 1 / 2 / 4 Ω (official)
- SSA-R-5000.4 — 65 W ×4 @ 4 Ω; 95 W ×4 @ 2 Ω; 180 W ×2 bridged @ 4 Ω (retailer cross-check)
- SSA-HORNET-7600.4 — 65 W ×4 @ 2 Ω; 45 W ×4 @ 4 Ω; 90 W bridged @ 4 Ω (official)
- SSA-J-10000.4 — 90 W ×4 @ 2 Ω; 60 W ×4 @ 4 Ω; 140 W bridged @ 4 Ω (official)
- SSA-ATOM-13800.4 — 320 / 160 / 80 W RMS ×4 @ 1 / 2 / 4 Ω; 160 W bridged @ 4 Ω (official)
- SSA-M5-80.600 — 5-channel: 80 W ×4 + 250 W sub @ 4 Ω; 140 W ×4 + 410 W sub @ 2 Ω; sub 600 W @ 1 Ω; bridge 240 W ×2 @ 4 Ω (retailer cross-check)
- SSA-M4-80.4 — 80 W ×4 @ 4 Ω; 140 W ×4 @ 2 Ω; 240 W ×2 bridged @ 4 Ω (retailer cross-check)

Additional speaker/subwoofer corrections:
- SSW-12W-5200: official Starsound specification is 250 W RMS, 4 Ω (source list's 300 W corrected).
- SSS-5502: official specification is 420 W MAX, 4 Ω; manufacturer does not publish RMS.
- SSS-6602: official specification is 480 W MAX, 4 Ω; manufacturer does not publish RMS.
- SSS-6501PRO: retailer lists 250 W RMS, but per-speaker versus per-pair basis remains unclear.
- SSD-620: multiple South African retailer specifications agree on 80 W RMS / 1,200 W maximum, 6.5-inch 2-way coaxial.

## Four specifications remain held pending authoritative confirmation

1. **SSW-12-6300 (ac-021):** source list 300 W without RMS/max basis; one retailer says 500 W RMS and another inventory says 350 W RMS. Official product page retrieval timed out.
2. **SSW-B12-2800 (ac-025):** official Starsound page confirms a 12-inch, 4-ohm enclosure model but publishes no RMS rating. Source list says 300 W RMS; another inventory says 250 W RMS / 600 W peak.
3. **SSS-6501PRO (ac-044):** 250 W RMS listing conflicts with another retailer's 250 W per-pair wording; unit basis must be confirmed.
4. **SSS-6903 (ac-047):** official Starsound page confirms a 6×9-inch, 4-ohm speaker but no power rating; source list says 600 W and another inventory says 500 W.

Do not state definitive wattage for these four records until the manufacturer or supplier confirms the rating and unit basis. The uncertainty is preserved in the catalogue data and regression assertions.

## Safety and release state

- All 66 Audio Connections records remain preview-only; stock is not synchronized and supplier activation has not occurred.
- All candidate prices remain indicative and require a supplier quote plus owner margin approval.
- No supplier identity, dealer cost, supplier SKU, banking, payment, checkout, live stock, live price, Supabase write, DNS, Axxess upload or production deployment was changed.
