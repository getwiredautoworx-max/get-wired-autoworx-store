"""Collect exact-model technical facts; never infer product features from a brand or series."""
import collections,concurrent.futures,gzip,html,json,re,xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urljoin,urlparse,quote,urlencode
from urllib.request import Request,urlopen
from bs4 import BeautifulSoup

ROOT=Path("pages-public")
DATA=ROOT/"assets/audio-catalogue-primary-preview.json"
OUTPUT=Path("/tmp/planetworld-spec-evidence.json")
HOSTS={
"Kicker":["https://www.kicker.com","https://www.kicker.com.au"],
"Alpine":["https://www.alpine.co.uk"],"Audison":["https://audison.com"],
"Hertz":["https://hertz-audio.com"],"Focal":["https://www.focal.com"],
"JVC":["https://www.jvc.com"],"Kenwood":["https://www.kenwood.com"],
"Pioneer":["https://pioneercarentertainment.com"],"ONE":["https://onenav.co.za"],
"DrArtex":["https://drartex.com"],
}
def norm(s): return re.sub(r"[^a-z0-9]","",str(s).lower())
def slug(s): return re.sub(r"[^a-z0-9]+","-",s.lower()).strip("-")
def fetch(url,limit=8_000_000):
    with urlopen(Request(url,headers={"User-Agent":"Mozilla/5.0"}),timeout=10) as res:
        raw=res.read(limit+1)
        if len(raw)>limit: raise ValueError("Response too large")
        return raw,res.geturl()
def sitemap(host):
    queue=[host+"/sitemap.xml",host+"/wp-sitemap.xml",host+"/sitemap_index.xml"]
    visited=set(); products=set()
    for url in queue:
        if len(visited)>=35: break
        if url in visited: continue
        visited.add(url)
        try:
            raw,_=fetch(url)
            if raw[:2]==b"\x1f\x8b": raw=gzip.decompress(raw)
            root=ET.fromstring(raw)
            locs=[x.text for x in root.iter() if x.tag.rsplit("}",1)[-1]=="loc" and x.text]
            if root.tag.endswith("sitemapindex"):
                queue.extend(x for x in locs if re.search(r"product|catalog|page",x,re.I))
            else:
                products.update(x for x in locs if urlparse(x).scheme=="https" and re.search(r"/(?:product[s]?|p/Products|car|[a-z0-9]+-amplifier|[a-z0-9]+-subwoofer)",x,re.I))
        except Exception: pass
    return sorted(products)

LABEL=re.compile(r"power|rms|peak|watts?|impedance|ohms?|frequency|sensitivity|dimensions?|mounting|depth|diameter|voice coil|crossover|filter|channels?|inputs?|outputs?|voltage|current|fuse|gauge|length|thickness|coverage|resolution|screen|display|bluetooth|usb|carplay|android auto|wifi|wi-fi|aux|hdmi|camera|angle|material|compatib|fitment|connector|format|weight|signal.to.noise|s/n ratio|\bspl\b|\bbandwidth\b|cut.off|class|equaliz|preout|playback|tuning",re.I)
VALUE=re.compile(r"\d|\b(?:yes|no|wired|wireless|bluetooth|usb|aux|hdmi|carplay|android auto|coaxial|aluminium|aluminum|rubber|ferrite|neodymium|class [ad]|class ab|mp3|flac|aac|wav|detachable|adjustable)\b",re.I)
def clean(s): return re.sub(r"\s+"," ",s).strip()
def fields(soup):
    facts={}
    def add(k,v):
        k,v=clean(k),clean(v)
        if not (2<=len(k)<=75 and 1<=len(v)<=110 and LABEL.search(k) and VALUE.search(v)): return
        if re.search(r"price|shipping|stock|warranty|delivery|review|discount|cart|payment|copyright|privacy",k,re.I): return
        if len(facts)<24 and k.casefold() not in {x.casefold() for x in facts}: facts[k]=v
    for tr in soup.select("tr"):
        table=tr.find_parent("table")
        if table and any(re.search(r"\bmodel\b",th.get_text(" ",strip=True),re.I) for th in table.find_all("th")): continue
        cells=tr.find_all(["th","td"],recursive=False)
        if len(cells)==2: add(cells[0].get_text(" ",strip=True),cells[1].get_text(" ",strip=True))
    for dt in soup.find_all("dt"):
        dd=dt.find_next_sibling("dd")
        if dd: add(dt.get_text(" ",strip=True),dd.get_text(" ",strip=True))
    for item in soup.select("li,p"):
        line=clean(item.get_text(" ",strip=True))
        if len(line)>170 or ":" not in line: continue
        k,v=line.split(":",1); add(k,v)
    # Only short factual specification rows; no scraped prose or advertising claims.
    return facts

