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
      const pageErrors = [];
      const consoleErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
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
      await page.waitForFunction(() => document.querySelectorAll('#categoryGrid>.rootCategoryLink').length === 3, null, { timeout: 30000 });
      const roots = await page.locator('#categoryGrid>.rootCategoryLink .catContent b').allTextContents();
      assert.deepEqual(roots.map(x => x.trim()), EXPECTED_ROOTS, 'homepage must expose exactly the three owner-approved main categories');
      assert.deepEqual(pageErrors, [], 'homepage must not raise JavaScript errors: ' + pageErrors.join('; '));
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
      await frame.waitForFunction(() => document.querySelectorAll('#categoryGrid>.rootCategoryLink').length === 3, null, { timeout: 30000 });
      await frame.waitForFunction(() => document.documentElement.dataset.gwPreviewLocked === '1', null, { timeout: 10000 });
      const visibleCheckoutControls = await frame.locator('a[href*="checkout"], .checkoutNow, #checkout, .checkout-fab').evaluateAll(nodes =>
        nodes.filter(node => {
          const style = getComputedStyle(node);
          return style.display !== 'none' && style.visibility !== 'hidden' && !node.hasAttribute('disabled');
        }).map(node => ({ tag: node.tagName, text: (node.innerText || '').trim(), href: node.getAttribute('href'), className: node.className }))
      );
      assert.deepEqual(visibleCheckoutControls, [], 'owner preview must keep checkout and order actions blocked; visible controls: ' + JSON.stringify(visibleCheckoutControls));
      const frameRoots = await frame.locator('#categoryGrid>.rootCategoryLink .catContent b').allTextContents();
      assert.deepEqual(frameRoots.map(x => x.trim()), EXPECTED_ROOTS, 'owner preview iframe must retain exactly the three approved root categories');

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
          fetch('assets/audio-catalogue-primary-preview.json').then(r => r.json()),
          fetch('assets/audio-catalogue-secondary-preview.json').then(r => r.json())
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
      assert.equal(dataAudit.audioRows, 72, 'secondary Audio Connections preview contains 72 reconciled review records');
      assert.equal(dataAudit.planetPriceLeaks, 0, 'Planetworld preview JSON must not retain numeric price or stock claims');
      assert.equal(dataAudit.audioPriceLeaks, 0, 'Audio Connections preview JSON must not retain numeric price or stock claims');
      assert.deepEqual(dataAudit.audioPriceLabels, ['Price On Request']);
      const audioOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(audioOverflow, false, 'audio product route must not overflow horizontally at viewport ' + width);

      await page.goto(BASE + '/trailer-towing.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.getElementById('total')?.textContent === '165' &&
        document.getElementById('groups')?.textContent === '7', null, { timeout: 20000 });
      const trailerText = await page.locator('body').innerText();
      assert.ok(trailerText.includes('Trailer & Towing'), 'Trailer and Towing must be presented as a customer-facing category');
      assert.ok(trailerText.includes('Price On Request due to Limited Stock and Availability'), 'ASC products must use the approved customer price wording');
      assert.ok(!/OWNER_PREVIEW|REVIEW_ONLY|not imported|supplier|dealer cost|dealer price|source sku|stock code/i.test(trailerText),
        'customer-facing Trailer and Towing page must not expose internal review or supplier details');
      const trailerAudit = await page.evaluate(async () => {
        const data = await fetch('assets/trailer-towing-catalogue.json').then(r => r.json());
        const serialised = JSON.stringify(data);
        return {
          records: data.records.length,
          groups: [...new Set(data.records.map(p => p.subcategory))].length,
          fields: [...new Set(data.records.flatMap(p => Object.keys(p)))].sort(),
          supplierLeak: /ASC|supplier|supplierCode|supplierSku|sourcePrice|dealerCost|category_id|reviewStatus|uniqueSupplierCodes|stock_quantity/i.test(serialised),
          priceLabels: [...new Set(data.records.map(p => p.priceDisplay))]
        };
      });
      assert.equal(trailerAudit.records, 165, 'all 165 Trailer and Towing records must be present');
      assert.equal(trailerAudit.groups, 7, 'all seven Trailer and Towing product groups must be present');
      assert.equal(trailerAudit.supplierLeak, false, 'public Trailer and Towing JSON must contain no supplier identity, internal IDs, review states or stock fields');
      assert.deepEqual(trailerAudit.priceLabels, ['Price On Request due to Limited Stock and Availability']);
      assert.deepEqual(trailerAudit.fields, ['availabilityDisplay', 'description', 'priceDisplay', 'subcategory', 'title']);
      await page.locator('#cat').selectOption({ label: 'Towing' });
      await page.waitForFunction(() => document.getElementById('count').textContent === 'Showing 49 of 165 products');
      await page.locator('#q').fill('ISOLATOR COVER FOR 4317/4217');
      await page.waitForFunction(() => document.getElementById('count').textContent === 'Showing 1 of 165 products');
      const trailerOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(trailerOverflow, false, 'Trailer and Towing route must not overflow horizontally at viewport ' + width);
      assert.deepEqual(pageErrors, [], 'all storefront routes must load without JavaScript errors: ' + pageErrors.join('; '));
      assert.equal(writes.length, 0, 'Trailer and Towing preview must not issue live write requests');
      await page.close();
      console.log('PASS owner preview viewport=' + width + ' roots=3 audio=Sony/Component Speakers price=POR checkout=blocked no-live-writes');
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
