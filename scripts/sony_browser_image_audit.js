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
const norm=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
const excluded=/logo|icon|facebook|instagram|cookie|banner|newsletter|warranty|social|payment|flag|sprite|mobile-es-logo|background|hero/i;
(async()=>{
 const browser=await chromium.launch({headless:true});
 const outDir="catalogue-review/sony-browser-image-candidates";
 fs.mkdirSync(outDir,{recursive:true});
 const rows=[];
 for(const [model,url] of models){
  const page=await browser.newPage({viewport:{width:1365,height:900},deviceScaleFactor:1});
  const rec={model,official_page:url};
  try{
   const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000});
   rec.http_status=response?response.status():null;
   await page.waitForSelector("h1",{timeout:10000}).catch(()=>{});
   await page.waitForTimeout(700);
   await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight)).catch(()=>{});
   await page.waitForTimeout(900);
   await page.evaluate(()=>window.scrollTo(0,0)).catch(()=>{});
   await page.waitForTimeout(500);
   rec.page_title=await page.title().catch(()=> "");
   rec.h1=await page.locator("h1").first().innerText().catch(()=> "");
   rec.page_model_match=norm(rec.h1+" "+rec.page_title+" "+page.url()).includes(norm(model));
   rec.meta_description=await page.locator('meta[name="description"]').getAttribute("content").catch(()=> "");
   rec.og_image=await page.locator('meta[property="og:image"]').getAttribute("content").catch(()=> "");
   const imgs=await page.locator("img").evaluateAll(ns=>ns.map((n,index)=>({
    index,src:n.currentSrc||n.src||"",alt:n.alt||"",width:n.naturalWidth||n.width||0,
    height:n.naturalHeight||n.height||0,cls:String(n.className||"")
   })));
   const seen=new Set();
   rec.image_candidates=imgs.filter(x=>{
    if(!x.src||excluded.test(x.src+" "+x.alt+" "+x.cls)||x.width<180||x.height<120||seen.has(x.src))return false;
    seen.add(x.src);return true;
   });
   const key=norm(model);
   rec.model_related_images=rec.image_candidates.filter(x=>norm(x.alt+" "+x.src).includes(key));
   let selected=rec.model_related_images.slice(0,4);
   if(!selected.length&&rec.page_model_match){
    selected=rec.image_candidates.filter(x=>/product|gallery|main|hero/i.test(x.cls+" "+x.alt)).slice(0,3);
    if(!selected.length)selected=rec.image_candidates.filter(x=>x.width>=400&&x.height>=250).sort((a,b)=>(b.width*b.height)-(a.width*a.height)).slice(0,2);
   }
   if(!selected.length&&rec.page_model_match&&rec.og_image&&!excluded.test(rec.og_image)){
    selected=[{index:-1,src:rec.og_image,alt:"official page og:image",width:0,height:0,cls:"og:image"}];
   }
   rec.selected_image_candidates=selected;
   rec.downloaded_images=[];
   for(let i=0;i<selected.length;i++){
    const im=selected[i],base=model.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-candidate-"+(i+1);
    let saved=false;
    try{
     const res=await page.request.get(im.src,{timeout:20000,headers:{Referer:url,"User-Agent":"Mozilla/5.0"}});
     const ct=(res.headers()["content-type"]||"").toLowerCase();
     if(res.ok()&&ct.startsWith("image/")){
      const body=await res.body();
      if(body.length>1500){
       const ext=ct.includes("png")?"png":ct.includes("webp")?"webp":ct.includes("gif")?"gif":"jpg";
       const file=base+"."+ext;fs.writeFileSync(path.join(outDir,file),body);
       rec.downloaded_images.push({file,bytes:body.length,url:im.src,alt:im.alt,width:im.width,height:im.height,capture_method:"official_image_download"});
       saved=true;
      }
     }
    }catch(e){rec.download_errors=(rec.download_errors||[]).concat(String(e).slice(0,180));}
    if(!saved&&im.index>=0){
     try{
      const file=base+".png";
      await page.locator("img").nth(im.index).screenshot({path:path.join(outDir,file),timeout:12000});
      const stat=fs.statSync(path.join(outDir,file));
      if(stat.size>1500)rec.downloaded_images.push({file,bytes:stat.size,url:im.src,alt:im.alt,width:im.width,height:im.height,capture_method:"official_page_rendered_image_screenshot"});
     }catch(e){rec.download_errors=(rec.download_errors||[]).concat(String(e).slice(0,180));}
    }
   }
   rec.status=rec.http_status===200&&rec.page_model_match
    ?(rec.downloaded_images.length?"PAGE_RENDERED — EXACT MODEL PAGE IMAGE CANDIDATE CAPTURED; VISUAL REVIEW REQUIRED":"PAGE_RENDERED — NO IMAGE CANDIDATE CAPTURED")
    :"PAGE_OR_MODEL_MATCH_NOT_VERIFIED";
  }catch(e){rec.status="BROWSER_FETCH_ERROR";rec.error=String(e);}
  rows.push(rec);
  console.log(JSON.stringify({model,status:rec.status,http_status:rec.http_status,model_match:rec.page_model_match,images:rec.image_candidates?.length||0,model_related:rec.model_related_images?.length||0,selected:rec.selected_image_candidates?.length||0,downloaded:rec.downloaded_images?.length||0}));
  await page.close();
 }
 await browser.close();
 const fields=["model","official_page","http_status","page_title","h1","page_model_match","meta_description","og_image","image_candidates","model_related_images","selected_image_candidates","downloaded_images","download_errors","status","error"];
 const esc=v=>{const s=typeof v==="string"?v:JSON.stringify(v??"");return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
 fs.writeFileSync("catalogue-review/sony-browser-image-audit.csv",[fields.join(","),...rows.map(r=>fields.map(k=>esc(r[k])).join(","))].join("\r\n"));
 const summary={
  models_checked:rows.length,
  pages_rendered:rows.filter(r=>r.http_status===200).length,
  exact_model_pages_confirmed:rows.filter(r=>r.page_model_match).length,
  models_with_image_candidates:rows.filter(r=>(r.image_candidates||[]).length>0).length,
  models_with_model_related_images:rows.filter(r=>(r.model_related_images||[]).length>0).length,
  models_with_images_captured:rows.filter(r=>(r.downloaded_images||[]).length>0).length,
  images_captured:rows.reduce((n,r)=>n+(r.downloaded_images||[]).length,0),
  non_200_or_model_mismatch:rows.filter(r=>r.http_status!==200||!r.page_model_match).map(r=>({model:r.model,status:r.http_status,page_model_match:r.page_model_match,detail:r.status}))
 };
 fs.writeFileSync("catalogue-review/sony-browser-image-audit-summary.json",JSON.stringify(summary,null,2));
 console.log("SUMMARY "+JSON.stringify(summary));
})().catch(e=>{console.error(e);process.exit(1);});
