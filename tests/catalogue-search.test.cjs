"use strict";
const assert = require("node:assert/strict");
const { search, scoreProduct } = require("../assets/catalogue-search.js");
const products = [
  {id:"sku", public_sku:"GW-B4F502E6", name:"12V Fuse Regulator", description:"Automotive electrical regulator", brand:"Bosch", category_name:"Auto Electrical", compatible_vehicles:"VW Polo", stock_quantity:2},
  {id:"door", public_sku:"GW-DOOR001", name:"VW Polo Central Door Lock", description:"Vehicle security actuator", brand:"AutoLoc", category_name:"Vehicle Security", compatible_vehicles:"Volkswagen Polo 2015"},
  {id:"speaker", public_sku:"GW-SPK0001", name:"6 inch Speaker Pair", description:"Car audio loudspeaker", brand:"SoundMax", category_name:"Car Audio", stock_quantity:0},
  {id:"starter", public_sku:"GW-STR0001", name:"Starter Motor", description:"12 volt engine starting motor", brand:"Bosch", compatible_vehicles:"Toyota Corolla"}
];
function ids(query) { return search(products, query).map(x => x.p.id); }
assert.equal(ids("GW-B4F502E6")[0], "sku", "exact public SKU must rank first");
assert.ok(ids("B4F502")[0] === "sku", "partial SKU should find product");
assert.ok(ids("fuse regulator")[0] === "sku", "multi-term name/description search should work");
assert.ok(ids("Bosch VW Polo").includes("sku"), "brand and vehicle fields should be searchable");
assert.ok(ids("door lok").includes("door"), "one-edit typo should be tolerated");
assert.ok(ids("headlght")[0] === undefined, "unrelated typo should not invent a match");
assert.ok(ids("central locking").includes("door"), "common phrase alias should find central lock products");
assert.equal(scoreProduct(products[0], "GW-B4F502E6") > scoreProduct(products[0], "regulator"), true, "exact SKU should outrank generic text");
assert.deepEqual(search(products, ""), [], "empty query should return no results");
const unsafe = [{id:"xss",public_sku:"GW-XSS0001",name:"<img src=x onerror=alert(1)> relay",description:"test",stock_quantity:1}];
assert.ok(ids("no-such-product").length === 0, "no-match queries must return empty results");
assert.ok(search(unsafe, "relay").length === 1, "search module must return matching data without rendering HTML");
console.log("CATALOGUE_SEARCH_UNIT_TESTS_PASS: 10 assertions");
