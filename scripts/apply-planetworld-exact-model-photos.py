"""Apply exact-model photos reviewed against manufacturer or model-specific retail pages."""
from collections import Counter
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image

EVIDENCE = Path("/tmp/planetworld-batch-image-evidence.json")
PHOTOS = {
    "GWA-ALP-R2-W10D2": (
        "https://images.crutchfieldonline.com/ImageHandler/trim/869/652/products/2022/28/500/g500R2W10D2-o_other1.jpg",
        "https://www.crutchfield.com/p_500R2W10D2/Alpine-R2-W10D2.html",
    ),
    "GWA-AUD-69035020": (
        "https://static.audison.com/media/2022/10/1468512865_APBX_8_R_EMO_800_599.png",
        "https://audison.com/product/apbx-8-r/",
    ),
    "GWA-AUD-69035060": (
        "https://allisautosoundandalarms.co.za/wp-content/uploads/2025/08/Audison-APBX10s4s-main-scaled.jpg",
        "https://allisautosoundandalarms.co.za/product/audison-prima-apbx-10-s4s-sealed-enclosure-with-800-watts-10-inch-shallow-subwoofer/",
    ),
    "GWA-HRZ-78040180": (
        "https://images.sonicelectronix.com/images/4877449/big/dcx5703.jpg",
        "https://hertz-audio.com/product/dcx-570-3/",
    ),
    "GWA-HRZ-78040190": (
        "https://static.hertz-audio.com/media/2021/04/DCX710_top_view1.jpg",
        "https://hertz-audio.com/product/dcx-710-3/",
    ),
}


def main():
    rows = json.loads(EVIDENCE.read_text())
    by_sku = {row["gwa"]: row for row in rows}
    assert len(by_sku) == len(rows) == 521
    for sku, (url, source) in PHOTOS.items():
        row = by_sku[sku]
        assert row["status"] in {"ORIGINAL_AVAILABLE", "UNRESOLVED"}, sku
        request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(request, timeout=20) as response:
            content = response.read(12_000_001)
        assert len(content) <= 12_000_000, sku
        with Image.open(BytesIO(content)) as photo:
            photo.load()
            assert min(photo.size) >= 200, (sku, photo.size)
        row.update(
            status="REPLACEMENT_APPROVED",
            resolved=url,
            digest=sha256(content).hexdigest(),
            source=source,
            approvalBasis="Exact-model product photo inspected against the linked source",
        )
    digests = Counter(row["digest"] for row in rows if row.get("digest"))
    for sku in PHOTOS:
        assert digests[by_sku[sku]["digest"]] == 1, sku
    EVIDENCE.write_text(json.dumps(rows, indent=2))
    print("EXACT_MODEL_PHOTO_REPAIRS", len(PHOTOS), flush=True)


if __name__ == "__main__":
    main()
