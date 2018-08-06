// pages/account/set/set.js
const app = getApp()
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '',
  },

  validateEmail: function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },

  setEmail: function (event) {
    var email = event.detail.value
    var that = this
    if (email === this.data.email) {
      util.showFail('未变化')
    } else {
      if (that.validateEmail(email)) {
        wx.showModal({
          title: '确认',
          content: '将' + event.detail.value + '设置成推送邮箱？',
          success: function (res) {
            if (res.confirm) {
              var uData = {
                open_id: wx.getStorageSync('openid'),
                kindle_email: email
              }
              wx.request({
                url: app.API.EMAIL_API,
                method: 'PUT',
                data: uData,
                success: function (res) {
                  util.showSuccess('设置成功')
                  wx.setStorageSync( "email", res.data.kindle_email)
                },
                fail: function (res) {
                  util.showModal('错误', '推送邮箱设置失败')
                  console.log(kdRes)
                }
              })
            }
          }
        })
      } else {
        util.showModal('验证失败', '邮箱格式有误')
      }
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
    this.setData({email: wx.getStorageSync('email')})
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