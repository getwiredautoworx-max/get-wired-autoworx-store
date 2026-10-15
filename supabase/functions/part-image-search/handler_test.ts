import { createHandler } from './index.ts';

const ORIGIN = 'https://www.getwiredauto.co.za';
const JPEG = btoa(String.fromCharCode(0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0));
const request = () => new Request('https://unit.test/functions/v1/part-image-search', {
  method: 'POST',
  headers: { origin: ORIGIN, 'content-type': 'application/json' },
  body: JSON.stringify({ image_base64: JPEG, mime_type: 'image/jpeg' })
});
const envFor = (overrides: Record<string, string> = {}) => {
  const values: Record<string, string> = {
    SUPABASE_URL: 'https://unit.test',
    SUPABASE_SERVICE_ROLE_KEY: 'server-only-test-secret',
    OPENAI_API_KEY: 'test-openai-key',
    OPENAI_VISION_MODEL: 'gpt-4.1-mini',
    ...overrides
  };
  return (name: string) => values[name];
};
function fakeDb(opts: { allowed?: boolean; retryAfter?: number; products?: any[]; rpcError?: any; productError?: any } = {}) {
  return {
    rpc: async () => opts.rpcError
      ? { data: null, error: opts.rpcError }
      : { data: [{ allowed: opts.allowed ?? true, retry_after_seconds: opts.retryAfter ?? 60 }], error: null },
    from: () => ({
      select() { return this; },
      eq() { return this; },
      range: async () => ({ data: opts.products ?? [], error: opts.productError ?? null })
    })
  };
}
const visionResponse = (identification: Record<string, unknown>, status = 200) => new Response(
  status >= 200 && status < 300
    ? JSON.stringify({ choices: [{ message: { content: JSON.stringify(identification) } }] })
    : 'provider test failure',
  { status, headers: { 'content-type': 'application/json' } }
);
const clearIdentification = {
  part_name: '12V relay',
  part_type: 'relay',
  keywords: ['relay', '12V'],
  visible_text: ['40A'],
  vehicle_hint: '',
  confidence: 'medium',
  notes: 'Confirm terminal layout before fitment.'
};

Deno.test('missing provider key returns 503 without calling the provider', async () => {
  let providerCalls = 0;
  const handler = createHandler({
    envGet: envFor({ OPENAI_API_KEY: '' }),
    createClient: () => fakeDb(),
    fetch: async () => { providerCalls++; return visionResponse(clearIdentification); }
  });
  const response = await handler(request());
  assertEquals(response.status, 503);
  assertEquals(providerCalls, 0);
});

Deno.test('missing Origin is rejected before database or provider work', async () => {
  let rpcCalls = 0, providerCalls = 0;
  const handler = createHandler({
    envGet: envFor(),
    createClient: () => { rpcCalls++; return fakeDb(); },
    fetch: async () => { providerCalls++; return visionResponse(clearIdentification); }
  });
  const req = new Request('https://unit.test/functions/v1/part-image-search', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}'
  });
  const response = await handler(req);
  assertEquals(response.status, 403);
  assertEquals(rpcCalls, 0);
  assertEquals(providerCalls, 0);
});

Deno.test('shared limiter exhaustion returns 429 and Retry-After without provider calls', async () => {
  let providerCalls = 0;
  const handler = createHandler({
    envGet: envFor(),
    createClient: () => fakeDb({ allowed: false, retryAfter: 37 }),
    fetch: async () => { providerCalls++; return visionResponse(clearIdentification); }
  });
  const response = await handler(request());
  assertEquals(response.status, 429);
  assertEquals(response.headers.get('retry-after'), '37');
  assertEquals(providerCalls, 0);
});

Deno.test('mocked vision success returns a cautious ranked public-SKU match', async () => {
  const product = { id: 'p1', name: '12V Relay 40A', public_sku: 'GW-12345678', description: 'Automotive relay', price: 89.95, stock_quantity: 3, image_url: 'https://images.example/relay.webp', compatible_vehicles: [], specifications: {} };
  const handler = createHandler({
    envGet: envFor(),
    createClient: () => fakeDb({ products: [product] }),
    fetch: async (url) => {
      assertEquals(String(url), 'https://api.openai.com/v1/chat/completions');
      return visionResponse(clearIdentification);
    }
  });
  const response = await handler(request());
  const body = await response.json();
  assertEquals(response.status, 200);
  assertEquals(body.ok, true);
  assertEquals(body.matches.length, 1);
  assertEquals(body.matches[0].public_sku, 'GW-12345678');
  assert(body.disclaimer.includes('not a guarantee'));
});

Deno.test('provider 429 and 5xx map to safe API errors', async () => {
  const throttled = createHandler({ envGet: envFor(), createClient: () => fakeDb(), fetch: async () => visionResponse({}, 429) });
  const r429 = await throttled(request());
  assertEquals(r429.status, 429);
  const unavailable = createHandler({ envGet: envFor(), createClient: () => fakeDb(), fetch: async () => visionResponse({}, 500) });
  const r500 = await unavailable(request());
  assertEquals(r500.status, 502);
});

Deno.test('ambiguous or non-part identification can return no matches without inventing fitment', async () => {
  const ambiguous = { part_name: 'Unclear object', part_type: 'unknown', keywords: [], visible_text: [], vehicle_hint: '', confidence: 'low', notes: 'The photo is unclear; upload a closer image.' };
  const handler = createHandler({ envGet: envFor(), createClient: () => fakeDb({ products: [] }), fetch: async () => visionResponse(ambiguous) });
  const response = await handler(request());
  const body = await response.json();
  assertEquals(response.status, 200);
  assertEquals(body.identification.confidence, 'low');
  assertEquals(body.matches, []);
});
