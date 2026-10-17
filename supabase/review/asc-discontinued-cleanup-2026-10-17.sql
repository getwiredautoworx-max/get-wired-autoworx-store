-- Get Wired AutoWorx — ASC status reconciliation SQL (review branch only)
-- SAFETY: this file is not an instruction to run against production.
-- Default behavior is ROLLBACK. No candidate is authorized for deactivation in this checked-in version.
-- Even with APPLY_CLEANUP=true, a row is eligible only when BOTH freshly_verified and owner_approved
-- are explicitly set true after a new exact-SKU supplier check and owner review.
--
-- Preview:
--   psql "$DATABASE_URL" -v APPLY_CLEANUP=false -f supabase/review/asc-discontinued-cleanup-2026-10-17.sql
-- Apply only after separate owner approval and fresh supplier evidence:
--   edit per-row flags after evidence review, then psql "$DATABASE_URL" -v APPLY_CLEANUP=true -f ...
-- Do not execute this file as part of CI. It has not been run.

\if :{?APPLY_CLEANUP}
\else
\set APPLY_CLEANUP false
\endif

BEGIN;

CREATE TEMP TABLE asc_cleanup_candidates (
  supplier_sku text PRIMARY KEY,
  submitted_status text NOT NULL,
  evidence_note text NOT NULL,
  source_url text NOT NULL,
  observed_on date NOT NULL,
  freshly_verified boolean NOT NULL DEFAULT false,
  owner_approved boolean NOT NULL DEFAULT false
) ON COMMIT DROP;

INSERT INTO asc_cleanup_candidates
(supplier_sku, submitted_status, evidence_note, source_url, observed_on, freshly_verified, owner_approved)
VALUES
('AES-1115-16B', 'DISCONTINUED', 'Owner-submitted artifact says portal HTTP 200 with discontinued flag; earlier report noted conflicting stock snapshots. Fresh verification required.', 'https://accessoriesspares.co.za/product-category/automotive/page/69/', DATE '2026-10-17', false, false),
('F1-035', 'WILL_DISCONTINUE', 'Owner-submitted end-of-life note aligns with earlier report; hold replenishment only, not automatic unpublish.', 'https://accessoriesspares.co.za/shop/page/172/', DATE '2026-10-17', false, false),
('F9-001-56', 'CONFLICT_REQUIRES_REVIEW', 'Owner-submitted artifact says temporary stockout; earlier staging report says discontinued/not viable. Do not change active flag or stock.', 'https://accessoriesspares.co.za/product-category/automotive/electrical/fan-blades/page/3/?per_page=18', DATE '2026-10-17', false, false),
('T3-8CS', 'CONFLICT_REQUIRES_REVIEW', 'Owner-submitted artifact says active/backorder; earlier staging report says discontinued. Do not change active flag or stock.', 'https://accessoriesspares.co.za/shop/page/400/', DATE '2026-10-17', false, false),
('WG-007', 'UNKNOWN_UNVERIFIED', 'Owner-submitted artifact says HTTP 404/missing listing; earlier report claimed will-discontinue. Written supplier confirmation required.', 'https://accessoriesspares.co.za/product-category/automotive/page/259/?layout=grid&per_page=24', DATE '2026-10-17', false, false);

-- Preview: exact-SKU mapping and the per-row safety flags. A missing/multiple match is not guessed.
SELECT c.supplier_sku, c.submitted_status, c.freshly_verified, c.owner_approved,
       p.id AS product_id, p.name AS store_name, p.public_sku, p.active AS currently_active,
       p.stock_quantity AS store_stock_quantity, c.source_url
FROM asc_cleanup_candidates c
LEFT JOIN gw_private.product_supplier_codes psc
  ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
LEFT JOIN public.products p ON p.id = psc.product_id
ORDER BY c.supplier_sku;

\if :APPLY_CLEANUP
  -- Guard against duplicate supplier mappings before any possible write.
  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM asc_cleanup_candidates c
      JOIN gw_private.product_supplier_codes psc
        ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
      GROUP BY c.supplier_sku
      HAVING count(DISTINCT psc.product_id) > 1
    ) THEN
      RAISE EXCEPTION 'Cleanup aborted: at least one ASC SKU maps to multiple products.';
    END IF;
  END $$;

  -- Only a freshly verified, explicitly owner-approved confirmed-discontinued row can be deactivated.
  -- WILL_DISCONTINUE, stockout/conflict, and unknown/missing-listing rows are excluded by status.
  -- All flags are false in this reviewed file, so APPLY_CLEANUP=true alone deactivates zero rows.
  UPDATE public.products p
  SET active = false, updated_at = now()
  WHERE p.active IS TRUE
    AND p.id IN (
      SELECT psc.product_id
      FROM gw_private.product_supplier_codes psc
      JOIN asc_cleanup_candidates c
        ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
      WHERE c.submitted_status = 'DISCONTINUED'
        AND c.freshly_verified IS TRUE
        AND c.owner_approved IS TRUE
    );

  SELECT c.supplier_sku, c.submitted_status, c.freshly_verified, c.owner_approved,
         p.id AS product_id, p.name, p.public_sku, p.active
  FROM asc_cleanup_candidates c
  LEFT JOIN gw_private.product_supplier_codes psc
    ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
  LEFT JOIN public.products p ON p.id = psc.product_id
  ORDER BY c.supplier_sku;
  COMMIT;
\else
  ROLLBACK;
\endif
