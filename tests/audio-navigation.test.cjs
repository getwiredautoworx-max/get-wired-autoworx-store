const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('preview-store.html','utf8');
const audio=fs.readFileSync('preview-audio.html','utf8');
const nav=fs.readFileSync('assets/audio-category-navigation.js','utf8');
const build=fs.readFileSync('scripts/build-cloudflare-pages-public.py','utf8');
const packageQa=fs.readFileSync('.github/workflows/cloudflare-public-pages-build-qa.yml','utf8');
assert.match(audio,/planetworld-verified-models-preview\.json/,'Audio browser must load curated exact-model references');
assert.match(audio,/manufacturerPage/,'verified model cards must link to manufacturer details');
assert.match(audio,/modelNumber/,'verified model cards must display manufacturer model numbers');
assert.match(build,/planetworld-verified-models-preview\.json/,'isolated preview package must include curated model references');
const departments=['Car Audio & Video','Home Entertainment','Band & Live Sound','DJ Equipment','Studio Equipment','Marine Audio','Installed AV','Musical Instruments','Harnesses & Trims'];
assert.match(html,/<script src="assets\/audio-category-navigation\.js" defer><\/script>/,'main preview must load Audio navigation adapter');
assert.match(nav,/5ab55c53-eee3-41ce-ad48-04ad6df85181/,'adapter must target the single approved Audio root category');
assert.match(nav,/preview-audio\.html/,'main Audio category must link to the customer department browser');
for(const label of departments) assert.ok(audio.includes(label),`missing Audio department: ${label}`);
for(const id of ['departments','brands','components','products']) assert.ok(audio.includes('id="'+id+'"'),`missing ${id} stage`);
assert.match(audio,/p\.collection===department/,'products must be scoped to selected department');
assert.match(audio,/p\.brand===brand/,'products must be scoped to selected brand');
assert.match(audio,/p\.component===component/,'products must be scoped to selected component');
assert.match(audio,/else if\(department\)draw\(\)/,'catalogue completion must refresh a department selected while loading after the empty-feed guard');
assert.match(audio,/REQUEST PRICE & AVAILABILITY/,'each Planetworld product card must offer a direct enquiry action');
assert.match(audio,/wa\.me\/27744884234/,'product enquiry must use the existing business WhatsApp contact');
assert.match(audio,/25-Oct-2026/,'product enquiry must identify the dated supplier snapshot');
assert.match(build,/"preview-audio\.html"/,'isolated preview package must include Audio route');
assert.match(build,/PREVIEW_ASSET_FILES = \["audio-category-navigation\.js", "planetworld-catalogue-preview\.json", "planetworld-verified-models-preview\.json"\]/,'preview-only bundle must include the Audio adapter, broad catalogue and curated verified-model references');
assert.ok(packageQa.includes('preview-checkout.html; do'),'preview package QA must assert checkout route inclusion');
assert.ok(packageQa.includes('Verify preview package includes all seven approved preview routes'),'preview package QA must cover all seven routes');
const previewCheckout=fs.readFileSync('preview-checkout.html','utf8');
assert.match(html,/href="preview-checkout\.html">PROCEED TO CHECKOUT/);
assert.ok(previewCheckout.includes('Preview mode — no order or payment will be submitted.'));
assert.ok(!previewCheckout.includes('supabase.co')&&!previewCheckout.includes('fetch('));
assert.match(build,/"preview-checkout\.html"/);
// Preview-only request handoff must be explicit and must not imply automatic photo upload.
assert.match(html,/STORE PREVIEW.*part requests open WhatsApp only/,'preview banner must explain WhatsApp-only part requests');
assert.match(html,/f\.size>4\*1024\*1024/,'photo validation must enforce the stated 4 MB limit');
assert.match(html,/no larger than 4MB/,'photo validation error must match the 4 MB instruction');
assert.match(html,/WhatsApp handoff opened\. Attach any selected photos in the chat/,'preview must tell customers to attach selected photos manually');
assert.match(html,/window\\.gwPlanetworldSearchRows=verifiedSearchRows/,'curated exact-model references must remain searchable if the broad Planetworld feed fails');
assert.match(html,/exact-model references remain searchable/,'Part Search fallback must explain that curated model references are still available');



