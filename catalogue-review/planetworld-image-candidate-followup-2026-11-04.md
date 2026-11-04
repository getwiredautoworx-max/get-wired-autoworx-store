# Planetworld exact-model image candidate follow-up — 4 November 2026

Scope: five remaining verified-model records with blank imageUrl fields in assets/planetworld-verified-models-preview.json. This is review-only research. No image was copied into the repository or customer preview.

## Exact-model manufacturer image candidates

| Model | Official product page | Direct image candidate | Evidence |
|---|---|---|---|
| HCE-C2100RD | https://www.alpine-asia.com/en/productDetail/22 | https://www.alpine-asia.com/media/5baca7810efbd.png | Direct Alpine Asia image opened and visually matched to the rear camera unit; exact model confirmed on page. |
| HDZ-653 | https://www.alpine-asia.com/en/productDetail/135/HDZ-653 | https://www.alpine-asia.com/media/62d65d1bd9391.png | Direct Alpine Asia image opened and visually matched to the 3-way speaker set; exact model confirmed on page. |
| S2-A55V | https://www.alpine-asia.com/en/productDetail/162/S2-A55V | https://www.alpine-asia.com/media/64b0d9389e7ef.jpg | Direct Alpine Asia image opened and visually matched to the 5-channel amplifier; exact model confirmed on page. |
| R2-W12D4 | https://finland.alpine-europe.com/p/Products/type-r-speakers36/r2-w12d4 | Image links opened, but direct assets returned 46×35 thumbnails. | Exact model confirmed; no suitable high-resolution image extracted. Do not use thumbnails. |
| KW-M590BT | https://www.us.jvc.com/car/multimedia/kw_m590bt/ | JVC dealer marketing portal lists a KW-M590BT image ZIP. | JVC portal states marketing materials cannot be distributed without proper written authorization. No image downloaded or used. |

## Rights and publication gate

The three Alpine direct images are source-verified candidates only. No image-use permission has been established. Do not insert or hotlink them into customer-facing preview data until the owner confirms permission or the manufacturer provides written dealer-use authorization. The JVC asset is expressly held pending written authorization. The R2-W12D4 thumbnail is unsuitable.

The five imageUrl fields remain blank. This work adds three stronger exact-model candidates to the manual-review queue; it does not increase approved image coverage. No SKU, price, stock, supplier workbook, product record, Supabase row, payment, DNS, Axxess or production change was made.


## Owner authorization and image verification — 4 November 2026

The owner explicitly authorized the three exact-model Alpine image candidates for the non-production customer preview. The direct image endpoints were then opened and visually verified:

- HCE-C2100RD: camera unit image — https://www.alpine-asia.com/media/5baca7810efbd.png
- HDZ-653: three-way speaker set image — https://www.alpine-asia.com/media/62d65d1bd9391.png
- S2-A55V: five-channel amplifier image — https://www.alpine-asia.com/media/64b0d9389e7ef.jpg

All three image URLs are now populated on the matching exact-model records in `assets/planetworld-verified-models-preview.json`. Curated exact-model image coverage is now 66/68; the two remaining blank records are R2-W12D4 (only 46×35 thumbnail assets found) and KW-M590BT (JVC dealer marketing asset distribution requires written authorization). Combined with five Audio Connections image URLs, the regression expectation is now 71 exact image candidates.

The test file now asserts the three exact model-to-URL mappings and updated image totals. The image data and regression changes are committed on the review branch. The latest workflow lookup returned no PR-triggered Actions run for the latest head, so exact-head Node regression and updated hosted browser/render verification remain pending. Do not call the entire supplier pilot closed based on source edits alone.
