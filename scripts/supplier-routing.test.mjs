import assert from "node:assert/strict";
import { chooseSupplierCandidate } from "../supabase/functions/_shared/supplier-routing.mjs";

assert.deepEqual(chooseSupplierCandidate(), { supplierId: null, reason: "UNMAPPED" });
assert.deepEqual(chooseSupplierCandidate({ productSupplierMappings: [{ supplier_id: "supplier-a" }] }), { supplierId: "supplier-a", reason: "MAPPED" });
assert.deepEqual(chooseSupplierCandidate({ productSupplierMappings: [{ supplier_id: "supplier-a" }], catalogItemMappings: [{ supplier_id: "supplier-a" }] }), { supplierId: "supplier-a", reason: "MAPPED" });
assert.deepEqual(chooseSupplierCandidate({ productSupplierMappings: [{ supplier_id: "supplier-a" }, { supplier_id: null }] }), { supplierId: "supplier-a", reason: "MAPPED" });
assert.deepEqual(chooseSupplierCandidate({ productSupplierMappings: [{ supplier_id: "supplier-a" }], catalogItemMappings: [{ supplier_id: "supplier-b" }] }), { supplierId: null, reason: "AMBIGUOUS" });
assert.deepEqual(chooseSupplierCandidate({ productSupplierMappings: [{ supplier_id: " " }, { supplier_id: null }], catalogItemMappings: [] }), { supplierId: null, reason: "UNMAPPED" });
console.log("PASS — supplier resolution fails closed on unmapped or conflicting supplier IDs.");
