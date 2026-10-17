/*
 * Get Wired AutoWorx exact-SKU product-image fallback.
 * Try the exact public SKU WebP first, then the exact public SKU JPG.
 * Never substitutes a visually similar product. Missing assets become a clear
 * neutral placeholder instead of a broken/blank image slot.
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
    return ['/assets/products_webp/' + e + '.webp', '/assets/products/' + e + '.jpg'];
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

        function showPlaceholder(img) {
          if (!img) return;
          img.onerror = null;
          img.onload = null;
          img.style.display = 'none';
          var box = img.closest('.prodImg, .detailImg');
          if (box) {
            box.classList.add('no-image');
            box.textContent = 'Product image unavailable';
            box.setAttribute('role', 'img');
            box.setAttribute('aria-label', 'Product image unavailable for SKU ' + sku);
          }
        }

        function tryUrl(img, index, original) {
          if (!img) return;
          if (index >= urls.length) {
            showPlaceholder(img);
            return;
          }

          // Use listeners rather than assigning only img.onerror: another storefront
          // script may replace the property handler. A timeout also handles stalled
          // requests, so the customer never gets a permanently blank image slot.
          var settled = false;
          var timer = setTimeout(function () {
            if (settled) return;
            settled = true;
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
            tryUrl(img, index + 1, original);
          }, 6500);
          function cleanup() {
            clearTimeout(timer);
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
          }
          function onLoad() {
            if (settled) return;
            if (img.naturalWidth > 0) {
              settled = true;
              cleanup();
            } else {
              onError();
            }
          }
          function onError() {
            if (settled) return;
            settled = true;
            cleanup();
            tryUrl(img, index + 1, original);
          }
          img.addEventListener('load', onLoad);
          img.addEventListener('error', onError);
          img.src = urls[index];
          if (img.complete) {
            if (img.naturalWidth > 0) onLoad();
            else onError();
          }
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
