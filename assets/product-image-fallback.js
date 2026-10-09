/*
 * Get Wired AutoWorx exact-SKU product-image fallback.
 *
 * Priority: exact SKU WebP image sourced from ASC website cross-reference,
 * then the existing exact SKU JPG asset. Never substitutes a visually similar
 * product.
 */
(function () {
  'use strict';

  function skuFrom(scope) {
    var node = scope && scope.querySelector ? scope.querySelector('.sku') : null;
    if (!node) return '';
    return (node.textContent || '').trim().replace(/^SKU:\s*/i, '').trim();
  }

  function localUrls(sku) {
    if (!sku) return [];
    var e = encodeURIComponent(sku);
    return ['/assets/products_webp/' + e + '.webp'];
  }

  function isPlaceholder(src) {
    var s = String(src || '').toLowerCase();
    return !s || s.indexOf('placeholder') !== -1 || s.indexOf('no-image') !== -1 || s.indexOf('no_image') !== -1 || s.indexOf('default-product') !== -1 || s.indexOf('gw-logo.png') !== -1;
  }

  function install(frame) {
    if (!frame) return;

    function patch(doc) {
      if (!doc || doc.__gwImageFallbackInstalled) return;
      doc.__gwImageFallbackInstalled = true;

      function tryLocal(scope, existing) {
        var sku = skuFrom(scope);
        var urls = localUrls(sku);
        if (!urls.length) return;

        function tryUrl(img, index, original) {
          if (index >= urls.length) {
            if (img) {
              img.onerror = null;
              img.style.display = 'none';
              var box = img.closest('.prodImg, .detailImg');
              if (box) {
                box.classList.add('no-image');
                box.textContent = 'Image not available';
              }
            }
            return;
          }
          img.onerror = function () { tryUrl(img, index + 1, original); };
          img.src = urls[index];
        }

        if (existing) {
          if (existing.dataset.gwFallbackBound) return;
          existing.dataset.gwFallbackBound = '1';
          var original = existing.src;
          tryUrl(existing, 0, original);
          return;
        }

        var box = scope.querySelector('.prodImg, .detailImg');
        if (!box || box.querySelector('[data-gw-fallback-image]')) return;
        var img = doc.createElement('img');
        img.alt = ((scope.querySelector('h3,h2') || {}).textContent || ('Product ' + sku)).trim();
        img.loading = 'lazy';
        img.dataset.gwFallbackImage = '1';
        box.appendChild(img);
        tryUrl(img, 0, '');
      }

      function patchScope(scope) {
        if (!scope) return;
        var box = scope.querySelector('.prodImg, .detailImg');
        if (!box) return;
        tryLocal(scope, box.querySelector('img'));
      }

      function scan() { doc.querySelectorAll('.product, .detail').forEach(patchScope); }
      scan();
      new MutationObserver(scan).observe(doc.body, { childList: true, subtree: true });
    }

    function ready() { try { patch(frame.contentDocument || frame.contentWindow.document); } catch (e) {} }
    frame.addEventListener('load', ready);
    if (frame.contentDocument && frame.contentDocument.readyState === 'complete') ready();
  }

  window.installGetWiredProductImageFallback = install;
})();
