import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";

const html = await readFile("checkout-v2.html", "utf8");
const start = html.indexOf("$('wa').href='https://wa.me/27744884234?text='");
assert(start >= 0, "WhatsApp handoff must use the existing Get Wired business number");
const end = html.indexOf("}catch(err)", start);
assert(end > start, "WhatsApp handoff must be bounded to the successful order path");
const message = html.slice(start, end);

assert.match(message, /encodeURIComponent\(/, "WhatsApp message must be URL encoded");
assert.match(message, /orderRef/, "WhatsApp message must include the order reference");
assert.match(message, /cart\.map/, "WhatsApp message must include the ordered item summary");
assert.match(message, /data\.total/, "WhatsApp message must include the order total");
assert.doesNotMatch(message, /deliveryAddress|\baddress\b|bank_name|account_number|branch_code|account_type|payment_instructions/i,
  "WhatsApp message must not expose delivery address or bank instructions");

assert.match(html, /DIRECT EFT PAYMENT DETAILS/, "Order confirmation must show configured Direct EFT details");
for (const field of ["bank_name", "account_name", "account_number", "branch_code", "account_type", "payment_reference"]) {
  assert(html.includes(field), "Checkout must render the configured EFT field: " + field);
}
assert.match(html, /Payment status: Pending/, "EFT must remain pending until manually verified");
console.log("DIRECT_EFT_WHATSAPP_UI_PASS: encoded order reference, item summary and total; no address or bank details in WhatsApp");
