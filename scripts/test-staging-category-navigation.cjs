const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
 fs.mkdirSync('artifacts',{recursive:true});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('index-new.html')).href,{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#categoryGrid [data-gw-root-index]',{timeout:15000});
 await page.screenshot({path:'artifacts/category-home-mobile-390.png',fullPage:false});
 await page.locator('#categoryGrid').scrollIntoViewIfNeeded();
 await page.screenshot({path:'artifacts/category-grid-mobile-390.png',fullPage:false});
 await page.evaluate(()=>window.scrollTo(0,0));
 const roots=page.locator('#categoryGrid [data-gw-root-index]');
 const rootCount=await roots.count();
 if(rootCount!==8) throw new Error('Expected 8 root categories, got '+rootCount);
 const expected=['Auto Electrical Spares','Vehicle Security','Car Audio & Entertainment','Automotive Accessories','Marine Spares & Accessories','Tools, Hardware & Consumables','Camping, Leisure & Outdoors','Trailer & Canopy'];
 let totalSubcategories=0;
 for(let i=0;i<8;i++){
  await page.locator('#categoryGrid [data-gw-root-index="'+i+'"]').click();
  await page.waitForSelector('#categoryGrid [data-gw-subcategory-index]');
  const heading=(await page.locator('#categoryGrid h3').innerText()).trim();
  if(!heading.toLowerCase().startsWith(expected[i].toLowerCase())) throw new Error('Wrong root heading at '+i+': '+heading);
  const subs=page.locator('#categoryGrid [data-gw-subcategory-index]');
  const n=await subs.count();
  totalSubcategories+=n;
  if(n<1) throw new Error('No subcategories for '+heading);
  for(let k=0;k<n;k++){
   await page.locator('#categoryGrid [data-gw-subcategory-root="'+i+'"][data-gw-subcategory-index="'+k+'"]').click();
   await page.waitForSelector('#categoryGrid [data-gw-back-subcategories]');
   await page.locator('#categoryGrid [data-gw-back-subcategories]').click();
   await page.waitForSelector('#categoryGrid [data-gw-subcategory-index]');
  }
  await page.locator('#categoryGrid [data-gw-back-roots]').click();
  await page.waitForSelector('#categoryGrid [data-gw-root-index]');
 }
 if(totalSubcategories!==71) throw new Error('Expected 71 subcategories, got '+totalSubcategories);
 const width=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,document:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {tag:el.tagName,id:el.id,cls:typeof el.className==='string'?el.className:'',text:(el.innerText||'').trim().slice(0,80),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),position:s.position,overflowX:s.overflowX}}).filter(x=>x.right>innerWidth+1||x.left< -1).sort((a,b)=>b.right-a.right).slice(0,12)}));
 if(width.document>width.viewport) throw new Error('Horizontal overflow at 390px: '+JSON.stringify(width));
 if(errors.length) throw new Error('Browser runtime errors: '+errors.join(' | '));
 await page.setViewportSize({width:1280,height:900});
 await page.reload({waitUntil:'domcontentloaded'});
 await page.waitForSelector('#categoryGrid [data-gw-root-index]');
 await page.screenshot({path:'artifacts/category-home-desktop-1280.png',fullPage:false});
 await page.locator('#categoryGrid').scrollIntoViewIfNeeded();
 await page.screenshot({path:'artifacts/category-grid-desktop-1280.png',fullPage:false);
 const desktop=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,document:document.documentElement.scrollWidth}));
 if(desktop.document>desktop.viewport) throw new Error('Horizontal overflow at 1280px: '+JSON.stringify(desktop));
 console.log(JSON.stringify({status:'PASS',roots:rootCount,subcategories:totalSubcategories,subcategoriesChecked:'all subcategories individually opened and returned',mobile:width,desktop,browserErrors:errors.length},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
