'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');

const readJson = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const planet = readJson('assets/planetworld-catalogue-preview.json');
const verified = readJson('assets/planetworld-verified-models-preview.json');
const audioConnections = readJson('assets/audio-connections-catalogue-preview.json');
const route = fs.readFileSync('preview-audio.html', 'utf8');
const home = fs.readFileSync('index-new.html', 'utf8');
const builder = fs.readFileSync('scripts/build-cloudflare-pages-public.py', 'utf8');

assert.equal(planet.recordCount, 3317, 'full Planetworld source snapshot must be retained');
assert.equal(planet.records.length, 3317);
assert.equal(planet.records.filter(row => row.indicativePrice == null).length, 37);
assert.ok(planet.records.filter(row => row.indicativePrice == null).every(row => row.priceOnRequestText === 'Price on Request due to Limited Stock and Availability'));
const uniquePlanetRows = new Set(planet.records.map(row => JSON.stringify([row.collection,row.brand,row.title,row.component,row.indicativePrice,row.hasStock,row.modelNumber||''])));
assert.equal(uniquePlanetRows.size, 3135, 'exact duplicate source rows are suppressed in the customer browse view, not deleted from source data');
assert.deepEqual(planet.collections, {
  'Home Entertainment': 461,
  'Car Audio & Video': 627,
  'Band & Live Sound': 792,
  'Musical Instruments': 850,
  'Installed AV': 435,
  'DJ': 15,
  'Harnesses & Trims': 47,
  'Studio Equipment': 62,
  'Marine Audio': 28
});
assert.equal(planet.records.filter(row => row.division === 'Car Audio').length, 702);
assert.ok(route.includes('department==="Car Audio"?p.division==="Car Audio":p.collection===department'), 'Car Audio button must include the complete Car Audio division, including harnesses/trims and marine-audio source rows');
assert.ok(home.includes("audioDepartmentNode('gw-audio-car','Browse All Car Audio Catalogue','Car Audio')"));
for (const row of planet.records) {
  assert.ok(row.title && row.brand && row.collection && row.component, 'Planetworld row has required browse fields');
  assert.equal(Object.hasOwn(row, 'supplierSku'), false, 'supplier SKU must not be public');
  assert.equal(Object.hasOwn(row, 'dealerCost'), false, 'dealer cost must not be public');
}

assert.equal(verified.recordCount, 68);
assert.equal(verified.records.length, 68);
assert.equal(new Set(verified.records.map(row => row.gwSku)).size, 68, 'curated GW candidate SKUs must be unique');
const modelImageCandidateCount = verified.records.filter(row => row.imageUrl).length;
assert.equal(modelImageCandidateCount, 49, 'only exact-model image candidates may be counted');

assert.equal(audioConnections.sourceRecordCount, 68);
assert.equal(audioConnections.previewRecordCount, 66);
assert.equal(audioConnections.records.length, 66);
assert.equal(audioConnections.excludedRows.length, 2);
assert.ok(audioConnections.records.every(row => row.publicationStatus === 'PREVIEW_ONLY_NOT_LIVE'));
assert.ok(audioConnections.records.every(row => row.collection === 'Car Audio & Video'));
assert.equal(audioConnections.records.filter(row => row.imageUrl).length, 35);
const starsoundSub = audioConnections.records.find(row => row.modelNumber === 'SSW12-6300');
assert.ok(starsoundSub && starsoundSub.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
assert.equal(starsoundSub.manufacturerModelNumber, 'SSW-12-6300');
assert.equal(starsoundSub.imageStatus, 'official_manufacturer_image_verified_review_only');
for (const model of ['SSA-ATOM-13500','SSATIH8200.1','SSAR 22000.1']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
  assert.equal(row.modelCodeAliasReviewOnly, true);
}
for (const model of ['SST350','SST-850']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const model of ['SSA-SB2000.1','PRO6.5-700','SS-PRO6X9-900','SSD-620']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const model of ['KIT SUB P20FE','CS-DR162','KW-M590BT']) {
  const row = verified.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl);
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const model of ['S2-A55V','S2-S65']) {
  const row = verified.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://www.alpine-asia.com/media/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const model of ['69010020','69035010','69051040','69051055','69051090','69052020','69070030','69070080']) {
  const row = verified.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://static.audison.com/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const model of ['409CU','TAXI-4G']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
  assert.equal(row.modelCodeAliasReviewOnly, true);
}
for (const model of ['SSAHORNET 7600.4','SSA-J-10000.4','SSA-R 5000.4','DVD9900BT']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const model of ['USB230','USB450BTDD','SS7655BT','SS7670']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
  assert.equal(row.modelCodeAliasReviewOnly, true);
}
for (const model of ['SSWF12-5150SVC','SSW12" 5200']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const model of ['SSA-ATOM13800.4','SSA-M4-80.4','SSS5502','SSS-6601','SSS6602','SSS6903','SSW12-7300','SSW-B12-2800','SSWF10"-4150SVC']) {
  const row = audioConnections.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl.startsWith('https://starsound.co.za/wp-content/uploads/'));
  assert.equal(row.imageStatus, 'official_manufacturer_image_verified_review_only');
}
for (const row of audioConnections.records) {
  assert.ok(row.brand && row.title && row.component && row.modelNumber);
  assert.equal(Object.hasOwn(row, 'dealerCost'), false);
  assert.equal(Object.hasOwn(row, 'supplierSku'), false);
}

