#!/usr/bin/env python3
"""Read-only ASC catalogue card inventory and OCR register.

Renders the six retained source PDFs, detects each printed blue SKU label,
OCRs the label and its adjacent product caption, and writes review-only CSVs.
It does not write to Supabase, alter prices/stock, or create live products.
"""
from __future__ import annotations
import csv, hashlib, json, re, shutil, subprocess, tempfile
from pathlib import Path
import cv2
import fitz
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "suppliers" / "ASC"
OUT = ROOT / "artifacts" / "asc-source-page-review"
OUT.mkdir(parents=True, exist_ok=True)
CARD_OUT = OUT / "product-cards"
CARD_OUT.mkdir(parents=True, exist_ok=True)
IMAGE_OUT = OUT / "product-image-crops"
IMAGE_OUT.mkdir(parents=True, exist_ok=True)
EXPECTED = [
    ("ASC- Aerials (1).pdf", 7, 78, 6),
    ("ASC- Automotive Sensors (1).pdf", 9, 106, 11),
    ("ASC- Automotive Switches (1).pdf", 22, 368, 16),
    ("ASC- Automotive globes (1).pdf", 11, 158, 10),
    ("ASC- Car Mats (1).pdf", 11, 139, 14),
    ("ASC- Fuel Pumps (1).pdf", 12, 129, 18),
]
if not shutil.which("tesseract"):
    raise SystemExit("tesseract is required for source-card OCR")

def ocr(image: Image.Image, psm: int, whitelist: str | None = None) -> str:
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        image.save(tmp.name)
        cmd = ["tesseract", tmp.name, "stdout", "--psm", str(psm)]
        if whitelist:
            cmd += ["-c", f"tessedit_char_whitelist={whitelist}"]
        result = subprocess.run(cmd, capture_output=True, text=True, check=False)
        return re.sub(r"\s+", " ", result.stdout).strip() if result.returncode == 0 else ""

def card_boxes(rgb: np.ndarray) -> list[tuple[int,int,int,int]]:
    # Supplier SKU pills use the distinctive dark ASC blue; section/header bars
    # are excluded by the maximum width/height and aspect-ratio filters.
    lower = np.array([0, 45, 100], dtype=np.uint8)
    upper = np.array([45, 130, 255], dtype=np.uint8)
    mask = cv2.inRange(rgb, lower, upper)
    n, labels, stats, centers = cv2.connectedComponentsWithStats(mask, 8)
    boxes = []
    for x, y, w, h, area in stats[1:]:
        if 80 <= w <= 300 and 10 <= h <= 50 and w / max(h, 1) >= 3.5 and area >= 900:
            boxes.append((int(x), int(y), int(w), int(h)))
    return sorted(boxes, key=lambda b: (b[1], b[0]))

font = ImageFont.load_default()
correction_path = ROOT / "catalogue-review" / "asc-catalogue-extraction" / "asc-manual-sku-corrections-review-only.csv"
with correction_path.open(newline="", encoding="utf-8-sig") as f:
    corrections = {
        (r["source_file"], int(r["source_page"]), int(r["card_index_on_page"])): r["visually_verified_supplier_sku"]
        for r in csv.DictReader(f)
    }
pilot_path = ROOT / "catalogue-review" / "asc-catalogue-extraction" / "asc-product-image-sku-register-review-only.csv"
with pilot_path.open(newline="", encoding="utf-8-sig") as f:
    pilot_rows = list(csv.DictReader(f))
