import { assertEquals, assert } from 'jsr:@std/assert@1';
import { hmacClientHash, isAllowedOrigin, MAX_IMAGE_BYTES, readJsonLimited, validateImagePayload } from './validation.ts';

const allowed = new Set(['https://www.getwiredauto.co.za', 'https://getwiredauto.co.za']);

Deno.test('origin allowlist rejects missing and unknown origins', () => {
  assertEquals(isAllowedOrigin('', allowed), false);
  assertEquals(isAllowedOrigin('https://attacker.example', allowed), false);
  assertEquals(isAllowedOrigin('https://www.getwiredauto.co.za', allowed), true);
});

Deno.test('JPEG/PNG/WebP signatures must agree with MIME type', () => {
  const jpeg = btoa(String.fromCharCode(0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0));
  const png = btoa(String.fromCharCode(137,80,78,71,13,10,26,10));
  const webp = btoa(String.fromCharCode(0x52,0x49,0x46,0x46,0,0,0,0,0x57,0x45,0x42,0x50));
  assertEquals(validateImagePayload(jpeg, 'image/jpeg').ok, true);
  assertEquals(validateImagePayload(png, 'image/png').ok, true);
  assertEquals(validateImagePayload(webp, 'image/webp').ok, true);
  assertEquals(validateImagePayload(jpeg, 'image/png').ok, false);
  assertEquals(validateImagePayload('bm90LWltYWdl', 'image/jpeg').ok, false);
});

Deno.test('oversize and unsupported payloads fail before provider calls', () => {
  const tooLarge = 'A'.repeat(Math.ceil((MAX_IMAGE_BYTES + 8) * 4 / 3));
  assertEquals(validateImagePayload(tooLarge, 'image/jpeg').ok, false);
  assertEquals(validateImagePayload('aGVsbG8=', 'image/gif').ok, false);
});

Deno.test('request JSON reader enforces a streaming body limit and valid JSON', async () => {
  const good = new Request('https://local.test', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"ok":true}' });
  assertEquals(await readJsonLimited(good), { ok: true });
  const bad = new Request('https://local.test', { method: 'POST', body: 'not-json' });
  let invalid = false;
  try { await readJsonLimited(bad); } catch (e) { invalid = e instanceof Error && e.message === 'INVALID_JSON'; }
  assert(invalid);
  const big = new Request('https://local.test', { method: 'POST', body: 'x'.repeat(2048) });
  let oversized = false;
  try { await readJsonLimited(big, 100); } catch (e) { oversized = e instanceof Error && e.message === 'BODY_TOO_LARGE'; }
  assert(oversized);
});

Deno.test('client hashes are deterministic but do not expose raw IPs', async () => {
  const a = await hmacClientHash('203.0.113.7', 'server-only-test-secret');
  const b = await hmacClientHash('203.0.113.7', 'server-only-test-secret');
  const c = await hmacClientHash('203.0.113.7', 'different-secret');
  assertEquals(a, b);
  assert(a !== '203.0.113.7');
  assert(a !== c);
  assertEquals(a.length, 64);
});
