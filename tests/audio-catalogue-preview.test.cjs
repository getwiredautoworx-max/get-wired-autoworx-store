const fs=require("node:fs");
const assert=require("node:assert/strict");
const primary=JSON.parse(fs.readFileSync("assets/audio-catalogue-primary-preview.json","utf8"));
const secondary=JSON.parse(fs.readFileSync("assets/audio-catalogue-secondary-preview.json","utf8"));
const models=JSON.parse(fs.readFileSync("assets/audio-model-verification-preview.json","utf8"));
assert.equal(primary.records.length,3317);
assert.equal(secondary.records.length,66);
assert.equal(primary.pricingRule.customerDisplay,"Price On Request");
assert.match(primary.pricingNote,/Price On Request/);
for(const data of [primary,secondary]){
 for(const r of data.records){
  assert.equal(r.indicativePrice,null,"indicative supplier price must be suppressed");
  assert.equal(r.hasStock,null,"stock must remain unconfirmed");
  if(r.priceOnRequestText!==undefined)assert.equal(r.priceOnRequestText,"Price On Request");
  assert.ok(!("supplierSku" in r),"supplier SKU must not be exposed");
 }
}
const raw=JSON.stringify([primary,secondary,models]);
// Image hosts may retain the original supplier domain because the owner has
// authorised those exact catalogue/manufacturer images. The host is not a
// customer-facing supplier label; audit visible metadata separately.
const customerVisibleMetadata=raw.replace(/https?:\/\/[^\s"'<>]+/gi,"[image-asset-url]");
assert.doesNotMatch(customerVisibleMetadata,/Planetworld|Audio Connections/i,"supplier names must not appear in customer-visible catalogue metadata");
for(const file of ["preview-audio.html","preview-audio-products.html","preview-audio-brand.html"]){
 const html=fs.readFileSync(file,"utf8");
 assert.doesNotMatch(html,/assets\/(?:planetworld|audio-connections)[^"' ]*\.json/i);
}
const brandPage=fs.readFileSync("preview-audio-brand.html","utf8");
const productsPage=fs.readFileSync("preview-audio-products.html","utf8");
assert.match(brandPage,/if\(!brand\)throw Error/,"A brand route must require an explicit brand selection");
assert.match(brandPage,/rows\.filter\(p=>p\.brand===brand\)/,"Brand view must isolate records to the selected brand");
assert.match(brandPage,/new URLSearchParams\(\{department,brand,component:t,label\}\)/,
 "Product-type navigation must carry the selected department, brand and type");
assert.match(brandPage,/const isOneNav=\/\^\(one\|onenav\)\$\/i\.test\(brand\)/,
 "OneNav image/logo handling must be isolated from other brands");
assert.match(brandPage,/const sharedTypeImage=isOneNav\?null/,
 "OneNav product-type tiles must not borrow another brand's product image");
assert.match(brandPage,/Exact OneNav product-type image pending verification/,
 "Missing OneNav type imagery must be shown as pending, not substituted");
assert.match(brandPage,/if\(n==='one'\|\|n==='onenav'\|\|n\.includes\('onenav'\)\)return ''/,
 "Do not render a generated text treatment as an official OneNav logo");
assert.doesNotMatch(brandPage,/ONENAV_WORDMARK/,"Generated OneNav wordmark must not be presented as the brand logo");
assert.match(productsPage,/rowsFor\(d\)\.filter\(p=>p\.brand===brand&&group\(p\)===component\)/,
 "Product page must filter by both selected brand and product type");
assert.match(productsPage,/price\.textContent='Price On Request'/,
 "Audio product cards must use the owner's current price display");
assert.match(productsPage,/Exact product photo pending verification/,
 "Products without an exact approved photo must show a pending state");
assert.doesNotMatch(brandPage+"\n"+productsPage,/supplierSku|supplier_source_code_private|source_workbook/i,
 "Internal supplier identifiers/source metadata must not be rendered by audio pages");

console.log("PASS: audio price/privacy checks plus brand isolation, product-type navigation and OneNav exact-image/logo fail-closed checks.");
