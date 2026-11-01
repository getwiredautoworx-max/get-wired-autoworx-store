const fs = require('node:fs');
const html = fs.readFileSync('preview-store.html','utf8');
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
  ["wrap.classList.toggle('open')", "expandable root-category navigation"],
  ["No visually verified pilot products are assigned to this subcategory yet", "honest empty-state messaging"]
];
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
if(pilot.length!==26) throw new Error('ASC review pilot must contain one header and 25 visually verified source-page records');
const imageMatches=fs.readFileSync('catalogue-review/asc-catalogue-extraction/asc-image-match-review-only.csv','utf8').trim().split(/\r?\n/);
if(imageMatches.length!==26||!imageMatches[1].includes('SOURCE_CARD_CROP_REVIEWED')) throw new Error('ASC pilot image pairing review register must contain 25 source-card matches');
const pilotData=JSON.parse(fs.readFileSync('assets/asc-catalogue-pilot-preview.json','utf8'));
const builder=fs.readFileSync('scripts/build-cloudflare-pages-public.py','utf8');
if(pilotData.record_count!==25||pilotData.records.length!==25) throw new Error('ASC preview pilot must contain exactly 25 records backed by the completed review registers');
for(const p of pilotData.records){
 if(!p.preview_only||p.release_status!=='REVIEW_ONLY_NOT_LIVE'||p.source_page!==3||!p.catalogue_reference||!p.source_file||Object.prototype.hasOwnProperty.call(p,'supplier_sku')) throw new Error('ASC pilot row missing source evidence or preview-only guard');
 if(p.price!==null||p.stock_quantity!==null||p.internal_sku!==null||p.public_sku!==null) throw new Error('ASC pilot must not invent price, stock or internal/public SKU');
 if(!p.image_url||p.image_crop_status!=='SOURCE_CARD_CROP_REVIEWED'||!fs.existsSync(p.image_url)) throw new Error('ASC pilot source-card crop missing or not reviewed');
 if(!builder.includes(p.image_url.replace('assets/',''))) throw new Error('ASC pilot crop is not included in preview asset allowlist: '+p.image_url);
}
if(!html.includes("async function openAscCatalogueCategory")||!html.includes("ascPilotCard")||!html.includes("asc-catalogue-pilot-preview.json")) throw new Error('ASC pilot is not wired into storefront subcategory preview');
if(!builder.includes('"asc-catalogue-pilot-preview.json"')) throw new Error('ASC preview JSON is not in the preview-only asset allowlist');
for(const file of ['asc-image-match-review-only.csv','asc-exceptions-review-only.csv']) if(!fs.existsSync('catalogue-review/asc-catalogue-extraction/'+file)) throw new Error('Missing ASC review register '+file);


const openStart=html.indexOf("async function openAscCatalogueCategory");
const openEnd=html.indexOf("\n}",openStart)+2;
const openBlock=html.slice(openStart,openEnd);
if(!openStart||openEnd<2||/products\\.filter|show\\(matches\\)/.test(openBlock)) throw new Error("ASC catalogue navigation must not mix fuzzy-matched general-store products into source subcategories");
if(!openBlock.includes("(ascPilotCache.records||[]).filter(p=>p.subcategory===label)")||!openBlock.includes("No unrelated store products are substituted")) throw new Error("ASC subcategory must show only exact verified pilot rows or an honest empty state");
if(!html.includes("product-placeholder|product-image-pending")||!html.includes("functions/v1/product-image?sku=")) throw new Error("Homepage product-image helper must bypass placeholder URLs and try the exact-SKU image endpoint");
const productsPage=fs.readFileSync("preview-products.html","utf8");
const detailPage=fs.readFileSync("preview-product.html","utf8");
if(!productsPage.includes("function productImageData(p)")||!productsPage.includes("data-fallback")||!productsPage.includes("functions/v1/product-image?sku=")) throw new Error("Category product cards must use the verified image fallback chain");
if(!detailPage.includes("const unusableImage=")||!detailPage.includes("functions/v1/product-image?sku=")) throw new Error("Product detail must bypass generic placeholder URLs");

console.log("ASC_CATALOGUE_NAVIGATION_PASS: six source families, 72 OCR pages and review-only staging verified; no unverified product rows promoted.");
