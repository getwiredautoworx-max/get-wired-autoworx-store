import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const secret = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!).default;
const db = createClient(url, secret);
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin"
};
const json = (x: unknown, status = 200) => new Response(JSON.stringify(x), {
  status,
  headers: { ...corsHeaders, "content-type": "application/json", "cache-control": "no-store" }
});
async function audit(entry: Record<string, unknown>) {
  const { error } = await db.from("audit_log").insert(entry);
  if (error) throw new Error("AUDIT_LOG_WRITE_FAILED: mutation may have applied; verify state before retrying.");
}

type ValidationResult<T> = { ok: true; value: T } | { ok: false; status: number; error: string };

export function validateProductUpdate(b: Record<string, unknown>): ValidationResult<{
  id: string; name: string; categoryId: string; stock: number; description: string | null;
  active: boolean; featured: boolean;
}> {
  const allowed = new Set(["action", "id", "name", "description", "category_id", "stock_quantity", "active", "featured"]);
  const unexpected = Object.keys(b).find((key) => !allowed.has(key));
  if (unexpected) return { ok: false, status: 400, error: `Unsupported product field: ${unexpected}.` };
  const id = typeof b.id === "string" ? b.id.trim() : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return { ok: false, status: 400, error: "Valid product ID required." };
  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name || name.length > 240) return { ok: false, status: 400, error: "Product name is required (maximum 240 characters)." };
  const stock = Number(b.stock_quantity);
  if (!Number.isInteger(stock) || stock < 0 || stock > 10000000) return { ok: false, status: 400, error: "Stock must be a whole number from 0 to 10,000,000." };
  const categoryId = typeof b.category_id === "string" ? b.category_id.trim() : "";
  if (!/^[0-9a-f-]{36}$/i.test(categoryId)) return { ok: false, status: 400, error: "Select a valid category." };
  if (b.active !== undefined && typeof b.active !== "boolean") return { ok: false, status: 400, error: "Active must be a boolean." };
  if (b.featured !== undefined && typeof b.featured !== "boolean") return { ok: false, status: 400, error: "Featured must be a boolean." };
  const description = typeof b.description === "string" ? b.description.trim().slice(0, 8000) || null : b.description == null ? null : undefined;
  if (description === undefined) return { ok: false, status: 400, error: "Description must be text." };
  return { ok: true, value: { id, name, categoryId, stock, description, active: b.active === true, featured: b.featured === true } };
}

