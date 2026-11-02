import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  consumeDurableRateLimit,
  hashClientIp,
  isAllowedOrigin,
  readJsonLimited,
  validateImagePayload
} from "./security.js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://ojytykqpvonxvepprgbh.supabase.co";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const MODEL = Deno.env.get("OPENAI_VISION_MODEL") || "gpt-4.1-mini";
const json = (body: unknown, status = 200, origin = "") => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...(origin ? { "access-control-allow-origin": origin } : {}),
    "access-control-allow-headers": "authorization, apikey, content-type, x-client-info",
    "access-control-allow-methods": "POST, OPTIONS",
    "vary": "Origin",
    "x-content-type-options": "nosniff"
  }
});
const clean = (v: unknown, max = 160) => String(v ?? "").replace(/[<>\u0000-\u001f]/g, " ").trim().slice(0, max);
const tokens = (s: string) => [...new Set(s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(/[a-z0-9]{3,}/g) || [])]
  .filter(t => !["the", "and", "for", "with", "from", "part", "vehicle", "automotive", "possibly", "likely"].includes(t));

function getServiceKey() {
  const direct = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (direct) return direct;
  try {
    const secretEnv = Deno.env.get("SUPABASE_SECRET_KEYS") || "";
    const parsed = JSON.parse(secretEnv);
    return typeof parsed.default === "string" ? parsed.default : "";
  } catch {
    return "";
  }
}

Deno.serve(async (req: Request) => {
  const requestOrigin = req.headers.get("origin") || "";
  if (req.method === "OPTIONS") {
    if (!isAllowedOrigin(requestOrigin)) return new Response(null, { status: 403, headers: { "vary": "Origin" } });
    return new Response(null, { status: 204, headers: {
      "access-control-allow-origin": requestOrigin,
      "access-control-allow-headers": "authorization, apikey, content-type, x-client-info",
      "access-control-allow-methods": "POST, OPTIONS",
      "vary": "Origin"
    }});
  }
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);
  if (!isAllowedOrigin(requestOrigin)) return json({ error: "Origin not allowed." }, 403);

  // Fail closed if either paid inference or shared abuse-control credentials are absent.
  if (!OPENAI_API_KEY) return json({ error: "AI picture search is not configured yet. Please use Request a Part." }, 503, requestOrigin);
  const serviceKey = getServiceKey();
  if (!serviceKey) return json({ error: "Picture search protection is not configured yet. Please use Request a Part." }, 503, requestOrigin);

  let body: any;
  try {
    body = await readJsonLimited(req);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const status = message.includes("too large") ? 413 : message.includes("JSON request") ? 415 : 400;
    return json({ error: message || "The image request is invalid." }, status, requestOrigin);
  }

  const base64 = body?.image_base64;
  const mime = body?.mime_type;
  const image = validateImagePayload(base64, mime);
  if (!image.ok) return json({ error: image.error }, 400, requestOrigin);

  // Only trust the platform-supplied client address. Never accept a caller-
  // supplied X-Forwarded-For value as the durable identity key.
  const clientIp = req.headers.get("cf-connecting-ip") || "";
  if (!clientIp) return json({ error: "Picture search is temporarily unavailable. Please use Request a Part." }, 503, requestOrigin);

  const db = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  try {
    const keyHash = await hashClientIp(clientIp, serviceKey);
    const limit = await consumeDurableRateLimit(db, keyHash);
    if (!limit.allowed) {
      return json({ error: "Picture-search limit reached. Please try again in a minute or use Request a Part." }, 429, requestOrigin);
    }
  } catch (error) {
    console.error("Picture-search shared rate limiter unavailable", error instanceof Error ? error.message : "unknown error");
    return json({ error: "Picture search is temporarily unavailable. Please use Request a Part." }, 503, requestOrigin);
  }

  const visionPrompt = `Identify the visible automotive/electrical/accessory/marine/tool part in this photo for a South African parts shop. Do not guess an exact vehicle fitment from appearance alone. Read visible labels or numbers if legible. Return JSON only with this shape: {"part_name":"short likely generic name","part_type":"category","keywords":["specific searchable terms"],"visible_text":["readable brand or part number"],"vehicle_hint":"only if clearly supported, otherwise empty","confidence":"high|medium|low","notes":"brief uncertainty or useful distinguishing detail"}. If unclear, say so and suggest what extra angle or measurement is needed. Never invent a part number.`;
  let identification: any;
  try {
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
      console.error("OpenAI image analysis failed", aiResponse.status);
      if (aiResponse.status === 401 || aiResponse.status === 403) return json({ error: "AI provider authentication failed. Please contact the store administrator." }, 502, requestOrigin);
      if (aiResponse.status === 429) return json({ error: "AI picture search is temporarily busy or its usage limit has been reached. Please try later." }, 429, requestOrigin);
      return json({ error: "The image could not be analysed right now. Please try again or use Request a Part." }, 502, requestOrigin);
    }
    const ai = await aiResponse.json();
    try { identification = JSON.parse(ai.choices?.[0]?.message?.content || "{}"); }
    catch { return json({ error: "The image analysis returned an unreadable result. Please try another photo." }, 502, requestOrigin); }
  } catch (error) {
    console.error("OpenAI image analysis timed out or failed", error instanceof Error ? error.message : "unknown error");
    return json({ error: "The image could not be analysed right now. Please try again or use Request a Part." }, 502, requestOrigin);
  }

  identification = {
    part_name: clean(identification.part_name, 120) || "Part not confidently identified",
    part_type: clean(identification.part_type, 80),
    keywords: Array.isArray(identification.keywords) ? identification.keywords.map((x: unknown) => clean(x, 60)).filter(Boolean).slice(0, 10) : [],
    visible_text: Array.isArray(identification.visible_text) ? identification.visible_text.map((x: unknown) => clean(x, 60)).filter(Boolean).slice(0, 5) : [],
    vehicle_hint: clean(identification.vehicle_hint, 100),
    confidence: ["high", "medium", "low"].includes(identification.confidence) ? identification.confidence : "low",
    notes: clean(identification.notes, 240)
  };

  try {
    let products: any[] = [];
    for (let offset = 0; offset < 5000; offset += 1000) {
      const { data: batch, error } = await db.from("products")
        .select("id,name,public_sku,description,price,stock_quantity,image_url,compatible_vehicles,specifications")
        .eq("active", true).range(offset, offset + 999);
      if (error) {
        console.error("Catalogue lookup failed", error.message);
        return json({ error: "The catalogue could not be searched. Please use Request a Part." }, 502, requestOrigin);
      }
      products = products.concat(batch || []);
      if (!batch || batch.length < 1000) break;
    }

    const searchTerms = tokens([
      identification.part_name, identification.part_type, identification.vehicle_hint,
      ...identification.keywords, ...identification.visible_text
    ].join(" "));
    const scored = products.map((p: any) => {
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
    return json({ ok: true, model: MODEL, identification, matches, disclaimer: "AI suggestions are not a guarantee of exact identity, fitment, stock or availability." }, 200, requestOrigin);
  } catch (error) {
    console.error("Catalogue matching failed", error instanceof Error ? error.message : "unknown error");
    return json({ error: "The catalogue could not be searched. Please use Request a Part." }, 502, requestOrigin);
  }
});
