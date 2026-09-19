/*
 * Get Wired AutoWorx product-image fallback.
 *
 * Uses only the exact SKU-named local product asset. It never searches for
 * visually similar products or substitutes an unrelated image.
 */
(function () {
  'use strict';

  function skuFrom(scope) {
    var node = scope && scope.querySelector ? scope.querySelector('.sku') : null;
    if (!node) return '';
    return (node.textContent || '').trim().replace(/^SKU:\s*/i, '').trim();
  }

  function localImageUrl(sku) {
    return sku ? '/assets/products/' + encodeURIComponent(sku) + '.jpg' : '';
  }

  function isPlaceholder(src) {
    var s = String(src || '').toLowerCase();
    return !s || s.indexOf('placeholder') !== -1 || s.indexOf('no-image') !== -1 || s.indexOf('no_image') !== -1 || s.indexOf('default-product') !== -1;
  }

  function install(frame) {
    if (!frame) return;

    function patch(doc) {
      if (!doc || doc.__gwImageFallbackInstalled) return;
      doc.__gwImageFallbackInstalled = true;

      function tryLocal(scope, existing) {
        var sku = skuFrom(scope);
        if (!sku) return;
        var url = localImageUrl(sku);
        if (!url) return;

        if (existing) {
          if (existing.dataset.gwFallbackBound) return;
          existing.dataset.gwFallbackBound = '1';
          var original = existing.src;
          if (isPlaceholder(original)) existing.src = url;
          existing.addEventListener('error', function () {
            if (existing.dataset.gwFallbackTried) return;
            existing.dataset.gwFallbackTried = '1';
            if (!isPlaceholder(original)) existing.src = original;
          });
          return;
        }

        var box = scope.querySelector('.prodImg, .detailImg');
        if (!box || box.querySelector('[data-gw-fallback-image]')) return;
        var img = doc.createElement('img');
        img.alt = ((scope.querySelector('h3,h2') || {}).textContent || ('Product ' + sku)).trim();
        img.loading = 'lazy';
        img.dataset.gwFallbackImage = '1';
        img.src = url;
        img.addEventListener('error', function () { img.remove(); }, { once: true });
        box.appendChild(img);
      }

      function patchScope(scope) {
        if (!scope) return;
        var box = scope.querySelector('.prodImg, .detailImg');
        if (!box) return;
        tryLocal(scope, box.querySelector('img'));
      }

      function scan() {
        doc.querySelectorAll('.product, .detail').forEach(patchScope);
      }

      scan();
      new MutationObserver(scan).observe(doc.body, { childList: true, subtree: true });
    }

    function ready() {
      try { patch(frame.contentDocument || frame.contentWindow.document); } catch (e) {}
    }

    frame.addEventListener('load', ready);
    if (frame.contentDocument && frame.contentDocument.readyState === 'complete') ready();
  }

  window.installGetWiredProductImageFallback = install;
})();
