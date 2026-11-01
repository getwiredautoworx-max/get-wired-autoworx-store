#!/usr/bin/env python3
"""Build a customer-only Cloudflare Pages directory; never deploy repository source data."""
from pathlib import Path
import os
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "pages-public"

REQUIRED_ROOT_FILES = [
    "index.html", "store.html", "index-new.html", "product.html", "products.html",
    "checkout.html", "checkout-v2.html", "category.html", "returns-refunds.html",
    "terms-and-conditions.html", "product-details.js", "category-navigation.js",
]
OPTIONAL_ROOT_FILES = ["privacy-policy.html", "robots.txt"]
PREVIEW_ROOT_FILES = [
    "preview-store.html", "preview-category.html", "preview-products.html",
    "preview-product.html", "preview-planetworld.html", "preview-audio.html", "preview-checkout.html",
]
REQUIRED_ASSET_FILES = [
    "gw-logo.png", "storefront-shell.css", "product-image-fallback.js", "category-cleanup.js",
    "progressive-store-enhancements.js", "product-placeholder.svg", "category-tree.json",
]
PREVIEW_ASSET_FILES = ["audio-category-navigation.js","planetworld-catalogue-preview.json","planetworld-verified-models-preview.json","audio-connections-catalogue-preview.json","asc-catalogue-pilot-preview.json","asc-catalogue-pilot/asc-01080.jpg","asc-catalogue-pilot/asc-02883.jpg","asc-catalogue-pilot/asc-03822.jpg","asc-catalogue-pilot/asc-09103.jpg","asc-catalogue-pilot/asc-09396.jpg","asc-catalogue-pilot/asc-21849.jpg","asc-catalogue-pilot/asc-9005-cbl-h.jpg","asc-catalogue-pilot/asc-9005-h.jpg","asc-catalogue-pilot/asc-9005-nb.jpg","asc-catalogue-pilot/asc-9005xs.jpg","asc-catalogue-pilot/asc-cs-112048.jpg","asc-catalogue-pilot/asc-csc105.jpg","asc-catalogue-pilot/asc-csc106.jpg","asc-catalogue-pilot/asc-f1-012.jpg","asc-catalogue-pilot/asc-f1-019.jpg","asc-catalogue-pilot/asc-f1-060.jpg","asc-catalogue-pilot/asc-f1-067.jpg","asc-catalogue-pilot/asc-m7-avan01.jpg","asc-catalogue-pilot/asc-m7-con01.jpg","asc-catalogue-pilot/asc-m7-cor01.jpg","asc-catalogue-pilot/asc-m7-cor02.jpg","asc-catalogue-pilot/asc-ma522.jpg","asc-catalogue-pilot/asc-ma553.jpg","asc-catalogue-pilot/asc-ma559r.jpg","asc-catalogue-pilot/asc-ma570.jpg","asc-catalogue-pilot/asc-a1-003.jpg","asc-catalogue-pilot/asc-a1-004.jpg","asc-catalogue-pilot/asc-ma314.jpg","asc-catalogue-pilot/asc-ma314bl.jpg","asc-catalogue-pilot/asc-02761.jpg","asc-catalogue-pilot/asc-04818.jpg","asc-catalogue-pilot/asc-14163.jpg","asc-catalogue-pilot/asc-29601.jpg","asc-catalogue-pilot/asc-ig-fr01.jpg","asc-catalogue-pilot/asc-ig-hn04.jpg","asc-catalogue-pilot/asc-ig-izt.jpg","asc-catalogue-pilot/asc-ig-np300.jpg","asc-catalogue-pilot/asc-h1865w-h.jpg","asc-catalogue-pilot/asc-h1960-55w-h.jpg","asc-catalogue-pilot/asc-h355w-cbl.jpg","asc-catalogue-pilot/asc-h355w-h.jpg","asc-catalogue-pilot/asc-m7-gf1.jpg","asc-catalogue-pilot/asc-m7-bme36.jpg","asc-catalogue-pilot/asc-m7-bme46.jpg","asc-catalogue-pilot/asc-m7-bme87.jpg","asc-catalogue-pilot/asc-f1-001.jpg","asc-catalogue-pilot/asc-f1-001-e.jpg","asc-catalogue-pilot/asc-f1-009.jpg","asc-catalogue-pilot/asc-f1-017.jpg","asc-catalogue-pilot/asc-f1-028.jpg"]
FORBIDDEN_DIRS = {
    "suppliers", "catalogue-review", "catalogue-source", "catalogue-audits",
    "staging", "supabase", ".github", "android-owner-app", "apk-sales-intelligence",
}

def copy_file(relative: str) -> None:
    src = ROOT / relative
    if not src.is_file():
        raise SystemExit(f"Required public storefront file missing: {relative}")
    dst = OUT / relative
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

for name in REQUIRED_ROOT_FILES:
    copy_file(name)
for name in OPTIONAL_ROOT_FILES:
    if (ROOT / name).is_file():
        copy_file(name)

# Preview routes are included only in the explicitly non-production preview build.
# The production build remains unchanged unless this opt-in environment flag is set.
include_preview = os.environ.get("GW_INCLUDE_PREVIEW_ROUTES") == "1"
if include_preview:
    for name in PREVIEW_ROOT_FILES:
        copy_file(name)
    for name in PREVIEW_ASSET_FILES:
        copy_file(f"assets/{name}")
for name in REQUIRED_ASSET_FILES:
    copy_file(f"assets/{name}")

image_source = ROOT / "assets" / "products_webp"
if not image_source.is_dir():
    raise SystemExit("Required storefront WebP image directory missing: assets/products_webp")
shutil.copytree(image_source, OUT / "assets" / "products_webp")

# The output is an allowlist, not a copy of the repository root. Assert that no
# internal source/review directories or supplier documents entered the package.
relative_paths = [p.relative_to(OUT).as_posix() for p in OUT.rglob("*") if p.is_file()]
for rel in relative_paths:
    first = rel.split("/", 1)[0]
    if first in FORBIDDEN_DIRS:
        raise SystemExit(f"Internal source directory leaked into Pages output: {rel}")
    if rel.lower().endswith((".xlsx", ".xls", ".pdf", ".csv", ".sql", ".md", ".zip")):
        raise SystemExit(f"Non-customer source file leaked into Pages output: {rel}")

for required in REQUIRED_ROOT_FILES:
    if not (OUT / required).is_file():
        raise SystemExit(f"Public Pages package missing required page: {required}")

image_count = sum(1 for p in (OUT / "assets" / "products_webp").rglob("*.webp") if p.is_file())
if image_count == 0:
    raise SystemExit("No WebP product images were copied")

if include_preview:
    for name in PREVIEW_ROOT_FILES:
        if not (OUT / name).is_file():
            raise SystemExit(f"Preview package missing route: {name}")
    print("PAGES_PREVIEW_ROUTES_INCLUDED " + " ".join(PREVIEW_ROOT_FILES))
else:
    leaked_preview = [name for name in PREVIEW_ROOT_FILES if (OUT / name).exists()]
    if leaked_preview:
        raise SystemExit(f"Preview-only routes leaked into standard package: {leaked_preview}")
    print("PAGES_PREVIEW_ROUTES_EXCLUDED_PASS")

print(f"PAGES_PUBLIC_BUILD_PASS files={len(relative_paths)} webp_images={image_count}")
print("PAGES_PUBLIC_EXCLUDES_PASS suppliers catalogue-review catalogue-source catalogue-audits staging supabase .github")
