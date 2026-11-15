#!/usr/bin/env python3
"""Static regression checks for the Owner APK WebView trust boundary."""
from pathlib import Path

source = Path("android-owner-app/app/src/main/java/za/co/getwiredautoworx/owner/MainActivity.java").read_text()
required = [
    '"file:///android_asset/admin_app.html".equals(url)',
    '"file:///android_asset/store/store.html".equals(url)',
    '"file:///android_asset/store/checkout-v2.html".equals(url)',
    '"file:///android_asset/store/admin.html".equals(url)',
    '"file:///android_asset/store/index.html".equals(url)',
    '"file:///android_asset/store/index-new.html".equals(url)',
    'web.removeJavascriptInterface("AndroidBridge")',
    'new OwnerBridge()',
    'new CaelexBridge()',
    'uri.getPath() != null',
]
for item in required:
    if item not in source:
        raise SystemExit(f"Missing WebView security invariant: {item}")
if "url.startsWith(OWNER_ASSET_PREFIX)" in source:
    raise SystemExit("Broad local-asset prefix is forbidden; use exact top-level allowlist.")
if 'public void captureCaelexPage()' not in source or 'public void returnToOwner()' not in source:
    raise SystemExit("Caelex bridge lost its two required operations.")
if 'public String getCaelexSnapshot()' in source[source.index("private class CaelexBridge"):]:
    raise SystemExit("Remote Caelex bridge must not expose saved-capture reads.")
if 'public void clearCaelexSnapshot()' in source[source.index("private class CaelexBridge"):]:
    raise SystemExit("Remote Caelex bridge must not expose saved-capture deletion.")
print("Owner APK WebView security boundary checks passed.")
