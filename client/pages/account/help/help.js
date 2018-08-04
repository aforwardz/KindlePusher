// pages/account/help/help.js
const app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedinfo: ''
  },

  bindFeedback: function (event) {
    console.log(event)
    this.data.feedinfo = event.detail.value
  },

  submitFeedback: function () {
    if (!this.data.feedinfo) {
      util.showFail('请输入反馈信息')
    } else {
      var feedback = {'feedback': this.data.feedinfo}
      wx.request({
        url: app.API.FEEDBACK_API,
        method: 'POST',
        data: feedback,
        success: function (res) {
          util.showSuccess('反馈成功')
        },
        fail: function (res) {
          util.showFail('反馈失败')
        },
        complete: function () {
          wx.navigateBack({})
        }
      })
    }
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