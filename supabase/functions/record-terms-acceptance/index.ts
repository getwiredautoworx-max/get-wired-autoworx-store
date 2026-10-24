import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const TERMS_VERSION = "gw-terms-2026-10-23-v1";
const TERMS_SHA256 = "7998c6a2a86d44d04fa0ca3f814840cdc1b2e0bdaefde82340253a7040efcfa3";
const TERMS_URL = "/terms-and-conditions.html";
const RETURNS_URL = "/returns-refunds.html";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getServerSecret(): { key: string; secretApiKey: boolean } | null {
  const env = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (env) {
    try {
      const parsed = JSON.parse(env);
      const key = typeof parsed === "string" ? parsed : parsed?.default;
      if (typeof key === "string" && key) return { key, secretApiKey: true };
    } catch {
      return { key: env, secretApiKey: true };
    }
  }
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  return legacy ? { key: legacy, secretApiKey: false } : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const publicKey = req.headers.get("apikey") || "";
    const bearer = (req.headers.get("authorization") || "").match(/^Bearer\s+(.+)$/i)?.[1];
    if (!supabaseUrl || !publicKey || !bearer) {
      return json({ error: "Sign in before recording customer Terms acceptance.", code: "AUTH_REQUIRED" }, 401);
    }

    const auth = await fetch(supabaseUrl + "/auth/v1/user", {
      headers: { apikey: publicKey, Authorization: "Bearer " + bearer },
    });
    if (!auth.ok) return json({ error: "Customer session is invalid or expired. Please sign in again.", code: "AUTH_REQUIRED" }, 401);
    const user = await auth.json();
    if (!user || typeof user.id !== "string" || !user.id) {
      return json({ error: "A verified customer account is required.", code: "AUTH_REQUIRED" }, 401);
    }

    const body = await req.json().catch(() => null);
    if (!body || body.terms_version !== TERMS_VERSION || body.terms_sha256 !== TERMS_SHA256 || body.accepted !== true) {
      return json({ error: "Explicit acceptance of the current Terms & Conditions version is required.", code: "TERMS_ACCEPTANCE_REQUIRED" }, 400);
    }

    const secret = getServerSecret();
    if (!secret) return json({ error: "Terms acceptance service is not configured." }, 503);
    const headers: Record<string, string> = {
      apikey: secret.key,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=representation",
    };
    if (!secret.secretApiKey) headers.Authorization = "Bearer " + secret.key;

    const response = await fetch(
      supabaseUrl + "/rest/v1/customer_terms_acceptances?on_conflict=user_id,terms_version,terms_sha256",
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          user_id: user.id,
          terms_version: TERMS_VERSION,
          terms_url: TERMS_URL,
          returns_url: RETURNS_URL,
          terms_sha256: TERMS_SHA256,
          acceptance_source: "web-checkout",
          user_agent: (req.headers.get("user-agent") || "").slice(0, 500) || null,
        }),
      },
    );
    if (!response.ok) {
      return json({ error: "Unable to securely record acceptance. Please retry before checkout." }, 503);
    }

    return json({ ok: true, terms_version: TERMS_VERSION, message: "Current Terms acceptance is recorded for this customer account." });
  } catch {
    return json({ error: "Unable to record Terms acceptance. Please retry." }, 400);
  }
});
