import { withSupabase } from "npm:@supabase/server@1";

const SOURCES = [
  "https://cdn.jsdelivr.net/gh/getwiredautoworx-max/get-wired-autoworx-store@main/assets/products/",
  "https://raw.githubusercontent.com/getwiredautoworx-max/get-wired-autoworx-store/main/assets/products/"
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

    const supplierSku = String(mapping.supplier_sku);
    // Supplier filenames replace slash characters with underscores (e.g. WP3/4 -> WP3_4.jpg).
    // Normalise before URL construction so slashes cannot become path separators.
    const sourceSku = supplierSku.replace(/[\\/]/g, "_");
    if (!/^[A-Za-z0-9._-]+$/.test(sourceSku)) return new Response("Image not found", { status: 404 });

    for (const base of SOURCES) {
      for (const ext of ["jpg","jpeg","png","webp"]) {
        try {
          const upstream = await fetch(base + encodeURIComponent(sourceSku) + "." + ext, { method: req.method, redirect: "follow" });
          if (upstream.ok) {
            const h = headers(upstream.headers.get("content-type") || "image/jpeg");
            if (req.method === "HEAD") return new Response(null, { status: 200, headers: h });
            return new Response(upstream.body, { status: 200, headers: h });
          }
        } catch (_) {}
      }
    }
    return new Response("Image not found", { status: 404, headers: { "Access-Control-Allow-Origin": "*" } });
  })
};