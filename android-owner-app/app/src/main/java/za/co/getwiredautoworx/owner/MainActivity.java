package za.co.getwiredautoworx.owner;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.content.Intent;
import android.net.Uri;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient.FileChooserParams;

public class MainActivity extends Activity {
    private WebView web;
    private ValueCallback<Uri[]> uploadCallback;
    private static final int FILE_PICKER = 4101;

    @Override public void onCreate(Bundle b) {
        super.onCreate(b);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setSupportZoom(false);
        web.setWebViewClient(new WebViewClient());
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
        setContentView(web);
        String screen = getIntent().getStringExtra("screen");
        String target = "store".equals(screen) ? "file:///android_asset/store/store.html" : ("checkout".equals(screen) ? "file:///android_asset/store/checkout-v2.html" : "file:///android_asset/admin_app.html");
        web.loadUrl(target);
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
