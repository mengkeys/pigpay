/**
 * Created by mengkeys on 16-9-23.
 */

$(function() {
    function checkMoney(data) {
        if(!!data){
            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(data.toString());
        } else {
            return false;
        }
    }

    $('#qrcode-prompt-toggle').on('click', function() {
        $('#qrcode-prompt-modal').modal({
            relatedTarget: this,
            onConfirm: function(e) {
                console.log(e.data);
                // 校验
                if(!!checkMoney(e.data)){
                    alert('金额正确');
                } else {
                    alert('金额不正确');
                    $(this).focus();
                    return false;
                }
            },
            onCancel: function(e) {
                alert('您取消了收款');
            }
        });
    });

    /* 时间选择器 */

});