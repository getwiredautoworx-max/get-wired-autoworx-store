/* First-entry Terms gate for direct storefront routes. The store.html shell has its own gate; this helper covers standalone URLs. */
(function () {
  if (window.top !== window.self) return;
  const VERSION = 'GW-TERMS-2026-10-23-v1';
  try {
    if (localStorage.getItem('gw_terms_accepted_version') === VERSION) return;
  } catch (_) {}
  function mountGate() {
    if (!document.body || document.getElementById('gwDirectTermsGate')) return;
    const overlay = document.createElement('div');
    overlay.id = 'gwDirectTermsGate';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'gwDirectTermsTitle');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(2,6,13,.97);font:16px Arial,Helvetica,sans-serif;color:#172b3d;overflow:auto';
    overlay.innerHTML = '<section style="width:min(680px,100%);max-height:90vh;overflow:auto;background:#fff;border:1px solid #087fce;border-radius:14px;padding:22px;box-shadow:0 24px 80px #000"><h1 id="gwDirectTermsTitle" style="margin:0 0 10px;font-size:clamp(21px,5vw,28px)">WELCOME TO GET WIRED AUTOWORX</h1><p style="line-height:1.55">Before browsing, please read our Terms &amp; Conditions and Returns &amp; Refunds Policy. You may browse without an account; a signed-in customer account and current recorded acceptance are required to place an order.</p><p><a href="terms-and-conditions.html" target="_blank" rel="noopener">Read full Terms &amp; Conditions</a><br><a href="returns-refunds.html" target="_blank" rel="noopener">Read Returns &amp; Refunds Policy</a></p><label style="display:flex;gap:10px;align-items:flex-start;margin:18px 0;line-height:1.5"><input id="gwDirectTermsCheck" type="checkbox" style="width:20px;height:20px;flex:none;margin-top:2px"><span>I have read and accept the current Terms &amp; Conditions and Returns &amp; Refunds Policy.</span></label><button id="gwDirectTermsAccept" type="button" disabled style="width:100%;padding:14px;border:0;border-radius:8px;background:#087fce;color:#fff;font-weight:900;font-size:16px;opacity:.55">ACCEPT &amp; CONTINUE</button><p id="gwDirectTermsStatus" role="status" style="font-size:12px;color:#53687a;line-height:1.4">This browser acceptance allows browsing only. Checkout requires separate account-linked acceptance.</p></section>';
    document.body.appendChild(overlay);
    const blockedElements = Array.from(document.body.children).filter(function (element) { return element !== overlay; });
    blockedElements.forEach(function (element) { element.inert = true; });
    const checkbox = overlay.querySelector('#gwDirectTermsCheck');
    const accept = overlay.querySelector('#gwDirectTermsAccept');
    const status = overlay.querySelector('#gwDirectTermsStatus');
    checkbox.focus();
    checkbox.addEventListener('change', function () {
      accept.disabled = !checkbox.checked;
      accept.style.opacity = checkbox.checked ? '1' : '.55';
    });
    accept.addEventListener('click', function () {
      if (!checkbox.checked) return;
      try {
        localStorage.setItem('gw_terms_accepted_version', VERSION);
        localStorage.setItem('gw_terms_accepted_at_local', new Date().toISOString());
      } catch (_) {
        status.textContent = 'Browser storage is blocked. Enable site storage to record your browsing acceptance and continue.';
        return;
      }
      blockedElements.forEach(function (element) { element.inert = false; });
      overlay.remove();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountGate, { once: true });
  else mountGate();
})();