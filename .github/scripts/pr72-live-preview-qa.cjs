const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const BASE=process.env.PREVIEW_URL || 'https://6fa32822.get-wired-autoworx-store.pages.dev/store.html';
const EXPECTED_SOURCE_SHA=process.env.EXPECTED_SOURCE_SHA || '775796d131f812de8f85521e1e51e74fd3eff43d';
const DEPLOYED_SOURCE_SHA='6a187f2e342e2b5f9974b16b5b9cab2b5c7d0152';
const REPO='getwiredautoworx-max/get-wired-autoworx-store';
const PARITY_FILES=['index.html','store.html','index-new.html','category.html','products.html','product.html','category-navigation.js','assets/category-tree.json','assets/category-cleanup.js','assets/progressive-store-enhancements.js'];
const OUT=path.resolve('qa-live-preview-output');
fs.mkdirSync(OUT,{recursive:true});
const report={base:BASE,expectedSourceSha:EXPECTED_SOURCE_SHA,deployedSourceSha:DEPLOYED_SOURCE_SHA,checks:[],pageErrors:[],consoleErrors:[],failedRequests:[],badResponses:[],authErrors:[],categoryImages:[],subcategoryImages:[],productImage:null,screenshots:[]};
const failures=[];
const check=(name,ok,detail={})=>{report.checks.push({name,status:ok?'PASS':'FAIL',detail});if(!ok)failures.push(name+': '+JSON.stringify(detail));};
function observe(page,label){page.on('pageerror',e=>report.pageErrors.push(label+': '+String(e)));page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(label+': '+m.text())});page.on('requestfailed',r=>report.failedRequests.push({page:label,url:r.url(),error:r.failure()?.errorText||'failed'}));page.on('response',async r=>{if(r.status()>=400)report.badResponses.push({page:label,status:r.status(),url:r.url()});if(r.status()===401&&r.url().includes('/rest/v1/products'))report.authErrors.push({page:label,url:r.url(),body:await r.text().catch(()=>'(body unavailable)')})})}
const digest=s=>require('node:crypto').createHash('sha256').update(s).digest('hex');
async function verifySourceParity(){
 for(const file of PARITY_FILES){
  const deployedUrl=new URL(file,new URL(BASE).origin+'/').toString();
  const sourceUrl='https://raw.githubusercontent.com/'+REPO+'/'+EXPECTED_SOURCE_SHA+'/'+file;
  try{
   const [deployed,source]=await Promise.all([fetch(deployedUrl),fetch(sourceUrl)]);
   const [deployedText,sourceText]=await Promise.all([deployed.text(),source.text()]);
   const equal=deployed.ok&&source.ok&&deployedText===sourceText;
   check('deployed_source_parity:'+file,equal,{deployedStatus:deployed.status,sourceStatus:source.status,deployedSha256:digest(deployedText),sourceSha256:digest(sourceText)});
  }catch(e){check('deployed_source_parity:'+file,false,{error:String(e)})}
}
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1365,height:900},deviceScaleFactor:1});
  observe(page,'desktop');
  const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:60000});
  check('preview_home_http',!!response&&response.status()<400,{status:response?.status(),url:page.url()});
  await verifySourceParity();
  const frame=page.frameLocator('#store');
  await frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn').first().waitFor({timeout:60000});
  await page.waitForTimeout(5000);
  const roots=await frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn').count();
  const photos=await frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn .catPhoto').evaluateAll(es=>es.map(e=>({src:e.currentSrc||e.src,alt:e.alt,loaded:e.complete&&e.naturalWidth>0,naturalWidth:e.naturalWidth})));
  report.categoryImages=photos;
  check('eight_main_category_tiles',roots===8,{count:roots});
  check('main_category_photos_load_are_distinct_and_labelled',photos.length===8&&photos.every(x=>x.loaded&&/product photo/i.test(x.alt))&&new Set(photos.map(x=>x.src)).size===8,{photos});
  check('wrapper_whatsapp_button_removed',await page.locator('#whatsapp,.whatsapp-fab').count()===0,{count:await page.locator('#whatsapp,.whatsapp-fab').count()});
  check('no_repeated_whatsapp_card_buttons',await frame.locator('.gwWA').count()===0,{count:await frame.locator('.gwWA').count()});
  await page.screenshot({path:path.join(OUT,'homepage.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('homepage.png');
  check('specials_no_more_than_four',await frame.locator('#featuredGrid .product').count()<=4,{count:await frame.locator('#featuredGrid .product').count()});
  await frame.getByRole('button',{name:/CAN’T FIND A PART\? REQUEST IT/i}).first().click();
  check('request_part_dialog_opens',await frame.locator('#sourcePart.open').count()===1,{count:await frame.locator('#sourcePart.open').count()});
  await frame.locator('#sourcePart').evaluate(el=>el.classList.remove('open'));
  const root=frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn').first();
  const rootId=await root.getAttribute('data-filter');
  await root.click();
  await page.waitForURL(/\/category(?:\.html)?\/?\?id=/,{timeout:20000});
  check('root_category_click_opens_individual_page',/(?:^|\/)category(?:\.html)?\/?$/.test(new URL(page.url()).pathname)&&new URL(page.url()).searchParams.get('id')===rootId,{url:page.url(),rootId});
  await page.waitForTimeout(1500);
  await page.locator('.card img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
  await page.waitForFunction(()=>{const imgs=[...document.querySelectorAll('.card img')];return imgs.length>0&&imgs.every(img=>img.complete)},{timeout:20000}).catch(()=>{});
  report.subcategoryImages=await page.locator('.card img').evaluateAll(imgs=>imgs.map(img=>({alt:img.alt,src:img.currentSrc||img.src,loaded:img.complete&&img.naturalWidth>0,naturalWidth:img.naturalWidth})));
  const subcategoryUnique=new Set(report.subcategoryImages.map(x=>x.src)).size;
  check('subcategory_photos_load_are_distinct_and_labelled',report.subcategoryImages.length>=8&&subcategoryUnique>=5&&report.subcategoryImages.every(x=>x.loaded&&/product photo/i.test(x.alt)),{count:report.subcategoryImages.length,uniqueSources:subcategoryUnique,failed:report.subcategoryImages.filter(x=>!x.loaded),photos:report.subcategoryImages});
  await page.screenshot({path:path.join(OUT,'category-page.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('category-page.png');
  const batterySubcategory=page.locator('.card[href^="category.html?id="]').filter({hasText:/BATTERY/i}).first();
  const firstSubcategory=page.locator('.card[href^="category.html?id="]').first();
  const chosenSubcategory=await batterySubcategory.count()?batterySubcategory:firstSubcategory;
  if(await chosenSubcategory.count()){
    const chosenLabel=(await chosenSubcategory.innerText()).trim();
    await chosenSubcategory.click();
    await page.waitForURL(new RegExp('/category(?:\\.html)?/?\\?id=|/products(?:\\.html)?/?\\?category='),{timeout:20000});
    check('subcategory_click_opens_its_own_route',new RegExp('(?:^|/)category(?:\\.html)?/?$').test(new URL(page.url()).pathname)||new RegExp('(?:^|/)products(?:\\.html)?/?$').test(new URL(page.url()).pathname),{label:chosenLabel,url:page.url()});
    await page.waitForTimeout(700);
  } else {
    check('subcategory_tile_available',false,{url:page.url()});
  }
  async function findProductListing(depth=0){
    const currentPath=new URL(page.url()).pathname;
    if(new RegExp('(?:^|/)products(?:\\.html)?/?$').test(currentPath))return true;
    if(depth>=5)return false;
    const directLink=page.locator('.card[href^="products.html?category="]').first();
    if(await directLink.count()){
      await directLink.click();
      await page.waitForURL(new RegExp('/products(?:\\.html)?/?\\?category='),{timeout:20000});
      return true;
    }
    const nextCategory=page.locator('.card[href^="category.html?id="]').first();
    if(await nextCategory.count()){
      await nextCategory.click();
      await page.waitForURL(new RegExp('/category(?:\\.html)?/?\\?id=|/products(?:\\.html)?/?\\?category='),{timeout:20000});
      await page.waitForTimeout(500);
      return findProductListing(depth+1);
    }
    return false;
  }
  const reachedProducts=await findProductListing();
  check('subcategory_to_product_listing',reachedProducts&&new RegExp('(?:^|/)products(?:\\.html)?/?$').test(new URL(page.url()).pathname)&&!!new URL(page.url()).searchParams.get('category'),{url:page.url()});
  await page.screenshot({path:path.join(OUT,'product-listing.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('product-listing.png');
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
  check('product_page_has_no_floating_request_cta',await page.locator('.requestPartFloating').count()===0,{count:await page.locator('.requestPartFloating').count()});
  check('product_detail_api_not_unauthorized',report.authErrors.length===0,{authErrors:report.authErrors});
  await page.screenshot({path:path.join(OUT,'product-detail.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('product-detail.png');
  const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
  observe(mobile,'mobile');
  const mr=await mobile.goto(BASE,{waitUntil:'domcontentloaded',timeout:60000});
  await mobile.frameLocator('#store').locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn').first().waitFor({timeout:60000});
  await mobile.waitForTimeout(3000);
  const dimensions=await mobile.frameLocator('#store').locator('html').evaluate(el=>({width:el.clientWidth,scrollWidth:el.scrollWidth}));
  check('mobile_home_http',!!mr&&mr.status()<400,{status:mr?.status()});
  check('mobile_no_horizontal_overflow',dimensions.scrollWidth<=dimensions.width+2,dimensions);
  await mobile.screenshot({path:path.join(OUT,'mobile-home.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('mobile-home.png');
  const fontCspErrors=report.consoleErrors.filter(x=>x.includes('fonts.googleapis.com')&&x.includes('Content Security Policy'));
  check('google_fonts_stylesheet_not_blocked_by_csp',fontCspErrors.length===0,{fontCspErrors});
  report.finishedAt=new Date().toISOString();
  report.summary={pass:report.checks.filter(x=>x.status==='PASS').length,fail:report.checks.filter(x=>x.status==='FAIL').length,consoleErrors:report.consoleErrors.length,pageErrors:report.pageErrors.length,failedRequests:report.failedRequests.length,badResponses:report.badResponses.length};
  fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(failures.length)process.exitCode=1;
 }catch(e){report.fatalError=String(e.stack||e);report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));console.error(report.fatalError);process.exitCode=1}
 finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(2)});
