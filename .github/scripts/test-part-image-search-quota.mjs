import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mapProviderError } from "../../supabase/functions/part-image-search/provider-error.js";

const quotaBody = JSON.stringify({ error: {
  message: "You have no credits remaining.",
  type: "insufficient_quota",
  code: "credit_balance_exhausted"
} });
const quota = mapProviderError(429, quotaBody);
assert.equal(quota.status, 503);
assert.equal(quota.providerCode, "credit_balance_exhausted");
assert.match(quota.body.error, /no API credits/i);
assert.match(quota.body.error, /Part Search or Request a Part/i);

const quotaByType = mapProviderError(429, JSON.stringify({ error: { type: "insufficient_quota" } }));
assert.equal(quotaByType.status, 503);
assert.match(quotaByType.body.error, /no API credits/i);

const throttle = mapProviderError(429, JSON.stringify({ error: { code: "rate_limit_exceeded" } }));
assert.equal(throttle.status, 429);
assert.match(throttle.body.error, /temporarily rate-limited/i);

const malformed = mapProviderError(429, "not-json");
assert.equal(malformed.status, 429);
assert.match(malformed.body.error, /temporarily rate-limited/i);

const auth = mapProviderError(401, JSON.stringify({ error: { code: "invalid_api_key" } }));
assert.equal(auth.status, 502);
assert.match(auth.body.error, /authentication failed/i);

const other = mapProviderError(500, "{}");
assert.equal(other.status, 502);
assert.match(other.body.error, /Request a Part/i);

const source = readFileSync("supabase/functions/part-image-search/index.ts", "utf8");
assert.match(source, /mapProviderError\(aiResponse\.status, upstreamText\)/);
assert.match(source, /console\.error\("OpenAI image analysis failed", aiResponse\.status, mapped\.providerCode \|\| "unclassified"\)/);
assert.doesNotMatch(source, /console\.error\("OpenAI image analysis failed", aiResponse\.status, upstreamText/);

console.log("PASS: 6 provider error behavior cases + safe logging integration assertions");
