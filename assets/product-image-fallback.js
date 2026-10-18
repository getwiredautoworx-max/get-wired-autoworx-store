/* Get Wired AutoWorx product-image guard.
 * Preserve working images. For missing/broken images, try exact-SKU WebP then
 * exact-SKU JPEG; never substitute an unrelated neighbouring product.
 */
(function () {
  'use strict';
  function skuFrom(scope) {
    var node = scope && scope.querySelector ? scope.querySelector('.sku') : null;
    return node ? (node.textContent || '').trim().replace(/^SKU:\\s*/i, '').trim() : '';
  }
  function localUrls(sku) {
    if (!sku) return [];
    var safe = encodeURIComponent(sku);
    return ['/assets/products_webp/' + safe + '.webp', '/assets/products_jpg/' + safe + '.jpg'];
  }
  function isPlaceholder(src) {
    return !src || /placeholder|no-image|no_image|default-product|gw-logo\\.png/i.test(String(src));
  }
  function showPlaceholder(box, title, sku) {
    if (!box) return;
    box.querySelectorAll('img').forEach(function (img) { img.onerror = null; img.remove(); });
    box.classList.add('no-image');
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', 'Product image unavailable' + (title ? ': ' + title : ''));
    box.innerHTML = '';
    var wrap = box.ownerDocument.createElement('div');
    wrap.style.cssText = 'width:100%;height:100%;min-height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:12px;box-sizing:border-box;text-align:center;background:linear-gradient(145deg,#f7fafc,#e5edf4);color:#17324a';
    var mark = box.ownerDocument.createElement('strong');
    mark.textContent = 'GW';
    mark.style.cssText = 'display:grid;place-items:center;width:48px;height:48px;border-radius:12px;background:#123b5d;color:#fff;font:900 20px Arial,sans-serif;letter-spacing:1px;border-bottom:4px solid #e21d2f';
    var label = box.ownerDocument.createElement('span');
    label.textContent = 'PRODUCT IMAGE UNAVAILABLE';
    label.style.cssText = 'font:800 10px Arial,sans-serif;letter-spacing:.5px';
    var note = box.ownerDocument.createElement('small');
    note.textContent = sku ? 'SKU: ' + sku : 'Contact us to confirm the exact part';
    note.style.cssText = 'font:11px Arial,sans-serif;color:#536b80;overflow-wrap:anywhere';
    wrap.appendChild(mark); wrap.appendChild(label); wrap.appendChild(note); box.appendChild(wrap);
  }
  function setExactSkuImage(img, box, title, sku) {
    var urls = localUrls(sku), index = 0;
    if (!urls.length) { showPlaceholder(box, title, sku); return; }
    img.onerror = function () {
      index += 1;
      if (index < urls.length) { img.src = urls[index]; return; }
      img.onerror = null;
      showPlaceholder(box, title, sku);
    };
    img.src = urls[index];
  }
  function install(frame) {
    if (!frame) return;
    function patch(doc) {
      if (!doc || doc.__gwImageFallbackInstalled) return;
      doc.__gwImageFallbackInstalled = true;
      function patchScope(scope) {
        if (!scope) return;
        var box = scope.querySelector('.prodImg, .detailImg');
        if (!box || box.dataset.gwImageGuard === '1') return;
        box.dataset.gwImageGuard = '1';
        var sku = skuFrom(scope);
        var titleNode = scope.querySelector('h3,h2');
        var title = titleNode ? titleNode.textContent.trim() : '';
        var img = box.querySelector('img');
        if (!img) {
          img = doc.createElement('img');
          img.alt = title || (sku ? 'Product image for SKU ' + sku : 'Product image unavailable');
          img.loading = 'lazy';
          img.style.cssText = 'max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain';
          box.appendChild(img);
          setExactSkuImage(img, box, title, sku);
          return;
        }
        if (img.complete && img.naturalWidth > 0 && !isPlaceholder(img.currentSrc || img.src)) return;
        var original = img.getAttribute('src') || '';
        if (!isPlaceholder(original) && !img.complete) {
          img.addEventListener('error', function onError() {
            img.removeEventListener('error', onError);
            setExactSkuImage(img, box, title, sku);
          }, { once: true });
          return;
        }
        setExactSkuImage(img, box, title, sku);
      }
      function scan() { doc.querySelectorAll('.product, .detail').forEach(patchScope); }
      scan();
      if (doc.body && typeof MutationObserver !== 'undefined') {
        new MutationObserver(scan).observe(doc.body, { childList: true, subtree: true });
      }
    }
    function ready() { try { patch(frame.contentDocument || frame.contentWindow.document); } catch (e) {} }
    frame.addEventListener('load', ready);
    if (frame.contentDocument && frame.contentDocument.readyState === 'complete') ready();
  }
  window.installGetWiredProductImageFallback = install;
})();
