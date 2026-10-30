import { validateCustomerSession } from "./customer-auth.ts";

Deno.test("rejects requests without a bearer token", async () => {
  const result = await validateCustomerSession("https://example.supabase.co", "public-key", "");
  if (result.ok || result.status !== 401 || result.code !== "AUTH_REQUIRED") throw new Error("Missing bearer token must be rejected");
});
Deno.test("rejects invalid customer sessions", async () => {
  const fakeFetch: typeof fetch = async () => new Response("unauthorized", { status: 401 });
  const result = await validateCustomerSession("https://example.supabase.co", "public-key", "Bearer expired", fakeFetch);
  if (result.ok || result.status !== 401) throw new Error("Invalid session must be rejected");
});
Deno.test("rejects authenticated users without an email", async () => {
  const fakeFetch: typeof fetch = async () => new Response(JSON.stringify({ id: "user-1" }), { status: 200 });
  const result = await validateCustomerSession("https://example.supabase.co", "public-key", "Bearer valid", fakeFetch);
  if (result.ok || result.status !== 403 || result.code !== "AUTH_EMAIL_REQUIRED") throw new Error("Missing email must be rejected");
});
Deno.test("rejects authenticated but unconfirmed email accounts", async () => {
  const fakeFetch: typeof fetch = async () => new Response(JSON.stringify({ id: "user-1", email: "customer@example.com", email_confirmed_at: null }), { status: 200 });
  const result = await validateCustomerSession("https://example.supabase.co", "public-key", "Bearer valid", fakeFetch);
  if (result.ok || result.status !== 403 || result.code !== "AUTH_EMAIL_REQUIRED") throw new Error("Unconfirmed email must be rejected");
});
Deno.test("accepts a valid authenticated email session", async () => {
  const fakeFetch: typeof fetch = async (input, init) => {
    if (String(input) !== "https://example.supabase.co/auth/v1/user") throw new Error("Unexpected auth URL");
    const headers = new Headers(init?.headers);
    if (headers.get("apikey") !== "public-key" || headers.get("Authorization") !== "Bearer valid") throw new Error("User token must be verified with Auth API");
    return new Response(JSON.stringify({ id: "user-1", email: "customer@example.com", email_confirmed_at: "2026-10-29T12:00:00.000Z" }), { status: 200 });
  };
  const result = await validateCustomerSession("https://example.supabase.co/", "public-key", "Bearer valid", fakeFetch);
  if (!result.ok || result.user.id !== "user-1" || result.user.email !== "customer@example.com") throw new Error("Valid session should pass");
});
