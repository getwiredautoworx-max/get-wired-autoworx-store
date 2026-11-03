/* Get Wired AutoWorx — category visibility compatibility
 *
 * Do not hide category or subcategory buttons because their product count is
 * zero. The owner-approved catalogue reset intentionally leaves public.products
 * empty while supplier rows are reviewed privately. Category navigation must
 * remain usable during that period so customers can browse the approved tree.
 *
 * Older versions filtered tiles against eight deleted legacy category UUIDs
 * and hid every current child tile with zero active products. That made valid
 * subcategories disappear after the reset.
 */
(function(){
  function apply(){
    try {
      const frame=document.getElementById('store');
      const d=frame && frame.contentDocument;
      if(!d) return;

      // Clear only the stale inline hiding applied by the old count-based filter.
      // A zero product count is a valid empty-catalogue state, not a reason to
      // remove the category or its subcategory navigation button.
      d.querySelectorAll('#categoryGrid > .catWrap[data-filter]').forEach(function(card){
        if(card.style.display==='none') card.style.removeProperty('display');
      });

      const grid=d.getElementById('categoryGrid');
      if(grid){
        const status=grid.querySelector(':scope > .searchStatus');
        if(status && !grid.querySelector(':scope > .catWrap')) status.remove();
      }
    } catch(e) {
      // Navigation visibility is best-effort; never interrupt storefront loading.
    }
  }

  window.installGetWiredCategoryCleanup=function(frame){
    if(!frame || frame.__gwCategoryVisibilityInstalled) return;
    frame.__gwCategoryVisibilityInstalled=true;
    frame.addEventListener('load',function(){
      apply();
      setTimeout(apply,700);
      setTimeout(apply,1800);
      setTimeout(apply,3500);
    });
    apply();
  };
})();
