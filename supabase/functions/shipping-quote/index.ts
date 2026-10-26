import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
type Item = { qty?: number; weight_kg?: number; length_cm?: number; width_cm?: number; height_cm?: number };
type Provider = { name: string; prefix: string };
const providers: Provider[] = [
  { name: "Bob Go", prefix: "BOBGO" },
  { name: "The Courier Guy", prefix: "TCG" },
  { name: "PUDO", prefix: "PUDO" },
  // Aramex is enabled only when its server-side adapter URL and token are configured.
  // The configured adapter must accept the shared quote payload and return {rates:[{price,service,timeframe}]}.
  { name: "Aramex", prefix: "ARAMEX" },
];
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "content-type": "application/json", "cache-control": "no-store" },
});
function parcel(items: Item[]) {
  let weight = 0, length = 0, width = 0, height = 0;
  for (const item of items) {
    const qty = Math.max(1, Number(item?.qty || 1));
    weight += Math.max(0, Number(item?.weight_kg || 0)) * qty;
    length = Math.max(length, Number(item?.length_cm || 0));
    width = Math.max(width, Number(item?.width_cm || 0));
    height = Math.max(height, Number(item?.height_cm || 0));
  }
  return { weight_kg: Number(weight.toFixed(3)), length_cm: length, width_cm: width, height_cm: height };
}
function ratesFrom(data: any): any[] {
  if (Array.isArray(data?.rates)) return data.rates;
  if (Array.isArray(data?.services)) return data.services;
  if (Array.isArray(data)) return data;
  if (data?.rate && typeof data.rate === "object") return [data.rate];
  return data && typeof data === "object" ? [data] : [];
}
Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const body = await request.json();
    if (!body?.city?.trim() || !body?.postal_code?.trim() || !Array.isArray(body.items) || !body.items.length) {
      return json({ error: "Delivery city, postal code and cart items are required." }, 400);
    }
    if (body.items.length > 100) return json({ error: "Too many cart items." }, 400);
    const p = parcel(body.items);
    const quotes: any[] = [];
    let provisional = body.items.some((item: Item) => [item?.weight_kg, item?.length_cm, item?.width_cm, item?.height_cm].some(value => !Number.isFinite(Number(value)) || Number(value) <= 0));
    if (p.weight_kg <= 0) p.weight_kg = 1;
    for (const provider of providers) {
      const url = Deno.env.get(provider.prefix + "_RATES_URL");
      const token = Deno.env.get(provider.prefix + "_API_TOKEN");
      if (!url || !token) continue;
      try {
        const upstream = await fetch(url, {
          method: "POST",
          headers: { authorization: "Bearer " + token, "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            collection: { address: "29 Wattlebrook Crescent, Brookdale, Phoenix, Durban, South Africa", city: "Durban", province: "KwaZulu-Natal", postal_code: "4068" },
            delivery: { city: body.city.trim(), postal_code: body.postal_code.trim(), address: typeof body.address === "string" ? body.address.trim() : "" },
            parcel: p,
          }),
          signal: AbortSignal.timeout(10000),
        });
        if (!upstream.ok) continue;
        const data = await upstream.json();
        for (const rate of ratesFrom(data)) {
          const price = Number(rate?.price ?? rate?.rate ?? rate?.total ?? rate?.amount);
          if (!Number.isFinite(price) || price <= 0) continue;
          const service = String(rate.service ?? rate.service_name ?? rate.name ?? rate.product ?? "Delivery");
          quotes.push({
            provider: provider.name,
            service,
            price,
            currency: String(rate.currency ?? "ZAR"),
            timeframe: String(rate.timeframe ?? rate.delivery_time ?? rate.eta ?? "Provider estimate"),
            live: !provisional,
            ...(provisional ? { note: "Indicative only: at least one cart item lacks verified shipping weight or dimensions. Confirm the parcel with the courier before ordering." } : {}),
            ...( /locker|lockers|parcel point|pickup point|collection point|pudo|bob box/i.test(service) ? { delivery_type: "locker_or_point" } : { delivery_type: "door_or_standard" }),
          });
        }
      } catch {
        // Provider failure must not block other providers or create a guessed quote.
      }
    }
    if (p.weight_kg <= 5) {
      quotes.push({ provider: "PEP PAXI", service: "Standard bag · 7–9 business days", price: 59.95, currency: "ZAR", timeframe: "7–9 business days", live: false, note: (provisional ? "Provisional rate because product weight data is not recorded; final quotation subject to confirmation. " : "") + "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
      quotes.push({ provider: "PEP PAXI", service: "Standard bag · 3–5 business days", price: 109.95, currency: "ZAR", timeframe: "3–5 business days", live: false, note: (provisional ? "Provisional rate because product weight data is not recorded; final quotation subject to confirmation. " : "") + "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
    } else if (p.weight_kg <= 10) {
      quotes.push({ provider: "PEP PAXI", service: "Large bag · 7–9 business days", price: 119.95, currency: "ZAR", timeframe: "7–9 business days", live: false, note: (provisional ? "Provisional rate because product weight data is not recorded; final quotation subject to confirmation. " : "") + "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
      quotes.push({ provider: "PEP PAXI", service: "Large bag · 3–5 business days", price: 139.95, currency: "ZAR", timeframe: "3–5 business days", live: false, note: (provisional ? "Provisional rate because product weight data is not recorded; final quotation subject to confirmation. " : "") + "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
    }
    quotes.sort((a, b) => a.price - b.price);
    return json({
      quotes, parcel: p,
      configured_live_providers: providers.filter(x => Deno.env.get(x.prefix + "_RATES_URL") && Deno.env.get(x.prefix + "_API_TOKEN")).map(x => x.name),
      message: quotes.length ? "Select a listed delivery option. Live rates are marked live; PAXI published rates are provisional until destination-point and parcel eligibility are confirmed." : "No automatic quote is available; request a manual courier quotation via WhatsApp.",
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Quote request failed." }, 400);
  }
});