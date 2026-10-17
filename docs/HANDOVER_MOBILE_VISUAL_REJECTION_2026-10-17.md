# Get Wired AutoWorx — Mobile Storefront Visual Rejection
Date: 2026-10-17 (South Africa)

## Owner visual review — REJECTED
The owner supplied a screenshot of the current `store.pages.dev` storefront and explicitly rejected the presentation as miserable and not matching the expected mockup.

Observed defects in the supplied 691 × 1536 mobile screenshot:
- The search field is oversized and overlaps the stock filter; filter controls wrap/stack incorrectly.
- Excessive empty vertical space appears below the header and above the search area.
- Product/part-finder controls and purchase buttons appear layered or positioned into the wrong content region.
- A “Loading” label is visible behind/near the fixed bottom navigation; content is obscured by overlapping layers.
- The cart badge is clipped at the viewport edge.
- The screenshot is not acceptable as a customer-ready mobile storefront, regardless of prior automated HTTP/image checks.

## Required visual direction
Use the approved Get Wired AutoWorx mockup/showcase as the reference, not the broken screenshot:
- Compact, professional branded header with correctly sized logo, search and cart controls.
- Light/clean page canvas with consistent dark navy and red accents.
- Short, restrained promotional banner rather than a tall/cluttered hero.
- Clear search/filter row with no overlap and sensible wrapping on 320px and 390px mobile.
- Homepage content starts promptly; remove unexplained blank vertical gaps.
- Eight approved root categories, displayed in a clear responsive grid; retain 4x4 Outdoor under Camping, Leisure & Outdoors.
- Product cards must show visible, verified product imagery or an explicit neutral placeholder; never substitute a guessed item image.
- Fixed mobile navigation must only appear on mobile, stay within the viewport, and never cover controls/content. On desktop it must be hidden.
- Product finder/detail/purchase controls must only appear in their intended component/page and must not bleed into the homepage.
- Consistent spacing, type scale, button sizing, focus states, and stacking order across homepage, category, product, cart and checkout routes.

## Acceptance gates
1. Reproduce and inspect the exact current staging URL and commit that produced the owner screenshot; record URL, commit and viewport.
2. Correct the root cause in the review branch only. Do not mask the problem with isolated CSS tweaks without checking component structure and shared styles.
3. Capture fresh browser screenshots at 1440px, 390px and 320px after the change.
4. Inspect screenshots visually, not only automated assertions. Assert no overlapping search/filter controls, no unexpected blank block, no clipped cart badge, no desktop mobile-nav, no nav/content collision, and visible image content or explicit placeholder.
5. Smoke-test home, category/subcategory, product, search, cart and checkout. Record exact results and artifact links.
6. Keep PR #54 draft/review-only and production unchanged until the owner reviews and accepts the preview.

## Current status / release decision
- Visual acceptance: FAIL — owner-reported mobile screenshot contradicts the intended mockup.
- Exact cause and exact commit/URL for the screenshot: NOT YET VERIFIED.
- Previous automated run for a different commit is not sufficient proof.
- Product image rights/identity gate remains separate and open; no unlicensed catalogue image may be published.
- No Axxess upload, production merge, Supabase production write/SQL, DNS/payment change, or production deployment is authorized by this rejection.
- Next action: inspect the actual served HTML/CSS and current staging build, reproduce the overlap, implement a cohesive responsive correction in the existing review branch, then re-run and visually inspect the three viewport screenshots.

## Owner preference
Work in staging/review branches first. Do not alter the live Axxess store or perform a production release until the owner accepts the actual rendered preview. Update the handover with concrete commits, test evidence, unresolved blockers and next steps.
