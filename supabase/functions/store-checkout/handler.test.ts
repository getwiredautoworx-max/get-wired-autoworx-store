import { createStoreCheckoutHandler } from "./index.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}
const env = (name: string) => {
  if (name === "SUPABASE_URL") return "https://checkout-test.supabase.co";
  if (name === "SUPABASE_SECRET_KEYS") return JSON.stringify({ default: "server-secret-test" });
  return undefined;
};
const baseOrder = (overrides: Record<string, unknown> = {}) => ({
  p_customer_name: "Test Customer",
  p_customer_email: "untrusted@example.test",
  p_customer_phone: "0712345678",
  p_delivery_address: "1 Test Street",
  p_city: "Durban",
  p_province: "KwaZulu-Natal",
  p_postal_code: "4068",
  p_delivery_fee: 0,
  p_payment_method: "direct_eft",
  p_notes: "",
  p_items: [{ public_sku: "GW-12345678", quantity: 1 }],
  p_delivery_method: "pickup",
  p_customer_id: "browser-supplied-attacker-id",
  ...overrides,
});
const authHeaders = (token = "valid-test-token") => ({
  "content-type": "application/json",
  apikey: "public-test-key",
  ...(token ? { authorization: "Bearer " + token } : {}),
});

Deno.test("missing bearer is rejected before any network request", async () => {
  let calls = 0;
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async () => { calls++; return json({}); },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(""), body: JSON.stringify(baseOrder()),
  }));
  const payload = await response.json();
  assert(response.status === 401 && payload.code === "AUTH_REQUIRED", "Missing bearer must return AUTH_REQUIRED");
  assert(calls === 0, "Missing bearer must not call Auth, REST, or the order RPC");
});

Deno.test("invalid Auth session is rejected and never reaches consent/customer/order", async () => {
  const urls: string[] = [];
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async (url) => { urls.push(String(url)); return json({ error: "invalid token" }, 401); },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(), body: JSON.stringify(baseOrder()),
  }));
  const payload = await response.json();
  assert(response.status === 401 && payload.code === "AUTH_REQUIRED", "Invalid session must return AUTH_REQUIRED");
  assert(urls.length === 1 && urls[0].includes("/auth/v1/user"), "Only the Auth verification endpoint may be called");
});

Deno.test("missing current Terms acceptance blocks checkout before profile or order RPC", async () => {
  const urls: string[] = [];
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async (url) => {
      const u = String(url); urls.push(u);
      if (u.includes("/auth/v1/user")) return json({ id: "auth-user-1", email: "customer@example.test" });
      if (u.includes("/customer_terms_acceptances")) return json([]);
      throw new Error("Unexpected request after missing consent: " + u);
    },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(), body: JSON.stringify(baseOrder()),
  }));
  const payload = await response.json();
  assert(response.status === 403 && payload.code === "TERMS_ACCEPTANCE_REQUIRED", "Missing Terms acceptance must block checkout");
  assert(urls.length === 2 && !urls.some(u => u.includes("/customers") || u.includes("/rpc/")), "No customer lookup/create or order RPC may follow missing consent");
});

Deno.test("quote-required price blocks checkout without invoking order RPC", async () => {
  const urls: string[] = [];
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async (url) => {
      const u = String(url); urls.push(u);
      if (u.includes("/auth/v1/user")) return json({ id: "auth-user-1", email: "customer@example.test" });
      if (u.includes("/customer_terms_acceptances")) return json([{ id: "terms-row-1" }]);
      if (u.includes("/rest/v1/customers")) return json([{ id: "server-customer-1" }]);
      if (u.includes("/rest/v1/products")) return json([{
        public_sku: "GW-12345678", active: true, specifications: { price_status: "QUOTE_REQUIRED" },
        price: 155.25, cost_price: 100,
      }]);
      throw new Error("Unexpected request: " + u);
    },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(), body: JSON.stringify(baseOrder()),
  }));
  const payload = await response.json();
  assert(response.status === 409 && payload.code === "PRICE_CONFIRMATION_REQUIRED", "Unverified price must be blocked");
  assert(!urls.some(u => u.includes("/rpc/create_store_order_v2")), "Quote-required item must not reach order RPC");
});

