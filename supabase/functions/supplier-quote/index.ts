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
      const {data:p,error:pe}=await db.from("products").select("id,public_sku,name,active,specifications")
        .eq("public_sku",sku).eq("active",true).maybeSingle();
      if(pe||!p) return json({ok:false,error:"Product could not be verified."},404);
      const requestedSupplier=String(b.supplier_id||p.specifications?.supplier_id||"").trim();
      const {data:s}=requestedSupplier
        ? await db.from("supplier_connections").select("id,name,query_channel").eq("id",requestedSupplier).eq("active",true).maybeSingle()
        : await db.from("supplier_connections").select("id,name,query_channel").eq("active",true).order("priority").limit(1).maybeSingle();
      const {data:q,error}=await db.from("quote_requests").insert({
        quote_number:qno(),customer_access_token:crypto.randomUUID().replaceAll("-",""),product_id:p.id,public_sku:p.public_sku,product_name:p.name,quantity:qty,
        vehicle_details:b.vehicle_details||{},customer_name:name,customer_email:b.customer_email||null,
        customer_phone:b.customer_phone||null,whatsapp_phone:b.whatsapp_phone||b.customer_phone||null,
        delivery_address:b.delivery_address||null,delivery_details:b.delivery_details||{},notes:b.notes||null,
        supplier_id:s?.id||null,status:"REQUESTED"
      }).select("id,quote_number,status,created_at").single();
      if(error) throw error;
      await event(q.id,"REQUESTED",{public_sku:p.public_sku,quantity:qty,supplier_selected:!!s});
      return json({ok:true,quote:q,customer_access_token:(await db.from("quote_requests").select("customer_access_token").eq("id",q.id).single()).data?.customer_access_token});
    }

    if(req.method==="GET"&&action==="customer_offer"){
      const quoteNumber=String(u.searchParams.get("quote_number")||"");
      const token=String(u.searchParams.get("token")||"");
      if(!quoteNumber||!token) return json({ok:false,error:"Quote reference and access token required."},400);
      const {data:q,error:qe}=await db.from("quote_requests").select("id,quote_number,public_sku,product_name,quantity,customer_name,status,expires_at,delivery_details").eq("quote_number",quoteNumber).eq("customer_access_token",token).single();
      if(qe||!q) return json({ok:false,error:"Quote not found."},404);
      const {data:o,error:oe}=await db.from("quote_customer_offers").select("id,unit_selling_price,quantity,merchandise_total,packaging_total,delivery_total,vat_total,grand_total,currency,payment_terms,customer_message,expires_at,payment_provider,payment_reference,payment_link,payment_status,accepted_at,paid_at").eq("quote_request_id",q.id).order("created_at",{ascending:false}).limit(1).maybeSingle();
      if(oe) throw oe;
      return json({ok:true,quote:q,offer:o||null});
    }

    if(req.method==="POST"&&action==="accept_offer"){
      const quoteNumber=String(b.quote_number||"");
      const token=String(b.token||"");
      if(!quoteNumber||!token) return json({ok:false,error:"Quote reference and access token required."},400);
      const {data:q,error:qe}=await db.from("quote_requests").select("id,quote_number,status,expires_at").eq("quote_number",quoteNumber).eq("customer_access_token",token).single();
      if(qe||!q) return json({ok:false,error:"Quote not found."},404);
      const {data:o,error:oe}=await db.from("quote_customer_offers").select("*").eq("quote_request_id",q.id).order("created_at",{ascending:false}).limit(1).maybeSingle();
      if(oe) throw oe;
      if(!o) return json({ok:false,error:"No customer offer is available."},409);
      if(o.expires_at && new Date(o.expires_at).getTime()<Date.now()) return json({ok:false,error:"This offer has expired."},409);
      const {data:up,error:ue}=await db.from("quote_customer_offers").update({accepted_at:new Date().toISOString(),payment_status:"PENDING"}).eq("id",o.id).select("id,grand_total,currency,payment_link,payment_status").single();
      if(ue) throw ue;
      await db.from("quote_requests").update({status:"ACCEPTED_PAYMENT_PENDING",updated_at:new Date().toISOString()}).eq("id",q.id);
      await event(q.id,"CUSTOMER_ACCEPTED",{offer_id:o.id});
      return json({ok:true,offer:up,payment_required:!up.payment_link});
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
      const {data:q}=await db.from("quote_requests").select("id,supplier_id,quantity").eq("id",id).single();
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
      const unit=Number(b.unit_selling_price), qty=Math.max(1,Math.floor(Number(b.quantity||q?.quantity||1)));
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

    if(req.method==="POST"&&action==="authorize_procurement"){\n      const id=String(b.quote_id||"");\n      const {data:q,error:qe}=await db.from("quote_requests").select("id,status").eq("id",id).single();\n      if(qe||!q) return json({ok:false,error:"Quote not found."},404);\n      if(q.status!=="PAID") return json({ok:false,error:"Procurement authorization requires confirmed payment."},409);\n      const {data:up,error}=await db.from("quote_requests").update({status:"SUPPLIER_ORDERED",procurement_authorized_by:a.user.id,procurement_authorized_at:new Date().toISOString(),supplier_order_ref:b.supplier_order_ref||null,updated_at:new Date().toISOString()}).eq("id",id).select("*").single();\n      if(error) throw error; await event(id,"PROCUREMENT_AUTHORIZED",{supplier_order_ref:b.supplier_order_ref||null},a.user.id); return json({ok:true,quote:up});\n    }\n\n    if(req.method==="POST"&&action==="record_payment"){\n      const id=String(b.quote_id||""); const status=String(b.payment_status||"PAID");\n      if(!["PAID","FAILED","EXPIRED","CANCELLED"].includes(status)) return json({ok:false,error:"Invalid payment status."},400);\n      const {data:q,error:qe}=await db.from("quote_requests").select("id").eq("id",id).single(); if(qe||!q) return json({ok:false,error:"Quote not found."},404);\n      const {data:o,error:oe}=await db.from("quote_customer_offers").select("id").eq("quote_request_id",id).order("created_at",{ascending:false}).limit(1).maybeSingle(); if(oe) throw oe; if(!o) return json({ok:false,error:"Offer not found."},404);\n      const {data:up,error}=await db.from("quote_customer_offers").update({payment_status:status,payment_reference:b.payment_reference||null,paid_at:status==="PAID"?new Date().toISOString():null}).eq("id",o.id).select("*").single(); if(error) throw error;\n      if(status==="PAID") await db.from("quote_requests").update({status:"PAID",updated_at:new Date().toISOString()}).eq("id",id);\n      await event(id,"PAYMENT_"+status,{offer_id:o.id,payment_reference:b.payment_reference||null},a.user.id); return json({ok:true,offer:up});\n    }\n\n    if(req.method==="POST"&&action==="delivery_update"){\n      const id=String(b.quote_id||""); const method=String(b.delivery_method||"");\n      const allowed=["COURIER","PAXI","LOCKER","COLLECTION","OTHER"]; if(!allowed.includes(method)) return json({ok:false,error:"Invalid delivery method."},400);\n      const {data:q,error}=await db.from("quote_requests").update({delivery_method:method,delivery_tracking_ref:b.tracking_ref||null,delivery_details:b.delivery_details||{},updated_at:new Date().toISOString()}).eq("id",id).select("*").single(); if(error) throw error;\n      await event(id,"DELIVERY_UPDATED",{delivery_method:method,tracking_ref:b.tracking_ref||null},a.user.id); return json({ok:true,quote:q});\n    }\n\n    if(req.method==="POST"&&action==="status"){
      const id=String(b.quote_id||""), status=String(b.status||"");
      const allowed=["SENT_TO_SUPPLIER","OWNER_REVIEW","QUOTED_TO_CUSTOMER","ACCEPTED_PAYMENT_PENDING","PAID","SUPPLIER_ORDERED","DISPATCHED","DELIVERED","EXPIRED","DECLINED","CANCELLED"];
      if(!allowed.includes(status)) return json({ok:false,error:"Invalid quote status."},400);\n      if(status==="SUPPLIER_ORDERED") return json({ok:false,error:"Use authorize_procurement after payment confirmation."},409);
      const {data,error}=await db.from("quote_requests").update({status,updated_at:new Date().toISOString()}).eq("id",id).select("*").single();
      if(error) throw error; await event(id,status,{},a.user.id); return json({ok:true,quote:data});
    }

    return json({ok:false,error:"Unknown action."},400);
  }catch(e){return json({ok:false,error:String((e as Error)?.message||e)},500);}
});