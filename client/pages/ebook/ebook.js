// pages/ebook/ebook.js
var ebook_api = getApp().ebook_service
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ebookId: '',
    ebook: {}
  },

  searchEbook: function (id) {
    util.showBusy('正在卖力取书')
    var that = this
    wx.request({
      url: ebook_api.RETRIEVE_API + id + '/',
      success: function (response) {
        if (response.statusCode !== 200) {
          console.log(response)
          util.showModal(response.statusCode.toString(), '书目获取失败')
        }
        else {
          util.showSuccess('获取成功')
          console.log(response.data)
          that.setData({ebook: response.data})
        }
      },
      fail: function (response) {
        console.log(response)
        util.showModal(response.statusCode.toString(), '服务器吃鸡去了')
      }
    })
  },

  pushEbook: function (e) {
    console.log(e.currentTarget.dataset.id)
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
              wx.request({
                url: ebook_api.PUSH_API,
                method: 'POST',
                data: pushData,
                success: function (sRes) {
                  if (sRes.data.statusText == 'OK') {
                    util.showSuccess('推送成功！')
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