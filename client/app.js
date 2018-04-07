//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var API_BASE = 'http://127.0.0.1:8000/api';

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    ebook_service: {
      API_BASE,

      LATEST_API: `${API_BASE}/ebook/latest`,
      RECOMMEND_API: `${API_BASE}/ebook/recommend`,
      RANK_API: `${API_BASE}/ebook/rank`,
      FREE_API: `${API_BASE}/ebook/free`,
      SEARCH_API: `${API_BASE}/ebook/search`
    }
})