import io
import json
import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from PIL import Image

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_KEY"]
ASC_BASE = os.environ.get("ASC_BASE", "https://accessoriesspares.co.za")
OUT = Path("assets/products_webp")
REPORT = Path("image-sync/asc_image_sync_report.json")
BATCH_SIZE = 40
RETRY_AFTER_DAYS = 30
SYNC_VERSION = 6
NOW = datetime.now(timezone.utc)
OUT.mkdir(parents=True, exist_ok=True)
REPORT.parent.mkdir(parents=True, exist_ok=True)

try:
    history = json.loads(REPORT.read_text(encoding="utf-8"))
    if not isinstance(history, list):
        history = []
except (OSError, ValueError):
    history = []

latest = {x.get("public_sku"): x for x in history if x.get("public_sku")}

def load_targets():
    headers = {"apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY, "Accept": "application/json"}
    rows, offset = [], 0
    while True:
        url = (
            SUPABASE_URL + "/rest/v1/products?select=sku,public_sku,name"
            "&active=eq.true&or=(image_url.is.null,image_url.eq.,image_url.ilike.*placeholder*)"
            "&order=public_sku&limit=1000&offset=" + str(offset)
        )
        response = requests.get(url, headers=headers, timeout=(3, 12))
        response.raise_for_status()
        batch = response.json()
        if not isinstance(batch, list):
            raise RuntimeError("Unexpected catalogue API response")
        rows.extend(batch)
        if len(batch) < 1000:
            break
        offset += 1000
    eligible = []
    for row in rows:
        public_sku = (row.get("public_sku") or "").strip().upper()
        supplier_sku = (row.get("sku") or "").strip()
        if not re.fullmatch(r"GW-[A-Z0-9]{8}", public_sku):
            continue
        if not re.fullmatch(r"[A-Za-z0-9._/-]{1,80}", supplier_sku):
            continue
        if (OUT / (public_sku + ".webp")).exists():
            continue
        prior = latest.get(public_sku, {})
        attempted = prior.get("attempted_at")
        # Ignore outcomes from the old SKU-only search strategy; version 2
        # searches by product name first and must retry those records.
        if prior.get("sync_version") == SYNC_VERSION and attempted:
            try:
                attempted_at = datetime.fromisoformat(attempted.replace("Z", "+00:00"))
                if attempted_at > NOW - timedelta(days=RETRY_AFTER_DAYS):
                    continue
            except (TypeError, ValueError):
                pass
        eligible.append({"public_sku": public_sku, "supplier_sku": supplier_sku, "name": row.get("name") or ""})
    return len(rows), eligible

def save_valid_webp(raw, path):
    try:
        image = Image.open(io.BytesIO(raw))
        image.load()
        if image.width < 80 or image.height < 80:
            return False
        image = image.convert("RGB")
        image.thumbnail((1000, 1000), Image.Resampling.LANCZOS)
        image.save(path, "WEBP", quality=82, method=5)
        if not path.exists() or path.stat().st_size <= 1500:
            path.unlink(missing_ok=True)
            return False
        return True
    except Exception:
        return False

def sync_one(item):
    public_sku = item["public_sku"]
    supplier_sku = item["supplier_sku"]
    target = OUT / (public_sku + ".webp")
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0 (compatible; Get-Wired-AutoWorx-ImageAudit/3.0)", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"})
    status = "no_product_cards"
    try:
        product_name = item.get("name", "").strip()
        name_terms = re.findall(r"[A-Za-z0-9]+", product_name)
        short_name = " ".join(name_terms[:4])
        encoded_name = requests.utils.quote(product_name, safe="")
        encoded_short_name = requests.utils.quote(short_name, safe="")
        encoded_sku = requests.utils.quote(supplier_sku, safe="")
        searches = list(dict.fromkeys((
            f"{ASC_BASE}/?s={encoded_name}&post_type=product",
            f"{ASC_BASE}/?s={encoded_short_name}&post_type=product",
            f"{ASC_BASE}/?s={encoded_sku}&post_type=product",
        )))
        for search_url in searches:
            try:
                response = session.get(search_url, timeout=(5, 15))
                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")
                exact_card = None
                cards = soup.select("li.product, .product.type-product, article.product")
                if cards:
                    status = "sku_not_in_search_results"
                for card in cards:
                    text = card.get_text(" ", strip=True)
                    if re.search(r"(?<![A-Za-z0-9])SKU\s*:\s*" + re.escape(supplier_sku) + r"(?![A-Za-z0-9])", text, re.I):
                        exact_card = card
                        break
                if exact_card is None:
                    continue
                image_tag = exact_card.select_one("img")
                if image_tag is None:
                    status = "exact_sku_card_without_image"
                    continue
                image_url = image_tag.get("data-src") or image_tag.get("data-lazy-src") or image_tag.get("data-original") or image_tag.get("src")
                if not image_url:
                    status = "exact_sku_card_without_image_url"
                    continue
                if image_url.startswith("//"):
                    image_url = "https:" + image_url
                elif image_url.startswith("/"):
                    image_url = ASC_BASE + image_url
                image_response = session.get(image_url, timeout=(5, 15))
                image_response.raise_for_status()
                if not (image_response.headers.get("content-type") or "").lower().startswith("image/"):
                    status = "candidate_url_not_image"
                    continue
                if save_valid_webp(image_response.content, target):
                    return {"public_sku": public_sku, "status": "matched", "attempted_at": NOW.isoformat(), "sync_version": SYNC_VERSION}
            except requests.Timeout:
                status = "source_timeout"
            except requests.HTTPError as exc:
                status = "source_http_" + str(exc.response.status_code if exc.response is not None else "error")
            except requests.ConnectionError:
                status = "source_connection_error"
            except requests.RequestException:
                status = "source_request_error"
            except Exception:
                status = "image_validation_failed"
        return {"public_sku": public_sku, "status": status, "attempted_at": NOW.isoformat(), "sync_version": SYNC_VERSION}
    finally:
        session.close()

