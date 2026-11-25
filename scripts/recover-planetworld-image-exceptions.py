"""Target outstanding image evidence, leaving accepted workbook images untouched."""
import collections, concurrent.futures, importlib.util, json, re
from pathlib import Path
from urllib.parse import urljoin
from bs4 import BeautifulSoup
spec=importlib.util.spec_from_file_location("batch",Path(__file__).with_name("audit-planetworld-batch.py"))
batch=importlib.util.module_from_spec(spec); spec.loader.exec_module(batch)
P=Path("/tmp/planetworld-batch-image-evidence.json")
PAGES={
"GWA-ALP-R2-W10D2":("https://www.alpine.co.uk/p/Products/SingleView/R2-W10D2","R2-W10D2"),
"GWA-AUD-69030021":("https://audison.com/product/av-6-5-p-ii/","AV 6.5 P II"),
"GWA-FOC-IW-IMP22-IMPULSE":("https://www.focal-america.com/product/iw-imp-2-2/","IW IMP 2.2"),
"GWA-HRZ-78242015":("https://ca.hertz-audio.com/product/cp-5-1k/","CP 5.1K"),
"GWA-ONE-3E2040F":("https://www.rivoniacarsound.co.za/product/third-eye-4-sensors-with-buzzer-rubber-rf/","3E2040F"),
"GWA-ONE-CAM007-AHD":("https://www.caraudiowarehouse.co.za/product/onex-ahd-mountable-reverse-camera-front-and-rear/","CAM007-AHD"),
"GWA-ONE-ON017-2A11":("https://sbrprosound.co.za/product/onenav-on017-2a11/","ON017-2A11"),
"GWA-ONE-ON4989-X":("https://nxtleveltech.co.za/product/onex-new-966inch-rear-view-monitor-with-dvr","ON4989-X"),
"GWA-ONE-OX-4990DVR":("https://onenav.co.za/product/onex-universal-mount-smart-mirror-dvr-wifi-4k-camera/","OX-4990DVR"),
"GWA-ONE-OX-4991DVR":("https://onenav.co.za/product/onex-bracket-mount-smart-mirror-dvr-wifi-4k-camera/","OX-4991DVR"),
"GWA-ONE-OX-CPAA3":("https://www.caraudiowarehouse.co.za/product/onex-3-in-1-wireless-carplay-and-android-auto-adaptor/","OX-CPAA3"),
"GWA-ONE-OX-LCAM001":("https://www.caraudiowarehouse.co.za/product/onex-license-plate-camera/","OX-LCAM001"),
}
def retry(row):
    if row["gwa"] not in PAGES or row["status"] in ("ORIGINAL_AVAILABLE","REPLACEMENT_APPROVED"): return row
    page,model=PAGES[row["gwa"]]
    try:
        body,actual=batch.get(page); soup=BeautifulSoup(body,"html.parser")
        if batch.norm(model) not in batch.norm(soup.get_text(" ",strip=True)): return row
        found=[]
        def add(url,priority):
            if isinstance(url,str) and url.strip() and not re.search(r"placeholder|logo|diagram|dimensions?|chart|motor.structure|graph|banner|next.gen.sound.performance",url,re.I):
                found.append((priority,urljoin(actual,url)))
        for img in soup.find_all("img"):
            alt=img.get("alt","")
            src=img.get("data-large_image") or img.get("data-src") or img.get("src")
            if not src: continue
            if batch.norm(model) in batch.norm(alt) and not re.search(r"diagram|dimension|chart|motor structure|graph|logo|next.gen.sound.performance",alt,re.I):
                add(src,0 if re.search(r"front|back|side",alt,re.I) else 1)
        if row["brand"]!="Alpine":
            for img in soup.select(".woocommerce-product-gallery img,.product-gallery img,.product-image img"):
                add(img.get("data-large_image") or img.get("data-src") or img.get("src"),2)
            for raw in soup.find_all("script",type="application/ld+json"):
                try:
                    doc=json.loads(raw.string or raw.get_text())
                    nodes=doc if isinstance(doc,list) else doc.get("@graph",[doc])
                    for node in nodes:
                        if node.get("@type")!="Product": continue
                        if batch.norm(model) not in batch.norm(str(node.get("sku",""))+" "+str(node.get("name",""))): continue
                        images=node.get("image",[])
                        for u in images if isinstance(images,list) else [images]: add(u,1)
                except Exception: pass
            for meta in soup.find_all("meta",property="og:image"): add(meta.get("content"),3)
        for _,url in sorted(set(found)):
            try:
                u,digest=batch.verified_image(url)
                return dict(row,status="REPLACEMENT_CANDIDATE",resolved=u,digest=digest,source=actual)
            except Exception: pass
    except Exception as exc: print("RETRY_ERROR",row["gwa"],type(exc).__name__)
    return row
rows=json.loads(P.read_text())
assert len(rows)==521
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results=list(pool.map(retry,rows))
for old,new in zip(rows,results):
    if old!=new: print("TARGET_RECOVERED",json.dumps(new,ensure_ascii=True))
P.write_text(json.dumps(results,indent=2))
print("TARGETED_IMAGE_COUNTS",dict(collections.Counter(r["status"] for r in results)))
