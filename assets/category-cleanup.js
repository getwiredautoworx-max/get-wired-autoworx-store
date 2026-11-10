(function(){
  // Legacy compatibility hook retained for existing preview shells.
  // Category visibility is owned by the category renderer; unknown/zero counts
  // must never hide navigation nodes or replace the category grid.
  window.installGetWiredCategoryCleanup=function(frame){
    if(!frame)return;
    function restoreCategoryVisibility(){
      try{
        const doc=frame.contentDocument;
        if(!doc)return;
        const grid=doc.getElementById('categoryGrid');
        if(!grid)return;
        const cards=grid.getElementsByClassName('catWrap');
        for(let i=0;i<cards.length;i++)cards[i].style.removeProperty('display');
      }catch(error){
        // Cross-origin or not-yet-ready frames are left untouched.
      }
    }
    if(frame.contentDocument&&frame.contentDocument.readyState==='complete')restoreCategoryVisibility();
    else frame.addEventListener('load',restoreCategoryVisibility,{once:true});
  };
})();
