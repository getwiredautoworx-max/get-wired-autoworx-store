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
let checked = 0;
for (const file of files) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const raw = JSON.stringify(data);
  assert.ok(!/Planetworld|Audio\\s+Connections/i.test(raw), file+' must not expose supplier identities');
  assert.ok(!/"(?:supplierName|supplierSku|supplierModelNumber|dealerCost|dealerPrice|wholesalePrice|internalSku|internalId|gwSku)"\\s*:/i.test(raw), file+' must not expose internal supplier or procurement fields');
  checked++;
}
assert.ok(checked >= 4, 'at least four public preview catalogue files must be sanitized');
console.log('PUBLIC_PREVIEW_DATA_SANITIZATION_PASS files='+checked);
