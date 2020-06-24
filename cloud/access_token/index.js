var https = require('https');
var qs = require('querystring');
const param = qs.stringify({
  'grant_type': 'client_credentials',
  'appid': 'wxcfb084036120646c',
  'secret': '2968bf436ef69013f5c7ab6b4c41f678'
});
module.exports.getAccessToken = new Promise((resolve, reject) =>{
https.get(
    {
        hostname: 'api.weixin.qq.com',
        path: '/cgi-bin/token?' + param,
        agent: false
    },
    function (res) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        // 在标准输出中查看运行结果
        access_token = res.access_token
        //res.pipe(process.stdout)
        res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
             resolve(parsedData.access_token)
            } catch (e) {
              console.error(e.message);
              reject(e.message)
            }
          })
        }
)
})