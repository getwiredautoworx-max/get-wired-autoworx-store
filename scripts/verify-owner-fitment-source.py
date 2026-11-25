"""Compare approved promo workbooks with in-stock rows in owner-supplied original price lists.
Reference hashes computed from the two attached 25 November 2026 XLSX files, Products sheet.
No price changes or stock imports."""
import hashlib,io,json,zipfile
from openpyxl import load_workbook
from pathlib import Path
BASE=Path("suppliers/Planetworld/get-wired-autoworx-car-audio-all-11-brands-in-stock.zip")
EXPECTED={
 "harness-and-trims":(41,"420610f35925a6a3e1c37f6ef4b6c288a6da141d882922ccdbaaa4a624e7c18e","d980a5cf04dfc138704c764882f8ec36ba63563c2aaa9a54177644d1d4d9d724","93ee6a29a2a191f3cb6ea85279306415bd5fa7f5c461e55ce0aeab8f9463cf91"),
 "one":(209,"2cf80e766fa87cc1c1e0d89d4ab42c4ccc1c062edd071c728071164236ce87cd","5ddeb15f420c00b3f5ade62b92f8ad1dc1abf84a08492024a07d48926569b0f5","c9a511904174117636b6615b2e2741c7f5a02c53c51c43e81a07eabf713ed80c"),
}
def sha(rows):return hashlib.sha256(json.dumps(sorted(rows),ensure_ascii=False,separators=(",",":")).encode()).hexdigest()
with zipfile.ZipFile(BASE) as z:
 for brand,(count,sku_hash,title_hash,stock_hash) in EXPECTED.items():
    name=next(n for n in z.namelist() if n.startswith("get-wired-autoworx-"+brand+"-dec-feb"))
    book=load_workbook(io.BytesIO(z.read(name)),read_only=True,data_only=True)
    it=iter(book["Store_Catalog_Upload"].values); h=next(it); rows=[]
    for r in it:
        d=dict(zip(h,r))
        if str(d["Publish Status"]).lower()!="active":continue
        rows.append([str(d["Supplier SKU Reference"]).strip(),str(d["Product Title"]).strip(),*[int(d[k] or 0) for k in ("JHB Stock","DBN Stock","CPT Stock")]])
    result={"brand":brand,"count":len(rows),"sku_match":sha([r[:1] for r in rows])==sku_hash,"title_match":sha([r[:2] for r in rows])==title_hash,"title_and_warehouse_stock_match":sha(rows)==stock_hash}
    print("OWNER_SOURCE_PARITY",json.dumps(result),flush=True)
    assert len(rows)==count and result["sku_match"],"Active SKU discrepancy: "+brand
    # Titles may be formatted differently in the promo workbook; do not replace source descriptions automatically.
    book.close()
