import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync("supabase/functions/part-image-search/index.ts", "utf8");

assert.match(source, /providerCode === "insufficient_quota"/, "must recognize OpenAI insufficient_quota");
assert.match(source, /providerCode === "credit_balance_exhausted"/, "must recognize exhausted credit balance");
assert.match(source, /AI provider has no API credits/, "must return a clear exhausted-credit fallback");
assert.match(source, /temporarily rate-limited/, "must keep transient rate limiting separate");
assert.match(source, /Use Part Search or Request a Part instead/, "must direct customers to a no-cost fallback");
assert.match(source, /console\.error\("OpenAI image analysis failed", aiResponse\.status, providerCode \|\| "unclassified"\)/, "must log status/code without raw upstream response");
assert.doesNotMatch(source, /console\.error\("OpenAI image analysis failed", aiResponse\.status, upstreamText/, "must not log the raw provider body");

console.log("PASS: AI quota/rate-limit handling regression assertions");
