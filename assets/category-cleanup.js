(function(){
  function apply(){
    try {
      const frame=document.getElementById('store');
      const d=frame && frame.contentDocument;
      if(!d) return;
      d.querySelectorAll('.catWrap').forEach(function(card){
        const txt=(card.innerText||'').trim();
        const countEl=card.querySelector('.catBtn i');
        const count=countEl?parseInt((countEl.textContent||'').replace(/[^0-9]/g,''),10):NaN;
        const children=card.querySelectorAll('.child').length;
        const childCounts=[...card.querySelectorAll('.child span')].map(x=>parseInt((x.textContent||'').replace(/[^0-9]/g,''),10)).filter(Number.isFinite);
        const hasProducts=Number.isFinite(count)?count>0:(children>0 && childCounts.some(n=>n>0));
        if(!hasProducts && !/SHOP BY CATEGORY/i.test(txt)) card.style.display='none';
      });
      const grid=d.getElementById('categoryGrid');
      if(grid){
        const visible=[...grid.querySelectorAll('.catWrap')].filter(x=>getComputedStyle(x).display!=='none');
        if(visible.length===0){ grid.innerHTML='<div class="searchStatus">Categories are being updated. Please use Search or WhatsApp us.</div>'; }
      }
    } catch(e) {}
  }
  window.installGetWiredCategoryCleanup=function(frame){
    if(!frame) return;
    frame.addEventListener('load',function(){ apply(); setTimeout(apply,700); setTimeout(apply,1800); setTimeout(apply,3500); });
    setInterval(apply,5000);
  };
})();
