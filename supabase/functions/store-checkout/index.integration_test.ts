import { handleRequest } from "./index.ts";
import { cartCanonical, destinationCanonical, digest, signQuote } from "../_shared/delivery-quote.ts";

Deno.test("checkout handler rejects forged or altered delivery quotes before RPC and accepts a valid bound quote", async () => {
  const secret = "checkout-test-secret-with-more-than-32-characters";
  const savedEnv = new Map<string, string | undefined>();
  for (const key of ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEYS", "DELIVERY_QUOTE_SIGNING_SECRET", "SUPABASE_PUBLISHABLE_KEY"]) savedEnv.set(key, Deno.env.get(key));
  const originalFetch = globalThis.fetch;
  let rpcCalls = 0;
  const product = {
    public_sku: "GW-12345678", active: true, specifications: { price_status: "VERIFIED" },
    price: 155.25, cost_price: 100, weight_kg: 2, length_cm: 10, width_cm: 10, height_cm: 5,
  };
  globalThis.fetch = (async (input: RequestInfo | URL, _init?: RequestInit) => {
    const url = String(input);
    if (url.includes("/auth/v1/user")) return new Response(JSON.stringify({ id: "test-customer", email: "checkout@example.com", email_confirmed_at: new Date().toISOString() }), { status: 200, headers: { "Content-Type": "application/json" } });
    if (url.includes("/rest/v1/products")) return new Response(JSON.stringify([product]), { status: 200, headers: { "Content-Type": "application/json" } });
    if (url.includes("/rest/v1/rpc/create_store_order_v2")) {
      rpcCalls++;
      return new Response(JSON.stringify({ order_id: "test-order", order_number: 1001, subtotal: 310.5, packaging_fee: 70, delivery_fee: 85.5, total: 466, payment_status: "pending" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    throw new Error("Unexpected fetch in isolated checkout test: " + url);
  }) as typeof fetch;

  try {
    Deno.env.set("SUPABASE_URL", "https://supabase.test");
    Deno.env.set("SUPABASE_SERVICE_ROLE_KEY", "test-service-role-key");
    Deno.env.delete("SUPABASE_SECRET_KEYS");
    Deno.env.set("DELIVERY_QUOTE_SIGNING_SECRET", secret);
    Deno.env.set("SUPABASE_PUBLISHABLE_KEY", "test-publishable-key");
    const items = [{ public_sku: "GW-12345678", quantity: 2 }];
    const destination = { p_delivery_address: "1 Main St", p_city: "Durban", p_province: "KwaZulu-Natal", p_postal_code: "4001" };
    const parcel = { weight_kg: 4, length_cm: 10, width_cm: 10, height_cm: 5 };
    const now = Date.now();
    const claims = {
      v: 1, cart_hash: await digest(cartCanonical(items)), destination_hash: await digest(destinationCanonical(destination)),
      provider: "The Courier Guy", service: "Standard", price: 85.5, currency: "ZAR", parcel,
      issued_at: now, expires_at: now + 600000, nonce: "integration-nonce",
    };
    const token = await signQuote(claims, secret);
    const quote = { live: true, provider: claims.provider, service: claims.service, price: claims.price, currency: claims.currency, nonce: claims.nonce, quote_token: token };
    const base = {
      p_customer_name: "Checkout Test", p_customer_email: "checkout@example.com", p_customer_phone: "0744884234",
      ...destination, p_delivery_fee: 85.5, p_payment_method: "direct_eft", p_notes: "integration test",
      p_items: items, p_delivery_method: "delivery", p_delivery_quote: quote, p_terms_accepted: true,
    };
    async function submit(payload: Record<string, unknown>) {
      return await handleRequest(new Request("https://edge.test/store-checkout", { method: "POST", headers: { "content-type": "application/json", "Authorization": "Bearer test-access-token" }, body: JSON.stringify(payload) }));
    }

    const unaccepted = await submit({ ...base, p_terms_accepted: false });
    if (unaccepted.status !== 400 || rpcCalls !== 0) throw new Error("Checkout accepted missing policy acknowledgement");

    const forged = await submit({ ...base, p_delivery_quote: { live: true, provider: "The Courier Guy", service: "Standard", price: 85.5, currency: "ZAR" } });
    if (forged.status !== 409 || rpcCalls !== 0) throw new Error("Forged live=true quote reached order RPC");

    const [tokenPayload, tokenSignature] = token.split(".");
    const badToken = tokenPayload + "." + (tokenSignature.startsWith("A") ? "B" : "A") + tokenSignature.slice(1);
    const tampered = await submit({ ...base, p_delivery_quote: { ...quote, quote_token: badToken } });
    if (tampered.status !== 400 || rpcCalls !== 0) throw new Error("Tampered quote token reached order RPC");

    const changedAddress = await submit({ ...base, p_delivery_address: "2 Main St" });
    if (changedAddress.status !== 400 || rpcCalls !== 0) throw new Error("Quote token was accepted for a different address");

    const changedCart = await submit({ ...base, p_items: [{ public_sku: "GW-12345678", quantity: 3 }] });
    if (changedCart.status !== 400 || rpcCalls !== 0) throw new Error("Quote token was accepted for a changed cart");

    const changedFee = await submit({ ...base, p_delivery_fee: 90 });
    if (changedFee.status !== 400 || rpcCalls !== 0) throw new Error("Changed delivery fee reached order RPC");

    const valid = await submit(base);
    if (valid.status !== 200 || Number(rpcCalls) !== 1) throw new Error("Valid bound quote did not reach mocked order RPC");
    const result = await valid.json();
    if (result.order_number !== 1001) throw new Error("Valid checkout response was not returned");
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of savedEnv) {
      if (value === undefined) Deno.env.delete(key); else Deno.env.set(key, value);
    }
  }
});
