var express = require('express');
var router = express.Router();
var async = require('async');
//var payment = require('../libs/payment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/system', function (req, res, next) {
  res.render('system');
});

router.get('/qrcode', function (req, res, next) {
  res.render('qrcode');
});

router.get('/orders', function (req, res, next) {
  res.render('orders');
});

router.get('/order', function (req, res, next) {

});

/* 获取微信签名 */
router.get('/signature', function (req, res, next) {
  async.parallel({
    timeStamp: function (cb) {
      payment.timestamp()
    }
  }, function () {

  });
  res.json(payment.signature());
});


router.get('/receivables', function (req, res, next) {

});


router.get('/orderlist', function (req, res, next) {

});


router.get('/order/:id', function (req, res, next) {
  var id = req.params.id;

});

router.get('/bills', function (req, res, next) {
 /* payment.downbills(function (err, bills) {

  });*/
});

module.exports = router;
