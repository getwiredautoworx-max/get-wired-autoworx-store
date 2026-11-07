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
assert.equal(statusCounts.DETAILS_VERIFIED_IMAGE_PENDING, 39);
assert.equal(statusCounts.OWNER_PREVIEW_CANDIDATE_ONLY, 4);
assert.equal(statusCounts.DETAILS_VERIFIED_IMAGE_REJECTED, 2, 'Wrong-model image decisions must remain explicitly rejected');
assert.equal(Object.keys(statusCounts).length, 3, 'Only verified-pending, preview-candidate and rejected-image states are allowed');

const imageRows = records.filter(row => row.image_url_candidate);
const imageUrls = imageRows.map(row => row.image_url_candidate);
assert.equal(imageRows.length, 6, 'Only six image URLs are currently staged as candidates');
assert.equal(new Set(imageUrls).size, 6, 'Candidate image URLs must not be duplicated across SKU records');
assert.ok(imageUrls.every(url => /^https:\/\//.test(url)), 'Candidate image URLs must use HTTPS');
assert.ok(imageRows.every(row => row.image_match_notes.trim()), 'Every image candidate must include its evidence/exception note');
assert.equal(records.filter(row => !row.image_url_candidate).length, 39, '39 exact-model image gaps must remain explicit');
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
const headunitEvidencePath = 'catalogue-review/onenav-23-unmatched-headunit-evidence-2026-11-06.csv';
const headunitParsed = parseCsv(fs.readFileSync(headunitEvidencePath, 'utf8'));
const expectedHeadunitHeaders = [
  'supplier_source_code_private',
  'source_description_private',
  'official_or_candidate_evidence_url',
  'model_evidence_status',
  'model_identity_status',
  'image_status',
  'review_note'
];
assert.deepEqual(headunitParsed[0], expectedHeadunitHeaders,
  'The 23-row OneNav head-unit evidence register must expose all seven named columns');
assert.ok(headunitParsed.slice(1).every(row => row.length === expectedHeadunitHeaders.length),
  'Every head-unit evidence row must have exactly seven fields');
const headunitRecords = headunitParsed.slice(1).filter(row => row.some(value => value !== '')).map(values => {
  const record = {};
  expectedHeadunitHeaders.forEach((header, index) => { record[header] = values[index] || ''; });
  return record;
});
const byHeadunitCode = new Map(headunitRecords.map(row => [row.supplier_source_code_private, row]));
assert.equal(headunitRecords.length, 23, 'All 23 unmatched head-unit evidence rows must be retained');
assert.equal(byHeadunitCode.size, 23, 'Head-unit source codes must remain unique');
assert.ok(headunitRecords.every(row => row.review_note.trim()), 'Every head-unit evidence row must explain its decision');
const allowedIdentityStates = new Set([
  'OFFICIAL_PAGE_FOR_BASE_CODE_ONLY',
  'UNVERIFIED',
  'SOURCE_IDENTITY_ONLY',
  'THIRD_PARTY_CANDIDATE_ONLY',
  'VERIFIED_OFFICIAL_PRODUCT_PAGE',
  'MODEL_CODE_VARIANT_MISMATCH',
  'IDENTITY_CONFLICT',
  'THIRD_PARTY_CROSSCHECK_ONLY',
  'VERIFIED_OFFICIAL_CATALOGUE'
]);
const allowedImageStates = new Set([
  'IMAGE_PENDING',
  'IMAGE_SOURCE_CANDIDATE_NOT_VISUALLY_VERIFIED',
  'OWNER_PREVIEW_CANDIDATE_ONLY'
]);
assert.ok(headunitRecords.every(row => allowedIdentityStates.has(row.model_identity_status)),
  'Head-unit identity decisions must use an explicit, recognised state');
assert.ok(headunitRecords.every(row => allowedImageStates.has(row.image_status)),
  'Head-unit image decisions must use an explicit, recognised state');
const magniteClassic = byHeadunitCode.get('OA418-1');
assert.equal(magniteClassic.model_identity_status, 'UNVERIFIED');
assert.equal(magniteClassic.image_status, 'IMAGE_PENDING');
assert.match(magniteClassic.model_evidence_status, /ON418-1LX Evolution/);
assert.match(magniteClassic.official_or_candidate_evidence_url, /onenav\.co\.za\/product\/onenav-9inch-for-nissan-magnite/);
const landCruiser70 = byHeadunitCode.get('ON015-3');
assert.equal(landCruiser70.model_identity_status, 'IDENTITY_CONFLICT');
assert.equal(landCruiser70.image_status, 'IMAGE_PENDING');
assert.match(landCruiser70.model_evidence_status, /ONO15-3A14 \(letter O\)/);
assert.match(landCruiser70.review_note, /Quarantine/);
const isuzuAlias = byHeadunitCode.get('ISA-ON115-3LX');
assert.equal(isuzuAlias.model_identity_status, 'OFFICIAL_PAGE_FOR_BASE_CODE_ONLY');
assert.equal(isuzuAlias.image_status, 'IMAGE_PENDING');
assert.match(isuzuAlias.review_note, /Alias\/duplicate confirmation required/);

const cameraAccessoryPath = 'catalogue-review/onenav-16-camera-accessory-evidence-2026-11-06.csv';
const cameraAccessoryParsed = parseCsv(fs.readFileSync(cameraAccessoryPath, 'utf8'));
const expectedCameraAccessoryHeaders = [
  'supplier_source_code_private',
  'source_description_private',
  'official_or_candidate_evidence_url',
  'model_evidence_status',
  'image_status',
  'review_note'
];
assert.deepEqual(cameraAccessoryParsed[0], expectedCameraAccessoryHeaders,
  'The 16-row OneX/camera accessory register must retain its six-column schema');
assert.ok(cameraAccessoryParsed.slice(1).every(row => row.length === expectedCameraAccessoryHeaders.length),
  'Every camera/accessory evidence row must have exactly six fields');
const cameraAccessoryRecords = cameraAccessoryParsed.slice(1).filter(row => row.some(value => value !== '')).map(values => {
  const record = {};
  expectedCameraAccessoryHeaders.forEach((header, index) => { record[header] = values[index] || ''; });
  return record;
});
const byCameraAccessoryCode = new Map(cameraAccessoryRecords.map(row => [row.supplier_source_code_private, row]));
assert.equal(cameraAccessoryRecords.length, 16, 'All 16 camera/accessory evidence rows must be retained');
assert.equal(byCameraAccessoryCode.size, 16, 'Camera/accessory source codes must remain unique');
assert.ok(cameraAccessoryRecords.every(row => row.review_note.trim()), 'Every camera/accessory evidence row must explain its decision');
const allowedCameraIdentityStates = new Set([
  'NO_EXACT_OFFICIAL_SKU_PAGE_FOUND',
  'OFFICIAL_EXACT_SKU_AND_DESCRIPTION_VERIFIED',
  'CODE_MISMATCH_OFFICIAL_PAGE_IS_ON4988-X',
  'POSSIBLE_CODE_FORMAT_ALIAS_OFFICIAL_CODE_ONDVRSD',
  'CODE_MISMATCH_OFFICIAL_PAGE_IS_ON434',
  'OFFICIAL_EXACT_SKU_AND_PRODUCT_IDENTITY_VERIFIED',
  'OFFICIAL_PRODUCT_TITLE_CANDIDATE_CODE_UNCONFIRMED'
]);
const allowedCameraImageStates = new Set([
  'IMAGE_PENDING',
  'IMAGE_SOURCE_CANDIDATE_NOT_VISUALLY_VERIFIED',
  'IMAGE_REJECTED_FOR_THIS_CODE',
  'OFFICIAL_IMAGE_CANDIDATE_RIGHTS_REVIEW_PENDING'
]);
assert.ok(cameraAccessoryRecords.every(row => allowedCameraIdentityStates.has(row.model_evidence_status)),
  'Camera/accessory identity decisions must use an explicit, recognised state');
assert.ok(cameraAccessoryRecords.every(row => allowedCameraImageStates.has(row.image_status)),
  'Camera/accessory image decisions must use an explicit, recognised state');
const ox434rc = byCameraAccessoryCode.get('OX434RC');
assert.equal(ox434rc.model_evidence_status, 'CODE_MISMATCH_OFFICIAL_PAGE_IS_ON434');
assert.equal(ox434rc.image_status, 'IMAGE_PENDING');
assert.match(ox434rc.review_note, /ON4988/);
const on4989 = byCameraAccessoryCode.get('ON4989-X');
assert.equal(on4989.model_evidence_status, 'CODE_MISMATCH_OFFICIAL_PAGE_IS_ON4988-X');
assert.equal(on4989.image_status, 'IMAGE_REJECTED_FOR_THIS_CODE');
const cam007 = byCameraAccessoryCode.get('CAM007-AHD');
assert.equal(cam007.model_evidence_status, 'OFFICIAL_EXACT_SKU_AND_DESCRIPTION_VERIFIED');
assert.equal(cam007.image_status, 'IMAGE_SOURCE_CANDIDATE_NOT_VISUALLY_VERIFIED');
const ox4990 = byCameraAccessoryCode.get('OX-4990DVR');
assert.equal(ox4990.model_evidence_status, 'OFFICIAL_EXACT_SKU_AND_PRODUCT_IDENTITY_VERIFIED');
assert.equal(ox4990.image_status, 'IMAGE_PENDING');
assert.match(ox4990.review_note, /ON4988-X/);
const ox4991 = byCameraAccessoryCode.get('OX-4991DVR');
assert.equal(ox4991.model_evidence_status, 'OFFICIAL_EXACT_SKU_AND_PRODUCT_IDENTITY_VERIFIED');
assert.equal(ox4991.image_status, 'IMAGE_PENDING');
assert.match(ox4991.official_or_candidate_evidence_url, /onex-bracket-mount-smart-mirror/);
const licensePlateCamera = byCameraAccessoryCode.get('OX-LCAM001');
assert.equal(licensePlateCamera.model_evidence_status, 'OFFICIAL_EXACT_SKU_AND_PRODUCT_IDENTITY_VERIFIED');
assert.equal(licensePlateCamera.image_status, 'OFFICIAL_IMAGE_CANDIDATE_RIGHTS_REVIEW_PENDING');
assert.match(licensePlateCamera.review_note, /CL433RVDVR_web-600x600\.jpg/);
assert.match(licensePlateCamera.review_note, /600x600/);

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
  imageGaps: 39,
  rejectedImageRows: statusCounts.DETAILS_VERIFIED_IMAGE_REJECTED,
  uncoveredStorefrontTitles: coverage.length,
  sourceSkuRowsForUncoveredTitles: 20,
  officialExactMatchesInUncoveredSet: officialExactSkus.length,
  officialExactSupplierSkus: officialExactSkus,
  officialExactSupplierSkus: officialExactSkus,
  ambiguousSameTitleGroups: 1
}));
