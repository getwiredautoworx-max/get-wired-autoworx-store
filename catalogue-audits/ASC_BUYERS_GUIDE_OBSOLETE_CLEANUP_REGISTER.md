# Obsolete ASC Buyer's Guide Cleanup Register

**Date:** 2026-11-07
**Authority:** Mandatory Owner's Directive (AI_HANDOVER_OWNER_DIRECTIVES_2026-11-05.md & Task Specification).
**Scope:** Identification of legacy, obsolete ASC Buyer's Guide files, scripts, and OCR extracts for the separately authorised cleanup process.
**Strict Safety Rule:** DO NOT DELETE UNRELATED FILES. Only delete upon explicit separate owner authorisation. The 6 approved product catalogue PDFs in `suppliers/ASC/` must be retained and protected.

---

## 1. Approved Retained ASC Product Catalogues (DO NOT DELETE)
The following 6 product catalogue PDFs in `suppliers/ASC/` are the ONLY authorized source files for this reload:
1. `suppliers/ASC/ASC- Aerials (1).pdf` (SHA-256: `c7349ff1273a52c7de40bc0aaccc1ea79e7ad13fb53eed8a5918ecedd9b5de7b`, 7 pages)
2. `suppliers/ASC/ASC- Automotive Sensors (1).pdf` (SHA-256: `18f9aac7aa5f66c7d7a2a3bad5c7f7a630d2ccb311e281766cf51bd14328a4ba`, 9 pages)
3. `suppliers/ASC/ASC- Automotive Switches (1).pdf` (SHA-256: `86f2c828d3e097804fe63ec2017747a00cc24c47a6aee80401cc1b78cf513c3a`, 22 pages)
4. `suppliers/ASC/ASC- Automotive globes (1).pdf` (SHA-256: `cb15dad045a08199d869c37b70c65e19680a4d43489c5fb40efe06138201e299`, 11 pages)
5. `suppliers/ASC/ASC- Car Mats (1).pdf` (SHA-256: `8d11d55c1fac72c51c54a20407f1d3063c7ef92c2c16716913d3ce21a1119d55`, 11 pages)
6. `suppliers/ASC/ASC- Fuel Pumps (1).pdf` (SHA-256: `2436d8c13837ca277daa4ee00f0725f320bbb2ddbddc9e442a3e8183f5427437`, 12 pages)

---

## 2. Identified Obsolete ASC Buyer's Guide Artifacts (Flagged for Authorized Cleanup)

The following historical buyer's guide audit files and OCR documents from earlier runs (e.g., June/September 2026 Buyer's Guides) remain in the repository or history and are excluded from the catalogue reload:

1. `catalogue-audits/JUNE_GUIDE_OCR_CORRECTIONS_2026-10-14.csv`
   - **Nature:** Historical OCR corrections for the June 2026 ASC Buyer's Guide.
   - **Status:** Obsolete. Excluded from reload. Flagged for removal during authorized cleanup.
2. `catalogue-audits/JUNE_SEPTEMBER_JOIN_AUDIT_2026-10-14.md`
   - **Nature:** Cross-audit joining June and September ASC Buyer's Guides.
   - **Status:** Obsolete. Excluded from reload. Flagged for removal during authorized cleanup.
3. `staging/SEPTEMBER_QUOTE_PRICE_AND_IMAGE_RECONCILIATION_2026-10-14.md`
   - **Nature:** Price and image reconciliation based on historical September price scaling.
   - **Status:** Obsolete per Owner Directive 2026-11-05 (historical September price-scaling findings are not authority for current prices). Flagged for cleanup.

### Historical Commits Where Buyer's Guides Were Previously Removed
- Commit `693a05a` (Store reload: remove excluded buyer's guide)
- Commit `fb0173e` (Store reload: remove excluded buyer's guide source/extract)

---

## 3. Exclusion Enforcement in Current Extraction Stream
- Zero buyer's guide product records exist in the 978 extracted review-only rows.
- 100% of the extracted records trace exclusively to the 6 retained PDF catalogues.
