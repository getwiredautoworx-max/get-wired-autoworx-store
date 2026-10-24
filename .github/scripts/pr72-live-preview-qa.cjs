const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
let BASE=process.env.PREVIEW_URL || '';
const EXPECTED_SOURCE_SHA=process.env.EXPECTED_SOURCE_SHA || process.env.GITHUB_SHA || '';
const REPO=process.env.GITHUB_REPOSITORY || 'getwiredautoworx-max/get-wired-autoworx-store';
const PARITY_FILES=['index.html','store.html','index-new.html','category.html','products.html','product.html','category-navigation.js','assets/category-tree.json','assets/category-cleanup.js','assets/progressive-store-enhancements.js'];
const OUT=path.resolve('qa-live-preview-output');
fs.mkdirSync(OUT,{recursive:true});
const report={base:BASE,expectedSourceSha:EXPECTED_SOURCE_SHA,deployedSourceSha:null,checks:[],pageErrors:[],consoleErrors:[],failedRequests:[],badResponses:[],expectedImageFallbacks:[],authErrors:[],categoryImages:[],subcategoryImages:[],productImage:null,screenshots:[]};
const failures=[];
const check=(name,ok,detail={})=>{report.checks.push({name,status:ok?'PASS':'FAIL',detail});if(!ok)failures.push(name+': '+JSON.stringify(detail));};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function resolvePreviewUrl(){
 if(BASE){
  const u=new URL(BASE);
  if(u.pathname==='/'||u.pathname==='')u.pathname='/store.html';
  return u.href;
 }
 if(!EXPECTED_SOURCE_SHA)throw new Error('GITHUB_SHA or EXPECTED_SOURCE_SHA is required; refusing a stale preview URL.');
 const token=process.env.GITHUB_TOKEN;
 if(!token)throw new Error('GITHUB_TOKEN is required to resolve the exact Cloudflare Pages preview from PR #72.');
 const expectedShort=EXPECTED_SOURCE_SHA.slice(0,7).toLowerCase();
 const commentsUrl='https://api.github.com/repos/'+REPO+'/issues/72/comments?per_page=100';
 for(let attempt=0;attempt<18;attempt++){
  const response=await fetch(commentsUrl,{headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});
  if(response.ok){
   const comments=await response.json();
   for(const comment of comments.slice().reverse()){
    const body=String(comment.body||'');
    const latest=body.match(/<strong>Latest commit:<\/strong>[\s\S]{0,200}<code>([0-9a-f]{7,40})<\/code>/i);
    const preview=body.match(/<strong>Preview URL:<\/strong>[\s\S]{0,300}?<a href=['"]([^'"]+\.pages\.dev[^'"]*)['"]/i);
    if(latest&&latest[1].toLowerCase().startsWith(expectedShort)&&preview){
     const u=new URL(preview[1]);u.pathname='/store.html';u.search='';u.hash='';return u.href;
    }
   }
  }
  await sleep(10000);
 }
 throw new Error('No Cloudflare Pages deployment comment for exact PR #72 commit '+EXPECTED_SOURCE_SHA+' after 3 minutes; no URL will be guessed.');
}
function observe(page,label){page.on('pageerror',e=>report.pageErrors.push(label+': '+String(e)));page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(label+': '+m.text())});page.on('requestfailed',r=>{const reason=r.failure()?.errorText||'failed';if(reason==='net::ERR_ABORTED')return;report.failedRequests.push({page:label,url:r.url(),error:reason})});page.on('response',async r=>{if(r.status()===404&&r.url().includes('/functions/v1/product-image?sku='))report.expectedImageFallbacks.push({page:label,status:r.status(),url:r.url()});else if(r.status()>=400)report.badResponses.push({page:label,status:r.status(),url:r.url()});if(r.status()===401&&r.url().includes('/rest/v1/products'))report.authErrors.push({page:label,url:r.url(),body:await r.text().catch(()=>'(body unavailable)')})})}
const digest=s=>require('node:crypto').createHash('sha256').update(s).digest('hex');
async function verifySourceParity(){
 for(const file of PARITY_FILES){
  const deployedUrl=new URL(file,new URL(BASE).origin+'/').toString();
  const sourceUrl='https://raw.githubusercontent.com/'+REPO+'/'+EXPECTED_SOURCE_SHA+'/'+file;
  let detail={},equal=false;
  for(let attempt=0;attempt<6;attempt++){
   try{
    const [deployed,source]=await Promise.all([fetch(deployedUrl,{cache:'no-store'}),fetch(sourceUrl,{cache:'no-store'})]);
    const [deployedText,sourceText]=await Promise.all([deployed.text(),source.text()]);
    equal=deployed.ok&&source.ok&&deployedText===sourceText;
    detail={deployedStatus:deployed.status,sourceStatus:source.status,deployedSha256:digest(deployedText),sourceSha256:digest(sourceText),attempt:attempt+1};
    if(equal)break;
   }catch(e){detail={error:String(e),attempt:attempt+1}}
   await sleep(5000);
  }
  check('deployed_source_parity:'+file,equal,detail);
 }
 if(report.checks.filter(x=>x.name.startsWith('deployed_source_parity:')).every(x=>x.status==='PASS'))report.deployedSourceSha=process.env.EXPECTED_DEPLOYED_SHA||EXPECTED_SOURCE_SHA;
}
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  BASE=await resolvePreviewUrl();
  report.base=BASE;
  const page=await browser.newPage({viewport:{width:1365,height:900},deviceScaleFactor:1});
  observe(page,'desktop');
  const response=await page.goto(BASE,{waitUntil:'domcontentloaded',timeout:60000});
  check('preview_home_http',!!response&&response.status()<400,{status:response?.status(),url:page.url()});
  await verifySourceParity();
  const parityFailures=report.checks.filter(x=>x.name.startsWith('deployed_source_parity:')&&x.status==='FAIL');
  if(parityFailures.length)throw new Error('Deployed preview does not match the exact current PR #72 source commit; stopping before browser acceptance. '+JSON.stringify(parityFailures));
  const frame=page.frameLocator('#store');
  try {
   await frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn').first().waitFor({timeout:30000});
  } catch(e) {
   const frameInfo=await page.locator('iframe').evaluateAll(es=>es.map(x=>({id:x.id,src:x.getAttribute('src'),title:x.title}))).catch(()=>[]);
   const frameBodies=await Promise.all(page.frames().filter(x=>x!==page.mainFrame()).map(async x=>({url:x.url(),body:(await x.locator('body').innerText().catch(()=>'' )).slice(0,1800)})));
   await page.screenshot({path:path.join(OUT,'category-grid-timeout.png'),fullPage:true}).catch(()=>{});
   report.screenshots.push('category-grid-timeout.png');
   report.diagnostics={iframeCount:frameInfo.length,iframes:frameInfo,frames:frameBodies,consoleErrors:report.consoleErrors,failedRequests:report.failedRequests,badResponses:report.badResponses};
   throw new Error('Category grid did not render in the deployed preview. Diagnostics: '+JSON.stringify(report.diagnostics)+'; wait error: '+e.message);
  }
  await page.waitForTimeout(5000);
  const roots=await frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn').count();
  const photos=await frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn .catPhoto').evaluateAll(es=>es.map(e=>({label:e.closest('.catBtn')?.querySelector('.catContent b')?.textContent?.trim()||'',src:e.currentSrc||e.src,alt:e.alt,loaded:e.complete&&e.naturalWidth>0,naturalWidth:e.naturalWidth})));
  report.categoryImages=photos;
  check('eight_main_category_tiles',roots===8,{count:roots});
  check('main_category_photos_load_are_distinct_and_labelled',photos.length===8&&photos.every(x=>x.loaded&&x.naturalWidth>0&&/product photo/i.test(x.alt))&&new Set(photos.map(x=>x.src)).size===8,{photos});
  check('main_category_photos_are_not_logo_substitutions',photos.every(x=>!/gw-logo\\.png/i.test(x.src)),{logoSubstitutions:photos.filter(x=>/gw-logo\\.png/i.test(x.src))});
  const expectedRootPhotos={'Auto Electrical Spares':'photo-1518770660439-4636190af475','Vehicle Security':'photo-1558002038-1055907df827','Car Audio & Entertainment':'photo-1600003014755-ba31aa59c4b6','Automotive Accessories':'photo-1492144534655-ae79c964c9d7','Marine Spares & Accessories':'photo-1544551763-46a013bb70d5','Tools, Hardware & Consumables':'photo-1530124566582-a618bc2615dc','Camping, Leisure & Outdoors':'photo-1478131143081-80f7f84ca84d','Trailer & Canopy':'Ford_Ranger_with_tray_canopy_back.jpg'};
  check('main_category_photo_topics_match_labels',photos.every(x=>expectedRootPhotos[x.label]&&x.src.includes(expectedRootPhotos[x.label])),{mismatches:photos.filter(x=>!expectedRootPhotos[x.label]||!x.src.includes(expectedRootPhotos[x.label]))});
  const homepageCredits=await frame.locator('#categoryImageCredits').innerText().catch(()=> '');
  check('homepage_commons_photo_attributions_visible',/Shixart1985/.test(homepageCredits)&&/Milicevic01/.test(homepageCredits)&&/Ahsanriaz6157/.test(homepageCredits)&&/Azorbli/.test(homepageCredits)&&/Steelkamp/.test(homepageCredits)&&/DanTD/.test(homepageCredits)&&/Nick Ares/.test(homepageCredits)&&/K\.Szonja/.test(homepageCredits)&&/Ballista/.test(homepageCredits),{homepageCredits});
  check('wrapper_whatsapp_button_removed',await page.locator('#whatsapp,.whatsapp-fab').count()===0,{count:await page.locator('#whatsapp,.whatsapp-fab').count()});
  check('no_repeated_whatsapp_card_buttons',await frame.locator('.gwWA').count()===0,{count:await frame.locator('.gwWA').count()});
  await page.screenshot({path:path.join(OUT,'homepage.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('homepage.png');
  check('specials_no_more_than_four',await frame.locator('#featuredGrid .product').count()<=4,{count:await frame.locator('#featuredGrid .product').count()});
  await frame.getByRole('button',{name:/CAN’T FIND A PART\? REQUEST IT/i}).first().click();
  check('request_part_dialog_opens',await frame.locator('#sourcePart.open').count()===1,{count:await frame.locator('#sourcePart.open').count()});
  await frame.locator('#sourcePart').evaluate(el=>el.classList.remove('open'));
  const searchButton=frame.getByRole('button',{name:/PART SEARCH/i});
  check('standalone_part_search_button_visible',await searchButton.count()===1&&await searchButton.isVisible(),{count:await searchButton.count()});
  await searchButton.click();
  check('part_search_dialog_opens',await frame.locator('#partSearchDialog.open').count()===1,{count:await frame.locator('#partSearchDialog.open').count()});
  const searchInput=frame.locator('#partSearchQuery');
  if(await searchInput.count()) await searchInput.fill('12V fuse regulator');
  await frame.getByRole('button',{name:/CAN’T FIND IT IN THE STORE\? REQUEST THIS PART/i}).click();
  await frame.locator('#sourcePart.open').waitFor({timeout:5000});
  const carriedQuery=await frame.locator('#sourcePartNeeded').inputValue().catch(()=> '');
  check('part_request_flow_carries_search_query',carriedQuery==='12V fuse regulator',{carriedQuery});
  await frame.locator('#sourcePart').evaluate(el=>el.classList.remove('open'));
  const banner=await frame.locator('.heroRangeLine').innerText().catch(()=> '');
  check('corrected_range_banner_copy',/SOUND & SECURITY\s*•\s*AUTO ELECTRICAL\s*•\s*SPARES & ACCESSORIES/i.test(banner),{banner});
  const bannerGeometry=await frame.locator('.heroCard').evaluate(el=>{const a=el.querySelector('.ratingbox')?.getBoundingClientRect(),b=el.querySelector('.since')?.getBoundingClientRect();return {missing:!a||!b,overlap:!!a&&!!b&&a.x<b.right&&a.right>b.x&&a.y<b.bottom&&a.bottom>b.y,rating:a&&{x:a.x,y:a.y,width:a.width,height:a.height},since:b&&{x:b.x,y:b.y,width:b.width,height:b.height}}}).catch(e=>({error:String(e)}));
  check('rating_does_not_overlap_since_2012',!bannerGeometry.missing&&!bannerGeometry.overlap&&!bannerGeometry.error,bannerGeometry);
  const root=frame.locator('#categoryGrid > .catWrap:not(.findPartCategoryTile) > .catBtn').first();
  const rootId=await root.getAttribute('data-filter');
  const tabsBefore=page.context().pages().length;
  await root.click();
  await page.waitForURL(/\/category(?:\.html)?\/?\?id=/,{timeout:20000});
  check('root_category_click_opens_individual_page_in_same_tab',/(?:^|\/)category(?:\.html)?\/?$/.test(new URL(page.url()).pathname)&&new URL(page.url()).searchParams.get('id')===rootId&&page.context().pages().length===tabsBefore,{url:page.url(),rootId,tabsBefore,tabsAfter:page.context().pages().length});
  await page.waitForTimeout(1500);
  await page.locator('.card img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
  await page.waitForFunction(()=>{const imgs=[...document.querySelectorAll('.card img')];return imgs.length>0&&imgs.every(img=>img.complete)},{timeout:20000}).catch(()=>{});
  report.subcategoryImages=await page.locator('.card img').evaluateAll(imgs=>imgs.map(img=>({alt:img.alt,src:img.currentSrc||img.src,loaded:img.complete&&img.naturalWidth>0,naturalWidth:img.naturalWidth})));
  const subcategoryUnique=new Set(report.subcategoryImages.map(x=>x.src)).size;
  check('subcategory_photos_load_are_distinct_and_labelled',report.subcategoryImages.length>=8&&subcategoryUnique>=report.subcategoryImages.length-1&&report.subcategoryImages.every(x=>x.loaded&&x.naturalWidth>0&&/product photo/i.test(x.alt)),{count:report.subcategoryImages.length,uniqueSources:subcategoryUnique,failed:report.subcategoryImages.filter(x=>!x.loaded),photos:report.subcategoryImages});
  check('subcategory_photos_are_not_logo_substitutions',report.subcategoryImages.every(x=>!/gw-logo\\.png/i.test(x.src)),{logoSubstitutions:report.subcategoryImages.filter(x=>/gw-logo\\.png/i.test(x.src))});
  const topicRules=[
   {label:/View\s+\d+\s+products in Electrical/i,src:'photo-1518770660439-4636190af475',required:true},
   {label:/12V Light Duty Vehicles/i,src:'photo-1492144534655-ae79c964c9d7',required:true},
   {label:/ELECTRICAL SPARES/i,src:'photo-1518770660439-4636190af475',required:true},
   {label:/BATTER(?:Y|IES)/i,src:'Car_battery.jpg',required:true},
   {label:/FUSES/i,src:'Closeup_of_the_car_fuses.jpg',required:true},
   {label:/Fuel Pumps/i,src:'Bosch_Fuel_Pump_0_580_254_957-92468.jpg',required:false},
   {label:/IGNITION SPARES/i,src:'Ignition_coil.jpg',required:true},
   {label:/Lighting/i,src:'H4_halogen_car_lamp.jpg',required:true},
   {label:/REGULATORS/i,src:'Alternator_voltage_regulator.jpg',required:true},
   {label:/RELAYS?/i,src:'Fuse_relay_with_a_connector_to_the_CANbus_in_yellow.JPG',required:true},
   {label:/SENSORS/i,src:'Car_parking_sensor_closeup.jpg',required:true},
   {label:/SWITCHES/i,src:'Ignition_between_seats.JPG',required:true},
   {label:/Wiring.*Connectors/i,src:'photo-1762329404225-2953941c00f1',required:true},
   {label:/TRAILER & TOWING/i,src:'Little_Big_Trailer_towed_by_Ram_Pickup_%40_WPB_Service_Plaza.jpg',required:true}
  ];
  const topicResults=topicRules.map(rule=>{const found=report.subcategoryImages.filter(x=>rule.label.test(x.alt));return {label:String(rule.label),expected:rule.src,required:rule.required,found:found.map(x=>({alt:x.alt,src:x.src,loaded:x.loaded,naturalWidth:x.naturalWidth})),passed:found.length?found.every(x=>x.src.includes(rule.src)&&x.loaded&&x.naturalWidth>0):!rule.required}});
  check('subcategory_specific_photos_match_topics',topicResults.every(x=>x.passed),{topicResults});
  const categoryCredits=await page.locator('#imageCredits').innerText().catch(()=> '');
  check('category_commons_photo_attributions_visible',/Shixart1985/.test(categoryCredits)&&/Milicevic01/.test(categoryCredits)&&/Ahsanriaz6157/.test(categoryCredits)&&/Azorbli/.test(categoryCredits)&&/Nick Ares/.test(categoryCredits)&&/K\.Szonja/.test(categoryCredits)&&/Ballista/.test(categoryCredits),{categoryCredits});
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
  const qHref=await q.getAttribute('href')||'';
  const skuText=await page.locator('.sku').innerText().catch(()=> '');
  const sku=skuText.replace(/^SKU:/i,'').trim();
  const waMessage=qHref?new URL(qHref).searchParams.get('text')||'':'';
  check('query_part_button_has_product_whatsapp_link',await q.isVisible()&&qHref.startsWith('https://wa.me/')&&!!sku&&waMessage.includes(sku),{href:qHref,sku,waMessage});
  const addText=await page.locator('#add').innerText();
  if(/ADD TO CART/i.test(addText)&&await page.locator('#add').isEnabled()){
    await page.locator('#add').click();
    const cartCount=await page.locator('#badge').innerText().catch(()=> '0');
    check('product_add_to_cart_updates_cart_badge',Number(cartCount)>0,{addText,cartCount});
  }else check('product_add_to_cart_updates_cart_badge',false,{addText,enabled:await page.locator('#add').isEnabled()});
  check('product_page_has_no_floating_request_cta',await page.locator('.requestPartFloating').count()===0,{count:await page.locator('.requestPartFloating').count()});
  check('product_detail_api_not_unauthorized',report.authErrors.length===0,{authErrors:report.authErrors});
  await page.screenshot({path:path.join(OUT,'product-detail.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('product-detail.png');
  await page.goto(new URL('/category.html?id=63a71fd9-df45-43f0-b61d-ad622daa9d79',BASE).href,{waitUntil:'domcontentloaded',timeout:60000});
  const trailerCard=page.locator('.card:has(h2:text-is("TRAILER & TOWING"))').first();
  await trailerCard.waitFor({timeout:20000});
  await trailerCard.scrollIntoViewIfNeeded();
  await trailerCard.locator('img').evaluate(img=>{img.loading='eager';img.scrollIntoView({block:'center'})});
  await page.waitForFunction(()=>{const c=[...document.querySelectorAll('.card')].find(e=>{const h=e.querySelector('h2');return h&&h.textContent.trim().toUpperCase()==='TRAILER & TOWING'});const img=c&&c.querySelector('img');return !!img&&img.complete&&img.naturalWidth>0},{timeout:20000}).catch(()=>{});
  const trailerPhoto=await trailerCard.locator('img').evaluate(img=>({src:img.currentSrc||img.src,loaded:img.complete&&img.naturalWidth>0,naturalWidth:img.naturalWidth}));
  check('trailer_towing_subcategory_photo_matches_topic',trailerPhoto.loaded&&trailerPhoto.naturalWidth>0&&trailerPhoto.src.includes('Little_Big_Trailer_towed_by_Ram_Pickup_%40_WPB_Service_Plaza.jpg'),trailerPhoto);
  const trailerCredits=await page.locator('#imageCredits').innerText().catch(()=> '');
  check('trailer_photo_attribution_visible',/DanTD/.test(trailerCredits),{trailerCredits});
  await page.screenshot({path:path.join(OUT,'trailer-category.png'),fullPage:true}).catch(()=>{});
  report.screenshots.push('trailer-category.png');
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
  const expectedFallbackConsoleErrors=report.expectedImageFallbacks.length?report.consoleErrors.filter(x=>x.includes('Failed to load resource')&&x.includes('404')):[];
  const unexpectedConsoleErrors=report.consoleErrors.filter(x=>!expectedFallbackConsoleErrors.includes(x));
  const exactSkuImageCheck=report.checks.find(x=>x.name==='individual_product_image_loads');
  const expectedFallbackOk=report.expectedImageFallbacks.length===0||exactSkuImageCheck?.status==='PASS';
  report.expectedFallbackConsoleErrors=expectedFallbackConsoleErrors;
  report.consoleErrors=unexpectedConsoleErrors;
  check('expected_product_image_404_uses_exact_sku_fallback',expectedFallbackOk,{expectedImageFallbacks:report.expectedImageFallbacks,exactSkuImageCheck});
  check('no_browser_console_page_or_network_errors',report.consoleErrors.length===0&&report.pageErrors.length===0&&report.failedRequests.length===0&&report.badResponses.length===0&&expectedFallbackOk,{consoleErrors:report.consoleErrors,pageErrors:report.pageErrors,failedRequests:report.failedRequests,badResponses:report.badResponses,expectedImageFallbacks:report.expectedImageFallbacks});
  report.summary={pass:report.checks.filter(x=>x.status==='PASS').length,fail:report.checks.filter(x=>x.status==='FAIL').length,consoleErrors:report.consoleErrors.length,pageErrors:report.pageErrors.length,failedRequests:report.failedRequests.length,badResponses:report.badResponses.length,expectedImageFallbacks:report.expectedImageFallbacks.length};
  fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(failures.length)process.exitCode=1;
 }catch(e){report.fatalError=String(e.stack||e);report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(OUT,'report.json'),JSON.stringify(report,null,2));console.error(report.fatalError);process.exitCode=1}
 finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(2)});
