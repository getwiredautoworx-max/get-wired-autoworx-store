import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const secret = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")!).default;
const db = createClient(url, secret);

const json = (x: unknown, status=200) => new Response(JSON.stringify(x), {
  status, headers: {"content-type":"application/json","cache-control":"no-store"}
});

async function owner(req: Request) {
  const h=req.headers.get("authorization")||"";
  if(!h.startsWith("Bearer ")) return null;
  const token=h.slice(7);
  const uc=createClient(url,Deno.env.get("SUPABASE_PUBLISHABLE_KEY")||secret,{global:{headers:{Authorization:`Bearer ${token}`} }});
  const {data,error}=await uc.auth.getUser(token);
  if(error||!data.user) return null;
  const {data:a}=await db.from("veyron_admin_users").select("user_id,role,enabled")
    .eq("user_id",data.user.id).eq("enabled",true).maybeSingle();
  return a ? {user:data.user,role:a.role} : null;
}
const qno=()=>{const d=new Date().toISOString().replace(/[-:TZ.]/g,"").slice(0,14);return `GWQ-${d}-${crypto.randomUUID().slice(0,6).toUpperCase()}`;};
const event=async(id:string,type:string,details:Record<string,unknown>={},actor?:string)=>
  db.from("quote_events").insert({quote_request_id:id,event_type:type,details,actor_user_id:actor||null});

