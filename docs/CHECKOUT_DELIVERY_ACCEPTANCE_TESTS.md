# Checkout delivery hardening — acceptance tests
Branch: dev/checkout-delivery-hardening
Status: test specification only; tests not executed against production.

## Fee and quote integrity
- Valid server-issued quote, not expired, destination unchanged: accept and charge quoted provider amount + R15 once per delivery address.
- Alter quote amount/provider/destination/token: reject.
- Expired or missing quote: reject; do not create order.
- Submitted fee 0, negative, NaN, infinity, string, or huge value: reject.
- Client sends fee equal to quote but no verifiable quote token: reject.
- One-item and five-item carts with the same address: dispatch fee remains R15 once; packaging remains R35 per unit.
- Two separately billed delivery addresses (only if supported): dispatch charge is applied once to each address, not once per item.

## Delivery and payment
- Any pickup/cash-on-pickup value, including direct RPC invocation: reject.
- Only explicitly supported payment-method identifiers: accept; unknown value: reject.
- PAXI selected without a valid destination point identifier: reject.
- PAXI selected with a valid point code/name and destination: persist structured point data with the order.
- Courier/locker quote for changed postal code or city: invalidate previous quote.
- Provider unavailable or malformed response: show no firm live quote; manual quote fallback must not silently create an order.

## Cart and stock
- Empty/non-array items, >100 lines, missing SKU, malformed quantity, fractional/negative/zero quantity: reject clearly.
- SKU not active or unavailable stock: reject with no partial order.
- Concurrent purchases of the last unit: at most one succeeds; no negative stock.
- Duplicate SKU lines in one cart: aggregate or safely lock/check total requested quantity so stock cannot be oversold.
- Client-supplied price/name/stock/weight/dimensions ignored; use trusted database product values or mark quote provisional.

## Security and compatibility
- Anonymous caller cannot execute either order RPC directly.
- Edge Function uses server-only credentials; never return secrets.
- Legacy overload call sites and EXECUTE grants are inventoried before disabling it.
- CORS origin policy is reviewed for production; broad wildcard is not relied on as authorization.
- Failed validation creates no customer/order/order_items rows and does not decrement stock.
- Successful order persists exact quote reference, destination, provider, fee breakdown, and pending payment state.

## Test data and release gates
- Use isolated development database and synthetic SKUs only.
- No live orders, payment attempts, stock changes, or production function deployments for test runs.
- Capture each expected/actual result and SQL row-count delta.
- Release only after all tests pass, reviewed migration is approved, and owner authorizes controlled final testing.
