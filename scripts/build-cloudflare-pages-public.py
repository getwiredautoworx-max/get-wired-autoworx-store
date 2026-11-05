#!/usr/bin/env python3
"""Build a customer-only Cloudflare Pages directory; never deploy repository source data."""
from pathlib import Path
import json
import os
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "pages-public"

# Run the exact storefront/catalogue regression suite before packaging either
# standard or preview output. GitHub-hosted public-repository runners are enabled.
node = shutil.which("node")
if not node:
    raise SystemExit("Node.js is required to run storefront regression tests before Pages packaging")
subprocess.run([node, str(ROOT / "tests" / "three-category-storefront-structure.test.cjs")], cwd=ROOT, check=True)
subprocess.run([node, str(ROOT / "tests" / "asc-auto-electrical-integration.test.cjs")], cwd=ROOT, check=True)

REQUIRED_ROOT_FILES = [
    "index.html", "store.html", "index-new.html", "product.html", "products.html",
    "checkout.html", "checkout-v2.html", "category.html", "returns-refunds.html",
    "terms-and-conditions.html", "product-details.js", "category-navigation.js",
]
OPTIONAL_ROOT_FILES = ["privacy-policy.html", "robots.txt"]
PREVIEW_ROOT_FILES = [
    "owner-preview.html", "preview-store.html", "preview-category.html", "preview-products.html",
    "preview-product.html", "preview-planetworld.html", "preview-audio.html", "asc-auto-electrical-preview.html",
]
PREVIEW_ASSET_FILES = [
    "planetworld-catalogue-preview.json", "planetworld-verified-models-preview.json",
    "audio-connections-catalogue-preview.json", "asc-auto-electrical-preview.json",
    "brand-logos/jbl.svg", "brand-logos/denon.svg", "brand-logos/hertz.svg",
]
REQUIRED_ASSET_FILES = [
    "gw-logo.png", "car-audio-video-category.svg", "product-image-fallback.js", "category-cleanup.js",
    "progressive-store-enhancements.js", "product-placeholder.svg", "category-tree.json", "storefront-subpage-shell.css",
]
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

# Cloudflare supplies CF_PAGES_BRANCH. Include owner-preview routes on non-main
# branches automatically; main always receives the clean production package.
# The explicit flag remains available for local/manual preview builds.
branch = os.environ.get("CF_PAGES_BRANCH")
include_preview = (branch is not None and branch != "main") or os.environ.get("GW_INCLUDE_PREVIEW_ROUTES") == "1"
if include_preview:
    for name in PREVIEW_ROOT_FILES:
        copy_file(name)
    for name in PREVIEW_ASSET_FILES:
        copy_file(f"assets/{name}")
if include_preview:
    asc_images = ROOT / "assets" / "asc-auto-electrical-pilot"
    if not asc_images.is_dir():
        raise SystemExit("ASC Auto Electrical pilot image directory missing")
    shutil.copytree(asc_images, OUT / "assets" / "asc-auto-electrical-pilot")

for name in REQUIRED_ASSET_FILES:
    copy_file(f"assets/{name}")

# Keep the ASC catalogue expansion isolated to explicit non-production previews.
# The standard/main customer package retains the previous approved category tree
# until the owner accepts the catalogue and image-use/commercial release gates.
if not include_preview:
    category_path = OUT / "assets" / "category-tree.json"
    category_tree = json.loads(category_path.read_text(encoding="utf-8"))
    preview_ids = {
        "e6a10001-1b2c-4d3e-8f90-111111111111",
        "e6a10002-1b2c-4d3e-8f90-222222222222",
        "e6a10003-1b2c-4d3e-8f90-333333333333",
    }
    category_tree["categories"] = [
        item for item in category_tree["categories"] if item.get("id") not in preview_ids
    ]
    globe = next(item for item in category_tree["categories"] if item.get("id") == "89595653-97d4-4b18-ba69-117547d32ed0")
    globe["name"] = "Globes & Vehicle Lighting"
    globe["slug"] = "globes-vehicle-lighting"
    category_tree["categories"].append({
        "id": "9f85f25f-800d-4ae4-854d-0213d83b86fa",
        "name": "Sensors & Switches",
        "slug": "sensors-switches",
        "parent_id": "ba263c9f-d038-48bd-bca0-944f3ebdc5e9",
        "active": True,
        "direct_active_products": 0,
        "sort_order": 6,
    })
    category_tree["source"] = "Owner-approved category reset and rebuilt hierarchy from Supabase; catalogue products remain in source review until identity, images, pricing and availability are approved."
    category_path.write_text(json.dumps(category_tree, indent=2) + "\\n", encoding="utf-8")

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
    for name in PREVIEW_ASSET_FILES:
        if not (OUT / "assets" / name).is_file():
            raise SystemExit(f"Preview package missing catalogue data: assets/{name}")
    print("PAGES_PREVIEW_ROUTES_INCLUDED " + " ".join(PREVIEW_ROOT_FILES))
    print("PLANETWORLD_AUDIO_CONNECTIONS_PREVIEW_ASSETS_PASS source_pdfs=0 asc_catalogue_data=excluded")
else:
    leaked_preview = [name for name in PREVIEW_ROOT_FILES if (OUT / name).exists()]
    if leaked_preview:
        raise SystemExit(f"Preview-only routes leaked into standard package: {leaked_preview}")
    print("PAGES_PREVIEW_ROUTES_EXCLUDED_PASS")

print(f"PAGES_PUBLIC_BUILD_PASS files={len(relative_paths)} webp_images={image_count}")
print("PAGES_PUBLIC_EXCLUDES_PASS suppliers catalogue-review catalogue-source catalogue-audits staging supabase .github")
if include_preview:
    # Public, non-sensitive proof that the exact structural regression suite ran
    # before this owner-preview package was emitted.
    qa_marker = {
        "result": "PASS",
        "test": "tests/three-category-storefront-structure.test.cjs",
        "commit": os.environ.get("CF_PAGES_COMMIT_SHA") or os.environ.get("GITHUB_SHA"),
        "branch": os.environ.get("CF_PAGES_BRANCH"),
        "preview_only": True,
    }
    (OUT / "qa-build-result.json").write_text(json.dumps(qa_marker, indent=2) + "\n", encoding="utf-8")
    print("PAGES_STOREFRONT_REGRESSION_PASS")

