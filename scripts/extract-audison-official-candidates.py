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

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "catalogue-review/planetworld-audison-official-model-audit.csv"
CANDIDATE_CSV = ROOT / "catalogue-review/planetworld-exact-image-source-candidates-2026-11-12.csv"
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
    return re.sub(r"\s+", " ", html.unescape(str(value or ""))).strip()


def extract_source_title_model(source_title):
    match = re.match(r"^Audison\s*-\s*([^-]+?)\s*-", clean_text(source_title), re.I)
    return clean_text(match.group(1)) if match else ""

def normalize_audit_row(row):
    source_title = clean_text(row.get("source_title") or row.get("source_description"))
    source_model = clean_text(row.get("source_model") or row.get("source_model_in_description"))
    title_model = extract_source_title_model(source_title)
    if not source_model:
        source_model = title_model
    normalize_model = lambda value: re.sub(r"[^a-z0-9]+", "", clean_text(value).casefold())
    if source_model and title_model:
        model_title_status = "MATCH" if normalize_model(source_model) == normalize_model(title_model) else "SOURCE_MODEL_TITLE_DISAGREEMENT"
    else:
        model_title_status = "TITLE_MODEL_PARSED" if title_model else "SOURCE_MODEL_NOT_AVAILABLE"
    return {
        "match_status": clean_text(row.get("match_status") or row.get("manufacturer_match_status")),
        "official_product_page_url": clean_text(row.get("official_product_page_url") or row.get("official_manufacturer_reference")),
        "source_title": source_title,
        "source_model": source_model,
        "source_title_model": title_model,
        "source_model_title_status": model_title_status,
        "source_component": clean_text(row.get("source_component")),
        "source_sku": clean_text(row.get("source_sku") or row.get("supplier_sku_reference_only")),
        "image_url_candidate": clean_text(row.get("image_url_candidate")),
    }

def normalize_url(value):
    parsed = urlparse(clean_text(value))
    if not parsed.scheme or not parsed.netloc:
        return ""
    return f"{parsed.scheme.lower()}://{parsed.netloc.lower()}{parsed.path.rstrip('/')}"

def is_exact_individual_product_page(row):
    status = clean_text(row.get("match_status")).casefold()
    return status in {"official_exact_product_page", "exact official individual product page found"}

def load_candidate_urls(path=CANDIDATE_CSV):
    urls = set()
    if not path.exists():
        return urls
    with path.open(newline="", encoding="utf-8-sig") as handle:
        for row in csv.DictReader(handle):
            brand = clean_text(row.get("brand")).casefold()
            url = normalize_url(row.get("official_product_page") or row.get("official_product_page_url"))
            if url and (not brand or brand == "audison"):
                urls.add(url)
    return urls

def select_pending_rows(rows, existing, candidate_urls, override_tokens, limit):
    grouped = {}
    for raw in rows:
        row = normalize_audit_row(raw)
        if not is_exact_individual_product_page(row):
            continue
        url = normalize_url(row["official_product_page_url"])
        if not url or url in candidate_urls:
            continue
        if row["source_model_title_status"] == "SOURCE_MODEL_TITLE_DISAGREEMENT":
            continue
        prior = existing.get(url)
        if prior and prior.get("status") != "FETCH_FAILED_RETRY":
            continue
        if prior and int(prior.get("attempts", 0)) >= 3:
            continue
        host = (urlparse(url).hostname or "").lower()
        if host not in ALLOWED_PAGE_HOSTS:
            continue
        title = row["source_title"].casefold()
        if any(token and token in title for token in override_tokens):
            continue
        grouped.setdefault(url, []).append(row)
    pending = []
    for url, candidates in grouped.items():
        identities = {(x["source_model"].casefold(), x["source_title"].casefold()) for x in candidates}
        if len(identities) > 1:
            continue
        pending.append(candidates[0])
    pending.sort(key=lambda x: x["official_product_page_url"])
    return pending[:max(1, limit)], len(pending)

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
    token = re.sub(r"\s+", " ", target).casefold()
    if token and token in haystack: return "EXACT_MODEL_TEXT_FOUND"
    # The exact page URL is already owner-audited; a near match still requires visual/manual confirmation.
    model_tokens = [x for x in re.findall(r"[a-z0-9.]+", token) if len(x) >= 3 and x not in {"audison", "amplifier", "amplifiers", "digital", "processor"}]
    if model_tokens and all(x in haystack for x in model_tokens): return "MODEL_TOKENS_FOUND_REVIEW_REQUIRED"
    return "MODEL_MATCH_NOT_PROVEN"

