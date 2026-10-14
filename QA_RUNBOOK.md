# Get Wired AutoWorx — Repeatable Store QA Runbook

Date created: 2026-10-14 (South Africa)
Status: TEST PLAN / EVIDENCE TEMPLATE — not a completed test report.

## Guardrails
- Test the currently served site without changing production catalogue, payment settings, DNS, hosting files, or deployment state.
- Use test-only products/orders and never submit a real payment unless the owner explicitly approves and the provider's test/live mode is known.
- Do not report a test as PASS unless the observed result, test date/time, URL/build identity, device/browser, and evidence are recorded.
- A URL-fetch failure from a text retrieval tool is inconclusive; use a real browser/device check.
- PayFast and PayJustNow are temporarily out of scope for checkout acceptance because provider onboarding requires live store URLs. Do not add buttons, fake payment methods, or claim provider readiness. Continue QA with the currently available Direct EFT flow and pickup option; delivery is blocked unless a valid delivery charge is configured and visibly confirmed.

## Per-run evidence header
- Run ID:
- Date/time (Africa/Johannesburg):
- Tester:
- Exact URL:
- Site/build/version evidence:
- Device + OS:
- Browser + version:
- Network (Wi-Fi/mobile):
- Test data/order reference (no secrets):
- Screenshots/video/log paths:
- Overall result: NOT RUN / PASS / FAIL / BLOCKED

## Test matrix
Record each row separately. Allowed results: PASS, FAIL, BLOCKED, NOT RUN.

| ID | Area | Procedure | Acceptance criteria | Result / evidence |
|---|---|---|---|---|
| URL-01 | Canonical URL | Open https://www.getwiredauto.co.za in a real browser | Correct store loads, no browser certificate warning, expected hostname retained | |
| URL-02 | HTTPS | Inspect browser address/certificate and follow internal links | HTTPS valid; no mixed-content or certificate errors observed | |
| BUILD-01 | Version identity | Record page footer/version marker or compare a known approved file/asset with release evidence | Served version can be identified; if not, mark BLOCKED | |
| NAV-D-01 | Desktop navigation | Open every main nav item and footer link | Correct destination; no broken/empty page | |
| NAV-M-01 | Mobile navigation | Repeat at narrow viewport and on a real phone | Menu opens/closes, links work, no clipped controls/sideways overflow | |
| CAT-01 | Category flow | Open each of the eight approved category roots, then a subcategory and product | Correct hierarchy, relevant products, no unexpected blank/error pages | |
| IMG-01 | Product images | Inspect representative products from each category | Image loads, matches product, no obvious supplier overlay/wrong-category image | |
| SEARCH-01 | Search | Search exact known SKU, part of description, and an impossible term | Exact item found; partial search sensible; empty-result state clear | |
| CART-01 | Cart | Add item, change quantity, remove item, refresh | Cart totals/count update correctly and persist as intended | |
| PRICE-01 | Price display | Compare a test product display price with approved staged formula evidence | VAT-inclusive price displayed consistently; no supplier cost exposed | |
| CHECK-01 | Pickup checkout | Select pickup and proceed through validation without placing an unapproved live order | Pickup is free and checkout validation/errors behave correctly | |
| CHECK-02 | Direct EFT | Inspect currently available Direct EFT instructions and order summary | Instructions are accurate; order summary matches cart; no false payment-success claim | |
| CHECK-03 | Delivery | Select delivery only if a valid, confirmed charge is available | Charge is visible before order confirmation; otherwise mark BLOCKED and do not submit | |
| PAY-01 | PayFast | Defer until provider accepts a live URL and account readiness is evidenced | Do not mark PASS during temporary workaround | BLOCKED — provider URL/onboarding dependency |
| PAY-02 | PayJustNow | Defer until provider accepts a live URL and account readiness is evidenced | Do not mark PASS during temporary workaround | BLOCKED — provider URL/onboarding dependency |
| FORM-01 | Part request/contact | Submit only safe test data if form endpoint is available | Clear success/failure feedback; no sensitive data in logs | |
| ERR-01 | Console/network | Inspect browser console and failed network requests during key flows | No unexplained critical errors; record each failure | |
| REG-01 | Regression | Repeat search/cart/pickup after navigation tests | No regression or stale totals | |

## Run completion rule
- Any critical failure in URL/HTTPS, navigation, catalogue, search, cart, checkout summary, or order validation blocks live-test readiness.
- Provider rows PAY-01/PAY-02 remain separately blocked during the temporary workaround and must not be represented as passed.
- Record a summary with pass/fail/blocked/not-run counts, link evidence, create a defect list with reproducible steps, and rerun failed rows after a fix.
- Keep production unchanged during QA. Any release requires owner approval and one coordinated Axxess-first final sync.
