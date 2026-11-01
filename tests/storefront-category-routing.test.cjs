'use strict';
const fs=require('fs');
const assert=require('assert');
const vm=require('vm');
const read=p=>fs.readFileSync(p,'utf8');
const roots=[
 ['6cc56033-b0a9-4f25-b207-aeeb341a1c47','Auto Electrical Spares'],
 ['8e93d917-8fcc-4427-b364-cdad244f263f','Vehicle Security'],
 ['5ab55c53-eee3-41ce-ad48-04ad6df85181','Car Audio &amp; Entertainment'],
 ['87982093-7d81-4f2e-a8e2-e20cdeef30d8','Automotive Accessories'],
 ['38b382c1-6ee0-4b3c-86ad-399094bc40cc','Marine Spares &amp; Accessories'],
 ['77297c18-67f6-452e-8918-c55d2ef6231a','Tools, Hardware &amp; Consumables'],
 ['af2f8625-4f42-45e6-9f21-d571d7415893','Camping, Leisure &amp; Outdoors'],
 ['63a71fd9-df45-43f0-b61d-ad622daa9d79','Trailer &amp; Canopy']
];
const index=read('index-new.html');
const store=read('store.html');
const category=read('category.html');
const previewCategory=read('preview-category.html');
const previewHome=read('preview-store.html');
const planetworld=read('preview-planetworld.html');
const audioPreview=read('preview-audio.html');
const previewCheckout=read('preview-checkout.html');
const pagesBuilder=read('scripts/build-cloudflare-pages-public.py');
const css=read('assets/storefront-shell.css');
const redirects=read('_redirects');
for(const p of ['index-new.html','category.html','products.html','product.html','preview-store.html','preview-audio.html','preview-category.html','preview-products.html','preview-product.html','preview-planetworld.html']){
 const html=read(p);
 const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
 scripts.forEach((m,i)=>new vm.Script(m[1],{filename:p+' inline script '+i}));
}

