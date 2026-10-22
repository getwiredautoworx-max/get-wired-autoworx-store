import { assertEquals, assertStringIncludes } from "jsr:@std/assert@1";

const testJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlc3QiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE5MDAwMDAwMDB9.dummy-signature";
Deno.env.set("SUPABASE_URL", "https://example.supabase.co");
Deno.env.set("SUPABASE_SECRET_KEYS", JSON.stringify({ default: testJwt }));
Deno.env.set("SUPABASE_PUBLISHABLE_KEY", testJwt);

const { handler } = await import("./index.ts");

Deno.test("OPTIONS preflight succeeds without a bearer token", async () => {
  const response = await handler(new Request("https://example.supabase.co/functions/v1/veyron-admin", {
    method: "OPTIONS",
    headers: { origin: "https://www.getwiredauto.co.za" },
  }));
  assertEquals(response.status, 200);
  assertEquals(response.headers.get("Access-Control-Allow-Origin"), "*");
  assertStringIncludes(response.headers.get("Access-Control-Allow-Methods") || "", "OPTIONS");
  assertStringIncludes(response.headers.get("Access-Control-Allow-Headers") || "", "authorization");
});

Deno.test("unauthenticated GET fails closed and keeps CORS headers", async () => {
  const response = await handler(new Request("https://example.supabase.co/functions/v1/veyron-admin?view=products"));
  assertEquals(response.status, 401);
  assertEquals(response.headers.get("Access-Control-Allow-Origin"), "*");
  const body = await response.json();
  assertEquals(body.ok, false);
  assertEquals(body.error, "Admin authorization required.");
});
