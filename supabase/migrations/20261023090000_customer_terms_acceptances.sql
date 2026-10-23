-- Durable, versioned customer acceptance evidence. Apply only after review in an isolated Supabase environment.
CREATE TABLE IF NOT EXISTS public.customer_terms_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  terms_version text NOT NULL CHECK (terms_version ~ '^[a-z0-9][a-z0-9._-]{2,80}$'),
  terms_url text NOT NULL CHECK (terms_url IN ('/terms-and-conditions.html')),
  returns_url text NOT NULL CHECK (returns_url IN ('/returns-refunds.html')),
  terms_sha256 text NOT NULL CHECK (terms_sha256 ~ '^[a-f0-9]{64}$'),
  accepted_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  acceptance_source text NOT NULL DEFAULT 'web-checkout' CHECK (acceptance_source IN ('web-checkout')),
  user_agent text,
  UNIQUE (user_id, terms_version, terms_sha256)
);

ALTER TABLE public.customer_terms_acceptances ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.customer_terms_acceptances FROM anon, authenticated;
GRANT SELECT ON TABLE public.customer_terms_acceptances TO authenticated;
CREATE POLICY "customers_read_own_terms_acceptances"
  ON public.customer_terms_acceptances
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Server function inserts with service-role access. Customers cannot forge, update, or delete evidence.
CREATE OR REPLACE FUNCTION public.prevent_terms_acceptance_mutation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RAISE EXCEPTION 'Terms acceptance evidence is immutable';
END;
$$;

DROP TRIGGER IF EXISTS customer_terms_acceptances_immutable ON public.customer_terms_acceptances;
CREATE TRIGGER customer_terms_acceptances_immutable
  BEFORE UPDATE OR DELETE ON public.customer_terms_acceptances
  FOR EACH ROW EXECUTE FUNCTION public.prevent_terms_acceptance_mutation();
