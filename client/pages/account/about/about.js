// pages/account/about/about.js
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var about = `<article class="markdown-body" itemprop="text">
<h1>KindlePusher</h1>
<blockquote>
<h4><span style="color: #999999;">一个可以搜索kindle电子书和一键推送到kindle到小程序</span></h4>
</blockquote>
<br />
<p>原本的这个小程序名字已被jubao，靠(小声bb，毕竟可怜、弱小又无助<span>┑(￣Д ￣)┍</span>)</p>
<br />
<p>有想看的书也可以邮箱(见底)联系我(本人较懒，暂时不想建群)</p>
<h3>项目已上线，对此项目有兴趣的朋友可以联系我，后续迭代没那么多时间，不熟悉小程序和后台开发没关系，有js和python经验就行</h3>
<h3><span style="color: #000000;">开发相关</span></h3>
<p>---2018.4.18---<br /> <del>1.0开发告一段落。。</del><br /> ---2018.5.7----<br /> <del>Duang 1.2!!</del><br /> ---2018.6.9----<br /> <del>V1.5 改了大部分布局和样式，以及登录逻辑</del><br />---2018.8.5---<br />V1.9 增加了分类，以及用户页面改版</p>
<h3><span style="color: #000000;">设计相关</span></h3>
<p>---2018.4.18---<br /> <del>直男审美不忍直视つ﹏⊂</del><br /> ---2018.5.7-- - <br /> <del>接受VI指导后，档次蹭蹭蹭(滑稽)</del> <br /> ---2018.6.9---<br /> <del>优化布局后，档次再次蹭蹭蹭 </del><br /> ---2018.8.5--- <br />重写了用户界面，看起来不那么突兀</p>
    <h2><span style="color: #000000;">TODO</span></h2>
      <ol>
      <li><del>布局优化 </del></li >
      <li><del>数据库建设 </del></li >
      <li>加入KB币体系 </li>
      <li> 一些统计功能 </li>
      <li> 服务器邮件系统搭建 </li>
      <li>...</li>
      </ol>
      <br />
      <p> ---2018.4.18---<br /> <del>审核是个蛋疼到问题。。</del> <br /> ---2018.5.7---<br /> <del>站点备案第4天，还未通过。。。</del><br /> ---2018.6.9----<br /> <del>5月底的时候就正式上线了<br /> 因为等上线的时候在帮朋友做另一个小程序，就没有及时更新了，现在忙完了，上来更新一些东西。</del><br />---2018.8.5---<br />有几个相关的小程序下了，这个不作任何商业用途，没人用也没事，只图自己用个乐呵，佛系开发</p>
      <ul>
  <li><h4>虽然项目已经上线了，但一开始就开源了，如有其他用途，务必与我联系 </h4></li >
  <li><h4>不知廉耻github求star </h4></li >
  </ul>
  <p> Author: @Aforwardz</p>
  <p> Email: aforwardzyu@gmail</p>
  </article>`;
    
    WxParse.wxParse('about', 'html', about, that, 3);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})