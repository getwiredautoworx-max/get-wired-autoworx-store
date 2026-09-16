/*
 * Get Wired AutoWorx product-image fallback.
 *
 * Purpose: when Supabase image_url/gallery data is blank or an image URL fails,
 * try the verified SKU-named local catalogue asset first. Never invents or
 * searches for an unrelated product image.
 */
(function () {
  'use strict';

  function skuFrom(scope) {
    var node = scope && scope.querySelector ? scope.querySelector('.sku') : null;
    if (!node) return '';
    var text = (node.textContent || '').trim();
    return text.replace(/^SKU:\s*/i, '').trim();
  }

  function localImageUrl(sku) {
    if (!sku) return '';
    return '/assets/products/' + encodeURIComponent(sku) + '.jpg';
  }

  function install(frame) {
    if (!frame) return;

    function patch(doc) {
      if (!doc || doc.__gwImageFallbackInstalled) return;
      doc.__gwImageFallbackInstalled = true;

      function patchScope(scope) {
        if (!scope) return;
        var sku = skuFrom(scope);
        if (!sku) return;
        var url = localImageUrl(sku);
        if (!url) return;

        var box = scope.querySelector('.prodImg, .detailImg');
        if (!box) return;

        var existing = box.querySelector('img');
        if (existing) {
          if (existing.dataset.gwFallbackBound) return;
          existing.dataset.gwFallbackBound = '1';
          existing.addEventListener('error', function () {
            if (existing.dataset.gwFallbackTried) return;
            existing.dataset.gwFallbackTried = '1';
            existing.src = url;
          }, { once: true });
          return;
        }

        if (!box.querySelector('[data-gw-fallback-image]')) {
          var img = doc.createElement('img');
          img.alt = (scope.querySelector('h3,h2') || {}).textContent || ('Product ' + sku);
          img.loading = 'lazy';
          img.dataset.gwFallbackImage = '1';
          img.src = url;
          img.addEventListener('error', function () {
            img.remove();
          }, { once: true });
          box.appendChild(img);
        }
      }

      function scan() {
        doc.querySelectorAll('.product, .detail').forEach(patchScope);
      }

      scan();
      new MutationObserver(scan).observe(doc.body, { childList: true, subtree: true });
    }

    function ready() {
      try {
        patch(frame.contentDocument || frame.contentWindow.document);
      } catch (e) {
        // Same-origin is required; fail closed without changing the storefront.
      }
    }

    frame.addEventListener('load', ready);
    if (frame.contentDocument && frame.contentDocument.readyState === 'complete') ready();
  }

  window.installGetWiredProductImageFallback = install;
})();
