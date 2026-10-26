import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { matchCurrentLiveQuote, normalizeCheckoutItems } from "./quote-validation.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") throw new Error("Invalid order request.");

    const allowed = ["p_customer_name","p_customer_email","p_customer_phone","p_delivery_address","p_city","p_province","p_postal_code","p_delivery_fee","p_payment_method","p_notes","p_items","p_delivery_method","p_delivery_quote"];
    const payload: Record<string, unknown> = {};
    for (const key of allowed) payload[key] = body[key];

    if (typeof payload.p_customer_name !== "string" || payload.p_customer_name.trim().length < 2) throw new Error("Customer name is required.");
    payload.p_customer_name = payload.p_customer_name.trim();
    if (typeof payload.p_customer_email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.p_customer_email.trim())) throw new Error("A valid email address is required.");
    payload.p_customer_email = payload.p_customer_email.trim();
    if (typeof payload.p_customer_phone !== "string" || payload.p_customer_phone.trim().length < 5) throw new Error("Customer phone is required.");
    payload.p_customer_phone = payload.p_customer_phone.trim();

    const deliveryMethod = String(payload.p_delivery_method ?? "").toLowerCase();
    if (deliveryMethod !== "pickup" && deliveryMethod !== "delivery") throw new Error("Choose pickup or delivery.");
    const normalizedItems = normalizeCheckoutItems(payload.p_items);
    payload.p_items = normalizedItems;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    let secret: string | null = null;
    let usesSecretApiKey = false;
    const secretKeysEnv = Deno.env.get("SUPABASE_SECRET_KEYS");
    if (secretKeysEnv) {
      try {
        const parsed = JSON.parse(secretKeysEnv);
        if (typeof parsed === "string") secret = parsed;
        else if (parsed && typeof parsed.default === "string") secret = parsed.default;
      } catch {
        secret = secretKeysEnv;
      }
      usesSecretApiKey = Boolean(secret);
    }
    if (!secret) secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || null;
    if (!supabaseUrl || !secret) throw new Error("Checkout service is not configured.");

    const adminHeaders: Record<string, string> = {
      apikey: secret,
      "Content-Type": "application/json",
    };
    if (!usesSecretApiKey) adminHeaders.Authorization = "Bearer " + secret;

    const publicSkus = normalizedItems.map(item => item.public_sku);
    const productsUrl = new URL(supabaseUrl + "/rest/v1/products");
    productsUrl.searchParams.set("select", "public_sku,active,specifications,price,cost_price,weight_kg,length_cm,width_cm,height_cm");
    productsUrl.searchParams.set("public_sku", "in.(" + publicSkus.join(",") + ")");
    productsUrl.searchParams.set("active", "eq.true");
    const productCheck = await fetch(productsUrl, { headers: adminHeaders });
    if (!productCheck.ok) throw new Error("Unable to verify current product prices. Please try again.");
    const products = await productCheck.json() as Array<Record<string, unknown>>;
    const productsBySku = new Map(products.map(product => [String(product.public_sku), product]));
    const verifiedRows = products.filter(product => {
      const spec = product.specifications as Record<string, unknown> | null;
      const price = Number(product.price), cost = Number(product.cost_price);
      const expected = Math.round(cost * 1.15 * 1.35 * 100) / 100;
      return product.active === true && spec?.price_status !== "QUOTE_REQUIRED" &&
        Number.isFinite(price) && price > 0 && Number.isFinite(cost) && cost > 0 &&
        Math.abs(price - expected) < 0.011;
    });
    const verifiedSkus = new Set(verifiedRows.map(product => String(product.public_sku)));
    const blockedSkus = publicSkus.filter(sku => !verifiedSkus.has(sku));
    if (blockedSkus.length) {
      return new Response(JSON.stringify({
        error: "Current selling price confirmation is required for one or more cart items. Request a quote before ordering.",
        code: "PRICE_CONFIRMATION_REQUIRED",
        public_skus: blockedSkus,
      }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (deliveryMethod === "pickup") {
      payload.p_delivery_fee = 0;
      payload.p_delivery_quote = null;
      payload.p_delivery_address = "Customer pickup from Get Wired AutoWorx";
      payload.p_city = null;
      payload.p_province = null;
      payload.p_postal_code = null;
    } else {
      const address = typeof payload.p_delivery_address === "string" ? payload.p_delivery_address.trim() : "";
      const city = typeof payload.p_city === "string" ? payload.p_city.trim() : "";
      const province = typeof payload.p_province === "string" ? payload.p_province.trim() : "";
      const postalCode = typeof payload.p_postal_code === "string" ? payload.p_postal_code.trim() : "";
      if (!address || !city || !province || !postalCode) throw new Error("Complete delivery address is required.");

      const quoteItems = normalizedItems.map(item => {
        const product = productsBySku.get(item.public_sku);
        if (!product) throw new Error("Unable to verify product shipping details.");
        return {
          qty: item.quantity,
          weight_kg: Number(product.weight_kg ?? 0),
          length_cm: Number(product.length_cm ?? 0),
          width_cm: Number(product.width_cm ?? 0),
          height_cm: Number(product.height_cm ?? 0),
        };
      });
      const quoteResponse = await fetch(supabaseUrl + "/functions/v1/shipping-quote", {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify({ address, city, province, postal_code: postalCode, items: quoteItems }),
      });
      if (!quoteResponse.ok) {
        return new Response(JSON.stringify({
          error: "Unable to verify a current delivery quotation. Request a fresh quote or contact us on WhatsApp.",
          code: "DELIVERY_QUOTE_VERIFICATION_FAILED",
        }), { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const quoteData = await quoteResponse.json() as { quotes?: unknown[] };
      const currentQuote = matchCurrentLiveQuote(payload.p_delivery_quote, quoteData.quotes);
      if (!currentQuote) {
        return new Response(JSON.stringify({
          error: "This delivery quote is not current for the submitted address and cart. Request a fresh quotation before placing the order.",
          code: "DELIVERY_QUOTE_STALE",
        }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      payload.p_delivery_quote = currentQuote;
      payload.p_delivery_fee = Number((currentQuote as Record<string, unknown>).price);
      payload.p_delivery_address = address;
      payload.p_city = city;
      payload.p_province = province;
      payload.p_postal_code = postalCode;
    }

    const rpc = await fetch(supabaseUrl + "/rest/v1/rpc/create_store_order_v2", {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify(payload),
    });

    const text = await rpc.text();
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = { error: text }; }

    return new Response(JSON.stringify(data), { status: rpc.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Checkout request failed." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
