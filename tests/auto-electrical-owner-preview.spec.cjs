const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
 const base=process.env.PREVIEW_BASE_URL||"http://127.0.0.1:4173";
 const browser=await chromium.launch({headless:true});
 try{
  for(const viewport of [{width:390,height:844},{width:1365,height:900}]){
   const page=await browser.newPage({viewport});
   await page.goto(base+"/product-image-treatment-pilot.html",{waitUntil:"networkidle"});
   await page.waitForSelector(".product-card",{timeout:20000});
   await page.locator(".product-card img").evaluateAll(imgs=>imgs.forEach(img=>img.loading="eager"));
   await page.waitForFunction(()=>[...document.querySelectorAll(".product-card img")].every(i=>i.complete&&i.naturalWidth>0),{timeout:30000});
   const sample=await page.evaluate(()=>({cards:document.querySelectorAll(".product-card").length,overflow:document.documentElement.scrollWidth>innerWidth,price:document.body.innerText.includes("Price On Request due to Limited Stock and Availability"),leak:/Planetworld|Audio Connections|supplier SKU|dealer cost/i.test(document.body.innerText)}));
   assert.equal(sample.cards,50);assert.equal(sample.overflow,false);assert.equal(sample.price,true);assert.equal(sample.leak,false);
   await page.goto(base+"/preview-auto-electrical.html",{waitUntil:"networkidle"});
   await page.locator("#grid img").evaluateAll(imgs=>imgs.forEach(img=>img.loading="eager"));
   await page.waitForFunction(()=>[...document.querySelectorAll("#grid img")].every(i=>i.complete&&i.naturalWidth>0),{timeout:30000});
   const auto=await page.evaluate(()=>({images:document.querySelectorAll("#grid img").length,overflow:document.documentElement.scrollWidth>innerWidth,price:document.body.innerText.includes("Price On Request due to Limited Stock and Availability")}));
   assert.equal(auto.images,34);assert.equal(auto.overflow,false);assert.equal(auto.price,true);
   await page.close();
  }
  console.log("PASS: 50-image and 34-product previews render at mobile and desktop widths.");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
