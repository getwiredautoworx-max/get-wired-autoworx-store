# Get Wired AutoWorx — Supplier / Category Pilot Template

**Use:** Copy this file for each new supplier or major category pilot.  
**Permanent process:** Follow `SUPPLIER_INTEGRATION_STANDARD.md` without changing the approved customer-facing hierarchy.  
**Acceptance rule:** Do not begin the next supplier rollout until the owner accepts the current pilot.

---

## 1. Pilot identity and scope

| Field | Value |
|---|---|
| Supplier / category | `[NAME]` |
| Internal supplier ID | `[ID / NOT CREATED]` |
| Pilot branch / PR | `[BRANCH / PR LINK]` |
| Source snapshot date | `[DATE]` |
| Owner approval / scope | `[EXACT APPROVAL]` |
| Customer-facing root | `[ONE OF THE THREE APPROVED ROOT BUTTONS]` |
| Pilot status | `NOT STARTED / IN PROGRESS / REVIEW / OWNER ACCEPTED` |

### Scope boundary
- Included departments, subcategories and brands:
- Explicitly excluded items:
- Data that remains private:
- Actions not authorised (production, live prices/stock, supplier activation, payment, DNS, hosting uploads):

## 2. Source inventory and provenance

| Source file / catalogue | Type | Date / validity | Pages / sheets | Extracted rows | Missing / unreadable | Usage rights / notes |
|---|---|---|---:|---:|---:|---|
| `[FILE]` | `[PDF/XLSX/CSV/IMAGE]` | `[DATE]` | `[COUNT]` | `[COUNT]` | `[COUNT]` | `[NOTES]` |

**Source reconciliation**
- Original source files preserved: `[YES/NO]`
- Extraction totals reconciled to source pages/sheets: `[YES/NO]`
- Supplier codes and source row references retained internally: `[YES/NO]`
- Dated prices/stock clearly labelled as snapshots: `[YES/NO]`

## 3. Normalised internal offer ledger

One row per supplier offer. Keep source offers separate even when multiple suppliers offer the same customer product.

| Measure | Count / result |
|---|---:|
| Total source offers | `[N]` |
| Exact manufacturer model identified | `[N]` |
| Alias / variant review | `[N]` |
| Duplicate candidates | `[N]` |
| Unresolved identity | `[N]` |
| Quote-only / missing price | `[N]` |
| Missing availability | `[N]` |

Required internal fields:
- supplier and source file/page/sheet/row/date;
- supplier code, manufacturer/OEM model, brand, title and source description;
- component/specification/fitment and evidence URL;
- dealer cost and VAT basis, RRP, price validity and price proposal;
- stock/lead time and timestamp;
- image URL, exact-model match, resolution and usage permission;
- proposed GW SKU, collision result and assignment status;
- approved root, department, subcategory, brand and component group;
- review state and exception reference.

## 4. Product identity, variants and duplicates

| Source code / model | Manufacturer model | Exact match evidence | Variant / fitment notes | Duplicate relationship | Status |
|---|---|---|---|---|---|
| `[CODE]` | `[MODEL]` | `[URL / PAGE / ROW]` | `[NOTES]` | `[NONE / LINK]` | `VERIFIED / REVIEW / HOLD` |

Rules:
- Do not merge similar descriptions or visually similar products without evidence.
- Preserve size, impedance, finish, connector, channel count, vehicle fitment and package quantity.
- Record supplier-versus-manufacturer specification conflicts explicitly; preserve both source values and block final publication until resolved.

## 5. Approved customer navigation and page layout

The homepage has exactly these three startup buttons:
1. **Car Audio / Home Entertainment / Lifestyle**
2. **Auto Electrical Parts & Spares**
3. **Car Care & Accessories**

| Level | Approved label | Source rows | Review |
|---|---|---:|---|
| Root button | `[ONE APPROVED ROOT]` | `[N]` | `[PASS/HOLD]` |
| Department | `[LABEL]` | `[N]` | `[PASS/HOLD]` |
| Subcategory | `[LABEL]` | `[N]` | `[PASS/HOLD]` |
| Brand button / logo | `[BRAND]` | `[N]` | `[PASS/HOLD]` |
| Component group | `[GROUP]` | `[N]` | `[PASS/HOLD]` |

- Same approved homepage shell used on every subpage: `[YES/NO]`
- No supplier name or supplier-only code visible to customers: `[YES/NO]`
- Brand buttons use verified brand artwork or text fallback: `[YES/NO]`
- Product image, description, GW SKU and key details do not overlap: `[YES/NO]`

## 6. GW SKU crosswalk

| Measure | Count |
|---|---:|
| Existing public SKU namespace checked | `[N]` |
| Proposed collision-free GW SKU candidates | `[N]` |
| Held candidates pending exact identity | `[N]` |
| Collisions | `[N]` |
| Public product links created | `[N — MUST REMAIN 0 BEFORE APPROVAL]` |

