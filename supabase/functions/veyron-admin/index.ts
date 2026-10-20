import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const secret = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!).default;
const db = createClient(url, secret);
const json = (x: unknown, status = 200) => new Response(JSON.stringify(x), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

async function authorized(req: Request) {
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Bearer ")) return null;
  const token = h.slice(7);
  const userClient = createClient(url, Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || secret, { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data, error } = await userClient.auth.getUser(token);
  if (error || !data.user) return null;
  const { data: admin, error: ae } = await db.from("veyron_admin_users").select("user_id,role,enabled").eq("user_id", data.user.id).eq("enabled", true).maybeSingle();
  if (ae || !admin) return null;
  // This endpoint exposes inventory and cost-related operational data. Do not
  // permit lower-privilege enabled staff roles to read it through GET routes.
  if (admin.role !== "owner" && admin.role !== "admin") return null;
  return { user: data.user, admin };
}

Deno.serve(async (req) => {
  try {
    const auth = await authorized(req);
    if (!auth) return json({ ok: false, error: "Admin authorization required." }, 401);
    if (req.method !== "GET" && auth.admin.role !== "owner" && auth.admin.role !== "admin") return json({ ok: false, error: "Insufficient admin permission." }, 403);
    const u = new URL(req.url);
    if (req.method === "GET") {
      const view = u.searchParams.get("view") || "dashboard";
      if (view === "workers") {
        const { data, error } = await db.from("ai_workers").select("*").order("name");
        if (error) throw error; return json({ ok: true, workers: data || [] });
      }
      if (view === "opportunities") {
        const { data, error } = await db.from("opportunities").select("*,products(name,sku,price,cost_price,stock_quantity)").eq("status","open").order("score",{ascending:false}).limit(100);
        if (error) throw error; return json({ ok: true, opportunities: data || [] });
      }
      if (view === "categories") {
        const { data, error } = await db.from("categories")
          .select("id,name,slug,parent_id,description,active,sort_order")
          .order("sort_order").order("name").limit(1000);
        if (error) throw error;
        return json({ ok: true, categories: data || [] });
      }
      if (view === "products") {
        const q = (u.searchParams.get("query") || "").trim().slice(0, 80);
        const selectFields = "id,sku,public_sku,name,description,category_id,stock_quantity,active,featured,updated_at";
        if (q) {
          const safe = q.replace(/[%_]/g, "");
          const [bySku, byPublicSku, byName] = await Promise.all([
            db.from("products").select(selectFields).ilike("sku", `%${safe}%`).limit(100),
            db.from("products").select(selectFields).ilike("public_sku", `%${safe}%`).limit(100),
            db.from("products").select(selectFields).ilike("name", `%${safe}%`).limit(100)
          ]);
          for (const r of [bySku, byPublicSku, byName]) if (r.error) throw r.error;
          const unique = new Map();
          for (const p of [...(bySku.data || []), ...(byPublicSku.data || []), ...(byName.data || [])]) unique.set(p.id, p);
          return json({ ok: true, products: [...unique.values()].slice(0, 150) });
        }
        const { data, error } = await db.from("products").select(selectFields)
          .order("updated_at", { ascending: false }).limit(100);
        if (error) throw error;
        return json({ ok: true, products: data || [] });
      }
      const [products, tasks, opps, stock, competitors] = await Promise.all([
        db.from("products").select("id,name,sku,price,cost_price,stock_quantity,active").order("updated_at",{ascending:false}).limit(1000),
        db.from("ai_tasks").select("id,task_type,priority,status,requires_approval,created_at,completed_at").order("created_at",{ascending:false}).limit(50),
        db.from("opportunities").select("id,title,opportunity_type,score,status,created_at").eq("status","open").order("score",{ascending:false}).limit(20),
        db.from("supplier_stock").select("id,product_id,supplier_name,availability,stock_quantity,cost_ex_vat,checked_at").order("checked_at",{ascending:false}).limit(100),
        db.from("competitor_prices").select("id,product_id,competitor_name,price,condition,checked_at").order("checked_at",{ascending:false}).limit(100)
      ]);
      for (const r of [products,tasks,opps,stock,competitors]) if (r.error) throw r.error;
      return json({ ok:true, dashboard:{products:products.data||[],tasks:tasks.data||[],opportunities:opps.data||[],supplier_stock:stock.data||[],competitor_prices:competitors.data||[]} });
    }
    if (req.method === "POST") {
      const b = await req.json();
      if (b.action === "update_product") {
        const id = String(b.id || "");
        if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ ok: false, error: "Valid product ID required." }, 400);
        const name = String(b.name || "").trim();
        const categoryId = String(b.category_id || "");
        const stock = Number(b.stock_quantity);
        if (!name || name.length > 240) return json({ ok: false, error: "Product name is required (maximum 240 characters)." }, 400);
        if (!Number.isInteger(stock) || stock < 0 || stock > 10000000) return json({ ok: false, error: "Stock must be a whole number from 0 to 10,000,000." }, 400);
        if (!/^[0-9a-f-]{36}$/i.test(categoryId)) return json({ ok: false, error: "Select a valid category." }, 400);
        const { data: category, error: ce } = await db.from("categories").select("id,active").eq("id", categoryId).maybeSingle();
        if (ce) throw ce;
        if (!category || category.active !== true) return json({ ok: false, error: "Selected category is not active." }, 400);
        const { data: current, error: pe } = await db.from("products").select("id,sku,public_sku").eq("id", id).maybeSingle();
        if (pe) throw pe;
        if (!current) return json({ ok: false, error: "Product not found." }, 404);
        const slug = (name + "-" + (current.sku || current.public_sku || id.slice(0, 8)))
          .toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180);
        const patch = {
          name, slug, description: String(b.description || "").trim().slice(0, 8000) || null,
          category_id: categoryId, stock_quantity: stock, active: b.active === true,
          featured: b.featured === true, updated_at: new Date().toISOString()
        };
        const { data, error } = await db.from("products").update(patch).eq("id", id)
          .select("id,sku,public_sku,name,description,category_id,stock_quantity,active,featured,updated_at").single();
        if (error) throw error;
        await db.from("audit_log").insert({
          actor_type: "admin", actor_id: auth.user.id, action: "owner_update_product",
          resource_type: "product", resource_id: id,
          details: { fields: ["name","description","category_id","stock_quantity","active","featured"] }
        });
        return json({ ok: true, product: data });
      }
      if (b.action === "upsert_category") {
        const id = String(b.id || "").trim() || null;
        if (id && !/^[0-9a-f-]{36}$/i.test(id)) return json({ ok: false, error: "Invalid category ID." }, 400);
        const name = String(b.name || "").trim();
        if (!name || name.length > 160) return json({ ok: false, error: "Category name is required (maximum 160 characters)." }, 400);
        const slug = String(b.slug || name).toLowerCase().trim()
          .normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
        if (!slug) return json({ ok: false, error: "A valid category slug is required." }, 400);
        const parentId = String(b.parent_id || "").trim() || null;
        if (parentId && !/^[0-9a-f-]{36}$/i.test(parentId)) return json({ ok: false, error: "Invalid parent category." }, 400);
        if (parentId) {
          const { data: parent, error: parentError } = await db.from("categories").select("id,active,parent_id").eq("id", parentId).maybeSingle();
          if (parentError) throw parentError;
          if (!parent || parent.active !== true) return json({ ok: false, error: "Parent category must exist and be active." }, 400);
          const seen = new Set();
          let ancestorId = parentId;
          while (ancestorId) {
            if (ancestorId === id) return json({ ok: false, error: "A category cannot be its own ancestor." }, 400);
            if (seen.has(ancestorId)) return json({ ok: false, error: "Existing category hierarchy contains a cycle; resolve it before editing." }, 409);
            seen.add(ancestorId);
            const { data: ancestor, error: ae } = await db.from("categories").select("parent_id").eq("id", ancestorId).maybeSingle();
            if (ae) throw ae;
            ancestorId = ancestor?.parent_id || null;
          }
        }
        if (id) {
          const { data: current, error: currentError } = await db.from("categories").select("id,active").eq("id", id).maybeSingle();
          if (currentError) throw currentError;
          if (!current) return json({ ok: false, error: "Category not found." }, 404);
          if (current.active === true && b.active !== true) {
            const [productsInCategory, children] = await Promise.all([
              db.from("products").select("id", { count: "exact", head: true }).eq("category_id", id).eq("active", true),
              db.from("categories").select("id", { count: "exact", head: true }).eq("parent_id", id).eq("active", true)
            ]);
            if (productsInCategory.error) throw productsInCategory.error;
            if (children.error) throw children.error;
            if ((productsInCategory.count || 0) > 0 || (children.count || 0) > 0) {
              return json({ ok: false, error: "Move/deactivate active products and child categories first; this category was not changed." }, 409);
            }
          }
        }
        let duplicateQuery = db.from("categories").select("id").eq("slug", slug);
        if (id) duplicateQuery = duplicateQuery.neq("id", id);
        const { data: duplicate, error: duplicateError } = await duplicateQuery.maybeSingle();
        if (duplicateError) throw duplicateError;
        if (duplicate) return json({ ok: false, error: "That category slug is already in use." }, 409);
        const categoryPayload = {
          name, slug, parent_id: parentId, description: String(b.description || "").trim().slice(0, 4000) || null,
          sort_order: Number.isInteger(Number(b.sort_order)) ? Math.max(-10000, Math.min(10000, Number(b.sort_order))) : 0,
          active: b.active === true
        };
        const result = id
          ? await db.from("categories").update(categoryPayload).eq("id", id).select("id,name,slug,parent_id,description,active,sort_order").single()
          : await db.from("categories").insert(categoryPayload).select("id,name,slug,parent_id,description,active,sort_order").single();
        if (result.error) throw result.error;
        const data = result.data;
        await db.from("audit_log").insert({
          actor_type: "admin", actor_id: auth.user.id, action: id ? "owner_update_category" : "owner_create_category",
          resource_type: "category", resource_id: data.id,
          details: { name: data.name, slug: data.slug, parent_id: data.parent_id, active: data.active }
        });
        return json({ ok: true, category: data });
      }
      if (b.action === "queue_task") {
        const { data, error } = await db.from("ai_tasks").insert({ worker_id:b.worker_id||null, task_type:String(b.task_type||"manual"), priority:Number(b.priority||50), input_data:b.input_data||{}, requires_approval:b.requires_approval !== false }).select("*").single();
        if (error) throw error;
        await db.from("audit_log").insert({ actor_type:"admin",actor_id:auth.user.id,action:"queue_ai_task",resource_type:"ai_tasks",resource_id:data.id,details:{task_type:data.task_type}});
        return json({ok:true,task:data});
      }
      if (b.action === "approve_opportunity") {
        const { data, error } = await db.from("opportunities").update({status:"approved",updated_at:new Date().toISOString()}).eq("id",b.id).select("*").single();
        if (error) throw error;
        await db.from("audit_log").insert({actor_type:"admin",actor_id:auth.user.id,action:"approve_opportunity",resource_type:"opportunities",resource_id:data.id});
        return json({ok:true,opportunity:data});
      }
      return json({ok:false,error:"Unknown admin action."},400);
    }
    return json({ok:false,error:"Method Not Allowed"},405);
  } catch (e) { return json({ok:false,error:String((e as Error)?.message||e)},500); }
});