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
const categoryPageRoute = fs.readFileSync('category.html', 'utf8');
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
assert.ok(route.includes('"one x":')&&route.includes('"onex":')&&route.includes('"amplified audio":'),'brand directory must resolve One X and Amplified Audio aliases to their official logo assets');
assert.ok(route.includes('aria-label="Kicker"]{min-width:154px')&&route.includes('aria-label="Kicker"] img{width:176px')&&route.includes('transform:scale(1.38)'),'Kicker brand mark must use the enlarged, wider directory tile treatment');
assert.ok(route.includes('/^(one|one nav|onenav)$/.test(normalized)')&&route.includes('/^(one x|onex)$/.test(normalized)')&&route.includes('normalized.includes("amplified")'),'brand button rendering must keep OneNav and One X on separate logo keys and resolve Amplified aliases');
assert.ok(route.includes('photo-1642784353476-d226d8d617b3'),'DJ Equipment must use a DJ-controller photograph, not a generic live-event image');
assert.ok(categoryRoute.includes('function logo(b)')===false,'brand landing route logo helper is isolated from the department route');
const brandLandingRoute=fs.readFileSync('preview-audio-brand.html','utf8');
const productListingRoute=fs.readFileSync('preview-audio-products.html','utf8');
assert.equal(planet.records.filter(row=>row.imageUrl).length,74,'74 exact product image candidates (68 verified-model plus six OneNav) must be attached to the correct source product rows');
const audisonVerified=verified.records.find(row=>row.modelNumber==='69051075');
const pioneerVerified=verified.records.find(row=>row.modelNumber==='DMH-AP6650BT');
assert.equal(audisonVerified.imageUrl,'https://static.audison.com/media/2022/10/APBMW-K4M.jpg','Audison APBMW K4M must use the exact official model image');
assert.equal(pioneerVerified.imageUrl,'https://www.pioneersouthafrica.co.za/cdn/shop/files/DMH-AP6650BT_2_700x_8e7b05bf-1886-41b7-a4c5-2631b50f0ac2.webp?v=1741857962&width=1946','Pioneer DMH-AP6650BT must use the exact South African model image');
assert.ok(audisonVerified.description.includes('100 W peak / 50 W continuous')&&pioneerVerified.description.includes('9-inch WSVGA capacitive multimedia receiver'),'manufacturer specifications must be present in the matching product descriptions');
assert.equal(planet.records.filter(row=>row.manufacturerProductName&&row.description).length,113,'68 verified manufacturer records plus forty-five OneNav records must carry verified descriptions');
assert.equal(planet.records.filter(row=>row.manufacturerProductName).length,113,'all 68 verified manufacturer records plus forty-five OneNav exact product pages must be named');
assert.equal(planet.records.filter(row=>row.imageStatus==='EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE').length,39,'thirty-nine exact OneNav model pages still have no approved image and must not receive a generic substitute');
assert.ok(!productListingRoute.includes('p.imageUrl||typeImage(component)'),'individual product cards must never substitute a generic product-type photograph');
assert.ok(productListingRoute.includes('Exact product photo pending verification'),'products without exact images must show an honest pending state, not an unrelated photo');
assert.ok(productListingRoute.includes("title.className='productModel'")&&productListingRoute.includes("p.modelNumber||p.manufacturerProductName||p.title||p.name||'Product'"),'audio product cards must show the verified model first, falling back only to the verified catalogue title');
assert.ok(productListingRoute.includes("meta.className='meta productBrand'")&&productListingRoute.includes("body.append(title,meta,desc,price)"),'brand must appear immediately below the product model, followed by description and price');
assert.ok(productListingRoute.includes("desc.className='productDescription'")&&productListingRoute.includes("desc.textContent=p.description||'Product details to be confirmed.'"),'customer description must retain the verified concise product description and an honest pending state');
assert.ok(productListingRoute.includes("price.className='price productPrice'")&&productListingRoute.includes("toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2})"),'verified product prices must display in South African Rand formatting');
assert.ok(productListingRoute.includes("media.append(missingPhoto())")&&productListingRoute.includes("img.alt=p.title||component"),'exact product photo or explicit missing-photo state must be retained');
assert.ok(!productListingRoute.includes('supplierSku')&&!productListingRoute.includes('gwSku')&&!productListingRoute.includes('Supplier SKU'),'customer-facing audio cards must not expose supplier or internal GW SKU fields');

