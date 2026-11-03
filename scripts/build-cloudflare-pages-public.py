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
    "preview-product.html", "preview-planetworld.html", "preview-audio.html", "asc-catalogue-preview.html",
]
PREVIEW_ASSET_FILES = ["asc-catalogue-preview-data.json", "planetworld-catalogue-preview.json", "planetworld-verified-models-preview.json", "audio-connections-catalogue-preview.json"]
PREVIEW_SOURCE_PDFS = [
    ("suppliers/ASC/ASC- Aerials (1).pdf", "assets/asc-catalogue-source/ASC-Aerials.pdf"),
    ("suppliers/ASC/ASC- Automotive Sensors (1).pdf", "assets/asc-catalogue-source/ASC-Automotive-Sensors.pdf"),
    ("suppliers/ASC/ASC- Automotive Switches (1).pdf", "assets/asc-catalogue-source/ASC-Automotive-Switches.pdf"),
    ("suppliers/ASC/ASC- Automotive globes (1).pdf", "assets/asc-catalogue-source/ASC-Automotive-Globes.pdf"),
    ("suppliers/ASC/ASC- Car Mats (1).pdf", "assets/asc-catalogue-source/ASC-Car-Mats.pdf"),
    ("suppliers/ASC/ASC- Fuel Pumps (1).pdf", "assets/asc-catalogue-source/ASC-Fuel-Pumps.pdf"),
]
PREVIEW_SOURCE_PDF_OUTPUTS = {destination for _, destination in PREVIEW_SOURCE_PDFS}
REQUIRED_ASSET_FILES = [
    "gw-logo.png", "product-image-fallback.js", "category-cleanup.js",
    "progressive-store-enhancements.js", "product-placeholder.svg", "category-tree.json",
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

# Preview routes are included only in the explicitly non-production preview build.
# The production build remains unchanged unless this opt-in environment flag is set.
include_preview = os.environ.get("GW_INCLUDE_PREVIEW_ROUTES") == "1"
if not include_preview:
    storefront = OUT / "index-new.html"
    html = storefront.read_text(encoding="utf-8")
    start, end = "/* ASC_PREVIEW_NAV_START */", "/* ASC_PREVIEW_NAV_END */"
    if start not in html or end not in html:
        raise SystemExit("ASC preview navigation guard markers missing from index-new.html")
    before, remainder = html.split(start, 1)
    _, after = remainder.split(end, 1)
    storefront.write_text(before + after, encoding="utf-8")
if include_preview:
    for name in PREVIEW_ROOT_FILES:
        copy_file(name)
    for name in PREVIEW_ASSET_FILES:
        copy_file(f"assets/{name}")
    for source, destination in PREVIEW_SOURCE_PDFS:
        src = ROOT / source
        if not src.is_file():
            raise SystemExit(f"Required original ASC catalogue missing: {source}")
        dst = OUT / destination
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
    pilot_images = ROOT / "assets" / "asc-catalogue-pilot"
    if not pilot_images.is_dir():
        raise SystemExit("Preview package missing reviewed catalogue images: assets/asc-catalogue-pilot")
    shutil.copytree(pilot_images, OUT / "assets" / "asc-catalogue-pilot")
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
        if not (include_preview and rel in PREVIEW_SOURCE_PDF_OUTPUTS):
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
    source_pdf_count = sum(1 for rel in PREVIEW_SOURCE_PDF_OUTPUTS if (OUT / rel).is_file())
    if source_pdf_count != 6:
        raise SystemExit(f"Expected all 6 original ASC catalogues in preview, found {source_pdf_count}")
    pilot_count = sum(1 for p in (OUT / "assets" / "asc-catalogue-pilot").glob("*.jpg") if p.is_file())
    if pilot_count != 50:
        raise SystemExit(f"Expected 50 reviewed catalogue images, found {pilot_count}")
    print("PAGES_PREVIEW_ROUTES_INCLUDED " + " ".join(PREVIEW_ROOT_FILES))
    print(f"CATALOGUE_PREVIEW_ASSETS_PASS images={pilot_count} source_pdfs={source_pdf_count}")
else:
    leaked_preview = [name for name in PREVIEW_ROOT_FILES if (OUT / name).exists()]
    if leaked_preview:
        raise SystemExit(f"Preview-only routes leaked into standard package: {leaked_preview}")
    print("PAGES_PREVIEW_ROUTES_EXCLUDED_PASS")

print(f"PAGES_PUBLIC_BUILD_PASS files={len(relative_paths)} webp_images={image_count}")
print("PAGES_PUBLIC_EXCLUDES_PASS suppliers catalogue-review catalogue-source catalogue-audits staging supabase .github")
