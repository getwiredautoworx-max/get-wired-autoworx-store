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

public class MainActivity extends Activity {
    private WebView web;
    private ValueCallback<Uri[]> uploadCallback;
    private static final int FILE_PICKER = 4101;
    private static final String CAELEX_HOME = "https://caelexinfolog.co.za/Caelex/";
    private static final String CAELEX_ITEM = "https://caelexinfolog.co.za/Caelex/item/J3RXQiEbID7SyEzYw3P63g%253D%253D%3FlistId%3D0&tabIndex%3D1?tabIndex=1";

    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
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
