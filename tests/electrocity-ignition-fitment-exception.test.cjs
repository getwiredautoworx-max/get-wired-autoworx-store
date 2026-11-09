// Owner-approved fitment disposition: exclude the disputed Fiat/Peugeot/Renault caption; retain only corroborated Toyota applications.
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
assert.equal(rows.length, 29, "expected 29 review-only pilot records");
const row = rows.find(r => r.provisional_gw_id === "GWA-EC-000012");
assert.ok(row, "IG-T003 discrepancy row exists");
assert.equal(row.manufacturer_model, "IG-T003");
assert.equal(row.oem_part_number, "IG-T003");
assert.equal(row.vehicle_fitment_raw, "IGN MODULE FIAT/PEUGEOT/RENAUL");
assert.equal(row.vehicle_applications_confirmed_json, "[]", "no direct confirmed vehicle applications are asserted");
assert.equal(row.confidence, "corroborated");
assert.equal(row.qa_status, "REVIEW_PASSED_SOURCE_DISCREPANCY_EXCLUDED");
assert.match(row.normalised_description_candidate, /Mobiletron IG-T003/);
assert.match(row.normalised_description_candidate, /Toyota Carina II.*Celica.*Corolla.*Hiace III.*Starlet/);
assert.doesNotMatch(row.normalised_description_candidate, /FIAT|PEUGEOT|RENAUL|220547|Electrocity/i);
assert.match(row.fitment_research_sources_json, /mobiletron\.com\/Product\/detail\/2801\/IG-T003/);
assert.match(row.fitment_research_sources_json, /niparts\.com\/Fac\/ADFED5\/WAIglobal\/ICM597\.html/);
const applications = JSON.parse(row.vehicle_applications_corroborated_json);
assert.ok(applications.length >= 5);
assert.ok(applications.every(a => a.make === "Toyota"));
assert.ok(applications.some(a => a.model.includes("Carina II")));
assert.ok(applications.some(a => a.model.includes("Starlet")));
const exception = exceptions.find(r => r.provisional_gw_id === "GWA-EC-000012");
assert.ok(exception);
assert.equal(exception.severity, "LOW");
assert.equal(exception.exception_type, "SOURCE_DESCRIPTION_DISCREPANCY_EXCLUDED");
assert.match(exception.suggested_action, /Resolved for customer-facing scope/i);
assert.match(exception.suggested_action, /do not publish Fiat\/Peugeot\/Renault fitment/i);
for (const r of rows) {
  assert.equal(r.price_raw, "", "unexpected price value");
  assert.equal(r.stock_raw, "", "unexpected stock value");
  assert.match(r.qa_status, /^(REVIEW_PASSED|QUARANTINED)/, "unexpected review disposition");
}
console.log("PASS: 29 Electrocity pilot rows; IG-T003 discrepancy resolved for customer-facing scope by excluding unsupported Fiat/Peugeot/Renault fitment and retaining corroborated Toyota applications; no supplier SKU, price or stock leakage.");
