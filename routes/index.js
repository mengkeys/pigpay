var express = require('express');
var router = express.Router();
var async = require('async');
var tools = require('../libs/tools');
//var payment = require('../libs/payment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* 获取静态页面 */
router.get('/page/:page', function (req, res, next) {
  var page = req.params.page;
  res.render(page);
});

/* 加载微信服务端签名参数 */
router.get('/config', function (req, res, next) {
  // appid
  // nonce
  // timestamp
  // sign
  var config = {
    nonce:"",
    timestamp:"",
    sign:"",
    appid:""
  };

  res.json({code:1, data:config, message:"获取参数成功"});
});

/* 接收客户端回传的二维码，条形码信息,并由服务端发起支付  */
router.post('/micropay', function (req, res, next) {
  var data = req.body;

  var order = {};
  // 发起支付
  try{
    money = data.money;
    code = data.code;
  } catch (err){
    return res.json({code:0,message:'request params checked fail.'});
  }

  // 先生成订单


  // 调用支付

  order = {
    // 对象自动填充
/*    appid:"",
    mch_id:"",
    nonce_str:"",
    sign:"",*/
    body:"孔亮火锅店-到店消费",
    out_trade_no:'',
    total_fee: money * 100,
    spbill_create_ip:tools.ip(req.ip),
    auth_code: code
  };
  return res.json({});
});

/*router.get('/query', function (req, res, next) {
  // 订单支付状态查询
  return res.json({code:1,data:"",message:"获取数据成功"});
});*/

router.get('/system', function (req, res, next) {
  res.render('system');
});

/* 订单记录 */
router.get('/orders', function (req, res, next) {
  res.render('orders');
});

// 收款记录
router.get('/payments', function (req, res, next) {

});

// 订单撤销记录
router.get('/reverses', function (req, res, next) {

});

// 退款记录
router.get('/refunds', function (req, res, next) {

});


/* 查看订单详情 */
router.get('/order/:id', function (req, res, next) {
  var id = req.params.id;

});

/* 对帐单 */
router.get('/bills', function (req, res, next) {

});

router.post('/feedback', function (req, res, next) {
  var data = req.body;

  // 写入数据库

});

router.get('/test', function (req, res, next) {
  res.json(tools.ip(req.ip));
});

module.exports = router;
