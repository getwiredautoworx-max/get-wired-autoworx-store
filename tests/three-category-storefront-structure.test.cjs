'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const read = p => fs.readFileSync(p, 'utf8');
const tree = JSON.parse(read('assets/category-tree.json'));
const home = read('index-new.html');
const categoryPage = read('category.html');
const asc = JSON.parse(read('assets/asc-catalogue-preview-data.json'));
const planet = JSON.parse(read('assets/planetworld-catalogue-preview.json'));
const audio = JSON.parse(read('assets/audio-connections-catalogue-preview.json'));
const audioPage = read('preview-audio.html');
const ascPage = read('asc-catalogue-preview.html');
const builder = read('scripts/build-cloudflare-pages-public.py');
const roots = tree.categories.filter(c => c.active && c.parent_id === null)
  .sort((a,b) => a.sort_order-b.sort_order).map(c => [c.id,c.name]);
assert.deepEqual(roots, [
  ['1a13bc42-4f54-44f6-9658-36d141b77f4b','Car Audio / Home Entertainment / Lifestyle'],
  ['ba263c9f-d038-48bd-bca0-944f3ebdc5e9','Auto Electrical Parts & Spares'],
  ['f98e7589-20a0-4825-9707-2680d29e5cb6','Car Care & Accessories']
]);
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
for (const obj of [planet,audio]) {
  const raw=JSON.stringify(obj);
  assert.ok(!/Planetworld|Audio Connections/i.test(raw),'supplier identity must not appear in customer-facing data');
  assert.ok(!/dealerCost|dealerPrice|supplierSku|supplierName/i.test(raw),'dealer costs and supplier identifiers must not be exposed');
}
assert.ok(!/Planetworld|Audio Connections/i.test(audioPage));
assert.ok(builder.includes('"preview-audio.html"') && builder.includes('"asc-catalogue-preview.html"'));
console.log('THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS roots=3 asc_catalogues=6 planetworld_rows=3317 audio_connections_rows=66');
