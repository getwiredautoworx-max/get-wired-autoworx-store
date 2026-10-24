const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const checkout = fs.readFileSync(path.join(root, 'supabase/functions/store-checkout/index.ts'), 'utf8');
const consent = fs.readFileSync(path.join(root, 'supabase/functions/record-terms-acceptance/index.ts'), 'utf8');
const orderMigration = fs.readFileSync(path.join(root, 'supabase/migrations/20261023100000_link_store_orders_to_customer.sql'), 'utf8');
const consentMigration = fs.readFileSync(path.join(root, 'supabase/migrations/20261023090000_customer_terms_acceptances.sql'), 'utf8');

test('Bearer parser accepts ordinary case-insensitive bearer headers', () => {
  const parser = /^Bearer\s+(.+)$/i;
  assert.equal('Bearer eyJhbGciOi'.match(parser)?.[1], 'eyJhbGciOi');
  assert.equal('bearer test-token'.match(parser)?.[1], 'test-token');
  assert.equal('Basic test-token'.match(parser), null);
  assert.equal('Bearer '.match(parser), null);
});

test('checkout verifies the session before customer, consent and order work', () => {
  const auth = checkout.indexOf('/auth/v1/user');
  const consentAt = checkout.indexOf('customer_terms_acceptances');
  const customer = checkout.indexOf('payload.p_customer_id = customerId');
  const rpc = checkout.indexOf('/rest/v1/rpc/create_store_order_v2');
  assert.ok(auth >= 0 && consentAt > auth && customer > consentAt && rpc > customer);
  assert.match(checkout, /if \(!authCheck\.ok\)[\s\S]{0,300}status: 401/);
  assert.match(checkout, /TERMS_ACCEPTANCE_REQUIRED/);
});

test('browser-supplied customer IDs are never copied into the RPC payload', () => {
  assert.match(checkout, /const allowed = \["p_customer_name"/);
  assert.doesNotMatch(checkout, /payload\.p_customer_id\s*=\s*body\.p_customer_id/);
  assert.match(checkout, /payload\.p_customer_id = customerId/);
  assert.match(orderMigration, /WHERE c\.id = p_customer_id AND c\.auth_user_id IS NOT NULL/);
});

test('order RPC is explicitly service-role-only and SQL function terminator is valid', () => {
  assert.match(orderMigration, /\$function\$;\s*CREATE UNIQUE INDEX IF NOT EXISTS customers_auth_user_id_unique/);
  assert.match(orderMigration, /REVOKE ALL ON FUNCTION public\.create_store_order_v2[\s\S]*FROM PUBLIC, anon, authenticated;/);
  assert.match(orderMigration, /GRANT EXECUTE ON FUNCTION public\.create_store_order_v2[\s\S]*TO service_role;/);
  assert.match(orderMigration, /p_customer_id uuid DEFAULT NULL::uuid/);
});

test('Terms evidence is versioned, immutable, and cannot be written by browser roles', () => {
  assert.match(consent, /terms_version !== TERMS_VERSION/);
  assert.match(consent, /terms_sha256 !== TERMS_SHA256/);
  assert.match(consentMigration, /UNIQUE \(user_id, terms_version, terms_sha256\)/);
  assert.match(consentMigration, /REVOKE ALL ON TABLE public\.customer_terms_acceptances FROM anon, authenticated;/);
  assert.match(consentMigration, /BEFORE UPDATE OR DELETE ON public\.customer_terms_acceptances/);
});
