const fs=require("node:fs");
const assert=require("node:assert/strict");
const data=JSON.parse(fs.readFileSync("assets/auto-electrical-owner-preview.json","utf8"));
assert.equal(data.products.length,34,"expected 34 Auto Electrical preview products");
for(const p of data.products){
 assert.equal(p.priceDisplay,"Price On Request due to Limited Stock and Availability");
 assert.ok(p.image.startsWith("assets/get-wired-product-pilot/GW-PILOT-"));
 assert.ok(p.availabilityDisplay);
 assert.ok(!("supplierSku" in p));
}
console.log("PASS: 34 Auto Electrical products use neutral processed images, exact POR wording and no supplier SKU fields.");
