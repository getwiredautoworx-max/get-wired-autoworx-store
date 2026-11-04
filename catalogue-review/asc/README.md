# ASC catalogue extraction — review only

- `text/asc-pages-review.csv`: page-level embedded text/OCR with source page references.
- `source-images/`: original embedded image bytes, unchanged.
- `source-pages/`: full-page renders of all 60 product pages (PDF pages 3 onward) across the six retained catalogues; used for visual SKU/product verification.
- `cleaned-images/`: conservative cleaned JPEG candidates; no product content is invented or altered.
- `asc-image-manifest.csv`: supplier PDF, page, image hash, dimensions, status and file paths.

Full-page scans and tiny icons are excluded from product-image candidates. A candidate is not an approved SKU match. Every image must be checked against the exact product and supplier SKU before any store use.
