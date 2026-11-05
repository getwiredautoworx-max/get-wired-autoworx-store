/* Preview-only quarantine for legacy Buyers Guide inventory.
 * This does not modify Supabase. It prevents old source-tagged rows from rendering
 * even if a stale cache or an accidental active flag returns them to a preview query.
 */
(function (root) {
  'use strict';
  // Keep the source-missing legacy SKU and nine owner-audited oil-filler-cap
  // misclassification SKUs out of every preview category/product route.
  const LEGACY_ASC_PUBLIC_SKUS = new Set([
    'GW-1893682C',
    'GW-21132FDF',
    'GW-E93CDF1E',
    'GW-AA085120',
    'GW-0E5E3109',
    'GW-125D2F26',
    'GW-FF7B49CB',
    'GW-FC14A84E',
    'GW-0B8032C4',
    'GW-22B30765'
  ]);
  function isLegacyBuyerGuideRecord(record) {
    if (!record || typeof record !== 'object') return false;
    if (LEGACY_ASC_PUBLIC_SKUS.has(String(record.public_sku || '').trim().toUpperCase())) return true;
    const spec = record.specifications && typeof record.specifications === 'object' ? record.specifications : {};
    const sourceText = [record.source, record.source_file, record.catalogue_source, record.catalogue_name, record.source_document, record.supplier_catalogue, spec.source, spec.source_file, spec.catalogue_source, spec.catalogue_name, spec.source_document, spec.supplier_catalogue].filter(value => typeof value === 'string' && value.trim()).join(' ');
    return /\bbuyer(?:['’])?s?\s+guide\b/i.test(sourceText);
  }
  function filter(records) { return Array.isArray(records) ? records.filter(record => !isLegacyBuyerGuideRecord(record)) : []; }
  const api = Object.freeze({ isLegacyBuyerGuideRecord, filter });
  root.GWLegacyCatalogueGuard = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
