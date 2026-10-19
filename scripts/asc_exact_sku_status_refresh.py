#!/usr/bin/env python3
"""Read-only exact-SKU refresh against ASC public WooCommerce Store API and product pages.
Never writes to Supabase or the storefront catalogue.
"""
from __future__ import annotations
import csv
import json
import os
import re
import time
from collections import Counter
from pathlib import Path
from urllib.parse import quote

import requests
from bs4 import BeautifulSoup

BASE = os.environ.get("ASC_BASE", "https://accessoriesspares.co.za").rstrip("/")
INPUT = Path(os.environ.get("ASC_REVIEW_CSV", "staging/ASC_STOCK_DISCONTINUATION_REVIEW_2026-10-19.csv"))
OUT = Path(os.environ.get("ASC_REPORT_DIR", "qa-evidence/asc-status-refresh"))
OUT.mkdir(parents=True, exist_ok=True)
API = BASE + "/wp-json/wc/store/v1/products"
TIMEOUT = (5, 18)
UA = "Mozilla/5.0 (compatible; GetWiredAutoWorx-ReadOnlySupplierStatusAudit/1.0)"
DISCONTINUED = re.compile(r"will\s+discontinue|discontinued|not\s+viable|maker\s+stop\s+making|supplier.{0,30}discontinu", re.I)
OUT_OF_STOCK = re.compile(r"out\s+of\s+stock|sold\s+out|unavailable", re.I)
IN_STOCK = re.compile(r"\b(?:in\s+stock|\d+\s+in\s+stock|stock\s*:\s*\d+)\b", re.I)

session = requests.Session()
session.headers.update({"User-Agent": UA, "Accept": "application/json,text/html;q=0.9,*/*;q=0.8"})

def stock_qty(text: str):
    patterns = [r"(\d+)\s+in\s+stock", r"stock\s*:\s*(\d+)", r"\bquantity\s*:\s*(\d+)"]
    for pat in patterns:
        m = re.search(pat, text, re.I)
        if m:
            try: return int(m.group(1))
            except ValueError: pass
    return None

def product_page_evidence(url: str, sku: str):
    try:
        r = session.get(url, timeout=TIMEOUT)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        title_el = soup.select_one("h1.product_title, h1.entry-title, main h1, h1")
        title = title_el.get_text(" ", strip=True) if title_el else ""
        summary = soup.select_one(".summary, .product-summary, .product-details, .entry-summary")
        stock_nodes = soup.select(".stock, p.stock, .availability, .stock-status")
        meta = soup.select_one(".product_meta")
        relevant = " ".join([
            title,
            summary.get_text(" ", strip=True) if summary else "",
            " ".join(x.get_text(" ", strip=True) for x in stock_nodes),
            meta.get_text(" ", strip=True) if meta else "",
        ])
        sku_match = bool(re.search(r"(?<![A-Za-z0-9])SKU\s*:?\s*" + re.escape(sku) + r"(?![A-Za-z0-9])", relevant, re.I))
        # The API exact-SKU match is the primary identity evidence. If the page
        # does not repeat the SKU, keep the page evidence unverified.
        return {
            "page_http_status": r.status_code,
            "page_title": title,
            "page_sku_confirmed": sku_match,
            "page_evidence_text": relevant[:1800],
            "page_discontinuation_flag": bool(DISCONTINUED.search(relevant)),
            "page_out_of_stock_flag": bool(OUT_OF_STOCK.search(relevant)),
            "page_stock_quantity": stock_qty(relevant),
            "page_url": r.url,
        }
    except Exception as exc:
        return {"page_http_status": None, "page_title": "", "page_sku_confirmed": False,
                "page_evidence_text": "", "page_discontinuation_flag": False,
                "page_out_of_stock_flag": False, "page_stock_quantity": None,
                "page_url": url, "page_error": type(exc).__name__ + ": " + str(exc)[:240]}

