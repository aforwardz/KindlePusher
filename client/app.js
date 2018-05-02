//app.js
var config = require('./config')
var util = require('./utils/util.js')


App({
    onLaunch: function () {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  util.showSuccess('授权成功')
                }
              })
            }
          }
        })
    },
    ebook_service: config.ebook_service
})