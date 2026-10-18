#!/usr/bin/env python3
"""Read-only ASC catalogue reconciliation. Never writes to Supabase or the store."""
import csv, json, os, re, sys, time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin
import requests

ASC_BASE = os.getenv("ASC_BASE", "https://accessoriesspares.co.za").rstrip("/")
SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_ANON_KEY")
if not SUPABASE_KEY:
    raise SystemExit("Set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY as a GitHub secret.")
OUT = Path(os.getenv("REPORT_DIR", "artifacts/asc-reconciliation"))
OUT.mkdir(parents=True, exist_ok=True)
STAMP = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
HEADERS = {"User-Agent": "GetWiredAutoWorx-ReadOnly-Reconciliation/1.0", "Accept": "application/json"}
session = requests.Session()
session.headers.update(HEADERS)

def fetch_json(url, params=None, headers=None):
    r = session.get(url, params=params, headers=headers, timeout=(10, 45))
    r.raise_for_status()
    return r.json()

def pages_from_asc():
    """Use public WooCommerce Store API pagination; stop only on empty page."""
    result, page, seen = [], 1, set()
    while True:
        url = ASC_BASE + "/wp-json/wc/store/v1/products"
        try:
            batch = fetch_json(url, {"page": page, "per_page": 100, "catalog_visibility": "visible"})
        except requests.HTTPError as exc:
            raise RuntimeError(f"ASC Store API failed at page {page}: {exc}") from exc
        if not isinstance(batch, list):
            raise RuntimeError(f"ASC API returned non-list data at page {page}; refusing partial report.")
        if not batch:
            break
        added = 0
        for p in batch:
            sku = str(p.get("sku") or "").strip()
            # Exact supplier SKU is required for any match. Keep SKU-less cards for completeness
            # reporting, but never join them by title.
            key = sku.casefold()
            if key and key not in seen:
                seen.add(key)
            result.append({
                "asc_sku": sku, "asc_name": str(p.get("name") or "").strip(),
                "asc_status": "IN_STOCK" if p.get("is_in_stock") is True else ("OUT_OF_STOCK" if p.get("is_in_stock") is False else "UNVERIFIED"),
                "asc_stock_quantity": p.get("stock_quantity") if isinstance(p.get("stock_quantity"), (int,float)) else "",
                "asc_categories": " > ".join(str(c.get("name") or "") for c in (p.get("categories") or [])),
                "asc_image_url": str(((p.get("images") or [{}])[0]).get("src") or ""),
                "asc_product_url": str(p.get("permalink") or ""),
                "asc_source_id": str(p.get("id") or ""),
            })
            added += 1
        if len(batch) < 100:
            # Do one next-page request to distinguish a genuinely complete final page
            # from a server silently capping results. Empty confirms completion.
            page += 1
            continue
        page += 1
        if page % 5 == 0:
            time.sleep(0.5)
        if page > 1000:
            raise RuntimeError("Safety stop: exceeded 1000 pages; report not considered complete.")
    return result

