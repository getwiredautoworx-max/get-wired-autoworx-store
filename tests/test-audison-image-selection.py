#!/usr/bin/env python3
"""Regression tests for exact Audison model-to-gallery-image matching."""
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts/extract-audison-official-candidates.py"
SPEC = importlib.util.spec_from_file_location("audison_candidate_extractor", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


def main():
    parser = MODULE.PageParser()
    parser.feed(
        '<meta property="og:image" content="https://static.audison.com/banner.jpg">'
        '<img src="/images/av-11-ii.jpg" alt="AV 1.1 II">'
        '<img src="/images/av-11.jpg" alt="AV 1.1">'
    )
    candidates = [{"url": item["url"], "alt": item["alt"]} for item in parser.image_candidates]
    exact = MODULE.select_exact_model_image(candidates, "AV 1.1")
    assert exact is not None and exact["url"] == "/images/av-11.jpg"
    assert MODULE.select_exact_model_image(candidates, "AV 1.1 II")["url"] == "/images/av-11-ii.jpg"
    assert MODULE.select_exact_model_image(
        [{"url": "https://static.audison.com/banner.jpg", "alt": "Audison website banner"}],
        "AV 1.1",
    ) is None

    parser = MODULE.PageParser()
    parser.feed('<a href="https://static.audison.com/av65pii.jpg" aria-label="Image: AV 6.5 P II"></a>')
    anchor_match = MODULE.select_exact_model_image(parser.image_candidates, "AV 6.5 P II")
    assert anchor_match is not None and anchor_match["url"].endswith("av65pii.jpg")
    assert MODULE.select_exact_model_image(parser.image_candidates, "AV 6.5") is None

    # A manufacturer page can expose a wrongly named K4E image before the K4M image.
    k4m_candidates = [
        {"url": "https://static.audison.com/APBMW-K4E-emo2.jpg", "alt": "Image: APBMW K4M"},
        {"url": "https://static.audison.com/APBMW-K4M.jpg", "alt": "Image: APBMW K4M"},
    ]
    k4m = MODULE.select_exact_model_image(k4m_candidates, "APBMW K4M")
    assert k4m is not None and k4m["url"].endswith("APBMW-K4M.jpg")
    print("AUDISON_EXACT_MODEL_IMAGE_SELECTION_PASS")


if __name__ == "__main__":
    main()
