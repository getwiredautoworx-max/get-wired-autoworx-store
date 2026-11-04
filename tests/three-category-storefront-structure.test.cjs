'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = p => fs.readFileSync(p, 'utf8');
const tree = JSON.parse(read('assets/category-tree.json'));
const home = read('index-new.html');
const categoryPage = read('category.html');
const asc = JSON.parse(read('assets/asc-catalogue-preview-data.json'));
const planet = JSON.parse(read('assets/planetworld-catalogue-preview.json'));
const verifiedModels = JSON.parse(read('assets/planetworld-verified-models-preview.json'));
const audio = JSON.parse(read('assets/audio-connections-catalogue-preview.json'));
const audioPage = read('preview-audio.html');
const planetPage = read('preview-planetworld.html');
const ascPage = read('asc-catalogue-preview.html');
const builder = read('scripts/build-cloudflare-pages-public.py');
const ownerPreview = read('owner-preview.html');
const categoryCleanup = read('assets/category-cleanup.js');
const shellCss = read('assets/storefront-subpage-shell.css');
const previewCategory = read('preview-category.html');
const returns = read('returns-refunds.html');
const shellPages = ['category.html','products.html','product.html','preview-category.html','preview-products.html','preview-product.html','preview-planetworld.html','preview-audio.html','asc-catalogue-preview.html','returns-refunds.html','terms-and-conditions.html','privacy-policy.html','checkout-v2.html'].map(read);
const legacyPreview = read('preview-store.html');
const roots = tree.categories.filter(c => c.active && c.parent_id === null)
  .sort((a,b) => a.sort_order-b.sort_order).map(c => [c.id,c.name]);
assert.deepEqual(roots, [
  ['1a13bc42-4f54-44f6-9658-36d141b77f4b','Car Audio / Home Entertainment / Lifestyle'],
  ['ba263c9f-d038-48bd-bca0-944f3ebdc5e9','Auto Electrical Parts & Spares'],
  ['f98e7589-20a0-4825-9707-2680d29e5cb6','Car Care & Accessories']
]);
const categoryClickHandler = home.slice(home.indexOf("document.addEventListener('click',e=>{const lm="), home.indexOf("document.getElementById('searchInput')?.addEventListener('input'"));
assert.ok(categoryClickHandler.includes("Array.from(wrap.children).find(el=>el.classList&&el.classList.contains('children'))"), 'category expansion must locate direct child containers without :scope selector dependency');
assert.ok(categoryClickHandler.includes("Array.from(parent.children).filter(w=>w!==wrap"), 'opening one category must close sibling categories using browser-compatible direct-child traversal');
assert.ok(!categoryClickHandler.includes(':scope'), 'category expansion must not depend on :scope selectors unsupported by older embedded Android browsers');
assert.ok(home.indexOf("categories=await snapshot();renderCats();")<home.indexOf("const categoryTask=(async()=>"), 'approved local category tree must render before remote Supabase refresh');
assert.ok(home.includes('setTimeout(()=>controller.abort(),7000)'), 'remote category refresh must be bounded so it cannot hold category rendering');
assert.ok(home.includes("apiAll('categories?select=id,name,slug,parent_id,active&active=eq.true&order=name.asc',1000,controller.signal)"), 'category API timeout must abort the actual remote fetch');
assert.ok(home.includes('Remote category response incomplete; retaining approved local category tree.'), 'category loader must retain the local snapshot when Supabase category rows are incomplete');
assert.ok(home.includes("fetch('assets/category-tree.json',{cache:'no-store',signal:controller.signal})"), 'approved local category snapshot fallback must remain available and bounded');
assert.ok(categoryCleanup.includes("const mainRootIds=['1a13bc42-4f54-44f6-9658-36d141b77f4b','ba263c9f-d038-48bd-bca0-944f3ebdc5e9','f98e7589-20a0-4825-9707-2680d29e5cb6']"), 'all three approved roots must survive category cleanup without products');
for (const [id,label] of roots) {
  assert.ok(home.includes(id) && home.includes(label), 'storefront root '+label);
  assert.ok(categoryPage.includes(id) && categoryPage.includes(label), 'category page root '+label);
}
const children = name => tree.categories.filter(c => c.active && c.name === name);
for (const name of ['Car Audio','Home Entertainment','Band Equipment','DJ Equipment','Instruments','Lifestyle'])
  assert.ok(children(name).some(c => c.parent_id === roots[0][0]), name+' must be under combined root');
for (const name of ['Vacuum Cleaners','Pool Cleaners'])
  assert.ok(children(name).some(c => c.parent_id === children('Lifestyle')[0].id), name+' must be under Lifestyle');
