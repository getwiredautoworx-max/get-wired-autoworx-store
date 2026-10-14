# June Catalogue Audit Continuation — 2026-10-14

## Verified access checkpoint
- Repository: getwiredautoworx-max/get-wired-autoworx-store
- Original June source PDF is present on `main`: `June Buyer's Guide (1).pdf`
- PDF Git blob SHA: `eb01206c101b359c761daea4ae55bd7f2267f7e1`
- GitHub file reader returns file metadata for the PDF but not binary bytes. Do not claim a direct PDF page-by-page visual audit from that response alone.
- Existing OCR source is available on branch `audit/buyer-guide-extraction`: `staging/source-extracts/June_Buyers_Guide_OCR.txt` (about 57 KB) and per-page OCR files under `staging/source-extracts/june-ocr-pages/`.
- The 33-row visual cross-check CSV is accessible at `staging/source-extracts/june-visual-crosscheck-pages29-32.csv` on `audit/buyer-guide-extraction`. It contains 33 data rows plus header, covering printed pages 29–32. CSV is source-verification staging, not an approved import.
- Direct CSV URL: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/audit/buyer-guide-extraction/staging/source-extracts/june-visual-crosscheck-pages29-32.csv

## Important checks from the 33-row CSV
- Rows marked visually confirmed are code-only confirmation in many cases; notes explicitly say prices are historical and not reconciled to current supplier cost.
- OCR/visual correction candidates include `SF-SO002` vs `SF-5002`, `TC-BMO1` vs `TC-BM01`, `TC-BMO9` vs `TC-BM09`, `IB-TOYO1` vs `IB-TOY01`, `IGS-NLO1` vs `IGS-NL01`, and `IGS-NTO1` vs `IGS-NT01`. Preserve both source/OCR strings and require source-image verification before approval.
- The CSV has 33 data rows. It is not the full 470-row audit.

## Continue from existing work; do not restart
1. Preserve the existing 470-row June audit and the existing 33-row cross-check.
2. Use the OCR transcript and per-page extracts for targeted source-row matching; treat OCR as candidate evidence, not final proof.
3. Reconcile exact supplier SKU/code and current supplier cost independently. June printed prices are historical and must not automatically overwrite current costs or live prices.
4. Deduplicate by normalized supplier code only after preserving original code, source page, description and discrepancy notes.
5. Validate category/subcategory against ASC catalogue headings and the approved store category mapping. Keep uncertain rows in REVIEW/QUOTE; do not fabricate prices or approve uncertain OCR.
6. Keep all work staged. No production, Supabase, Axxess, or storefront changes are authorised by this audit checkpoint.
7. Record measured counts for confirmed, corrected, duplicate, unmatched, priced, quote-only and category-review rows before reporting completion.

## Status
Improved: exact PDF location verified; 33-row CSV and existing OCR transcript retrieved from audit branch.
Not resolved: full 470-row SKU/price reconciliation, deduplication, complete category validation, and source-image confirmation for ambiguous codes.
Production untouched.


## 2026-10-14 user-reported GitHub preview issue
- User reports GitHub displays “unable to render block code” when opening the June Buyer’s Guide.
- Rechecked the repository file through GitHub: the PDF path exists on `main`, and its blob SHA remains `eb01206c101b359c761daea4ae55bd7f2267f7e1`. The connector returns no PDF binary bytes, so this confirms the file reference/metadata, not the PDF's internal integrity.
- Workaround: use the GitHub PDF page's **Download raw file** / download control, then open the downloaded PDF in a PDF viewer. Do not replace or re-upload the original merely because the browser preview fails.
- Original page: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/blob/main/June%20Buyer's%20Guide%20(1).pdf
- Direct raw/download endpoint to try if the preview control is unavailable: https://github.com/getwiredautoworx-max/get-wired-autoworx-store/raw/refs/heads/main/June%20Buyer's%20Guide%20(1).pdf
- Audit remains staged and production untouched. This preview issue does not invalidate the existing OCR transcript or the 33-row audit CSV, but ambiguous SKU corrections still require visual source confirmation.
