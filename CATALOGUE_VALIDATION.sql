-- Get Wired AutoWorx catalogue validation
-- READ-ONLY: run before approving a staged catalogue import.

-- 1. Overall product counts
select
  count(*) as total_products,
  count(*) filter (where active) as active_products,
  count(*) filter (where featured and active) as active_specials,
  count(*) filter (where price is null) as no_price_products,
  count(*) filter (where category_id is null) as uncategorised_products
from public.products;

-- 2. Duplicate SKUs
select sku, count(*) as occurrences
from public.products
group by sku
having count(*) > 1
order by occurrences desc, sku;

-- 3. Pricing formula: cost x 1.15 VAT x 1.35 markup
select sku, cost_price, price,
       round((cost_price * 1.15 * 1.35)::numeric, 2) as expected_price
from public.products
where active
  and cost_price is not null
  and abs(price - round((cost_price * 1.15 * 1.35)::numeric, 2)) > 0.02
order by sku;

-- 4. Products assigned to inactive/nonexistent categories
select p.sku, p.name, p.category_id, c.name as category, c.active as category_active
from public.products p
left join public.categories c on c.id = p.category_id
where p.active and (c.id is null or not c.active)
order by p.sku;

-- 5. Active top-level category health
select c.id, c.name, count(ch.id) as active_subcategories
from public.categories c
left join public.categories ch on ch.parent_id = c.id and ch.active
where c.parent_id is null and c.active
 group by c.id, c.name
order by c.name;
