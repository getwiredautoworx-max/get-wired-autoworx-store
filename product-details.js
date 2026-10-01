/* Product detail window enhancement. Loaded by the storefront to expose the existing Supabase product data without changing the database. */
(function(){
  function esc(v){return String(v??'').replace(/[&<>\"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[x]))}
  function money(v){return v==null?'Price on request':new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(Number(v))}
  function text(v){if(!v)return 'Not specified.';if(Array.isArray(v))return v.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(', ');if(typeof v==='object')return Object.entries(v).map(([k,x])=>k+': '+(typeof x==='object'?JSON.stringify(x):x)).join(' • ');return String(v)}
  function openProduct(p){
    let m=document.getElementById('gwProductModal');
    if(!m){m=document.createElement('div');m.id='gwProductModal';m.innerHTML='<div class="gwModalBox"><button class="gwClose">×</button><div id="gwProductDetail"></div></div>';document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m||e.target.classList.contains('gwClose'))m.classList.remove('open')})}
    const img=p.image_url?'<img src="'+esc(p.image_url)+'" alt="'+esc(p.name)+'">':'<div class="gwNoImg">⚡</div>';
    const spec=p.specifications?'<section><b>SPECIFICATIONS</b><p>'+esc(text(p.specifications))+'</p></section>':'';
    const desc=p.description?'<section><b>PRODUCT INFORMATION</b><p>'+esc(p.description)+'</p></section>':'';
    const wa='https://wa.me/27744884234?text='+encodeURIComponent('Hi Get Wired AutoWorx, I am interested in '+p.name+' (SKU '+(p.public_sku||'')+'). Price: '+money(p.price));
    document.getElementById('gwProductDetail').innerHTML='<div class="gwDetail"><div class="gwImage">'+img+'</div><div><h2>'+esc(p.name)+'</h2><small>SKU: '+esc(p.public_sku||'')+'</small><div class="gwPrice">'+money(p.price)+'</div><section><b>VEHICLE / APPLICATION INFORMATION</b><p>'+esc(text(p.compatible_vehicles))+'</p></section>'+desc+spec+'<section><b>ORDER & DELIVERY</b><p>Pick up available. Nationwide delivery via Courier Guy or PEP PAXI. Full payment confirms order. Product specific warranty applies where stated.</p></section><div class="gwActions"><button class="gwAdd">ADD TO CART</button><a href="'+wa+'" target="_blank" rel="noopener">WHATSAPP TO ORDER</a></div></div></div>';
    document.querySelector('.gwAdd').onclick=function(){if(typeof window.addToCart==='function')window.addToCart(p.id);m.classList.remove('open')};m.classList.add('open')
  }
  function hook(){
    if(!Array.isArray(window.products))return setTimeout(hook,300);
    document.querySelectorAll('.product').forEach(card=>{if(card.dataset.gwHook)return;card.dataset.gwHook='1';const id=card.querySelector('button')?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];const p=window.products.find(x=>x.id===id);if(!p)return;card.addEventListener('click',e=>{if(e.target.closest('button'))return;openProduct(p)})});
    new MutationObserver(hook).observe(document.body,{subtree:true,childList:true});
  }
  const s=document.createElement('style');s.textContent='#gwProductModal{position:fixed;inset:0;background:rgba(0,0,0,.84);z-index:999;display:none;align-items:center;justify-content:center;padding:16px}#gwProductModal.open{display:flex}.gwModalBox{width:min(920px,100%);max-height:92vh;overflow:auto;background:#07111e;border:1px solid #087fe0;border-radius:16px;padding:20px;box-shadow:0 25px 90px #000}.gwClose{float:right;background:none;border:0;color:#fff;font-size:30px;cursor:pointer}.gwDetail{display:grid;grid-template-columns:minmax(260px,44%) 1fr;gap:24px}.gwImage{min-height:300px;background:radial-gradient(circle,#123452,#040912);border:1px solid #174d70;border-radius:12px;display:grid;place-items:center;padding:15px}.gwImage img{max-width:100%;max-height:430px;object-fit:contain}.gwDetail h2{font-size:25px;margin:5px 0}.gwPrice{font-size:26px;font-weight:900;margin:16px 0}.gwDetail section{margin:14px 0;padding:12px;background:#050d18;border:1px solid #123f60;border-radius:10px}.gwDetail section b{display:block;color:#20b1ff;margin-bottom:6px}.gwDetail section p{margin:0;line-height:1.5;color:#d7e3ed}.gwActions{display:flex;gap:10px;flex-wrap:wrap}.gwActions button,.gwActions a{padding:12px 18px;border-radius:8px;font-weight:800;text-decoration:none;cursor:pointer}.gwActions button{border:0;background:#087fe0;color:#fff}.gwActions a{border:1px solid #1e79b0;color:#fff}.gwNoImg{font-size:60px}@media(max-width:700px){.gwDetail{grid-template-columns:1fr}.gwImage{min-height:220px}}';document.head.appendChild(s);hook();
})();


