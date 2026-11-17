"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const data=JSON.parse(fs.readFileSync("assets/auto-electrical-owner-preview.json","utf8"));
assert.equal(data.status,"OWNER PREVIEW ONLY — REVIEW ONLY — DO NOT IMPORT");
assert.equal(data.products.length,27,"expected 27 eligible Auto Electrical preview products");
assert.deepEqual(data.summary.categoryCounts,{"Ignition Modules":24,"Ignition Looms":3});
assert.equal(data.summary.confirmedFitmentRecords,3);
assert.equal(data.summary.corroboratedFitmentRecords,24);
assert.equal(data.summary.excludedFromPreview,2);
const visible=JSON.stringify(data.products);
for(let i=1;i<=27;i++){
 const file="assets/auto-electrical-products/auto-electrical-"+String(i).padStart(3,"0")+".jpg";
 assert.ok(fs.existsSync(file),"missing sanitized customer image "+file);
}
for(const p of data.products){
 assert.ok(["Ignition Modules","Ignition Looms"].includes(p.category));
 assert.ok(p.title&&p.description&&p.fitment&&p.fitmentStatus);
 assert.equal(p.priceDisplay,"Price On Request");
 assert.equal(p.availabilityDisplay,"Availability to confirm");
 assert.equal(p.publicationStatus,"PREVIEW_ONLY_NOT_LIVE");
 assert.equal(p.indicativePrice,null);
 assert.equal(p.hasStock,null);
 assert.ok(p.image.startsWith("assets/auto-electrical-products/auto-electrical-"));
 assert.match(p.imageStatus,/SOURCE_LABELS_AND_INTERNAL_CODE_REMOVED/);
 assert.ok(!Object.keys(p).some(k=>/supplier|internalSku|gwSku/i.test(k)));
}
function parseCSV(s){let out=[],row=[],v="",q=false;for(let i=0;i<s.length;i++){const c=s[i];if(q){if(c==='"'&&s[i+1]==='"'){v+='"';i++;}else if(c==='"')q=false;else v+=c;}else if(c==='"')q=true;else if(c===','){row.push(v);v="";}else if(c==='\\n'){row.push(v);out.push(row);row=[];v="";}else if(c!=='\\r')v+=c;}if(v.length||row.length){row.push(v);out.push(row);}const h=out.shift();return out.filter(r=>r.some(x=>x!=="")).map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]??""])));}
const source=fs.readFileSync("suppliers/Electrocity/catalogue-work/ignition-looms-modules/normalised-review.csv","utf8");
const rows=parseCSV(source);
assert.equal(rows.length,29);
for(const r of rows){if(r.electrocity_sku)assert.ok(!visible.toLowerCase().includes(r.electrocity_sku.toLowerCase()),"internal supplier SKU leaked: "+r.provisional_gw_id);}
assert.doesNotMatch(visible,/Electrocity|ASC/i,"supplier identities must not enter customer-facing product data");
console.log("PASS: 27 Auto Electrical products; 24 modules, 3 looms; 2 records quarantined; supplier SKUs hidden; POR and stock-unconfirmed; 27 sanitized images present.");
