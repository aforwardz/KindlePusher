// pages/home/search/search.js
var app = getApp();
var ebook_api = getApp().ebook_service
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    showClear: false,
    format_index: 0,
    result: {
      subjects: []
    },
    searched: false,
    hots: ['天才余', 'RNG', '陈独秀', '小猪配齐'],
    guess: [{ like: '熊出没', likely: '70%' }, { like: '四驱兄弟', likely: '40%' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

/**搜索书籍 */
  bindSearchInput: function (event) {
    var value = event.detail.value;
    var readyData = { showClear: false };
    if (value.length > 0) {
      readyData = { showClear: true , searchValue: value};
      this.setData(readyData);
    }
  },
  /**清空输入框 */
  bindSearchClear: function (event) {
    var readyData = { searchValue: "", showClear: false, result: {}, searched: false };
    this.setData(readyData);
  },
  /**点击搜索 */
  bindSearchStart: function (event) {
    util.showBusy('正在搜索')
    this.handleSearchData(this.data.searchValue)
  },
  /** 提交搜索请求 */
  handleSearchData: function (value) {
    var that = this;
    that.setData({searched: true})
    var serchURL = ebook_api.SEARCH_API + '?search=' + value;
    wx.request({
      url: serchURL,
      success: function (res) {
        // success
        var data = res.data;
        console.log(data)
        if (data) {
          util.showSuccess('搜索成功')
          that.setData({result: {subjects: data}})
        } else {
          util.showModal('抱歉', '暂无相关书籍')
        }
      },
      fail: function (res) {
        // fail
        util.showModal('失败', res.body.detail)
      },
      complete: function () {
        // complete
      }
    });
  },
 
  /** 点击进入搜索条目 */
  viewBook: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/ebook/ebook?id=' + id.toString()
    })
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