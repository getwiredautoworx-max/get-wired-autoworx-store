import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index-new.html"
SNAPSHOT = ROOT / "assets" / "category-tree.json"
html = HTML.read_text(encoding="utf-8")
url_match = re.search(r"SUPABASE_URL\s*=\s*['\"]([^'\"]+)", html)
key_match = re.search(r"SUPABASE_KEY\s*=\s*['\"]([^'\"]+)", html)
if not url_match or not key_match:
    raise RuntimeError("Could not read the existing public Supabase connection from index-new.html")
SUPABASE_URL, SUPABASE_KEY = url_match.group(1), key_match.group(1)
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": "Bearer " + SUPABASE_KEY,
    "Prefer": "count=exact",
    "Accept": "application/json",
}

def fetch_all(path, page_size=1000):
    rows, start = [], 0
    while True:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/{path}",
            headers={**HEADERS, "Range": f"{start}-{start + page_size - 1}"},
            timeout=(5, 20),
        )
        response.raise_for_status()
        batch = response.json()
        if not isinstance(batch, list):
            raise RuntimeError("Unexpected catalogue API response")
        rows.extend(batch)
        if len(batch) < page_size:
            break
        start += page_size
    return rows

def main():
    categories = fetch_all("categories?select=id,name,slug,parent_id,active&order=name.asc")
    products = fetch_all("products?select=category_id&active=eq.true&order=id.asc")
    counts = Counter(p.get("category_id") for p in products if p.get("category_id"))
    snapshot_categories = [
        {
            "id": c["id"],
            "name": c["name"],
            "slug": c["slug"],
            "parent_id": c.get("parent_id"),
            "active": bool(c.get("active")),
            "direct_active_products": int(counts.get(c["id"], 0)),
        }
        for c in categories
    ]
    current = {}
    try:
        current = json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        pass
    if current.get("categories") == snapshot_categories:
        print(f"Category snapshot is current: {len(categories)} categories, {len(products)} active products; no commit needed.")
        return
    payload = {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "Supabase active category rows and active product assignments; refreshed automatically by GitHub Actions.",
        "categories": snapshot_categories,
    }
    SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    SNAPSHOT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated category snapshot: {len(categories)} categories, {len(products)} active products, {sum(counts.values())} category assignments.")

if __name__ == "__main__":
    main()
