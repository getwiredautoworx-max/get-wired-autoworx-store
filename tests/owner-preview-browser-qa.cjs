'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const BASE = 'http://127.0.0.1:4173';
const SUPPLIER_NAMES = /Planetworld|Audio Connections/i;
const EXPECTED_ROOTS = ['Car Audio / Home Entertainment', 'Auto Electrical Spares', 'Car Care & Accessories'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      page.setDefaultTimeout(20000);
      const writes = [];
      await page.route('**/rest/v1/**', async route => {
        const method = route.request().method();
        const url = route.request().url();
        if (method !== 'GET' && method !== 'HEAD') {
          writes.push({ method, url });
          return route.abort();
        }
        if (/\/rest\/v1\/products(?:\?|$)/.test(url)) {
          return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
        }
        return route.continue();
      });

      await page.goto(BASE + '/index-new.html?ownerPreview=1&previewBuild=exact-head-qa', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#categoryGrid .catWrap', { state: 'attached' });
      await page.waitForFunction(() => {
        const labels = [...document.querySelectorAll('#categoryGrid .catWrap .catContent b')].map(x => x.textContent.trim());
        return labels.length === 3;
      });
      const roots = await page.locator('#categoryGrid .catWrap .catContent b').allTextContents();
      assert.deepEqual(roots.map(x => x.trim()), EXPECTED_ROOTS, 'homepage must expose exactly the three owner-approved main categories');
      const homeText = await page.locator('body').innerText();
      assert.ok(!SUPPLIER_NAMES.test(homeText), 'supplier names must not appear on customer-facing homepage content');
      assert.ok(!/Supplier SKU|Dealer Cost|Dealer Price|Proposed Get Wired SKU/i.test(homeText), 'internal supplier and proposed SKU fields must not be shown');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow, false, 'homepage must not overflow horizontally at viewport ' + width);
      assert.equal(writes.length, 0, 'owner preview must not issue live write requests');

      await page.goto(BASE + '/owner-preview.html', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('iframe');
      const frame = page.frames().find(f => f.url().includes('index-new.html'));
      assert.ok(frame, 'owner preview must embed the current three-category storefront');
      await frame.waitForSelector('#categoryGrid .catWrap');
      const checkoutVisible = await frame.locator('a[href*="checkout"], .checkoutNow').evaluateAll(nodes =>
        nodes.some(node => {
          const style = getComputedStyle(node);
          return style.display !== 'none' && style.visibility !== 'hidden' && !node.hasAttribute('disabled');
        })
      );
      assert.equal(checkoutVisible, false, 'owner preview must keep checkout and order actions blocked');

      await page.goto(BASE + '/preview-audio.html?department=Car%20Audio&brand=Sony&component=Component%20Speakers&label=Car%20Audio%20%26%20Video', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => {
        const products = document.getElementById('products');
        return products && !products.hidden && products.innerText.includes('Price On Request');
      });
      const audioText = await page.locator('body').innerText();
      assert.ok(audioText.includes('Sony'), 'brand-first route must retain the selected brand');
      assert.ok(audioText.includes('Price On Request'), 'supplier products must show Price On Request');
      assert.ok(!SUPPLIER_NAMES.test(audioText), 'supplier names must not appear in customer-facing audio product content');
      assert.ok(!/Proposed Get Wired SKU|Supplier SKU|Dealer Cost|Dealer Price/i.test(audioText), 'internal identifiers and dealer pricing must not appear');
      assert.ok(!/\bR\s?[\d,]+(?:\.\d{2})?\b/.test(audioText), 'stale numeric supplier prices must not appear');
      const dataAudit = await page.evaluate(async () => {
        const [planet, audio] = await Promise.all([
          fetch('assets/planetworld-catalogue-preview.json').then(r => r.json()),
          fetch('assets/audio-connections-catalogue-preview.json').then(r => r.json())
        ]);
        return {
          planetRows: planet.records.length,
          audioRows: audio.records.length,
          planetPriceLeaks: planet.records.filter(r => typeof r.indicativePrice === 'number' || typeof r.hasStock === 'boolean').length,
          audioPriceLeaks: audio.records.filter(r => typeof r.indicativePrice === 'number' || typeof r.hasStock === 'boolean').length,
          audioPriceLabels: [...new Set(audio.records.map(r => r.priceOnRequestText))]
        };
      });
      assert.equal(dataAudit.planetRows, 3317);
      assert.equal(dataAudit.audioRows, 66);
      assert.equal(dataAudit.planetPriceLeaks, 0, 'Planetworld preview JSON must not retain numeric price or stock claims');
      assert.equal(dataAudit.audioPriceLeaks, 0, 'Audio Connections preview JSON must not retain numeric price or stock claims');
      assert.deepEqual(dataAudit.audioPriceLabels, ['Price On Request']);
      const audioOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(audioOverflow, false, 'audio product route must not overflow horizontally at viewport ' + width);
      await page.close();
      console.log('PASS owner preview viewport=' + width + ' roots=3 audio=Sony/Component Speakers price=POR checkout=blocked no-live-writes');
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
