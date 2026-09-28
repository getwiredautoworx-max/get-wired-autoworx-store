# MASTER PROJECT HANDOVER

Updated: 2026-09-28 SAST

## PURPOSE

Persistent routing/index file for the user's projects.

The purpose of this file is to prevent a new ChatGPT conversation from requiring the user to reteach project history. It is the index only; detailed technical/project information stays in each project's own handover.

At the start of a new chat:
1. Read this file.
2. Show the current project menu.
3. Let the user choose a project.
4. Load that project's detailed handover.
5. Continue from the highest-priority unfinished task.
6. Do not restart completed work.
7. At meaningful milestones, update the selected project's detailed handover and this master index.

## PERMANENT PROJECT SEPARATION RULE

### GET WIRED AUTOWORX
Get Wired AutoWorx is ONE independent project/entity.

Its existing technical work, database, storefront, APK, catalogue QA, category workbook and deployment history remain under the Get Wired project and its detailed `HANDOVER.md`.

Those items are NOT separate user projects in the master menu.

### PET PROJECTS
Pet Projects are separate, independent projects that the user creates.

A Pet Project must never be merged into Get Wired AutoWorx merely because it may use similar technology, branding, hardware or ideas.

Each Pet Project receives its own detailed handover file when created.

Only the user can decide that a Pet Project is related to, merged with, or incorporated into Get Wired.

## PROJECT MENU

### 1. GET WIRED AUTOWORX
Status: ACTIVE

Detailed handover: `HANDOVER.md`

Current critical path:
- Owner APK build/install/emulator validation
- technical store readiness
- owner-controlled payment verification
- authorised public Cloudflare testing
- final manual catalogue QA

Supporting work inside this project:
- Online storefront
- Owner/Admin APK
- Catalogue manual QA
- Category hierarchy workbook
- Hosting/deployment
- Supabase/database/backend
- security and checkout
- image/catalogue QA

Do not treat these supporting workstreams as separate top-level projects.

### 2. PET PROJECT 01
Status: NOT CREATED

When the user creates it, create:
`PET_PROJECT_01_HANDOVER.md`

### 3. PET PROJECT 02
Status: NOT CREATED

When the user creates it, create:
`PET_PROJECT_02_HANDOVER.md`

### 4. PET PROJECT 03
Status: NOT CREATED

When the user creates it, create:
`PET_PROJECT_03_HANDOVER.md`

### 5. CREATE NEW PET PROJECT
When the user introduces a new independent project:
- assign the next Pet Project number
- create its detailed handover
- add it to this master menu
- keep it completely separate from Get Wired unless the user explicitly requests otherwise

## SESSION RULE

One project is active for each work block/session.

For the selected project:
1. Load the detailed handover.
2. Identify the highest-priority unfinished task.
3. Execute without repeating completed work.
4. Test and verify where required.
5. Stop only for a genuine owner-controlled action or an actual technical blocker.
6. Record the result in the detailed handover.
7. Update this master index at meaningful milestones.

If the user says "continue" without naming a project, continue the currently active project in the current conversation. In a new conversation, use this master file to establish the project menu and ask the user to select the project if no project is clearly identified.

## GLOBAL RULES

- Do not restart completed work.
- Critical path first.
- Parallelise independent work only when safe.
- Read-only verification before mutation.
- Use existing source; do not create replacement/demo projects.
- Never claim completion without the required real build/test/verification.
- No real customer orders during testing unless explicitly authorised.
- No Cloudflare paid credits.
- No Netlify credits.
- Never expose secrets.
- Never guess SKU/product/image/category mappings.
- Keep detailed technical information in project-specific handovers.
- Do not allow a Pet Project to alter Get Wired production assets without explicit user instruction.
- Preserve evidence, commits, validation results and known blockers.
- When a project is paused, record exactly where to resume.
- When a project is completed, retain its history and move it to Completed Projects.

## GET WIRED CURRENT SNAPSHOT

Repository:
`getwiredautoworx-max/get-wired-autoworx-store`

Branch:
`main`

Detailed handover:
`HANDOVER.md`

Current verified store state:
- 4,187 active products
- 4,187 unique active priced SKUs
- 27,745 active units
- 0 uncategorized
- 0 active products at zero stock
- 791 product-specific images
- 3,396 branded placeholders
- 0 pricing mismatches
- 0 orders
- delivery R15
- pickup R0

Pricing:
`cost × 1.15 × 1.35`

Current Get Wired APK:
- package: `za.co.getwiredautoworx.owner`
- version: 1.0.1 / versionCode 2
- compileSdk/targetSdk 35
- minSdk 23
- AGP 8.7.3
- Gradle 8.10.2

Current APK rule:
Do not call the current APK ready until an actual build, installation and emulator validation succeeds.

Get Wired restrictions:
- no Cloudflare paid credits
- no Netlify credits
- no real customer orders during testing
- public Cloudflare testing remains owner-authorised
- payment/bank details require owner verification
- manual verification of the 4,000+ catalogue remains a final task and must not block technical readiness

## PET PROJECT HANDOVER STANDARD

Every Pet Project detailed handover must contain:

- Project name
- Purpose
- Big-picture goal
- Specific targets
- Definition of success
- Current status
- Completed work
- Current task
- Next actions
- Priority order
- ETA
- Milestones
- Blockers
- Owner actions
- Technical decisions
- Files/resources
- What NOT to redo
- Testing/validation results
- Costs/credit restrictions
- Last updated date/time
- Exact continuation instructions

Recommended execution loop:

**Plan → Build → Test → Fix → Verify → Record → Continue**

Priority levels:
- P0 Critical
- P1 Important
- P2 Enhancement/supporting
- P3 Final polish

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

## COMPLETED PROJECTS

None recorded yet.

## NEW-CHAT CONTINUATION INSTRUCTION

A new chat must NOT assume the user should reteach the project.

Use this sequence:

**MASTER INDEX → SELECT PROJECT → LOAD DETAILED HANDOVER → VERIFY CURRENT STATE → CONTINUE**

For Get Wired:
- load `HANDOVER.md`
- do not create a new Get Wired project or duplicate its history

For a Pet Project:
- load that Pet Project's own handover
- do not load it as part of Get Wired

The master file is the router; the project-specific handover is the source of detailed truth.
