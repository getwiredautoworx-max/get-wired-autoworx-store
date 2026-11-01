const fs=require('node:fs');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const html=fs.readFileSync('preview-store.html','utf8');
const audio=fs.readFileSync('preview-audio.html','utf8');
const nav=fs.readFileSync('assets/audio-category-navigation.js','utf8');
for(const [index,match] of [...audio.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)].entries()){
  if(match[1].trim()) new vm.Script(match[1],{filename:'preview-audio.inline-script-'+index+'.js'});
}
assert.match(audio,/d\.className="audioTile"/,'Audio departments must render tile cards');
assert.match(audio,/card\.className="audioProduct"/,'Audio product cards must use the tested audioProduct class');
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
assert.ok(audio.includes('catalogueLoaded=true;if(!broad.length&&!verified.length&&!audioConnections.length)')&&audio.includes('else if(department)draw()'),'catalogue completion must refresh a department selected while loading after all three catalogue sources settle');
assert.match(audio,/REQUEST PRICE & AVAILABILITY/,'each Planetworld product card must offer a direct enquiry action');
assert.match(audio,/wa\.me\/27744884234/,'product enquiry must use the existing business WhatsApp contact');
assert.match(audio,/25-Oct-2026/,'product enquiry must identify the dated supplier snapshot');
assert.match(build,/"preview-audio\.html"/,'isolated preview package must include Audio route');
assert.ok(build.includes('"asc-catalogue-pilot-preview.json"')&&build.includes('"asc-catalogue-pilot/asc-ma522.jpg"'),'preview-only bundle must include ASC pilot JSON and source-card image assets');
assert.ok(packageQa.includes('preview-checkout.html; do'),'preview package QA must assert checkout route inclusion');
assert.ok(packageQa.includes('Verify preview package includes all seven approved preview routes'),'preview package QA must cover all seven routes');
const previewCheckout=fs.readFileSync('preview-checkout.html','utf8');
assert.match(html,/href="preview-checkout\.html">PROCEED TO CHECKOUT/);
assert.ok(previewCheckout.includes('Preview mode — no order or payment will be submitted.'));
assert.ok(previewCheckout.includes('id="paymentMethod"')&&previewCheckout.includes('Instant EFT (manual'));
assert.ok(previewCheckout.includes('No bank account, account number or payment link is shown.'));
assert.ok(previewCheckout.includes('Payment preference: '+String.fromCharCode(39)+'+payment'));
assert.ok(!previewCheckout.includes('supabase.co')&&!previewCheckout.includes('fetch('));
assert.match(build,/"preview-checkout\.html"/);
// Preview-only request handoff must be explicit and must not imply automatic photo upload.
assert.match(html,/STORE PREVIEW.*part requests open WhatsApp only/,'preview banner must explain WhatsApp-only part requests');
assert.match(html,/f\.size>4\*1024\*1024/,'photo validation must enforce the stated 4 MB limit');
assert.match(html,/no larger than 4MB/,'photo validation error must match the 4 MB instruction');
assert.match(html,/WhatsApp handoff opened\. Attach any selected photos in the chat/,'preview must tell customers to attach selected photos manually');

console.log('AUDIO_NAVIGATION_SOURCE_PASS: main category → 9 departments → brand → component → product list; preview-only assets are allowlisted');

// Owner-requested dark-theme product-code readability regression.
assert.match(nav,/gw-product-code-contrast/,'preview adapter must install the product-code contrast correction');
assert.match(nav,/#f1f5f9/,'dark-theme SKU text must use a high-contrast near-white foreground');
assert.match(nav,/font-weight:700/,'dark-theme SKU text must remain legible at normal phone brightness');
assert.match(nav,/font-size:12px/,'mobile SKU text must not be reduced to the previous 10px size');

assert.ok(!html.includes('PLANETWORLD — AUDIO & ENTERTAINMENT CATALOGUE'),'supplier must not appear as a homepage category or banner');
assert.ok(!html.includes('id="planetworldBrowse"'),'supplier catalogue browser must not be embedded on the homepage');
assert.match(html,/id="audio-catalogue-search-data"/,'homepage Part Search may load catalogue data without exposing supplier navigation');
assert.match(html,/Supplier catalogue ·/,'Part Search must describe the source generically, not expose supplier identity');
assert.ok(!audio.includes('Planetworld'),'Audio customer journey must not expose supplier identity');
assert.match(audio,/25-Oct-2026/,'Audio page must retain the dated snapshot disclosure');

const imagePreview=fs.readFileSync('preview-planetworld.html','utf8');
const verifiedImageModels=fs.readFileSync('assets/planetworld-verified-models-preview.json','utf8');
const imageRoutes=['preview-store.html','products.html','preview-products.html','product.html','preview-product.html','product-details.js'];
for(const route of imageRoutes){const source=fs.readFileSync(route,'utf8');assert.ok(source.includes('assets/products_webp/'),route+' must use exact-SKU local WebP product images');assert.ok(!source.includes('/functions/v1/product-image?sku='),route+' must not depend on the unauthenticated Supabase/GitHub image proxy');}
assert.ok(imagePreview.includes('https://static.audison.com/media/2023/03/AUDISON_APX-690_VISTA-IN-PIANTA_2022_07_13_JPG.jpg')&&verifiedImageModels.includes('https://static.audison.com/media/2023/03/AUDISON_APX-690_VISTA-IN-PIANTA_2022_07_13_JPG.jpg'),'Audison APX 690 must use the working official manufacturer image URL');
assert.ok(!imagePreview.includes('https://static.audison.com/media/2023/03/AUDISON_APX-690_VISTA-IN-PIANTA_2022_07_13_JPG.jpg')&&!verifiedImageModels.includes('https://static.audison.com/media/2023/03/AUDISON_APX-690_VISTA-IN-PIANTA_2022_07_13_JPG.jpg'),'remove unavailable Audison static image URL');

const home=fs.readFileSync('index-new.html','utf8');
assert.match(home,/Car Audio \/ Video[\s\S]*Home Entertainment[\s\S]*Studio Equipment/,'Audio root must expose departments, not supplier brands as sibling categories');
assert.ok(!/Car Audio &amp; Entertainment[\s\S]{0,500}JBL[\s\S]{0,100}Hertz[\s\S]{0,100}Denon/.test(home),'JBL, Hertz and Denon must be brand filters within Audio departments, not category siblings');
