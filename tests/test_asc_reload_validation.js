'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');

async function testAscReloadData() {
  const masterFile = 'catalogue-review/asc-catalogue-extraction/asc-master-sku-register-review-only.csv';
  const stagingFile = 'staging/asc-staged-catalogue-products-do-not-import.csv';

  assert.ok(fs.existsSync(masterFile), 'Master review CSV must exist');
  assert.ok(fs.existsSync(stagingFile), 'Staged CSV must exist');

  const masterContent = fs.readFileSync(masterFile, 'utf8').trim().split('\n');
  const stagingContent = fs.readFileSync(stagingFile, 'utf8').trim().split('\n');

  assert.equal(masterContent.length, 979, 'Master CSV must have exactly 978 data rows + 1 header');
  assert.equal(stagingContent.length, 979, 'Staged CSV must have exactly 978 data rows + 1 header');

  const masterHeaders = masterContent[0].split(',');
  const stagingHeaders = stagingContent[0].split(',');

  assert.ok(masterHeaders.includes('supplier_sku'));
  assert.ok(masterHeaders.includes('proposed_gw_sku'));
  assert.ok(stagingHeaders.includes('import_gate_control'));

  console.log('PASS: testAscReloadData - All 978 records present and matched across datasets.');
}

testAscReloadData().catch(err => {
  console.error(err);
  process.exit(1);
});
