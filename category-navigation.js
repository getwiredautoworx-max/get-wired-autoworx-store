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
    'tools-workshop':'77297c18-67f6-452e-8918-c55d2ef6231a'
  };
  const ALIASES={
    'AUTO ELECTRICAL':'electrical',
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
  function install(frame){
    try{
      const d=frame.contentDocument;
      if(!d || d.__gwCategoryBridge)return;
      d.__gwCategoryBridge=true;
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
    install(frame);
    frame.addEventListener('load',function(){setTimeout(function(){install(frame)},0)});
    setInterval(function(){install(frame)},1500);
  };
})();