def check_sku(row):
    sku = (row.get("supplier_sku") or "").strip()
    result = {
        "supplier_sku": sku,
        "public_sku": row.get("public_sku", ""),
        "store_product_name": row.get("store_product_name", ""),
        "checked_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "api_exact_sku_match": False,
        "api_is_in_stock": None,
        "api_stock_quantity": None,
        "discontinuation_flag": False,
        "out_of_stock_flag": False,
        "decision": "REVIEW",
        "source_url": "",
        "source_title": "",
        "evidence_text": "",
        "error": "",
    }
    try:
        r = session.get(API, params={"sku": sku, "per_page": 10}, timeout=TIMEOUT,
                        headers={"Accept": "application/json"})
        result["api_http_status"] = r.status_code
        r.raise_for_status()
        data = r.json()
        products = data if isinstance(data, list) else []
        product = next((p for p in products if str(p.get("sku") or "").strip().casefold() == sku.casefold()), None)
        if not product:
            result["decision"] = "REVIEW_NOT_FOUND"
            result["error"] = "No exact SKU in public Store API response; absence is not proof of discontinuation."
            return result
        result["api_exact_sku_match"] = True
        result["source_title"] = str(product.get("name") or "")
        result["source_url"] = str(product.get("permalink") or "")
        if isinstance(product.get("is_in_stock"), bool):
            result["api_is_in_stock"] = product["is_in_stock"]
        if isinstance(product.get("stock_quantity"), (int, float)):
            result["api_stock_quantity"] = int(product["stock_quantity"])
        page = product_page_evidence(result["source_url"], sku) if result["source_url"] else {}
        result.update({k: v for k, v in page.items() if k not in ("page_url",)})
        if page.get("page_url"):
            result["source_url"] = page["page_url"]
        result["discontinuation_flag"] = bool(DISCONTINUED.search(result["source_title"]) or page.get("page_discontinuation_flag"))
        result["out_of_stock_flag"] = bool(result["api_is_in_stock"] is False or page.get("page_out_of_stock_flag"))
        result["evidence_text"] = (page.get("page_evidence_text") or result["source_title"])[:1800]
        if result["discontinuation_flag"] and result["out_of_stock_flag"]:
            result["decision"] = "REVIEW_DISCONTINUED_AND_OUT_OF_STOCK"
        elif result["discontinuation_flag"]:
            result["decision"] = "REVIEW_DISCONTINUATION"
        elif result["out_of_stock_flag"]:
            result["decision"] = "REVIEW_OUT_OF_STOCK"
        elif result["api_is_in_stock"] is True or IN_STOCK.search(result["evidence_text"]):
            result["decision"] = "SOURCE_REPORTS_IN_STOCK"
        else:
            result["decision"] = "REVIEW_STATUS_UNCLEAR"
    except Exception as exc:
        result["decision"] = "REVIEW_NETWORK_OR_API_ERROR"
        result["error"] = type(exc).__name__ + ": " + str(exc)[:300]
    return result

def main():
    if not INPUT.exists():
        raise SystemExit(f"Input review CSV missing: {INPUT}")
    with INPUT.open(newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))
    if not rows:
        raise SystemExit("Input review CSV has no rows.")
    results = []
    for i, row in enumerate(rows, 1):
        result = check_sku(row)
        results.append(result)
        print(f"[{i}/{len(rows)}] {result['supplier_sku']}: {result['decision']}", flush=True)
        if i < len(rows):
            time.sleep(0.8)
    json_path = OUT / "asc-status-refresh.json"
    csv_path = OUT / "asc-status-refresh.csv"
    json_path.write_text(json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8")
    columns = sorted({k for row in results for k in row})
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        writer.writerows(results)
    counts = Counter(x["decision"] for x in results)
    print("Read-only source outcomes:", json.dumps(counts, sort_keys=True))
    print("No production catalogue or stock writes were attempted.")
    print(f"Reports: {csv_path} and {json_path}")

if __name__ == "__main__":
    main()
