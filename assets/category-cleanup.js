(function(){
  function apply(){
    try {
      const frame=document.getElementById('store');
      const d=frame && frame.contentDocument;
      if(!d) return;
      d.querySelectorAll('#categoryGrid > .catWrap').forEach(function(card){
        const txt=(card.innerText||'').trim();
        // The category tile's small label is the actual product count. The italic
        // element is only the action label ("SHOP →"), not a count.
        const countEl=card.querySelector('.catBtn small');
        const countText=countEl ? (countEl.textContent||'') : '';
        const match=countText.match(/[0-9][0-9,]*/);
        const count=match ? parseInt(match[0].replace(/,/g,''),10) : NaN;
        const childCounts=[...card.querySelectorAll('.child span')].map(function(x){
          return parseInt((x.textContent||'').replace(/[^0-9]/g,''),10);
        }).filter(Number.isFinite);
        const hasProducts=Number.isFinite(count) ? count>0 : childCounts.some(function(n){return n>0;});
        const mainRootIds=['6cc56033-b0a9-4f25-b207-aeeb341a1c47','8e93d917-8fcc-4427-b364-cdad244f263f','5ab55c53-eee3-41ce-ad48-04ad6df85181','87982093-7d81-4f2e-a8e2-e20cdeef30d8','38b382c1-6ee0-4b3c-86ad-399094bc40cc','77297c18-67f6-452e-8918-c55d2ef6231a','af2f8625-4f42-45e6-9f21-d571d7415893','63a71fd9-df45-43f0-b61d-ad622daa9d79'];
        if(!hasProducts && !mainRootIds.includes(card.dataset.filter) && !/SHOP BY CATEGORY/i.test(txt)) card.style.display='none';
        else card.style.removeProperty('display');
      });
      const grid=d.getElementById('categoryGrid');
      if(grid){
        const visible=[...grid.querySelectorAll(':scope > .catWrap')].filter(function(x){return getComputedStyle(x).display!=='none';});
        if(visible.length===0 && grid.querySelector(':scope > .catWrap')){
          grid.innerHTML='<div class="searchStatus">Categories are being updated. Please use Search or WhatsApp us.</div>';
        }
      }
    } catch(e) {}
  }
  window.installGetWiredCategoryCleanup=function(frame){
    if(!frame) return;
    frame.addEventListener('load',function(){apply();setTimeout(apply,700);setTimeout(apply,1800);setTimeout(apply,3500);});
    setInterval(apply,5000);
  };
})();
