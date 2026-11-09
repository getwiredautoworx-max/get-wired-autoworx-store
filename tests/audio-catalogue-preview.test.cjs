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
console.log("PASS: 3,317 + 66 audio review records; generic Price On Request; no numeric prices, stock or visible supplier names.");
