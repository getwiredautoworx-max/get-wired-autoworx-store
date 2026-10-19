const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = process.cwd();
const out = process.env.QA_OUT || path.join(root, 'qa-evidence');
fs.mkdirSync(out, {recursive:true});
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain'};
const server = http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); } catch { res.writeHead(400).end('Bad URL'); return; }
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== path.join(root, 'index.html')) { res.writeHead(403).end('Forbidden'); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, {'content-type':mime[path.extname(file)] || 'application/octet-stream','cache-control':'no-store'});
    fs.createReadStream(file).pipe(res);
  });
});
const assert = (condition, message) => { if (!condition) throw new Error(message); };
(async () => {
  await new Promise(resolve => server.listen(4173, '127.0.0.1', resolve));
  const browser = await chromium.launch({headless:true});
  const results = [];
  try {
    for (const width of [320,390,430,1440]) {
      const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
      const pageErrors = [];
      page.on('pageerror', e => pageErrors.push(String(e)));
      await page.goto('http://127.0.0.1:4173/store.html', {waitUntil:'domcontentloaded',timeout:30000});
      const frame = page.frameLocator('#store');
      await frame.locator('.heroCard').waitFor({state:'visible',timeout:20000});
      await frame.locator('.heroBtns .btn').first().waitFor({state:'visible',timeout:15000});
      await page.waitForTimeout(700);
      await page.screenshot({path:path.join(out, 'storefront-'+width+'.png'),fullPage:true}).catch(()=>{});
      const metrics = await frame.locator('body').evaluate(body => {
        const rect = s => { const e=document.querySelector(s); if(!e)return null; const r=e.getBoundingClientRect(); return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}; };
        const buttons=[...document.querySelectorAll('.heroBtns .btn')].map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}});
        const nav=rect('.mobileNav'), hero=rect('.heroCard'), header=rect('.header'), features=rect('.features'), categories=rect('#categories'), firstCategory=rect('#categoryGrid .catBtn[data-gw-root-index]');
        const rootCategoryCount=document.querySelectorAll('#categoryGrid .catBtn[data-gw-root-index]').length;
        const h1=document.querySelector('.heroText h1'), p=document.querySelector('.heroText p'), buy=document.querySelector('.mobileBuyBar');
        const heroH1Color=h1?getComputedStyle(h1).color:null, heroPColor=p?getComputedStyle(p).color:null, buyBarDisplay=buy?getComputedStyle(buy).display:'missing';
        const overflow = {viewport:document.documentElement.clientWidth,document:document.documentElement.scrollWidth,body:body.scrollWidth,offenders:[...document.querySelectorAll('body *')].map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,cls:typeof e.className==='string'?e.className:'',id:e.id,right:Math.round(r.right),left:Math.round(r.left),width:Math.round(r.width),scrollWidth:e.scrollWidth,clientWidth:e.clientWidth}}).filter(e=>e.right>document.documentElement.clientWidth+2||e.left < -2||e.scrollWidth>e.clientWidth+2).slice(0,25)};
        const pairs=[]; for(let i=0;i<buttons.length;i++)for(let j=i+1;j<buttons.length;j++){const a=buttons[i],b=buttons[j];if(a.x<b.right-1&&a.right>b.x+1&&a.y<b.bottom-1&&a.bottom>b.y+1)pairs.push([i,j]);}
        const intersects=(a,b)=>!!(a&&b&&a.x<b.right-1&&a.right>b.x+1&&a.y<b.bottom-1&&a.bottom>b.y+1);
        return {overflow,buttons,nav,hero,header,features,categories,firstCategory,rootCategoryCount,heroH1Color,heroPColor,buyBarDisplay,buttonOverlapPairs:pairs,heroButtonsOutsideCard:buttons.some(b=>!hero||b.x<hero.x-1||b.right>hero.right+1||b.y<hero.y-1||b.bottom>hero.bottom+1),heroActionFeatureOverlap:intersects(buttons.reduce((u,b)=>!u||b.y>u.y?b:u,null),features)};
      });
      assert(metrics.overflow.document <= width+2 && metrics.overflow.body <= width+2, width+'px horizontal overflow: '+JSON.stringify(metrics.overflow));
      const clipped = metrics.overflow.offenders.filter(e=>e.right>width+2||e.left < -2);
      assert(clipped.length===0, width+'px elements extend outside viewport: '+JSON.stringify(clipped));
      assert(metrics.buttons.length===4, width+'px expected four hero actions; got '+metrics.buttons.length);
      assert(metrics.buttonOverlapPairs.length===0, width+'px hero buttons overlap: '+JSON.stringify(metrics.buttonOverlapPairs));
      assert(!metrics.heroButtonsOutsideCard, width+'px hero actions escape hero card');
      assert(!metrics.heroActionFeatureOverlap, width+'px hero actions overlap feature banner');
      if(width<=430) {
        assert(metrics.buttons.every(b=>b.width>=100 && b.height>=40), width+'px touch targets too small: '+JSON.stringify(metrics.buttons));
        assert(metrics.nav && metrics.nav.right<=width+2, width+'px mobile navigation clipped');
        assert(metrics.hero.y<=260, width+'px hero starts too far below header: '+JSON.stringify({header:metrics.header,hero:metrics.hero}));
        assert(metrics.buyBarDisplay==='none', width+'px inactive mobile purchase bar is visible: '+metrics.buyBarDisplay);
        assert(metrics.heroH1Color==='rgb(255, 255, 255)', width+'px hero heading lacks high contrast: '+metrics.heroH1Color);
        assert(metrics.heroPColor==='rgb(243, 247, 251)', width+'px hero paragraph lacks high contrast: '+metrics.heroPColor);
        assert(metrics.categories && metrics.categories.y<900, width+'px category section is pushed below the first screen: '+JSON.stringify(metrics.categories));
        assert(metrics.rootCategoryCount===8, width+'px expected all eight approved root categories, got '+metrics.rootCategoryCount);
        assert(metrics.firstCategory && metrics.firstCategory.bottom <= metrics.nav.y+1, width+'px first category card is obscured by bottom navigation: '+JSON.stringify({firstCategory:metrics.firstCategory,nav:metrics.nav}));
      }
      let categoryNavigation='not-run';
      if(width===390){
        await frame.locator('.catBtn[data-gw-root-index="0"]').click();
        await frame.locator('.gw-subcategory-grid .catBtn').first().waitFor({state:'visible',timeout:10000});
        const subCount=await frame.locator('.gw-subcategory-grid .catBtn').count();
        assert(subCount>0,'390px root category did not open subcategories');
        await frame.locator('.gw-subcategory-grid .catBtn').first().click();
        await frame.locator('.gw-taxonomy-note').waitFor({state:'visible',timeout:10000});
        assert((await frame.locator('.gw-taxonomy-note').innerText()).includes('No legacy products are displayed'),'staged subcategory unexpectedly shows legacy products');
        await frame.locator('[data-gw-back-subcategories]').click();
        await frame.locator('.gw-subcategory-grid .catBtn').first().waitFor({state:'visible',timeout:10000});
        await frame.locator('[data-gw-back-roots]').click();
        await frame.locator('.catBtn[data-gw-root-index="0"]').waitFor({state:'visible',timeout:10000});
        categoryNavigation='PASS: root -> subcategory -> safe empty state -> back';
      }
      results.push({width,status:'PASS',categoryNavigation,...metrics,pageErrors});
      await page.close();
    }
    console.log(JSON.stringify({suite:'mobile-storefront-layout',results},null,2));
  } finally { await browser.close(); server.close(); }
})().catch(e=>{console.error(e.stack||e);server.close(()=>process.exit(1));});
