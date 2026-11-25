"""Read-only Planetworld 11-brand intake. Validate original image URLs and find candidates for missing images."""
import collections, concurrent.futures, io, json, math, re, zipfile
from pathlib import Path
from urllib.parse import quote, urlencode, urljoin, urlparse
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
from openpyxl import load_workbook
from catalogue_image_gate import check_image

ARCHIVE=Path("suppliers/Planetworld/get-wired-autoworx-car-audio-all-11-brands-in-stock.zip")
SOURCES={
"R2-W10D2":("https://www.alpine.co.uk/p/Products/SingleView/r2-w10d2","R2-W10D2"),
"69010021":("https://audison.com/product/av-1-1-ii/","AV 1.1 II"),
"69020021":("https://audison.com/product/av-3-0-ii/","AV 3.0 II"),
"78242015":("https://hertz-audio.com/product/cp-5-1k/","CP 5.1K"),
"RM-RK258":("https://www.us.jvc.com/car/multimedia/rm_rk258/","RM-RK258"),
"DMH-AP6650BT":("https://www.pioneer.com.au/shop/car/multimedia-receivers/wireless-receivers/dmh-ap6650bt/","DMH-AP6650BT"),
}
def norm(s): return re.sub(r"[^a-z0-9]","",str(s).lower())
def slug(s): return re.sub(r"[^a-z0-9 -]","",s.lower()).replace(" ","-").strip("-")
def get(url):
    req=Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; CatalogueReview/1.0)"})
    with urlopen(req,timeout=15) as res:
        return res.read(5*1024*1024),res.geturl()
def encode_url(url):
    return quote(url,safe=":/?&=%+#@!$'()*+,;[]")
def verified_image(url):
    if not url: raise ValueError("Missing URL")
    u=encode_url(str(url).strip())
    if re.search(r"placeholder|no[-_ ]?image|coming[-_ ]?soon|default[-_ ]?product",u,re.I): raise ValueError("Placeholder")
    return u,check_image(u)
def page_candidates(page,model,strict_title=None):
    raw,actual=get(page)
    soup=BeautifulSoup(raw,"html.parser")
    heading=" ".join(x.get_text(" ",strip=True) for x in soup.find_all("h1"))
    ogtitle=soup.find("meta",property="og:title")
    page_title=heading+" "+(ogtitle.get("content","") if ogtitle else "")
    if strict_title:
        # Retailer result must contain exact SKU and matching product heading, not a full head-unit bundle.
        if norm(model) not in norm(soup.get_text(" ",strip=True)): return []
        if norm(strict_title) not in norm(page_title): return []
    elif norm(model) not in norm(page_title):
        return []
    candidates=[]
    for img in soup.find_all("img"):
        alt=img.get("alt","")
        if norm(model) in norm(alt) and len(norm(model))>=5:
            candidates.append(img.get("data-src") or img.get("src"))
    for meta in soup.find_all("meta",property="og:image"):
        candidates.append(meta.get("content"))
    return [(urljoin(actual,x),actual) for x in candidates if x]
def find_image(row):
    sku,title,brand=row["sku"],row["title"],row["brand"]
    original=row["image"]
    try:
        url,digest=verified_image(original)
        return dict(row,status="ORIGINAL_AVAILABLE",resolved=url,digest=digest,source="Workbook")
    except Exception as exc:
        reason=type(exc).__name__
    candidates=[]
    if sku in SOURCES:
        p,model=SOURCES[sku]
        try: candidates+=page_candidates(p,model)
        except Exception: pass
    if brand=="One":
        # Public WooCommerce Store API; exact SKU and exact normalized name required.
        for host in ("https://onenav.co.za","https://www.rivoniacarsound.co.za","https://nxtleveltech.co.za"):
            try:
                data,_=get(host+"/wp-json/wc/store/v1/products?"+urlencode({"sku":sku}))
                products=json.loads(data)
                for p in products if isinstance(products,list) else []:
                    if str(p.get("sku","")).casefold()!=sku.casefold(): continue
                    if norm(title) not in norm(p.get("name","")): continue
                    for img in p.get("images",[]):
                        if img.get("src"): candidates.append((img["src"],p.get("permalink",host)))
            except Exception: pass
        try:
            path=re.sub(r"-+","-",slug(title))
            candidates+=page_candidates("https://nxtleveltech.co.za/product/"+path,sku,title)
        except Exception: pass
    for url,source in dict.fromkeys(candidates):
        try:
            url,digest=verified_image(url)
            return dict(row,status="REPLACEMENT_CANDIDATE",resolved=url,digest=digest,source=source)
        except Exception: pass
    return dict(row,status="UNRESOLVED",reason=reason)

