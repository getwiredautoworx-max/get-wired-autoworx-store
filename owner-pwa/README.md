# Get Wired AutoWorx Owner Hub PWA (preview)

This is an isolated static PWA shell in `owner-pwa/`; it does not change the storefront, Axxess hosting, DNS, Supabase, payment settings, or Android native app.

## Test
Serve this directory over HTTPS (or localhost for development), open it in Android Chrome, then use Chrome's menu > **Install app** or **Add to Home screen**. On a static host the app may be served from a subpath, so keep all assets relative.

## Important limitations
- This is currently a shortcut shell, not a replacement for authenticated owner catalogue/stock management.
- The admin shortcut points to the existing `/admin.html` URL and is not proof that the target is live, secure, or functional. Verify login and server-side authorization before using it for owner operations.
- Do not cache account data, admin routes, or authenticated responses in the service worker.
- Do not merge or publish to production until the preview is checked on the Hisense M72 Pro and the owner tool's access controls are independently verified.
- Offline support is limited to the static shell; owner operations require a network connection.
