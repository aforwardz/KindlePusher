// pages/classify/classify.js
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    book_list: null,
    page: 1,
    next: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var book_type = options.book_type
    var that = this
    that.setData({title: options.class_label})
    wx.request({
      url: app.API.TYPE_API + '?book_type=' + book_type,
      success: function (res) {
        util.showSuccess('获取成功')
        console.log(res)
        that.setData({
          book_list: res.data.results,
          next: res.data.next
        })
      },
      fail: function (res) {
        util.showFail('获取失败')
        console.log(res)
      }
    })
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