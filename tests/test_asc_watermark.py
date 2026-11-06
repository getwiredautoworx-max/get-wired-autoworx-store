import hashlib
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "watermark-asc-catalogue-images.py"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


class AscWatermarkTests(unittest.TestCase):
    def make_image(self, path, color):
        Image.new("RGB", (640, 480), color).save(path, "JPEG", quality=95)

    def run_pipeline(self, image_dir, originals_dir):
        subprocess.run(
            [sys.executable, str(SCRIPT), "--image-dir", str(image_dir),
             "--originals-dir", str(originals_dir)],
            check=True,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )

    def test_overlay_preserves_originals_and_is_idempotent(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            images = root / "images"
            originals = root / "originals"
            images.mkdir()
            raw = images / "asc-test.jpg"
            self.make_image(raw, (225, 230, 235))
            self.run_pipeline(images, originals)

            backup = originals / raw.name
            self.assertTrue(backup.exists())
            first_output = digest(raw)
            original_hash = digest(backup)
            self.assertNotEqual(first_output, original_hash)
            self.assertEqual(digest(backup), original_hash)

            self.run_pipeline(images, originals)
            self.assertEqual(digest(raw), first_output, "reruns must not stack duplicate watermarks")
            self.assertEqual(digest(backup), original_hash, "source crop must remain unchanged")

            # Newly added ASC catalogue crops are automatically picked up.
            new_image = images / "asc-new-catalogue-item.jpg"
            self.make_image(new_image, (235, 225, 215))
            new_raw_hash = digest(new_image)
            self.run_pipeline(images, originals)
            self.assertTrue((originals / new_image.name).exists())
            self.assertNotEqual(digest(new_image), new_raw_hash)
            self.assertEqual(digest(originals / new_image.name), new_raw_hash)


if __name__ == "__main__":
    unittest.main()
