# Audio catalogue price and Starsound specification reconciliation — 4 November 2026

## Three previously missing indicative market references

These are South African third-party retail comparisons added to the preview's `indicativePrice` field. They are **not** Audio Connections dealer prices, supplier costs, supplier RRPs, or approved Get Wired selling prices. The catalogue cards continue to say "Indicative preview" and request a current quote; all records remain `PREVIEW_ONLY_NOT_LIVE`.

| Record | Normalized model | Indicative market reference | Evidence |
|---|---|---:|---|
| ac-023 | SSW-8-8000D2 | R1,395 | [Autostyle exact-model listing](https://www.autostyle.co.za/product/starsound-ssw-8-8000d2-8-8000w-dvc-2ohm-subwoofer/) |
| ac-025 | SSW-B12-2800 | R1,299 | [PriceCheck listing / Bradlows and Russells offers](https://www.pricecheck.co.za/search?search=starsound+subwoofer) |
| ac-027 | SSW-F12-5150SVC | R795 | [Autostyle exact-model listing](https://www.autostyle.co.za/product/starsound-ssw-f12-5150svc-12-flat-series-svc-subwoofer/) |

Each record now has a source URL, source label, checked date (2026-11-04), explicit retail-comparable-only price basis and a customer-visible description caveat. No selling price or margin has been approved.

## Previously ambiguous Starsound amplifier power labels

Eight records had incomplete, malformed or unclear power strings. Their model numbers and descriptions were reconciled against exact-model manufacturer pages where available, otherwise specialist South African retailer specification listings. No ambiguous source wattage was silently converted into a guess.

| Record | Normalized model | Reconciled specification | Evidence status |
|---|---|---|---|
| ac-032 | SSA-ATOM-13500.1 | 500 W RMS @ 1 Ω; 250 W RMS @ 2 Ω; 600 W maximum output | Official Starsound page: https://starsound.co.za/product/ssa-atom-13500-1/ |
| ac-034 | SSA-H-8200.1 | 600 W RMS @ 1 Ω; 300 W @ 2 Ω; 150 W @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-h-8200-1/ |
| ac-037 | SSA-R-5000.4 | 65 W ×4 @ 4 Ω; 95 W ×4 @ 2 Ω; 180 W ×2 bridged @ 4 Ω | Specialist retailer cross-check: https://jmsounds.co.za/product-tag/starsound/ |
| ac-038 | SSA-HORNET-7600.4 | 65 W ×4 @ 2 Ω; 45 W ×4 @ 4 Ω; 90 W bridged @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-hornet-7600-4/ |
| ac-039 | SSA-J-10000.4 | 90 W ×4 @ 2 Ω; 60 W ×4 @ 4 Ω; 140 W bridged @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-j-10000-4/ |
| ac-040 | SSA-ATOM-13800.4 | 320 W ×4 @ 1 Ω; 160 W ×4 @ 2 Ω; 80 W ×4 @ 4 Ω; 160 W bridged @ 4 Ω | Official Starsound page: https://starsound.co.za/product/ssa-atom-13800-4/ |
| ac-041 | SSA-M5-80.600 | 80 W ×4 + 250 W sub @ 4 Ω; 140 W ×4 + 410 W sub @ 2 Ω; 600 W sub @ 1 Ω; 240 W ×2 bridged @ 4 Ω | Specialist retailer cross-check: https://www.autostyle.co.za/product/starsound-ssa-m5-80-600-5-channel-high-fidelity-class-d-amplifier/ |
| ac-042 | SSA-M4-80.4 | 80 W ×4 @ 4 Ω; 140 W ×4 @ 2 Ω; 240 W ×2 bridged @ 4 Ω | Specialist retailer cross-check: https://jmsounds.co.za/product/star-sound-ssa-m4-80-4-4-channel-amplifier/ |

## One specification remains deliberately unresolved

**ac-025 — SSW-B12-2800.** Starsound's official page confirms a 12-inch, 4-ohm subwoofer in its enclosure range but does not publish an RMS rating: https://starsound.co.za/product/ssw-b12-2800/. The Audio Connections source price-list entry states 300 W RMS; a third-party South African model inventory states 250 W RMS / 600 W peak. The preview now describes the conflict explicitly and does not assert a definitive wattage. Supplier/manufacturer confirmation is required before the power rating can be published.

## Safety and release state

- All 66 Audio Connections records remain preview-only; stock is not synchronized and supplier activation has not occurred.
- All candidate prices remain indicative and require a supplier quote plus owner margin approval.
- No supplier identity, dealer cost, supplier SKU, banking, payment, checkout, live stock, live price, Supabase write, DNS, Axxess upload or production deployment was changed.
