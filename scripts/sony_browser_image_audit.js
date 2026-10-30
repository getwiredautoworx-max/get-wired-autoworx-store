const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const models=[
 ["XS-163ES","https://electronics.sony.com/audio/car-marine-audio/all-car-marine-audio/p/xs163es"],
 ["XS-162ES","https://www.sony-africa.com/en/electronics/mobile-es-series/xs-162es/specifications"],
 ["XS-692ES","https://www.sony.com/en-cd/electronics/mobile-es-series/xs-692es/specifications"],
 ["XS-160ES","https://www.sony-africa.com/en/electronics/mobile-es-series/xs-160es/specifications"],
 ["XS-680ES","https://www.sony.com/za/electronics/car-speakers/xs-680es"],
 ["XS-690ES","https://www.sony.com/za/electronics/mobile-es-series/xs-690es"],
 ["XS-W104ES","https://www.sony.com/za/electronics/mobile-es-series/xs-w104es"],
 ["XS-W122ES","https://www.sony.com/za/electronics/mobile-es-series/xs-w122es"],
 ["XS-W124ES","https://www.sony.com/za/electronics/mobile-es-series/xs-w124es"],
 ["XM-1ES","https://www.sony.com/za/electronics/mobile-es-series/xm-1es/specifications"],
 ["XM-4ES","https://www.sony.com/za/electronics/mobile-es-series/xm-4es"],
 ["XM-5ES","https://www.sony.com/electronics/support/car-marine-entertainment-in-car-amplifiers/xm-5es/specifications"],
 ["XM-6ES","https://www.sony.com/electronics/support/car-marine-entertainment-in-car-amplifiers/xm-6es/specifications"],
 ["XM-8ES","https://electronics.sony.com/audio/car-marine-audio/amplifiers/p/xm8es"]
];
(async()=>{
 const browser=await chromium.launch({headless:true});
 const outDir="catalogue-review/sony-browser-image-candidates";fs.mkdirSync(outDir,{recursive:true});
 const rows=[];
 for(const [model,url] of models){
  const page=await browser.newPage({viewport:{width:1365,height:900}});
  const rec={model,official_page:url};
  try{
   const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:35000});
   rec.http_status=response?response.status():null;await page.waitForTimeout(1200);
   rec.page_title=await page.title().catch(()=> "");
   rec.h1=await page.locator("h1").first().innerText().catch(()=> "");
   rec.meta_description=await page.locator('meta[name="description"]').getAttribute("content").catch(()=> "");
   rec.og_image=await page.locator('meta[property="og:image"]').getAttribute("content").catch(()=> "");
   const imgs=await page.locator("img").evaluateAll(ns=>ns.map(n=>({src:n.currentSrc||n.src||"",alt:n.alt||"",width:n.naturalWidth||n.width||0,height:n.naturalHeight||n.height||0,cls:String(n.className||"")})));
   const norm=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
   const key=norm(model);
   rec.image_candidates=imgs.filter(x=>x.src&&!/logo|icon|facebook|instagram|cookie|banner|newsletter/i.test(x.src+" "+x.alt+" "+x.cls));
   rec.model_related_images=rec.image_candidates.filter(x=>norm(x.alt+" "+x.src).includes(key));
   const candidates=rec.model_related_images.length?rec.model_related_images:(rec.og_image?[{src:rec.og_image,alt:"og:image",width:0,height:0}]:[]);
   rec.downloaded_images=[];
   for(let i=0;i<candidates.length;i++){
    try{
     const im=candidates[i],res=await page.request.get(im.src,{timeout:20000});
     if(!res.ok())continue;
     const body=await res.body(),ct=(res.headers()["content-type"]||"").toLowerCase();
     const ext=ct.includes("png")?"png":ct.includes("webp")?"webp":ct.includes("gif")?"gif":"jpg";
     const file=model.toLowerCase()+"-candidate-"+(i+1)+"."+ext;
     fs.writeFileSync(path.join(outDir,file),body);
     rec.downloaded_images.push({file,bytes:body.length,url:im.src,alt:im.alt,width:im.width,height:im.height});
    }catch(e){}
   }
   rec.status=rec.http_status===200?"PAGE_RENDERED — IMAGE CANDIDATES REQUIRE VISUAL CHECK":"PAGE_RESPONSE_NOT_200";
  }catch(e){rec.status="BROWSER_FETCH_ERROR";rec.error=String(e);}
  rows.push(rec);
  console.log(JSON.stringify({model,status:rec.status,http_status:rec.http_status,images:rec.image_candidates?.length||0,model_related:rec.model_related_images?.length||0,downloaded:rec.downloaded_images?.length||0}));
  await page.close();
 }
 await browser.close();
 const fields=["model","official_page","http_status","page_title","h1","meta_description","og_image","image_candidates","model_related_images","downloaded_images","status","error"];
 const esc=v=>{const s=typeof v==="string"?v:JSON.stringify(v??"");return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
 fs.writeFileSync("catalogue-review/sony-browser-image-audit.csv",[fields.join(","),...rows.map(r=>fields.map(k=>esc(r[k])).join(","))].join("\r\n"));
 const summary={models_checked:rows.length,pages_rendered:rows.filter(r=>r.http_status===200).length,models_with_image_candidates:rows.filter(r=>(r.image_candidates||[]).length>0).length,models_with_model_related_images:rows.filter(r=>(r.model_related_images||[]).length>0).length,images_downloaded:rows.reduce((n,r)=>n+(r.downloaded_images||[]).length,0),non_200:rows.filter(r=>r.http_status!==200).map(r=>({model:r.model,status:r.http_status,detail:r.status}))};
 fs.writeFileSync("catalogue-review/sony-browser-image-audit-summary.json",JSON.stringify(summary,null,2));
 console.log("SUMMARY "+JSON.stringify(summary));
})().catch(e=>{console.error(e);process.exit(1);});
