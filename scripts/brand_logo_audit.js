const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const brands=[
 ["Alpine","https://www.alpine-usa.com/"],
 ["Audison","https://www.audison.com/"],
 ["Focal","https://www.focal.com/"],
 ["JVC","https://www.jvc.com/"],
 ["Kenwood","https://www.kenwood.com/"],
 ["Kicker","https://www.kicker.com/"],
 ["Pioneer","https://www.pioneer-car.eu/"],
 ["Hertz","https://hertz-audio.com/"]
];
(async()=>{
 const browser=await chromium.launch({headless:true}),outDir="catalogue-review/brand-logo-candidates";
 fs.mkdirSync(outDir,{recursive:true});const rows=[];
 for(const [brand,url] of brands){
  const page=await browser.newPage({viewport:{width:1365,height:900}}),rec={brand,official_homepage:url};
  try{
   const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:30000});
   rec.http_status=res?res.status():null;await page.waitForTimeout(1000);
   rec.page_title=await page.title().catch(()=> "");
   const candidates=await page.locator("header img, nav img, img").evaluateAll(ns=>ns.map(n=>({src:n.currentSrc||n.src||"",alt:n.alt||"",cls:String(n.className||""),width:n.naturalWidth||n.width||0,height:n.naturalHeight||n.height||0})));
   rec.logo_candidates=candidates.filter(x=>x.src&&/logo|brand/i.test(x.alt+" "+x.src+" "+x.cls)).slice(0,12);
   const svgs=await page.locator("header svg, nav svg, svg").evaluateAll(ns=>ns.slice(0,6).map((n,i)=>({html:n.outerHTML.slice(0,50000),cls:String(n.getAttribute("class")||""),aria:n.getAttribute("aria-label")||""})));
   rec.inline_svg_candidates=svgs.filter(x=>/logo|brand/i.test(x.cls+" "+x.aria+" "+x.html.slice(0,500)));
   rec.downloaded=[];
   for(let i=0;i<rec.logo_candidates.length;i++){
    try{
     const im=rec.logo_candidates[i],r=await page.request.get(im.src,{timeout:15000});if(!r.ok())continue;
     const body=await r.body(),ct=(r.headers()["content-type"]||"").toLowerCase(),ext=ct.includes("svg")?"svg":ct.includes("png")?"png":ct.includes("webp")?"webp":"jpg";
     const file=brand.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-logo-candidate-"+(i+1)+"."+ext;
     fs.writeFileSync(path.join(outDir,file),body);rec.downloaded.push({file,bytes:body.length,url:im.src,alt:im.alt,width:im.width,height:im.height});
    }catch(e){}
   }
   rec.status=rec.http_status===200?"HOMEPAGE_FETCHED — LOGO CANDIDATES REQUIRE VISUAL CHECK":"HOMEPAGE_RESPONSE_NOT_200";
  }catch(e){rec.status="BROWSER_FETCH_ERROR";rec.error=String(e);}
  rows.push(rec);console.log(JSON.stringify({brand,status:rec.status,http_status:rec.http_status,logo_candidates:rec.logo_candidates?.length||0,downloaded:rec.downloaded?.length||0,svg:rec.inline_svg_candidates?.length||0}));await page.close();
 }
 await browser.close();
 const fields=["brand","official_homepage","http_status","page_title","logo_candidates","inline_svg_candidates","downloaded","status","error"];
 const esc=v=>{const s=typeof v==="string"?v:JSON.stringify(v??"");return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;};
 fs.writeFileSync("catalogue-review/brand-logo-audit.csv",[fields.join(","),...rows.map(r=>fields.map(k=>esc(r[k])).join(","))].join("\r\n"));
 const summary={brands_checked:rows.length,homepages_rendered:rows.filter(r=>r.http_status===200).length,brands_with_logo_candidates:rows.filter(r=>(r.logo_candidates||[]).length>0||(r.inline_svg_candidates||[]).length>0).length,logo_files_downloaded:rows.reduce((n,r)=>n+(r.downloaded||[]).length,0),note:"All logo files are private review candidates only. Do not use until visually confirmed as the exact official brand wordmark and permitted for the store."};
 fs.writeFileSync("catalogue-review/brand-logo-audit-summary.json",JSON.stringify(summary,null,2));console.log("SUMMARY "+JSON.stringify(summary));
})().catch(e=>{console.error(e);process.exit(1);});
