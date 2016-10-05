/**
 * Created by mengkeys on 16-9-23.
 */

$(function() {

    // 所填写金额校验函数
    function checkMoney(data) {
        if(!!data){
            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(data.toString());
        } else {
            return false;
        }
    }

    // 扫码支付相关元素
    var $confirmBtn = $('#qrcode-config-btn');
    var $promptModal = $('#qrcode-confirm-modal');
    var $loadingModal = $('#qrcode-modal-loading');


    // 相关事件监听
    $confirmBtn.on('click', function() {
        // 手动打开模态框
        $promptModal.modal({
            closeViaDimmer: false,
            closeOnConfirm: false   // 禁止confirm按钮点击时关闭modal
        });
    });

    $promptModal.find('[data-am-modal-confirm]').on('click', function () {
        // 此处作数据校验
        var $money = $.trim($('#money').val());
        if(!!checkMoney($money)){
            // 金额数据有效
            // 调用微信扫二维码
            // 关闭模态框
            $promptModal.modal('close');
            scan($money);
        } else {
            // 代码提示
        }
    });

    // 模态框关闭，清空数据
    $promptModal.on('closed.modal.amui', function () {
       $('#money').val('');  // 清空金额数据
    });

    // 调用微信扫码功能
    function scan(money) {
        alert(money);

        $.getJSON("/config",function(result){
            console.log(result);
            var config = result.data;
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appid, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonce, // 必填，生成签名的随机串
                signature: config.sign,// 必填，签名，见附录1
                jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });


        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var code = res.resultStr;
                // 将数据传给后台
                // 直接在页面上展示，等待中信息, 加个loading.
                $loadingModal.modal('open');
                $.post('/micropay',{
                    money: money,
                    code: code

                },function(data,status){
                    // 展示
                    alert("Data: " + data + "\nStatus: " + status);
                });
            }
        });
    }
});