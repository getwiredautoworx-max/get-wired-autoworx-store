# Obsolete ASC Buyer's Guide Deletion & Cleanup Register

**Date:** 2026-11-07
**Authority:** Mandatory Owner's Directive & PR Review Instruction
**Status:** DELETIONS COMPLETED ON BRANCH `task/asc-six-catalogue-reload-2026-11-07`

---

## 1. Safety Boundary & Retained Source Verification
The six approved ASC catalogue PDFs in `suppliers/ASC/` remain byte-for-byte unchanged:
1. `suppliers/ASC/ASC- Aerials (1).pdf` (SHA-256: `c7349ff1273a52c7de40bc0aaccc1ea79e7ad13fb53eed8a5918ecedd9b5de7b`)
2. `suppliers/ASC/ASC- Automotive Sensors (1).pdf` (SHA-256: `18f9aac7aa5f66c7d7a2a3bad5c7f7a630d2ccb311e281766cf51bd14328a4ba`)
3. `suppliers/ASC/ASC- Automotive Switches (1).pdf` (SHA-256: `86f2c828d3e097804fe63ec2017747a00cc24c47a6aee80401cc1b78cf513c3a`)
4. `suppliers/ASC/ASC- Automotive globes (1).pdf` (SHA-256: `cb15dad045a08199d869c37b70c65e19680a4d43489c5fb40efe06138201e299`)
5. `suppliers/ASC/ASC- Car Mats (1).pdf` (SHA-256: `8d11d55c1fac72c51c54a20407f1d3063c7ef92c2c16716913d3ce21a1119d55`)
6. `suppliers/ASC/ASC- Fuel Pumps (1).pdf` (SHA-256: `2436d8c13837ca277daa4ee00f0725f320bbb2ddbddc9e442a3e8183f5427437`)

Zero unrelated supplier files (Planetworld, Caelex, Electrocity, Audio Connections) were modified or deleted.

---

## 2. Deleted Obsolete Buyer's Guide Files

Per the explicit owner instruction, all obsolete buyer's guide audit and reconciliation files in the repository have been deleted:

1. `catalogue-audits/JUNE_GUIDE_OCR_CORRECTIONS_2026-10-14.csv`
   - **Action:** Deleted via `git rm`.
   - **Justification:** Obsolete June 2026 buyer's guide OCR corrections; permanently excluded.
2. `catalogue-audits/JUNE_SEPTEMBER_JOIN_AUDIT_2026-10-14.md`
   - **Action:** Deleted via `git rm`.
   - **Justification:** Obsolete cross-audit joining June and September buyer's guides.
3. `staging/SEPTEMBER_QUOTE_PRICE_AND_IMAGE_RECONCILIATION_2026-10-14.md`
   - **Action:** Deleted via `git rm`.
   - **Justification:** Obsolete historical September price scaling; permanently superseded by Owner Directive 2026-11-05.

---

## 3. Current Reload Stream Integrity
- **Total Buyer's Guide Items in Extraction:** 0 (100% excluded).
- **Source Traceability:** All 978 extracted items in the master register derive exclusively from the 6 approved product catalogue PDFs.
