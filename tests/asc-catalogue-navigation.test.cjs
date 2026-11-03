const fs = require('node:fs');
const html = fs.readFileSync('preview-store.html','utf8');
const categoryPage = fs.readFileSync('preview-category.html','utf8');
const required = [
  ["ASC_CATALOGUE_CHILDREN", "ASC family navigation data"],
  ["Automotive Sensors", "sensor category"],
  ["Automotive Switches", "switch category"],
  ["Automotive Globes & Lighting", "globe and lighting category"],
  ["Fuel Pumps", "fuel pump category"],
  ["Aerials", "aerial category"],
  ["Car Mats", "car mats category"],
  ["Vehicle-Specific Aerials", "aerial subcategory from source contents"],
  ["Crankshaft & Camshaft Position Sensors", "sensor subcategory from source contents"],
  ["Ignition Switches & Barrel Sets", "switch subcategory from source contents"],
  ["HID Globes, Kits & Ballasts", "globe subcategory from source contents"],
  ["Carpet Mat Sets — Toyota", "vehicle-specific mat subcategory"],
  ["Electric Fuel Pumps — BMW", "vehicle-specific fuel-pump subcategory"],
  ["Diesel Lift Pumps & Housings — All Makes", "diesel lift-pump subcategory"],
  ["data-asc-query", "virtual catalogue filter controls"],
  ["openAscCatalogueCategory", "catalogue category interaction"],
  ["ASC catalogue sections • source-led navigation", "source-led category labels without fuzzy product counts"],
  ["No unrelated store products are substituted", "safe empty state for unverified catalogue sections"],
  ["preview-category.html?id=", "homepage category buttons open dedicated category pages"],
  ["No visually verified pilot products are assigned to this subcategory yet", "honest empty-state messaging"]
];
if(!categoryPage.includes("ASC_CATALOGUE_CHILDREN")||!categoryPage.includes("preview-store.html?asc_query=")) throw new Error("Dedicated category pages must preserve ASC source-led subcategories and route verified leaves to their exact preview records");
if(!html.includes("new URLSearchParams(location.search)")||!html.includes("previewParams.get('asc_label')")) throw new Error("ASC subcategory links must open the matching preview-only catalogue records");
for (const [needle,label] of required) {
  if (!html.includes(needle)) throw new Error("Missing " + label + " (" + needle + ")");
}
const objectStart=html.indexOf("const ASC_CATALOGUE_CHILDREN");
const objectEnd=html.indexOf("};",objectStart);
const taxonomy=html.slice(objectStart,objectEnd);
const expected = [
  ["'6cc56033-b0a9-4f25-b207-aeeb341a1c47':[", ["Fuel Pumps"]],
  ["'f7f2ea3b-f15d-46a7-920b-9d3d9a394c79':[", ["Vehicle-Specific Aerials"]],
  ["'3a1191ad-5fb8-4eb1-9ec0-6ddc598ea272':[", ["Crankshaft & Camshaft Position Sensors"]],
  ["'2cb1bdff-652a-4aa5-9b06-b85d3ec44191':[", ["Ignition Switches & Barrel Sets"]],
  ["'cfd3e001-9292-459f-b0e5-9502f160eb5c':[", ["HID Globes, Kits & Ballasts"]],
  ["'c910bc35-2f87-465e-b7c5-f6b27c133146':[", ["Carpet Mat Sets — Toyota"]],
  ["'asc-fuel-pumps':[", ["Electric Fuel Pumps — BMW", "Diesel Lift Pumps & Housings — All Makes"]]
];
for (const [parent,labels] of expected) {
  const start=taxonomy.indexOf(parent);
  if(start<0) throw new Error("Missing ASC catalogue parent mapping "+parent);
  const next=taxonomy.indexOf("\n '",start+parent.length);
  const block=taxonomy.slice(start,next<0?taxonomy.length:next);
  for(const label of labels) if(!block.includes(label)) throw new Error(label+" is not nested under expected existing category "+parent);
}
const fuelStart=taxonomy.indexOf("'asc-fuel-pumps':[");
if(fuelStart<0) throw new Error("Missing nested Fuel Pumps category");
const fuelEnd=taxonomy.indexOf("\n ]",fuelStart);
const fuelBlock=taxonomy.slice(fuelStart,fuelEnd<0?taxonomy.length:fuelEnd);
for(const label of ["Electric Fuel Pumps — BMW","Diesel Lift Pumps & Housings — All Makes"]) {
  if(!fuelBlock.includes(label)) throw new Error(label+" is not nested under Fuel Pumps");
}
if (html.includes("ASC catalogue stock verified") || html.includes("ASC supplier stock available")) {
  throw new Error("Preview must not imply supplier stock verification");
}

