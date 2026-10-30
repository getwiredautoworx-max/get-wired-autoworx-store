import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { cartCanonical, validateBoundQuote, validatePickup, type QuoteItem } from "../_shared/delivery-quote.ts";
import { validateCustomerSession } from "../_shared/customer-auth.ts";

const POLICY_VERSION = "GW-TERMS-RETURNS-PRIVACY-2026-10-30";

export function buildDirectEftInstructions(
  getEnv: (name: string) => string | undefined,
  order: Record<string, unknown>,
) {
  const fields = {
    bank_name: getEnv("DIRECT_EFT_BANK_NAME")?.trim() || "",
    account_name: getEnv("DIRECT_EFT_ACCOUNT_NAME")?.trim() || "",
    account_number: getEnv("DIRECT_EFT_ACCOUNT_NUMBER")?.trim() || "",
    branch_code: getEnv("DIRECT_EFT_BRANCH_CODE")?.trim() || "",
    account_type: getEnv("DIRECT_EFT_ACCOUNT_TYPE")?.trim() || "",
  };
  const orderReference = String(order.order_number ?? order.order_id ?? "").trim();
  if (Object.values(fields).some(value => !value) || !orderReference) return null;
  return {
    ...fields,
    payment_reference: `GW-${orderReference}`,
    reference_instructions: "Use this exact reference when making your EFT payment.",
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export async function handleRequest(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") throw new Error("Invalid order request.");

    const allowed = ["p_customer_name","p_customer_email","p_customer_phone","p_delivery_address","p_city","p_province","p_postal_code","p_delivery_fee","p_payment_method","p_notes","p_items","p_delivery_method","p_delivery_quote","p_terms_accepted"];
    const payload: Record<string, unknown> = {};
    for (const key of allowed) payload[key] = body[key];

    if (typeof payload.p_customer_name !== "string" || payload.p_customer_name.trim().length < 2) throw new Error("Customer name is required.");
    if (!Array.isArray(payload.p_items) || payload.p_items.length === 0) throw new Error("Cart is empty.");
    if (payload.p_items.length > 100) throw new Error("Too many cart items.");
    if (payload.p_terms_accepted !== true) return new Response(JSON.stringify({ error: "Please accept the Terms & Conditions, Returns & Refunds Policy and Privacy Policy before checkout.", code: "POLICY_ACKNOWLEDGEMENT_REQUIRED" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    // Keep the checked acknowledgement in the server-to-server payload for the atomic audit RPC.

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const publicApiKey = Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || "";
    const session = await validateCustomerSession(supabaseUrl || "", publicApiKey, req.headers.get("Authorization") || "");
    if (!session.ok) return new Response(JSON.stringify({ error: session.message, code: session.code }), { status: session.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    payload.p_customer_email = session.user.email;
    payload.p_customer_user_id = session.user.id;
    payload.p_policy_version = POLICY_VERSION;
    let secret: string | null = null;
    let usesSecretApiKey = false;
    const secretKeysEnv = Deno.env.get("SUPABASE_SECRET_KEYS");
    if (secretKeysEnv) {
      try {
        const parsed = JSON.parse(secretKeysEnv);
        if (typeof parsed === "string") secret = parsed;
        else if (parsed && typeof parsed.default === "string") secret = parsed.default;
      } catch {
        // Support a plain secret value if the runtime exposes one rather than the documented JSON object.
        secret = secretKeysEnv;
      }
      usesSecretApiKey = Boolean(secret);
    }
    if (!secret) secret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || null;
    if (!supabaseUrl || !secret) throw new Error("Checkout service is not configured.");

    // New sb_secret keys are sent in apikey only; legacy service-role JWTs also use Authorization.
    const adminHeaders: Record<string, string> = {
      apikey: secret,
      "Content-Type": "application/json",
    };
    if (!usesSecretApiKey) adminHeaders.Authorization = "Bearer " + secret;

    // Only products with an explicitly verified current selling price may enter paid checkout.
    // The RPC is service_role-only, so this server-side gate cannot be bypassed by the public client.
    const items = payload.p_items as Array<Record<string, unknown>>;
    const publicSkus = [...new Set(items.map(item => String(item.public_sku ?? item.sku ?? "").trim()).filter(Boolean))];
    if (!items.length || items.length > 100 || items.some(item => !/^GW-[A-Z0-9]{8}$/.test(String(item.public_sku ?? item.sku ?? "").trim())) || !publicSkus.length) {
      throw new Error("Every cart item must have a valid public SKU.");
    }
    const productsUrl = new URL(supabaseUrl + "/rest/v1/products");
    productsUrl.searchParams.set("select", "public_sku,active,specifications,price,cost_price,weight_kg,length_cm,width_cm,height_cm");
    productsUrl.searchParams.set("public_sku", "in.(" + publicSkus.join(",") + ")");
    productsUrl.searchParams.set("active", "eq.true");
    const productCheck = await fetch(productsUrl, {
      headers: adminHeaders,
    });
    if (!productCheck.ok) throw new Error("Unable to verify current product prices. Please try again.");
    const verifiedRows = await productCheck.json();
    const verifiedSkus = new Set(
      verifiedRows
        .filter((product: Record<string, unknown>) => {
          const spec = product.specifications as Record<string, unknown> | null;
          const price = Number(product.price), cost = Number(product.cost_price);
          const expected = Math.round(cost * 1.15 * 1.35 * 100) / 100;
          return product.active === true && spec?.price_status !== "QUOTE_REQUIRED" &&
            Number.isFinite(price) && price > 0 && Number.isFinite(cost) && cost > 0 &&
            Math.abs(price - expected) < 0.011;
        })
        .map((product: Record<string, unknown>) => String(product.public_sku))
    );
    const blockedSkus = publicSkus.filter(sku => !verifiedSkus.has(sku));
    if (blockedSkus.length) {
      return new Response(JSON.stringify({
        error: "Current selling price confirmation is required for one or more cart items. Request a quote before ordering.",
        code: "PRICE_CONFIRMATION_REQUIRED",
        public_skus: blockedSkus,
      }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }


    // Delivery rates must carry a short-lived HMAC token minted by shipping-quote.
    // Never trust browser-supplied live=true, price, or matching delivery fee on its own.
    const deliveryMethod = String(payload.p_delivery_method || "delivery").toLowerCase();
    const deliveryFee = Number(payload.p_delivery_fee);
    if (deliveryMethod === "pickup") {
      validatePickup(deliveryFee, payload.p_delivery_quote);
    } else {
      const quote = payload.p_delivery_quote as Record<string, unknown> | null;
      const token = typeof quote?.quote_token === "string" ? quote.quote_token : "";
      const quoteSecret = Deno.env.get("DELIVERY_QUOTE_SIGNING_SECRET");
      if (!quote || quote.live !== true || !token || !quoteSecret || quoteSecret.length < 32) {
        return new Response(JSON.stringify({ error: "A secure, current delivery quotation is required. Please request a new quote.", code: "DELIVERY_QUOTE_REQUIRED" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const cartQuantities = new Map<string, number>();
      // Shared canonicalization enforces the same SKU/quantity rules used when the quote was issued.
      cartCanonical(items as QuoteItem[]);
      for (const item of items) {
        const sku = String(item.public_sku ?? item.sku ?? "").trim().toUpperCase();
        const qty = Number(item.quantity ?? item.qty);
        cartQuantities.set(sku, (cartQuantities.get(sku) || 0) + qty);
      }
      const productsBySku = new Map((verifiedRows as Array<Record<string, unknown>>).map(product => [String(product.public_sku), product]));
      let verifiedWeight = 0, verifiedLength = 0, verifiedWidth = 0, verifiedHeight = 0;
      for (const [sku, qty] of cartQuantities) {
        const product = productsBySku.get(sku);
        const w = Number(product?.weight_kg), l = Number(product?.length_cm), wi = Number(product?.width_cm), h = Number(product?.height_cm);
        if (!product || ![w, l, wi, h].every(Number.isFinite) || w <= 0 || l <= 0 || wi <= 0 || h <= 0) {
          throw new Error("Verified parcel dimensions are missing or changed; request a fresh manual delivery quotation.");
        }
        verifiedWeight += w * qty; verifiedLength = Math.max(verifiedLength, l); verifiedWidth = Math.max(verifiedWidth, wi); verifiedHeight = Math.max(verifiedHeight, h);
      }
      const dest = {
        p_delivery_address: payload.p_delivery_address, p_city: payload.p_city,
        p_province: payload.p_province, p_postal_code: payload.p_postal_code,
      };
      await validateBoundQuote({
        quote, token, secret: quoteSecret, items: items as QuoteItem[], destination: dest, deliveryFee,
        parcel: { weight_kg: Number(verifiedWeight.toFixed(3)), length_cm: verifiedLength, width_cm: verifiedWidth, height_cm: verifiedHeight },
      });
    }

    const rpc = await fetch(supabaseUrl + "/rest/v1/rpc/create_store_order_v3", {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify({ p_order_payload: payload, p_policy_version: POLICY_VERSION, p_customer_user_id: session.user.id }),
    });

    const text = await rpc.text();
    let data: unknown;
    try { data = JSON.parse(text); } catch { data = { error: text }; }

    if (rpc.ok && payload.p_payment_method === "direct_eft" && data && typeof data === "object" && !Array.isArray(data)) {
      const instructions = buildDirectEftInstructions((name) => Deno.env.get(name), data as Record<string, unknown>);
      if (instructions) data = { ...(data as Record<string, unknown>), payment_instructions: instructions };
    }

    return new Response(JSON.stringify(data), { status: rpc.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Checkout request failed." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
}

if (import.meta.main) Deno.serve(handleRequest);
