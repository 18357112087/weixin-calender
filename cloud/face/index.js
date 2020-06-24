// 云函数入口文件
const cloud = require('wx-server-sdk')
var https = require('https');
var qs = require('querystring');
var fs = require('fs');
var access_token = ''
var response=''
const GetAccessToken = require('./GetAccessToken.js')
const PostCode = require('./PostCode')
// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer.from(bitmap).toString('base64');
}

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {
  var param = {}
  const wxContext = cloud.getWXContext()
  var image = event.img_BASE64
  console.log(event)
  param = { image: image}
  console.log(param)

  GetAccessToken.getAccessToken.then((token) => {
    console.log("access token",token)
    PostCode.postCode(token,param).then(message=>{
      console.log(message)
      resolve(message)})
     .catch(e=>reject(e))
  }).catch(e=>console.log(e))




  //main Promise的错误handleler
  })
  .catch((error) => {
    console.log(error)})
  
        