# Supplier-SKU to explicit model aliases transcribed from missing-model report 45592367894.
# DSK ... .30 titles are intentionally excluded pending suffix confirmation.
HERTZ_ALIASES = {
  "66772099": "AFBMW BOOSTER 01",
  "66772206": "AFBMW ReAMP 3",
  "78000023": "MPK 165.3",
  "78000059": "CK 130",
  "78000069": "CK 165",
  "78000099": "CK 165 L",
  "78000103": "CPK 165",
  "78000105": "CPK 690",
  "78000211": "MLK 700.3",
  "78000301": "K 165",
  "78000310": "K 130",
  "78000320": "K 170",
  "78010023": "MPK 163.3",
  "78021091": "DBX 25.3",
  "78021101": "DBX 30.3",
  "78022000": "CBA 250",
  "78030035": "MP 28.3",
  "78030073": "ML 280.3",
  "78030090": "DT 24.3",
  "78030140": "C 26",
  "78032094": "ML 1650.3",
  "78032127": "C 165 L",
  "78032137": "C 165 F",
  "78035058": "CS 250 S2",
  "78035066": "CS 200 S4",
  "78035068": "CS 250 S4",
  "78035078": "CS 300 S2",
  "78035088": "CS 300 S4",
  "78035400": "DS 25.3",
  "78035410": "DS 30.3",
  "78035421": "S 300 S4",
  "78035501": "MPS 250 S4",
  "78035511": "MPS 250 S2",
  "78035531": "MPS 300 S4",
  "78035541": "MPS 300 S2",
  "78035551": "MPBX 300 S2",
  "78040014": "CPX 165",
  "78040035": "MPX 165.3",
  "78040044": "CPX 690",
  "78040052": "MPX 690.3",
  "78040097": "CX 130",
  "78040117": "CX 570",
  "78040128": "CX 690",
  "78040133": "DCX 100.3",
  "78040143": "DCX 130.3",
  "78040154": "DCX 165.3",
  "78040163": "DCX 690.3",
  "78040165": "DCX 160.3",
  "78040170": "DCX 170.3",
  "78040180": "DCX 570.3",
  "78040190": "DCX 710.3",
  "78040200": "DCX 87.3",
  "78040230": "X 690",
  "78040240": "X 130",
  "78040250": "X 170",
  "78071026": "DG 130.3",
  "78071036": "DG 165.3",
  "78071053": "CG 130",
  "78071073": "CG 165",
  "78071121": "DG 250.3",
  "78071126": "DG 300.3",
  "78071135": "MG 250.3",
  "78071145": "MG 300.3",
  "78071153": "CG 200",
  "78071155": "CG 250",
  "78071181": "MPG 165.3",
  "78211040": "HRC",
  "78211041": "HRC 02",
  "78212000": "ML Power 1",
  "78241020": "DP 1.500",
  "78241050": "DP 4.400",
  "78242000": "CP 1.700",
  "78242010": "CP 4.800",
  "78242015": "CP 5.1K",
  "78260025": "S8 DSP"
}

def model_alias(record):
    if record["brand"] == "Hertz" and str(record["modelNumber"]) in HERTZ_ALIASES:
        return HERTZ_ALIASES[str(record["modelNumber"])]
    # Explicit manufacturer model between delimiters in the supplied product title.
    # Numeric supplier identifiers are not manufacturer model numbers.
    if record["brand"] not in ("Audison","Hertz"): return ""
    title=record["title"]
    match=re.match(r"^\s*(?:Audison|Hertz)\s*-\s*([A-Z0-9][A-Z0-9. /+_-]{2,35})\s+-\s+",title,re.I)
    if not match: return ""
    alias=match.group(1).strip()
    return alias if re.search(r"\d",alias) else ""

def exact_page(url,record):
    raw,actual=fetch(url); soup=BeautifulSoup(raw,"html.parser")
    sku=record["modelNumber"]; ns=norm(sku)
    heading=" ".join(x.get_text(" ",strip=True) for x in soup.find_all("h1"))
    heading=heading+" "+(soup.title.get_text(" ",strip=True) if soup.title else "")
    exact=False
    alias=model_alias(record)
    # Match a complete model name at the beginning of the actual manufacturer H1.
    # Do not accept related models or suffix variants.
    manufacturer={"Audison":"audison.com","Hertz":"hertz-audio.com"}.get(record["brand"])
    h1=soup.find("h1")
    hostname=urlparse(actual).hostname or ""
    if alias and manufacturer and (hostname==manufacturer or hostname.endswith("."+manufacturer)) and h1:
        primary=h1.get_text(" ",strip=True)
        expected=r"[\s._-]*".join(re.escape(x) for x in re.findall(r"[A-Za-z]+|\d+",alias))
        if re.match(r"^"+expected+r"\s*(?:\||$)",primary,re.I): exact=True
        elif re.match(r"^"+expected+r"\s+(?:Amplifier|Woofer|Tweeter|Mid Range|Midrange|Kit|Coaxial|Subwoofer|Crossover|Processor|DSP|Grille|Cable|Harness|Remote|Adapter|System|Speaker)\b",primary,re.I): exact=True
    if len(ns)>=5 and ns in norm(heading) and norm(record["brand"]) in norm(heading): exact=True
    # Exact SKU in structured Product metadata or labelled SKU, not unrelated page recommendations.
    for item in soup.find_all("script",type="application/ld+json"):
        try:
            obj=json.loads(item.string or item.get_text())
            nodes=obj if isinstance(obj,list) else obj.get("@graph",[obj])
            for node in nodes:
                if node.get("@type")=="Product" and norm(node.get("sku",""))==ns: exact=True
        except Exception: pass
    for item in soup.select(".sku,[itemprop=sku]"):
        if norm(item.get("content") or item.get_text())==ns: exact=True
    if re.search(r"\bSKU\s*:\s*"+re.escape(sku)+r"(?![\w.-])",soup.get_text(" ",strip=True),re.I): exact=True
    if not exact:return None
    # Avoid related-product comparison tables and global footer/menu attributes.
    for node in soup.select("header,footer,nav,aside,.related,.upsells,.cross-sells,[class*=related-product],[class*=recommendation]"):
        node.decompose()
    f=fields(soup)
    if not f:return None
    return {"source":actual,"facts":f,"identity":"Exact SKU or model and brand on product page"}

