import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    if (!Array.isArray(payload.p_items) || payload.p_items.length === 0) throw new Error("Cart is empty.");
    if (payload.p_items.length > 100) throw new Error("Too many cart items.");

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
      if (!Number.isFinite(deliveryFee) || deliveryFee !== 0 || payload.p_delivery_quote != null) {
        throw new Error("Pickup must have a zero delivery fee and no delivery quote.");
      }
    } else {
      const quote = payload.p_delivery_quote as Record<string, unknown> | null;
      const token = typeof quote?.quote_token === "string" ? quote.quote_token : "";
      const quoteSecret = Deno.env.get("DELIVERY_QUOTE_SIGNING_SECRET");
      if (!quote || quote.live !== true || !token || !quoteSecret || quoteSecret.length < 32) {
        return new Response(JSON.stringify({ error: "A secure, current delivery quotation is required. Please request a new quote.", code: "DELIVERY_QUOTE_REQUIRED" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const parts = token.split(".");
      if (parts.length !== 2) throw new Error("Invalid delivery quote token.");
      const decode = (part: string) => {
        const normal = part.replace(/-/g, "+").replace(/_/g, "/");
        const padded = normal + "=".repeat((4 - normal.length % 4) % 4);
        return Uint8Array.from(atob(padded), c => c.charCodeAt(0));
      };
      const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(quoteSecret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
      const validSignature = await crypto.subtle.verify("HMAC", key, decode(parts[1]), new TextEncoder().encode(parts[0]));
      if (!validSignature) throw new Error("Delivery quote signature is invalid.");
      const claims = JSON.parse(new TextDecoder().decode(decode(parts[0]))) as Record<string, unknown>;
      const norm = (value: unknown) => String(value ?? "").normalize("NFKC").trim().replace(/\\s+/g, " ").toLowerCase();
      const digest = async (value: string) => {
        const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
        return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, "0")).join("");
      };
      const cartQuantities = new Map<string, number>();
      for (const item of items) {
        const sku = String(item.public_sku ?? item.sku ?? "").trim().toUpperCase();
        const qty = Number(item.quantity ?? item.qty);
        if (!/^GW-[A-Z0-9]{8}$/.test(sku) || !Number.isInteger(qty) || qty < 1 || qty > 100) throw new Error("Invalid cart item for delivery quote.");
        cartQuantities.set(sku, (cartQuantities.get(sku) || 0) + qty);
      }
      const cartCanonical = [...cartQuantities.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([sku, qty]) => sku + ":" + qty).join("|");
      const dest = [payload.p_delivery_address, payload.p_city, payload.p_province, payload.p_postal_code].map(norm).join("|");
      const [cartHash, destinationHash] = await Promise.all([digest(cartCanonical), digest(dest)]);
      const quotePrice = Number(quote.price);
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
      const parcel = claims.parcel as Record<string, unknown> | null;
      const parcelMatches = !!parcel &&
        Math.abs(Number(parcel.weight_kg) - Number(verifiedWeight.toFixed(3))) < 0.001 &&
        Number(parcel.length_cm) === verifiedLength && Number(parcel.width_cm) === verifiedWidth && Number(parcel.height_cm) === verifiedHeight;
      if (!parcelMatches) throw new Error("Delivery quote parcel dimensions do not match current product data. Request a fresh quote.");
      if (claims.v !== 1 || !Number.isFinite(Number(claims.expires_at)) || Number(claims.expires_at) <= Date.now() ||
          Number(claims.issued_at) > Date.now() + 30000 || Number(claims.expires_at) - Number(claims.issued_at) > 10 * 60 * 1000 ||
          claims.cart_hash !== cartHash || claims.destination_hash !== destinationHash ||
          typeof claims.provider !== "string" || typeof claims.service !== "string" || claims.currency !== "ZAR" ||
          !Number.isFinite(Number(claims.price)) || Number(claims.price) <= 0 ||
          quote.provider !== claims.provider || quote.service !== claims.service || String(quote.currency).toUpperCase() !== "ZAR" ||
          quotePrice !== Number(claims.price) || deliveryFee !== Number(claims.price)) {
        throw new Error("Delivery quotation is expired, altered, or does not match this address/cart. Request a fresh quote.");
      }
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
