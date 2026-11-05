'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const readJson = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const planet = readJson('assets/planetworld-catalogue-preview.json');
const verified = readJson('assets/planetworld-verified-models-preview.json');
const audioConnections = readJson('assets/audio-connections-catalogue-preview.json');
const route = fs.readFileSync('preview-audio.html', 'utf8');
const categoryRoute = fs.readFileSync('preview-category.html', 'utf8');
const home = fs.readFileSync('index-new.html', 'utf8');
const builder = fs.readFileSync('scripts/build-cloudflare-pages-public.py', 'utf8');
const enrichment = fs.readFileSync('scripts/enrich_planetworld_verified_models.py', 'utf8');

const categoryCleanup = fs.readFileSync('assets/category-cleanup.js', 'utf8');
const PRICE_ON_REQUEST_TEXT = 'Price On Request Due to Stock Availability';
const ONE_LOGO = 'https://planetworld.canto.global/direct/image/78grbk30lp5ejb3v0s93889d5v/9ECBwgB8vFryBOGFxljIuivToMw/original?content-type=image%2Fpng&name=_OneX.png';
const AMPLIFIED_LOGO = 'https://planetworld.canto.global/direct/image/vhu1051tf93277757p4gkjes41/7rNanaRqMsc9p3HhnVNSIEeHbJQ/original?content-type=image%2Fpng&name=_AMPLIFIED.png';
function parseCsvRows(source) {
  const rows=[]; let row=[], value='', quoted=false;
  for(let i=0;i<source.length;i++) {
    const ch=source[i];
    if(quoted) {
      if(ch==='"'&&source[i+1]==='"'){value+='"';i++;}
      else if(ch==='"')quoted=false;
      else value+=ch;
    } else if(ch==='"')quoted=true;
    else if(ch===','){row.push(value);value='';}
    else if(ch==='\n'){row.push(value.replace(/\r$/,''));rows.push(row);row=[];value='';}
    else value+=ch;
  }
  if(value.length||row.length){row.push(value.replace(/\r$/,''));rows.push(row);}
  if(rows.length)rows[0][0]=rows[0][0].replace(/^\uFEFF/,'');
  return rows;
}
const planetSourceRows=[];
for(let part=1;part<=7;part++) {
  const path='catalogue-review/planetworld-row-chunks/planetworld-rows-0'+part+'.csv';
  const parsed=parseCsvRows(fs.readFileSync(path,'utf8'));
  const headers=parsed[0];
  for(const values of parsed.slice(1)) {
    const record={}; headers.forEach((key,index)=>record[key]=values[index]);
    planetSourceRows.push(record);
  }
}
assert.equal(planetSourceRows.length,3317,'all Planetworld source rows must be included in the pricing reconciliation');
assert.equal(planet.records.length,planetSourceRows.length,'every preview product must map to one source row in source order');
for(let i=0;i<planetSourceRows.length;i++) {
  const rrp=Number(planetSourceRows[i].retail_price_incl)||0;
  const expected=rrp>0?Math.round((rrp*0.98+Number.EPSILON)*100)/100:null;
  assert.equal(planet.records[i].indicativePrice,expected,planet.records[i].id+' must use VAT-inclusive RRP less exactly 2%, without adding VAT');
  assert.equal(planet.records[i].priceBasis,rrp>0?'RRP_INCL_VAT_MINUS_2_PERCENT':'QUOTE_ONLY_ZERO_RRP');
}
assert.equal(planet.pricingRule.formula,'round(RRP_incl_VAT * 0.98, 2)');
assert.equal(planet.pricingRule.vatTreatment,'RRP already includes VAT; do not add VAT again');
assert.equal(planet.pricingRule.pricedRecords,3298);
assert.equal(planet.pricingRule.zeroRrpQuoteOnly,19);
const pricingAudit=parseCsvRows(fs.readFileSync('catalogue-review/PLANETWORLD_RRP_MINUS_2_AUDIT_2026-11-05.csv','utf8'));
const pricingAuditRows=pricingAudit.slice(1);
const pricingAuditIndex=Object.fromEntries(pricingAudit[0].map((key,index)=>[key,index]));
assert.equal(pricingAuditRows.length,3317,'internal RRP pricing audit must retain every source row');
assert.equal(pricingAuditRows.filter(row=>row[pricingAuditIndex.pricing_status]==='QUOTE_ONLY_ZERO_RRP').length,19);
assert.equal(pricingAuditRows.filter(row=>row[pricingAuditIndex.pricing_status]==='RRP_MINUS_2_BELOW_ESTIMATED_COST_REVIEW').length,19,'below-estimated-cost rows must be flagged for owner review, not silently hidden');
assert.equal(pricingAuditRows.filter(row=>row[pricingAuditIndex.pricing_status]==='RRP_MINUS_2_COST_FLOOR_PASS').length,3279);
assert.ok(route.includes(ONE_LOGO)&&route.includes(AMPLIFIED_LOGO),'audio brand directory must use official Planetworld ONE/OneNav and Amplified logos');
const brandLandingRoute=fs.readFileSync('preview-audio-brand.html','utf8');
const productListingRoute=fs.readFileSync('preview-audio-products.html','utf8');
assert.equal(planet.records.filter(row=>row.imageUrl).length,68,'68 exact product image candidates (66 verified-model plus two OneNav) must be attached to the correct source product rows');
const audisonVerified=verified.records.find(row=>row.modelNumber==='69051075');
const pioneerVerified=verified.records.find(row=>row.modelNumber==='DMH-AP6650BT');
assert.equal(audisonVerified.imageUrl,'https://static.audison.com/media/2022/10/APBMW-K4M.jpg','Audison APBMW K4M must use the exact official model image');
assert.equal(pioneerVerified.imageUrl,'https://www.pioneersouthafrica.co.za/cdn/shop/files/DMH-AP6650BT_2_700x_8e7b05bf-1886-41b7-a4c5-2631b50f0ac2.webp?v=1741857962&width=1946','Pioneer DMH-AP6650BT must use the exact South African model image');
assert.ok(audisonVerified.description.includes('100 W peak / 50 W continuous')&&pioneerVerified.description.includes('9-inch WSVGA capacitive multimedia receiver'),'manufacturer specifications must be present in the matching product descriptions');
assert.equal(planet.records.filter(row=>row.manufacturerProductName&&row.description).length,76,'68 verified manufacturer records plus eight OneNav Classic records must carry verified descriptions');
assert.equal(planet.records.filter(row=>row.manufacturerProductName).length,77,'all 68 verified manufacturer records plus nine OneNav exact product pages must be named');
assert.equal(planet.records.filter(row=>row.imageStatus==='EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE').length,9,'nine exact model pages have no approved image and must not receive a generic substitute');
assert.ok(!productListingRoute.includes('p.imageUrl||typeImage(component)'),'individual product cards must never substitute a generic product-type photograph');
assert.ok(productListingRoute.includes('Exact product photo pending verification'),'products without exact images must show an honest pending state, not an unrelated photo');
assert.ok(!route.includes('planetworld-verified-models-preview.json')&&!brandLandingRoute.includes('planetworld-verified-models-preview.json')&&!productListingRoute.includes('planetworld-verified-models-preview.json'),'customer routes must not fetch the internal supplier model crosswalk');
assert.ok(!builder.includes('planetworld-verified-models-preview.json'),'public Pages package must not include the internal supplier model crosswalk');
assert.ok(planet.records.every(row=>!Object.hasOwn(row,'modelNumber')&&!Object.hasOwn(row,'supplierSku')),'public product JSON must not expose supplier SKU/model-number crosswalk fields');
const imageAudit=parseCsvRows(fs.readFileSync('catalogue-review/PLANETWORLD_PRODUCT_IMAGE_AUDIT_2026-11-05.csv','utf8'));
const imageAuditRows=imageAudit.slice(1);
const imageAuditIndex=Object.fromEntries(imageAudit[0].map((key,index)=>[key,index]));
assert.equal(imageAuditRows.length,3317,'internal image audit must account for every Planetworld source product');
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_url]).length,68);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_status]==='EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE').length,9);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_status]==='NO_EXACT_MODEL_IMAGE_MATCH').length,3240);
assert.ok(brandLandingRoute.includes(ONE_LOGO)&&brandLandingRoute.includes(AMPLIFIED_LOGO),'dedicated brand pages must show the same official ONE/OneNav and Amplified logos');
assert.ok(brandLandingRoute.includes("function brandDisplayName(b)")&&brandLandingRoute.includes("'ONE / OneNav'"),'One brand button and landing page must be identified as ONE / OneNav');
assert.equal(planet.records.filter(row => row.indicativePrice == null).length, 19);
assert.ok(planet.records.filter(row => row.indicativePrice == null).every(row => row.priceOnRequestText === PRICE_ON_REQUEST_TEXT), 'all unpriced Planetworld rows must use the exact owner-approved request wording');
assert.equal(audioConnections.records.filter(row => row.priceOnRequestText === PRICE_ON_REQUEST_TEXT).length, 53, 'unapproved dealer-cost estimates and retail-only comparisons must remain quote-only');
assert.equal(audioConnections.records.filter(row => row.priceOnRequestText !== PRICE_ON_REQUEST_TEXT && row.indicativePrice != null).length, 13, 'only validated Sony supplier-price-list rows retain numeric prices');
assert.ok(route.includes('function audioPriceLabel(p)'), 'audio preview must use supplier-aware price display logic');
const priceHelperStart = route.indexOf('const PRICE_ON_REQUEST_TEXT=');
const priceHelperEnd = route.indexOf('function draw(){', priceHelperStart);
assert.ok(priceHelperStart >= 0 && priceHelperEnd > priceHelperStart, 'supplier-aware price helper must be extractable for unit testing');
const priceContext = vm.createContext({});
vm.runInContext(route.slice(priceHelperStart, priceHelperEnd) + '\nthis.audioPriceLabel = audioPriceLabel;', priceContext);
assert.equal(priceContext.audioPriceLabel({indicativePrice: 125.5}), 'R125,50', 'validated numeric supplier prices remain visible');
assert.equal(priceContext.audioPriceLabel({indicativePrice: 125.5, priceNote: 'Preview-only estimate using dealer cost ex VAT'}), PRICE_ON_REQUEST_TEXT, 'unapproved cost-derived estimates remain quote-only');
assert.equal(priceContext.audioPriceLabel({indicativePrice: 125.5, priceBasis: 'SOUTH_AFRICAN_RETAIL_COMPARABLE_ONLY_NOT_SUPPLIER_COST_OR_APPROVED_SELLING_PRICE'}), PRICE_ON_REQUEST_TEXT, 'retail comparables remain quote-only');
const poaLabel = priceContext.audioPriceLabel({title: 'Special Order amplifier POA', indicativePrice: 999});
assert.ok(poaLabel.includes('SPECIAL ORDER — PRICE ON APPLICATION') && poaLabel.includes('currency exchange-rate fluctuations'), 'POA/POR products must show the special-order and exchange-rate explanation');
assert.ok(route.includes('SPECIAL ORDER — PRICE ON APPLICATION'), 'POA/POR special-order rows must explain enquiry-time pricing and exchange-rate variation');
assert.ok(route.includes('may vary due to currency exchange-rate fluctuations'), 'special-order prices must disclose exchange-rate variation');
assert.ok(!route.includes('Indicative preview: R'), 'customer-facing audio preview must not label unapproved estimates as indicative prices');
assert.ok(route.includes('https://images.unsplash.com/photo-1654447398824-dbcbefeafdd6?auto=format&fit=crop&w=720&q=82'), 'Car Audio & Video department button must use a category-matched car-speaker photograph');
assert.ok(!route.includes('img.src="assets/car-audio-video-category.svg"'), 'Home Entertainment artwork must not be reused for Car Audio & Video');
assert.ok(!route.includes('car-audio-video-category.svg'), 'audio department cards and image-error fallbacks must never use illustrated SVG artwork');
assert.ok(!categoryRoute.includes('car-audio-video-category.svg'), 'standalone category cards must use photographic Car Audio artwork, not illustrated SVG artwork');
const audioCategoryPage=fs.readFileSync('preview-category.html','utf8');
assert.ok(audioCategoryPage.includes('photo-1558284296-7579da2deb30'), 'Home Entertainment category card must use photographic artwork');
assert.ok(route.includes('department==="Home Entertainment"?isHomeEntertainmentRecord(p):department==="Marine Audio"?') && route.includes('function isHomeEntertainmentRecord(p){') && route.includes('component==="Home & Leisure Appliances"') && route.includes('component==="Smart Home & Security"'), 'Home Entertainment must use the reviewed audio-only filter and exclude non-audio retail items');
assert.ok(!categoryCleanup.includes(':scope') && !categoryCleanup.includes('setInterval') && !categoryCleanup.includes('innerHTML'), 'category cleanup must not rely on unsupported selectors, timers or destructive grid replacement');
assert.ok(categoryCleanup.includes('getElementsByClassName') && categoryCleanup.includes('removeProperty(\'display\')'), 'category cleanup must preserve and restore category nodes without deleting them');

