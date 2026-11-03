const fs = require('node:fs');
const assert = require('node:assert/strict');

const files = Object.fromEntries([
  'index-new.html',
  'product.html',
  'products.html',
  'preview-category.html',
  'preview-products.html',
  'preview-product.html',
  'preview-store.html',
  'checkout-v2.html',
  'supabase/functions/store-checkout/index.ts',
].map(path => [path, fs.readFileSync(path, 'utf8')]));

const legacySources = "['September Buyer\\'s Guide','October Buyer\\'s Guide']";
assert.ok(files['index-new.html'].includes(legacySources), 'homepage product feed must exclude old Buyer Guides');
assert.ok(files['product.html'].includes('!p||isLegacyAscBuyerGuide(p)'), 'direct product detail must fail closed for old Buyer Guide rows');
assert.ok(files['products.html'].includes('.filter(p=>!isLegacyAscBuyerGuide(p))'), 'category listing must filter old Buyer Guide rows');
assert.ok(files['preview-category.html'].includes(legacySources), 'preview audio brand counts must exclude old Buyer Guide rows');
assert.ok(files['checkout-v2.html'].includes('&active=eq.true'), 'browser checkout must reject inactive products');
assert.ok(files['supabase/functions/store-checkout/index.ts'].includes('productsUrl.searchParams.set("active", "eq.true")'), 'server checkout must reject inactive products');

const previewListing = files['preview-products.html'];
const listingStart = previewListing.indexOf('async function main(){');
const listingGuard = previewListing.indexOf('Fail closed: legacy active Supabase rows', listingStart);
const listingReturn = previewListing.indexOf('return;', listingGuard);
const firstListingQuery = previewListing.indexOf("apiAll('products?", listingStart);
assert.ok(listingGuard > listingStart && listingReturn > listingGuard && firstListingQuery > listingReturn,
  'preview product listing must stop before any legacy Supabase product query');

const previewDetail = files['preview-product.html'];
const detailStart = previewDetail.indexOf('async function main(){');
const detailGuard = previewDetail.indexOf('not yet been verified', detailStart);
const detailReturn = previewDetail.indexOf('return;', detailGuard);
const firstDetailQuery = previewDetail.indexOf("api('products?", detailStart);
assert.ok(detailGuard > detailStart && detailReturn > detailGuard && firstDetailQuery > detailReturn,
  'preview product detail must stop before any legacy Supabase product lookup');

for (const path of ['preview-store.html','preview-category.html','preview-products.html','preview-product.html']) {
  assert.ok(files[path].includes("SEPTEMBER/OCTOBER BUYER'S GUIDE ITEMS HIDDEN"), path + ' must state the exact legacy-source status');
  assert.ok(!files[path].includes('ASC STOCK REMOVED'), path + ' must not make a blanket ASC-removal claim');
}
console.log('LEGACY_ASC_BUYER_GUIDE_GUARD_PASS: homepage, detail, category, preview listing, preview detail and preview brand counts are protected.');
