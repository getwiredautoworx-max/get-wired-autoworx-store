package za.co.getwiredautoworx.owner;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Bitmap;
import android.widget.Toast;

public class MainActivity extends Activity {
    private static final int FILE_PICKER = 4101;
    private static final String OWNER_ASSET_PREFIX = "file:///android_asset/";
    private static final String CAELEX_HOME = "https://caelexinfolog.co.za/Caelex/";
    private static final String CAELEX_ITEM = "https://caelexinfolog.co.za/Caelex/item/J3RXQiEbID7SyEzYw3P63g%253D%253D%3FlistId%3D0&tabIndex%3D1?tabIndex=1";

    private WebView web;
    private ValueCallback<Uri[]> uploadCallback;
    private SharedPreferences prefs;
    private boolean caelexBridgeActive;

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        prefs = getSharedPreferences("caelex_capture", MODE_PRIVATE);

        web = new WebView(this);
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);

        activateOwnerBridge();
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return routeNavigation(request.getUrl().toString());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return routeNavigation(url);
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                configureBridgeForUrl(url);
                if (url != null && (url.startsWith("https://") || url.startsWith("http://")) && !isCaelexUrl(url)) {
                    view.stopLoading();
                    openExternal(Uri.parse(url));
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (isCaelexUrl(url)) {
                    view.evaluateJavascript(
                        "(function(){if(document.getElementById('gwOwnerBridge'))return;" +
                        "var b=document.createElement('div');b.id='gwOwnerBridge';" +
                        "b.style='position:fixed;right:10px;bottom:10px;z-index:2147483647;" +
                        "background:#07111e;border:2px solid #087fe0;border-radius:10px;" +
                        "padding:8px;box-shadow:0 4px 20px rgba(0,0,0,.5);font:14px Arial';" +
                        "b.innerHTML='<button id=\"gwCap\" style=\"background:#087fe0;color:#fff;" +
                        "border:0;border-radius:7px;padding:10px;font-weight:800;margin-right:6px\">" +
                        "CAPTURE PAGE</button><button id=\"gwBack\" style=\"background:#12344c;" +
                        "color:#fff;border:0;border-radius:7px;padding:10px;font-weight:800\">" +
                        "OWNER APK</button>';document.body.appendChild(b);" +
                        "document.getElementById('gwCap').onclick=function(){" +
                        "if(window.AndroidBridge){AndroidBridge.captureCaelexPage();this.textContent='CAPTURED';}};" +
                        "document.getElementById('gwBack').onclick=function(){" +
                        "if(window.AndroidBridge)AndroidBridge.returnToOwner();};})()",
                        null
                    );
                }
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (uploadCallback != null) uploadCallback.onReceiveValue(null);
                uploadCallback = callback;
                try {
                    Intent intent = params.createIntent();
                    startActivityForResult(intent, FILE_PICKER);
                    return true;
                } catch (Exception error) {
                    uploadCallback.onReceiveValue(null);
                    uploadCallback = null;
                    return true;
                }
            }
        });

        setContentView(web);
        loadOwnerScreen(getIntent().getStringExtra("screen"));
    }

    private boolean isOwnerAssetUrl(String url) {
        return url != null && url.startsWith(OWNER_ASSET_PREFIX);
    }

    private boolean isCaelexUrl(String url) {
        if (url == null) return false;
        Uri uri = Uri.parse(url);
        return "https".equalsIgnoreCase(uri.getScheme())
            && "caelexinfolog.co.za".equalsIgnoreCase(uri.getHost())
            && uri.getPath() != null
            && uri.getPath().startsWith("/Caelex/");
    }

    private void configureBridgeForUrl(String url) {
        if (isOwnerAssetUrl(url)) {
            activateOwnerBridge();
        } else if (isCaelexUrl(url)) {
            activateCaelexBridge();
        }
    }

    /*
     * Only local, bundled Owner APK pages and the explicitly approved Caelex
     * portal may stay inside this WebView. Other top-level links open outside
     * the app so third-party sites never receive the privileged Owner bridge.
     */
    private boolean routeNavigation(String url) {
        if (isOwnerAssetUrl(url)) {
            activateOwnerBridge();
            return false;
        }
        if (isCaelexUrl(url)) {
            activateCaelexBridge();
            return false;
        }

        Uri uri = Uri.parse(url);
        String scheme = uri.getScheme();
        if ("http".equalsIgnoreCase(scheme)
                || "https".equalsIgnoreCase(scheme)
                || "mailto".equalsIgnoreCase(scheme)
                || "tel".equalsIgnoreCase(scheme)) {
            openExternal(uri);
        }
        return true;
    }

    private void openExternal(Uri uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (ActivityNotFoundException error) {
            Toast.makeText(this, "No app can open this link.", Toast.LENGTH_SHORT).show();
        }
    }

    private void activateOwnerBridge() {
        if (web == null) return;
        web.removeJavascriptInterface("AndroidBridge");
        web.addJavascriptInterface(new OwnerBridge(), "AndroidBridge");
        caelexBridgeActive = false;
    }

    private void activateCaelexBridge() {
        if (web == null || caelexBridgeActive) return;
        web.removeJavascriptInterface("AndroidBridge");
        web.addJavascriptInterface(new CaelexBridge(), "AndroidBridge");
        caelexBridgeActive = true;
    }

    private void loadOwnerScreen(String screen) {
        activateOwnerBridge();
        String target;
        if ("store".equals(screen)) {
            target = OWNER_ASSET_PREFIX + "store/store.html";
        } else if ("checkout".equals(screen)) {
            target = OWNER_ASSET_PREFIX + "store/checkout-v2.html";
        } else {
            target = OWNER_ASSET_PREFIX + "admin_app.html";
        }
        web.loadUrl(target);
    }

    private void openCaelex(String target) {
        final String url = "item".equals(target) ? CAELEX_ITEM : CAELEX_HOME;
        runOnUiThread(() -> {
            activateCaelexBridge();
            web.loadUrl(url);
        });
    }

    private void captureCaelexPage() {
        runOnUiThread(() -> {
            if (web == null || !isCaelexUrl(web.getUrl())) return;
            web.evaluateJavascript(
                "(function(){var q=function(s){return Array.from(document.querySelectorAll(s)).map(function(e){" +
                "return {tag:e.tagName,text:(e.innerText||e.value||e.getAttribute('aria-label')||'').trim()," +
                "href:e.href||'',name:e.name||'',id:e.id||'',type:e.type||''};});};" +
                "return JSON.stringify({url:location.href,title:document.title," +
                "heading:(document.querySelector('h1,h2')||{}).innerText||''," +
                "text:(document.body.innerText||'').slice(0,50000),links:q('a')," +
                "inputs:q('input,select,textarea,button'),tables:q('table')});})()",
                value -> saveCaelexSnapshot(value)
            );
        });
    }

    private void saveCaelexSnapshot(String value) {
        if (value == null) return;
        prefs.edit().putString("snapshot", value)
            .putLong("captured_at", System.currentTimeMillis()).apply();
    }

    private class OwnerBridge {
        @JavascriptInterface
        public void openCaelex(String target) {
            MainActivity.this.openCaelex(target);
        }

        @JavascriptInterface
        public String getCaelexSnapshot() {
            return prefs.getString("snapshot", "");
        }

        @JavascriptInterface
        public void clearCaelexSnapshot() {
            prefs.edit().remove("snapshot").remove("captured_at").apply();
        }
    }

    /*
     * The remote Caelex page receives only the two operations needed by the
     * in-page capture/return controls. It cannot read or clear saved captures,
     * nor can it invoke the Owner-side portal launcher.
     */
    private class CaelexBridge {
        @JavascriptInterface
        public void captureCaelexPage() {
            MainActivity.this.captureCaelexPage();
        }

        @JavascriptInterface
        public void returnToOwner() {
            runOnUiThread(() -> loadOwnerScreen("owner"));
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_PICKER && uploadCallback != null) {
            Uri[] results = null;
            if (resultCode == RESULT_OK && data != null) {
                if (data.getClipData() != null) {
                    int count = data.getClipData().getItemCount();
                    results = new Uri[count];
                    for (int i = 0; i < count; i++) {
                        results[i] = data.getClipData().getItemAt(i).getUri();
                    }
                } else if (data.getData() != null) {
                    results = new Uri[] { data.getData() };
                }
            }
            uploadCallback.onReceiveValue(results);
            uploadCallback = null;
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) {
            web.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (web != null) {
            web.removeJavascriptInterface("AndroidBridge");
            web.destroy();
            web = null;
        }
        super.onDestroy();
    }
}