assert.equal(planet.recordCount, 3317, 'full Planetworld source snapshot must be retained');
assert.equal(planet.records.length, 3317);
assert.equal(planet.records.filter(row => row.indicativePrice == null).length, 19);
assert.ok(planet.records.filter(row => row.indicativePrice == null).every(row => row.priceOnRequestText === 'Price On Request Due to Stock Availability'));
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
assert.ok(route.includes('department==="Car Audio"?p.division==="Car Audio"&&p.collection!=="Marine Audio":department==="Lifestyle"?p.division==="Home Retail":department==="Home Entertainment"?isHomeEntertainmentRecord(p):department==="Marine Audio"?p.collection==="Marine Audio":p.collection===department'), 'Car Audio must combine its source division while Marine Audio remains separate and Home Entertainment uses its reviewed filter');
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
assert.equal(verifiedImageCount, 66, '66 exact-model image URLs are present, including five owner-authorized manufacturer image candidates');
for (const [model, url] of Object.entries({
  'HCE-C2100RD': 'https://www.alpine-asia.com/media/5baca7810efbd.png',
  'HDZ-653': 'https://www.alpine-asia.com/media/62d65d1bd9391.png',
  'S2-A55V': 'https://www.alpine-asia.com/media/64b0d9389e7ef.jpg'
})) {
  assert.equal(verified.records.find(row => row.modelNumber === model)?.imageUrl, url, model + ' owner-authorized exact-model image');
}