const sourceFiles=[
 'ASC- Aerials (1).pdf','ASC- Automotive Sensors (1).pdf','ASC- Automotive Switches (1).pdf',
 'ASC- Automotive globes (1).pdf','ASC- Car Mats (1).pdf','ASC- Fuel Pumps (1).pdf'
];
for(const file of sourceFiles) if(!fs.existsSync('suppliers/ASC/'+file)) throw new Error('Missing original ASC source PDF '+file);
const manifest=JSON.parse(fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-source-manifest.json','utf8'));
if(manifest.source_count!==6||manifest.sources.length!==6) throw new Error('ASC source manifest must contain six originals');
const summary=JSON.parse(fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-extraction-summary.json','utf8'));
if(summary.length!==6||summary.reduce((n,x)=>n+Number(x.page_count||0),0)!==72) throw new Error('ASC extraction summary must cover all 72 source pages');
const pageReview=fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-page-text-review-only.csv','utf8');
if(!pageReview.includes('ASC- Aerials (1).pdf')||!pageReview.includes('ASC- Fuel Pumps (1).pdf')) throw new Error('ASC page-level OCR review is incomplete');
const codeCandidates=fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-ocr-code-candidates-review-only.csv','utf8');
if(codeCandidates.split(/\r?\n/).filter(Boolean).length<20||!codeCandidates.includes('UNVERIFIED_OCR_CANDIDATE')) throw new Error('ASC OCR candidate index missing or not marked unverified');
const pilot=fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-product-pilot-review-only.csv','utf8').trim().split(/\r?\n/);
if(pilot.length!==51) throw new Error('ASC review pilot must contain one header and 50 visually verified source-page records from pages 3 and 4');
const imageMatches=fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-image-match-review-only.csv','utf8').trim().split(/\r?\n/);
if(imageMatches.length!==51||!imageMatches[1].includes('SOURCE_CARD_CROP_REVIEWED')) throw new Error('ASC pilot image pairing review register must contain 50 source-card matches');
const pilotData=JSON.parse(fs.readFileSync('assets/asc-catalogue-pilot-preview.json','utf8'));
const builder=fs.readFileSync('scripts/build-cloudflare-pages-public.py','utf8');
if(!builder.includes('shutil.copy2(OUT / "preview-store.html", OUT / "index.html")')) throw new Error('Isolated preview root must open the approved storefront shell without changing production index.html');
if(!builder.includes('"catalogue-search.js"')) throw new Error('Preview package must include the free local catalogue search engine used by Part Search');
if(pilotData.record_count!==50||pilotData.records.length!==50) throw new Error('ASC preview pilot must contain exactly 50 records backed by the completed review registers');
for(const p of pilotData.records){
 if(!p.preview_only||p.release_status!=='REVIEW_ONLY_NOT_LIVE'||![3,4].includes(p.source_page)||!p.catalogue_reference||!p.source_file||Object.prototype.hasOwnProperty.call(p,'supplier_sku')) throw new Error('ASC pilot row missing source evidence or preview-only guard');
 if(p.price!==null||p.stock_quantity!==null||p.internal_sku!==null||p.public_sku!==null) throw new Error('ASC pilot must not invent price, stock or internal/public SKU');
 if(!p.image_url||p.image_crop_status!=='SOURCE_CARD_CROP_REVIEWED'||!fs.existsSync(p.image_url)) throw new Error('ASC pilot source-card crop missing or not reviewed');
 if(!builder.includes(p.image_url.replace('assets/',''))) throw new Error('ASC pilot crop is not included in preview asset allowlist: '+p.image_url);
}
if(!html.includes("async function openAscCatalogueCategory")||!html.includes("ascPilotCard")||!html.includes("asc-catalogue-pilot-preview.json")) throw new Error('ASC pilot is not wired into storefront subcategory preview');
if(!builder.includes('"asc-catalogue-pilot-preview.json"')) throw new Error('ASC preview JSON is not in the preview-only asset allowlist');
for(const file of ['asc-image-match-review-only.csv','asc-exceptions-review-only.csv']) if(!fs.existsSync('catalogue-review/asc-catalogue-extraction/'+file)) throw new Error('Missing ASC review register '+file);


const navStart=html.indexOf("const ASC_CATALOGUE_CHILDREN={");
const navEnd=html.indexOf("\n};\n// ASC catalogue sections",navStart);
const navBlock=html.slice(navStart,navEnd);
const navIds=[...navBlock.matchAll(/id:'(asc-[^']+)'/g)].map(x=>x[1]);
const navCounts={aerial:navIds.filter(x=>x.startsWith('asc-aerial-')).length,sensor:navIds.filter(x=>x.startsWith('asc-sensor-')).length,switches:navIds.filter(x=>x.startsWith('asc-switch-')).length,globes:navIds.filter(x=>x.startsWith('asc-globe-')).length,mats:navIds.filter(x=>x.startsWith('asc-mat-')).length,fuel:navIds.filter(x=>x.startsWith('asc-fuel-')).length-1};
if(!navStart||navEnd<0||navIds.length!==76||new Set(navIds).size!==76||JSON.stringify(navCounts)!==JSON.stringify({aerial:6,sensor:11,switches:16,globes:10,mats:14,fuel:18})) throw new Error("ASC catalogue navigation must preserve all 75 source contents sections plus the Fuel Pumps parent: "+JSON.stringify(navCounts));
const openStart=html.indexOf("async function openAscCatalogueCategory");
const openEnd=html.indexOf("\n}",openStart)+2;
const openBlock=html.slice(openStart,openEnd);
if(!openStart||openEnd<2||/products\.filter|show\(matches\)/.test(openBlock)) throw new Error("ASC catalogue navigation must not mix fuzzy-matched general-store products into source subcategories");
if(!openBlock.includes("(ascPilotCache.records||[]).filter(p=>p.subcategory===label)")||!openBlock.includes("No unrelated store products are substituted")) throw new Error("ASC subcategory must show only exact verified pilot rows or an honest empty state");
if(!html.includes("assets/products_webp/")||!html.includes("assets/product-placeholder.svg")||html.includes("functions/v1/product-image?sku=")) throw new Error("Homepage product-image helper must use exact-SKU local WebP assets with a neutral placeholder fallback");
const productsPage=fs.readFileSync("preview-products.html","utf8");
const categoryReviewHoldSkus=["GW-21132FDF","GW-E93CDF1E","GW-AA085120","GW-22B30765","GW-0E5E3109","GW-125D2F26","GW-FF7B49CB","GW-FC14A84E","GW-0B8032C4"];
for(const sku of categoryReviewHoldSkus){
 if(!html.includes("'"+sku+"'")||!productsPage.includes("'"+sku+"'")) throw new Error("Known misclassified oil-filler-cap SKU is not held from category browsing: "+sku);
}
if(!html.includes("function showCategory(list)")||!html.includes("showCategory(products.filter")) throw new Error("Homepage category navigation does not apply the source-category review hold");
if(!productsPage.includes("heldCategoryItems=products.filter")||!productsPage.includes("No category assignments have been changed")) throw new Error("Category product page must explain review-held products without mutating category assignments");

const detailPage=fs.readFileSync("preview-product.html","utf8");
if(!productsPage.includes("function productImageData(p)")||!productsPage.includes("assets/products_webp/")||!productsPage.includes("data-fallback")||!productsPage.includes("assets/product-placeholder.svg")||productsPage.includes("functions/v1/product-image?sku=")) throw new Error("Category product cards must use exact-SKU local WebP images with a packaged placeholder fallback");
if(!productsPage.includes("assets/product-placeholder.svg")||productsPage.includes("assets/product-image-pending.svg")) throw new Error("Category product cards must use a placeholder asset included in the public preview package");
if(!detailPage.includes("assets/products_webp/")||!detailPage.includes("assets/product-placeholder.svg")||detailPage.includes("functions/v1/product-image?sku=")) throw new Error("Product detail must use exact-SKU local WebP images with a packaged placeholder fallback");
if(!detailPage.includes("assets/product-placeholder.svg")||detailPage.includes("assets/product-image-pending.svg")) throw new Error("Product detail must use the packaged final image fallback");


const legacyGuard=require('../assets/legacy-catalogue-guard.js');
const legacyFixtures=[
 {public_sku:'GW-OLD-SEPT',specifications:{source:"September Buyer's Guide"}},
 {public_sku:'GW-OLD-OCT',specifications:{source_file:"October Buyer's Guide.pdf"}},
 {public_sku:'GW-1893682C',specifications:{}},
 {public_sku:'GW-CURRENT-ASC',specifications:{source:'Approved ASC catalogue'}},
 {public_sku:'GW-OTHER',specifications:{}}
];
const keptLegacyFixtureRows=legacyGuard.filter(legacyFixtures);
if(keptLegacyFixtureRows.length!==2||keptLegacyFixtureRows.some(p=>legacyGuard.isLegacyBuyerGuideRecord(p))) throw new Error('Legacy Buyers Guide quarantine did not exclude source-tagged and source-missing legacy ASC rows');
for(const [file,htmlText] of [['preview-store.html',html],['preview-category.html',categoryPage],['preview-products.html',productsPage],['preview-product.html',detailPage]]){
 if(!htmlText.includes('assets/legacy-catalogue-guard.js')||!htmlText.includes('GWLegacyCatalogueGuard.filter')) throw new Error(file+' must apply the legacy Buyers Guide quarantine before product rendering');
}
const refreshedTree=JSON.parse(fs.readFileSync('assets/category-tree.json','utf8'));
if(!refreshedTree.generated_at.startsWith('2026-11-03')||refreshedTree.categories.some(c=>!Number.isInteger(Number(c.direct_active_products))||Number(c.direct_active_products)<0)) throw new Error('Category counts are not refreshed/valid for the 2026-11-03 active catalogue snapshot');
if(!builder.includes('"legacy-catalogue-guard.js"')) throw new Error('Legacy catalogue quarantine helper is missing from the isolated public package allowlist');
console.log('LEGACY_BUYERS_GUIDE_QUARANTINE_PASS: source-tagged September/October guide rows and the audited source-missing ASC row are excluded in every product-rendering preview route.');

console.log("ASC_CATALOGUE_NAVIGATION_PASS: six source families, 72 OCR pages and review-only staging verified; no unverified product rows promoted.");