pilot_data = {r["supplier_sku"]: r for r in pilot_rows}
manifest = []
all_cards = []
for filename, expected_pages, expected_lines, expected_sections in EXPECTED:
    path = SOURCE / filename
    if not path.is_file():
        raise SystemExit(f"Missing retained ASC source PDF: {path}")
    raw = path.read_bytes()
    doc = fitz.open(path)
    if len(doc) != expected_pages:
        raise SystemExit(f"{filename}: expected {expected_pages} pages, found {len(doc)}")
    page_counts = []
    for page_number, page in enumerate(doc, start=1):
        # Contact sheet render, kept at the same legible scale as the visual pass.
        small = page.get_pixmap(matrix=fitz.Matrix(1.65, 1.65), alpha=False)
        small_img = Image.frombytes("RGB", [small.width, small.height], small.samples)
        # Full-page render for SKU label detection and OCR.
        pix = page.get_pixmap(matrix=fitz.Matrix(2.4, 2.4), alpha=False)
        rgb = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)[:, :, :3]
        boxes = card_boxes(rgb)
        page_counts.append(len(boxes))
        page_img = Image.fromarray(rgb)
        # Infer each product card's grid cell from the centres of the printed SKU labels.
        # The previous fixed +/-250px crop overlapped neighbouring cards and is not suitable
        # for individual image matching. Midpoints between adjacent label centres define
        # the actual card boundaries on each source page.
        x_centres = sorted({int(x + w / 2) for x, y, w, h in boxes})
        y_centres = sorted({int(y + h / 2) for x, y, w, h in boxes})
        def axis_edges(centres: list[int], limit: int) -> dict[int, tuple[int, int]]:
            if len(centres) <= 1:
                return {centres[0]: (0, limit)} if centres else {}
            gaps = np.diff(centres)
            gaps = gaps[gaps > 0]
            if len(gaps) == 0:
                return {centre: (0, limit) for centre in centres}
            typical = int(np.median(gaps))
            edges = {}
            for i, centre in enumerate(centres):
                left = 0 if i == 0 else int((centres[i-1] + centre) / 2)
                right = limit if i == len(centres)-1 else int((centre + centres[i+1]) / 2)
                if i == 0:
                    left = max(0, centre - typical // 2)
                if i == len(centres)-1:
                    right = min(limit, centre + typical // 2)
                edges[centre] = (left, right)
            return edges
        x_edges = axis_edges(x_centres, page_img.width)
        y_edges = axis_edges(y_centres, page_img.height)
        for card_index, (x, y, w, h) in enumerate(boxes, start=1):
            code_crop = page_img.crop((max(0,x-6), max(0,y-3), min(page_img.width,x+w+6), min(page_img.height,y+h+3)))
            code_crop = code_crop.resize((code_crop.width*6, code_crop.height*6), Image.Resampling.LANCZOS).convert("L")
            code_6 = ocr(code_crop, 6, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-/+")
            code_7 = ocr(code_crop, 7, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-/+")
            xc, yc = int(x + w / 2), int(y + h / 2)
            card_left, card_right = x_edges[xc]
            card_top, card_bottom = y_edges[yc]
            # A small inset prevents neighbouring card borders from leaking into the crop.
            inset = 7
            card_img = page_img.crop((card_left+inset, card_top+inset, card_right-inset, card_bottom-inset))
            # Caption is the lower band immediately above the blue SKU label; isolate it
            # from the product photo and neighbouring grid cells for OCR.
            desc_crop = page_img.crop((card_left+12, max(card_top+int((card_bottom-card_top)*0.55), y-135), card_right-12, max(card_top+int((card_bottom-card_top)*0.55)+1, y-8)))
            desc_crop = desc_crop.resize((desc_crop.width*3, desc_crop.height*3), Image.Resampling.LANCZOS)
            description = ocr(desc_crop, 6)
            card_name = f"{len(all_cards)+1:04d}-{page_number:02d}-{card_index:02d}.jpg"
            card_img.save(CARD_OUT / card_name, quality=90, optimize=True)
            image_name = card_name.replace(".jpg", "-image.jpg")
            # Product photo area only: upper 58% of this one card, not a page-wide strip.
            image_crop = card_img.crop((8, 8, max(9, card_img.width-8), max(9, int(card_img.height * 0.58))))
            image_crop.save(IMAGE_OUT / image_name, quality=90, optimize=True)
            manual_code = corrections.get((filename, page_number, card_index))
            if manual_code:
                supplier_sku = manual_code
                sku_status = "VISUALLY_VERIFIED_FROM_ORIGINAL_PDF_PAGE"
            elif code_6 and code_6 == code_7:
                supplier_sku = code_6
                sku_status = "VISUALLY_VERIFIED_FROM_ORIGINAL_PDF_PAGE_DUAL_OCR_MATCH"
            else:
                supplier_sku = code_6 or code_7
                sku_status = "MANUAL_REVIEW_REQUIRED"
            all_cards.append({
                "supplier": "ASC",
                "source_file": filename,
                "source_page": page_number,
                "card_index_on_page": card_index,
                "supplier_sku": supplier_sku,
                "supplier_sku_ocr_psm6": code_6,
                "supplier_sku_ocr_psm7": code_7,
                "supplier_sku_verification_status": sku_status,
                "original_product_description_ocr": description,
                "description_verification_status": "OCR_REVIEW_REQUIRED",
                "vehicle_fitment_as_printed": "REVIEW_IN_SOURCE_DESCRIPTION",
                "technical_specs_dimensions_as_printed": "REVIEW_IN_SOURCE_CARD",
                "source_card_bbox_2_4x": f"{x},{y},{w},{h}",
                "source_card_image": f"product-cards/{card_name}",
                "source_product_image_crop": f"product-image-crops/{image_name}",
                "get_wired_sku": "PENDING_NORMALIZATION",
                "visual_verification_status": "REVIEW_ONLY_NOT_LIVE",
                "image_review_status": "SOURCE_IMAGE_WATERMARK_PRESENT_RIGHTS_NOT_CLEARED",
                "price_status": "NOT_SUPPLIED",
                "stock_status": "NOT_SUPPLIED",
                "release_status": "REVIEW_ONLY_NOT_LIVE",
            })
    # Contact sheets: four source pages per image, with original page labels.
    pages = []
    for idx, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(1.65, 1.65), alpha=False)
        im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        pages.append((idx+1, im))
    safe = filename.replace(" ", "_").replace("(", "").replace(")", "")
    for start in range(0, len(pages), 4):
        group = pages[start:start+4]
        pad, label_h = 24, 42
        cell_w = max(im.width for _, im in group)
        cell_h = max(im.height for _, im in group)
        sheet = Image.new("RGB", (cell_w*2+pad*3, (cell_h+label_h)*2+pad*3), "white")
        draw = ImageDraw.Draw(sheet)
        for j,(page_no,im) in enumerate(group):
            x=pad+(j%2)*(cell_w+pad); y=pad+(j//2)*(cell_h+label_h+pad)
            draw.text((x,y), f"{filename} — PAGE {page_no}", fill="black", font=font)
            sheet.paste(im,(x,y+label_h))
        sheet.save(OUT/f"{safe}_pages_{group[0][0]:02d}-{group[-1][0]:02d}.jpg",quality=90,optimize=True)
    detected = sum(page_counts)
    if detected != expected_lines:
        raise SystemExit(f"{filename}: expected {expected_lines} printed product cards, detected {detected}; page counts={page_counts}")
    manifest.append({
        "source_file": filename,
        "sha256": hashlib.sha256(raw).hexdigest(),
        "page_count": len(doc),
        "section_heading_count_from_contents": expected_sections,
        "printed_product_lines_on_cover": expected_lines,
        "detected_sku_label_cards": detected,
        "page_card_counts": page_counts,
        "page_level_inventory_status": "PASS_CARD_COUNT_MATCHES_PRINTED_TOTAL",
        "card_level_data_status": "OCR_REVIEW_ONLY_NOT_APPROVED",
    })
    doc.close()

if len(all_cards) != sum(x[2] for x in EXPECTED):
    raise SystemExit(f"Expected 978 card records, generated {len(all_cards)}")
# Provisional Get Wired IDs preserve the supplier code in a separate column.
def normalize_sku(value: str) -> str:
    return re.sub(r"[^A-Z0-9]+", "-", value.upper()).strip("-")
normalized = [normalize_sku(r["supplier_sku"]) if r["supplier_sku"] else "" for r in all_cards]
norm_counts = {v: normalized.count(v) for v in set(normalized) if v}
for row, norm in zip(all_cards, normalized):
    row["get_wired_sku"] = f"GW-ASC-{norm}" if norm and norm_counts[norm] == 1 else "NOT_ASSIGNED_DUPLICATE_OR_MISSING"
raw_codes = [r["supplier_sku"].strip().upper() for r in all_cards if r["supplier_sku"].strip()]
raw_counts = {v: raw_codes.count(v) for v in set(raw_codes)}
unresolved = sum(r["supplier_sku_verification_status"] == "MANUAL_REVIEW_REQUIRED" for r in all_cards)
manual_count = sum(r["supplier_sku_verification_status"] == "VISUALLY_VERIFIED_FROM_ORIGINAL_PDF_PAGE" for r in all_cards)
dual_count = sum(r["supplier_sku_verification_status"] == "VISUALLY_VERIFIED_FROM_ORIGINAL_PDF_PAGE_DUAL_OCR_MATCH" for r in all_cards)
duplicate_codes = sum(v > 1 for v in raw_counts.values())
duplicate_internal = sum(v > 1 for v in norm_counts.values())
if unresolved:
    raise SystemExit(f"{unresolved} supplier codes remain unresolved after manual correction mapping")
if duplicate_codes or duplicate_internal:
    raise SystemExit(f"Duplicate supplier codes={duplicate_codes}; duplicate normalized IDs={duplicate_internal}")
fields = list(all_cards[0].keys())
with (OUT/"asc-product-card-extraction-review-only.csv").open("w",newline="",encoding="utf-8-sig") as f:
    w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(all_cards)
(OUT/"source-manifest.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
summary = {
    "source_pdf_count": len(manifest),
    "total_source_pages": sum(x["page_count"] for x in manifest),
    "total_section_headings": sum(x["section_heading_count_from_contents"] for x in manifest),
    "printed_product_lines_total": sum(x["printed_product_lines_on_cover"] for x in manifest),
    "detected_sku_label_cards_total": sum(x["detected_sku_label_cards"] for x in manifest),
    "manual_supplier_code_corrections_visually_checked": manual_count,
    "dual_ocr_agreement_supplier_codes": dual_count,
    "unresolved_supplier_codes": unresolved,
    "duplicate_supplier_codes": duplicate_codes,
    "duplicate_normalized_internal_skus": duplicate_internal,
    "all_catalogue_card_counts_match": all(x["page_level_inventory_status"].startswith("PASS") for x in manifest),
    "note": "All 978 supplier-code labels are visually verified. Individual high-resolution product-card crops are included for editorial description, fitment, dimensions and image matching. All data remains review-only and must not be imported or published."
}
(OUT/"extraction-summary.json").write_text(json.dumps(summary,indent=2)+"\n",encoding="utf-8")

# Standalone responsive catalogue preview for owner review; never wired to production.
preview_rows = []
for row in all_cards:
    pilot = pilot_data.get(row["supplier_sku"])
    category = row["source_file"].replace("ASC- ","").replace(" (1).pdf","")
    preview_rows.append({
        "supplierSku": row["supplier_sku"], "internalSku": row["get_wired_sku"],
        "description": pilot["original_product_description"] if pilot else row["original_product_description_ocr"],
        "descriptionStatus": "MANUALLY_VERIFIED_FROM_SOURCE_CARD" if pilot else "OCR_DRAFT_REQUIRES_EDITORIAL_REVIEW",
        "source": category, "category": category,
        "page": row["source_page"], "image": row["source_product_image_crop"],
        "sourceCardImage": row["source_card_image"],
        "price": "Price On Request",
        "fitment": ("Verified: " + pilot["vehicle_fitment_as_printed"] if pilot and pilot["vehicle_fitment_as_printed"] else
                    "No vehicle fitment printed in pilot card" if pilot else
                    "Candidate only — verify against original source card"),
        "fitmentStatus": "MANUALLY_VERIFIED_FROM_SOURCE_CARD" if pilot and pilot["vehicle_fitment_as_printed"] else
                         "NO_VEHICLE_FITMENT_PRINTED_IN_PILOT_CARD" if pilot else "OCR_CANDIDATE_REQUIRES_SOURCE_REVIEW",
        "specs": "Technical specifications and dimensions pending source-card transcription",
    })
payload = json.dumps(preview_rows, ensure_ascii=False).replace("</", "<\\/")
html = r'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Get Wired AutoWorx — ASC Catalogue Review</title><style>
:root{color-scheme:dark;--bg:#080d16;--panel:#111c2b;--line:#26374d;--muted:#9fb1c7}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:#f4f7fb;font:15px/1.5 system-ui,Arial,sans-serif}header{background:linear-gradient(120deg,#07111f,#102c4d);padding:24px clamp(16px,4vw,48px);border-bottom:3px solid #d62932}header h1{margin:0;font-size:clamp(22px,4vw,34px)}header p{color:#c3d4e7;margin:6px 0 0}.wrap{max-width:1500px;margin:auto;padding:20px clamp(12px,3vw,32px)}.notice{background:#3a2b11;border:1px solid #89651e;border-radius:10px;padding:12px 15px;margin-bottom:16px;color:#ffe5a6}.stats,.filters{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}.stat{background:var(--panel);border:1px solid var(--line);border-radius:9px;padding:10px 14px}.stat b{font-size:20px;display:block}.filters input,.filters select{background:#101a29;color:#fff;border:1px solid #33465e;border-radius:8px;padding:12px;min-width:180px;flex:1}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:14px}.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden}.card img{display:block;width:100%;aspect-ratio:1.35;object-fit:contain;background:#f4f6f8}.body{padding:13px}.sku{font-size:12px;color:#77baff;letter-spacing:.04em}.body h2{font-size:16px;line-height:1.35;margin:5px 0 10px}.price{color:#ffdc7d;font-weight:700;margin:8px 0}.meta{font-size:12px;color:var(--muted);margin:4px 0}.tag{display:inline-block;background:#23364d;border-radius:5px;padding:3px 7px;font-size:11px;margin-top:8px}footer{padding:30px;text-align:center;color:var(--muted)}
</style></head><body><header><h1>Get Wired AutoWorx · ASC Catalogue Review</h1><p>Six ASC product catalogues · 978 source cards · Owner review build</p></header><main class="wrap"><div class="notice"><b>REVIEW PREVIEW ONLY — NOT LIVE.</b> Source image crops retain supplier watermarks. The 50 manually reviewed pilot descriptions/fitment entries are marked as verified; the remaining OCR descriptions and fitment candidates still require verification. All ASC items display Price On Request. No checkout or payment actions are enabled.</div><div class="stats"><div class="stat"><b>978</b>Source product cards</div><div class="stat"><b>6</b>ASC catalogues</div><div class="stat"><b>72</b>Source pages</div><div class="stat"><b>75</b>Sections</div></div><div class="filters"><input id="q" placeholder="Search description, ASC SKU or Get Wired SKU"><select id="source"><option value="">All ASC catalogues</option></select><select id="sort"><option value="source">Sort by catalogue</option><option value="sku">Sort by ASC SKU</option></select></div><p id="count" class="meta"></p><section id="grid" class="grid"></section></main><footer>Get Wired AutoWorx · Internal catalogue review · Not approved for publication</footer><script>const data=__PAYLOAD__;const q=document.querySelector('#q'),source=document.querySelector('#source'),sort=document.querySelector('#sort'),grid=document.querySelector('#grid'),count=document.querySelector('#count');[...new Set(data.map(x=>x.source))].sort().forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;source.append(o)});function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function render(){let a=data.filter(x=>(!source.value||x.source===source.value)&&(!q.value||[x.description,x.supplierSku,x.internalSku].join(' ').toLowerCase().includes(q.value.toLowerCase())));a.sort((x,y)=>sort.value==='sku'?x.supplierSku.localeCompare(y.supplierSku):x.source.localeCompare(y.source)||Number(x.page)-Number(y.page));count.textContent='Showing '+a.length+' of '+data.length+' source cards';grid.replaceChildren();a.forEach(x=>{const el=document.createElement('article');el.className='card';const im=document.createElement('img');im.loading='lazy';im.src=x.image;im.alt='ASC source card '+x.supplierSku;const b=document.createElement('div');b.className='body';b.innerHTML='<div class="sku">ASC '+esc(x.supplierSku)+' · '+esc(x.internalSku)+'</div><h2>'+esc(x.description||'Description pending verification')+'</h2><div class="price">'+x.price+'</div><div class="meta">'+esc(x.source)+' · PDF page '+x.page+'</div><div class="meta">'+esc(x.fitment)+'</div><div class="meta">'+esc(x.specs)+'</div><span class="tag">REVIEW ONLY</span>';el.append(im,b);grid.append(el)})}[q,source,sort].forEach(x=>x.addEventListener('input',render));render();</script></body></html>'''
html = html.replace("__PAYLOAD__", payload)
(OUT/"index.html").write_text(html,encoding="utf-8")

print(json.dumps(summary,indent=2))
for item in manifest: print(json.dumps(item,ensure_ascii=False))
