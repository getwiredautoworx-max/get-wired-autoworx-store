# Audio Connections — Missing Indicative Market Price & Specification Review
**Date:** 2026-11-04 (SAST)  
**Scope:** Review-only evidence for the three Starsound rows whose 5 August 2026 supplier PDF prints only “R” and supplies no numeric dealer price. No supplier price, RRP, VAT basis, availability, or customer selling price is inferred.

## Three missing indicative prices — market evidence located

| Source model | Indicative South African retail reference | Evidence | Decision |
|---|---:|---|---|
| SSW8"-8000D2 (standardized external listing spelling: SSW-8-8000D2) | **R1,395.00** | Autostyle lists the exact 8-inch, 8000 W DVC 2-ohm model at R1,395 and marks it in stock: https://www.autostyle.co.za/product/starsound-ssw-8-8000d2-8-8000w-dvc-2ohm-subwoofer/ . Additional market checks: Zaybees R1,350 (https://zaybees.co.za/shop/speakers/subwoofers/starsound-ssw-8-8000d2-8-8000w-high-power-subwoofer/) and IS Motorsport R1,450 (https://ismotorsport.co.za/products/star-sound-8-quot-ssw-8-000d2-dvc-d2-subwoofer-8000w). | Market benchmark established; supplier dealer price and availability still require Audio Connections confirmation. |
| SSW-B12-2800 | **R1,299.00** | PriceCheck currently aggregates two South African retail offers at R1,299 (Russells and Bradlows): https://www.pricecheck.co.za/offers/258568978/SSW-B12-2800%2B12-INCH%2BBass%2BReflex%2BVented%2BSubwoofer . Max Motorsport also lists R1,299 but marks it sold out: https://maxmotorsport.co.za/products/star-sound-12-svc-single-enclosure . | Market benchmark established; note competing stock evidence is mixed. Supplier dealer price and availability still require confirmation. |
| SSWF12-5150SVC (external listing spelling: SSW-F12-5150SVC) | **R795.00** | Autostyle lists the exact 12-inch flat-series SVC model at R795 and marks it in stock: https://www.autostyle.co.za/product/starsound-ssw-f12-5150svc-12-flat-series-svc-subwoofer/ . Additional checks: BobShop R789 (https://www.bobshop.co.za/starsound-ssw-f12-5150svc-12-flat-series-svc-subwoofer/p/694904757) and Sound Vision R699.99 (https://soundvision.co.za/products/starsound-slim-subwoofer-%F0%9F%94%8A). | Market benchmark established; supplier dealer price and availability still require Audio Connections confirmation. |

**Important pricing boundary:** These are observed third-party consumer retail prices, not Audio Connections dealer costs, not supplier-issued RRPs, and not approved Get Wired selling prices. The retail pages do not consistently state a VAT basis. Keep the source PDF dealer-price fields and supplier RRP fields blank; retain `QUOTE_REQUIRED` / “Price on Request due to Limited Stock and Availability” until the supplier confirms numeric dealer pricing, VAT treatment, and availability. Do not load these benchmark values into customer product prices.

## Remaining Starsound specification reconciliation

The source PDF has seven power strings needing exact interpretation. Available third-party listings provide the following evidence; none is a substitute for a supplier datasheet where the evidence conflicts or the exact source model code differs.

