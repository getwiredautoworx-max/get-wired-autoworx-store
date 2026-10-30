import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";

const db = new PGlite();
try {
  await db.exec("CREATE TABLE public.orders (id bigserial PRIMARY KEY, delivery_quote jsonb)");
  const migration = await readFile("supabase/migrations/20261029150000_delivery_quote_nonce_unique.sql", "utf8");
  await db.exec(migration);
  await db.exec("INSERT INTO public.orders(delivery_quote) VALUES ('{\"live\":true}'::jsonb), ('{\"nonce\":\"nonce-once\"}'::jsonb)");
  let duplicateRejected = false;
  try {
    await db.exec("INSERT INTO public.orders(delivery_quote) VALUES ('{\"nonce\":\"nonce-once\"}'::jsonb)");
  } catch {
    duplicateRejected = true;
  }
  if (!duplicateRejected) throw new Error("Unique nonce index accepted a duplicate quote nonce");
  await db.exec("INSERT INTO public.orders(delivery_quote) VALUES ('{\"live\":true}'::jsonb)");
  console.log("DELIVERY_QUOTE_NONCE_MIGRATION_PASS: legacy quotes without nonce remain allowed; duplicate nonce rejected");
} finally {
  await db.close();
}
