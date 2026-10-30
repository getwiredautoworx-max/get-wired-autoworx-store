import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const edge = readFileSync("supabase/functions/supplier-quote/index.ts", "utf8");
const admin = readFileSync("android-owner-app/app/src/main/assets/admin_app.html", "utf8");

const createStart = edge.indexOf('if(req.method==="POST"&&action==="create_request")');
const createEnd = edge.indexOf('if((req.method==="GET"||req.method==="POST")&&action==="customer_offer")');
assert.ok(createStart >= 0 && createEnd > createStart, "create_request handler must exist");
const create = edge.slice(createStart, createEnd);
assert.ok(create.includes('from("product_supplier_codes")'), "create_request must resolve private product supplier mappings");
assert.ok(create.includes('from("supplier_catalog_items")'), "create_request must resolve supplier catalogue mappings");
assert.ok(create.includes('supplier_resolution'), "create_request must report mapped/unmapped/ambiguous state");
assert.ok(!create.includes('order("priority").limit(1)'), "create_request must never default to first active supplier");
assert.ok(!create.includes('p.specifications?.supplier_id'), "create_request must not trust public product specifications for private routing");
assert.ok(!create.includes('b.supplier_id'), "public customers must not choose an internal supplier ID");

const responseStart = edge.indexOf('if(req.method==="POST"&&action==="record_supplier_response")');
const responseEnd = edge.indexOf('if(req.method==="POST"&&action==="create_offer")');
assert.ok(responseStart >= 0 && responseEnd > responseStart, "record_supplier_response handler must exist");
const response = edge.slice(responseStart, responseEnd);
assert.ok(response.includes('b.supplier_id'), "owner must be able to select actual supplier");
assert.ok(response.includes('eq("active",true)'), "selected supplier must be active");
assert.ok(response.includes('update({supplier_id:supplier.id'), "selected supplier must be stored on quote request");
assert.ok(!response.includes('q.supplier_id||null'), "response must not silently save with null supplier");

const detailStart = edge.indexOf('if(req.method==="GET"&&action==="detail")');
const detailEnd = edge.indexOf('if(req.method==="POST"&&action==="record_supplier_response")');
const detail = edge.slice(detailStart, detailEnd);
assert.ok(detail.includes('suppliers:suppliers.data||[]'), "detail response must return active supplier choices");

assert.ok(admin.includes('id="qrSupplier"'), "owner UI must render a supplier selector");
assert.ok(admin.includes('supplier_id:document.getElementById(\'qrSupplier\').value'), "owner UI must submit the selected supplier ID");
console.log("PASS — supplier routing fails closed and owner response UI requires an explicit supplier.");
