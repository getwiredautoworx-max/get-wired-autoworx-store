/** @typedef {{ supplier_id?: string | null }} SupplierMapping */
/**
 * Resolve a supplier only when the private product mappings identify exactly one.
 * @param {{ productSupplierMappings?: SupplierMapping[], catalogItemMappings?: SupplierMapping[] }} [options]
 * @returns {{ supplierId: string | null, reason: "MAPPED" | "AMBIGUOUS" | "UNMAPPED" }}
 */
export function chooseSupplierCandidate({
  productSupplierMappings = [],
  catalogItemMappings = []
} = {}) {
  const ids = [...new Set(
    [...productSupplierMappings, ...catalogItemMappings]
      .map((row) => String(row?.supplier_id ?? "").trim())
      .filter(Boolean)
  )];
  if (ids.length === 1) return { supplierId: ids[0], reason: "MAPPED" };
  if (ids.length > 1) return { supplierId: null, reason: "AMBIGUOUS" };
  return { supplierId: null, reason: "UNMAPPED" };
}
