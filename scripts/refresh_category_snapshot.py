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

    # Restore the owner-approved Car Audio > Accessories navigation layer in
    # the local customer-facing snapshot only. These stable IDs are used by
    # existing preview routes; this script never writes category rows to DB.
    AUDIO_CAR_ID = "e3d19d20-fb46-426c-9f64-221d863add0b"
    ACCESSORIES_ID = "8d3c2e91-8b57-4b2c-9a7d-3f0f6a2b4c11"
    AERIALS_ID = "b0b4c7d1-2f68-4c8a-9e51-6d2a3f7b8c90"
    TRIMS_ID = "13b36e2a-a5c7-471e-83ef-3ad180e66d3d"
    by_id = {c["id"]: c for c in categories}
    by_id.setdefault(ACCESSORIES_ID, {
        "id": ACCESSORIES_ID, "name": "Accessories",
        "slug": "car-audio-accessories", "parent_id": AUDIO_CAR_ID, "active": True,
    })
    by_id.setdefault(AERIALS_ID, {
        "id": AERIALS_ID, "name": "Aerials", "slug": "aerials",
        "parent_id": ACCESSORIES_ID, "active": True,
    })
    by_id[TRIMS_ID]["parent_id"] = ACCESSORIES_ID
    by_id[TRIMS_ID]["name"] = "Trims & Harnesses"
    categories = sorted(by_id.values(), key=lambda c: (c.get("name") or "").casefold())
    counts = Counter(p.get("category_id") for p in products if p.get("category_id"))

    # Customer-facing root labels are owner-approved display names. Keep the
    # underlying Supabase IDs/slugs and product assignments unchanged.
    display_names = {
        "1a13bc42-4f54-44f6-9658-36d141b77f4b": "Car Audio / Home Entertainment",
        "ba263c9f-d038-48bd-bca0-944f3ebdc5e9": "Auto Electrical Spares",
        "13b36e2a-a5c7-471e-83ef-3ad180e66d3d": "Trims & Harnesses",
    }
    ordered_names = {
        None: [
            "Car Audio / Home Entertainment",
            "Auto Electrical Spares",
            "Car Care & Accessories",
        ],
        "ba263c9f-d038-48bd-bca0-944f3ebdc5e9": [
            "Alternators & Starters", "Batteries & Charging",
            "Fuses, Relays & Wiring", "Globes & Vehicle Lighting",
            "Sensors & Switches",
        ],
        "f98e7589-20a0-4825-9707-2680d29e5cb6": [
            "Car Care", "Car Mats", "Seat Covers & Interior Accessories",
            "Exterior Accessories",
        ],
        "1a13bc42-4f54-44f6-9658-36d141b77f4b": [
            "Car Audio", "Home Entertainment", "Band Equipment",
            "DJ Equipment", "Instruments", "Lifestyle",
        ],
        "8d3c2e91-8b57-4b2c-9a7d-3f0f6a2b4c11": [
            "Aerials", "Trims & Harnesses",
        ],
    }
    sibling_names = {}
    for c in categories:
        parent = c.get("parent_id")
        sibling_names.setdefault(parent, []).append(display_names.get(c["id"], c["name"]))
    for names in sibling_names.values():
        names.sort()
    snapshot_categories = []
    for c in categories:
        label = display_names.get(c["id"], c["name"])
        siblings = ordered_names.get(c.get("parent_id"), [])
        sort_order = siblings.index(label) * 10 if label in siblings else 1000 + sibling_names[c.get("parent_id")].index(label)
        snapshot_categories.append({
            "id": c["id"],
            "name": label,
            "slug": c["slug"],
            "parent_id": c.get("parent_id"),
            "active": bool(c.get("active")),
            "sort_order": sort_order,
            "direct_active_products": int(counts.get(c["id"], 0)),
        })
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
