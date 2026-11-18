'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');

const auto = JSON.parse(fs.readFileSync('assets/auto-electrical-owner-preview.json', 'utf8'));
const records = auto.products;

assert.equal(records.length, 27, 'Auto Electrical owner preview must contain only the 27 eligible Electrocity review records');
assert.deepEqual(auto.summary.categoryCounts, { 'Ignition Modules': 24, 'Ignition Looms': 3 });
assert.equal(auto.summary.confirmedFitmentRecords, 3);
assert.equal(auto.summary.corroboratedFitmentRecords, 24);
assert.equal(auto.summary.excludedFromPreview, 2);
assert.equal(new Set(records.map(p => p.id)).size, 27, 'preview record IDs must be unique');
assert.equal(new Set(records.map(p => p.image)).size, 27, 'each preview record must have its own matching image');

for (const product of records) {
  assert.equal(product.publicationStatus, 'PREVIEW_ONLY_NOT_LIVE');
  assert.equal(product.priceDisplay, 'Price On Request');
  assert.equal(product.availabilityDisplay, 'Availability to confirm');
  assert.equal(product.indicativePrice, null);
  assert.equal(product.hasStock, null);
  assert.ok(product.image.startsWith('assets/auto-electrical-products/'), 'product image must use the approved local preview image directory');
  assert.ok(fs.existsSync(product.image), 'missing Electrocity preview image: ' + product.image);
  assert.ok(!Object.keys(product).some(key => /supplier|internal|gwSku/i.test(key)), 'internal supplier identifiers must not be exposed');
}
const publicData = JSON.stringify(records);
assert.doesNotMatch(publicData, /Electrocity|\bASC\b/i, 'supplier identity must not appear in customer-facing product data');

const previewPage = fs.readFileSync('preview-auto-electrical.html', 'utf8');
assert.match(previewPage, /auto-electrical-owner-preview\.json/);
assert.match(previewPage, /Price On Request/);
assert.match(previewPage, /Availability to confirm/);
assert.doesNotMatch(previewPage, /ASC Aerials|ASC Car Mats|product-image-treatment-sample/i);

const builder = fs.readFileSync('scripts/build-cloudflare-pages-public.py', 'utf8');
assert.ok(builder.includes('preview-auto-electrical.html'));
assert.ok(builder.includes('auto-electrical-owner-preview.json'));
assert.ok(builder.includes('auto-electrical-products'));
for (const stale of [
  'preview-asc-sample.html',
  'product-image-treatment-pilot.html',
  'product-image-treatment-sample.json',
  'get-wired-product-pilot',
]) assert.ok(!builder.includes(stale), 'public preview builder must not include retired ASC pilot asset: ' + stale);

for (const stalePath of [
  'preview-asc-sample.html',
  'product-image-treatment-pilot.html',
  'assets/product-image-treatment-sample.json',
  'assets/get-wired-product-pilot',
  'scripts/process-product-image-pilot.py',
  '.github/workflows/product-image-treatment-sample.yml',
]) assert.ok(!fs.existsSync(stalePath), 'retired ASC pilot file must remain removed: ' + stalePath);

console.log('PASS: 27 Electrocity Auto Electrical preview records; 24 modules, 3 looms; 2 excluded; 27 images; POR/availability-unconfirmed; no supplier identity; legacy ASC pilot removed.');
