(()=>{'use strict';
const SUPA='https://ojytykqpvonxvepprgbh.supabase.co';
function esc(s){return String(s??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]))}
function boot(){
 const host=document.body;if(!host||document.getElementById('gwOpsPanel'))return;
 const panel=document.createElement('section');panel.id='gwOpsPanel';panel.setAttribute('aria-label','Store operations');
 panel.innerHTML=`<style>#gwOpsPanel{font:14px system-ui;margin:20px auto;max-width:1100px;padding:16px;background:#06111e;color:#dcefff;border:1px solid #12456c;border-radius:14px}#gwOpsPanel h2{margin:0 0 12px}.gwOpsGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.gwOpsCard{padding:14px;border:1px solid #17496d;border-radius:10px;background:#091a2a}.gwOpsCard b{display:block;font-size:24px}.gwOpsNote{margin-top:12px;color:#9eb5c9}@media(max-width:700px){.gwOpsGrid{grid-template-columns:repeat(2,1fr)}}</style><h2>Store Operations</h2><div class="gwOpsGrid"><div class="gwOpsCard"><b id="gwOpsProducts">—</b>Active products</div><div class="gwOpsCard"><b id="gwOpsStock">—</b>In stock</div><div class="gwOpsCard"><b id="gwOpsImages">—</b>Missing images</div><div class="gwOpsCard"><b id="gwOpsVehicle">—</b>Vehicle-fitment records</div></div><div class="gwOpsNote">Operational dashboard foundation. Customer-facing compatibility is shown only when verified data exists.</div>`;
 host.appendChild(panel);
}
if(location.pathname.startsWith('/admin'))boot();
})();
