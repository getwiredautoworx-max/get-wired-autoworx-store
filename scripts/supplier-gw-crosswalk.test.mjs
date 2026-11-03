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
const nonSonyAudio = rows.filter((r) => r.supplier === "Audio Connections" && r.brand !== "Sony");
assert.equal(nonSonyAudio.length, 53, "Expected all 53 non-Sony Audio Connections source rows");
assert(nonSonyAudio.every((r) => /^GW-[A-Z0-9]{8}$/.test(r.gw_sku_candidate_review)), "Every non-Sony row must retain its collision-checked internal candidate");
assert(nonSonyAudio.every((r) => !r.proposed_gw_public_sku && r.gw_sku_status === "NOT_ASSIGNED_HOLD"), "Unverified non-Sony identity/image rows must not be treated as assigned GW SKUs");
assert(nonSonyAudio.every((r) => r.gw_sku_candidate_status.includes("COLLISION_FREE_HOLD")), "Held candidates must remain explicitly review-only");
const allSkuCandidates = [...proposed.map((r) => r.proposed_gw_public_sku), ...nonSonyAudio.map((r) => r.gw_sku_candidate_review)];
assert.equal(new Set(allSkuCandidates).size, allSkuCandidates.length, "All proposed and held GW SKU candidates must be unique");
assert(rows.every((r) => !r.public_product_id), "Do not invent or attach public product IDs");
assert(rows.every((r) => r.publication_status === "NOT PUBLISHED"), "Review rows must remain unpublished");

const supplierPairs = rows.map((r) => r.supplier_id + "|" + r.supplier_sku);
assert.equal(new Set(supplierPairs).size, rows.length, "Supplier/model keys must be unique within each proposed supplier");
assert(rows.every((r) => ((r.supplier.includes("Planetworld") && r.supplier_id_status === "REGISTERED_ACTIVE_DEALER_CONFIRMED" && r.supplier_connection_active === "true") || (r.supplier === "Audio Connections" && r.supplier_id_status === "REGISTERED_INACTIVE_OWNER_DEALER_CONFIRMED" && r.supplier_connection_active === "false"))));

const planetworldComponents = parseCsv(await readFile("catalogue-review/PLANETWORLD_CAR_AUDIO_COMPONENT_CLASSIFICATION_2026-10-30.csv", "utf8"));
const audioComponents = parseCsv(await readFile("catalogue-review/AUDIO_CONNECTIONS_COMPONENT_CLASSIFICATION_2026-10-30.csv", "utf8"));
const planetworldByKey = new Map(planetworldComponents.map((r) => [r.source_file + "|" + r.supplier_model_or_sku, r.component_group]));
const audioByModel = new Map(audioComponents.map((r) => [r.model_candidate.toLowerCase().replace(/[^a-z0-9]/g, ""), r.component_group]));
const planetworldRows = rows.filter((r) => r.supplier.includes("Planetworld"));
const audioRows = rows.filter((r) => r.supplier === "Audio Connections");
assert.equal(planetworldRows.length, 702);
assert.equal(audioRows.length, 68);
assert(planetworldRows.every((r) => r.component_candidate === planetworldByKey.get(r.source_file + "|" + r.supplier_sku)), "Planetworld component groups must match the exact source-file/model manifest");
assert(audioRows.every((r) => r.component_candidate === audioByModel.get(r.manufacturer_model.toLowerCase().replace(/[^a-z0-9]/g, ""))), "Audio Connections component groups must match the exact model manifest");
assert(rows.every((r) => r.component_candidate && !r.component_candidate.startsWith("Unclassified")), "All supplier rows must have source-backed component groups");

const alpineByModel = new Map(rows.filter((r) => r.brand === "Alpine").map((r) => [r.manufacturer_model, r]));
for (const model of ["Ilx-705D", "KAE-HF11DA", "KAE-HF9DA", "KTX-HF9", "RUE-4360", "RUX-KNOB2", "UTE-204DAB"]) {
  const row = alpineByModel.get(model);
  assert(row && row.manufacturer_match_status.startsWith("EXACT OFFICIAL INDIVIDUAL PRODUCT PAGE FOUND"), "Expected exact official Alpine product page: " + model);
  assert(row.official_manufacturer_page.startsWith("https://"), "Expected official manufacturer URL: " + model);
}
assert(alpineByModel.get("KAE-HF9DA").next_action.includes("fitment"), "KAE-HF9DA fitment discrepancy must remain held");
assert(alpineByModel.get("KAC-001").manufacturer_match_status === "OFFICIAL MANUAL REFERENCE ONLY");
assert(alpineByModel.get("UTE-200BT").manufacturer_match_status === "OFFICIAL CATALOGUE REFERENCE ONLY");
assert(alpineByModel.get("KWE-CAM1D").manufacturer_match_status === "OFFICIAL ACCESSORY REFERENCE ONLY");

const sql = await readFile("catalogue-review/supplier-catalogue-stage-proposal-2026-10-30.sql", "utf8");
assert(sql.includes("APPLIED 2026-10-30"));
assert(sql.includes("INSERT INTO gw_private.supplier_connections"));
assert(sql.includes("INSERT INTO gw_private.supplier_catalog_items"));
assert(sql.includes("ON CONFLICT (supplier_id, supplier_sku) DO NOTHING"));
assert(sql.includes("false,\n  true"), "Staged items must be inactive and quote-on-request");
assert(!/INSERT\s+INTO\s+public\.products/i.test(sql), "Proposal must not create public product rows");
assert(!/UPDATE\s+public\.products/i.test(sql), "Proposal must not update public product rows");
console.log("SUPPLIER_GW_CROSSWALK_PASS: 770 source rows, 81 collision-checked proposed GW SKUs, 0 product IDs, 0 publications");
