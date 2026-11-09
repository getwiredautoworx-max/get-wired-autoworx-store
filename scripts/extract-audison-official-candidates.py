#!/usr/bin/env python3
"""Bounded, review-only extraction of exact Audison manufacturer-page image candidates."""
from __future__ import annotations
import argparse
import csv
import hashlib
import html
import json
import re
import time
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from io import BytesIO
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "catalogue-review/planetworld-audison-official-model-audit.csv"
OUT = ROOT / "catalogue-review/audio-official-model-candidates"
IMAGES = OUT / "images"
MANIFEST = OUT / "manifest.json"
ALLOWED_PAGE_HOSTS = {"audison.com", "www.audison.com"}
ALLOWED_IMAGE_HOSTS = {"static.audison.com", "audison.com", "www.audison.com"}
USER_AGENT = "GetWiredAutoWorx-OwnerPreviewResearch/1.0 (+review-only)"
MAX_IMAGE_BYTES = 18 * 1024 * 1024

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.title_parts = []
        self.h1_parts = []
        self._title = False
        self._h1 = False
        self._script_json = False
        self.jsonld = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag.lower() == "meta":
            key = (attrs.get("property") or attrs.get("name") or "").strip().lower()
            value = (attrs.get("content") or "").strip()
            if key and value:
                self.meta[key] = html.unescape(value)
        elif tag.lower() == "title":
            self._title = True
        elif tag.lower() == "h1":
            self._h1 = True
        elif tag.lower() == "script" and "ld+json" in (attrs.get("type") or "").lower():
            self._script_json = True
            self._script_parts = []
    def handle_endtag(self, tag):
        if tag.lower() == "title": self._title = False
        elif tag.lower() == "h1": self._h1 = False
        elif tag.lower() == "script" and self._script_json:
            self._script_json = False
            raw = "".join(self._script_parts).strip()
            if raw: self.jsonld.append(raw)
    def handle_data(self, data):
        if self._title: self.title_parts.append(data)
        if self._h1: self.h1_parts.append(data)
        if self._script_json: self._script_parts.append(data)

def clean_text(value):
    return re.sub(r"\\s+", " ", html.unescape(str(value or ""))).strip()

def slug(value):
    value = re.sub(r"[^a-zA-Z0-9]+", "-", str(value or "")).strip("-").lower()
    return value[:90] or "audison-product"

def read_manifest():
    if MANIFEST.exists():
        try: return json.loads(MANIFEST.read_text(encoding="utf-8"))
        except Exception: pass
    return {"schema_version": 1, "source_audit": str(AUDIT.relative_to(ROOT)), "items": [], "runs": []}

def extract_jsonld(parser):
    found = []
    def walk(obj):
        if isinstance(obj, dict):
            typ = obj.get("@type")
            if typ == "Product" or (isinstance(typ, list) and "Product" in typ):
                found.append(obj)
            for value in obj.values(): walk(value)
        elif isinstance(obj, list):
            for value in obj: walk(value)
    for raw in parser.jsonld:
        try: walk(json.loads(raw))
        except Exception: continue
    return found

def get_page(url):
    req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"})
    with urlopen(req, timeout=25) as response:
        body = response.read(5 * 1024 * 1024)
        final_url = response.geturl()
    parser = PageParser()
    parser.feed(body.decode("utf-8", errors="replace"))
    title = clean_text(" ".join(parser.title_parts))
    h1 = clean_text(" ".join(parser.h1_parts))
    description = parser.meta.get("description") or parser.meta.get("og:description") or ""
    image_url = parser.meta.get("og:image") or parser.meta.get("twitter:image") or ""
    products = extract_jsonld(parser)
    for product in products:
        description = description or clean_text(product.get("description"))
        if not image_url:
            image = product.get("image")
            if isinstance(image, list): image = image[0] if image else ""
            if isinstance(image, dict): image = image.get("url", "")
            if isinstance(image, str): image_url = image
    return {
        "final_url": final_url,
        "page_title": title,
        "h1": h1,
        "meta_description": clean_text(description),
        "image_url": urljoin(final_url, image_url) if image_url else "",
        "jsonld_products": len(products),
    }

def model_match(source_model, source_title, page_title, h1, description):
    target = clean_text(source_model) or clean_text(source_title)
    haystack = clean_text(" ".join([page_title, h1, description])).casefold()
    token = re.sub(r"\\s+", " ", target).casefold()
    if token and token in haystack: return "EXACT_MODEL_TEXT_FOUND"
    # The exact page URL is already owner-audited; a near match still requires visual/manual confirmation.
    model_tokens = [x for x in re.findall(r"[a-z0-9.]+", token) if len(x) >= 3 and x not in {"audison", "amplifier", "amplifiers", "digital", "processor"}]
    if model_tokens and all(x in haystack for x in model_tokens): return "MODEL_TOKENS_FOUND_REVIEW_REQUIRED"
    return "MODEL_MATCH_NOT_PROVEN"

