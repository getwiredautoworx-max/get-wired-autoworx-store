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
assert.deepEqual(missingBrand, [], 'Every OneNav audit row must retain its customer-facing parent brand');
const evolution = bySku.get('ON115-3LX');
assert.equal(evolution.customer_brand_display, 'OneNav');
assert.match(evolution.customer_description, /OneNav Evolution/);
assert.match(evolution.official_manufacturer_product_page, /onenav-9-inch-for-isuzu-rba-rbb/);
assert.match(evolution.image_status, /image pending/i,
  'ON115-3LX has no official image asset; do not add a substitute');

const coveragePath = 'catalogue-review/onenav-uncovered-storefront-card-reconciliation-2026-11-06.csv';
const coverageParsed = parseCsv(fs.readFileSync(coveragePath, 'utf8'));
const coverageHeaders = coverageParsed[0];
const coverage = coverageParsed.slice(1).filter(row => row.some(value => value !== '')).map(values => {
  const record = {};
  coverageHeaders.forEach((header, index) => { record[header] = values[index] || ''; });
  return record;
});
assert.equal(coverage.length, 19, 'All 19 uncovered storefront titles must remain reconciled');
assert.ok(coverage.every(row => row.exact_source_title_match === 'YES'), 'Every uncovered title must link to an exact source title');
assert.ok(coverage.every(row => row.source_row_candidates && row.supplier_sku_candidates), 'Every uncovered title must retain source row and supplier SKU references');
assert.ok(coverage.every(row => row.import_status === 'DO NOT IMPORT'), 'Coverage reconciliation must not approve imports');
assert.equal(coverage.filter(row => row.model_identity_status.startsWith('AMBIGUOUS')).length, 1,
  'The ON019 same-title/two-SKU exception must remain explicit');
const officialExactSkus = coverage
  .filter(row => row.manufacturer_match_status.startsWith('OFFICIAL_MANUFACTURER_SITE_EXACT_SKU_AND_TITLE')
    || row.manufacturer_match_status.startsWith('OFFICIAL_ONENAV_PRODUCT_PAGE_EXACT_SKU_AND_TITLE')
    || row.manufacturer_match_status.startsWith('OFFICIAL_MANUFACTURER_CATALOGUE_EXACT_SKU_FITMENT'))
  .map(row => row.supplier_sku_candidates).sort();
assert.deepEqual(officialExactSkus, ['OA-5263BT', 'ON016-2LX', 'ON413-1A10', 'ON425-1LX'],
  'Only independently verified official manufacturer SKU/title or catalogue-code matches may be marked exact');

console.log('ONENAV_AUDIT_INTEGRITY_PASS', JSON.stringify({
  auditRows: records.length,
  uniqueAuditSkus: bySku.size,
  individualProductPages: 42,
  categoryFitments: 3,
  detailsVerifiedImagePending: statusCounts.DETAILS_VERIFIED_IMAGE_PENDING,
  ownerPreviewCandidates: statusCounts.OWNER_PREVIEW_CANDIDATE_ONLY,
  imageCandidates: imageRows.length,
  imageGaps: 38,
  uncoveredStorefrontTitles: coverage.length,
  sourceSkuRowsForUncoveredTitles: 20,
  officialExactMatchesInUncoveredSet: officialExactSkus.length,
  officialExactSupplierSkus: officialExactSkus,
  officialExactSupplierSkus: officialExactSkus,
  ambiguousSameTitleGroups: 1
}));
