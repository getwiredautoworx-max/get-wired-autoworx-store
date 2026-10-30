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
