//index.js
//获取应用实例
var app = getApp()
const db = wx.cloud.database()
var lastid = 0
var limit = 5
var utils = require('../../utils/util.js')
Page({
  data: {
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
    newsList: [],
    scrollviewHeight:500,
    banner:[]
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore: function (e) {
    console.log("下拉刷新了")
    if (this.data.newsList.length === 0) return
    var that = this
    that.setData({ 
      loading: true,
      limit:limit,
      lastid:lastid,
    })
    db.collection('knowledge')
      .get().then(knowledge => {
        console.log(knowledge)
      })
    // wx.request({
    //   url: 'http://localhost/index.php?s=/addon/Yuejin/Yuejin/getlist',
    //    data: {
    //      limit:limit,
    //      lastid:lastid,
    //    },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     if(!res.data){
    //        return false
    //      }
    //      that.setData({
    //        loading: false,
    //        newsList:that.data.newsList.concat(res.data)
    //       //  list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
    //      })
    //     var len = res.data.length
    //      lastid = res.data[len-1].id;
    //   }
    // })
  },
  onShareAppMessage: function() {
    return {
      title: '男朋友',
      desc: '拒绝大血崩，让他来照顾你的大姨妈',
      path: 'pages/list/list'
    }
  },

 
  onLoad: function () {
    var that = this
    const res = wx.getSystemInfoSync();
    that.setData({
      scrollviewHeight:res.windowHeight
    })
    console.log("屏幕高度"+res.windowHeight);
    db.collection('knowledge')
      .get().then(knowledge => {
        console.log(knowledge)
        that.setData({
          newsList:knowledge.data
        })
      })
    db.collection('banner')
      .get().then(banner => {
        console.log(banner)
        that.setData({
          banner: banner.data
        })
      })
    // wx.request({
    //    url: 'http://localhost/index.php?s=/addon/Yuejin/Yuejin/getList',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //      that.setData({
    //        banner:res.data,
    //      })
    //   }
    // })
    // wx.request({
    //    url: 'http://localhost/index.php?s=/addon/Yuejin/Yuejin/getList',
    //    data: {
    //      limit:limit,
    //      lastid:lastid,
    //    },
    //    header: {
    //      'content-type': 'application/json'
    //    },
    //    success: function (res) {
    //      if(!res.data){
    //        return false
    //      }
    //      //更新数据
    //      that.setData({
    //        newsList: res.data
    //      })
    //     //  var len = that.data.newsList.concat(res.data).length
    //     var len = res.data.length
    //      lastid = res.data[len-1].id;
    //     console.log("ahaha"+lastid)
    //   }
    // })
  },
})