assert.ok(home.includes("audioSearch:'vacuum'") && home.includes("audioSearch:'pool'"));
assert.ok(home.includes("audioDepartment:'Lifestyle',audioSearch:'vacuum'"), 'vacuum cleaners must route through Lifestyle');
assert.ok(home.includes("audioDepartment:'Lifestyle',audioSearch:'pool'"), 'pool cleaners must route through Lifestyle');
const lifestyleProducts = planet.records.filter(p => p.division === 'Home Retail' && /vacuum|pool/i.test(p.title||''));
assert.ok(lifestyleProducts.length > 0, 'Planetworld Home Retail includes vacuum/pool products for Lifestyle');
assert.ok(lifestyleProducts.every(p => p.collection === 'Home Entertainment'), 'Lifestyle products must be separated from Home Entertainment by division');
assert.ok(planet.records.some(p => p.division === 'Home CI' && p.collection === 'Home Entertainment'), 'Home Entertainment collection remains populated by Home CI');
assert.ok(audioPage.includes('["Car Audio & Video","Car Audio"]'), 'the single Car Audio department button must be labelled Car Audio & Video');
assert.ok(!audioPage.includes('["Car Audio","Car Audio"]'), 'duplicate Car Audio department label must not return');
assert.ok(audioPage.includes('if(/^(car audio|car audio & video|car audio and video|all car audio products)$/.test(raw))return "";'), 'Car Audio collection labels must not be duplicated as product-type buttons');
assert.ok(audioPage.includes('if(p.collection==="Harnesses & Trims"||p.component==="Harnesses, Trims & Fitment")return "Harnesses, Trims & Fitment";'), 'Harnesses, Trims & Fitment must use the dedicated source collection, not broad keyword matches');
assert.equal(planet.records.filter(p=>p.collection==="Harnesses & Trims"&&p.component==="Harnesses, Trims & Fitment").length,47,'the separate harness/trim/fitment button must resolve to the 47 dedicated Planetworld records');
assert.equal(audio.records.filter(p=>p.collection==="Harnesses & Trims"||p.component==="Harnesses, Trims & Fitment").length,0,'generic Audio Connections installation kits must not leak into the dedicated Planetworld fitment group');
assert.ok(audioPage.includes('filter(label=>!/^(car audio|car audio & video|car audio and video|all car audio products)$/i.test(label))'), 'department labels must be excluded from product-type buttons');
assert.ok(audioPage.includes('["Lifestyle","Lifestyle"]'), 'Lifestyle must be a selectable catalogue department');
assert.ok(audioPage.includes('"https://upload.wikimedia.org/wikipedia/commons/b/bc/JBL_logo.svg"'), 'JBL brand button must use the JBL logo');
assert.ok(audioPage.includes('"https://upload.wikimedia.org/wikipedia/commons/b/b3/Denon_Logo.svg"'), 'Denon brand button must use the Denon logo');
assert.ok(audioPage.includes('"https://static.hertz-audio.com/media/2021/04/hertz_payoff_thesoundexperience.svg"'), 'Hertz brand button must use the official Hertz Audio logo');
assert.ok(audioPage.includes('brandNames.push("Hertz")'), 'Hertz must remain a visible Car Audio brand button while its source review is pending');
assert.ok(audioPage.includes('Speakers & Component Kits') && audioPage.includes('Cameras & Monitors') && audioPage.includes('Signal Processing & Crossovers') && audioPage.includes('Harnesses, Trims & Fitment'), 'Car Audio component types must use the owner-approved group labels');
assert.ok(planet.records.some(p => p.brand === 'JBL'), 'JBL products must remain in their source department');
assert.ok(planet.records.some(p => String(p.brand||'').startsWith('Denon')), 'Denon DJ products must remain in their source department');
assert.ok(!audioPage.includes('["Harnesses & Trims","Harnesses & Trims"]') && !audioPage.includes('["Car Audio & Video","Car Audio & Video"]'), 'component groupings and duplicate audio divisions must not become separate departments');
assert.ok(audioPage.includes('/^(harness and trims|harnesses & trims)$/i.test(String(b))'), 'Harnesses & Trims must be treated as a component group, not a manufacturer brand button');
assert.ok(shellCss.includes('.gw-header') && shellCss.includes('.gw-nav') && shellCss.includes('.gw-mobile-nav'), 'shared homepage shell stylesheet must include desktop and mobile navigation');
for (const [i,page] of shellPages.entries()) {
  assert.ok(page.includes('assets/storefront-subpage-shell.css'), 'subpage '+i+' must load the shared homepage shell stylesheet');
  assert.ok(page.includes('class="gw-top"') && page.includes('class="gw-header"') && page.includes('class="gw-nav"') && page.includes('class="gw-mobile-nav"'), 'subpage '+i+' must use the shared homepage shell markup');
}
assert.ok(builder.includes('"storefront-subpage-shell.css"'), 'Cloudflare package builder must copy the shared subpage shell stylesheet');
assert.ok(home.includes('id="gw-subpage-shell-actions"') && home.includes('location.hash==="#cartPanel"') && home.includes('location.hash==="#part-search"') && home.includes('window.openPartSearch()'), 'homepage must open cart and part-search overlays when invoked from subpage shell links');
assert.ok(audioPage.includes('department==="Lifestyle"?p.division==="Home Retail"'), 'Lifestyle must show Home Retail products');
assert.ok(audioPage.includes('department==="Home Entertainment"?(p.collection==="Home Entertainment"||p.collection==="Installed AV")&&p.division!=="Home Retail"'), 'Home Entertainment must include Home Entertainment and Installed AV rows while excluding Lifestyle/Home Retail products');
assert.ok(planet.records.some(p => p.collection === 'Installed AV'), 'Installed AV source records must remain represented within Home Entertainment');
assert.ok(audioPage.includes('routeParams.get("search")') && audioPage.includes('routeParams.get("label")'));
assert.ok(audioPage.includes('department=requestedDepartment;brand=requestedBrand||"All brands";component=requestedComponent||"All product types"'), 'direct audio subcategory, brand and product-type routes must initialise their filters');
assert.ok(audioPage.includes('rows=enriched.concat(verifiedOnly,audioConnections)'), 'Planetworld and Audio Connections products must feed the same combined audio catalogue');
assert.ok(audioPage.includes('department==="Car Audio"?p.division==="Car Audio"&&p.collection!=="Marine Audio"'), 'Car Audio & Video must include every Car Audio source row together, not separate supplier pages');
assert.ok(audioPage.includes('location.href="preview-audio.html?"+u.toString()'), 'brand and product-type selections must open dedicated filtered subcategory routes');
assert.ok(home.includes("audioDepartmentNode('gw-audio-car','Car Audio & Video','Car Audio')"), 'home category must link to the unified Car Audio & Video subcategory');
assert.ok(planetPage.includes("location.replace('preview-audio.html?department=Car%20Audio&label=Car%20Audio%20%26%20Video')"), 'legacy Planetworld review route must redirect into the unified Car Audio & Video catalogue');
assert.ok(!planetPage.includes('Supplier stock snapshot') && !planetPage.includes('stock.jhb'), 'supplier stock snapshots must not be rendered as a separate customer-facing catalogue');
assert.ok(audioPage.includes('routeParams.get("department")'));
assert.ok(/name="robots" content="noindex,nofollow"/.test(audioPage));
assert.ok(/name="robots" content="noindex,nofollow"/.test(ascPage));
const expectedAsc = [
  ['Aerials','Auto Electrical Parts & Spares'],['Automotive Sensors','Auto Electrical Parts & Spares'],
  ['Automotive Switches','Auto Electrical Parts & Spares'],['Automotive Globes','Auto Electrical Parts & Spares'],
  ['Car Mats','Auto Electrical Parts & Spares'],['Fuel Pumps','Auto Electrical Parts & Spares']
];
assert.deepEqual(asc.catalogues.map(c => [c.name,c.root]), expectedAsc);
assert.ok(asc.catalogues.every(c => !Object.hasOwn(c,'source_pdf')), 'supplier source PDF paths must not be present in public preview data');
assert.ok(home.includes("ascCatalogueNode('gw-asc-mats','Car Mats Catalogue','Auto Electrical Parts & Spares','Car Mats')"));
assert.ok(home.includes("ascCatalogueNode('gw-asc-aerials','Aerials','Auto Electrical Parts & Spares')"));
assert.ok(!home.includes("ascCatalogueNode('gw-asc-aerials','Aerials','Car Audio')"));
assert.ok(!home.includes("ascCatalogueNode('gw-asc-mats','Car Mats Catalogue','Car Care & Accessories','Car Mats')"));
assert.ok(!ascPage.includes('catalogue.source_pdf') && !ascPage.includes('View complete original'), 'supplier source PDFs must not be linked from public preview');
assert.equal(planet.records.length,3317);
assert.equal(audio.records.length,66);
assert.equal(verifiedModels.records.length,68);
assert.equal(verifiedModels.records.filter(row => row.imageUrl).length,61);
assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_image_verified_review_only').length,48);
assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_page_image_link_review_only').length,4);
for (const model of ['66750650','66750800','66751501','66755100','66755105','66755107','69020020','69020021','66752000','66753000','66755030','66755110','66755115','66755156','66755157','66771820','66772201','66772203','69010020','69010021','69030020','69030021','69035010','69051040','69051050','69051055','69051060','69051070','69051075','69051090','69052020','69070030','69070040','69070050','69070070','69070080','69070085','69082001','69051030','69070020']) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://static.audison.com/'), 'official Audison image for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_image_verified_review_only');
}
for (const [model,domain] of [['DMX5023DABS','www.kenwoodstore.it'],['DMH-AP6650BT','www.pioneermalaysia.com']]) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://'+domain+'/'), 'official exact-model receiver image for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_image_verified_review_only');
}
for (const model of ['44L7S122','48CWR124','48CWRT102','48CWRT104']) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://www.kicker.com/'), 'official exact-model Kicker image for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_image_verified_review_only');
}
for (const model of ['43C124','43C84','46CXA12001','48CWR104']) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://www.kicker.com/'), 'official Kicker image link for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_page_image_link_review_only');
}
for (const [model,domain] of [['CS-DR162','jasc.jvc.com'],['ILX-F115D','www.alpine.ch']]) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://'+domain+'/'), 'official exact-model image for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_image_verified_review_only');
}
for (const obj of [planet,audio]) {
  const raw=JSON.stringify(obj);
  assert.ok(!/Planetworld|Audio Connections/i.test(raw),'supplier identity must not appear in customer-facing data');
  assert.ok(!/dealerCost|dealerPrice|supplierSku|supplierName/i.test(raw),'dealer costs and supplier identifiers must not be exposed');
}
const audioPageWithoutAssetPaths = audioPage.replace(/assets\/[a-z0-9-]+\.json/gi,'');
assert.ok(!/Planetworld|Audio Connections/i.test(audioPageWithoutAssetPaths), 'supplier names must not appear in customer-facing audio page text');
assert.ok(builder.includes('"preview-audio.html"') && builder.includes('"asc-catalogue-preview.html"'));

