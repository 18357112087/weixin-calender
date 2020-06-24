// pages/picker/picker.js
var ayu = "AYU"
const page = {
  data: {
    array: [],
    array2: [],
    //上次月经日期
    date: '2022-09-01',
    //周期长度
    index: 5,
    //经期长度
    index2: 28,
    tocalendar: 0
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  onShow:function(){
     //月经持续时间
      var jinqi = wx.getStorageSync('jinqi');
      //月经周期
      var zhouqi = wx.getStorageSync('zhouqi');
      //上次月经日期
      var zuijinriqi = wx.getStorageSync('zuijinriqi');
      
    if (jinqi != "" && zhouqi != "" && zuijinriqi != ""){
        console.log('不为空,提取本地数据')
        this.setData({
          index:jinqi,
          index2:zhouqi,
          date:zuijinriqi
        })
      }
  },
  onShareAppMessage: function () {
    return {
      title: '男朋友',
      desc: '拒绝大血崩，让他来照顾你的大姨妈',
      path: 'pages/picker/picker'
    }
  },
  onLoad: function () {
    //月经持续时间
    ayu = wx.getStorageSync('jinqi');
    console.log(ayu)
    // if (ayu != "AYU") {
    //   wx.switchTab({
    //     url: '../calendar/calendar'
    //   })
    // }
    if (ayu != "") {
      wx.switchTab({
        url: '../calendar/calendar'
      })
    }
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const day = date.getDate();
    var nowday = cur_year + "-" + cur_month + "-" + day;
    var arr = []
    var arr2 = []
    for (let i = 0; i < 110; i++) {
      if (i < 40) {
        arr[i] = i
      }
      arr2[i] = i
    }
    this.setData({
      array: arr,
      array2: arr2,
      //当天时间
      date: nowday
    })
  },
  formSubmit(e){
    const date = e.detail.target.dataset.date
    const a = e.detail.target.dataset.array
    const a2 = e.detail.target.dataset.arrayb
    wx.cloud.callFunction({
      name: 'add_period',
      data: {
        jingqi:a,
        zhouqi:a2,
        zuijinriqi:date
      },
    })
    .then(() => {
      console.log("月经数据上传成功")
    })
    .catch(() => {
      console.log("月经数据上传失败")
    });
    try {
      //经期长度
      wx.setStorageSync('jinqi', a)
      //周期长度
      wx.setStorageSync('zhouqi', a2)
      //最近一次月经
      wx.setStorageSync('zuijinriqi', date)

   


    } catch (e) {
    }

    wx.switchTab({
      url: '../calendar/calendar'
    })

     // 调用微信 API 申请发送订阅消息
     wx.requestSubscribeMessage({
      // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
      tmplIds: ['dRhy-2rI-tXD4Hwv9xvFbe8YOXHZBk2BX2WNZu8EFLA'],
      success(res) {
        // 申请订阅成功
        if (res.errMsg === 'requestSubscribeMessage:ok') {
         var temp = new Date(date)
          console.log(temp.setDate(temp.getDate()+a2))
          // 这里将订阅的课程信息调用云函数存入云开发数据
          wx.cloud.callFunction({
              name: 'subscribe',
              data: {
                data: {
                  date1:temp.setDate(temp.getDate()+a2),
                  thing2:"大姨妈来了，少吃冰的"
                },
                templateId: 'dRhy-2rI-tXD4Hwv9xvFbe8YOXHZBk2BX2WNZu8EFLA',
              },
            })
            .then(() => {
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 2000,
              });
            })
            .catch(() => {
              wx.showToast({
                title: '订阅失败',
                icon: 'success',
                duration: 2000,
              });
            });
        }
      },
    });
  },




  
}

Page(page)