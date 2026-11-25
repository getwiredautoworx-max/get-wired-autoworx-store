"""Populate only an already-built isolated owner preview from the approved workbook."""
import json, math, re
from pathlib import Path
from urllib.parse import urlparse
from openpyxl import load_workbook
root=Path("pages-public")
assert json.loads((root/"qa-build-result.json").read_text())["preview_only"] is True
ws=load_workbook("suppliers/Planetworld/get-wired-autoworx-kicker-dec-feb-promo-final.xlsx",read_only=True,data_only=True)["Store_Catalog_Upload"]
rows=iter(ws.values)
headers=next(rows)
records=[]
seen=set()
for i,row in enumerate(rows,2):
    d=dict(zip(headers,row))
    if str(d["Publish Status"]).strip().lower()!="active": continue
    sku=str(d["Supplier SKU Reference"] or "").strip()
    title=str(d["Product Title"] or "").strip()
    desc=str(d["Product Description"] or "").strip()
    price=d["Store Price (Incl VAT)"]
    image=str(d["Product Image URL"] or "").strip()
    category=str(d["Product Category"] or "").strip()
    assert sku and sku not in seen and title and desc and category, f"Invalid row {i}"
    assert isinstance(price,(int,float)) and math.isfinite(price) and price>0, f"Invalid price row {i}"
    if urlparse(image).scheme!="https" or not urlparse(image).hostname:
        print(f"IMAGE_PENDING row {i} model={sku} title={title}")
        image="assets/product-placeholder.svg"
    assert str(d["Vendor / Brand"]).lower()=="kicker", f"Unexpected brand row {i}"
    seen.add(sku)
    marine="marine" in category.lower()
    original_category=category
    # Classify by product title, not amplifier compatibility in descriptions.
    if re.search(r"\b(?:wiring|wire|installation|install|power cable|amp kit|amplifier kit)\b", title, re.I) and re.search(r"kit|cable|wire|wiring", title, re.I) or re.search(r"wiring|wire kits|installation kits", category, re.I):
        category="Wiring Kits"
    elif re.search(r"amplifier", category, re.I):
        category="Amplifiers"
    if re.sub(r"[^A-Z0-9]", "", sku.upper())=="46KIYFM" or re.search(r"\bRCA\b.*\b(?:adapter|adaptor|connector|cable|splitter)\b", title, re.I):
        category="Wiring Kits"
    if re.sub(r"[^A-Z0-9]", "", sku.upper())=="47KEY5001":
        category="Amplifiers"
        import urllib.request
        from html import unescape
        try:
            page=urllib.request.urlopen(urllib.request.Request("https://www.kicker.com.au/product/47key5001-500-watts-rms-mono-amp/",headers={"User-Agent":"Mozilla/5.0"}),timeout=15).read().decode("utf-8","replace")
            match=re.search(r'<meta[^>]+property=["\x27]og:image["\x27][^>]+content=["\x27]([^"\x27]+)',page,re.I)
            if match:
                candidate=unescape(match.group(1))
                with urllib.request.urlopen(candidate,timeout=15) as response:
                    assert response.headers.get_content_type().startswith("image/")
                    data=response.read()
                target=root/"assets/kicker-47key5001.jpg"
                target.write_bytes(data)
                image="assets/kicker-47key5001.jpg"
                print("KEY5001_IMAGE_REPLACED",candidate)
        except Exception as exc:
            print("KEY5001_IMAGE_PENDING",str(exc))
    if re.sub(r"[^A-Z0-9]", "", sku.upper())=="46CXA4001":
        category="Amplifiers"
        import urllib.request
        from html.parser import HTMLParser
        from urllib.parse import urljoin
        class ProductImages(HTMLParser):
            def __init__(self):
                super().__init__()
                self.urls=[]
            def handle_starttag(self,tag,attrs):
                d=dict(attrs)
                if tag=="img" and re.search(r"CX(?:A)?400[. ]?1",d.get("alt",""),re.I):
                    self.urls.append(d.get("data-src") or d.get("src"))
        try:
            source="https://www.kicker.com/CXA4001-400-Watt-Mono-Class-D-Subwoofer-Amp"
            parser=ProductImages()
            parser.feed(urllib.request.urlopen(urllib.request.Request(source,headers={"User-Agent":"Mozilla/5.0"}),timeout=20).read().decode("utf-8","replace"))
            for candidate in filter(None,parser.urls):
                try:
                    with urllib.request.urlopen(urljoin(source,candidate),timeout=15) as response:
                        mime=response.headers.get_content_type()
                        assert mime in ("image/jpeg","image/png","image/webp")
                        data=response.read()
                    assert len(data)>5000
                    suffix={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"}[mime]
                    image="assets/kicker-46cxa4001."+suffix
                    (root/image).write_bytes(data)
                    print("CXA4001_IMAGE_REPLACED",candidate)
                    break
                except Exception:
                    continue
            else:
                print("CXA4001_IMAGE_PENDING no usable image")
        except Exception as exc:
            print("CXA4001_IMAGE_PENDING",str(exc))
    print(f"CATEGORY {sku} {original_category} -> {category}: {title}")
    records.append(dict(brand="Kicker",title=title,description=desc,modelNumber=sku,component=category,collection="Marine Audio" if marine else "Car Audio & Video",division="Marine Audio" if marine else "Car Audio",indicativePrice=price,imageUrl=image,imageStatus="workbook_image_candidate_review_only",publicationStatus="PREVIEW_ONLY_NOT_LIVE"))
assert records
(root/"assets/audio-catalogue-primary-preview.json").write_text(json.dumps({"records":records},ensure_ascii=False))
for name in ["preview-audio.html","preview-audio-brand.html","preview-audio-products.html"]:
    p=root/name
    s=p.read_text()
    old="price.textContent='Price On Request';"
    s=s.replace("new Set([\'official_manufacturer_image_verified_review_only\'","new Set([\'workbook_image_candidate_review_only\',\'official_manufacturer_image_verified_review_only\'")
    s=s.replace('new Set(["official_manufacturer_image_verified_review_only"', 'new Set(["workbook_image_candidate_review_only","official_manufacturer_image_verified_review_only"')
    assert "workbook_image_candidate_review_only" in s, name
    s=s.replace("No products are currently listed. Browse product types to see the empty store layout.","Browse the imported Kicker catalogue.")
    s=s.replace("const exactBrandImage=rows.find(p=>brandDisplayName(p.brandDisplayName||p.brand)===brand&&group(p)===t&&p.imageUrl);","const exactBrandImage=rows.find(p=>brandDisplayName(p.brandDisplayName||p.brand)===brand&&group(p)===t&&p.imageUrl&&!p.imageUrl.includes('placeholder'));")
    p.write_text(s.replace(old,"price.textContent=Number.isFinite(p.indicativePrice)?new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(p.indicativePrice)+' incl. VAT':'Price On Request';"))
print("KICKER_PREVIEW_RECORDS",len(records))
