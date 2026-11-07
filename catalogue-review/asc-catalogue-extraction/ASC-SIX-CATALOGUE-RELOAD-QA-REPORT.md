# ASC Six-Catalogue Reload Quality Assurance (QA) Report

**Date:** 2026-11-07
**Branch:** `task/asc-six-catalogue-reload-2026-11-07`
**Status:** Verification complete; Review-only package; **DO NOT IMPORT / DO NOT MERGE / DO NOT PUBLISH**.

---

## 1. Executive Summary & Verification Metrics

This QA report details the complete, verified extraction and reconciliation of the six retained ASC product catalogues, strictly adhering to owner directives. All buyer's guides have been permanently excluded and deleted from the repository branch.

| Metric | Target | Actual Result | Status |
|---|---:|---:|:---:|
| Approved Source Catalogues | 6 | 6 | PASS |
| Source Catalogue Pages Processed | 72 | 72 | PASS |
| Total Source-Verified Products | 978 | 978 | PASS |
| Unique ASC Supplier SKUs | 978 | 978 | PASS (100% Unique) |
| Unique Proposed Get Wired SKUs (`GW-ASC-`) | 978 | 978 | PASS (100% Unique) |
| SKU Mapping Collisions | 0 | 0 | PASS |
| Missing Source Document / Page References | 0 | 0 | PASS |
| Owner-Approved Category Mappings Applied | 6 | 6 | PASS (100% Compliant) |
| Price-Rule Gate Compliance ("Price On Request Due to Stock Availability") | 978 | 978 | PASS (100% Compliant) |
| Image Verification Exceptions Identified | 26 | 26 | PASS (Documented) |
| Obsolete Buyer's Guide Ingestion | 0 | 0 | PASS (100% Excluded) |
| Obsolete Buyer's Guide Files in Branch | 0 | 0 | PASS (Deleted) |
| Live Supabase / Production Modifications | 0 | 0 | PASS (Strictly Read-Only) |

---

## 2. Product Count Breakdown by Catalogue

| Catalogue File | Pages | Sections | Extracted Items | Unique Supplier SKUs | Unique GW SKUs | Approved Category Destination |
|---|---:|---:|---:|---:|---:|---|
| `ASC- Aerials (1).pdf` | 7 | 6 | 78 | 78 | 78 | Car Audio > Accessories > Aerials |
| `ASC- Automotive Sensors (1).pdf` | 9 | 11 | 106 | 106 | 106 | Auto Electrical Spares & Parts > Automotive Sensors |
| `ASC- Automotive Switches (1).pdf` | 22 | 16 | 368 | 368 | 368 | Auto Electrical Spares & Parts > Automotive Switches |
| `ASC- Automotive globes (1).pdf` | 11 | 10 | 158 | 158 | 158 | Auto Electrical Spares & Parts > Automotive Globes |
| `ASC- Car Mats (1).pdf` | 11 | 14 | 139 | 139 | 139 | Car Care & Accessories > Car Mats |
| `ASC- Fuel Pumps (1).pdf` | 12 | 18 | 129 | 129 | 129 | Auto Electrical Spares & Parts > Fuel Pumps |
| **Total** | **72** | **75** | **978** | **978** | **978** | **100% Mapped to Approved Hierarchy** |

---

## 3. Row-by-Row Editorial Field Completion Matrix

To ensure full transparency into the status of extracted product data, the table below provides the row-by-row editorial completion status across all 978 records:

| Field Name | Visually Verified from Source | Review-Only / Draft from OCR | Missing / Not Provided in Source | Quarantine / Hold Status |
|---|---:|---:|---:|---|
| **Supplier SKU** | 978 (100%) | 0 (0%) | 0 (0%) | 0 quarantined (100% verified against blue labels) |
| **Proposed GW SKU** | 978 (100%) | 0 (0%) | 0 (0%) | 0 collisions; mapped via `GW-ASC-<supplier_sku>` |
| **Product Heading / Title** | 50 (Pilot cards) | 928 (Batch OCR) | 0 (0%) | 928 batch OCR titles require editorial proofing before production import |
| **Vehicle Fitment** | 42 (Pilot cards) | 0 (0%) | 936 (Pending) | 936 fitment fields quarantined; fitment text exists on cards but requires editorial transcription |
| **Technical Specs / Dimensions** | 0 (None in pilot) | 0 (0%) | 978 (Pending) | 978 technical dimensions/specs quarantined; preserved in original PDFs, pending manual transcription |
| **Pricing Value** | 0 (0%) | 0 (0%) | 978 (100%) | Quarantined; labeled "Price On Request Due to Stock Availability" |
| **Physical Stock Count** | 0 (0%) | 0 (0%) | 978 (100%) | Quarantined; unconfirmed dealer orderability only |
| **Product Photo Image** | 50 (Pilot crops) | 902 (Photo cards) | 26 (Image on Request) | All 952 photos watermarked; quarantined from production storefront publication |

