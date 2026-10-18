#!/usr/bin/env python3
"""Polite, read-only crawler for the public ASC WooCommerce catalogue."""
from __future__ import annotations
import argparse, csv, json, math, re, sys, time, threading
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin
from urllib.robotparser import RobotFileParser
import requests
from bs4 import BeautifulSoup

BASE = "https://accessoriesspares.co.za"
SHOP = f"{BASE}/shop/"
USER_AGENT = "GetWiredAutoWorxCatalogueAudit/1.0.1 (read-only; contact via store owner)"
SKU_RE = re.compile(r"\bSKU\s*:\s*([A-Z0-9][A-Z0-9._/-]{1,40})\b", re.I)
STOCK_RE = re.compile(r"\b(\d[\d,]*)\s+in\s+stock\b", re.I)
STOCK_LABEL_RE = re.compile(r"\bStock\s*:\s*(\d[\d,]*)\b", re.I)
STATUS_PATTERNS = [
    ("DISCONTINUED_OR_DISCONTINUING", re.compile(r"\bdiscontinu(?:ed|e|ing)\b", re.I)),
    ("WILL_DISCONTINUE", re.compile(r"\bwill\s+discontinu(?:e|ed|ing)\b", re.I)),
    ("NOT_VIABLE", re.compile(r"\bnot\s+viable\b", re.I)),
    ("OUT_OF_STOCK", re.compile(r"\bout\s+of\s+stock\b|\bsold\s+out\b", re.I)),
]
RESULTS_RE = re.compile(r"Showing\s+([\d,]+)\s*[–-]\s*([\d,]+)\s+of\s+([\d,]+)\s+results", re.I)

def int_commas(value):
    return int(value.replace(",", ""))

def robots_allowed(session, url):
    robots_url = f"{BASE}/robots.txt"
    response = session.get(robots_url, timeout=20)
    if response.status_code >= 400:
        raise RuntimeError(f"Could not verify robots.txt ({response.status_code}); refusing to crawl.")
    parser = RobotFileParser()
    parser.set_url(robots_url)
    parser.parse(response.text.splitlines())
    return parser.can_fetch(USER_AGENT, url)

def parse_products(html, page_url):
    soup = BeautifulSoup(html, "html.parser")
    products, seen_urls = [], set()
    cards = soup.select("li.product, .products .product")
    for card in cards:
        link = card.select_one("a.woocommerce-LoopProduct-link, a.woocommerce-loop-product__link, a[href*='/product/']")
        title_node = card.select_one(".woocommerce-loop-product__title, h2, h3")
        title = " ".join((title_node or card).get_text(" ", strip=True).split())
        url = urljoin(page_url, link.get("href", "")) if link else ""
        if not title or not url or url in seen_urls:
            continue
        seen_urls.add(url)
        card_text = " ".join(card.get_text(" ", strip=True).split())
        sku_match = SKU_RE.search(card_text)
        stock_match = STOCK_RE.search(card_text) or STOCK_LABEL_RE.search(card_text)
        stock = int_commas(stock_match.group(1)) if stock_match else ""
        if re.search(r"\bout\s+of\s+stock\b|\bsold\s+out\b", card_text, re.I):
            stock_status = "OUT_OF_STOCK"
        elif stock != "":
            stock_status = "IN_STOCK"
        else:
            stock_status = "UNKNOWN"
        statuses = [label for label, pattern in STATUS_PATTERNS if pattern.search(title) or pattern.search(card_text)]
        categories = [x.get_text(" ", strip=True) for x in card.select(".ast-woo-product-category, .posted_in, .product-category")]
        products.append({
            "supplier_sku": sku_match.group(1).strip() if sku_match else "",
            "title": title, "stock_status": stock_status, "stock_quantity": stock,
            "supplier_status_flags": ";".join(statuses), "product_url": url,
            "category_labels": ";".join(dict.fromkeys(categories)), "source_page": page_url,
        })
    total = None
    result_text = soup.select_one(".woocommerce-result-count")
    if result_text:
        match = RESULTS_RE.search(" ".join(result_text.get_text(" ", strip=True).split()))
        if match:
            total = int_commas(match.group(3))
    return products, total

class RateLimiter:
    """Space request start times across workers; concurrency only hides network latency."""
    def __init__(self, interval):
        self.interval = interval
        self.lock = threading.Lock()
        self.next_start = 0.0

    def wait(self):
        with self.lock:
            now = time.monotonic()
            pause = max(0.0, self.next_start - now)
            self.next_start = max(now, self.next_start) + self.interval
        if pause:
            time.sleep(pause)


def detail_sku(url, limiter, user_agent):
    """Resolve SKUs omitted from listing cards by checking flagged product detail pages only."""
    limiter.wait()
    with requests.Session() as session:
        session.headers.update({"User-Agent": user_agent, "Accept": "text/html,application/xhtml+xml"})
        response = session.get(url, timeout=12)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    sku_node = soup.select_one(".product_meta .sku, span.sku, .sku_wrapper .sku")
    if sku_node:
        value = sku_node.get_text(" ", strip=True).strip()
        if value and value.lower() not in {"n/a", "na", "—", "-"}:
            return value
    text = " ".join(soup.get_text(" ", strip=True).split())
    match = re.search(r"\bSKU\s*:\s*([A-Z0-9][A-Z0-9._/-]{1,40})\b", text, re.I)
    return match.group(1).strip() if match else ""


