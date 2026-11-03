const fs = require('node:fs');
const assert = require('node:assert/strict');

const files = Object.fromEntries([
  'index-new.html',
  'product.html',
  'products.html',
  'preview-products.html',
  'preview-category.html',
].map(path => [path, fs.readFileSync(path, 'utf8')]));

const legacySources = "['September Buyer\\\\'s Guide','October Buyer\\\\'s Guide']";
assert.ok(files['index-new.html'].includes(legacySources), 'homepage product feed must exclude September/October Buyer Guides');
for (const path of ['product.html', 'products.html', 'preview-products.html']) {
  assert.ok(files[path].includes('isLegacyAscBuyerGuide'), path + ' must apply the legacy ASC source guard');
}
assert.ok(files['product.html'].includes('!p||isLegacyAscBuyerGuide(p)'), 'direct product detail must fail closed for old Buyer Guide rows');
assert.ok(files['products.html'].includes('.filter(p=>!isLegacyAscBuyerGuide(p))'), 'category product listing must filter old Buyer Guide rows');
assert.ok(files['preview-products.html'].includes('products=products.filter(p=>!isLegacyAscBuyerGuide(p))'), 'preview product listing must filter old Buyer Guide rows');
assert.ok(files['preview-category.html'].includes(legacySources), 'preview audio brand counts must exclude old Buyer Guide rows');
console.log('LEGACY_ASC_BUYER_GUIDE_GUARD_PASS: homepage, direct detail, category listing, preview listing and audio brand counts are protected.');