---

## 4. Image Verification & Exception Audit

- **Photo Cards Present:** 952 products (97.3%) have visible photographic crops matching their source cards. All retain original ASC watermarks and are **not cleared for production publication**.
- **Images on Request (No Photo Printed):** 26 products in `ASC- Car Mats (1).pdf` are printed without a product image. No placeholder or artificial images were invented.
- **Production-Stopped Notice:** `M7-HY100` (`ASC- Car Mats (1).pdf`, page 9) carries a printed notice "PRODUCTION STOPPED". Staged with an explicit lock preventing activation.
- **Header vs Printed Count Discrepancy:** In `ASC- Car Mats (1).pdf`, page 10, the Rubber & PVC section heading states 13 items, but only 8 cards are printed in the PDF. Exactly 8 cards were extracted without inventing the 5 unshown items.
- **Clipped Source Captions:** 3 items (`MA648` in Aerials, `S5-16053` and `S5-16087` in Sensors) have clipped text on the printed page; preserved verbatim and flagged for supplier verification.

---

## 5. Deletion of Obsolete Buyer's Guide Files

In accordance with owner instructions, the obsolete buyer's guide audit and OCR files were permanently deleted using `git rm`:
1. `catalogue-audits/JUNE_GUIDE_OCR_CORRECTIONS_2026-10-14.csv` (DELETED)
2. `catalogue-audits/JUNE_SEPTEMBER_JOIN_AUDIT_2026-10-14.md` (DELETED)
3. `staging/SEPTEMBER_QUOTE_PRICE_AND_IMAGE_RECONCILIATION_2026-10-14.md` (DELETED)

A complete record of this action is preserved in `catalogue-audits/ASC_BUYERS_GUIDE_OBSOLETE_CLEANUP_REGISTER.md`.

---

## 6. Deliverables Package Structure

The reload package cleanly separates review artifacts from staged import specifications:

1. **Master Review Dataset:**
   - Path: `catalogue-review/asc-catalogue-extraction/asc-master-sku-register-review-only.csv`
   - Purpose: Complete 978-row crosswalk with full traceability, source document, page, category, price status, and review notes.
2. **Staged Import Specifications (DO NOT IMPORT):**
   - Path: `staging/asc-staged-catalogue-products-do-not-import.csv`
   - Purpose: Reviewable staging file with gate controls (`DO_NOT_IMPORT_WITHOUT_EXPLICIT_OWNER_APPROVAL`).
3. **Image Verification & Exception Report:**
   - Path: `catalogue-review/asc-catalogue-extraction/ASC-IMAGE-VERIFICATION-EXCEPTIONS.md`
4. **Source Verification Status & Inventory:**
   - Path: `catalogue-review/asc-catalogue-extraction/ASC-SOURCE-VERIFICATION-STATUS.md`
5. **Obsolete Buyer's Guide Deletion Register:**
   - Path: `catalogue-audits/ASC_BUYERS_GUIDE_OBSOLETE_CLEANUP_REGISTER.md`
6. **Automated Validation Suite:**
   - Path: `tests/test_asc_reload_validation.py` and `/home/jules/self_created_tools/asc_catalogue_qa.py`

---

## 7. Outstanding Blockers & Next Actions

1. **Owner Approval of Review Datasets:** Owner review and sign-off on the 978-row extraction and category mappings.
2. **Current Dealer Pricing:** ASC supplier pricing is unconfirmed. Products remain labeled "Price On Request Due to Stock Availability". Pricing updates require current ASC dealer cost sheets.
3. **Image Rights Clearance:** The 952 photographic assets are watermarked source-card crops. Clean, unwatermarked high-resolution images or explicit ASC image distribution permissions must be secured before public storefront publishing.
4. **Editorial Proofing of Fitment & Specifications:** Complete row-by-row manual transcription of technical dimensions, specifications, and fitment before admitting beyond review status.
