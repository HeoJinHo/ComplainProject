function valicationCheck() {

    if ($("#paymentForm input[type='checkbox']:checked").length == 0) {
        alert("하나의 결제 수단은 사용을 하셔야 합니다");
        return false;
    }

    return true;
}

function submit() {
    if(!valicationCheck()) {
        return;
    }

    requestAjaxForm("paymentForm", function (res) {
        alert(res.message);
        location.reload();
    });
}