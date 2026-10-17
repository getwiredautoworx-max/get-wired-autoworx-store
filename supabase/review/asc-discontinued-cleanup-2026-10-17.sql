-- Get Wired AutoWorx — ASC discontinued/out-of-stock cleanup candidate patch
-- Review-only by default. Run with psql. No changes occur unless APPLY_CLEANUP is set true.
-- Usage:
--   psql "$DATABASE_URL" -v APPLY_CLEANUP=false -f supabase/review/asc-discontinued-cleanup-2026-10-17.sql
--   psql "$DATABASE_URL" -v APPLY_CLEANUP=true  -f supabase/review/asc-discontinued-cleanup-2026-10-17.sql
-- IMPORTANT: verify the ASC product pages immediately before applying. This candidate set
-- comes from public indexed product/category pages observed 2026-10-17, not a live supplier API.
-- This script only deactivates exact supplier-SKU matches; it does not delete rows or rewrite stock.

\if :{?APPLY_CLEANUP}
\else
\set APPLY_CLEANUP false
\endif

BEGIN;

CREATE TEMP TABLE asc_cleanup_candidates (
  supplier_sku text PRIMARY KEY,
  asc_name text NOT NULL,
  asc_status_evidence text NOT NULL,
  asc_stock_text text NOT NULL,
  source_url text NOT NULL,
  observed_on date NOT NULL
) ON COMMIT DROP;

INSERT INTO asc_cleanup_candidates
(supplier_sku, asc_name, asc_status_evidence, asc_stock_text, source_url, observed_on)
VALUES
('AES-1115-16B', 'DOOR SWITCH ADJUSTABLE METAL 65MM DISCONTINUED BY MAKER',
 'DISCONTINUED BY MAKER', '52 in stock',
 'https://accessoriesspares.co.za/product-category/automotive/page/69/', DATE '2026-10-17'),
('F1-035', 'FUEL PUMP ELECT.FIAT WILL DISCONTINUE',
 'WILL DISCONTINUE', '15 in stock',
 'https://accessoriesspares.co.za/shop/page/172/', DATE '2026-10-17'),
('F9-001-56', 'FAN BLADE MITSU.CANTER 3.5R. 97- 410MM DISCONTINUED NOT VIABLE',
 'DISCONTINUED NOT VIABLE', '3 in stock',
 'https://accessoriesspares.co.za/product-category/automotive/electrical/fan-blades/page/3/?per_page=18', DATE '2026-10-17'),
('T3-8CS', 'SPANNER SET 8PC CARBON STEEL BLISTER DISCONTINUED',
 'DISCONTINUED', '113 in stock',
 'https://accessoriesspares.co.za/shop/page/400/', DATE '2026-10-17'),
('WG-007', 'WIPER GROMMETS UNIVERSAL SUPPLIER WILL DISCONTINUE CONFIRMED',
 'SUPPLIER WILL DISCONTINUE CONFIRMED', '111 in stock',
 'https://accessoriesspares.co.za/product-category/automotive/page/259/?layout=grid&per_page=24', DATE '2026-10-17');

-- Preview exact product matches. A missing match is deliberately not guessed from name.
SELECT c.supplier_sku, c.asc_name, c.asc_status_evidence, c.asc_stock_text,
       p.id AS product_id, p.name AS store_name, p.public_sku, p.active AS currently_active,
       p.stock_quantity AS store_stock_quantity, c.source_url
FROM asc_cleanup_candidates c
LEFT JOIN gw_private.product_supplier_codes psc
  ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
LEFT JOIN public.products p ON p.id = psc.product_id
ORDER BY c.supplier_sku;

\if :APPLY_CLEANUP
  -- Guard: refuse to apply if any candidate SKU maps to multiple products.
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

  -- Soft-deactivate exact matches only. Do not delete product rows, order references,
  -- quote references, or supplier mappings. Do not zero local stock quantities because
  -- the storefront stock field is not a synchronized ASC stock ledger.
  UPDATE public.products p
  SET active = false, updated_at = now()
  WHERE p.active IS TRUE
    AND p.id IN (
      SELECT psc.product_id
      FROM gw_private.product_supplier_codes psc
      JOIN asc_cleanup_candidates c
        ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
    );

  SELECT c.supplier_sku, p.id AS product_id, p.name, p.public_sku, p.active
  FROM asc_cleanup_candidates c
  LEFT JOIN gw_private.product_supplier_codes psc
    ON upper(trim(psc.supplier_sku)) = upper(trim(c.supplier_sku))
  LEFT JOIN public.products p ON p.id = psc.product_id
  ORDER BY c.supplier_sku;
  COMMIT;
\else
  ROLLBACK;
\endif
