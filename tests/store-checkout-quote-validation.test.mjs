import test from "node:test";
import assert from "node:assert/strict";
import { normalizeCheckoutItems, matchCurrentLiveQuote } from "../supabase/functions/store-checkout/quote-validation.mjs";

test("normalizes SKU aliases and combines duplicate cart lines", () => {
  assert.deepEqual(
    normalizeCheckoutItems([{ sku: "GW-ABC12345", qty: 2 }, { public_sku: "GW-ABC12345", quantity: 3 }]),
    [{ public_sku: "GW-ABC12345", quantity: 5 }]
  );
});

test("rejects invalid SKUs, zero quantities, and combined quantities above the allowed maximum", () => {
  assert.throws(() => normalizeCheckoutItems([{ public_sku: "wrong", quantity: 1 }]));
  assert.throws(() => normalizeCheckoutItems([{ public_sku: "GW-ABC12345", quantity: 0 }]));
  assert.throws(() => normalizeCheckoutItems([{ public_sku: "GW-ABC12345", quantity: 50 }, { public_sku: "GW-ABC12345", quantity: 50 }]));
});

test("accepts only an exact current live ZAR quote", () => {
  const current = [{ provider: "The Courier Guy", service: "Road Express", price: 89.95, currency: "ZAR", timeframe: "2 days", live: true }];
  assert.equal(matchCurrentLiveQuote({ ...current[0] }, current), current[0]);
  assert.equal(matchCurrentLiveQuote({ ...current[0], price: 10 }, current), null);
  assert.equal(matchCurrentLiveQuote({ ...current[0], live: false }, current), null);
  assert.equal(matchCurrentLiveQuote({ ...current[0], provider: "PEP PAXI" }, current), null);
  assert.equal(matchCurrentLiveQuote({ ...current[0], currency: "USD" }, current), null);
});