assert.equal(audioConnections.sourceRecordCount, 68);
assert.equal(audioConnections.previewRecordCount, 66);
assert.equal(audioConnections.records.length, 66);
assert.equal(audioConnections.records.filter(row => row.brand !== 'Sony' && /(?:W RMS|RMS\/peak basis not stated)/i.test(row.description || '')).length, 21, '21 non-Sony power descriptions are present after exact-model reconciliation');
assert.ok(audioConnections.records.find(row => String(row.modelNumber).includes('SPECTR 15000')).description.includes('700 W RMS'), '700 W RMS supplier rating is preserved');
assert.ok(audioConnections.records.find(row => row.modelNumber === 'XS-163ES').description.includes('90 W RMS'), 'Sony component speaker RMS rating is preserved');
assert.ok(audioConnections.records.find(row => row.modelNumber === 'XM-1ES').description.includes('600 W ×1 RMS'), 'Sony amplifier wattage and channel basis are preserved');
const specChecks = [
  ['ac-034','600 W RMS at 1 Ω','OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED'],
  ['ac-037','95 W RMS ×4 at 2 Ω','RETAILER_SPECIFICATION_CROSSCHECK'],
  ['ac-038','The current official Starsound model page lists','OFFICIAL_MANUFACTURER_TABLE_FOUND_SUPPLIER_PRICE_LIST_DISCREPANCY_CONFIRM_MODEL_REVISION'],
  ['ac-039','90 W RMS ×4 at 2 Ω','OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED'],
  ['ac-040','320 W RMS ×4 at 1 Ω','OWNER_CONFIRMED_NOMINAL_RATING_WITH_OFFICIAL_OUTPUT_TABLE_RECORDED'],
  ['ac-041','second RMS Ratings table','OFFICIAL_MANUFACTURER_TABLE_CONFLICT_SUPPLIER_CONFIRMATION_REQUIRED'],
  ['ac-042','80 W RMS ×4 at 4 Ω','RETAILER_SPECIFICATION_CROSSCHECK'],
  ['ac-044','per speaker or pair','RETAILER_RMS_CROSSCHECK_UNIT_BASIS_UNCONFIRMED']
];
assert.equal(audioConnections.powerSpecificationReconciliation.status,'SIX_MODEL_SPECIFICATION_HOLDS');
assert.deepEqual(audioConnections.powerSpecificationReconciliation.heldRecords.map(row=>row.id).sort(),['ac-021','ac-025','ac-032','ac-038','ac-041','ac-044'].sort());
for (const id of ['ac-021','ac-025','ac-032','ac-038','ac-041','ac-044']) {
  const held=audioConnections.records.find(row=>row.id===id);
  assert.ok(!held.title.includes('W RMS')&&!held.title.includes('W MAX'),id+' title must not publish held wattage');
}
const hornet=audioConnections.records.find(row=>row.id==='ac-038');
assert.ok(hornet.description.includes('65 W RMS ×4 at 2 Ω')&&hornet.description.includes('45 W RMS ×4 at 4 Ω')&&hornet.description.includes('90 W bridged at 4 Ω')&&hornet.description.includes('50 W RMS'),'ac-038 current manufacturer/supplier specification discrepancy');
assert.equal(hornet.specificationStatus,'OFFICIAL_MANUFACTURER_TABLE_FOUND_SUPPLIER_PRICE_LIST_DISCREPANCY_CONFIRM_MODEL_REVISION');
assert.equal(hornet.specificationEvidenceStatus,'MANUFACTURER_PRIMARY_SOURCE_SPECIFICATION_CAPTURED_SUPPLIER_DOCUMENT_DISCREPANCY_REMAINS');
const atom13500=audioConnections.records.find(row=>row.id==='ac-032');
assert.ok(atom13500.description.includes('official page lists 500 W RMS at 1 Ω')&&atom13500.description.includes('retailer listings report 520 W RMS at 1 Ω')&&atom13500.description.includes('230 W RMS at 4 Ω'),'ac-032 conflicting official and retailer specification detail');
assert.equal(atom13500.specificationStatus,'OFFICIAL_VS_RETAILER_POWER_CONFLICT_SUPPLIER_CONFIRMATION_REQUIRED');
assert.ok(!/W RMS/i.test(atom13500.title),'ac-032 title must not present conflicted wattage');
assert.equal(atom13500.specificationEvidenceStatus,'THIRD_PARTY_RETAILER_CROSS_CHECK_NOT_MANUFACTURER_CONFIRMED');
assert.equal(atom13500.specificationSourceUrls.length,2);
for (const [id, phrase, status] of specChecks) {
  const row=audioConnections.records.find(item=>item.id===id);
  assert.ok(row.description.includes(phrase), id+' power specification cross-check');
  assert.equal(row.specificationStatus,status,id+' specification evidence status');
}
const ssw126300=audioConnections.records.find(row=>row.id==='ac-021');
assert.ok(ssw126300.description.includes('Power rating remains unverified'));
assert.ok(ssw126300.specificationStatus.includes('SUPPLIER_CONFIRMATION_REQUIRED'));
const b12=audioConnections.records.find(row=>row.id==='ac-025');
assert.equal(b12.specificationStatus,'OFFICIAL_PHYSICAL_SPEC_CONFIRMED_POWER_CONFLICT_SUPPLIER_CONFIRMATION_REQUIRED');
assert.ok(b12.description.includes('power rating remains unverified'));
const m5=audioConnections.records.find(row=>row.id==='ac-041');
assert.ok(m5.description.includes('second RMS Ratings table')&&m5.description.includes('Hold the detailed power ratings'));
const pro6501=audioConnections.records.find(row=>row.id==='ac-044');
assert.ok(pro6501.description.includes('per speaker or pair'));
assert.ok(!/250 W RMS/i.test(pro6501.title),'ac-044 title must not imply per-driver/pair wattage basis');
assert.equal(audioConnections.excludedRows.length, 2);
assert.ok(audioConnections.records.every(row => row.publicationStatus === 'PREVIEW_ONLY_NOT_LIVE'));
assert.ok(audioConnections.records.every(row => row.collection === 'Car Audio & Video'));
assert.equal(audioConnections.records.filter(row => row.imageUrl).length, 4);
assert.equal(hornet.imageUrl,'https://starsound.co.za/wp-content/uploads/2026/10/SSA-HORNET-7600.4_WEB_PIC_1.jpg');
assert.equal(hornet.imageStatus,'OFFICIAL_EXACT_MODEL_MANUFACTURER_IMAGE_CANDIDATE_REVIEW_ONLY_PERMISSION_AND_OWNER_APPROVAL_PENDING');
assert.equal(audioConnections.records.filter(row => row.indicativePrice == null).length, 0, 'all three previously missing market indicative references are now populated');
for (const id of ['ac-021','ac-025','ac-032','ac-041','ac-044']) { const row=audioConnections.records.find(item=>item.id===id); assert.ok(/SUPPLIER_CONFIRMATION_REQUIRED|UNIT_BASIS_UNCONFIRMED|CONFLICT_REMAINS/.test(row.specificationStatus),id+' unresolved power evidence must remain explicitly held'); }
assert.equal(audioConnections.records.find(row=>row.id==='ac-020').specificationStatus,'OFFICIAL_MANUFACTURER_SPECIFICATION_CONFIRMED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-043').specificationStatus,'OFFICIAL_MAX_POWER_CONFIRMED_RMS_NOT_PUBLISHED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-032').specificationStatus,'OFFICIAL_VS_RETAILER_POWER_CONFLICT_SUPPLIER_CONFIRMATION_REQUIRED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-041').specificationStatus,'OFFICIAL_MANUFACTURER_TABLE_CONFLICT_SUPPLIER_CONFIRMATION_REQUIRED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-044').specificationStatus,'RETAILER_RMS_CROSSCHECK_UNIT_BASIS_UNCONFIRMED');
assert.equal(audioConnections.records.find(row=>row.id==='ac-046').specificationStatus,'OFFICIAL_MAX_POWER_CONFIRMED_RMS_NOT_PUBLISHED');
assert.ok(audioConnections.records.find(row=>row.id==='ac-047').description.includes('60 W RMS and 600 W maximum'));
assert.equal(audioConnections.records.find(row=>row.id==='ac-047').specificationStatus,'RETAILER_SPECIFICATION_CROSSCHECK_RMS_AND_MAX_CONFIRMED');
assert.ok(audioConnections.records.find(row=>row.id==='ac-048').description.includes('80 W RMS and 1,200 W maximum'));

