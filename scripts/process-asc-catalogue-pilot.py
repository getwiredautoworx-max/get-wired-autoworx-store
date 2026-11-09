#!/usr/bin/env python3
from __future__ import annotations
import csv, hashlib
from collections import defaultdict
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import pytesseract
from pytesseract import Output

ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/"assets/asc-catalogue-pilot-raw"
OUT=ROOT/"assets/asc-catalogue-pilot-treated"
SOURCE_CSV=ROOT/"catalogue-review/asc-catalogue-extraction/asc-product-pilot-review-only.csv"
MANIFEST=ROOT/"catalogue-review/asc-catalogue-extraction/asc-image-treatment-pilot-manifest.csv"
CONTACT=ROOT/"catalogue-review/asc-catalogue-extraction/asc-image-treatment-pilot-contact-sheet.jpg"
EXPECTED=50
CANVAS=(900,600)
WATERMARK="GET WIRED AUTOWORX"

def sha256(path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""): h.update(chunk)
    return h.hexdigest()

def font(size):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf","/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"]:
        try: return ImageFont.truetype(p,size)
        except OSError: pass
    return ImageFont.load_default()

def ocr_lines(im):
    w,h=im.size
    data=pytesseract.image_to_data(im.resize((w*3,h*3),Image.Resampling.LANCZOS).convert("L"),config="--psm 6",output_type=Output.DICT)
    groups=defaultdict(list)
    for i,raw in enumerate(data["text"]):
        word=str(raw).strip()
        try: conf=float(data["conf"][i])
        except (TypeError,ValueError): conf=-1
        if not word or conf<22: continue
        key=(data["block_num"][i],data["par_num"][i],data["line_num"][i])
        x,y,bw,bh=(int(data[k][i]/3) for k in ("left","top","width","height"))
        groups[key].append((word,x,y,bw,bh))
    out=[]
    for words in groups.values():
        out.append({"text":" ".join(x[0] for x in words),"x0":min(x[1] for x in words),"y0":min(x[2] for x in words),"x1":max(x[1]+x[3] for x in words),"y1":max(x[2]+x[4] for x in words)})
    return sorted(out,key=lambda x:(x["y0"],x["x0"]))

def blue_label_bottom(im):
    w,h=im.size
    hits=[]
    for y in range(max(1,int(h*.44))):
        n=0
        for x in range(w):
            r,g,b=im.getpixel((x,y))[:3]
            if b>105 and b>r*1.45 and b>g*1.15: n+=1
        if n/w>=.52: hits.append(y)
    if not hits:return 0
    groups=[]; start=prev=hits[0]
    for y in hits[1:]:
        if y>prev+2: groups.append((start,prev));start=y
        prev=y
    groups.append((start,prev))
    valid=[b for a,b in groups if b-a>=8 and b<h*.44]
    return max((b+4 for b in valid),default=0)

def crop_bounds(im):
    w,h=im.size
    lines=ocr_lines(im)
    top=blue_label_bottom(im)
    bottom=h
    for line in lines:
        span=line["x1"]-line["x0"]
        if line["y0"]>=h*.55 and span>=w*.25: bottom=min(bottom,line["y0"]-18)
    
    top=max(0,min(top,int(h*.48)))
    bottom=max(top+int(h*.30),min(bottom,h))
    return top,bottom,lines

