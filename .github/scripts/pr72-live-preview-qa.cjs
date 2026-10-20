const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const BASE='https://pr72-owner-feedback.get-wired-autoworx-store.pages.dev/';
const OUT=path.resolve('qa-live-preview-output');
fs.mkdirSync(OUT,{recursive:true});
const report={base:BASE,deployedRevision:'e1133b7ada201fb3e20b8733156c3e2d7d14830a',deploymentAlias:'https://pr72-owner-feedback.get-wired-autoworx-store.pages.dev',startedAt:new Date().toISOString(),checks:[],pageErrors:[],consoleErrors:[],failedRequests:[],badResponses:[],categoryImages:[],productImage:null,screenshots:[]};
const failures=[];
const check=(name,ok,detail={})=>{report.checks.push({name,status:ok?'PASS':'FAIL',detail});if(!ok)failures.push(name+': '+JSON.stringify(detail));};
function observe(page,label){page.on('pageerror',e=>report.pageErrors.push(label+': '+String(e)));page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(label+': '+m.text())});page.on('requestfailed',r=>report.failedRequests.push({page:label,url:r.url(),error:r.failure()?.errorText||'failed'}));page.on('response',r=>{if(r.status()>=400)report.badResponses.push({page:label,status:r.status(),url:r.url()})})}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1365,height:900},deviceScaleFactor:1});
  observe(page,'desktop');
  const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:60000});
  check('preview_home_http',!!response&&response.status()<400,{status:response?.status(),url:page.url()});
  const frame=page.frameLocator('#store');
  await frame.locator('#categoryGrid > .catWrap > .catBtn').first().waitFor({timeout:60000});
  await page.waitForTimeout(5000);
  const roots=await frame.locator('#categoryGrid > .catWrap > .catBtn').count();
  const photos=await frame.locator('#categoryGrid > .catWrap > .catBtn .catPhoto').evaluateAll(es=>es.map(e=>({src:e.currentSrc||e.src,loaded:e.complete&&e.naturalWidth>0,naturalWidth:e.naturalWidth})));
  report.categoryImages=photos;
  check('eight_main_category_tiles',roots===8,{count:roots});
  check('main_category_photos_load_and_are_distinct',photos.length===8&&photos.every(x=>x.loaded)&&new Set(photos.map(x=>x.src)).size===8,{photos});
  check('wrapper_whatsapp_button_removed',await page.locator('#whatsapp,.whatsapp-fab').count()===0,{count:await page.locator('#whatsapp,.whatsapp-fab').count()});
  check('no_repeated_whatsapp_card_buttons',await frame.locator('.gwWA').count()===0,{count:await frame.locator('.gwWA').count()});
  check('specials_no_more_than_four',await frame.locator('#featuredGrid .product').count()<=4,{count:await frame.locator('#featuredGrid .product').count()});
  await frame.getByRole('button',{name:/CAN’T FIND A PART\? REQUEST IT/i}).click();
  check('request_part_dialog_opens',await frame.locator('#sourcePart.open').count()===1,{count:await frame.locator('#sourcePart.open').count()});
  await frame.locator('#sourcePart').evaluate(el=>el.classList.remove('open'));
  const root=frame.locator('#categoryGrid > .catWrap > .catBtn').first();
  const rootId=await root.getAttribute('data-filter');
  await root.click();
  await page.waitForURL(/\/category(?:\.html)?\/?\?id=/,{timeout:20000});
  check('root_category_click_opens_individual_page',/(?:^|\/)category(?:\.html)?\/?$/.test(new URL(page.url()).pathname)&&new URL(page.url()).searchParams.get('id')===rootId,{url:page.url(),rootId});
  await page.waitForTimeout(3500);
  await page.screenshot({path:path.join(OUT,'category-page.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('category-page.png');
  const child=page.locator('.card[href^="category.html?id="]').first();
  const direct=page.locator('.card[href^="products.html?category="]').first();
  if(await child.count()){await child.click();await page.waitForURL(/(?:\/category(?:\.html)?\/?\?id=|\/products(?:\.html)?\/?\?category=)/,{timeout:20000});await page.waitForTimeout(1000)}
  else if(await direct.count()){await direct.click();await page.waitForURL(/\/products(?:\.html)?\/?\?category=/,{timeout:20000})}
  else throw new Error('The live root category has no populated subcategory or product-list link');
  if(new URL(page.url()).pathname.endsWith('/category.html')) await page.waitForURL(/products\.html\?category=/,{timeout:20000});
  check('subcategory_to_product_listing',/(?:^|\/)products(?:\.html)?\/?$/.test(new URL(page.url()).pathname)&&!!new URL(page.url()).searchParams.get('category'),{url:page.url()});
  await page.locator('a[href^="product.html?id="]').first().waitFor({timeout:45000});
  await page.screenshot({path:path.join(OUT,'product-listing.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('product-listing.png');
  await page.locator('a[href^="product.html?id="]').first().click();
  await page.waitForURL(/\/product(?:\.html)?\/?\?id=/,{timeout:20000});
  await page.locator('#add').waitFor({timeout:45000});
  await page.waitForFunction(()=>{const img=document.querySelector('.hero img');return img&&img.complete&&img.naturalWidth>0},{timeout:45000});
  report.productImage=await page.locator('.hero img').evaluate(img=>({src:img.currentSrc||img.src,naturalWidth:img.naturalWidth,alt:img.alt}));
  check('individual_product_image_loads',report.productImage.naturalWidth>0,report.productImage);
  check('product_description_is_visible',await page.getByRole('heading',{name:'Product Description'}).count()===1,{count:await page.getByRole('heading',{name:'Product Description'}).count()});
  check('add_to_cart_button_visible',await page.locator('#add').isVisible(),{text:await page.locator('#add').innerText()});
  const q=page.locator('#queryPart');
  check('query_part_button_has_product_whatsapp_link',await q.isVisible()&&(await q.getAttribute('href')).startsWith('https://wa.me/'),{href:await q.getAttribute('href')});
  await page.screenshot({path:path.join(OUT,'product-detail.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('product-detail.png');
  const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
  observe(mobile,'mobile');
  const mr=await mobile.goto(BASE,{waitUntil:'domcontentloaded',timeout:60000});
  await mobile.frameLocator('#store').locator('#categoryGrid > .catWrap > .catBtn').first().waitFor({timeout:60000});
  await mobile.waitForTimeout(3000);
  const dimensions=await mobile.frameLocator('#store').locator('html').evaluate(el=>({width:el.clientWidth,scrollWidth:el.scrollWidth}));
  check('mobile_home_http',!!mr&&mr.status()<400,{status:mr?.status()});
  check('mobile_no_horizontal_overflow',dimensions.scrollWidth<=dimensions.width+2,dimensions);
  await mobile.screenshot({path:path.join(OUT,'mobile-home.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('mobile-home.png');
  report.finishedAt=new Date().toISOString();
  report.summary={pass:report.checks.filter(x=>x.status==='PASS').length,fail:report.checks.filter(x=>x.status==='FAIL').length,consoleErrors:report.consoleErrors.length,pageErrors:report.pageErrors.length,failedRequests:report.failedRequests.length,badResponses:report.badResponses.length};
  fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(failures.length)process.exitCode=1;
 }catch(e){report.fatalError=String(e.stack||e);report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));console.error(report.fatalError);process.exitCode=1}
 finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(2)});
