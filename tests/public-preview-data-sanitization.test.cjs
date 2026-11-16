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

const forzaPreview = [
  ["AF M12.14 bit", "Audison Forza AF M12.14 bit 12-Channel Amplifier with 14-Channel DSP"],
  ["AF M8.14 bit", "Audison Forza AF M8.14 bit 8-Channel Amplifier with 14-Channel DSP"],
  ["AF C8.14 bit", "Audison Forza AF C8.14 bit 8-Channel Amplifier with 14-Channel DSP"],
  ["AF M5.11 bit", "Audison Forza AF M5.11 bit 5-Channel Amplifier with 11-Channel DSP"]
];
for (const [model, title] of forzaPreview) {
  const row = primary.records.find(r => r.modelNumber === model && r.manufacturerProductName === title);
  assert.ok(row, "exact Forza preview card missing: " + model);
  assert.ok(row.imageUrl && row.description, "Forza preview card needs exact image and description: " + model);
  assert.equal(row.priceOnRequestText, "Price On Request");
  assert.equal(row.indicativePrice, null);
  assert.equal(row.hasStock, null);
  assert.equal(row.imageApprovalStatus, "OWNER_AUTHORISED_FOR_OWNER_PREVIEW");
  assert.equal(row.importStatus, "DO_NOT_IMPORT");
  assert.equal(row.supplierSku, undefined);
}

