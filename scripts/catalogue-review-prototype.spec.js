const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const widths = [360, 390, 768, 1280];
  const results = [];
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      await page.goto('http://127.0.0.1:4173/catalogue-review/car-audio-navigation-prototype.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelector('#status')?.textContent.includes('Loaded 702'), { timeout: 15000 });

      const brands = page.locator('#content [data-brand]');
      const brandCount = await brands.count();
      if (brandCount !== 10) throw new Error(`Expected 9 Planetworld brands + staged Hertz; got ${brandCount} at ${width}px`);
      const brandText = await page.locator('#content').innerText();
      if (/JBL|Denon DJ|Harnesses & Trims/.test(brandText)) throw new Error('Non-Car-Audio products/components leaked into manufacturer brand buttons');

      await page.locator('#content [data-brand="Alpine"]').click();
      const componentCount = await page.locator('#content [data-component]').count();
      if (componentCount < 5) throw new Error(`Alpine component navigation did not render at ${width}px`);
      await page.locator('#content [data-component="Amplifiers"]').click();
      const alpineAmpCount = await page.locator('#content article.product').count();
      if (alpineAmpCount !== 6) throw new Error(`Expected 6 Alpine amplifier records; got ${alpineAmpCount}`);
      const productText = await page.locator('#content').innerText();
      if (/Retail Price|Dealer Cost|JHB Stock|DBN Stock|CPT Stock|supplier_stock_snapshot|RRP|VAT/i.test(productText)) throw new Error('Confidential supplier price/stock data leaked into prototype');
      if (!productText.includes('Image: not verified') || !productText.includes('GW SKU: not assigned')) throw new Error('Unverified image/GW SKU hold labels missing');

      await page.locator('#back').click();
      if (await page.locator('#content [data-component]').count() < 5) throw new Error('Back navigation failed');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Hertz"]').click();
      const hertzNotice = await page.locator('#content').innerText();
      if (!hertzNotice.includes('87 Hertz-branded records') || !hertzNotice.includes('84 have individual manufacturer product records') || !hertzNotice.includes('3 remain unresolved')) {
        throw new Error('Hertz 84/87 + 3 exception notice is missing or stale');
      }
      await page.locator('#content [data-component="Component speaker kits"]').click();
      const hertzHold = await page.locator('#content').innerText();
      if (!hertzHold.includes('staged only') || !hertzHold.includes('Product-level image and description verification remains outstanding')) throw new Error('Hertz product publication hold is missing');
      if (await page.locator('#content article').count() !== 0) throw new Error('Hertz placeholder unexpectedly exposes unverified product cards');

      await page.locator('#marine').click();
      if (await page.locator('#content article.product').count() !== 28) throw new Error('Marine Audio must contain exactly 28 separated source records');
      await page.locator('#harness').click();
      if (await page.locator('#content article.product').count() !== 47) throw new Error('Harnesses & Trims must contain exactly 47 separated component records');
      await page.locator('#music').click();
      if (!(await page.locator('#content').innerText()).includes('No band-instrument products are mixed into this Car Audio review')) throw new Error('Band Instruments are not kept separate');

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      if (overflow) throw new Error(`Horizontal overflow at ${width}px`);
      if (pageErrors.length) throw new Error(`JavaScript errors at ${width}px: ${pageErrors.join(' | ')}`);
      results.push({ width, brands: brandCount, alpineAmplifiers: alpineAmpCount, marine: 28, harnesses: 47, jsErrors: 0, horizontalOverflow: false });
      await page.close();
    }
    console.log('PASS — review-only car-audio navigation responsive QA');
    console.log(JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
