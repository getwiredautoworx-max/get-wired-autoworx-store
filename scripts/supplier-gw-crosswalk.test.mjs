import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

function parseCsv(source) {
  const rows = [];
  let row = [], value = "", quoted = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (quoted) {
      if (c === '"' && source[i + 1] === '"') { value += '"'; i++; }
      else if (c === '"') quoted = false;
      else value += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(value); value = ""; }
    else if (c === "\n") { row.push(value.replace(/\r$/, "")); rows.push(row); row = []; value = ""; }
    else value += c;
  }
  if (value.length || row.length) { row.push(value.replace(/\r$/, "")); rows.push(row); }
  const headers = rows.shift();
  return rows.filter((r) => r.length > 1).map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

const csv = await readFile("catalogue-review/supplier-gw-crosswalk-2026-10-30.csv", "utf8");
const rows = parseCsv(csv);
assert.equal(rows.length, 770, "Expected all 702 Planetworld + 68 Audio Connections rows");
assert.equal(rows.filter((r) => r.supplier.includes("Planetworld")).length, 702);
assert.equal(rows.filter((r) => r.supplier === "Audio Connections").length, 68);

const proposed = rows.filter((r) => r.proposed_gw_public_sku);
assert.equal(proposed.length, 81, "Only exact individual-page candidates should receive proposed GW SKUs");
assert(proposed.every((r) => /^GW-[A-Z0-9]{8}$/.test(r.proposed_gw_public_sku)));
assert.equal(new Set(proposed.map((r) => r.proposed_gw_public_sku)).size, proposed.length, "Proposed GW SKUs must be unique");
assert(proposed.every((r) => r.gw_sku_status === "PROPOSED_COLLISION_CHECKED_NOT_INSERTED"));
assert(rows.every((r) => !r.public_product_id), "Do not invent or attach public product IDs");
assert(rows.every((r) => r.publication_status === "NOT PUBLISHED"), "Review rows must remain unpublished");

const supplierPairs = rows.map((r) => r.supplier_id_candidate + "|" + r.supplier_sku);
assert.equal(new Set(supplierPairs).size, rows.length, "Supplier/model keys must be unique within each proposed supplier");
assert(rows.every((r) => r.supplier_id_status === "PROPOSED_NOT_REGISTERED"));

const sql = await readFile("catalogue-review/supplier-catalogue-stage-proposal-2026-10-30.sql", "utf8");
assert(sql.includes("DO NOT APPLY WITHOUT EXPLICIT OWNER APPROVAL"));
assert(sql.includes("INSERT INTO gw_private.supplier_connections"));
assert(sql.includes("INSERT INTO gw_private.supplier_catalog_items"));
assert(sql.includes("ON CONFLICT (supplier_id, supplier_sku) DO NOTHING"));
assert(sql.includes("false,\n  true"), "Staged items must be inactive and quote-on-request");
assert(!/INSERT\s+INTO\s+public\.products/i.test(sql), "Proposal must not create public product rows");
assert(!/UPDATE\s+public\.products/i.test(sql), "Proposal must not update public product rows");
console.log("SUPPLIER_GW_CROSSWALK_PASS: 770 source rows, 81 collision-checked proposed GW SKUs, 0 product IDs, 0 publications");