def download_image(url, candidate_id):
    from PIL import Image
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
    from PIL import Image, ImageDraw, ImageOps
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
    existing = {normalize_url(x.get("official_product_page_url")): x for x in manifest.get("items", [])}
    candidate_urls = load_candidate_urls()
    overrides_path = ROOT / "assets/audio-product-enrichment-overrides.json"
    override_tokens = []
    if overrides_path.exists():
        for item in json.loads(overrides_path.read_text(encoding="utf-8")).get("records", []):
            token = (item.get("match") or {}).get("title_contains")
            if token:
                override_tokens.append(str(token).casefold())
    with AUDIT.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
    batch, total_pending = select_pending_rows(rows, existing, candidate_urls, override_tokens, args.limit)
    if not batch:
        print("AUDISON_OFFICIAL_CANDIDATE_BATCH")
        print(json.dumps({"processed": 0, "remaining": 0, "total_candidates": len(manifest.get("items", [])), "status": "NO_UNREVIEWED_EXACT_PAGES", "manifest_unchanged": True}, indent=2))
        return
    new_items = []
    for row in batch:
        url = row["official_product_page_url"]
        source_model = row["source_model"]
        source_title = row["source_title"]
        candidate_id = slug(source_model or source_title)
        item = {
            "candidate_id": candidate_id,
            "brand": "Audison",
            "source_model": source_model,
            "source_title": source_title,
            "source_title_model": row["source_title_model"],
            "source_model_title_status": row["source_model_title_status"],
            "source_component": row["source_component"],
            "source_sku_reference_internal": row["source_sku"],
            "official_product_page_url": url,
            "extracted_at": datetime.now(timezone.utc).isoformat(),
            "review_status": "CANDIDATE_ONLY_NOT_APPROVED",
            "image_approval_status": "NOT_APPROVED",
            "import_status": "DO_NOT_IMPORT",
        }
        try:
            page = get_page(url)
            item.update(page)
            item["model_match_status"] = model_match(source_model, source_title, page["page_title"], page["h1"], page["meta_description"])
            item["page_image_url_candidate"] = page["image_url"]
            if item["model_match_status"] == "EXACT_MODEL_TEXT_FOUND":
                candidate_image = page["image_url"] or row["image_url_candidate"]
                item["image_url"] = candidate_image
                item.update(download_image(candidate_image, candidate_id))
                item["status"] = "EXTRACTED_REQUIRES_VISUAL_AND_MODEL_REVIEW"
            else:
                item["image_url"] = ""
                item["image_status"] = "IMAGE_NOT_DOWNLOADED_MODEL_MATCH_UNPROVEN"
                item["status"] = "MANUAL_MODEL_REVIEW_REQUIRED"
        except Exception as exc:
            previous = existing.get(normalize_url(url), {})
            attempts = int(previous.get("attempts", 0)) + 1
            item["attempts"] = attempts
            item["status"] = "FETCH_FAILED_RETRY" if attempts < 3 else "MANUAL_FETCH_REQUIRED"
            item["error"] = str(exc)[:500]
        new_items.append(item)
        time.sleep(1.0)
    manifest_items = manifest.setdefault("items", [])
    for item in new_items:
        url_key = normalize_url(item.get("official_product_page_url"))
        manifest_items[:] = [old for old in manifest_items if normalize_url(old.get("official_product_page_url")) != url_key]
        manifest_items.append(item)
    manifest.setdefault("runs", []).append({
        "run_at": datetime.now(timezone.utc).isoformat(),
        "candidate_count": len(new_items),
        "remaining_exact_pages": max(0, total_pending - len(batch)),
        "review_only": True,
    })
    manifest["updated_at"] = datetime.now(timezone.utc).isoformat()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    make_contact_sheet(manifest["items"])
    print("AUDISON_OFFICIAL_CANDIDATE_BATCH")
    print(json.dumps({"processed": len(new_items), "remaining": max(0, total_pending-len(batch)), "total_candidates": len(manifest["items"]), "review_only": True}, indent=2))

if __name__ == "__main__":
    main()
