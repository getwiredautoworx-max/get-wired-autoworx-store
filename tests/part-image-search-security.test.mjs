import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  MAX_BODY_BYTES,
  MAX_IMAGE_BYTES,
  consumeDurableRateLimit,
  hashClientIp,
  isAllowedOrigin,
  readJsonLimited,
  requestVision,
  validateImagePayload
} from "../supabase/functions/part-image-search/security.mjs";

const b64 = bytes => Buffer.from(bytes).toString("base64");

test("only the three approved storefront origins are accepted", () => {
  assert.equal(isAllowedOrigin("https://www.getwiredauto.co.za"), true);
  assert.equal(isAllowedOrigin("https://getwiredauto.co.za"), true);
  assert.equal(isAllowedOrigin("https://get-wired-autoworx-store.pages.dev"), true);
  assert.equal(isAllowedOrigin("https://attacker.example"), false);
  assert.equal(isAllowedOrigin(""), false);
  assert.equal(isAllowedOrigin(null), false);
});

test("request parser rejects non-JSON content type", async () => {
  const request = new Request("https://edge.example", { method: "POST", headers: { "content-type": "text/plain" }, body: "{}" });
  await assert.rejects(() => readJsonLimited(request), /JSON request/);
});

test("request parser rejects declared oversized bodies before reading", async () => {
  const request = new Request("https://edge.example", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": String(MAX_BODY_BYTES + 1) },
    body: "{}"
  });
  await assert.rejects(() => readJsonLimited(request), /too large/);
});

test("request parser enforces the streaming body limit", async () => {
  const bytes = new Uint8Array(MAX_BODY_BYTES + 1);
  const request = new Request("https://edge.example", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: bytes
  });
  await assert.rejects(() => readJsonLimited(request), /too large/);
});

test("request parser rejects malformed JSON", async () => {
  const request = new Request("https://edge.example", { method: "POST", headers: { "content-type": "application/json" }, body: "{" });
  await assert.rejects(() => readJsonLimited(request), /valid JSON/);
});

test("request parser accepts a bounded JSON body", async () => {
  const request = new Request("https://edge.example", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ok: true }) });
  assert.deepEqual(await readJsonLimited(request), { ok: true });
});