assert(fs.existsSync('assets/product-image-pending.svg'),'placeholder asset missing');
assert(pagesBuilder.includes('"product-image-pending.svg"')&&pagesBuilder.includes('SKU WebP images must not be included'),'preview Pages package must ship placeholders without SKU photos');
assert(pagesBuilder.includes('"catalogue-search.js"')&&pagesBuilder.includes('"product-details.js"'),'preview Pages package must include the Part Search and product detail dependencies');
assert(pagesBuilder.includes('"checkout.html", "checkout-v2.html", "category.html", "products.html", "product.html"'),'preview Pages package must omit production checkout and product routes');
assert(!pagesBuilder.includes('asc-catalogue-pilot/asc-ma522.jpg'),'preview Pages package must not ship supplier source-card crops');
assert(store.includes('src="preview-store.html"')&&store.includes('noindex,nofollow'),'test entry must load the no-checkout preview storefront only');
assert(previewHome.includes('href="preview-checkout.html">PROCEED TO CHECKOUT')&&!previewHome.includes('window.add=function(){return false;}'),'preview must permit browser-local cart checkout simulation without a production checkout override');
assert(previewHome.includes('preview-checkout.html')&&previewHome.includes('window.openSupplierSource=function()'),'preview cart must remain routed to the non-transactional checkout page');
assert(!store.includes('checkout-fab'),'preview entry must not expose a floating checkout control');
for(const [id,label] of roots){
 assert(index.includes(`category.html?id=${id}`),`main storefront route missing: ${label}`);
 assert(category.includes(id),`category landing page missing root: ${label}`);
 assert(previewCategory.includes(id),`preview category page missing root: ${label}`);
}
assert((index.match(/category\.html\?id=/g)||[]).length===8,'expected exactly eight main category links');
assert(index.includes("window.top.location.href='category.html?id="),'main category links must escape the homepage iframe to a full category page');
const ascStart=previewHome.indexOf('const ASC_CATALOGUE_CHILDREN=');
const ascEnd=previewHome.indexOf('};',ascStart)+2;
const ascHeadings=(previewHome.slice(ascStart,ascEnd).match(/name:'[^']+'/g)||[]);
assert(ascHeadings.length===76,'ASC navigation must include all 75 contents-page sections plus the Fuel Pumps parent tile');
assert(previewHome.includes("preview-category.html?id="),'preview homepage must route main categories to category landing pages');
assert(previewHome.includes("c.id==='5ab55c53-eee3-41ce-ad48-04ad6df85181'?'preview-audio.html'"),'Audio root must open its dedicated department hierarchy');
assert(previewHome.includes('function productImageUrl(p)')&&previewHome.includes('p&&p.public_sku')&&previewHome.includes('/functions/v1/product-image?sku=')&&previewHome.includes('PRODUCT_PLACEHOLDER')&&previewHome.includes('onerror='),'homepage cards must use exact-SKU image lookup only, then neutral fallback; unverified image_url values are not trusted');
const quarantinedOilFillerSkus=['GW-22B30765','GW-21132FDF','GW-0E5E3109','GW-E93CDF1E','GW-AA085120','GW-125D2F26','GW-FF7B49CB','GW-FC14A84E','GW-0B8032C4'];
assert(quarantinedOilFillerSkus.every(sku=>previewHome.includes(sku))&&previewHome.includes('function isPreviewCategoryQuarantined(p)')&&previewHome.includes('&&!isPreviewCategoryQuarantined(p)'), 'nine confirmed oil-filler-cap SKUs must be excluded from category browse lists without changing live data');
assert(previewHome.includes("assets/product-image-pending.svg"),'ASC preview cards must use neutral placeholders');
for(const p of ['products.html','preview-products.html','product.html','preview-product.html']){
 const s=read(p);
 assert(s.includes('assets/product-image-pending.svg'),p+' must reference neutral placeholder');
 assert(s.includes('/functions/v1/product-image?sku=')&&s.includes('assets/product-image-pending.svg'),p+' must use exact-SKU image lookup with a neutral fallback');
}
assert(audioPreview.includes('assets/product-image-pending.svg'),'Audio product preview cards must use neutral placeholders');
assert(previewCheckout.includes('Instant EFT — manual transfer'),'preview checkout must offer Instant EFT as the initial test method');
assert(previewCheckout.includes('PayFast — setup pending')&&previewCheckout.includes('PayJustNow — setup pending'),'other payment gateways must remain visibly deferred');
assert(previewCheckout.includes('no order or payment will be submitted')&&previewCheckout.includes('No bank details are displayed'),'preview EFT option must remain non-transactional and disclose no bank details');
assert(audioPreview.includes('class="brightTheme"')&&audioPreview.includes('assets/storefront-shell.css'),'Audio page must use the brighter shared storefront shell');
assert(audioPreview.includes('Boolean(p.verifiedModel)')&&audioPreview.includes('approvedImagePrefixes.some(prefix=>candidateImage.startsWith(prefix))'),'Audio cards may render only exact verified manufacturer image URLs from the allowlist');
assert(audioPreview.includes('assets/product-image-pending.svg'),'Audio cards must fall back to the neutral placeholder when a verified image fails');
assert(planetworld.includes('assets/product-image-pending.svg'),'Planetworld product cards must use neutral placeholders');
assert(!planetworld.includes('esc(p.imageUrl)'),'Planetworld must not render supplier image URLs as product photos');
assert(css.includes('color-scheme:light'),'shared shell must use light colour scheme');
assert(css.includes('background:#f3f6fa!important'),'shared shell must use brighter page background');
assert(css.includes('.gwTop .rating'),'Google Rating contrast rule missing');
assert(previewHome.includes('.brightTheme .ratingbox{background:#fff!important'),'Google Rating on populated homepage must use a light, high-contrast panel');
for(const path of ['/assets/planetworld-catalogue-preview.json','/assets/audio-connections-catalogue-preview.json','/assets/asc-catalogue-pilot-preview.json','/preview-planetworld.html','/HANDOVER_CURRENT.md','/suppliers/*','/catalogue-review/*','/catalogue-source/*','/catalogue-audits/*','/staging/*','/supabase/*']){
 assert(redirects.includes(path+' /index.html 302'),'Cloudflare Pages must redirect protected source path '+path);
}
console.log('STOREFRONT CATEGORY / PLACEHOLDER / LIGHT-SHELL SOURCE TESTS: PASS (8 root routes, 4 product routes, preview root route, image policy, contrast rules)');
