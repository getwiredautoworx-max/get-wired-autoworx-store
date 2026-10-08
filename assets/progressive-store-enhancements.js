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
    .gwTools{display:flex;gap:7px;margin-top:7px}.gwCopy{flex:1;background:#07111e;border:1px solid #17618b;color:#dff3ff;border-radius:7px;padding:8px;font-weight:700;cursor:pointer}
    .gwTrust{margin:12px 20px 0;padding:12px;border:1px solid #12456c;border-radius:10px;background:#06111e;color:#cfe1f2;font-size:12px;text-align:center}
    .gwFitment{margin-top:8px;padding:9px;border:1px dashed #17618b;border-radius:7px;color:#aab7c8;font-size:11px;line-height:1.4}
    .gwRecentStrip{margin-top:14px;padding:11px;border:1px solid #12456c;border-radius:10px;background:#06111e}
    .gwRecentTitle{font-size:12px;font-weight:800;color:#dff3ff;margin-bottom:8px}
    .gwRecentItems{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
    .gwRecentItem{min-width:0;text-align:left;background:#07111e;border:1px solid #17618b;color:#dff3ff;border-radius:8px;padding:8px;cursor:pointer}
    .gwRecentItem b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px}
     .gwRecentItem small{display:block;color:#8fa4b8;margin-top:3px}
    #gwSavedPanel{position:fixed;right:14px;bottom:70px;z-index:120;background:#07111e;border:1px solid #087fe0;border-radius:12px;box-shadow:0 18px 55px #000;width:min(390px,calc(100vw - 28px));max-height:65vh;overflow:auto;padding:14px;color:#fff;display:none}
    #gwSavedPanel.open{display:block}.gwSavedHead{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}.gwSavedClose{background:none;border:0;color:#fff;font-size:22px;cursor:pointer}.gwSavedItem{display:flex;gap:9px;align-items:center;padding:9px 0;border-top:1px solid #123f60}.gwSavedItem button{background:#07111e;border:1px solid #17618b;color:#dff3ff;border-radius:7px;padding:7px;cursor:pointer}.gwSavedName{flex:1;min-width:0}.gwSavedName b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gwSavedName small{color:#8fa4b8}
    .gwSavedToggle{border:1px solid #ff1c2d!important;background:#07111e!important;color:#fff!important}
    @media(max-width:900px){#gwSearchTools{padding:0 4px}.gwTrust{margin-left:12px;margin-right:12px}.gwTools{flex-direction:column}.gwCopy{width:100%}}
  `;d.head.appendChild(style);

  const search=d.getElementById('searchInput');if(search){
    const wrap=search.parentElement;wrap.style.position='relative';
    if(!d.getElementById('gwSearchTools')){
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
  }

  function enrich(){d.querySelectorAll('.product').forEach(card=>{
    if(card.dataset.gwEnhanced)return;card.dataset.gwEnhanced='1';
    const txt=(card.textContent||'').trim();
    const sku=(card.querySelector('.sku')?.textContent||'').replace(/^\s*(SKU|Part Number)\s*[:#-]?\s*/i,'').trim();
    const name=card.querySelector('h3')?.textContent?.trim()||'product';
    const stock=d.createElement('div');stock.className='gwStock';
    if(/out of stock|sold out|unavailable/i.test(txt))stock.classList.add('out'),stock.textContent='OUT OF STOCK';
    else if(/low stock/i.test(txt))stock.classList.add('low'),stock.textContent='LOW STOCK';
    else stock.textContent='CHECK STOCK';
    card.appendChild(stock);
    if(!card.querySelector('.gwFitment')){
      const f=d.createElement('div');f.className='gwFitment';f.textContent='Vehicle fitment: verify application with Get Wired AutoWorx before ordering.';card.appendChild(f);
    }
    if(!card.querySelector('.gwWA')){const a=d.createElement('a');a.className='gwWA';a.target='_blank';a.rel='noopener';a.textContent='WHATSAPP ABOUT THIS PRODUCT';a.href=WA+'?text='+encodeURIComponent(`Hi Get Wired AutoWorx, I am enquiring about ${name}${sku?' (SKU '+sku+')':''}. Please confirm availability, price and vehicle fitment.`);card.appendChild(a)}
    if(sku&&!card.querySelector('.gwTools')){
      const tools=d.createElement('div');tools.className='gwTools';const b=d.createElement('button');b.className='gwCopy';b.textContent='COPY SKU';b.onclick=async()=>{try{await navigator.clipboard.writeText(sku);b.textContent='SKU COPIED';setTimeout(()=>b.textContent='COPY SKU',1200)}catch(e){b.textContent=sku}};tools.appendChild(b);card.appendChild(tools);
    }
  })}
  const obs=new MutationObserver(enrich);obs.observe(d.body,{childList:true,subtree:true});enrich();
  // Install catalogue search/tools only after the search UI and product modal exist.
  installFullCatalogueSearch(d);
  installProductTools(d);
  if(!d.querySelector('.gwTrust')){const footer=d.getElementById('contact');if(footer){const t=d.createElement('div');t.className='gwTrust';t.textContent='Get Wired AutoWorx • Established 2012 • 074 4884 234 • 4.7/5 Google Rating • Nationwide delivery available';footer.parentNode.insertBefore(t,footer)}}
}
  // Major-retailer search: operate on the full in-memory catalogue from the iframe document.
  function installFullCatalogueSearch(d){
    if(!d)return;
    const search=d.getElementById('searchInput'), box=d.getElementById('gwSearchResults');
    if(!search||!box||search.dataset.gwFullSearch)return;
    search.dataset.gwFullSearch='1';
    const normal=v=>String(v??'').toLowerCase().normalize('NFKD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
    const distance=(a,b)=>{
      if(a===b)return 0;if(!a||!b)return Math.max(a.length,b.length);
      if(Math.abs(a.length-b.length)>3)return 4;
      const prev=Array.from({length:b.length+1},(_,i)=>i);
      for(let i=1;i<=a.length;i++){const cur=[i];for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));prev.splice(0,prev.length,...cur);}
      return prev[b.length];
    };
    const score=(p,q)=>{
      const fields=[
        [normal(p.public_sku),80],[normal(p.sku),80],[normal(p.name),60],
        [normal(p.slug),35],[normal(p.description),20],[normal(p.compatible_vehicles),30],
        [normal(p.brand),30],[normal(p.category_name),15]
      ];
      const qt=normal(q).split(/\\s+/).filter(Boolean); let total=0;
      for(const term of qt){
        let best=0;
        for(const [field,weight] of fields){
          if(!field)continue;
          const words=field.split(/\\s+/);
          if(field===term||field.startsWith(term+' ')||field.includes(' '+term))best=Math.max(best,weight);
          else if(words.some(w=>w.startsWith(term)))best=Math.max(best,weight*0.8);
          else if(term.length>=4&&words.some(w=>distance(w,term)<=1))best=Math.max(best,weight*0.65);
        }
        total+=best;
      }
      return total+(p.stock_quantity>0?2:0);
    };
    const esc=v=>String(v??'').replace(/[&<>"]/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[x]));
    const render=()=>{
      const q=search.value.trim(); if(!q){box.classList.remove('open');return;}
      const all=Array.isArray(d.defaultView.gwProducts)?d.defaultView.gwProducts:[];
      const hits=all.map(p=>({p,s:score(p,q)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,15).map(x=>x.p);
      box.innerHTML=hits.length?hits.map((p,i)=>'<div class="gwResult" data-full-product="'+i+'"><b>'+esc(p.name)+'</b><small>SKU: '+esc(p.public_sku||p.sku||'')+(p.price!=null?' · '+new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(Number(p.price)):'')+'</small></div>').join(''):'<div class="gwNoResults">No matching product found. Try a SKU, part number, brand, vehicle or product name.</div>';
      box._gwFullHits=hits;box.classList.add('open');
    };
    search.addEventListener('input',render);
    box.addEventListener('click',e=>{const row=e.target.closest('[data-full-product]');if(!row)return;const p=box._gwFullHits?.[Number(row.dataset.fullProduct)];if(p&&typeof d.defaultView.gwOpenProduct==='function'){d.defaultView.gwOpenProduct(p);box.classList.remove('open');}});
  }

  // Recently viewed products + wishlist button, scoped to the iframe document.
  function installProductTools(d){
    if(!d)return;
    const modal=d.getElementById('productModal');if(!modal||modal.dataset.gwTools)return;
    modal.dataset.gwTools='1';
    if(!d.getElementById('gwSavedToggle')){const b=d.createElement('button');b.id='gwSavedToggle';b.className='gwSavedToggle';b.textContent='♡ SAVED';const anchor=d.getElementById('searchInput');if(anchor&&anchor.parentElement){anchor.parentElement.parentElement.appendChild(b)}const panel=d.createElement('div');panel.id='gwSavedPanel';panel.innerHTML='<div class="gwSavedHead"><b>Saved Products</b><button class="gwSavedClose">×</button></div><div class="gwSavedList"></div>';d.body.appendChild(panel);b.onclick=()=>{renderSaved();panel.classList.toggle('open')};panel.querySelector('.gwSavedClose').onclick=()=>panel.classList.remove('open');function renderSaved(){let ids=[];try{ids=JSON.parse(localStorage.getItem('gw_wishlist')||'[]')}catch(e){};const all=Array.isArray(d.defaultView.gwProducts)?d.defaultView.gwProducts:[];const ps=ids.map(id=>all.find(x=>x.id===id)).filter(Boolean);const list=panel.querySelector('.gwSavedList');if(!ps.length){list.innerHTML='<div class="gwNoResults">No saved products yet. Open a product and tap SAVE PRODUCT.</div>';return}list.innerHTML=ps.map((p,i)=>'<div class="gwSavedItem"><div class="gwSavedName"><b>'+String(p.name||'Product').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))+'</b><small>SKU: '+String(p.public_sku||p.sku||'')+'</small></div><button data-open="'+i+'">VIEW</button><button data-remove="'+i+'">REMOVE</button></div>').join('');list.querySelectorAll('[data-open]').forEach(x=>x.onclick=()=>{d.defaultView.gwOpenProduct(ps[Number(x.dataset.open)]);panel.classList.remove('open')});list.querySelectorAll('[data-remove]').forEach(x=>x.onclick=()=>{ids=ids.filter(id=>id!==ps[Number(x.dataset.remove)].id);localStorage.setItem('gw_wishlist',JSON.stringify(ids));renderSaved()})}}
    const obs=new MutationObserver(()=>{
      const detail=modal.querySelector('.detail');if(!detail)return;
      const title=detail.querySelector('h2')?.textContent?.trim();if(!title)return;
      const all=Array.isArray(d.defaultView.gwProducts)?d.defaultView.gwProducts:[];
      const p=all.find(x=>x.name===title);if(!p)return;
      const actions=detail.querySelector('.detailActions');if(!actions||actions.querySelector('.gwWishlist'))return;
      const b=d.createElement('button');b.className='gwWishlist';b.textContent='♡ SAVE PRODUCT';b.style.cssText='background:#07111e;border:1px solid #ff1c2d;color:#fff';
      b.onclick=()=>{let w=[];try{w=JSON.parse(localStorage.getItem('gw_wishlist')||'[]')}catch(e){};if(!w.includes(p.id))w.push(p.id);localStorage.setItem('gw_wishlist',JSON.stringify(w));b.textContent='♥ SAVED';const t=d.getElementById('gwSavedToggle');if(t)t.textContent='♥ SAVED ('+w.length+')';};
      actions.appendChild(b);
      let rv=[];try{rv=JSON.parse(localStorage.getItem('gw_recent')||'[]')}catch(e){}
      rv=[p.id,...rv.filter(x=>x!==p.id)].slice(0,10);localStorage.setItem('gw_recent',JSON.stringify(rv));

      // Surface recently viewed products inside the current product flow.
      const oldRecent=detail.querySelector('.gwRecentStrip'); if(oldRecent) oldRecent.remove();
      const recentIds=rv.filter(x=>x!==p.id).slice(0,4);
      const recentProducts=recentIds.map(id=>all.find(x=>x.id===id)).filter(Boolean);
      if(recentProducts.length){
        const strip=d.createElement('div');strip.className='gwRecentStrip';
        strip.innerHTML='<div class="gwRecentTitle">Recently viewed</div><div class="gwRecentItems">'+recentProducts.map((rp,i)=>'<button type="button" class="gwRecentItem" data-recent-index="'+i+'"><b>'+String(rp.name||'Product').replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))+'</b><small>'+String(rp.public_sku||rp.sku||'')+'</small></button>').join('')+'</div>';
        strip.querySelectorAll('[data-recent-index]').forEach(btn=>btn.addEventListener('click',()=>{
          const rp=recentProducts[Number(btn.dataset.recentIndex)];
          if(rp&&typeof d.defaultView.gwOpenProduct==='function') d.defaultView.gwOpenProduct(rp);
        }));
        detail.appendChild(strip);
      }
    });
    obs.observe(modal,{childList:true,subtree:true});
  }

function boot(){const f=document.getElementById('store');if(!f)return;const go=()=>setTimeout(()=>{try{install(f)}catch(e){}},100);f.addEventListener('load',go);go();setInterval(()=>{try{install(f)}catch(e){}},2500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
