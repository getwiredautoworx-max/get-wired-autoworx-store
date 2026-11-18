#!/usr/bin/env python3
"""Create customer-safe Auto Electrical preview images from reviewed source crops."""
from __future__ import annotations
import csv, hashlib, json, shutil, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT=Path(__file__).resolve().parents[1]
SOURCE_CSV=ROOT/"suppliers/Electrocity/catalogue-work/ignition-looms-modules/normalised-review.csv"
SOURCE_DIR=ROOT/"suppliers/Electrocity/catalogue-work/ignition-looms-modules/page-evidence"
OUT=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/"assets/auto-electrical-products"
REVIEW=ROOT/"catalogue-review"
MANIFEST=REVIEW/"electrocity-auto-electrical-image-manifest.json"
CONTACT=REVIEW/"electrocity-auto-electrical-contact-sheet.jpg"
CONTACT_PUBLIC=OUT/"image-review-contact-sheet.jpg"
EXPECTED_SOURCE_ROWS=29
EXPECTED_OUTPUTS=27
EXCLUDED={
 "GWA-EC-000012":"source discrepancy — keep quarantined pending supplier clarification",
 "GWA-EC-000022":"supplier SKU and OEM/model identifier collide — keep quarantined pending code-role resolution",
}
CANVAS=(900,600)
WATERMARK="GET WIRED AUTOWORX"

def sha256(path:Path)->str:
 h=hashlib.sha256()
 with path.open("rb") as f:
  for chunk in iter(lambda:f.read(1024*1024),b""):h.update(chunk)
 return h.hexdigest()

def font(size:int):
 for p in ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf","/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"):
  try:return ImageFont.truetype(p,size)
  except OSError:pass
 return ImageFont.load_default()

def public_fields_safe(row:dict)->None:
 sku=(row.get("electrocity_sku") or "").strip().casefold()
 visible=" ".join(row.get(k,"") or "" for k in ("manufacturer_model","oem_part_number","normalised_description_candidate","variant","brand")).casefold()
 if sku and sku in visible:
  raise ValueError(f"Internal supplier SKU collision must remain excluded: {row.get('provisional_gw_id')}")

def main():
 with SOURCE_CSV.open(newline="",encoding="utf-8-sig") as f: rows=list(csv.DictReader(f))
 if len(rows)!=EXPECTED_SOURCE_ROWS: raise SystemExit(f"Expected {EXPECTED_SOURCE_ROWS} reviewed source rows, got {len(rows)}")
 ids={r.get("provisional_gw_id","") for r in rows}
 if not set(EXCLUDED).issubset(ids): raise SystemExit("Required quarantine records are missing from source register")
 eligible=[]
 for row in rows:
  if row.get("provisional_gw_id") in EXCLUDED: continue
  if row.get("qa_status")!="REVIEW_PASSED" or row.get("image_match_status")!="VERIFIED_EXACT":
   raise SystemExit("Unapproved image or QA state: "+row.get("provisional_gw_id",""))
  public_fields_safe(row)
  eligible.append(row)
 if len(eligible)!=EXPECTED_OUTPUTS: raise SystemExit(f"Expected {EXPECTED_OUTPUTS} preview-eligible rows, got {len(eligible)}")
 if OUT.exists(): shutil.rmtree(OUT)
 OUT.mkdir(parents=True,exist_ok=True)
 manifest_rows=[]
 contact_items=[]
 for index,row in enumerate(eligible,1):
  source=SOURCE_DIR/Path(row.get("image_source","")).name
  if not source.is_file(): raise SystemExit("Missing exact product evidence crop: "+source.name)
  with Image.open(source) as original:
   im=ImageOps.exif_transpose(original).convert("RGB")
   w,h=im.size
   if w<300 or h<300: raise SystemExit(f"Unexpectedly small source crop: {source.name} {w}x{h}")
   # The source template places the product between the printed heading and
   # the supplier-code footer. This crop preserves the entire central photo
   # region while excluding both text bands and the outer page border.
   left=int(round(w*0.05)); right=int(round(w*0.95))
   top=int(round(h*0.16)); bottom=int(round(h*0.78))
   if bottom<=top or bottom-top < int(h*0.60): raise SystemExit("Unsafe product crop bounds: "+source.name)
   crop=im.crop((left,top,right,bottom))
   contained=ImageOps.contain(crop,(860,540),method=Image.Resampling.LANCZOS)
   canvas=Image.new("RGB",CANVAS,(255,255,255))
   canvas.paste(contained,((CANVAS[0]-contained.width)//2,(CANVAS[1]-contained.height)//2))
   draw=ImageDraw.Draw(canvas)
   draw.text((CANVAS[0]-225,CANVAS[1]-22),WATERMARK,font=font(14),fill=(4,55,91))
   result=canvas
   preview_id=f"auto-electrical-{index:03d}"
   output_name=preview_id+".jpg"
   output=OUT/output_name
   result.save(output,format="JPEG",quality=94,optimize=True,progressive=True)
   category=row.get("proposed_store_subcategory","")
   manifest_rows.append({
    "previewId":preview_id,
    "category":category,
    "sourceImageSha256":sha256(source),
    "outputImageSha256":sha256(output),
    "sourceDimensions":f"{w}x{h}",
    "outputDimensions":f"{CANVAS[0]}x{CANVAS[1]}",
    "cropBoundsPx":{"left":left,"top":top,"right":right,"bottom":bottom},
    "treatmentStatus":"SOURCE_HEADER_AND_SUPPLIER_CODE_FOOTER_EXCLUDED; PRODUCT_PHOTO_AREA_PRESERVED; GET_WIRED_WATERMARK_APPLIED; REVIEW_ONLY"
   })
   thumb=ImageOps.contain(result,(220,145),method=Image.Resampling.LANCZOS)
   contact_items.append((preview_id,category,thumb.copy()))
 REVIEW.mkdir(parents=True,exist_ok=True)
 contact=Image.new("RGB",(4*240,7*180),(245,248,251))
 draw=ImageDraw.Draw(contact); label_font=font(15)
 for i,(preview_id,category,thumb) in enumerate(contact_items):
  col=i%4; row=i//4; x=col*240; y=row*180
  contact.paste(thumb,(x+(220-thumb.width)//2,y+4))
  draw.text((x+10,y+151),preview_id,font=label_font,fill=(15,48,73))
  draw.text((x+10,y+166),category,font=font(12),fill=(75,96,112))
 contact.save(CONTACT,format="JPEG",quality=90,optimize=True)
 contact.save(CONTACT_PUBLIC,format="JPEG",quality=90,optimize=True)
 manifest={"status":"OWNER_PREVIEW_ONLY — REVIEW ONLY — DO NOT IMPORT","count":len(manifest_rows),"records":manifest_rows}
 MANIFEST.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print(f"AUTO_ELECTRICAL_IMAGE_TREATMENT_PASS images={len(manifest_rows)} excluded={len(EXCLUDED)} output={OUT}")
 print(f"AUTO_ELECTRICAL_CONTACT_SHEET {CONTACT}")
 print(f"AUTO_ELECTRICAL_IMAGE_MANIFEST {MANIFEST}")

if __name__=="__main__": main()
