import { cartCanonical, destinationCanonical, digest, normalise, quoteTimeValid, signQuote, validateBoundQuote, validatePickup, verifyQuoteToken } from "./delivery-quote.ts";

const secret = "test-only-secret-value-with-at-least-32-chars";

Deno.test("signed quote token verifies unchanged claims", async () => {
  const claims = { v: 1, cart_hash: await digest("GW-12345678:2"), destination_hash: await digest("1 main st|durban|kwazulu-natal|4001"), price: 85.5, currency: "ZAR", issued_at: Date.now(), expires_at: Date.now() + 600000, nonce: "test-nonce" };
  const token = await signQuote(claims, secret);
  const verified = await verifyQuoteToken(token, secret);
  if (!verified || verified.nonce !== "test-nonce" || verified.price !== 85.5) throw new Error("Expected signed claims to verify");
});

Deno.test("tampered quote token is rejected", async () => {
  const token = await signQuote({ v: 1, price: 50 }, secret);
  const [payload, signature] = token.split(".");
  const altered = payload + "." + (signature.startsWith("A") ? "B" : "A") + signature.slice(1);
  if (await verifyQuoteToken(altered, secret) !== null) throw new Error("Tampered token must not verify");
});

Deno.test("cart canonicalization binds SKU and quantity and ignores order", () => {
  const a = cartCanonical([{ public_sku: "GW-12345678", quantity: 2 }, { public_sku: "GW-87654321", quantity: 1 }]);
  const b = cartCanonical([{ public_sku: "GW-87654321", quantity: 1 }, { public_sku: "GW-12345678", quantity: 2 }]);
  const changed = cartCanonical([{ public_sku: "GW-12345678", quantity: 3 }, { public_sku: "GW-87654321", quantity: 1 }]);
  if (a !== b || a === changed) throw new Error("Cart hash input must be stable but quantity-bound");
});

Deno.test("invalid cart SKU and quantity are rejected", () => {
  for (const item of [{ public_sku: "BAD", quantity: 1 }, { public_sku: "GW-12345678", quantity: 0 }]) {
    let threw = false; try { cartCanonical([item]); } catch { threw = true; }
    if (!threw) throw new Error("Invalid cart should throw");
  }
});

Deno.test("quote expiry and maximum lifetime are enforced", () => {
  const now = 1_800_000_000_000;
  if (!quoteTimeValid({ v: 1, issued_at: now, expires_at: now + 600_000 }, now)) throw new Error("A valid 10-minute quote should pass");
  if (quoteTimeValid({ v: 1, issued_at: now - 600_000, expires_at: now }, now)) throw new Error("An expired quote must fail");
  if (quoteTimeValid({ v: 1, issued_at: now, expires_at: now + 600_001 }, now)) throw new Error("An overlong quote must fail");
});

Deno.test("destination canonicalization binds street, province and postal code", async () => {
  const base = { address: "1 Main St", city: "Durban", province: "KwaZulu-Natal", postal_code: "4001" };
  const original = await digest(destinationCanonical(base));
  const changed = await digest(destinationCanonical({ ...base, postal_code: "4000" }));
  const changedStreet = await digest(destinationCanonical({ ...base, address: "2 Main St" }));
  if (original === changed || original === changedStreet) throw new Error("Destination changes must change the canonical hash");
});

Deno.test("destination normalization collapses whitespace and normalizes Unicode", () => {
  if (normalise("  MAIN   Street\t #２  ") !== "main street #2") throw new Error("Destination normalization must collapse whitespace and normalize compatibility characters");
});


async function boundQuoteFixture(now = Date.now()) {
  const items = [{ public_sku: "GW-12345678", quantity: 2 }];
  const destination = { address: "1 Main St", city: "Durban", province: "KwaZulu-Natal", postal_code: "4001" };
  const parcel = { weight_kg: 2, length_cm: 10, width_cm: 10, height_cm: 5 };
  const claims = {
    v: 1, cart_hash: await digest(cartCanonical(items)), destination_hash: await digest(destinationCanonical(destination)),
    provider: "The Courier Guy", service: "Standard", price: 85.5, currency: "ZAR", parcel,
    issued_at: now, expires_at: now + 600000, nonce: "fixture-nonce",
  };
  const token = await signQuote(claims, secret);
  return {
    items, destination, parcel, token,
    quote: { live: true, quote_token: token, provider: claims.provider, service: claims.service, price: claims.price, currency: claims.currency, nonce: claims.nonce },
    deliveryFee: claims.price, secret, now,
  };
}
async function mustReject(promise: Promise<unknown>, message: string) {
  let rejected = false; try { await promise; } catch { rejected = true; }
  if (!rejected) throw new Error(message);
}

Deno.test("bound quote accepts a valid token only for its exact cart and destination", async () => {
  const f = await boundQuoteFixture();
  const claims = await validateBoundQuote({ ...f, token: f.token, deliveryFee: f.deliveryFee, now: f.now });
  if (claims.nonce !== "fixture-nonce") throw new Error("Expected verified nonce");
});

Deno.test("forged live flag without a signed token is rejected", async () => {
  const f = await boundQuoteFixture();
  await mustReject(validateBoundQuote({ ...f, token: "", quote: { ...f.quote, quote_token: "" } }), "Forged live=true without token must fail");
});

Deno.test("bound quote rejects altered cart, address, price, fee and provider", async () => {
  const f = await boundQuoteFixture();
  await mustReject(validateBoundQuote({ ...f, items: [{ public_sku: "GW-12345678", quantity: 3 }] }), "Changed quantity must fail");
  await mustReject(validateBoundQuote({ ...f, destination: { ...f.destination, postal_code: "4000" } }), "Changed destination must fail");
  await mustReject(validateBoundQuote({ ...f, quote: { ...f.quote, price: 999 }, deliveryFee: 999 }), "Changed quote price/fee must fail");
  await mustReject(validateBoundQuote({ ...f, quote: { ...f.quote, provider: "Other courier" } }), "Changed provider must fail");
});

Deno.test("bound quote rejects expired tokens and changed parcel dimensions", async () => {
  const now = Date.now(), f = await boundQuoteFixture(now - 700000);
  await mustReject(validateBoundQuote({ ...f, now }), "Expired quote must fail");
  const fresh = await boundQuoteFixture();
  await mustReject(validateBoundQuote({ ...fresh, parcel: { ...fresh.parcel, weight_kg: 4 } }), "Changed parcel dimensions must fail");
});

Deno.test("pickup requires zero fee and no delivery quote", () => {
  validatePickup(0, null);
  for (const [fee, quote] of [[1, null], [0, { live: true }]] as Array<[number, unknown]>) {
    let threw = false; try { validatePickup(fee, quote); } catch { threw = true; }
    if (!threw) throw new Error("Pickup must reject delivery fees and quote payloads");
  }
});
