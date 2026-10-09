import { withSupabase } from "npm:@supabase/server@1";

const SOURCES = [
  { base: "https://cdn.jsdelivr.net/gh/getwiredautoworx-max/get-wired-autoworx-store@main/assets/products_webp/", extension: ".webp", type: "image/webp" },
  { base: "https://raw.githubusercontent.com/getwiredautoworx-max/get-wired-autoworx-store/main/assets/products_webp/", extension: ".webp", type: "image/webp" },
  { base: "https://cdn.jsdelivr.net/gh/getwiredautoworx-max/get-wired-autoworx-store@main/assets/products/", extension: ".jpg", type: "image/jpeg" },
  { base: "https://raw.githubusercontent.com/getwiredautoworx-max/get-wired-autoworx-store/main/assets/products/", extension: ".jpg", type: "image/jpeg" }
];

function headers(type="image/jpeg") {
  return {
    "Content-Type": type,
    "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff"
  };
}

export default {
  fetch: withSupabase({ auth: "none" }, async (req, ctx) => {
    if (req.method !== "GET" && req.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
    const requestedSku = (new URL(req.url).searchParams.get("sku") || "").trim();
    if (!requestedSku || !/^[A-Za-z0-9._-]+$/.test(requestedSku)) return new Response("Invalid product SKU", { status: 400 });

    let { data: product, error } = await ctx.supabaseAdmin.from("products")
      .select("id,sku,public_sku,active").eq("public_sku", requestedSku).maybeSingle();
    if (!product && !error) {
      const fallback = await ctx.supabaseAdmin.from("products")
        .select("id,sku,public_sku,active").eq("sku", requestedSku).maybeSingle();
      product = fallback.data; error = fallback.error;
    }
    if (error || !product || !product.active) return new Response("Image not found", { status: 404 });

    const { data: mapping, error: mapError } = await ctx.supabaseAdmin.schema("gw_private")
      .from("product_supplier_codes").select("supplier_sku").eq("product_id", product.id).limit(1).maybeSingle();
    if (mapError || !mapping?.supplier_sku) return new Response("Image not found", { status: 404 });

    const sourceSku = String(mapping.supplier_sku).replace(/[\\/]/g, "_");
    if (!/^[A-Za-z0-9._-]+$/.test(sourceSku)) return new Response("Image not found", { status: 404 });

    // Prefer compressed exact-SKU WebP assets when the bounded image-sync job
    // has published them; retain the existing JPG set as a safe fallback.
    // Each upstream request is bounded so a missing image cannot hang a request.
    for (const source of SOURCES) {
      try {
        const upstream = await fetch(
          source.base + encodeURIComponent(
            (source.extension === ".webp" ? requestedSku : sourceSku).replace(/[\\\\/]/g, "_")
          ) + source.extension,
          { method: req.method, redirect: "follow", signal: AbortSignal.timeout(7000) }
        );
        if (upstream.ok) {
          const h = headers(source.type);
          if (req.method === "HEAD") return new Response(null, { status: 200, headers: h });
          return new Response(upstream.body, { status: 200, headers: h });
        }
      } catch (_) {}
    }
    return new Response("Image not found", { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });
  })
};