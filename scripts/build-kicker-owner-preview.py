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
    assert urlparse(image).scheme=="https" and urlparse(image).hostname, f"Invalid image row {i}"
    assert str(d["Vendor / Brand"]).lower()=="kicker", f"Unexpected brand row {i}"
    seen.add(sku)
    marine="marine" in category.lower()
    records.append(dict(brand="Kicker",title=title,description=desc,modelNumber=sku,component=category,collection="Marine Audio" if marine else "Car Audio & Video",division="Marine Audio" if marine else "Car Audio",indicativePrice=price,imageUrl=image,imageStatus="owner_authorized_exact_supplier_image_verified_review_only",publicationStatus="PREVIEW_ONLY_NOT_LIVE"))
assert records
(root/"assets/audio-catalogue-primary-preview.json").write_text(json.dumps({"records":records},ensure_ascii=False))
for name in ["preview-audio-products.html"]:
    p=root/name
    s=p.read_text()
    old="price.textContent='Price On Request';"
    assert old in s
    p.write_text(s.replace(old,"price.textContent=Number.isFinite(p.indicativePrice)?new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(p.indicativePrice)+' incl. VAT':'Price On Request';"))
print("KICKER_PREVIEW_RECORDS",len(records))
