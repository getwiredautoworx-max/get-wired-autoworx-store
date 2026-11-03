import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / "assets" / "category-tree.json"


def extract_public_config(html_sources):
    """Return the public Supabase URL/key from any supported storefront page."""
    url_pattern = re.compile(r"\bSUPABASE_URL\s*=\s*['\"]([^'\"]+)")
    key_pattern = re.compile(r"\b(?:SUPABASE_KEY|KEY)\s*=\s*['\"]([^'\"]+)")
    for source in html_sources:
        url_match = url_pattern.search(source)
        key_match = key_pattern.search(source)
        if url_match and key_match:
            return url_match.group(1), key_match.group(1)
    raise RuntimeError(
        "Could not find the public Supabase URL/key in products.html, "
        "index-new.html, store.html or category.html"
    )


def read_public_config(root):
    # The buttons-only homepage is intentionally static and has no Supabase client.
    # products.html owns the current public read-only config.
    candidates = ("products.html", "index-new.html", "store.html", "category.html")
    sources = []
    for filename in candidates:
        path = root / filename
        try:
            sources.append(path.read_text(encoding="utf-8"))
        except OSError:
            continue
    return extract_public_config(sources)


SUPABASE_URL, SUPABASE_KEY = read_public_config(ROOT)
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": "Bearer " + SUPABASE_KEY,
    "Prefer": "count=exact",
    "Accept": "application/json",
}

def fetch_all(path, page_size=1000):
    import requests

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
