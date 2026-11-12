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
const toyota280Classic = bySku.get('OA009-1');
assert.equal(toyota280Classic.enrichment_status, 'DETAILS_VERIFIED_IMAGE_PENDING');
assert.equal(toyota280Classic.image_url_candidate, '',
  'Do not attach the similarly named Pro Series CANBUS image to Classic OA009-1 W/O CANBUS');
assert.match(toyota280Classic.image_match_notes, /ON009-2A11-Toyota-280mm-with-Canbus\.png/);
assert.match(toyota280Classic.image_match_notes, /different Pro Series CANBUS variant.*not this Classic W\/O CANBUS SKU/i);
assert.match(toyota280Classic.official_manufacturer_product_page, /onenav-classic-9inch-for-toyota-280mm/);
assert.match(toyota280Classic.image_match_notes, /OA1409-CPAA/);
assert.match(toyota280Classic.image_match_notes, /HTTP 403/i);
const pradoClassic = bySku.get('OA014-1');
assert.equal(pradoClassic.enrichment_status, 'OWNER_PREVIEW_CANDIDATE_ONLY');
assert.equal(pradoClassic.image_url_candidate, 'https://the4x4store.co.za/cdn/shop/files/WhatsAppImage2023-10-11at08.12.48_923d2720_5000x.jpg?v=1697005542');
assert.match(pradoClassic.official_manufacturer_product_page, /onenav-classic-9inch-for-prado-2002-2009/);
assert.match(pradoClassic.image_match_notes, /OA014-1.*Prado.*rights.*not documented/i);
assert.doesNotMatch(pradoClassic.image_match_notes, /owner-authorised/i);
const oa014Review = JSON.parse(fs.readFileSync('catalogue-review/onenav-oa014-1-enrichment-2026-11-12.json', 'utf8'));
assert.equal(oa014Review.review_status, 'DO NOT IMPORT');
assert.equal(oa014Review.source_record.sheet, 'Products');
assert.equal(oa014Review.source_record.row, 39);
assert.equal(oa014Review.manufacturer_model_code, 'OA014-1');
assert.equal(oa014Review.manufacturer_evidence.exact_sku_visible, true);
assert.equal(oa014Review.customer_content.description_status, 'MANUFACTURER_VERIFIED_PARAPHRASED');
assert.equal(oa014Review.image.url, null, 'Retailer-hosted image with undocumented rights must be withheld');
assert.equal(oa014Review.image.status, 'IMAGE_RIGHTS_REVIEW_PENDING');
assert.equal(oa014Review.image.approved, false);
assert.equal(oa014Review.image.candidate.status, 'EXACT_MODEL_IMAGE_MATCH_RIGHTS_UNVERIFIED');
assert.equal(oa014Review.pricing.customer_display, 'Price On Request');
assert.equal(oa014Review.pricing.numeric_price, null);
assert.equal(oa014Review.stock.stock_status, null);
assert.equal(oa014Review.proposed_gw_sku, null);
assert.equal(oa014Review.import_status, 'DO NOT IMPORT');
assert.doesNotMatch(oa014Review.customer_content.customer_description, /Planetworld|the4x4store|OA014-1/i);
const overrides = JSON.parse(fs.readFileSync('assets/audio-product-enrichment-overrides.json', 'utf8'));
const pradoOverride = overrides.records.find(row => row.id === 'pw-2120');
assert.ok(pradoOverride, 'OneNav Prado preview override must remain identifiable by internal record ID');
assert.equal(pradoOverride.imageUrl, null, 'The unapproved retailer image must not enter the owner-preview package');
assert.equal(pradoOverride.imageStatus, 'IMAGE_RIGHTS_REVIEW_PENDING');
assert.match(pradoOverride.imageReviewNote, /provenance and reuse permission are not documented/i);
assert.equal(pradoOverride.priceOnRequestText, 'Price On Request');
assert.equal(pradoOverride.indicativePrice, null);
assert.equal(pradoOverride.hasStock, null);
assert.equal(pradoOverride.modelNumber, null);
const oa009Review = JSON.parse(fs.readFileSync('catalogue-review/onenav-oa009-1-enrichment-2026-11-11.json', 'utf8'));
assert.equal(oa009Review.review_status, 'DO NOT IMPORT');
assert.equal(oa009Review.source_record.sheet, 'Products');
assert.equal(oa009Review.source_record.row, 34);
assert.equal(oa009Review.manufacturer_model_code, 'OA009-1');
assert.equal(oa009Review.manufacturer_evidence.exact_sku_visible, true);
assert.equal(oa009Review.manufacturer_evidence.status, 'VERIFIED_EXACT_SKU_AND_CORE_SPECIFICATIONS');
assert.equal(oa009Review.variant.canbus, 'W/O CANBUS');
assert.equal(oa009Review.variant.manufacturer_status, 'NOT_EXPLICITLY_STATED_ON_EXACT_PRODUCT_PAGE');
assert.match(oa009Review.customer_content.customer_description, /1024 × 600/);
assert.match(oa009Review.customer_content.customer_description, /4 × 40 W maximum/);
assert.match(oa009Review.customer_content.customer_description, /wired Apple CarPlay and Android Auto/);
assert.doesNotMatch(oa009Review.customer_content.customer_description, /wireless|Wi-Fi|GPS|offline maps|RMS/i,
  'Do not transfer unsupported wireless/navigation features or convert maximum output to RMS');
