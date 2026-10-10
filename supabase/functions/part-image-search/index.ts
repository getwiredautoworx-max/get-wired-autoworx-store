import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://ojytykqpvonxvepprgbh.supabase.co";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const MODEL = Deno.env.get("OPENAI_VISION_MODEL") || "gpt-4.1-mini";
const ALLOWED_ORIGINS = new Set([
  "https://getwiredauto.co.za",
  "https://www.getwiredauto.co.za",
  "https://get-wired-autoworx-store.netlify.app",
  "https://get-wired-autoworx-store.pages.dev"
]);
const rate = new Map<string, { count: number; reset: number }>();
const json = (body: unknown, status = 200, origin = "") => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": origin,
    "access-control-allow-headers": "authorization, apikey, content-type, x-client-info",
    "access-control-allow-methods": "POST, OPTIONS",
    "vary": "Origin",
    "x-content-type-options": "nosniff"
  }
});
const clean = (v: unknown, max = 160) => String(v ?? "").replace(/[<>\u0000-\u001f]/g, " ").trim().slice(0, max);
const tokens = (s: string) => [...new Set(s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]{3,}/g) || [])]
  .filter(t => !["the", "and", "for", "with", "from", "part", "vehicle", "automotive", "possibly", "likely"].includes(t));

Deno.serve(async (req: Request) => {
  const requestOrigin = req.headers.get("origin") || "";
  const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : "https://www.getwiredauto.co.za";
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: {
    "access-control-allow-origin": origin,
    "access-control-allow-headers": "authorization, apikey, content-type, x-client-info",
    "access-control-allow-methods": "POST, OPTIONS",
    "vary": "Origin"
  }});
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405, origin);
  if (requestOrigin && !ALLOWED_ORIGINS.has(requestOrigin)) return json({ error: "Origin not allowed." }, 403, origin);

  const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = rate.get(ip);
  if (current && current.reset > now && current.count >= 8) return json({ error: "Picture-search limit reached. Please try again in a minute or use Request a Part." }, 429, origin);
  rate.set(ip, !current || current.reset <= now ? { count: 1, reset: now + 60_000 } : { count: current.count + 1, reset: current.reset });
  if (rate.size > 5000) for (const [key, value] of rate) if (value.reset <= now) rate.delete(key);

  if (!OPENAI_API_KEY) return json({ error: "AI picture search is not configured yet. The store administrator must add the OPENAI_API_KEY secret before this feature can run. You can still use Request a Part." }, 503, origin);

  try {
    const body = await req.json();
    const base64 = String(body?.image_base64 || "");
    const mime = String(body?.mime_type || "");
    if (!["image/jpeg", "image/png", "image/webp"].includes(mime)) return json({ error: "Upload a JPG, PNG or WebP photo." }, 400, origin);
    if (!base64 || base64.length > 5_600_000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) return json({ error: "Image is empty or too large. Use a photo under 4 MB." }, 400, origin);

    const visionPrompt = `Identify the visible automotive/electrical/accessory/marine/tool part in this photo for a South African parts shop. Do not guess an exact vehicle fitment from appearance alone. Read visible labels or numbers if legible. Return JSON only with this shape: {"part_name":"short likely generic name","part_type":"category","keywords":["specific searchable terms"],"visible_text":["readable brand or part number"],"vehicle_hint":"only if clearly supported, otherwise empty","confidence":"high|medium|low","notes":"brief uncertainty or useful distinguishing detail"}. If unclear, say so and suggest what extra angle or measurement is needed. Never invent a part number.`;
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "authorization": "Bearer " + OPENAI_API_KEY, "content-type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.1,
        max_tokens: 450,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You identify physical automotive and electrical parts cautiously. Output valid JSON only." },
          { role: "user", content: [
            { type: "text", text: visionPrompt },
            { type: "image_url", image_url: { url: "data:" + mime + ";base64," + base64, detail: "high" } }
          ]}
        ]
      }),
      signal: AbortSignal.timeout(25_000)
    });
    if (!aiResponse.ok) {
      const upstreamText = await aiResponse.text();
      console.error("OpenAI image analysis failed", aiResponse.status, upstreamText.slice(0, 500));
      if (aiResponse.status === 401 || aiResponse.status === 403) return json({ error: "AI provider authentication failed. Please contact the store administrator." }, 502, origin);
      if (aiResponse.status === 429) return json({ error: "AI picture search is temporarily busy or its usage limit has been reached. Please try later." }, 429, origin);
      return json({ error: "The image could not be analysed right now. Please try again or use Request a Part." }, 502, origin);
    }
    const ai = await aiResponse.json();
    let identification: any;
    try { identification = JSON.parse(ai.choices?.[0]?.message?.content || "{}"); }
    catch { return json({ error: "The image analysis returned an unreadable result. Please try another photo." }, 502, origin); }
    identification = {
      part_name: clean(identification.part_name, 120) || "Part not confidently identified",
      part_type: clean(identification.part_type, 80),
      keywords: Array.isArray(identification.keywords) ? identification.keywords.map((x: unknown) => clean(x, 60)).filter(Boolean).slice(0, 10) : [],
      visible_text: Array.isArray(identification.visible_text) ? identification.visible_text.map((x: unknown) => clean(x, 60)).filter(Boolean).slice(0, 5) : [],
      vehicle_hint: clean(identification.vehicle_hint, 100),
      confidence: ["high", "medium", "low"].includes(identification.confidence) ? identification.confidence : "low",
      notes: clean(identification.notes, 240)
    };

    const secretEnv = Deno.env.get("SUPABASE_SECRET_KEYS");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || (secretEnv ? (JSON.parse(secretEnv).default || "") : "");
    if (!serviceKey) {
      console.error("Supabase secret key missing for catalogue matching");
      return json({ error: "Catalogue matching is not configured yet. Please use Request a Part." }, 503, origin);
    }
    const db = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: products, error } = await db.from("products")
      .select("id,name,public_sku,description,price,stock_quantity,image_url,compatible_vehicles,specifications")
      .eq("active", true).limit(5000);
    if (error) {
      console.error("Catalogue lookup failed", error.message);
      return json({ error: "The catalogue could not be searched. Please use Request a Part." }, 502, origin);
    }

    const searchTerms = tokens([
      identification.part_name, identification.part_type, identification.vehicle_hint,
      ...identification.keywords, ...identification.visible_text
    ].join(" "));
    const scored = (products || []).map((p: any) => {
      const searchable = [
        p.name, p.public_sku, p.description, p.compatible_vehicles, p.specifications
      ].map((v: unknown) => typeof v === "object" ? JSON.stringify(v) : String(v ?? "")).join(" ");
      const productTerms = new Set(tokens(searchable));
      let score = 0;
      for (const term of searchTerms) if (productTerms.has(term)) score += term.length >= 7 ? 3 : 2;
      const nameTerms = new Set(tokens(String(p.name || "")));
      for (const term of tokens(identification.part_name)) if (nameTerms.has(term)) score += 4;
      for (const term of tokens(identification.visible_text.join(" "))) if (productTerms.has(term)) score += 5;
      if (identification.vehicle_hint && searchable.toLowerCase().includes(identification.vehicle_hint.toLowerCase())) score += 4;
      return { p, score };
    }).filter((x: any) => x.score >= 3).sort((a: any, b: any) => b.score - a.score).slice(0, 8);

    const topScore = scored[0]?.score || 0;
    const matches = scored.map((x: any) => ({
      id: x.p.id,
      name: x.p.name,
      public_sku: x.p.public_sku,
      price: x.p.price,
      stock_quantity: x.p.stock_quantity,
      image_url: x.p.image_url,
      match_label: x.score >= Math.max(10, topScore * 0.75) ? "Closer catalogue match" : "Possible match"
    }));
    return json({ ok: true, model: MODEL, identification, matches, disclaimer: "AI suggestions are not a guarantee of exact identity, fitment, stock or availability." }, 200, origin);
  } catch (error) {
    console.error("part-image-search failed", error instanceof Error ? error.message : String(error));
    return json({ error: "Picture search failed unexpectedly. Please try again or use Request a Part." }, 500, origin);
  }
});