def download_image(url, candidate_id):
    if not url: return {"status": "NO_IMAGE_URL"}
    host = (urlparse(url).hostname or "").lower()
    if host not in ALLOWED_IMAGE_HOSTS:
        return {"status": "IMAGE_HOST_REVIEW_REQUIRED", "image_url": url}
    req = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "image/avif,image/webp,image/png,image/jpeg,*/*"})
    with urlopen(req, timeout=25) as response:
        data = response.read(MAX_IMAGE_BYTES + 1)
        content_type = response.headers.get("Content-Type", "")
    if len(data) > MAX_IMAGE_BYTES: return {"status": "IMAGE_TOO_LARGE", "image_url": url}
    image = Image.open(BytesIO(data))
    image.verify()
    image = Image.open(BytesIO(data)).convert("RGB")
    width, height = image.size
    if width < 300 or height < 300:
        return {"status": "LOW_RES_IMAGE_REVIEW_REQUIRED", "image_url": url, "width": width, "height": height}
    IMAGES.mkdir(parents=True, exist_ok=True)
    filename = slug(candidate_id) + ".jpg"
    path = IMAGES / filename
    image.save(path, "JPEG", quality=94, optimize=True)
    return {
        "status": "IMAGE_DOWNLOADED_REVIEW_REQUIRED",
        "image_url": url,
        "local_image_path": str(path.relative_to(ROOT)),
        "image_width": width,
        "image_height": height,
        "image_sha256": hashlib.sha256(data).hexdigest(),
        "image_content_type": content_type,
    }

def make_contact_sheet(items):
    candidates = [x for x in items if x.get("local_image_path") and (ROOT / x["local_image_path"]).exists()]
    if not candidates: return
    cell_w, cell_h, label_h = 320, 230, 48
    cols = 3
    rows = (len(candidates) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * (cell_h + label_h)), "white")
    draw = ImageDraw.Draw(sheet)
    for i, item in enumerate(candidates):
        image = Image.open(ROOT / item["local_image_path"]).convert("RGB")
        thumb = ImageOps.contain(image, (cell_w - 12, cell_h - 12))
        x = (i % cols) * cell_w + (cell_w - thumb.width) // 2
        y = (i // cols) * (cell_h + label_h) + (cell_h - thumb.height) // 2
        sheet.paste(thumb, (x, y))
        label = clean_text(item.get("source_model") or item.get("source_title"))[:48]
        draw.text(((i % cols) * cell_w + 6, (i // cols) * (cell_h + label_h) + cell_h + 4), label, fill="black")
        draw.text(((i % cols) * cell_w + 6, (i // cols) * (cell_h + label_h) + cell_h + 22), item.get("model_match_status", ""), fill="black")
    OUT.mkdir(parents=True, exist_ok=True)
    sheet.save(OUT / "contact-sheet.jpg", "JPEG", quality=90, optimize=True)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=5)
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = read_manifest()
    existing = {x.get("official_product_page_url"): x for x in manifest.get("items", [])}
    overrides_path = ROOT / "assets/audio-product-enrichment-overrides.json"
    override_tokens = []
    if overrides_path.exists():
        for item in json.loads(overrides_path.read_text(encoding="utf-8")).get("records", []):
            token = (item.get("match") or {}).get("title_contains")
            if token: override_tokens.append(str(token).casefold())
    with AUDIT.open(newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    pending = []
    for row in rows:
        if row.get("match_status") != "OFFICIAL_EXACT_PRODUCT_PAGE": continue
        url = clean_text(row.get("official_product_page_url"))
        if not url or url in existing: continue
        host = (urlparse(url).hostname or "").lower()
        if host not in ALLOWED_PAGE_HOSTS: continue
        title = clean_text(row.get("source_title"))
        if any(token and token in title.casefold() for token in override_tokens): continue
        pending.append(row)
    batch = pending[:max(1, args.limit)]
    new_items = []
    for row in batch:
        url = clean_text(row.get("official_product_page_url"))
        source_model = clean_text(row.get("source_model"))
        source_title = clean_text(row.get("source_title"))
        candidate_id = slug(source_model or source_title)
        item = {
            "candidate_id": candidate_id,
            "brand": clean_text(row.get("brand")),
            "source_model": source_model,
            "source_title": source_title,
            "source_component": clean_text(row.get("source_component")),
            "source_sku_reference_internal": clean_text(row.get("source_sku")),
            "official_product_page_url": url,
            "extracted_at": datetime.now(timezone.utc).isoformat(),
            "review_status": "CANDIDATE_ONLY_NOT_APPROVED",
        }
        try:
            page = get_page(url)
            item.update(page)
            item["model_match_status"] = model_match(source_model, source_title, page["page_title"], page["h1"], page["meta_description"])
            item.update(download_image(page["image_url"], candidate_id))
            item["status"] = "EXTRACTED_REQUIRES_VISUAL_AND_MODEL_REVIEW"
        except Exception as exc:
            previous = existing.get(url, {})
            attempts = int(previous.get("attempts", 0)) + 1
            item["attempts"] = attempts
            item["status"] = "FETCH_FAILED_RETRY" if attempts < 3 else "MANUAL_FETCH_REQUIRED"
            item["error"] = str(exc)[:500]
        new_items.append(item)
        time.sleep(1.0)
    manifest.setdefault("items", []).extend(new_items)
    manifest.setdefault("runs", []).append({
        "run_at": datetime.now(timezone.utc).isoformat(),
        "candidate_count": len(new_items),
        "remaining_exact_pages": max(0, len(pending) - len(batch)),
        "review_only": True,
    })
    manifest["updated_at"] = datetime.now(timezone.utc).isoformat()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
    make_contact_sheet(manifest["items"])
    print("AUDISON_OFFICIAL_CANDIDATE_BATCH")
    print(json.dumps({"processed": len(new_items), "remaining": max(0, len(pending)-len(batch)), "total_candidates": len(manifest["items"]), "review_only": True}, indent=2))

if __name__ == "__main__":
    main()
