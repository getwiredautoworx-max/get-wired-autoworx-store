# ASC Vehicle Catalogue × Price Cross-Check Pilot — 2026-10-27

## Result

This is a **staging-only pilot**, not a publish-ready product import. The source catalogue pages were extracted from the two 2026 illustrated ASC vehicle catalogues in the Library and compared by exact code against the June–August Buyer’s Guide audit workbook. The workbook is historical guide evidence, **not the current ASC trade price list** required by the catalogues.

| Measure | Result |
|---|---:|
| ASC vehicle catalogue PDFs checked | 2 |
| Suzuki catalogue | 15 pages |
| Renault & Dacia catalogue | 14 pages |
| Code-like text candidates extracted (includes OE/reference tokens; not all are supplier SKUs) | 406 page occurrences |
| Distinct code-like tokens | 381 |
| Exact token hits in the June–August workbook | 42 occurrences / 42 distinct tokens |
| Exact hits with a plausible-looking workbook cost and no obvious conflicting duplicate in the pilot | 18 occurrences |
| Exact hits with missing/suspicious costs or placeholder OCR descriptions | 5 occurrences |
| Exact hits with cost above R1,000,000 (likely OCR digit concatenation) | 19 occurrences |
| Catalogue code candidates without an exact token in this workbook | 364 occurrences |

Counts above are extraction/pilot counts, not verified unique products. Some catalogue tokens may be OE numbers, cross-references or OCR artifacts rather than ASC supplier SKUs. A no-match result means “not found in this workbook,” not “not available from ASC.”

## Visual inspection

Rendered and inspected the Renault & Dacia catalogue page 4. The printed product codes sit on individual illustrated product cards; examples on that page include CP-RN01, TTK-MB06, TTK-RN01, TTK-RN02 and radiator-bottle/cap entries RB-030 through RT-RBC01. This confirms that source page images are useful for tying each printed code to the correct product picture. A row is **not** marked image-approved by this pilot: the specific card crop still needs to be bound to the extracted code and visually quality-checked before publishing.

## High-priority defects found

The historic guide-audit workbook has obvious price/OCR corruption on exact catalogue-code hits. Examples include:

- Suzuki PWS-SZ01 (power-window switch): workbook cost 5,500,664,400.
- Suzuki SS-BD01 (front brake disc): workbook cost 4,433,994,433.
- Suzuki W10-SZ01 (windshield set): workbook cost 1,177,553,388.
- Renault RT-EM01 (engine mounting): workbook cost 5,577,227,722.
- Renault RK-CA01L / RK-CA01R (control arms): workbook cost 3,388,114,433.
- Renault DHFR-RK01 (door handle): workbook cost 33,778,833.

These are held for OCR/source-page verification. They must not be used for retail calculations or imported. Other exact hits include missing-cost rows whose descriptions are generic June OCR placeholders, e.g. DHFL-SS01, DHIL-SB01 and VR1099. The catalogue code itself may be valid while the guide workbook row remains unverified.

## Matching rules for the next pass

1. Use exact printed ASC supplier code first. Keep OE/aftermarket references as separate fields; do not confuse them with ASC SKU.
2. Read the correct illustrated card to extract its description, make/model/year/engine fitment and picture evidence. Preserve catalogue filename + page.
3. Match against the **current ASC trade price list** by exact code and record list edition/date, page/row, cost and VAT basis. Buyer’s Guide prices are only candidate historical evidence until the applicable current list is confirmed.
4. Where no current price is available, keep the valid fitment as quote-only/review; never invent a price.
5. Quarantine the 19 obvious extreme-cost anomalies and any OCR-placeholder descriptions; never pass them to a live import.
6. Generate a product image crop only when the correct card/code pairing is clear; preserve the untouched original PDF and record the crop filename/page/code.

## Input gap and next action

The current ASC trade price-list file was not located among the inspected Library search results or the tracked `suppliers/ASC/` source set. The catalogue itself states that prices are on the current trade price list. Continue with exact code + fitment + image extraction from the illustrated pages and use the existing guide workbook only as a comparison source. When the current trade list is found in the authorised ASC folder, join it against this candidate ledger and resolve pricing. Do not pause the remaining image/fitment extraction while looking for the price list.

## Safety / release boundary

No live product, price, stock, image URL, database, Axxess, DNS, payment or deployment changes were made. This pilot is not an import file and must not be treated as a verified catalogue. The working storefront remains the rollback baseline.


## Image-card extraction follow-up — same pilot run

- Generated 42 individual card crops for the 42 exact-code occurrences that intersect the historical workbook, from the Suzuki and Renault/Dacia catalogue pages. A contact sheet was visually inspected: the crops retain the printed code, product label and corresponding product photo in the same card for the sampled cards.
- These are **source-evidence crops for internal reconciliation**, not approved live product images. Some linked workbook descriptions/costs are demonstrably wrong, so do not let the crop alone approve a price or product record.
- The current runtime workspace contains the full 406-row CSV candidate ledger, 42-card crop manifest, 42 card PNGs, and a contact-sheet montage. These local artifacts are not committed to GitHub as binary source assets. The tracked pilot report and handover record the verified summary and next actions.
