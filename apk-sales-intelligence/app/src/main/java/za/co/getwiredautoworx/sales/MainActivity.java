package za.co.getwiredautoworx.sales;

import android.app.*;import android.os.*;import android.graphics.*;import android.graphics.drawable.*;import android.view.*;import android.widget.*;import java.util.*;

public class MainActivity extends Activity {
  LinearLayout root, content; int blue=Color.rgb(8,165,255), red=Color.rgb(255,28,45), panel=Color.rgb(7,18,34);
  public void onCreate(Bundle b){super.onCreate(b); build();}
  TextView tv(String s,int sp){TextView t=new TextView(this);t.setText(s);t.setTextColor(Color.WHITE);t.setTextSize(sp);t.setPadding(18,14,18,14);return t;}
  TextView card(String title,String value,String note){LinearLayout c=new LinearLayout(this);c.setOrientation(LinearLayout.VERTICAL);c.setPadding(4,4,4,4);GradientDrawable g=new GradientDrawable();g.setColor(panel);g.setStroke(2,Color.rgb(18,63,96));g.setCornerRadius(18);c.setBackground(g);TextView a=tv(title,12);a.setTextColor(Color.LTGRAY);TextView v=tv(value,25);v.setTypeface(null,1);TextView n=tv(note,11);n.setTextColor(Color.LTGRAY);c.addView(a);c.addView(v);c.addView(n);return wrap(c);}
  TextView wrap(View v){TextView spacer=new TextView(this);spacer.setLayoutParams(new LinearLayout.LayoutParams(1,1)); return spacer;}
  void addCard(String title,String value,String note){LinearLayout c=new LinearLayout(this);c.setOrientation(LinearLayout.VERTICAL);c.setPadding(16,12,16,12);GradientDrawable g=new GradientDrawable();g.setColor(panel);g.setStroke(2,Color.rgb(18,63,96));g.setCornerRadius(18);c.setBackground(g);c.addView(tv(title,12));TextView v=tv(value,25);v.setTypeface(null,1);c.addView(v);TextView n=tv(note,11);n.setTextColor(Color.LTGRAY);c.addView(n);content.addView(c,new LinearLayout.LayoutParams(-1,-2));}
  void section(String title){TextView h=tv(title,19);h.setTypeface(null,1);h.setTextColor(Color.WHITE);content.addView(h);}
  void build(){root=new LinearLayout(this);root.setOrientation(LinearLayout.VERTICAL);root.setBackgroundColor(Color.rgb(2,6,13));
    LinearLayout head=new LinearLayout(this);head.setPadding(18,18,18,10);head.setOrientation(LinearLayout.VERTICAL);TextView brand=tv("GET WIRED AUTOWORX",24);brand.setTypeface(null,1);brand.setTextColor(blue);head.addView(brand);TextView sub=tv("SALES INTELLIGENCE • OWNER CONTROL",12);sub.setTextColor(Color.LTGRAY);head.addView(sub);root.addView(head);
    ScrollView sv=new ScrollView(this);content=new LinearLayout(this);content.setOrientation(LinearLayout.VERTICAL);content.setPadding(16,8,16,80);sv.addView(content);root.addView(sv,new LinearLayout.LayoutParams(-1,0,1));
    section("TODAY"); addCard("SALES","R0.00","Live connection pending");addCard("ORDERS","0","Today");addCard("PROFIT","R0.00","Calculated from approved sales data");addCard("STORE VISITS","0","Today");addCard("CUSTOMER QUERIES","0","Today");addCard("CONVERSION","0%","Visits → orders");
    section("SALES ANALYSIS");addCard("BEST SELLING","—","Products and categories ranked by units and revenue");addCard("MOST QUERIED","—","Demand signal: queries before sales");addCard("SLOW MOVERS","—","Stock + days since sale + demand");addCard("TRENDING","—","Rising sales or query activity");
    section("SUPPLIER SPECIALS");addCard("ACTIVE SPECIALS","0","Supplier-uploaded specials only");addCard("ENDING SOON","0","Special periods approaching expiry");addCard("MATCHES REQUIRING REVIEW","0","SKU mismatches never auto-published");
    section("PROMOTION OPPORTUNITIES");addCard("DAILY PROMOTION CANDIDATES","—","Veyron analyses slow movement and customer interest");addCard("HIGH QUERY / LOW SALE","—","Investigate price, stock, image or compatibility");
    TextView info=tv("Supplier specials remain separate from Veyron's promotion suggestions. You approve every promotion. Fitments and Repairs are outside this Sales module.",13);info.setTextColor(Color.LTGRAY);content.addView(info);
    setContentView(root);
  }
}
