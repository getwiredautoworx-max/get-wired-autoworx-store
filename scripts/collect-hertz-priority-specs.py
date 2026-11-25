"""Hertz priority research. Match the longest explicit manufacturer model in the supplier title.
Preserve other brands' evidence; never transfer a shorter model's ratings to a suffix variant."""
import collections,concurrent.futures,importlib.util,json,re
from pathlib import Path
from urllib.parse import urlparse
from bs4 import BeautifulSoup
spec=importlib.util.spec_from_file_location("collector",Path(__file__).with_name("collect-planetworld-model-specs.py"))
collector=importlib.util.module_from_spec(spec);spec.loader.exec_module(collector)
P=Path("/tmp/planetworld-spec-evidence.json")
data=json.loads(P.read_text())
records=json.loads(Path("pages-public/assets/audio-catalogue-primary-preview.json").read_text())["records"]
hertz=[p for p in records if p["brand"]=="Hertz"]; assert len(hertz)==79
def tokens(s): return re.findall(r"[a-z]+|\d+",s.lower())
def match(a,b): return any(a[i:i+len(b)]==b for i in range(len(a)-len(b)+1))
urls=collector.sitemap("https://hertz-audio.com")
index=[]
for url in urls:
    path=urlparse(url).path.rstrip("/")
    if not path.startswith("/product/"):continue
    t=tokens(path.split("/")[-1])
    if len(t)>=2 and any(x.isdigit() for x in t):index.append((t,url))
print("HERTZ_INDEX",len(index),flush=True)
def recover(p):
    key=p["getWiredSku"]; title=p["title"]; alias=collector.model_alias(p); tt=tokens(alias or title)
    print("HERTZ_MODEL",key,title,flush=True)
    if p.get("specificationStatus")=="manufacturer_verified":return key,data.get(key,{})
    matches=[(t,u) for t,u in index if (t==tt if alias else match(tt,t))]
    if not matches:
        print("HERTZ_NO_MATCH",key,alias or title,flush=True)
        return key,data.get(key,{})
    n=max(len(t) for t,u in matches); matches=[(t,u) for t,u in matches if len(t)==n]
    if len({tuple(t) for t,u in matches})!=1:
        print("HERTZ_AMBIGUOUS",key,[u for t,u in matches],flush=True);return key,data.get(key,{})
    for t,url in matches[:2]:
        try:
            raw,actual=collector.fetch(url); soup=BeautifulSoup(raw,"html.parser")
            if urlparse(actual).hostname not in ("hertz-audio.com","www.hertz-audio.com"):continue
            h1=soup.find("h1")
            if not h1:continue
            ht=tokens(h1.get_text(" ",strip=True))
            if ht[:len(t)]!=t:
                if key in ("GWA-HRZ-78000069","GWA-HRZ-78032127"): print("HERTZ_HEADING_MISMATCH",key,t,ht,actual,flush=True)
                continue
            # Require type delimiter directly after model, not a longer model variant.
            if len(ht)>len(t) and ht[len(t)] not in ("kit","woofer","tweeter","midrange","mid","coaxial","speaker","subwoofer","amplifier","grille","grill","crossover","remote","controller","accessory","processor","component","cable","wiring","enclosure","adapter","interface","horn","driver","passive","active"):continue
            for node in soup.select("header,footer,nav,aside,.related,.upsells,.cross-sells,[class*=related-product],[class*=recommendation]"):node.decompose()
            facts=collector.fields(soup)
            # Locate exact manufacturer label/value rows even when CSS uses generic divs.
            label=re.compile(r"^(?:Power Handling|Power Output|Continuous Power|RMS Power|Peak Power|Impedance|Frequency Response|Sensitivity|Nominal diameter|Woofer Size|Tweeter Size|Voice Coil|Mounting Depth|Crossover|Magnet Material|Cone Material|Grilles Included|Channels|Supply Voltage|Fuse|Input Sensitivity|Signal.to.Noise|Dimensions|Dimension [A-Z]|SPL|Total Weight|Weight|Size|Amplifier Class|Load Impedance|Filter|Subwoofer Size)",re.I)
            for node in soup.find_all(["div","li","tr","dl"]):
                parts=[collector.clean(x.get_text(" ",strip=True)) for x in node.find_all(["div","span","p","strong","b","dt","dd","th","td"],recursive=False)]
                if len(parts)!=2:continue
                k,v=parts
                if 2<=len(k)<=70 and 1<=len(v)<=110 and label.search(k) and re.search(r"\d|yes|no|ferrite|neodymium|paper|aluminium|aluminum|class|wired|wireless|mesh",v,re.I): facts.setdefault(k,v)
            if key in ("GWA-HRZ-78000069","GWA-HRZ-78032127"): print("HERTZ_DIAGNOSTIC",key,"heading",h1.get_text(" ",strip=True),"facts",json.dumps(facts),"tables",len(soup.select("table")),flush=True)
            # Hertz specification rows may be divs rather than tables; find leaf label/value pairs in actual spec containers.
            for node in soup.select("[class*=spec],[class*=tech]"):
                for child in node.find_all(["div","li"],recursive=False):
                    parts=[collector.clean(x.get_text(" ",strip=True)) for x in child.find_all(["div","span","p"],recursive=False)]
                    if len(parts)==2:
                        k,v=parts
                        if len(k)<=65 and len(v)<=100 and collector.LABEL.search(k) and collector.VALUE.search(v) and not re.search(r"price|stock|shipping|warranty",k,re.I):facts.setdefault(k,v)
            # Do not mix identical field labels from LF/HF or multi-channel tables without labels.
            if not facts:
                print("HERTZ_EMPTY_FIELDS",key,actual,h1.get_text(" ",strip=True),flush=True)
                continue
            result={"source":actual,"facts":facts,"identity":"Manufacturer model explicitly present in title and product H1; technical fields require review"}
            print("HERTZ_SOURCE",key,actual,json.dumps(facts,ensure_ascii=True),flush=True)
            return key,result
        except Exception as exc:print("HERTZ_ERROR",key,type(exc).__name__,flush=True)
    return key,data.get(key,{})
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    data.update(dict(pool.map(recover,hertz)))
assert len(data)==693
P.write_text(json.dumps(data,ensure_ascii=False,indent=2))
print("HERTZ_SOURCE_COVERAGE",sum(bool(data[p["getWiredSku"]].get("facts")) for p in hertz),"OF",len(hertz),flush=True)
