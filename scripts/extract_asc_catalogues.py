#!/usr/bin/env python3
"""ASC catalogue text/OCR and source-image extraction. Review-only; never writes live store data."""
from pathlib import Path
import csv, hashlib, io, json, re, subprocess
import fitz
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

ROOT = Path("suppliers/ASC")
OUT = Path("catalogue-review/asc")
TEXT_OUT = OUT / "text"
ORIGINALS = OUT / "source-images"
CLEANED = OUT / "cleaned-images"
PAGE_RENDERS = OUT / "source-pages"
for folder in (TEXT_OUT, ORIGINALS, CLEANED, PAGE_RENDERS):
    folder.mkdir(parents=True, exist_ok=True)

text_rows, image_rows, inventory = [], [], []
pdfs = sorted(ROOT.glob("*.pdf"))
seen_hashes = {}

def slug(value):
    return re.sub(r"[^A-Za-z0-9._-]+", "-", value).strip("-")[:90]

for path in pdfs:
    info = {"source_file": path.name, "size_bytes": path.stat().st_size, "pages": 0,
            "pages_with_text": 0, "ocr_pages": 0, "embedded_images": 0,
            "product_image_candidates": 0, "full_page_images_skipped": 0, "errors": []}
    try:
        doc = fitz.open(path)
        info["pages"] = len(doc)
        for page_no, page in enumerate(doc, start=1):
            # Render pilot source pages 3 and 4 for exact SKU/product/image verification.
            if page_no >= 3 or (path.name == "ASC- Automotive globes (1).pdf" and page_no == 1):
                page_pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
                page_pix.save(PAGE_RENDERS / f"{slug(path.stem)}_p{page_no:03d}.png")
            page_text = page.get_text("text").strip()
            method = "embedded_text"
            if len(re.sub(r"\s+", "", page_text)) < 35:
                try:
                    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
                    tmp = OUT / "_ocr_page.png"
                    pix.save(tmp)
                    proc = subprocess.run(["tesseract", str(tmp), "stdout", "--psm", "6"],
                                          capture_output=True, text=True, timeout=90)
                    if proc.returncode == 0 and len(proc.stdout.strip()) > len(page_text):
                        page_text, method = proc.stdout.strip(), "tesseract_ocr"
                    tmp.unlink(missing_ok=True)
                except Exception as exc:
                    info["errors"].append(f"page {page_no} OCR: {exc!r}")
            if page_text:
                info["pages_with_text"] += 1
            if method == "tesseract_ocr":
                info["ocr_pages"] += 1
            text_rows.append({"source_file": path.name, "page_number": page_no,
                              "extraction_method": method, "character_count": len(page_text),
                              "page_text": page_text})

            # Extract embedded catalogue images and preserve their exact source bytes.
            page_area = max(page.rect.width * page.rect.height, 1)
            page_seen = set()
            for image_info in page.get_images(full=True):
                xref = image_info[0]
                if xref in page_seen:
                    continue
                page_seen.add(xref)
                rects = page.get_image_rects(xref)
                if not rects:
                    continue
                info["embedded_images"] += 1
                max_area_ratio = max((r.width * r.height) / page_area for r in rects)
                base = f"{slug(path.stem)}_p{page_no:03d}_x{xref}"
                try:
                    extracted = doc.extract_image(xref)
                    raw = extracted["image"]
                    ext = extracted.get("ext", "bin").lower()
                    digest = hashlib.sha256(raw).hexdigest()
                    if max_area_ratio >= 0.65:
                        image_rows.append({"source_file": path.name, "page_number": page_no,
                            "image_xref": xref, "source_sha256": digest, "width": extracted.get("width"),
                            "height": extracted.get("height"), "placement_count": len(rects),
                            "page_area_ratio": round(max_area_ratio, 4), "status": "skipped_full_page_or_scan",
                            "source_image_path": "", "cleaned_image_path": ""})
                        info["full_page_images_skipped"] += 1
                        continue
                    im = Image.open(io.BytesIO(raw))
                    im.load()
                    width, height = im.size
                    if width < 80 or height < 80:
                        image_rows.append({"source_file": path.name, "page_number": page_no,
                            "image_xref": xref, "source_sha256": digest, "width": width, "height": height,
                            "placement_count": len(rects), "page_area_ratio": round(max_area_ratio, 4),
                            "status": "skipped_too_small_icon_or_mark", "source_image_path": "",
                            "cleaned_image_path": ""})
                        continue
                    original_path = ORIGINALS / f"{base}.{ext}"
                    original_path.write_bytes(raw)
                    # Conservative cleanup: trim only near-white page margins, preserve product pixels.
                    rgba = im.convert("RGBA")
                    alpha = rgba.getchannel("A")
                    rgb = Image.new("RGB", rgba.size, "white")
                    rgb.paste(rgba, mask=alpha)
                    gray = ImageOps.grayscale(rgb)
                    # Find non-white content with a conservative threshold.
                    mask = gray.point(lambda p: 255 if p < 248 else 0)
                    bbox = mask.getbbox()
                    if bbox:
                        pad = max(6, int(min(width, height) * 0.025))
                        l, t, r, b = bbox
                        bbox = (max(0,l-pad), max(0,t-pad), min(width,r+pad), min(height,b+pad))
                        rgb = rgb.crop(bbox)
                    rgb = ImageOps.autocontrast(rgb, cutoff=0.4)
                    rgb = ImageEnhance.Sharpness(rgb).enhance(1.12)
                    rgb.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
                    cleaned_path = CLEANED / f"{base}.jpg"
                    rgb.save(cleaned_path, "JPEG", quality=90, optimize=True)
                    duplicate = seen_hashes.get(digest, "")
                    seen_hashes[digest] = seen_hashes.get(digest, base)
                    image_rows.append({"source_file": path.name, "page_number": page_no,
                        "image_xref": xref, "source_sha256": digest, "width": width, "height": height,
                        "placement_count": len(rects), "page_area_ratio": round(max_area_ratio, 4),
                        "status": "duplicate_source_image" if duplicate else "extracted_cleaned_candidate",
                        "source_image_path": str(original_path), "cleaned_image_path": str(cleaned_path)})
                    info["product_image_candidates"] += 1
                except Exception as exc:
                    info["errors"].append(f"page {page_no} image xref {xref}: {exc!r}")
        doc.close()
    except Exception as exc:
        info["errors"].append(repr(exc))
    inventory.append(info)