def main():
    rows=[]; seen=set(); model_seen=set()
    with zipfile.ZipFile(ARCHIVE) as z:
        assert len(z.namelist())==11
        for n in z.namelist():
            assert n.endswith(".xlsx") and "/" not in n
            s=load_workbook(io.BytesIO(z.read(n)),read_only=True,data_only=True)["Store_Catalog_Upload"]
            it=iter(s.values); headers=next(it)
            for i,r in enumerate(it,2):
                d=dict(zip(headers,r))
                assert str(d["Publish Status"]).strip().casefold()=="active",(n,i,"unexpected status")
                sku=str(d["Supplier SKU Reference"] or "").strip()
                gwa=str(d["Get Wired Auto SKU"] or "").strip()
                brand=str(d["Vendor / Brand"] or "").strip()
                title=str(d["Product Title"] or "").strip()
                desc=str(d["Product Description"] or "").strip()
                category=str(d["Product Category"] or "").strip()
                price=d["Store Price (Incl VAT)"]
                stock=d["Total Stock"]
                assert all([sku,gwa,brand,title,desc,category]),(n,i,"missing identity")
                assert gwa.casefold() not in seen,(n,i,"duplicate Get Wired SKU",gwa)
                assert (brand.casefold(),sku.casefold()) not in model_seen,(n,i,"duplicate model",sku)
                assert isinstance(price,(float,int)) and math.isfinite(price) and price>0,(n,i,"price")
                assert isinstance(stock,(float,int)) and stock>0,(n,i,"stock")
                assert stock==sum(d[k] or 0 for k in ("JHB Stock","DBN Stock","CPT Stock")),(n,i,"stock total")
                seen.add(gwa.casefold()); model_seen.add((brand.casefold(),sku.casefold()))
                rows.append(dict(workbook=n,row=i,sku=sku,gwa=gwa,brand=brand,title=title,category=category,image=d["Product Image URL"]))
    assert len(rows)==521,len(rows)
    print("CATALOGUE_DATA_VALIDATED",len(rows),flush=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        results=list(pool.map(find_image,rows))
    counts=collections.Counter(r["status"] for r in results)
    for r in results:
        if r["status"]!="ORIGINAL_AVAILABLE":
            print("IMAGE_RESULT",json.dumps(r,ensure_ascii=True),flush=True)
    print("BATCH_IMAGE_COUNTS",json.dumps(counts),flush=True)
    print("BRAND_IMAGE_COUNTS",json.dumps({b:dict(collections.Counter(r["status"] for r in results if r["brand"]==b)) for b in sorted({r["brand"] for r in results})}),flush=True)
    Path("/tmp/planetworld-batch-image-evidence.json").write_text(json.dumps(results,indent=2))
    # Candidate photos require exact model confirmation; never declare these verified solely by HTTP.
    if counts["UNRESOLVED"] or counts["REPLACEMENT_CANDIDATE"]:
        print("BATCH_REVIEW_REQUIRED",flush=True)
    else:
        print("BATCH_ALL_ORIGINAL_IMAGES_AVAILABLE",flush=True)

if __name__=="__main__": main()
