const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const categories = new Set([
  'Auto Electrical Spares',
  'Vehicle Security',
  'Car Audio & Entertainment',
  'Automotive Accessories',
  'Marine Spares & Accessories',
  'Tools, Hardware & Consumables',
  'Camping, Leisure & Outdoors',
  'Trailer & Canopy'
]);
const statuses = new Set(['Approved', 'Pending', 'Rejected', 'Hold']);
const permissionStatuses = new Set(['Granted', 'Not required', 'Pending', 'Denied', 'Unknown']);
// Explicit project quote-only supplier SKUs: never allow a customer price or public activation.
const QUOTE_ONLY_BLOCKLIST = new Set(['M501WCC', 'A1-002', 'A1-003', 'MA330', 'MA342', 'MA342/2', 'N-FC001', 'WP25', 'N-CP002']);
const requiredHeaders = [
  'supplier_sku', 'public_sku', 'product_name', 'storefront_category',
  'supplier_cost_ex_vat', 'customer_price', 'quote_only', 'is_active',
  'review_status', 'supplier_price_effective_date', 'supplier_confirmation_ref',
  'image_permission_status', 'image_evidence_ref', 'vehicle_application',
  'subcategory', 'review_reason'
];

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false, afterQuote = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
        afterQuote = true;
      } else {
        cell += ch;
      }
      continue;
    }
    if (afterQuote) {
      if (ch === ',') {
        row.push(cell); cell = ''; afterQuote = false;
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(cell); rows.push(row); row = []; cell = ''; afterQuote = false;
      } else {
        throw new Error('Unexpected character after closing CSV quote at character ' + (i + 1));
      }
      continue;
    }
    if (ch === '"') {
      if (cell.length !== 0) throw new Error('Unexpected quote inside unquoted CSV field at character ' + (i + 1));
      quoted = true;
    } else if (ch === ',') {
      row.push(cell); cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else {
      cell += ch;
    }
  }
  if (quoted) throw new Error('CSV ends inside a quoted field');
  if (cell.length || row.length || afterQuote) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter(r => !(r.length === 1 && r[0] === ''));
}

function loadCsv(file) {
  const rows = parseCsv(fs.readFileSync(path.join(root, file), 'utf8'));
  if (!rows.length) throw new Error(file + ': empty CSV');
  const headers = rows[0];
  if (headers.some(h => !h.trim())) throw new Error(file + ': blank header');
  if (new Set(headers).size !== headers.length) throw new Error(file + ': duplicate header');
  return rows.slice(1).map((cells, i) => {
    if (cells.length !== headers.length) throw new Error(file + ': row ' + (i + 2) + ' has ' + cells.length + ' columns; expected ' + headers.length);
    return { rowNumber: i + 2, data: Object.fromEntries(headers.map((h, j) => [h, cells[j]])) };
  });
}

function validIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + 'T00:00:00.000Z');
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function validMoney(value) {
  return /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(value);
}

