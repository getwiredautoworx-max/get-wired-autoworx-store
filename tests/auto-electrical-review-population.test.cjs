const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const file = path.join(__dirname, '..', 'catalogue-review', 'auto-electrical', 'auto-electrical-storefront-review-only.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

assert.equal(data.status, 'REVIEW ONLY — DO NOT IMPORT — NOT CUSTOMER-PUBLISHED');
assert.equal(data.sourceRows, 978);
assert.equal(data.autoElectricalRows, 761);
assert.deepEqual(data.categoryCounts, {
  'Automotive Globes': 158,
  'Automotive Sensors': 106,
  'Automotive Switches': 368,
  'Fuel Pumps': 129,
});
assert.equal(data.products.length, 761);
const skus = new Set();
for (const p of data.products) {
  assert.ok(p.supplierSku, 'missing internal supplier SKU');
  assert.ok(p.proposedGwSku, 'missing proposed internal GW SKU');
  assert.ok(!skus.has(p.supplierSku), 'duplicate supplier SKU: ' + p.supplierSku);
  skus.add(p.supplierSku);
  assert.ok(['Automotive Sensors', 'Automotive Switches', 'Automotive Globes', 'Fuel Pumps'].includes(p.category));
  assert.equal(p.price, null);
  assert.equal(p.priceDisplay, 'Price On Request due to Limited Stock and Availability');
  assert.equal(p.stock, null);
  assert.equal(p.description, null);
  assert.equal(p.image, null);
  assert.equal(p.importStatus, 'DO_NOT_IMPORT_REVIEW_ONLY');
}
assert.equal(skus.size, 761);
assert.equal(data.rules.noLiveWrites, true);
console.log('PASS: 761 Auto Electrical ASC review rows; category counts, uniqueness, quote-only rule and DO NOT IMPORT gates verified.');