A collision-free code is not proof of product identity. If identity/variant evidence is incomplete, keep the candidate in a separate held field and leave the assigned/proposed GW SKU blank.

## 7. Images and usage permission

| Model | Exact product / variant | Official source URL | Dimensions | Visual match | Usage permission | Status |
|---|---|---|---:|---|---|---|
| `[MODEL]` | `[VARIANT]` | `[URL]` | `[PX]` | `[YES/NO]` | `[CONFIRMED/PENDING]` | `REVIEW / APPROVED / HOLD` |

- Exact-model image candidates:
- No image available:
- Low-resolution thumbnails rejected:
- Reused/generic images rejected:
- Permission evidence:
- Customer-publication-approved images: `[COUNT]`

A manufacturer page or search result is not itself approval to publish an image. Never create a false product picture.

## 8. Descriptions and specification review

| Model | Source specification | Manufacturer specification | Conflict / missing detail | Resolution evidence | Status |
|---|---|---|---|---|---|
| `[MODEL]` | `[VALUE]` | `[VALUE]` | `[DETAIL]` | `[URL / EMAIL / PAGE]` | `PASS / HOLD` |

- Customer descriptions verified:
- Fitment/compatibility verified:
- Unresolved conflicts:
- Fields deliberately withheld pending confirmation:

## 9. Pricing, VAT, margin and availability

| Model / offer | Price source/date | Dealer cost VAT basis | RRP VAT basis | Proposed customer price | Cost-floor result | Price status |
|---|---|---|---|---:|---|---|
| `[MODEL]` | `[SOURCE/DATE]` | `[INCL/EXCL/UNKNOWN]` | `[INCL/EXCL/UNKNOWN]` | `[PRICE]` | `PASS/FAIL/HOLD` | `REVIEW/QUOTE ONLY/APPROVED` |

- Supplier-specific pricing rule and owner approval:
- VAT conversion and formula:
- Inbound delivery/collection:
- Packaging:
- Payment fees:
- Courier subsidy:
- Discounts:
- Warranty/returns exposure:
- Gross contribution after relevant costs:
- Current availability / lead time evidence:
- Historical stock snapshot date:
- Exact quote-only wording used: **“Price on Request due to Limited Stock and Availability.”**

Never expose dealer cost or margin workings. Never present historic stock as live availability.

## 10. Preview and functional QA

| Check | Desktop | Mobile 360px | Mobile 390px | Result / evidence |
|---|---|---|---|---|
| Shared homepage shell | `[ ]` | `[ ]` | `[ ]` | |
| Root / department / subcategory drill-down | `[ ]` | `[ ]` | `[ ]` | |
| Brand buttons and logos | `[ ]` | `[ ]` | `[ ]` | |
| Component groups / filters | `[ ]` | `[ ]` | `[ ]` | |
| Search / empty states / load more | `[ ]` | `[ ]` | `[ ]` | |
| Exact product images load | `[ ]` | `[ ]` | `[ ]` | |
| Product code / description legibility | `[ ]` | `[ ]` | `[ ]` | |
| No horizontal overflow | `[ ]` | `[ ]` | `[ ]` | |
| No console/page errors | `[ ]` | `[ ]` | `[ ]` | |
| Privacy / noindex / supplier privacy | `[ ]` | `[ ]` | `[ ]` | |

Record the exact commit SHA, staging deployment ID, preview URL, test run IDs and screenshots/evidence. A build in progress or an old preview does not verify the current head.

## 11. Exception register and unresolved work

| ID | Model / area | Issue | Risk | Owner / supplier action | Status |
|---|---|---|---|---|---|
| `[ID]` | `[MODEL]` | `[ISSUE]` | `[RISK]` | `[ACTION]` | `OPEN / RESOLVED` |

## 12. Owner acceptance and release gates

- [ ] Source totals and provenance reconciled.
- [ ] Product identity, variants and duplicates accepted.
- [ ] Category/brand/component hierarchy accepted.
- [ ] GW SKU candidates collision-checked; held identities remain unassigned.
- [ ] Exact images and usage permissions accepted.
- [ ] Descriptions and specifications accepted; conflicts resolved.
- [ ] VAT basis, cost floor, margin and price proposals accepted.
- [ ] Current availability and lead times confirmed.
- [ ] Exact-head tests passed.
- [ ] Exact-head staging preview deployed and verified.
- [ ] Owner reviewed and accepted the customer-facing preview.

**Owner decision:** `NOT REVIEWED / CHANGES REQUIRED / ACCEPTED`  
**Accepted by / date:** `[OWNER / DATE]`  
**Explicit production approval (separate):** `NOT GRANTED / GRANTED WITH SCOPE`

No production merge, live data write, supplier activation, Axxess upload, DNS/payment change or checkout go-live is implied by pilot acceptance.