const imageCount = modelImageCandidateCount + audioConnections.records.filter(row => row.imageUrl).length;
assert.equal(imageCount, 84);
assert.ok(route.includes('assets/planetworld-catalogue-preview.json'));
assert.ok(route.includes('assets/planetworld-verified-models-preview.json'));
assert.ok(route.includes('assets/audio-connections-catalogue-preview.json'));
assert.ok(route.includes('new URLSearchParams(location.search)'));
assert.ok(route.includes('routeParams.get("search")'));
assert.ok(route.includes('routeParams.get("label")'));
const lifestyleRows=planet.records.filter(row=>row.collection==='Home Entertainment');
assert.ok(lifestyleRows.some(row=>/vacuum/i.test(row.title)), 'Lifestyle vacuum cleaner source records must be present');
assert.ok(lifestyleRows.some(row=>/pool cleaner|pool vacuum|pool skimmer/i.test(row.title)), 'Lifestyle pool cleaner source records must be present');
assert.ok(route.includes('id="audioSearch"'), 'catalogue search control is required');
assert.ok(route.includes('audioLoadMore'), 'long catalogue must provide pagination');
assert.ok(route.includes('LOAD MORE ('), 'pagination control must be rendered');
assert.ok(route.includes('function exactModelMatch'), 'exact manufacturer models must be matched into broad catalogue rows');
assert.ok(route.includes('source.startsWith(" "+token+" ")'), 'model enrichment must avoid matching a model mentioned only in an accessory title');
assert.ok(route.includes('uniqueExactRows(rows.filter'), 'exact duplicate product rows must be suppressed in the customer browse view');
assert.ok(route.includes('index-new.html'), 'audio page must return to the current storefront');
assert.ok(!route.includes('preview-store.html'), 'do not send the owner back to the stale preview shell');
assert.ok(!route.includes('Planetworld'), 'supplier identity must remain private');
assert.ok(!route.includes('Audio Connections'), 'supplier identity must remain private');
assert.ok(!JSON.stringify(planet).includes('Planetworld'), 'supplier identity must remain private in public catalogue data');
assert.ok(!JSON.stringify(audioConnections).includes('Audio Connections'), 'supplier identity must remain private in public catalogue data');
assert.ok(home.includes("audioDepartmentNode('gw-audio-car','Browse Car Audio Catalogue','Car Audio')"));
assert.ok(home.includes("audioDepartmentNode('gw-audio-home','Browse Home Entertainment Catalogue','Home Entertainment')"));
assert.ok(home.includes("audioDepartmentNode('gw-audio-band','Browse Band & Live Sound Catalogue','Band & Live Sound')"));
assert.ok(home.includes("audioDepartmentNode('gw-audio-dj','Browse DJ Equipment Catalogue','DJ')"));
assert.ok(home.includes("audioDepartmentNode('gw-audio-instruments','Browse Musical Instruments Catalogue','Musical Instruments')"));
assert.ok(home.includes("c.name==='Vacuum Cleaners'"));
assert.ok(home.includes("c.name==='Pool Cleaners'"));
assert.ok(home.includes("audioSearch:'vacuum'"));
assert.ok(home.includes("audioSearch:'pool'"));
assert.ok(home.includes("id==='e3d19d20-fb46-426c-9f64-221d863add0b'"));
const carAudioShortcuts = {
  'Speakers & Component Kits':'speaker',
  'Subwoofers':'subwoofer',
  'Amplifiers':'amplifier',
  'Head Units & Media Players':'head unit',
  'Harnesses, Trims & Fitment':'harness',
  'Cameras & Monitors':'camera',
  'Signal Processing & Crossovers':'signal'
};
for (const [label,search] of Object.entries(carAudioShortcuts)) {
  assert.ok(home.includes("'"+label+"':'"+search+"'"), 'Car Audio component button must filter '+label);
}
assert.ok(home.includes("id==='1a13bc42-4f54-44f6-9658-36d141b77f4b'"));
assert.ok(home.includes('href="preview-audio.html"'));
assert.ok(home.includes("5ab55c53-eee3-41ce-ad48-04ad6df85181"), 'link belongs under Car Audio & Entertainment');
assert.ok(builder.includes('"preview-audio.html"'));
for (const file of ['planetworld-catalogue-preview.json','planetworld-verified-models-preview.json','audio-connections-catalogue-preview.json']) {
  assert.ok(builder.includes(file), 'preview allowlist must include '+file);
}
console.log('AUDIO_CATALOGUE_PREVIEW_PASS', JSON.stringify({
  planetworldRows: planet.records.length,
  planetworldCarAudioRows: 702,
  audioConnectionsRows: audioConnections.records.length,
  excludedAudioRows: audioConnections.excludedRows.length,
  exactImageCandidates: imageCount,
  previewOnly: true
}));
