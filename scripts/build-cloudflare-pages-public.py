#!/usr/bin/env python3
"""Build a customer-only Cloudflare Pages directory; never deploy repository source data."""
from pathlib import Path
import json
import os
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "pages-public"

# Preview catalogue JSON is prebuilt and versioned in assets. The current owner
# retail policy suppresses all numeric supplier prices until reliable live
# price-and-stock synchronisation is approved; never recalculate customer prices
# as part of a preview build.

# Run the exact storefront/catalogue regression suite before packaging either
# standard or preview output. GitHub-hosted public-repository runners are enabled.
node = shutil.which("node")
if not node:
    raise SystemExit("Node.js is required to run storefront regression tests before Pages packaging")
subprocess.run([node, str(ROOT / "tests" / "audio-only-storefront-scope.test.cjs")], cwd=ROOT, check=True)

REQUIRED_ROOT_FILES = [
    "index.html", "store.html", "index-new.html", "product.html", "products.html",
    "checkout.html", "checkout-v2.html", "category.html", "returns-refunds.html",
    "terms-and-conditions.html", "product-details.js", "category-navigation.js",
]
OPTIONAL_ROOT_FILES = ["privacy-policy.html", "robots.txt"]
PREVIEW_ROOT_FILES = [
    "owner-preview.html", "preview-store.html", "preview-category.html", "preview-products.html",
    "preview-product.html", "preview-audio.html", "preview-audio-brand.html", "preview-audio-products.html",
]
PREVIEW_ASSET_FILES = [
    "audio-catalogue-primary-preview.json",
    "audio-catalogue-secondary-preview.json", "audio-model-verification-preview.json",
    "brand-logos/jbl.svg", "brand-logos/denon.svg", "brand-logos/hertz.svg", "brand-logos/sony.svg",
    "audio-types/speakers.svg", "audio-types/subwoofers.svg", "audio-types/amplifiers.svg",
    "audio-types/head-units.svg", "audio-types/cameras-monitors.svg", "audio-types/signal-processing.svg",
    "audio-types/harnesses-trims.svg", "audio-types/aerials.svg",
    "audio-types/home-entertainment.svg", "audio-types/home-audio-cinema.svg",
    "audio-types/projection-screens-projectors.svg", "audio-types/cables-mounts-accessories.svg",
    "audio-types/av-infrastructure-control.svg", "audio-types/installed-audio.svg",
    "audio-types/conferencing-collaboration.svg", "audio-types/other-home-ci.svg",
    "audio-types/musical-instruments.svg", "audio-types/marine-audio.svg", "audio-types/lifestyle-audio.svg",
]
PREVIEW_ASSET_DIRS = []
# Sanitised, review-only local catalogue records power the owner-facing
# customer-view route (?ownerPreview=1) without requiring live Supabase rows.
# They are never treated as live stock or verified supplier prices.
PUBLIC_REVIEW_DATA_FILES = [
    "audio-catalogue-secondary-preview.json",
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
    for name in PREVIEW_ASSET_DIRS:
        source_dir = ROOT / "assets" / name
        if not source_dir.is_dir():
            raise SystemExit(f"Required preview asset directory missing: assets/{name}")
        shutil.copytree(source_dir, OUT / "assets" / name)
    subprocess.run([sys.executable, str(ROOT / "scripts" / "apply-audio-preview-overrides.py"), str(OUT / "assets")], cwd=ROOT, check=True)
    subprocess.run([sys.executable, str(ROOT / "scripts" / "sanitize-public-preview-data.py"), str(OUT / "assets")], cwd=ROOT, check=True)
for name in PUBLIC_REVIEW_DATA_FILES:
    copy_file(f"assets/{name}")
# Strip supplier names and internal procurement fields before publishing the
# explicitly review-only customer-view data assets.
subprocess.run([sys.executable, str(ROOT / "scripts" / "sanitize-public-preview-data.py"), str(OUT / "assets")], cwd=ROOT, check=True)

# Fail the build if the owner review data is missing, exposes supplier identity,
# or accidentally carries a price/stock value into the customer-view package.
review_files = [("audio-catalogue-secondary-preview.json", 72)]
for filename, expected_minimum in review_files:
    review_path = OUT / "assets" / filename
    review_data = json.loads(review_path.read_text(encoding="utf-8"))
    records = review_data.get("records", review_data.get("products", []))
    count_invalid = len(records) < expected_minimum
    if count_invalid:
        raise SystemExit(f"Review catalogue count mismatch in public package: {filename} records={len(records)} expected={expected_minimum}")
    serialised = json.dumps(review_data, ensure_ascii=False)
    customer_visible_text = re.sub(r"https?://\S+", "[image-asset-url]", serialised, flags=re.I)
    forbidden_suppliers = r"Electrocity"
    if re.search(forbidden_suppliers, customer_visible_text, re.I):
        raise SystemExit(f"Supplier identity leaked into public review text: {filename}")
    for record in records:
        if record.get("indicativePrice") is not None or record.get("hasStock") is not None:
            raise SystemExit(f"Review data must remain POR/availability-unconfirmed: {filename} {record.get('id')}")
print("PUBLIC_REVIEW_DATA_POLICY_PASS audio>=72 preview_only price=POR stock=unconfirmed")

for name in REQUIRED_ASSET_FILES:
    copy_file(f"assets/{name}")

# Legacy product-image libraries are intentionally excluded from the public package.
# They remain in the private review scope until every image is mapped to an approved audio SKU.

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


if include_preview:
    for name in PREVIEW_ROOT_FILES:
        if not (OUT / name).is_file():
            raise SystemExit(f"Preview package missing route: {name}")
    for name in PREVIEW_ASSET_FILES:
        if not (OUT / "assets" / name).is_file():
            raise SystemExit(f"Preview package missing catalogue data: assets/{name}")
    for name in PREVIEW_ASSET_DIRS:
        if not (OUT / "assets" / name).is_dir():
            raise SystemExit(f"Preview package missing asset directory: assets/{name}")
    for test in ["pricing-display-policy.test.cjs", "audio-catalogue-preview.test.cjs", "audio-only-storefront-scope.test.cjs"]:
        subprocess.run([node, str(ROOT / "tests" / test)], cwd=ROOT, check=True)
    subprocess.run([node, str(ROOT / "tests" / "public-preview-data-sanitization.test.cjs")], cwd=ROOT, check=True)
    print("PAGES_PREVIEW_ROUTES_INCLUDED " + " ".join(PREVIEW_ROOT_FILES))
    print("AUDIO_ONLY_PREVIEW_ASSETS_PASS non_audio_catalogue=excluded")
else:
    leaked_preview = [name for name in PREVIEW_ROOT_FILES if (OUT / name).exists()]
    if leaked_preview:
        raise SystemExit(f"Preview-only routes leaked into standard package: {leaked_preview}")
    print("PAGES_PREVIEW_ROUTES_EXCLUDED_PASS")

print(f"PAGES_PUBLIC_BUILD_PASS files={len(relative_paths)} unclassified_legacy_images_excluded=true")
print("PAGES_PUBLIC_EXCLUDES_PASS suppliers catalogue-review catalogue-source catalogue-audits staging supabase .github")
if include_preview:
    # Public, non-sensitive proof that the exact structural regression suite ran
    # before this owner-preview package was emitted.
    qa_marker = {
        "result": "PASS",
        "test": "tests/audio-only-storefront-scope.test.cjs",
        "commit": os.environ.get("CF_PAGES_COMMIT_SHA") or os.environ.get("GITHUB_SHA"),
        "branch": os.environ.get("CF_PAGES_BRANCH"),
        "preview_only": True,
    }
    (OUT / "qa-build-result.json").write_text(json.dumps(qa_marker, indent=2) + "\n", encoding="utf-8")
    print("PAGES_STOREFRONT_REGRESSION_PASS")

