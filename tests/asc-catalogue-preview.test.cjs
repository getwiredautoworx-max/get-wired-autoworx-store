const fs=require('node:fs');const assert=require('node:assert/strict');
const d=JSON.parse(fs.readFileSync('assets/asc-catalogue-preview-data.json','utf8'));
assert.equal(d.records.length,50);
const expected=[['Aerials','Car Audio & Entertainment',6],['Automotive Sensors','Auto Electrical Spares',11],['Automotive Switches','Auto Electrical Spares',16],['Automotive Globes','Auto Electrical Spares',10],['Car Mats','Car Care & Accessories',14],['Fuel Pumps','Auto Electrical Spares',18]];
assert.deepEqual(d.catalogues.map(c=>[c.name,c.root,c.sections.length]),expected);
const sourcePdfs={
 'Aerials':'assets/asc-catalogue-source/ASC-Aerials.pdf',
 'Automotive Sensors':'assets/asc-catalogue-source/ASC-Automotive-Sensors.pdf',
 'Automotive Switches':'assets/asc-catalogue-source/ASC-Automotive-Switches.pdf',
 'Automotive Globes':'assets/asc-catalogue-source/ASC-Automotive-Globes.pdf',
 'Car Mats':'assets/asc-catalogue-source/ASC-Car-Mats.pdf',
 'Fuel Pumps':'assets/asc-catalogue-source/ASC-Fuel-Pumps.pdf'
};
const sourceFiles={
 'Aerials':'suppliers/ASC/ASC- Aerials (1).pdf',
 'Automotive Sensors':'suppliers/ASC/ASC- Automotive Sensors (1).pdf',
 'Automotive Switches':'suppliers/ASC/ASC- Automotive Switches (1).pdf',
 'Automotive Globes':'suppliers/ASC/ASC- Automotive globes (1).pdf',
 'Car Mats':'suppliers/ASC/ASC- Car Mats (1).pdf',
 'Fuel Pumps':'suppliers/ASC/ASC- Fuel Pumps (1).pdf'
};
for(const c of d.catalogues){assert.equal(c.source_pdf,sourcePdfs[c.name]);assert.ok(fs.existsSync(sourceFiles[c.name]),sourceFiles[c.name]);assert.ok(fs.existsSync('pages-public/'+c.source_pdf),'preview package missing '+c.source_pdf);}
const ids=new Set(d.catalogues.flatMap(c=>c.sections.map(s=>s.id)));
for(const p of d.records){assert.ok(ids.has(p.subcategory_id));assert.equal(p.preview_only,true);assert.equal(p.release_status,'REVIEW_ONLY_NOT_LIVE');assert.equal(p.price,null);assert.equal(p.stock_quantity,null);assert.ok(p.image_url.endsWith('.jpg'));assert.ok(fs.existsSync(p.image_url));assert.ok(!('catalogue_reference' in p));assert.ok(!('source_file' in p));}
assert.equal(fs.readdirSync('assets/asc-catalogue-pilot').filter(n=>n.endsWith('.jpg')).length,50);
const home=fs.readFileSync('index-new.html','utf8');for(const n of ['Automotive Sensors','Automotive Switches','Automotive Globes','Car Mats','Fuel Pumps','Aerials','Car Care & Accessories','Chemicals & Lubricants'])assert.ok(home.includes(n),n);
assert.ok(home.includes('ASC_PREVIEW_NAV_START'));assert.ok(home.includes("ascCatalogueNode('gw-asc-mats','Car Mats','Car Care & Accessories')"));assert.ok(!home.includes("ascCatalogueNode('gw-asc-mats','Car Mats','Auto Electrical Spares')"));for(const n of ['Aerials — Existing Store Products','Automotive Sensors — Existing Store Products','Automotive Switches — Existing Store Products','Lighting — Existing Store Products','Car Mats — Existing Store Products'])assert.ok(home.includes(n),n);assert.ok(home.includes('asc-catalogue-preview.html?root='));
const route=fs.readFileSync('asc-catalogue-preview.html','utf8');assert.ok(route.includes('noindex,nofollow'));assert.ok(route.includes('Choose a section from the original contents page'));assert.ok(route.includes('Source catalogue pending'));assert.ok(route.includes('View complete original '));assert.ok(route.includes('id=\"sourcePdf\"'));assert.ok(!route.toLowerCase().includes('add to cart'));
const builder=fs.readFileSync('scripts/build-cloudflare-pages-public.py','utf8');assert.ok(builder.includes('GW_INCLUDE_PREVIEW_ROUTES'));assert.ok(builder.includes('ASC_PREVIEW_NAV_START'));assert.ok(builder.includes('CATALOGUE_PREVIEW_ASSETS_PASS'));assert.ok(builder.includes('PREVIEW_SOURCE_PDFS'));assert.ok(builder.includes('source_pdf_count != 6'));assert.ok(builder.includes('include_preview and rel in PREVIEW_SOURCE_PDF_OUTPUTS'));
console.log('ASC_CATALOGUE_HIERARCHY_STATIC_PASS: six catalogue buttons; 75 source sections; 50 exact reviewed pilot records; owner hierarchy preserved; preview-only assets gated from standard package.');
