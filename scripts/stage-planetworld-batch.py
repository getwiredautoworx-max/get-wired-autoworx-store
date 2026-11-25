"""Prepare a combined nonproduction Car Audio catalogue. No deployment or database writes."""
import collections, io, json, math, os, re, zipfile
from pathlib import Path
from urllib.parse import quote, urlparse
from openpyxl import load_workbook

ROOT=Path("pages-public")
ARCHIVE=Path("suppliers/Planetworld/get-wired-autoworx-car-audio-all-11-brands-in-stock.zip")
BRANDS={"Alpine":"Alpine","Amplified":"Amplified","Audison":"Audison","DrArtex":"DrArtex","Focal Car Audio":"Focal","Harness and Trims":"Harness & Trims","Hertz":"Hertz","JVC Car Audio":"JVC","Kenwood Car Audio":"Kenwood","One":"ONE","Pioneer Car Audio":"Pioneer"}
CATEGORY={
    "Amplifiers":"Amplifiers",
    "Head Units, Infotainment & Cameras":"Head Units & Media Players",
    "Head Units, Screens & Media Players":"Head Units & Media Players",
    "Car Speakers & Tweeters":"Speakers & Component Kits",
    "DSP, Processors & Controllers":"Signal Processing & Crossovers",
    "Grilles, Mounts & Accessories":"Grilles, Mounts & Accessories",
    "Wiring, Harnesses & Adapters":"Wiring Kits",
    "Subwoofers (Drivers)":"Subwoofers (Drivers)",
    "Subwoofer Enclosures & Powered Subs":"Subwoofer Enclosures & Powered Subs",
    "Car Audio Accessories":"Accessories",
    "Sound Deadening & Acoustic Treatment":"Sound Deadening & Acoustic Treatment",
    "Fascia Trims & Installation Kits":"Trims",
    "Cameras, Dash Cams & Parking Sensors":"Cameras & Monitors",
}
def main():
    assert json.loads((ROOT/"qa-build-result.json").read_text())["preview_only"] is True
    target=ROOT/"assets/audio-catalogue-primary-preview.json"
    data=json.loads(target.read_text())
    kicker=data["records"]
    assert len(kicker)==172 and all(p["brand"]=="Kicker" for p in kicker)
    rows=[]; seen=set(); models=set()
    evidence_path=Path("/tmp/planetworld-batch-image-evidence.json")
    evidence={}
    review_mode=os.getenv("GW_BATCH_OWNER_REVIEW")=="1"
    if evidence_path.exists():
        evidence={x["gwa"]:x for x in json.loads(evidence_path.read_text())}
    with zipfile.ZipFile(ARCHIVE) as z:
        assert len(z.namelist())==11
        for name in z.namelist():
            assert name.endswith(".xlsx") and "/" not in name
            book=load_workbook(io.BytesIO(z.read(name)),read_only=True,data_only=True)
            sheet=book["Store_Catalog_Upload"]; it=iter(sheet.values); h=next(it)
            for idx,row in enumerate(it,2):
                d=dict(zip(h,row))
                assert str(d["Publish Status"]).strip().casefold()=="active"
                sku=str(d["Supplier SKU Reference"] or "").strip()
                gwa=str(d["Get Wired Auto SKU"] or "").strip()
                vendor=str(d["Vendor / Brand"]).strip()
                brand=BRANDS[vendor]
                title=str(d["Product Title"] or "").strip()
                desc=str(d["Product Description"] or "").strip()
                price=d["Store Price (Incl VAT)"]; stock=d["Total Stock"]
                assert sku and gwa and title and desc and gwa.casefold() not in seen
                assert (brand.casefold(),sku.casefold()) not in models
                assert isinstance(price,(int,float)) and math.isfinite(price) and price>0
                assert isinstance(stock,(int,float)) and stock>0 and stock==sum(d[k] or 0 for k in ("JHB Stock","DBN Stock","CPT Stock"))
                seen.add(gwa.casefold()); models.add((brand.casefold(),sku.casefold()))
                original=d["Product Category"]; component=CATEGORY[original]
                if original=="Head Units, Infotainment & Cameras" and re.search(r"\b(camera|dash cam|parking sensor)\b",title,re.I):
                    component="Cameras & Monitors"
                if original=="Wiring, Harnesses & Adapters":
                    if vendor in ("Harness and Trims","One") or re.search(r"\b(harness|loom|canbus|can bus|fakra|iso2car|iso adapter)\b",title,re.I):
                        component="Harnesses"
                if original=="Amplifiers" and re.search(r"\b(?:wiring kit|amplifier installation kit|amp wiring kit|rca adapter)\b",title,re.I):
                    component="Wiring Kits"
                item=evidence.get(gwa,{})
                # Only original available or explicitly reviewed replacements can pass release.
                verified=item.get("status") in ("ORIGINAL_AVAILABLE","REPLACEMENT_APPROVED")
                candidate=item.get("status")=="REPLACEMENT_CANDIDATE"
                if review_mode:
                    assert item and item["sku"]==sku and item["brand"]==vendor and item["title"]==title, (gwa,"evidence mismatch")
                    image=str(item.get("resolved") or "") if verified or candidate else ""
                else:
                    image=str(item.get("resolved") if verified else d["Product Image URL"] or "").strip()
                image=quote(image,safe=":/?&=%+#@!$'()*+,;[]") if urlparse(image).scheme=="https" and urlparse(image).hostname else "assets/product-placeholder.svg"
                rows.append(dict(brand=brand,brandDisplayName=brand,title=title,description=desc,modelNumber=sku,getWiredSku=gwa,supplierBrand=vendor,sourceCategory=original,component=component,collection="Car Audio & Video",division="Car Audio",indicativePrice=price,compareAtPrice=d["Compare-At Price (Incl VAT)"],stockSnapshot=stock,hasStock=True,imageUrl=image,imageStatus="workbook_image_candidate_review_only",publicationStatus="PREVIEW_ONLY_NOT_LIVE",imageGatePassed=verified,imageReviewState=("approved_or_available" if verified else "candidate_pending_review" if candidate else "photo_pending")))
            book.close()
    assert len(rows)==521
    assert not any((p["brand"].casefold(),p["modelNumber"].casefold()) in models for p in kicker)
    data["records"]=kicker+rows
    target.write_text(json.dumps(data,ensure_ascii=False))
    # Use the approved source brand name ONE, not a claim about individual OneNav/OneX model identities.
    for name in ("preview-audio.html","preview-audio-brand.html","preview-audio-products.html"):
        path=ROOT/name
        s=path.read_text().replace("One (unverified family)","ONE")
        s=s.replace("Browse the imported Kicker catalogue.","Browse the imported car audio catalogue.")
        if review_mode:
            s=s.replace("Owner-authorised source image — review-only preview","Image source — review-only preview")
            s=s.replace("media.append(note)","if(p.imageReviewState===\"candidate_pending_review\")note.textContent=\"Replacement photo — exact model review pending\";if(p.imageReviewState===\"photo_pending\")note.textContent=\"Exact product photo pending\";media.append(note)")
            s=s.replace("if(imageSrc){const img=", "if(imageSrc&&!imageSrc.includes(\"product-placeholder.svg\")){const img=")
            s=s.replace("&&p.imageUrl);const sharedTypeImage", "&&p.imageUrl&&!p.imageUrl.includes(\"placeholder\"));const sharedTypeImage")
            s=s.replace("&&p.imageUrl);const imageSrc=", "&&p.imageUrl&&!p.imageUrl.includes(\"placeholder\"));const imageSrc=")
        path.write_text(s)
    if review_mode:
        assert len(evidence)==521
        p=ROOT/"owner-preview.html"
        s=p.read_text()
        s=s.replace("<body>","<body><div style='padding:10px;background:#fff3cd;color:#352600;font:14px Arial,sans-serif'>OWNER REVIEW ONLY — 693 products; replacement photographs and missing images are still under review. Not a live stock release.</div>",1)
        p.write_text(s)
    for p in ROOT.glob("kicker-*.xlsx"): p.unlink()
    assert not list(ROOT.rglob("*.xlsx"))
    pending=sum(not p["imageGatePassed"] for p in rows)
    report={"kicker":172,"new":521,"total":693,"brands":dict(collections.Counter(x["brand"] for x in rows)),"image_gate_pending":pending,"deployable":pending==0}
    Path("/tmp/planetworld-stage-result.json").write_text(json.dumps(report))
    print("PLANETWORLD_STAGE_RESULT",json.dumps(report),flush=True)
    assert json.loads(target.read_text())["records"][:172]==kicker
if __name__=="__main__": main()
