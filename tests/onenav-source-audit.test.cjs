'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');

function parseCsv(source) {
  const rows = [];
  let row = [], value = '', quoted = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quoted) {
      if (ch === '"' && source[i + 1] === '"') { value += '"'; i++; }
      else if (ch === '"') quoted = false;
      else value += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(value); value = ''; }
    else if (ch === '\n') { row.push(value.replace(/\r$/, '')); rows.push(row); row = []; value = ''; }
    else value += ch;
  }
  if (value.length || row.length) { row.push(value.replace(/\r$/, '')); rows.push(row); }
  if (rows.length) rows[0][0] = rows[0][0].replace(/^\uFEFF/, '');
  return rows;
}

const path = 'catalogue-review/planetworld-one-official-model-audit.csv';
const parsed = parseCsv(fs.readFileSync(path, 'utf8'));
const headers = parsed[0];
const records = parsed.slice(1).filter(row => row.some(value => value !== '')).map(values => {
  const record = {};
  headers.forEach((header, index) => { record[header] = values[index] || ''; });
  return record;
});
const bySku = new Map(records.map(row => [row.supplier_sku_reference_only, row]));

assert.equal(records.length, 45, 'OneNav audit must retain all 45 reviewed SKU/fitment records');
assert.equal(bySku.size, 45, 'OneNav audit must not contain duplicate supplier SKU references');
assert.ok(records.every(row => row.source_title_exact.trim()), 'Every row must retain the exact supplier source title');
assert.ok(records.every(row => /^https:\/\//.test(row.official_manufacturer_product_page)), 'Every row must retain its official product/category evidence URL');
assert.ok(records.every(row => row.model_match_status.includes(row.supplier_sku_reference_only)), 'Every model decision must explicitly identify its SKU');
assert.ok(records.every(row => row.customer_description.trim()), 'Every reviewed row must retain its customer-description draft');

const categoryRows = records.filter(row => row.model_match_status.startsWith('Official OneNav Classic category page lists'));
assert.equal(categoryRows.length, 3, 'Three fitments are supported by the official Classic category page');
assert.equal(records.length - categoryRows.length, 42, 'The other 42 rows must have individual product-page evidence');

const statusCounts = records.reduce((counts, row) => {
  counts[row.enrichment_status] = (counts[row.enrichment_status] || 0) + 1;
  return counts;
}, {});
assert.equal(statusCounts.DETAILS_VERIFIED_IMAGE_PENDING, 40);
assert.equal(statusCounts.OWNER_PREVIEW_CANDIDATE_ONLY, 5);
assert.equal(Object.keys(statusCounts).length, 2, 'No unrecognised or import-approved enrichment state is allowed');

const imageRows = records.filter(row => row.image_url_candidate);
const imageUrls = imageRows.map(row => row.image_url_candidate);
assert.equal(imageRows.length, 7, 'Only seven image URLs are currently staged as candidates');
assert.equal(new Set(imageUrls).size, 7, 'Candidate image URLs must not be duplicated across SKU records');
assert.ok(imageUrls.every(url => /^https:\/\//.test(url)), 'Candidate image URLs must use HTTPS');
assert.ok(imageRows.every(row => row.image_match_notes.trim()), 'Every image candidate must include its evidence/exception note');
assert.equal(records.filter(row => !row.image_url_candidate).length, 38, '38 exact-model image gaps must remain explicit');
assert.ok(records.every(row => row.enrichment_status !== 'APPROVED_FOR_IMPORT'), 'Review records must never be silently promoted to import');

const missingBrand = records.filter(row => !row.customer_brand_display.trim());
assert.deepEqual(missingBrand.map(row => row.supplier_sku_reference_only), ['ON115-3LX'],
  'Only the documented OneNav Evolution row may remain missing its parent-brand display');
const evolution = bySku.get('ON115-3LX');
assert.match(evolution.customer_description, /OneNav Evolution/);
assert.match(evolution.official_manufacturer_product_page, /onenav-9-inch-for-isuzu-rba-rbb/);
assert.match(evolution.image_status, /image pending/i,
  'ON115-3LX has no official image asset; do not add a substitute');

console.log('ONENAV_AUDIT_INTEGRITY_PASS', JSON.stringify({
  rows: records.length,
  uniqueSkus: bySku.size,
  individualProductPages: 42,
  categoryFitments: 3,
  detailsVerifiedImagePending: statusCounts.DETAILS_VERIFIED_IMAGE_PENDING,
  ownerPreviewCandidates: statusCounts.OWNER_PREVIEW_CANDIDATE_ONLY,
  imageCandidates: imageRows.length,
  imageGaps: 38,
  documentedBrandFieldException: 'ON115-3LX'
}));
