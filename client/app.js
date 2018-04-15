//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')
var API_BASE = 'http://127.0.0.1:8000/api';


App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                  util.showSuccess('授权成功')
                }
              })
            }
          }
        })
    },
    ebook_service: {
      API_BASE,
      WXLOGIN_API: `${API_BASE}/account/wxlogin/`,
      KDLOGIN_API: `${API_BASE}/account/kdlogin/`,
      EMAIL_API: `${API_BASE}/account/email/`,

      RETRIEVE_API: `${API_BASE}/ebook/`,
      LATEST_API: `${API_BASE}/ebook/latest/`,
      RECOMMEND_API: `${API_BASE}/ebook/recommend/`,
      RANK_API: `${API_BASE}/ebook/rank/`,
      FREE_API: `${API_BASE}/ebook/free/`,

      SEARCH_API: `${API_BASE}/ebook/search/`,
      PUSH_API: `${API_BASE}/ebook/push/`,
    }
})