// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入request-promise用于做网络请求
var rp = require('request-promise');
const GetAccessToken = require('./GetAccessToken.js')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => { return new Promise((resolve, reject) => {
  var apiResult = {}
  GetAccessToken.getAccessToken.then((token) => {
    console.log("access token",token)
    console.log(event)
    console.log(context)
    let url = 'api.weixin.qq.com';
    var options = {
      method: 'POST',
      uri: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token,
      body: {
        touser:event.openid,
        template_id:'dRhy-2rI-tXD4Hwv9xvFbe8YOXHZBk2BX2WNZu8EFLA',
        form_id:event.form_id,
        value:"aa"
      },
      json: true // Automatically stringifies the body to JSON
  }
    rp(options)
    .then(function (parsedBody) {
        // POST succeeded...
        console.log('parseBody',parsedBody)
       resolve(parsedBody)
    })
    .catch(function (err) {
      console.log('error',err);
      reject(err)
    })
    })

  
  })
};
 
  



  
