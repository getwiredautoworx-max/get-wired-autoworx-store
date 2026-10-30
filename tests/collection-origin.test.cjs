"use strict";
const assert = require("node:assert/strict");
const { collectionOrigin } = require("../supabase/functions/_shared/collection-origin.js");

const empty = () => undefined;
assert.equal(collectionOrigin(empty), null, "missing origin must disable live carrier calls");
assert.deepEqual(collectionOrigin(name => ({
  COURIER_COLLECTION_ADDRESS: "  12 Example Road  ",
  COURIER_COLLECTION_CITY: " Durban ",
  COURIER_COLLECTION_PROVINCE: " KwaZulu-Natal ",
  COURIER_COLLECTION_POSTAL_CODE: " 4001 "
})[name]), {
  address: "12 Example Road",
  city: "Durban",
  province: "KwaZulu-Natal",
  postal_code: "4001"
}, "complete origin should be trimmed and returned");
assert.equal(collectionOrigin(name => ({
  COURIER_COLLECTION_ADDRESS: "12 Example Road",
  COURIER_COLLECTION_CITY: "Durban",
  COURIER_COLLECTION_PROVINCE: "",
  COURIER_COLLECTION_POSTAL_CODE: "4001"
})[name]), null, "partial origin must fail closed");
assert.equal(collectionOrigin(name => ({
  COURIER_COLLECTION_ADDRESS: "  ",
  COURIER_COLLECTION_CITY: "Durban",
  COURIER_COLLECTION_PROVINCE: "KwaZulu-Natal",
  COURIER_COLLECTION_POSTAL_CODE: "4001"
})[name]), null, "whitespace-only origin must fail closed");
console.log("COURIER_COLLECTION_ORIGIN_TESTS_PASS: 4 assertions");
