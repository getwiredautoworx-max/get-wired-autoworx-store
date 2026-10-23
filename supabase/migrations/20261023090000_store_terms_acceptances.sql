-- Durable, versioned proof of customer Terms & Conditions acceptance.
-- Deliberately not applied to any Supabase project by this repository change.

CREATE TABLE IF NOT EXISTS public.store_terms_acceptances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  terms_version text NOT NULL CHECK (length(trim(terms_version)) BETWEEN 1 AND 100),
  accepted_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'store_entry' CHECK (source IN ('store_entry')),
  UNIQUE (user_id, terms_version)
);

ALTER TABLE public.store_terms_acceptances ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS store_terms_acceptances_select_own ON public.store_terms_acceptances;
CREATE POLICY store_terms_acceptances_select_own
  ON public.store_terms_acceptances
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS store_terms_acceptances_insert_own ON public.store_terms_acceptances;
CREATE POLICY store_terms_acceptances_insert_own
  ON public.store_terms_acceptances
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

REVOKE ALL ON TABLE public.store_terms_acceptances FROM anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.store_terms_acceptances TO authenticated;

-- Never let the browser choose the recorded acceptance time or source.
CREATE OR REPLACE FUNCTION public.enforce_store_terms_acceptance_fields()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.accepted_at := now();
  NEW.source := 'store_entry';
  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.enforce_store_terms_acceptance_fields() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS store_terms_acceptances_server_timestamp ON public.store_terms_acceptances;
CREATE TRIGGER store_terms_acceptances_server_timestamp
  BEFORE INSERT ON public.store_terms_acceptances
  FOR EACH ROW EXECUTE FUNCTION public.enforce_store_terms_acceptance_fields();

COMMENT ON TABLE public.store_terms_acceptances IS
  'Append-only per-user evidence that a specific store Terms & Conditions version was accepted. Checkout must verify the current version server-side.';
