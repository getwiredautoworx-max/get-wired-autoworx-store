#!/usr/bin/env python3
"""Deterministic 50-image owner-review crop and Get Wired watermark sample."""
from __future__ import annotations
import csv, hashlib
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/"assets/catalogue-source-crops"
OUT=ROOT/"assets/get-wired-product-pilot"
SOURCE_CSV=ROOT/"catalogue-review/asc-catalogue-extraction/asc-product-pilot-review-only.csv"
MANIFEST=ROOT/"catalogue-review/asc-catalogue-extraction/product-image-treatment-pilot-manifest.csv"
CONTACT=ROOT/"catalogue-review/asc-catalogue-extraction/product-image-treatment-pilot-contact-sheet.jpg"
EXPECTED=50
CANVAS=(900,600)
PRODUCT_AREA_BOTTOM_RATIO=0.70
WATERMARK="GET WIRED AUTOWORX"
# Source catalogue cards contain a product photograph followed by printed
# description/model text and a blue catalogue code strip. Keep the complete
# product area (no top crop), but exclude the external caption/code region.
# This is a conservative starting boundary; the regenerated 50-image sheet
# must be inspected and any product-specific boundary corrected before approval.
PRODUCT_CROP_OVERRIDES={
    # Keep the full product bounds, then mask printed catalogue captions below.
    **{f"asc-{name}.jpg":(0.0,0.78) for name in [
        "m7-avan01","m7-con01","m7-cor01","m7-cor02","m7-gf1","m7-bme36","m7-bme46","m7-bme87",
        "9005-cbl-h","9005-h","9005-nb","9005xs","h1865w-h","h1960-55w-h","h355w-cbl","h355w-h"
    ]},
    # Heading/code strips on these fuel-pump source cards are masked, not cropped into the product.
    "asc-f1-001.jpg":(0.0,0.78),
    "asc-f1-001-e.jpg":(0.0,0.78),
    "asc-f1-028.jpg":(0.0,0.78),
}
PRODUCT_MASK_OVERRIDES={
    **{f"asc-{name}.jpg":[(0.0,0.62,1.0,0.78)] for name in [
        "m7-avan01","m7-con01","m7-cor01","m7-cor02","m7-gf1","m7-bme36","m7-bme46","m7-bme87"
    ]},
    **{f"asc-{name}.jpg":[(0.0,0.65,1.0,0.78)] for name in [
        "9005-cbl-h","9005-h","9005-nb","9005xs"
    ]},
    **{f"asc-{name}.jpg":[(0.0,0.61,1.0,0.78)] for name in [
        "h1865w-h","h1960-55w-h","h355w-cbl","h355w-h"
    ]},
    "asc-f1-001.jpg":[(0.0,0.0,1.0,0.16),(0.0,0.68,1.0,0.78)],
    "asc-f1-001-e.jpg":[(0.0,0.0,1.0,0.16),(0.0,0.68,1.0,0.78)],
    "asc-f1-028.jpg":[(0.0,0.0,1.0,0.18),(0.0,0.68,1.0,0.78)],
}

def sha256(path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""):h.update(chunk)
    return h.hexdigest()

def font(size):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf","/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"]:
        try:return ImageFont.truetype(p,size)
        except OSError:pass
    return ImageFont.load_default()

def crop_bounds(image, source_name):
    _w,h=image.size
    top_ratio,bottom_ratio=PRODUCT_CROP_OVERRIDES.get(source_name,(0.0,PRODUCT_AREA_BOTTOM_RATIO))
    top=int(round(h*top_ratio))
    bottom=int(round(h*bottom_ratio))
    if top < 0 or bottom <= int(h*.60) or bottom > h or top >= bottom:
        raise ValueError(f"Unsafe product-area boundary for {source_name}: {top}:{bottom}/{h}")
    return top,bottom,"PRODUCT_PHOTO_AREA_WITH_EXTERNAL_CAPTION_CODE_MASKS_PENDING_VISUAL_QA"

