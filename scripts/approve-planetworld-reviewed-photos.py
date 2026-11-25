"""Apply only the explicitly reviewed contact-sheet entries, matching their immutable hashes.

Approval is based on supplier exact-SKU asset association plus visual product-type
inspection, or an independently verified exact-SKU product page and matching photo.
Unresolved variants, misleading imagery, and repeated digests remain excluded.
"""
import collections,json
from pathlib import Path
from urllib.parse import urlparse,unquote
p=Path("/tmp/planetworld-batch-image-evidence.json")
rows=json.loads(p.read_text())
manifest=json.loads(Path("/tmp/planetworld-photo-review/manifest.json").read_text())
assert len(rows)==521 and len(manifest)==116
assert [m["index"] for m in manifest]==list(range(1,117))
by_key={r["gwa"]:r for r in rows}
assert len(by_key)==521
digests=collections.Counter(r["digest"] for r in rows if r.get("digest"))
# Every approved index was visually inspected in contact-sheet artifact 15021639884.
# 1: close-up rather than full product; 4: kit count unclear; 109: retailer identity not confirmed;
# 113/114: conflicting shared digests; 115: explicitly LHD, fitment not verified for SA.
supplier_indices={2,3,*range(6,109),111,112,116}
retailer_indices={5:"GWA-ONE-CAM007-AHD",110:"GWA-ONE-OX-LCAM001"}
assert len(supplier_indices)==108
for m in manifest:
    i=m["index"]
    if i not in supplier_indices and i not in retailer_indices: continue
    r=by_key[m["gwa"]]
    assert r["status"]=="REPLACEMENT_CANDIDATE" and not m["download_error"]
    assert r["title"]==m["title"] and r["resolved"]==m["url"] and r["digest"]==m["sha256"]
    assert digests[r["digest"]]==1,(i,r["gwa"],"shared image")
    if i in supplier_indices:
        u=urlparse(r["resolved"])
        assert u.scheme=="https" and u.hostname=="assets.planetworld.co.za"
        parts=unquote(u.path).split("/")
        assert parts[2]=="products" and parts[3]==r["sku"],(i,r["gwa"],parts)
        assert r["source"].startswith("Supplier SKU asset path")
        basis="Exact supplier SKU asset path and visually matching product type"
    else:
        assert r["gwa"]==retailer_indices[i]
        assert urlparse(r["source"]).hostname=="www.caraudiowarehouse.co.za"
        basis="Exact SKU on retailer product page and visually matching product photo"
    r["status"]="REPLACEMENT_APPROVED"
    r["approvalBasis"]=basis
    r["approvalEvidence"]="Contact-sheet artifact 15021639884, image "+str(i)
# Deliberately reject the unsuitable primary photo and explicitly LHD fitment picture.
for i,reason in [(1,"Detail close-up, not full product photo"),(115,"Image explicitly shows LHD; supplier fitment description does not establish RHD compatibility")]:
    m=manifest[i-1];r=by_key[m["gwa"]]
    assert r["status"]=="REPLACEMENT_CANDIDATE"
    r.update(status="UNRESOLVED",rejectedImage=r["resolved"],rejectedDigest=r["digest"],reason=reason,resolved="",digest="")
counts=collections.Counter(r["status"] for r in rows)
assert counts=={"ORIGINAL_AVAILABLE":388,"REPLACEMENT_APPROVED":115,"REPLACEMENT_CANDIDATE":4,"UNRESOLVED":14},counts
p.write_text(json.dumps(rows,indent=2))
print("REVIEWED_PHOTO_COUNTS",dict(counts))
print("REVIEWED_PHOTOS_APPROVED",110)
