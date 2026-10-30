-- One-time consumption guard for signed delivery quote nonces.
-- The edge function verifies the HMAC before the RPC. The quote object is stored on orders,
-- so a unique partial index makes concurrent/replayed submissions fail atomically.
-- Existing legacy quote records without a nonce are unaffected.
create unique index if not exists orders_delivery_quote_nonce_uidx
  on public.orders ((delivery_quote ->> 'nonce'))
  where delivery_quote is not null and delivery_quote ? 'nonce';
