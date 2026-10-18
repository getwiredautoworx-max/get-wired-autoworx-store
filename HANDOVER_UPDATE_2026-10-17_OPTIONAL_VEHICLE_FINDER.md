# Handover Update — 2026-10-17 — Optional Vehicle Finder

## Change made
- Updated `index-new.html` on branch `fix/optional-vehicle-finder-non-fitment-categories`.
- Changed the vehicle finder heading to **“OPTIONAL: FIND PARTS FOR YOUR VEHICLE”** and clarified that it is for vehicle-specific parts only.
- Added explicit customer-facing copy that vehicle selection is not required to browse/request ordinary products, including tools/workshop tools, camping and leisure goods, consumables, car audio, and vehicle security.
- Preserved the existing vehicle finder and its vehicle-specific search behavior for products where fitment matters.
- No pricing, stock, checkout, payment, Supabase, Axxess, DNS, or production data logic was changed.

## Validation performed
- Source-level exact-string checks passed: the optional heading exists, the requested category list is present, and the existing `#vehicleFinder` section remains.
- No browser rendering or mobile/desktop interaction test has yet been run for this change. Do not describe it as end-to-end tested.
- No deployment, Axxess upload, production write, or Cloudflare/Netlify credit use occurred.

## Release state
- Staging branch only; awaiting PR review and visual/functional QA.
- Do not merge or deploy until desktop/mobile QA passes.
- This change clarifies that the vehicle finder is optional; it does not claim that every product's underlying compatibility data is verified.
