-- Persist the exact policy version, acceptance timestamp and authenticated customer
-- against the order in the same PostgreSQL transaction that creates the order.
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS policy_acknowledged_at timestamptz,
  ADD COLUMN IF NOT EXISTS policy_version text,
  ADD COLUMN IF NOT EXISTS policy_acknowledged_by uuid REFERENCES auth.users(id);

COMMENT ON COLUMN public.orders.policy_acknowledged_at IS 'Server timestamp when the authenticated customer accepted the current checkout policies.';
COMMENT ON COLUMN public.orders.policy_version IS 'Version identifier for the Terms, Returns and Privacy documents accepted at checkout.';
COMMENT ON COLUMN public.orders.policy_acknowledged_by IS 'Authenticated Supabase user ID that accepted the policies.';

CREATE OR REPLACE FUNCTION public.create_store_order_v3(
  p_order_payload jsonb,
  p_policy_version text,
  p_customer_user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_result jsonb;
  v_order_id uuid;
  v_acknowledged_at timestamptz := now();
BEGIN
  IF jsonb_typeof(p_order_payload) IS DISTINCT FROM 'object' THEN
    RAISE EXCEPTION 'Invalid checkout payload';
  END IF;
  IF p_order_payload->>'p_terms_accepted' IS DISTINCT FROM 'true' THEN
    RAISE EXCEPTION 'Policy acknowledgement is required';
  END IF;
  IF p_policy_version IS DISTINCT FROM 'GW-TERMS-RETURNS-PRIVACY-2026-10-30' THEN
    RAISE EXCEPTION 'Unsupported policy version';
  END IF;
  IF p_customer_user_id IS NULL THEN
    RAISE EXCEPTION 'Authenticated customer identity is required';
  END IF;

  -- Invoke the existing, service-role-only order function inside this transaction.
  -- Any failure in the acknowledgement update rolls back order creation and stock changes.
  v_result := public.create_store_order_v2(
    p_order_payload->>'p_customer_name',
    p_order_payload->>'p_customer_email',
    p_order_payload->>'p_customer_phone',
    p_order_payload->>'p_delivery_address',
    p_order_payload->>'p_city',
    p_order_payload->>'p_province',
    p_order_payload->>'p_postal_code',
    NULLIF(p_order_payload->>'p_delivery_fee', '')::numeric,
    p_order_payload->>'p_payment_method',
    p_order_payload->>'p_notes',
    p_order_payload->'p_items',
    p_order_payload->>'p_delivery_method',
    NULLIF(p_order_payload->'p_delivery_quote', 'null'::jsonb)
  );

  v_order_id := (v_result->>'order_id')::uuid;
  IF v_order_id IS NULL THEN
    RAISE EXCEPTION 'Order creation did not return an order ID';
  END IF;

  UPDATE public.orders
  SET policy_acknowledged_at = v_acknowledged_at,
      policy_version = p_policy_version,
      policy_acknowledged_by = p_customer_user_id
  WHERE id = v_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unable to persist checkout policy acknowledgement';
  END IF;

  RETURN v_result || jsonb_build_object(
    'policy_acknowledged_at', v_acknowledged_at,
    'policy_version', p_policy_version
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.create_store_order_v3(jsonb, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_store_order_v3(jsonb, text, uuid) TO service_role;
