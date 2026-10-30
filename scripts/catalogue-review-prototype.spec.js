const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const widths = [360, 390, 768, 1280];
  const results = [];
  try {
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const pageErrors = [];
      const failedRequests = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      page.on('requestfailed', request => failedRequests.push(request.url() + ' :: ' + (request.failure()?.errorText || 'request failed')));
      page.on('response', response => { if (response.url().includes('review.json') || response.url().includes('hertz-manufacturer-product-review.json')) { if (response.status() >= 400) failedRequests.push(response.url() + ' :: HTTP ' + response.status()); } });
      await page.goto('http://127.0.0.1:4173/catalogue-review/car-audio-navigation-prototype.html', { waitUntil: 'domcontentloaded' });
      try {
        await page.waitForFunction(() => {
        const status = document.querySelector('#status')?.textContent || '';
        return status.startsWith('Loaded ') || status.startsWith('Could not load review data:');
      }, { timeout: 15000 });
      const loadedStatus = await page.locator('#status').innerText();
      if (!loadedStatus.includes('Loaded 704') || !loadedStatus.includes('84 manufacturer-verified Hertz records')) {
        throw new Error('Review data did not load as expected: ' + loadedStatus + ' | page errors: ' + pageErrors.join(' | '));
      }
      } catch (error) {
        const statusText = await page.locator('#status').innerText().catch(() => '(no #status element)');
        throw new Error('Review prototype failed to load. status=' + statusText + '; pageErrors=' + pageErrors.join(' | ') + '; failedRequests=' + failedRequests.join(' | '));
      }

      const brandCount = await page.locator('#content [data-brand]').count();
      if (brandCount !== 10) throw new Error(`Expected 9 Planetworld brands + staged Hertz; got ${brandCount} at ${width}px`);
      const brandText = await page.locator('#content').innerText();
      if (/JBL|Denon DJ|Harnesses & Trims/.test(brandText)) throw new Error('Non-Car-Audio products/components leaked into manufacturer brand buttons');

      await page.locator('#content [data-brand="Alpine"]').click();
      if (await page.locator('#content [data-component]').count() < 5) throw new Error('Alpine component navigation did not render');
      await page.locator('#content [data-component="Amplifiers"]').click();
      const alpineAmpCount = await page.locator('#content article.product').count();
      if (alpineAmpCount !== 6) throw new Error(`Expected 6 Alpine amplifier records; got ${alpineAmpCount}`);
      const alpineText = await page.locator('#content').innerText();
      if (/Retail Price|Dealer Cost|JHB Stock|DBN Stock|CPT Stock|supplier_stock_snapshot|RRP|VAT/i.test(alpineText)) throw new Error('Confidential supplier price/stock data leaked into prototype');
      if (!alpineText.includes('Image: not verified') || !alpineText.includes('GW SKU: not assigned')) throw new Error('Unverified image/GW SKU hold labels missing');

      await page.locator('#back').click();
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Audison"]').click();
      await page.locator('#content [data-component="Harnesses, Trims & Fitment"]').click();
      const audisonHarnessCount = await page.locator('#content article.product').count();
      if (audisonHarnessCount !== 8) throw new Error(`Expected 8 Audison harness/fitment records after reclassification; got ${audisonHarnessCount}`);
      const audisonText = await page.locator('#content').innerText();
      if (!audisonText.includes('AFBMW BOOSTER 01') || !audisonText.includes('AFBMW ReAMP 3')) throw new Error('BMW AFBMW harnesses missing from Audison navigation');
      if (!audisonText.includes('VERIFIED — official manufacturer product page') || !audisonText.includes('Official manufacturer product page')) throw new Error('Audison manufacturer verification/link missing');
      if (!audisonText.includes('Image: not verified') || !audisonText.includes('GW SKU: not assigned')) throw new Error('Audison image/GW SKU publication hold missing');
      if (/Dealer Cost|JHB Stock|DBN Stock|CPT Stock|supplier_stock_snapshot|RRP|VAT/i.test(audisonText)) throw new Error('Supplier pricing/stock leaked into Audison review cards');

      await page.locator('#back').click();
      await page.locator('#content [data-component="Subwoofers"]').click();
      const audisonSubText = await page.locator('#content').innerText();
      if (!audisonSubText.includes('Audison 250 mm shallow subwoofer — model confirmation pending')) throw new Error('OCR-corrupted Audison source description not safely normalized');
      if (!audisonSubText.includes('Candidate model: AV 10 D4 II — not confirmed') || !audisonSubText.includes('Candidate manufacturer page')) throw new Error('Audison AV10 candidate evidence/uncertainty not shown');
      if (!audisonSubText.includes('NOT VERIFIED — supplier model mapping pending')) throw new Error('Audison AV10 candidate must remain unverified pending source confirmation');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Kicker"]').click();
      await page.locator('#content [data-component="Amplifiers"]').click();
      const kickerAmpText = await page.locator('#content').innerText();
      if (!kickerAmpText.includes('KEY200.4 Smart 4-channel amplifier') || !kickerAmpText.includes('KEY500.1 Smart mono amplifier')) throw new Error('Kicker KEY amplifier model descriptions missing');
      if (!kickerAmpText.includes('Official manufacturer product page') || !kickerAmpText.includes('automatic 40-band EQ') || !kickerAmpText.includes('FIT+ integration')) throw new Error('Kicker KEY manufacturer feature details or official links missing');
      if (/Dealer Cost|JHB Stock|DBN Stock|CPT Stock|supplier_stock_snapshot|RRP|VAT/i.test(kickerAmpText)) throw new Error('Supplier price/stock leaked into Kicker cards');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Kicker"]').click();
      await page.locator('#content [data-component="Subwoofer Boxes & Active Enclosures"]').click();
      const kickerSubText = await page.locator('#content').innerText();
      if (!kickerSubText.includes('Hideaway HS8 compact powered subwoofer') || !kickerSubText.includes('150 W RMS') || !kickerSubText.includes('25–120 Hz')) throw new Error('Kicker HS8 official features missing');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Kicker"]').click();
      await page.locator('#content [data-component="Speakers & Component Kits"]').click();
      const ksText = await page.locator('#content').innerText();
      for (const model of ['51KSC404','51KSC504','51KSC6504','51KSC6704','51KSC6904','51KSC69304','51KSS365','51KSS504','51KSS6504','51KSS6704','51KSS6904','51KST2004']) if (!ksText.includes(model)) throw new Error('Kicker KS-series model detail missing: '+model);
      if (!ksText.includes('Official manufacturer series/collection') || !ksText.includes('Image: not verified') || !ksText.includes('GW SKU: not assigned')) throw new Error('Kicker KS evidence or publication hold label missing');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Kicker"]').click();
      await page.locator('#content [data-component="Subwoofers"]').click();
      const cvrText = await page.locator('#content').innerText();
      for (const model of ['52CVR102','52CVR104','52CVR122','52CVR124']) if (!cvrText.includes(model)) throw new Error('Kicker CompVR model detail missing: '+model);
      if (!cvrText.includes('forced-air cooling') || !cvrText.includes('dual 2-ohm voice coils')) throw new Error('Kicker CompVR manufacturer feature details missing');
      if (/Dealer Cost|JHB Stock|DBN Stock|CPT Stock|RRP|VAT/i.test(ksText+cvrText)) throw new Error('Supplier price/stock leaked into Kicker manufacturer detail cards');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Kicker"]').click();
      await page.locator('#content [data-component="Amplifiers"]').click();
      const lxVxaText = await page.locator('#content').innerText();
      for (const model of ['51LX12005','51LX5004','53VXA3004','53VXA6005','53VXA7001']) if (!lxVxaText.includes(model)) throw new Error('Kicker LX/VXA model detail missing: '+model);
      if (!lxVxaText.includes('international distribution only') || !lxVxaText.includes('FIT+')) throw new Error('Kicker LX/VXA manufacturer feature/distribution detail missing');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Kicker"]').click();
      await page.locator('#content [data-component="Subwoofers"]').click();
      const poweredText = await page.locator('#content').innerText();
      for (const model of ['51LX13007','51LX16501','51PTRTP10','51PTRTP12']) if (!poweredText.includes(model)) throw new Error('Kicker LX/PTRTP subwoofer detail missing: '+model);
      if (!poweredText.includes('reFLEX subwoofer') || !poweredText.includes('power-matched amplifier')) throw new Error('Kicker PTRTP enclosure feature details missing');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Kicker"]').click();
      await page.locator('#content [data-component="Accessories"]').click();
      const kickerGrilleText = await page.locator('#content').innerText();
      for (const model of ['52GL78','52GL710','52GL712','52GR8','52GR10','52GR12']) if (!kickerGrilleText.includes(model)) throw new Error('Kicker grille model detail missing: '+model);
      if (!kickerGrilleText.includes('steel-mesh grille') || !kickerGrilleText.includes('compatibility')) throw new Error('Kicker grille type/fitment caution missing');
      if (/Dealer Cost|JHB Stock|DBN Stock|CPT Stock|RRP|VAT/i.test(lxVxaText+poweredText+kickerGrilleText)) throw new Error('Supplier price/stock leaked into Kicker LX/VXA/PTRTP/grille cards');
      await page.locator('#home').click();
      await page.locator('#marine').click();
      const marineKickerText = await page.locator('#content').innerText();
      if (!marineKickerText.includes('KMC4 Marine Dual-Zone Media Center') || !marineKickerText.includes('KMC6 Premium Marine Media Center') || !marineKickerText.includes('25 W x 6 at 4 Ω') || !marineKickerText.includes('IP66')) throw new Error('Kicker KMC4/KMC6 official marine product detail missing');
      await page.locator('#home').click();
      await page.locator('#content [data-brand="Hertz"]').click();
      const hertzNotice = await page.locator('#content').innerText();
      if (!hertzNotice.includes('87 Hertz-branded source records') || !hertzNotice.includes('84 have individual manufacturer product records') || !hertzNotice.includes('3 remain unresolved')) throw new Error('Hertz verified/unresolved notice is missing or stale');

      await page.locator('#content [data-component="Component speaker kits"]').click();
      const kitCards = page.locator('#content article.hertz-product');
      if (await kitCards.count() !== 15) throw new Error(`Expected 15 manufacturer-verified Hertz component kits; got ${await kitCards.count()}`);
      const kitText = await page.locator('#content').innerText();
      for (const model of ['CK 165 L', 'MLK 700.3', 'CPK 165', 'CPK 690', 'MLK 165.3']) if (!kitText.includes(model)) throw new Error('Manufacturer component-kit correction missing: '+model);
      if (!kitText.includes('Taxonomy correction:') || !kitText.includes('Image: NOT VERIFIED') || !kitText.includes('GW SKU: NOT ASSIGNED')) throw new Error('Hertz product review status labels missing');
      if (/Dealer Cost|JHB Stock|DBN Stock|CPT Stock|RRP|Supplier Retail|VAT/i.test(kitText)) throw new Error('Supplier price/stock leaked into Hertz product review');
      if (await page.locator('#content img').count() !== 0) throw new Error('Unapproved Hertz image unexpectedly rendered');

      await page.locator('#back').click();
      await page.locator('#content [data-component="Speaker grilles"]').click();
      if (await page.locator('#content article.hertz-product').count() !== 10 || await page.locator('#content article.hertz-exception').count() !== 2) throw new Error('Hertz grille group must separate 10 verified grilles and 2 unresolved exceptions');
      const grilleText = await page.locator('#content').innerText();
      if (!grilleText.includes('DG 250.3') || !grilleText.includes('DG 300.3') || !grilleText.includes('DSG')) throw new Error('DG/DSG unresolved model discrepancy not displayed');

      await page.locator('#back').click();
      await page.locator('#content [data-component="Tweeters"]').click();
      if (await page.locator('#content article.hertz-product').count() !== 4) throw new Error('Hertz tweeter group should have 4 corrected products');
      const tweeterText = await page.locator('#content').innerText();
      if (!tweeterText.includes('DT 24.3') || tweeterText.includes('CPK 690')) throw new Error('DT 24.3 tweeter correction or component-kit exclusion failed');

      await page.locator('#back').click();
      await page.locator('#content [data-component="Woofers / midbass drivers"]').click();
      if (await page.locator('#content article.hertz-product').count() !== 3 || await page.locator('#content article.hertz-exception').count() !== 1) throw new Error('Hertz woofer group must separate 3 verified products and the generic SPL exception');

      await page.locator('#marine').click();
      if (await page.locator('#content article.product').count() !== 28) throw new Error('Marine Audio must contain exactly 28 separated source records');
      const marineText = await page.locator('#content').innerText();
      if (!marineText.includes('KMC6 Premium Media Center') || marineText.includes('KMC5 Multimedia Gauge-Style Receiver')) throw new Error('Kicker 48KMC6 marine source description was not corrected to official KMC6 model');
      if (!marineText.includes('VERIFIED — official KICKER product page') || !marineText.includes('Official manufacturer product page')) throw new Error('KMC6 manufacturer verification or source link missing');
      await page.locator('#harness').click();
      if (await page.locator('#content article.product').count() !== 47) throw new Error('Harnesses & Trims must contain exactly 47 separated component records');
      await page.locator('#music').click();
      if (!(await page.locator('#content').innerText()).includes('No band-instrument products are mixed into this Car Audio review')) throw new Error('Band Instruments are not kept separate');

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      if (overflow) throw new Error(`Horizontal overflow at ${width}px`);
      if (pageErrors.length) throw new Error(`JavaScript errors at ${width}px: ${pageErrors.join(' | ')}`);
      results.push({ width, brands: brandCount, alpineAmplifiers: alpineAmpCount, hertzVerified: 84, hertzUnresolved: 3, marine: 28, harnesses: 47, jsErrors: 0, horizontalOverflow: false });
      await page.close();
    }
    console.log('PASS — enriched review-only car-audio navigation and Hertz manufacturer product detail QA');
    console.log(JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
