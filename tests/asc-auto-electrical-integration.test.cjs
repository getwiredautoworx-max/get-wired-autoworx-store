'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const tree=JSON.parse(fs.readFileSync('assets/category-tree.json','utf8'));
const data=JSON.parse(fs.readFileSync('assets/asc-auto-electrical-preview.json','utf8'));
const root=tree.categories.find(c=>c.name==='Auto Electrical Parts & Spares');
assert.ok(root);
const expected=['Automotive Sensors','Automotive Switches','Automotive Globes','Fuel Pumps'];
const children=tree.categories.filter(c=>c.parent_id===root.id).sort((a,b)=>a.sort_order-b.sort_order);
for(const name of expected)assert.ok(children.some(c=>c.name===name),name+' must be a direct Auto Electrical category');
assert.equal(data.catalogues.length,4);
assert.deepEqual(data.catalogues.map(c=>c.name),expected);
assert.equal(data.records.length,34);
for(const p of data.records){assert.equal(p.preview_only,true);assert.equal(p.release_status,'REVIEW_ONLY_NOT_LIVE');assert.equal(p.price,null);assert.equal(p.stock_quantity,null);assert.equal(p.image_use_status,'WATERMARKED_OWNER_REVIEW_ONLY_RIGHTS_NOT_CLEARED');assert.ok(p.source_pdf&&Number.isInteger(p.source_page),p.id+' must retain original PDF and contents-page start page');assert.ok(p.source_sku_candidate,p.id+' must retain a candidate ASC reference');assert.ok(p.identity_review_status.includes('REQUIRE_FINAL_PDF_VISUAL_CONFIRMATION'));assert.ok(p.customer_description_status.includes('PENDING'));assert.ok(p.draft_customer_description&&p.draft_description_status.includes('OWNER_REVIEW_DRAFT_ONLY'));assert.ok(fs.existsSync(p.image_url),p.image_url);}
const page=fs.readFileSync('asc-auto-electrical-preview.html','utf8');
assert.ok(page.includes('noindex,nofollow'));assert.ok(page.includes('Price On Request due to Limited Stock and Availability'));assert.ok(page.includes('p.draft_customer_description')&&page.includes('p.source_description')&&page.includes('p.source_pdf')&&page.includes('p.source_page')&&page.includes('p.source_sku_candidate'),'owner preview must expose draft descriptions, source wording and traceability for review');assert.ok(!page.toLowerCase().includes('add to cart'));
const cat=fs.readFileSync('category.html','utf8'),prev=fs.readFileSync('preview-category.html','utf8');
for(const id of ['e6a10001-1b2c-4d3e-8f90-111111111111','e6a10002-1b2c-4d3e-8f90-222222222222','e6a10003-1b2c-4d3e-8f90-333333333333']){assert.ok(cat.includes(id));assert.ok(prev.includes(id));}
const builder=fs.readFileSync('scripts/build-cloudflare-pages-public.py','utf8');
assert.ok(builder.includes('asc-auto-electrical-preview.html'));assert.ok(builder.includes('asc-auto-electrical-preview.json'));assert.ok(builder.includes('asc-auto-electrical-pilot'));assert.ok(builder.includes('asc-auto-electrical-integration.test.cjs'));
console.log('ASC_AUTO_ELECTRICAL_INTEGRATION_PASS: four catalogues, 34 reviewed pilot cards, preview-only, no price/stock/SKU/checkout.');