for (const id of ['ac-023','ac-025','ac-027']) { const row=audioConnections.records.find(item=>item.id===id); assert.ok(row.priceSourceUrl && row.priceBasis==='SOUTH_AFRICAN_RETAIL_COMPARABLE_ONLY_NOT_SUPPLIER_COST_OR_APPROVED_SELLING_PRICE'); }
assert.ok(audioConnections.records.find(row=>row.id==='ac-025').specificationStatus.includes('POWER_CONFLICT'), 'conflicting boxed subwoofer wattage must remain explicitly flagged');
for (const row of audioConnections.records) {
  assert.ok(row.brand && row.title && row.component && row.modelNumber);
  assert.equal(Object.hasOwn(row, 'dealerCost'), false);
  assert.equal(Object.hasOwn(row, 'supplierSku'), false);
}

const oneNavImageCount = planet.records.filter(row => row.brandDisplayName === 'OneNav' && row.imageCrop && row.imageUrl).length;
const imageCount = verifiedImageCount + audioConnections.records.filter(row => row.imageUrl).length + oneNavImageCount;
assert.equal(imageCount, 72);
assert.ok(route.includes('assets/planetworld-catalogue-preview.json'));
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
assert.ok(enrichment.includes('verified_by_sku.get(norm(supplier_sku))'), 'exact manufacturer models must be matched by normalized source SKU during preview data generation');
assert.ok(enrichment.includes('if not key or key in verified_by_sku') && enrichment.includes('verified_by_sku[key] = model'), 'model enrichment must reject empty or duplicate internal model keys');
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
for (const file of ['planetworld-catalogue-preview.json','audio-connections-catalogue-preview.json']) {
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


/* Preview package asset allowlist regression: local brand wordmarks must ship with the preview. */
for (const name of ["jbl.svg", "denon.svg", "hertz.svg"]) {
  const assetPath = `assets/brand-logos/${name}`;
  assert.ok(fs.existsSync(assetPath), `Missing required local preview brand logo: ${name}`);
}

/* Dedicated brand -> product type -> products navigation must use separate documents. */
const brandRoute = fs.readFileSync('preview-audio-brand.html', 'utf8');
const productRoute = fs.readFileSync('preview-audio-products.html', 'utf8');
assert.ok(brandRoute.includes("department==='Home Entertainment'?isHomeEntertainmentRecord(x)"), 'Home Entertainment brand page must preserve department scope');
assert.ok(productRoute.includes("department==='Home Entertainment'?isHomeEntertainmentRecord(x)"), 'Home Entertainment product page must use the same department scope');
assert.ok(brandRoute.includes('const exactBrandImage=rows.find(p=>p.brand===brand&&group(p)===t&&p.imageUrl)'), 'Brand component tiles must prefer exact-brand catalogue product photos');
assert.ok(brandRoute.includes('const sharedTypeImage=rows.find(p=>group(p)===t&&p.imageUrl)'), 'Brand component tiles must use a matching product photo when the selected brand has no image');
assert.ok(brandRoute.includes('images.unsplash.com/photo-1558284296-7579da2deb30'), 'Home Entertainment component tiles must use photographic fallbacks');
assert.ok(brandRoute.includes('photo-1654447398824-dbcbefeafdd6')&&!brandRoute.includes('photo-1726248985986-20bef82d2b52'), 'Car Audio component speaker tiles must use the corrected car-speaker photo consistently across routes');
assert.ok(!route.includes('img.onerror=function(){this.onerror=null;this.src=categoryArtFallback(label)}'), 'failed component artwork must not retry the same failed generic image source');
assert.ok(route.includes('brandButton(b,b===brand,"preview-audio-brand.html?"+u.toString())'), 'brand buttons must navigate to a dedicated brand page');
assert.ok(route.includes('location.href="preview-audio-products.html?"+u.toString()'), 'product-type buttons must navigate to a dedicated product listing page');
assert.ok(brandRoute.includes('Choose a product type') && brandRoute.includes('Products are shown on the next page'), 'brand landing page must show product-type tiles, not products');
assert.ok(brandRoute.includes('preview-audio-products.html?'), 'brand product-type tiles must open the dedicated product listing page');
assert.ok(productRoute.includes("rowsFor(d).filter(p=>p.brand===brand&&group(p)===component)"), 'product listing must filter by both selected brand and product type');
assert.ok(builder.includes('"preview-audio-brand.html"') && builder.includes('"preview-audio-products.html"'), 'both dedicated routes must be included in the public preview package');

for (const asset of ['home-entertainment.svg','home-audio-cinema.svg','projection-screens-projectors.svg','cables-mounts-accessories.svg','av-infrastructure-control.svg','installed-audio.svg','conferencing-collaboration.svg','other-home-ci.svg','speakers.svg','subwoofers.svg','amplifiers.svg','head-units.svg','cameras-monitors.svg','signal-processing.svg','harnesses-trims.svg','aerials.svg']) {
  assert.ok(fs.existsSync('assets/audio-types/'+asset), 'Legacy artwork file retained for audit: '+asset);
  assert.ok(builder.includes('audio-types/'+asset), 'Legacy artwork package manifest entry retained for audit: '+asset);
}
assert.ok(!route.includes('/assets/audio-types/'), 'Audio department and component buttons must use photographs, not illustrated SVGs');
assert.ok(!productRoute.includes('/assets/audio-types/'), 'Product-type buttons must use photographs, not illustrated SVGs');
assert.ok(!brandRoute.includes('/assets/audio-types/'), 'Brand product-type buttons must use photographs, not illustrated SVGs');
assert.ok(!route.includes('data:image/svg+xml') && !categoryRoute.includes('data:image/svg+xml'), 'Customer-facing category fallbacks must not generate cartoon SVGs');
assert.ok(route.includes('images.unsplash.com/photo-1654447398824-dbcbefeafdd6'), 'Audio component buttons must use photographic speaker artwork');
assert.ok(productRoute.includes('images.unsplash.com/photo-1776176359206-a1d34436ddff'), 'Product-type buttons must use photographic subwoofer artwork');
assert.ok(categoryRoute.includes('images.unsplash.com/photo-1558284296-7579da2deb30'), 'Category fallback must use photographic Home Entertainment artwork');

assert.ok(fs.existsSync('assets/brand-logos/sony.svg'), 'Missing local Sony brand wordmark');

assert.ok(route.includes('"sony":"/assets/brand-logos/sony.svg"'), 'Sony brand selector must use the local wordmark');

/* Department selection must remove the previous department menu before showing brands. */
assert.ok(route.includes('el("departments").hidden=!!department;el("audioDepartments").style.display=department?"none":"";'), 'Selecting an audio department must hide the previous department menu');
assert.ok(route.includes('"Home Entertainment":"https://images.unsplash.com/photo-1558284296-7579da2deb30'), 'Home Entertainment department must use photographic category artwork');
assert.ok(route.includes('"Car Audio":"https://images.unsplash.com/photo-1654447398824-dbcbefeafdd6'), 'Car Audio department must use a category-matched car-speaker photograph');
assert.ok(route.includes('"Band & Live Sound":"https://images.unsplash.com/'), 'Band & Live Sound must use photographic artwork');
assert.ok(route.includes('function departmentImage(value,label)'), 'Audio departments must use an explicit image map');
assert.ok(route.includes('window.location.assign("preview-audio.html?"+u.toString())'), 'Department buttons must navigate to the selected department route');
assert.ok(route.includes('new URLSearchParams({department:value})'), 'Department entry must preserve the brand-selection stage');
assert.ok(!route.includes('new URLSearchParams({department:value,brand:"All brands"})'), 'Department entry must not preselect All brands and skip brand navigation');
for (const asset of ['musical-instruments.svg','marine-audio.svg','lifestyle-audio.svg']) {
  assert.ok(fs.existsSync('assets/audio-types/'+asset), 'Missing dedicated audio department artwork: '+asset);
  assert.ok(builder.includes('audio-types/'+asset), 'New department artwork missing from public package: '+asset);
}

assert.ok(categoryRoute.includes('return artFor(label)||') && !categoryRoute.includes('data:image/svg+xml'), 'Category image fallback must remain photographic and never render an illustration');

assert.ok(route.includes('photo-1543017471-62c14029f7ce') && route.includes('photo-1470948062737-aeb014e274c2') && route.includes('photo-1738138986988-add3dd7cde9a'), 'Amplifier, head-unit and camera tiles must use their category-matched photographs');
assert.ok(route.includes('photo-1677230017860-a8cc67785f0a') && route.includes('photo-1759667880866-702f9f615489'), 'Harness/wiring and aerial tiles must use matching photographs');
assert.ok(brandRoute.includes('photo-1771554753127-8e5a90b5a61d'), 'Home Entertainment cable/accessory tiles must use audio-cable photography');
assert.ok(!route.includes('photo-1608043152269-423dbba4e7e1') && !productRoute.includes('photo-1608043152269-423dbba4e7e1') && !categoryRoute.includes('photo-1608043152269-423dbba4e7e1'), 'Old generic speaker fallback must be removed from customer-facing audio routes');

/* OneNav exact product enrichments: exact fitment, feature set, crop and private supplier-code handling. */
const oneNavPrado = planet.records.find(row => row.id === 'pw-2120');
const oneNavLandCruiser = planet.records.find(row => row.id === 'pw-2121');
assert.ok(oneNavPrado && oneNavLandCruiser, 'the two exact OneNav product rows must remain present');
for (const row of [oneNavPrado, oneNavLandCruiser]) {
  assert.equal(row.brandDisplayName, 'OneNav');
  assert.ok(row.description.includes('1024 × 600') && row.description.includes('Apple CarPlay') && row.description.includes('4 × 40 W'));
  assert.equal(row.imageCrop, true);
  assert.equal(row.imagePosition, 'center 40%');
  assert.ok(row.imageUrl && !row.imageUrl.includes('OA014-1') && !row.imageUrl.includes('OA015-1'));
  assert.equal(Object.hasOwn(row, 'supplierSku'), false);
  assert.equal(Object.hasOwn(row, 'supplier_sku_candidate'), false);
  assert.equal(Object.hasOwn(row, 'dealerCost'), false);
}
assert.ok(oneNavPrado.title.includes('Prado') && oneNavLandCruiser.title.includes('Land Cruiser Pick Up'));
assert.ok(oneNavPrado.manufacturerPage.includes('onenav.co.za/product/'));
assert.ok(oneNavLandCruiser.manufacturerPage.includes('onenav.co.za/product/'));
assert.ok(planet.productImageEnrichment && planet.productImageEnrichment.manufacturerDescriptionsVerified === 76);
assert.equal(planet.productImageEnrichment.exactImageCandidatesApplied, 68);
assert.equal(planet.productImageEnrichment.exactModelPagesReviewed, 77);
assert.equal(planet.records.filter(row => row.imageStatus === 'EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE').length, 2);
assert.equal(planet.records.filter(row => row.descriptionStatus === 'OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED').length, 8);
assert.ok(productListingRoute.includes('productPhotoCrop{width:100%;aspect-ratio:4/3;align-self:start;overflow:hidden'));
assert.ok(productListingRoute.includes('object-fit:cover;object-position:center 40%'));
assert.ok(productListingRoute.includes('img.style.objectPosition=p.imagePosition||\'center 40%\''));
assert.ok(productListingRoute.includes('p.brandDisplayName||p.brand'));

assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_status]==='EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE').length,2);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.description_status]==='OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED').length,8);