// Eight approved customer-facing root tiles must resolve to the existing category IDs.
const rootIdsMatch=html.match(/const HOME_CATEGORY_IDS=\[([^\]]+)\]/);
assert.ok(rootIdsMatch,'homepage must declare its approved root category list');
assert.equal((rootIdsMatch[1].match(/'[0-9a-f-]{36}'/g)||[]).length,8,'homepage must render exactly eight main category roots; Find a Part is a separate utility tile');
const progressive=fs.readFileSync('assets/progressive-store-enhancements.js','utf8');
assert.match(progressive,/function escapeHtmlText\(value\)/,'saved/recent product text must have a shared HTML text escaper');
assert.match(progressive,/escapeHtmlText\(p\.public_sku\|\|''\)/,'saved-product SKU must be escaped before HTML insertion');
assert.match(progressive,/escapeHtmlText\(rp\.public_sku\|\|rp\.sku\|\|''\)/,'recent-product SKU must be escaped before HTML insertion');
const categoryNavigation=fs.readFileSync('category-navigation.js','utf8');
const categoryTree=JSON.parse(fs.readFileSync('assets/category-tree.json','utf8'));
const approvedRoots={
  'AUTO ELECTRICAL SPARES':['electrical','6cc56033-b0a9-4f25-b207-aeeb341a1c47'],
  'VEHICLE SECURITY':['alarms-security','8e93d917-8fcc-4427-b364-cdad244f263f'],
  'CAR AUDIO & ENTERTAINMENT':['car-audio-store','5ab55c53-eee3-41ce-ad48-04ad6df85181'],
  'AUTOMOTIVE ACCESSORIES':['automotive-accessories','87982093-7d81-4f2e-a8e2-e20cdeef30d8'],
  'MARINE SPARES & ACCESSORIES':['marine-spares','38b382c1-6ee0-4b3c-86ad-399094bc40cc'],
  'TOOLS, HARDWARE & CONSUMABLES':['tools-workshop','77297c18-67f6-452e-8918-c55d2ef6231a'],
  'CAMPING, LEISURE & OUTDOORS':['camping-outdoors','af2f8625-4f42-45e6-9f21-d571d7415893'],
  'TRAILER & CANOPY':['trailer-canopy','63a71fd9-df45-43f0-b61d-ad622daa9d79']
};
for(const [label,[key,id]] of Object.entries(approvedRoots)){
  assert.ok(categoryNavigation.includes("'"+label+"':'"+key+"'"),label+' must map to its approved navigation key');
  assert.ok(categoryNavigation.includes(key+":'"+id+"'")||categoryNavigation.includes("'"+key+"':'"+id+"'"),label+' must resolve to its approved category ID');
  const category=categoryTree.categories.find(c=>c.id===id);
  assert.ok(category,label+' category ID must exist in the dated read-only category snapshot');
  assert.equal(category.parent_id,null,label+' must remain a root category in the snapshot');
}
const fourByFour=categoryTree.categories.find(c=>c.id==='182423ec-ea46-43e4-bbe3-b8857b5a1583');
assert.ok(fourByFour,'4X4 Outdoor child category must exist');
assert.equal(fourByFour.parent_id,'af2f8625-4f42-45e6-9f21-d571d7415893','4X4 Outdoor must remain nested under Camping / Leisure / Outdoors');
assert.ok(categoryNavigation.includes("'4X4 OUTDOOR':'4x4-outdoor'"),'4X4 Outdoor tile must route to the nested child key');

console.log('AUDIO_NAVIGATION_SOURCE_PASS: main category → 9 departments → brand → component → product list; preview-only assets are allowlisted');