/* Supplier quote extension: enabled only when product.specifications.quote_on_request === true. */
(function(){
  const ENDPOINT='https://ojytykqpvonxvepprgbh.supabase.co/functions/v1/supplier-quote';
  function installQuote(p){
    if(!p||!p.specifications||p.specifications.quote_on_request!==true)return;
    if(document.getElementById('gwSupplierQuoteBtn'))return;
    const b=document.createElement('button');b.id='gwSupplierQuoteBtn';b.textContent='QUERY PRICE & AVAILABILITY';
    b.style.cssText='position:fixed;right:18px;bottom:18px;z-index:1001;background:#ff1c2d;color:#fff;border:0;border-radius:10px;padding:14px 18px;font-weight:900;cursor:pointer;box-shadow:0 8px 25px #000';
    b.onclick=()=>openQuote(p);document.body.appendChild(b);
  }
  function openQuote(p){
    let m=document.getElementById('gwSupplierQuoteModal');
    if(!m){m=document.createElement('div');m.id='gwSupplierQuoteModal';m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.86);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px';m.innerHTML='<div style="width:min(560px,100%);background:#07111e;border:1px solid #087fe0;border-radius:14px;padding:20px;color:#fff"><button id="gwQClose" style="float:right;background:none;color:#fff;border:0;font-size:25px">×</button><h2>QUERY PRICE & AVAILABILITY</h2><p id="gwQProduct"></p><label>Name<input id="gwQN"></label><label>Email<input id="gwQE" type="email"></label><label>WhatsApp / Phone<input id="gwQP"></label><label>Quantity<input id="gwQQ" type="number" min="1" value="1"></label><label>Vehicle / Application<input id="gwQV"></label><label>Delivery area / address<input id="gwQA"></label><button id="gwQSend" style="background:#ff1c2d;color:#fff;border:0;border-radius:8px;padding:12px;font-weight:900;width:100%">SEND QUERY</button><p id="gwQStatus"></p></div>';document.body.appendChild(m);m.querySelectorAll('input').forEach(x=>x.style.cssText='width:100%;box-sizing:border-box;margin:5px 0 12px;padding:10px;background:#02060d;color:#fff;border:1px solid #28658c;border-radius:7px');m.querySelectorAll('label').forEach(x=>x.style.cssText='display:block;color:#9fb1c4');m.querySelector('#gwQClose').onclick=()=>m.remove();m.querySelector('#gwQSend').onclick=()=>send(p,m)}
    m.querySelector('#gwQProduct').textContent=p.name+' • SKU '+(p.public_sku||'');
  }
  async function send(p,m){
    const v=id=>m.querySelector(id).value.trim(), n=v('#gwQN'), e=v('#gwQE'), ph=v('#gwQP');
    const s=m.querySelector('#gwQStatus'), b=m.querySelector('#gwQSend');
    if(!n||(!e&&!ph)){s.textContent='Name and email or phone are required.';return}
    b.disabled=true;s.textContent='Sending request…';
    try{const r=await fetch(ENDPOINT,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'create_request',public_sku:p.public_sku,customer_name:n,customer_email:e||null,customer_phone:ph||null,whatsapp_phone:ph||null,quantity:Math.max(1,Number(v('#gwQQ')||1)),vehicle_details:{application:v('#gwQV')},delivery_address:v('#gwQA')})});const x=await r.json();if(!r.ok||!x.ok)throw Error(x.error||'Request failed');s.textContent='Request received. Reference: '+x.quote.quote_number;b.textContent='QUERY SENT';}catch(err){s.textContent='Unable to send query. Please contact us on WhatsApp.';b.disabled=false}
  }
  const old=window.openProduct; if(old)window.openProduct=function(p){old(p);setTimeout(()=>installQuote(p),50)};
})();
