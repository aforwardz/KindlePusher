// pages/home/search/search.js
const app = getApp()
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
    hots: ['人工智能', '区块链', '陈独秀', '哈利波特'],
    guess: [{ like: '野猪佩琪', likely: '70%' }, { like: '熊出没', likely: '60%' }],
    classify: [
      {index: '1', label: '文学'},
      {index: '2', label: '小说'},
      {index: '25', label: '计算机'},
      {index: '5', label: '艺术摄影'},
      {index: '13', label: '历史'},
      {index: '14', label: '法律'},
      {index: '10', label: '哲学宗教'},
      {index: '12', label: '心理学'},
      {index: '23', label: '科技'},
      {index: '16', label: '经济管理'},
      {index: '17', label: '励志成功'},
      {index: '3', label: '传记'},
      {index: '9', label: '社会科学'},
      {index: '26', label: '医学'},
      {index: '29', label: '时尚'},
      {index: '35', label: '体育'}]
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
  /**搜索热门 */
  searchHot: function (event) {
    util.showBusy('正在搜索')
    var search = event.currentTarget.dataset.hot
    this.handleSearchData(search)
  },
  /**点击搜索 */
  bindSearchStart: function (event) {
    util.showBusy('正在搜索')
    this.handleSearchData(this.data.searchValue)
  },
  /** 提交搜索请求 */
  handleSearchData: function (value) {
    var that = this;
    that.setData({ showClear: true})
    value = value.trim()
    if (value) {
      that.setData({searched: true})
      var serchURL = app.API.SEARCH_API + '?search=' + value;
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
    } else {
      util.showModal('错误', '搜索内容为空')
    }
  },

  listClassBook: function (event) {
    console.log(event)
    var book_type = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/classify/classify?book_type=' + book_type
    })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'KindlePusher电子书推送',
      path: '/pages/home/home',
      imageUrl: '/assets/images/kindlepusher.png',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})