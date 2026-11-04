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
assert.equal(planet.records.filter(row => row.division === 'Car Audio' && row.component === 'Unclassified — owner/source confirmation').length, 0, 'all Car Audio rows have an evidence-based component classification');
assert.equal(planet.records.find(row => row.id === 'pw-2088').component, 'Car Audio Accessories', 'OneNav BOX-10 is classified as a Car Audio accessory');
assert.equal(planet.records.find(row => row.id === 'pw-2172').component, 'Fascia & Fitting Kits', 'OneNav ON014-F3 is classified as a vehicle-specific fascia/fitting kit');
assert.equal(planet.records.filter(row => row.division === 'Car Audio' && row.component === 'Excluded — Non-Audio Merchandise').length, 1, 'non-audio keychain is explicitly excluded');
assert.ok(route.includes('p.component!=="Excluded — Non-Audio Merchandise"'), 'non-audio merchandise must not appear in the customer-facing Car Audio catalogue');
assert.ok(route.includes('department==="Car Audio"?p.division==="Car Audio"&&p.collection!=="Marine Audio":department==="Lifestyle"?p.division==="Home Retail":department==="Home Entertainment"?(p.collection==="Home Entertainment"||p.collection==="Installed AV")&&p.division!=="Home Retail":department==="Marine Audio"?p.collection==="Marine Audio":p.collection===department'), 'Car Audio must combine its source division while Marine Audio remains a separate department');
assert.ok(home.includes("audioDepartmentNode('gw-audio-car','Car Audio & Video','Car Audio')"));
for (const row of planet.records) {
  assert.ok(row.title && row.brand && row.collection && row.component, 'Planetworld row has required browse fields');
  assert.equal(Object.hasOwn(row, 'supplierSku'), false, 'supplier SKU must not be public');
  assert.equal(Object.hasOwn(row, 'dealerCost'), false, 'dealer cost must not be public');
}

assert.equal(verified.recordCount, 68);
assert.equal(verified.records.length, 68);
assert.equal(new Set(verified.records.map(row => row.gwSku)).size, 68, 'curated GW candidate SKUs must be unique');
const verifiedImageCount = verified.records.filter(row => row.imageUrl).length;
assert.equal(verifiedImageCount, 63, '63 exact-model image URLs are present, including two owner-authorized manufacturer image candidates');

assert.equal(audioConnections.sourceRecordCount, 68);
assert.equal(audioConnections.previewRecordCount, 66);
assert.equal(audioConnections.records.length, 66);
assert.equal(audioConnections.records.filter(row => row.brand !== 'Sony' && /(?:W RMS|RMS\/peak basis not stated)/i.test(row.description || '')).length, 22, '22 non-Sony power descriptions are present after exact-model reconciliation');
assert.ok(audioConnections.records.find(row => String(row.modelNumber).includes('SPECTR 15000')).description.includes('700 W RMS'), '700 W RMS supplier rating is preserved');
assert.ok(audioConnections.records.find(row => row.modelNumber === 'XS-163ES').description.includes('90 W RMS'), 'Sony component speaker RMS rating is preserved');
assert.ok(audioConnections.records.find(row => row.modelNumber === 'XM-1ES').description.includes('600 W ×1 RMS'), 'Sony amplifier wattage and channel basis are preserved');
const specChecks = [
  ['ac-032','520 W RMS at 1 Ω','RETAILER_SPECIFICATION_CROSSCHECK'],
  ['ac-034','600 W RMS at 1 Ω','OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED'],
  ['ac-037','95 W RMS ×4 at 2 Ω','RETAILER_SPECIFICATION_CROSSCHECK'],
  ['ac-038','65 W RMS ×4 at 2 Ω','OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED'],
  ['ac-039','90 W RMS ×4 at 2 Ω','OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED'],
  ['ac-040','320 W RMS ×4 at 1 Ω','OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED'],
  ['ac-041','80 W RMS ×4 plus 250 W sub channel','RETAILER_SPECIFICATION_CROSSCHECK'],
  ['ac-042','80 W RMS ×4 at 4 Ω','RETAILER_SPECIFICATION_CROSSCHECK']
];
const atom13500=audioConnections.records.find(row=>row.id==='ac-032');
assert.ok(atom13500.description.includes('380 W RMS at 2 Ω')&&atom13500.description.includes('230 W RMS at 4 Ω')&&atom13500.description.includes('600 W maximum output'),'ac-032 retailer specification detail');
assert.equal(atom13500.specificationEvidenceStatus,'THIRD_PARTY_RETAILER_CROSS_CHECK_NOT_MANUFACTURER_CONFIRMED');
assert.equal(atom13500.specificationSourceUrls.length,2);
for (const [id, phrase, status] of specChecks) {
  const row=audioConnections.records.find(item=>item.id===id);
  assert.ok(row.description.includes(phrase), id+' power specification cross-check');
  assert.equal(row.specificationStatus,status,id+' specification evidence status');
}
const b12=audioConnections.records.find(row=>row.id==='ac-025');
assert.equal(b12.specificationStatus,'OFFICIAL_PHYSICAL_SPEC_CONFIRMED_POWER_UNPUBLISHED_CONFLICT_REMAINS');
assert.ok(b12.description.includes('power rating remains unverified'));
assert.equal(audioConnections.excludedRows.length, 2);
assert.ok(audioConnections.records.every(row => row.publicationStatus === 'PREVIEW_ONLY_NOT_LIVE'));
assert.ok(audioConnections.records.every(row => row.collection === 'Car Audio & Video'));
assert.equal(audioConnections.records.filter(row => row.imageUrl).length, 4);
assert.equal(audioConnections.records.filter(row => row.indicativePrice == null).length, 0, 'all three previously missing market indicative references are now populated');
for (const id of ['ac-021','ac-025','ac-044']) { const row=audioConnections.records.find(item=>item.id===id); assert.ok(/POWER_RATING_CONFLICT|POWER_NOT_PUBLISHED/.test(row.specificationStatus),id+' unresolved power evidence must remain explicitly held'); }
assert.equal(audioConnections.records.find(row=>row.id==='ac-020').specificationStatus,'OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-043').specificationStatus,'OFFICIAL_MAX_POWER_CONFIRMED_RMS_NOT_PUBLISHED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-044').specificationStatus,'RETAILER_RMS_CROSSCHECK_UNIT_BASIS_UNCONFIRMED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-046').specificationStatus,'OFFICIAL_MAX_POWER_CONFIRMED_RMS_NOT_PUBLISHED');
assert.ok(audioConnections.records.find(row=>row.id==='ac-047').description.includes('60 W RMS and 600 W maximum'));
assert.equal(audioConnections.records.find(row=>row.id==='ac-047').specificationStatus,'RETAILER_SPECIFICATION_CROSSCHECK_RMS_AND_MAX_CONFIRMED');
assert.ok(audioConnections.records.find(row=>row.id==='ac-048').description.includes('80 W RMS and 1,200 W maximum'));

