const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var setLog = function (text) {
  console.log(text)
  var logs = wx.getStorageSync('logs') || []
  logs.unshift(Date.now().toString() + ': ' + text)
  // console.log(logs)
  wx.setStorage({
    key: 'logs',
    data: logs,
  })
}

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

var showFail = text => wx.showToast({
  title: text,
  icon: 'none',
  duration: 600
})

// 显示失败提示
var showModal = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatTime, showBusy, showSuccess, showModal, setLog}
