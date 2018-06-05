//app.js
var config = require('./config')
var util = require('./utils/util.js')

App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: res => {
              console.log(res)
            }
          })
        }
      }
    })
  },
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: config.API.WXLOGIN_API,
            data: {
              code: res.code
            },
            success: function (wxRes) {
              if (wxRes.data.status == 'check') {
                var open_id = wxRes.data.open_id
                wx.getUserInfo({
                  success: function (userRes) {
                    that.globalData.userInfo = userRes.userInfo
                    wx.request({
                      url: config.API.KDLOGIN_API,
                      data: {
                        encryptedData: userRes.encryptedData,
                        iv: userRes.iv,
                        open_id: open_id
                      },
                      method: 'POST',
                      success: function (Res) {
                        util.setLog('登录成功')
                        console.log(Res)
                        wx.setStorageSync('token', Res.data.token)
                        wx.setStorageSync('openid', Res.data.openid)
                      },
                      fail: function (Res) {
                        util.setLog(Res.errMsg)
                        console.log(Res)
                      }
                    })
                  }
                })
              }
            }
          })
        } else {
          util.setLog('登录失败: ' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  },
  API: config.API
})