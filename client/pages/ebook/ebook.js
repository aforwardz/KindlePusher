// pages/ebook/ebook.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ebookId: '',
    ebook: {},
    short_intro: '',
    collapsed: true,
    reachBottom: false
  },

  searchEbook: function (id) {
    util.showBusy('正在卖力取书')
    var that = this
    wx.request({
      url: app.API.RETRIEVE_API + id + '/',
      success: function (response) {
        if (response.statusCode !== 200) {
          util.showModal(response.statusCode.toString(), '书目获取失败')
        }
        else {
          util.showSuccess('获取成功')
          console.log(response.data)
          that.setData({ebook: response.data})
          if (that.data.collapsed) {
            that.setData({short_intro: that.data.ebook.intro.slice(0, 100)})
          }
        }
      },
      fail: function (response) {
        console.log(response)
        util.showModal(response.statusCode.toString(), '服务器吃鸡去了')
      }
    })
  },

  pushEbook: function (e) {
    var rId = e.currentTarget.dataset.id
    var rName = e.currentTarget.dataset.name
    try {
      var email = wx.getStorageSync('email')
      if (email) {
        var that = this
        wx.showModal({
          title: '确认',
          content: '要推送《' + rName + '》吗？',
          success: function (res) {
            if (res.confirm) {
              var pushData = {
                id: rId,
                email: email
              }
              console.log(pushData)
              wx.request({
                url: app.API.PUSH_API,
                method: 'POST',
                data: pushData,
                success: function (sRes) {
                  if (sRes.data.statusText == 'OK') {
                    util.showSuccess('成功加入推送队列！稍后查收！')
                    var book = that.data.ebook
                    book.pushes = book.pushes + 1
                    that.setData({ebook: book})
                  } else {
                    util.showModal('失败', sRes.data.detail)
                  }
                },
                fail: function (fRes) {
                  util.showModal('失败', fRes)
                }
              })
            }
          }
        })
      } else {
        util.showModal('错误', '没设置邮箱推送个毛啊?!')
      }
    } catch (e) {
      console.log(e)
    }
  },

  controlIntro: function () {
    var that = this
    that.setData({collapsed: !that.data.collapsed})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.ebookId = options.id
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
    var that = this
    that.setData({reachBottom: true})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var that = this
    return {
      title: '向你推荐《'+that.data.ebook.name+'》',
      path: '/pages/ebook/ebook/?id='+that.data.ebookId,
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