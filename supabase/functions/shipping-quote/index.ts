import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { cartCanonical, destinationCanonical, digest, signQuote, type QuoteItem } from "../_shared/delivery-quote.ts";
import { collectionOrigin } from "../_shared/collection-origin.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Item = QuoteItem;
function adminHeaders(): Record<string, string> {
  let secret: string | null = null; let usesSecretApiKey = false;
  const env = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (env) {
    try { const parsed = JSON.parse(env); if (typeof parsed === "string") secret = parsed; else if (parsed && typeof parsed.default === "string") secret = parsed.default; }
    catch { secret = env; }
    usesSecretApiKey = Boolean(secret);
  }
  if (!secret) secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || null;
  if (!secret) throw new Error("Delivery quote service is not configured.");
  const headers: Record<string, string> = { apikey: secret, "Content-Type": "application/json" };
  if (!usesSecretApiKey) headers.Authorization = "Bearer " + secret;
  return headers;
}
async function authoritativeParcel(supabaseUrl: string, items: Item[]) {
  const canonical = cartCanonical(items), quantities = new Map<string, number>();
  for (const item of items) { const sku = String(item.public_sku).trim().toUpperCase(); quantities.set(sku, (quantities.get(sku) || 0) + Number(item.quantity ?? item.qty)); }
  const skus = [...quantities.keys()], url = new URL(supabaseUrl + "/rest/v1/products");
  url.searchParams.set("select", "public_sku,active,weight_kg,length_cm,width_cm,height_cm");
  url.searchParams.set("public_sku", "in.(" + skus.join(",") + ")"); url.searchParams.set("active", "eq.true");
  const response = await fetch(url, { headers: adminHeaders() });
  if (!response.ok) throw new Error("Unable to verify product parcel dimensions.");
  const rows = await response.json() as Array<Record<string, unknown>>;
  if (rows.length !== skus.length) throw new Error("One or more cart products are no longer available.");
  const bySku = new Map(rows.map(row => [String(row.public_sku), row]));
  let weight = 0, length = 0, width = 0, height = 0;
  for (const [sku, qty] of quantities) {
    const row = bySku.get(sku); if (!row || row.active !== true) throw new Error("One or more cart products are no longer available.");
    const w = Number(row.weight_kg), l = Number(row.length_cm), wi = Number(row.width_cm), h = Number(row.height_cm);
    if (![w,l,wi,h].every(Number.isFinite) || w <= 0 || l <= 0 || wi <= 0 || h <= 0) throw new Error("Verified parcel dimensions are missing; request a manual delivery quotation.");
    weight += w * qty; length = Math.max(length,l); width = Math.max(width,wi); height = Math.max(height,h);
  }
  return { canonical, parcel: { weight_kg: Number(weight.toFixed(3)), length_cm: length, width_cm: width, height_cm: height } };
}

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

function ratesFrom(data: any): any[] {
  if (Array.isArray(data?.rates)) return data.rates;
  if (Array.isArray(data?.services)) return data.services;
  if (Array.isArray(data)) return data;
  if (data?.rate && typeof data.rate === "object") return [data.rate];
  return data && typeof data === "object" ? [data] : [];
}
export async function handleRequest(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const body = await request.json() as Record<string, unknown>;
    if (typeof body.address !== "string" || !body.address.trim() || typeof body.city !== "string" || !body.city.trim() ||
        typeof body.province !== "string" || !body.province.trim() || typeof body.postal_code !== "string" || !body.postal_code.trim() ||
        !Array.isArray(body.items) || !body.items.length) return json({ error: "Full delivery address, city, province, postal code and cart items are required." }, 400);
    if (body.items.length > 100) return json({ error: "Too many cart items." }, 400);
    const quoteSecret = Deno.env.get("DELIVERY_QUOTE_SIGNING_SECRET"), supabaseUrl = Deno.env.get("SUPABASE_URL");
    if (!quoteSecret || quoteSecret.length < 32 || !supabaseUrl) return json({ error: "Secure delivery quoting is not configured. Please request a manual quotation." }, 503);
    const verified = await authoritativeParcel(supabaseUrl, body.items as Item[]);
    const p = verified.parcel, cartHash = await digest(verified.canonical), destinationHash = await digest(destinationCanonical(body));
    const quotes: any[] = [];
    // Keep private collection origin out of source control. Skip live carrier calls until configured server-side.
    const collection = collectionOrigin((name: string) => Deno.env.get(name));
    for (const provider of providers) {
      if (!collection) break;
      const url = Deno.env.get(provider.prefix + "_RATES_URL");
      const token = Deno.env.get(provider.prefix + "_API_TOKEN");
      if (!url || !token) continue;
      try {
        const upstream = await fetch(url, {
          method: "POST",
          headers: { authorization: "Bearer " + token, "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            collection,
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
          const currency = String(rate.currency ?? "ZAR").toUpperCase();
          if (currency !== "ZAR") continue;
          const timeframe = String(rate.timeframe ?? rate.delivery_time ?? rate.eta ?? "Provider estimate"), issuedAt = Date.now();
          const claims = { v: 1, cart_hash: cartHash, destination_hash: destinationHash, provider: provider.name, service,
            price: Number(price.toFixed(2)), currency, parcel: p, issued_at: issuedAt, expires_at: issuedAt + 10 * 60 * 1000, nonce: crypto.randomUUID() };
          const quote_token = await signQuote(claims, quoteSecret);
          quotes.push({ provider: provider.name, service, price: claims.price, currency, timeframe, live: true, quote_token, nonce: claims.nonce,
            ...( /locker|lockers|parcel point|pickup point|collection point|pudo|bob box/i.test(service) ? { delivery_type: "locker_or_point" } : { delivery_type: "door_or_standard" }) });
        }
      } catch {
        // Provider failure must not block other providers or create a guessed quote.
      }
    }
    if (p.weight_kg <= 5) {
      quotes.push({ provider: "PEP PAXI", service: "Standard bag · 7–9 business days", price: 59.95, currency: "ZAR", timeframe: "7–9 business days", live: false, note: "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
      quotes.push({ provider: "PEP PAXI", service: "Standard bag · 3–5 business days", price: 109.95, currency: "ZAR", timeframe: "3–5 business days", live: false, note: "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
    } else if (p.weight_kg <= 10) {
      quotes.push({ provider: "PEP PAXI", service: "Large bag · 7–9 business days", price: 119.95, currency: "ZAR", timeframe: "7–9 business days", live: false, note: "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
      quotes.push({ provider: "PEP PAXI", service: "Large bag · 3–5 business days", price: 139.95, currency: "ZAR", timeframe: "3–5 business days", live: false, note: "Published store-to-store rate; destination point selection and parcel eligibility must be confirmed." });
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
}

if (import.meta.main) Deno.serve(handleRequest);
