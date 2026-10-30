const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const models = [
 ["78000023","MPK 165.3","https://hertz-audio.com/product/mpk-165-3/"],
 ["78000059","CK 130","https://hertz-audio.com/product/ck-130/"],
 ["78000069","CK 165","https://hertz-audio.com/product/ck-165/"],
 ["78021091","DBX 25.3","https://hertz-audio.com/product/dbx-25-3/"],
 ["78021101","DBX 30.3","https://hertz-audio.com/product/dbx-30-3/"],
 ["78022000","CBA 250","https://hertz-audio.com/product/cba-250/"],
 ["78035501","MPS 250 S4","https://hertz-audio.com/product/mps-250-s4/"],
 ["78035511","MPS 250 S2","https://hertz-audio.com/product/mps-250-s2/"],
 ["78040014","CPX 165","https://hertz-audio.com/product/cpx-165/"],
 ["78040044","CPX 690","https://hertz-audio.com/product/cpx-690/"],
 ["78040143","DCX 130.3","https://hertz-audio.com/product/dcx-130-3/"],
 ["78040154","DCX 165.3","https://hertz-audio.com/product/dcx-165-3/"]
];
(async()=>{
 const browser=await chromium.launch({headless:true});
 const outDir="catalogue-review/hertz-browser-image-candidates";
 fs.mkdirSync(outDir,{recursive:true});
 const rows=[];
 for(const [itemCode,model,url] of models){
  const page=await browser.newPage({viewport:{width:1365,height:900}});
  const record={hertz_item_code_reference_only:itemCode,model,official_page:url};
  try{
   const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:35000});
   record.http_status=response?response.status():null;
   await page.waitForTimeout(1800);
   record.page_title=await page.title().catch(()=> "");
   record.h1=await page.locator("h1").first().innerText().catch(()=> "");
   record.meta_description=await page.locator('meta[name="description"]').getAttribute("content").catch(()=> "");
   record.og_image=await page.locator('meta[property="og:image"]').getAttribute("content").catch(()=> "");
   const imgs=await page.locator("img").evaluateAll(nodes=>nodes.map(n=>({src:n.currentSrc||n.src||"",alt:n.alt||"",width:n.naturalWidth||n.width||0,height:n.naturalHeight||n.height||0,cls:String(n.className||"")})));
   record.image_candidates=imgs.filter(x=>x.src && !/logo|icon|facebook|instagram|cookie|banner|newsletter/i.test(x.src+" "+x.alt+" "+x.cls));
   const modelNorm=model.toLowerCase().replace(/[^a-z0-9]/g,"");
   record.model_related_images=record.image_candidates.filter(x=>(x.alt+" "+x.src).toLowerCase().replace(/[^a-z0-9]/g,"").includes(modelNorm));
   record.status=record.http_status===200?"PAGE_RENDERED — IMAGE CANDIDATES REQUIRE VISUAL CHECK":"PAGE_RESPONSE_NOT_200";
   const candidates=record.model_related_images.length?record.model_related_images:record.image_candidates.filter(x=>/product|gallery|woocommerce|hertz/i.test(x.src+" "+x.cls)).slice(0,5);
   record.downloaded_images=[];
   for(let i=0;i<candidates.length;i++){
    const img=candidates[i];
    try{
     const res=await page.request.get(img.src,{timeout:20000});
     if(!res.ok())continue;
     const body=await res.body();
     const ct=(res.headers()["content-type"]||"").toLowerCase();
     let ext=ct.includes("png")?"png":ct.includes("webp")?"webp":ct.includes("gif")?"gif":"jpg";
     const name=model.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-candidate-"+(i+1)+"."+ext;
     fs.writeFileSync(path.join(outDir,name),body);
     record.downloaded_images.push({file:name,bytes:body.length,url:img.src,alt:img.alt,width:img.width,height:img.height});
    }catch(e){}
   }
  }catch(e){record.status="BROWSER_FETCH_ERROR";record.error=String(e);}
  rows.push(record);
  console.log(JSON.stringify({model,status:record.status,http_status:record.http_status,image_count:record.image_candidates?.length||0,model_related:record.model_related_images?.length||0,downloaded:record.downloaded_images?.length||0}));
  await page.close();
 }
 await browser.close();
 const fields=["hertz_item_code_reference_only","model","official_page","http_status","page_title","h1","meta_description","og_image","image_candidates","model_related_images","downloaded_images","status","error"];
 const esc=v=>{const s=typeof v==="string"?v:JSON.stringify(v??"");return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
 const csv=[fields.join(","),...rows.map(r=>fields.map(k=>esc(r[k])).join(","))].join("\r\n");
 fs.writeFileSync("catalogue-review/hertz-browser-image-audit.csv",csv);
 const summary={models_checked:rows.length,pages_rendered:rows.filter(r=>r.http_status===200).length,models_with_image_candidates:rows.filter(r=>(r.image_candidates||[]).length>0).length,models_with_model_related_images:rows.filter(r=>(r.model_related_images||[]).length>0).length,images_downloaded:rows.reduce((n,r)=>n+(r.downloaded_images||[]).length,0),non_200:rows.filter(r=>r.http_status!==200).map(r=>({model:r.model,status:r.http_status,detail:r.status}))};
 fs.writeFileSync("catalogue-review/hertz-browser-image-audit-summary.json",JSON.stringify(summary,null,2));
 console.log("SUMMARY "+JSON.stringify(summary));
})().catch(e=>{console.error(e);process.exit(1);});
