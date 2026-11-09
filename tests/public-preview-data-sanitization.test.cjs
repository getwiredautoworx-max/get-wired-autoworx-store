'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(process.cwd(), 'pages-public', 'assets');
const files = [
  'audio-catalogue-primary-preview.json',
  'audio-catalogue-secondary-preview.json',
  'audio-model-verification-preview.json',
  'auto-electrical-owner-preview.json',
  'product-image-treatment-sample.json'
];
const primaryPath = path.join(root, 'audio-catalogue-primary-preview.json');
const primary = JSON.parse(fs.readFileSync(primaryPath, 'utf8'));
const oneNavPrado = primary.records.find(record => record.id === 'pw-2120');
assert.ok(oneNavPrado, 'verified OneNav Prado preview record must be present');
assert.equal(oneNavPrado.brand, 'OneNav');
assert.equal(oneNavPrado.imageStatus, 'owner_authorized_exact_retailer_image_verified_review_only');
assert.ok(oneNavPrado.imageUrl && oneNavPrado.description, 'OneNav Prado record must have its exact image and verified description');
assert.equal(oneNavPrado.modelNumber, undefined, 'internal supplier reference must not be exposed as a customer model number');
assert.equal(oneNavPrado.indicativePrice, null);
assert.equal(oneNavPrado.hasStock, null);
const bitDmi = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison bit DMI Digital MOST Interface');
assert.ok(bitDmi, 'verified Audison bit DMI preview record must be present');
assert.equal(bitDmi.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(bitDmi.imageUrl && bitDmi.description, 'Audison bit DMI must have exact official image and manufacturer description');
assert.equal(bitDmi.modelNumber, 'bit DMI', 'customer model label must not expose the supplier item code');
assert.equal(bitDmi.indicativePrice, null);
assert.equal(bitDmi.hasStock, null);

let checked = 0;
for (const file of files) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const raw = JSON.stringify(data);
  assert.ok(!/Planetworld|Audio\s+Connections/i.test(raw), file+' must not expose supplier identities');
  assert.ok(!/"(?:supplierName|supplierSku|supplierModelNumber|dealerCost|dealerPrice|wholesalePrice|internalSku|internalId|gwSku)"\s*:/i.test(raw), file+' must not expose internal supplier or procurement fields');
  checked++;
}
assert.ok(checked >= 4, 'at least four public preview catalogue files must be sanitized');
console.log('PUBLIC_PREVIEW_DATA_SANITIZATION_PASS files='+checked);