export function validateCategoryUpsert(b: Record<string, unknown>): ValidationResult<{
  id: string | null; name: string; slug: string; parentId: string | null; description: string | null;
  sortOrder: number; active: boolean;
}> {
  const allowed = new Set(["action", "id", "name", "slug", "parent_id", "description", "sort_order", "active"]);
  const unexpected = Object.keys(b).find((key) => !allowed.has(key));
  if (unexpected) return { ok: false, status: 400, error: `Unsupported category field: ${unexpected}.` };
  if (b.id != null && typeof b.id !== "string") return { ok: false, status: 400, error: "Invalid category ID." };
  const idValue = typeof b.id === "string" ? b.id.trim() : "";
  const id = idValue || null;
  if (id && !/^[0-9a-f-]{36}$/i.test(id)) return { ok: false, status: 400, error: "Invalid category ID." };
  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name || name.length > 160) return { ok: false, status: 400, error: "Category name is required (maximum 160 characters)." };
  if (b.slug !== undefined && typeof b.slug !== "string") return { ok: false, status: 400, error: "Category slug must be text." };
  const slug = String(b.slug || name).toLowerCase().trim()
    .normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
  if (!slug) return { ok: false, status: 400, error: "A valid category slug is required." };
  const parentValue = typeof b.parent_id === "string" ? b.parent_id.trim() : "";
  if (b.parent_id != null && typeof b.parent_id !== "string") return { ok: false, status: 400, error: "Parent category must be an ID." };
  const parentId = parentValue || null;
  if (parentId && !/^[0-9a-f-]{36}$/i.test(parentId)) return { ok: false, status: 400, error: "Invalid parent category." };
  if (b.active !== undefined && typeof b.active !== "boolean") return { ok: false, status: 400, error: "Active must be a boolean." };
  if (b.description !== undefined && b.description !== null && typeof b.description !== "string") return { ok: false, status: 400, error: "Description must be text." };
  const description = typeof b.description === "string" ? b.description.trim().slice(0, 4000) || null : null;
  const sortOrder = b.sort_order == null || b.sort_order === "" ? 0 : Number(b.sort_order);
  if (!Number.isInteger(sortOrder) || sortOrder < -10000 || sortOrder > 10000) return { ok: false, status: 400, error: "Sort order must be a whole number from -10000 to 10000." };
  return { ok: true, value: { id, name, slug, parentId, description, sortOrder, active: b.active === true } };
}

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
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
        const validation = validateProductUpdate(b);
        if (!validation.ok) return json({ ok: false, error: validation.error }, validation.status);
        const { id, name, categoryId, stock, description, active, featured } = validation.value;
        const { data: category, error: ce } = await db.from("categories").select("id,active").eq("id", categoryId).maybeSingle();
        if (ce) throw ce;
        if (!category || category.active !== true) return json({ ok: false, error: "Selected category is not active." }, 400);
        const { data: current, error: pe } = await db.from("products").select("id,sku,public_sku").eq("id", id).maybeSingle();
        if (pe) throw pe;
        if (!current) return json({ ok: false, error: "Product not found." }, 404);
        const slug = (name + "-" + (current.sku || current.public_sku || id.slice(0, 8)))
          .toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180);
        const patch = {
          name, slug, description,
          category_id: categoryId, stock_quantity: stock, active,
          featured, updated_at: new Date().toISOString()
        };
        const { data, error } = await db.from("products").update(patch).eq("id", id)
          .select("id,sku,public_sku,name,description,category_id,stock_quantity,active,featured,updated_at").single();
        if (error) throw error;
        await audit({
          actor_type: "admin", actor_id: auth.user.id, action: "owner_update_product",
          resource_type: "product", resource_id: id,
          details: { fields: ["name","description","category_id","stock_quantity","active","featured"] }
        });
        return json({ ok: true, product: data });
      }
      if (b.action === "upsert_category") {
        const validation = validateCategoryUpsert(b);
        if (!validation.ok) return json({ ok: false, error: validation.error }, validation.status);
        const { id, name, slug, parentId, description, sortOrder, active } = validation.value;
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
          if (current.active === true && !active) {
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
          name, slug, parent_id: parentId, description,
          sort_order: sortOrder, active
        };
        const result = id
          ? await db.from("categories").update(categoryPayload).eq("id", id).select("id,name,slug,parent_id,description,active,sort_order").single()
          : await db.from("categories").insert(categoryPayload).select("id,name,slug,parent_id,description,active,sort_order").single();
        if (result.error) throw result.error;
        const data = result.data;
        await audit({
          actor_type: "admin", actor_id: auth.user.id, action: id ? "owner_update_category" : "owner_create_category",
          resource_type: "category", resource_id: data.id,
          details: { name: data.name, slug: data.slug, parent_id: data.parent_id, active: data.active }
        });
        return json({ ok: true, category: data });
      }
      if (b.action === "queue_task") {
        const { data, error } = await db.from("ai_tasks").insert({ worker_id:b.worker_id||null, task_type:String(b.task_type||"manual"), priority:Number(b.priority||50), input_data:b.input_data||{}, requires_approval:b.requires_approval !== false }).select("*").single();
        if (error) throw error;
        await audit({ actor_type:"admin",actor_id:auth.user.id,action:"queue_ai_task",resource_type:"ai_tasks",resource_id:data.id,details:{task_type:data.task_type}});
        return json({ok:true,task:data});
      }
      if (b.action === "approve_opportunity") {
        const { data, error } = await db.from("opportunities").update({status:"approved",updated_at:new Date().toISOString()}).eq("id",b.id).select("*").single();
        if (error) throw error;
        await audit({actor_type:"admin",actor_id:auth.user.id,action:"approve_opportunity",resource_type:"opportunities",resource_id:data.id});
        return json({ok:true,opportunity:data});
      }
      return json({ok:false,error:"Unknown admin action."},400);
    }
    return json({ok:false,error:"Method Not Allowed"},405);
  } catch (e) { return json({ok:false,error:String((e as Error)?.message||e)},500); }
};
if (import.meta.main) Deno.serve(handler);
export { handler };