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
const ascPage = read('asc-catalogue-preview.html');
const builder = read('scripts/build-cloudflare-pages-public.py');
const ownerPreview = read('owner-preview.html');
const categoryCleanup = read('assets/category-cleanup.js');
const legacyPreview = read('preview-store.html');
const roots = tree.categories.filter(c => c.active && c.parent_id === null)
  .sort((a,b) => a.sort_order-b.sort_order).map(c => [c.id,c.name]);
assert.deepEqual(roots, [
  ['1a13bc42-4f54-44f6-9658-36d141b77f4b','Car Audio / Home Entertainment / Lifestyle'],
  ['ba263c9f-d038-48bd-bca0-944f3ebdc5e9','Auto Electrical Parts & Spares'],
  ['f98e7589-20a0-4825-9707-2680d29e5cb6','Car Care & Accessories']
]);
assert.ok(home.indexOf("categories=await snapshot();renderCats();")<home.indexOf("apiAll('categories?select=id,name,slug,parent_id,active&active=eq.true&order=name.asc')"), 'approved local category tree must render before remote Supabase refresh');
assert.ok(home.includes('setTimeout(()=>controller.abort(),7000)'), 'remote category refresh must be bounded so it cannot hold category rendering');
assert.ok(home.includes("apiAll('categories?select=id,name,slug,parent_id,active&active=eq.true&order=name.asc',1000,controller.signal)"), 'category API timeout must abort the actual remote fetch');
assert.ok(home.includes('Category API returned an incomplete active hierarchy'), 'category loader must fall back when Supabase category rows are empty or incomplete');
assert.ok(home.includes("fetch('assets/category-tree.json',{cache:'no-store'})"), 'approved local category snapshot fallback must remain available');
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
assert.ok(audioPage.includes('routeParams.get("search")') && audioPage.includes('routeParams.get("label")'));
assert.ok(audioPage.includes('routeParams.get("department")'));
assert.ok(/name="robots" content="noindex,nofollow"/.test(audioPage));
assert.ok(/name="robots" content="noindex,nofollow"/.test(ascPage));
const expectedAsc = [
  ['Aerials','Car Audio'],['Automotive Sensors','Auto Electrical Parts & Spares'],
  ['Automotive Switches','Auto Electrical Parts & Spares'],['Automotive Globes','Auto Electrical Parts & Spares'],
  ['Car Mats','Car Care & Accessories'],['Fuel Pumps','Auto Electrical Parts & Spares']
];
assert.deepEqual(asc.catalogues.map(c => [c.name,c.root]), expectedAsc);
assert.ok(home.includes("ascCatalogueNode('gw-asc-mats','Car Mats Catalogue','Car Care & Accessories','Car Mats')"));
assert.ok(home.includes("ascCatalogueNode('gw-asc-aerials','Aerials','Car Audio')"));
assert.equal(planet.records.length,3317);
assert.equal(audio.records.length,66);
assert.equal(verifiedModels.records.length,68);
assert.equal(verifiedModels.records.filter(row => row.imageUrl).length,21);
assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_image_verified_review_only').length,8);
assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_page_image_link_review_only').length,4);
for (const model of ['66750650','66750800','66751501','66755100','66755105','66755107','69020020','69020021']) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://static.audison.com/'), 'official Audison image for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_image_verified_review_only');
}
for (const model of ['43C124','43C84','46CXA12001','48CWR104']) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://www.kicker.com/'), 'official Kicker image link for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_page_image_link_review_only');
}
for (const obj of [planet,audio]) {
  const raw=JSON.stringify(obj);
  assert.ok(!/Planetworld|Audio Connections/i.test(raw),'supplier identity must not appear in customer-facing data');
  assert.ok(!/dealerCost|dealerPrice|supplierSku|supplierName/i.test(raw),'dealer costs and supplier identifiers must not be exposed');
}
assert.ok(!/Planetworld|Audio Connections/i.test(audioPage));
assert.ok(builder.includes('"preview-audio.html"') && builder.includes('"asc-catalogue-preview.html"'));

assert.ok(builder.includes('"owner-preview.html"'), 'safe owner preview must be in the opt-in package allowlist');
assert.ok(ownerPreview.includes('src="index-new.html"'), 'owner preview must use the current storefront shell');
assert.ok(ownerPreview.includes('OWNER PREVIEW — NON-PRODUCTION'));
assert.ok(ownerPreview.includes('Checkout, order submission and Supabase write actions are blocked'));
assert.ok(ownerPreview.includes('a[href*="checkout"]') && ownerPreview.includes('event.stopImmediatePropagation()'), 'owner preview must block checkout navigation');
assert.ok(legacyPreview.includes("location.replace('owner-preview.html')"), 'legacy preview route must redirect to current owner preview');
console.log('THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS roots=3 asc_catalogues=6 planetworld_rows=3317 audio_connections_rows=66 owner_preview=safe');
