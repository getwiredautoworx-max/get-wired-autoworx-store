const assert = require('node:assert/strict');
const { parseCsv, validIsoDate, validate } = require('./validate_catalogue');

assert.deepEqual(parseCsv('a,b\r\n"hello, world","escaped ""quote"""\r\n'), [
  ['a', 'b'],
  ['hello, world', 'escaped "quote"']
]);
assert.throws(() => parseCsv('a,b\nfoo"bar,baz'), /quote inside unquoted/);
assert.throws(() => parseCsv('a,b\n"foo"x,baz'), /after closing CSV quote/);
assert.throws(() => parseCsv('a,b\n"unterminated,baz'), /ends inside a quoted field/);
assert.equal(validIsoDate('2026-10-15'), true);
assert.equal(validIsoDate('2026-02-31'), false);
assert.equal(validIsoDate('15-10-2026'), false);

const valid = {
  supplier_sku: 'SYN-TEST-1',
  public_sku: 'GW-SYNAMP01',
  product_name: 'Synthetic amplifier',
  storefront_category: 'Car Audio & Entertainment',
  supplier_cost_ex_vat: '1000.00',
  customer_price: '1552.50',
  quote_only: 'false',
  is_active: 'true',
  review_status: 'Approved',
  supplier_price_effective_date: '2026-10-15',
  supplier_confirmation_ref: 'SYNTHETIC-ONLY',
  image_permission_status: 'Granted',
  image_evidence_ref: 'SYNTHETIC-ONLY',
  vehicle_application: 'Synthetic',
  subcategory: 'Amplifiers',
  review_reason: 'Test only'
};
const record = { rowNumber: 2, data: { ...valid } };
assert.deepEqual(validate(record, 'test', { supplier_sku: new Set(), public_sku: new Set() }), []);
assert(validate({ rowNumber: 3, data: { ...valid, customer_price: '1552.49' } }, 'test', null)
  .some(e => e.includes('does not match')));
assert(validate({ rowNumber: 3, data: { ...valid, supplier_price_effective_date: '2026-02-31' } }, 'test', null)
  .some(e => e.includes('real ISO date')));
assert(validate({ rowNumber: 3, data: { ...valid, customer_price: '1552.501' } }, 'test', null)
  .some(e => e.includes('at most two decimal places')));
assert(validate({ rowNumber: 3, data: { ...valid, public_sku: 'GW-SYNAMP01' } }, 'test', {
  supplier_sku: new Set(['SYN-TEST-1']),
  public_sku: new Set(['GW-SYNAMP01'])
}).some(e => e.includes('duplicate public_sku')));

const blockedSkuErrors = validate({ rowNumber: 4, data: { ...valid, supplier_sku: 'M501WCC' } }, 'test', null);
assert(blockedSkuErrors.some(e => e.includes('quote-only blocklist') && e.includes('quote_only=true')));
assert(blockedSkuErrors.some(e => e.includes('quote-only blocklist') && e.includes('remain inactive')));
assert(blockedSkuErrors.some(e => e.includes('quote-only blocklist') && e.includes('customer_price must be blank')));

console.log('PASS: strict CSV quoting, CRLF, escaped quotes, date validity, cent-exact formula, decimal precision, and duplicate identifiers.');