Deno.serve(async req=>{
  try{
    const u=new URL(req.url), b=req.method==="POST"?await req.json().catch(()=>({})): {};
    const action=String(b.action||u.searchParams.get("action")||"");

    if(req.method==="POST"&&action==="create_request"){
      const sku=String(b.public_sku||"").trim(), name=String(b.customer_name||"").trim();
      const qty=Math.max(1,Math.floor(Number(b.quantity||1)));
      if(!sku||!name) return json({ok:false,error:"Product SKU and customer name are required."},400);
      const {data:p,error:pe}=await db.from("products").select("id,public_sku,name,active")
        .eq("public_sku",sku).eq("active",true).maybeSingle();
      if(pe||!p) return json({ok:false,error:"Product could not be verified."},404);
      const {data:s}=await db.from("supplier_connections").select("id,name,query_channel")
        .eq("active",true).order("priority").limit(1).maybeSingle();
      const {data:q,error}=await db.from("quote_requests").insert({
        quote_number:qno(),product_id:p.id,public_sku:p.public_sku,product_name:p.name,quantity:qty,
        vehicle_details:b.vehicle_details||{},customer_name:name,customer_email:b.customer_email||null,
        customer_phone:b.customer_phone||null,whatsapp_phone:b.whatsapp_phone||b.customer_phone||null,
        delivery_address:b.delivery_address||null,delivery_details:b.delivery_details||{},notes:b.notes||null,
        supplier_id:s?.id||null,status:"REQUESTED"
      }).select("id,quote_number,status,created_at").single();
      if(error) throw error;
      await event(q.id,"REQUESTED",{public_sku:p.public_sku,quantity:qty,supplier_selected:!!s});
      return json({ok:true,quote:q});
    }

    const a=await owner(req);
    if(!a) return json({ok:false,error:"Owner/admin authorization required."},401);

    if(req.method==="GET"&&action==="list"){
      const {data,error}=await db.from("quote_requests")
        .select("id,quote_number,public_sku,product_name,quantity,customer_name,customer_email,customer_phone,status,supplier_id,expires_at,created_at,updated_at")
        .order("created_at",{ascending:false}).limit(100);
      if(error) throw error; return json({ok:true,quotes:data||[]});
    }

    if(req.method==="GET"&&action==="detail"){
      const id=u.searchParams.get("id"); if(!id) return json({ok:false,error:"Quote id required."},400);
      const [q,r,o,m,e]=await Promise.all([
        db.from("quote_requests").select("*").eq("id",id).single(),
        db.from("supplier_quote_responses").select("*").eq("quote_request_id",id).order("received_at",{ascending:false}),
        db.from("quote_customer_offers").select("*").eq("quote_request_id",id).order("created_at",{ascending:false}),
        db.from("quote_messages").select("*").eq("quote_request_id",id).order("created_at",{ascending:false}),
        db.from("quote_events").select("*").eq("quote_request_id",id).order("created_at",{ascending:false})
      ]);
      for(const x of [q,r,o,m,e]) if(x.error) throw x.error;
      return json({ok:true,quote:q.data,responses:r.data||[],offers:o.data||[],messages:m.data||[],events:e.data||[]});
    }

    if(req.method==="POST"&&action==="record_supplier_response"){
      const id=String(b.quote_id||"");
      const {data:q}=await db.from("quote_requests").select("id,supplier_id").eq("id",id).single();
      if(!q) return json({ok:false,error:"Quote not found."},404);
      const {data:r,error}=await db.from("supplier_quote_responses").insert({
        quote_request_id:id,supplier_id:q.supplier_id||null,supplier_reference:b.supplier_reference||null,
        supplier_cost:b.supplier_cost??null,stock_available:b.stock_available??null,
        availability_text:b.availability_text||null,lead_time_text:b.lead_time_text||null,
        estimated_dispatch:b.estimated_dispatch||null,packaging_cost:b.packaging_cost||0,
        freight_cost:b.freight_cost||0,vat_amount:b.vat_amount??null,vat_included:b.vat_included??null,
        moq:b.moq??null,warranty_text:b.warranty_text||null,returns_text:b.returns_text||null,
        quote_valid_until:b.quote_valid_until||null,raw_response:b.raw_response||{}
      }).select("*").single();
      if(error) throw error;
      await db.from("quote_requests").update({status:"SUPPLIER_RESPONSE",updated_at:new Date().toISOString()}).eq("id",id);
      await event(id,"SUPPLIER_RESPONSE",{response_id:r.id},a.user.id);
      return json({ok:true,response:r});
    }

    if(req.method==="POST"&&action==="create_offer"){
      const id=String(b.quote_id||""), sr=String(b.supplier_response_id||"");
      const unit=Number(b.unit_selling_price), qty=Math.max(1,Math.floor(Number(b.quantity||1)));
      const pack=Number(b.packaging_total||0), freight=Number(b.delivery_total||0), vat=b.vat_total==null?0:Number(b.vat_total);
      if(!Number.isFinite(unit)||unit<0) return json({ok:false,error:"Valid selling price required."},400);
      const merchandise=unit*qty, total=merchandise+pack+freight+vat;
      const {data:o,error}=await db.from("quote_customer_offers").insert({
        quote_request_id:id,supplier_response_id:sr||null,unit_selling_price:unit,
        merchandise_total:merchandise,packaging_total:pack,delivery_total:freight,vat_total:vat,
        grand_total:total,currency:"ZAR",payment_terms:b.payment_terms||null,
        customer_message:b.customer_message||null,approved_by:a.user.id,approved_at:new Date().toISOString(),
        expires_at:b.expires_at||null
      }).select("*").single();
      if(error) throw error;
      await db.from("quote_requests").update({status:"QUOTED_TO_CUSTOMER",updated_at:new Date().toISOString()}).eq("id",id);
      await event(id,"OFFER_APPROVED",{offer_id:o.id,grand_total:total},a.user.id);
      return json({ok:true,offer:o});
    }

    if(req.method==="POST"&&action==="status"){
      const id=String(b.quote_id||""), status=String(b.status||"");
      const allowed=["SENT_TO_SUPPLIER","OWNER_REVIEW","QUOTED_TO_CUSTOMER","ACCEPTED_PAYMENT_PENDING","PAID","SUPPLIER_ORDERED","DISPATCHED","DELIVERED","EXPIRED","DECLINED","CANCELLED"];
      if(!allowed.includes(status)) return json({ok:false,error:"Invalid quote status."},400);
      const {data,error}=await db.from("quote_requests").update({status,updated_at:new Date().toISOString()}).eq("id",id).select("*").single();
      if(error) throw error; await event(id,status,{},a.user.id); return json({ok:true,quote:data});
    }

    return json({ok:false,error:"Unknown action."},400);
  }catch(e){return json({ok:false,error:String((e as Error)?.message||e)},500);}
});