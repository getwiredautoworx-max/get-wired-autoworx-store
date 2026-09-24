package za.co.getwiredautoworx.sales;

import android.app.Activity;
import android.os.Bundle;
import android.graphics.Color;
import android.graphics.Typeface;
import android.view.Gravity;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

public class MainActivity extends Activity {
    private int dp(float v) { return (int)(v * getResources().getDisplayMetrics().density + 0.5f); }

    private TextView makeText(String value, float size, int color, boolean bold) {
        TextView t = new TextView(this);
        t.setText(value);
        t.setTextSize(size);
        t.setTextColor(color);
        t.setTypeface(bold ? Typeface.DEFAULT_BOLD : Typeface.DEFAULT);
        t.setGravity(Gravity.CENTER_VERTICAL);
        t.setPadding(dp(14), dp(12), dp(14), dp(12));
        return t;
    }

    private TextView section(String title, String description) {
        TextView t = makeText(title + "\n" + description, 15, Color.WHITE, true);
        t.setBackgroundColor(Color.rgb(7,18,32));
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(-1, -2);
        p.setMargins(0, dp(8), 0, 0);
        t.setLayoutParams(p);
        return t;
    }

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        ScrollView scroll = new ScrollView(this);
        scroll.setBackgroundColor(Color.rgb(2,6,13));
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(14), dp(18), dp(14), dp(24));

        root.addView(makeText("GET WIRED AUTOWORX", 24, Color.WHITE, true));
        root.addView(makeText("SALES INTELLIGENCE • v0.3.1", 13, Color.rgb(32,174,255), true));
        root.addView(makeText("Private owner/admin sales-control layer. Customer storefront remains separate.", 13, Color.rgb(180,195,210), false));

        root.addView(section("SALES", "Sales activity, orders and revenue intelligence."));
        root.addView(section("CATEGORIES", "Category performance and product distribution."));
        root.addView(section("PRODUCTS", "Product catalogue, pricing and stock control."));
        root.addView(section("BEST SELLERS", "Confirmed high-selling products."));
        root.addView(section("MOST QUERIED", "Products receiving the most customer searches or enquiries."));
        root.addView(section("SLOW MOVERS", "Products needing attention and promotional review."));
        root.addView(section("DAILY SUPPLIER SPECIALS", "Supplier specials with exact start/end periods; upload and track them without overwriting the live catalogue."));

        root.addView(makeText("TEST TARGET\nAndroid emulator API 35\nPackage: za.co.getwiredautoworx.sales", 12, Color.rgb(150,170,190), false));
        scroll.addView(root);
        setContentView(scroll);
    }
}
