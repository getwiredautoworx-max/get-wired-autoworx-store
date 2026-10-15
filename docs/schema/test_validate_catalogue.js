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
  supplier_sku: 'SYN-TEST-1', public_sku: 'GW-SYNAMP01',
  product_name: 'Synthetic amplifier', storefront_category: 'Car Audio & Entertainment',
  supplier_cost_ex_vat: '1000.00', customer_price: '1552.50',
  quote_only: 'false', is_active: 'true', review_status: 'Approved',
  supplier_price_effective_date: '2026-10-15', supplier_confirmation_ref: 'SYNTHETIC-ONLY',
  image_permission_status: 'Granted', image_evidence_ref: 'SYNTHETIC-ONLY',
  vehicle_application: 'Synthetic', subcategory: 'Amplifiers', review_reason: 'Test only'
};
const errorsFor = (patch, seen = null) => validate({ rowNumber: 3, data: { ...valid, ...patch } }, 'targeted-test', seen);
const has = (errors, fragment) => assert(errors.some(e => e.includes(fragment)), 'Expected "' + fragment + '"; got: ' + errors.join(' | '));
assert.deepEqual(validate({ rowNumber: 2, data: { ...valid } }, 'test', { supplier_sku: new Set(), public_sku: new Set() }), []);
has(errorsFor({ customer_price: '1552.49' }), 'does not match');
has(errorsFor({ supplier_price_effective_date: '2026-02-31' }), 'real ISO date');
has(errorsFor({ customer_price: '1552.501' }), 'at most two decimal places');
has(errorsFor({ public_sku: 'GW-SYNAMP01' }, { supplier_sku: new Set(['SYN-TEST-1']), public_sku: new Set(['GW-SYNAMP01']) }), 'duplicate public_sku');
has(errorsFor({ supplier_sku: 'SYN-TEST-1' }, { supplier_sku: new Set(['SYN-TEST-1']), public_sku: new Set() }), 'duplicate supplier_sku');
has(errorsFor({ supplier_sku: '  ' }), 'blank supplier_sku');
has(errorsFor({ public_sku: '' }), 'blank public_sku');
has(errorsFor({ review_status: 'Unknown' }), 'invalid review_status');
has(errorsFor({ quote_only: 'maybe' }), 'quote_only must be true or false');
has(errorsFor({ is_active: 'yes' }), 'is_active must be true or false');
has(errorsFor({ supplier_cost_ex_vat: '0' }), 'active products require positive cost and customer price');
has(errorsFor({ supplier_cost_ex_vat: '-1' }), 'at most two decimal places');
has(errorsFor({ customer_price: '-1' }), 'at most two decimal places');
has(errorsFor({ supplier_confirmation_ref: '' }), 'require supplier confirmation reference');
has(errorsFor({ image_permission_status: 'Pending' }), 'require cleared image permission');
has(errorsFor({ image_evidence_ref: '' }), 'require image evidence reference');
has(errorsFor({ storefront_category: 'Not an approved category' }), 'outside the approved eight-category hierarchy');
has(validate({ rowNumber: 2, data: { supplier_sku: 'SYN-ONLY' } }, 'missing-column-test', null), 'missing required column public_sku');

const malformedHeader = parseCsv('supplier_sku,,public_sku\nSYN-1,,GW-SYN0001');
assert.equal(malformedHeader[0][1], '', 'blank header fixture must be detected by loadCsv');
console.log('PASS: strict CSV parsing, real dates, exact-cent pricing, decimal precision, duplicate/blank IDs, missing columns, invalid statuses/booleans/amounts, supplier confirmation, image permission/evidence and approved category gates.');
