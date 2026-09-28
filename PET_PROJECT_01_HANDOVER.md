# PET PROJECT 01 — CUSTOM ANDROID OS

Updated: 2026-09-28 SAST

## Identity
Independent project. NOT part of Get Wired AutoWorx.
Target: our own Android-based OS for an approximately 8-inch tablet or suitable phone/tablet development device, designed for speed, security, Android app compatibility, Google Play/GMS where appropriately licensed/supported, and our own custom apps.

## Big-picture goal
Build a lightweight, highly customised Android OS that:
- runs normal Android applications
- supports Google account, Play Store, Chrome, WhatsApp, Facebook and other required apps where device/GMS compatibility permits
- runs our own custom applications, including the Get Wired AutoWorx app where compatible
- removes unnecessary OEM/bloat components
- prioritises speed, responsiveness, security and privacy
- supports reliable OTA/security updates
- supports secure recovery/rollback
- can later include a custom AI/assistant layer

## Priorities
1. Security
2. Speed/responsiveness
3. Android app compatibility
4. Reliable updates
5. Customisation/control
6. Battery efficiency
7. Lowest practical hardware cost for development/testing

## Technical direction
Use AOSP as the foundation, not a new kernel/platform from scratch.
Android 17 is the current baseline under investigation. Official Android 17 GSI releases exist, including ARM64 and GMS variants, subject to Google's applicable licensing terms.

Official references:
- https://source.android.com/
- https://developer.android.com/topic/generic-system-image
- https://source.android.com/docs/security/bulletin/android-17

## GMS / Play Store rule
AOSP does NOT automatically include Google Play/GMS. GMS is separately licensed and subject to compatibility/compliance requirements. Do not assume a custom AOSP build can simply redistribute proprietary Google components. Hardware selection must include a viable supported/licensed GMS path.

## Security architecture
Target:
- Verified Boot / hardware-backed root of trust
- locked production bootloader
- SELinux enforcing
- Android app sandbox
- hardware-backed Keystore/attestation where supported
- encrypted user data
- least-privilege permissions
- signed release builds
- secure OTA updates
- rollback protection
- rapid security-patch integration
- minimal privileged/system apps
- minimal unnecessary telemetry/background services
- auditable/reproducible builds where practical

Never weaken production security merely to simplify development.

## Performance architecture
Target:
- minimal preinstalled apps
- minimal background services
- fast boot
- low RAM overhead
- responsive launcher/UI
- efficient animations
- controlled startup
- sensible caching
- battery-aware background limits
- hardware acceleration where supported
- no unnecessary OEM services

Measure performance; do not assume it.

## Hardware strategy — LOW-COST SECOND-HAND FIRST
User has clarified that the immediate objective is the CHEAPEST practical Android phone/tablet that can be purchased second-hand, wiped and used for development/testing of the custom OS.

Do NOT optimise for premium hardware unless the price difference is justified by substantially better development support.

Preferred initial purchase target:
- roughly R500–R1,500 used where possible
- absolute upper target around R2,000 unless a clearly superior development device is available
- 4GB+ RAM preferred
- 64GB+ storage preferred
- ARM64 mandatory
- exact model/variant must be identified before purchase
- established AOSP/custom-ROM/community support strongly preferred
- unlockable bootloader is a major requirement
- working USB/charging/display/touch required
- avoid devices that cannot provide a realistic custom-ROM/AOSP route

A very cheap older device such as a Galaxy Tab E may be acceptable ONLY as a disposable experimentation device at a very low price. It is not the preferred everyday/custom-OS target because of very old hardware, low RAM and weak modern-app/security prospects.

Current low-cost candidates identified for further screening:
- Samsung Galaxy Tab A7 2020, exact model variants such as SM-T505/T505N
- Samsung Galaxy Tab S6 Lite 2020, exact supported variants only
- Samsung Galaxy Tab S7
- Samsung Galaxy S20 FE Exynos
- older Google Pixel devices
- selected older Samsung/Motorola/Sony/Xiaomi phones with strong custom-ROM support

The Samsung Galaxy Tab A7 2020 is currently of interest as a low-cost tablet candidate, but its 3GB RAM and older Snapdragon 662 mean it must be treated as a budget development/test target rather than automatically selected.
The Samsung Galaxy Tab E is only a potential ultra-cheap experimental device, not the main target.

## Hardware gate — BEFORE PURCHASE
Screen candidates for:
- ARM64
- exact model number and regional variant
- exact SoC/chipset
- bootloader unlockability
- vendor/BSP availability
- kernel source
- device tree/vendor blobs
- GPU drivers
- Wi-Fi/Bluetooth
- display/touch
- audio
- camera/sensors if required
- USB/charging
- RAM/storage
- recovery/fastboot path
- AVB/Verified Boot
- security/update support
- Android 17 feasibility
- GMS/Play Store feasibility
- developer/community support
- current second-hand price

