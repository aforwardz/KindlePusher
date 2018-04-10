// pages/ebook/ebook.js
var ebook_api = getApp().ebook_service
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ebookId: '',
    ebook: { id: 1, title: 'test1', author: 'ycw', publish_date: '2018-02-12', rating: 8.8, ranking: 1 }
  },

  searchEbook: function (id) {
    util.showBusy('正在卖力获取书目')
    var that = this
    wx.request({
      url: ebook_api.RETRIEVE_API + id,
      success: function (response) {
        if (response.statusCode !== 200) {
          console.log(response)
          util.showModel(response.statusCode.toString(), '书目获取失败')
        }
        else {
          that.setData({ebook: response.data})
        }
      },
      fail: function (response) {
        console.log(response)
        util.showModel(response.statusCode.toString(), '服务器吃鸡去了')
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.searchEbook(options.id)
    }
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