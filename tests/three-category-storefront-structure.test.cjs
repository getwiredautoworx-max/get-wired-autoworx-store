'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const read = p => fs.readFileSync(p, 'utf8');
const tree = JSON.parse(read('assets/category-tree.json'));
const home = read('index-new.html');
const categoryPage = read('category.html');
const previewCategory = read('preview-category.html');
const previewAutoElectrical = read('preview-auto-electrical.html');
const previewAscSample = read('preview-asc-sample.html');
const planet = JSON.parse(read('assets/audio-catalogue-primary-preview.json'));
const verifiedModels = JSON.parse(read('assets/audio-model-verification-preview.json'));
const audio = JSON.parse(read('assets/audio-catalogue-secondary-preview.json'));
const autoElectrical = JSON.parse(read('assets/auto-electrical-owner-preview.json'));
const imageSample = JSON.parse(read('assets/product-image-treatment-sample.json'));
const imageProcessor = read('scripts/process-product-image-pilot.py');
const audioPage = read('preview-audio.html');
const audioBrandPage = read('preview-audio-brand.html');
const audioProductsPage = read('preview-audio-products.html');
const categoryInlineScripts = [...categoryPage.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.ok(categoryInlineScripts.length > 0, 'category page must contain its navigation script');
for (const script of categoryInlineScripts) new vm.Script(script);
assert.ok(categoryPage.includes("photo-1558284296-7579da2deb30") && categoryPage.includes("photo-1654447398824-dbcbefeafdd6"), 'category artwork mapping must retain distinct home-theatre and car-speaker photographs');
const previewCategoryInlineScripts = previewCategory.split('<script>').slice(1).map(part => part.split('</script>')[0]);
assert.ok(previewCategoryInlineScripts.length > 0, 'preview category page must contain its navigation script');
for (const script of previewCategoryInlineScripts) new vm.Script(script);
const audioInlineScripts = [...audioPage.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.ok(audioInlineScripts.length > 0, 'audio preview must contain its catalogue navigation script');
for (const script of audioInlineScripts) new vm.Script(script);
for (const [name,page] of [['brand',audioBrandPage],['products',audioProductsPage]]) {
  const scripts=page.split('<script>').slice(1).map(part=>part.split('</script>')[0]);
  assert.ok(scripts.length>0, 'audio '+name+' route must contain its navigation/catalogue script');
  for (const script of scripts) new vm.Script(script);
}
assert.ok(home.includes("if(c.id==='gw-audio-home')return '<span class=\"catArt\"><img class=\"catPhoto customProductArt\" src=\"https://images.unsplash.com/photo-1558284296-7579da2deb30?auto=format&fit=crop&w=720&q=82\" alt=\"Home entertainment television and home theatre system\" loading=\"lazy\" referrerpolicy=\"no-referrer\"></span>'"), 'Home Entertainment homepage tile must use real television and home-theatre photography, not car/cartoon imagery');
assert.ok(home.includes("if(c.id==='gw-audio-band')") && home.includes('alt=\"Band equipment and live sound stage\"'), 'Band Equipment tile must use relevant live-sound photography');
assert.ok(home.includes("if(c.id==='gw-audio-dj')") && home.includes('alt=\"DJ mixer and decks\"'), 'DJ Equipment tile must use relevant DJ equipment photography');
assert.ok(home.includes("if(c.id==='gw-audio-instruments')") && home.includes('alt=\"Musical instruments including guitar and keyboard\"'), 'Instruments tile must use musical instrument photography');
assert.ok(home.includes('https://images.unsplash.com/photo-1654447398824-dbcbefeafdd6?auto=format&fit=crop&w=720&q=82'), 'homepage audio collage must use a real car-audio product photo in its Car Audio panel');
assert.ok(home.includes("if(c.id==='e3d19d20-fb46-426c-9f64-221d863add0b')") && home.includes('alt="Car audio speakers installed in a vehicle"'), 'Car Audio & Video child category button must use real car-audio product artwork');
assert.ok(categoryPage.includes("if(n==='car audio & video'||n==='car audio / home entertainment')return 'https://images.unsplash.com/photo-1654447398824-dbcbefeafdd6?auto=format&fit=crop&w=720&q=82'"), 'standalone category page must use real car-audio product artwork for Audio and Car Audio tiles');
assert.ok(home.includes('class="catArt audioFourTile" aria-label="Four audio departments: Car Audio and Video, Home Entertainment, Band and Live Sound, and DJ Equipment"'), 'Car Audio / Home Entertainment root tile must be a four-picture collage for the four main departments');
for (const alt of ['Car audio speakers installed in a vehicle','Home entertainment television','Band and live sound concert','DJ equipment and mixing decks']) assert.ok(home.includes('alt="'+alt+'"'), 'four-picture audio tile must include the '+alt+' panel');
const planetPage = read('preview-planetworld.html');
const builder = read('scripts/build-cloudflare-pages-public.py');
const ownerPreview = read('owner-preview.html');
const categoryCleanup = read('assets/category-cleanup.js');
assert.ok(!categoryCleanup.includes(':scope') && !categoryCleanup.includes('setInterval') && !categoryCleanup.includes('innerHTML'), 'category cleanup must not use unsupported selectors, periodic hiding or destructive grid replacement');
assert.ok(categoryCleanup.includes('getElementsByClassName') && categoryCleanup.includes('removeProperty(\'display\')'), 'category cleanup must leave all category/subcategory nodes in place');
const shellCss = read('assets/storefront-subpage-shell.css');
const returns = read('returns-refunds.html');
const shellPages = ['category.html','products.html','product.html','preview-category.html','preview-products.html','preview-product.html','terms-and-conditions.html','privacy-policy.html','checkout-v2.html'].map(path => read(path));
const legacyPreview = read('preview-store.html');
const roots = tree.categories.filter(c => c.active && c.parent_id === null)
  .sort((a,b) => a.sort_order-b.sort_order).map(c => [c.id,c.name]);
assert.deepEqual(roots, [
  ['1a13bc42-4f54-44f6-9658-36d141b77f4b','Car Audio / Home Entertainment'],
  ['ba263c9f-d038-48bd-bca0-944f3ebdc5e9','Auto Electrical Spares'],
  ['f98e7589-20a0-4825-9707-2680d29e5cb6','Car Care & Accessories']
]);
const autoElectricalNode = tree.categories.find(c => c.id === 'ba263c9f-d038-48bd-bca0-944f3ebdc5e9');
const carCareNode = tree.categories.find(c => c.id === 'f98e7589-20a0-4825-9707-2680d29e5cb6');
const autoElectricalChildren = tree.categories.filter(c => c.active && c.parent_id === autoElectricalNode.id).sort((a,b)=>a.sort_order-b.sort_order).map(c=>c.name);
const carCareChildren = tree.categories.filter(c => c.active && c.parent_id === carCareNode.id).sort((a,b)=>a.sort_order-b.sort_order).map(c=>c.name);
assert.deepEqual(autoElectricalChildren, ['Alternators & Starters','Batteries & Charging','Fuses, Relays & Wiring','Globes & Vehicle Lighting','Sensors & Switches'], 'Auto Electrical must retain its five approved customer-facing subcategories');
assert.deepEqual(carCareChildren, ['Car Care','Car Mats','Seat Covers & Interior Accessories','Exterior Accessories'], 'Car Care must retain its four approved customer-facing subcategories');
const artForStart = previewCategory.indexOf('function artFor(');
const artForEnd = previewCategory.indexOf('\nfunction ', artForStart + 1);
assert.ok(artForStart >= 0 && artForEnd > artForStart, 'preview category page must expose a deterministic category artwork resolver');
const artForSource = previewCategory.slice(artForStart, artForEnd);
const previewCategoryArtFor = vm.runInNewContext('(' + artForSource + ')');
for (const label of [...autoElectricalChildren, ...carCareChildren]) {
  const imageUrl = previewCategoryArtFor(label);
  assert.ok(typeof imageUrl === 'string' && (imageUrl.startsWith('https://') || imageUrl.startsWith('assets/get-wired-product-pilot/')) && !imageUrl.endsWith('/'), 'non-Audio category must have an explicit usable artwork URL: ' + label);
}
assert.equal(previewCategoryArtFor('Unknown Catalogue Placeholder'), '', 'unknown categories must not receive a generic unrelated fallback image');
const carAudioNode = tree.categories.find(c => c.slug === 'car-audio');
const accessoriesNode = tree.categories.find(c => c.slug === 'car-audio-accessories');
assert.ok(accessoriesNode && accessoriesNode.parent_id === carAudioNode.id, 'Accessories must be nested under Car Audio & Video');
assert.deepEqual(tree.categories.filter(c => c.parent_id === accessoriesNode.id).sort((a,b)=>a.sort_order-b.sort_order).map(c=>c.name), ['Aerials','Trims & Harnesses'], 'Aerials and Trims & Harnesses must be separate sibling buttons under Accessories');
assert.ok(!tree.categories.some(c => ['Aerials','Trims & Harnesses'].includes(c.name) && c.parent_id === carAudioNode.id), 'Aerials and Trims & Harnesses must not sit directly under Car Audio & Video');
const aerialNodes = tree.categories.filter(c => String(c.name || '').trim().toLowerCase() === 'aerials');
assert.equal(aerialNodes.length, 1, 'the category tree must contain exactly one Aerials node');
assert.equal(aerialNodes[0].id, 'b0b4c7d1-2f68-4c8a-9e51-6d2a3f7b8c90', 'the canonical Aerials category ID must remain stable');
assert.equal(aerialNodes[0].slug, 'aerials', 'the canonical Aerials slug must remain stable');
assert.equal(aerialNodes[0].parent_id, accessoriesNode.id, 'Aerials must be nested under Car Audio Accessories');
assert.equal(tree.categories.filter(c => c.id === aerialNodes[0].id).length, 1, 'the Aerials category ID must be unique');
assert.equal((categoryPage.match(/b0b4c7d1-2f68-4c8a-9e51-6d2a3f7b8c90/g) || []).length, 1, 'the category navigation map must register the Aerials destination exactly once');
assert.ok(previewCategory.includes("'b0b4c7d1-2f68-4c8a-9e51-6d2a3f7b8c90':'preview-asc-sample.html?category=Aerials'"), 'the sole Aerials navigation destination must open its review-only ASC sample view');
assert.ok(!home.includes("window.gwProducts=products;renderCats();render('featuredGrid',"), 'loading products must not replace the category grid and detach an in-flight category-button click');
const categoryClickHandler = home.slice(home.indexOf("document.addEventListener('click',e=>{const lm="), home.indexOf("document.getElementById('searchInput')?.addEventListener('input'"));
assert.ok(home.includes("HOME_CATEGORY_IDS.includes(c.id)") && home.includes('rootCategoryLink"><a class="catBtn catalogueLink"') && home.includes('preview-category.html?id='), 'each of the three homepage root categories must be a real link to its own category page');
assert.ok(!home.includes('rootCategoryLink"><button'), 'homepage root categories must not render as inline accordion buttons');
assert.ok(home.includes('function productBrandLabel(p)')&&home.includes("s.brand||s.manufacturer||s.brand_name||'Brand details to be confirmed'"),'main three-root storefront must display an evidence-backed brand or a clear confirmation placeholder');
assert.ok(home.includes('function productModelLabel(p)')&&home.includes('s.model_number||s.model||p.model_number||p.name'),'main product cards must put the verified model first and fall back only to the catalogue product name');
assert.ok(home.includes('class="productModel" data-product-model')&&home.includes('class="productBrand" data-product-brand')&&home.includes('class="productDescription" data-product-description'),'main category cards must use the owner-approved model, brand and description hierarchy');
assert.ok(home.includes('class="price productPrice" data-product-price')&&home.includes('money(p.price)'),'main category cards must retain verified ZAR pricing and the existing price-on-request state');
assert.ok(!home.includes('<p class="sku">SKU: ${esc(p.public_sku)}</p>'),'main category cards must not display internal/public SKU identifiers to customers');
assert.ok(home.includes('id="gw-owner-product-format"')&&home.includes('@media(max-width:640px)'),'owner product-card hierarchy must have mobile-first typography rules');
assert.ok(home.includes('class="productModel"')&&home.includes('productModelLabel(p)')&&home.includes('class="productBrand"')&&home.includes('productBrandLabel(p)'),'product detail modal must use the same model-first and brand-second hierarchy');
assert.ok(home.includes('class="infoBlock productDescription"')&&home.includes('class="detailPrice productPrice"'),'product detail modal must place the description before the verified price');
const detailModalRenderer=home.slice(home.indexOf('function openProduct'),home.indexOf('function add(id)',home.indexOf('function openProduct')));
assert.ok(!detailModalRenderer.includes('SKU: '),'product detail modal must not display a customer-facing SKU line');


assert.ok(categoryClickHandler.includes("if(b.matches('a.catalogueLink'))return"), 'dedicated category-page links must not be intercepted by the legacy accordion handler');
assert.ok(home.includes('#categoryGrid>.rootCategoryLink>a.catBtn{display:block!important;'), 'root category links must retain full-card tap targets');
assert.ok(previewCategory.includes("const children=cats.filter(c=>c.parent_id===current.id);if(children.length){let items=children.map(c=>({...c,count:total(c)}));") && previewCategory.includes("render(items,current.name") && previewCategory.includes("Choose a sub-category to continue. Each category opens its own page."), 'category pages must render their child categories even when product counts are zero, while allowing owner-specific routes');
assert.ok(previewCategory.includes("if(current.id==='e3d19d20-fb46-426c-9f64-221d863add0b'){location.replace('preview-audio.html?department=Car%20Audio&label=Car%20Audio%20%26%20Video');return}"), 'Car Audio & Video must open the brand-first catalogue landing page before component groups');
assert.ok(!previewCategory.includes('car-audio-video-category.svg')&&!audioPage.includes('car-audio-video-category.svg'), 'customer-facing Car Audio category cards and department fallbacks must never use illustrated SVG artwork');
assert.ok(previewCategory.includes('photo-1654447398824-dbcbefeafdd6')&&audioPage.includes('photo-1654447398824-dbcbefeafdd6'), 'Car Audio category imagery must use the photographic car-speaker asset');
assert.ok(audioPage.includes('el("brands").hidden=!department||brandChosen||directSearchRoute') && audioPage.includes('el("components").hidden=!department||!brandChosen||directSearchRoute'), 'Car Audio landing order must be brands first, then component groups after a brand is selected');
assert.ok(previewCategory.includes('id="compact-category-page-grid"') && previewCategory.includes('grid-template-columns:repeat(2,minmax(0,1fr))!important'), 'preview category pages must use compact two-column subcategory tiles on mobile');
assert.ok(previewCategory.includes("document.getElementById('search')?.addEventListener"), 'category page must not assume an optional search input exists before rendering its categories');
assert.ok(previewCategory.includes("'1df1ff82-7eff-4d8c-8f8c-0f18f72a56ca':'preview-audio.html?department=Car%20Audio&component=Amplifiers"), 'Amplifiers subcategory must open its own filtered audio page');
assert.ok(categoryPage.includes('id="compact-category-page-grid"') && categoryPage.includes('grid-template-columns:repeat(2,minmax(0,1fr))!important'), 'standard category pages must use compact two-column subcategory tiles on mobile');
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
assert.ok(audioPage.includes('brand-logos/jbl.svg'), 'JBL brand button must use its local wordmark asset');
assert.ok(audioPage.includes('brand-logos/denon.svg'), 'Denon brand button must use its local wordmark asset');
assert.ok(audioPage.includes('brand-logos/hertz.svg'), 'Hertz brand button must use its local wordmark asset');
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
assert.ok(builder.includes('"preview-audio.html"') && builder.includes('"preview-audio-brand.html"') && builder.includes('"preview-audio-products.html"') && builder.includes('"product-image-treatment-pilot.html"') && builder.includes('"product-image-treatment-sample.json"') && builder.includes('"get-wired-product-pilot"') && !builder.includes('asc-catalogue-preview.html') && !builder.includes('asc-catalogue-preview-data.json') && !builder.includes('planetworld-catalogue-preview.json') && !builder.includes('audio-connections-catalogue-preview.json'), 'preview package must include neutral audio assets and the 50-image sample, but exclude supplier-named files and full catalogue assets');
assert.ok(!home.includes('ascCatalogueNode') && !home.includes('asc-catalogue-preview.html'), 'deferred ASC catalogue buttons must not appear in the current pilot storefront');
assert.ok(home.includes('id="gw-subpage-shell-actions"') && home.includes('location.hash==="#cartPanel"') && home.includes('location.hash==="#part-search"') && home.includes('window.openPartSearch()'), 'homepage must open cart and part-search overlays when invoked from subpage shell links');
assert.ok(audioPage.includes('department==="Lifestyle"?p.division==="Home Retail"'), 'Lifestyle must show Home Retail products');
assert.ok(audioPage.includes('department==="Home Entertainment"?isHomeEntertainmentRecord(p)') && audioPage.includes('function isHomeEntertainmentRecord(p){') && audioPage.includes('component==="Home & Leisure Appliances"'), 'Home Entertainment must use the reviewed audio-only department filter');
assert.ok(planet.records.some(p => p.collection === 'Installed AV'), 'Installed AV source records must remain represented within Home Entertainment');
assert.ok(audioPage.includes('routeParams.get("search")') && audioPage.includes('routeParams.get("label")'));
assert.ok(audioPage.includes('department=requestedDepartment;brand=requestedBrand||"All brands";component=requestedComponent||"All product types"'), 'direct audio subcategory, brand and product-type routes must initialise their filters');
assert.ok(audioPage.includes('rows=enriched.concat(audioConnections)'), 'pre-enriched Planetworld and Audio Connections products must feed the same combined audio catalogue without the internal supplier crosswalk');
assert.ok(audioPage.includes('department==="Car Audio"?p.division==="Car Audio"&&p.collection!=="Marine Audio"'), 'Car Audio & Video must include every Car Audio source row together, not separate supplier pages');
assert.ok(audioPage.includes('brandButton(b,b===brand,"preview-audio-brand.html?"+u.toString())') && audioPage.includes('location.href="preview-audio-products.html?"+u.toString()'), 'brand and product-type selections must open separate dedicated pages');
assert.ok(audioBrandPage.includes('id="types"') && audioBrandPage.includes('typeCard') && audioBrandPage.includes('preview-audio-products.html?') && !audioBrandPage.includes('id="products"'), 'brand landing page must show product-type cards without displaying products');
assert.ok(audioProductsPage.includes('displayBrandName(p.brandDisplayName||p.brand)===brand&&group(p)===component'), 'product page must filter catalogue rows by verified brand and selected product type');
assert.ok(audioBrandPage.includes('images.unsplash.com/photo-1654447398824-dbcbefeafdd6') && audioBrandPage.includes('images.unsplash.com/photo-1543017471-62c14029f7ce'), 'brand page must use photographic product-type artwork');
assert.ok(audioBrandPage.includes('const exactBrandImage=rows.find(p=>brandDisplayName(p.brandDisplayName||p.brand)===brand&&group(p)===t&&p.imageUrl)'), 'brand page must prefer exact-brand product photos');
assert.ok(audioPage.includes('el("departments").hidden=!!department;el("audioDepartments").style.display=department?"none":"";'), 'selected audio department must hide the previous department menu');
assert.ok(home.includes("audioDepartmentNode('gw-audio-car','Car Audio & Video','Car Audio')"), 'home category must link to the unified Car Audio & Video subcategory');
assert.ok(planetPage.includes("location.replace('preview-audio.html?department=Car%20Audio&label=Car%20Audio%20%26%20Video')"), 'legacy Planetworld review route must redirect into the unified Car Audio & Video catalogue');
assert.ok(!planetPage.includes('Supplier stock snapshot') && !planetPage.includes('stock.jhb'), 'supplier stock snapshots must not be rendered as a separate customer-facing catalogue');
assert.ok(audioPage.includes('routeParams.get("department")'));
assert.ok(/name="robots" content="noindex,nofollow"/.test(audioPage));
assert.equal(planet.records.length,3317);
assert.equal(audio.records.length,66);
assert.equal(audio.powerSpecificationReconciliation.heldRecords.length,3,"only three unresolved Audio Connections model identity/specification holds may remain");
assert.deepEqual(audio.powerSpecificationReconciliation.resolvedSubwooferRecords,["ac-021","ac-025"]);
assert.ok(audio.powerSpecificationReconciliation.resolvedAmplifierRecords.includes("ac-038"),"SSA-HORNET-7600.4 must use the higher official impedance-specific output");
assert.equal(verifiedModels.records.length,69);
const oneNavPreviewRows=planet.records.filter(row=>row.brandDisplayName==="OneNav");
assert.equal(new Set(oneNavPreviewRows.map(row=>row.modelNumber)).size,43,"43 unique OneNav models must be integrated into the primary audio catalogue");
assert.equal(oneNavPreviewRows.length,44,"the exact duplicate ON115-3LX source row must be deduplicated in the rendered catalogue");
assert.ok(oneNavPreviewRows.every(row=>row.description&&row.manufacturerPage),"integrated OneNav models must carry verified descriptions and official pages");
assert.equal(oneNavPreviewRows.filter(row=>row.imageUrl).length,6,"only six OneNav owner-preview image candidates may be displayed");
assert.ok(oneNavPreviewRows.every(row=>row.imageCrop===false),"OneNav product images must preserve full height without cropping");
assert.ok(!planet.records.some(row=>["OA115-2","OA115-3"].includes(row.modelNumber)),"two ambiguous OneNav source-title collisions must remain held");
assert.ok(planet.records.every(row=>!Object.keys(row).some(key=>/^(supplierSku|supplier_sku|gwSku|gw_sku)$/i.test(key))),"public preview data must not expose supplier or Get Wired SKU fields");
assert.equal(planet.records.filter(row=>row.modelVerificationStatus==="OFFICIAL_MANUFACTURER_MODEL_PAGE_VERIFIED_REVIEW_ONLY").length,68,"68 exact manufacturer-model records must be linked to the primary preview");
const kickerWirePreview=planet.records.find(row=>row.id==="pw-1687");
assert.ok(kickerWirePreview&&kickerWirePreview.modelNumber==="KW16400"&&kickerWirePreview.modelVariant==="Sold per metre"&&kickerWirePreview.imageUrl,"Kicker per-metre wire must be reconciled without exposing its internal supplier variant code");
assert.ok(planet.records.filter(row=>row.division==="Car Audio"&&row.imageUrl).every(row=>row.imageCrop===false),"all Car Audio preview images must use full-image presentation");
assert.ok(audioPage.includes("displayBrand(p)===brand")&&audioPage.includes("productModelNumber")&&audioPage.includes('const imageFit="contain"'),"audio navigation must use verified brand labels, show model numbers and preserve full images");
assert.ok(audioBrandPage.includes("brandDisplayName(p.brandDisplayName||p.brand)===brand"),"audio brand pages must route by the verified customer-facing brand label");
assert.ok(audioProductsPage.includes("displayBrandName(p.brandDisplayName||p.brand)===brand")&&audioProductsPage.includes("img.style.objectFit='contain'"),"audio product pages must route by verified brand and preserve complete product images");
const oneNavAudit=read('catalogue-review/planetworld-one-official-model-audit.csv');
assert.equal((oneNavAudit.match(/INTEGRATED_PRIMARY_PREVIEW_REVIEW_ONLY/g)||[]).length,42,"42 OneNav models must have a unique primary-row integration");
assert.equal((oneNavAudit.match(/INTEGRATED_PRIMARY_PREVIEW_DUPLICATE_SOURCE_ROWS_DEDUPED/g)||[]).length,1,"the exact duplicate OneNav source row must be recorded");
assert.equal((oneNavAudit.match(/HOLD_SOURCE_TITLE_COLLISION_TWO_VARIANT_CODES_SHARE_TWO_PRIMARY_ROWS/g)||[]).length,2,"two ambiguous OneNav model codes must remain held");
assert.ok(verifiedModels.records.every(row=>row.primaryPreviewRecordId&&row.integrationStatus),"all 69 manufacturer-verification records must link to their primary preview row");
assert.equal(verifiedModels.records.filter(row => row.imageUrl).length,69);
const kickerPerMetreWire = verifiedModels.records.find(row => row.modelNumber === 'KW16400p/m');
assert.ok(
  kickerPerMetreWire &&
  kickerPerMetreWire.imageUrl === 'https://content.storefront7.co.za/stores/za.co.storefront7.planetworld/products/kw16400p/m/pictures/kw16400_tvu4.png?height=1026&width=1026' &&
  kickerPerMetreWire.imageStatus === 'owner_authorized_exact_supplier_image_verified_review_only',
  'Kicker KW16400p/m must retain its exact Planetworld spool image and owner-authorised supplier-image status'
);

assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_image_verified_review_only').length,48);
assert.equal(verifiedModels.records.filter(row => row.imageStatus === 'official_manufacturer_page_image_link_review_only').length,4);
assert.equal(verifiedModels.records.filter(row => row.imageUseAuthorization === 'OWNER_AUTHORIZED_FOR_STORE_PREVIEW_2026-11-04').length,2);
for (const model of ['66750650','66750800','66751501','66755100','66755105','66755107','69020020','69020021','66752000','66753000','66755030','66755110','66755115','66755156','66755157','66771820','66772201','66772203','69010020','69010021','69030020','69030021','69035010','69051040','69051050','69051055','69051060','69051070','69051075','69051090','69052020','69070030','69070040','69070050','69070070','69070080','69070085','69082001','69051030','69070020']) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://static.audison.com/'), 'official Audison image for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_image_verified_review_only');
}
for (const [model,domain] of [['DMX5023DABS','www.kenwoodstore.it'],['DMH-AP6650BT','www.pioneersouthafrica.co.za']]) {
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
for (const [model,domain] of [['CS-DR162','jasc.jvc.com'],['ILX-F115D','www.alpine.com.tr']]) {
  const row = verifiedModels.records.find(item => item.modelNumber === model);
  assert.ok(row && row.imageUrl && row.imageUrl.startsWith('https://'+domain+'/'), 'official exact-model image for '+model);
  assert.equal(row.imageStatus,'official_manufacturer_image_verified_review_only');
}
for (const obj of [planet,audio,autoElectrical,imageSample]) {
  const rows=obj.records||obj.products||[];
  const customerRows=JSON.stringify(rows).replace(/https?:\/\/[^\s"'<>]+/gi,'[image-asset-url]');
  assert.ok(!/Planetworld|Audio Connections/i.test(customerRows),'supplier names must not be used as customer-facing product labels');
  assert.ok(!/dealerCost|dealerPrice|wholesalePrice|supplierSku|supplierName|supplierModelNumber|internalSku|gwSku/i.test(customerRows),'internal supplier identifiers and costs must not appear in customer-facing product records');
}
assert.ok(previewCategory.includes("'owner-auto-sensors':'preview-auto-electrical.html?category=Automotive%20Sensors'") && previewCategory.includes("'owner-auto-switches':'preview-auto-electrical.html?category=Automotive%20Switches'") && previewCategory.includes("'owner-auto-fuel-pumps':'preview-auto-electrical.html?category=Fuel%20Pumps'"), 'verified Auto Electrical subcategories must route to their matching review-only product filters');
assert.ok(previewCategory.includes("items=items.filter(c=>c.name!=='Sensors & Switches')") && previewCategory.includes("name:'Automotive Sensors',count:9") && previewCategory.includes("name:'Automotive Switches',count:8") && previewCategory.includes("name:'Fuel Pumps',count:9"), 'combined Sensors & Switches must be split and Fuel Pumps added as separate catalogue categories');
assert.ok(previewAutoElectrical.includes("new URLSearchParams(location.search).get('category')") && previewAutoElectrical.includes("dataset.category===active"), 'Auto Electrical preview must honour category deep links and highlight the active filter');
assert.ok(previewCategory.includes("'b0b4c7d1-2f68-4c8a-9e51-6d2a3f7b8c90':'preview-asc-sample.html?category=Aerials'") && previewCategory.includes("'c35d15c1-d665-413f-b528-878b6a655d5d':'preview-asc-sample.html?category=Car%20Mats'"), 'ASC Aerials and Car Mats must route to their own sample catalogue records');
assert.ok(previewAscSample.includes("const allowed=['Aerials','Car Mats']") && previewAscSample.includes("p.reviewStatus==='REVIEW_ONLY_NOT_IMPORTED'"), 'ASC sample page must restrict itself to the two authorised review-only sample categories');
assert.ok(audioPage.includes('publicationStatus==="PREVIEW_ONLY_NOT_LIVE"') && audioPage.includes('imageStatus==="OWNER_AUTHORIZED_EXACT_MODEL_IMAGE_MATCH"') && audioPage.includes('&&p.imageUrl'), 'Audio Connections preview must exclude held, failed-image and low-resolution records');
assert.ok(audioBrandPage.includes('publicationStatus==="PREVIEW_ONLY_NOT_LIVE"') && audioProductsPage.includes('publicationStatus==="PREVIEW_ONLY_NOT_LIVE"'), 'Audio brand and product routes must use the same verified-only secondary catalogue filter');
assert.ok(imageSample.records.every(p=>/REGENERATED_FULL_SOURCE_HEIGHT/.test(p.imageStatus||'')), '50-image sample status must reflect regenerated full-height outputs without claiming owner acceptance');
assert.ok(imageProcessor.includes('PRODUCT_MASK_OVERRIDES') && imageProcessor.includes('mask_draw.rectangle') && imageProcessor.includes('"f1-012"') && imageProcessor.includes('0.92'), 'image treatment must mask external catalogue labels while preserving the full product bounds, including fuel-pump bodies');
assert.ok(audioPage.includes('ONENAV_WORDMARK') && audioPage.includes('"onenav":ONENAV_WORDMARK') && audioPage.includes('"amplified":"https://planetworld.canto.global/'), 'OneNav and Amplified brand buttons must use their mapped brand artwork');
assert.ok(audioPage.includes('min-width:184px') && audioPage.includes('height:72px') && audioPage.includes('transform:scale(1.5)'), 'Kicker brand logo must use the enlarged owner-requested display size');
const audioPageBodyStart = audioPage.indexOf('<body');
const audioPageScriptStart = audioPage.indexOf('<script', audioPageBodyStart);
const audioPageVisibleMarkup = audioPage.slice(audioPageBodyStart, audioPageScriptStart < 0 ? audioPage.length : audioPageScriptStart);
assert.ok(!/Planetworld|Audio Connections/i.test(audioPageVisibleMarkup), 'supplier names must not appear in customer-facing audio page markup');


assert.ok(builder.includes('"owner-preview.html"'), 'safe owner preview must be in the opt-in package allowlist');
assert.ok(ownerPreview.includes('src="index-new.html?ownerPreview=1&previewBuild=20261105-photo-category-buttons"'), 'owner preview must use the current storefront shell and committed category snapshot');
assert.ok(ownerPreview.includes('OWNER PREVIEW — NON-PRODUCTION'));
assert.ok(ownerPreview.includes('Checkout, order submission and Supabase write actions are blocked'));
assert.ok(ownerPreview.includes('a[href*="checkout"]') && ownerPreview.includes('event.stopImmediatePropagation()'), 'owner preview must block checkout navigation');
assert.ok(legacyPreview.includes("location.replace('owner-preview.html')"), 'legacy preview route must redirect to current owner preview');
assert.ok(previewCategory.includes("const ROOTS=[['Car Audio / Home Entertainment','1a13bc42-4f54-44f6-9658-36d141b77f4b'],['Auto Electrical Spares','ba263c9f-d038-48bd-bca0-944f3ebdc5e9'],['Car Care & Accessories','f98e7589-20a0-4825-9707-2680d29e5cb6']]"), 'preview category route must show only the three owner-approved startup category buttons');
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

assert.ok(audioPage.includes('https://images.unsplash.com/photo-1654447398824-dbcbefeafdd6?auto=format&fit=crop&w=720&q=82'), 'Car Audio & Video department button must show real car-audio product photography');
assert.ok(!audioPage.includes('img.src="assets/car-audio-video-category.svg"'), 'the Home Entertainment illustration must not be reused for Car Audio & Video');
const audioCategoryArtwork = read('assets/car-audio-video-category.svg');
assert.ok(audioCategoryArtwork.includes('<title id="title">Audio and home entertainment</title>'), 'audio category artwork must be explicitly audio/home-entertainment themed');
assert.ok(audioCategoryArtwork.includes('television') && audioCategoryArtwork.includes('stereo speakers') && audioCategoryArtwork.includes('headphones'), 'audio category artwork must depict home entertainment equipment');
assert.ok(!/modern car|CAR AUDIO • VIDEO • MULTIMEDIA|<circle cx="318" cy="399"/i.test(audioCategoryArtwork), 'audio/home-entertainment artwork must not contain the old car illustration');
assert.ok(audioPage.includes('"kicker":"https://down-ph.img.susercontent.com/file/962ea81bf211c3afc930edf076da9e76"') && audioPage.includes('"audison":"https://upload.wikimedia.org/wikipedia/commons/e/ec/Audison_logo.png"') && audioPage.includes('"alpine":"https://upload.wikimedia.org/wikipedia/commons/5/56/Alpine_logo.svg"'), 'core car-audio brand buttons must request their brand logos');
assert.ok(audioPage.includes('el("products").hidden=!department||(component==="All product types"&&!directSearchRoute)'), 'department and brand landing pages must hide stock while direct search routes and selected component routes show filtered products');
assert.ok(audioPage.includes('const directSearchRoute=!!query'), 'direct category search routes must open their own filtered product listing');
assert.ok(audioPage.includes('component==="All product types"&&!directSearchRoute'), 'normal department and brand pages must hide stock until a component or direct search is selected');
assert.ok(audioPage.includes('(brand==="All brands"||displayBrand(p)===brand)&&(component==="All product types"||componentGroup(p)===component)'), 'a direct component route must show its matching products even when brand remains All brands');

assert.ok(audioPage.includes('brand+" — "+(component==="All product types"?"COMPONENTS":component)'), 'brand and component selections must render as distinct page states');
assert.ok(previewCategory.includes("location.replace('preview-audio.html?department=Car%20Audio&label=Car%20Audio%20%26%20Video')"), 'Car Audio & Video must enter the brand-first audio landing page without preselecting All brands');
assert.ok(audioPage.includes('const brandChosen=routeParams.has("brand")&&requestedBrand!==""'), 'audio browse must distinguish an unselected brand stage from the explicit All brands choice');
assert.ok(audioPage.includes('el("brands").hidden=!department||brandChosen||directSearchRoute'), 'brand buttons must remain visible on the initial Car Audio landing page');
assert.ok(audioPage.includes('el("components").hidden=!department||!brandChosen||directSearchRoute'), 'component choices must remain hidden until a brand is selected');
assert.ok(audioPage.includes('function categoryArtFallback(label)'), 'category image failures must fall back to self-contained category artwork');
assert.ok(previewCategory.includes('this.src=categoryArtFallback(this.alt)'), 'category tile image failures must show a relevant fallback illustration instead of disappearing');
assert.ok(audioPage.includes('img.onerror=function(){this.onerror=null;this.remove()}'), 'failed audio component photos must be removed without retrying the same failed URL or restoring generic/cartoon artwork');

assert.ok(builder.includes('"car-audio-video-category.svg"'), 'Cloudflare preview package must include the Car Audio & Video artwork asset');

// Owner visual requirement: the customer-facing audio department and component cards use photographic art.
for (const photo of [
  'photo-1558284296-7579da2deb30',
  'photo-1654447398824-dbcbefeafdd6',
  'photo-1470948062737-aeb014e274c2',
  'photo-1543017471-62c14029f7ce',
  'photo-1506157786151-b8491531f063',
  'photo-1642784353476-d226d8d617b3',
  'photo-1598488035139-bdbb2231ce04'
]) {
  assert.ok(audioPage.includes(photo) || previewCategory.includes(photo) || audioBrandPage.includes(photo), 'audio category photography includes '+photo);
}
assert.ok(audioPage.includes('el("departments").hidden=!!department;'), 'selected department must hide the previous menu');
assert.ok(audioBrandPage.includes('const exactBrandImage=rows.find(p=>brandDisplayName(p.brandDisplayName||p.brand)===brand&&group(p)===t&&p.imageUrl)'), 'brand component cards must prefer exact product images');
for (const asset of ['audio-types/speakers.svg','audio-types/subwoofers.svg','audio-types/amplifiers.svg','audio-types/head-units.svg','audio-types/cameras-monitors.svg','audio-types/signal-processing.svg','audio-types/harnesses-trims.svg','audio-types/aerials.svg','audio-types/home-audio-cinema.svg','audio-types/musical-instruments.svg','audio-types/marine-audio.svg','audio-types/lifestyle-audio.svg']) {
  assert.ok(builder.includes('"'+asset+'"'), 'Cloudflare preview package retains safe category fallback '+asset);
}

assert.ok(audioBrandPage.includes("if(n.includes('kicker'))return 'https://down-ph.img.susercontent.com/file/962ea81bf211c3afc930edf076da9e76'"),'dedicated Kicker brand page must render its logo instead of a text-only fallback');
assert.ok(audioPage.includes('const ONENAV_WORDMARK=') && audioPage.includes('"onenav":ONENAV_WORDMARK') && !audioPage.includes('"one":ONENAV_WORDMARK'),'OneNav must use its own wordmark without assigning it to the unverified One family');
assert.ok(audioBrandPage.includes("if(n==='onenav'||n.includes('onenav'))return ONENAV_WORDMARK") && audioBrandPage.includes("if(n==='one x'||n==='onex')return 'https://planetworld.canto.global/"),'OneNav dedicated page must use its own wordmark and not reuse the OneX logo');
assert.ok(audioBrandPage.includes("img[alt*='Kicker']{width:135px!important;height:80px!important;max-width:none!important;transform:scale(1.5)!important"),'Kicker logo must be visibly enlarged on the dedicated brand page');

assert.equal(planet.pricingRule.display,'Price On Request','all supplier products must use the current owner Price On Request policy');
assert.ok(planet.records.every(row=>row.indicativePrice===null&&row.hasStock===null),'Planetworld preview must not expose stale numeric prices or stock snapshots');
assert.ok(audio.records.every(row=>row.indicativePrice===null&&row.hasStock===null&&row.priceOnRequestText==='Price On Request'&&!('gwSku' in row)),'Audio Connections preview must suppress stale prices, stock and proposed internal GW SKUs');
assert.ok(builder.includes('sanitize-public-preview-data.py') && builder.includes('public-preview-data-sanitization.test.cjs'),'the public Pages build must sanitize preview JSON and verify the emitted customer-facing files');

console.log('THREE_CATEGORY_STOREFRONT_STRUCTURE_PASS roots=3 asc=deferred planetworld_rows=3317 audio_connections_rows=66 owner_preview=safe');

assert.ok(previewCategory.includes("routeLabel==='car audio & video'") && previewCategory.includes("preview-audio.html?department=Car%20Audio"), 'Car Audio & Video must route by its customer-facing category label into the brand directory');
