const fs = require("node:fs");
const assert = require("node:assert/strict");
function parseCsv(text) {
  const rows = []; let row = [], value = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { value += '"'; i++; }
      else if (c === '"') quoted = false;
      else value += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(value); value = ""; }
    else if (c === "\n") { row.push(value.replace(/\r$/, "")); rows.push(row); row = []; value = ""; }
    else value += c;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  const headers = rows.shift();
  return rows.filter(r => r.some(v => v !== "")).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}
const root = "suppliers/Electrocity/catalogue-work/ignition-looms-modules/";
const rows = parseCsv(fs.readFileSync(root + "normalised-review.csv", "utf8"));
const exceptions = parseCsv(fs.readFileSync(root + "exceptions.csv", "utf8"));
assert.equal(rows.length, 29);
const row = rows.find(r => r.provisional_gw_id === "GWA-EC-000012");
assert.ok(row);
assert.equal(row.manufacturer_model, "IG-T003");
assert.equal(row.oem_part_number, "IG-T003");
assert.equal(row.vehicle_fitment_raw, "IGN MODULE FIAT/PEUGEOT/RENAUL");
assert.equal(row.vehicle_applications_confirmed_json, "[]");
assert.equal(row.confidence, "unverified");
assert.equal(row.qa_status, "QUARANTINED_SUPPLIER_CLARIFICATION_REQUIRED");
assert.match(row.normalised_description_candidate, /vehicle fitment is not confirmed/i);
assert.doesNotMatch(row.normalised_description_candidate, /220547|Electrocity|Mobiletron/i);
assert.match(row.fitment_research_sources_json, /mobiletron\.com\/Product\/detail\/2801\/IG-T003/);
assert.equal(row.price_raw, "");
assert.equal(row.stock_raw, "");
const exception = exceptions.find(r => r.provisional_gw_id === "GWA-EC-000012");
assert.ok(exception);
assert.equal(exception.severity, "HIGH");
assert.equal(exception.exception_type, "SUPPLIER_CLARIFICATION_REQUIRED");
assert.match(exception.suggested_action, /omit all vehicle fitment/i);
for (const r of rows) {
  assert.equal(r.price_raw, "");
  assert.equal(r.stock_raw, "");
}
console.log("PASS: 29 Electrocity pilot rows; IG-T003 remains safely quarantined with no vehicle-fitment claim; source references and blank commercial fields verified.");
