# MASTER PROJECT HANDOVER

Updated: 2026-09-28 SAST

## PURPOSE
Single routing file for all ongoing projects. At the start of a new chat: read this file, show the project list, let the user choose one, continue from its saved state, then update this file at meaningful milestones. Never restart completed work because the chat changed.

## PROJECT MENU

1. P01 — Get Wired AutoWorx Online Store
2. P02 — Get Wired AutoWorx Owner/Admin APK
3. P03 — Full Catalogue Manual QA
4. P04 — Category Hierarchy Workbook
5. P05 — Custom Android OS / GW Tablet
6. P06 — Pet Project #1 — To Be Named
7. P07 — Pet Project #2 — To Be Named

User can choose by ID/name or say: continue last project.

## SESSION RULE
One project is active for each work block/session. Load that project's detailed handover, identify the highest-priority unfinished task, execute without repeating completed work, and only stop for genuine owner-controlled actions. Before switching projects, record completed work, current state, next action, ETA/targets, blockers, owner actions and evidence.

## GLOBAL RULES
- Do not restart completed work.
- Critical path first.
- Parallelise independent work only when safe.
- Read-only verification before mutation.
- Use existing source; no replacement/demo projects.
- Never claim completion without the required real build/test/verification.
- No real customer orders during testing unless explicitly authorised.
- No Cloudflare paid credits.
- No Netlify credits.
- Never expose secrets.
- Never guess SKU/product/image/category mappings.
- Keep detailed technical information in project-specific handovers.

## P01 — ONLINE STORE
Goal: professional, fast, mobile-first Get Wired AutoWorx ecommerce store.

Source: getwiredautoworx-max/get-wired-autoworx-store, main branch.
Detailed handover: HANDOVER.md.
Current verified state: 4,187 active products; 4,187 unique active priced SKUs; 27,745 active units; 0 uncategorized; 0 zero-stock active products; 791 product-specific images; 3,396 branded placeholders; 0 pricing mismatches; 0 orders; delivery R15; pickup R0.
Pricing: cost × 1.15 × 1.35.
Current critical path: Owner APK execution, final store regression, owner payment verification, authorised public Cloudflare testing, then manual catalogue QA.
Do not redo completed Supabase, catalogue import, checkout correction, image cleanup or security work.

## P02 — OWNER/ADMIN APK
Goal: genuine owner-controlled Android app.
Source: android-owner-app.
Package: za.co.getwiredautoworx.owner.
Version: 1.0.1 / versionCode 2.
compileSdk/targetSdk 35; minSdk 23; AGP 8.7.3; Gradle 8.10.2.
Required validation: build, install, Owner Login, Store, Checkout, WebView, navigation, file chooser and admin/store controls.
Current blocker: recent GitHub Actions jobs terminate before workflow steps; Replit Agent previously timed out. This is an execution-environment blocker, not evidence of source failure.
Do not call v1.0.1 ready until an actual build/install/emulator validation succeeds.
Historical v0.3.1 passed earlier but is not the current APK.

## P03 — CATALOGUE MANUAL QA
Goal: verify every active product for SKU, product identity, description, category and image.
Status: final task; must not block technical store/APK readiness.
Rules: never guess; only correct verified mismatches; re-run integrity checks after corrections.

## P04 — CATEGORY HIERARCHY WORKBOOK
Goal: editable Excel workbook of the live category hierarchy.
Structure: INDEX, category tabs, subcategory tabs, nested levels, editable cells, filters and frozen headers.
Preserve live hierarchy; do not silently merge duplicate category names.
Previous generation attempt hit a tool rate limit.
Next action: regenerate and provide verified downloadable workbook. If email is requested, verify an email connector and recipient first.

## P05 — CUSTOM ANDROID OS / GW TABLET
Goal: investigate an AOSP/Android-based custom OS for a new 8-inch tablet, retaining Android app compatibility and Google/Play/WhatsApp/Chrome access where technically and legally possible, with GW functionality integrated.
Stage: concept/planning.
Before implementation: select hardware, verify bootloader/unlock, chipset/BSP, kernel/device tree/vendor support, GMS compatibility and rollback strategy.
Next action: define requirements and select suitable hardware.

## P06 — PET PROJECT #1
To be named. When created, record goal, targets, success definition, status, completed work, current task, next actions, ETA, blockers, owner actions, resources, decisions, no-repeat rules, testing and cost restrictions.

## P07 — PET PROJECT #2
Same structure as P06.

## STATUS TEMPLATE
Status:
Goal:
Completed:
Current task:
Next action:
ETA:
Targets:
Blockers:
Owner action required:
Evidence/files/commits:
Do not redo:
Last updated:

## PRIORITIES
P0 Critical
P1 Important
P2 Enhancement/supporting
P3 Final polish/manual QA

## ARCHIVING
Completed projects keep their ID and history and move to Completed Projects. Paused projects record why and exactly where to resume.

## COMPLETED PROJECTS
None recorded yet.

## CONTINUATION INSTRUCTION
New chat: read this file first, show the project menu, let the user choose, continue from that project's saved state, and update this file after meaningful milestones.
