(()=>{
const style=document.createElement('style');style.textContent='@media(max-width:900px){.header{position:relative!important;top:auto!important}.cartPanel{top:12px!important;max-height:82vh}.modalBox{max-height:88vh}}.gwMenu{position:fixed;inset:0 auto 0 0;width:min(330px,86vw);background:#06111e;border-right:2px solid #087fe0;z-index:200;padding:24px;transform:translateX(-105%);transition:transform .2s;box-shadow:20px 0 60px #000}.gwMenu.open{transform:translateX(0)}.gwMenu button{float:right;background:none;border:0;color:#fff;font-size:30px}.gwMenu a{display:block;padding:15px 4px;color:#fff;text-decoration:none;font-weight:800;border-bottom:1px solid #123f60}.gwMenuBack{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:190;display:none}.gwMenuBack.open{display:block}.gwMissingImage{width:100%;height:100%;min-height:145px;display:grid;place-items:center;text-align:center;color:#8fa4b8;font-weight:800;letter-spacing:.5px;font-size:12px;padding:20px}';document.head.appendChild(style);
function init(){
 const categories=document.getElementById('categories'),services=document.getElementById('approved-services'),shop=document.getElementById('shop'),featured=document.getElementById('featured');
 const show=target=>{[categories,services,shop,featured].forEach(x=>{if(x)x.style.display='none'});if(target)target.style.display='block';target&&target.scrollIntoView({behavior:'smooth',block:'start'})};
 if(categories&&services&&shop&&featured){show(featured);}
 const bind=(selector,target)=>document.querySelectorAll(selector).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();show(target)}));
 bind('a[href="#categories"]',categories);bind('a[href="#shop"]',shop);bind('a[href="#featured"]',featured);bind('a[href="#services"]',services);bind('a[href="#home"]',featured);
 const all=document.getElementById('allProductsLink');if(all)all.onclick=e=>{e.preventDefault();show(shop)};
 const shopAll=document.getElementById('shopAllLink');if(shopAll)shopAll.onclick=e=>{e.preventDefault();show(shop)};
 const h=document.querySelector('.hamb');if(!h||h.dataset.fixed)return;h.dataset.fixed='1';
 const back=document.createElement('div');back.className='gwMenuBack';document.body.appendChild(back);
 const menu=document.createElement('aside');menu.className='gwMenu';menu.innerHTML='<button aria-label="Close menu">×</button><h2>GET WIRED AUTOWORX</h2><a href="#home">HOME</a><a href="#featured">SPECIALS</a><a href="#categories">SHOP BY CATEGORY</a><a href="#shop">ALL PRODUCTS</a><a href="#services">SERVICES</a><a href="#contact">CONTACT US</a><a href="https://wa.me/27744884234">WHATSAPP</a>';document.body.appendChild(menu);
 const close=()=>{menu.classList.remove('open');back.classList.remove('open')};h.onclick=()=>{menu.classList.add('open');back.classList.add('open')};menu.querySelector('button').onclick=close;back.onclick=close;menu.querySelectorAll('a').forEach(a=>a.onclick=()=>{close();const href=a.getAttribute('href');if(href==='#categories')show(categories);else if(href==='#shop')show(shop);else if(href==='#featured'||href==='#home')show(featured);else if(href==='#services')show(services)});
 imagePipeline();
}
function imagePipeline(){
 const placeholder='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="#06111e"/><rect x="24" y="24" width="752" height="452" rx="18" fill="none" stroke="#12456c" stroke-width="3"/><text x="400" y="235" text-anchor="middle" fill="#20b1ff" font-family="Arial" font-size="34" font-weight="700">GET WIRED AUTOWORX</text><text x="400" y="278" text-anchor="middle" fill="#8fa4b8" font-family="Arial" font-size="22">PRODUCT IMAGE UNAVAILABLE</text></svg>');
 const cleanSku=v=>String(v||'').replace(/^\s*SKU\s*[:#-]?\s*/i,'').trim();
 const wire=img=>{
   if(!img||img.dataset.gwImagePipeline)return;
   const card=img.closest('.product');
   if(!card)return;
   const skuEl=card.querySelector('.sku,[data-sku]');
   const sku=cleanSku(skuEl?.dataset?.sku||skuEl?.textContent||'');
   if(!sku)return;
   img.dataset.gwImagePipeline='1';
   const original=img.getAttribute('src')||'';
   const local='assets/products/'+encodeURIComponent(sku)+'.jpg';
   img.loading='lazy';
   img.decoding='async';
   img.onerror=()=>{
     if(img.dataset.gwTriedOriginal!=='1'&&original&&original!==local){img.dataset.gwTriedOriginal='1';img.src=original;return;}
     img.onerror=null;img.classList.add('gwMissingImage');img.alt='Product image unavailable';img.src=placeholder;
   };
   if(!original.endsWith('/'+sku+'.jpg')&&!original.endsWith(sku+'.jpg'))img.src=local;
 };
 const scan=()=>document.querySelectorAll('.product .prodImg img,.product img').forEach(wire);
 scan();
 const observer=new MutationObserver(scan);observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();