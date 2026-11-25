"""Generate review-only contact sheets from retained candidate evidence; never auto-approve."""
import concurrent.futures, hashlib, io, json, textwrap
from pathlib import Path
from urllib.request import Request,urlopen
from PIL import Image,ImageDraw,ImageFont

src=Path("/tmp/planetworld-batch-image-evidence.json")
out=Path("/tmp/planetworld-photo-review")
out.mkdir(exist_ok=True)
rows=json.loads(src.read_text())
assert len(rows)==521
rows=[r for r in rows if r["status"]=="REPLACEMENT_CANDIDATE"]
assert len(rows)==116
rows.sort(key=lambda r:(r["brand"],r["sku"]))
def thumbnail(r):
    try:
        with urlopen(Request(r["resolved"],headers={"User-Agent":"Mozilla/5.0"}),timeout=20) as response:
            assert response.headers.get_content_type().startswith("image/")
            raw=response.read(20*1024*1024+1)
        assert len(raw)<=20*1024*1024
        assert hashlib.sha256(raw).hexdigest()==r["digest"],"Image content changed since last audit"
        im=Image.open(io.BytesIO(raw)).convert("RGBA")
        assert min(im.size)>=100
        im.thumbnail((290,170))
        return im,""
    except Exception as e:
        return None,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
    result=list(pool.map(thumbnail,rows))
font=ImageFont.load_default(size=16)
small=ImageFont.load_default(size=14)
for start in range(0,len(rows),16):
    sheet=Image.new("RGB",(1280,1120),"white")
    draw=ImageDraw.Draw(sheet)
    for i,(r,(im,error)) in enumerate(zip(rows[start:start+16],result[start:start+16])):
        x=(i%4)*320;y=(i//4)*280
        draw.rectangle((x,y,x+319,y+279),outline="#aaaaaa")
        if im is not None: sheet.paste(im,(x+(320-im.width)//2,y+8),im)
        else: draw.text((x+15,y+65),"IMAGE UNAVAILABLE OR CHANGED",font=small,fill="red")
        draw.text((x+8,y+182),f"{start+i+1:03d} {r['sku']}",font=font,fill="black")
        title="\n".join(textwrap.wrap(r["title"],37)[:3])
        draw.multiline_text((x+8,y+207),title,font=small,fill="black",spacing=3)
    sheet.save(out/f"sheet-{start//16+1:02d}.jpg",quality=87)
report=[{"index":i+1,"gwa":r["gwa"],"title":r["title"],"url":r["resolved"],"source":r["source"],"sha256":r["digest"],"download_error":error} for i,(r,(_,error)) in enumerate(zip(rows,result))]
(out/"manifest.json").write_text(json.dumps(report,indent=2))
print("PHOTO_REVIEW_SHEETS_READY",len(rows),"download errors",sum(bool(e) for _,e in result))
