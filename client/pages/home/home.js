// pages/home/home.js
var ebook_api = getApp().ebook_service
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latests: [],
    recommends: [],
    ranks: [],
    frees: []
  },

  scrollTo: function (e) {
    var t = e.currentTarget.id
    var t_id = '#' + t.replace('index', 'part')
    var query = wx.createSelectorQuery()
    query.select(t_id).boundingClientRect()
    query.exec(function (res) {
      if (res[0] !== null) {
        wx.pageScrollTo({
          scrollTop: res[0].top,
        })
      }
    })
  },

  loadLatest: function () {
    var that = this;
    wx.request({
      url: ebook_api.LATEST_API,
      success: function (response) {
        var latest_data = response.data
        if (latest_data) {
          that.setData({latests: latest_data})
        }
      }
    })
  },

  loadRecommend: function () {
    var that = this;
    wx.request({
      url: ebook_api.RECOMMEND_API,
      success: function (response) {
        var recommend_data = response.data
        console.log(recommend_data)
        if (recommend_data) {
          that.setData({ recommends: recommend_data })
        }
      }
    })
  },

  loadRank: function () {
    var that = this;
    wx.request({
      url: ebook_api.RANK_API,
      success: function (response) {
        var rank_data = response.data
        if (rank_data) {
          that.setData({ ranks: rank_data })
        }
      }
    })
  },

  loadFree: function () {
    var that = this;
    wx.request({
      url: ebook_api.FREE_API,
      success: function (response) {
        var free_data = response.data
        if (free_data) {
          that.setData({ frees: free_data })
        }
      }
    })
  },

  viewEbook: function (e) {
    var ebookId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/ebook/ebook?id=' + ebookId.toString(),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadLatest(),
    this.loadRecommend(),
    this.loadRank(),
    this.loadFree()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'KindlePusher',
      path: '/pages/home/home',
      imageUrl: '../../assets/images/kindlepusher.png',
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