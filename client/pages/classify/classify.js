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

  getClassBook: function (url) {
    var that = this
    wx.request({
      url: url,
      success: function (res) {
        util.showSuccess('获取成功')
        console.log(res)
        if (that.book_list) {
          var new_book_list = that.book_list.concat(res.data.results)
        } else {
          var new_book_list = res.data.results
        }
        that.setData({
          book_list: new_book_list,
          next: res.data.next
        })
      },
      fail: function (res) {
        util.showFail('获取失败')
        console.log(res)
      }
    })
  },

  viewBook: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/ebook/ebook?id=' + id.toString()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var book_type = options.book_type
    this.setData({title: options.class_label})
    var url = app.API.TYPE_API + '?book_type=' + book_type
    this.getClassBook(url)
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
    if (this.next) {
      this.getClassBook(next)
    } else {
      util.showFail('木有啦')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})