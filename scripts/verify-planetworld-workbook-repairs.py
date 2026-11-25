"""Verify approved image-only workbook repairs without modifying sources or publishing XLSX.

An incomplete image set is not final acceptance. Retain an explicit per-model exception
register and test the workbook preservation mechanism using approved repairs only.
"""
import collections, hashlib, io, json, zipfile
from pathlib import Path
from openpyxl import load_workbook

ARCHIVE=Path("suppliers/Planetworld/get-wired-autoworx-car-audio-all-11-brands-in-stock.zip")
EVIDENCE=Path("/tmp/planetworld-batch-image-evidence.json")

def main():
    source_hash=hashlib.sha256(ARCHIVE.read_bytes()).hexdigest()
    evidence=json.loads(EVIDENCE.read_text())
    by_key={r["gwa"]:r for r in evidence}
    assert len(by_key)==len(evidence)==521
    seen=set(); changed=0; reports=[]; exceptions=[]
    with zipfile.ZipFile(ARCHIVE) as z:
        assert len(z.namelist())==11
        for name in z.namelist():
            raw=z.read(name)
            original=load_workbook(io.BytesIO(raw))
            working=load_workbook(io.BytesIO(raw))
            sheet=working["Store_Catalog_Upload"]
            headers={c.value:c.column for c in sheet[1]}
            assert len(headers)==len(sheet[1])
            allowed={}
            for i in range(2,sheet.max_row+1):
                val=lambda key: sheet.cell(i,headers[key]).value
                assert str(val("Publish Status")).strip().casefold()=="active"
                gwa=str(val("Get Wired Auto SKU")).strip()
                r=by_key[gwa]
                assert gwa not in seen and r["workbook"]==name and r["row"]==i
                assert r["sku"]==str(val("Supplier SKU Reference")).strip()
                assert r["title"]==str(val("Product Title")).strip()
                assert r["brand"]==str(val("Vendor / Brand")).strip()
                assert r.get("image")==val("Product Image URL")
                seen.add(gwa)
                if r["status"]=="REPLACEMENT_APPROVED":
                    assert r.get("resolved","").startswith("https://")
                    assert len(r.get("digest",""))==64
                    cell=sheet.cell(i,headers["Product Image URL"])
                    if cell.value!=r["resolved"]:
                        allowed[(sheet.title,i,cell.column)]=r["resolved"]
                        cell.value=r["resolved"]
                elif r["status"]!="ORIGINAL_AVAILABLE":
                    exceptions.append({"gwa":gwa,"status":r["status"]})
            buffer=io.BytesIO()
            working.save(buffer); buffer.seek(0)
            repaired=load_workbook(buffer)
            assert original.sheetnames==repaired.sheetnames
            for before in original:
                after=repaired[before.title]
                assert (before.max_row,before.max_column)==(after.max_row,after.max_column)
                for row in before:
                    for cell in row:
                        key=(before.title,cell.row,cell.column)
                        assert after[cell.coordinate].value==allowed.get(key,cell.value), (name,key)
                        assert after[cell.coordinate].data_type==cell.data_type or key in allowed
            changed+=len(allowed)
            reports.append({"workbook":name,"approved_image_changes":len(allowed),"all_other_cells_preserved":True})
            original.close(); working.close(); repaired.close()
    assert seen==set(by_key)
    assert source_hash==hashlib.sha256(ARCHIVE.read_bytes()).hexdigest()
    report={"workbooks":len(reports),"active_products":len(seen),"approved_image_changes":changed,
            "other_cells_and_formulas_preserved":True,"source_archive_unchanged":True,
            "image_exceptions":len(exceptions),"final_image_acceptance":not exceptions,
            "workbook_results":reports,"exceptions":exceptions}
    Path("/tmp/planetworld-workbook-repair-report.json").write_text(json.dumps(report,indent=2))
    print("PLANETWORLD_WORKBOOK_REPAIR_QA",json.dumps({k:v for k,v in report.items() if k not in ("workbook_results","exceptions")}),flush=True)

if __name__=="__main__":
    main()