def write_csv(path, rows):
    fields = ["supplier_sku", "sku_source", "title", "stock_status", "stock_quantity", "supplier_status_flags", "product_url", "category_labels", "source_page"]
    with path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--output-dir", default="asc-catalogue-output")
    ap.add_argument("--max-pages", type=int, default=0, help="0 means all pages; set a small number for a trial.")
    ap.add_argument("--delay", type=float, default=1.0, help="Seconds between page requests; minimum 0.8.")
    args = ap.parse_args()
    delay = max(0.8, args.delay)
    out_dir = Path(args.output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"})
    first_url = f"{SHOP}?per_page=36"
    try:
        if not robots_allowed(session, first_url):
            raise RuntimeError("ASC robots.txt disallows crawling the shop URL; stopped without catalogue requests.")
        response = session.get(first_url, timeout=30)
        response.raise_for_status()
    except Exception as exc:
        print(f"ERROR: cannot safely start catalogue crawl: {exc}", file=sys.stderr)
        return 2
    first_rows, total = parse_products(response.text, response.url)
    if not first_rows:
        print("ERROR: no product cards parsed from first page; refusing to report an empty catalogue.", file=sys.stderr)
        return 3
    if not total:
        print("ERROR: could not read total result count; refusing to assume coverage.", file=sys.stderr)
        return 4
    page_size = len(first_rows)
    pages_needed = math.ceil(total / page_size)
    pages_to_fetch = min(pages_needed, args.max_pages) if args.max_pages > 0 else pages_needed
    rows, failures = list(first_rows), []
    print(f"ASC catalogue total={total}; first page={len(first_rows)}; pages planned={pages_to_fetch}/{pages_needed}", flush=True)
    for page in range(2, pages_to_fetch + 1):
        url = f"{SHOP}page/{page}/?per_page={page_size}"
        got = False
        for attempt in range(3):
            try:
                time.sleep(delay * (1 if attempt == 0 else 2))
                r = session.get(url, timeout=30)
                r.raise_for_status()
                page_rows, _ = parse_products(r.text, r.url)
                if not page_rows:
                    raise ValueError("no product cards parsed")
                rows.extend(page_rows)
                got = True
                if page % 25 == 0 or page == pages_to_fetch:
                    print(f"Progress page {page}/{pages_to_fetch}; rows={len(rows)}; unique SKUs={len({x['supplier_sku'] for x in rows if x['supplier_sku']})}", flush=True)
                break
            except Exception as exc:
                print(f"page={page} attempt={attempt+1}: {type(exc).__name__}: {exc}", file=sys.stderr, flush=True)
        if not got:
            failures.append({"page": str(page), "url": url, "error": "all retries failed"})
    # Resolve missing SKUs only for status candidates. Requests are globally spaced, with
    # bounded concurrency to avoid making each slow detail page add its full latency serially.
    enrich_failures = []
    limiter = RateLimiter(delay)
    pending = [
        (index, row) for index, row in enumerate(rows)
        if (bool(row["supplier_status_flags"]) or row["stock_status"] == "OUT_OF_STOCK" or row["stock_quantity"] == 0)
        and not row["supplier_sku"] and row["product_url"]
    ]

    def resolve_candidate(item):
        index, row = item
        try:
            return index, detail_sku(row["product_url"], limiter, USER_AGENT), None
        except Exception as exc:
            return index, "", {"url": row["product_url"], "error": f"{type(exc).__name__}: {exc}"}

    with ThreadPoolExecutor(max_workers=10) as executor:
        for index, sku, error in executor.map(resolve_candidate, pending):
            rows[index]["supplier_sku"] = sku
            rows[index]["sku_source"] = "product_detail" if sku else ("detail_fetch_failed" if error else "unresolved")
            if error:
                enrich_failures.append(error)
    write_csv(out_dir / "asc_catalogue_all.csv", rows)
    candidates = [r for r in rows if r["supplier_status_flags"] or r["stock_status"] == "OUT_OF_STOCK" or r["stock_quantity"] == 0]
    write_csv(out_dir / "asc_catalogue_status_candidates.csv", candidates)
    summary = {
        "supplier": BASE, "total_reported_by_supplier": total, "pages_expected": pages_needed,
        "pages_attempted": pages_to_fetch, "rows_parsed": len(rows),
        "rows_with_supplier_sku": sum(bool(r["supplier_sku"]) for r in rows),
        "unique_supplier_skus": len({r["supplier_sku"] for r in rows if r["supplier_sku"]}),
        "status_candidates": len(candidates), "candidate_skus_resolved_on_detail_pages": sum(r.get("sku_source") == "product_detail" for r in candidates),
        "candidate_skus_unresolved": sum(not r["supplier_sku"] for r in candidates),
        "detail_fetch_failures": enrich_failures, "failed_pages": failures,
        "complete": pages_to_fetch == pages_needed and not failures and not enrich_failures and len(rows) >= total,
        "robots_policy_checked": True, "read_only": True,
    }
    (out_dir / "crawl_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2), flush=True)
    if failures or enrich_failures:
        return 5
    if args.max_pages > 0 and pages_to_fetch < pages_needed:
        return 0  # An explicitly capped trial is successful but correctly marked incomplete.
    return 0 if summary["complete"] else 5

if __name__ == "__main__":
    raise SystemExit(main())
