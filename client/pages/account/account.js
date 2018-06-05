// pages/account/account.js
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    hasUserInfo: false,
    requestResult: '',
    userData: []
  },

  validateEmail: function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },

  setKindleEmail: function (event) {
    if (this.validateEmail(event.detail.value)) {
      var that = this
      wx.showModal({
        title: '确认',
        content: '将' + event.detail.value + '设置成推送邮箱？',
        success: function (res) {
          if (res.confirm) {
            var uData = {
              open_id: wx.getStorageSync('openid'),
              kindle_email: event.detail.value
            }
            wx.request({
              url: app.API.EMAIL_API,
              method: 'PUT',
              data: uData,
              success: function (res) {
                util.showSuccess('设置成功')
                wx.setStorage({
                  key: "email",
                  data: res.data.kindle_email
                })
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
  },

  bindAuthorize: function () {
    util.showBusy('正在登录')
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    util.showSuccess('登录成功')
    app.login()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        if (!wx.getStorageSync('token')) {
          app.login()
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      app.login()
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