Deno.test("valid checkout ignores browser customer ID and uses the server-linked profile", async () => {
  const rpcPayloads: Record<string, unknown>[] = [];
  const urls: string[] = [];
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async (url, init) => {
      const u = String(url); urls.push(u);
      if (u.includes("/auth/v1/user")) return json({ id: "auth-user-1", email: "customer@example.test" });
      if (u.includes("/customer_terms_acceptances")) return json([{ id: "terms-row-1" }]);
      if (u.includes("/rest/v1/customers")) return json([{ id: "server-customer-1" }]);
      if (u.includes("/rest/v1/products")) return json([{
        public_sku: "GW-12345678", active: true, specifications: { price_status: "VERIFIED" },
        price: 155.25, cost_price: 100,
      }]);
      if (u.includes("/rpc/create_store_order_v2")) {
        rpcPayloads.push(JSON.parse(String(init?.body)));
        return json({ order_id: "mock-order-1", order_number: 1 }, 201);
      }
      throw new Error("Unexpected request: " + u);
    },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(), body: JSON.stringify(baseOrder()),
  }));
  assert(response.status === 201, "Mocked valid checkout should return the RPC status");
  assert(rpcPayloads.length === 1, "Valid request should reach the mocked order RPC exactly once");
  const sentPayload = rpcPayloads[0];
  assert(sentPayload.p_customer_id === "server-customer-1", "RPC customer ID must come from the server-linked Auth profile");
  assert(String(sentPayload.p_customer_id) !== "browser-supplied-attacker-id", "Browser-supplied customer ID must be ignored");
  assert(sentPayload.p_customer_email === "customer@example.test", "Order email must come from verified Auth identity");
  assert(urls.filter(u => u.includes("/rpc/create_store_order_v2")).length === 1, "Exactly one mocked order RPC call expected");
});


Deno.test("malformed JSON is rejected before any network request", async () => {
  let calls = 0;
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async () => { calls++; return json({}); },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(), body: "{not-json",
  }));
  assert(response.status === 400, "Malformed JSON must be rejected");
  assert(calls === 0, "Malformed JSON must not call Auth, REST, or the order RPC");
});

Deno.test("failed customer profile creation never reaches the order RPC", async () => {
  const urls: string[] = [];
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async (url, init) => {
      const u = String(url); urls.push(u);
      if (u.includes("/auth/v1/user")) return json({ id: "auth-user-1", email: "customer@example.test" });
      if (u.includes("/customer_terms_acceptances")) return json([{ id: "terms-row-1" }]);
      if (u.includes("/rest/v1/customers") && init?.method === "POST") return json({ error: "mock profile insert failure" }, 500);
      if (u.includes("/rest/v1/customers")) return json([]);
      throw new Error("Unexpected request after profile failure: " + u);
    },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(), body: JSON.stringify(baseOrder()),
  }));
  const payload = await response.json();
  assert(response.status === 400, "Failed profile creation must return a safe client error");
  assert(String(payload.error).includes("customer profile"), "Profile failure should be actionable");
  assert(urls.some(u => u.includes("/rest/v1/customers") && u.includes("select=id")), "Customer profile lookup should be attempted");
  assert(urls.some(u => u.includes("/rest/v1/customers") && !u.includes("select=id")), "Customer profile creation should be attempted");
  assert(!urls.some(u => u.includes("/rpc/create_store_order_v2")), "Profile failure must never reach order RPC");
});

Deno.test("verified Auth identity without an email is rejected before consent or order work", async () => {
  const urls: string[] = [];
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async (url) => {
      urls.push(String(url));
      return json({ id: "auth-user-without-email" });
    },
  });
  const response = await handler(new Request("https://local.test/checkout", {
    method: "POST", headers: authHeaders(), body: JSON.stringify(baseOrder()),
  }));
  const payload = await response.json();
  assert(response.status === 401 && payload.code === "AUTH_REQUIRED", "Auth identity without email must be rejected");
  assert(urls.length === 1 && urls[0].includes("/auth/v1/user"), "No consent, profile, product, or order request may follow missing Auth email");
});


Deno.test("unsupported HTTP method is rejected without any network request", async () => {
  let calls = 0;
  const handler = createStoreCheckoutHandler({
    getEnv: env,
    fetchImpl: async () => { calls++; return json({}); },
  });
  const response = await handler(new Request("https://local.test/checkout", { method: "GET" }));
  assert(response.status === 405, "GET must be rejected with Method Not Allowed");
  assert(calls === 0, "Unsupported methods must not call Auth, REST, or the order RPC");
});
