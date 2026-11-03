/* Preview-only quarantine for legacy Buyers Guide inventory.
 * This does not modify Supabase. It prevents old source-tagged rows from rendering
 * even if a stale cache or an accidental active flag returns them to a preview query.
 */
(function (root) {
  'use strict';
  const LEGACY_ASC_PUBLIC_SKUS = new Set(['GW-1893682C']);
  function isLegacyBuyerGuideRecord(record) {
    if (!record || typeof record !== 'object') return false;
    if (LEGACY_ASC_PUBLIC_SKUS.has(String(record.public_sku || '').trim().toUpperCase())) return true;
    const spec = record.specifications && typeof record.specifications === 'object' ? record.specifications : {};
    const sourceText = [spec.source, spec.source_file, spec.catalogue_source, spec.catalogue_name].filter(value => typeof value === 'string' && value.trim()).join(' ');
    return /\bbuyer(?:['’])?s?\s+guide\b/i.test(sourceText);
  }
  function filter(records) { return Array.isArray(records) ? records.filter(record => !isLegacyBuyerGuideRecord(record)) : []; }
  const api = Object.freeze({ isLegacyBuyerGuideRecord, filter });
  root.GWLegacyCatalogueGuard = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