for (const id of ['ac-023','ac-025','ac-027']) { const row=audioConnections.records.find(item=>item.id===id); assert.ok(row.priceSourceUrl && row.priceBasis==='SOUTH_AFRICAN_RETAIL_COMPARABLE_ONLY_NOT_SUPPLIER_COST_OR_APPROVED_SELLING_PRICE'); }
assert.ok(audioConnections.records.find(row=>row.id==='ac-025').manufacturerMatchStatus.includes('POWER_RATING_CONFLICT'), 'conflicting boxed subwoofer wattage must remain explicitly flagged');
for (const row of audioConnections.records) {
  assert.ok(row.brand && row.title && row.component && row.modelNumber);
  assert.equal(Object.hasOwn(row, 'dealerCost'), false);
  assert.equal(Object.hasOwn(row, 'supplierSku'), false);
}

const imageCount = verifiedImageCount + audioConnections.records.filter(row => row.imageUrl).length;
assert.equal(imageCount, 67);
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
assert.ok(route.includes('const data=uniqueExactRows(departmentRows.filter'), 'exact duplicate product rows must be suppressed after department/brand/component/search filtering in the customer browse view');
assert.ok(route.includes('index-new.html'), 'audio page must return to the current storefront');
assert.ok(!route.includes('preview-store.html'), 'do not send the owner back to the stale preview shell');
assert.ok(!route.includes('Planetworld'), 'supplier identity must remain private');
assert.ok(!route.includes('Audio Connections'), 'supplier identity must remain private');
assert.ok(!JSON.stringify(planet).includes('Planetworld'), 'supplier identity must remain private in public catalogue data');
assert.ok(!JSON.stringify(audioConnections).includes('Audio Connections'), 'supplier identity must remain private in public catalogue data');
assert.ok(home.includes("audioDepartmentNode('gw-audio-car','Car Audio & Video','Car Audio')"), 'homepage Car Audio subcategory must route into the combined Car Audio & Video catalogue');
assert.ok(home.includes("audioDepartmentNode('gw-audio-home','Browse Home Entertainment Catalogue','Home Entertainment')"));
assert.ok(home.includes("audioDepartmentNode('gw-audio-band','Browse Band & Live Sound Catalogue','Band & Live Sound')"));
assert.ok(home.includes("audioDepartmentNode('gw-audio-dj','Browse DJ Equipment Catalogue','DJ')"));
assert.ok(home.includes("audioDepartmentNode('gw-audio-instruments','Browse Musical Instruments Catalogue','Musical Instruments')"));
assert.ok(home.includes("c.name==='Vacuum Cleaners'"));
assert.ok(home.includes("c.name==='Pool Cleaners'"));
assert.ok(home.includes("audioSearch:'vacuum'"));
assert.ok(home.includes("audioSearch:'pool'"));
assert.ok(home.includes("id==='e3d19d20-fb46-426c-9f64-221d863add0b'"));
assert.ok(home.includes("id==='1a13bc42-4f54-44f6-9658-36d141b77f4b'"));
assert.ok(home.includes('href="preview-audio.html"'));
assert.ok(home.includes("e3d19d20-fb46-426c-9f64-221d863add0b") && !home.includes("5ab55c53-eee3-41ce-ad48-04ad6df85181"), 'Car Audio & Video navigation must use the current approved category UUID');
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
