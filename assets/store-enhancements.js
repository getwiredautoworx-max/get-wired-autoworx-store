(()=>{
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>\"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[x]));
function cartTotal(){return cart.reduce((t,x)=>t+Number(x.price)*x.qty,0)}
function addCheckout(){
 if($('#checkoutBtn'))return;
 const p=document.createElement('button');p.id='checkoutBtn';p.textContent='CHECKOUT / SUBMIT ORDER';p.style.cssText='margin-top:14px;width:100%;padding:13px;border:0;border-radius:8px;background:#ff1c2d;color:#fff;font-weight:900;cursor:pointer';
 p.onclick=()=>openCheckout();$('#cartTotal').after(p);
}
function openCheckout(){
 if(!cart.length){alert('Your cart is empty.');return}
 let m=$('#checkoutModal');if(!m){
  m=document.createElement('div');m.id='checkoutModal';m.className='modal';
  m.innerHTML='<div class="modalBox"><button class="modalClose" id="checkoutClose">×</button><h2>CHECKOUT</h2><p class="searchStatus">Complete your details. Product prices are taken directly from the store catalogue.</p><form id="checkoutForm"><div class="infoBlock"><b>CUSTOMER DETAILS</b><input required name="name" placeholder="Full name" style="width:100%;padding:12px;margin:6px 0;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"><input required name="phone" placeholder="Phone / WhatsApp" style="width:100%;padding:12px;margin:6px 0;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"><input name="email" type="email" placeholder="Email address" style="width:100%;padding:12px;margin:6px 0;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"></div><div class="infoBlock"><b>FULFILMENT</b><select name="fulfilment" style="width:100%;padding:12px;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"><option value="pickup">Pick up — Get Wired AutoWorx</option><option value="delivery">Nationwide delivery — Courier Guy / PEP PAXI</option></select><textarea name="address" placeholder="Delivery address (required for delivery)" rows="3" style="width:100%;padding:12px;margin-top:8px;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"></textarea><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><input name="city" placeholder="City / Town" style="width:100%;padding:12px;margin-top:8px;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"><input name="province" placeholder="Province" style="width:100%;padding:12px;margin-top:8px;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"></div><input name="postal" placeholder="Postal code" inputmode="numeric" style="width:100%;padding:12px;margin-top:8px;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"><textarea name="notes" placeholder="Order notes (optional)" rows="2" style="width:100%;padding:12px;margin-top:8px;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"></textarea></div><div class="infoBlock"><b>PAYMENT</b><select name="payment" style="width:100%;padding:12px;background:#050d18;color:#fff;border:1px solid #174d70;border-radius:7px"><option value="manual_confirmation">Payment / EFT details confirmed after order</option></select></div><div class="infoBlock"><b>ORDER TOTAL</b><p id="checkoutTotal"></p><p class="searchStatus">Delivery fee, where applicable, will be confirmed. FULL PAYMENT CONFIRMS ORDER.</p></div><button type="submit" style="width:100%;padding:14px;border:0;border-radius:8px;background:#087fe0;color:#fff;font-weight:900">SUBMIT ORDER</button></form><div id="checkoutResult"></div></div>';
  document.body.appendChild(m);$('#checkoutClose').onclick=()=>m.classList.remove('open');
  $('#checkoutForm').onsubmit=submitOrder;
 }
 $('#checkoutTotal').textContent='Catalogue total: '+money(cartTotal());$('#checkoutResult').innerHTML='';m.classList.add('open');
}
async function submitOrder(e){
 e.preventDefault();const f=new FormData(e.target),delivery=f.get('fulfilment')==='delivery';
 if(delivery&&!String(f.get('address')||'').trim()){alert('Please enter the delivery address.');return}
 const items=cart.map(x=>({product_id:x.id,quantity:x.qty}));
 const body={p_customer_name:String(f.get('name')).trim(),p_customer_email:String(f.get('email')||'').trim(),p_customer_phone:String(f.get('phone')).trim(),p_delivery_address:delivery?String(f.get('address')).trim():'Pick up at Get Wired AutoWorx',p_city:String(f.get('city')||'').trim()||null,p_province:String(f.get('province')||'').trim()||null,p_postal_code:String(f.get('postal')||'').trim()||null,p_delivery_fee:0,p_payment_method:String(f.get('payment')||'manual_confirmation'),p_notes:String(f.get('notes')||'').trim(),p_items:items};
 const btn=e.target.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='SUBMITTING…';
 try{const r=await fetch(SUPABASE_URL+'/rest/v1/rpc/create_store_order',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify(body)});const data=await r.json();if(!r.ok)throw Error(data.message||data.hint||'Unable to submit order');
  const lines=cart.map(x=>x.name+' × '+x.qty+' — '+money(Number(x.price)*x.qty)).join('\n');
  const msg='Hi Get Wired AutoWorx, Order #'+data.order_number+' has been submitted.\n\n'+lines+'\n\nTotal: '+money(data.total)+'\nFulfilment: '+(delivery?'Nationwide delivery':'Pick up')+'\nCustomer: '+body.p_customer_name+'\nPhone: '+body.p_customer_phone;
  $('#checkoutResult').innerHTML='<div class="infoBlock"><b>ORDER SUBMITTED — #'+esc(data.order_number)+'</b><p>Total: '+money(data.total)+'</p><a class="btn primary" target="_blank" rel="noopener" href="https://wa.me/27744884234?text='+encodeURIComponent(msg)+'">SEND ORDER TO WHATSAPP</a></div>';
  cart=[];localStorage.setItem('gw_cart','[]');cartRender();e.target.style.display='none';
 }catch(err){alert(err.message);btn.disabled=false;btn.textContent='SUBMIT ORDER'}
}

// Product-image repair: prefer the catalogue image_url; when it is missing or broken,
// resolve an exact SKU-named image from the repository image library. Name matching is
// deliberately secondary so one product cannot accidentally inherit another product's image.
function normaliseSku(v){return String(v||'').trim().replace(/\.(jpg|jpeg|png|webp)$/i,'').replace(/[^a-zA-Z0-9_-]/g,'').toUpperCase()}
function imageCandidates(sku){
 const n=normaliseSku(sku); if(!n)return [];
 const raw=String(sku||'').trim();
 const names=[raw,n,raw.toLowerCase(),n.toLowerCase()];
 const out=[]; for(const x of names){if(x)out.push('assets/products/'+encodeURIComponent(x)+'.jpg')}
 return [...new Set(out)];
}
function repairProductImages(){
 document.querySelectorAll('.product').forEach(card=>{
  const img=card.querySelector('.prodImg img'); if(!img)return;
  let sku=card.dataset.sku||card.getAttribute('data-part-number')||'';
  if(!sku){
   const text=card.textContent||'';
   const m=text.match(/(?:SKU|PART(?:\s|-)NUMBER|REFERENCE(?:\s|-)NUMBER)\s*[:#-]?\s*([A-Za-z0-9_-]+)/i);
   if(m)sku=m[1];
  }
  if(!sku)return;
  const candidates=imageCandidates(sku); if(!candidates.length)return;
  let i=0;
  const tryNext=()=>{if(i>=candidates.length)return;const next=candidates[i++];if(img.dataset.gwTried===next)return tryNext();img.dataset.gwTried=next;img.onerror=tryNext;img.src=next};
  if(!img.getAttribute('src')||/^data:|^about:/.test(img.getAttribute('src')))tryNext();
  else img.addEventListener('error',()=>tryNext(),{once:true});
 });
}
function startImageRepair(){
 repairProductImages();
 const observer=new MutationObserver(()=>repairProductImages());
 observer.observe(document.body,{childList:true,subtree:true});
 setTimeout(repairProductImages,500);setTimeout(repairProductImages,1500);setTimeout(repairProductImages,3000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{addCheckout();startImageRepair()});else{addCheckout();startImageRepair()}
})();