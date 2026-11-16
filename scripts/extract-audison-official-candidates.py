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
        self.image_candidates = []
        self._anchor = None
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag.lower() == "meta":
            key = (attrs.get("property") or attrs.get("name") or "").strip().lower()
            value = (attrs.get("content") or "").strip()
            if key and value:
                self.meta[key] = html.unescape(value)
        elif tag.lower() == "a":
            self._anchor = {
                "url": attrs.get("href") or "",
                "label": clean_text(attrs.get("aria-label") or attrs.get("title") or ""),
            }
        elif tag.lower() == "img":
            image_url = attrs.get("data-src") or attrs.get("data-lazy-src") or attrs.get("data-original") or attrs.get("src") or ""
            if not image_url:
                srcset = attrs.get("data-srcset") or attrs.get("srcset") or ""
                if srcset:
                    image_url = srcset.split(",")[0].strip().split(" ")[0]
            alt = clean_text(attrs.get("alt") or attrs.get("title") or "")
            if image_url:
                self.image_candidates.append({"url": image_url, "alt": alt})
        elif tag.lower() == "title":
            self._title = True
        elif tag.lower() == "h1":
            self._h1 = True
        elif tag.lower() == "script" and "ld+json" in (attrs.get("type") or "").lower():
            self._script_json = True
            self._script_parts = []
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._anchor:
            if self._anchor.get("url") and self._anchor.get("label"):
                self.image_candidates.append({"url": self._anchor["url"], "alt": self._anchor["label"]})
            self._anchor = None
        elif tag.lower() == "title": self._title = False
        elif tag.lower() == "h1": self._h1 = False
        elif tag.lower() == "script" and self._script_json:
            self._script_json = False
            raw = "".join(self._script_parts).strip()
            if raw: self.jsonld.append(raw)
    def handle_data(self, data):
        if self._title: self.title_parts.append(data)
        if self._h1: self.h1_parts.append(data)
        if self._script_json: self._script_parts.append(data)
        if self._anchor and not self._anchor.get("label"):
            self._anchor["label"] = clean_text(data)