Do not buy arbitrary tablet or phone hardware before this screening.

## Development phases
### P0 — Architecture + hardware feasibility
Define requirements, security model, performance targets, app requirements, and screen hardware.

### P1 — Development platform
Establish AOSP build environment, select Android 17 baseline, build clean development image, boot in emulator/test environment, establish Git/reproducible build process.

### P2 — Custom OS foundation
Branding, launcher/UI, settings, component reduction, performance tuning, security configuration, update and recovery strategy.

### P3 — App compatibility
Test Play Store/GMS path, Google account, Chrome, WhatsApp, Facebook, Gmail, common apps, Get Wired AutoWorx app, notifications, permissions, media, Wi-Fi, Bluetooth, location and camera where applicable.

### P4 — Security hardening
Verified Boot, SELinux, encryption, secure keys, signed updates, rollback protection, attack-surface reduction and release audit.

### P5 — Performance
Measure boot time, app launch, RAM, idle drain, CPU/GPU responsiveness, storage, thermals and battery life.

### P6 — Physical-device validation
Flash, hardware, suspend/resume, charging, wireless, audio, touchscreen, camera, sensors, recovery, OTA and rollback.

### P7 — Production release
Release signing, locked bootloader, final security/compatibility audit, update infrastructure, recovery and documented recovery procedure.

## Definition of success
A selected phone/tablet runs the OS as its primary system and:
1. boots reliably
2. is fast and lightweight
3. runs required Android apps
4. provides Play Store/GMS through an appropriate supported/licensed route
5. runs our custom apps
6. maintains appropriate Verified Boot/security
7. receives reliable security updates
8. supports secure recovery/rollback
9. has unnecessary OEM bloat removed
10. passes defined performance/security tests
11. remains recoverable without permanent bricking

## Current status
P0 — Architecture and hardware feasibility.
No production OS built yet.

Current findings:
- Android 17 is a viable baseline for investigation.
- Android 17 GSI builds are available, including ARM64+GMS variants, but device-specific support and GMS licensing/compliance remain separate requirements.
- User prioritises the cheapest viable second-hand hardware.
- Hardware selection is now explicitly open to BOTH tablets and phones.
- Samsung Galaxy Tab E is considered only as an ultra-cheap experimental device; not preferred for the main OS target.
- Samsung Galaxy Tab A7 2020 is a current budget candidate requiring exact-model/custom-ROM verification before purchase.

## Current task
Build the LOW-COST SECOND-HAND HARDWARE MATRIX and identify the cheapest technically viable phone/tablet.

## Next actions
1. Search current South African second-hand listings.
2. Identify exact model numbers and prices.
3. Verify bootloader unlockability.
4. Verify AOSP/LineageOS/custom-ROM support.
5. Check kernel/device-tree/vendor/GPU support.
6. Check Android 17 feasibility.
7. Check GMS/Play Store feasibility.
8. Compare RAM/storage/performance against price.
9. Reject technically unsuitable bargains.
10. Present the cheapest viable candidates before any purchase.
11. After hardware approval, establish AOSP build environment.

## ETA
Initial low-cost hardware screening: 1–3 work sessions.
Prototype and production timelines depend on hardware/BSP/GMS path.

## Blockers
- final hardware not selected
- exact device/BSP not selected
- GMS compliance/licensing path not established
- AOSP build environment not established

## Owner actions
None immediately. Later: approve/purchase the technically screened development hardware.

## Do NOT redo
- Do not restart as a non-Android OS.
- Do not assume AOSP includes Play Store.
- Do not weaken Verified Boot/SELinux/encryption for convenience.
- Do not buy hardware before technical screening.
- Do not reject a cheap device solely because it is not approximately 8-inch; phones are now valid development candidates.
- Do not select a device solely by price; exact model and development support must pass the hardware gate.
- Do not merge this project into Get Wired.
- Do not alter Get Wired production systems from this project.

## Costs
Keep costs separate from Get Wired. No unnecessary paid services. No Get Wired Cloudflare or Netlify credits.

## Testing standard
Record build ID, source revision, device/emulator, test, expected result, actual result, pass/fail and known issues for each milestone.

## Continuation
Future chat: load this file, continue at P0, complete the low-cost second-hand hardware matrix, screen candidates, identify the cheapest viable development device, then establish the AOSP build environment. Do not require the user to reteach the project.

Execution loop: Plan → Build → Test → Fix → Verify → Record → Continue
