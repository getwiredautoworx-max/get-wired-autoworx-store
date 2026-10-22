import { assertEquals, assertStringIncludes } from "jsr:@std/assert@1";

const testJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlc3QiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE5MDAwMDAwMDB9.dummy-signature";
Deno.env.set("SUPABASE_URL", "https://example.supabase.co");
Deno.env.set("SUPABASE_SECRET_KEYS", JSON.stringify({ default: testJwt }));
Deno.env.set("SUPABASE_PUBLISHABLE_KEY", testJwt);

const { handler, validateProductUpdate, validateCategoryUpsert, validateCategoryAncestorStep, validateQueueTask, validateOpportunityApprovalId } = await import("./index.ts");

Deno.test("OPTIONS preflight succeeds without a bearer token", async () => {
  const response = await handler(new Request("https://example.supabase.co/functions/v1/veyron-admin", {
    method: "OPTIONS",
    headers: { origin: "https://www.getwiredauto.co.za" },
  }));
  assertEquals(response.status, 200);
  assertEquals(response.headers.get("Access-Control-Allow-Origin"), "*");
  assertStringIncludes(response.headers.get("Access-Control-Allow-Methods") || "", "OPTIONS");
  assertStringIncludes(response.headers.get("Access-Control-Allow-Headers") || "", "authorization");
});

Deno.test("unauthenticated GET fails closed and keeps CORS headers", async () => {
  const response = await handler(new Request("https://example.supabase.co/functions/v1/veyron-admin?view=products"));
  assertEquals(response.status, 401);
  assertEquals(response.headers.get("Access-Control-Allow-Origin"), "*");
  const body = await response.json();
  assertEquals(body.ok, false);
  assertEquals(body.error, "Admin authorization required.");
});

const productId = "11111111-1111-4111-8111-111111111111";
const categoryId = "22222222-2222-4222-8222-222222222222";
const validProduct = {
  action: "update_product", id: productId, name: "Test relay", category_id: categoryId,
  stock_quantity: 3, description: "Test description", active: true, featured: false,
};

Deno.test("product validator rejects malformed IDs, invalid stock and extra fields", () => {
  assertEquals(validateProductUpdate({ ...validProduct, id: "not-a-uuid" }).ok, false);
  assertEquals(validateProductUpdate({ ...validProduct, stock_quantity: -1 }).ok, false);
  assertEquals(validateProductUpdate({ ...validProduct, stock_quantity: 1.5 }).ok, false);
  assertEquals(validateProductUpdate({ ...validProduct, stock_quantity: 10000001 }).ok, false);
  assertEquals(validateProductUpdate({ ...validProduct, cost_price: 1 }).ok, false);
  assertEquals(validateProductUpdate({ ...validProduct, active: "true" }).ok, false);
  const { active: _active, ...missingActive } = validProduct;
  assertEquals(validateProductUpdate(missingActive).ok, false);
  const { featured: _featured, ...missingFeatured } = validProduct;
  assertEquals(validateProductUpdate(missingFeatured).ok, false);
});

Deno.test("valid product update returns only the allowed customer-safe fields", () => {
  const result = validateProductUpdate(validProduct);
  assertEquals(result.ok, true);
  if (result.ok) {
    assertEquals(result.value.stock, 3);
    assertEquals(result.value.categoryId, categoryId);
    assertEquals("price" in result.value, false);
    assertEquals("cost_price" in result.value, false);
  }
});

Deno.test("category validator rejects malformed IDs, sort order and extra fields", () => {
  const validCategory = { action: "upsert_category", name: "Workshop Tools", parent_id: categoryId, sort_order: "10", active: true };
  assertEquals(validateCategoryUpsert({ ...validCategory, id: "bad-id" }).ok, false);
  assertEquals(validateCategoryUpsert({ ...validCategory, id: 123 }).ok, false);
  assertEquals(validateCategoryUpsert({ ...validCategory, parent_id: "bad-parent" }).ok, false);
  assertEquals(validateCategoryUpsert({ ...validCategory, sort_order: 1.5 }).ok, false);
  assertEquals(validateCategoryUpsert({ ...validCategory, sort_order: 10001 }).ok, false);
  assertEquals(validateCategoryUpsert({ ...validCategory, cost_price: 1 }).ok, false);
  assertEquals(validateCategoryUpsert({ ...validCategory, active: "true" }).ok, false);
  const { active: _active, ...missingActive } = validCategory;
  assertEquals(validateCategoryUpsert(missingActive).ok, false);
});

Deno.test("valid category upsert normalizes slug and keeps sort order bounded", () => {
  const result = validateCategoryUpsert({ action: "upsert_category", name: "Workshop Tools", parent_id: categoryId, sort_order: "10", active: true });
  assertEquals(result.ok, true);
  if (result.ok) {
    assertEquals(result.value.slug, "workshop-tools");
    assertEquals(result.value.sortOrder, 10);
    assertEquals(result.value.parentId, categoryId);
  }
});

Deno.test("category ancestor guard rejects self-parenting and existing cycles", () => {
  assertEquals(validateCategoryAncestorStep(categoryId, categoryId, new Set()).ok, false);
  assertEquals(validateCategoryAncestorStep(categoryId, productId, new Set([productId])).ok, false);
  assertEquals(validateCategoryAncestorStep(categoryId, productId, new Set()).ok, true);
});

Deno.test("queue-task validator rejects invalid worker, priority, payload and extra fields", () => {
  const validTask = { action: "queue_task", worker_id: productId, task_type: "catalogue_sync", priority: 50, input_data: { mode: "dry_run" }, requires_approval: true };
  assertEquals(validateQueueTask({ ...validTask, worker_id: "bad" }).ok, false);
  assertEquals(validateQueueTask({ ...validTask, task_type: "bad task type" }).ok, false);
  assertEquals(validateQueueTask({ ...validTask, priority: 0 }).ok, false);
  assertEquals(validateQueueTask({ ...validTask, priority: 1.5 }).ok, false);
  assertEquals(validateQueueTask({ ...validTask, input_data: ["not", "an", "object"] }).ok, false);
  assertEquals(validateQueueTask({ ...validTask, requires_approval: "false" }).ok, false);
  assertEquals(validateQueueTask({ ...validTask, unexpected: true }).ok, false);
  assertEquals(validateQueueTask({ ...validTask, input_data: { large: "x".repeat(17000) } }).ok, false);
});

Deno.test("valid queue task defaults to approval and preserves bounded fields", () => {
  const result = validateQueueTask({ action: "queue_task", worker_id: productId, task_type: "manual", priority: 50, input_data: { dry_run: true } });
  assertEquals(result.ok, true);
  if (result.ok) {
    assertEquals(result.value.requiresApproval, true);
    assertEquals(result.value.priority, 50);
    assertEquals(result.value.taskType, "manual");
  }
});

Deno.test("opportunity approval requires a UUID and rejects unexpected fields", () => {
  assertEquals(validateOpportunityApprovalId({ action: "approve_opportunity", id: "bad" }).ok, false);
  assertEquals(validateOpportunityApprovalId({ action: "approve_opportunity", id: productId, status: "approved" }).ok, false);
  const result = validateOpportunityApprovalId({ action: "approve_opportunity", id: productId });
  assertEquals(result.ok, true);
  if (result.ok) assertEquals(result.value, productId);
});


Deno.test("unsupported methods are rejected before authentication", async () => {
  const response = await handler(new Request("https://example.supabase.co/functions/v1/veyron-admin", { method: "PUT" }));
  assertEquals(response.status, 405);
  assertEquals((await response.json()).error, "Method Not Allowed");
});
