package za.co.getwiredautoworx.owner;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.webkit.ValueCallback;
import android.webkit.JavascriptInterface;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebChromeClient.FileChooserParams;
import android.graphics.Bitmap;
import android.content.SharedPreferences;

public class MainActivity extends Activity {
    private WebView web;
    private ValueCallback<Uri[]> uploadCallback;
    private SharedPreferences prefs;
    private static final int FILE_PICKER = 4101;
    private static final String CAELEX_HOME = "https://caelexinfolog.co.za/Caelex/";
    private static final String CAELEX_ITEM = "https://caelexinfolog.co.za/Caelex/item/J3RXQiEbID7SyEzYw3P63g%253D%253D%3FlistId%3D0&tabIndex%3D1?tabIndex=1";

    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        prefs = getSharedPreferences("caelex_capture", MODE_PRIVATE);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        web.setWebViewClient(new WebViewClient() {
            @Override public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }

            @Override public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (url != null && url.startsWith(CAELEX_HOME)) {
                    view.evaluateJavascript("(function(){if(document.getElementById('gwOwnerBridge'))return;var b=document.createElement('div');b.id='gwOwnerBridge';b.style='position:fixed;right:10px;bottom:10px;z-index:2147483647;background:#07111e;border:2px solid #087fe0;border-radius:10px;padding:8px;box-shadow:0 4px 20px rgba(0,0,0,.5);font:14px Arial';b.innerHTML='<button id=\"gwCap\" style=\"background:#087fe0;color:#fff;border:0;border-radius:7px;padding:10px;font-weight:800;margin-right:6px\">CAPTURE PAGE</button><button id=\"gwBack\" style=\"background:#12344c;color:#fff;border:0;border-radius:7px;padding:10px;font-weight:800\">OWNER APK</button>';document.body.appendChild(b);document.getElementById('gwCap').onclick=function(){if(window.AndroidBridge){AndroidBridge.captureCaelexPage();this.textContent='CAPTURED';}};document.getElementById('gwBack').onclick=function(){if(window.AndroidBridge)AndroidBridge.returnToOwner();};})()");
                }
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
                if (uploadCallback != null) uploadCallback.onReceiveValue(null);
                uploadCallback = cb;
                try {
                    Intent i = p.createIntent();
                    startActivityForResult(i, FILE_PICKER);
                    return true;
                } catch (Exception e) { uploadCallback = null; return false; }
            }
        });
        web.addJavascriptInterface(new SupplierBridge(), "AndroidBridge");
        setContentView(web);

        String screen = getIntent().getStringExtra("screen");
        if ("caelex".equals(screen)) {
            String target = getIntent().getStringExtra("url");
            if (target == null || !target.startsWith("https://caelexinfolog.co.za/Caelex/")) target = CAELEX_HOME;
            web.loadUrl(target);
        } else {
            String target = "store".equals(screen) ? "file:///android_asset/store/store.html"
                    : ("checkout".equals(screen) ? "file:///android_asset/store/checkout-v2.html"
                    : "file:///android_asset/admin_app.html");
            web.loadUrl(target);
        }
    }


    private class SupplierBridge {
        @JavascriptInterface public void openCaelex(String target) {
            String url = "home".equals(target) ? CAELEX_HOME : CAELEX_ITEM;
            if (!url.startsWith(CAELEX_HOME)) url = CAELEX_HOME;
            web.loadUrl(url);
        }

        @JavascriptInterface public void captureCaelexPage() {
            String current = web.getUrl();
            if (current == null || !current.startsWith(CAELEX_HOME)) return;
            web.evaluateJavascript("(function(){var q=function(s){return Array.from(document.querySelectorAll(s)).map(function(e){return {tag:e.tagName,text:(e.innerText||e.value||e.getAttribute('aria-label')||'').trim(),href:e.href||'',name:e.name||'',id:e.id||'',type:e.type||''};});}; return JSON.stringify({url:location.href,title:document.title,heading:(document.querySelector('h1,h2')||{}).innerText||'',text:(document.body.innerText||'').slice(0,50000),links:q('a'),inputs:q('input,select,textarea,button'),tables:q('table')});})()", new ValueCallback<String>() { @Override public void onReceiveValue(String value) { saveCaelexSnapshot(value); }});
        }

        @JavascriptInterface public String getCaelexSnapshot() {
            return prefs.getString("snapshot", "");
        }

        @JavascriptInterface public void clearCaelexSnapshot() {
            prefs.edit().remove("snapshot").apply();
        }

        @JavascriptInterface public void returnToOwner() {
            web.loadUrl("file:///android_asset/admin_app.html");
        }

        private void saveCaelexSnapshot(String value) {
            if (value == null) return;
            prefs.edit().putString("snapshot", value).putLong("captured_at", System.currentTimeMillis()).apply();
        }
    }

    @Override protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == FILE_PICKER && uploadCallback != null) {
            Uri[] r = null;
            if (resultCode == RESULT_OK && data != null) {
                if (data.getClipData() != null) {
                    int n=data.getClipData().getItemCount(); r=new Uri[n];
                    for(int i=0;i<n;i++) r[i]=data.getClipData().getItemAt(i).getUri();
                } else if (data.getData()!=null) r=new Uri[]{data.getData()};
            }
            uploadCallback.onReceiveValue(r); uploadCallback=null;
        } else super.onActivityResult(requestCode,resultCode,data);
    }
}
