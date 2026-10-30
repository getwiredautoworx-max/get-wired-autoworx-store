#!/usr/bin/env python3
"""Read-only official Hertz product-page image metadata audit."""
from __future__ import annotations
import csv, json, re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, urlopen

MODELS = [
 ("78000023","MPK 165.3","https://hertz-audio.com/product/mpk-165-3/"),
 ("78000059","CK 130","https://hertz-audio.com/product/ck-130/"),
 ("78000069","CK 165","https://hertz-audio.com/product/ck-165/"),
 ("78021091","DBX 25.3","https://hertz-audio.com/product/dbx-25-3/"),
 ("78021101","DBX 30.3","https://hertz-audio.com/product/dbx-30-3/"),
 ("78022000","CBA 250","https://hertz-audio.com/product/cba-250/"),
 ("78035501","MPS 250 S4","https://hertz-audio.com/product/mps-250-s4/"),
 ("78035511","MPS 250 S2","https://hertz-audio.com/product/mps-250-s2/"),
 ("78040014","CPX 165","https://hertz-audio.com/product/cpx-165/"),
 ("78040044","CPX 690","https://hertz-audio.com/product/cpx-690/"),
 ("78040143","DCX 130.3","https://hertz-audio.com/product/dcx-130-3/"),
 ("78040154","DCX 165.3","https://hertz-audio.com/product/dcx-165-3/")
]
class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta={}
        self.images=[]
        self.jsonld=[]
        self.title=[]
        self.h1=[]
        self.capture=None
        self.script_type=""
        self.script_data=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=="meta":
            key=(a.get("property") or a.get("name") or "").lower()
            if key and a.get("content"): self.meta[key]=a["content"]
        if tag=="img":
            src=a.get("src") or a.get("data-src") or a.get("data-lazy-src") or ""
            if src: self.images.append({"src":src,"alt":a.get("alt",""),"class":a.get("class","")})
        if tag=="title": self.capture="title"
        if tag=="h1": self.capture="h1"
        if tag=="script" and "ld+json" in a.get("type","").lower():
            self.capture="jsonld"; self.script_data=[]
    def handle_data(self,data):
        if self.capture=="title": self.title.append(data.strip())
        elif self.capture=="h1": self.h1.append(data.strip())
        elif self.capture=="jsonld": self.script_data.append(data)
    def handle_endtag(self,tag):
        if tag=="title" and self.capture=="title": self.capture=None
        elif tag=="h1" and self.capture=="h1": self.capture=None
        elif tag=="script" and self.capture=="jsonld":
            self.jsonld.append("".join(self.script_data)); self.capture=None

def find_products(obj, found):
    if isinstance(obj,dict):
        typ=obj.get("@type",[])
        if isinstance(typ,str): typ=[typ]
        if "Product" in typ: found.append(obj)
        for v in obj.values(): find_products(v,found)
    elif isinstance(obj,list):
        for v in obj: find_products(v,found)

def run():
    out=Path("catalogue-review")
    out.mkdir(exist_ok=True)
    rows=[]
    for item_code,model,url in MODELS:
        record={"hertz_item_code_reference_only":item_code,"model":model,"official_page":url}
        try:
            req=Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; GetWiredCatalogueReview/1.0)"})
            with urlopen(req,timeout=25) as response:
                html=response.read().decode("utf-8","replace")
                record["http_status"]=getattr(response,"status",200)
            parser=PageParser();parser.feed(html)
            record["page_title"]=" ".join(parser.title).strip()
            record["page_h1"]=" ".join(parser.h1).strip()
            record["meta_description"]=parser.meta.get("description","")
            record["og_image"]=urljoin(url,parser.meta.get("og:image","")) if parser.meta.get("og:image") else ""
            record["twitter_image"]=urljoin(url,parser.meta.get("twitter:image","")) if parser.meta.get("twitter:image") else ""
            products=[]
            for raw in parser.jsonld:
                try: find_products(json.loads(raw),products)
                except Exception: pass
            product=products[0] if products else {}
            record["jsonld_product_name"]=str(product.get("name",""))
            record["jsonld_sku"]=str(product.get("sku",""))
            imgs=product.get("image",[])
            if isinstance(imgs,str): imgs=[imgs]
            record["jsonld_images_json"]=json.dumps([urljoin(url,x) for x in imgs],ensure_ascii=False)
            candidates=[]
            for im in parser.images:
                src=urljoin(url,im["src"])
                low=(src+" "+im["alt"]+" "+im["class"]).lower()
                if any(k in low for k in ["logo","facebook","instagram","twitter","icon","cookie","banner","newsletter"]): continue
                candidates.append({"url":src,"alt":im["alt"],"class":im["class"]})
            record["image_candidates_json"]=json.dumps(candidates,ensure_ascii=False)
            record["image_candidate_count"]=len(candidates)
            record["status"]="PAGE_FETCHED — IMAGE URL CANDIDATES REQUIRE VISUAL MODEL CHECK"
        except Exception as exc:
            record["status"]="FETCH_ERROR"
            record["error"]=repr(exc)
        rows.append(record)
    fields=sorted({k for r in rows for k in r})
    with (out/"hertz-official-image-metadata-review.csv").open("w",newline="",encoding="utf-8-sig") as f:
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)
    summary={"models_checked":len(rows),"pages_fetched":sum(r.get("status","").startswith("PAGE_FETCHED") for r in rows),"pages_with_og_image":sum(bool(r.get("og_image")) for r in rows),"pages_with_jsonld_image":sum(bool(r.get("jsonld_images_json","[]")) and r.get("jsonld_images_json")!="[]" for r in rows),"fetch_errors":[r for r in rows if r.get("status")=="FETCH_ERROR"],"warning":"Page metadata and image URLs are candidates only. A human/model must visually confirm each image shows the exact model before any product record is approved."}
    (out/"hertz-official-image-metadata-summary.json").write_text(json.dumps(summary,indent=2),encoding="utf-8")
    print(json.dumps(summary))
if __name__=="__main__": run()
