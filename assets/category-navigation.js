(function(){
  const MAP={
    'AUTO ELECTRICAL':'6cc56033-b0a9-4f25-b207-aeeb341a1c47',
    'VEHICLE SECURITY':'8e93d917-8fcc-4427-b364-cdad244f263f',
    'CAR ALARMS & IMMOBILIZERS':'8e93d917-8fcc-4427-b364-cdad244f263f',
    'CENTRAL LOCKING':'8e93d917-8fcc-4427-b364-cdad244f263f',
    'CAR AUDIO':'5ab55c53-eee3-41ce-ad48-04ad6df85181',
    'ACCESSORIES':'87982093-7d81-4f2e-a8e2-e20cdeef30d8',
    'MARINE':'38b382c1-6ee0-4b3c-86ad-399094bc40cc',
    'TOOLS':'77297c18-67f6-452e-8918-c55d2ef6231a',
    'CAMPING':'af2f8625-4f42-45e6-9f21-d571d7415893',
    'TRAILER':'63a71fd9-df45-43f0-b61d-ad622daa9d79'
  };
  function install(frame){
    try{
      const d=frame.contentDocument;if(!d)return;
      const go=(text)=>{const key=text.trim().replace(/\s+/g,' ').toUpperCase();const id=MAP[key];if(id)frame.contentWindow.location.href='category.html?id='+encodeURIComponent(id);};
      d.querySelectorAll('.catBtn').forEach(btn=>{if(btn.dataset.gwNav)return;btn.dataset.gwNav='1';btn.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();go(btn.innerText||btn.textContent);},true);});
      d.querySelectorAll('#allProductsLink,#shopAllLink').forEach(a=>{a.href='category.html';a.target='_self';});
    }catch(e){}
  }
  window.installGetWiredCategoryNavigation=function(frame){install(frame);setInterval(()=>install(frame),1000);};
})();
