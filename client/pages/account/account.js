// pages/account/account.js
const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    userData: null,
    email: wx.getStorageSync('email'),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    text: '这是循环测试',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    interval: 20, // 时间间隔
  },

  goSet: function () {
    if (!this.data.hasUserInfo) {
      util.showFail('未登录')
    } else {
      wx.navigateTo({
        url: '/pages/account/set/set',
      })
    }
  },

  contributeBook: function () {
    util.showFail('暂未开放')
  },

  feedbackHelp: function () {
    wx.navigateTo({
      url: '/pages/account/help/help',
    })
  },

  aboutMe: function () {
    wx.navigateTo({
      url: '/pages/account/about/about',
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

  getData: function (openid) {
    var that = this
    wx.request({
      url: app.API.USERDATA_API + '?open_id=' + openid,
      success: function (res) {
        that.setData({userData: res.data})
      }
    })
  },

  bindAuthorize: function (e) {
    util.showBusy('正在登录')
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    app.globalData.userInfo = e.detail.userInfo
    wx.hideToast()
    util.showSuccess('登录成功')
    app.login()
    // this.setData({
    //   userInfo: app.globalData.userInfo
    // })
  },

  run1: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run1();
      }
    }, vm.data.interval);
  },
  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance2 < vm.data.length) {
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
        });
      } else {
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance2: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.interval);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('load')
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo && app.globalData.userData) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userData: app.globalData.userData,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        console.log('callback')
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(wx.getStorageSync('token'))
        if (!wx.getStorageSync('token') || !wx.getStorageSync('openid')) {
          app.login()
        }
      }
      app.userDataReadyCallback = res => {
        console.log('data callback')
        console.log(res)
        this.getData(res)
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
    var vm = this;
    var length = vm.data.text.length * 14;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    vm.run1();// 水平一行字滚动完了再按照原来的方向滚动
    vm.run2();// 第一个字消失后立即从右边出现
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