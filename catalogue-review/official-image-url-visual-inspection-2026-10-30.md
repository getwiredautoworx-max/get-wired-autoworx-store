# Official image URL visual-inspection checkpoint — 2026-10-30

Scope: read-only inspection of original image URLs already listed in the review-branch Sony and Alpine source manifests. No binaries were added to the repository and no product record or image mapping was changed.

## Visually rendered successfully

| Model | Source | Visual result | Status |
|---|---|---|---|
| Alpine R2-A60F | https://finland.alpine-europe.com/fileadmin/products/R2-A60F/product-pic/R2-A60F_Alpine-R-Series-4-channel-Power-Amplifier.jpg | Rendered original Alpine asset shows an Alpine-branded R-Series four-channel amplifier. | Source image visually inspected; not locally downloaded; not compared to a current internal product image; not approved for publication. |
| Sony XM-5ES | https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw0ecba8d8/images/XM5ES/XM5ES.png | Rendered Sony Australia store asset shows a Sony Mobile ES amplifier. | Source image visually inspected; not locally downloaded; not compared to a current internal product image; not approved for publication. |

## Retrieval failures / not visually verified

- Alpine S2-S40C original URL: browser image retrieval returned an internal error.
- Alpine R2-W10D2 original URL: browser image retrieval returned an internal error.
- Alpine R2-W12D4 family URL: browser image retrieval returned an internal error. The manifest already warns this image is shared by R2-W12D2/R2-W12D4 and does not visually distinguish impedance variants.
- Sony XS-W104ES original Sony Denmark URL: browser image retrieval returned an internal error.

A retrieval failure is not evidence that the source asset is absent; it means this inspection route did not retrieve it.

## Consequence / publication gate

- Two official-source images were visually inspected, zero files were downloaded, zero images were approved for customer use, and zero public GW SKUs were assigned.
- Internal product mapping remains unresolved: the current read-only audit found no exact supplier-code or model-to-public_sku/product_id matches for the Planetworld staging set. Do not attach either inspected image to a product until an owner-approved internal mapping and current-image comparison exist.
- Continue by retrieving official assets through a reliable binary route, inspecting each exact model, checking rights/source suitability and matching to an internal GW SKU. Do not substitute retailer imagery merely because a model title matches.
- This is a review-only evidence record. No Supabase writes, live product/price/stock changes, supplier workbook changes, Axxess uploads, DNS changes, payment changes, PR merge or production deployment occurred.