assert.equal(oa009Review.proposed_gw_sku, null);
assert.equal(oa009Review.image.url, null);
assert.equal(oa009Review.image.approved, false);
assert.equal(oa009Review.image.status, 'IMAGE_PENDING');
assert.ok(oa009Review.image.rejected_candidates.some(x => x.model === 'ON009-2A11'
  && x.status === 'REJECTED_WRONG_SERIES_AND_CANBUS_VARIANT'));
assert.ok(oa009Review.image.rejected_candidates.some(x => x.model === 'OA1409-CPAA'
  && x.status === 'REJECTED_WRONG_MODEL_AND_FITMENT'));
assert.equal(oa009Review.pricing.customer_display, 'Price On Request');
assert.equal(oa009Review.pricing.numeric_price, null);
assert.equal(oa009Review.stock.stock_status, null);
assert.equal(oa009Review.import_status, 'DO NOT IMPORT');
assert.doesNotMatch(JSON.stringify(oa009Review.customer_content), /Planetworld|one-price-list|OA009-1/i,
  'Supplier/source identifiers must not leak into customer-facing content');
const fortunerClassic = bySku.get('OA017-1');
assert.equal(fortunerClassic.enrichment_status, 'DETAILS_VERIFIED_IMAGE_PENDING');
assert.equal(fortunerClassic.image_url_candidate, '',
  'Do not use the same-fitment Evolution image for Classic OA017-1');
assert.match(fortunerClassic.image_match_notes, /OneNav-Fortuner-Dash-2-1\.png/);
assert.match(fortunerClassic.image_match_notes, /SKU ON017-1A.*not OA017-1 Classic/i);
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
assert.equal(coverage.length, 18, 'All 18 distinct uncovered storefront titles must remain reconciled');
const uncoveredSourceSkuCount = coverage.reduce((total, row) =>
  total + row.supplier_sku_candidates.split(';').filter(Boolean).length, 0);
assert.equal(uncoveredSourceSkuCount, 19,
  'The 18 uncovered storefront titles must account for all 19 source SKU rows, including the two-code ON019 title group');
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
  'review_note',
  'verified_manufacturer_product_title',
  'customer_description',
  'image_url_candidate',
  'image_source_page',
  'image_crop',
  'image_position'
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
  'OWNER_PREVIEW_CANDIDATE_ONLY',
  'OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH',
  'EXACT_SOURCE_CATALOGUE_IMAGE_VERIFIED_CROP_PENDING'
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
const on016Headunit = byHeadunitCode.get('ON016-2LX');
assert.ok(on016Headunit, 'exact ON016-2LX head-unit source row must remain present');
assert.equal(on016Headunit.model_identity_status, 'VERIFIED_OFFICIAL_PRODUCT_PAGE');
assert.equal(on016Headunit.image_status, 'IMAGE_PENDING');
assert.match(on016Headunit.model_evidence_status, /title says 10\.1-inch.*Specifications say 10-inch/i);
assert.doesNotMatch(on016Headunit.customer_description, /10\.1-inch|10-inch/i,
  'customer description must omit the unresolved screen diagonal');
assert.equal(on016Headunit.image_url_candidate, '');
assert.equal(on016Headunit.image_source_page, '');

