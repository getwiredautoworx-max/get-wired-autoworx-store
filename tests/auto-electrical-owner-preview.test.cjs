const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const review = JSON.parse(fs.readFileSync(
  path.join(root, 'catalogue-review/auto-electrical/auto-electrical-storefront-review-only.json'),
  'utf8'
));
const preview = JSON.parse(fs.readFileSync(
  path.join(root, 'assets/auto-electrical-owner-preview.json'),
  'utf8'
));

assert.equal(review.products.length, 761);
assert.equal(review.products.filter(p => p.image).length, 34);
assert.equal(review.products.filter(p => p.fitment).length, 30);
assert.equal(review.products.filter(p => p.description).length, 0);
assert.equal(review.products.filter(p => !p.image).length, 727);

const sourceSkus = new Set();
for (const product of review.products) {
  assert.ok(product.supplierSku && !sourceSkus.has(product.supplierSku));
  sourceSkus.add(product.supplierSku);
  assert.equal(product.price, null);
  assert.equal(product.priceDisplay, 'Price On Request due to Limited Stock and Availability');
  assert.equal(product.stock, null);
  assert.equal(product.importStatus, 'DO_NOT_IMPORT_REVIEW_ONLY');
  if (product.image) {
    assert.ok(product.image.startsWith('assets/asc-auto-electrical-pilot/'));
    assert.ok(product.imageStatus.includes('EXACT_SOURCE_CARD_CROP_VERIFIED'));
  }
}
assert.equal(sourceSkus.size, 761);
assert.equal(review.rules.noLiveWrites, true);

assert.equal(preview.products.length, 34);
assert.equal(preview.summary.remainingAutoElectricalRecords, 727);
assert.equal(preview.summary.sourceVerifiedFitments, 30);
assert.deepEqual(preview.summary.categoryCounts, {
  'Automotive Sensors': 9,
  'Automotive Switches': 8,
  'Automotive Globes': 8,
  'Fuel Pumps': 9
});
assert.equal(preview.summary.priceDisplay, 'Price On Request due to Limited Stock and Availability');

const forbiddenKeys = /^(?:internalSupplier|supplierSku|proposedGwSku|sourceFile|sourcePage|sourceBranch|catalogueSection|dealerCost|price|stock|stockQuantity)$/i;
const imagePaths = new Set();
for (const product of preview.products) {
  for (const key of Object.keys(product)) assert.ok(!forbiddenKeys.test(key), 'Private field exposed: ' + key);
  assert.equal(product.priceDisplay, 'Price On Request due to Limited Stock and Availability');
  assert.equal(product.availabilityDisplay, 'Confirm current availability');
  assert.equal(product.description, null);
  assert.equal(product.technicalSpecifications, null);
  assert.ok(product.image.startsWith('assets/asc-auto-electrical-pilot/'));
  assert.ok(fs.existsSync(path.join(root, product.image)));
  assert.ok(!imagePaths.has(product.image), 'Duplicate pilot image path: ' + product.image);
  imagePaths.add(product.image);
}
assert.equal(imagePaths.size, 34);
assert.ok(!/supplier|supplierSku|internalSupplier|proposedGwSku|sourceFile|sourcePage|sourceBranch|catalogueSection|dealerCost|stockQuantity/i.test(JSON.stringify(preview)));

console.log('PASS: 761 review rows; 34 exact source-card images; 30 printed fitments; exact Price On Request and availability labels; sanitised 34-product owner preview; all records DO NOT IMPORT.');
