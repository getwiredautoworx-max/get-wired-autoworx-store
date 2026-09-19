(()=>{
'use strict';
const WA='https://wa.me/27744884234';
function install(frame){
  const d=frame.contentDocument;if(!d||d.getElementById('gw-progressive-enhancements'))return;
  const style=d.createElement('style');style.id='gw-progressive-enhancements';style.textContent=`
    #gwSearchTools{display:flex;gap:8px;align-items:center;margin:8px 0 0;max-width:620px;flex-wrap:wrap}
    #gwSearchTools button{border:1px solid #17618b;background:#07111e;color:#dff3ff;border-radius:999px;padding:7px 11px;font-weight:700;cursor:pointer}
    #gwSearchTools button.active{background:#087fe0;color:#fff}
    #gwSearchResults{position:absolute;z-index:70;left:0;right:0;top:54px;background:#07111e;border:1px solid #087fe0;border-radius:12px;box-shadow:0 15px 45px #000;max-height:55vh;overflow:auto;display:none}
    #gwSearchResults.open{display:block}
    .gwResult{padding:12px;border-bottom:1px solid #123f60;cursor:pointer}.gwResult:hover{background:#0b1c2d}.gwResult b{display:block}.gwResult small{color:#8fa4b8}
    .gwNoResults{padding:18px;color:#aab7c8;text-align:center}
    .gwStock{font-size:11px;font-weight:800;margin-top:5px;color:#7ee2a8}.gwStock.low{color:#ffd15c}.gwStock.out{color:#ff7180}
    .gwWA{display:block!important;background:#168b4b!important;color:#fff!important;text-align:center;text-decoration:none;padding:9px;border-radius:7px;margin-top:7px;font-weight:800}
    .gwTrust{margin:12px 20px 0;padding:12px;border:1px solid #12456c;border-radius:10px;background:#06111e;color:#cfe1f2;font-size:12px;text-align:center}
    @media(max-width:900px){#gwSearchTools{padding:0 4px}.gwTrust{margin-left:12px;margin-right:12px}}
  `;d.head.appendChild(style);

  const search=d.getElementById('searchInput');if(search){
    const wrap=search.parentElement;wrap.style.position='relative';
    const tools=d.createElement('div');tools.id='gwSearchTools';tools.innerHTML='<button data-mode="all" class="active">All</button><button data-mode="in">In Stock</button><button data-mode="clear">Clear</button>';
    const results=d.createElement('div');results.id='gwSearchResults';wrap.appendChild(results);wrap.parentElement.appendChild(tools);
    let mode='all';
    function data(){return Array.from(d.querySelectorAll('.product')).map(card=>({card,text:(card.textContent||'').toLowerCase()}));}
    function filter(){const q=search.value.trim().toLowerCase();const rows=data();let shown=0;rows.forEach(x=>{const match=!q||x.text.includes(q);const stock=!mode||mode==='all'||(mode==='in'&&!/out of stock|sold out|unavailable/.test(x.text));x.card.style.display=match&&stock?'':'none';if(match&&stock)shown++});
      if(!q){results.classList.remove('open');return}
      const hits=rows.filter(x=>x.text.includes(q)).slice(0,12);results.innerHTML=hits.length?hits.map(x=>`<div class="gwResult">${x.card.querySelector('h3')?.outerHTML||'<b>Product</b>'}<small>${(x.card.querySelector('.sku')?.textContent||'').trim()}</small></div>`).join(''):'<div class="gwNoResults">No matching product found. Try the SKU, part number or product name.</div>';
      results.classList.add('open');
    }
    search.addEventListener('input',filter);search.addEventListener('focus',()=>{if(search.value.trim())filter()});
    d.addEventListener('click',e=>{if(!results.contains(e.target)&&e.target!==search)results.classList.remove('open')});
    tools.querySelectorAll('button').forEach(b=>b.onclick=()=>{mode=b.dataset.mode==='in'?'in':'all';tools.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(b.dataset.mode==='clear'){search.value='';mode='all';tools.querySelector('[data-mode="all"]').classList.add('active')}filter()});
  }

  // Add stock labels and SKU-specific WhatsApp enquiry buttons to cards.
  function enrich(){d.querySelectorAll('.product').forEach(card=>{
    if(card.dataset.gwEnhanced)return;card.dataset.gwEnhanced='1';
    const txt=(card.textContent||'').trim();const sku=(card.querySelector('.sku')?.textContent||'').replace(/^\s*(SKU|Part Number)\s*[:#-]?\s*/i,'').trim();
    const price=card.querySelector('.price')?.textContent?.trim()||'';const name=card.querySelector('h3')?.textContent?.trim()||'product';
    const stock=d.createElement('div');stock.className='gwStock';
    if(/out of stock|sold out|unavailable/i.test(txt))stock.classList.add('out'),stock.textContent='OUT OF STOCK';
    else if(/low stock/i.test(txt))stock.classList.add('low'),stock.textContent='LOW STOCK';
    else stock.textContent='CHECK STOCK';
    card.appendChild(stock);
    if(!card.querySelector('.gwWA')){const a=d.createElement('a');a.className='gwWA';a.target='_blank';a.rel='noopener';a.textContent='WHATSAPP ABOUT THIS PRODUCT';a.href=WA+'?text='+encodeURIComponent(`Hi Get Wired AutoWorx, I am enquiring about ${name}${sku?' (SKU '+sku+')':''}. Please confirm availability and fitment.`);card.appendChild(a)}
  })}
  const obs=new MutationObserver(enrich);obs.observe(d.body,{childList:true,subtree:true});enrich();
  if(!d.querySelector('.gwTrust')){const footer=d.getElementById('contact');if(footer){const t=d.createElement('div');t.className='gwTrust';t.textContent='Get Wired AutoWorx • Established 2012 • 074 4884 234 • 4.7/5 Google Rating • Nationwide delivery available';footer.parentNode.insertBefore(t,footer)}}
}
function boot(){const f=document.getElementById('store');if(!f)return;const go=()=>setTimeout(()=>{try{install(f)}catch(e){}},100);f.addEventListener('load',go);go();setInterval(()=>{try{install(f)}catch(e){}},2500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