test("image payload validates JPEG, PNG and WebP magic bytes", () => {
  assert.equal(validateImagePayload(b64([0xff, 0xd8, 0xff, 0x00]), "image/jpeg").ok, true);
  assert.equal(validateImagePayload(b64([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), "image/png").ok, true);
  assert.equal(validateImagePayload(b64([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]), "image/webp").ok, true);
});

test("image payload rejects MIME mismatch, unsupported types and invalid base64", () => {
  assert.equal(validateImagePayload(b64([0xff, 0xd8, 0xff]), "image/png").ok, false);
  assert.equal(validateImagePayload(b64([0, 1, 2]), "image/gif").ok, false);
  assert.equal(validateImagePayload("not base64!", "image/jpeg").ok, false);
});

test("image payload enforces the decoded four-megabyte cap", () => {
  const oversized = b64(new Uint8Array(MAX_IMAGE_BYTES + 1));
  assert.equal(validateImagePayload(oversized, "image/jpeg").ok, false);
});

test("client IP is HMACed and stable without storing the raw address", async () => {
  const a = await hashClientIp("203.0.113.10", "a".repeat(40));
  const b = await hashClientIp("203.0.113.10", "a".repeat(40));
  const c = await hashClientIp("203.0.113.11", "a".repeat(40));
  assert.match(a, /^[0-9a-f]{64}$/);
  assert.equal(a, b);
  assert.notEqual(a, c);
  await assert.rejects(() => hashClientIp("203.0.113.10", "short"));
});

test("durable limiter calls the service-side RPC and returns its decision", async () => {
  let call;
  const db = { rpc: async (name, args) => {
    call = { name, args };
    return { data: [{ allowed: true, remaining: 7, reset_at: "2026-11-02T00:01:00Z" }], error: null };
  }};
  const result = await consumeDurableRateLimit(db, "a".repeat(64));
  assert.equal(result.allowed, true);
  assert.equal(call.name, "consume_part_image_search_rate_limit");
  assert.equal(call.args.p_max_requests, 8);
  assert.equal(call.args.p_window_seconds, 60);
});

test("durable limiter fails closed when the RPC is unavailable or malformed", async () => {
  await assert.rejects(() => consumeDurableRateLimit({ rpc: async () => ({ data: null, error: new Error("offline") }) }, "a".repeat(64)), /unavailable/);
  await assert.rejects(() => consumeDurableRateLimit({ rpc: async () => ({ data: [], error: null }) }, "a".repeat(64)), /invalid response/);
});

test("endpoint rejects missing origin and runs durable limiting before paid inference", async () => {
  const source = await readFile(new URL("../supabase/functions/part-image-search/index.ts", import.meta.url), "utf8");
  const helper = await readFile(new URL("../supabase/functions/part-image-search/security.mjs", import.meta.url), "utf8");
  assert.match(source, /if \(!isAllowedOrigin\(requestOrigin\)\) return json\(\{ error: "Origin not allowed\." \}, 403\)/);
  assert.ok(source.indexOf("consumeDurableRateLimit(db, keyHash)") < source.indexOf("requestVision({"));
  assert.ok(source.indexOf('if (!OPENAI_API_KEY)') < source.indexOf("requestVision({"));
  assert.match(helper, /fetchImpl\(/);
  assert.match(helper, /AbortSignal\.timeout\(25_000\)/);
});

test("migration restricts the rate-limit table and RPC to service_role", async () => {
  const sql = await readFile(new URL("../supabase/migrations/20261102160000_part_image_search_rate_limit.sql", import.meta.url), "utf8");
  assert.match(sql, /ENABLE ROW LEVEL SECURITY/);
  assert.match(sql, /REVOKE ALL ON TABLE[\s\S]*FROM PUBLIC, anon, authenticated/);
  assert.match(sql, /REVOKE ALL ON FUNCTION[\s\S]*FROM PUBLIC, anon, authenticated/);
  assert.match(sql, /GRANT EXECUTE ON FUNCTION[\s\S]*TO service_role/);
  assert.match(sql, /LIMIT 500/);
});


test("missing OpenAI key returns 503 without making an upstream request", async () => {
  let calls = 0;
  const result = await requestVision({
    apiKey: "",
    model: "gpt-4.1-mini",
    mime: "image/jpeg",
    base64: "AA==",
    fetchImpl: async () => { calls += 1; throw new Error("must not call"); }
  });
  assert.equal(result.ok, false);
  assert.equal(result.status, 503);
  assert.equal(calls, 0);
});

test("vision provider authentication failures are sanitized", async () => {
  for (const status of [401, 403]) {
    const result = await requestVision({
      apiKey: "test-key",
      model: "gpt-4.1-mini",
      mime: "image/jpeg",
      base64: "AA==",
      fetchImpl: async () => new Response("private provider response", { status })
    });
    assert.equal(result.ok, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /authentication failed/);
    assert.equal(result.error.includes("private provider response"), false);
  }
});

test("vision provider rate limit and server errors map to safe customer responses", async () => {
  const busy = await requestVision({
    apiKey: "test-key", model: "gpt-4.1-mini", mime: "image/jpeg", base64: "AA==",
    fetchImpl: async () => new Response("private details", { status: 429 })
  });
  const failed = await requestVision({
    apiKey: "test-key", model: "gpt-4.1-mini", mime: "image/jpeg", base64: "AA==",
    fetchImpl: async () => new Response("private details", { status: 503 })
  });
  assert.equal(busy.status, 429);
  assert.match(busy.error, /temporarily busy/);
  assert.equal(failed.status, 502);
  assert.match(failed.error, /could not be analysed/);
  assert.equal(failed.error.includes("private details"), false);
});

test("vision helper accepts a mocked successful response and applies a timeout", async () => {
  let request;
  const result = await requestVision({
    apiKey: "test-key",
    model: "gpt-4.1-mini",
    mime: "image/jpeg",
    base64: "AA==",
    fetchImpl: async (url, options) => {
      request = { url, options };
      return Response.json({ choices: [{ message: { content: JSON.stringify({ part_name: "relay", confidence: "high" }) } }] });
    }
  });
  assert.equal(result.ok, true);
  assert.equal(result.identification.part_name, "relay");
  assert.equal(request.url, "https://api.openai.com/v1/chat/completions");
  assert.equal(request.options.model, undefined);
  assert.ok(request.options.signal instanceof AbortSignal);
  assert.equal(request.options.signal.aborted, false);
  assert.match(request.options.body, /gpt-4\.1-mini/);
});

test("vision helper sanitizes malformed provider JSON and network failures", async () => {
  const malformed = await requestVision({
    apiKey: "test-key", model: "gpt-4.1-mini", mime: "image/jpeg", base64: "AA==",
    fetchImpl: async () => Response.json({ choices: [{ message: { content: "not json" } }] })
  });
  const network = await requestVision({
    apiKey: "test-key", model: "gpt-4.1-mini", mime: "image/jpeg", base64: "AA==",
    fetchImpl: async () => { throw new Error("secret internal detail"); }
  });
  assert.equal(malformed.status, 502);
  assert.match(malformed.error, /unreadable result/);
  assert.equal(network.status, 502);
  assert.match(network.error, /could not be analysed/);
  assert.equal(network.error.includes("secret internal detail"), false);
});
