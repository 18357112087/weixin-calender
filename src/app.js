//app.js
App({
  onLaunch: function () {
  //   if (!wx.cloud) {
  //     console.error('请使用 2.2.3 或以上的基础库以使用云能力')
  //   } else {
  //     wx.cloud.init({
  //       env:'period-gu7ym',
  //       traceUser: true,
  //     })
    
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
    
  //   // 调用云函数，获取用户的openid
  //   console.log('before')
  //   wx.cloud.callFunction({
  //    name: 'login',
  //    data: {},
  //    success: res => {
  //      console.log(res)
  //      console.log('[云函数] [login] user openid: ', res.result.openid)
  //      app.globalData.openid = res.result.openid
  //    },
  //    fail: err => {
  //      console.error('[云函数] [login] 调用失败', err)
  //    }
  //   })
  //  console.log('after')
  // }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
    
  },
  
  globalData:{
    userInfo:null,
    env:'period-gu7ym',
    openid: '你的openid'
  }
})

var app = getApp()
if (!wx.cloud) {
  console.error("请使用2.2.3或以上的基础库以便于使用云能力")
} else {
  wx.cloud.init({
    env: "period-gu7ym",
    traceUser: true
  })
  // 调用云函数，获取用户的openid
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log(res)
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
      // wx.navigateTo({
      //   url: '../userConsole/userConsole',
      // })
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
     
    }
  })
}