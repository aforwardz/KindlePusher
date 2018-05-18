//app.js
var config = require('./config')
var util = require('./utils/util.js')


App({
    onLaunch: function () {
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.setStorageSync('isAuthorized', true)
            } else {
              wx.setStorageSync('isAuthorized', false)
            }
          }
        })
    },
    ebook_service: config.ebook_service
})