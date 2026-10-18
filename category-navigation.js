/* Get Wired AutoWorx — category navigation bridge
 * Converts homepage category tiles into a proper ecommerce hierarchy:
 * homepage tile -> category/subcategory page -> terminal product listing.
 */
(function(){
  const BASE='category.html';
  const CATEGORY_IDS={
    electrical:'6cc56033-b0a9-4f25-b207-aeeb341a1c47',
    'alarms-security':'8e93d917-8fcc-4427-b364-cdad244f263f',
    'central-locking':'deee5051-0253-441a-ac16-54c21873bdb5',
    'car-audio-store':'5ab55c53-eee3-41ce-ad48-04ad6df85181',
    'automotive-accessories':'87982093-7d81-4f2e-a8e2-e20cdeef30d8',
    lighting:'cfd3e001-9292-459f-b0e5-9502f160eb5c',
    'tools-workshop':'77297c18-67f6-452e-8918-c55d2ef6231a',
    'camping-outdoors':'af2f8625-4f42-45e6-9f21-d571d7415893',
    'trailer-canopy':'63a71fd9-df45-43f0-b61d-ad622daa9d79',
    '4x4-outdoor':'182423ec-ea46-43e4-bbe3-b8857b5a1583',
    'marine-spares':'38b382c1-6ee0-4b3c-86ad-399094bc40cc'
  };
  const ALIASES={
    'AUTO ELECTRICAL':'electrical',
    'AUTO ELECTRICAL SPARES':'electrical',
    'VEHICLE SECURITY':'alarms-security',
    'CAR AUDIO & ENTERTAINMENT':'car-audio-store',
    'AUTOMOTIVE ACCESSORIES':'automotive-accessories',
    'MARINE SPARES & ACCESSORIES':'marine-spares',
    'TOOLS, HARDWARE & CONSUMABLES':'tools-workshop',
    'CAMPING, LEISURE & OUTDOORS':'camping-outdoors',
    'TRAILER & CANOPY':'trailer-canopy',
    '4X4 OUTDOOR':'4x4-outdoor',
    'CAR ALARMS & IMMOBILIZERS':'alarms-security',
    'CAR ALARMS & IMMOBILISERS':'alarms-security',
    'CENTRAL LOCKING':'central-locking',
    'CAR AUDIO':'car-audio-store',
    'REVERSE CAMERA':'automotive-accessories',
    'PDC SENSORS':'automotive-accessories',
    'REMOTE / KEY CASING REPAIRS':'alarms-security',
    'DVD & MULTIMEDIA':'car-audio-store',
    'CAR LIGHTING & LEDS':'lighting',
    'WIRING & CONNECTORS':'electrical',
    'DIAGNOSTIC TESTING & REPAIRS':'tools-workshop',
    'DOOR LOCK & WINDOW REPAIRS':'automotive-accessories'
  };
  function clean(s){return String(s||'').replace(/\s+/g,' ').trim().toUpperCase();}
  function openCategory(name){
    const key=clean(name);
    const slug=ALIASES[key];
    const id=slug && CATEGORY_IDS[slug];
    if(!id)return;
    window.open(BASE+'?id='+encodeURIComponent(id),'_blank','noopener');
  }
  function installCategoryPresentation(frame){
    try{
      const d=frame.contentDocument;
      if(!d||d.getElementById('gw-category-presentation'))return;
      const style=d.createElement('style');
      style.id='gw-category-presentation';
      style.textContent=`
        /* Approved homepage design: exactly three columns at every viewport width.
           Eight approved root categories form the 3-column image-led button grid. */
        #categoryGrid.cats{grid-template-columns:repeat(3,minmax(0,1fr));align-items:stretch;gap:12px}
        #categoryGrid .catWrap{min-width:0;height:100%}
        #categoryGrid .catBtn{min-width:0;height:100%;display:flex;flex-direction:column;padding:0}
        #categoryGrid .catImage{display:block!important;visibility:visible!important;width:100%;height:clamp(76px,11vw,140px);min-height:76px;overflow:hidden;flex:0 0 auto}
        #categoryGrid .catImage img{display:block!important;visibility:visible!important;width:100%;height:100%;min-height:76px;object-fit:contain}
        #categoryGrid .catContent{display:flex;flex:1;flex-direction:column;align-items:flex-start;gap:6px;padding:10px}
        #categoryGrid .catContent b{overflow-wrap:anywhere;line-height:1.25}
        #categoryGrid .catContent small{font-size:12px}
        #categoryGrid .catContent i{margin-top:auto}
        #categoryGrid .children{grid-column:1/-1}
        #categoryGrid .children{display:none;max-width:100%;padding:10px 8px 12px;overflow:hidden}
        #categoryGrid .catWrap.open .children{display:flex;gap:8px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:thin}
        #categoryGrid .children>.catWrap{flex:0 0 190px;min-width:0;max-width:220px;align-self:stretch;scroll-snap-align:start}\n        #categoryGrid .children>.catWrap .catBtn{min-height:78px;padding:10px}\n        #categoryGrid .children>.catWrap .catImage{height:92px;display:block;overflow:hidden}\n        #categoryGrid .children>.catWrap .catImage img{width:100%;height:100%;object-fit:contain}\n        #categoryGrid .children .child{flex:0 0 auto;min-width:150px;max-width:210px;min-height:46px;gap:10px;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid #28658c;border-radius:9px;background:#071728;scroll-snap-align:start}
        #categoryGrid .children .child span{white-space:nowrap}
        @media(max-width:700px){
          #categoryGrid.cats{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
          #categoryGrid .catImage{height:clamp(58px,20vw,92px)}
          #categoryGrid .catContent{padding:7px 6px;gap:5px}
          #categoryGrid .catContent b{font-size:clamp(10px,2.8vw,12px);line-height:1.2}
          #categoryGrid .catContent small{font-size:10px}
          #categoryGrid .catContent i{font-size:13px}
          #categoryGrid .children>.catWrap{flex-basis:150px}\n          #categoryGrid .children>.catWrap .catImage{height:78px}\n          #categoryGrid .children .child{min-width:138px;font-size:12px}
        }
        @media(max-width:360px){
          #categoryGrid.cats{grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}
          #categoryGrid .catContent{padding:6px 4px}
          #categoryGrid .catContent b{font-size:10px}
        }
      `;
      const styleTarget=d.head||d.documentElement;\n      if(!styleTarget)return;\n      styleTarget.appendChild(style);
    }catch(err){console.warn('GW category presentation:',err);}
  }
  function install(frame){
    try{
      const d=frame.contentDocument;
      if(!d || d.__gwCategoryBridge)return;
      d.__gwCategoryBridge=true;
      installCategoryPresentation(frame);
      d.addEventListener('click',function(e){
        const btn=e.target.closest('.catBtn');
        if(!btn)return;
        const label=btn.querySelector('b');
        if(!label)return;
        const name=label.textContent.trim();
        if(ALIASES[clean(name)]){
          e.preventDefault();
          e.stopImmediatePropagation();
          openCategory(name);
        }
      },true);
    }catch(err){console.warn('GW category bridge:',err);}
  }
  window.installGetWiredCategoryNavigation=function(frame){
    installCategoryPresentation(frame);
    install(frame);
    frame.addEventListener('load',function(){setTimeout(function(){install(frame)},0)});
    setInterval(function(){install(frame)},1500);
  };
})();
