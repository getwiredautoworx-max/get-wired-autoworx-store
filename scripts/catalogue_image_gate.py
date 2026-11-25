"""Reusable, fail-closed supplier image audit; never publish supplier workbooks."""
import argparse, concurrent.futures, hashlib, io, json, re
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from openpyxl import load_workbook
from PIL import Image

def check_image(url):
    if not isinstance(url,str) or urlparse(url).scheme!="https" or not urlparse(url).hostname:
        raise ValueError("Missing or invalid HTTPS image URL")
    with urlopen(Request(url,headers={"User-Agent":"Mozilla/5.0"}),timeout=20) as response:
        if not response.headers.get_content_type().startswith("image/"):
            raise ValueError("Response is not an image")
        data=response.read(20*1024*1024+1)
    if len(data)>20*1024*1024: raise ValueError("Image exceeds size limit")
    with Image.open(io.BytesIO(data)) as im:
        im.verify()
    with Image.open(io.BytesIO(data)) as im:
        im.load()
        if min(im.size)<100: raise ValueError("Image too small")
    return hashlib.sha256(data).hexdigest()

def audit(source, output, sheet_name, sku_col, image_col, status_col, active, repairs, checker=check_image):
    source,output=Path(source),Path(output)
    if source.resolve()==output.resolve() or output.exists():
        raise ValueError("Output must be a separate new workbook")
    original=load_workbook(source)
    book=load_workbook(source)
    sheet=book[sheet_name]
    headers={c.value:c.column for c in sheet[1]}
    if len(headers)!=len(sheet[1]): raise ValueError("Duplicate column headers")
    sku_i,img_i,status_i=[headers[k] for k in (sku_col,image_col,status_col)]
    rows=[]
    seen=set()
    for i in range(2,sheet.max_row+1):
        if str(sheet.cell(i,status_i).value or "").strip().casefold()!=active.casefold(): continue
        sku=str(sheet.cell(i,sku_i).value or "").strip()
        if not sku or sku in seen: raise ValueError("Missing or duplicate active SKU")
        seen.add(sku)
        rows.append((i,sku,sheet.cell(i,img_i).value))
    if not rows: raise ValueError("No active products")
    if set(repairs)-seen: raise ValueError("Repair SKU not present in active rows")
    def inspect(row):
        i,sku,old=row
        # Preserve every valid existing image except explicitly owner-identified replacements.
        candidate=repairs.get(sku,old)
        try: return i,sku,candidate,checker(candidate),""
        except Exception as exc: return i,sku,candidate,"",type(exc).__name__
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        results=list(pool.map(inspect,rows))
    failures=[sku for i,sku,url,digest,error in results if error]
    if failures: raise ValueError("Unresolved image SKUs: "+", ".join(failures))
    changed=set()
    for i,sku,url,digest,error in results:
        if sheet.cell(i,img_i).value!=url:
            sheet.cell(i,img_i).value=url
            changed.add((sheet_name,i,img_i))
    output.parent.mkdir(parents=True,exist_ok=True)
    book.save(output)
    checked=load_workbook(output)
    assert original.sheetnames==checked.sheetnames
    for before in original:
        after=checked[before.title]
        assert (before.max_row,before.max_column)==(after.max_row,after.max_column)
        for row in before:
            for cell in row:
                if (before.title,cell.row,cell.column) not in changed:
                    assert cell.value==after[cell.coordinate].value
                else:
                    assert after[cell.coordinate].value==book[before.title][cell.coordinate].value
    return {"active":len(rows),"available":len(results),"repaired":len(changed),"cell_preservation":True}

if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("source")
    parser.add_argument("output")
    parser.add_argument("--sheet",required=True)
    parser.add_argument("--sku",required=True)
    parser.add_argument("--image",required=True)
    parser.add_argument("--status",required=True)
    parser.add_argument("--active",default="Active")
    parser.add_argument("--repairs",default="{}")
    args=parser.parse_args()
    print(json.dumps(audit(args.source,args.output,args.sheet,args.sku,args.image,args.status,args.active,json.loads(args.repairs))))
