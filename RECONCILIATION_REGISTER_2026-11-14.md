# Repository Reconciliation Register — 2026-11-14

## Canonical baseline
- Repository: `getwiredautoworx-max/get-wired-autoworx-store`
- Canonical branch: `main`
- Main SHA at inventory start: `06ab71bdcdf6ff3fc8ae999f59764d11c6a64d9b`
- Branches: **271** (all pages retrieved)
- Open PRs: **46** (GitHub search; includes draft PR #202 and older docs PR #28)
- Closed PRs inventoried: **151** (latest 100 plus older date-scoped records; same head may appear in multiple PRs)

## Open PR disposition
| PR | Head | Commits | Base | Disposition |
|---:|---|---:|---|---|
| #202 | `integration/audio-forza-preview-reconciliation-2026-11-14` | 22 | `main` | CLEAN SELECTIVE AUDIO INTEGRATION — four exact Audison Forza models; all five non-production QA checks passed on head `b25da1a`; draft, merge approval pending |
| #28 | `feature/docs-schema-pack` | 30 | `main` | DOCS/SCHEMA REFERENCE ONLY — 30 ahead / 1,910 behind; 22 files, not current storefront code; no wholesale merge |
| #189 | `reconcile/store-operating-system-2026-11-08` | 52 | `main` | BLOCKED: 52 commits, 329 behind, non-mergeable; no wholesale merge |
| #188 | `fix/background-controller-queue-v2-2026-11-08` | 1 | `main` | REDUNDANT: current main controller already handles schema-v2 success_criteria |
| #187 | `fix/controller-queue-schema-compat-2026-11-08` | 6 | `main` | STALE: 6 commits, 330 behind; optional QA guards only if still missing |
| #185 | `jules-1666866561690889762-5c5cb625` | 13 | `main` | REVIEW ONLY: 29 Electrocity products, no import/publication |
| #184 | `apk/owner-app-security-artifact-2026-11-07` | 10 | `main` | SEPARATE APP: APK security; exact CI + Android install acceptance pending |
| #183 | `task/asc-six-catalogue-reload-2026-11-07-6092093046839064304` | 33 | `main` | REVIEW ONLY: 978 ASC products, no publication |
| #181 | `docs/electrocity-jules-catalogue-workflow-2026-11-07` | 7 | `main` | SUPERSEDED DOCS: obsolete converters source vs approved ignition pilot |
| #178 | `integration/owner-preview-single-task-2026-11-05` | 1001 | `main` | STALE STOREFRONT: 1,001 commits / 147 files, no wholesale merge |
| #177 | `integration/asc-auto-electrical-clean-2026-11-05` | 141 | `preview/integrated-storefront-2026-11-04` | STALE BASE: 141 commits / 123 files, based on another preview |
| #176 | `preview/integrated-storefront-2026-11-04` | 249 | `main` | OBSOLETE ROOT MODEL: old root labels, 249 commits / 50 files |
| #175 | `integration/recovery-mainline-storefront-2026-11-04` | 9 | `main` | SELECTIVE ONLY: 9 files, 375 behind |
| #174 | `review/audio-connections-hornet-image-spec-2026-11-04` | 1 | `repair/pr-168-storefront-category-audio-2026-11-04` | REVIEW ONLY: Starsound Hornet image/spec conflict on hold |
| #173 | `work/asc-product-register-2026-11-04` | 10 | `main` | SUPERSEDED: 983-row ASC count conflicts with current 978 |
| #170 | `supplier-standard-planetworld-audio-connections-2026-11-03` | 237 | `integration/three-category-catalogue-preview-final-2026-11-03` | STALE: 237 commits on old preview base |
| #168 | `integration/three-category-catalogue-preview-final-2026-11-03` | 613 | `main` | STALE: 613 commits / 123 files, reference only |
| #167 | `integration/clean-three-category-catalogue-preview-2026-11-03` | 4 | `main` | STALE: 4 commits, 468 behind |
| #165 | `integration/asc-catalogue-hierarchy-2026-11-03` | 46 | `main` | STALE: 46 commits / 72 files, 483 behind |
| #164 | `maintenance/repository-cleanup-2026-11-03` | 6 | `main` | DUPLICATE CLEANUP: superseded by #150 |
| #163 | `fix/restore-approved-storefront-brighter-background-2026-11-03` | 58 | `main` | OBSOLETE/RISKY: legacy eight roots and supplier price/source files |
| #162 | `integration/current-storefront-plus-asc-preview-2026-11-02` | 14 | `main` | OBSOLETE: legacy eight-category storefront |
| #161 | `fix/bright-storefront-current-main-2026-11-02` | 7 | `main` | OBSOLETE: legacy eight-category storefront |
| #158 | `review/asc-contents-page-register-2026-11-02` | 10 | `main` | SUPERSEDED: older ASC taxonomy, replaced by #183 |
| #157 | `fix/bright-functional-storefront-2026-11-02` | 18 | `main` | OBSOLETE: legacy eight-category storefront |
| #156 | `staging/audio-connections-sony-mobile-es-sept-2026-2026-11-02` | 3 | `main` | REVIEW ONLY: Sony Mobile ES price evidence, no public price/stock |
| #155 | `fix/part-image-search-durable-abuse-controls-2026-11-02` | 23 | `main` | SECURITY CANDIDATE: 521 behind; exact-head review/tests required |
| #154 | `fix/background-controller-safe-monitor-2026-11-02` | 4 | `main` | STALE: controller safety branch 523 behind |
| #152 | `fix/category-snapshot-config-2026-11-02` | 6 | `main` | STALE QA FIX: 532 behind; confirm current defect first |
| #151 | `integration/asc-source-taxonomy-review-2026-11-02` | 29 | `main` | SUPERSEDED: 50-row ASC pilot, replaced by #183 |
| #150 | `maintenance/repository-cleanup-2026-11-02` | 2 | `main` | DUPLICATE CLEANUP: older duplicate of #164 |
| #149 | `integration/clean-main-asc-audio-2026-11-01` | 106 | `main` | STALE MONOLITH: 106 commits / 207 files |
| #143 | `safety/current-main-production-retry-guard-2026-11-01` | 4 | `main` | SAFETY VERIFY: current controller excludes production QA from retries |
| #137 | `fix/courier-collection-origin-privacy-1030` | 4 | `main` | SATISFIED IN MAIN: courier collection uses server-side COURIER_COLLECTION_* secrets |
| #82 | `feature/owner-pwa-alternative` | 7 | `main` | SEPARATE OWNER PWA: Android install/admin auth acceptance pending |
| #81 | `fix/cloud-based-owner-apk` | 57 | `main` | SEPARATE OWNER APK: package-size/install acceptance pending |
| #72 | `fix/pr70-storefront-owner-feedback-2026-10-20` | 164 | `recovery/approved-preview-index-new` | OBSOLETE LINEAGE: 164 commits based on recovery branch |
| #67 | `feature/owner-catalogue-management-2026-10-20` | 29 | `main` | SEPARATE ADMIN FEATURE: privileged live mutations require security/release approval |
| #65 | `audit/asc-stock-cleanup-2026-10-20` | 18 | `main` | REVIEW ONLY: read-only ASC stock/discontinuation audit |
| #53 | `review/catalogue-data-contract-reconciled` | 7 | `feature/docs-schema-pack` | OBSOLETE CONTRACT: old eight-root assumptions |
| #51 | `review/asc-discontinued-audit-fix` | 80 | `qa/desktop-mobile-screenshots-2026-10-15` | REVIEW ONLY/STALE: ASC discontinuation evidence, no live change |
| #49 | `audit/asc-catalogue-cleanup` | 82 | `qa/desktop-mobile-screenshots-2026-10-15` | DO NOT MERGE: contains obsolete ASC Buyers Guides, excluded by owner |
| #48 | `audit/asc-discontinued-stock-cleanup-2026-10-17` | 10 | `main` | REVIEW ONLY: ASC cleanup requires fresh exact-SKU and owner approval |
| #32 | `fix/approved-eight-category-roots` | 8 | `main` | OBSOLETE: eight-category roots conflict with current three-root model |
| #31 | `fix/catalogue-validator-strict-csv` | 3 | `feature/docs-schema-pack` | STALE SCHEMA BRANCH: targets feature/docs-schema-pack, not main |
| #3 | `apk-sales-intelligence-v03` | 15 | `main` | SEPARATE SALES APK: not part of storefront integration |

## Branch-to-PR mapping
- PR #202 is the sole new active integration candidate: four Audison Forza preview records, exact manufacturer images/specs, source-data sanitisation and test corrections. Draft PR; all five non-production checks passed on head `b25da1a864bdff7a28b05027e5609e2886d46699`; no deployment.
- Distinct branch heads mapped: **189** ({"OPEN":46,"MERGED":56,"CLOSED_UNMERGED":87}).
- Branches with no PR-head match in the enumerated set: **81**. These are unassociated, not automatically safe to delete; inspect commit history before cleanup.

| Branch | Mapping | PR |
|---|---|---:|
| `admin-portal-workflow` | MERGED | #2 |
| `ai-free-phase1-catalogue-search-2026-10-22` | CLOSED_UNMERGED | #84 |
| `apk/owner-app-security-artifact-2026-11-07` | OPEN | #184 |
| `apk-sales-intelligence` | UNASSOCIATED | — |
| `apk-sales-intelligence-v03` | OPEN | #3 |
| `approved-storefront-baseline-2026-10-20` | UNASSOCIATED | — |
| `approved-storefront-preview-trigger` | UNASSOCIATED | — |
| `asc-auto-electrical-v2-2026-11-05` | UNASSOCIATED | — |
| `asc-auto-electrical-v2` | UNASSOCIATED | — |
| `asc-image-treatment-pilot-2026-11-09` | UNASSOCIATED | — |
| `audit/asc-catalogue-cleanup` | OPEN | #49 |
| `audit/asc-discontinued-stock-cleanup-2026-10-17` | OPEN | #48 |
| `audit/asc-stock-cleanup-2026-10-20` | OPEN | #65 |
| `audit/buyer-guide-extraction` | UNASSOCIATED | — |
| `audit/june-ocr-corrections-pages-5-32-2026-10-14` | MERGED | #23 |
| `audit/june-september-price-join-2026-10-14` | MERGED | #26 |
| `audit/planetworld-current-main-2026-10-26` | UNASSOCIATED | — |
| `audit/planetworld-current-main-2026-10-29` | UNASSOCIATED | — |
| `audit/price-quote-continuation-2026-10-23` | UNASSOCIATED | — |
| `automation/background-task-controller` | MERGED | #12 |
| `automation/bounded-safe-retries` | MERGED | #14 |
| `automation/catalogue-extraction-checkpoints` | UNASSOCIATED | — |
| `automation/dependency-aware-runner` | CLOSED_UNMERGED | #15 |
| `automation/live-release-gates-2026-10-14` | MERGED | #18 |
| `automation/responsive-background-monitoring` | MERGED | #13 |
| `automation/24x7-store-workers-2026-11-08` | MERGED | #186 |
| `backup/store-before-banner-category-images-2026-10-20` | UNASSOCIATED | — |
| `backup/store-before-banner-copy-font-2026-10-20` | UNASSOCIATED | — |
| `backup-2026-09-15-before-image-cleanup` | UNASSOCIATED | — |
| `backup-2026-09-15-before-product-details` | UNASSOCIATED | — |
| `catalog-import-2026-09-16` | UNASSOCIATED | — |
| `catalogue/audio-connections-car-audio-preview-2026-10-30` | UNASSOCIATED | — |
| `catalogue/complete-remaining-2026-10-30` | UNASSOCIATED | — |
| `catalogue/complete-remaining-review-2026-10-30` | CLOSED_UNMERGED | #111 |
| `catalogue/ingest-review-2026-10-30` | UNASSOCIATED | — |
| `catalogue/planetworld-exact-manufacturer-images-2026-10-30` | MERGED | #129 |
| `catalogue/supplier-crosswalk-component-and-authorisation-reconcile-2026-10-30` | MERGED | #128 |
| `chore/handover-safety-checkpoint-2026-10-14` | MERGED | #16 |
| `chore/release-qa-recheck-2026-10-14` | MERGED | #17 |
| `ci/checkout-security-validation-2026-10-23` | CLOSED_UNMERGED | #90 |
| `ci/live-gate-trigger-tuning-2026-10-14` | MERGED | #22 |
| `ci/owner-preview-exact-sha-2026-11-05` | MERGED | #179 |
| `ci/owner-preview-workflow-assertion-2026-11-05` | MERGED | #180 |
| `ci/verify-axxess-package-2026-10-17` | CLOSED_UNMERGED | #46 |
| `cleanup/asc-catalogues-stock-reset-2026-10-30` | MERGED | #118 |
| `continuation/planetworld-supplier-folders-2026-10-26` | UNASSOCIATED | — |
| `design/brighter-brand-category-images-2026-10-20` | MERGED | #70 |
| `design/exact-category-mockup-2026-10-15` | CLOSED_UNMERGED | #44 |
| `design/reference-mobile-store-format` | UNASSOCIATED | — |
| `dev/checkout-delivery-hardening` | UNASSOCIATED | — |
| `docs/continuation-handover-20261026` | UNASSOCIATED | — |
| `docs/continuation-results-2026-10-23` | UNASSOCIATED | — |
| `docs/electrocity-jules-catalogue-workflow-2026-11-07` | OPEN | #181 |
| `docs/electrocity-jules-workflow-pilot-2026-11-07` | UNASSOCIATED | — |
| `docs/live-gate-rerun-after-path-fix-2026-10-14` | MERGED | #21 |
| `docs/live-source-hash-gate-pass-2026-10-14` | MERGED | #25 |
| `docs/monitor-handover-2026-10-16` | CLOSED_UNMERGED | #45 |
| `docs/monitor-handover-2026-10-17-checkpoint` | UNASSOCIATED | — |
| `docs/monitor-handover-2026-10-17-monitor` | UNASSOCIATED | — |
| `docs/monitor-run-2026-10-17-1553` | UNASSOCIATED | — |
| `docs/payment-gateway-readiness-requirements-2026-10-14` | MERGED | #27 |
| `docs/planetworld-blocker-handover-2026-10-26` | CLOSED_UNMERGED | #95 |
| `draft/private-returns-appointment-pickup-2026-10-29` | CLOSED_UNMERGED | #108 |
| `feat/button-only-storefront-reset-2026-10-29` | MERGED | #109 |
| `feat/planetworld-audio-navigation-current-main-2026-10-27` | MERGED | #98 |
| `feat/terms-gate-browse-account-required-checkout` | CLOSED_UNMERGED | #86 |
| `feature/direct-eft-bank-instructions-whatsapp-order-handoff-2026-10-30` | CLOSED_UNMERGED | #121 |
| `feature/direct-eft-bank-instructions-whatsapp-order-handoff-v2` | MERGED | #127 |
| `feature/docs-schema-pack` | OPEN | #28 |
| `feature/free-catalogue-search-populated-preview-2026-10-30` | CLOSED_UNMERGED | #126 |
| `feature/free-no-ai-part-search-preview-safe-2026-10-30` | CLOSED_UNMERGED | #131 |
| `feature/nonproduction-populated-store-preview-deploy` | MERGED | #123 |
| `feature/owner-catalogue-management-2026-10-20` | OPEN | #67 |
| `feature/owner-pwa-alternative` | OPEN | #82 |
| `feature/planetworld-parallel-store-2026-10-25` | UNASSOCIATED | — |
| `feature/storefront-compact-redesign-2026-10-15` | CLOSED_UNMERGED | #34 |
| `feature/terms-gate-phase1` | CLOSED_UNMERGED | #89 |
| `finaltest/category-live-preview-2026-10-20` | UNASSOCIATED | — |
| `fix/approved-bright-shell-category-product-ux-2026-11-01-v2` | UNASSOCIATED | — |
| `fix/approved-bright-shell-category-product-ux-2026-11-01-v3` | CLOSED_UNMERGED | #145 |
| `fix/approved-bright-shell-category-product-ux-2026-11-01` | CLOSED_UNMERGED | #148 |
| `fix/approved-eight-category-roots` | OPEN | #32 |
| `fix/axxess-package-completeness` | CLOSED_UNMERGED | #37 |
| `fix/axxess-package-current-main` | MERGED | #38 |
| `fix/background-controller-queue-v2-2026-11-08` | OPEN | #188 |
| `fix/background-controller-safe-monitor-2026-11-02` | OPEN | #154 |
| `fix/bright-functional-storefront-2026-11-02` | OPEN | #157 |
| `fix/bright-storefront-current-main-2026-11-02` | OPEN | #161 |
| `fix/catalogue-navigation-images-review-2026-11-01` | MERGED | #147 |
| `fix/catalogue-validator-strict-csv` | OPEN | #31 |
| `fix/category-product-image-rendering-2026-10-18` | CLOSED_UNMERGED | #57 |
| `fix/category-snapshot-config-2026-11-02` | OPEN | #152 |
| `fix/checkout-policy-links-2026-10-20` | CLOSED_UNMERGED | #66 |
| `fix/checkout-terms-privacy-gates-2026-10-29` | CLOSED_UNMERGED | #105 |
| `fix/cloud-based-owner-apk` | OPEN | #81 |
| `fix/controller-queue-schema-compat-2026-11-08` | OPEN | #187 |
| `fix/courier-collection-origin-privacy-1030` | OPEN | #137 |
| `fix/current-main-price-gate-2026-10-13` | MERGED | #10 |
| `fix/delivery-policy-2026-10-09` | CLOSED_UNMERGED | #5 |
| `fix/document-workers-build-vs-pages` | UNASSOCIATED | — |
| `fix/early-part-actions-ready-2026-10-22` | MERGED | #78 |
| `fix/expo-eas-owner-apk-2026-10-22` | CLOSED_UNMERGED | #79 |
| `fix/gemini-api-key-normalization-2026-11-12` | MERGED | #201 |
| `fix/gemini-free-image-search-fallback-2026-10-23` | CLOSED_UNMERGED | #91 |
| `fix/gemini-key-source-and-validation-2026-11-12` | MERGED | #196 |
| `fix/homepage-category-grid-3-column` | CLOSED_UNMERGED | #41 |
| `fix/iframe-aware-readonly-smoke-2026-10-28` | MERGED | #100 |
| `fix/live-category-tree-2026-10-20` | CLOSED_UNMERGED | #68 |
| `fix/live-category-tree-preserve-approved-layout-2026-10-20` | UNASSOCIATED | — |
| `fix/live-deployed-source-hash-gate-2026-10-14` | MERGED | #24 |
| `fix/live-gate-route-artifact-names-2026-10-14` | MERGED | #20 |
| `fix/live-part-search-global-handler-2026-10-22` | CLOSED_UNMERGED | #80 |
| `fix/live-release-gate-homepage-path-2026-10-14` | MERGED | #19 |
| `fix/main-preview-catalogue-gate-2026-11-02` | CLOSED_UNMERGED | #160 |
| `fix/main-price-gate-checkout-2026-10-13` | CLOSED_UNMERGED | #9 |
| `fix/main-price-gate-checkout-final-2026-10-13` | UNASSOCIATED | — |
| `fix/mainline-part-search-global-compat-2026-10-22` | CLOSED_UNMERGED | #83 |
| `fix/mobile-audio-subcategory-grid-2026-11-04` | MERGED | #172 |
| `fix/mobile-category-overflow-validation-2026-10-13` | UNASSOCIATED | — |
| `fix/mobile-layout-2026-10-18` | UNASSOCIATED | — |
| `fix/mobile-storefront-2026-10-18` | CLOSED_UNMERGED | #58 |
| `fix/mobile-storefront-layout-2026-10-19-v2` | CLOSED_UNMERGED | #60 |
| `fix/mobile-storefront-layout-2026-10-19-v3` | CLOSED_UNMERGED | #61 |
| `fix/mobile-storefront-layout-2026-10-19` | CLOSED_UNMERGED | #59 |
| `fix/no-cost-part-picture-request-2026-10-29` | CLOSED_UNMERGED | #107 |
| `fix/optional-vehicle-finder-non-fitment-categories` | CLOSED_UNMERGED | #47 |
| `fix/owner-preview-population-and-full-height-images-2026-11-09` | MERGED | #192 |
| `fix/part-image-search-durable-abuse-controls-2026-11-02` | OPEN | #155 |
| `fix/part-image-search-durable-limit` | CLOSED_UNMERGED | #33 |
| `fix/part-image-search-quota-errors` | CLOSED_UNMERGED | #85 |
| `fix/part-search-current-main-reconciliation-2026-10-27` | CLOSED_UNMERGED | #96 |
| `fix/part-search-global-handlers-2026-10-22` | MERGED | #77 |
| `fix/part-search-load-race-smoke-qa-2026-10-23` | CLOSED_UNMERGED | #94 |
| `fix/part-search-no-ai-fallback-2026-10-26` | UNASSOCIATED | — |
| `fix/pr70-category-image-parity-2026-10-20` | CLOSED_UNMERGED | #71 |
| `fix/pr70-storefront-owner-feedback-2026-10-20` | OPEN | #72 |
| `fix/pr72-photo-relevance-qa-2026-10-23` | UNASSOCIATED | — |
| `fix/preview-approved-catalogue-gate-2026-11-02` | CLOSED_UNMERGED | #159 |
| `fix/preview-catalogue-fail-closed-2026-11-02` | UNASSOCIATED | — |
| `fix/preview-robots-meta-2026-10-30` | CLOSED_UNMERGED | #138 |
| `fix/price-gate-consistency-2026-10-13` | MERGED | #7 |
| `fix/product-detail-api-key-2026-10-20` | UNASSOCIATED | — |
| `fix/public-sku-audit-docs-scope-2026-10-15` | CLOSED_UNMERGED | #35 |
| `fix/quarantine-image-audit-smoke-samples` | MERGED | #124 |
| `fix/read-only-smoke-iframe-content-2026-10-23` | CLOSED_UNMERGED | #93 |
| `fix/restore-approved-storefront-brighter-background-2026-11-03` | OPEN | #163 |
| `fix/restore-owner-approved-working-storefront-2026-10-20` | MERGED | #63 |
| `fix/server-bound-delivery-quote-2026-10-29` | CLOSED_UNMERGED | #104 |
| `fix/server-enforced-customer-login-2026-10-29-v2` | CLOSED_UNMERGED | #106 |
| `fix/server-enforced-customer-login-2026-10-29` | UNASSOCIATED | — |
| `fix/show-empty-subcategories-after-catalogue-reset-2026-11-03` | CLOSED_UNMERGED | #169 |
| `fix/storefront-polish-mainline-2026-10-30` | CLOSED_UNMERGED | #135 |
| `fix/storefront-product-cards-hide-supplier-identity-2026-10-30` | UNASSOCIATED | — |
| `fix/supabase-checkout-deployment-2026-11-02` | MERGED | #153 |
| `fix/task-monitor-step-summary-no-artifacts-2026-10-28` | MERGED | #101 |
| `gw-store-preview-1030` | CLOSED_UNMERGED | #136 |
| `handover/asc-crawl-status-2026-10-17` | CLOSED_UNMERGED | #50 |
| `handover/checkpoint-2026-10-15-1538` | UNASSOCIATED | — |
| `handover/pr72-monitor-2026-10-23` | UNASSOCIATED | — |
| `handover/2026-10-23-consent-login-gate` | CLOSED_UNMERGED | #88 |
| `image-fallback-fix` | UNASSOCIATED | — |
| `integration/asc-978-review-only-2026-11-12` | MERGED | #199 |
| `integration/asc-auto-electrical-clean-2026-11-05-v2` | UNASSOCIATED | — |
| `integration/asc-auto-electrical-clean-2026-11-05` | OPEN | #177 |
| `integration/asc-catalogue-hierarchy-2026-11-03` | OPEN | #165 |
| `integration/asc-preview-population-2026-11-12` | CLOSED_UNMERGED | #197 |
| `integration/asc-preview-population-mainline-2026-11-12` | CLOSED_UNMERGED | #198 |
| `integration/asc-source-taxonomy-review-2026-11-02` | OPEN | #151 |
| `integration/audio-video-enrichment-current-main-2026-11-13` | UNASSOCIATED — safe subset selectively ported to PR #202; do not merge wholesale | #202 (source only) |
| `integration/catalogue-supplier-routing-current-main-2026-10-30` | MERGED | #115 |
| `integration/clean-main-asc-audio-2026-11-01` | OPEN | #149 |
| `integration/clean-main-planetworld-partsearch-2026-10-31` | UNASSOCIATED | — |
| `integration/clean-three-category-catalogue-preview-2026-11-03` | OPEN | #167 |
| `integration/consolidation-repair-2026-11-11` | CLOSED_UNMERGED | #194 |
| `integration/current-main-refresh-2026-11-01` | CLOSED_UNMERGED | #142 |
| `integration/current-storefront-plus-asc-preview-2026-11-02` | OPEN | #162 |
| `integration/free-catalogue-search-mainline-2026-10-30` | CLOSED_UNMERGED | #132 |
| `integration/gemini-cli-worker-2026-11-12` | MERGED | #195 |
| `integration/gemini-worker-clean-main-2026-11-12` | MERGED | #200 |
| `integration/latest-consolidated-2026-10-30` | UNASSOCIATED | — |
| `integration/latest-consolidated-review-2026-10-30` | UNASSOCIATED | — |
| `integration/new-three-category-catalogue-preview-2026-11-03` | CLOSED_UNMERGED | #166 |
| `integration/owner-preview-single-task-2026-11-05` | OPEN | #178 |
| `integration/planetworld-audio-catalogues-2026-11-03` | UNASSOCIATED | — |
| `integration/planetworld-partsearch-clean-main-2026-10-31` | CLOSED_UNMERGED | #139 |
| `integration/planetworld-partsearch-clean-main-2026-11-01` | CLOSED_UNMERGED | #140 |
| `integration/planetworld-preview-clean-main-2026-10-30` | CLOSED_UNMERGED | #120 |
| `integration/planetworld-preview-clean-main-r2-2026-10-30` | MERGED | #122 |
| `integration/planetworld-preview-current-main-r3-2026-10-30` | CLOSED_UNMERGED | #130 |
| `integration/planetworld-provisional-catalogue-preview-2026-10-30` | CLOSED_UNMERGED | #119 |
| `integration/populated-preview-reconciled-2026-10-30` | CLOSED_UNMERGED | #117 |
| `integration/pr96-pr97-troubleshooting-2026-10-28` | CLOSED_UNMERGED | #99 |
| `integration/preview-search-security-mainline-2026-10-30-r2` | CLOSED_UNMERGED | #134 |
| `integration/recovery-mainline-storefront-2026-11-04` | OPEN | #175 |
| `integration/storefront-current-main-2026-11-09` | MERGED | #190 |
| `integration/three-category-catalogue-preview-final-2026-11-03` | OPEN | #168 |
| `integration/three-supplier-catalogue-rebuild-2026-11-03` | UNASSOCIATED | — |
| `jules-1666866561690889762-5c5cb625` | OPEN | #185 |
| `layout/category-grid-mobile-polish-2026-10-20` | CLOSED_UNMERGED | #69 |
| `main` | UNASSOCIATED | — |
| `maintenance/repository-cleanup-2026-11-02` | OPEN | #150 |
| `maintenance/repository-cleanup-2026-11-03` | OPEN | #164 |
| `monitor/2026-10-18-task-start-1513` | UNASSOCIATED | — |
| `monitoring/checkpoint-2026-10-14-1443-sast` | UNASSOCIATED | — |
| `monitoring/2026-10-15-0727-sast` | UNASSOCIATED | — |
| `monitoring/2026-10-15-store-checkpoint` | UNASSOCIATED | — |
| `ops/actions-artifact-cleanup-2026-10-28` | UNASSOCIATED | — |
| `order-management` | UNASSOCIATED | — |
| `owner/alpine-planetworld-six-products-2026-11-10` | UNASSOCIATED | — |
| `planetworld/nonzero-items-review-2026-10-26` | UNASSOCIATED | — |
| `preview/integrated-storefront-2026-11-04` | OPEN | #176 |
| `preview/populated-store-after-asc-stock-removal-2026-10-30` | CLOSED_UNMERGED | #116 |
| `preview-recovery/pr74-storefront-review-2026-10-22` | CLOSED_UNMERGED | #75 |
| `product-details-update` | MERGED | #1 |
| `promote/checkout-policy-links-mainline-2026-10-21` | MERGED | #74 |
| `promote/pr72-approved-storefront-2026-10-21` | MERGED | #73 |
| `qa/axxess-package-trigger-2026-10-15` | CLOSED_UNMERGED | #40 |
| `qa/category-root-fix-2026-10-14` | UNASSOCIATED | — |
| `qa/desktop-mobile-screenshots-2026-10-15` | CLOSED_UNMERGED | #36 |
| `qa/live-category-navigation-isolated-2026-10-20` | UNASSOCIATED | — |
| `qa/mobile-buybar-fix-verify-2026-10-15` | CLOSED_UNMERGED | #43 |
| `qa/storefront-audit-2026-10-22` | MERGED | #76 |
| `qa/visual-package-verification-2026-10-15` | CLOSED_UNMERGED | #42 |
| `reconcile/repo-file-inventory-planetworld-2026-10-29` | CLOSED_UNMERGED | #110 |
| `reconcile/repo-inventory-planetworld-current-main-2026-10-30` | CLOSED_UNMERGED | #114 |
| `reconcile/store-operating-system-2026-11-08` | OPEN | #189 |
| `recovery/approved-preview-index-new` | CLOSED_UNMERGED | #64 |
| `recovery/store-2056-checkpoint` | CLOSED_UNMERGED | #62 |
| `release/formula-verified-checkout-2026-10-13` | UNASSOCIATED | — |
| `release/staging-secure-checkout-2026-10-26` | UNASSOCIATED | — |
| `release/verified-price-checkout-2026-10-13` | MERGED | #8 |
| `repair/pr-168-storefront-category-audio-2026-11-04` | MERGED | #171 |
| `review/asc-contents-page-register-2026-11-02` | OPEN | #158 |
| `review/asc-discontinued-audit-fix` | OPEN | #51 |
| `review/audio-connections-hornet-image-spec-2026-11-04` | OPEN | #174 |
| `review/catalogue-data-contract-reconciled` | OPEN | #53 |
| `review/staging-ui-verification-fixes` | CLOSED_UNMERGED | #52 |
| `review/staging-ui-verification-fixes-current` | CLOSED_UNMERGED | #56 |
| `run10-handover-2026-10-20` | UNASSOCIATED | — |
| `safety/current-main-production-retry-guard-2026-11-01` | OPEN | #143 |
| `safety/remove-production-qa-auto-retry-2026-11-01` | CLOSED_UNMERGED | #141 |
| `security/checkout-auth-terms-consent-2026-10-23` | CLOSED_UNMERGED | #87 |
| `security/checkout-policy-audit-verified-2026-10-30` | MERGED | #113 |
| `security/combined-checkout-policy-2026-10-30` | CLOSED_UNMERGED | #112 |
| `security/remove-hardcoded-courier-origin-2026-10-30` | CLOSED_UNMERGED | #133 |
| `staging/asc-50-product-sku-proposal-2026-11-04` | UNASSOCIATED | — |
| `staging/audio-connections-sony-mobile-es-sept-2026-2026-11-02` | OPEN | #156 |
| `staging/store-wide-price-on-request-2026-11-04` | UNASSOCIATED | — |
| `supplier-standard-planetworld-audio-connections-2026-11-03` | OPEN | #170 |
| `task/asc-aerials-accessories-2026-11-05` | UNASSOCIATED | — |
| `task/asc-six-catalogue-reload-2026-11-07-6092093046839064304` | OPEN | #183 |
| `task/2026-10-23-priority-continuation` | UNASSOCIATED | — |
| `task/2026-10-24-reconciliation-continuation` | UNASSOCIATED | — |
| `task/2026-10-24-reconciliation-run-2` | UNASSOCIATED | — |
| `task/2026-10-25-nonpayment-blockers` | UNASSOCIATED | — |
| `task/2026-10-25-reconciliation-run-3` | UNASSOCIATED | — |
| `task/2026-10-25-remove-payjustnow-readiness` | UNASSOCIATED | — |
| `task/2026-10-27-planetworld-monitor` | UNASSOCIATED | — |
| `test/pr68-isolated-playwright-2026-10-20` | UNASSOCIATED | — |
| `test/staging-category-navigation-browser-2026-10-13` | CLOSED_UNMERGED | #11 |
| `validation/checkout-handler-current-head-20261023` | CLOSED_UNMERGED | #92 |
| `validation-visible-run` | CLOSED_UNMERGED | #4 |
| `work/alpine-official-spec-enrichment-2026-11-10` | MERGED | #193 |
| `work/approved-storefront-continuation-2026-10-20` | UNASSOCIATED | — |
| `work/asc-image-pilot-2026-11-09` | CLOSED_UNMERGED | #191 |
| `work/asc-pilot-runner-base-2026-11-09` | UNASSOCIATED | — |
| `work/asc-product-register-2026-11-04` | OPEN | #173 |
| `work/audio-one-nav-current-main-2026-11-11` | UNASSOCIATED | — |
| `work/audio-one-nav-enrichment-2026-11-09` | UNASSOCIATED | — |
| `work/hertz-catalogue-audit-2026-10-25` | UNASSOCIATED | — |
| `integration/audio-forza-preview-reconciliation-2026-11-14` | OPEN | #202 |

## Consolidation rules
- `main` is the only source of truth; branches/PRs are evidence containers, not separate projects.
- No wholesale merges from stale storefront branches. Selective recovery requires current-main comparison, tests and explicit owner merge approval.
- No supplier names/internal supplier SKUs in customer content; no ASC Buyers Guides; all product prices remain Price On Request; unverified records stay REVIEW ONLY / DO NOT IMPORT.
- Production hold remains: no production deploy, Axxess upload, live catalogue/price/stock writes, DNS/payment changes or paid hosting spend.

## Next execution order
1. Branch triage is complete: all 81 branches without an open/closed PR-head match are classified in the appendix. No branch was deleted.
2. PR #202 is the sole active integration candidate; all five exact-head non-production checks passed. Await explicit owner approval to merge; do not merge the source branch wholesale.
3. After PR #202 is approved and merged, continue one workstream: verified OneNav product enrichment. Keep unverified images and source records review-only.


## LIVE INVENTORY DELTA — 2026-11-14 10:15 SAST

- Latest repository commit observed: `d7ab539e0ad95b3cb1122577f26edf4bb6c47a1a` on `main`.
- Live branch pagination is now **271** (100 + 100 + 71), versus 270 in the original snapshot.
- Live open-PR search is now **46**, versus 44 in the original snapshot. The missing records are #202 (new clean-main Audison Forza preview candidate) and #28 (legacy docs/schema PR). #28's `feature/docs-schema-pack` branch is 30 ahead / 1,905 behind main and is stale; do not merge.
- #202 branch `integration/audio-forza-preview-reconciliation-2026-11-14` is 22 ahead / 0 behind main, with nine changed files limited to preview enrichment, sanitisation/build logic, reconciliation evidence and tests. Keep draft; exact-head QA and later owner review required.
- The previous 187 mapped branch heads remain recorded. Current raw unmatched list is 84; #202 is now mapped to its new branch. The legacy #28 branch association and remaining unassociated set require commit-level confirmation; use **82** as the working unassociated audit count, not a deletion list.
- Current-main route audit: `preview-planetworld.html` is a redirect to unified audio; current tests assert the redirect. Cloudflare Pages QA explicitly excludes that legacy route and supplier-source/review folders from both standard and non-production package outputs. This does not remove public GitHub history, and live customer-domain delivery was not independently fetched in this session.
- Cloudflare Pages production workflow is manual-dispatch only. Cloudflare Workers Builds remains an unresolved external integration; no configuration change or deployment was made.
- Main commit status lookup returned no status records; latest known Live Release Gates failure remains run `43565351484`. No current exact-main hosted QA success is established.
- No merge, branch deletion, history rewrite, deployment, Axxess upload, live data write, DNS/payment change or paid hosting spend occurred.


## CURRENT INVENTORY CORRECTION — 2026-11-14
- Current main at the start of this correction: `0fe6905347a961888f0944d1a962b2e883a49541`.
- GitHub Search returns **46 open PRs**. The recent-PR listing returns 45 because it omits older PR #28; #28 was separately confirmed open. It is 30 commits ahead / 1,910 behind main and is a documentation/schema pack only.
- Current totals: **271 branches**, **46 open PRs**, **151 closed PR records inventoried**, **189 branch heads mapped to PRs**, and **81 branches without an open/closed PR-head match** (main is excluded from the 81 count).
- #202 remains the sole active code-integration candidate. Its branch is based on main SHA `d7ab539e0ad95b3cb1122577f26edf4bb6c47a1a`; current main has advanced only through coordination/handover documentation commits. GitHub REST reports mergeable=true; no code conflicts reported. Keep it draft pending owner approval.

## Unassociated branch triage — all 81 branches accounted for
No branch was deleted, closed or merged as part of this audit. The categories below are dispositions, not permission to delete.

### KEEP OR PRESERVE (6)
- `approved-storefront-baseline-2026-10-20`
- `approved-storefront-preview-trigger`
- `backup/store-before-banner-category-images-2026-10-20`
- `backup/store-before-banner-copy-font-2026-10-20`
- `backup-2026-09-15-before-image-cleanup`
- `backup-2026-09-15-before-product-details`

### SEPARATE APP (2)
- `apk-sales-intelligence`
- `order-management`

### REVIEW ONLY OR PROHIBITED (22)
- `asc-image-treatment-pilot-2026-11-09`
- `audit/buyer-guide-extraction`
- `audit/planetworld-current-main-2026-10-26`
- `audit/planetworld-current-main-2026-10-29`
- `audit/price-quote-continuation-2026-10-23`
- `catalog-import-2026-09-16`
- `catalogue/audio-connections-car-audio-preview-2026-10-30`
- `catalogue/complete-remaining-2026-10-30`
- `catalogue/ingest-review-2026-10-30`
- `continuation/planetworld-supplier-folders-2026-10-26`
- `docs/electrocity-jules-workflow-pilot-2026-11-07`
- `integration/audio-video-enrichment-current-main-2026-11-13`
- `integration/latest-consolidated-review-2026-10-30`
- `integration/planetworld-audio-catalogues-2026-11-03`
- `integration/three-supplier-catalogue-rebuild-2026-11-03`
- `owner/alpine-planetworld-six-products-2026-11-10`
- `planetworld/nonzero-items-review-2026-10-26`
- `staging/asc-50-product-sku-proposal-2026-11-04`
- `work/asc-pilot-runner-base-2026-11-09`
- `work/audio-one-nav-current-main-2026-11-11`
- `work/audio-one-nav-enrichment-2026-11-09`
- `work/hertz-catalogue-audit-2026-10-25`

### NO NEW CHANGE OR ALREADY SATISFIED (3)
- `automation/catalogue-extraction-checkpoints`
- `fix/document-workers-build-vs-pages`
- `fix/server-enforced-customer-login-2026-10-29`

### OLD TASK QA HANDOVER (23)
- `docs/continuation-handover-20261026`
- `docs/continuation-results-2026-10-23`
- `docs/monitor-handover-2026-10-17-checkpoint`
- `docs/monitor-handover-2026-10-17-monitor`
- `docs/monitor-run-2026-10-17-1553`
- `handover/checkpoint-2026-10-15-1538`
- `handover/pr72-monitor-2026-10-23`
- `monitor/2026-10-18-task-start-1513`
- `monitoring/checkpoint-2026-10-14-1443-sast`
- `monitoring/2026-10-15-0727-sast`
- `monitoring/2026-10-15-store-checkpoint`
- `qa/category-root-fix-2026-10-14`
- `qa/live-category-navigation-isolated-2026-10-20`
- `run10-handover-2026-10-20`
- `task/asc-aerials-accessories-2026-11-05`
- `task/2026-10-23-priority-continuation`
- `task/2026-10-24-reconciliation-continuation`
- `task/2026-10-24-reconciliation-run-2`
- `task/2026-10-25-nonpayment-blockers`
- `task/2026-10-25-reconciliation-run-3`
- `task/2026-10-25-remove-payjustnow-readiness`
- `task/2026-10-27-planetworld-monitor`
- `test/pr68-isolated-playwright-2026-10-20`

### STALE CODE OR REFERENCE (26)
- `asc-auto-electrical-v2-2026-11-05`
- `asc-auto-electrical-v2`
- `design/reference-mobile-store-format`
- `dev/checkout-delivery-hardening`
- `feature/docs-schema-pack`
- `feature/planetworld-parallel-store-2026-10-25`
- `finaltest/category-live-preview-2026-10-20`
- `fix/approved-bright-shell-category-product-ux-2026-11-01-v2`
- `fix/live-category-tree-preserve-approved-layout-2026-10-20`
- `fix/main-price-gate-checkout-final-2026-10-13`
- `fix/mobile-category-overflow-validation-2026-10-13`
- `fix/mobile-layout-2026-10-18`
- `fix/part-search-no-ai-fallback-2026-10-26`
- `fix/pr72-photo-relevance-qa-2026-10-23`
- `fix/preview-catalogue-fail-closed-2026-11-02`
- `fix/product-detail-api-key-2026-10-20`
- `fix/storefront-product-cards-hide-supplier-identity-2026-10-30`
- `image-fallback-fix`
- `integration/asc-auto-electrical-clean-2026-11-05-v2`
- `integration/clean-main-planetworld-partsearch-2026-10-31`
- `integration/latest-consolidated-2026-10-30`
- `ops/actions-artifact-cleanup-2026-10-28`
- `release/formula-verified-checkout-2026-10-13`
- `release/staging-secure-checkout-2026-10-26`
- `staging/store-wide-price-on-request-2026-11-04`
- `work/approved-storefront-continuation-2026-10-20`

### Specific cross-checks
- `task/asc-aerials-accessories-2026-11-05` is superseded: current main category tree already contains Aerials under Car Audio / Accessories.
- `asc-image-treatment-pilot-2026-11-09` contains 50 treated sample images and a contact sheet; retain as review-only until the sample is accepted, never auto-import.
- `owner/alpine-planetworld-six-products-2026-11-10` contains six Alpine records with unverified numeric source prices and incomplete product descriptions/specifications; keep Price On Request and DO NOT IMPORT.
- `work/audio-one-nav-current-main-2026-11-11` contains useful OneNav source audits, but its override withholds an image that current main already carries under the owner's reseller-image authorisation; do not wholesale merge this stale branch.
- `integration/audio-video-enrichment-current-main-2026-11-13` is a source branch only; its safe Forza subset was selectively ported to PR #202.
- `fix/product-detail-api-key-2026-10-20` is not a security fix: the branch still uses the same public Supabase publishable key as main; it is 1 commit / 1,561 behind.
- `fix/server-enforced-customer-login-2026-10-29` has zero commits ahead and is fully behind main.
- `fix/document-workers-build-vs-pages` contains only a handover change, not a Pages/Workers code correction.
- `approved-storefront-preview-trigger` is retained because it is a workflow trigger; backup branches are preserved.
- `audit/buyer-guide-extraction` is prohibited by the owner’s ASC Buyers Guide exclusion.
- `feature/docs-schema-pack` is no longer unassociated: it is open PR #28, 30 commits ahead / 1,910 behind, docs/schema reference only.


## TRIAGE COMPLETE — 2026-11-14
- All **81** branches without an open/closed PR-head match have a recorded disposition in the triage appendix. No branch was deleted, closed or merged.
- PR #202 is the only active code-integration candidate. It is draft, GitHub reports mergeable=true, and all five exact-head non-production QA checks passed. Await explicit owner merge approval.
- The next task after PR #202 is OneNav exact-model enrichment from the review evidence, not a new parallel workstream.
- Main SHA at this checkpoint: `e5791fbf1308916a4a2041a4307ac1943604617f`.


## RECONCILIATION EXECUTION — MAIN ANCESTRY RESTORED — 2026-11-14
- The prior draft PR #204 was reported 6 commits behind `main`. I inspected Git trees against merge base `e5791fbf1308916a4a2041a4307ac1943604617f`: main had changes in four paths; three documentation/control files differed, while the audio official-model manifest had identical content on both sides.
- Created a two-parent merge commit `9d52679694981c73f28a08ad2b19603f9fa218b6` with parents `b9a1d9808c4dc6ec22dda39ed62b241b2638dacc` (integration candidate) and `df823638d0a9f06dce939bee1b636307058f1583` (main). Its tree uses current main as base and overlays the 47 candidate-only changed files. The three overlapping documentation/control files retain main's version for now; the shared audio manifest is identical. Branch update used expected-head protection and succeeded.
- Verified compare after update: integration branch is **15 commits ahead / 0 behind main**; 47 candidate code/catalogue/test files remain in the diff. PR #204 follows the branch head automatically. GitHub's PR snapshot still reports `mergeable=false` immediately after ancestry restoration; allow status recalculation and recheck before taking further action. Do not force merge.
- Candidate content remains non-production: Audison preview work and 29 Electrocity ignition pilot records; no ASC Buyers Guides. Customer-facing supplier names/internal SKUs remain hidden; all supplier product prices remain Price On Request; product records remain review-only / DO NOT IMPORT.
- Exact-head CI has not yet been established. No tests, preview checks or production release are claimed as passed. Next: recheck PR mergeability, reconcile owner checkpoint notes into the branch without replacing main's current directives, inspect public-data exposure, and run all available non-production checks.


## ASC REVIEW WORKSTREAM CONSOLIDATED — 2026-11-14
- Selectively integrated the ASC work from PR #173 into the single integration branch at `050876850a79f8c02c4dde156c2caaef9b6e9869`: six review-only register/evidence files and two extraction scripts. The old PR's standalone handover and workflow changes were intentionally excluded to avoid reintroducing stale instructions/parallel QA configuration.
- Closed PR #173 as superseded by PR #204; its branch remains as historical evidence. All further ASC work is to continue through the single consolidation PR.
- Scope remains the six ASC catalogues only; no Buyers Guides. Counts recorded by the ASC review docs: 978 product cards (78 Aerials, 106 Sensors, 368 Switches, 158 Globes, 139 Car Mats, 129 Fuel Pumps); 50 manually reviewed pilot descriptions; 42 printed fitments verified; 928 remaining descriptions are OCR drafts; 63 OCR false-positive tokens quarantined. The 978-row full extraction output is not represented as a finished customer catalogue; records remain REVIEW ONLY / DO NOT IMPORT.
- Source-card images remain raw catalogue crops/watermarked and require the approved image-treatment and exact-product visual QA before customer publication. Owner-authorised image use does not mean image treatment or product verification is complete. ASC exact price wording remains `Price On Request due to Limited Stock and Availability`; no numeric prices or stock values exist.
- Current PR #204 head at time of consolidation: `050876850a79f8c02c4dde156c2caaef9b6e9869`; comparison with main: 21 commits ahead / 0 behind; GitHub reports mergeable=true. Exact-head QA must be checked again after these ASC files were added.
- No live import, Supabase write, Axxess upload, production deployment or paid hosting spend.
