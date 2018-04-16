//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')
var API_BASE = 'https://kindlepusher.cn/api';


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