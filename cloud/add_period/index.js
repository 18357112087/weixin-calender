const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  try {
    const {OPENID} = cloud.getWXContext();
    // 在云开发数据库中存储用户订阅的课程
    const result = await db.collection('periods').add({
      data: {
        jingqi:event.jinqi,//经期
        zhouqi:event.zhouqi,//周期
        zuijinriqi:event.zuijinriqi,//最近一次月经日期
        openid: OPENID
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