def main():
    rows=json.loads(DATA.read_text())["records"];assert len(rows)==693
    hosts=["https://www.planetworld.co.za","https://nxtleveltech.co.za","https://www.caraudiowarehouse.co.za","https://sbrprosound.co.za"]
    hosts+=sorted({h for hs in HOSTS.values() for h in hs})
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        indices=dict(zip(hosts,pool.map(sitemap,hosts)))
    print("SOURCE_INDEX_COUNTS",json.dumps({h:len(x) for h,x in indices.items()}),flush=True)
    prior_path=Path("/tmp/prior-planetworld-spec-evidence.json")
    prior=json.loads(prior_path.read_text()) if prior_path.exists() else {}
    def lookup(p):
        key=p.get("getWiredSku") or ("Kicker:"+p["modelNumber"])
        if p.get("specificationStatus")=="manufacturer_verified": return key,{"source":p["specificationSource"],"facts":{x["label"]:x["value"] for x in p["technicalSpecifications"]},"identity":"Existing source-backed model record"}
        if prior.get(key,{}).get("facts") and prior[key].get("source"): return key,prior[key]
        sku=p["modelNumber"]; ns=norm(sku); title=p["title"]; title_slug=slug(title)
        relevant=HOSTS.get(p["brand"],[])+hosts[:4]
        alias=model_alias(p)
        if alias:
            host=HOSTS[p["brand"]][0]
            candidates_alias=[(-1,host+"/product/"+slug(alias)+"/")]
            if p["brand"]=="Hertz":
                candidates_alias.extend([(-1,"https://us.hertz-audio.com/product/"+slug(alias)+"/"),(0,host+"/product/"+slug(alias)+"-2/")])
        else: candidates_alias=[]
        candidates=list(candidates_alias)
        for host in relevant:
            for url in indices.get(host,[]):
                path=norm(urlparse(url).path)
                if len(ns)>=5 and ns in path: candidates.append((0,url))
                elif alias and norm(alias)==norm(urlparse(url).path.rstrip("/").rsplit("/",1)[-1]): candidates.append((-1,url))
                elif p["brand"]=="Hertz" and alias and len(norm(alias))>=4 and norm(urlparse(url).path.rstrip("/").rsplit("/",1)[-1]).endswith(norm(alias)): candidates.append((0,url))
                elif len(title_slug)>12 and norm(title_slug) in path: candidates.append((1,url))
        # Known public retailer slug route, no guessed data accepted unless exact SKU is confirmed.
        for host in ("https://nxtleveltech.co.za","https://www.caraudiowarehouse.co.za"):
            candidates.append((2,host+"/product/"+title_slug+"/"))
        if p["brand"]=="Kicker": candidates.append((2,"https://www.kicker.com.au/product/"+slug(sku)+"/"))
        # Supplier pages commonly use deeply nested product URLs, indexed by title.
        # A model in the URL is discovery only; exact page identity remains mandatory.
        for _,url in sorted(set(candidates))[:(12 if p["brand"]=="Hertz" else 5)]:
            try:
                result=exact_page(url,p)
                if result:
                    print("MODEL_SPEC_SOURCE",key,result["source"],len(result["facts"]),flush=True)
                    return key,result
            except Exception: pass
        return key,{"source":"","facts":{},"identity":"No exact-model technical table recovered"}
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        evidence=dict(pool.map(lookup,sorted(rows,key=lambda p:p["brand"]!="Hertz")))
    assert len(evidence)==693
    OUTPUT.write_text(json.dumps(evidence,ensure_ascii=False,indent=2))
    print("EXACT_MODEL_SPEC_COVERAGE",sum(bool(x["facts"]) for x in evidence.values()),"OF",len(evidence),flush=True)
if __name__=="__main__":main()
