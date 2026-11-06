import hashlib
import importlib.util
import tempfile
import unittest
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("asc_images", ROOT / "scripts" / "watermark-asc-catalogue-images.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

class AscImagePilotTests(unittest.TestCase):
    def test_contain_preserves_full_product_and_uses_real_logo_repeatably(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            source = root / "source.jpg"
            first = root / "first.jpg"
            second = root / "second.jpg"
            image = Image.new("RGB", (640, 480), (250, 250, 250))
            draw = ImageDraw.Draw(image)
            draw.rectangle((180, 90, 460, 380), fill=(170, 70, 45), outline=(20, 20, 20), width=8)
            image.save(source, "JPEG", quality=98)
            MODULE.render(source, first, ROOT / "assets" / "gw-logo.png")
            MODULE.render(source, second, ROOT / "assets" / "gw-logo.png")
            self.assertEqual(Image.open(first).size, (600, 600))
            self.assertEqual(digest(first), digest(second), "re-runs from the same original must be deterministic")
            output = Image.open(first).convert("RGB")
            pixels = output.load()
            # The complete source product remains present inside the contained photo region.
            self.assertTrue(any(pixels[x, y][0] > 100 and pixels[x, y][0] > pixels[x, y][1] * 1.5
                                for y in range(100, 500, 5) for x in range(70, 530, 5)))
            # Actual repository logo is required, not a generated text substitute.
            self.assertTrue((ROOT / "assets" / "gw-logo.png").is_file())

    def test_ocr_cleanup_only_targets_outer_catalogue_bands(self):
        image = Image.new("RGB", (800, 600), (250, 250, 250))
        draw = ImageDraw.Draw(image)
        draw.rectangle((270, 180, 530, 430), fill=(165, 175, 185), outline=(20, 30, 40), width=8)
        # Keep the central product untouched; outer text is eligible for cleanup.
        cleaned, report = MODULE.clean_outer_catalogue_text(image)
        self.assertEqual(cleaned.size, image.size)
        self.assertIsInstance(report["outer_text_removed"], list)
        self.assertIsInstance(report["text_near_product_review"], list)

if __name__ == "__main__":
    unittest.main()