const on016ReviewPath = 'catalogue-review/onenav-on016-2lx-enrichment-2026-11-09.json';
const on016Review = JSON.parse(fs.readFileSync(on016ReviewPath, 'utf8'));
assert.equal(on016Review.review_status, 'DO NOT IMPORT');
assert.equal(on016Review.manufacturer_model_code, 'ON016-2LX');
assert.equal(on016Review.vehicle_fitment.status, 'MANUFACTURER_PAGE_CONFIRMED');
assert.equal(on016Review.manufacturer_evidence.status, 'VERIFIED_EXACT_SKU_AND_FITMENT');
assert.equal(on016Review.screen_size.status, 'CONFLICT_UNRESOLVED');
assert.equal(on016Review.customer_content.description_status, 'MANUFACTURER_VERIFIED_WITH_CONFLICTING_SCREEN_SIZE_OMITTED');
assert.doesNotMatch(on016Review.customer_content.customer_title, /10\.1-inch|10-inch/i);
assert.doesNotMatch(on016Review.customer_content.customer_description, /10\.1-inch|10-inch/i);
const on016CustomerText = JSON.stringify(on016Review.customer_content);
assert.doesNotMatch(on016CustomerText, /ON016-2LX|Rivonia Car Sound|NXT Level Tech|one-price-list-2026-10-25\\.xlsx|supplier_sku_private/i,
  'customer-facing ON016 content must not expose internal supplier SKU, supplier names or source workbook metadata');
assert.equal(on016Review.proposed_gw_sku, null);
assert.equal(on016Review.pricing.customer_display, 'Price On Request');
assert.equal(on016Review.pricing.numeric_price, null);
assert.equal(on016Review.stock.status, 'UNCONFIRMED');
assert.equal(on016Review.stock.stock_status, null);
assert.equal(on016Review.image.status, 'IMAGE_PENDING');
assert.equal(on016Review.image.approved, false);
assert.equal(on016Review.image.url, null);
assert.equal(on016Review.image.candidates.length, 1);
assert.equal(on016Review.image.candidates[0].status, 'NOT_APPROVED');
assert.equal(on016Review.image.candidates[0].rights_status, 'UNVERIFIED');
assert.equal(on016Review.image.rejected_candidates[0].status, 'REJECTED_WRONG_MODEL_AND_FITMENT');
const magniteEvolution = byHeadunitCode.get('ON418-1LX');
const eclipseCrossEvolution = byHeadunitCode.get('ON425-1LX');
for (const row of [magniteEvolution, eclipseCrossEvolution]) {
  assert.ok(row, 'both additional official Evolution head-unit rows must remain present');
  assert.equal(row.model_identity_status, 'VERIFIED_OFFICIAL_PRODUCT_PAGE');
  assert.equal(row.image_status, 'OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH');
  assert.ok(row.customer_description.includes('Bluetooth 5.4') && row.customer_description.includes('4 × 45 W'));
  assert.equal(row.image_crop, 'false', 'square official images must be contained, not cropped');
  assert.equal(row.image_position, 'center');
}
assert.equal(magniteEvolution.image_url_candidate, 'https://onenav.co.za/wp-content/uploads/2025/03/Nissan-MAGNITE-ON418-1LX-600x600.png');
assert.equal(magniteEvolution.image_source_page, 'https://onenav.co.za/product/onenav-9inch-for-nissan-magnite-without-factory-camera-9-inch-2/');
assert.match(magniteEvolution.customer_description, /Nissan Magnite without a factory camera/);
assert.equal(eclipseCrossEvolution.image_url_candidate, 'https://onenav.co.za/wp-content/uploads/2025/03/Mitsubishi-ECLIPSE-CROSS-ON425-1LX-600x600.png');
assert.equal(eclipseCrossEvolution.image_source_page, 'https://onenav.co.za/product/onenav-mitsubishi-eclipse-cross-2018-2020-9-inch-a11/');
assert.match(eclipseCrossEvolution.customer_description, /Mitsubishi Eclipse Cross.*2018–2020/);
assert.notEqual(magniteEvolution.supplier_source_code_private, magniteClassic.supplier_source_code_private,
  'Evolution ON418-1LX must remain separate from unverified Classic OA418-1');
