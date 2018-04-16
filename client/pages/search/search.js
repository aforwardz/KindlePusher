// pages/home/search/search.js
var app = getApp();
var ebook_api = getApp().ebook_service
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    showClear: false,
    format_index: 0,
    result: {
      subjects: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

/**搜索书籍 */
  bindSearchInput: function (event) {
    var value = event.detail.value;
    var readyData = { showClear: false };
    if (value.length > 0) {
      readyData = { showClear: true , searchValue: value};
      // this.handleSearchData(value);
    }
    this.setData(readyData);
  },
  /**清空输入框 */
  bindSearchClear: function (event) {
    var readyData = { searchValue: "", showClear: false, result: {} };
    this.setData(readyData);
  },
  /**点击搜索 */
  bindSearchStart: function (event) {
    this.handleSearchData(this.searchValue)
  },
  /** 提交搜索请求 */
  handleSearchData: function (value) {
    var that = this;
    var serchURL = ebook_api.SEARCH_API + '?search=' + value;
    wx.request({
      url: serchURL,
      success: function (res) {
        // success
        var data = res.data;
        that.processSearchData(data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  /**组装搜索数据 */
  processSearchData: function (data) {
    var books = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var directors = "";
      var separate = " / ";
      for (let i in subject.directors) {
        directors += subject.directors[i].name + separate;
      }
      directors = directors.substring(0, directors.length - separate.length);
      var summary = subject.rating.average + "分" + separate + subject.year + separate + directors;
      var temp = {
        id: subject.id,
        casts: subject.casts,
        collect_count: subject.collect_count,
        directors: subject.directors,
        title: subject.title,
        images: subject.images,
        rating: subject.rating,
        year: subject.year,
        summary: summary
      };
      books.push(temp);
    }
    var readyData = {};
    readyData["result"] = {
      subjects: books
    }

    this.setData(readyData);
  },
  /** 点击进入搜索条目 */
  viewBook: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/ebook/ebook?id=' + id.toString()
    })
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