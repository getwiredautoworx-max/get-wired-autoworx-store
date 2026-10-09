-- Applied to production on 2026-10-09 and tracked here for reproducibility.
-- Allow any positive confirmed delivery quote; do not impose a fixed R59.95 minimum.
-- Preserve free pickup and R35.00 packaging per item.
CREATE OR REPLACE FUNCTION public.create_store_order(p_customer_name text, p_customer_email text, p_customer_phone text, p_delivery_address text, p_city text, p_province text, p_postal_code text, p_delivery_fee numeric, p_payment_method text, p_notes text, p_items jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_order_id uuid;
  v_customer_id uuid;
  v_item jsonb;
  v_product public.products%ROWTYPE;
  v_qty integer;
  v_subtotal numeric := 0;
  v_item_count integer := 0;
  v_packaging numeric;
  v_delivery numeric := GREATEST(COALESCE(p_delivery_fee,0),0);
  v_total numeric;
  v_is_pickup boolean := lower(COALESCE(p_payment_method,'')) = 'cash_on_pickup';
BEGIN
  IF COALESCE(trim(p_customer_name),'') = '' THEN
    RAISE EXCEPTION 'Customer name is required';
  END IF;
  IF jsonb_typeof(p_items) <> 'array' OR jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'Cart is empty';
  END IF;
  IF jsonb_array_length(p_items) > 100 THEN
    RAISE EXCEPTION 'Too many cart items';
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_qty := GREATEST(1, COALESCE((v_item->>'quantity')::integer,0));
    SELECT * INTO v_product
    FROM public.products
    WHERE (sku = COALESCE(v_item->>'sku',v_item->>'public_sku')
       OR public_sku = COALESCE(v_item->>'sku',v_item->>'public_sku'))
      AND active = true
    FOR UPDATE;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product not found: %', COALESCE(v_item->>'sku',v_item->>'public_sku');
    END IF;
    IF COALESCE(v_product.stock_quantity,0) < v_qty THEN
      RAISE EXCEPTION 'Insufficient stock for %', v_product.sku;
    END IF;
    v_subtotal := v_subtotal + (v_product.price * v_qty);
    v_item_count := v_item_count + v_qty;
  END LOOP;

  IF v_is_pickup THEN
    IF v_delivery > 0 THEN
      RAISE EXCEPTION 'Pickup orders cannot include a delivery fee';
    END IF;
  ELSE
    IF v_delivery <= 0 THEN
      RAISE EXCEPTION 'A positive delivery quotation must be selected before ordering';
    END IF;
    IF COALESCE(trim(p_delivery_address),'') = ''
       OR COALESCE(trim(p_city),'') = ''
       OR COALESCE(trim(p_province),'') = ''
       OR COALESCE(trim(p_postal_code),'') = '' THEN
      RAISE EXCEPTION 'Complete delivery address is required';
    END IF;
  END IF;

  v_packaging := v_item_count * 35.00;
  v_total := v_subtotal + v_packaging + v_delivery;

  IF COALESCE(p_customer_email,'') <> '' THEN
    SELECT id INTO v_customer_id
    FROM public.customers
    WHERE lower(email)=lower(p_customer_email)
    LIMIT 1;
  END IF;
  IF v_customer_id IS NULL THEN
    INSERT INTO public.customers(name,email,phone,address,city,province,postal_code)
    VALUES(p_customer_name,p_customer_email,p_customer_phone,p_delivery_address,p_city,p_province,p_postal_code)
    RETURNING id INTO v_customer_id;
  END IF;

  INSERT INTO public.orders(customer_id,customer_name,customer_email,customer_phone,delivery_address,subtotal,delivery_fee,total,payment_method,payment_status,order_status,notes,packaging_fee)
  VALUES(v_customer_id,p_customer_name,p_customer_email,p_customer_phone,p_delivery_address,v_subtotal,v_delivery,v_total,p_payment_method,'pending','pending',p_notes,v_packaging)
  RETURNING id INTO v_order_id;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_qty := GREATEST(1, COALESCE((v_item->>'quantity')::integer,0));
    SELECT * INTO v_product
    FROM public.products
    WHERE (sku = COALESCE(v_item->>'sku',v_item->>'public_sku')
       OR public_sku = COALESCE(v_item->>'sku',v_item->>'public_sku'))
      AND active = true
    FOR UPDATE;
    UPDATE public.products
    SET stock_quantity = stock_quantity - v_qty, updated_at = now()
    WHERE id = v_product.id;
    INSERT INTO public.order_items(order_id,product_id,product_name,sku,quantity,unit_price,line_total)
    VALUES(v_order_id,v_product.id,v_product.name,v_product.sku,v_qty,v_product.price,v_product.price*v_qty);
  END LOOP;

  RETURN jsonb_build_object(
    'order_id',v_order_id,
    'subtotal',v_subtotal,
    'packaging_fee',v_packaging,
    'delivery_fee',v_delivery,
    'total',v_total
  );
END;
$function$