assert.ok(builder.includes('"owner-preview.html"'), 'safe owner preview must be in the opt-in package allowlist');
assert.ok(ownerPreview.includes('src="index-new.html"'), 'owner preview must use the current storefront shell');
assert.ok(ownerPreview.includes('OWNER PREVIEW — NON-PRODUCTION'));
assert.ok(ownerPreview.includes('Checkout, order submission and Supabase write actions are blocked'));
assert.ok(ownerPreview.includes('a[href*="checkout"]') && ownerPreview.includes('event.stopImmediatePropagation()'), 'owner preview must block checkout navigation');
assert.ok(legacyPreview.includes("location.replace('owner-preview.html')"), 'legacy preview route must redirect to current owner preview');
assert.ok(previewCategory.includes("const ROOTS=[['Car Audio / Home Entertainment / Lifestyle','1a13bc42-4f54-44f6-9658-36d141b77f4b'],['Auto Electrical Parts & Spares','ba263c9f-d038-48bd-bca0-944f3ebdc5e9'],['Car Care & Accessories','f98e7589-20a0-4825-9707-2680d29e5cb6']]"), 'preview category route must show only the three owner-approved startup category buttons');
assert.ok(!/Vehicle Security|Marine Spares & Accessories|Tools, Hardware & Consumables|Camping, Leisure & Outdoors|Trailer & Canopy/.test(previewCategory), 'obsolete eight-root category buttons must be removed from the preview category route');
assert.ok(returns.includes('<main class="wrap"><div class="card">'), 'returns page main content wrapper must remain intact after shell update');
assert.ok(home.includes("location.href='category.html?id='+encodeURIComponent(b.dataset.filter)"), 'leaf category buttons must navigate to the category page');
assert.ok(home.includes("closest('.child[data-filter]')"), 'nested category buttons must navigate to the category page');
assert.ok(categoryPage.includes("department=Lifestyle&search=vacuum&label=Vacuum%20Cleaners"), 'vacuum category page must open Lifestyle vacuum results');
assert.ok(categoryPage.includes("department=Lifestyle&search=pool&label=Pool%20Cleaners"), 'pool category page must open Lifestyle pool results');
assert.ok(categoryPage.includes("location.replace(lifestyleRoutes[current.id]||'products.html?category='+encodeURIComponent(current.id));return}"), 'empty non-Lifestyle leaf categories must retain filtered product routing');

console.log('THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS roots=3 asc_catalogues=6 planetworld_rows=3317 audio_connections_rows=66 owner_preview=safe');