function validate(record, source, seen) {
  const d = record.data, errors = [];
  const at = source + ':row ' + record.rowNumber;
  for (const h of requiredHeaders) {
    if (!(h in d)) errors.push(at + ': missing required column ' + h);
  }
  if (errors.length) return errors;
  const reqText = ['supplier_sku', 'public_sku', 'product_name', 'storefront_category', 'review_status', 'image_permission_status'];
  for (const h of reqText) if (!String(d[h]).trim()) errors.push(at + ': blank ' + h);
  if (!/^GW-[A-Z0-9]{8}$/.test(d.public_sku)) errors.push(at + ': public_sku must match GW-XXXXXXXX');
  if (!categories.has(d.storefront_category)) errors.push(at + ': category is outside the approved eight-category hierarchy');
  if (!statuses.has(d.review_status)) errors.push(at + ': invalid review_status');
  if (!permissionStatuses.has(d.image_permission_status)) errors.push(at + ': invalid image_permission_status');
  for (const h of ['quote_only', 'is_active']) {
    if (!['true', 'false'].includes(d[h])) errors.push(at + ': ' + h + ' must be true or false');
  }
  for (const h of ['supplier_cost_ex_vat', 'customer_price']) {
    if (d[h] !== '' && !validMoney(d[h])) errors.push(at + ': ' + h + ' must be a non-negative amount with at most two decimal places');
  }
  const cost = d.supplier_cost_ex_vat === '' ? null : Number(d.supplier_cost_ex_vat);
  const price = d.customer_price === '' ? null : Number(d.customer_price);
  if (cost !== null && (!Number.isFinite(cost) || cost < 0)) errors.push(at + ': supplier_cost_ex_vat must be blank or a non-negative number');
  if (price !== null && (!Number.isFinite(price) || price < 0)) errors.push(at + ': customer_price must be blank or a non-negative number');
  if (d.is_active === 'true') {
    if (d.quote_only !== 'false') errors.push(at + ': active products cannot be quote_only');
    if (d.review_status !== 'Approved') errors.push(at + ': active products must be Approved');
    if (!(cost > 0) || !(price > 0)) errors.push(at + ': active products require positive cost and customer price');
    if (cost > 0 && price > 0) {
      const expectedCents = Math.round((cost * 1.15 * 1.35 + Number.EPSILON) * 100);
      const actualCents = Math.round(price * 100);
      if (expectedCents !== actualCents) {
        errors.push(at + ': customer_price does not match round(cost_ex_vat * 1.15 * 1.35, 2); expected ' + (expectedCents / 100).toFixed(2));
      }
    }
    if (!validIsoDate(d.supplier_price_effective_date)) errors.push(at + ': active products require a real ISO date (YYYY-MM-DD)');
    if (!d.supplier_confirmation_ref.trim()) errors.push(at + ': active products require supplier confirmation reference');
    if (!['Granted', 'Not required'].includes(d.image_permission_status)) errors.push(at + ': active products require cleared image permission');
    if (!d.image_evidence_ref.trim()) errors.push(at + ': active products require image evidence reference');
  }
  if (d.quote_only === 'true') {
    if (d.is_active === 'true') errors.push(at + ': quote-only rows must remain inactive');
    if (price !== null) errors.push(at + ': quote-only customer_price must be blank');
  }
  if (QUOTE_ONLY_BLOCKLIST.has(d.supplier_sku.trim().toUpperCase())) {
    if (d.quote_only !== 'true') errors.push(at + ': supplier SKU is on the quote-only blocklist and must be quote_only=true');
    if (d.is_active !== 'false') errors.push(at + ': supplier SKU is on the quote-only blocklist and must remain inactive');
    if (price !== null) errors.push(at + ': supplier SKU is on the quote-only blocklist and customer_price must be blank');
  }
  if (seen) {
    for (const h of ['supplier_sku', 'public_sku']) {
      const key = d[h].trim().toUpperCase();
      if (seen[h].has(key)) errors.push(at + ': duplicate ' + h + ' ' + d[h]);
      seen[h].add(key);
    }
  }
  return errors;
}

function main() {
  const validRows = loadCsv('sample_catalogue_synthetic.csv');
  const invalidRows = loadCsv('invalid_rows_examples.csv');
  if (!validRows.length) throw new Error('Synthetic valid fixture must contain at least one row');
  if (!invalidRows.length) throw new Error('Negative fixture must contain at least one invalid row');

  const seen = { supplier_sku: new Set(), public_sku: new Set() };
  const validErrors = validRows.flatMap(r => validate(r, 'sample_catalogue_synthetic.csv', seen));
  if (validErrors.length) {
    console.error('VALID FIXTURE FAILED:');
    validErrors.forEach(e => console.error(' - ' + e));
    process.exitCode = 1;
    return;
  }

  const negativeFailures = [];
  for (const r of invalidRows) {
    const errors = validate(r, 'invalid_rows_examples.csv', null);
    if (!errors.length) negativeFailures.push('invalid_rows_examples.csv:row ' + r.rowNumber + ' unexpectedly passed');
  }
  if (negativeFailures.length) {
    console.error('NEGATIVE TEST FAILED:');
    negativeFailures.forEach(e => console.error(' - ' + e));
    process.exitCode = 1;
    return;
  }
  console.log('PASS: ' + validRows.length + ' synthetic valid row(s) passed.');
  console.log('PASS: ' + invalidRows.length + ' intentionally invalid row(s) were rejected.');
  console.log('PASS: strict CSV structure, required columns, approved categories, SKU pattern, uniqueness, exact-cent pricing, real ISO dates, quote-only and active-publication gates checked.');
  console.log('NOTE: synthetic fixture evidence is not supplier evidence or authorization to publish real products.');
}

if (require.main === module) main();
module.exports = { parseCsv, validIsoDate, validate };
