-- Checkout security migration: require and persist authenticated customer linkage.
-- This file is source-only until explicitly reviewed and applied to a staging project.

DROP FUNCTION IF EXISTS public.create_store_order_v2(text, text, text, text, text, text, text, numeric, text, text, jsonb, text, jsonb);

CREATE FUNCTION public.create_store_order_v2(p_customer_name text, p_customer_email text, p_customer_phone text, p_delivery_address text, p_city text, p_province text, p_postal_code text, p_delivery_fee numeric, p_payment_method text, p_notes text, p_items jsonb, p_delivery_method text, p_delivery_quote jsonb DEFAULT NULL::jsonb, p_customer_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_order_id uuid;
  v_order_number bigint;
  v_item jsonb;
  v_product public.products%ROWTYPE;
  v_sku text;
  v_qty integer;
  v_subtotal numeric := 0;
  v_item_count integer := 0;
  v_packaging numeric := 0;
  v_delivery numeric := 0;
  v_address text;
  v_expected numeric;
BEGIN
  IF p_customer_name IS NULL OR length(trim(p_customer_name)) < 2 THEN
    RAISE EXCEPTION 'Customer name is required';
  END IF;
  IF p_customer_email IS NULL OR position('@' IN p_customer_email) < 2 THEN
    RAISE EXCEPTION 'A valid customer email is required';
  END IF;
  IF p_customer_phone IS NULL OR length(trim(p_customer_phone)) < 5 THEN
    RAISE EXCEPTION 'Customer phone is required';
  END IF;
  IF p_customer_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.customers c
    WHERE c.id = p_customer_id AND c.auth_user_id IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'Authenticated customer profile is required';
  END IF;
  IF p_payment_method IS DISTINCT FROM 'direct_eft' THEN
    RAISE EXCEPTION 'Unsupported payment method';
  END IF;
  IF jsonb_typeof(p_items) <> 'array' OR jsonb_array_length(p_items) = 0 OR jsonb_array_length(p_items) > 100 THEN
    RAISE EXCEPTION 'Cart must contain between 1 and 100 items';
  END IF;

  IF lower(coalesce(p_delivery_method, 'delivery')) = 'pickup' THEN
    v_delivery := 0;
    v_address := 'Customer pickup from Get Wired AutoWorx';
  ELSIF lower(coalesce(p_delivery_method, '')) = 'delivery' THEN
    IF coalesce(p_delivery_address, '') = '' OR coalesce(p_city, '') = '' OR coalesce(p_province, '') = '' OR coalesce(p_postal_code, '') = '' THEN
      RAISE EXCEPTION 'Complete delivery address is required';
    END IF;
    IF coalesce((p_delivery_quote->>'live')::boolean, false) IS NOT TRUE THEN
      RAISE EXCEPTION 'A confirmed live delivery quotation is required';
    END IF;
    IF coalesce((p_delivery_quote->>'price')::numeric, -1) < 0 OR
       abs(coalesce(p_delivery_fee, -1) - coalesce((p_delivery_quote->>'price')::numeric, -2)) > 0.01 THEN
      RAISE EXCEPTION 'Delivery fee does not match the confirmed quotation';
    END IF;
    v_delivery := coalesce((p_delivery_quote->>'price')::numeric, 0);
    v_address := trim(p_delivery_address) || E'\n' || trim(p_city) || ', ' || trim(p_province) || ' ' || trim(p_postal_code);
  ELSE
    RAISE EXCEPTION 'Unsupported delivery method';
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_sku := trim(coalesce(v_item->>'public_sku', ''));
    IF v_sku !~ '^GW-[A-Z0-9]{8}$' THEN
      RAISE EXCEPTION 'Invalid public product SKU';
    END IF;
    IF coalesce(v_item->>'quantity', '') !~ '^[0-9]+$' THEN
      RAISE EXCEPTION 'Invalid quantity for %', v_sku;
    END IF;
    v_qty := (v_item->>'quantity')::integer;
    IF v_qty < 1 OR v_qty > 99 THEN
      RAISE EXCEPTION 'Quantity must be between 1 and 99 for %', v_sku;
    END IF;

    SELECT * INTO v_product
    FROM public.products
    WHERE public_sku = v_sku AND active IS TRUE
    FOR UPDATE;

    IF NOT FOUND THEN RAISE EXCEPTION 'Product not found: %', v_sku; END IF;
    IF coalesce(v_product.stock_quantity, 0) < v_qty THEN
      RAISE EXCEPTION 'Insufficient stock for %', v_sku;
    END IF;
    v_expected := round(v_product.cost_price * 1.15 * 1.35, 2);
    IF coalesce(v_product.specifications->>'price_status', '') = 'QUOTE_REQUIRED'
       OR v_product.price IS NULL OR v_product.price <= 0
       OR v_product.cost_price IS NULL OR v_product.cost_price <= 0
       OR abs(v_product.price - v_expected) > 0.01 THEN
      RAISE EXCEPTION 'Current price confirmation is required for %', v_sku;
    END IF;

    v_subtotal := v_subtotal + (v_product.price * v_qty);
    v_item_count := v_item_count + v_qty;
  END LOOP;

  v_packaging := v_item_count * 35.00;

  INSERT INTO public.orders(
    customer_id, customer_name, customer_email, customer_phone, delivery_address,
    subtotal, packaging_fee, delivery_fee, total, payment_method,
    payment_status, order_status, delivery_method, delivery_quote, notes
  )
  VALUES (
    p_customer_id, trim(p_customer_name), trim(p_customer_email), trim(p_customer_phone), v_address,
    v_subtotal, v_packaging, v_delivery, v_subtotal + v_packaging + v_delivery,
    p_payment_method, 'pending', 'pending', lower(p_delivery_method), p_delivery_quote, nullif(trim(coalesce(p_notes, '')), '')
  )
  RETURNING id, order_number INTO v_order_id, v_order_number;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_sku := trim(v_item->>'public_sku');
    v_qty := (v_item->>'quantity')::integer;
    SELECT * INTO v_product
    FROM public.products
    WHERE public_sku = v_sku AND active IS TRUE
    FOR UPDATE;
    UPDATE public.products
    SET stock_quantity = stock_quantity - v_qty
    WHERE id = v_product.id;

    INSERT INTO public.order_items(order_id, product_id, sku, product_name, quantity, unit_price, line_total)
    VALUES (v_order_id, v_product.id, v_product.public_sku, v_product.name, v_qty, v_product.price, v_product.price * v_qty);
  END LOOP;

  RETURN jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'subtotal', v_subtotal,
    'packaging_fee', v_packaging,
    'delivery_fee', v_delivery,
    'total', v_subtotal + v_packaging + v_delivery,
    'payment_status', 'pending'
  );
END;
$function$;

CREATE UNIQUE INDEX IF NOT EXISTS customers_auth_user_id_unique
  ON public.customers (auth_user_id)
  WHERE auth_user_id IS NOT NULL;

REVOKE ALL ON FUNCTION public.create_store_order_v2(text, text, text, text, text, text, text, numeric, text, text, jsonb, text, jsonb, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_store_order_v2(text, text, text, text, text, text, text, numeric, text, text, jsonb, text, jsonb, uuid) TO service_role;