assert.ok(!route.includes('planetworld-verified-models-preview.json')&&!brandLandingRoute.includes('planetworld-verified-models-preview.json')&&!productListingRoute.includes('planetworld-verified-models-preview.json'),'customer routes must not fetch the internal supplier model crosswalk');
assert.ok(!builder.includes('planetworld-verified-models-preview.json'),'public Pages package must not include the internal supplier model crosswalk');
assert.ok(planet.records.every(row=>!Object.hasOwn(row,'modelNumber')&&!Object.hasOwn(row,'supplierSku')),'public product JSON must not expose supplier SKU/model-number crosswalk fields');
const imageAudit=parseCsvRows(fs.readFileSync('catalogue-review/PLANETWORLD_PRODUCT_IMAGE_AUDIT_2026-11-05.csv','utf8'));
const imageAuditRows=imageAudit.slice(1);
const imageAuditIndex=Object.fromEntries(imageAudit[0].map((key,index)=>[key,index]));
const oneNavAuditSource=fs.readFileSync('catalogue-review/planetworld-one-official-model-audit.csv','utf8');
assert.ok(['OA115-1','OA115-3','OA195-1','OA197-1','OA198-1','OA198-2','OA199-1','OA017-2','OA266-1','OA716-1','OA713-1','OA429-1','OA428-1','OA426-1','OA717-1','OA425-1','OA427-1','OA715-1','OA009-2','OA012-1','OA016-1','OA110-1','OA115-2','OA192-1','OA194-1','OA263-1','OA712-1','OA714-1','OA196-1','OA261-1','OA711-1'].every(sku=>oneNavAuditSource.includes(sku)),'all tracked OneNav source SKU audits must remain present');
assert.equal(imageAuditRows.length,3317,'internal image audit must account for every Planetworld source product');
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_url]).length,74);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_status]==='EXACT_MODEL_PAGE_VERIFIED_IMAGE_NOT_AVAILABLE').length,39);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_status]==='NO_EXACT_MODEL_IMAGE_MATCH').length,3204);
assert.ok(brandLandingRoute.includes(ONE_LOGO)&&brandLandingRoute.includes(AMPLIFIED_LOGO),'dedicated brand pages must show the same official ONE/OneNav and Amplified logos');
assert.ok(brandLandingRoute.includes('const ONENAV_WORDMARK=')&&brandLandingRoute.includes("if(n==='one'||n==='onenav'||n.includes('onenav'))return ONENAV_WORDMARK")&&brandLandingRoute.includes("if(n==='one x'||n==='onex')return")&&brandLandingRoute.includes("if(n.includes('amplified'))"),'dedicated brand landing page must keep OneNav, One X and Amplified marks distinct');
assert.ok(brandLandingRoute.includes("img[alt*='Kicker']{width:135px!important;height:80px!important;max-width:none!important;transform:scale(1.5)!important"),'Kicker brand landing logo must be enlarged');
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
assert.ok(audioCategoryPage.includes('photo-1642784353476-d226d8d617b3')&&audioCategoryPage.includes('studio equipment'),'DJ and Studio Equipment category cards must have dedicated photographic artwork');
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
assert.equal(verifiedImageCount, 68, '68 exact-model image URLs are present, including five owner-authorized manufacturer image candidates');
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
assert.equal(audioConnections.records.filter(row => row.brand !== 'Sony' && /(?:W RMS|RMS\/peak basis not stated)/i.test(row.description || '')).length, 25, '25 non-Sony power descriptions are present after removing the unresolved RMS claim');
const spectrum15000 = audioConnections.records.find(row => row.modelNumber === 'SSW-SV2-15000R');
assert.ok(spectrum15000 && !/RMS/i.test(spectrum15000.description), 'Spectrum 15000 uses the manufacturer model and omits the unresolved RMS rating');
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
assert.equal(audioConnections.records.filter(row => row.imageUrl).length, 66);
const raEl4=audioConnections.records.find(item=>item.modelNumber==='RA-EL4');
assert.ok(raEl4&&raEl4.imageUrl==='https://i0.wp.com/myaudioandsecurity.co.za/wp-content/uploads/2025/06/23-286-1.png?resize=600%2C319&ssl=1'&&raEl4.manufacturerListedModel==='RA-EL4','supplier descriptor RA AWG4 must resolve to the Reference Audio RA-EL4 photo');
const raSt20=audioConnections.records.find(item=>item.modelNumber==='RA SUPER RAST20');
assert.ok(raSt20&&raSt20.manufacturerListedModel==='RA-ST20'&&raSt20.imageUrl==='https://zaybees.co.za/wp-content/uploads/2022/08/Screenshot_20220816-121305_Facebook-324x324.jpg'&&raSt20.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH','RA SUPER RAST20 must resolve to the exact RA-ST20 product photo');
const ssak860=audioConnections.records.find(item=>item.modelNumber==='860');
assert.ok(ssak860&&ssak860.manufacturerListedModel==='SSAK-860'&&ssak860.imageUrl==='https://cc-prod.eu.saleor.cloud/media/thumbnails/products/15770173_c306d700_thumbnail_2048.webp'&&ssak860.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH','supplier 860 must resolve to the exact SSAK-860 kit photo');
assert.ok(ssak860.description.includes('5m blue 8-gauge power cable')&&ssak860.description.includes('80A fuse'),'SSAK-860 description must retain verified wiring-kit contents');
const sswSpectr=audioConnections.records.find(item=>item.modelNumber==='SSW-SV2-15000R');
assert.ok(sswSpectr&&sswSpectr.manufacturerListedModel==='SSW-SV2-15000R'&&sswSpectr.imageUrl==='https://starsound.co.za/wp-content/uploads/2026/05/SSW-SV2-15000R_b.jpg'&&sswSpectr.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH','Spectrum 15000 must use the manufacturer model and official product photo');
assert.ok(sswSpectr.description.includes('3-inch')&&sswSpectr.description.includes('37–500Hz')&&!/RMS/i.test(sswSpectr.description)&&sswSpectr.brandNote.includes('Power-rating claims are omitted'),'Spectrum 15000 must retain verified features while withholding the unresolved RMS rating');
const sony160=audioConnections.records.find(item=>item.modelNumber==='XS-160ES');
assert.ok(sony160&&sony160.imageUrl==='https://cdn11.bigcommerce.com/s-oqfwjl/images/stencil/1280x1280/products/42271/282815/xs-160es__6__98080.1682532246.jpg?c=2'&&sony160.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH','Sony XS-160ES must use its exact model image');
const sony680=audioConnections.records.find(item=>item.modelNumber==='XS-680ES');
assert.ok(sony680&&sony680.imageUrl==='https://content.abt.com/image.php/0dd3b4294d03e84022974cc942bc29bc?canvas=&ck=2&height=600&image=%2Fimages%2Fproducts%2FBDP_Images%2FSony-Mobile-ES-6x8-2-Way-Coaxial-Speakers-XS680ES.jpg&width=650'&&sony680.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH','Sony XS-680ES must use its exact model image');

const wiringKit412=audioConnections.records.find(item=>item.modelNumber==='SSAK-412');
assert.ok(wiringKit412&&wiringKit412.imageUrl==='https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-4-Gauge-Wiring-Kit-Star-Sound-21184996.jpg?v=1724052666&width=1946'&&wiringKit412.manufacturerListedModel==='SSAK-412','supplier code 412P must resolve to the verified manufacturer SSAK-412 image');

for (const [model,url] of [["SSA-R-2250.2","https://maxmotorsport.co.za/cdn/shop/products/Star-Sound-Rapter-Series-2-Channel-Amplifier-_2250W_-maxmotorsports-1631612487.jpg?v=1631612489&width=1946"],["SSA-R-6200.1D","https://osmans.co.za/image/product/1_ssar62001d.png"],["SSA-R-6900.1D","https://i0.wp.com/myaudioandsecurity.co.za/wp-content/uploads/2021/10/3-1117-1.png?fit=1200%2C638&ssl=1"]]) {
 const row=audioConnections.records.find(item=>item.modelNumber===model);
 assert.ok(row && row.imageUrl===url && row.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH',model+' exact manufacturer model photo must be present');
}

assert.equal(audioConnections.records.filter(row => !row.imageUrl).length, 0, 'all supplier records now have a model-matched image URL');
assert.equal(audioConnections.records.filter(row => row.description).length, 66, 'all Audio Connections preview products must carry a description');
assert.ok(audioConnections.records.filter(row => row.imageUrl).every(row => row.imageSourceUrl && ['OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH','OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_LOW_RES'].includes(row.imageStatus)), 'every exact product photo must include its source page and owner-authorized exact-model status');
assert.ok(audioConnections.records.filter(row => row.imageUrl).every(row => !/unsplash|photo-/.test(row.imageUrl)), 'product cards must never use category artwork as product photography');
const audioImageAudit = readJson('catalogue-review/AUDIO_CONNECTIONS_MISSING_PRODUCT_IMAGES_2026-11-05.json');
assert.equal(audioImageAudit.recordsWithImage,66);
assert.equal(audioImageAudit.recordsMissingVerifiedImage,0);
assert.equal(audioImageAudit.missing.length,0)
for (const [model,url] of [["SS7655BT","https://maxmotorsport.co.za/cdn/shop/files/Starsound-SSMP5-7655BT-7_-Double-Din-Media-Player-with-USB-Mirrorlink-Bluetooth-Max-Motorsport-31467952.jpg?v=1778856552&width=1946"],["SSA-R-22000.1","https://evolutionwheelandtyre.com/cdn/shop/files/SSA-R-222000.1.jpg?v=1753284493"]]) {
 const row=audioConnections.records.find(item=>item.modelNumber===model);
 assert.ok(row && row.imageUrl===url && row.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH',model+' exact model image must be present');
}

for (const [model,url] of [["809","https://soundvision.co.za/cdn/shop/files/FullSizeRender_bb982026-b146-4342-9a89-821443145f3c_1200x1200.jpg?v=1707141200"],["USB230","https://media.takealot.com/covers_images/2609be80b2454250b9c752cd71903ebf/s-zoom.file"],["SS7655BT","https://maxmotorsport.co.za/cdn/shop/files/Starsound-SSMP5-7655BT-7_-Double-Din-Media-Player-with-USB-Mirrorlink-Bluetooth-Max-Motorsport-31467952.jpg?v=1778856552&width=1946"],["DVD9900BT","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-SSDVD-9900BT-DVD-Front-Loader-Media-Player-With-USB-_-Bluetooth-Max-Motorsport-21232518.jpg?v=1725975624"],["SS7670","https://maxmotorsport.co.za/cdn/shop/files/7-Inch-Star-Sound-SSMP5-7670BTAC-MP5-Double-Din-With-Apple-Carplay-_-Android-Auto-Roadstar-26055736.jpg?v=1751964226&width=1206"],["SSAK-406P","https://maxmotorsport.co.za/cdn/shop/products/Starsound-4-Gauge-Wiring-Kit-Max-Motorsport-1624452639.jpg?v=1624452641&width=1946"],["409CU","https://newworld.co.za/cdn/shop/files/81oNOU9KY_L_900x.jpg?v=1760011854"],["CROSSOVER 2950","https://img.bobshop.co.za/f_auto%2Cc_fit%2Cw_300%2Ch_300%2Cd_notfound.png/user/4257496/SSA-2950_1_FsxDYWN9C.png"]]) {
 const row=audioConnections.records.find(item=>item.modelNumber===model);
 assert.ok(row && row.imageUrl===url && row.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH',model+' exact-model image source must be recorded');
}

for (const [model,url] of [["RABTR03","https://evolutionwheelandtyre.com/cdn/shop/files/RA-BTR03.jpg?v=1753285755"],["SSW-B12-2800","https://starsound.co.za/wp-content/uploads/2026/05/SSW-B12-2800_a.jpg"],["SSWF10\"-4150SVC","https://starsound.co.za/wp-content/uploads/2026/05/SSW-F10-4150SVC_a.jpg"],["SSWF10 2650SVC","https://starsound.co.za/wp-content/uploads/2026/05/SSW-F10-2650-720x484.jpg"],["SSA-SP-9900.1","https://starsound.co.za/wp-content/uploads/2026/05/SSA-SP-9900.1_a.jpg"],["SSA-H-8200.1","https://audiocorner.co.za/wp-content/uploads/2025/06/Star-Sound-Hazard-Series-Monoblock-Amplifier-_8200W_-Star-Sound-1630051456_900x-1.jpg"],["SSA-SB2000.1","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-SSA-SB-2000.1-Monoblock-Amplifier-_2000W_-Star-Sound-20995343.jpg?v=1718011177&width=990"],["SSA-J-10000.4","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-SSA-J-10000.4-Joker-4-Channel-Amplifier-_10-000W_-Star-Sound-21793214.jpg?v=1737742864&width=1946"],["SSA-M4-80.4","https://img.bobshop.co.za/f_auto%2Cc_fit%2Cw_900%2Ch_900%2Cd_notfound.png/user/4905905/STARSOUND_SSA-M4-80.4_PICTURE_1_YjQ1_by_Xx.jpg"],["PRO6.5-700","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-SSS-PRO6.5-700-6.5_-Bullet-Mids-_700W_-Star-Sound-31378452.jpg?v=1775657493&width=1946"],["SS-PRO6X9-900","https://starsound.co.za/wp-content/uploads/2026/05/SSS-PRO6x9-900_a.jpg"],["TAXI-4G","https://www.fastrak.co.za/cdn/shop/files/SSAK-TAXI-4G-01.png?v=1781775881"],["SST-550","https://www.fastrak.co.za/cdn/shop/files/2014483000000starsound-real-titanium-dome-super-tweeter-sst-550-4667579.png?v=1781184011&width=1000"],["SST-850","https://www.fastrak.co.za/cdn/shop/files/2013868000000-4442150.png?v=1760371644"],["SSW-F12-5150SVC","https://starsound.co.za/wp-content/uploads/2026/05/SSW-F12-5150SVC_a.jpg"]]) {
 const row=audioConnections.records.find(item=>item.modelNumber===model);
 assert.ok(row && row.imageUrl===url && row.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH',model+' exact-model image source must be recorded');
}

for (const [model,url] of [["SSS-5502","https://starsound.co.za/wp-content/uploads/2026/05/SSS-5502_a.jpg"],["SSS-6501PRO","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-SSS-6501PRO-6.5_-Pro-Series-Mids-_650W_-Targa-21231177.jpg?v=1725968381"],["SSS-6601","https://starsound.co.za/wp-content/uploads/2026/05/SSS-6601_a.jpg"],["SSS-6903","https://starsound.co.za/wp-content/uploads/2026/05/SSS-6903_a.jpg"],["SSD-620","https://starsound.co.za/wp-content/uploads/2026/05/SSD-620_a.jpg"],["SST350","https://www.fastrak.co.za/cdn/shop/files/2007608000000starsound-sst-350-1-350w-car-tweeter-3340580.png?v=1780672664"],["EQ5100","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-SSA-EQ-5100-5-Band-Equalizer-Star-Sound-21231784.jpg?v=1725973962&width=1946"],["SSA-M5-80.600","https://gunmansa.co.za/cdn/shop/files/Star-Sound-SSA-M5-80-600-High-Fidelity-Class-D-5-Channel-Amplifier-LUMINA-AUDIO-26321921.jpg?v=1778838988"],["CROSSOVER 2900","https://soundvision.co.za/cdn/shop/products/image_9ed13de5-9f02-4f13-9700-fdc298aff210_2048x2048.jpg?v=1637320397"],["SSS-6602","https://starsound.co.za/wp-content/uploads/2026/05/SSS-6602_a.jpg"]]) {
 const row=audioConnections.records.find(item=>item.modelNumber===model);
 assert.ok(row && row.imageUrl===url && row.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH',model+' exact image must match the correct catalogue model');
}

for (const [model,url] of [["XS-163ES","https://www.gentec-intl.com/cdn/shop/files/XS163ES_2.jpg?v=1696557091&width=3000"],["XS-162ES","https://sonyworld.ae/cdn/shop/products/XS-162ES-2.jpg?v=1662726477"],["XS-692ES","https://store.sony.com.au/dw/image/v2/ABBC_PRD/on/demandware.static/-/Sites-sony-master-catalog/default/dw5f0d00ad/images/XS692ES/XS692ES.png?sh=442&sm=fit&sw=442"],["XS-W104ES","https://www.gentec-intl.com/cdn/shop/files/XSW104ES_1.jpg?v=1696556764"],["XS-W122ES","https://cdn11.bigcommerce.com/s-oqfwjl/images/stencil/1280x1280/products/42264/282760/xs-w122es__1__83670.1682532226.jpg?c=2"],["XS-W124ES","https://caraudiocentre.co.uk/cdn/shop/files/sony-43575646486809.jpg?v=1700315830"],["XM-1ES","https://cdn11.bigcommerce.com/s-oqfwjl/images/stencil/1280x1280/products/42263/282755/xm-1es-03__1__68713.1682532223.jpg?c=2"],["XM-4ES","https://cdn11.bigcommerce.com/s-bqki9c9t/images/stencil/1280x1280/products/145140/349259/xm4es_003__19533.1749148815.jpg?c=2"],["XM-6ES","https://cdn11.bigcommerce.com/s-oqfwjl/images/stencil/1280x1280/products/43058/286663/xm-6es-02__1__18213.1691599723.jpg?c=2"],["XM-8ES","https://www.caraudioexpress.co.uk/cdn/shop/files/XM-8ES_Product4_in_stock.webp?v=1766579001&width=1534"],["SSW-12-6300","https://starsound.co.za/wp-content/uploads/2026/06/SSW-12-6300_a.jpg"],["SSW12-7300","https://starsound.co.za/wp-content/uploads/2026/05/SSW-12-7300_a.jpg"],["SSW-12W-5200","https://starsound.co.za/wp-content/uploads/2026/05/SSW-12W5200_a.jpg"],["SSW-8-8000D2","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-8_-SSW-8-8000D2-DVC-D2-Subwoofer-_8000W_-Star-Sound-21402422.jpg?v=1729072237&width=1445"],["SSW-F12-5150SVC","https://starsound.co.za/wp-content/uploads/2026/05/SSW-F12-5150SVC_a.jpg"],["SSA-ATOM-13500.1","https://maxmotorsport.co.za/cdn/shop/files/Star-Sound-Atom-Series-Micro-Monoblock-Amplifier-_13500W_-Star-Sound-31026433.jpg?v=1770022846"],["SSA-ATOM-13800.4","https://ismotorsport.co.za/cdn/shop/files/e8c8a9b2ed9973beea6b6736cdd4c929.jpg?v=1744810004"],["SSA-R-5000.4","https://www.fastrak.co.za/cdn/shop/files/6007762006336-8790302.png?v=1760469016&width=1000"],["SSS-6602","https://starsound.co.za/wp-content/uploads/2026/05/SSS-6602_a.jpg"],["USB450BTDD","https://cdn.shopify.com/s/files/1/0263/1149/1629/files/SSUSB-450BTDD.jpg?v=1748037061&width=1200"]]) {
  const row=audioConnections.records.find(item=>item.modelNumber===model);
  assert.ok(row && row.imageUrl===url && row.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH',model+' must use its matched owner-authorized exact-model image');
}

assert.equal(hornet.imageUrl,'https://starsound.co.za/wp-content/uploads/2026/10/SSA-HORNET-7600.4_WEB_PIC_1.jpg');
assert.equal(hornet.imageStatus,'OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH');
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

const oneNavImageCount = planet.records.filter(row => row.brandDisplayName === 'OneNav' && row.imageUrl).length;
const imageCount = verifiedImageCount + audioConnections.records.filter(row => row.imageUrl).length + oneNavImageCount;
assert.equal(imageCount, 142, '68 verified-model + 66 Audio Connections + eight OneNav exact-fitment image candidates');
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
assert.ok(!categoryRoute.includes('data:image/svg+xml'), 'Customer-facing category fallbacks must not generate cartoon SVGs; brand wordmarks are audited separately');
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
const oneNavBaleno = planet.records.find(row => row.imageUrl && row.imageUrl.includes('/oa716-1/pictures/oa716-1-suzuki-baleno_'));
assert.ok(oneNavBaleno && oneNavBaleno.title.includes('Baleno') && oneNavBaleno.title.includes('Starlet'), 'OA716-1 must retain the exact Planetworld Baleno/Starlet product image');
assert.equal(oneNavBaleno.imageCrop, false, 'OA716-1 square manufacturer asset must keep its explicit no-crop decision and render contained');
assert.equal(oneNavBaleno.imageStatus, 'EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE');
assert.ok(oneNavPrado.manufacturerPage.includes('onenav.co.za/product/'));
assert.ok(oneNavLandCruiser.manufacturerPage.includes('onenav.co.za/product/'));
assert.ok(planet.productImageEnrichment && planet.productImageEnrichment.manufacturerDescriptionsVerified === 113);
assert.equal(planet.productImageEnrichment.exactImageCandidatesApplied, 74);
assert.equal(planet.productImageEnrichment.exactModelPagesReviewed, 113);
assert.equal(planet.records.filter(row => row.imageStatus === 'EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE').length, 8);
assert.equal(planet.records.filter(row => row.descriptionStatus === 'OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED').length, 43);
assert.equal(planet.records.filter(row => row.descriptionStatus === 'OFFICIAL_ONENAV_EVOLUTION_SPECIFICATION_VERIFIED').length, 1);
assert.equal(planet.records.filter(row => row.descriptionStatus === 'OFFICIAL_ONENAV_UNCLASSIFIED_SPECIFICATION_VERIFIED').length, 1, 'OA266-1 series remains unclassified because the official page does not identify Classic, Evolution or Pro');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-isuzu-2012/')?.description.includes('Isuzu vehicles from 2012+'),'OA115-1 exact Isuzu fitment description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-isuzu-2/')?.description.includes('Isuzu'),'OA115-3 exact Isuzu fitment description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-kia-rio-2016/')?.description.includes('Kia Rio'),'OA195-1 exact Kia Rio description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-for-hyundai-accent-2010-2014/')?.description.includes('Hyundai Accent'),'OA197-1 exact Hyundai Accent description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-i-20-2019/')?.description.includes('Hyundai i20'),'OA198-1 exact Hyundai i20 2019+ description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-hyundai-i-20-2014-2019/')?.description.includes('Hyundai i20'),'OA198-2 exact Hyundai i20 2014-2019 description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-tucson-2018/')?.description.includes('Hyundai Tucson'),'OA199-1 exact Tucson description must be present');
assert.ok(planet.records.find(row=>row.title==='OneNav Classic 10.1inch for Corrola Cross (2021+)')?.description.includes('Corolla Cross'),'OA016-2 must carry its verified Corolla Cross description');
assert.ok(planet.records.find(row=>row.title==='OneNav Classic 9inch for Fortuner (2016-2019)')?.description.includes('Fortuner'),'OA017-1 must carry its verified Fortuner description');
assert.ok(planet.records.find(row=>row.title==='OneNav Classic 10.1inch for Hilux (2019+)')?.description.includes('Hilux'),'OA018-2 must carry its verified Hilux description');
assert.ok(planet.records.find(row=>row.title==='OneNav Classic 10.1inch for Nissan Terra (2022+)')?.description.includes('Nissan Terra'),'OA416-1 must carry its verified Nissan Terra description');
assert.ok(planet.records.find(row=>row.title==='OneNav Classic 10.1inch for GWM Steed 5E')?.description.includes('GWM Steed 5E'),'OA509-1 must carry its verified GWM description');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-toyota-280mm-2/')?.description.includes('Toyota 280mm'),'OA009-2 Toyota 280mm description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-101inch-for-rav4-2019')?.description.includes('Toyota RAV4'),'OA012-1 RAV4 description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-101inch-for-corrola-2019')?.description.includes('Toyota Corolla'),'OA016-1 Corolla description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-9inch-for-toyota-quantum-2019')?.description.includes('Toyota Quantum'),'OA110-1 Quantum description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://onenav.co.za/product/onenav-classic-9inch-for-isuzu/')?.description.includes('Isuzu'),'OA115-2 Isuzu description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-9inch-for-kia-sportage-2019')?.description.includes('Kia Sportage'),'OA192-1 Kia Sportage description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-9inch-for-kia-picanto-2018')?.description.includes('Kia Picanto'),'OA194-1 Kia Picanto description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-ford-xl-ranger-2015-2020-9-inch')?.description.includes('Ford XL Ranger'),'OA263-1 Ford XL Ranger description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-9inch-for-ignis-2018')?.description.includes('Suzuki Ignis'),'OA712-1 Ignis description must be present');
assert.ok(planet.records.find(row=>row.manufacturerPage==='https://nxtleveltech.co.za/product/onenav-classic-9inch-for-vitara-2018')?.description.includes('Suzuki Vitara'),'OA714-1 Vitara description must be present');
assert.ok(planet.records.find(row=>row.title.includes('Hyundai Venue 2019+'))?.description.includes('Hyundai Venue'),'OA196-1 Venue fitment description must be present');
assert.ok(planet.records.find(row=>row.title.includes('Everest/Ranger/Mazda BT-50 (2006-10)'))?.description.includes('Mazda BT-50'),'OA261-1 2006-2010 fitment description must be present');
assert.ok(planet.records.find(row=>row.title.includes('Ertiga (2018+)'))?.description.includes('Suzuki Ertiga'),'OA711-1 Ertiga fitment description must be present');
assert.ok(productListingRoute.includes('productPhotoCrop{width:100%;aspect-ratio:4/3;align-self:start;overflow:hidden'));
assert.ok(productListingRoute.includes('object-fit:cover;object-position:center 40%'));
assert.ok(productListingRoute.includes('img.style.objectPosition=p.imagePosition||\'center 40%\''));
assert.ok(productListingRoute.includes('p.brandDisplayName||p.brand'));

assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.image_status]==='EXACT_MODEL_IMAGE_AVAILABLE_OWNER_PREVIEW_CANDIDATE').length,8);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.description_status]==='OFFICIAL_ONENAV_CLASSIC_SPECIFICATION_VERIFIED').length,43);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.description_status]==='OFFICIAL_ONENAV_EVOLUTION_SPECIFICATION_VERIFIED').length,1);
assert.equal(imageAuditRows.filter(row=>row[imageAuditIndex.description_status]==='OFFICIAL_ONENAV_UNCLASSIFIED_SPECIFICATION_VERIFIED').length,1);

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

const eq7100=audioConnections.records.find(item=>item.modelNumber==='EQ7100');
assert.ok(eq7100&&eq7100.imageUrl==='https://maxmotorsport.co.za/cdn/shop/products/Star-Sound-7-Band-Equalizer-Star-Sound-1625547744.jpg?v=1625547748&width=1946'&&eq7100.manufacturerListedModel==='SSA-EQ-7100'&&eq7100.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH','EQ7100 must use the exact SSA-EQ-7100 product photo, with the exact SSA-EQ-7100 model code visible on the photo');
assert.ok(eq7100.description.includes('11V RMS')&&eq7100.description.includes('±18dB')&&eq7100.description.includes('33–250Hz')&&eq7100.description.includes('90dB'),'EQ7100 description must retain the verified equaliser specifications');

const lynx=audioConnections.records.find(item=>item.modelNumber==='BULLET LYNX');
assert.ok(lynx&&lynx.imageStatus==='OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_LOW_RES'&&lynx.imageQualityNote.includes('105px'),'Blackspider Lynx must disclose low-resolution thumbnail status');
