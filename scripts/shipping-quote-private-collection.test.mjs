import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const source = await readFile("supabase/functions/shipping-quote/index.ts", "utf8");
assert.match(source, /COURIER_COLLECTION_ADDRESS/);
assert.match(source, /COURIER_COLLECTION_CITY/);
assert.match(source, /COURIER_COLLECTION_PROVINCE/);
assert.match(source, /COURIER_COLLECTION_POSTAL_CODE/);
assert.match(source, /if \(collectionConfigured\) for \(const provider of providers\)/);
assert.doesNotMatch(source, /29 Wattlebrook Crescent|Brookdale, Phoenix, Durban|4068/);
console.log("SHIPPING_QUOTE_PRIVATE_COLLECTION_PASS: carrier pickup data comes only from function secrets");
