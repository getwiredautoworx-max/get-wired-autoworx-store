# Exact-head browser acceptance matrix — Get Wired AutoWorx
Date: 31 October 2026 (SAST)
Target branch: `integration/clean-main-planetworld-partsearch-2026-10-31`
Latest code checkpoint when prepared: `8d154e9e2ffa784082a29848789d8863291dcb06`
Status: **NOT RUN — execution sheet only. No browser pass is claimed.**

## Preconditions
- Use a hosted preview built from the exact candidate HEAD; record the preview URL and commit SHA. Do not use an older Cloudflare Pages URL as evidence for this candidate.
- Keep GitHub Actions untouched until the 1-Nov quota reset is confirmed. If running locally, use the exact checked-out branch and record Node/browser versions.
- Preview banner must remain visible. No checkout/payment submission, stock reservation, Supabase writes, supplier submissions, live stock or price updates.
- Browser console and Network panels must be available. Record any expected image fallback separately from unexpected request failures.

## Required viewports
| Device class | Viewport | Acceptance |
|---|---:|---|
| Desktop | 1365 × 900 | No horizontal overflow; primary navigation and cards usable |
| Mobile | 390 × 844 | No horizontal overflow; readable text, tappable controls, modal fits/scrolls |
| Narrow mobile | 320 × 740 | No clipped controls or forced page-wide horizontal scroll |

## Route and interaction checks

### 1. Store home — `preview-store.html`
- [ ] Exactly eight main category roots; Find a Part is a separate utility action.
- [ ] 4X4 Outdoor appears only under Camping, Leisure & Outdoors.
- [ ] Empty subcategory branches do not appear as dead links.
- [ ] Audio root exposes the dedicated Audio departments link.
- [ ] Category tiles, search, Part Search and mobile menu are keyboard/touch operable.
- [ ] Product image failure sequence: recorded image → image endpoint → exact-SKU local WebP → neutral placeholder. Never show another SKU's image.
- [ ] No console errors; all required local assets return successfully.

### 2. Category navigation — `preview-category.html`
- [ ] Open each of the eight approved roots and inspect its populated children.
- [ ] Empty categories show the intended unavailable message rather than a dead/blank screen.
- [ ] 4X4 Outdoor route is nested under Camping, not presented as a ninth root.
- [ ] Back navigation and search links retain the intended category context.

### 3. Audio departments — `preview-audio.html`
- [ ] Nine departments appear: Car Audio & Video; Home Entertainment; Band & Live Sound; DJ Equipment; Studio Equipment; Marine Audio; Installed AV; Musical Instruments; Harnesses & Trims.
- [ ] Department → brand → component → product filtering works and redraws when catalogue data finishes loading.
- [ ] Planetworld items identify the dated snapshot; quote action opens the existing WhatsApp contact.
- [ ] Curated manufacturer models show exact model codes and manufacturer-page links; unavailable images retain neutral placeholders.
- [ ] No invented model, price, stock or image is shown.

### 4. Product listing — `preview-products.html`
- [ ] Exact-SKU images load; broken images show “Image not available”.
- [ ] Search, sort, brand/component filters and pagination/rendering remain responsive.
- [ ] Unverified or zero prices display “Price on request”; no add-to-cart bypass.
- [ ] Out-of-stock/unknown stock is not represented as confirmed availability.

### 5. Product detail — `preview-product.html`
- [ ] Exact product opens from the listing and SKU/name are correct.
- [ ] Image fallback ends at packaged `assets/product-placeholder.svg`.
- [ ] Internal supplier/buyer-guide/cost/markup metadata is not displayed.
- [ ] Only customer-safe specifications are displayed; unknown fitment is labelled as unknown.
- [ ] Price-on-request path opens WhatsApp; no live checkout/payment action occurs.

### 6. Planetworld review — `preview-planetworld.html`
- [ ] 68 curated exact-model rows load with model, brand, component and manufacturer page.
- [ ] Price options are clearly labelled review-only and use the dated supplier snapshot.
- [ ] Image failure retains the neutral card background; no mismatched substitute is used.
- [ ] Search, brand and component filters work.

### 7. Preview checkout — `preview-checkout.html`
- [ ] Preview-only notice is visible.
- [ ] Null, blank and zero-price rows are excluded from the verified-price subtotal and remain “Price on request”.
- [ ] No order, payment, stock reservation, Supabase write or supplier action can occur.

### 8. Part Search / Request a Part — store home
- [ ] Search exact SKU `GW-B4F502E6`, partial SKU `B4F502`, title/brand/vehicle terms and manufacturer model `HCE-C2100RD`.
- [ ] Confirm a no-match result offers Request a Part.
- [ ] Simulate broad Planetworld feed failure; curated exact-model references remain searchable.
- [ ] Open Request a Part from search and confirm the search term is carried into the part-needed field.
- [ ] Vehicle year selector extracts 4-digit years from matching product fitment text.
- [ ] Six photos are rejected; each photo over 4 MB or not JPG/PNG/WebP is rejected.
- [ ] Preview request opens WhatsApp with typed details and instructs the customer to attach selected photos manually.
- [ ] Network panel confirms preview request path makes no Storage upload or `part_source_requests` POST. The legacy supplier-source modal remains blocked.

## Evidence to record
- [ ] Exact candidate commit SHA and preview URL.
- [ ] Desktop 1365 × 900 result and screenshots of any failure.
- [ ] Mobile 390 × 844 result and screenshots of any failure.
- [ ] Narrow mobile 320 × 740 result and screenshots of any failure.
- [ ] Console errors, failed network requests, image fallback outcomes and any horizontal overflow.
- [ ] Actual Node test commands/results, separately from browser results:
  - `node tests/catalogue-search.test.cjs`
  - `node tests/audio-navigation.test.cjs`
- [ ] Do not mark the candidate ready until the exact-head Node tests and all three viewport journeys pass and unresolved owner/source dependencies are recorded.

## Explicit exclusions
No merge, launch, Axxess upload, DNS change, production deploy, payment activation, Supabase write/migration, live category/stock/price/catalogue change, supplier activation or ASC integration without the existing owner approval gates.
