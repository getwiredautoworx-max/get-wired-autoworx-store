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

    const allowed = ["p_customer_name","p_customer_email","p_customer_phone","p_delivery_address","p_city","p_province","p_postal_code","p_delivery_fee","p_payment_method","p_notes","p_items","p_delivery_method"];
    const payload: Record<string, unknown> = {};
    for (const key of allowed) payload[key] = body[key];

    if (typeof payload.p_customer_name !== "string" || payload.p_customer_name.trim().length < 2) throw new Error("Customer name is required.");
    if (!Array.isArray(payload.p_items) || payload.p_items.length === 0) throw new Error("Cart is empty.");
    if (payload.p_items.length > 100) throw new Error("Too many cart items.");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const secret = Deno.env.get("SUPABASE_SECRET_KEYS") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !secret) throw new Error("Checkout service is not configured.");

    // Only products with an explicitly verified current selling price may enter paid checkout.
    // The RPC is service_role-only, so this server-side gate cannot be bypassed by the public client.
    const items = payload.p_items as Array<Record<string, unknown>>;
    const publicSkus = [...new Set(items.map(item => String(item.public_sku ?? item.sku ?? "").trim()).filter(Boolean))];
    if (!items.length || items.length > 100 || items.some(item => !String(item.public_sku ?? item.sku ?? "").trim()) || !publicSkus.length) {
      throw new Error("Every cart item must have a valid public SKU.");
    }
    const productsUrl = new URL(supabaseUrl + "/rest/v1/products");
    productsUrl.searchParams.set("select", "public_sku,active,specifications");
    productsUrl.searchParams.set("public_sku", "in.(" + publicSkus.join(",") + ")");
    productsUrl.searchParams.set("active", "eq.true");
    const productCheck = await fetch(productsUrl, {
      headers: { apikey: secret, Authorization: "Bearer " + secret },
    });
    if (!productCheck.ok) throw new Error("Unable to verify current product prices. Please try again.");
    const verifiedRows = await productCheck.json();
    const verifiedSkus = new Set(
      verifiedRows
        .filter((product: Record<string, unknown>) =>
          product.active === true &&
          (product.specifications as Record<string, unknown> | null)?.price_status === "VERIFIED_PRICE"
        )
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

    const rpc = await fetch(supabaseUrl + "/rest/v1/rpc/create_store_order", {
      method: "POST",
      headers: { apikey: secret, Authorization: "Bearer " + secret, "Content-Type": "application/json" },
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