| Source model / label | Source wording | Evidence found | Safe interpretation / status |
|---|---|---|---|
| SSA-R5000.4 | “60 RMS” | New World lists 60 W × 4 RMS at 4 Ω: https://newworld.co.za/collections/all/products/starsound-ssa-r-5000-4-5000w-4-channel-car-amplifier/ . Max Motorsport also lists 60 W × 4: https://maxmotorsport.co.za/products/star-sound-rapter-series-amplifier-5000w-4-channel . My Audio & Security instead lists 65 W × 4 at 4 Ω and 95 W × 4 at 2 Ω: https://myaudioandsecurity.co.za/product/starsound-ssa-r5000-4-4-channel-amplifier/ . | **Conflict: 60 W vs 65 W per channel at 4 Ω.** Retain source wording only; supplier datasheet confirmation required. |
| SSAHORNET-7600.4 | “50 RMS” | My Audio & Security identifies SSA-HORNET-7600.4 and lists 4 × 50 W RMS at 4 Ω, 4 × 70 W RMS at 2 Ω, and 2 × 100 W bridged at 4 Ω: https://myaudioandsecurity.co.za/product/starsound-hornet-7600w-4-channel-amplifier/ . | 50 W × 4 RMS at 4 Ω is corroborated by a model-specific listing; retain as **third-party corroborated**, not supplier-confirmed. |
| SSA-J-10000.4 | “50 RMS” | Carsoundandmore lists SSA-J-10000.4 as 4-channel × 60 W RMS at 4 Ω: https://carsoundandmore.co.za/ . | **Conflict: source says 50 RMS, listing says 60 W × 4.** Hold the numerical RMS specification pending supplier confirmation. |
| SSA-ATOM13800.4 | “100 RMS” | Owner explicitly approved **100 W RMS nominal per channel × 4**. The 13,800 W designation is marketing/maximum power, not RMS. | Owner-approved specification: **100 W RMS × 4 channels**. |
| SSA-M5-80.6 | “80 RMS” | Similar but not identical external model code SSA-M5-80.600 is listed as a 5-channel model with 80 W × 4 + 250 W × 1 RMS at 4 Ω and 140 W × 4 + 410 W × 1 at 2 Ω: https://www.autostyle.co.za/product/starsound-ssa-m5-80-600-5-channel-high-fidelity-class-d-amplifier/ . | **Model-code mismatch (.6 vs .600) and channel-count ambiguity.** Do not copy the 5-channel specification to SSA-M5-80.6 without supplier confirmation. |
| SSA-M4-80.4 | “80 RMS” | Zaybees lists 80 W × 4 RMS at 4 Ω, 140 W × 4 at 2 Ω, and 240 W × 2 bridged at 4 Ω: https://zaybees.co.za/shop/amplifiers/starsound-ssa-m4-80-4-class-d-compact-digital-4ch-amplifier/ . Sounds Limited independently lists the same core ratings: https://soundslimited.co.za/product/star-sound-ssa-m4-80-4-4-channel-high-fidelity-class-d-amplifier/ . | 80 W × 4 RMS at 4 Ω is **third-party corroborated**; supplier confirmation still required before customer publication. |
| SSW-S12" SPECTR 15000 | “700 RMS DVC” | No sufficiently exact manufacturer/model-specific source was established in this review. | Keep “700 RMS DVC” as unverified source text; confirm exact model punctuation, impedance, voice-coil configuration, and RMS rating with Audio Connections. |

## Two owner-authorized direct image candidates

The exact-model direct manufacturer image URLs identified in the Sony candidate manifest are:
- **XS-W104ES** — Sony product image URL: https://www.sony.dk/image/7d561fde81c6826a4cfb1dd3a98811cd?bgc=FFFFFF&bgcolor=FFFFFF&fmt=pjpeg&hei=1320&wid=2515
- **XM-5ES** — Sony Australia store image URL: https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw0ecba8d8/images/XM5ES/XM5ES.png

The owner has explicitly authorized use of the two candidates. Retrieval from the current execution environment failed for both URLs, so the binary files could not be downloaded, decoded, or checked for dimensions/visual match here. Do not mark them downloaded/verified or silently substitute another image. They remain owner-authorized exact-model direct candidates pending successful asset retrieval and visual verification; no public preview asset was changed by this review.

## Outcome and release boundary

- All three missing numeric supplier prices remain honestly blank/quote-required; three market retail benchmarks are now documented separately.
- SSA-ATOM13800.4 is owner-approved at 100 W RMS × 4.
- SSA-R5000.4, SSA-J-10000.4, SSA-M5-80.6 and SSW-S12 specification questions remain unresolved due to conflicting or insufficient exact-model evidence.
- SSAHORNET-7600.4 and SSA-M4-80.4 have third-party corroboration, but supplier confirmation remains the publication gate.
- No supplier price/stock, customer price, SKU, image asset, public product, database row, or production setting was changed. All Audio Connections records remain preview/review-only.