def pages_from_supabase():
    headers = {"apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY, "Accept": "application/json"}
    url = SUPABASE_URL + "/rest/v1/products"
    rows, offset = [], 0
    select = "id,sku,public_sku,name,description,stock_quantity,active,image_url,category_id"
    while True:
        r = session.get(url, params={"select": select, "active": "eq.true", "order": "sku.asc", "limit": 1000, "offset": offset}, headers=headers, timeout=(10,45))
        r.raise_for_status()
        batch = r.json()
        if not isinstance(batch, list):
            raise RuntimeError("Supabase returned unexpected catalogue response; refusing partial report.")
        rows.extend(batch)
        if len(batch) < 1000:
            break
        offset += len(batch)
        if offset > 100000:
            raise RuntimeError("Safety stop: unexpectedly large Supabase catalogue.")
    return rows

def norm(s):
    return re.sub(r"[^A-Z0-9]", "", str(s or "").upper())

def main():
    asc = pages_from_asc()
    store = pages_from_supabase()
    asc_by_sku = {}
    for item in asc:
        k = norm(item["asc_sku"])
        if k:
            asc_by_sku.setdefault(k, []).append(item)
    store_by_sku = {}
    for item in store:
        k = norm(item.get("sku"))
        if k:
            store_by_sku.setdefault(k, []).append(item)
    outpath = OUT / f"asc_sku_reconciliation_{STAMP}.csv"
    fields = ["store_id","store_sku","public_sku","store_name","store_stock_quantity","store_image_url","store_category_id",
      "asc_sku","asc_name","asc_status","asc_stock_quantity","asc_categories","asc_image_url","asc_product_url",
      "match_count_asc","match_count_store","recommended_action","evidence_note","source_checked_at_utc"]
    counts = {}
    with outpath.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=fields); w.writeheader()
        for s in store:
            key = norm(s.get("sku"))
            matches = asc_by_sku.get(key, []) if key else []
            action, note, a = "REVIEW_NO_EXACT_ASC_SKU", "No exact normalized supplier-SKU match; do not infer from product name.", {}
            if len(matches) > 1:
                action, note = "REVIEW_DUPLICATE_ASC_SKU", "ASC returns multiple products for the same normalized SKU; no automatic correction."
            elif len(matches) == 1:
                a = matches[0]
                title_same = str(s.get("name") or "").strip().casefold() == a["asc_name"].casefold()
                if a["asc_status"] == "OUT_OF_STOCK":
                    action, note = "REVIEW_CONFIRMED_ASC_OUT_OF_STOCK", "Exact SKU matches ASC listing marked out of stock; stage availability correction, do not deactivate automatically."
                elif a["asc_status"] == "IN_STOCK":
                    action, note = "REVIEW_STOCK_AND_METADATA", "Exact SKU match and ASC reports in stock; API does not prove quantity is current/complete."
                else:
                    action, note = "REVIEW_ASC_STATUS_UNVERIFIED", "Exact SKU match but ASC availability is not explicit."
                if not title_same:
                    note += " Product title differs; review description/specification before replacement."
                if not a["asc_image_url"]:
                    note += " No ASC image URL returned; keep neutral placeholder until exact authorised image verified."
                if not a["asc_categories"]:
                    note += " ASC category missing from API response; do not guess."
            counts[action] = counts.get(action, 0) + 1
            w.writerow({
              "store_id":s.get("id"),"store_sku":s.get("sku"),"public_sku":s.get("public_sku"),
              "store_name":s.get("name"),"store_stock_quantity":s.get("stock_quantity"),"store_image_url":s.get("image_url"),
              "store_category_id":s.get("category_id"),"asc_sku":a.get("asc_sku",""),"asc_name":a.get("asc_name",""),
              "asc_status":a.get("asc_status",""),"asc_stock_quantity":a.get("asc_stock_quantity",""),
              "asc_categories":a.get("asc_categories",""),"asc_image_url":a.get("asc_image_url",""),
              "asc_product_url":a.get("asc_product_url",""),"match_count_asc":len(matches),
              "match_count_store":len(store_by_sku.get(key,[])) if key else 0,"recommended_action":action,
              "evidence_note":note,"source_checked_at_utc":datetime.now(timezone.utc).isoformat()
            })
    summary = {
      "generated_at_utc":datetime.now(timezone.utc).isoformat(),
      "asc_api_records":len(asc),"asc_unique_nonblank_skus":len(asc_by_sku),
      "store_active_products":len(store),"store_unique_nonblank_skus":len(store_by_sku),
      "asc_duplicate_sku_groups":sum(1 for v in asc_by_sku.values() if len(v)>1),
      "store_duplicate_sku_groups":sum(1 for v in store_by_sku.values() if len(v)>1),
      "actions":counts,"csv":str(outpath),"read_only":True,
      "limitations":["This script never writes catalogue rows.","ASC API availability does not always expose numeric stock quantities.",
        "Category names are source evidence, not an automatic mapping into the eight owner-approved store roots.",
        "Image URL identity and public-use rights must be verified before publication.",
        "An API error or incomplete pagination fails the run rather than producing a success report."]
    }
    (OUT / f"summary_{STAMP}.json").write_text(json.dumps(summary,indent=2),encoding="utf-8")
    print(json.dumps(summary,indent=2))
    # Duplicate store SKUs and zero exact joins are surfaced as review findings,
    # not failed silently; a complete run means collection completed, not corrections approved.
if __name__ == "__main__":
    main()
