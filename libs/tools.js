/**
 * Created by mengkeys on 16-9-23.
 */


var moment = require('moment');
var crypto = require('crypto');
var qs = require('querystring');

// 生成微信支付时间戳
exports.timestamp = function () {
    return Math.ceil(new Date().getTime() / 1000);
};

// 生成微信支付的随机字符 32位
exports.nonce = function (){
    var buf = crypto.randomBytes(32);
    var string = buf.toString('base64');
    string = string.replace(/\//g,'_').replace(/\+/g,'');
    return string.substr(0, 16);
};

exports.signature = function (obj) {
    var keys = Object.keys(obj);
    var args = {};
    keys.sort();
    keys.forEach(function (item) {
        args[item] = obj[item];
    });
    // sha1加密
    return crypto.createHash('sha1').update(decodeURIComponent(qs.stringify(args))).digest('hex');
};

exports.format = function (time) {
    return moment(time).format('YYYY年MM月DD日 h时mm分ss秒');
};

exports.ip = function (param) {
  return param.split(':').pop();
};