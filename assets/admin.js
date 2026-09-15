const SUPABASE_URL='https://ojytykqpvonxvepprgbh.supabase.co';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
let client;
let currentOrders=[];

async function boot(){
  const html=await fetch('/index.html').then(r=>r.text());
  const key=(html.match(/SUPABASE_KEY=['\"]([^'\"]+)['\"]/ )||[])[1];
  if(!key) throw Error('Store configuration unavailable');
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

function renderOrders(){
  $('orders').innerHTML=currentOrders.length?currentOrders.map(o=>`<article class="order"><div class="order-head"><h3>Order #${esc(o.order_number)}</h3><span class="badge">${esc(o.order_status)}</span></div><b>${esc(o.customer_name)}</b><br>${esc(o.customer_phone||'')}<br>${esc(o.customer_email||'')}<p>Total: <b>R${Number(o.total||0).toFixed(2)}</b><br>Payment: <b>${esc(o.payment_status)}</b>${o.payment_method?` · ${esc(o.payment_method)}`:''}${o.payment_reference?`<br>Payment reference: ${esc(o.payment_reference)}`:''}</p><div class="actions"><a href="https://wa.me/27744884234?text=${encodeURIComponent(`Get Wired AutoWorx order #${o.order_number}`)}" target="_blank" rel="noopener"><button type="button">WHATSAPP CUSTOMER</button></a></div></article>`).join(''):'No orders match the selected filters.';
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