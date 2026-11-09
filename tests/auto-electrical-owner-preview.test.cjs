const fs=require("node:fs");
const assert=require("node:assert/strict");
const auto=JSON.parse(fs.readFileSync("assets/auto-electrical-owner-preview.json","utf8"));
const sample=JSON.parse(fs.readFileSync("assets/product-image-treatment-sample.json","utf8"));
assert.equal(auto.products.length,34);
assert.equal(sample.records.length,50);
assert.equal(new Set(sample.records.map(p=>p.id)).size,50);
for(const p of sample.records){
 assert.equal(p.priceDisplay,"Price On Request due to Limited Stock and Availability");
 assert.equal(p.reviewStatus,"REVIEW_ONLY_NOT_IMPORTED");
 assert.ok(p.imageStatus.includes("OWNER_AUTHORIZED"));
 assert.ok(fs.existsSync(p.image),"missing processed image: "+p.image);
 assert.ok(!("supplierSku" in p));
}
for(const p of auto.products){
 assert.ok(sample.records.some(s=>s.image===p.image),"Auto Electrical image must be one of the 50 sample images");
 assert.ok(fs.existsSync(p.image),"missing Auto Electrical image: "+p.image);
}
const html=fs.readFileSync("product-image-treatment-pilot.html","utf8");
assert.match(html,/noindex,nofollow/i);
assert.doesNotMatch(html,/Planetworld|Audio Connections/i);
const builder=fs.readFileSync("scripts/build-cloudflare-pages-public.py","utf8");
assert.ok(builder.includes("product-image-treatment-pilot.html"));
assert.ok(builder.includes("product-image-treatment-sample.json"));
assert.ok(builder.includes("get-wired-product-pilot"));
assert.ok(!builder.includes("asc-catalogue-preview-data.json"));
assert.ok(!builder.includes("catalogue-source-crops"));
console.log("PASS: 50 treated images; 34 Auto Electrical image matches; exact price wording; review-only gate; no raw source files in preview allowlist.");
