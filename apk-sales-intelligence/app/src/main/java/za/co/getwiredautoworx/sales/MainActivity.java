package za.co.getwiredautoworx.sales;

import android.app.*;
import android.os.*;
import android.graphics.Color;
import android.content.*;
import android.view.*;
import android.widget.*;
import java.io.*;
import java.net.*;
import java.util.*;
import org.json.*;

public class MainActivity extends Activity {
  static final String BASE="https://ojytykqpvonxvepprgbh.supabase.co/rest/v1/";
  static final String KEY="sb_publishable_rSKAEYqQheFAljUmro6uGA_MmBm-l3w";
  LinearLayout root, cards; TextView status;

  public void onCreate(Bundle b){super.onCreate(b); build(); load();}

  TextView tv(String s,int sp){ TextView t=new TextView(this); t.setText(s); t.setTextSize(sp); t.setTextColor(Color.rgb(25,25,25)); t.setPadding(18,14,18,14); return t; }
  void build(){
    ScrollView sv=new ScrollView(this); root=new LinearLayout(this); root.setOrientation(LinearLayout.VERTICAL); root.setPadding(18,18,18,24);
    TextView title=tv("GET WIRED AUTOWORX",24); title.setTextColor(Color.WHITE); title.setTypeface(null,1); title.setBackgroundColor(Color.rgb(18,18,18)); title.setPadding(20,22,20,22); root.addView(title);
    TextView sub=tv("SALES INTELLIGENCE  •  v0.3",13); root.addView(sub);
    status=tv("Connecting to store data…",13); root.addView(status);
    cards=new LinearLayout(this); cards.setOrientation(LinearLayout.VERTICAL); root.addView(cards);
    TextView note=tv("Sales-focused build. Fitments and Repairs remain separate and are not included in this dashboard.",12); note.setPadding(18,24,18,8); root.addView(note);
    sv.addView(root); setContentView(sv);
  }
  void card(String heading,String value,String detail){
    LinearLayout c=new LinearLayout(this); c.setOrientation(LinearLayout.VERTICAL); c.setPadding(6,8,6,8);
    TextView h=tv(heading,16); h.setTypeface(null,1); c.addView(h);
    TextView v=tv(value,27); v.setTypeface(null,1); c.addView(v);
    c.addView(tv(detail,12)); cards.addView(c);
  }
  void load(){
    new Thread(()->{
      try{
        JSONArray products=get("products?select=id,name,sku,price,cost_price,stock_quantity,active,category_id&active=eq.true&limit=5000");
        JSONArray cats=get("categories?select=id,name,active&active=eq.true&limit=500");
        runOnUiThread(()->render(products,cats));
      }catch(Exception e){runOnUiThread(()->status.setText("Store data connection failed: "+e.getMessage()));}
    }).start();
  }
  JSONArray get(String path)throws Exception{
    HttpURLConnection c=(HttpURLConnection)new URL(BASE+path).openConnection();
    c.setRequestMethod("GET"); c.setRequestProperty("apikey",KEY); c.setRequestProperty("Accept","application/json");
    int code=c.getResponseCode(); InputStream in=code>=200&&code<300?c.getInputStream():c.getErrorStream();
    BufferedReader r=new BufferedReader(new InputStreamReader(in)); StringBuilder s=new StringBuilder(); String line; while((line=r.readLine())!=null)s.append(line);
    if(code<200||code>=300)throw new IOException(code+" "+s); return new JSONArray(s.toString());
  }
  void render(JSONArray p,JSONArray c){
    cards.removeAllViews();
    int low=0,out=0; double stockValue=0;
    for(int i=0;i<p.length();i++)try{JSONObject x=p.getJSONObject(i); int q=x.optInt("stock_quantity",0); if(q<=0)out++; else if(q<=2)low++; stockValue+=q*x.optDouble("cost_price",0);}catch(Exception e){}
    card("PRODUCTS",String.valueOf(p.length()),"Active catalogue records visible to the app");
    card("CATEGORIES",String.valueOf(c.length()),"Active sales categories");
    card("SALES DATA","Admin sign-in required","Order totals and customer/order records are protected and are not queried with the public catalogue key");
    card("LOW / OUT OF STOCK",low+" / "+out,"Low stock ≤ 2 units; out of stock = 0");
    card("BEST SELLERS","Admin sign-in required","Calculated only from authenticated order history; no sales are guessed");
    card("MOST QUERIED","Awaiting query telemetry","No query-event table/data is currently available; not guessed");
    card("SLOW MOVERS","Admin sign-in required","Requires authenticated sales history for a defensible result");
    card("DAILY SPECIALS","Supplier specials workflow ready for next data connection","Special period, SKU matching and expiry will be kept separate from normal catalogue pricing");
    status.setText("Connected to public catalogue • "+new Date());
  }
  String topSold(HashMap<String,Integer> s,HashMap<String,String> n){String k=null;int v=-1;for(String x:s.keySet())if(s.get(x)>v){v=s.get(x);k=x;}return n.get(k)+" ("+v+" units)";}
  String slowMover(JSONArray p,HashMap<String,Integer>s){String best="No zero-sales product can be classified safely yet";for(int i=0;i<p.length();i++)try{String id=p.getJSONObject(i).optString("id");if(!s.containsKey(id)){best=p.getJSONObject(i).optString("name");break;}}catch(Exception e){}return best;}
}