def main():
    try:
        probe = requests.get(ASC_BASE, headers={"User-Agent": "Mozilla/5.0 (compatible; Get-Wired-AutoWorx-ImageAudit/3.0)"}, timeout=(5, 15))
        print(f"ASC source connectivity: HTTP {probe.status_code}; response bytes: {len(probe.content)}")
        probe.raise_for_status()
    except requests.RequestException as exc:
        print(f"ASC source connectivity probe warning: {type(exc).__name__}: {exc}; continuing with bounded per-SKU requests.", flush=True)
    total, candidates = load_targets()
    batch = candidates[:BATCH_SIZE]
    print(f"Missing-image targets: {total}; eligible: {len(candidates)}; diagnostic batch: {len(batch)}")
    if not batch:
        print("No eligible targets in this run.")
        return
    results = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(sync_one, item) for item in batch]
        for completed, future in enumerate(as_completed(futures), start=1):
            try:
                result = future.result()
                results.append(result)
                print(f"[{completed}/{len(batch)}] {result.get('public_sku')}: {result.get('status')}", flush=True)
            except Exception:
                results.append({"public_sku": "GW-UNKNOWN", "status": "worker_error", "attempted_at": NOW.isoformat(), "sync_version": SYNC_VERSION})
                print(f"[{completed}/{len(batch)}] worker_error", flush=True)
    merged = {x.get("public_sku"): x for x in history if x.get("public_sku")}
    for result in results:
        if result.get("public_sku") != "GW-UNKNOWN":
            merged[result["public_sku"]] = result
    REPORT.write_text(json.dumps(sorted(merged.values(), key=lambda x: x.get("public_sku", "")), indent=2), encoding="utf-8")
    print(f"Exact-SKU images verified and saved: {sum(x.get('status') == 'matched' for x in results)}")
    from collections import Counter
    print(f"Unresolved or timed out in this batch: {sum(x.get('status') != 'matched' for x in results)}")
    print("Outcome reasons:", json.dumps(Counter(x.get("status", "unknown") for x in results), sort_keys=True))

if __name__ == "__main__":
    main()
