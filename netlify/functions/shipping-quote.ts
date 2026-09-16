type QuoteRequest = {
  address?: string; city?: string; province?: string; postal_code?: string;
  items?: Array<{ id?: string; sku?: string; qty?: number; weight_kg?: number; length_cm?: number; width_cm?: number; height_cm?: number }>;
  selected_locker?: { provider?: string; code?: string; name?: string };
};
type Quote = { provider: string; service: string; price: number; currency: 'ZAR'; timeframe: string; live: boolean; note?: string; locker_required?: boolean };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
function parcel(items: QuoteRequest['items']) {
  let weight = 0, length = 0, width = 0, height = 0;
  for (const item of items || []) { const qty = Math.max(1, Number(item?.qty || 1)); weight += Math.max(0, Number(item?.weight_kg || 0)) * qty; length = Math.max(length, Number(item?.length_cm || 0)); width = Math.max(width, Number(item?.width_cm || 0)); height = Math.max(height, Number(item?.height_cm || 0)); }
  return { weight_kg: weight, length_cm: length, width_cm: width, height_cm: height };
}
async function configuredProviderQuote(name: string, request: QuoteRequest, p: ReturnType<typeof parcel>): Promise<Quote | null> {
  const prefix = name.toUpperCase(); const url = Netlify.env.get(`${prefix}_RATES_URL`); const token = Netlify.env.get(`${prefix}_API_TOKEN`); if (!url || !token) return null;
  const upstream = await fetch(url, { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ collection: { address: '29 Wattlebrook Crescent, Brookdale, Phoenix, Durban, South Africa', city: 'Durban', province: 'KwaZulu-Natal', postal_code: '4068' }, delivery: { address: request.address, city: request.city, province: request.province, postal_code: request.postal_code }, parcel: p, selected_locker: request.selected_locker || null }) });
  if (!upstream.ok) return null; const data = await upstream.json(); const first = Array.isArray(data?.rates) ? data.rates[0] : Array.isArray(data) ? data[0] : data?.rate ? data : null; if (!first) return null;
  const price = Number(first.price ?? first.rate ?? first.total ?? first.amount); if (!Number.isFinite(price)) return null;
  return { provider: name === 'BOBGO' ? 'Bob Go' : name === 'TCG' ? 'The Courier Guy' : 'PUDO', service: String(first.service ?? first.service_name ?? first.name ?? 'Delivery'), price, currency: 'ZAR', timeframe: String(first.timeframe ?? first.delivery_time ?? first.eta ?? 'Live quote'), live: true, locker_required: name === 'PUDO' };
}
export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body: QuoteRequest; try { body = await req.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }
  if (!body?.city || !body?.postal_code || !Array.isArray(body.items) || body.items.length === 0) return json({ error: 'Delivery city, postal code and cart items are required.' }, 400);
  const p = parcel(body.items); const quotes: Quote[] = [];
  for (const provider of ['BOBGO', 'TCG', 'PUDO']) { try { const q = await configuredProviderQuote(provider, body, p); if (q) quotes.push(q); } catch (error) { console.error(`${provider} quote failed`, error); } }
  // PAXI fixed published pricing is available without an API key. Only show it when a real product weight is present and within bag limits.
  if (p.weight_kg > 0 && p.weight_kg <= 5) {
    quotes.push({ provider: 'PAXI', service: 'Standard bag · 7–9 business days', price: 59.95, currency: 'ZAR', timeframe: '7–9 business days', live: false, note: 'Published PAXI fixed price; destination point selected separately.', locker_required: true });
    quotes.push({ provider: 'PAXI', service: 'Standard bag · 3–5 business days', price: 109.95, currency: 'ZAR', timeframe: '3–5 business days', live: false, note: 'Published PAXI fixed price; destination point selected separately.', locker_required: true });
  } else if (p.weight_kg > 5 && p.weight_kg <= 10) {
    quotes.push({ provider: 'PAXI', service: 'Large bag · 7–9 business days', price: 109.95, currency: 'ZAR', timeframe: '7–9 business days', live: false, note: 'Published PAXI fixed price; destination point selected separately.', locker_required: true });
    quotes.push({ provider: 'PAXI', service: 'Large bag · 3–5 business days', price: 139.95, currency: 'ZAR', timeframe: '3–5 business days', live: false, note: 'Published PAXI fixed price; destination point selected separately.', locker_required: true });
  }
  if (!quotes.length) return json({ quotes: [], parcel: p, message: 'No live courier credentials are configured yet. Add provider credentials in Netlify environment variables to enable live Bob Go / Courier Guy / PUDO quotes.' });
  quotes.sort((a, b) => a.price - b.price); return json({ quotes, parcel: p });
};
export const config = { path: '/api/shipping/quote' };