def treat(src,dst):
    with Image.open(src) as original:
        im=ImageOps.exif_transpose(original).convert("RGB")
        w,h=im.size
        top,bottom,method=crop_bounds(im,src.name)
        if top < 0 or bottom <= int(h*.60) or bottom > h or top >= bottom:
            raise ValueError(f"Unsafe product-area crop boundary: {src.name}")
        crop=im.crop((0,top,w,bottom))
        masks=PRODUCT_MASK_OVERRIDES.get(src.name,[])
        if masks:
            mask_draw=ImageDraw.Draw(crop)
            for x1,y1,x2,y2 in masks:
                left=int(round(w*x1)); upper=max(0,int(round(h*y1))-top)
                right=int(round(w*x2)); lower=min(crop.height,int(round(h*y2))-top)
                if lower>upper and right>left:
                    mask_draw.rectangle((left,upper,right,lower),fill=(255,255,255))
        contained=ImageOps.contain(crop,(860,540),method=Image.Resampling.LANCZOS)
        canvas=Image.new("RGB",CANVAS,(255,255,255))
        canvas.paste(contained,((CANVAS[0]-contained.width)//2,(CANVAS[1]-contained.height)//2))
        layer=Image.new("RGBA",CANVAS,(0,0,0,0))
        f=font(30);bb=f.getbbox(WATERMARK,stroke_width=1)
        txt=Image.new("RGBA",(bb[2]-bb[0]+40,bb[3]-bb[1]+28),(0,0,0,0))
        ImageDraw.Draw(txt).text((20-bb[0],14-bb[1]),WATERMARK,font=f,fill=(4,55,91,100),stroke_width=1,stroke_fill=(255,255,255,130))
        rot=txt.rotate(12,resample=Image.Resampling.BICUBIC,expand=True)
        layer.alpha_composite(rot,((CANVAS[0]-rot.width)//2,(CANVAS[1]-rot.height)//2))
        result=Image.alpha_composite(canvas.convert("RGBA"),layer).convert("RGB")
        dst.parent.mkdir(parents=True,exist_ok=True)
        result.save(dst,format="JPEG",quality=94,optimize=True,progressive=True)
        return (w,h),top,bottom,method

def main():
    with SOURCE_CSV.open(newline="",encoding="utf-8-sig") as f:rows=list(csv.DictReader(f))
    if len(rows)!=EXPECTED:raise SystemExit(f"Expected {EXPECTED} source rows, got {len(rows)}")
    if len({r["asc_sku"].strip() for r in rows})!=EXPECTED:raise SystemExit("Duplicate/blank ASC SKU")
    if len({Path(r["image_file"]).name for r in rows})!=EXPECTED:raise SystemExit("Duplicate/blank image filename")
    OUT.mkdir(parents=True,exist_ok=True)
    manifest=[];items=[]
    for i,row in enumerate(rows,1):
        sid=f"GW-PILOT-{i:03d}"
        source=RAW/Path(row["image_file"]).name
        if not source.is_file():raise SystemExit(f"Missing source crop: {source}")
        name=sid+".jpg";dest=OUT/name
        dims,top,bottom,method=treat(source,dest)
        manifest.append({"sample_id":sid,"asc_sku_reference_only":row["asc_sku"],"source_file":row["source_file"],"source_page":row["source_page"],"product_name_as_printed":row["product_name_as_printed"],"source_image_file":source.name,"output_image_file":name,"source_sha256":sha256(source),"output_sha256":sha256(dest),"source_dimensions":f"{dims[0]}x{dims[1]}","output_dimensions":f"{CANVAS[0]}x{CANVAS[1]}","crop_top_px":top,"crop_bottom_px":bottom,"crop_method":method,"treatment_status":"OUTER_CATALOGUE_TEXT_CROPPED_BY_SOURCE_CARD_LAYOUT; GET_WIRED_WATERMARK_OVERLAID_ON_SOURCE_WATERMARK; OWNER_VISUAL_QA_PENDING","release_status":"REVIEW_ONLY_NOT_IMPORTED"})
        items.append((sid,row["product_name_as_printed"],dest))
    with MANIFEST.open("w",newline="",encoding="utf-8") as f:
        writer=csv.DictWriter(f,fieldnames=list(manifest[0].keys()));writer.writeheader();writer.writerows(manifest)
    cols,rows_n,cw,ch=5,10,220,166
    sheet=Image.new("RGB",(cols*cw,rows_n*ch),(242,246,250));draw=ImageDraw.Draw(sheet);lf=font(10)
    for i,(sid,title,path) in enumerate(items):
        x,y=(i%cols)*cw,(i//cols)*ch
        with Image.open(path) as im:
            thumb=ImageOps.contain(im.convert("RGB"),(200,126),method=Image.Resampling.LANCZOS)
            sheet.paste(thumb,(x+(cw-thumb.width)//2,y+3))
        draw.text((x+8,y+134),f"{sid} | {title[:12]}",font=lf,fill=(15,45,70))
    CONTACT.parent.mkdir(parents=True,exist_ok=True);sheet.save(CONTACT,format="JPEG",quality=88,optimize=True)
    if len(list(OUT.glob("GW-PILOT-*.jpg")))!=EXPECTED:raise SystemExit("Output count is not 50")
    print(f"PRODUCT_IMAGE_TREATMENT_SAMPLE_PASS images={EXPECTED} product_area_bottom_ratio={PRODUCT_AREA_BOTTOM_RATIO} per_image_crop_overrides={len(PRODUCT_CROP_OVERRIDES)} per_image_mask_overrides={len(PRODUCT_MASK_OVERRIDES)} watermark=GET_WIRED_AUTOWORX visual_qa_required=1")

if __name__=="__main__":main()
