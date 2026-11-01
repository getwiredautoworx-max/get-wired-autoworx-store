#!/usr/bin/env python3
"""Build a customer-only Cloudflare Pages directory; never deploy repository source data."""
from pathlib import Path
import json
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
PREVIEW_ASSET_FILES = [
    "audio-category-navigation.js",
    "catalogue-search.js",
    "planetworld-catalogue-preview.json",
    "planetworld-verified-models-preview.json",
    "audio-connections-catalogue-preview.json",
    "asc-catalogue-pilot-preview.json",
    "product-image-pending.svg",
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

# Preview mode publishes only the guarded storefront entry, legal pages and
# explicitly approved preview routes. Production checkout/product routes are omitted.
PREVIEW_BASE_ROOT_FILES = ["index.html", "store.html", "product-details.js", "returns-refunds.html", "terms-and-conditions.html"]
include_preview = os.environ.get("GW_INCLUDE_PREVIEW_ROUTES") == "1"
if include_preview:
    for name in PREVIEW_BASE_ROOT_FILES:
        copy_file(name)
else:
    for name in REQUIRED_ROOT_FILES:
        copy_file(name)
for name in OPTIONAL_ROOT_FILES:
    if (ROOT / name).is_file():
        copy_file(name)

# Preview routes are included only in the explicitly non-production preview build.
# The production build remains unchanged unless this opt-in environment flag is set.
if include_preview:
    for name in PREVIEW_ROOT_FILES:
        copy_file(name)
    for name in PREVIEW_ASSET_FILES:
        if name not in {"planetworld-catalogue-preview.json", "asc-catalogue-pilot-preview.json"}:
            copy_file(f"assets/{name}")

    # Publish only customer-safe display fields. Supplier pricing/availability,
    # internal identifiers, source-page metadata and crops remain private.
    planetworld = json.loads((ROOT / "assets/planetworld-catalogue-preview.json").read_text(encoding="utf-8"))
    public_planetworld = {
        "recordCount": len(planetworld.get("records", [])),
        "status": "Preview catalogue; confirm current price and availability before ordering.",
        "records": [
            {key: row.get(key) for key in ("id", "division", "collection", "brand", "title", "component")}
            for row in planetworld.get("records", [])
        ],
    }
    dst = OUT / "assets/planetworld-catalogue-preview.json"
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(json.dumps(public_planetworld, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    asc = json.loads((ROOT / "assets/asc-catalogue-pilot-preview.json").read_text(encoding="utf-8"))
    public_asc = {
        "record_count": len(asc.get("records", [])),
        "notice": "Preview-only catalogue references. Price and availability must be confirmed.",
        "records": [
            {key: row.get(key) for key in ("id", "title", "fitment_as_printed", "category", "subcategory", "catalogue_reference", "root_category")}
            for row in asc.get("records", [])
        ],
    }
    dst = OUT / "assets/asc-catalogue-pilot-preview.json"
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(json.dumps(public_asc, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print("PAGES_PREVIEW_SUPPLIER_DATA_SANITIZED_PASS")
for name in REQUIRED_ASSET_FILES:
    copy_file(f"assets/{name}")

# The preview storefront deliberately uses neutral image placeholders. Do not ship
# the full SKU WebP catalogue in a preview package; the standard production build
# retains the existing image-copy behaviour unchanged.
image_count = 0
if not include_preview:
    image_source = ROOT / "assets" / "products_webp"
    if not image_source.is_dir():
        raise SystemExit("Required storefront WebP image directory missing: assets/products_webp")
    shutil.copytree(image_source, OUT / "assets" / "products_webp")
    image_count = sum(1 for p in (OUT / "assets" / "products_webp").rglob("*.webp") if p.is_file())
    if image_count == 0:
        raise SystemExit("No WebP product images were copied")
else:
    if not (OUT / "assets" / "product-image-pending.svg").is_file():
        raise SystemExit("Preview package missing neutral product-image placeholder")
    if (OUT / "assets" / "products_webp").exists():
        raise SystemExit("SKU WebP images must not be included in the placeholder-only preview")
    if (OUT / "assets" / "asc-catalogue-pilot").exists():
        raise SystemExit("ASC source-card crops must not be exposed in the customer preview")
    print("PAGES_PREVIEW_PRODUCT_WEBP_EXCLUDED_PASS neutral placeholders are used")

# The output is an allowlist, not a copy of the repository root. Assert that no
# internal source/review directories or supplier documents entered the package.
relative_paths = [p.relative_to(OUT).as_posix() for p in OUT.rglob("*") if p.is_file()]
for rel in relative_paths:
    first = rel.split("/", 1)[0]
    if first in FORBIDDEN_DIRS:
        raise SystemExit(f"Internal source directory leaked into Pages output: {rel}")
    if rel.lower().endswith((".xlsx", ".xls", ".pdf", ".csv", ".sql", ".md", ".zip")):
        raise SystemExit(f"Non-customer source file leaked into Pages output: {rel}")

required_root_files = PREVIEW_BASE_ROOT_FILES if include_preview else REQUIRED_ROOT_FILES
for required in required_root_files:
    if not (OUT / required).is_file():
        raise SystemExit(f"Public Pages package missing required page: {required}")

if include_preview:
    for forbidden in ("checkout.html", "checkout-v2.html", "category.html", "products.html", "product.html"):
        if (OUT / forbidden).exists():
            raise SystemExit(f"Preview package must not include production route: {forbidden}")
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