def treat(src,dst):
    with Image.open(src) as original:
        im=ImageOps.exif_transpose(original).convert("RGB")
        w,h=im.size
        top,bottom,lines=crop_bounds(im)
        crop=im.crop((0,top,w,bottom))
        contained=ImageOps.contain(crop,(860,540),method=Image.Resampling.LANCZOS)
        canvas=Image.new("RGB",CANVAS,(255,255,255))
        canvas.paste(contained,((CANVAS[0]-contained.width)//2,(CANVAS[1]-contained.height)//2))
        layer=Image.new("RGBA",CANVAS,(0,0,0,0))
        f=font(30); bb=f.getbbox(WATERMARK,stroke_width=1)
        txt=Image.new("RGBA",(bb[2]-bb[0]+40,bb[3]-bb[1]+28),(0,0,0,0))
        ImageDraw.Draw(txt).text((20-bb[0],14-bb[1]),WATERMARK,font=f,fill=(4,55,91,100),stroke_width=1,stroke_fill=(255,255,255,130))
        rot=txt.rotate(12,resample=Image.Resampling.BICUBIC,expand=True)
        layer.alpha_composite(rot,((CANVAS[0]-rot.width)//2,(CANVAS[1]-rot.height)//2))
        result=Image.alpha_composite(canvas.convert("RGBA"),layer).convert("RGB")
        dst.parent.mkdir(parents=True,exist_ok=True)
        result.save(dst,format="JPEG",quality=94,optimize=True,progressive=True)
        return (w,h),top,bottom,[x["text"] for x in lines]

def main():
    with SOURCE_CSV.open(newline="",encoding="utf-8-sig") as f: rows=list(csv.DictReader(f))
    if len(rows)!=EXPECTED: raise SystemExit(f"Expected {EXPECTED} source rows, got {len(rows)}")
    if len({r["asc_sku"].strip() for r in rows})!=EXPECTED: raise SystemExit("Duplicate/blank ASC SKU")
    if len({Path(r["image_file"]).name for r in rows})!=EXPECTED: raise SystemExit("Duplicate/blank image filename")
    OUT.mkdir(parents=True,exist_ok=True)
    manifest=[]; items=[]
    for i,row in enumerate(rows,1):
        sid=f"GW-ASC-PILOT-{i:03d}"
        source=RAW/Path(row["image_file"]).name
        if not source.is_file(): raise SystemExit(f"Missing source crop {source}")
        outname=sid+".jpg"; dest=OUT/outname
        dims,top,bottom,ocr=treat(source,dest)
        manifest.append({"sample_id":sid,"asc_sku_reference_only":row["asc_sku"],"source_file":row["source_file"],"source_page":row["source_page"],"product_name_as_printed":row["product_name_as_printed"],"source_image_file":source.name,"output_image_file":outname,"source_sha256":sha256(source),"output_sha256":sha256(dest),"source_dimensions":f"{dims[0]}x{dims[1]}","output_dimensions":f"{CANVAS[0]}x{CANVAS[1]}","crop_top_px":top,"crop_bottom_px":bottom,"ocr_outer_text_detected":" | ".join(ocr),"treatment_status":"OUTER_CAPTION_AND_CODE_LABEL_CROPPED_WHERE_DETECTED; GET_WIRED_WATERMARK_OVERLAID_ON_SOURCE_WATERMARK; OWNER_VISUAL_QA_PENDING","release_status":"REVIEW_ONLY_NOT_IMPORTED"})
        items.append((sid,row["product_name_as_printed"],dest))
    with MANIFEST.open("w",newline="",encoding="utf-8") as f:
        writer=csv.DictWriter(f,fieldnames=list(manifest[0].keys()));writer.writeheader();writer.writerows(manifest)
    cols,rows_n,cw,ch=5,10,220,166
    sheet=Image.new("RGB",(cols*cw,rows_n*ch),(242,246,250));draw=ImageDraw.Draw(sheet);lf=font(12)
    for i,(sid,title,path) in enumerate(items):
        x,y=(i%cols)*cw,(i//cols)*ch
        with Image.open(path) as im:
            thumb=ImageOps.contain(im.convert("RGB"),(200,126),method=Image.Resampling.LANCZOS)
            sheet.paste(thumb,(x+(cw-thumb.width)//2,y+3))
        draw.text((x+8,y+134),f"{sid}  {title[:24]}",font=lf,fill=(15,45,70))
    CONTACT.parent.mkdir(parents=True,exist_ok=True);sheet.save(CONTACT,format="JPEG",quality=88,optimize=True)
    if len(list(OUT.glob("GW-ASC-PILOT-*.jpg")))!=EXPECTED: raise SystemExit("Output count is not 50")
    print(f"ASC_IMAGE_TREATMENT_SAMPLE_PASS images={EXPECTED} OCR_outer_crop=true watermark=GET_WIRED_AUTOWORX")

if __name__=="__main__": main()
