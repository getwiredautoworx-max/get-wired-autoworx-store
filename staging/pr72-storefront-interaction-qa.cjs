const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const OUT = path.resolve('qa-output');
fs.mkdirSync(OUT, { recursive: true });
const rootIds = [
  ['Auto Electrical Spares','6cc56033-b0a9-4f25-b207-aeeb341a1c47'],
  ['Vehicle Security','8e93d917-8fcc-4427-b364-cdad244f263f'],
  ['Car Audio & Entertainment','5ab55c53-eee3-41ce-ad48-04ad6df85181'],
  ['Automotive Accessories','87982093-7d81-4f2e-a8e2-e20cdeef30d8'],
  ['Marine Spares & Accessories','38b382c1-6ee0-4b3c-86ad-399094bc40cc'],
  ['Tools, Hardware & Consumables','77297c18-67f6-452e-8918-c55d2ef6231a'],
  ['Camping, Leisure & Outdoors','af2f8625-4f42-45e6-9f21-d571d7415893'],
  ['Trailer & Canopy','63a71fd9-df45-43f0-b61d-ad622daa9d79']
];
const childId = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const productId = '11111111-1111-4111-8111-111111111111';
const categories = rootIds.map(([name,id]) => ({id,name,parent_id:null,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),active:true,direct_active_products:1,sort_order:1}));
categories.push({id:childId,name:'Electrical Connectors & Wiring',parent_id:rootIds[0][1],slug:'electrical-connectors-wiring',active:true,direct_active_products:2,sort_order:1});
const products = rootIds.map(([name,id],i)=>({id:'22222222-2222-4222-8222-'+String(i+1).padStart(12,'0'),category_id:id,name:name+' Test Product',public_sku:'GW-000174D6',description:'Test product description for browser QA.',price:299,stock_quantity:4,image_url:'',gallery_urls:[],compatible_vehicles:[],specifications:{price_status:'VERIFIED'},active:true,featured:true}));
products[0]={...products[0],id:productId,category_id:childId,name:'Air Filter Breather Red',public_sku:'GW-000174D6',description:'Test fixture for the exact-SKU red breather air filter image.',price:299,stock_quantity:4,featured:true};
products.push({id:'33333333-3333-4333-8333-333333333333',category_id:rootIds[0][1],name:'Auto Electrical Test Product',public_sku:'GW-TEST0001',description:'Test product description.',price:199,stock_quantity:3,image_url:'',gallery_urls:[],compatible_vehicles:[],specifications:{price_status:'VERIFIED'},active:true,featured:true});
const categorySnapshot={generated_at:new Date().toISOString(),categories};
const logo=fs.readFileSync('assets/gw-logo.png');
const report={startedAt:new Date().toISOString(),checks:[],errors:[],screenshots:[]};
const check=(name,ok,detail={})=>{report.checks.push({name,status:ok?'PASS':'FAIL',detail});if(!ok)report.errors.push(name+': '+JSON.stringify(detail));};
async function installMocks(page){
  await page.route('**/rest/v1/**',async route=>{
    const u=new URL(route.request().url());
    if(u.pathname.endsWith('/categories')) return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(categories.map(c=>({id:c.id,name:c.name,parent_id:c.parent_id,slug:c.slug,active:true})))});
    if(u.pathname.endsWith('/products')) return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(products)});
    if(u.pathname.endsWith('/vehicle_search_index')) return route.fulfill({status:200,contentType:'application/json',body:'[]'});
    return route.fulfill({status:200,contentType:'application/json',body:'[]'});
  });
  await page.route('**/assets/category-tree.json',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(categorySnapshot)}));
  await page.route('**/functions/v1/product-image?**',route=>route.fulfill({status:404,contentType:'application/json',body:'{"error":"no fixture image"}'}));
  await page.route('https://images.unsplash.com/**',route=>route.fulfill({status:200,contentType:'image/png',body:logo}));
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>report.errors.push('pageerror: '+String(e)));
  page.on('console',m=>{if(m.type()==='error')report.errors.push('console: '+m.text())});
  await installMocks(page);
  const response=await page.goto('http://127.0.0.1:4173/store.html',{waitUntil:'domcontentloaded',timeout:45000});
  await page.frameLocator('#store').locator('#categoryGrid > .catWrap > .catBtn').first().waitFor({timeout:20000});
  await page.waitForTimeout(800);
  const frame=page.frameLocator('#store');
  const rootCount=await frame.locator('#categoryGrid > .catWrap > .catBtn').count();
  const rootImageData=await frame.locator('#categoryGrid > .catWrap > .catBtn .catPhoto').evaluateAll(els=>els.map(e=>({src:e.src,alt:e.alt,loaded:e.complete&&e.naturalWidth>0})));
  check('homepage_served',!!response&&response.status()<400,{status:response?.status(),url:page.url()});
  check('eight_main_category_buttons',rootCount===8,{count:rootCount});
  check('category_photos_loaded_and_distinct',rootImageData.length===8&&rootImageData.every(x=>x.loaded)&&new Set(rootImageData.map(x=>x.src)).size===8,{images:rootImageData});
  const featuredCount=await frame.locator('#featuredGrid .product').count();
  check('specials_limited_to_four',featuredCount<=4,{count:featuredCount});
  check('no_repeated_whatsapp_card_buttons',await frame.locator('.gwWA').count()===0&&await frame.locator('a[href*="wa.me"]').count()===0,{gwWA:await frame.locator('.gwWA').count(),whatsappLinks:await frame.locator('a[href*="wa.me"]').count()});
  await frame.getByRole('button',{name:/CAN’T FIND A PART\? REQUEST IT/i}).first().click();
  const requestOpen=await frame.locator('#sourcePart.open').count();
  check('standalone_request_part_button_opens_dialog',requestOpen===1,{openDialogs:requestOpen});
  await frame.locator('#sourcePart').evaluate(el=>el.classList.remove('open'));
  await frame.getByRole('button',{name:/SEARCH THE STORE/i}).click();
  const searchOpen=await frame.locator('#partSearchOverlay.open').count();
  check('store_search_dialog_opens',searchOpen===1,{openDialogs:searchOpen});
  const searchInput=frame.locator('#partSearchInput');
  if(await searchInput.count()) await searchInput.fill('12V fuse regulator');
  await frame.getByRole('button',{name:/CAN’T FIND IT IN THE STORE\? REQUEST THIS PART/i}).click();
  await frame.locator('#sourcePart.open').waitFor({timeout:5000});
  const carriedRequest=await frame.locator('#sourcePartNeeded').inputValue().catch(()=> '');
  check('search_dialog_request_part_opens_and_carries_query',await frame.locator('#sourcePart.open').count()===1&&carriedRequest==='12V fuse regulator',{carriedRequest});
  await frame.locator('#sourcePart').evaluate(el=>el.classList.remove('open'));
  const rating=frame.locator('.ratingbox');
  const since=frame.getByText(/SINCE\s*2012/i).first();
  const heroLayout=await frame.evaluate(()=>{const r=document.querySelector('.ratingbox'),s=[...document.querySelectorAll('body *')].find(e=>e.children.length===0&&/SINCE\s*2012/i.test(e.textContent||''));if(!r||!s)return {missing:true};const a=r.getBoundingClientRect(),b=s.getBoundingClientRect();return {rating:{x:a.x,y:a.y,width:a.width,height:a.height,right:a.right,bottom:a.bottom},since:{x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom},overlap:a.x<b.right&&a.right>b.x&&a.y<b.bottom&&a.bottom>b.y,viewport:innerWidth};});
  check('rating_badge_does_not_overlap_since_2012',!heroLayout.missing&&!heroLayout.overlap,heroLayout);
  await frame.locator('#sourcePart').evaluate(el=>el.classList.remove('open'));
  const firstRoot=frame.locator('#categoryGrid > .catWrap > .catBtn').first();
  const firstRootId=await firstRoot.getAttribute('data-filter');
  await firstRoot.click();
  await page.waitForURL(/category\.html\?id=/,{timeout:15000});
  check('homepage_category_click_navigates_to_own_page',new URL(page.url()).pathname.endsWith('/category.html')&&new URL(page.url()).searchParams.get('id')===firstRootId,{url:page.url(),expectedId:firstRootId});
  await page.screenshot({path:path.join(OUT,'desktop-category-navigation.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('desktop-category-navigation.png');
  await page.goto('http://127.0.0.1:4173/category.html?id='+rootIds[0][1],{waitUntil:'domcontentloaded'});
  await page.locator('.card').filter({hasText:'Electrical Connectors & Wiring'}).waitFor({timeout:10000});
  await page.locator('.card').filter({hasText:'Electrical Connectors & Wiring'}).click();
  await page.waitForURL(/products\.html\?category=/,{timeout:15000});
  check('subcategory_click_opens_category_product_listing',new URL(page.url()).pathname.endsWith('/products.html')&&new URL(page.url()).searchParams.get('category')===childId,{url:page.url()});
  const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
  await installMocks(mobile);
  await mobile.goto('http://127.0.0.1:4173/store.html',{waitUntil:'domcontentloaded',timeout:45000});
  await mobile.frameLocator('#store').locator('#categoryGrid > .catWrap > .catBtn').first().waitFor({timeout:20000});
  const mobileMetrics=await mobile.frameLocator('#store').locator('html').evaluate(el=>({width:el.clientWidth,scrollWidth:el.scrollWidth}));
  check('mobile_no_horizontal_overflow',mobileMetrics.scrollWidth<=mobileMetrics.width+2,mobileMetrics);
  await mobile.screenshot({path:path.join(OUT,'mobile-home.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('mobile-home.png');
  const productPage=await browser.newPage({viewport:{width:1365,height:900}});
  productPage.on('pageerror',e=>report.errors.push('product pageerror: '+String(e)));
  await installMocks(productPage);
  await productPage.goto('http://127.0.0.1:4173/product.html?id='+productId,{waitUntil:'domcontentloaded',timeout:45000});
  await productPage.locator('#add').waitFor({timeout:15000});
  await productPage.waitForFunction(()=>{const img=document.querySelector('.hero img');return img&&img.complete&&img.naturalWidth>0&&img.src.includes('/assets/products_webp/GW-000174D6.webp')},{timeout:15000});
  const productImage=await productPage.locator('.hero img').evaluate(img=>({src:img.src,width:img.naturalWidth}));
  check('product_detail_exact_sku_image_fallback',productImage.width>0&&productImage.src.includes('/assets/products_webp/GW-000174D6.webp'),productImage);
  check('product_description_visible',await productPage.getByRole('heading',{name:'Product Description'}).count()===1,{count:await productPage.getByRole('heading',{name:'Product Description'}).count()});
  check('add_to_cart_action_present',await productPage.locator('#add').isVisible()&&/ADD TO CART/.test(await productPage.locator('#add').innerText()),{text:await productPage.locator('#add').innerText()});
  const query=productPage.locator('#queryPart');
  check('query_part_whatsapp_contains_sku',await query.isVisible()&&(await query.getAttribute('href')).includes('wa.me')&&(await query.getAttribute('href')).includes(encodeURIComponent('GW-000174D6')),{href:await query.getAttribute('href')});
  await productPage.locator('#add').click();
  check('add_to_cart_updates_cart',await productPage.locator('#badge').innerText().then(v=>Number(v)>0),{badge:await productPage.locator('#badge').innerText()});
  await productPage.screenshot({path:path.join(OUT,'product-detail.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('product-detail.png');
  report.finishedAt=new Date().toISOString();
  report.summary={pass:report.checks.filter(c=>c.status==='PASS').length,fail:report.checks.filter(c=>c.status==='FAIL').length};
  fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(report.summary.fail)process.exitCode=1;
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(2)});
