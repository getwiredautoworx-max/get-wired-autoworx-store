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
assert.ok(admin.includes("r?.id?'':'disabled'"), "owner UI must disable offer creation until a supplier response exists");
assert.ok(admin.includes("await detail(id);"), "owner UI must refresh the supplier response ID after saving");

const offerStart = edge.indexOf('if(req.method==="POST"&&action==="create_offer")');
const offerEnd = edge.indexOf('if(req.method==="POST"&&action==="create_payment_link")');
assert.ok(offerStart >= 0 && offerEnd > offerStart, "create_offer handler must exist");
const offer = edge.slice(offerStart, offerEnd);
assert.ok(offer.includes('if(!q.supplier_id)'), "customer offer must require an assigned supplier");
assert.ok(offer.includes('if(!sr)'), "customer offer must require a supplier response");
assert.ok(offer.includes('srRow.supplier_id!==q.supplier_id'), "supplier response must match assigned supplier");

const procurementStart = edge.indexOf('if(req.method==="POST"&&action==="authorize_procurement")');
const procurementEnd = edge.indexOf('if(req.method==="POST"&&action==="create_fulfilment")');
assert.ok(procurementStart >= 0, "authorize_procurement handler must exist");
const procurement = edge.slice(procurementStart, procurementEnd > procurementStart ? procurementEnd : edge.length);
assert.ok(procurement.includes('if(!q.supplier_id)'), "procurement must require an assigned supplier");
assert.ok(procurement.includes('sr.supplier_id!==q.supplier_id'), "procurement must match supplier response to assigned supplier");
console.log("PASS — unmapped requests cannot auto-route, offers/procurement require a matched supplier response, and owner UI requires explicit selection.");
