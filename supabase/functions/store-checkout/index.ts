import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function createStoreCheckoutHandler(deps: { fetchImpl?: typeof fetch; getEnv?: (name: string) => string | undefined } = {}) {
  const fetcher = deps.fetchImpl ?? fetch;
  const getEnv = deps.getEnv ?? ((name: string) => Deno.env.get(name));
  return async (req: Request) => {
    if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    try {
      const body = await req.json();
      if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid order request.");

      // Authentication is verified by Supabase Auth, not by a client-supplied user ID.
      // Never permit the service-role order RPC to be reached by an anonymous browser request.
      const authorization = req.headers.get("Authorization") || req.headers.get("authorization") || "";
      const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
      const supabaseUrl = getEnv("SUPABASE_URL");
      const publicApiKey = req.headers.get("apikey") || "";
      if (!bearer || !supabaseUrl || !publicApiKey) {
        return new Response(JSON.stringify({ error: "Sign in to your customer account before checkout.", code: "AUTH_REQUIRED" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const authCheck = await fetcher(supabaseUrl + "/auth/v1/user", {
        headers: { apikey: publicApiKey, Authorization: "Bearer " + bearer },
      });
      if (!authCheck.ok) {
        return new Response(JSON.stringify({ error: "Your customer session is invalid or expired. Please sign in again.", code: "AUTH_REQUIRED" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      const authUser = await authCheck.json();
      if (!authUser || typeof authUser.id !== "string" || !authUser.id || typeof authUser.email !== "string" || !authUser.email) {
        return new Response(JSON.stringify({ error: "A verified customer account with an email address is required.", code: "AUTH_REQUIRED" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const allowed = ["p_customer_name","p_customer_email","p_customer_phone","p_delivery_address","p_city","p_province","p_postal_code","p_delivery_fee","p_payment_method","p_notes","p_items","p_delivery_method","p_delivery_quote"];
      const payload: Record<string, unknown> = {};
      for (const key of allowed) payload[key] = body[key];

      if (typeof payload.p_customer_name !== "string" || payload.p_customer_name.trim().length < 2) throw new Error("Customer name is required.");
      if (!Array.isArray(payload.p_items) || payload.p_items.length === 0) throw new Error("Cart is empty.");
      if (payload.p_items.length > 100) throw new Error("Too many cart items.");

      // The order's email is derived from the verified account, not from editable form data.
      payload.p_customer_email = authUser.email;
      let secret: string | null = null;
      let usesSecretApiKey = false;
      const secretKeysEnv = getEnv("SUPABASE_SECRET_KEYS");
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
      if (!secret) secret = getEnv("SUPABASE_SERVICE_ROLE_KEY") || null;
      if (!supabaseUrl || !secret) throw new Error("Checkout service is not configured.");

      // New sb_secret keys are sent in apikey only; legacy service-role JWTs also use Authorization.
      const adminHeaders: Record<string, string> = {
        apikey: secret,
        "Content-Type": "application/json",
      };
      if (!usesSecretApiKey) adminHeaders.Authorization = "Bearer " + secret;

      // A client-side checkbox/localStorage flag is not proof. Require a durable acceptance
      // row created by the authenticated record-terms-acceptance function.
      const consentUrl = new URL(supabaseUrl + "/rest/v1/customer_terms_acceptances");
      consentUrl.searchParams.set("select", "id");
      consentUrl.searchParams.set("user_id", "eq." + authUser.id);
      consentUrl.searchParams.set("terms_version", "eq.gw-terms-2026-10-23-v1");
      consentUrl.searchParams.set("terms_sha256", "eq.7998c6a2a86d44d04fa0ca3f814840cdc1b2e0bdaefde82340253a7040efcfa3");
      consentUrl.searchParams.set("limit", "1");
      const consentCheck = await fetcher(consentUrl, { headers: adminHeaders });
      if (!consentCheck.ok) throw new Error("Unable to verify current Terms acceptance. Please retry.");
      const consentRows = await consentCheck.json();
      if (!Array.isArray(consentRows) || consentRows.length === 0) {
        return new Response(JSON.stringify({
          error: "Please review and accept the current Terms & Conditions before checkout.",
          code: "TERMS_ACCEPTANCE_REQUIRED",
        }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Bind each order to a profile linked to the verified Auth user; never accept a customer ID from the browser.
      if (typeof authUser.email !== "string" || !authUser.email) {
        return new Response(JSON.stringify({ error: "A customer account with an email address is required.", code: "CUSTOMER_EMAIL_REQUIRED" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const customerUrl = new URL(supabaseUrl + "/rest/v1/customers");
      customerUrl.searchParams.set("select", "id");
      customerUrl.searchParams.set("auth_user_id", "eq." + authUser.id);
      customerUrl.searchParams.set("limit", "1");
      const customerLookup = await fetcher(customerUrl, { headers: adminHeaders });
      if (!customerLookup.ok) throw new Error("Unable to verify your customer profile. Please try again.");
      const customerRows = await customerLookup.json();
      let customerId = Array.isArray(customerRows) && customerRows.length ? customerRows[0].id : null;
      if (!customerId) {
        const profileResponse = await fetcher(supabaseUrl + "/rest/v1/customers", {
          method: "POST",
          headers: { ...adminHeaders, Prefer: "return=representation" },
          body: JSON.stringify({
            auth_user_id: authUser.id,
            name: String(payload.p_customer_name).trim(),
            email: authUser.email,
            phone: String(payload.p_customer_phone || "").trim() || null,
          }),
        });
        if (!profileResponse.ok) {
          // Concurrent first checkout can race to create the same linked profile; re-read before failing.
          const retry = await fetcher(customerUrl, { headers: adminHeaders });
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
      if (items.some(item => typeof item.quantity !== "number" || !Number.isSafeInteger(item.quantity) || item.quantity < 1)) {
        throw new Error("Every cart item must have a positive whole-number quantity.");
      }
      const publicSkus = [...new Set(items.map(item => String(item.public_sku ?? item.sku ?? "").trim()).filter(Boolean))];
      if (!items.length || items.length > 100 || items.some(item => !/^GW-[A-Z0-9]{8}$/.test(String(item.public_sku ?? item.sku ?? "").trim())) || !publicSkus.length) {
        throw new Error("Every cart item must have a valid public SKU.");
      }
      const productsUrl = new URL(supabaseUrl + "/rest/v1/products");
      productsUrl.searchParams.set("select", "public_sku,active,specifications,price,cost_price");
      productsUrl.searchParams.set("public_sku", "in.(" + publicSkus.join(",") + ")");
      productsUrl.searchParams.set("active", "eq.true");
      const productCheck = await fetcher(productsUrl, {
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

      const rpc = await fetcher(supabaseUrl + "/rest/v1/rpc/create_store_order_v2", {
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
  };
}

if (import.meta.main) Deno.serve(createStoreCheckoutHandler());
