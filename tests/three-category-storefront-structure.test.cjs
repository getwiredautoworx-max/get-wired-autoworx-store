'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const read = p => fs.readFileSync(p, 'utf8');
const tree = JSON.parse(read('assets/category-tree.json'));
const home = read('index-new.html');
const categoryPage = read('category.html');
const planet = JSON.parse(read('assets/planetworld-catalogue-preview.json'));
const verifiedModels = JSON.parse(read('assets/planetworld-verified-models-preview.json'));
const audio = JSON.parse(read('assets/audio-connections-catalogue-preview.json'));
const audioPage = read('preview-audio.html');
const categoryInlineScripts = [...categoryPage.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.ok(categoryInlineScripts.length > 0, 'category page must contain its navigation script');
for (const script of categoryInlineScripts) new vm.Script(script);
assert.ok(categoryPage.includes("photo-1593359677879-a4bb92f829d1'],\n  [/speaker"), 'category artwork mapping entries must remain comma-separated so the root category renderer does not crash');
const audioInlineScripts = [...audioPage.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.ok(audioInlineScripts.length > 0, 'audio preview must contain its catalogue navigation script');
for (const script of audioInlineScripts) new vm.Script(script);
assert.ok(home.includes("if(c.id==='gw-audio-home')return '<span class=\"catArt\"><img class=\"catPhoto customProductArt\" src=\"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=720&q=82\" alt=\"Home entertainment television and home theatre system\" loading=\"lazy\" referrerpolicy=\"no-referrer\"></span>'"), 'Home Entertainment homepage tile must use real television and home-theatre photography, not car/cartoon imagery');
assert.ok(home.includes("if(c.id==='gw-audio-band')") && home.includes('alt=\"Band equipment and live sound stage\"'), 'Band Equipment tile must use relevant live-sound photography');
assert.ok(home.includes("if(c.id==='gw-audio-dj')") && home.includes('alt=\"DJ mixer and decks\"'), 'DJ Equipment tile must use relevant DJ equipment photography');
assert.ok(home.includes("if(c.id==='gw-audio-instruments')") && home.includes('alt=\"Musical instruments including guitar and keyboard\"'), 'Instruments tile must use musical instrument photography');
assert.ok(home.includes('https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw0ecba8d8/images/XM5ES/XM5ES.png'), 'homepage audio collage must use a real car-audio product photo in its Car Audio panel');
assert.ok(home.includes("if(c.id==='e3d19d20-fb46-426c-9f64-221d863add0b')") && home.includes('alt="Sony XM-5ES car audio amplifier"'), 'Car Audio & Video child category button must use real car-audio product artwork');
assert.ok(categoryPage.includes("if(n==='car audio & video'||n==='audio, entertainment & music')return 'https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw0ecba8d8/images/XM5ES/XM5ES.png'"), 'standalone category page must use real car-audio product artwork for Audio and Car Audio tiles');
assert.ok(home.includes('class="catArt audioFourTile" aria-label="Four audio departments: Car Audio and Video, Home Entertainment, Band and Live Sound, and DJ Equipment"'), 'Audio, Entertainment & Music root tile must be a four-picture collage for the four main departments');
for (const alt of ['Sony XM-5ES car audio amplifier','Home entertainment television','Band and live sound concert','DJ equipment and mixing decks']) assert.ok(home.includes('alt="'+alt+'"'), 'four-picture audio tile must include the '+alt+' panel');
const planetPage = read('preview-planetworld.html');
const builder = read('scripts/build-cloudflare-pages-public.py');
const ownerPreview = read('owner-preview.html');
const categoryCleanup = read('assets/category-cleanup.js');
assert.ok(!categoryCleanup.includes(':scope') && !categoryCleanup.includes('setInterval') && !categoryCleanup.includes('innerHTML'), 'category cleanup must not use unsupported selectors, periodic hiding or destructive grid replacement');
assert.ok(categoryCleanup.includes('getElementsByClassName') && categoryCleanup.includes('removeProperty(\'display\')'), 'category cleanup must leave all category/subcategory nodes in place');
const shellCss = read('assets/storefront-subpage-shell.css');
const previewCategory = read('preview-category.html');
const returns = read('returns-refunds.html');
const shellPages = ['category.html','products.html','product.html','preview-category.html','preview-products.html','preview-product.html','terms-and-conditions.html','privacy-policy.html','checkout-v2.html'].map(path => read(path));
const legacyPreview = read('preview-store.html');
const roots = tree.categories.filter(c => c.active && c.parent_id === null)
  .sort((a,b) => a.sort_order-b.sort_order).map(c => [c.id,c.name]);
assert.deepEqual(roots, [
  ['1a13bc42-4f54-44f6-9658-36d141b77f4b','Audio, Entertainment & Music'],
  ['ba263c9f-d038-48bd-bca0-944f3ebdc5e9','Auto Electrical Parts & Spares'],
  ['f98e7589-20a0-4825-9707-2680d29e5cb6','Car Care & Accessories']
]);
const carAudioNode = tree.categories.find(c => c.slug === 'car-audio');
const accessoriesNode = tree.categories.find(c => c.slug === 'car-audio-accessories');
assert.ok(accessoriesNode && accessoriesNode.parent_id === carAudioNode.id, 'Accessories must be nested under Car Audio & Video');
assert.deepEqual(tree.categories.filter(c => c.parent_id === accessoriesNode.id).sort((a,b)=>a.sort_order-b.sort_order).map(c=>c.name), ['Aerials','Trims & Harnesses'], 'Aerials and Trims & Harnesses must be separate sibling buttons under Accessories');
assert.ok(!tree.categories.some(c => ['Aerials','Trims & Harnesses'].includes(c.name) && c.parent_id === carAudioNode.id), 'Aerials and Trims & Harnesses must not sit directly under Car Audio & Video');
assert.ok(!home.includes("window.gwProducts=products;renderCats();render('featuredGrid',"), 'loading products must not replace the category grid and detach an in-flight category-button click');
const categoryClickHandler = home.slice(home.indexOf("document.addEventListener('click',e=>{const lm="), home.indexOf("document.getElementById('searchInput')?.addEventListener('input'"));
assert.ok(categoryClickHandler.includes("Array.from(wrap.children).find(el=>el.classList&&el.classList.contains('children'))"), 'category expansion must locate direct child containers without :scope selector dependency');
assert.ok(categoryClickHandler.includes("Array.from(parent.children).filter(w=>w!==wrap"), 'opening one category must close sibling categories using browser-compatible direct-child traversal');
assert.ok(!categoryClickHandler.includes(':scope'), 'category expansion must not depend on :scope selectors unsupported by older embedded Android browsers');
assert.ok(home.includes('.cats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;align-items:start}.catWrap{align-self:start;'), 'expanded category cards must not overlap sibling click targets');
assert.ok(home.includes('#categoryGrid.cats{align-items:start!important}#categoryGrid>.catWrap{align-self:start!important;height:auto!important}#categoryGrid>.catWrap .catBtn{height:auto!important}'), 'final homepage CSS must override stretched root cards so expanded child links remain tappable');
assert.ok(home.indexOf("categories=await snapshot();renderCats();")<home.indexOf("const categoryTask=(async()=>"), 'approved local category tree must render before remote Supabase refresh');
assert.ok(home.includes('setTimeout(()=>controller.abort(),7000)'), 'remote category refresh must be bounded so it cannot hold category rendering');
assert.ok(home.includes("apiAll('categories?select=id,name,slug,parent_id,active&active=eq.true&order=name.asc',1000,controller.signal)"), 'category API timeout must abort the actual remote fetch');
assert.ok(home.includes('const hasCompleteTree=rows=>rows.length>0&&expectedRoots.every(id=>rows.some(c=>c.id===id))&&categories.every(localCategory=>rows.some(remoteCategory=>remoteCategory.id===localCategory.id));'), 'remote category refresh must include every locally approved category before replacing the tree');
assert.ok(home.includes('Remote category response incomplete; retaining approved local category tree and subcategories.'), 'incomplete remote category responses must retain the approved local tree and its subcategories');
assert.ok(home.includes("fetch('assets/category-tree.json',{cache:'no-store',signal:controller.signal})"), 'approved local category snapshot fallback must remain available and bounded');
assert.ok(categoryCleanup.includes("window.installGetWiredCategoryCleanup=function(frame)") && !categoryCleanup.includes("style.display='none'"), 'category cleanup must preserve root and child category visibility when product counts are zero or unknown');
for (const [id,label] of roots) {
  assert.ok(home.includes(id) && home.includes(label), 'storefront root '+label);
  assert.ok(categoryPage.includes(id) && categoryPage.includes(label), 'category page root '+label);
}
const children = name => tree.categories.filter(c => c.active && c.name === name);
for (const name of ['Car Audio & Video','Home Entertainment','Band Equipment','DJ Equipment','Instruments','Lifestyle'])
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
assert.equal(planet.records.filter(p=>p.division==="Car Audio"&&p.component==="Unclassified — owner/source confirmation").length,0,'all two previously held Planetworld component classifications are resolved');
assert.equal(planet.records.find(p=>p.id==="pw-2088").component,"Car Audio Accessories");
assert.equal(planet.records.find(p=>p.id==="pw-2172").component,"Fascia & Fitting Kits");
assert.equal(audio.records.filter(p=>p.collection==="Harnesses & Trims"||p.component==="Harnesses, Trims & Fitment").length,0,'generic Audio Connections installation kits must not leak into the dedicated Planetworld fitment group');
assert.ok(audioPage.includes('filter(label=>!/^(car audio|car audio & video|car audio and video|all car audio products)$/i.test(label))'), 'department labels must be excluded from product-type buttons');
assert.ok(audioPage.includes('["Lifestyle","Lifestyle"]'), 'Lifestyle must be a selectable catalogue department');
assert.ok(audioPage.includes('"assets/brand-logos/jbl.svg"'), 'JBL brand button must use its local wordmark asset');
assert.ok(audioPage.includes('"assets/brand-logos/denon.svg"'), 'Denon brand button must use its local wordmark asset');
assert.ok(audioPage.includes('"assets/brand-logos/hertz.svg"'), 'Hertz brand button must use its local wordmark asset');
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
assert.ok(builder.includes('"preview-audio.html"') && !builder.includes('asc-catalogue-preview.html') && !builder.includes('asc-catalogue-preview-data.json'), 'current supplier pilot package must include Planetworld/Audio Connections routes but exclude deferred ASC catalogue assets');
assert.ok(!home.includes('ascCatalogueNode') && !home.includes('asc-catalogue-preview.html'), 'deferred ASC catalogue buttons must not appear in the current pilot storefront');
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
assert.equal(planet.records.length,3317);
assert.equal(audio.records.length,66);
assert.equal(verifiedModels.records.length,68);
assert.equal(verifiedModels.records.filter(row => row.imageUrl).length,66);
assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_image_verified_review_only').length,48);
assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_page_image_link_review_only').length,4);
assert.equal(verifiedModels.records.filter(row => row.imageUseAuthorization === 'OWNER_AUTHORIZED_FOR_STORE_PREVIEW_2026-11-04').length,2);
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
const audioPageBodyStart = audioPage.indexOf('<body');
const audioPageScriptStart = audioPage.indexOf('<script', audioPageBodyStart);
const audioPageVisibleMarkup = audioPage.slice(audioPageBodyStart, audioPageScriptStart < 0 ? audioPage.length : audioPageScriptStart);
assert.ok(!/Planetworld|Audio Connections/i.test(audioPageVisibleMarkup), 'supplier names must not appear in customer-facing audio page markup');


assert.ok(builder.includes('"owner-preview.html"'), 'safe owner preview must be in the opt-in package allowlist');
assert.ok(ownerPreview.includes('src="index-new.html?ownerPreview=1"'), 'owner preview must use the current storefront shell and committed category snapshot');
assert.ok(ownerPreview.includes('OWNER PREVIEW — NON-PRODUCTION'));
assert.ok(ownerPreview.includes('Checkout, order submission and Supabase write actions are blocked'));
assert.ok(ownerPreview.includes('a[href*="checkout"]') && ownerPreview.includes('event.stopImmediatePropagation()'), 'owner preview must block checkout navigation');
assert.ok(legacyPreview.includes("location.replace('owner-preview.html')"), 'legacy preview route must redirect to current owner preview');
assert.ok(previewCategory.includes("const ROOTS=[['Audio, Entertainment & Music','1a13bc42-4f54-44f6-9658-36d141b77f4b'],['Auto Electrical Parts & Spares','ba263c9f-d038-48bd-bca0-944f3ebdc5e9'],['Car Care & Accessories','f98e7589-20a0-4825-9707-2680d29e5cb6']]"), 'preview category route must show only the three owner-approved startup category buttons');
assert.ok(!/Vehicle Security|Marine Spares & Accessories|Tools, Hardware & Consumables|Camping, Leisure & Outdoors|Trailer & Canopy/.test(previewCategory), 'obsolete eight-root category buttons must be removed from the preview category route');
assert.ok(returns.includes('<main class="wrap"><div class="card">'), 'returns page main content wrapper must remain intact after shell update');
assert.ok(home.includes("location.href='category.html?id='+encodeURIComponent(b.dataset.filter)"), 'leaf category buttons must navigate to the category page');
assert.ok(home.includes("closest('.child[data-filter]')"), 'nested category buttons must navigate to the category page');
assert.ok(categoryPage.includes("department=Lifestyle&search=vacuum&label=Vacuum%20Cleaners"), 'vacuum category page must open Lifestyle vacuum results');
assert.ok(categoryPage.includes("department=Lifestyle&search=pool&label=Pool%20Cleaners"), 'pool category page must open Lifestyle pool results');
assert.ok(categoryPage.includes("b0b4c7d1-2f68-4c8a-9e51-6d2a3f7b8c90':'preview-audio.html?department=Car%20Audio&search=Aerials&label=Aerials'"), 'Aerials button must open its own filtered audio view');
assert.ok(categoryPage.includes("13b36e2a-a5c7-471e-83ef-3ad180e66d3d':'preview-audio.html?department=Car%20Audio&brand=All%20brands&component=Harnesses%2C%20Trims%20%26%20Fitment&label=Trims%20%26%20Harnesses'"), 'Trims & Harnesses button must open its own filtered audio view');
assert.ok(audioPage.includes('el("products").hidden=!department||(component==="All product types"&&!directSearchRoute)'), 'selected component routes must show filtered products without requiring a brand filter');
assert.ok(categoryPage.includes("location.replace(lifestyleRoutes[current.id]||'products.html?category='+encodeURIComponent(current.id));return}"), 'empty non-Lifestyle leaf categories must retain filtered product routing');
assert.ok(categoryPage.includes("document.getElementById('search')?.addEventListener"), 'category navigation must not crash when the optional search field is absent');

assert.ok(audioPage.includes('https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw0ecba8d8/images/XM5ES/XM5ES.png'), 'Car Audio & Video department button must show real car-audio product photography');
assert.ok(!audioPage.includes('img.src="assets/car-audio-video-category.svg"'), 'the Home Entertainment illustration must not be reused for Car Audio & Video');
const audioCategoryArtwork = read('assets/car-audio-video-category.svg');
assert.ok(audioCategoryArtwork.includes('<title id="title">Audio and home entertainment</title>'), 'audio category artwork must be explicitly audio/home-entertainment themed');
assert.ok(audioCategoryArtwork.includes('television') && audioCategoryArtwork.includes('stereo speakers') && audioCategoryArtwork.includes('headphones'), 'audio category artwork must depict home entertainment equipment');
assert.ok(!/modern car|CAR AUDIO • VIDEO • MULTIMEDIA|<circle cx="318" cy="399"/i.test(audioCategoryArtwork), 'audio/home-entertainment artwork must not contain the old car illustration');
assert.ok(audioPage.includes('"kicker":"https://down-ph.img.susercontent.com/file/962ea81bf211c3afc930edf076da9e76"') && audioPage.includes('"audison":"https://upload.wikimedia.org/wikipedia/commons/e/ec/Audison_logo.png"') && audioPage.includes('"alpine":"https://upload.wikimedia.org/wikipedia/commons/5/56/Alpine_logo.svg"'), 'core car-audio brand buttons must request their brand logos');
assert.ok(audioPage.includes('el("products").hidden=!department||(component==="All product types"&&!directSearchRoute)'), 'department and brand landing pages must hide stock while direct search routes and selected component routes show filtered products');
assert.ok(audioPage.includes('const directSearchRoute=!!query'), 'direct category search routes must open their own filtered product listing');
assert.ok(audioPage.includes('component==="All product types"&&!directSearchRoute'), 'normal department and brand pages must hide stock until a component or direct search is selected');
assert.ok(audioPage.includes('(brand==="All brands"||p.brand===brand)&&(component==="All product types"||componentGroup(p)===component)'), 'a direct component route must show its matching products even when brand remains All brands');

assert.ok(audioPage.includes('brand+" — "+(component==="All product types"?"COMPONENTS":component)'), 'brand and component selections must render as distinct page states');
assert.ok(builder.includes('"car-audio-video-category.svg"'), 'Cloudflare preview package must include the Car Audio & Video artwork asset');
console.log('THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS roots=3 asc=deferred planetworld_rows=3317 audio_connections_rows=66 owner_preview=safe');
