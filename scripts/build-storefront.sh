#!/usr/bin/env bash
set -euo pipefail

out="\${1:-dist}"
rm -rf "$out"
mkdir -p "$out/assets"

# Explicit runtime allowlist: never copy supplier files, repository docs, SQL exports,
# the old JPG library, or legacy checkout/UI overlays into a website release.
cp index.html store.html index-new.html product.html products.html checkout.html checkout-v2.html category.html returns-refunds.html terms-and-conditions.html product-details.js category-navigation.js robots.txt VERSION.txt "$out/"
cp admin.html "$out/admin.html"
cp assets/gw-logo.png assets/product-image-fallback.js assets/category-cleanup.js assets/progressive-store-enhancements.js assets/product-placeholder.svg assets/category-tree.json assets/admin.js "$out/assets/"
cp -a assets/products_webp "$out/assets/"

for required in index.html store.html index-new.html product.html products.html checkout.html checkout-v2.html category.html returns-refunds.html terms-and-conditions.html product-details.js category-navigation.js robots.txt VERSION.txt admin.html assets/admin.js assets/product-placeholder.svg assets/category-tree.json; do
  test -s "$out/$required" || { echo "Missing required runtime file: $required" >&2; exit 1; }
done
test -d "$out/assets/products_webp"
test "$(find "$out/assets/products_webp" -type f -name '*.webp' | wc -l | tr -d ' ')" -gt 0
if grep -R -F "assets/product-image-pending.svg" "$out" >/dev/null; then
  echo "Broken product-image-pending.svg reference remains in release output." >&2
  exit 1
fi
if find "$out" -name 'store-enhancements.js' -o -name 'ui-fixes.js' | grep -q .; then
  echo "Legacy checkout/UI overlay must not be included in the release." >&2
  exit 1
fi
echo "Runtime file count: $(find "$out" -type f | wc -l | tr -d ' ')"
echo "WebP product image count: $(find "$out/assets/products_webp" -type f -name '*.webp' | wc -l | tr -d ' ')"
du -sh "$out"
