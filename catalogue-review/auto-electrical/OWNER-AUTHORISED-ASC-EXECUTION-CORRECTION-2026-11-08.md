# ASC Four-Category Execution Correction — 2026-11-08

**Priority scope:** Automotive Sensors, Automotive Switches, Automotive Globes, Fuel Pumps.
**Source:** The six approved ASC product catalogues only. ASC Buyers Guides remain excluded.
**Status:** Execution correction; review-only; DO NOT IMPORT.

## Owner-authorised supplier data and image handling

The owner has explicitly confirmed that Get Wired AutoWorx is authorised to use the supplier catalogues, confidential supplier data, supplier prices and product pictures contained in those catalogues. Do not report rights/permission as a blocker and do not request renewed proof.

Product-image work is an identity and processing task:
- Match each image to the exact printed supplier part number/SKU, variant and source PDF page.
- Never substitute a similar image, guess a match, or reuse one variant's image for another.
- Preserve the complete product and all physical components/proportions.
- Remove catalogue description text from image pixels only where safely separable.
- Remove the ASC watermark and apply the actual Get Wired AutoWorx logo watermark in a reserved margin; do not stack watermarks.
- Preserve original source PDFs, originals, page references and traceability.
- If one image cannot be matched confidently, quarantine that one item and continue the rest.

## Pricing rule

Use the temporary customer-facing wording exactly:
**Price On Request due to Limited Stock and Availability**

Do not wait for a current dealer price list to prepare the catalogue, and do not publish stale or invented prices/stock. Supplier-direct price and availability integration is a later phase.

## Four-category verified baseline

The 978-row six-catalogue package contains 761 rows in the four priority Auto Electrical categories:
- Automotive Sensors: 106
- Automotive Switches: 368
- Automotive Globes: 158
- Fuel Pumps: 129

The other 217 rows are Aerials (78) and Car Mats (139), outside this four-category priority. Keep them out of the four-category completion denominator.

## Work that is not yet complete

The previous six-catalogue QA report incorrectly labelled the package “Verification complete” while recording 928 OCR-draft titles, 936 fitments pending, 978 technical-specification records pending, and 952 watermarked catalogue photo crops. These are unfinished editorial and image-processing tasks, not completion evidence.

For the four priority categories, the next execution must:
1. Reconcile each of the 761 rows against the original catalogue page and exact printed SKU.
2. Proofread product titles and transcribe every source-printed description, fitment and technical specification; preserve “not stated in source” distinctly from “not yet transcribed”.
3. Extract the exact product image for each SKU from its source page; process the authorised image cleanup and watermark replacement without cropping product components.
4. Maintain per-row source PDF, printed page, SKU, source title, fitment/specification evidence, image match/processing state and review status.
5. Keep uncertain individual rows quarantined while completing all unambiguous rows.
6. Run deterministic validation for category totals, unique identifiers, exact quote wording, image-to-SKU mapping, no invented values, and DO_NOT_IMPORT gates.

## Release boundary

This correction does not authorise imports, merges, production deployment, live Supabase changes, Axxess uploads, price/stock writes or publication. PR #183 remains review-only. No live data or production state may be changed.