def clean_text(value):
    return re.sub(r"\s+", " ", html.unescape(str(value or ""))).strip()

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
    og_image_url = parser.meta.get("og:image") or parser.meta.get("twitter:image") or ""
    products = extract_jsonld(parser)
    jsonld_image_urls = []
    for product in products:
        description = description or clean_text(product.get("description"))
        image = product.get("image")
        if isinstance(image, list): image = image[0] if image else ""
        if isinstance(image, dict): image = image.get("url", "")
        if isinstance(image, str) and image:
            jsonld_image_urls.append(urljoin(final_url, image))
    return {
        "final_url": final_url,
        "page_title": title,
        "h1": h1,
        "meta_description": clean_text(description),
        "og_image_url": urljoin(final_url, og_image_url) if og_image_url else "",
        "jsonld_image_urls": jsonld_image_urls,
        "image_candidates": [
            {"url": urljoin(final_url, item["url"]), "alt": item["alt"]}
            for item in parser.image_candidates
        ],
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

def select_exact_model_image(image_candidates, source_model):
    """Accept a gallery image only when its own alt/title identifies the exact model."""
    target = re.sub(r"[^a-z0-9]+", "", clean_text(source_model).casefold())
    if not target:
        return None
    for candidate in image_candidates:
        label = clean_text(candidate.get("alt"))
        label = re.sub(r"^(?:image|product image)\\s*:\\s*", "", label, flags=re.IGNORECASE)
        alt_key = re.sub(r"[^a-z0-9]+", "", label.casefold())
        candidate_url = clean_text(candidate.get("url"))
        parsed = urlparse(candidate_url)
        if parsed.path and not re.search(r"\\.(?:png|jpe?g|webp|avif)$", parsed.path, flags=re.IGNORECASE):
            continue
        if parsed.hostname and parsed.hostname.lower() not in ALLOWED_IMAGE_HOSTS:
            continue
        if target and target == alt_key:
            return candidate
    return None


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
    candidates = [x for x in items if x.get("local_image_path") and x.get("image_review_status") != "REJECTED_SHARED_IMAGE_HASH" and (ROOT / x["local_image_path"]).exists()]
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

def normalize_audit_row(raw):
    """Normalize current or legacy Audison audit rows; reject collection-only matches."""
    if "manufacturer_match_status" in raw:
        if clean_text(raw.get("manufacturer_match_status")) != "EXACT OFFICIAL INDIVIDUAL PRODUCT PAGE FOUND":
            return None
        source_title = clean_text(raw.get("source_description"))
        source_model = clean_text(raw.get("source_model_in_description"))
        if not source_model:
            parts = [clean_text(part) for part in source_title.split(" - ")]
            if len(parts) >= 3 and parts[0].casefold() == "audison":
                source_model = parts[1]
        return {
            "brand": "Audison", "source_model": source_model,
            "source_title": source_title, "source_component": "",
            "source_sku": clean_text(raw.get("supplier_sku_reference_only")),
            "official_product_page_url": clean_text(raw.get("official_manufacturer_reference")),
            "image_url_candidate": "",
        }
    if raw.get("match_status") != "OFFICIAL_EXACT_PRODUCT_PAGE":
        return None
    return {
        "brand": clean_text(raw.get("brand")) or "Audison",
        "source_model": clean_text(raw.get("source_model")),
        "source_title": clean_text(raw.get("source_title")),
        "source_component": clean_text(raw.get("source_component")),
        "source_sku": clean_text(raw.get("source_sku")),
        "official_product_page_url": clean_text(raw.get("official_product_page_url")),
        "image_url_candidate": clean_text(raw.get("image_url_candidate")),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=5)
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = read_manifest()
    existing = {x.get("official_product_page_url"): x for x in manifest.get("items", [])}
    hashes = {}
    for prior_item in manifest.get("items", []):
        digest = prior_item.get("image_sha256")
        if digest:
            hashes.setdefault(digest, []).append(prior_item)
    for digest, duplicates in hashes.items():
        if len(duplicates) > 1:
            for duplicate in duplicates:
                duplicate["image_review_status"] = "REJECTED_SHARED_IMAGE_HASH"
                duplicate["image_review_reason"] = "Identical image bytes are reused across distinct models; generic/shared image is not an exact-model product image."
    overrides_path = ROOT / "assets/audio-product-enrichment-overrides.json"
    override_tokens = []
    if overrides_path.exists():
        for item in json.loads(overrides_path.read_text(encoding="utf-8")).get("records", []):
            token = (item.get("match") or {}).get("title_contains")
            if token: override_tokens.append(str(token).casefold())
    with AUDIT.open(newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    pending = []
    for raw in rows:
        row = normalize_audit_row(raw)
        if not row:
            continue
        url = row["official_product_page_url"]
        if not url:
            continue
        prior = existing.get(url)
        if prior and prior.get("status") != "FETCH_FAILED_RETRY" and prior.get("image_review_status") not in {"REJECTED_SHARED_IMAGE_HASH", "NO_EXACT_MODEL_IMAGE_ALT"}:
            continue
        if prior and int(prior.get("attempts", 0)) >= 3:
            continue
        if (urlparse(url).hostname or "").lower() not in ALLOWED_PAGE_HOSTS:
            continue
        title = row["source_title"]
        if any(token and token in title.casefold() for token in override_tokens):
            continue
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
            exact_image = select_exact_model_image(page.get("image_candidates", []), source_model)
            item["og_image_url"] = page.get("og_image_url", "")
            item["jsonld_image_urls"] = page.get("jsonld_image_urls", [])
            if exact_image:
                candidate_image = exact_image["url"]
                item["image_url"] = candidate_image
                item["image_alt"] = exact_image.get("alt", "")
                item["image_match_evidence"] = "EXACT_SOURCE_MODEL_IN_OFFICIAL_GALLERY_IMAGE_ALT"
                item.update(download_image(candidate_image, candidate_id))
                item["image_review_status"] = "EXACT_MODEL_ALT_CANDIDATE_REQUIRES_VISUAL_REVIEW"
                item["status"] = "EXTRACTED_REQUIRES_VISUAL_AND_MODEL_REVIEW"
            else:
                item["image_url"] = ""
                item["image_review_status"] = "NO_EXACT_MODEL_IMAGE_ALT"
                item["image_review_reason"] = "No official gallery image alt/title contains the exact source model; generic Open Graph and unlabelled JSON-LD images are not accepted."
                item["status"] = "EXACT_MODEL_PAGE_NO_EXACT_IMAGE_CANDIDATE"
        except Exception as exc:
            previous = existing.get(url, {})
            attempts = int(previous.get("attempts", 0)) + 1
            item["attempts"] = attempts
            item["status"] = "FETCH_FAILED_RETRY" if attempts < 3 else "MANUAL_FETCH_REQUIRED"
            item["error"] = str(exc)[:500]
        new_items.append(item)
        time.sleep(1.0)
    # Replace rejected historical generic-image candidates in place; do not duplicate audit rows.
    manifest_items = manifest.setdefault("items", [])
    positions = {item.get("official_product_page_url"): index for index, item in enumerate(manifest_items)}
    for item in new_items:
        url = item.get("official_product_page_url")
        if url in positions:
            manifest_items[positions[url]] = item
        else:
            positions[url] = len(manifest_items)
            manifest_items.append(item)
    manifest.setdefault("runs", []).append({
        "run_at": datetime.now(timezone.utc).isoformat(),
        "candidate_count": len(new_items),
        "remaining_exact_pages": max(0, len(pending) - len(batch)),
        "review_only": True,
    })
    manifest["updated_at"] = datetime.now(timezone.utc).isoformat()
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    make_contact_sheet(manifest["items"])
    print("AUDISON_OFFICIAL_CANDIDATE_BATCH")
    print(json.dumps({"processed": len(new_items), "remaining": max(0, len(pending)-len(batch)), "total_candidates": len(manifest["items"]), "review_only": True}, indent=2))

if __name__ == "__main__":
    main()
