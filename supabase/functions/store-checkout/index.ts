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
    // Reject anonymous requests before parsing or trusting any customer-supplied identity.
    const authorization = req.headers.get("authorization") || "";
    const bearer = authorization.match(/^Bearer\\s+(.+)$/i)?.[1];
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const publicApiKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ||
      Deno.env.get("SUPABASE_ANON_KEY") || req.headers.get("apikey");
    if (!bearer || !supabaseUrl || !publicApiKey) {
      return new Response(JSON.stringify({ error: "Sign in to your customer account before checkout.", code: "AUTH_REQUIRED" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the access token with Supabase Auth; never trust a user ID supplied in the body.
    const authResponse = await fetch(supabaseUrl + "/auth/v1/user", {
      headers: { apikey: publicApiKey, Authorization: "Bearer " + bearer },
    });
    if (!authResponse.ok) {
      return new Response(JSON.stringify({ error: "Your session is invalid or expired. Please sign in again.", code: "AUTH_INVALID" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const authenticatedUser = await authResponse.json();
    if (typeof authenticatedUser?.id !== "string" || !authenticatedUser.id) {
      return new Response(JSON.stringify({ error: "A valid customer account is required.", code: "AUTH_INVALID" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    if (!body || typeof body !== "object") throw new Error("Invalid order request.");

    const allowed = ["p_customer_name","p_customer_email","p_customer_phone","p_delivery_address","p_city","p_province","p_postal_code","p_delivery_fee","p_payment_method","p_notes","p_items","p_delivery_method","p_delivery_quote"];
    const payload: Record<string, unknown> = {};
    for (const key of allowed) payload[key] = body[key];

    if (typeof payload.p_customer_name !== "string" || payload.p_customer_name.trim().length < 2) throw new Error("Customer name is required.");
    if (!Array.isArray(payload.p_items) || payload.p_items.length === 0) throw new Error("Cart is empty.");
    if (payload.p_items.length > 100) throw new Error("Too many cart items.");

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
    if (!secret) throw new Error("Checkout service is not configured.");

    // New sb_secret keys are sent in apikey only; legacy service-role JWTs also use Authorization.
    const adminHeaders: Record<string, string> = {
      apikey: secret,
      "Content-Type": "application/json",
    };
    if (!usesSecretApiKey) adminHeaders.Authorization = "Bearer " + secret;

    // Current-version Terms & Conditions acceptance is checked server-side before any order RPC.
    const termsVersion = Deno.env.get("STORE_TERMS_VERSION") || "GW-TERMS-2026-10-23-v1";
    const consentUrl = new URL(supabaseUrl + "/rest/v1/store_terms_acceptances");
    consentUrl.searchParams.set("select", "id");
    consentUrl.searchParams.set("user_id", "eq." + authenticatedUser.id);
    consentUrl.searchParams.set("terms_version", "eq." + termsVersion);
    consentUrl.searchParams.set("limit", "1");
    const consentCheck = await fetch(consentUrl, { headers: adminHeaders });
    if (!consentCheck.ok) {
      return new Response(JSON.stringify({ error: "Unable to verify Terms & Conditions acceptance. Please try again.", code: "CONSENT_CHECK_FAILED" }), {
        status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const consentRows = await consentCheck.json();
    if (!Array.isArray(consentRows) || consentRows.length === 0) {
      return new Response(JSON.stringify({ error: "Accept the current Terms & Conditions in your signed-in account before placing an order.", code: "CONSENT_REQUIRED", terms_version: termsVersion }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Bind every order to the authenticated customer profile. Never accept p_customer_id from the browser.
    if (typeof authenticatedUser.email !== "string" || !authenticatedUser.email) {
      return new Response(JSON.stringify({ error: "A customer account with an email address is required.", code: "CUSTOMER_EMAIL_REQUIRED" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    payload.p_customer_email = authenticatedUser.email;
    const customerUrl = new URL(supabaseUrl + "/rest/v1/customers");
    customerUrl.searchParams.set("select", "id");
    customerUrl.searchParams.set("auth_user_id", "eq." + authenticatedUser.id);
    customerUrl.searchParams.set("limit", "1");
    const customerLookup = await fetch(customerUrl, { headers: adminHeaders });
    if (!customerLookup.ok) throw new Error("Unable to verify your customer profile. Please try again.");
    let customerRows = await customerLookup.json();
    let customerId = Array.isArray(customerRows) && customerRows.length ? customerRows[0].id : null;
    if (!customerId) {
      const profileResponse = await fetch(supabaseUrl + "/rest/v1/customers", {
        method: "POST",
        headers: { ...adminHeaders, Prefer: "return=representation" },
        body: JSON.stringify({
          auth_user_id: authenticatedUser.id,
          name: String(payload.p_customer_name).trim(),
          email: authenticatedUser.email,
          phone: String(payload.p_customer_phone || "").trim() || null,
        }),
      });
      if (!profileResponse.ok) {
        // A simultaneous first checkout may have created the unique profile; re-read before failing.
        const retry = await fetch(customerUrl, { headers: adminHeaders });
        const retryRows = retry.ok ? await retry.json() : [];
        customerId = Array.isArray(retryRows) && retryRows.length ? retryRows[0].id : null;
        if (!customerId) throw new Error("Unable to create or verify your customer profile. Please try again.");
      } else {
        const created = await profileResponse.json();
        customerId = Array.isArray(created) && created.length ? created[0].id : null;
        if (!customerId) throw new Error("Customer profile was not returned. Please try again.");
      }
    }
    payload.p_customer_id = customerId;

    // Only products with an explicitly verified current selling price may enter paid checkout.
    // The RPC is service_role-only, so this server-side gate cannot be bypassed by the public client.
    const items = payload.p_items as Array<Record<string, unknown>>;
    const publicSkus = [...new Set(items.map(item => String(item.public_sku ?? item.sku ?? "").trim()).filter(Boolean))];
    if (!items.length || items.length > 100 || items.some(item => !/^GW-[A-Z0-9]{8}$/.test(String(item.public_sku ?? item.sku ?? "").trim())) || !publicSkus.length) {
      throw new Error("Every cart item must have a valid public SKU.");
    }
    const productsUrl = new URL(supabaseUrl + "/rest/v1/products");
    productsUrl.searchParams.set("select", "public_sku,active,specifications,price,cost_price");
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
