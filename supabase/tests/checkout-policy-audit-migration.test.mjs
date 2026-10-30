import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";

const db = new PGlite();
try {
  await db.exec(`
    CREATE TABLE public.orders (id uuid PRIMARY KEY);
    CREATE FUNCTION public.create_store_order_v2(
      text, text, text, text, text, text, text, numeric, text, text, jsonb, text, jsonb
    ) RETURNS jsonb LANGUAGE sql AS $$
      WITH created AS (
        INSERT INTO public.orders(id)
        VALUES ('00000000-0000-4000-8000-000000000002')
        RETURNING id
      )
      SELECT jsonb_build_object('order_id', id, 'order_number', 1001) FROM created;
    $$;
  `);
  const migration = await readFile("supabase/migrations/20261029160000_checkout_policy_audit.sql", "utf8");
  await db.exec(migration);
  const payload = {
    p_customer_name: "Checkout Test",
    p_customer_email: "checkout@example.com",
    p_customer_phone: "0744884234",
    p_delivery_address: "",
    p_city: "",
    p_province: "",
    p_postal_code: "",
    p_delivery_fee: 0,
    p_payment_method: "direct_eft",
    p_notes: "migration test",
    p_items: [],
    p_delivery_method: "pickup",
    p_delivery_quote: null,
    p_terms_accepted: true
  };
  const args = JSON.stringify(payload).replaceAll("'", "''");
  const result = await db.query(
    `SELECT public.create_store_order_v3('${args}'::jsonb, 'GW-TERMS-RETURNS-PRIVACY-2026-10-30', '00000000-0000-4000-8000-000000000001') AS result`
  );
  if (result.rows[0].result.policy_version !== "GW-TERMS-RETURNS-PRIVACY-2026-10-30") throw new Error("Policy version was not returned");
  const saved = await db.query("SELECT policy_acknowledged_at, policy_version, policy_acknowledged_by FROM public.orders");
  if (saved.rows.length !== 1 || !saved.rows[0].policy_acknowledged_at ||
      saved.rows[0].policy_version !== "GW-TERMS-RETURNS-PRIVACY-2026-10-30" ||
      saved.rows[0].policy_acknowledged_by !== "00000000-0000-4000-8000-000000000001") {
    throw new Error("Policy acknowledgement was not durably stored against the order");
  }
  let rejected = false;
  try {
    const bad = { ...payload, p_terms_accepted: false };
    const badArgs = JSON.stringify(bad).replaceAll("'", "''");
    await db.query(`SELECT public.create_store_order_v3('${badArgs}'::jsonb, 'GW-TERMS-RETURNS-PRIVACY-2026-10-30', '00000000-0000-4000-8000-000000000001')`);
  } catch { rejected = true; }
  if (!rejected) throw new Error("RPC accepted an order without policy acknowledgement");
  console.log("CHECKOUT_POLICY_AUDIT_MIGRATION_PASS");
} finally {
  await db.close();
}
