<h2># demo-jquery.scrollpagination v1.0</h2>
<p>jquery插件 ( 无限滚动翻页  ) - jquery.scrollpagination v1.0</p>
<p>支持横向滚动与垂直滚动</p>
<p><b>演示地址：</b><a href="http://gongshunkai.github.io/demo/%E6%97%A0%E9%99%90%E6%BB%9A%E5%8A%A8%E7%BF%BB%E9%A1%B5/demo.html">http://gongshunkai.github.io/demo/%E6%97%A0%E9%99%90%E6%BB%9A%E5%8A%A8%E7%BF%BB%E9%A1%B5/demo.html</a></p>
<p><b>使用方法：</b></p>
<p>$('.product-list').scrollPagination({<br>&nbsp;&nbsp;
url:function(page){<br>&nbsp;&nbsp;
&nbsp; &nbsp; return 'data/demo.json?page=' + page;<br>&nbsp;&nbsp;
},<br>&nbsp;&nbsp;
beforeLoad: function(){<br>&nbsp;&nbsp;
&nbsp; &nbsp; $('#loading').fadeIn();<br>&nbsp;&nbsp;
},<br>&nbsp;&nbsp;
afterLoad:function(data){<br>&nbsp;&nbsp;
&nbsp; &nbsp; $('#loading').fadeOut();<br>&nbsp;&nbsp;
&nbsp; &nbsp; $.each(data,function(i,o){<br>&nbsp;&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; $('.product-list').append($('&lt;div class=&quot;thumbnail&quot;&gt;&lt;img src=&quot;' + o.thumb + '&quot; alt=&quot;' + o.name + '&quot;&gt;&lt;/div&gt;'));<br>&nbsp;&nbsp;
&nbsp; &nbsp; });<br>&nbsp;&nbsp;
},<br>&nbsp;&nbsp;
pageIndex:5,<br>
&nbsp;&nbsp; pageSize:20,<br>
&nbsp;&nbsp;
offset:10<br>
});</p>
<p>初始化提供1个配置项参数</p>
<p>{<br>
  &nbsp;&nbsp;&nbsp;&nbsp;
  url:null, //数据<br>&nbsp;&nbsp;&nbsp;&nbsp;
  postData:null, //发送数据<br>&nbsp;&nbsp;&nbsp;&nbsp;
  beforeLoad:null, //请求前的回调<br>&nbsp;&nbsp;&nbsp;&nbsp;
  afterLoad:null, //请求后的回调<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onError:null, //错误的回调<br>&nbsp;&nbsp;&nbsp;&nbsp;
  finished:null, //完成的回调<br>&nbsp;&nbsp;&nbsp;&nbsp;
  scrollTarget:window, //滚动目标<br>&nbsp;&nbsp;&nbsp;&nbsp;
  scrollPage:document, //滚动翻页<br>&nbsp;&nbsp;&nbsp;&nbsp;
  pageIndex:1, //当前页码<br>&nbsp;&nbsp;&nbsp;&nbsp;
  pageSize:0, //每页显示的数量<br>&nbsp;&nbsp;&nbsp;&nbsp;
  totalItems:0, //总共有多少条数据<br>&nbsp;&nbsp;&nbsp;&nbsp;
  offset:0, //偏移<br>&nbsp;&nbsp;&nbsp;&nbsp;
  vertical:true, //是否垂直<br>
  };</p>