with (TEXT_OUT / "asc-pages-review.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["source_file","page_number","extraction_method","character_count","page_text"])
    w.writeheader(); w.writerows(text_rows)
with (OUT / "asc-image-manifest.csv").open("w", newline="", encoding="utf-8-sig") as f:
    fields = ["source_file","page_number","image_xref","source_sha256","width","height",
              "placement_count","page_area_ratio","status","source_image_path","cleaned_image_path"]
    w = csv.DictWriter(f, fieldnames=fields)
    w.writeheader(); w.writerows(image_rows)
summary = {
    "pdf_count": len(pdfs),
    "total_pages": sum(x["pages"] for x in inventory),
    "pages_with_text_or_ocr": sum(x["pages_with_text"] for x in inventory),
    "ocr_pages": sum(x["ocr_pages"] for x in inventory),
    "embedded_images": sum(x["embedded_images"] for x in inventory),
    "product_image_candidates": sum(x["product_image_candidates"] for x in inventory),
    "full_page_images_skipped": sum(x["full_page_images_skipped"] for x in inventory),
    "documents_with_errors": [x for x in inventory if x["errors"]],
    "documents": inventory,
    "status": "review-only extraction; cleaned images are candidates, not approved product matches; no store or database writes"
}
(OUT / "asc-inventory-and-extraction-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
(OUT / "README.md").write_text(
    "# ASC catalogue extraction — review only\n\n"
    "- `text/asc-pages-review.csv`: page-level embedded text/OCR with source page references.\n"
    "- `source-images/`: original embedded image bytes, unchanged.\n"
    "- `cleaned-images/`: conservative cleaned JPEG candidates; no product content is invented or altered.\n"
    "- `asc-image-manifest.csv`: supplier PDF, page, image hash, dimensions, status and file paths.\n\n"
    "Full-page scans and tiny icons are excluded from product-image candidates. A candidate is not an approved SKU match. "
    "Every image must be checked against the exact product and supplier SKU before any store use.\n",
    encoding="utf-8")
print(json.dumps({k:v for k,v in summary.items() if k != "documents"}, ensure_ascii=False))