/* Check the actual remote image endpoints used by the preview, not only their URL strings. */
(async () => {
  const remoteAssets = [
    ['ONE / OneNav logo', ONE_LOGO],
    ['Amplified logo', AMPLIFIED_LOGO],
    ['OneNav Prado exact product image', oneNavPrado.imageUrl],
    ['OneNav Land Cruiser exact product image', oneNavLandCruiser.imageUrl],
  ];
  for (const [label, url] of remoteAssets) {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 GetWiredOwnerPreviewQA' },
      signal: AbortSignal.timeout(20000),
    });
    assert.ok(response.ok, label + ' returned HTTP ' + response.status);
    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    assert.ok(contentType.startsWith('image/'), label + ' did not return an image: ' + contentType);
    if (response.body) await response.body.cancel();
  }
  console.log('REMOTE_PREVIEW_ASSETS_PASS', JSON.stringify({ count: remoteAssets.length }));
})().catch(error => {
  console.error('REMOTE_PREVIEW_ASSETS_FAIL', error);
  process.exitCode = 1;
});

/* Product cards: keep media and details in two explicit grid columns and centre all product copy. */
assert.ok(productListingRoute.includes('media.className=\'productMedia\''), 'product media must be grouped into one grid column');
assert.ok(productListingRoute.includes('body.className=\'productDetails\''), 'product details must be grouped into one grid column');
assert.ok(productListingRoute.includes('card.append(media,body)'), 'product card must have exactly two top-level grid children');
assert.ok(productListingRoute.includes('.productDetails{min-width:0;text-align:center}'), 'product details must be centred');
assert.ok(productListingRoute.includes("raw.includes('multimedia')"), 'manufacturer multimedia receiver models must map to Head Units & Media Players');
const alpineHalo11Model = verified.records.find(row => row.modelNumber === 'ILX-F115D');
assert.ok(alpineHalo11Model && alpineHalo11Model.imageUrl && alpineHalo11Model.description, 'Alpine Halo 11 must have exact-model manufacturer image and verified description in the internal crosswalk');
const alpineHalo11Product = planet.records.find(row => /iLX-F115D/i.test(row.manufacturerProductName || ''));
assert.ok(alpineHalo11Product && alpineHalo11Product.imageUrl && alpineHalo11Product.description, 'Alpine Halo 11 enrichment must reach its matching public preview product row');

assert.ok(alpineHalo11Model.imageUrl.endsWith('/iLX-F115D_Alpine-Halo-11-XXL-11-Inch-Media-Receiver.jpg'), 'Alpine Halo 11 must use the verified official full-size model image, not a broken thumbnail or unrelated receiver image');
assert.equal(alpineHalo11Product.title, alpineHalo11Model.name, 'verified manufacturer product name must replace the misspelled supplier title in the customer preview');
assert.ok(enrichment.includes('product["title"] = manufacturer_name'), 'exact-model enrichment must publish the verified manufacturer title');
