# Operator Runbook — Get Wired AutoWorx

**Public origin:** https://www.getwiredauto.co.za/  
**Primary host:** Axxess shared Linux hosting (DirectAdmin, `public_html`)  
**Release state:** HOLD — do not treat this runbook as approval to launch changes.

## 1. Release gates

A release may proceed only after every applicable gate has evidence recorded in `HANDOVER_CURRENT.md`.

- **Source/build:** exact commit SHA and changed-file inventory recorded; required CI checks pass on the commit being released.
- **Catalogue safety:** no unsafe September SQL; no supplier-cost or supplier-SKU exposure; no unapproved active rows; no zero-priced sale items; quote-only rows stay non-purchasable; formula is `cost_ex_vat × 1.15 × 1.35`, rounded to cents.
- **Supplier evidence:** current price/availability evidence exists for every product whose price is changed or newly published.
- **Images:** exact product/model match is checked and written permission/licence is recorded before supplier catalogue images are published.
- **Taxonomy:** customer-facing roots are limited to the eight approved categories; source category/subcategory remains preserved; uncertain mappings stay held.
- **Storefront:** desktop and mobile smoke tests pass for home, category navigation, search, product detail, cart, checkout validation, Request a Part, and picture-search fallback.
- **Payments:** no payment provider may be described as live until the merchant has approved/verified the production account and a controlled payment test is authorized. PayFast/PayJustNow remain deferred unless the owner changes this instruction.
- **Hosting:** verify Axxess backup, deployed artifact checksum/commit, HTTPS certificate and root/www behavior. Do not alter DNS or SSL while the Axxess response/ownership details are unresolved.
- **Security/privacy:** no credentials in source, logs, screenshots, public responses, or handover. Check access control and ensure customer-facing API responses exclude cost price and internal notes.
- **Owner/supplier approval:** obtain any required business, supplier, image-rights, and payment approval before release.

## 2. Safe release sequence

1. Read this runbook and the latest `HANDOVER_CURRENT.md`; claim one bounded task and avoid repeating successful checks without code/config changes.
2. Work on a branch or staging artifact first. Record the base SHA and intended target. Never experiment directly on the live Axxess `public_html`.
3. Run targeted tests, then relevant CI once. Test with synthetic data only unless live data testing has been explicitly authorized.
4. Review diffs for secrets, supplier fields, accidental deletions, pricing/category changes, and production endpoint changes.
5. Create/verify a timestamped backup of Axxess `public_html` before an approved upload. Keep the known-good archive and deployment notes outside the target directory.
6. Upload only the approved package once; merge/overwrite intentionally. Verify file inventory and checksum where available.
7. Smoke-test HTTPS, root and www redirects, home, mobile navigation, product listing/details, cart and validation. Do not place a real order or change payment configuration without owner approval.
8. Record actual results, exact SHA, URLs, test outputs, rollback artifact and unresolved gates in the central handover. Do not label a failed/untested step complete.

## 3. Rollback

- Stop further uploads and preserve the failed package and logs for diagnosis.
- Restore the immediately preceding known-good Axxess `public_html` backup, not a guessed or partial file set.
- Verify the restored home page, HTTPS, category navigation and checkout UI; do not run a live payment.
- If database writes were part of an explicitly approved release, use the separately documented tested rollback/migration plan. Never reverse a database change by improvising SQL.
- Escalate hosting/DNS/SSL failures to Axxess with timestamp, affected hostname, certificate/error text and relevant ticket; do not expose passwords or API keys.

## 4. Monitoring and escalation

- Check the public site over HTTPS after a release and again after the hosting/CDN cache window; record timestamp and tested paths.
- Review relevant GitHub Actions results and deployment logs for the exact released SHA. A preview success does not prove the Axxess production host changed.
- For Supabase Edge Functions, check function status/version and safe request/error logs. Do not log uploaded image data, keys, full customer details or provider authorization headers.
- Escalate a checkout/security issue immediately: stop the release, preserve evidence, and revert the last known-good artifact. Never ask the owner to paste a private token into chat or GitHub.
- Escalate price, SKU, fitment or image ambiguity to the supplier/owner; hold the item instead of guessing.
- Report owner action only for a genuinely owner-only credential/configuration, supplier confirmation, business decision or payment authorization. Continue all independent tasks meanwhile.

## 5. Current known hold points (verified checkpoint 2026-10-15)

- PR #28 (documentation/schema pack) and dependent PR #31 (strict CSV validator) are open and must be reviewed together; do not merge #31 directly to main.
- The database currently contains 4,198 product rows and 242 category rows. A read-only audit found many catalogue-named root categories, while only a smaller subset of root categories contain products; do not rename or reparent live rows until a reviewed mapping is approved.
- The September 800-row candidate remains import-ineligible; nine rows are quote-only and current supplier pricing/image rights remain unresolved.
- The 38 price-scaling cases still require current supplier evidence.
- AI picture-search Edge Function `part-image-search` is active at version 2, but successful provider authentication and end-to-end matching have not been demonstrated.
- Payment-provider approval and Axxess DNS/SSL confirmation remain external release gates.

## 6. Evidence record template

For each task record: date/time (SAST), task owner, target branch/SHA, exact paths changed, commands/checks and exit result, preview URL if applicable, production impact (must be none until approved), rollback point, remaining blocker and next bounded action.
