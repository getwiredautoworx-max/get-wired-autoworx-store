const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

const htmlPath = 'index-new-staging-test.html';
const taxonomyPath = 'store-category-hierarchy-staging-test.json';
const html = fs.readFileSync(htmlPath, 'utf8');
const taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
const embeddedMatch = html.match(/const GW_STAGING_TAXONOMY=(\{[\s\S]*?\});function openGwCategoryLevel/);
assert.ok(embeddedMatch, 'Embedded staging taxonomy must exist in index-new.html');
const embedded = JSON.parse(embeddedMatch[1]);
assert.equal(taxonomy.live_catalogue_enabled, false, 'Staging taxonomy must remain disabled for live catalogue import');
assert.equal(embedded.roots.length, taxonomy.roots.length, 'Embedded/source taxonomy root count must match');
assert.deepEqual(
  embedded.roots.map(r => ({ slug:r.slug, label:r.label, subcategories:r.subcategories.map(c => ({slug:c.slug,label:c.label})) })),
  taxonomy.roots.map(r => ({ slug:r.slug, label:r.label, subcategories:r.subcategories.map(c => ({slug:c.slug,label:c.label})) })),
  'Embedded navigation taxonomy must exactly match the staging taxonomy JSON'
);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  try {
    for (const viewport of [{width:390,height:844},{width:1280,height:900}]) {
      const page = await browser.newPage({ viewport });
      page.on('pageerror', error => failures.push('pageerror: '+error.message));
      await page.addInitScript(() => {
        const originalScrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function(options) {
          if (options && typeof options === 'object') return originalScrollIntoView.call(this, {...options, behavior:'auto'});
          return originalScrollIntoView.call(this, options);
        };
      });
      await page.route('https://ojytykqpvonxvepprgbh.supabase.co/rest/v1/**', route => {
        const req = route.request();
        const cors = {
          'access-control-allow-origin':'*',
          'access-control-allow-methods':'GET, OPTIONS',
          'access-control-allow-headers':'apikey,authorization,prefer,range,content-type',
          'access-control-max-age':'600'
        };
        if (req.method() === 'OPTIONS') return route.fulfill({status:204,headers:cors,body:''});
        return route.fulfill({status:200,contentType:'application/json',headers:cors,body:'[]'});
      });
      const response = await page.goto('http://127.0.0.1:4174/index-new-staging-test.html', { waitUntil:'domcontentloaded' });
      assert.ok(response && response.status() === 200, 'Staging HTML should load over local HTTP');
      const roots = page.locator('#categoryGrid button[data-gw-root-index]');
      await roots.first().waitFor({ timeout:15000 });
      assert.equal(await roots.count(), 8, 'Exactly eight root category buttons should render');
      for (let i=0;i<taxonomy.roots.length;i++) {
        const root = taxonomy.roots[i];
        console.log('TEST_ROOT_START '+root.label+' viewport='+viewport.width);
        const rootButton = page.locator('#categoryGrid button[data-gw-root-index="'+i+'"]');
        assert.equal(await rootButton.count(), 1, 'Root button index '+i+' must exist');
        const rootButtonText = await rootButton.innerText();
        assert.ok(rootButtonText.toLocaleUpperCase().includes(root.label.toLocaleUpperCase()), 'Root label mismatch: expected '+JSON.stringify(root.label)+'; actual '+JSON.stringify(rootButtonText));
        await rootButton.click();
        const children = page.locator('#categoryGrid button[data-gw-subcategory-root="'+i+'"]');
        await children.first().waitFor({ timeout:5000 });
        assert.equal(await children.count(), root.subcategories.length, 'Subcategory count mismatch for '+root.label);
        for (let j=0;j<root.subcategories.length;j++) {
          const sub = root.subcategories[j];
          const child = page.locator('#categoryGrid button[data-gw-subcategory-root="'+i+'"][data-gw-subcategory-index="'+j+'"]');
          assert.ok((await child.innerText()).toLocaleUpperCase().includes(sub.label.toLocaleUpperCase()), 'Subcategory label mismatch: '+root.label+' / '+sub.label);
          await child.click();
          await page.getByText('Catalogue products are not loaded into this new category structure yet.', {exact:false}).waitFor({timeout:3000});
          assert.ok((await page.locator('#categoryGrid').innerText()).toLocaleUpperCase().includes(sub.label.toLocaleUpperCase()), 'Subcategory page heading missing: '+sub.label);
          await page.locator('#categoryGrid button[data-gw-back-subcategories]').click();
          assert.equal(await page.locator('#categoryGrid button[data-gw-subcategory-root="'+i+'"]').count(), root.subcategories.length, 'Subcategory back control failed for '+root.label);
        }
        await page.locator('#categoryGrid button[data-gw-back-roots]').click();
        assert.equal(await page.locator('#categoryGrid button[data-gw-root-index]').count(), 8, 'Root back control failed for '+root.label);
      }
      const widthCheck = await page.evaluate(() => ({viewport:innerWidth,document:document.documentElement.scrollWidth,grid:document.querySelector('#categoryGrid').scrollWidth,gridClient:document.querySelector('#categoryGrid').clientWidth,offenders:[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {tag:el.tagName,id:el.id,cls:typeof el.className==='string'?el.className:'',text:(el.innerText||'').trim().slice(0,70),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),position:s.position,overflowX:s.overflowX}}).filter(x=>x.right>innerWidth+1||x.left< -1).sort((a,b)=>b.right-a.right).slice(0,12)}));
      assert.ok(widthCheck.document <= widthCheck.viewport + 2, 'Unexpected horizontal page overflow at viewport '+viewport.width+': '+JSON.stringify(widthCheck));
      console.log('CATEGORY_NAV_BROWSER_PASS viewport='+viewport.width+' roots='+taxonomy.roots.length+' subcategories='+taxonomy.roots.reduce((n,r)=>n+r.subcategories.length,0));
      await page.close();
    }
    assert.deepEqual(failures, [], 'Browser runtime errors: '+failures.join('; '));
    console.log('CATEGORY_NAVIGATION_ACCEPTANCE_PASS: 8 roots, 71 subcategories, every subcategory/back path at mobile and desktop viewports; taxonomy snapshot matches source JSON; live import remains disabled.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
