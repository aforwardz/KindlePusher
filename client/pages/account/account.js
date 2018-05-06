// pages/account/account.js
var ebook_api = getApp().ebook_service
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    userData: []
  },

  // 用户登录示例
  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: ebook_api.WXLOGIN_API,
            data: {
              code: res.code
            },
            success: function (wxRes) {
              util.showBusy('等待校验')
              if (wxRes.data.status == 'check') {
                wx.getUserInfo({
                  success: function (userRes) {
                    wx.request({
                      url: ebook_api.KDLOGIN_API,
                      data: {
                        encryptedData: userRes.encryptedData,
                        iv: userRes.iv
                      },
                      method: 'POST',
                      success: function (kdRes) {
                        util.showSuccess('登录成功')
                        that.setData({
                          userInfo: kdRes.data,
                          logged: true
                        })
                        wx.setStorage({
                          key: "email",
                          data: kdRes.data.kindle_email
                        },
                        {
                          key: "Token",
                          data: kdRes.data.openId
                        })
                      },
                      fail: function (kdRes) {
                        util.showModal('错误', '登录失败')
                        console.log(kdRes)
                      }
                    })
                  }
                })
              }
            }
          })
        } else {
          util.showModal('错误', '登录失败: ' + res.errMsg)
        }
      }
    })
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
              id: that.data.userInfo.id,
              nickname: that.data.userInfo.nickname,
              kindle_email: event.detail.value
            }
            wx.request({
              url: ebook_api.EMAIL_API,
              method: 'PUT',
              data: uData,
              success: function (res) {
                util.showSuccess('设置成功')
                that.setData({
                  userInfo: res.data
                })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.checkSession({
      success: function (data) {
        var token = wx.getStorageSync('Token')
        if (token) {
          wx.request({
            url: ebook_api.TKLOGIN_API,
            data: {
              Token: token
            },
            method: 'POST',
            success: function (tkRes) {
              that.setData({
                userInfo: tkRes.data,
                logged: true
              })
              wx.setStorage({
                key: "email",
                data: tkRes.data.kindle_email
              },
              {
                key: "Token",
                data: tkRes.data.openId
              })
            },
            fail: function (tkRes) {
              util.showModal('错误', '登录失败')
              console.log(tkRes)
            }
          })
        } else {
          that.login()
        }
        // wx.setStorage({
        //   key: 'session_key',
        //   data: '',
        // })
      },
      fail: function (data) {
        console.log(data)
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