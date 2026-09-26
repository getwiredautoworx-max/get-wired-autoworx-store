# GW AI OS — Architecture & Build Plan

## Purpose

GW AI OS is the long-term custom mobile operating-system project for Get Wired AutoWorx.

The objective is **not** to write a phone OS kernel from scratch. The planned foundation is Android Open Source Project (AOSP), with a custom GW system layer and AI control plane while retaining Android application compatibility.

## Core principles

1. **User-owned project** — source, configuration and data remain in the user's GitHub/Supabase infrastructure.
2. **AI-provider independent** — do not hard-wire the OS to ChatGPT. The AI layer must support replaceable providers and, where practical, local/on-device models.
3. **Android app compatibility** — preserve the Android application/runtime/package model so normal APKs remain usable.
4. **Security first** — never put Supabase service-role keys, provider secrets or other privileged credentials inside an APK or OS image.
5. **Business-first integration** — Get Wired AutoWorx tools are first-class system experiences, not the only applications allowed to run.
6. **Incremental build** — start as an Android launcher/control layer, then move toward an AOSP system image only after the architecture is proven.
7. **No production disruption** — this project must not replace the existing storefront or customer-facing APK and must not trigger Cloudflare/Netlify deployment or consume their credits.

## Target architecture

Physical device
→ AOSP / Android platform
→ GW System Layer
→ GW AI Core
→ GW Services / Secure Action Broker
→ GW Apps and ordinary Android apps

### GW System Layer

Planned components:

- GW Launcher
- GW Control Centre
- GW Notifications/quick actions
- GW Settings extensions
- GW Files
- GW permissions/privacy controls
- GW update/recovery interface

### GW AI Core

A provider-neutral interface for:

- text reasoning
- voice input/output
- vision
- document/catalogue understanding
- tool/function calling
- local model execution where practical
- cloud model routing
- conversation/context management

The AI Core should select a provider by task rather than assume one vendor.

### Secure Action Broker

The AI must not receive unrestricted system privileges.

Actions should pass through explicit capabilities such as:

- open app
- read approved data
- create draft
- update approved store record
- import catalogue
- verify supplier source
- publish approved catalogue batch
- manage orders
- send customer message

Sensitive actions should require owner confirmation.

## AutoWorx integration

The existing Owner APK becomes the first practical administrative client and later a native GW OS service/app.

Existing direction:

- Supabase Auth owner login
- catalogue/pricelist staging
- PENDING → APPROVED → REJECTED
- supplier URL + SKU verification
- live store administration
- pricing formula: cost ex VAT × 1.15 × 1.35
- explicit approval before publishing

The current 4,000+ product manual SKU/picture/description/category verification remains a final QA task and must not block OS architecture work.

## Build phases

### Phase 0 — Architecture (current)

- document system architecture
- define AI-provider-neutral interfaces
- define secure action/capability model
- preserve current APK/store boundaries

### Phase 1 — GW Launcher

A normal Android launcher with the future GW OS interface.

No ROM flashing required.

### Phase 2 — GW AI Core

Build the provider-neutral assistant and action broker as Android services/apps.

### Phase 3 — GW Control Centre

Integrate phone controls, AutoWorx controls, files, notifications and AI actions.

### Phase 4 — AOSP integration

Create an AOSP-based system image with GW launcher/system components.

Use AOSP's compatibility requirements as the baseline. Android 17 compatibility requires standard Android APIs and APK installation/runtime compatibility; compatible implementations can remain in the Android app ecosystem.

### Phase 5 — Device-specific build

Add device/vendor configuration, hardware support, recovery/OTA strategy and security hardening for a selected supported handset.

### Phase 6 — Daily-driver release

Only after backup, recovery, app compatibility, security and update procedures are proven.

## Current status

- Android Owner APK project already exists in the store repository.
- APK is an administrative control layer; it does not replace the storefront.
- AOSP/GW OS is a separate future layer.
- No AOSP ROM has been flashed.
- No existing phone software has been replaced.
- No production deployment has been triggered.
- No Cloudflare or Netlify credits are to be used.

## Immediate next development target

Build the **GW Launcher prototype** as an ordinary Android application first. It should run on the existing phone without root or ROM replacement and provide the visual/system shell that will later become the GW System Layer.

Do not claim the custom OS exists until an AOSP-based image actually builds and boots on a supported device.
