/* Get Wired AutoWorx — category navigation bridge
 * Converts homepage category tiles into a proper ecommerce hierarchy:
 * homepage tile -> category/subcategory page -> terminal product listing.
 */
(function(){
  const BASE='category.html';
  const CATEGORY_IDS={
    'car-audio':'e3d19d20-fb46-426c-9f64-221d863add0b',
    'home-entertainment':'07b76301-da5c-4810-a19f-d8b6e2ae2f06',
    'band-equipment':'862605ef-5223-4525-aad6-ee17c2c6f9e7',
    'dj-equipment':'83ea8ae6-a464-40a2-a503-272792f70be8',
    instruments:'76aee522-bf0e-4e7e-809c-e5c31afd3f6b',
    lifestyle:'f91c7c30-82b4-42d4-bf4f-e807172cedc4',
    'vacuum-cleaners':'b6d72815-c634-424c-9520-abed7cbdee1a',
    'pool-cleaners':'a8593e12-53fb-4514-ad19-d9e9a19b6953',
    'alternators-starters':'07bc149c-4ab3-41bd-bab3-01415cb8a24c',
    'batteries-charging':'8f2e0f4e-6787-4fbf-b99b-4bea3a1dba10',
    'fuses-relays-wiring':'2a3c2f37-19de-472c-8fe9-d6c61ee4fd16',
    'globes-vehicle-lighting':'89595653-97d4-4b18-ba69-117547d32ed0',
    'sensors-switches':'9f85f25f-800d-4ae4-854d-0213d83b86fa',
    'car-care':'75d265b0-4e9c-4492-b54f-0db7c8202756',
    'car-mats':'c35d15c1-d665-413f-b528-878b6a655d5d',
    'seat-covers-interior':'b4332bab-a908-4c27-9fe4-68965617620e',
    'exterior-accessories':'9bbc3d8e-5c54-4a36-839d-7658a681ac31'
  };
  const ALIASES={
    'CAR AUDIO':'car-audio',
    'CAR AUDIO / HOME ENTERTAINMENT / LIFESTYLE':'car-audio',
    'HOME ENTERTAINMENT':'home-entertainment',
    'BAND EQUIPMENT':'band-equipment',
    'DJ EQUIPMENT':'dj-equipment',
    'INSTRUMENTS':'instruments',
    'LIFESTYLE':'lifestyle',
    'VACUUM CLEANERS':'vacuum-cleaners',
    'POOL CLEANERS':'pool-cleaners',
    'AUTO ELECTRICAL PARTS & SPARES':'alternators-starters',
    'AUTO ELECTRICAL':'alternators-starters',
    'CAR CARE & ACCESSORIES':'car-care',
    'CAR MATS':'car-mats',
    'CAR CARE':'car-care'
  };
  function clean(s){return String(s||'').replace(/\s+/g,' ').trim().toUpperCase();}
  function openCategory(id){
    if(!id)return;
    // Root-absolute path is required because Cloudflare Pages may serve store.html at /store.
    window.location.href=window.location.origin+'/'+BASE+'?id='+encodeURIComponent(id);
  }
    function installCategoryPresentation(frame){
    try{
      const d=frame.contentDocument;
      if(!d||d.getElementById('gw-category-presentation'))return;
      const style=d.createElement('style');
      style.id='gw-category-presentation';
      style.textContent=`
        /* Approved homepage design: exactly three columns at every viewport width.
           Nine active root categories therefore form a 3 x 3 image-led button grid. */
        #categoryGrid.cats{grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch;gap:12px}
        #categoryGrid .catWrap{min-width:0;height:100%}
        #categoryGrid .catBtn{min-width:0;height:100%;display:flex;flex-direction:column;padding:0}
        #categoryGrid .catImage{display:block;width:100%;height:clamp(76px,11vw,140px);overflow:hidden}
        #categoryGrid .catImage img{display:block;width:100%;height:100%;object-fit:contain}
        #categoryGrid .catContent{display:flex;flex:1;flex-direction:column;align-items:flex-start;gap:6px;padding:10px}
        #categoryGrid .catContent b{overflow-wrap:anywhere;line-height:1.25}
        #categoryGrid .catContent small{font-size:12px}
        #categoryGrid .catContent i{margin-top:auto}
        #categoryGrid .children{grid-column:1/-1}
        #categoryGrid .children{display:none;max-width:100%;padding:10px 8px 12px;overflow:hidden}
        #categoryGrid .catWrap.open .children{display:flex;gap:8px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:thin}
        #categoryGrid .children>.catWrap{flex:0 0 190px;min-width:0;max-width:220px;align-self:stretch;scroll-snap-align:start}
        #categoryGrid .children>.catWrap .catBtn{min-height:78px;padding:10px}
        #categoryGrid .children>.catWrap .catImage{height:92px;display:block;overflow:hidden}
        #categoryGrid .children>.catWrap .catImage img{width:100%;height:100%;object-fit:contain}
        #categoryGrid .children .child{flex:0 0 auto;min-width:150px;max-width:210px;min-height:46px;gap:10px;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid #28658c;border-radius:9px;background:#071728;scroll-snap-align:start}
        #categoryGrid .children .child span{white-space:nowrap}
        @media(max-width:700px){
          #categoryGrid.cats{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
          #categoryGrid .catImage{height:clamp(58px,20vw,92px)}
          #categoryGrid .catContent{padding:7px 6px;gap:5px}
          #categoryGrid .catContent b{font-size:clamp(10px,2.8vw,12px);line-height:1.2}
          #categoryGrid .catContent small{font-size:10px}
          #categoryGrid .catContent i{font-size:13px}
          #categoryGrid .children>.catWrap{flex-basis:150px}
          #categoryGrid .children>.catWrap .catImage{height:78px}
          #categoryGrid .children .child{min-width:138px;font-size:12px}
        }
        @media(max-width:360px){
          #categoryGrid.cats{grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}
          #categoryGrid .catContent{padding:6px 4px}
          #categoryGrid .catContent b{font-size:10px}
        }
      `;
      d.head.appendChild(style);
    }catch(err){console.warn('GW category presentation:',err);}
  }
  function install(frame){
    try{
      const d=frame.contentDocument;
      if(!d || d.__gwCategoryBridge)return;
      // Presentation is optional: it must never prevent the navigation handler from attaching.
      if(d.head){
        try{installCategoryPresentation(frame)}catch(presentationError){console.warn('GW category presentation skipped:',presentationError);}
      }
      d.addEventListener('click',function(e){
        const tile=e.target.closest('.catBtn[data-filter], .child[data-filter]');
        if(!tile)return;
        const id=tile.dataset.filter;
        if(!id)return;
        e.preventDefault();
        e.stopImmediatePropagation();
        openCategory(id);
      },true);
      // Mark the document only after the click handler has successfully attached.
      d.__gwCategoryBridge=true;
    }catch(err){console.warn('GW category bridge:',err);}
  }
  window.installGetWiredCategoryNavigation=function(frame){
    installCategoryPresentation(frame);
    install(frame);
    frame.addEventListener('load',function(){setTimeout(function(){install(frame)},0)});
    setInterval(function(){install(frame)},1500);
  };
})();
