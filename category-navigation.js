/* Get Wired AutoWorx — category navigation bridge
 * Converts homepage category tiles into a proper ecommerce hierarchy:
 * homepage tile -> category/subcategory page -> terminal product listing.
 */
(function(){
  const BASE='category.html';
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
    if(!slug)return;
    window.open(BASE+'?slug='+encodeURIComponent(slug),'_blank','noopener');
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
