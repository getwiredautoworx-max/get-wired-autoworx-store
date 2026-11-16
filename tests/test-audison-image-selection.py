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
    candidates = [
        {"url": item["url"], "alt": item["alt"]}
        for item in parser.image_candidates
    ]
    exact = MODULE.select_exact_model_image(candidates, "AV 1.1")
    assert exact is not None, "exact AV 1.1 gallery image was not selected"
    assert exact["url"] == "/images/av-11.jpg", "AV 1.1 must not match AV 1.1 II"
    assert MODULE.select_exact_model_image(candidates, "AV 1.1 II")["url"] == "/images/av-11-ii.jpg"
    assert MODULE.select_exact_model_image(
        [{"url": "https://static.audison.com/banner.jpg", "alt": "Audison website banner"}],
        "AV 1.1",
    ) is None, "generic banner must never be accepted as an exact-model image"
    assert MODULE.select_exact_model_image(
        [{"url": "/images/other.jpg", "alt": "AV 1.1 II"}],
        "AV 1.1",
    ) is None, "variant suffix must not be treated as an exact model match"

    parser = MODULE.PageParser()
    parser.feed('<a href="https://static.audison.com/av65pii.jpg" aria-label="Image: AV 6.5 P II"></a>')
    anchor_match = MODULE.select_exact_model_image(parser.image_candidates, "AV 6.5 P II")
    assert anchor_match is not None and anchor_match["url"].endswith("av65pii.jpg"), "exactly labelled image anchor was not captured"
    assert MODULE.select_exact_model_image(parser.image_candidates, "AV 6.5") is None, "AV 6.5 must not match AV 6.5 P II"
    print("AUDISON_EXACT_MODEL_IMAGE_SELECTION_PASS")


if __name__ == "__main__":
    main()
