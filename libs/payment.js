/**
 * Created by mengkeys on 16-9-23.
 */

var Payment = require('wechat-pay').Payment;
var initConfig = {
    partnerKey: "eee618966516b4da2a5c5667cd6b3306",
    appId: "wx68e8f48ef7793662",
    mchId: "1333300101",
    notifyUrl: "http://wechat.yuncreate.net/order/notify",
    pfx: fs.readFileSync(path.join(__dirname, 'cert.p12'))
};
var payment = new Payment(initConfig);

var order = {
    body: '吮指原味鸡 * 1',
    attach: '{"部位":"三角"}',
    out_trade_no: 'kfc' + (+new Date),
    total_fee: 10 * 100,
    spbill_create_ip: req.ip,
    openid: req.user.openid,
    trade_type: 'JSAPI'
};

payment.getBrandWCPayRequestParams(order, function(err, payargs){
    res.json(payargs);
});