const oneNavPrado = primary.records.find(record => record.id === 'pw-2120');
assert.ok(oneNavPrado, 'verified OneNav Prado preview record must be present');
assert.equal(oneNavPrado.brand, 'OneNav');
assert.equal(oneNavPrado.imageStatus, 'owner_authorized_exact_retailer_image_verified_review_only');
assert.ok(oneNavPrado.imageUrl && oneNavPrado.description, 'OneNav Prado record must have its exact image and verified description');
assert.equal(oneNavPrado.modelNumber, 'OA014-1', 'official OneNav manufacturer model OA014-1 must be retained for customers');
assert.equal(oneNavPrado.supplierSku, undefined, 'internal Planetworld supplier SKU must remain hidden');
const oneNavJimny = primary.records.find(record => record.brand === 'OneNav' && record.modelNumber === 'OA715-1');
assert.ok(oneNavJimny, 'verified OneNav OA715-1 Jimny preview record must be present');
assert.equal(oneNavJimny.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.equal(oneNavJimny.imageUrl, 'https://onenav.co.za/wp-content/uploads/2022/09/Suzuki-Jimny.webp');
assert.equal(oneNavJimny.publicationStatus, 'PREVIEW_ONLY_NOT_LIVE');
assert.equal(oneNavJimny.priceOnRequestText, 'Price On Request');
assert.equal(oneNavJimny.indicativePrice, null);
assert.equal(oneNavJimny.hasStock, null);
assert.equal(oneNavJimny.supplierSku, undefined, 'internal Planetworld supplier SKU must remain hidden');
const oneNavFj = primary.records.find(record => record.brand === 'OneNav' && record.modelNumber === 'OA011-1');
const oneNavHilux = primary.records.find(record => record.brand === 'OneNav' && record.modelNumber === 'OA013-1');
assert.ok(oneNavFj && oneNavHilux, 'verified OneNav OA011-1 and OA013-1 previews must be present');
assert.equal(oneNavFj.imageUrl, 'https://go4lo.co.za/cdn/shop/files/Toyota-FJ-Cruiser-600x600.webp?v=1739954757&width=533');
assert.equal(oneNavHilux.imageUrl, 'https://go4lo.co.za/cdn/shop/files/Toyota-Hilux-Fortuner-600x600.webp?v=1739876146&width=533');
assert.ok([oneNavFj, oneNavHilux].every(p => p.publicationStatus === 'PREVIEW_ONLY_NOT_LIVE' && p.priceOnRequestText === 'Price On Request' && p.indicativePrice === null && p.hasStock === null && p.supplierSku === undefined));
const oneNavHilux2015 = primary.records.find(record => record.id === 'pw-2126');
assert.ok(oneNavHilux2015, 'verified OneNav OA018-1 preview record must be present');
assert.equal(oneNavHilux2015.modelNumber, 'OA018-1');
assert.equal(oneNavHilux2015.imageUrl, 'https://go4lo.co.za/cdn/shop/files/Toyota-Hilux-600x600_b92365e2-1f53-4a63-9a1e-965185d9fe9a.webp?v=1739876042&width=533');
assert.match(oneNavHilux2015.imageReviewNote || '', /screen-size conflict/i);
assert.equal(oneNavHilux2015.publicationStatus, 'PREVIEW_ONLY_NOT_LIVE');
assert.equal(oneNavHilux2015.priceOnRequestText, 'Price On Request');
assert.equal(oneNavHilux2015.indicativePrice, null);
assert.equal(oneNavHilux2015.hasStock, null);
assert.equal(oneNavHilux2015.supplierSku, undefined);
assert.equal(oneNavPrado.indicativePrice, null);
assert.equal(oneNavPrado.hasStock, null);
const bitDmi = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison bit DMI Digital MOST Interface');
assert.ok(bitDmi, 'verified Audison bit DMI preview record must be present');
assert.equal(bitDmi.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(bitDmi.imageUrl && bitDmi.description, 'Audison bit DMI must have exact official image and manufacturer description');
assert.equal(bitDmi.modelNumber, 'bit DMI', 'customer model label must not expose the supplier item code');
assert.equal(bitDmi.indicativePrice, null);
assert.equal(bitDmi.hasStock, null);
const bcon = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison B-CON Hi-Res Bluetooth Receiver');
assert.ok(bcon, 'verified Audison B-CON preview record must be present');
assert.equal(bcon.modelNumber, 'B-CON');
assert.equal(bcon.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(bcon.imageUrl && bcon.description, 'Audison B-CON must have exact official image and technical description');
assert.equal(bcon.indicativePrice, null);
assert.equal(bcon.hasStock, null);
const arcam = primary.records.find(record => record.brand === 'ARCAM' && record.title === 'ARCAM AVR21 HDMI 2.1 AV Receiver');
assert.ok(arcam, 'verified ARCAM AVR21 Home Entertainment preview record must be present');
assert.equal(arcam.modelNumber, 'AVR21');
assert.equal(arcam.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(arcam.imageUrl && arcam.description, 'ARCAM AVR21 must have exact manufacturer image and description');
assert.equal(arcam.indicativePrice, null);
assert.equal(arcam.hasStock, null);
const arcam11 = primary.records.find(record => record.brand === 'ARCAM' && record.title === 'ARCAM AVR11 HDMI 2.1 Class AB AV Receiver');
assert.ok(arcam11, 'verified ARCAM AVR11 Home Entertainment preview record must be present');
assert.equal(arcam11.modelNumber, 'AVR11');
assert.equal(arcam11.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(arcam11.imageUrl && arcam11.description, 'ARCAM AVR11 must have exact manufacturer image and technical description');
assert.equal(arcam11.indicativePrice, null);
assert.equal(arcam11.hasStock, null);
const bitOne = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison bit One HD Virtuoso 13-Channel High-Resolution DSP');
assert.ok(bitOne, 'verified Audison bit One HD Virtuoso preview record must be present');
assert.equal(bitOne.modelNumber, 'bit One HD Virtuoso');
assert.equal(bitOne.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(bitOne.imageUrl && bitOne.description);
assert.equal(bitOne.indicativePrice, null);
assert.equal(bitOne.hasStock, null);
const bitTen = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison bit Ten 5-Channel Digital Signal Processor');
assert.ok(bitTen, 'verified Audison bit Ten preview record must be present');
assert.equal(bitTen.modelNumber, 'bit Ten');
assert.equal(bitTen.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(bitTen.imageUrl && bitTen.description);
assert.equal(bitTen.indicativePrice, null);
assert.equal(bitTen.hasStock, null);
const bitTune = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison bit Tune DSP Calibration and Measurement Tool');
assert.ok(bitTune, 'verified Audison bit Tune preview record must be present');
assert.equal(bitTune.modelNumber, 'bit Tune');
assert.equal(bitTune.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(bitTune.imageUrl && bitTune.description);
assert.equal(bitTune.indicativePrice, null);
assert.equal(bitTune.hasStock, null);
const ap4d = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison Prima AP4 D 4-Channel Class D Amplifier');
assert.ok(ap4d, 'verified Audison Prima AP4 D preview record must be present');
assert.equal(ap4d.modelNumber, 'AP4 D');
assert.equal(ap4d.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(ap4d.imageUrl && ap4d.description && ap4d.description.includes('4 × 130 W at 2 Ω'));
assert.equal(ap4d.indicativePrice, null);
assert.equal(ap4d.hasStock, null);
const afm1214 = primary.records.find(record => record.brand === 'Audison' && record.modelNumber === 'AF M12.14 bit');
assert.ok(afm1214, 'verified Audison AF M12.14 bit preview record must be present');
assert.equal(afm1214.modelNumber, 'AF M12.14 bit');
assert.equal(afm1214.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(afm1214.imageUrl && afm1214.description && afm1214.description.includes('12 × 90 W at 2 Ω'));
assert.equal(afm1214.indicativePrice, null);
assert.equal(afm1214.hasStock, null);
const afm814 = primary.records.find(record => record.brand === 'Audison' && record.modelNumber === 'AF M8.14 bit');
assert.ok(afm814, 'verified Audison AF M8.14 bit preview record must be present');
assert.equal(afm814.modelNumber, 'AF M8.14 bit');
assert.equal(afm814.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(afm814.imageUrl && afm814.description && afm814.description.includes('8 × 140 W at 2 Ω'));
assert.equal(afm814.indicativePrice, null);
assert.equal(afm814.hasStock, null);
const afm4d = primary.records.find(record => record.brand === 'Audison' && record.title === 'Audison Forza AF M4D 4-Channel Class D Amplifier');
assert.ok(afm4d, 'verified Audison AF M4D preview record must be present');
assert.equal(afm4d.modelNumber, 'AF M4D');
assert.equal(afm4d.imageStatus, 'official_manufacturer_image_verified_review_only');
assert.ok(afm4d.imageUrl && afm4d.description && afm4d.description.includes('4 × 260 W at 2 Ω'));
assert.equal(afm4d.indicativePrice, null);
assert.equal(afm4d.hasStock, null);





const adeo = primary.records.find(record => record.brand === 'Adeo Screens' && record.title === 'Adeo Plano 135-inch Vision Acoustic Fixed-Frame Projection Screen');
assert.ok(adeo, 'verified Adeo Plano 135-inch Home Entertainment preview record must be present');
assert.equal(adeo.modelNumber, 'Plano 135-inch Vision Acoustic');
assert.equal(adeo.imageStatus, 'owner_authorized_exact_retailer_image_verified_review_only');
assert.ok(adeo.imageUrl && adeo.description, 'Adeo Plano must have exact listing image and verified 135-inch dimensions');
assert.equal(adeo.indicativePrice, null);
assert.equal(adeo.hasStock, null);
const adeo120 = primary.records.find(record => record.brand === 'Adeo Screens' && record.title === 'Adeo Plano 120-inch Reference White 2 Fixed-Frame Projection Screen');
assert.ok(adeo120, 'verified Adeo Plano 120-inch Home Entertainment preview record must be present');
assert.equal(adeo120.modelNumber, 'Plano 120-inch Reference White 2');
assert.equal(adeo120.imageStatus, 'owner_authorized_exact_retailer_image_verified_review_only');
assert.ok(adeo120.imageUrl && adeo120.description, 'Adeo Plano 120-inch must have exact listing image and verified dimensions');
assert.equal(adeo120.indicativePrice, null);
assert.equal(adeo120.hasStock, null);
const adeo135rw = primary.records.find(record => record.brand === 'Adeo Screens' && record.title === 'Adeo Plano 135-inch Reference White 2 Fixed-Frame Projection Screen');
assert.ok(adeo135rw, 'verified Adeo Plano 135-inch Reference White 2 preview record must be present');
assert.equal(adeo135rw.modelNumber, 'Plano 135-inch Reference White 2');
assert.equal(adeo135rw.imageStatus, 'owner_authorized_exact_retailer_image_verified_review_only');
assert.ok(adeo135rw.imageUrl && adeo135rw.description, 'Adeo Plano 135-inch Reference White 2 must have exact listing image and dimensions');
assert.equal(adeo135rw.indicativePrice, null);
assert.equal(adeo135rw.hasStock, null);
const prestige180 = primary.records.find(record => record.brand === 'Adeo Screens' && record.title === 'Adeo Prestige 180-inch Vision Acoustic Fixed-Frame Projection Screen');
assert.ok(prestige180, 'verified Adeo Prestige 180-inch Home Entertainment preview record must be present');
assert.equal(prestige180.modelNumber, 'Prestige 180-inch Vision Acoustic');
assert.equal(prestige180.imageStatus, 'owner_authorized_exact_retailer_image_verified_review_only');
assert.ok(prestige180.imageUrl && prestige180.description, 'Adeo Prestige 180-inch must have exact listing image and verified dimensions');
assert.equal(prestige180.indicativePrice, null);
assert.equal(prestige180.hasStock, null);







let checked = 0;
for (const file of files) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const raw = JSON.stringify(data);
  const visibleText = raw.replace(/https?:\/\/[^\s"'<>]+/gi, '[image-asset-url]');
  assert.ok(!/Planetworld|Audio\s+Connections/i.test(visibleText), file+' must not expose supplier identities in customer-visible text');
  assert.ok(!/"(?:supplierName|supplierSku|supplierModelNumber|dealerCost|dealerPrice|wholesalePrice|internalSku|internalId|gwSku)"\s*:/i.test(raw), file+' must not expose internal supplier or procurement fields');
  assert.ok(!/"(?:sourceSkuReferenceInternal|sourceSupplierWorkbook|sourceSupplierWorkbookSheet|sourceSupplierWorkbookRow|supplierSource)"\s*:/i.test(raw), file+' must not expose source workbook provenance or internal supplier references');
  assert.ok(!/"(?:imageSourceNote|imageSourceUrl)"\s*:/i.test(raw), file+' must not expose internal image-source provenance');
  checked++;
}
assert.ok(checked >= 4, 'at least four public preview catalogue files must be sanitized');
console.log('PUBLIC_PREVIEW_DATA_SANITIZATION_PASS files='+checked);
