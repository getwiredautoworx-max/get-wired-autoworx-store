'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(process.cwd(), 'pages-public', 'assets');
const files = [
  'audio-catalogue-primary-preview.json',
  'audio-catalogue-secondary-preview.json',
  'auto-electrical-owner-preview.json',
  'product-image-treatment-sample.json'
];

let checked = 0;
for (const file of files) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) continue;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let hasProductArray = false;
  for (const key of ['products', 'records']) {
    if (Array.isArray(data[key])) {
      hasProductArray = true;
      assert.equal(data[key].length, 0, file + ' must publish zero product/stock listings');
    }
  }
  assert.ok(hasProductArray, file + ' must expose an empty product-record array');
  const raw = JSON.stringify(data);
  const visibleText = raw.replace(/https?:\\/\\/[^\\s"'<>]+/gi, '[image-asset-url]');
  assert.ok(!/Planetworld|Audio\\s+Connections/i.test(visibleText), file + ' must not expose supplier identities in customer-visible text');
  assert.ok(!/"(?:supplierName|supplierSku|supplierModelNumber|dealerCost|dealerPrice|wholesalePrice|internalSku|internalId|gwSku)"\\s*:/i.test(raw), file + ' must not expose internal supplier or procurement fields');
  assert.ok(!/"(?:sourceSkuReferenceInternal|sourceSupplierWorkbook|sourceSupplierWorkbookSheet|sourceSupplierWorkbookRow|supplierSource)"\\s*:/i.test(raw), file + ' must not expose source workbook provenance or internal supplier references');
  assert.ok(!/"(?:imageSourceNote|imageSourceUrl)"\\s*:/i.test(raw), file + ' must not expose internal image-source provenance');
  checked++;
}
assert.equal(checked, 4, 'all four public product/review data assets must be present and empty');
console.log('PUBLIC_PREVIEW_STOCK_REMOVAL_PASS files=' + checked + ' product_records=0 supplier_identity=hidden');
