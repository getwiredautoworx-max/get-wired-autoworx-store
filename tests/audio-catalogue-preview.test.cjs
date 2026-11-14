const fs=require("node:fs");
const assert=require("node:assert/strict");
const primary=JSON.parse(fs.readFileSync("assets/audio-catalogue-primary-preview.json","utf8"));
const secondary=JSON.parse(fs.readFileSync("assets/audio-catalogue-secondary-preview.json","utf8"));
const models=JSON.parse(fs.readFileSync("assets/audio-model-verification-preview.json","utf8"));
const overrides=JSON.parse(fs.readFileSync("assets/audio-product-enrichment-overrides.json","utf8"));
assert.equal(primary.records.length,3317);
assert.equal(secondary.records.length,72);
assert.equal(secondary.powerSpecificationReconciliation.heldRecords.length,3);
assert.deepEqual(secondary.powerSpecificationReconciliation.resolvedSubwooferRecords,["ac-021","ac-025"]);
assert.ok(secondary.records.filter(r=>r.id==="ac-032"||r.id==="ac-041"||r.id==="ac-044").every(r=>r.publicationStatus.startsWith("HOLD_") && !r.imageUrl));
for(const r of secondary.records)assert.equal(r.priceOnRequestText,"Price On Request");
assert.equal(models.recordCount,models.records.length);
for(const r of models.records){
 assert.ok(r.brand && r.brand.trim(),`manufacturer brand missing for ${r.modelNumber||r.name}`);
 assert.ok((r.gwSku && r.gwSku.trim()) || (r.gwSkuStatus && r.gwSkuStatus.trim()),`GW SKU state missing for ${r.modelNumber||r.name}`);
}
const heldImage=secondary.records.find(r=>r.modelNumber==="XS-W104ES");
assert.equal(heldImage.imageStatus,"IMAGE_RENDERING_FAILED_HOLD");
assert.equal(heldImage.imageUrl,"","failed image must not be served in customer preview");
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
const customerVisibleMetadata=raw.replace(/https?:\/\/[^/"'<>]+/gi,"[image-asset-url]");
assert.doesNotMatch(customerVisibleMetadata,/Planetworld|Audio Connections/i,"supplier names must not appear in customer-visible catalogue metadata");
for(const file of ["preview-audio.html","preview-audio-products.html","preview-audio-brand.html"]){
 const html=fs.readFileSync(file,"utf8");
 assert.doesNotMatch(html,/assets\/(?:planetworld|audio-connections)[^"' ]*\.json/i);
}

const forzas = [
 {id:"pw-0119",model:"AF M12.14 bit",sku:"66755100",amplified:12,dsp:14,preOuts:2,gwSku:"GW-51F781DA",page:"https://audison.com/product/af-m12-14-bit/",title:"Audison Forza AF M12.14 bit 12-Channel Amplifier with 14-Channel DSP"},
 {id:"pw-0120",model:"AF M8.14 bit",sku:"66755105",amplified:8,dsp:14,preOuts:6,gwSku:"GW-ED176A31",page:"https://audison.com/product/af-m8-14-bit/",title:"Audison Forza AF M8.14 bit 8-Channel Amplifier with 14-Channel DSP"},
 {id:"pw-0121",model:"AF C8.14 bit",sku:"66755107",amplified:8,dsp:14,preOuts:6,gwSku:"GW-0D9576AB",page:"https://audison.com/product/af-c8-14-bit/",title:"Audison Forza AF C8.14 bit 8-Channel Amplifier with 14-Channel DSP"},
 {id:"pw-0122",model:"AF M5.11 bit",sku:"66755110",amplified:5,dsp:11,preOuts:6,gwSku:"GW-6525B0FB",page:"https://audison.com/product/af-m5-11-bit/",title:"Audison Forza AF M5.11 bit 5-Channel Amplifier with 11-Channel DSP"}
];
for (const expected of forzas) {
 const record=models.records.find(r=>r.primaryPreviewRecordId===expected.id);
 assert.ok(record,"Forza model record missing: "+expected.model);
 assert.equal(record.manufacturerModel,expected.model);
 assert.equal(record.modelNumber,expected.model);
 assert.equal(record.manufacturerModelNumber,expected.model);
 assert.equal(record.sourceSkuReferenceInternal,expected.sku);
 assert.equal(record.amplifiedChannels,expected.amplified);
 assert.equal(record.dspControlledOutputChannels,expected.dsp);
 assert.equal(record.preOutChannels,expected.preOuts);
 assert.equal(record.gwSku,expected.gwSku);
 assert.equal(record.manufacturerVerificationStatus,"MANUFACTURER_VERIFIED");
 assert.equal(record.manufacturerPage,expected.page);
 assert.equal(record.imageStatus,"official_manufacturer_image_verified_review_only");
 assert.equal(record.imageApprovalStatus,"OWNER_AUTHORISED_FOR_OWNER_PREVIEW");
 assert.equal(record.importStatus,"DO_NOT_IMPORT");
 assert.equal(record.priceOnRequestText,"Price On Request");
 assert.equal(record.indicativePrice,null);
 assert.equal(record.hasStock,null);
 const override=overrides.records.find(o=>o.match&&o.match.id===expected.id);
 assert.ok(override,"exact primary record override missing: "+expected.model);
 assert.equal(override.appendIfMissing,true);
 assert.equal(override.modelNumber,expected.model);
 assert.equal(override.title,expected.title);
 assert.equal(override.manufacturerProductName,expected.title);
 assert.equal(override.collection,"Car Audio & Video");
 assert.equal(override.component,"Amplifiers");
 assert.equal(override.priceOnRequestText,"Price On Request");
 assert.equal(override.indicativePrice,null);
 assert.equal(override.hasStock,null);
 assert.equal(override.imageStatus,"official_manufacturer_image_verified_review_only");
 assert.equal(override.imageApprovalStatus,"OWNER_AUTHORISED_FOR_OWNER_PREVIEW");
 assert.equal(override.importStatus,"DO_NOT_IMPORT");
 const ampWord=({5:"Five",8:"Eight",12:"Twelve"})[expected.amplified];
 assert.ok(override.description.includes(ampWord+" amplified channels"));
 assert.match(override.description,new RegExp(expected.dsp+" output channels"));
}
const audioProductPage=fs.readFileSync("preview-audio-products.html","utf8");
assert.match(audioProductPage,/title\.textContent=p\.manufacturerProductName\|\|p\.title\|\|p\.name\|\|'Product'/);
assert.doesNotMatch(audioProductPage,/title\.textContent=p\.modelNumber/);

console.log("PASS: 3,317 + 72 audio records; Forza channel topology; exact-ID overrides; generic Price On Request; no raw model-number display.");