const clioA10 = byHeadunitCode.get('ON112-1A10');
const clioA11 = byHeadunitCode.get('ON112-1A11');
assert.equal(clioA10.model_identity_status, 'THIRD_PARTY_CROSSCHECK_ONLY');
assert.equal(clioA11.model_identity_status, 'THIRD_PARTY_CROSSCHECK_ONLY');
assert.equal(clioA10.image_status, 'IMAGE_PENDING');
assert.equal(clioA11.image_status, 'IMAGE_PENDING');
assert.match(clioA10.official_or_candidate_evidence_url, /no-display-a10/);
assert.match(clioA11.official_or_candidate_evidence_url, /no-display-a11/);
assert.match(clioA10.review_note, /do not transfer A11 specs or image/i);
assert.match(clioA11.review_note, /no A10 specs\/image transferred/i);

const pradoA11 = byHeadunitCode.get('ON014-1A11');
assert.equal(pradoA11.model_identity_status, 'THIRD_PARTY_CANDIDATE_ONLY');
assert.equal(pradoA11.image_status, 'IMAGE_PENDING');
assert.match(pradoA11.official_or_candidate_evidence_url, /onenav\.co\.za\/product-category\/onenav-evolution\/page\/3/);
assert.match(pradoA11.model_evidence_status, /category page does not display a SKU/i);
assert.match(pradoA11.review_note, /keep the exact supplier code third-party-only/i);

const fortunerA11 = byHeadunitCode.get('ON017-2A11');
assert.equal(fortunerA11.model_identity_status, 'MODEL_CODE_VARIANT_MISMATCH');
assert.equal(fortunerA11.image_status, 'IMAGE_PENDING');
assert.match(fortunerA11.model_evidence_status, /ON017-2A, not supplier ON017-2A11/);
assert.match(fortunerA11.review_note, /do not normalize the codes/i);

const corollaCrossA11 = byHeadunitCode.get('ON016-2LX');
assert.equal(corollaCrossA11.model_identity_status, 'VERIFIED_OFFICIAL_PRODUCT_PAGE');
assert.equal(corollaCrossA11.image_status, 'IMAGE_PENDING');
assert.match(corollaCrossA11.official_or_candidate_evidence_url, /onenav-10-1inch-for-corrola-cross-a11-2021/);
assert.match(corollaCrossA11.verified_manufacturer_product_title, /Corrola Cross A11/);
assert.match(corollaCrossA11.customer_description, /Toyota Corolla Cross A11 \(2021\+\)/);
assert.match(corollaCrossA11.customer_description, /Bluetooth 5\.4/);
assert.match(corollaCrossA11.customer_description, /4 × 45 W/);

const qashqaiXtrailA10 = byHeadunitCode.get('ON413-1A10');
assert.equal(qashqaiXtrailA10.model_identity_status, 'VERIFIED_OFFICIAL_CATALOGUE');
assert.equal(qashqaiXtrailA10.image_status, 'EXACT_SOURCE_CATALOGUE_IMAGE_VERIFIED_CROP_PENDING');
assert.match(qashqaiXtrailA10.model_evidence_status, /ON413-1A10.*Qashqai.*X-Trail.*10\.1-inch/i);
assert.match(qashqaiXtrailA10.verified_manufacturer_product_title, /Qashqai \/ X-Trail \(2015\+\)/);
assert.match(qashqaiXtrailA10.customer_description, /Android 10.*Bluetooth.*Wi-Fi.*OneConnect.*3-year warranty/i);
assert.equal(qashqaiXtrailA10.image_url_candidate, '',
  'Do not invent a direct image URL while the exact catalogue crop has not been extracted');
assert.match(qashqaiXtrailA10.image_source_page, /OneNav-Catalogue_Web\.pdf#page=13/);
assert.match(qashqaiXtrailA10.review_note, /crop extraction into a staging image asset remains pending/i);

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
assert.deepEqual(officialExactSkus, ['OA-5263BT', 'ON016-2LX', 'ON413-1A10'],
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
  uncoveredSourceSkuRows: uncoveredSourceSkuCount,
  sourceSkuRowsForUncoveredTitles: 19,
  officialExactMatchesInUncoveredSet: officialExactSkus.length,
  officialExactSupplierSkus: officialExactSkus,
  officialExactSupplierSkus: officialExactSkus,
  ambiguousSameTitleGroups: 1
}));
