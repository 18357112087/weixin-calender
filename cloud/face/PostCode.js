var https = require('https');
var qs = require('querystring');

//const CarDetectPath ='/rest/2.0/image-classify/v1/car'
const FaceSearchPath = '/rest/2.0/face/v3/search?access_token='
const CarDetectPath = '/rest/2.0/image-classify/v1/car?access_token='
const WeiXinAPI = '/wxa/msg_sec_check?access_token='
var path = ''
//////token:Access_code
////img
////param有很多参数,
///可能有必备{requestType,user_id,group_id},根据request的不同
module.exports.postCode = function post(token, param) {
  //设置post的body 请求参数
  function post_data(param) {
    // Build the post string from an object
    var data = {}
    path = WeiXinAPI
    //data.image = param.image
    data.content = 'hello world!'
    //data.group_id_list = "AVactors,123"
    return qs.stringify(data)
  }

  function post_options() {
    // An object of options to indicate where to post to
    return {
      hostname: 'api.weixin.qq.com',
      path: '/wxa/msg_sec_check?access_token=' + token,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    };
  }

  return new Promise((resolve, reject) => {
    // Set up the request
    console.log(post_options())
    var post_req = https.request(post_options(), function (res) {
      console.log(res)
      res.setEncoding('utf8');
      res.on('data', function (res) {
        console.log('Response: ' + res);
        resolve(res)
        if (res.error_code==0)
        // resolve(chunk)
       { 
         resolve(res)
       // return (res)
        }
        else{
          reject(res)
        }
      
      });
      res.error
    });
    post_req.on('error', (e) => {
      console.error(e);
      reject(e)
    });
    // post the data
    console.log(post_data(param))
    post_req.write(post_data(param));
    post_req.end();
  })
}