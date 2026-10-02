const SUPABASE_URL='https://ojytykqpvonxvepprgbh.supabase.co';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
let client;
let currentOrders=[];

async function boot(){
  const html=await fetch('/index.html').then(r=>r.text());
  const key=(html.match(/SUPABASE_KEY=['\"]([^'\"]+)['\"]/)||[])[1] || 'sb_publishable_rSKAEYqQheFAljUmro6uGA_MmBm-l3w';
  const s=document.createElement('script');
  s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload=async()=>{
    client=window.supabase.createClient(SUPABASE_URL,key);
    const {data:{session}}=await client.auth.getSession();
    if(session) showApp(session);
    client.auth.onAuthStateChange((_e,next)=>{ if(next) showApp(next); });
  };
  document.head.appendChild(s);
}

async function requestLink(){
  const email=$('email').value.trim();
  if(!email){$('msg').textContent='Enter the authorised staff email address.';return;}
  const{error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:location.href}});
  $('msg').textContent=error?error.message:'Check your email for the secure sign-in link.';
}

function showApp(session){
  $('loginPanel').classList.add('hidden');
  $('app').classList.remove('hidden');
  $('sessionUser').textContent=session.user?.email?`Signed in as ${session.user.email}`:'Authenticated administrator';
  loadOrders();
}

async function loadOrders(){
  if(!client)return;
  const p_status=$('status').value||null;
  const p_payment_status=$('payment').value||null;
  $('orders').innerHTML='Loading orders…';
  const{data,error}=await client.rpc('admin_list_orders',{p_status,p_payment_status,p_limit:100});
  if(error){$('orders').innerHTML=`<div class="order">${esc(error.message)}</div>`;return;}
  currentOrders=data||[];
  $('count').textContent=currentOrders.length;
  $('pendingPayment').textContent=currentOrders.filter(o=>o.payment_status==='pending').length;
  $('pendingOrders').textContent=currentOrders.filter(o=>o.order_status==='pending').length;
  renderOrders();
}

async function updateOrder(id){
  const orderStatus=document.querySelector(`[data-order-status="${id}"]`)?.value||null;
  const paymentStatus=document.querySelector(`[data-payment-status="${id}"]`)?.value||null;
  const paymentReference=document.querySelector(`[data-payment-ref="${id}"]`)?.value||null;
  const notes=document.querySelector(`[data-notes="${id}"]`)?.value||null;
  const{error}=await client.rpc('admin_update_order',{p_order_id:id,p_order_status:orderStatus,p_payment_status:paymentStatus,p_payment_reference:paymentReference,p_customer_reference:null,p_notes:notes});
  if(error){alert(error.message);return;}
  await loadOrders();
}

async function savePaxiTracking(orderId){
  const o=currentOrders.find(x=>x.id===orderId);
  if(!o){alert('Order not found.');return;}
  const ref=prompt('Enter the PAXI tracking/reference number returned by the PAXI Portal:','');
  if(!ref||!ref.trim()) return;
  const note=(o.notes?o.notes+'\n':'')+'PAXI tracking/reference: '+ref.trim();
  const {error}=await client.rpc('admin_update_order',{p_order_id:orderId,p_order_status:o.order_status,p_payment_status:o.payment_status,p_payment_reference:null,p_customer_reference:null,p_notes:note});
  if(error){alert(error.message);return;}
  await loadOrders();
}

async function preparePaxi(orderId){
  const o=currentOrders.find(x=>x.id===orderId);
  if(!o){alert('Order not found.');return;}
  const r=await client.from('order_items').select('product_name,sku,quantity,unit_price').eq('order_id',orderId);
  if(r.error){alert('Could not load order items: '+r.error.message);return;}
  const lines=(r.data||[]).map(i=>'- '+i.product_name+' | SKU '+(i.sku||'')+' | Qty '+i.quantity).join('\n');
  const pack=['GET WIRED AUTOWORX — PAXI REGISTRATION PACK','Order #'+o.order_number,'Customer: '+(o.customer_name||''),'Phone: '+(o.customer_phone||''),'Email: '+(o.customer_email||''),'Delivery address: '+(o.delivery_address||''),'Order notes / PAXI Point: '+(o.notes||''),'Items:',lines,'','Register this parcel in the authorised PAXI Portal. Keep the PAXI tracking/reference number against Order #'+o.order_number+'.'].join('\n');
  try{await navigator.clipboard.writeText(pack);}catch{}
  window.open('https://portal.paxi.co.za/dashboard','_blank','noopener');
  alert('PAXI registration pack copied to your clipboard. Register the parcel in the PAXI Portal and save the returned tracking/reference number against this order.');
}
function renderOrders(){
  $('orders').innerHTML=currentOrders.length?currentOrders.map(o=>`<article class="order"><div class="order-head"><h3>Order #${esc(o.order_number)}</h3><span class="badge">${esc(o.order_status)}</span></div><b>${esc(o.customer_name)}</b><br>${esc(o.customer_phone||'')}<br>${esc(o.customer_email||'')}<p>Total: <b>R${Number(o.total||0).toFixed(2)}</b><br>Payment: <b>${esc(o.payment_status)}</b>${o.payment_method?` · ${esc(o.payment_method)}`:''}</p><div class="actions"><label style="flex:1;min-width:170px">Order status<select data-order-status="${o.id}"><option ${o.order_status==='pending'?'selected':''}>pending</option><option ${o.order_status==='confirmed'?'selected':''}>confirmed</option><option ${o.order_status==='processing'?'selected':''}>processing</option><option ${o.order_status==='ready_for_pickup'?'selected':''}>ready_for_pickup</option><option ${o.order_status==='shipped'?'selected':''}>shipped</option><option ${o.order_status==='completed'?'selected':''}>completed</option><option ${o.order_status==='cancelled'?'selected':''}>cancelled</option></select></label><label style="flex:1;min-width:170px">Payment status<select data-payment-status="${o.id}"><option ${o.payment_status==='pending'?'selected':''}>pending</option><option ${o.payment_status==='paid'?'selected':''}>paid</option><option ${o.payment_status==='failed'?'selected':''}>failed</option><option ${o.payment_status==='refunded'?'selected':''}>refunded</option><option ${o.payment_status==='cancelled'?'selected':''}>cancelled</option></select></label></div><label>Payment reference<input data-payment-ref="${o.id}" value="${esc(o.payment_reference||'')}" placeholder="EFT/payment reference"></label><label>Notes<textarea data-notes="${o.id}" placeholder="Internal order notes">${esc(o.notes||'')}</textarea></label><div class="actions"><button type="button" onclick="updateOrder('${o.id}')">SAVE ORDER</button><button type="button" onclick="preparePaxi('${o.id}')">PAXI REGISTRATION</button><button type="button" onclick="savePaxiTracking('${o.id}')">SAVE PAXI TRACKING</button><a href="https://wa.me/27744884234?text=${encodeURIComponent(`Get Wired AutoWorx order #${o.order_number}`)}" target="_blank" rel="noopener"><button type="button">WHATSAPP CUSTOMER</button></a></div></article>`).join(''):'No orders match the selected filters.';
}

function clearFilters(){
  $('status').value='';
  $('payment').value='';
  loadOrders();
}

async function logout(){await client.auth.signOut();location.reload();}

$('loginBtn').onclick=requestLink;
$('refresh').onclick=loadOrders;
$('apply').onclick=loadOrders;
$('clear').onclick=clearFilters;
$('logout').onclick=logout;
boot().catch(e=>$('msg').textContent=e.message);