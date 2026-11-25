"""Localize Amplified's actual Planetworld brand logo for owner review."""
import io,re,time
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.parse import urljoin
from PIL import Image,ImageChops,ImageStat
from bs4 import BeautifulSoup
root=Path("pages-public")
page="https://www.planetworld.co.za/amplified"
official="https://planetworld.canto.global/direct/image/vhu1051tf93277757p4gkjes41/7rNanaRqMsc9p3HhnVNSIEeHbJQ/original?content-type=image%2Fpng&name=_AMPLIFIED.png"
headers={"User-Agent":"Mozilla/5.0","Cache-Control":"no-cache","Referer":page}
sources=[official]
try:
    with urlopen(Request(page,headers=headers),timeout=20) as response:
        soup=BeautifulSoup(response.read(),"html.parser")
    for img in soup.find_all("img"):
        if img.get("alt","").strip().lower() in ("amplified","amplified logo"):
            for attr in ("src","data-src"):
                u=img.get(attr)
                if u and u.startswith("https://"):sources.insert(0,u)
except Exception as e:print("AMPLIFIED_PAGE_LOOKUP",type(e).__name__)
raw=None
for source in dict.fromkeys(sources):
    for u in (source+("&" if "?" in source else "?")+"refresh="+str(int(time.time())),source,source.replace("/original?","/800?"),source.replace("/original?","/500?")):
        try:
            with urlopen(Request(u,headers=headers),timeout=20) as response:
                assert response.headers.get_content_type().startswith("image/")
                payload=response.read(10_000_000)
            im=Image.open(io.BytesIO(payload)); im.load()
            assert im.width>=100 and im.height>=25
            raw=im.convert("RGBA")
            print("AMPLIFIED_LOGO_SOURCE",source,im.size,flush=True)
            break
        except Exception as e:print("AMPLIFIED_LOGO_ATTEMPT",type(e).__name__,str(e)[:200],flush=True)
    if raw is not None:break
assert raw is not None,"Official Amplified logo could not be downloaded; do not substitute an invented logo"
# Crop transparent margins without changing the logo itself.
bbox=raw.getchannel("A").getbbox()
assert bbox
raw=raw.crop(bbox)
# Choose a background with visible contrast for transparent artwork.
alpha=raw.getchannel("A")
rgb=raw.convert("RGB")
brightness=ImageStat.Stat(rgb.convert("L"),mask=alpha.point(lambda v:255 if v>128 else 0)).mean[0]
background=(20,28,39,255) if brightness>175 else (255,255,255,255)
canvas=Image.new("RGBA",(440,160),background)
raw.thumbnail((390,120),Image.Resampling.LANCZOS)
canvas.alpha_composite(raw,((440-raw.width)//2,(160-raw.height)//2))
rgb=canvas.convert("RGB")
assert max(ImageStat.Stat(rgb).stddev)>5,"Logo lacks visible contrast"
dest=root/"assets/brand-logos/amplified.png";dest.parent.mkdir(parents=True,exist_ok=True)
rgb.save(dest,optimize=True)
for name in ("preview-audio.html","preview-audio-brand.html"):
    p=root/name;s=p.read_text()
    assert official in s
    s=s.replace(official,"assets/brand-logos/amplified.png")
    p.write_text(s)
print("AMPLIFIED_LOCAL_LOGO_OK",dest,flush=True)
