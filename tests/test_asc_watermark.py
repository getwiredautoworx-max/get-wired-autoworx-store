import hashlib
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import pytesseract


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "watermark-asc-catalogue-images.py"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


class AscWatermarkTests(unittest.TestCase):
    def make_image(self, path, product_color=(165, 175, 185)):
        image = Image.new("RGB", (640, 480), (250, 250, 250))
        draw = ImageDraw.Draw(image)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
        except OSError:
            font = ImageFont.load_default()
        draw.text((18, 10), "ELECTRIC FUEL PUMPS", font=font, fill=(20, 35, 70))
        draw.rounded_rectangle((210, 120, 430, 330), radius=28, fill=product_color, outline=(30, 40, 50), width=8)
        draw.text((80, 400), "FUEL PUMP ELECTRIC BMW", font=font, fill=(15, 15, 15))
        image.save(path, "JPEG", quality=95)

    def run_pipeline(self, image_dir, originals_dir):
        subprocess.run(
            [sys.executable, str(SCRIPT), "--image-dir", str(image_dir),
             "--originals-dir", str(originals_dir)],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )

    def test_product_only_crop_preserves_original_and_is_idempotent(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            images = root / "images"
            originals = root / "originals"
            images.mkdir()
            raw = images / "asc-test.jpg"
            self.make_image(raw)
            self.run_pipeline(images, originals)

            backup = originals / raw.name
            self.assertTrue(backup.exists())
            first_output = digest(raw)
            original_hash = digest(backup)
            self.assertNotEqual(first_output, original_hash)
            self.assertEqual(digest(backup), original_hash)

            output = Image.open(raw)
            self.assertEqual(output.size, (600, 600))
            recognized = pytesseract.image_to_string(output).upper()
            self.assertNotIn("FUEL PUMP ELECTRIC BMW", recognized)
            self.assertNotIn("ELECTRIC FUEL PUMPS", recognized)

            self.run_pipeline(images, originals)
            self.assertEqual(digest(raw), first_output, "reruns must not stack watermarks or recrop prior output")
            self.assertEqual(digest(backup), original_hash, "source crop must remain unchanged")

            # Newly added ASC catalogue crops are automatically picked up.
            new_image = images / "asc-new-catalogue-item.jpg"
            self.make_image(new_image, (175, 145, 115))
            new_raw_hash = digest(new_image)
            self.run_pipeline(images, originals)
            self.assertTrue((originals / new_image.name).exists())
            self.assertNotEqual(digest(new_image), new_raw_hash)
            self.assertEqual(digest(originals / new_image.name), new_raw_hash)


if __name__ == "__main__":
    unittest.main()
