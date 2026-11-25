"""Apply exact-model photos reviewed against manufacturer or model-specific retail pages."""
from collections import Counter
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

from PIL import Image, UnidentifiedImageError

EVIDENCE = Path("/tmp/planetworld-batch-image-evidence.json")
PHOTOS = {
    "GWA-ALP-KAE-HF11DA": (
        "https://shop.alpine.co.uk/cdn/shop/products/KAE-HF11DA_Anti-reflective-Screen-Protector-for_iLX-F115D_large.jpg?v=1648826841",
        "https://shop.alpine.co.uk/products/kae-hf11da-anti-reflective-screen-protector-for-ilx-f115d",
    ),
    "GWA-ALP-KAE-HF9DA": (
        "https://shop.alpine.co.uk/cdn/shop/products/KAE-HF9DA_Anti-reflective-Screen-Protector-for_iLX-F905D_large.jpg?v=1648827211",
        "https://shop.alpine.co.uk/products/kae-hf9da-anti-reflective-screen-protector-for-ilx-f905d",
    ),
    "GWA-HRZ-78242015": (
        "https://static.hertz-audio.com/media/2024/09/HERTZ_CP-51K_PROSPETTIVA_2024_05_06-copia.jpg",
        "https://my.hertz-audio.com/product/cp-5-1k/",
    ),
    "GWA-FOC-IW-IMP22-IMPULSE": (
        "https://www.carfeature.de/media/image/28/ae/50/FOCAL-INSIDE-ISO-Kabelsatz-FOAKACFIHI00000-IW-IMP2-2_b_0_600x600.jpg",
        "https://www.carfeature.de/de/hifi-navigation/zubehoer/marken-zubehoer/focal/26944/focal-iw-imp2.2-inside-iso-kabelsatz",
    ),
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
        "https://gibbyselectronicsupermarket.ca/cdn/shop/files/Hertz_DCX570.3_Back.jpg?v=1704733456&width=1214",
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
    repaired = []
    for sku, (url, source) in PHOTOS.items():
        row = by_sku[sku]
        assert row["status"] in {"ORIGINAL_AVAILABLE", "UNRESOLVED"}, sku
        request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            for attempt in range(2):
                try:
                    with urlopen(request, timeout=20) as response:
                        content = response.read(12_000_001)
                    if len(content) > 12_000_000:
                        raise ValueError("image exceeds 12 MB")
                    with Image.open(BytesIO(content)) as photo:
                        photo.load()
                        if min(photo.size) < 200:
                            raise ValueError(f"image too small: {photo.size}")
                    break
                except UnidentifiedImageError:
                    if attempt == 1:
                        raise
        except (URLError, OSError, ValueError) as error:
            print("EXACT_MODEL_PHOTO_PENDING", sku, str(error), flush=True)
            continue
        repaired.append(sku)
        row.update(
            status="REPLACEMENT_APPROVED",
            resolved=url,
            digest=sha256(content).hexdigest(),
            source=source,
            approvalBasis="Exact-model product photo inspected against the linked source",
        )
    digests = Counter(row["digest"] for row in rows if row.get("digest"))
    for sku in repaired:
        assert digests[by_sku[sku]["digest"]] == 1, sku
    EVIDENCE.write_text(json.dumps(rows, indent=2))
    print("EXACT_MODEL_PHOTO_REPAIRS", json.dumps(repaired), flush=True)


if __name__ == "__main__":
    main()
